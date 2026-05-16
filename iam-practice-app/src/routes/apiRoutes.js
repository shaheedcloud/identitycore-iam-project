const express = require("express");
const { requireAuth } = require("../middleware/auth");
const { requireRole } = require("../middleware/rbac");
const { listUsersWithoutPasswords } = require("../users");
const {
  buildAuthorizationCheck,
  buildSimulatedClaims,
  buildSimulatedToken,
  getProviderContext
} = require("../claims");
const { getOidcStatus } = require("../oidcConfig");
const { getJwtStatus } = require("../jwtConfig");
const { getScimStatus } = require("../scimConfig");
const { getSamlStatus } = require("../samlConfig");
const { requireJwt } = require("../middleware/jwtAuth");
const {
  getAuditEvents,
  getAuditStatus,
  getTroubleshootingEvidence,
  recordAuditEvent,
  resetAuditEvents
} = require("../auditStore");
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
    providerContext: getProviderContext(req.session.user),
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

router.get("/saml/status", (req, res) => {
  res.json(getSamlStatus());
});

router.get("/audit/status", requireAuth, (req, res) => {
  res.json(getAuditStatus());
});

router.get("/audit/events", requireAuth, (req, res) => {
  res.json(getAuditEvents());
});

router.post("/audit/reset", requireAuth, (req, res) => {
  res.json(resetAuditEvents());
});

router.get("/troubleshooting/evidence", requireAuth, (req, res) => {
  res.json(getTroubleshootingEvidence());
});

router.get("/jml/status", requireAuth, (req, res) => {
  res.json(getStatus());
});

router.get("/jml/events", requireAuth, (req, res) => {
  res.json(getEvents());
});

router.post("/jml/joiner", requireAuth, (req, res) => {
  const event = simulateJoiner(req.body);
  recordAuditEvent(
    "jml_joiner",
    "success",
    {
      identityId: event.identity.id,
      email: event.identity.email,
      department: event.identity.department,
      evidenceActions: event.evidence.map((item) => item.action)
    },
    req
  );
  res.status(201).json(event);
});

router.post("/jml/mover", requireAuth, (req, res) => {
  const event = simulateMover(req.body);
  recordAuditEvent(
    "jml_mover",
    "success",
    {
      identityId: event.identity.id,
      email: event.identity.email,
      department: event.identity.department,
      evidenceActions: event.evidence.map((item) => item.action)
    },
    req
  );
  res.status(201).json(event);
});

router.post("/jml/leaver", requireAuth, (req, res) => {
  const event = simulateLeaver(req.body);
  recordAuditEvent(
    "jml_leaver",
    "success",
    {
      identityId: event.identity.id,
      email: event.identity.email,
      active: event.identity.active,
      evidenceActions: event.evidence.map((item) => item.action)
    },
    req
  );
  res.status(201).json(event);
});

router.post("/jml/reset", requireAuth, (req, res) => {
  const result = reset();
  recordAuditEvent(
    "jml_reset",
    "success",
    {
      reset: result.reset,
      detail: result.detail
    },
    req
  );
  res.json(result);
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
