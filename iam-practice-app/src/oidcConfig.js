const placeholderValues = [
  "",
  "https://idp.example.local/identitycore",
  "replace-with-local-client-id",
  "replace-with-local-client-secret"
];

function getEnvValue(name, fallback = "") {
  return process.env[name] || fallback;
}

function isPlaceholder(value) {
  return placeholderValues.includes(value) || value.includes("example.local") || value.includes("replace-with");
}

function maskValue(value) {
  if (!value) {
    return "";
  }

  if (isPlaceholder(value)) {
    return value;
  }

  if (value.length <= 8) {
    return "********";
  }

  return `${value.slice(0, 4)}...${value.slice(-4)}`;
}

function getOidcConfig() {
  const enabled = getEnvValue("OIDC_ENABLED", "false").toLowerCase() === "true";
  const providerName = getEnvValue("OIDC_PROVIDER_NAME", "Example Identity Provider");
  const issuerUrl = getEnvValue("OIDC_ISSUER_URL", "https://idp.example.local/identitycore");
  const clientId = getEnvValue("OIDC_CLIENT_ID", "replace-with-local-client-id");
  const clientSecret = getEnvValue("OIDC_CLIENT_SECRET", "replace-with-local-client-secret");
  const redirectUri = getEnvValue("OIDC_REDIRECT_URI", "http://localhost:3000/auth/oidc/callback");
  const scopes = getEnvValue("OIDC_SCOPES", "openid profile email");

  const values = [issuerUrl, clientId, clientSecret, redirectUri, scopes];
  const hasPlaceholderValues = values.some(isPlaceholder);
  const missingFields = [];

  if (!issuerUrl) missingFields.push("OIDC_ISSUER_URL");
  if (!clientId) missingFields.push("OIDC_CLIENT_ID");
  if (!clientSecret) missingFields.push("OIDC_CLIENT_SECRET");
  if (!redirectUri) missingFields.push("OIDC_REDIRECT_URI");
  if (!scopes) missingFields.push("OIDC_SCOPES");

  return {
    enabled,
    providerName,
    issuerUrl,
    clientId,
    clientSecret,
    redirectUri,
    scopes,
    hasPlaceholderValues,
    missingFields,
    configured: enabled && missingFields.length === 0 && !hasPlaceholderValues
  };
}

function getSafeOidcStatus() {
  const config = getOidcConfig();

  return {
    localOnly: true,
    activeRealOidcLogin: false,
    message: config.enabled
      ? "OIDC is marked enabled, but Phase 3A does not perform real OIDC login."
      : "OIDC is disabled. Local dummy login remains active.",
    enabled: config.enabled,
    providerName: config.providerName,
    redirectUri: config.redirectUri,
    scopes: config.scopes,
    issuerUrl: maskValue(config.issuerUrl),
    clientId: maskValue(config.clientId),
    clientSecret: config.clientSecret ? "********" : "",
    hasPlaceholderValues: config.hasPlaceholderValues,
    missingFields: config.missingFields,
    configuredForFutureUse: config.configured,
    warning: "Safe status only. No real discovery, authorization redirect, token exchange, or JWT validation is performed."
  };
}

module.exports = {
  getOidcConfig,
  getSafeOidcStatus
};
