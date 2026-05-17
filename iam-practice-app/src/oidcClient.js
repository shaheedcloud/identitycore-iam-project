const { Issuer, generators } = require("openid-client");
const { getProviderConfig } = require("./oidcConfig");

const issuerCache = new Map();

async function getClient(providerKey = "entra") {
  const config = getProviderConfig(providerKey);

  if (!config.canStartLogin) {
    throw new Error("OIDC is disabled, incomplete, or still using placeholder values.");
  }

  if (!issuerCache.has(config.issuerUrl)) {
    issuerCache.set(config.issuerUrl, await Issuer.discover(config.issuerUrl));
  }

  const cachedIssuer = issuerCache.get(config.issuerUrl);
  const client = new cachedIssuer.Client({
    client_id: config.clientId,
    client_secret: config.clientSecret,
    redirect_uris: [config.redirectUri],
    response_types: ["code"]
  });

  return { client, config };
}

async function buildAuthorizationUrl(providerKey = "entra") {
  const { client, config } = await getClient(providerKey);
  const state = generators.state();
  const nonce = generators.nonce();
  const authorizationUrl = client.authorizationUrl({
    scope: config.scopes || "openid profile email",
    state,
    nonce
  });

  return {
    authorizationUrl,
    state,
    nonce
  };
}

async function handleCallback(req, providerKey = "entra", expected = {}) {
  const { client, config } = await getClient(providerKey);
  const params = client.callbackParams(req);
  const oidcResponse = await client.callback(config.redirectUri, params, {
    state: expected.state || req.session.oidcState,
    nonce: expected.nonce || req.session.oidcNonce
  });

  return oidcResponse.claims();
}

function hasValue(value) {
  return Array.isArray(value) ? value.length > 0 : Boolean(value);
}

function describeIssuer(value) {
  if (!value) {
    return "not present";
  }

  try {
    const issuerUrl = new URL(value);
    return `${issuerUrl.hostname}/...`;
  } catch (error) {
    return "present";
  }
}

function buildSafeClaimSummary(claims, providerName) {
  return {
    providerName,
    subjectPresent: hasValue(claims.sub),
    preferredUsernamePresent: hasValue(claims.preferred_username),
    displayNamePresent: hasValue(claims.name),
    emailPresent: hasValue(claims.email),
    issuer: describeIssuer(claims.iss),
    audiencePresent: hasValue(claims.aud),
    authenticationMethodReferencePresent: hasValue(claims.amr),
    rolesClaimPresent: hasValue(claims.roles),
    groupsClaimPresent: hasValue(claims.groups),
    rawTokensStored: false,
    rawClaimsStored: false,
    externalClaimsMappedToAdmin: false,
    authorizationMapping: "External OIDC claims are not mapped to privileged local roles in this phase."
  };
}

function buildSessionUserFromClaims(claims, providerKey = "entra") {
  const config = getProviderConfig(providerKey);
  const safeClaimSummary = buildSafeClaimSummary(claims, config.providerName);

  return {
    id: `${providerKey}-oidc-local-practice-user`,
    email: `${providerKey}-oidc-user@identitycore.local`,
    displayName: "OIDC Authenticated User",
    role: "standard_user",
    department: "OIDC Authenticated",
    jobTitle: `${config.providerName} OIDC Local Practice User`,
    userType: "external_oidc",
    authSource: "oidc",
    authProviderType: providerKey,
    authProvider: config.providerName,
    groups: [],
    oidcSafeClaimSummary: safeClaimSummary
  };
}

module.exports = {
  buildAuthorizationUrl,
  buildSafeClaimSummary,
  buildSessionUserFromClaims,
  handleCallback
};
