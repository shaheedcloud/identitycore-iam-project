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
    sub: user.futureClaimsPreview.subject,
    email: user.email,
    name: user.displayName,
    preferred_username: user.futureClaimsPreview.preferredUsername,
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

module.exports = {
  buildSimulatedClaims,
  buildSimulatedToken,
  buildAuthorizationCheck
};
