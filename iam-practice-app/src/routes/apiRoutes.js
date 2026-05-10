const express = require("express");
const { requireAuth } = require("../middleware/auth");
const { requireRole } = require("../middleware/rbac");
const { listUsersWithoutPasswords } = require("../users");
const {
  buildAuthorizationCheck,
  buildSimulatedClaims,
  buildSimulatedToken
} = require("../claims");
const { getOidcStatus } = require("../oidcConfig");

const router = express.Router();

router.get("/me", requireAuth, (req, res) => {
  res.json({
    authenticated: true,
    user: req.session.user
  });
});

router.get("/debug/session", requireAuth, (req, res) => {
  res.json({
    localOnly: true,
    purpose: "Troubleshoot the Phase 1 Express session without exposing passwords or secrets.",
    session: {
      id: req.sessionID,
      cookie: {
        httpOnly: req.session.cookie.httpOnly,
        sameSite: req.session.cookie.sameSite,
        secure: req.session.cookie.secure || false
      },
      user: req.session.user
    }
  });
});

router.get("/claims", requireAuth, (req, res) => {
  res.json({
    localOnly: true,
    warning: "Simulated claims only. These are not from a real identity provider.",
    claims: buildSimulatedClaims(req.session.user, req.session.authTime)
  });
});

router.get("/token-simulation", requireAuth, (req, res) => {
  res.json(buildSimulatedToken(req.session.user, req.session.authTime));
});

router.get("/claims/authorization-check", requireAuth, (req, res) => {
  res.json(buildAuthorizationCheck(req.session.user, req.session.authTime));
});

router.get("/oidc/status", requireAuth, (req, res) => {
  res.json(getOidcStatus());
});

// Later JWT phases can add token validation middleware before protected API handlers.
router.get("/admin/users", requireRole(["admin"]), (req, res) => {
  res.json({
    users: listUsersWithoutPasswords()
  });
});

module.exports = router;
