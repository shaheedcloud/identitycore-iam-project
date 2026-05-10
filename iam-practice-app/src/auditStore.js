const crypto = require("crypto");

const events = [];
const maxEvents = 100;

const sensitiveKeyPatterns = [
  /authorization/i,
  /bearer/i,
  /cookie/i,
  /password/i,
  /secret/i,
  /token/i,
  /assertion/i,
  /samlresponse/i,
  /certificate/i,
  /privatekey/i,
  /private_key/i
];

function now() {
  return new Date().toISOString();
}

function isSensitiveKey(key) {
  return sensitiveKeyPatterns.some((pattern) => pattern.test(key));
}

function redactValue(value) {
  if (value === undefined) {
    return undefined;
  }

  if (value === null) {
    return null;
  }

  return "[REDACTED]";
}

function sanitize(value) {
  if (Array.isArray(value)) {
    return value.map((item) => sanitize(item));
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [
        key,
        isSensitiveKey(key) ? redactValue(item) : sanitize(item)
      ])
    );
  }

  return value;
}

function buildRequestContext(req) {
  if (!req) {
    return undefined;
  }

  return {
    method: req.method,
    path: req.originalUrl || req.path,
    actor: req.session && req.session.user
      ? {
          email: req.session.user.email,
          role: req.session.user.role,
          authSource: req.session.user.authSource || "local"
        }
      : {
          authenticated: false
        }
  };
}

function recordAuditEvent(type, outcome, details = {}, req) {
  const event = {
    id: crypto.randomUUID(),
    createdAt: now(),
    localOnly: true,
    type,
    outcome,
    details: sanitize(details),
    request: buildRequestContext(req)
  };

  events.unshift(event);

  if (events.length > maxEvents) {
    events.length = maxEvents;
  }

  return event;
}

function getAuditStatus() {
  return {
    localOnly: true,
    enabled: true,
    storage: "in-memory only",
    eventCount: events.length,
    maxEvents,
    captures: [
      "local login success and failure",
      "logout",
      "JWT missing or malformed token attempts",
      "SCIM fail-closed requests",
      "JML joiner, mover, leaver, and reset",
      "SAML disabled login attempts and local simulation success"
    ],
    redaction: {
      passwords: "redacted",
      cookies: "not captured",
      authorizationHeaders: "not captured",
      rawTokens: "not captured",
      samlAssertions: "not captured",
      certificatesAndPrivateKeys: "not captured"
    },
    warning: "Local troubleshooting evidence only. No external logging service, SIEM, file log, database, or persistent storage is used."
  };
}

function getAuditEvents() {
  return {
    localOnly: true,
    totalResults: events.length,
    events
  };
}

function resetAuditEvents() {
  const clearedCount = events.length;
  events.length = 0;

  return {
    localOnly: true,
    reset: true,
    clearedCount,
    detail: "Local in-memory audit events cleared."
  };
}

function getTroubleshootingEvidence() {
  return {
    localOnly: true,
    purpose: "Safe troubleshooting checklist for IdentityCore IAM Practice App labs.",
    auditStatus: getAuditStatus(),
    recentEventTypes: events.slice(0, 10).map((event) => ({
      id: event.id,
      createdAt: event.createdAt,
      type: event.type,
      outcome: event.outcome
    })),
    checklist: [
      "Confirm the route or API being tested.",
      "Confirm whether the request used local session authentication or bearer-token API authentication.",
      "Check `/api/audit/events` for recent safe local events.",
      "Check `/api/oidc/status`, `/api/jwt/status`, `/api/scim/status`, `/api/jml/status`, or `/api/saml/status` for phase-specific readiness.",
      "Confirm `.env` remains local and uncommitted.",
      "Do not paste raw tokens, cookies, SAML assertions, SCIM bearer tokens, private keys, certificates, or screenshots with secrets into issues or pull requests."
    ],
    warning: "Evidence is local, in-memory, and redacted. It is not a production audit trail."
  };
}

module.exports = {
  getAuditEvents,
  getAuditStatus,
  getTroubleshootingEvidence,
  recordAuditEvent,
  resetAuditEvents,
  sanitize
};
