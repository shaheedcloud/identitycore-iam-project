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

router.get("/admin/users", requireRole(["admin"]), (req, res) => {
  res.json({
    users: listUsersWithoutPasswords()
  });
});

module.exports = router;
