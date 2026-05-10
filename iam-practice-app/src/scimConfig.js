const placeholderValues = [
  "",
  "replace-with-local-scim-bearer-token"
];

function getEnvValue(name, fallback = "") {
  return (process.env[name] || fallback).trim();
}

function isPlaceholder(value) {
  const lowerValue = value.toLowerCase();

  return (
    placeholderValues.includes(value) ||
    lowerValue.includes("replace-with") ||
    lowerValue.includes("replace_with")
  );
}

function getScimConfig() {
  const enabled = getEnvValue("SCIM_ENABLED", "false").toLowerCase() === "true";
  const bearerToken = getEnvValue("SCIM_BEARER_TOKEN", "replace-with-local-scim-bearer-token");
  const baseUrl = getEnvValue("SCIM_BASE_URL", "http://localhost:3000/scim/v2");

  const missingFields = [];
  if (!bearerToken) missingFields.push("SCIM_BEARER_TOKEN");
  if (!baseUrl) missingFields.push("SCIM_BASE_URL");

  const hasPlaceholderValues = [bearerToken].some(isPlaceholder);

  return {
    enabled,
    bearerToken,
    baseUrl,
    hasPlaceholderValues,
    missingFields,
    isComplete: missingFields.length === 0,
    canProvisionUsers: enabled && missingFields.length === 0 && !hasPlaceholderValues
  };
}

function getScimStatus() {
  const config = getScimConfig();

  return {
    localOnly: true,
    activeScimProvisioning: config.canProvisionUsers,
    message: config.enabled
      ? "SCIM is enabled. User endpoints accept provisioning requests only when the bearer token is configured and not a placeholder."
      : "SCIM is disabled. User provisioning endpoints fail closed.",
    enabled: config.enabled,
    baseUrl: config.baseUrl,
    bearerTokenConfigured: Boolean(config.bearerToken),
    hasPlaceholderValues: config.hasPlaceholderValues,
    missingFields: config.missingFields,
    isComplete: config.isComplete,
    canProvisionUsers: config.canProvisionUsers,
    warning: "Safe status only. SCIM bearer tokens are never returned."
  };
}

module.exports = {
  getScimConfig,
  getScimStatus
};
