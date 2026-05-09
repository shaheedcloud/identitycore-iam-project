const users = [
  {
    id: 1,
    email: "admin@identitycore.local",
    password: "AdminPass123!",
    displayName: "IdentityCore Admin",
    role: "admin",
    department: "Identity Platform"
  },
  {
    id: 2,
    email: "analyst@identitycore.local",
    password: "AnalystPass123!",
    displayName: "Security Analyst",
    role: "security_analyst",
    department: "Security Operations"
  },
  {
    id: 3,
    email: "finance@identitycore.local",
    password: "FinancePass123!",
    displayName: "Finance User",
    role: "finance_user",
    department: "Finance"
  },
  {
    id: 4,
    email: "user@identitycore.local",
    password: "UserPass123!",
    displayName: "Standard User",
    role: "standard_user",
    department: "General Workforce"
  }
];

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
