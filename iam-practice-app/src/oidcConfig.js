const placeholderValues = [
  "",
  "https://idp.example.local/identitycore",
  "https://login.microsoftonline.com/REPLACE_WITH_TENANT_ID/v2.0",
  "https://login.microsoftonline.com/YOUR_TENANT_ID/v2.0",
  "replace-with-local-client-id",
  "replace-with-local-client-secret",
  "replace-with-entra-app-client-id",
  "replace-with-entra-client-secret",
  "YOUR_CLIENT_ID",
  "YOUR_CLIENT_SECRET"
];

function getEnvValue(name, fallback = "") {
  return (process.env[name] || fallback).trim();
}

function isPlaceholder(value) {
  const lowerValue = value.toLowerCase();

  return (
    placeholderValues.includes(value) ||
    lowerValue.includes("example.local") ||
    lowerValue.includes("replace-with") ||
    lowerValue.includes("replace_with") ||
    lowerValue.includes("your_tenant_id") ||
    lowerValue.includes("your_client_id") ||
    lowerValue.includes("your_client_secret")
  );
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
  const providerName = getEnvValue("OIDC_PROVIDER_NAME", "Microsoft Entra ID Lab");
  const issuerUrl = getEnvValue("OIDC_ISSUER_URL", "https://login.microsoftonline.com/YOUR_TENANT_ID/v2.0");
  const clientId = getEnvValue("OIDC_CLIENT_ID", "YOUR_CLIENT_ID");
  const clientSecret = getEnvValue("OIDC_CLIENT_SECRET", "YOUR_CLIENT_SECRET");
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
    isComplete: missingFields.length === 0,
    canStartLogin: enabled && missingFields.length === 0 && !hasPlaceholderValues
  };
}

function getOidcStatus() {
  const config = getOidcConfig();

  return {
    localOnly: true,
    activeRealOidcLogin: config.canStartLogin,
    message: config.enabled
      ? "OIDC is enabled. Login starts only when required fields are complete and not placeholders."
      : "OIDC is disabled. Local dummy login remains active.",
    enabled: config.enabled,
    providerName: config.providerName,
    redirectUri: config.redirectUri,
    scopes: config.scopes,
    issuerUrl: maskValue(config.issuerUrl),
    clientId: maskValue(config.clientId),
    clientSecretConfigured: Boolean(config.clientSecret),
    hasPlaceholderValues: config.hasPlaceholderValues,
    missingFields: config.missingFields,
    isComplete: config.isComplete,
    canStartLogin: config.canStartLogin,
    warning: "Safe status only. Client secrets and tokens are never returned."
  };
}

module.exports = {
  getOidcConfig,
  getOidcStatus,
  getSafeOidcStatus: getOidcStatus
};
