const { getScimConfig, getScimStatus } = require("../scimConfig");

function getBearerToken(req) {
  const authHeader = req.get("authorization") || "";
  const parts = authHeader.split(" ");

  if (!authHeader) {
    return null;
  }

  if (parts.length !== 2 || parts[0] !== "Bearer" || !parts[1]) {
    return "";
  }

  return parts[1];
}

function scimError(res, status, detail, scimType) {
  return res.status(status).json({
    schemas: ["urn:ietf:params:scim:api:messages:2.0:Error"],
    status: String(status),
    scimType,
    detail
  });
}

function requireScimBearer(req, res, next) {
  const config = getScimConfig();

  if (!config.canProvisionUsers) {
    return scimError(
      res,
      503,
      "SCIM is disabled, incomplete, or still using placeholders. SCIM endpoints fail closed.",
      "serviceProviderConfig"
    );
  }

  const suppliedToken = getBearerToken(req);

  if (suppliedToken === null) {
    return scimError(res, 401, "Missing Authorization: Bearer <token> header.", "invalidValue");
  }

  if (!suppliedToken || suppliedToken !== config.bearerToken) {
    return scimError(res, 401, "SCIM authorization failed.", "invalidValue");
  }

  req.scimStatus = getScimStatus();
  return next();
}

module.exports = {
  requireScimBearer,
  scimError
};
