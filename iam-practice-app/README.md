# IdentityCore IAM Practice App - Phases 1, 2, 3A, 3B, 4, and 5

This app is the local target application for the IdentityCore IAM Project. Phase 1 demonstrates local authentication, Express sessions, and role-based access control with dummy users only. Phase 2 adds local simulated identity claims and token-like objects so learners can inspect identity data before real federation is introduced. Phase 3A adds OIDC readiness placeholders. Phase 3B adds Entra ID OIDC local login support using values loaded only from a local uncommitted `.env` file. Phase 4 adds protected API JWT validation for bearer tokens. Phase 5 adds a local SCIM 2.0 Users endpoint simulation.

The app still keeps local dummy login available. It does not commit real tenant IDs, client IDs, client secrets, access tokens, refresh tokens, ID tokens, private keys, SCIM bearer tokens, SAML configuration, AWS configuration, Docker configuration, databases, or production deployment configuration.

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

## What Phase 4 Demonstrates

- Protected API routes that require `Authorization: Bearer <token>`
- JWT validation with `jose`
- Issuer, audience, signature, and expiration checks
- Safe decoded claim output after validation
- Fail-closed behavior when JWT validation is disabled, incomplete, or placeholder-based
- A clear difference between browser OIDC login and API bearer-token validation

Phase 4 does not store raw JWTs in the session, return raw JWTs from APIs, add refresh token handling, map Entra groups or roles to local admin authorization, add SAML, add SCIM, add AWS, add Docker, or add a database.

## What Phase 5 Demonstrates

- SCIM 2.0 metadata endpoints
- Local SCIM Users list, get, create, replace, patch, and deactivate behavior
- Bearer-token protection for SCIM Users endpoints
- In-memory user provisioning for safe local testing
- Fail-closed behavior when SCIM is disabled, incomplete, or placeholder-based
- The difference between SCIM provisioning, OIDC login, and JWT API validation

Phase 5 does not add SCIM Groups, JML lifecycle simulation, production provisioning, real Entra provisioning setup, real Okta provisioning setup, group push, role mapping, admin UI, persistent storage, SAML, AWS, Docker, or a database.

SCIM Groups are deferred to Phase 6. JML lifecycle simulation is deferred to Phase 7.

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
| `/jwt-readiness` | `GET` | Browser page explaining protected API JWT validation status | Authenticated users |
| `/scim-readiness` | `GET` | Browser page explaining SCIM Users readiness and current safe status | Authenticated users |
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
| `/api/jwt/status` | `GET` | Returns safe JWT validation status without tokens or secrets | Public safe status |
| `/api/scim/status` | `GET` | Returns safe SCIM readiness status without bearer tokens | Public safe status |
| `/api/protected/profile` | `GET` | Returns a safe profile after bearer JWT validation | Valid bearer JWT |
| `/api/protected/claims` | `GET` | Returns safe decoded claims after bearer JWT validation | Valid bearer JWT |
| `/api/protected/admin-check` | `GET` | Shows that admin authorization is deferred after JWT validation | Valid bearer JWT |
| `/api/admin/users` | `GET` | Returns all local dummy users without passwords | `admin` |
| `/scim/v2/ServiceProviderConfig` | `GET` | Returns SCIM service provider metadata | Public metadata |
| `/scim/v2/Schemas` | `GET` | Returns basic SCIM User schema metadata | Public metadata |
| `/scim/v2/ResourceTypes` | `GET` | Returns SCIM User resource type metadata | Public metadata |
| `/scim/v2/Users` | `GET` | Lists in-memory SCIM users | Local SCIM bearer token |
| `/scim/v2/Users/:id` | `GET` | Gets one in-memory SCIM user | Local SCIM bearer token |
| `/scim/v2/Users` | `POST` | Creates an in-memory SCIM user | Local SCIM bearer token |
| `/scim/v2/Users/:id` | `PUT` | Replaces an in-memory SCIM user | Local SCIM bearer token |
| `/scim/v2/Users/:id` | `PATCH` | Updates supported fields such as `active` | Local SCIM bearer token |
| `/scim/v2/Users/:id` | `DELETE` | Deactivates an in-memory SCIM user | Local SCIM bearer token |

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

## OIDC Login vs JWT API Validation

OIDC login is an interactive browser sign-in flow. The app redirects a user to Entra ID, receives an authorization-code callback, extracts safe ID token claims, and creates an Express session for browser pages.

JWT API validation is different. A client calls an API with `Authorization: Bearer <token>`. The API validates the token issuer, audience, signature, and expiration before returning data. This does not create a browser session, and the app never stores or returns the raw token.

Phase 4 protects only selected `/api/protected/*` routes with JWT validation. Existing browser routes still use the Express session created by local dummy login or OIDC login.

## SCIM vs OIDC vs JWT

OIDC authenticates a person in the browser and creates an app session.

JWT validation protects API routes by checking a bearer token on each API request.

SCIM provisions identity records into an application. A provider such as Entra ID or Okta can create, update, and deactivate users in a target app through SCIM endpoints. Phase 5 simulates those endpoints locally with an in-memory user store.

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

Phase 4 handles JWT validation for protected APIs. Role and group claim mapping is intentionally deferred.

## Phase 4 Protected API JWT Validation

Phase 4 uses:

- `jose`
- placeholder-only JWT settings in `.env.example`
- `src/jwtConfig.js` for safe configuration status
- `src/middleware/jwtAuth.js` for bearer-token validation

The protected APIs fail closed unless all of these are true:

1. `JWT_VALIDATION_ENABLED=true`
2. `JWT_ISSUER_URL` is configured and not a placeholder
3. `JWT_AUDIENCE` is configured and not a placeholder
4. `JWT_JWKS_URI` is configured and not a placeholder

When enabled and complete, the middleware validates:

- issuer
- audience
- signature using the remote JWKS
- expiration

Raw JWTs are not logged, stored in session, or returned from any API.

### JWT Environment Variables

The `.env.example` file contains placeholder-only values. Real values belong only in a local uncommitted `.env` file.

| Variable | Example value | Purpose |
| --- | --- | --- |
| `JWT_VALIDATION_ENABLED` | `false` | Keeps protected API JWT validation disabled until local config is ready |
| `JWT_ISSUER_URL` | `https://login.microsoftonline.com/REPLACE_WITH_TENANT_ID/v2.0` | Placeholder issuer expected in the access token |
| `JWT_AUDIENCE` | `api://replace-with-api-client-id` | Placeholder audience expected in the access token |
| `JWT_JWKS_URI` | `https://login.microsoftonline.com/REPLACE_WITH_TENANT_ID/discovery/v2.0/keys` | Placeholder public-key endpoint used for signature validation |
| `JWT_CLOCK_TOLERANCE_SECONDS` | `60` | Small clock skew allowance for token time checks |

### JWT Protected API Routes

| Route | Behavior |
| --- | --- |
| `/api/jwt/status` | Returns safe readiness status and never returns tokens or secrets |
| `/api/protected/profile` | Requires a valid bearer JWT and returns a safe profile subset |
| `/api/protected/claims` | Requires a valid bearer JWT and returns safe decoded claims only |
| `/api/protected/admin-check` | Requires a valid bearer JWT and explains that admin authorization mapping is deferred |

### Local JWT Setup

Create `iam-practice-app/.env` locally only when you are ready to validate a lab Entra access token:

```text
JWT_VALIDATION_ENABLED=true
JWT_ISSUER_URL=<your-lab-token-issuer-url>
JWT_AUDIENCE=<your-lab-api-audience>
JWT_JWKS_URI=<your-lab-jwks-uri>
JWT_CLOCK_TOLERANCE_SECONDS=60
```

Never commit this file. Never paste access tokens, refresh tokens, ID tokens, tenant IDs, client secrets, or private keys into source code, documentation commits, screenshots, issues, or pull requests.

### Phase 4 Testing Checklist

Start the app:

```powershell
cd D:\identitycore\iam-practice-app
npm.cmd install
npm.cmd start
```

Check safe JWT status:

```powershell
Invoke-RestMethod http://localhost:3000/api/jwt/status
```

Confirm missing token is rejected:

```powershell
Invoke-WebRequest http://localhost:3000/api/protected/profile
```

Confirm malformed token is rejected:

```powershell
Invoke-WebRequest http://localhost:3000/api/protected/profile -Headers @{ Authorization = "Bearer not-a-jwt" }
```

After local `.env` is configured and you have a valid lab Entra access token, test safe decoded claims:

```powershell
Invoke-RestMethod http://localhost:3000/api/protected/claims -Headers @{ Authorization = "Bearer <access-token-from-local-lab>" }
```

Do not save the token in source files or terminal transcripts you plan to commit.

### Phase 4 Break/Fix Scenario

Break: set `JWT_AUDIENCE` to the wrong value in local `.env`.

Symptom: `/api/protected/profile` rejects an otherwise valid access token with a JWT validation failure.

Fix: set `JWT_AUDIENCE` to the exact audience value expected in the local lab access token.

Lesson: protected APIs trust tokens only when issuer, audience, signature, and expiration all validate.

## Phase 5 SCIM Users Endpoint

SCIM stands for System for Cross-domain Identity Management. It is commonly used by identity providers to push user lifecycle changes into applications.

Phase 5 provides a local SCIM 2.0 Users simulation:

- Metadata routes are available for learning and discovery.
- Users routes require a local SCIM bearer token.
- Users are stored only in memory and reset when the app restarts.
- `DELETE /scim/v2/Users/:id` deactivates a user instead of permanently deleting data.
- SCIM Groups are deferred to Phase 6.
- JML lifecycle simulation is deferred to Phase 7.

### SCIM Environment Variables

The `.env.example` file contains placeholder-only values. Real local lab values belong only in an uncommitted `iam-practice-app/.env` file.

| Variable | Example value | Purpose |
| --- | --- | --- |
| `SCIM_ENABLED` | `false` | Keeps SCIM Users endpoints fail-closed by default |
| `SCIM_BEARER_TOKEN` | `replace-with-local-scim-bearer-token` | Placeholder bearer token for local SCIM requests |
| `SCIM_BASE_URL` | `http://localhost:3000/scim/v2` | Base URL used in SCIM resource metadata |

### Local SCIM Setup

Create `iam-practice-app/.env` locally only when you are ready to test SCIM Users:

```text
SCIM_ENABLED=true
SCIM_BEARER_TOKEN=<local-training-token-only>
SCIM_BASE_URL=http://localhost:3000/scim/v2
```

Never commit this file. Never paste SCIM bearer tokens, Entra tokens, Okta tokens, client secrets, tenant IDs, or screenshots containing secrets into GitHub.

### SCIM Endpoint List

| Route | Behavior |
| --- | --- |
| `/scim/v2/ServiceProviderConfig` | Shows supported SCIM capabilities |
| `/scim/v2/Schemas` | Shows basic User schema metadata |
| `/scim/v2/ResourceTypes` | Shows the User resource type |
| `/scim/v2/Users` | Lists or creates in-memory SCIM users |
| `/scim/v2/Users/:id` | Gets, replaces, patches, or deactivates one SCIM user |
| `/api/scim/status` | Shows safe SCIM status without returning the bearer token |
| `/scim-readiness` | Browser page for SCIM learning and status |

### Phase 5 PowerShell Tests

Start the app:

```powershell
cd D:\identitycore\iam-practice-app
npm.cmd install
npm.cmd start
```

Check safe SCIM status:

```powershell
Invoke-RestMethod http://localhost:3000/api/scim/status
```

Confirm metadata routes load:

```powershell
Invoke-RestMethod http://localhost:3000/scim/v2/ServiceProviderConfig
Invoke-RestMethod http://localhost:3000/scim/v2/Schemas
Invoke-RestMethod http://localhost:3000/scim/v2/ResourceTypes
```

Confirm Users fails closed by default:

```powershell
Invoke-WebRequest http://localhost:3000/scim/v2/Users
```

After local `.env` is configured with a local training SCIM token, create a user:

```powershell
$headers = @{ Authorization = "Bearer <local-training-token-only>" }
$body = @{
  userName = "new.user@identitycore.local"
  name = @{
    givenName = "New"
    familyName = "User"
  }
  displayName = "New User"
  active = $true
  emails = @(@{
    value = "new.user@identitycore.local"
    type = "work"
    primary = $true
  })
} | ConvertTo-Json -Depth 5

$created = Invoke-RestMethod http://localhost:3000/scim/v2/Users -Method Post -Headers $headers -ContentType "application/scim+json" -Body $body
$created.id
```

Retrieve the user:

```powershell
Invoke-RestMethod "http://localhost:3000/scim/v2/Users/$($created.id)" -Headers $headers
```

Replace the user:

```powershell
$replaceBody = @{
  userName = "new.user@identitycore.local"
  displayName = "New User Updated"
  active = $true
  emails = @(@{
    value = "new.user@identitycore.local"
    type = "work"
    primary = $true
  })
} | ConvertTo-Json -Depth 5

Invoke-RestMethod "http://localhost:3000/scim/v2/Users/$($created.id)" -Method Put -Headers $headers -ContentType "application/scim+json" -Body $replaceBody
```

Patch `active`:

```powershell
$patchBody = @{
  schemas = @("urn:ietf:params:scim:api:messages:2.0:PatchOp")
  Operations = @(@{
    op = "replace"
    path = "active"
    value = $false
  })
} | ConvertTo-Json -Depth 5

Invoke-RestMethod "http://localhost:3000/scim/v2/Users/$($created.id)" -Method Patch -Headers $headers -ContentType "application/scim+json" -Body $patchBody
```

Deactivate with DELETE:

```powershell
Invoke-RestMethod "http://localhost:3000/scim/v2/Users/$($created.id)" -Method Delete -Headers $headers
```

### Phase 5 curl Tests

These examples use `curl.exe` from PowerShell so the command is not confused with PowerShell's `curl` alias.

```powershell
curl.exe http://localhost:3000/api/scim/status
curl.exe http://localhost:3000/scim/v2/ServiceProviderConfig
curl.exe http://localhost:3000/scim/v2/Schemas
curl.exe http://localhost:3000/scim/v2/ResourceTypes
curl.exe -i http://localhost:3000/scim/v2/Users
```

After local `.env` is configured:

```powershell
curl.exe -H "Authorization: Bearer <local-training-token-only>" http://localhost:3000/scim/v2/Users
curl.exe -X POST http://localhost:3000/scim/v2/Users -H "Authorization: Bearer <local-training-token-only>" -H "Content-Type: application/scim+json" -d "{\"userName\":\"new.user@identitycore.local\",\"displayName\":\"New User\",\"active\":true}"
```

### Phase 5 Break/Fix Scenario

Break: set `SCIM_ENABLED=true` but leave `SCIM_BEARER_TOKEN=replace-with-local-scim-bearer-token`.

Symptom: `/scim/v2/Users` still fails closed with a SCIM error.

Fix: set `SCIM_BEARER_TOKEN` to a local training value only in uncommitted `.env`, then send the same value in the `Authorization: Bearer <token>` header.

Lesson: SCIM provisioning depends on both enabled configuration and a shared bearer token, and that token must never be committed.

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
8. Open `/api/jwt/status` and confirm no raw token or secret is exposed.
9. Open `/api/scim/status` and confirm no SCIM bearer token is exposed.
10. Confirm `/api/protected/profile` rejects a request without a bearer token.
11. Confirm `/api/protected/profile` rejects `Authorization: Bearer not-a-jwt`.
12. Confirm `/scim/v2/Users` fails closed while SCIM is disabled or placeholder-based.
13. Open `/api/admin/users` and confirm all dummy users are returned without passwords.
14. Log out and sign in as `user@identitycore.local`.
15. Open `/api/me` and confirm the standard user profile appears.
16. Open `/api/admin/users` and confirm access is denied.

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

### JWT validation disabled

Symptom: `/api/protected/profile` returns `jwt_validation_not_ready`.

Fix: keep this behavior unless you are intentionally testing with a local lab access token. Protected APIs fail closed when validation is disabled.

### Malformed bearer token

Symptom: `/api/protected/profile` returns `malformed_token`.

Fix: send a real three-part JWT access token in the `Authorization: Bearer <token>` header during local testing.

### Wrong JWT issuer or audience

Symptom: a token-shaped value is rejected after validation.

Fix: confirm `JWT_ISSUER_URL` and `JWT_AUDIENCE` match the local lab access token. Keep real values only in local `.env`.

### JWKS discovery failure

Symptom: JWT validation fails before claims are returned.

Fix: confirm `JWT_JWKS_URI` points to the lab provider public keys endpoint and is reachable from your local machine.

### SCIM disabled or placeholder-based

Symptom: `/scim/v2/Users` returns a SCIM error that provisioning is disabled, incomplete, or placeholder-based.

Fix: keep this behavior unless you are testing locally. For local testing, put `SCIM_ENABLED=true` and a local bearer token only in uncommitted `.env`.

### Missing SCIM bearer token

Symptom: `/scim/v2/Users` returns a missing bearer token error.

Fix: send `Authorization: Bearer <local-training-token-only>` with the request.

### SCIM user disappears after restart

Symptom: a SCIM user created during testing is gone after restarting the app.

Fix: this is expected. Phase 5 uses in-memory storage only. No database or persistent storage is included.

## Phase 1 Security Limitations

- Authentication is local-only and not production-safe.
- Dummy users and passwords are stored in local source code for training only.
- Passwords are not hashed in Phase 1.
- The fallback session secret is only for local training.
- `/api/debug/session` is for local troubleshooting only and must not be exposed in production.
- Simulated tokens are not real JWTs and must not be trusted.
- Raw OIDC and JWT token values are not stored in session and are not returned by APIs.
- Real OIDC values belong only in local uncommitted `.env`.
- Real JWT validation values belong only in local uncommitted `.env`.
- Real SCIM bearer tokens belong only in local uncommitted `.env`.
- SCIM user data is in-memory only and resets on restart.
- SCIM Groups and JML lifecycle simulation are intentionally deferred.
- There is no database, account lockout, local MFA enforcement, audit logging, CSRF protection, SAML, role/group authorization from Entra claims, or production identity governance integration.
- Do not use these credentials, configuration values, or patterns in production.
