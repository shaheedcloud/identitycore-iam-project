# IdentityCore IAM Practice App - Phases 1, 2, 3A, and 3B

This app is the local target application for the IdentityCore IAM Project. Phase 1 demonstrates local authentication, Express sessions, and role-based access control with dummy users only. Phase 2 adds local simulated identity claims and token-like objects so learners can inspect identity data before real federation is introduced. Phase 3A adds OIDC readiness placeholders. Phase 3B adds Entra ID OIDC local login support using values loaded only from a local uncommitted `.env` file.

The app still keeps local dummy login available. It does not commit real tenant IDs, client IDs, client secrets, access tokens, refresh tokens, ID tokens, private keys, SAML, SCIM, AWS, Docker, databases, or protected API JWT validation.

## What Phase 1 Demonstrates

- Local login with training-only users
- Session creation after successful login
- Protected pages for authenticated users
- RBAC middleware that checks the signed-in user's local role
- Protected API routes that return dummy identity data
- Local identity objects that resemble future claims without using real tenant data

## What Phase 2 Demonstrates

- Simulated identity claims built from local dummy users
- A simulated unsigned token-like object
- Claims inspection in the browser
- Role and group claim mapping
- Claim-based authorization explanations
- Local API routes that return simulated claim and token data

Phase 2 does not add real token simulation libraries, token signing, token validation, OIDC metadata, SAML assertions, SCIM provisioning, Entra ID integration, Okta integration, or AWS integration.

## What Phase 3B Demonstrates

- Real OIDC authorization code flow support for Entra ID
- Local `.env` loading with `dotenv`
- OIDC client support with `openid-client@5`
- Safe creation of an app session from ID token claims
- OIDC-authenticated users defaulting to `standard_user`
- Local dummy login remaining available
- Safe status and troubleshooting routes that do not expose secrets or tokens

Phase 3B does not store raw tokens in the session, return tokens from APIs, map Entra roles/groups to privileged app roles, add Okta, add SAML, add SCIM, or validate JWTs for protected APIs.

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
| `/auth/oidc/start` | `GET` | Starts Entra OIDC login only when local OIDC config is enabled and complete | Public |
| `/auth/oidc/callback` | `GET` | Handles Entra OIDC callback and creates a safe local app session | Public callback |
| `/logout` | `POST` | Destroys the local session | Session action |
| `/dashboard` | `GET` | Main protected landing page | Authenticated users |
| `/claims` | `GET` | Browser page for inspecting simulated local claims | Authenticated users |
| `/oidc-readiness` | `GET` | Browser page explaining OIDC readiness and current safe status | Authenticated users |
| `/admin` | `GET` | Admin-only page | `admin` |
| `/security` | `GET` | Security analyst page | `admin`, `security_analyst` |
| `/finance` | `GET` | Finance page | `admin`, `finance_user` |
| `/access-denied` | `GET` | RBAC denial page | Authenticated users |
| `/api/me` | `GET` | Returns the current local user profile without password | Authenticated users |
| `/api/debug/session` | `GET` | Local-only session troubleshooting data | Authenticated users |
| `/api/claims` | `GET` | Returns the current user's simulated claims | Authenticated users |
| `/api/token-simulation` | `GET` | Returns a local unsigned token-like object | Authenticated users |
| `/api/claims/authorization-check` | `GET` | Explains route access using role and group claims | Authenticated users |
| `/api/oidc/status` | `GET` | Returns safe OIDC readiness status without secrets | Authenticated users |
| `/api/admin/users` | `GET` | Returns all local dummy users without passwords | `admin` |

## Role-To-Route Access Matrix

| Role | `/dashboard` | `/claims` | `/admin` | `/security` | `/finance` | Claims APIs | `/api/admin/users` |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `admin` | Allow | Allow | Allow | Allow | Allow | Allow | Allow |
| `security_analyst` | Allow | Allow | Deny | Allow | Deny | Allow | Deny |
| `finance_user` | Allow | Allow | Deny | Deny | Allow | Allow | Deny |
| `standard_user` | Allow | Allow | Deny | Deny | Deny | Allow | Deny |

## Local Dummy Users

The app checks submitted email and password values against `src/users.js`. Passwords are intentionally simple dummy training values and are not production credentials.

| Email | Password | Role | Department | Job Title | Groups |
| --- | --- | --- | --- | --- | --- |
| `admin@identitycore.local` | `AdminPass123!` | `admin` | Identity Platform | IAM Platform Administrator | `GRP-Identity-Admins`, `GRP-Security-Privileged` |
| `analyst@identitycore.local` | `AnalystPass123!` | `security_analyst` | Security Operations | Security Operations Analyst | `GRP-Security-Analysts`, `GRP-Audit-Readers` |
| `finance@identitycore.local` | `FinancePass123!` | `finance_user` | Finance | Finance Operations Specialist | `GRP-Finance-Users`, `GRP-Billing-Readers` |
| `user@identitycore.local` | `UserPass123!` | `standard_user` | General Workforce | Workforce User | `GRP-Workforce-Standard` |

Each local user also has fake `futureClaimsPreview` values. These are local placeholders that help explain how claims may later influence authorization decisions. They are not copied from any real identity provider.

## What Claims Are

Claims are identity facts about a user. Common claims include a stable subject identifier, email address, display name, roles, groups, department, and job title. In real identity systems, these facts often come from an identity provider and are placed into a token or assertion.

In Phase 2, claims are generated locally from `src/users.js`. They are safe training data only.

## What A Token Represents

A token is a package of identity and authorization-related information that an application can inspect after authentication. Real tokens may be signed and validated so the application can trust the issuer and the payload.

Phase 2 uses a simulated token-like object:

```json
{
  "header": {
    "alg": "none",
    "typ": "SIMULATED_JWT"
  },
  "payload": {
    "email": "admin@identitycore.local",
    "roles": ["admin"],
    "groups": ["GRP-Identity-Admins"]
  },
  "signature": "not-used-local-simulation"
}
```

This is not a real JWT. It is not signed, not validated, and not trusted. It exists only to teach the shape of token data before later real JWT work.

## Authentication vs Authorization

Authentication answers: who signed in?

Authorization answers: what is this signed-in user allowed to access?

In this app, local login performs authentication. Roles and groups drive authorization decisions for `/admin`, `/security`, and `/finance`.

## Why Roles And Groups Appear In Tokens

Roles and groups are commonly included in identity data because they let applications make access decisions without asking the identity provider on every request. For example, a user with the `admin` role or `GRP-Identity-Admins` group can be allowed into admin-only areas.

Phase 2 shows this with `/api/claims/authorization-check`, which explains why the current user's simulated claims allow or deny access to protected routes.

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

Phases 1 and 2 prepare the app shape for those flows without implementing them yet.

## Future Integration Notes

OIDC: Later phases can replace the local login form with an OIDC sign-in redirect and callback route. The app would map OIDC claims such as subject, email, name, groups, or roles into the session.

SAML: Later phases can add assertion consumer service handling and map SAML assertion attributes into the same local session shape used now.

SCIM: Later phases can replace the static local user list with local provisioning logic that creates, updates, and deactivates dummy users from SCIM requests.

JWT: Later phases can protect API routes with JWT validation middleware. The current `/api/me`, `/api/debug/session`, and `/api/admin/users` routes show where API authorization decisions happen.

Claims: The current `futureClaimsPreview` field is only a fake local preview. It helps learners see how claim-like values may later support access decisions without using real tenant data.

## Phase 3B Entra OIDC Login

OpenID Connect, usually shortened to OIDC, is an identity layer built on OAuth 2.0. It lets an application redirect a user to an identity provider, receive proof that the user authenticated, and use returned claims to create an application session.

Current status: Entra OIDC login is supported only when `OIDC_ENABLED=true` and complete real values are present in a local uncommitted `.env` file. Local dummy login remains available.

Phase 3B uses:

- `openid-client@5`
- `dotenv`

### Authorization Code Flow Preview

The app uses the authorization code flow:

1. The user chooses OIDC login.
2. The app redirects the browser to the identity provider authorization endpoint.
3. Entra ID or Okta authenticates the user.
4. The provider redirects back to `/auth/oidc/callback` with an authorization code.
5. The server exchanges the code at the token endpoint using `openid-client`.
6. The server extracts safe ID token claims.
7. The server creates a local app session without storing raw tokens.

Raw token values are not stored in the Express session and are not returned by any API.

### OIDC Terms

| Term | Meaning |
| --- | --- |
| Issuer | The identity provider that authenticates users and issues tokens |
| Client ID | The public app registration identifier assigned by the provider |
| Redirect URI | The app URL where the provider sends the browser after login |
| Scopes | Requested identity permissions such as `openid`, `profile`, and `email` |
| Authorization endpoint | Provider URL where browser-based login begins |
| Token endpoint | Provider URL where the server later exchanges an authorization code for tokens |
| JWKS URI | Provider URL containing public keys used later for JWT signature validation |

### Entra OIDC Routes

| Route | Current behavior |
| --- | --- |
| `/auth/oidc/start` | Redirects to Entra only when `OIDC_ENABLED=true` and config is complete |
| `/auth/oidc/callback` | Validates callback state, exchanges the code, extracts safe claims, and creates the app session |
| `/oidc-readiness` | Shows Entra OIDC notes and loads safe status from `/api/oidc/status` |
| `/api/oidc/status` | Returns safe OIDC status, masks sensitive values, and never returns client secrets or tokens |

### OIDC Environment Variables

The `.env.example` file contains placeholder-only values. Copy the names into a local `.env` file only when testing Entra OIDC. Do not commit `.env`.

| Variable | Example value | Purpose |
| --- | --- | --- |
| `OIDC_ENABLED` | `false` | Keeps real OIDC disabled until a later phase |
| `OIDC_PROVIDER_NAME` | `Microsoft Entra ID` | Display label for status messages |
| `OIDC_ISSUER_URL` | `https://login.microsoftonline.com/REPLACE_WITH_TENANT_ID/v2.0` | Placeholder issuer URL |
| `OIDC_CLIENT_ID` | `replace-with-entra-app-client-id` | Placeholder client ID |
| `OIDC_CLIENT_SECRET` | `replace-with-entra-client-secret` | Placeholder client secret |
| `OIDC_REDIRECT_URI` | `http://localhost:3000/auth/oidc/callback` | Local callback URL |
| `OIDC_SCOPES` | `openid profile email` | Example scopes |

Real values must only be placed in `iam-practice-app/.env`, which is ignored by Git. Do not commit real tenant IDs, client IDs, client secrets, issuer URLs, discovery metadata, authorization endpoints, token endpoints, JWKS URIs, access tokens, refresh tokens, ID tokens, or private keys.

### Entra ID App Registration

Use a dedicated lab tenant. Do not use an employer or production tenant.

1. Create or open an Entra app registration for the lab app.
2. Add a web redirect URI exactly as:

```text
http://localhost:3000/auth/oidc/callback
```

3. Create a client secret for local testing.
4. Put the issuer URL, client ID, client secret, redirect URI, and scopes only in local `.env`.
5. Keep scopes as:

```text
openid profile email
```

### Local `.env` Setup

Create `iam-practice-app/.env` locally when you are ready to test Entra login:

```text
OIDC_ENABLED=true
OIDC_PROVIDER_NAME=Microsoft Entra ID
OIDC_ISSUER_URL=<your-lab-issuer-url>
OIDC_CLIENT_ID=<your-lab-app-client-id>
OIDC_CLIENT_SECRET=<your-local-client-secret>
OIDC_REDIRECT_URI=http://localhost:3000/auth/oidc/callback
OIDC_SCOPES=openid profile email
```

Never commit this file.

### Future Claims Mapping

When Entra OIDC login succeeds, the app creates a local session from safe ID token claims. OIDC users default to `standard_user`:

```text
authSource=oidc
role=standard_user
userType=external_oidc
```

Role and group claim mapping is intentionally deferred. Entra groups or app roles do not grant admin, security, or finance access in Phase 3B.

Phase 4 will later handle JWT validation for protected APIs.

## Phase 2 Claims Routes

| Route | Purpose |
| --- | --- |
| `/claims` | Browser view that explains claims and shows simulated claim data |
| `/api/claims` | JSON response containing the current user's simulated claims |
| `/api/token-simulation` | JSON response containing the simulated unsigned token-like object |
| `/api/claims/authorization-check` | JSON explanation of route access based on simulated role and group claims |

## Phase 3B Testing Checklist

1. Start the app with `npm.cmd start`.
2. Confirm local dummy login still works.
3. Open `/api/oidc/status` while signed in locally.
4. Confirm secrets and tokens are not returned.
5. Configure local `.env` with lab Entra values.
6. Restart the app.
7. Click `Sign in with Entra OIDC`.
8. Complete Entra sign-in.
9. Confirm the app redirects to `/dashboard`.
10. Confirm `/api/me` shows `authSource: "oidc"` and `role: "standard_user"`.

## Phase 3B Break/Fix Scenario

Break: use the wrong redirect URI in Entra app registration.

Symptom: Entra OIDC login fails with a redirect URI mismatch or callback error.

Fix: set the Entra app registration redirect URI exactly to:

```text
http://localhost:3000/auth/oidc/callback
```

Lesson: OIDC relies on exact redirect URI matching to prevent authorization responses from being sent to the wrong application.

## Phase 2 Testing Checklist

1. Start the app with `npm.cmd start`.
2. Sign in as `admin@identitycore.local` with `AdminPass123!`.
3. Open `/claims` and confirm claim JSON and authorization decisions load.
4. Open `/api/claims` and confirm it contains local placeholder `iss`, `aud`, `roles`, and `groups`.
5. Open `/api/token-simulation` and confirm it says the token is a local training object only.
6. Open `/api/claims/authorization-check` and confirm admin access is allowed.
7. Log out and sign in as `user@identitycore.local` with `UserPass123!`.
8. Open `/api/claims/authorization-check` and confirm admin, security, and finance access are denied.

## Phase 2 Break/Fix Scenario

Break: remove or change the role claim source for a user in `src/users.js`.

Symptom: `/api/claims/authorization-check` shows access changes, or protected route access fails because the user's local role no longer maps to the expected route policy.

Fix: restore the correct `role` and `groups` values in the local user object.

Lesson: applications depend on correct claims to make authorization decisions.

## Browser Testing Checklist

1. Start the app with `npm.cmd start`.
2. Open `http://localhost:3000`.
3. Confirm `/` redirects to `/login` when signed out.
4. Sign in as `admin@identitycore.local` with `AdminPass123!`.
5. Confirm `/dashboard`, `/claims`, `/oidc-readiness`, `/admin`, `/security`, and `/finance` load.
6. Log out.
7. Sign in as `user@identitycore.local` with `UserPass123!`.
8. Confirm `/dashboard` loads.
9. Try `/admin` and confirm the app shows `/access-denied`.

## API Testing Checklist

Browser-based API checks work after signing in because the browser already has the session cookie.

1. Sign in as `admin@identitycore.local`.
2. Open `/api/me` and confirm the response contains the admin profile without a password.
3. Open `/api/debug/session` and confirm it returns safe local session details.
4. Open `/api/claims` and confirm simulated claims are returned.
5. Open `/api/token-simulation` and confirm the response is clearly marked as not a real JWT.
6. Open `/api/claims/authorization-check` and confirm admin access is allowed.
7. Open `/api/oidc/status` and confirm no client secret is exposed.
8. Open `/api/admin/users` and confirm all dummy users are returned without passwords.
9. Log out and sign in as `user@identitycore.local`.
10. Open `/api/me` and confirm the standard user profile appears.
11. Open `/api/admin/users` and confirm access is denied.

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

Symptom: opening `/api/me`, `/api/debug/session`, `/api/claims`, or `/api/token-simulation` redirects to `/login`.

Fix: sign in through the browser first so the browser has a local session cookie.

### Claims page says loading

Symptom: `/claims` loads but the claim panels stay on loading text.

Fix: confirm the app is still running, refresh the page, and verify that `/api/claims` returns JSON while signed in.

### OIDC_ENABLED=false

Symptom: clicking Entra OIDC sign-in shows that OIDC is disabled.

Fix: set `OIDC_ENABLED=true` only in local `.env` when the rest of the Entra config is ready.

### Missing client secret

Symptom: `/api/oidc/status` reports missing fields or login cannot start.

Fix: add the lab client secret to local `.env`. Do not commit it.

### Wrong issuer URL

Symptom: OIDC login cannot start or discovery fails.

Fix: confirm the issuer URL from your lab Entra tenant and keep it only in local `.env`.

### Wrong redirect URI

Symptom: Entra reports redirect URI mismatch.

Fix: use exactly `http://localhost:3000/auth/oidc/callback` in the Entra app registration and local `.env`.

### Missing email claim

Symptom: OIDC login succeeds but the app user email is `unknown@example.local`.

Fix: confirm the provider returns `email` or `preferred_username`. The app safely falls back when email is absent.

## Phase 1 Security Limitations

- Authentication is local-only and not production-safe.
- Dummy users and passwords are stored in local source code for training only.
- Passwords are not hashed in Phase 1.
- The fallback session secret is only for local training.
- `/api/debug/session` is for local troubleshooting only and must not be exposed in production.
- Simulated tokens are not real JWTs and must not be trusted.
- Raw OIDC tokens are not stored in session and are not returned by APIs.
- Real OIDC values belong only in local uncommitted `.env`.
- There is no database, account lockout, local MFA enforcement, audit logging, CSRF protection, SAML, SCIM, protected API JWT validation, or production identity governance integration.
- Do not use these credentials, configuration values, or patterns in production.
