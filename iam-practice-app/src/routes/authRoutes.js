const express = require("express");
const path = require("path");
const { findUserByEmail, withoutPassword } = require("../users");
const { redirectIfLoggedIn } = require("../middleware/auth");
const { getOidcStatus, getOktaOidcStatus } = require("../oidcConfig");
const {
  buildSamlSessionUserFromAttributes,
  getSamlConfig,
  getSamlStatus
} = require("../samlConfig");
const {
  buildAuthorizationUrl,
  buildSessionUserFromClaims,
  handleCallback
} = require("../oidcClient");
const { recordAuditEvent } = require("../auditStore");

const router = express.Router();
const viewsPath = path.join(__dirname, "..", "views");

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function renderOidcMessage(
  res,
  statusCode,
  title,
  message,
  details = "",
  providerLabel = "OIDC",
  statusHref = "/api/oidc/status"
) {
  return res.status(statusCode).send(`
    <link rel="stylesheet" href="/styles.css">
    <main class="shell">
      <section class="panel">
        <p class="eyebrow">${escapeHtml(providerLabel)}</p>
        <h1>${escapeHtml(title)}</h1>
        <p>${escapeHtml(message)}</p>
        ${details ? `<div class="notice">${escapeHtml(details)}</div>` : ""}
        <nav class="actions">
          <a class="button" href="/login">Back to local login</a>
          <a class="button" href="/oidc-readiness">OIDC readiness</a>
          <a class="button" href="${escapeHtml(statusHref)}">API: status</a>
        </nav>
      </section>
    </main>
  `);
}

function safeOidcErrorMessage(error) {
  if (!error || !error.message) {
    return "OIDC operation failed.";
  }

  return error.message
    .replace(/code=[^&\s]+/gi, "code=[redacted]")
    .replace(/id_token=[^&\s]+/gi, "id_token=[redacted]")
    .replace(/access_token=[^&\s]+/gi, "access_token=[redacted]")
    .replace(/refresh_token=[^&\s]+/gi, "refresh_token=[redacted]")
    .replace(/client_secret=[^&\s]+/gi, "client_secret=[redacted]");
}

function recordOidcLoginSuccess(req) {
  recordAuditEvent(
    "oidc_login_success",
    "success",
    {
      authSource: req.session.user.authSource,
      providerType: req.session.user.authProviderType,
      providerName: req.session.user.authProvider,
      role: req.session.user.role,
      subjectPresent: req.session.user.oidcSafeClaimSummary.subjectPresent,
      preferredUsernamePresent: req.session.user.oidcSafeClaimSummary.preferredUsernamePresent,
      displayNamePresent: req.session.user.oidcSafeClaimSummary.displayNamePresent,
      emailPresent: req.session.user.oidcSafeClaimSummary.emailPresent,
      groupsClaimPresent: req.session.user.oidcSafeClaimSummary.groupsClaimPresent
    },
    req
  );
}

function renderSamlMessage(res, statusCode, title, message, details = "") {
  return res.status(statusCode).send(`
    <link rel="stylesheet" href="/styles.css">
    <main class="shell">
      <section class="panel">
        <p class="eyebrow">Phase 8 SAML</p>
        <h1>${escapeHtml(title)}</h1>
        <p>${escapeHtml(message)}</p>
        ${details ? `<div class="notice">${escapeHtml(details)}</div>` : ""}
        <nav class="actions">
          <a class="button" href="/login">Back to local login</a>
          <a class="button" href="/saml-readiness">SAML readiness</a>
          <a class="button" href="/api/saml/status">API: SAML status</a>
        </nav>
      </section>
    </main>
  `);
}

function renderSamlSimulationForm(res) {
  return res.send(`
    <link rel="stylesheet" href="/styles.css">
    <main class="shell">
      <section class="panel">
        <p class="eyebrow">Phase 8 Local SAML Simulation</p>
        <h1>Simulated SAML Callback</h1>
        <p>This local-only form posts safe sample SAML attributes to the callback route. It does not contact a real IdP and does not use a real SAML assertion.</p>
        <form action="/auth/saml/callback" method="post" class="stack">
          <label>
            Name ID
            <input name="nameId" value="saml.user@identitycore.local">
          </label>
          <label>
            Email
            <input name="email" value="saml.user@identitycore.local">
          </label>
          <label>
            Display name
            <input name="displayName" value="SAML Simulation User">
          </label>
          <button type="submit">Complete local SAML simulation</button>
        </form>
      </section>
    </main>
  `);
}

router.get("/login", redirectIfLoggedIn, (req, res) => {
  res.sendFile(path.join(viewsPath, "login.html"));
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = findUserByEmail(email || "");

  // Later OIDC or SAML phases can replace this local password check with an IdP callback.
  if (!user || user.password !== password) {
    recordAuditEvent(
      "local_login_failure",
      "failure",
      {
        email: email || "not-provided",
        reason: "local_dummy_credentials_not_matched"
      },
      req
    );

    return res.status(401).send(`
      <link rel="stylesheet" href="/styles.css">
      <main class="shell">
        <section class="panel">
          <h1>Login failed</h1>
          <p>The email or password did not match a local training user.</p>
          <a class="button" href="/login">Try again</a>
        </section>
      </main>
    `);
  }

  req.session.user = withoutPassword(user);
  req.session.authTime = Math.floor(Date.now() / 1000);
  recordAuditEvent(
    "local_login_success",
    "success",
    {
      email: req.session.user.email,
      role: req.session.user.role
    },
    req
  );
  return res.redirect("/dashboard");
});

router.get("/auth/oidc/start", (req, res) => {
  const status = getOidcStatus();

  if (!status.enabled) {
    return renderOidcMessage(
      res,
      200,
      "OIDC is disabled",
      "Local dummy login is still active. Set OIDC_ENABLED=true in a local uncommitted .env file when you are ready to test Entra OIDC.",
      "No authorization URL was built and no redirect was started.",
      "Phase 13 Entra OIDC"
    );
  }

  if (!status.canStartLogin) {
    return renderOidcMessage(
      res,
      400,
      "OIDC configuration is incomplete",
      "OIDC is enabled, but required values are missing or still use placeholders.",
      "Check /api/oidc/status and configure real Entra values only in iam-practice-app/.env.",
      "Phase 13 Entra OIDC"
    );
  }

  return buildAuthorizationUrl()
    .then(({ authorizationUrl, state, nonce }) => {
      req.session.oidcState = state;
      req.session.oidcNonce = nonce;
      req.session.oidcStartedAt = Math.floor(Date.now() / 1000);
      res.redirect(authorizationUrl);
    })
    .catch((error) => {
      console.error(`OIDC start failed: ${safeOidcErrorMessage(error)}`);
      return renderOidcMessage(
        res,
        500,
        "OIDC login could not start",
        "The app could not start Entra OIDC login. Check local OIDC configuration and try again.",
        "No tokens were requested, stored, or returned.",
        "Phase 13 Entra OIDC"
      );
    });
});

router.get("/auth/oidc/callback", (req, res) => {
  const status = getOidcStatus();

  if (!status.canStartLogin) {
    return renderOidcMessage(
      res,
      400,
      "OIDC callback is not active",
      "OIDC must be enabled and fully configured locally before callback handling can run.",
      "No authorization code was exchanged.",
      "Phase 13 Entra OIDC"
    );
  }

  if (!req.session.oidcState || !req.session.oidcNonce) {
    return renderOidcMessage(
      res,
      400,
      "OIDC state is missing",
      "Start OIDC login again so the app can validate the callback state.",
      "This protects the login flow from unexpected callback requests.",
      "Phase 13 Entra OIDC"
    );
  }

  return handleCallback(req)
    .then((claims) => {
      req.session.user = buildSessionUserFromClaims(claims, "entra");
      req.session.authTime = Math.floor(Date.now() / 1000);
      delete req.session.oidcState;
      delete req.session.oidcNonce;
      delete req.session.oidcStartedAt;
      recordOidcLoginSuccess(req);
      res.redirect("/dashboard");
    })
    .catch((error) => {
      console.error(`OIDC callback failed: ${safeOidcErrorMessage(error)}`);
      return renderOidcMessage(
        res,
        500,
        "OIDC callback failed",
        "The app could not complete Entra OIDC login. Check redirect URI, issuer, client settings, and try again.",
        "No raw tokens were stored or returned.",
        "Phase 13 Entra OIDC"
      );
    });
});

router.get("/auth/okta/start", (req, res) => {
  const status = getOktaOidcStatus();

  if (!status.enabled) {
    return renderOidcMessage(
      res,
      200,
      "Okta OIDC is disabled",
      "Local dummy login and Entra OIDC practice remain active. Set OKTA_OIDC_ENABLED=true in a local uncommitted .env file when you are ready to test Okta OIDC.",
      "No Okta authorization URL was built and no redirect was started.",
      "Phase 14 Okta OIDC",
      "/api/okta/status"
    );
  }

  if (!status.canStartLogin) {
    return renderOidcMessage(
      res,
      400,
      "Okta OIDC configuration is incomplete",
      "Okta OIDC is enabled, but required values are missing or still use placeholders.",
      "Check /api/okta/status and configure real Okta values only in iam-practice-app/.env.",
      "Phase 14 Okta OIDC",
      "/api/okta/status"
    );
  }

  return buildAuthorizationUrl("okta")
    .then(({ authorizationUrl, state, nonce }) => {
      req.session.oktaOidcState = state;
      req.session.oktaOidcNonce = nonce;
      req.session.oktaOidcStartedAt = Math.floor(Date.now() / 1000);
      res.redirect(authorizationUrl);
    })
    .catch((error) => {
      console.error(`Okta OIDC start failed: ${safeOidcErrorMessage(error)}`);
      return renderOidcMessage(
        res,
        500,
        "Okta OIDC login could not start",
        "The app could not start Okta OIDC login. Check local Okta OIDC configuration and try again.",
        "No tokens were requested, stored, or returned.",
        "Phase 14 Okta OIDC",
        "/api/okta/status"
      );
    });
});

router.get("/auth/okta/callback", (req, res) => {
  const status = getOktaOidcStatus();

  if (!status.canStartLogin) {
    return renderOidcMessage(
      res,
      400,
      "Okta OIDC callback is not active",
      "Okta OIDC must be enabled and fully configured locally before callback handling can run.",
      "No authorization code was exchanged.",
      "Phase 14 Okta OIDC",
      "/api/okta/status"
    );
  }

  if (!req.session.oktaOidcState || !req.session.oktaOidcNonce) {
    return renderOidcMessage(
      res,
      400,
      "Okta OIDC state is missing",
      "Start Okta OIDC login again so the app can validate the callback state.",
      "This protects the login flow from unexpected callback requests.",
      "Phase 14 Okta OIDC",
      "/api/okta/status"
    );
  }

  return handleCallback(req, "okta", {
    state: req.session.oktaOidcState,
    nonce: req.session.oktaOidcNonce
  })
    .then((claims) => {
      req.session.user = buildSessionUserFromClaims(claims, "okta");
      req.session.authTime = Math.floor(Date.now() / 1000);
      delete req.session.oktaOidcState;
      delete req.session.oktaOidcNonce;
      delete req.session.oktaOidcStartedAt;
      recordOidcLoginSuccess(req);
      res.redirect("/dashboard");
    })
    .catch((error) => {
      console.error(`Okta OIDC callback failed: ${safeOidcErrorMessage(error)}`);
      return renderOidcMessage(
        res,
        500,
        "Okta OIDC callback failed",
        "The app could not complete Okta OIDC login. Check redirect URI, issuer, client settings, and try again.",
        "No raw tokens were stored or returned.",
        "Phase 14 Okta OIDC",
        "/api/okta/status"
      );
    });
});

router.get("/auth/saml/login", (req, res) => {
  const status = getSamlStatus();

  if (status.localSimulationEnabled) {
    return renderSamlSimulationForm(res);
  }

  if (!status.enabled) {
    recordAuditEvent(
      "saml_disabled_login_attempt",
      "blocked",
      {
        reason: "saml_disabled",
        localSimulationEnabled: status.localSimulationEnabled
      },
      req
    );

    return renderSamlMessage(
      res,
      200,
      "SAML is disabled",
      "Local dummy login remains active. Set SAML_ENABLED=true only in a local uncommitted .env file when you are ready to configure SAML.",
      "No external IdP redirect was started."
    );
  }

  if (!status.canStartRealLogin) {
    return renderSamlMessage(
      res,
      400,
      "SAML configuration is incomplete",
      "SAML is enabled, but required values are missing or still use placeholders.",
      "No real SAML request was built and no external IdP was called."
    );
  }

  return renderSamlMessage(
    res,
    501,
    "Real SAML redirect is deferred",
    "The app is ready for SAML configuration learning, but production SAML redirect handling is not implemented in this phase.",
    "Use local simulation for learning, or defer real Entra/Okta setup to a later reviewed implementation."
  );
});

router.post("/auth/saml/callback", (req, res) => {
  const config = getSamlConfig();

  if (!config.localSimulationEnabled) {
    return renderSamlMessage(
      res,
      400,
      "SAML callback simulation is disabled",
      "The callback route accepts only local simulation posts when SAML_LOCAL_SIMULATION_ENABLED=true.",
      "No real SAML assertion was accepted, parsed, stored, or returned."
    );
  }

  req.session.user = buildSamlSessionUserFromAttributes({
    nameId: req.body.nameId,
    email: req.body.email,
    displayName: req.body.displayName,
    name: req.body.displayName,
    issuer: "local-saml-simulation"
  });
  req.session.authTime = Math.floor(Date.now() / 1000);
  recordAuditEvent(
    "saml_local_simulation_success",
    "success",
    {
      email: req.session.user.email,
      role: req.session.user.role,
      authSource: req.session.user.authSource
    },
    req
  );
  return res.redirect("/dashboard");
});

router.get("/saml/metadata", (req, res) => {
  const config = getSamlConfig();

  res.type("application/xml").send(`<?xml version="1.0" encoding="UTF-8"?>
<EntityDescriptor entityID="${escapeHtml(config.spEntityId)}" xmlns="urn:oasis:names:tc:SAML:2.0:metadata">
  <SPSSODescriptor AuthnRequestsSigned="false" WantAssertionsSigned="true" protocolSupportEnumeration="urn:oasis:names:tc:SAML:2.0:protocol">
    <AssertionConsumerService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST" Location="${escapeHtml(config.acsUrl)}" index="1" isDefault="true"/>
  </SPSSODescriptor>
  <!-- Local training metadata only. No certificates or private keys are embedded. -->
</EntityDescriptor>`);
});

router.post("/logout", (req, res) => {
  recordAuditEvent(
    "logout",
    "success",
    {
      email: req.session.user ? req.session.user.email : "unknown",
      authSource: req.session.user ? req.session.user.authSource || "local" : "unknown"
    },
    req
  );

  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.redirect("/login");
  });
});

module.exports = router;
