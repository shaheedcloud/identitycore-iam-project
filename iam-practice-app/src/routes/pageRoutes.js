const express = require("express");
const path = require("path");
const { requireAuth } = require("../middleware/auth");
const { requireRole } = require("../middleware/rbac");

const router = express.Router();
const viewsPath = path.join(__dirname, "..", "views");

router.get("/", (req, res) => {
  if (req.session.user) {
    return res.redirect("/dashboard");
  }

  return res.redirect("/login");
});

router.get("/dashboard", requireAuth, (req, res) => {
  res.sendFile(path.join(viewsPath, "dashboard.html"));
});

router.get("/claims", requireAuth, (req, res) => {
  res.sendFile(path.join(viewsPath, "claims.html"));
});

router.get("/oidc-readiness", requireAuth, (req, res) => {
  res.sendFile(path.join(viewsPath, "oidc-readiness.html"));
});

router.get("/jwt-readiness", requireAuth, (req, res) => {
  res.sendFile(path.join(viewsPath, "jwt-readiness.html"));
});

router.get("/scim-readiness", requireAuth, (req, res) => {
  res.sendFile(path.join(viewsPath, "scim-readiness.html"));
});

router.get("/jml-readiness", requireAuth, (req, res) => {
  res.sendFile(path.join(viewsPath, "jml-readiness.html"));
});

router.get("/saml-readiness", requireAuth, (req, res) => {
  res.sendFile(path.join(viewsPath, "saml-readiness.html"));
});

router.get("/audit-readiness", requireAuth, (req, res) => {
  res.sendFile(path.join(viewsPath, "audit-readiness.html"));
});

router.get("/admin", requireRole(["admin"]), (req, res) => {
  res.sendFile(path.join(viewsPath, "admin.html"));
});

router.get("/security", requireRole(["admin", "security_analyst"]), (req, res) => {
  res.sendFile(path.join(viewsPath, "security.html"));
});

router.get("/finance", requireRole(["admin", "finance_user"]), (req, res) => {
  res.sendFile(path.join(viewsPath, "finance.html"));
});

router.get("/access-denied", requireAuth, (req, res) => {
  res.status(403).sendFile(path.join(viewsPath, "access-denied.html"));
});

module.exports = router;
