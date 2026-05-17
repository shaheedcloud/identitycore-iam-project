const crypto = require("crypto");

const groups = new Map();

function now() {
  return new Date().toISOString();
}

function buildLocation(baseUrl, id) {
  return `${baseUrl.replace(/\/$/, "")}/Groups/${id}`;
}

function normalizeMembers(members) {
  if (members && !Array.isArray(members) && members.value) {
    return normalizeMembers([members]);
  }

  if (!Array.isArray(members)) {
    return [];
  }

  return members
    .filter((member) => member && member.value)
    .map((member) => ({
      value: member.value,
      display: member.display || member.value,
      type: member.type || "User"
    }));
}

function normalizeGroup(input, baseUrl, existingGroup) {
  const id = existingGroup ? existingGroup.id : crypto.randomUUID();
  const created = existingGroup ? existingGroup.meta.created : now();
  const modified = now();
  const displayName = input.displayName || existingGroup?.displayName || "Unnamed SCIM Group";

  return {
    schemas: ["urn:ietf:params:scim:schemas:core:2.0:Group"],
    id,
    displayName,
    members: Array.isArray(input.members)
      ? normalizeMembers(input.members)
      : existingGroup?.members || [],
    meta: {
      resourceType: "Group",
      created,
      lastModified: modified,
      location: buildLocation(baseUrl, id)
    }
  };
}

function withLocation(group, baseUrl) {
  return {
    ...group,
    meta: {
      ...group.meta,
      location: buildLocation(baseUrl, group.id)
    }
  };
}

function listGroups(baseUrl, startIndex = 1, count = 100) {
  const allGroups = Array.from(groups.values());
  const safeStart = Math.max(Number.parseInt(startIndex, 10) || 1, 1);
  const safeCount = Math.max(Number.parseInt(count, 10) || 100, 0);
  const resources = allGroups.slice(safeStart - 1, safeStart - 1 + safeCount);

  return {
    schemas: ["urn:ietf:params:scim:api:messages:2.0:ListResponse"],
    totalResults: allGroups.length,
    startIndex: safeStart,
    itemsPerPage: resources.length,
    Resources: resources.map((group) => withLocation(group, baseUrl))
  };
}

function getGroup(id, baseUrl) {
  const group = groups.get(id);
  return group ? withLocation(group, baseUrl) : null;
}

function createGroup(input, baseUrl) {
  const group = normalizeGroup(input, baseUrl);
  groups.set(group.id, group);
  return group;
}

function replaceGroup(id, input, baseUrl) {
  const existingGroup = groups.get(id);

  if (!existingGroup) {
    return null;
  }

  const group = normalizeGroup(input, baseUrl, existingGroup);
  groups.set(id, group);
  return group;
}

function addMembers(existingMembers, newMembers) {
  const byValue = new Map(existingMembers.map((member) => [member.value, member]));
  normalizeMembers(newMembers).forEach((member) => {
    byValue.set(member.value, member);
  });
  return Array.from(byValue.values());
}

function removeMembers(existingMembers, value) {
  const valuesToRemove = Array.isArray(value)
    ? normalizeMembers(value).map((member) => member.value)
    : [value?.value || value].filter(Boolean);

  return existingMembers.filter((member) => !valuesToRemove.includes(member.value));
}

function getMemberValueFromPath(path) {
  const match = path.match(/members\[value eq "([^"]+)"\]/);
  return match ? match[1] : "";
}

function patchGroup(id, operations, baseUrl) {
  const existingGroup = groups.get(id);

  if (!existingGroup) {
    return null;
  }

  const nextGroup = {
    ...existingGroup,
    members: [...existingGroup.members],
    meta: { ...existingGroup.meta }
  };

  operations.forEach((operation) => {
    const op = (operation.op || "").toLowerCase();
    const path = (operation.path || "").toLowerCase();

    if ((op === "add" || op === "replace") && path === "members") {
      nextGroup.members = op === "replace"
        ? normalizeMembers(operation.value)
        : addMembers(nextGroup.members, operation.value);
    }

    if (op === "replace" && path === "displayname" && typeof operation.value === "string") {
      nextGroup.displayName = operation.value;
    }

    if (op === "remove" && path === "members") {
      nextGroup.members = removeMembers(nextGroup.members, operation.value);
    }

    if (op === "remove" && path.startsWith("members[value eq")) {
      nextGroup.members = removeMembers(nextGroup.members, getMemberValueFromPath(operation.path || ""));
    }
  });

  nextGroup.meta.lastModified = now();
  nextGroup.meta.location = buildLocation(baseUrl, id);
  groups.set(id, nextGroup);
  return nextGroup;
}

function deleteGroup(id) {
  return groups.delete(id);
}

function getGroupLifecycleSummary() {
  const allGroups = Array.from(groups.values());
  const memberCount = allGroups.reduce((total, group) => total + group.members.length, 0);

  return {
    localOnly: true,
    resourceType: "SCIM Group",
    totalGroups: allGroups.length,
    totalMemberships: memberCount,
    groupMeaning: "SCIM groups model provisioned membership records. They are not a shortcut around local RBAC.",
    provisioningBoundaries: {
      groupMembershipCreatesBrowserSession: false,
      groupMembershipGrantsAdminAccess: false,
      groupMembershipBypassesRbac: false,
      rbacStillEnforced: true,
      storage: "in-memory only"
    },
    sampleGroups: allGroups.slice(0, 5).map((group) => ({
      id: group.id,
      displayName: group.displayName,
      memberCount: group.members.length,
      members: group.members.map((member) => ({
        value: member.value,
        display: member.display,
        type: member.type
      })),
      created: group.meta.created,
      lastModified: group.meta.lastModified
    })),
    safeDummyExamples: [
      {
        displayName: "GRP-SCIM-Finance-Standard",
        lesson: "Provisioned membership can describe a business group without automatically granting admin access."
      },
      {
        displayName: "GRP-SCIM-Security-ReadOnly",
        lesson: "A group name is not trusted for privileged authorization unless a later explicit mapping rule allows it."
      },
      {
        displayName: "GRP-SCIM-Contractor-Limited",
        lesson: "Group lifecycle practice can show least privilege for temporary or limited-access identities."
      }
    ]
  };
}

module.exports = {
  listGroups,
  getGroup,
  createGroup,
  replaceGroup,
  patchGroup,
  deleteGroup,
  getGroupLifecycleSummary
};
