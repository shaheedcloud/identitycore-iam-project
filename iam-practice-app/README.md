# IdentityCore IAM Practice App - Phase 1

Phase 1 builds a beginner-readable Node.js and Express app that demonstrates local authentication, session handling, and role-based access control. It uses only local dummy users and placeholder configuration so the project can teach IAM fundamentals before adding real federation or provisioning in later phases.

## What Phase 1 Demonstrates

- Local login with training-only users
- Session creation after successful login
- Protected pages for authenticated users
- RBAC middleware that checks the signed-in user's local role
- Protected API routes that return dummy identity data

Phase 1 does not use real OIDC, SAML, SCIM, JWT validation, AWS Cognito, databases, tenant IDs, or real credentials.

## Dummy Login

The app checks the submitted email and password against local users in `src/users.js`. Passwords are intentionally simple dummy training values and are not real credentials.

| Email | Password | Role |
| --- | --- | --- |
| `admin@identitycore.local` | `AdminPass123!` | `admin` |
| `analyst@identitycore.local` | `AnalystPass123!` | `security_analyst` |
| `finance@identitycore.local` | `FinancePass123!` | `finance_user` |
| `user@identitycore.local` | `UserPass123!` | `standard_user` |

## Sessions

After a successful login, the app stores a safe user profile in the Express session. The password is removed before the profile is saved. The browser receives a session cookie, and the server uses that cookie to find the signed-in user on later requests.

## RBAC Middleware

The RBAC middleware lives in `src/middleware/rbac.js`. Routes pass an allowed-role list to `requireRole()`. If the signed-in user's role is not in that list, the app redirects the user to `/access-denied`.

## Protected Routes

| Route | Access |
| --- | --- |
| `GET /dashboard` | Any authenticated user |
| `GET /admin` | `admin` only |
| `GET /security` | `admin`, `security_analyst` |
| `GET /finance` | `admin`, `finance_user` |
| `GET /api/me` | Any authenticated user |
| `GET /api/admin/users` | `admin` only |

## Install Dependencies

```bash
cd iam-practice-app
npm install
```

## Start the App

```bash
npm start
```

Open:

```text
http://localhost:3000
```

## Test Successful Access

1. Sign in as `admin@identitycore.local` with `AdminPass123!`.
2. Open `/dashboard`.
3. Open `/admin`, `/security`, and `/finance`.
4. Open `/api/me`.
5. Open `/api/admin/users`.

Expected result: the admin user can access every protected page and admin API route.

## Test Blocked Access

1. Sign in as `user@identitycore.local` with `UserPass123!`.
2. Open `/dashboard`.
3. Try to open `/admin`.

Expected result: the standard user reaches `/access-denied` because the `standard_user` role is not allowed on `/admin`.

## Break/Fix Scenario

Break: a user has the wrong local role in `src/users.js`.

Symptom: the user reaches `/access-denied` when trying to open a route they should be allowed to access.

Fix: correct the local user's role so it matches the intended access policy.

Lesson: RBAC depends on correct identity-to-role mapping.

## How This Prepares Later Phases

This local app creates the learning foundation for later OIDC, SAML, SCIM, and JWT phases. Later phases can replace local login with OIDC or SAML, replace local dummy identity data with external claims, add JWT validation for APIs, and introduce SCIM-style lifecycle data. The Phase 1 route protection and RBAC decisions show where those future identity signals will be consumed.

## Phase 1 Security Limitations

- Dummy users and passwords are stored in local source code for training only.
- Passwords are not hashed in Phase 1.
- The fallback session secret is only for local training.
- There is no database, account lockout, MFA, audit logging, CSRF protection, OIDC, SAML, SCIM, JWT validation, or production identity provider integration.
- Do not use these credentials, configuration values, or patterns in production.
