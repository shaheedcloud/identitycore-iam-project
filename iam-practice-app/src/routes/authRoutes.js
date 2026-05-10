const express = require("express");
const path = require("path");
const { findUserByEmail, withoutPassword } = require("../users");
const { redirectIfLoggedIn } = require("../middleware/auth");
const { getSafeOidcStatus } = require("../oidcConfig");

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
  const status = getSafeOidcStatus();

  res.status(200).send(`
    <link rel="stylesheet" href="/styles.css">
    <main class="shell">
      <section class="panel">
        <p class="eyebrow">Phase 3A placeholder</p>
        <h1>OIDC is not active yet</h1>
        <p>Future real OIDC login will redirect to an identity provider authorization endpoint. Phase 3A only documents where that redirect will eventually happen.</p>
        <p>Current provider label: <strong>${escapeHtml(status.providerName)}</strong></p>
        <p>Current status: <strong>${escapeHtml(status.message)}</strong></p>
        <div class="notice">No authorization URL was built, no redirect was started, and no real provider metadata or tokens were used.</div>
        <nav class="actions">
          <a class="button" href="/login">Back to local login</a>
          <a class="button" href="/oidc-readiness">OIDC readiness</a>
          <a class="button" href="/api/oidc/status">API: OIDC status</a>
        </nav>
      </section>
    </main>
  `);
});

router.get("/auth/oidc/callback", (req, res) => {
  res.status(200).send(`
    <link rel="stylesheet" href="/styles.css">
    <main class="shell">
      <section class="panel">
        <p class="eyebrow">Phase 3A placeholder</p>
        <h1>OIDC callback placeholder</h1>
        <p>A future OIDC authorization-code callback will be handled here after Entra ID or Okta redirects back to the app.</p>
        <p>Phase 3A does not exchange authorization codes, request tokens, validate JWTs, or store token data.</p>
        <a class="button" href="/login">Back to local login</a>
      </section>
    </main>
  `);
});

router.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.redirect("/login");
  });
});

module.exports = router;
