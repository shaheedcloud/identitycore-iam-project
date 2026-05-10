const crypto = require("crypto");

const identities = new Map();
const events = [];

const departmentAccess = {
  "Identity Platform": {
    group: "GRP-Identity-Admins",
    access: "Identity administration access"
  },
  "Security Operations": {
    group: "GRP-Security-Analysts",
    access: "Security analyst access"
  },
  Finance: {
    group: "GRP-Finance-Users",
    access: "Finance application access"
  },
  "General Workforce": {
    group: "GRP-Workforce-Standard",
    access: "Standard workforce access"
  }
};

function now() {
  return new Date().toISOString();
}

function getAccessForDepartment(department) {
  return departmentAccess[department] || departmentAccess["General Workforce"];
}

function findIdentityByEmail(email) {
  return Array.from(identities.values()).find((identity) => identity.email === email);
}

function getOrCreateIdentity(input) {
  const email = input.email || "jml.user@identitycore.local";
  const existingIdentity = input.id ? identities.get(input.id) : findIdentityByEmail(email);

  if (existingIdentity) {
    return existingIdentity;
  }

  const timestamp = now();
  const identity = {
    id: crypto.randomUUID(),
    email,
    displayName: input.displayName || email,
    department: input.department || "General Workforce",
    jobTitle: input.jobTitle || "Workforce User",
    active: false,
    groups: [],
    access: [],
    createdAt: timestamp,
    updatedAt: timestamp
  };

  identities.set(identity.id, identity);
  return identity;
}

function cloneIdentity(identity) {
  return {
    ...identity,
    groups: [...identity.groups],
    access: [...identity.access]
  };
}

function recordEvent(type, identity, evidence) {
  const event = {
    id: crypto.randomUUID(),
    type,
    localOnly: true,
    createdAt: now(),
    identity: cloneIdentity(identity),
    evidence
  };

  events.unshift(event);
  return event;
}

function addUnique(values, value) {
  return values.includes(value) ? values : [...values, value];
}

function removeValue(values, value) {
  return values.filter((item) => item !== value);
}

function simulateJoiner(input = {}) {
  const identity = getOrCreateIdentity(input);
  const department = input.department || identity.department || "General Workforce";
  const jobTitle = input.jobTitle || identity.jobTitle || "Workforce User";
  const access = getAccessForDepartment(department);

  identity.department = department;
  identity.jobTitle = jobTitle;
  identity.active = true;
  identity.groups = addUnique(identity.groups, access.group);
  identity.access = addUnique(identity.access, access.access);
  identity.updatedAt = now();

  return recordEvent("joiner", identity, [
    {
      action: "identity_created_or_referenced",
      detail: "Local simulated identity prepared for onboarding."
    },
    {
      action: "scim_user_action_simulated",
      detail: "Simulated SCIM-style user create/update action recorded locally."
    },
    {
      action: "group_assigned",
      group: access.group,
      detail: "Department-based simulated access group assigned."
    }
  ]);
}

function simulateMover(input = {}) {
  const identity = getOrCreateIdentity(input);
  const oldDepartment = identity.department;
  const oldJobTitle = identity.jobTitle;
  const oldAccess = getAccessForDepartment(oldDepartment);
  const newDepartment = input.department || "General Workforce";
  const newJobTitle = input.jobTitle || identity.jobTitle || "Workforce User";
  const newAccess = getAccessForDepartment(newDepartment);

  identity.department = newDepartment;
  identity.jobTitle = newJobTitle;
  identity.active = true;
  identity.groups = addUnique(removeValue(identity.groups, oldAccess.group), newAccess.group);
  identity.access = addUnique(removeValue(identity.access, oldAccess.access), newAccess.access);
  identity.updatedAt = now();

  return recordEvent("mover", identity, [
    {
      action: "identity_updated",
      from: { department: oldDepartment, jobTitle: oldJobTitle },
      to: { department: newDepartment, jobTitle: newJobTitle }
    },
    {
      action: "old_access_removed",
      group: oldAccess.group,
      access: oldAccess.access
    },
    {
      action: "new_access_added",
      group: newAccess.group,
      access: newAccess.access
    }
  ]);
}

function simulateLeaver(input = {}) {
  const identity = getOrCreateIdentity(input);
  const removedGroups = [...identity.groups];
  const removedAccess = [...identity.access];

  identity.active = false;
  identity.groups = [];
  identity.access = [];
  identity.updatedAt = now();

  return recordEvent("leaver", identity, [
    {
      action: "account_deactivated",
      detail: "Local simulated identity marked inactive."
    },
    {
      action: "group_access_removed",
      groups: removedGroups,
      access: removedAccess
    },
    {
      action: "session_access_revocation_simulated",
      detail: "Recorded evidence only. No real sessions, tokens, or external access were revoked."
    }
  ]);
}

function getStatus() {
  const allIdentities = Array.from(identities.values());

  return {
    localOnly: true,
    activeSimulation: true,
    identityCount: allIdentities.length,
    activeIdentityCount: allIdentities.filter((identity) => identity.active).length,
    eventCount: events.length,
    supportedFlows: ["joiner", "mover", "leaver", "reset"],
    storage: "in-memory only",
    warning: "Local JML simulation only. No external systems, tokens, jobs, or real automation are used."
  };
}

function getEvents() {
  return {
    localOnly: true,
    totalResults: events.length,
    events
  };
}

function reset() {
  identities.clear();
  events.length = 0;

  return {
    localOnly: true,
    reset: true,
    detail: "Local JML simulation state cleared."
  };
}

module.exports = {
  getEvents,
  getStatus,
  reset,
  simulateJoiner,
  simulateLeaver,
  simulateMover
};
