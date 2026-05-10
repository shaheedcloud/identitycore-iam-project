const { webcrypto } = require("crypto");
const { getJwtConfig, getJwtStatus, maskValue } = require("../jwtConfig");

if (!globalThis.crypto) {
  globalThis.crypto = webcrypto;
}

let cachedJwksUri = "";
let cachedJwks = null;

function getBearerToken(req) {
  const authHeader = req.get("authorization") || "";
  const parts = authHeader.split(" ");

  if (!authHeader) {
    return {
      error: "missing_bearer_token",
      message: "This protected API requires an Authorization: Bearer <token> header."
    };
  }

  if (parts.length !== 2 || parts[0] !== "Bearer" || !parts[1]) {
    return {
      error: "invalid_authorization_header",
      message: "Use the format Authorization: Bearer <token>."
    };
  }

  if (parts[1].split(".").length !== 3) {
    return {
      error: "malformed_token",
      message: "The bearer token must have the three-part JWT format."
    };
  }

  return { token: parts[1] };
}

function normalizeArrayClaim(value) {
  if (Array.isArray(value)) {
    return value;
  }

  if (typeof value === "string" && value.trim()) {
    return value.split(" ").filter(Boolean);
  }

  return [];
}

function buildSafeClaims(payload) {
  return {
    sub: payload.sub,
    name: payload.name,
    preferred_username: payload.preferred_username,
    email: payload.email,
    roles: normalizeArrayClaim(payload.roles),
    groups: normalizeArrayClaim(payload.groups),
    scopes: normalizeArrayClaim(payload.scp),
    token_use: payload.token_use || payload.typ,
    issuedAt: payload.iat,
    expiresAt: payload.exp,
    issuer: maskValue(payload.iss || ""),
    audience: Array.isArray(payload.aud)
      ? payload.aud.map((value) => maskValue(value))
      : maskValue(payload.aud || "")
  };
}

function buildSafeHeader(header) {
  return {
    alg: header.alg,
    typ: header.typ,
    kid: maskValue(header.kid || "")
  };
}

async function getRemoteJwks(jwksUri) {
  if (!cachedJwks || cachedJwksUri !== jwksUri) {
    const { createRemoteJWKSet } = await import("jose");
    cachedJwksUri = jwksUri;
    cachedJwks = createRemoteJWKSet(new URL(jwksUri));
  }

  return cachedJwks;
}

async function requireJwt(req, res, next) {
  const bearer = getBearerToken(req);

  if (bearer.error) {
    return res.status(401).json({
      error: bearer.error,
      message: bearer.message
    });
  }

  const config = getJwtConfig();

  if (!config.canValidateTokens) {
    return res.status(503).json({
      error: "jwt_validation_not_ready",
      message: "JWT validation is disabled, incomplete, or still using placeholders. Protected APIs fail closed.",
      status: getJwtStatus()
    });
  }

  try {
    const { jwtVerify } = await import("jose");
    const jwks = await getRemoteJwks(config.jwksUri);
    const verified = await jwtVerify(bearer.token, jwks, {
      issuer: config.issuerUrl,
      audience: config.audience,
      clockTolerance: config.clockToleranceSeconds
    });

    req.jwtUser = buildSafeClaims(verified.payload);
    req.jwtHeader = buildSafeHeader(verified.protectedHeader);

    return next();
  } catch (error) {
    console.error(`JWT validation failed: ${error.message}`);

    return res.status(401).json({
      error: "invalid_token",
      message: "JWT validation failed. Check issuer, audience, signature, and expiration."
    });
  }
}

module.exports = {
  requireJwt,
  buildSafeClaims
};
