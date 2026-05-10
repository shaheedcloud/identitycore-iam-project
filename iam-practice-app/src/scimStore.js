const crypto = require("crypto");

const users = new Map();

function now() {
  return new Date().toISOString();
}

function buildLocation(baseUrl, id) {
  return `${baseUrl.replace(/\/$/, "")}/Users/${id}`;
}

function normalizeUser(input, baseUrl, existingUser) {
  const id = existingUser ? existingUser.id : crypto.randomUUID();
  const created = existingUser ? existingUser.meta.created : now();
  const modified = now();
  const userName = input.userName || existingUser?.userName || "unknown@example.local";
  const displayName = input.displayName || existingUser?.displayName || userName;

  return {
    schemas: ["urn:ietf:params:scim:schemas:core:2.0:User"],
    id,
    userName,
    name: {
      givenName: input.name?.givenName || existingUser?.name?.givenName || "",
      familyName: input.name?.familyName || existingUser?.name?.familyName || "",
      formatted: input.name?.formatted || existingUser?.name?.formatted || displayName
    },
    displayName,
    active: typeof input.active === "boolean" ? input.active : existingUser?.active ?? true,
    emails: Array.isArray(input.emails)
      ? input.emails
      : existingUser?.emails || [{ value: userName, primary: true, type: "work" }],
    meta: {
      resourceType: "User",
      created,
      lastModified: modified,
      location: buildLocation(baseUrl, id)
    }
  };
}

function listUsers(baseUrl, startIndex = 1, count = 100) {
  const allUsers = Array.from(users.values());
  const safeStart = Math.max(Number.parseInt(startIndex, 10) || 1, 1);
  const safeCount = Math.max(Number.parseInt(count, 10) || 100, 0);
  const resources = allUsers.slice(safeStart - 1, safeStart - 1 + safeCount);

  return {
    schemas: ["urn:ietf:params:scim:api:messages:2.0:ListResponse"],
    totalResults: allUsers.length,
    startIndex: safeStart,
    itemsPerPage: resources.length,
    Resources: resources.map((user) => ({
      ...user,
      meta: {
        ...user.meta,
        location: buildLocation(baseUrl, user.id)
      }
    }))
  };
}

function getUser(id, baseUrl) {
  const user = users.get(id);

  if (!user) {
    return null;
  }

  return {
    ...user,
    meta: {
      ...user.meta,
      location: buildLocation(baseUrl, user.id)
    }
  };
}

function createUser(input, baseUrl) {
  const user = normalizeUser(input, baseUrl);
  users.set(user.id, user);
  return user;
}

function replaceUser(id, input, baseUrl) {
  const existingUser = users.get(id);

  if (!existingUser) {
    return null;
  }

  const user = normalizeUser(input, baseUrl, existingUser);
  users.set(id, user);
  return user;
}

function patchUser(id, operations, baseUrl) {
  const existingUser = users.get(id);

  if (!existingUser) {
    return null;
  }

  const nextUser = { ...existingUser, name: { ...existingUser.name }, meta: { ...existingUser.meta } };

  operations.forEach((operation) => {
    const path = (operation.path || "").toLowerCase();
    const op = (operation.op || "").toLowerCase();

    if ((op === "replace" || op === "add") && path === "active" && typeof operation.value === "boolean") {
      nextUser.active = operation.value;
    }
  });

  nextUser.meta.lastModified = now();
  nextUser.meta.location = buildLocation(baseUrl, id);
  users.set(id, nextUser);
  return nextUser;
}

function deactivateUser(id, baseUrl) {
  const existingUser = users.get(id);

  if (!existingUser) {
    return null;
  }

  const user = {
    ...existingUser,
    active: false,
    meta: {
      ...existingUser.meta,
      lastModified: now(),
      location: buildLocation(baseUrl, id)
    }
  };

  users.set(id, user);
  return user;
}

module.exports = {
  listUsers,
  getUser,
  createUser,
  replaceUser,
  patchUser,
  deactivateUser
};
