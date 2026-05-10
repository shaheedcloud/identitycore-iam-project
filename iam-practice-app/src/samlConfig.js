const placeholderValues = [
  "",
  "https://idp.example.local/saml/sso",
  "https://idp.example.local/saml/entity",
  "replace-with-local-saml-idp-certificate"
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

function getSamlConfig() {
  const enabled = getEnvValue("SAML_ENABLED", "false").toLowerCase() === "true";
  const localSimulationEnabled = getEnvValue("SAML_LOCAL_SIMULATION_ENABLED", "false").toLowerCase() === "true";
  const providerName = getEnvValue("SAML_PROVIDER_NAME", "Example SAML Identity Provider");
  const idpSsoUrl = getEnvValue("SAML_IDP_SSO_URL", "https://idp.example.local/saml/sso");
  const idpEntityId = getEnvValue("SAML_IDP_ENTITY_ID", "https://idp.example.local/saml/entity");
  const spEntityId = getEnvValue("SAML_SP_ENTITY_ID", "http://localhost:3000/saml/metadata");
  const acsUrl = getEnvValue("SAML_ACS_URL", "http://localhost:3000/auth/saml/callback");
  const idpCertificate = getEnvValue("SAML_IDP_CERTIFICATE", "replace-with-local-saml-idp-certificate");

  const missingFields = [];
  if (!idpSsoUrl) missingFields.push("SAML_IDP_SSO_URL");
  if (!idpEntityId) missingFields.push("SAML_IDP_ENTITY_ID");
  if (!spEntityId) missingFields.push("SAML_SP_ENTITY_ID");
  if (!acsUrl) missingFields.push("SAML_ACS_URL");
  if (!idpCertificate) missingFields.push("SAML_IDP_CERTIFICATE");

  const hasPlaceholderValues = [idpSsoUrl, idpEntityId, idpCertificate].some(isPlaceholder);

  return {
    enabled,
    localSimulationEnabled,
    providerName,
    idpSsoUrl,
    idpEntityId,
    spEntityId,
    acsUrl,
    idpCertificate,
    hasPlaceholderValues,
    missingFields,
    isComplete: missingFields.length === 0,
    canStartRealLogin: enabled && missingFields.length === 0 && !hasPlaceholderValues
  };
}

function getSamlStatus() {
  const config = getSamlConfig();

  return {
    localOnly: true,
    activeRealSamlLogin: false,
    realSamlConfigReady: config.canStartRealLogin,
    localSimulationEnabled: config.localSimulationEnabled,
    message: config.enabled
      ? "SAML is enabled. Real SAML login can start only when required values are complete and not placeholders."
      : "SAML is disabled. Local dummy login remains active.",
    enabled: config.enabled,
    providerName: config.providerName,
    idpSsoUrl: maskValue(config.idpSsoUrl),
    idpEntityId: maskValue(config.idpEntityId),
    spEntityId: config.spEntityId,
    acsUrl: config.acsUrl,
    idpCertificateConfigured: Boolean(config.idpCertificate),
    idpCertificateReturned: false,
    hasPlaceholderValues: config.hasPlaceholderValues,
    missingFields: config.missingFields,
    isComplete: config.isComplete,
    canStartRealLogin: config.canStartRealLogin,
    warning: "Safe status only. Certificate values, assertions, private keys, and tokens are never returned."
  };
}

function buildSamlSessionUserFromAttributes(attributes = {}) {
  const email = attributes.email || attributes.nameId || "saml.user@identitycore.local";
  const displayName = attributes.displayName || attributes.name || email;

  return {
    id: attributes.nameId || email,
    email,
    displayName,
    role: "standard_user",
    department: "SAML Authenticated",
    jobTitle: "SAML User",
    userType: "external_saml",
    authSource: "saml",
    groups: Array.isArray(attributes.groups) ? attributes.groups : [],
    samlAttributes: {
      nameId: attributes.nameId,
      email,
      displayName,
      name: attributes.name,
      issuer: attributes.issuer
    }
  };
}

module.exports = {
  buildSamlSessionUserFromAttributes,
  getSamlConfig,
  getSamlStatus
};
