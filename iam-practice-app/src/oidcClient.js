const { Issuer, generators } = require("openid-client");
const { getOidcConfig } = require("./oidcConfig");

let cachedIssuer;
let cachedIssuerUrl;

async function getClient() {
  const config = getOidcConfig();

  if (!config.canStartLogin) {
    throw new Error("OIDC is disabled, incomplete, or still using placeholder values.");
  }

  if (!cachedIssuer || cachedIssuerUrl !== config.issuerUrl) {
    cachedIssuer = await Issuer.discover(config.issuerUrl);
    cachedIssuerUrl = config.issuerUrl;
  }

  const client = new cachedIssuer.Client({
    client_id: config.clientId,
    client_secret: config.clientSecret,
    redirect_uris: [config.redirectUri],
    response_types: ["code"]
  });

  return { client, config };
}

async function buildAuthorizationUrl() {
  const { client, config } = await getClient();
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

async function handleCallback(req) {
  const { client, config } = await getClient();
  const params = client.callbackParams(req);
  const oidcResponse = await client.callback(config.redirectUri, params, {
    state: req.session.oidcState,
    nonce: req.session.oidcNonce
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
    authorizationMapping: "External Entra claims are not mapped to privileged local roles in Phase 13."
  };
}

function buildSessionUserFromClaims(claims) {
  const config = getOidcConfig();
  const safeClaimSummary = buildSafeClaimSummary(claims, config.providerName);

  return {
    id: "oidc-local-practice-user",
    email: "oidc-user@identitycore.local",
    displayName: "OIDC Authenticated User",
    role: "standard_user",
    department: "OIDC Authenticated",
    jobTitle: "Entra OIDC Local Practice User",
    userType: "external_oidc",
    authSource: "oidc",
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
