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

function normalizeArray(value) {
  if (Array.isArray(value)) {
    return value;
  }

  if (typeof value === "string" && value.length > 0) {
    return [value];
  }

  return [];
}

function buildSessionUserFromClaims(claims) {
  return {
    id: claims.sub,
    email: claims.email || claims.preferred_username || "unknown@example.local",
    displayName: claims.name || claims.preferred_username || "OIDC User",
    role: "standard_user",
    department: "OIDC Authenticated",
    jobTitle: "OIDC User",
    userType: "external_oidc",
    authSource: "oidc",
    groups: normalizeArray(claims.groups),
    oidcClaims: {
      sub: claims.sub,
      name: claims.name,
      preferred_username: claims.preferred_username,
      email: claims.email,
      roles: normalizeArray(claims.roles),
      groups: normalizeArray(claims.groups),
      iss: claims.iss,
      aud: claims.aud
    }
  };
}

module.exports = {
  buildAuthorizationUrl,
  buildSessionUserFromClaims,
  handleCallback
};
