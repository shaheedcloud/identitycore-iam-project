const SIMULATED_ISSUER = "https://idp.example.local/identitycore";
const SIMULATED_AUDIENCE = "identitycore-practice-app";

const routePolicies = [
  {
    route: "/admin",
    label: "Admin page",
    allowedRoles: ["admin"],
    allowedGroups: ["GRP-Identity-Admins"]
  },
  {
    route: "/security",
    label: "Security analyst page",
    allowedRoles: ["admin", "security_analyst"],
    allowedGroups: ["GRP-Identity-Admins", "GRP-Security-Analysts"]
  },
  {
    route: "/finance",
    label: "Finance page",
    allowedRoles: ["admin", "finance_user"],
    allowedGroups: ["GRP-Identity-Admins", "GRP-Finance-Users"]
  }
];

function nowInSeconds() {
  return Math.floor(Date.now() / 1000);
}

function buildSimulatedClaims(user, authTime) {
  const issuedAt = nowInSeconds();

  return {
    sub: user.futureClaimsPreview ? user.futureClaimsPreview.subject : user.id,
    email: user.email,
    name: user.displayName,
    preferred_username: user.futureClaimsPreview
      ? user.futureClaimsPreview.preferredUsername
      : user.email,
    roles: [user.role],
    groups: user.groups,
    department: user.department,
    jobTitle: user.jobTitle,
    userType: user.userType,
    auth_time: authTime || issuedAt,
    iss: SIMULATED_ISSUER,
    aud: SIMULATED_AUDIENCE,
    iat: issuedAt,
    exp: issuedAt + 3600,
    token_use: "simulated_id_token"
  };
}

function buildSimulatedToken(user, authTime) {
  return {
    warning: "Local training object only. This is not a real JWT, is not signed, and must not be trusted.",
    header: {
      alg: "none",
      typ: "SIMULATED_JWT"
    },
    payload: buildSimulatedClaims(user, authTime),
    signature: "not-used-local-simulation"
  };
}

function checkPolicyAccess(claims, policy) {
  const matchingRoles = claims.roles.filter((role) => policy.allowedRoles.includes(role));
  const matchingGroups = claims.groups.filter((group) => policy.allowedGroups.includes(group));
  const allowed = matchingRoles.length > 0 || matchingGroups.length > 0;

  return {
    route: policy.route,
    label: policy.label,
    allowed,
    matchedRoles: matchingRoles,
    matchedGroups: matchingGroups,
    explanation: allowed
      ? "Access allowed because at least one role or group claim matches the route policy."
      : "Access denied because no role or group claim matches the route policy."
  };
}

function buildAuthorizationCheck(user, authTime) {
  const claims = buildSimulatedClaims(user, authTime);

  return {
    localOnly: true,
    summary: "This explains simulated claim-based authorization decisions for Phase 2.",
    claimsUsed: {
      roles: claims.roles,
      groups: claims.groups,
      department: claims.department,
      jobTitle: claims.jobTitle
    },
    decisions: routePolicies.map((policy) => checkPolicyAccess(claims, policy))
  };
}

function getProviderContext(user) {
  if (!user || user.authSource !== "oidc") {
    return {
      authSource: user && user.authSource ? user.authSource : "local",
      providerName: "Local dummy login",
      externalClaimsMappedToAdmin: false,
      localRole: user && user.role ? user.role : "unknown",
      roleSource: "Local dummy user object"
    };
  }

  return {
    authSource: "oidc",
    authProviderType: user.authProviderType || "entra",
    providerName: user.authProvider || "Microsoft Entra ID Lab",
    externalClaimsMappedToAdmin: false,
    localRole: user.role,
    roleSource: "Safe default OIDC mapping",
    safeClaimSummary: user.oidcSafeClaimSummary || {}
  };
}

function boolLabel(value) {
  return value ? "yes" : "no";
}

function buildCurrentProviderComparison(user) {
  const providerContext = getProviderContext(user);
  const isExternalOidc = providerContext.authSource === "oidc";
  const safeSummary = providerContext.safeClaimSummary || {};

  return {
    providerName: providerContext.providerName,
    providerType: providerContext.authProviderType || "local",
    authenticationSource: isExternalOidc ? "External OIDC provider" : "Local app session",
    subjectClaim: isExternalOidc ? boolLabel(safeSummary.subjectPresent) : "simulated/local",
    usernameOrEmail: isExternalOidc ? boolLabel(safeSummary.emailPresent || safeSummary.preferredUsernamePresent) : "local test user",
    displayName: isExternalOidc ? boolLabel(safeSummary.displayNamePresent) : "local test user",
    issuer: isExternalOidc ? (safeSummary.issuer || "present if returned") : "simulated/local",
    audience: isExternalOidc ? boolLabel(safeSummary.audiencePresent) : "simulated/local",
    groupsClaim: isExternalOidc ? boolLabel(safeSummary.groupsClaimPresent) : "local training groups",
    localRole: providerContext.localRole,
    localRoleSource: providerContext.roleSource,
    adminAccess: providerContext.localRole === "admin" ? "local RBAC allow" : "not automatic",
    externalClaimsMappedToAdmin: false,
    rawTokensStored: false,
    rawTokensDisplayed: false
  };
}

function buildProviderComparison(user) {
  return {
    localOnly: true,
    purpose: "Compare safe identity-provider indicators without exposing raw tokens, secrets, or raw external claims.",
    currentSession: buildCurrentProviderComparison(user),
    comparisonModel: [
      {
        field: "Provider",
        localDummyLogin: "Local simulator",
        entraOidc: "Microsoft Entra ID Lab",
        oktaOidc: "Okta Lab"
      },
      {
        field: "Authentication source",
        localDummyLogin: "Local app session",
        entraOidc: "External OIDC provider",
        oktaOidc: "External OIDC provider"
      },
      {
        field: "Subject claim",
        localDummyLogin: "Simulated/local",
        entraOidc: "Present if returned",
        oktaOidc: "Present if returned"
      },
      {
        field: "Username/email",
        localDummyLogin: "Local test user",
        entraOidc: "Present if returned",
        oktaOidc: "Present if returned"
      },
      {
        field: "Display name",
        localDummyLogin: "Local test user",
        entraOidc: "Present if returned",
        oktaOidc: "Present if returned"
      },
      {
        field: "Issuer",
        localDummyLogin: "Simulated/local",
        entraOidc: "Masked/presence only",
        oktaOidc: "Masked/presence only"
      },
      {
        field: "Audience",
        localDummyLogin: "Simulated/local",
        entraOidc: "Present if returned",
        oktaOidc: "Present if returned"
      },
      {
        field: "Groups claim",
        localDummyLogin: "Local training groups",
        entraOidc: "Present only if configured",
        oktaOidc: "Present only if configured"
      },
      {
        field: "Local role source",
        localDummyLogin: "Local dummy user object",
        entraOidc: "Safe default OIDC mapping",
        oktaOidc: "Safe default OIDC mapping"
      },
      {
        field: "Admin access",
        localDummyLogin: "Local RBAC only",
        entraOidc: "Not automatic",
        oktaOidc: "Not automatic"
      },
      {
        field: "Raw tokens stored",
        localDummyLogin: "false",
        entraOidc: "false",
        oktaOidc: "false"
      },
      {
        field: "Raw tokens displayed",
        localDummyLogin: "false",
        entraOidc: "false",
        oktaOidc: "false"
      }
    ],
    mappingGuardrails: {
      safeRule: "External authentication proves identity. Local authorization decides access.",
      allowedFuturePattern: "Provider claim -> explicit allowlisted mapping -> local role -> RBAC decision",
      forbiddenPattern: "Any external claim or group -> automatic admin access",
      localRbacRemainsAuthoritative: true,
      automaticExternalAdminMappingEnabled: false
    }
  };
}

module.exports = {
  buildSimulatedClaims,
  buildSimulatedToken,
  buildAuthorizationCheck,
  getProviderContext,
  buildProviderComparison
};
