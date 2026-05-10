const express = require("express");
const { getScimConfig } = require("../scimConfig");
const { requireScimBearer, scimError } = require("../middleware/scimAuth");
const {
  createUser,
  deactivateUser,
  getUser,
  listUsers,
  patchUser,
  replaceUser
} = require("../scimStore");

const router = express.Router();

function getBaseUrl() {
  return getScimConfig().baseUrl;
}

router.get("/ServiceProviderConfig", (req, res) => {
  res.json({
    schemas: ["urn:ietf:params:scim:schemas:core:2.0:ServiceProviderConfig"],
    documentationUri: "https://identitycore.example.local/scim-learning",
    patch: { supported: true },
    bulk: { supported: false, maxOperations: 0, maxPayloadSize: 0 },
    filter: { supported: false, maxResults: 0 },
    changePassword: { supported: false },
    sort: { supported: false },
    etag: { supported: false },
    authenticationSchemes: [
      {
        type: "oauthbearertoken",
        name: "Bearer Token",
        description: "Local-only placeholder bearer token for Phase 5 SCIM simulation.",
        specUri: "https://www.rfc-editor.org/rfc/rfc7644",
        primary: true
      }
    ]
  });
});

router.get("/Schemas", (req, res) => {
  res.json({
    schemas: ["urn:ietf:params:scim:api:messages:2.0:ListResponse"],
    totalResults: 1,
    startIndex: 1,
    itemsPerPage: 1,
    Resources: [
      {
        id: "urn:ietf:params:scim:schemas:core:2.0:User",
        name: "User",
        description: "Basic SCIM User schema metadata for the IdentityCore Phase 5 simulation.",
        attributes: [
          { name: "userName", type: "string", required: true, mutability: "readWrite" },
          { name: "name", type: "complex", required: false, mutability: "readWrite" },
          { name: "displayName", type: "string", required: false, mutability: "readWrite" },
          { name: "emails", type: "complex", multiValued: true, required: false, mutability: "readWrite" },
          { name: "active", type: "boolean", required: false, mutability: "readWrite" }
        ]
      }
    ]
  });
});

router.get("/ResourceTypes", (req, res) => {
  res.json({
    schemas: ["urn:ietf:params:scim:api:messages:2.0:ListResponse"],
    totalResults: 1,
    startIndex: 1,
    itemsPerPage: 1,
    Resources: [
      {
        id: "User",
        name: "User",
        endpoint: "/Users",
        description: "Local in-memory SCIM users for Phase 5.",
        schema: "urn:ietf:params:scim:schemas:core:2.0:User"
      }
    ]
  });
});

router.get("/Users", requireScimBearer, (req, res) => {
  res.json(listUsers(getBaseUrl(), req.query.startIndex, req.query.count));
});

router.get("/Users/:id", requireScimBearer, (req, res) => {
  const user = getUser(req.params.id, getBaseUrl());

  if (!user) {
    return scimError(res, 404, "SCIM user not found.", "notFound");
  }

  return res.json(user);
});

router.post("/Users", requireScimBearer, (req, res) => {
  if (!req.body.userName) {
    return scimError(res, 400, "userName is required for this Phase 5 SCIM simulation.", "invalidValue");
  }

  const user = createUser(req.body, getBaseUrl());
  return res.status(201).json(user);
});

router.put("/Users/:id", requireScimBearer, (req, res) => {
  const user = replaceUser(req.params.id, req.body, getBaseUrl());

  if (!user) {
    return scimError(res, 404, "SCIM user not found.", "notFound");
  }

  return res.json(user);
});

router.patch("/Users/:id", requireScimBearer, (req, res) => {
  const operations = Array.isArray(req.body.Operations) ? req.body.Operations : [];
  const user = patchUser(req.params.id, operations, getBaseUrl());

  if (!user) {
    return scimError(res, 404, "SCIM user not found.", "notFound");
  }

  return res.json(user);
});

router.delete("/Users/:id", requireScimBearer, (req, res) => {
  const user = deactivateUser(req.params.id, getBaseUrl());

  if (!user) {
    return scimError(res, 404, "SCIM user not found.", "notFound");
  }

  return res.json({
    detail: "SCIM user deactivated in the local in-memory store.",
    user
  });
});

module.exports = router;
