const express = require("express");
const { requireAuth } = require("../middleware/auth");
const { requireRole } = require("../middleware/rbac");
const { listUsersWithoutPasswords } = require("../users");

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

// Later JWT phases can add token validation middleware before protected API handlers.
router.get("/admin/users", requireRole(["admin"]), (req, res) => {
  res.json({
    users: listUsersWithoutPasswords()
  });
});

module.exports = router;
