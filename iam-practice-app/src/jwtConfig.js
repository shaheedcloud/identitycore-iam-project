const placeholderValues = [
  "",
  "https://login.microsoftonline.com/REPLACE_WITH_TENANT_ID/v2.0",
  "https://login.microsoftonline.com/REPLACE_WITH_TENANT_ID/discovery/v2.0/keys",
  "api://replace-with-api-client-id"
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
    lowerValue.includes("replace_with")
  );
}

function maskValue(value) {
  if (!value) {
    return "";
  }

  if (isPlaceholder(value)) {
    return value;
  }

  if (value.length <= 12) {
    return "********";
  }

  return `${value.slice(0, 6)}...${value.slice(-6)}`;
}

function getClockToleranceSeconds(value) {
  const parsedValue = Number.parseInt(value, 10);

  if (Number.isNaN(parsedValue) || parsedValue < 0) {
    return 60;
  }

  return parsedValue;
}

function getJwtConfig() {
  const enabled = getEnvValue("JWT_VALIDATION_ENABLED", "false").toLowerCase() === "true";
  const issuerUrl = getEnvValue("JWT_ISSUER_URL", "https://login.microsoftonline.com/REPLACE_WITH_TENANT_ID/v2.0");
  const audience = getEnvValue("JWT_AUDIENCE", "api://replace-with-api-client-id");
  const jwksUri = getEnvValue("JWT_JWKS_URI", "https://login.microsoftonline.com/REPLACE_WITH_TENANT_ID/discovery/v2.0/keys");
  const clockToleranceSeconds = getClockToleranceSeconds(getEnvValue("JWT_CLOCK_TOLERANCE_SECONDS", "60"));

  const values = [issuerUrl, audience, jwksUri];
  const hasPlaceholderValues = values.some(isPlaceholder);
  const missingFields = [];

  if (!issuerUrl) missingFields.push("JWT_ISSUER_URL");
  if (!audience) missingFields.push("JWT_AUDIENCE");
  if (!jwksUri) missingFields.push("JWT_JWKS_URI");

  return {
    enabled,
    issuerUrl,
    audience,
    jwksUri,
    clockToleranceSeconds,
    hasPlaceholderValues,
    missingFields,
    isComplete: missingFields.length === 0,
    canValidateTokens: enabled && missingFields.length === 0 && !hasPlaceholderValues
  };
}

function getJwtStatus() {
  const config = getJwtConfig();

  return {
    localOnly: true,
    activeJwtValidation: config.canValidateTokens,
    message: config.enabled
      ? "JWT validation is enabled. Protected APIs validate only when required fields are complete and not placeholders."
      : "JWT validation is disabled. Protected JWT endpoints fail closed.",
    enabled: config.enabled,
    issuerUrl: maskValue(config.issuerUrl),
    audience: maskValue(config.audience),
    jwksUri: maskValue(config.jwksUri),
    clockToleranceSeconds: config.clockToleranceSeconds,
    hasPlaceholderValues: config.hasPlaceholderValues,
    missingFields: config.missingFields,
    isComplete: config.isComplete,
    canValidateTokens: config.canValidateTokens,
    warning: "Safe status only. Secrets and raw JWTs are never returned."
  };
}

module.exports = {
  getJwtConfig,
  getJwtStatus,
  maskValue
};
