const users = [
  {
    id: 1,
    email: "admin@identitycore.local",
    password: "AdminPass123!",
    displayName: "IdentityCore Admin",
    role: "admin",
    department: "Identity Platform",
    jobTitle: "IAM Platform Administrator",
    userType: "employee",
    groups: ["GRP-Identity-Admins", "GRP-Security-Privileged"],
    futureClaimsPreview: {
      subject: "local-admin-001",
      preferredUsername: "admin@identitycore.local",
      entitlement: "identitycore.admin"
    }
  },
  {
    id: 2,
    email: "analyst@identitycore.local",
    password: "AnalystPass123!",
    displayName: "Security Analyst",
    role: "security_analyst",
    department: "Security Operations",
    jobTitle: "Security Operations Analyst",
    userType: "employee",
    groups: ["GRP-Security-Analysts", "GRP-Audit-Readers"],
    futureClaimsPreview: {
      subject: "local-analyst-001",
      preferredUsername: "analyst@identitycore.local",
      entitlement: "identitycore.security.read"
    }
  },
  {
    id: 3,
    email: "finance@identitycore.local",
    password: "FinancePass123!",
    displayName: "Finance User",
    role: "finance_user",
    department: "Finance",
    jobTitle: "Finance Operations Specialist",
    userType: "employee",
    groups: ["GRP-Finance-Users", "GRP-Billing-Readers"],
    futureClaimsPreview: {
      subject: "local-finance-001",
      preferredUsername: "finance@identitycore.local",
      entitlement: "identitycore.finance.read"
    }
  },
  {
    id: 4,
    email: "user@identitycore.local",
    password: "UserPass123!",
    displayName: "Standard User",
    role: "standard_user",
    department: "General Workforce",
    jobTitle: "Workforce User",
    userType: "employee",
    groups: ["GRP-Workforce-Standard"],
    futureClaimsPreview: {
      subject: "local-user-001",
      preferredUsername: "user@identitycore.local",
      entitlement: "identitycore.dashboard.read"
    }
  }
];

// Later SCIM phases can replace or update these local records from a provisioning flow.

function findUserByEmail(email) {
  return users.find((user) => user.email.toLowerCase() === email.toLowerCase());
}

function withoutPassword(user) {
  const { password, ...safeUser } = user;
  return safeUser;
}

function listUsersWithoutPasswords() {
  return users.map(withoutPassword);
}

module.exports = {
  users,
  findUserByEmail,
  withoutPassword,
  listUsersWithoutPasswords
};
