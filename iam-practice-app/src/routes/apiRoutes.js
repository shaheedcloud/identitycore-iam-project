const express = require("express");
const { requireAuth } = require("../middleware/auth");
const { requireRole } = require("../middleware/rbac");
const { listUsersWithoutPasswords } = require("../users");
const {
  buildAuthorizationCheck,
  buildProviderComparison,
  buildRoleMappingPractice,
  buildSimulatedClaims,
  buildSimulatedToken,
  getProviderContext
} = require("../claims");
const { getOidcStatus, getOktaOidcStatus } = require("../oidcConfig");
const { getJwtStatus } = require("../jwtConfig");
const { getScimStatus } = require("../scimConfig");
const { getUserLifecycleSummary } = require("../scimStore");
const { getGroupLifecycleSummary } = require("../scimGroupStore");
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
  getEvidenceSummary,
  getStatus,
  reset,
  simulateJoiner,
  simulateLeaver,
  simulateMover
} = require("../jmlStore");

const router = express.Router();

const awsFederationStatus = {
  awsFederationPlanned: true,
  awsConnected: false,
  awsSdkEnabled: false,
  awsCredentialsConfigured: false,
  awsAccountIdStored: false,
  realRoleArnsStored: false,
  realProviderArnsStored: false,
  cloudTrailIngestionEnabled: false,
  externalApiCallsEnabled: false,
  localOnly: true,
  phase: "Phase 20 - AWS Federation Readiness Foundation",
  learningPurpose: "Explain AWS federation concepts before real implementation.",
  safetyPrinciple: "External authentication proves identity. IdentityCore local RBAC controls IdentityCore access. AWS IAM roles and policies control AWS access.",
  placeholderValuesOnly: true,
  examplePlaceholders: [
    "ACCOUNT_ID_PLACEHOLDER",
    "ROLE_ARN_PLACEHOLDER",
    "SAML_PROVIDER_PLACEHOLDER",
    "OIDC_PROVIDER_PLACEHOLDER",
    "AWS_LAB_ACCOUNT_PLACEHOLDER"
  ]
};

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

router.get("/provider-comparison", requireAuth, (req, res) => {
  res.json(buildProviderComparison(req.session.user));
});

router.get("/role-mapping", requireAuth, (req, res) => {
  res.json(buildRoleMappingPractice(req.session.user));
});

router.get("/oidc/status", requireAuth, (req, res) => {
  res.json(getOidcStatus());
});

router.get("/okta/status", requireAuth, (req, res) => {
  res.json(getOktaOidcStatus());
});

router.get("/jwt/status", (req, res) => {
  res.json(getJwtStatus());
});

router.get("/scim/status", (req, res) => {
  res.json(getScimStatus());
});

router.get("/scim/simulator-summary", requireAuth, (req, res) => {
  res.json({
    localOnly: true,
    purpose: "Explain the local SCIM simulator without exposing bearer tokens or requiring a real provider.",
    conceptModel: {
      authentication: "Local login, OIDC, or SAML proves who signed in.",
      provisioning: "SCIM creates or updates application identity and group records.",
      authorization: "Local RBAC still decides access to protected pages and APIs.",
      lifecycle: "JML explains joiner, mover, and leaver changes.",
      audit: "Audit-style evidence explains what happened."
    },
    guardrails: {
      scimIsLogin: false,
      scimCreatesBrowserSession: false,
      scimGroupGrantsAdminAccess: false,
      realProviderProvisioningConnected: false,
      publicEndpointExposed: false,
      rbacStillEnforced: true
    },
    users: getUserLifecycleSummary(),
    groups: getGroupLifecycleSummary()
  });
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

router.get("/jml/evidence-summary", requireAuth, (req, res) => {
  res.json(getEvidenceSummary());
});

router.get("/aws-federation/status", requireAuth, (req, res) => {
  res.json(awsFederationStatus);
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
