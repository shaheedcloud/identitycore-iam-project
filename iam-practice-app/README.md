# IdentityCore IAM Practice App - Phase 1

This app is the local Phase 1 target application for the IdentityCore IAM Project. It demonstrates local authentication, Express sessions, and role-based access control with dummy users only. The goal is to keep the app small and understandable while shaping it so later phases can use it as a relying party or service provider for identity integration labs.

Phase 1 is still local-only. It does not use real OIDC, SAML, SCIM, JWT validation, AWS Cognito, databases, tenant IDs, client IDs, client secrets, or real credentials.

## What Phase 1 Demonstrates

- Local login with training-only users
- Session creation after successful login
- Protected pages for authenticated users
- RBAC middleware that checks the signed-in user's local role
- Protected API routes that return dummy identity data
- Local identity objects that resemble future claims without using real tenant data

## Install Dependencies

```bash
cd iam-practice-app
npm.cmd install
```

## Start the App

```bash
npm.cmd start
```

Open:

```text
http://localhost:3000
```

## Route Map

| Route | Method | Purpose | Protection |
| --- | --- | --- | --- |
| `/` | `GET` | Redirects signed-in users to `/dashboard`, otherwise `/login` | Public redirect |
| `/login` | `GET` | Shows the local login form | Public |
| `/login` | `POST` | Checks local dummy credentials and creates a session | Public form post |
| `/logout` | `POST` | Destroys the local session | Session action |
| `/dashboard` | `GET` | Main protected landing page | Authenticated users |
| `/admin` | `GET` | Admin-only page | `admin` |
| `/security` | `GET` | Security analyst page | `admin`, `security_analyst` |
| `/finance` | `GET` | Finance page | `admin`, `finance_user` |
| `/access-denied` | `GET` | RBAC denial page | Authenticated users |
| `/api/me` | `GET` | Returns the current local user profile without password | Authenticated users |
| `/api/debug/session` | `GET` | Local-only session troubleshooting data | Authenticated users |
| `/api/admin/users` | `GET` | Returns all local dummy users without passwords | `admin` |

## Role-To-Route Access Matrix

| Role | `/dashboard` | `/admin` | `/security` | `/finance` | `/api/me` | `/api/debug/session` | `/api/admin/users` |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `admin` | Allow | Allow | Allow | Allow | Allow | Allow | Allow |
| `security_analyst` | Allow | Deny | Allow | Deny | Allow | Allow | Deny |
| `finance_user` | Allow | Deny | Deny | Allow | Allow | Allow | Deny |
| `standard_user` | Allow | Deny | Deny | Deny | Allow | Allow | Deny |

## Local Dummy Users

The app checks submitted email and password values against `src/users.js`. Passwords are intentionally simple dummy training values and are not production credentials.

| Email | Password | Role | Department | Job Title | Groups |
| --- | --- | --- | --- | --- | --- |
| `admin@identitycore.local` | `AdminPass123!` | `admin` | Identity Platform | IAM Platform Administrator | `GRP-Identity-Admins`, `GRP-Security-Privileged` |
| `analyst@identitycore.local` | `AnalystPass123!` | `security_analyst` | Security Operations | Security Operations Analyst | `GRP-Security-Analysts`, `GRP-Audit-Readers` |
| `finance@identitycore.local` | `FinancePass123!` | `finance_user` | Finance | Finance Operations Specialist | `GRP-Finance-Users`, `GRP-Billing-Readers` |
| `user@identitycore.local` | `UserPass123!` | `standard_user` | General Workforce | Workforce User | `GRP-Workforce-Standard` |

Each local user also has fake `futureClaimsPreview` values. These are local placeholders that help explain how claims may later influence authorization decisions. They are not copied from any real identity provider.

## How Dummy Login Works

The `POST /login` route reads the submitted email and password, finds a matching local user, and compares the dummy password. On success, the app removes the password from the user object and stores the safe profile in the Express session.

This is the place where a later OIDC callback or SAML assertion handler can replace local password checking. Phase 1 intentionally leaves that integration out.

## How Sessions Work

After successful login, `express-session` stores a server-side session and sends the browser a session cookie. Later requests use that cookie so the app can read `req.session.user`.

The session stores the safe local profile only. It does not store passwords, tokens, client secrets, tenant IDs, or real identity provider data.

## How RBAC Middleware Works

The RBAC middleware lives in `src/middleware/rbac.js`. A protected route calls `requireRole()` with a list of allowed roles. If the signed-in user's role appears in the allowed list, the request continues. If not, the user is redirected to `/access-denied`.

## Relying Party And Service Provider Readiness

In later labs, this app can act as the target application that trusts an external identity provider:

- As an OIDC relying party, it would redirect users to Entra ID or Okta, receive an authorization response, and create a local session from validated identity claims.
- As a SAML service provider, it would receive a SAML assertion from Entra ID or Okta and map assertion attributes to the local app session.
- As a SCIM-enabled application, it could expose provisioning endpoints so an identity provider can create, update, or deactivate app users.
- As a protected API, it could require JWT validation before returning data.

Phase 1 prepares the app shape for those flows without implementing them yet.

## Future Integration Notes

OIDC: Later phases can replace the local login form with an OIDC sign-in redirect and callback route. The app would map OIDC claims such as subject, email, name, groups, or roles into the session.

SAML: Later phases can add assertion consumer service handling and map SAML assertion attributes into the same local session shape used now.

SCIM: Later phases can replace the static local user list with local provisioning logic that creates, updates, and deactivates dummy users from SCIM requests.

JWT: Later phases can protect API routes with JWT validation middleware. The current `/api/me`, `/api/debug/session`, and `/api/admin/users` routes show where API authorization decisions happen.

Claims: The current `futureClaimsPreview` field is only a fake local preview. It helps learners see how claim-like values may later support access decisions without using real tenant data.

## Browser Testing Checklist

1. Start the app with `npm.cmd start`.
2. Open `http://localhost:3000`.
3. Confirm `/` redirects to `/login` when signed out.
4. Sign in as `admin@identitycore.local` with `AdminPass123!`.
5. Confirm `/dashboard`, `/admin`, `/security`, and `/finance` load.
6. Log out.
7. Sign in as `user@identitycore.local` with `UserPass123!`.
8. Confirm `/dashboard` loads.
9. Try `/admin` and confirm the app shows `/access-denied`.

## API Testing Checklist

Browser-based API checks work after signing in because the browser already has the session cookie.

1. Sign in as `admin@identitycore.local`.
2. Open `/api/me` and confirm the response contains the admin profile without a password.
3. Open `/api/debug/session` and confirm it returns safe local session details.
4. Open `/api/admin/users` and confirm all dummy users are returned without passwords.
5. Log out and sign in as `user@identitycore.local`.
6. Open `/api/me` and confirm the standard user profile appears.
7. Open `/api/admin/users` and confirm access is denied.

## Break/Fix Scenario

Break: a user has the wrong local role in `src/users.js`.

Symptom: the user reaches `/access-denied` when trying to open a route they should be allowed to access.

Fix: correct the local user's role so it matches the intended access policy.

Lesson: RBAC depends on correct identity-to-role mapping.

## Troubleshooting

### `npm` is blocked in PowerShell

Symptom: PowerShell says `npm.ps1` cannot be loaded because running scripts is disabled.

Fix: use `npm.cmd install` and `npm.cmd start` from PowerShell.

### Port 3000 is already in use

Symptom: the app fails to start because another process is using the port.

Fix: stop the other local server or start this app with a different local port:

```powershell
$env:PORT=3001
npm.cmd start
```

### Login fails

Symptom: the app shows `Login failed`.

Fix: confirm the email and dummy password match the table in this README.

### Access denied appears unexpectedly

Symptom: a signed-in user reaches `/access-denied`.

Fix: check the user's `role` in `src/users.js` and compare it to the role-to-route access matrix.

### API route redirects to login

Symptom: opening `/api/me` or `/api/debug/session` redirects to `/login`.

Fix: sign in through the browser first so the browser has a local session cookie.

## Phase 1 Security Limitations

- Authentication is local-only and not production-safe.
- Dummy users and passwords are stored in local source code for training only.
- Passwords are not hashed in Phase 1.
- The fallback session secret is only for local training.
- `/api/debug/session` is for local troubleshooting only and must not be exposed in production.
- There is no database, account lockout, MFA, audit logging, CSRF protection, OIDC, SAML, SCIM, JWT validation, or production identity provider integration.
- Do not use these credentials, configuration values, or patterns in production.
