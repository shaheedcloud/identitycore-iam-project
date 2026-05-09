const express = require("express");
const path = require("path");
const { findUserByEmail, withoutPassword } = require("../users");
const { redirectIfLoggedIn } = require("../middleware/auth");

const router = express.Router();
const viewsPath = path.join(__dirname, "..", "views");

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

router.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.redirect("/login");
  });
});

module.exports = router;
