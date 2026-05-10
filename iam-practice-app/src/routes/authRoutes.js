const express = require("express");
const path = require("path");
const { findUserByEmail, withoutPassword } = require("../users");
const { redirectIfLoggedIn } = require("../middleware/auth");
const { getOidcStatus } = require("../oidcConfig");
const {
  buildAuthorizationUrl,
  buildSessionUserFromClaims,
  handleCallback
} = require("../oidcClient");

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

function renderOidcMessage(res, statusCode, title, message, details = "") {
  return res.status(statusCode).send(`
    <link rel="stylesheet" href="/styles.css">
    <main class="shell">
      <section class="panel">
        <p class="eyebrow">Phase 3B Entra OIDC</p>
        <h1>${escapeHtml(title)}</h1>
        <p>${escapeHtml(message)}</p>
        ${details ? `<div class="notice">${escapeHtml(details)}</div>` : ""}
        <nav class="actions">
          <a class="button" href="/login">Back to local login</a>
          <a class="button" href="/oidc-readiness">OIDC readiness</a>
          <a class="button" href="/api/oidc/status">API: OIDC status</a>
        </nav>
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
      "No authorization URL was built and no redirect was started."
    );
  }

  if (!status.canStartLogin) {
    return renderOidcMessage(
      res,
      400,
      "OIDC configuration is incomplete",
      "OIDC is enabled, but required values are missing or still use placeholders.",
      "Check /api/oidc/status and configure real Entra values only in iam-practice-app/.env."
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
      console.error(`OIDC start failed: ${error.message}`);
      return renderOidcMessage(
        res,
        500,
        "OIDC login could not start",
        "The app could not start Entra OIDC login. Check local OIDC configuration and try again.",
        "No tokens were requested, stored, or returned."
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
      "No authorization code was exchanged."
    );
  }

  if (!req.session.oidcState || !req.session.oidcNonce) {
    return renderOidcMessage(
      res,
      400,
      "OIDC state is missing",
      "Start OIDC login again so the app can validate the callback state.",
      "This protects the login flow from unexpected callback requests."
    );
  }

  return handleCallback(req)
    .then((claims) => {
      req.session.user = buildSessionUserFromClaims(claims);
      req.session.authTime = Math.floor(Date.now() / 1000);
      delete req.session.oidcState;
      delete req.session.oidcNonce;
      delete req.session.oidcStartedAt;
      res.redirect("/dashboard");
    })
    .catch((error) => {
      console.error(`OIDC callback failed: ${error.message}`);
      return renderOidcMessage(
        res,
        500,
        "OIDC callback failed",
        "The app could not complete Entra OIDC login. Check redirect URI, issuer, client settings, and try again.",
        "No raw tokens were stored or returned."
      );
    });
});

router.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.redirect("/login");
  });
});

module.exports = router;
