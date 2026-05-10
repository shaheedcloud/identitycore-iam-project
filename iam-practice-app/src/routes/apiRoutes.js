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
const { getJwtStatus } = require("../jwtConfig");
const { getScimStatus } = require("../scimConfig");
const { requireJwt } = require("../middleware/jwtAuth");
const {
  getEvents,
  getStatus,
  reset,
  simulateJoiner,
  simulateLeaver,
  simulateMover
} = require("../jmlStore");

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

router.get("/jwt/status", (req, res) => {
  res.json(getJwtStatus());
});

router.get("/scim/status", (req, res) => {
  res.json(getScimStatus());
});

router.get("/jml/status", requireAuth, (req, res) => {
  res.json(getStatus());
});

router.get("/jml/events", requireAuth, (req, res) => {
  res.json(getEvents());
});

router.post("/jml/joiner", requireAuth, (req, res) => {
  res.status(201).json(simulateJoiner(req.body));
});

router.post("/jml/mover", requireAuth, (req, res) => {
  res.status(201).json(simulateMover(req.body));
});

router.post("/jml/leaver", requireAuth, (req, res) => {
  res.status(201).json(simulateLeaver(req.body));
});

router.post("/jml/reset", requireAuth, (req, res) => {
  res.json(reset());
});

router.get("/protected/profile", requireJwt, (req, res) => {
  res.json({
    authenticatedBy: "validated_bearer_jwt",
    tokenValidated: true,
    profile: {
      sub: req.jwtUser.sub,
      name: req.jwtUser.name,
      preferred_username: req.jwtUser.preferred_username,
      email: req.jwtUser.email,
      scopes: req.jwtUser.scopes
    },
    message: "JWT issuer, audience, signature, and expiration were validated before returning this profile."
  });
});

router.get("/protected/claims", requireJwt, (req, res) => {
  res.json({
    tokenValidated: true,
    warning: "Safe decoded claims only. The raw JWT is never returned.",
    header: req.jwtHeader,
    claims: req.jwtUser
  });
});

router.get("/protected/admin-check", requireJwt, (req, res) => {
  res.json({
    tokenValidated: true,
    adminAuthorized: false,
    authorizationDeferred: true,
    message: "JWT validation succeeded, but Entra group and role claim mapping to admin access is deferred to a later approved phase.",
    observedClaims: {
      roles: req.jwtUser.roles,
      groups: req.jwtUser.groups,
      scopes: req.jwtUser.scopes
    }
  });
});

router.get("/admin/users", requireRole(["admin"]), (req, res) => {
  res.json({
    users: listUsersWithoutPasswords()
  });
});

module.exports = router;
