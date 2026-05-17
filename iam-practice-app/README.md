# IdentityCore IAM Practice App - Phases 1, 2, 3A, 3B, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, and 16

This app is the local target application for the IdentityCore IAM Project. Phase 1 demonstrates local authentication, Express sessions, and role-based access control with dummy users only. Phase 2 adds local simulated identity claims and token-like objects so learners can inspect identity data before real federation is introduced. Phase 3A adds OIDC readiness placeholders. Phase 3B adds Entra ID OIDC local login support using values loaded only from a local uncommitted `.env` file. Phase 4 adds protected API JWT validation for bearer tokens. Phase 5 adds a local SCIM 2.0 Users endpoint simulation. Phase 6 adds a local SCIM 2.0 Groups endpoint simulation. Phase 7 adds a local Joiner, Mover, Leaver lifecycle simulation. Phase 8 adds SAML login readiness and safe local SAML simulation. Phase 9 adds safe local audit logging and troubleshooting evidence. Phase 10 adds local-only Docker runtime support and final portfolio documentation. Phase 11 adds an enterprise-style UI foundation for a more professional local IAM learning portal. Phase 13 tightens Entra ID OIDC local practice so a lab user can authenticate safely while IdentityCore stores only a conservative local session and safe claim summary. Phase 14 adds the same safe local practice pattern for Okta OIDC. Phase 15 adds a provider comparison and claims mapping foundation across local dummy login, Entra OIDC, and Okta OIDC. Phase 16 adds role mapping and authorization practice so learners can see deny-by-default mapping before local RBAC makes access decisions.

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

## What Phase 6 Demonstrates

- Local SCIM Groups list, get, create, replace, patch, and delete behavior
- Group membership updates with SCIM PATCH `add`, `replace`, and `remove`
- User and Group metadata in `/scim/v2/Schemas`
- User and Group resource types in `/scim/v2/ResourceTypes`
- Reuse of the same safe SCIM bearer-token middleware
- In-memory group provisioning for safe local testing

Phase 6 does not add JML lifecycle simulation, production provisioning, real Entra provisioning setup, real Okta provisioning setup, admin UI, role mapping, JWT authorization mapping, persistent storage, SAML, AWS, Docker, or a database.

JML lifecycle simulation is introduced in Phase 7 below.

## What Phase 7 Demonstrates

- Local Joiner lifecycle simulation
- Local Mover lifecycle simulation
- Local Leaver lifecycle simulation
- Simulated identity, department, job title, group, and access changes
- Simulated SCIM-style user action evidence
- Simulated session/access revocation evidence
- In-memory event history for troubleshooting and explanation

Phase 7 does not add real Entra Lifecycle Workflows, real Okta Workflows, real HR integration, real SCIM provisioning from Entra or Okta, SAML login, AWS IAM, Docker, database storage, persistent storage, email notifications, background jobs, scheduled automation, approval workflow engine, admin UI, real session revocation, or production identity governance.

## What Phase 8 Demonstrates

- SAML identity provider versus service provider concepts
- Safe placeholder-only SAML configuration
- Assertion Consumer Service URL and service provider Entity ID
- Safe SAML status output without certificate values
- Local-only simulated SAML callback/session mapping
- SAML-authenticated users mapping to `standard_user`
- SAML versus OIDC versus JWT learning boundaries

Phase 8 does not add real Entra SAML production integration, real Okta SAML production integration, production certificate handling, SAML group-to-role authorization, admin role mapping from SAML attributes, SCIM changes, JML changes, AWS IAM, Docker, database storage, persistent storage, audit logging engine, or production identity governance.

## What Phase 9 Demonstrates

- Local in-memory audit event history
- Safe redaction of passwords, cookies, authorization headers, raw tokens, SAML assertions, certificates, private keys, and bearer values
- Audit status, events, and reset APIs
- Troubleshooting evidence checklist for local labs
- Audit readiness page with recent events
- Safe evidence for login, logout, JWT rejection, SCIM fail-closed, JML, and SAML simulation actions

Phase 9 does not add external SIEM, Splunk, CloudTrail, AWS, Docker, database storage, file-based logs, raw request logging, alerting, background jobs, scheduled tasks, or production audit pipelines.

## What Phase 10 Demonstrates

- Local Docker image build for the IAM Practice App
- `.dockerignore` controls that keep `.env`, dependencies, logs, screenshots, Git data, and sensitive local artifacts out of the image context
- Optional Docker Compose runtime for local portfolio review
- npm and Docker run paths documented side by side
- Final portfolio documentation that summarizes the full IdentityCore build

Phase 10 does not add cloud deployment, Kubernetes, AWS ECS, Azure App Service, Docker registry publishing, CI/CD deployment, production secrets management, database storage, persistent logging, or new IAM features.

## What Phase 11 Demonstrates

- Enterprise-style login and dashboard presentation for portfolio review
- Role and status badges for local simulator, protected routes, least privilege, and future practice areas
- A dashboard organized by IAM learning modules: authentication, claims, RBAC, JWT, OIDC, SCIM, JML, SAML, and audit evidence
- Short IAM explanation panels that make each route easier to discuss in interviews or reviews
- Clearer access denied messaging that shows current role, required role, and the least-privilege lesson
- Future Entra ID and Okta practice cards that remain placeholder-only and do not add real integrations

Phase 11 does not add real Entra ID, Okta, AWS IAM, SCIM target, SAML identity provider, database persistence, cloud deployment, external API calls, secrets, CI/CD, SIEM integration, or new IAM protocol behavior.

## What Phase 13 Demonstrates

- Microsoft Entra ID OIDC authorization code login for local lab practice when configured only through an uncommitted `.env`
- Safe disabled behavior when OIDC is not configured or still placeholder-based
- Callback state and nonce validation through `openid-client`
- Conservative local session creation for Entra-authenticated users
- Entra-authenticated users mapped to `standard_user`
- Dashboard provider context showing the local Entra lab provider name
- Claims page provider context showing presence-only safe claim indicators
- No raw access tokens, refresh tokens, ID tokens, authorization codes, tenant IDs, client secrets, group IDs, or raw external claims displayed or stored in the session

Phase 13 does not add Okta, AWS IAM, real SCIM provisioning, a real SAML IdP, database persistence, cloud deployment, CI/CD, SIEM integration, webhook/email integration, scheduled jobs, background jobs, or external-claim-to-admin role mapping.

## What Phase 14 Demonstrates

- Okta OIDC authorization code login for local lab practice when configured only through an uncommitted `.env`
- Safe disabled behavior when Okta OIDC is not configured or still placeholder-based
- Separate Okta start, callback, and status routes beside the existing Entra OIDC routes
- Callback state and nonce validation through `openid-client`
- Conservative local session creation for Okta-authenticated users
- Okta-authenticated users mapped to `standard_user`
- Dashboard provider context showing `Okta Lab`
- Claims page provider context showing presence-only safe claim indicators
- No raw access tokens, refresh tokens, ID tokens, authorization codes, Okta domains, Okta client secrets, group IDs, or raw external claims displayed or stored in the session

Phase 14 does not add AWS IAM, real SCIM provisioning, a real SAML IdP, database persistence, cloud deployment, CI/CD, SIEM integration, webhook/email integration, scheduled jobs, background jobs, Okta group-to-role mapping, or external-claim-to-admin role mapping.

## What Phase 15 Demonstrates

- Provider comparison for local dummy login, Microsoft Entra ID OIDC, and Okta OIDC
- Safe current-session claim indicators using presence-only or masked values
- Local role source explanation for local users and external OIDC users
- Authentication versus authorization explanation
- Claims mapping guardrails for future explicit allowlisted mapping
- Admin mapping warning that external claims and groups do not automatically grant privileged access
- Confirmation that local RBAC remains the authorization control

Phase 15 does not add automatic admin mapping from Entra claims, automatic admin mapping from Okta claims, group-to-role mapping, AWS IAM, real SCIM provisioning, database persistence, cloud deployment, CI/CD, external API calls beyond existing OIDC behavior, raw token display, raw token logging, committed `.env`, secrets, tenant IDs, Okta domains, client IDs, client secrets, or screenshots.

## What Phase 16 Demonstrates

- Role mapping practice for local dummy login, Microsoft Entra ID OIDC, and Okta OIDC
- Current provider, local role, role source, and matched safe mapping rule
- Safe default external mapping to `standard_user`
- Deny-by-default guardrails for external claims and groups
- Authentication versus authorization explanation
- Confirmation that local RBAC remains the final authorization control

Phase 16 does not add automatic admin mapping from Entra claims, automatic admin mapping from Okta claims, automatic group-to-role mapping, RBAC bypasses, production authorization, AWS IAM, real SCIM provisioning, database persistence, cloud deployment, CI/CD, external API calls beyond existing OIDC behavior, raw token display, raw token logging, committed `.env`, secrets, tenant IDs, Okta domains, client IDs, client secrets, or screenshots.

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

## Entra OIDC Local Practice

IdentityCore starts safely without Entra configuration. Local dummy login remains the default path, and clicking the Entra OIDC login option shows a safe disabled or incomplete-configuration message until local values are ready.

To test with a private Entra lab, create `iam-practice-app/.env` locally. Do not commit it.

```text
OIDC_ENABLED=true
OIDC_ISSUER_URL=https://login.microsoftonline.com/YOUR-LAB-TENANT-ID/v2.0
OIDC_CLIENT_ID=YOUR-LAB-CLIENT-ID
OIDC_CLIENT_SECRET=YOUR-LOCAL-CLIENT-SECRET
OIDC_REDIRECT_URI=http://localhost:3000/auth/oidc/callback
OIDC_PROVIDER_NAME=Microsoft Entra ID Lab
```

The committed `.env.example` must stay placeholder-only:

```text
OIDC_ENABLED=false
OIDC_ISSUER_URL=https://login.microsoftonline.com/YOUR_TENANT_ID/v2.0
OIDC_CLIENT_ID=YOUR_CLIENT_ID
OIDC_CLIENT_SECRET=YOUR_CLIENT_SECRET
OIDC_REDIRECT_URI=http://localhost:3000/auth/oidc/callback
OIDC_PROVIDER_NAME=Microsoft Entra ID Lab
```

After Entra authentication succeeds, IdentityCore creates a local app session with:

- `authSource: "oidc"`
- provider name from `OIDC_PROVIDER_NAME`
- local role `standard_user`
- no privileged authorization mapping from Entra claims
- a safe claim summary showing only whether expected claims were present

Raw access tokens, refresh tokens, ID tokens, authorization codes, client secrets, tenant IDs, group IDs, and raw external claims are not shown on pages, returned from browser session APIs, stored in files, or written to logs.

## Okta OIDC Local Practice

IdentityCore starts safely without Okta configuration. Local dummy login and Entra OIDC practice remain available, and clicking the Okta OIDC login option shows a safe disabled or incomplete-configuration message until local values are ready.

To test with a private Okta lab, create `iam-practice-app/.env` locally. Do not commit it.

```text
OKTA_OIDC_ENABLED=true
OKTA_ISSUER_URL=https://YOUR_OKTA_DOMAIN/oauth2/default
OKTA_CLIENT_ID=YOUR_LOCAL_OKTA_CLIENT_ID
OKTA_CLIENT_SECRET=YOUR_LOCAL_OKTA_CLIENT_SECRET
OKTA_REDIRECT_URI=http://localhost:3000/auth/okta/callback
OKTA_PROVIDER_NAME=Okta Lab
```

The committed `.env.example` must stay placeholder-only:

```text
OKTA_OIDC_ENABLED=false
OKTA_ISSUER_URL=https://YOUR_OKTA_DOMAIN/oauth2/default
OKTA_CLIENT_ID=YOUR_OKTA_CLIENT_ID
OKTA_CLIENT_SECRET=YOUR_OKTA_CLIENT_SECRET
OKTA_REDIRECT_URI=http://localhost:3000/auth/okta/callback
OKTA_PROVIDER_NAME=Okta Lab
```

After Okta authentication succeeds, IdentityCore creates a local app session with:

- `authSource: "oidc"`
- `authProviderType: "okta"`
- provider name from `OKTA_PROVIDER_NAME`
- local role `standard_user`
- no privileged authorization mapping from Okta claims or groups
- a safe claim summary showing only whether expected claims were present

Raw access tokens, refresh tokens, ID tokens, authorization codes, Okta client secrets, Okta group IDs, and raw external claims are not shown on pages, returned from browser session APIs, stored in files, or written to logs.

## Provider Comparison And Claims Mapping

The provider comparison page is available after sign-in:

```text
http://localhost:3000/provider-comparison
```

It compares local dummy login, Microsoft Entra ID OIDC, and Okta OIDC using only safe indicators:

- provider name
- authentication source
- subject claim present or simulated
- username/email present or local test user
- display name present or local test user
- issuer masked or simulated
- audience present or simulated
- groups claim present or local training groups
- local role and local role source
- admin access status
- raw tokens stored: false
- raw tokens displayed: false

The claims mapping guardrail is:

```text
External authentication proves identity. Local authorization decides access.
```

Future role mapping must follow an explicit allowlisted design:

```text
Provider claim -> explicit allowlisted mapping -> local role -> RBAC decision
```

The forbidden design is:

```text
Any external claim or group -> automatic admin access
```

## Role Mapping And Authorization Practice

The role mapping practice page is available after sign-in:

```text
http://localhost:3000/role-mapping
```

It shows the current provider, current local role, role source, matched safe mapping rule, safe default external mapping behavior, and local RBAC route examples.

The Phase 16 practice model is:

```text
Provider claim -> explicit allowlisted mapping rule -> local role -> RBAC decision
```

The current safe behavior is intentionally conservative:

- local dummy users receive the role configured in the local training user object
- Entra-authenticated users map to `standard_user`
- Okta-authenticated users map to `standard_user`
- external claims are not trusted for admin authorization
- external groups are not trusted for privileged authorization
- local RBAC remains the final access control for `/admin`, `/security`, and `/finance`

## Local Docker Runtime

Docker support is local-only for portfolio review. The image is not a production deployment artifact and does not include `.env`, secrets, screenshots, logs, Git metadata, certificates, private keys, tokens, or local dependency folders.

Build the image:

```powershell
cd D:\identitycore\iam-practice-app
docker build -t identitycore-iam-practice-app:local .
```

Run the container:

```powershell
docker run --rm -p 3000:3000 --name identitycore-iam-practice-app identitycore-iam-practice-app:local
```

Open:

```text
http://localhost:3000
```

Optional Docker Compose path:

```powershell
cd D:\identitycore\iam-practice-app
docker compose up --build
```

Stop Compose with:

```powershell
docker compose down
```

Do not pass real OIDC, JWT, SCIM, or SAML values into Docker unless you are doing a local private test with uncommitted environment values. Never bake secrets into the image or Compose file.

### Docker Troubleshooting

Port already in use: stop the local npm app or any existing container using port `3000`, then run Docker again.

Docker cannot find the daemon: start Docker Desktop and rerun the command.

Image build fails during `npm ci`: confirm `package-lock.json` exists and your machine can reach the npm registry.

Login page does not load: confirm the container is running with `docker ps`, then open `http://localhost:3000`.

Local identity integrations are disabled in Docker: expected. Compose defaults OIDC, JWT validation, SCIM, and SAML to disabled placeholders for safe local runtime.

## Route Map

| Route | Method | Purpose | Protection |
| --- | --- | --- | --- |
| `/` | `GET` | Redirects signed-in users to `/dashboard`, otherwise `/login` | Public redirect |
| `/login` | `GET` | Shows the local login form | Public |
| `/login` | `POST` | Checks local dummy credentials and creates a session | Public form post |
| `/auth/oidc/start` | `GET` | Starts Entra OIDC login only when local OIDC config is enabled and complete | Public |
| `/auth/oidc/callback` | `GET` | Handles Entra OIDC callback and creates a safe local app session | Public callback |
| `/auth/okta/start` | `GET` | Starts Okta OIDC login only when local Okta config is enabled and complete | Public |
| `/auth/okta/callback` | `GET` | Handles Okta OIDC callback and creates a safe local app session | Public callback |
| `/logout` | `POST` | Destroys the local session | Session action |
| `/dashboard` | `GET` | Main protected landing page | Authenticated users |
| `/claims` | `GET` | Browser page for inspecting simulated local claims | Authenticated users |
| `/provider-comparison` | `GET` | Browser page comparing local, Entra, and Okta provider indicators and mapping guardrails | Authenticated users |
| `/role-mapping` | `GET` | Browser page showing safe role mapping decisions, deny-by-default behavior, and RBAC examples | Authenticated users |
| `/oidc-readiness` | `GET` | Browser page explaining OIDC readiness and current safe status | Authenticated users |
| `/jwt-readiness` | `GET` | Browser page explaining protected API JWT validation status | Authenticated users |
| `/scim-readiness` | `GET` | Browser page explaining SCIM Users and Groups readiness and current safe status | Authenticated users |
| `/jml-readiness` | `GET` | Browser page explaining Joiner, Mover, Leaver simulation status | Authenticated users |
| `/saml-readiness` | `GET` | Browser page explaining SAML readiness and local simulation status | Authenticated users |
| `/audit-readiness` | `GET` | Browser page showing safe local audit status, events, and evidence | Authenticated users |
| `/admin` | `GET` | Admin-only page | `admin` |
| `/security` | `GET` | Security analyst page | `admin`, `security_analyst` |
| `/finance` | `GET` | Finance page | `admin`, `finance_user` |
| `/access-denied` | `GET` | RBAC denial page | Authenticated users |
| `/api/me` | `GET` | Returns the current local user profile without password | Authenticated users |
| `/api/debug/session` | `GET` | Local-only session troubleshooting data | Authenticated users |
| `/api/claims` | `GET` | Returns the current user's simulated claims | Authenticated users |
| `/api/token-simulation` | `GET` | Returns a local unsigned token-like object | Authenticated users |
| `/api/claims/authorization-check` | `GET` | Explains route access using role and group claims | Authenticated users |
| `/api/provider-comparison` | `GET` | Returns safe provider comparison and claims mapping guardrails | Authenticated users |
| `/api/role-mapping` | `GET` | Returns safe role mapping practice data and RBAC guardrails | Authenticated users |
| `/api/oidc/status` | `GET` | Returns safe OIDC readiness status without secrets | Authenticated users |
| `/api/okta/status` | `GET` | Returns safe Okta OIDC readiness status without secrets | Authenticated users |
| `/api/jwt/status` | `GET` | Returns safe JWT validation status without tokens or secrets | Public safe status |
| `/api/scim/status` | `GET` | Returns safe SCIM readiness status without bearer tokens | Public safe status |
| `/api/jml/status` | `GET` | Returns safe local-only JML simulation status | Authenticated users |
| `/api/saml/status` | `GET` | Returns safe SAML readiness status without certificates or assertions | Public safe status |
| `/api/audit/status` | `GET` | Returns safe local audit status | Authenticated users |
| `/api/audit/events` | `GET` | Returns safe local in-memory audit events | Authenticated users |
| `/api/audit/reset` | `POST` | Clears only local in-memory audit events | Authenticated users |
| `/api/troubleshooting/evidence` | `GET` | Returns a safe local troubleshooting checklist and recent event summary | Authenticated users |
| `/api/jml/events` | `GET` | Returns local JML event history | Authenticated users |
| `/api/jml/joiner` | `POST` | Simulates onboarding a user and assigning access | Authenticated users |
| `/api/jml/mover` | `POST` | Simulates department/job changes and access movement | Authenticated users |
| `/api/jml/leaver` | `POST` | Simulates deactivation, access removal, and revocation evidence | Authenticated users |
| `/api/jml/reset` | `POST` | Clears local JML simulation state | Authenticated users |
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
| `/scim/v2/Groups` | `GET` | Lists in-memory SCIM groups | Local SCIM bearer token |
| `/scim/v2/Groups/:id` | `GET` | Gets one in-memory SCIM group | Local SCIM bearer token |
| `/scim/v2/Groups` | `POST` | Creates an in-memory SCIM group | Local SCIM bearer token |
| `/scim/v2/Groups/:id` | `PUT` | Replaces an in-memory SCIM group | Local SCIM bearer token |
| `/scim/v2/Groups/:id` | `PATCH` | Adds, replaces, or removes group members | Local SCIM bearer token |
| `/scim/v2/Groups/:id` | `DELETE` | Removes an in-memory SCIM group | Local SCIM bearer token |
| `/auth/saml/login` | `GET` | Shows safe SAML disabled/configuration behavior or local simulation form | Public |
| `/auth/saml/callback` | `POST` | Accepts only local simulated SAML callback data when simulation is enabled | Public local simulation |
| `/saml/metadata` | `GET` | Returns safe local SP metadata without certificates or private keys | Public metadata |

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

SCIM provisions identity records into an application. A provider such as Entra ID or Okta can create, update, and deactivate users and groups in a target app through SCIM endpoints. Phases 5 and 6 simulate those endpoints locally with in-memory stores.

## SAML vs OIDC vs JWT

SAML is a browser SSO protocol that exchanges XML-based identity assertions between an identity provider and a service provider. In this app, the future service provider would expose an assertion consumer service URL at `/auth/saml/callback` and metadata at `/saml/metadata`.

OIDC is a browser login protocol that uses OAuth 2.0 and JSON-based tokens. The app already supports Entra OIDC login when local uncommitted `.env` values are configured.

JWT validation is API protection. A client sends `Authorization: Bearer <token>`, and the API validates issuer, audience, signature, and expiration before returning data.

Phase 8 keeps SAML local and safe. It does not add production SAML certificate handling, real Entra or Okta SAML integration, or SAML group-to-role authorization.

## Joiner, Mover, Leaver

Joiner, Mover, Leaver, usually shortened to JML, describes identity lifecycle management:

- Joiner: a new person enters the organization and receives the right identity, attributes, groups, and app access.
- Mover: an existing person changes department, job title, or responsibility and access must be adjusted.
- Leaver: a person leaves and access must be removed quickly and provably.

Phase 7 simulates this lifecycle locally. It records evidence that an IAM engineer or architect would expect to review: identity changes, SCIM-style provisioning actions, group changes, access changes, deactivation, and simulated revocation.

## Relying Party And Service Provider Readiness

In later labs, this app can act as the target application that trusts an external identity provider:

- As an OIDC relying party, it would redirect users to Entra ID or Okta, receive an authorization response, and create a local session from validated identity claims.
- As a SAML service provider, it would receive a SAML assertion from Entra ID or Okta and map assertion attributes to the local app session.
- As a SCIM-enabled application, it could expose provisioning endpoints so an identity provider can create, update, or deactivate app users.
- As a protected API, it could require JWT validation before returning data.

Phases 1 and 2 prepare the app shape for those flows without implementing them yet.

## Future Integration Notes

OIDC: Later phases can replace the local login form with an OIDC sign-in redirect and callback route. The app would map OIDC claims such as subject, email, name, groups, or roles into the session.

SAML: Phase 8 adds readiness pages, safe status output, safe local metadata, and a local-only simulation path. Real Entra or Okta production SAML setup remains deferred.

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
- JML lifecycle simulation is introduced in Phase 7 below.

## Phase 6 SCIM Groups Endpoint

Phase 6 adds a local SCIM 2.0 Groups simulation:

- Groups routes require the same local SCIM bearer token as Users.
- Groups are stored only in memory and reset when the app restarts.
- Group members are represented as SCIM member objects with `value`, `display`, and `type`.
- `PATCH /scim/v2/Groups/:id` supports `add`, `replace`, and `remove` operations for members.
- `DELETE /scim/v2/Groups/:id` removes the group from the in-memory store.
- JML lifecycle simulation is introduced in Phase 7 below.

SCIM Users represent provisioned application accounts. SCIM Groups represent collections of users that an identity provider can push for access organization, assignment context, or later lifecycle workflows. Phase 6 stores group membership data for learning only; it does not map groups to local app roles or JWT authorization.

## Phase 7 JML Lifecycle Simulation

Phase 7 adds a local-only Joiner, Mover, Leaver simulation:

- Joiner prepares a simulated identity, sets department and job title, records a simulated SCIM-style user action, assigns a department-based group/access pair, and records evidence.
- Mover updates the simulated identity, removes old group/access, adds new group/access, and records evidence.
- Leaver deactivates the simulated identity, removes all group/access membership, records simulated session/access revocation evidence, and records evidence.
- Reset clears the in-memory lifecycle simulation state.

This phase does not call Entra, Okta, AWS, HR systems, email services, or external APIs. It does not add background jobs, scheduled automation, real session revocation, real approval workflows, or persistent storage.

### JML API Endpoint List

| Route | Behavior |
| --- | --- |
| `/api/jml/status` | Returns safe local-only simulation status |
| `/api/jml/events` | Returns local JML event history |
| `/api/jml/joiner` | Creates a simulated Joiner event |
| `/api/jml/mover` | Creates a simulated Mover event |
| `/api/jml/leaver` | Creates a simulated Leaver event |
| `/api/jml/reset` | Clears local JML identities and events |
| `/jml-readiness` | Browser page for JML learning and status |

### Phase 7 PowerShell Tests

Sign in through the browser first, or use a PowerShell web session:

```powershell
$session = New-Object Microsoft.PowerShell.Commands.WebRequestSession
$loginBody = "email=admin%40identitycore.local&password=AdminPass123%21"
try {
  Invoke-WebRequest http://localhost:3000/login -Method Post -Body $loginBody -ContentType "application/x-www-form-urlencoded" -WebSession $session -MaximumRedirection 0 -UseBasicParsing
} catch {}
```

Check status and reset state:

```powershell
Invoke-RestMethod http://localhost:3000/api/jml/status -WebSession $session
Invoke-RestMethod http://localhost:3000/api/jml/reset -Method Post -WebSession $session
```

Simulate a Joiner:

```powershell
$joinerBody = @{
  email = "jordan.joiner@identitycore.local"
  displayName = "Jordan Joiner"
  department = "Finance"
  jobTitle = "Finance Analyst"
} | ConvertTo-Json

$joiner = Invoke-RestMethod http://localhost:3000/api/jml/joiner -Method Post -WebSession $session -ContentType "application/json" -Body $joinerBody
$joiner.identity.id
```

Simulate a Mover:

```powershell
$moverBody = @{
  id = $joiner.identity.id
  department = "Security Operations"
  jobTitle = "Security Analyst"
} | ConvertTo-Json

Invoke-RestMethod http://localhost:3000/api/jml/mover -Method Post -WebSession $session -ContentType "application/json" -Body $moverBody
```

Simulate a Leaver:

```powershell
$leaverBody = @{
  id = $joiner.identity.id
} | ConvertTo-Json

Invoke-RestMethod http://localhost:3000/api/jml/leaver -Method Post -WebSession $session -ContentType "application/json" -Body $leaverBody
```

Review events:

```powershell
Invoke-RestMethod http://localhost:3000/api/jml/events -WebSession $session
```

### Phase 7 curl Tests

These examples use `curl.exe` and a cookie jar for the local session:

```powershell
curl.exe -c cookies.txt -d "email=admin@identitycore.local&password=AdminPass123!" -X POST http://localhost:3000/login
curl.exe -b cookies.txt http://localhost:3000/api/jml/status
curl.exe -b cookies.txt -X POST http://localhost:3000/api/jml/reset
curl.exe -b cookies.txt -H "Content-Type: application/json" -d "{\"email\":\"jordan.joiner@identitycore.local\",\"displayName\":\"Jordan Joiner\",\"department\":\"Finance\",\"jobTitle\":\"Finance Analyst\"}" http://localhost:3000/api/jml/joiner
curl.exe -b cookies.txt http://localhost:3000/api/jml/events
Remove-Item cookies.txt
```

Do not commit cookie files, terminal transcripts containing real tokens, or screenshots with sensitive values.

### Phase 7 Break/Fix Scenario

Break: run a Mover request with the wrong identity `id`.

Symptom: a new simulated identity is created or referenced instead of moving the intended identity.

Fix: copy the `identity.id` from the Joiner response and use that same id in the Mover and Leaver requests.

Lesson: lifecycle workflows depend on stable identity correlation. In real systems, a bad source anchor or mismatched identifier can move or deprovision the wrong account.

### Phase 7 Deferrals

Real Entra Lifecycle Workflows and real Okta Workflows are deferred. Real HR integration, real SCIM provisioning from Entra or Okta, background jobs, scheduled automation, email notifications, approval workflow engines, production identity governance, and real session revocation are not included.

Production SAML setup remains deferred. Phase 8 adds only safe SAML readiness and local simulation support.

## Phase 8 SAML Login Readiness

Security Assertion Markup Language, usually shortened to SAML, is a browser SSO protocol. A SAML identity provider authenticates the user and sends a SAML assertion to a service provider. In this project, the IAM Practice App is the service provider.

Key SAML terms:

- Identity Provider, or IdP: the system that authenticates the user, such as Entra ID or Okta in a future production lab.
- Service Provider, or SP: the application that receives and trusts the assertion.
- ACS URL: the assertion consumer service URL where the IdP posts the SAML response. This app uses `/auth/saml/callback`.
- Entity ID: the service provider identifier exposed in metadata.
- Certificate: the IdP signing certificate used by real SAML implementations to verify assertions. Phase 8 does not commit or return real certificate values.

Phase 8 adds:

- Safe placeholder-only SAML configuration in `.env.example`.
- Safe SAML readiness status at `/api/saml/status`.
- A SAML readiness page at `/saml-readiness`.
- Safe local SP metadata at `/saml/metadata`.
- Safe SAML login and callback placeholders.
- Optional local-only SAML callback simulation for learning session mapping.

Phase 8 does not add production Entra SAML, production Okta SAML, production certificate handling, real SAML assertion validation, SAML group-to-role mapping, or admin authorization from SAML attributes.

### SAML Environment Variables

The `.env.example` file contains placeholder-only values. Real local lab values belong only in an uncommitted `iam-practice-app/.env` file.

| Variable | Example value | Purpose |
| --- | --- | --- |
| `SAML_ENABLED` | `false` | Keeps real SAML login disabled by default |
| `SAML_LOCAL_SIMULATION_ENABLED` | `false` | Enables only the local training callback form when set locally |
| `SAML_PROVIDER_NAME` | `Example SAML Identity Provider` | Display name for readiness/status output |
| `SAML_IDP_SSO_URL` | `https://idp.example.local/saml/sso` | Placeholder IdP sign-in URL |
| `SAML_IDP_ENTITY_ID` | `https://idp.example.local/saml/entity` | Placeholder IdP entity ID |
| `SAML_SP_ENTITY_ID` | `http://localhost:3000/saml/metadata` | Local service provider entity ID |
| `SAML_ACS_URL` | `http://localhost:3000/auth/saml/callback` | Local assertion consumer service URL |
| `SAML_IDP_CERTIFICATE` | `replace-with-local-saml-idp-certificate` | Placeholder only; never commit a real certificate |

### SAML Endpoint List

| Route | Behavior |
| --- | --- |
| `/saml-readiness` | Browser page for SAML learning and safe status |
| `/api/saml/status` | Safe status without certificate values, assertions, or secrets |
| `/auth/saml/login` | Safe disabled/configuration behavior, or local simulation form when explicitly enabled |
| `/auth/saml/callback` | Local simulated callback only when `SAML_LOCAL_SIMULATION_ENABLED=true` |
| `/saml/metadata` | Safe local SP metadata without certificates or private keys |

### Local SAML Simulation

The local simulation is optional and exists only to show how SAML attributes can become an Express session. It does not call a real IdP and does not validate real assertions.

Create `iam-practice-app/.env` locally only when you want to test simulation:

```text
SAML_LOCAL_SIMULATION_ENABLED=true
```

Then open `/auth/saml/login` and submit the sample form. The app creates a local session user with:

- `authSource: "saml"`
- `role: "standard_user"`
- `userType: "external_saml"`

SAML groups or roles are not mapped to admin, security, or finance access in Phase 8.

### Phase 8 PowerShell Tests

Start the app:

```powershell
cd D:\identitycore\iam-practice-app
npm.cmd install
npm.cmd start
```

Check safe SAML status:

```powershell
Invoke-RestMethod http://localhost:3000/api/saml/status
```

Check safe metadata:

```powershell
Invoke-WebRequest http://localhost:3000/saml/metadata -UseBasicParsing
```

Confirm default SAML login fails safely:

```powershell
Invoke-WebRequest http://localhost:3000/auth/saml/login -UseBasicParsing
```

To test local simulation, set `SAML_LOCAL_SIMULATION_ENABLED=true` only in local uncommitted `.env`, restart the app, and open:

```text
http://localhost:3000/auth/saml/login
```

### Phase 8 Troubleshooting

SAML login says disabled: `SAML_ENABLED=false` is expected for safe default behavior.

SAML login says configuration is incomplete: one or more required SAML values are missing or placeholder-based.

SAML callback says simulation is disabled: set `SAML_LOCAL_SIMULATION_ENABLED=true` only in local uncommitted `.env`, then restart the app.

SAML user cannot access admin routes: expected. SAML-authenticated users always map to `standard_user` in Phase 8.

Certificate value appears in status output: stop and fix the app before committing. `/api/saml/status` must never return full certificate values.

### Phase 8 Break/Fix Scenario

Break: enable local SAML simulation and expect the simulated SAML user to become an admin.

Symptom: the user signs in through the simulation but still receives access denied on `/admin`.

Fix: keep the user as `standard_user`. Admin role mapping from SAML attributes is intentionally deferred.

Lesson: SAML authentication proves who the user is, but authorization mapping must be explicitly designed and reviewed before granting privileged access.

### Phase 8 Deferrals

Real Entra SAML production setup, real Okta SAML production setup, production certificate handling, SAML assertion validation, SAML group-to-role authorization, admin role mapping from SAML attributes, production governance, AWS IAM, Docker, database storage, and persistent storage are not included.

## Phase 9 Audit Logging And Troubleshooting Evidence

Phase 9 adds a safe local audit event store for IAM troubleshooting practice. Events are kept in memory only, are redacted before storage, and reset when the app restarts or when `/api/audit/reset` is called.

The audit store records controlled event details for:

- successful local login
- failed local login
- logout
- JWT missing, malformed, or invalid authorization header attempts
- SCIM disabled, incomplete, or placeholder-based fail-closed requests
- JML joiner, mover, leaver, and reset actions
- SAML disabled login attempts
- local SAML simulation success

The audit store does not capture raw request headers, cookies, passwords, authorization headers, bearer tokens, raw JWTs, OIDC tokens, SAML assertions, SCIM bearer tokens, private keys, certificates, screenshots, or raw request bodies.

### Phase 9 Endpoint List

| Route | Behavior |
| --- | --- |
| `/audit-readiness` | Browser page for audit learning, recent events, and reset |
| `/api/audit/status` | Safe local audit status and redaction summary |
| `/api/audit/events` | Safe in-memory audit event history |
| `/api/audit/reset` | Clears local in-memory audit events only |
| `/api/troubleshooting/evidence` | Safe troubleshooting checklist and recent event summary |

### Phase 9 PowerShell Tests

Start the app:

```powershell
cd D:\identitycore\iam-practice-app
npm.cmd install
npm.cmd start
```

Create a failed login event:

```powershell
Invoke-WebRequest http://localhost:3000/login -Method Post -Body @{ email = "admin@identitycore.local"; password = "wrong-password" } -UseBasicParsing
```

Create a successful login event and use the session:

```powershell
$body = @{ email = "admin@identitycore.local"; password = "AdminPass123!" }
Invoke-WebRequest http://localhost:3000/login -Method Post -Body $body -SessionVariable session -UseBasicParsing
Invoke-RestMethod http://localhost:3000/api/audit/status -WebSession $session
Invoke-RestMethod http://localhost:3000/api/audit/events -WebSession $session
Invoke-RestMethod http://localhost:3000/api/troubleshooting/evidence -WebSession $session
```

Create JWT and SCIM troubleshooting evidence:

```powershell
Invoke-RestMethod http://localhost:3000/api/protected/profile
Invoke-RestMethod http://localhost:3000/scim/v2/Users
```

Create JML evidence:

```powershell
Invoke-RestMethod http://localhost:3000/api/jml/joiner -Method Post -Body (@{
  email = "audit.joiner@identitycore.local"
  displayName = "Audit Joiner"
  department = "Finance"
  jobTitle = "Finance Analyst"
} | ConvertTo-Json) -ContentType "application/json" -WebSession $session
```

Reset audit evidence:

```powershell
Invoke-RestMethod http://localhost:3000/api/audit/reset -Method Post -WebSession $session
```

### Phase 9 Browser Tests

1. Sign in with a local dummy user.
2. Open `/audit-readiness`.
3. Confirm audit status, recent events, and troubleshooting evidence load.
4. Press the reset button.
5. Confirm the event history clears.

### Phase 9 Break/Fix Scenarios

Break: call `/api/protected/profile` without an `Authorization` header.

Symptom: the API returns `missing_bearer_token`, and `/api/audit/events` shows a `jwt_token_rejected` event without storing the token or header.

Fix: send a valid local lab bearer token only when testing JWT validation.

Lesson: protected APIs should fail closed and produce safe troubleshooting evidence without capturing credentials.

Break: call `/scim/v2/Users` while SCIM is disabled or placeholder-based.

Symptom: the API returns a SCIM fail-closed error, and `/api/audit/events` shows `scim_fail_closed`.

Fix: keep fail-closed behavior unless testing SCIM locally with an uncommitted `.env`.

Lesson: provisioning endpoints should explain readiness safely without exposing bearer tokens.

### Phase 9 Security Notes

This is not a production audit system. There is no external SIEM, Splunk, CloudTrail, AWS integration, database, file logging, alerting, webhook, email notification, background job, scheduled task, or persistent storage.

Never add raw token capture, cookie logging, Authorization header logging, SAML assertion capture, SCIM bearer token capture, passwords, private keys, certificates, or screenshots to audit events.

Phase 10 is Docker and final portfolio documentation.

### SCIM Environment Variables

The `.env.example` file contains placeholder-only values. Real local lab values belong only in an uncommitted `iam-practice-app/.env` file.

| Variable | Example value | Purpose |
| --- | --- | --- |
| `SCIM_ENABLED` | `false` | Keeps SCIM Users and Groups endpoints fail-closed by default |
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
| `/scim/v2/Schemas` | Shows basic User and Group schema metadata |
| `/scim/v2/ResourceTypes` | Shows User and Group resource types |
| `/scim/v2/Users` | Lists or creates in-memory SCIM users |
| `/scim/v2/Users/:id` | Gets, replaces, patches, or deactivates one SCIM user |
| `/scim/v2/Groups` | Lists or creates in-memory SCIM groups |
| `/scim/v2/Groups/:id` | Gets, replaces, patches, or removes one SCIM group |
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

### Phase 6 PowerShell Tests

With the same local SCIM `.env` configuration and `$headers` from the Phase 5 examples, create a group:

```powershell
$groupBody = @{
  displayName = "IdentityCore SCIM Test Group"
  members = @(@{
    value = $created.id
    display = "new.user@identitycore.local"
    type = "User"
  })
} | ConvertTo-Json -Depth 5

$group = Invoke-RestMethod http://localhost:3000/scim/v2/Groups -Method Post -Headers $headers -ContentType "application/scim+json" -Body $groupBody
$group.id
```

Retrieve the group:

```powershell
Invoke-RestMethod "http://localhost:3000/scim/v2/Groups/$($group.id)" -Headers $headers
```

Replace the group:

```powershell
$replaceGroupBody = @{
  displayName = "IdentityCore SCIM Test Group Updated"
  members = @()
} | ConvertTo-Json -Depth 5

Invoke-RestMethod "http://localhost:3000/scim/v2/Groups/$($group.id)" -Method Put -Headers $headers -ContentType "application/scim+json" -Body $replaceGroupBody
```

Patch group members with `add`:

```powershell
$addMemberBody = @{
  schemas = @("urn:ietf:params:scim:api:messages:2.0:PatchOp")
  Operations = @(@{
    op = "add"
    path = "members"
    value = @(@{
      value = $created.id
      display = "new.user@identitycore.local"
      type = "User"
    })
  })
} | ConvertTo-Json -Depth 6

Invoke-RestMethod "http://localhost:3000/scim/v2/Groups/$($group.id)" -Method Patch -Headers $headers -ContentType "application/scim+json" -Body $addMemberBody
```

Patch group members with `replace`:

```powershell
$replaceMembersBody = @{
  schemas = @("urn:ietf:params:scim:api:messages:2.0:PatchOp")
  Operations = @(@{
    op = "replace"
    path = "members"
    value = @()
  })
} | ConvertTo-Json -Depth 6

Invoke-RestMethod "http://localhost:3000/scim/v2/Groups/$($group.id)" -Method Patch -Headers $headers -ContentType "application/scim+json" -Body $replaceMembersBody
```

Patch group members with `remove`:

```powershell
$removeMemberBody = @{
  schemas = @("urn:ietf:params:scim:api:messages:2.0:PatchOp")
  Operations = @(@{
    op = "remove"
    path = "members"
    value = @(@{
      value = $created.id
    })
  })
} | ConvertTo-Json -Depth 6

Invoke-RestMethod "http://localhost:3000/scim/v2/Groups/$($group.id)" -Method Patch -Headers $headers -ContentType "application/scim+json" -Body $removeMemberBody
```

Delete the group:

```powershell
Invoke-RestMethod "http://localhost:3000/scim/v2/Groups/$($group.id)" -Method Delete -Headers $headers
```

### Phase 5 And 6 curl Tests

These examples use `curl.exe` from PowerShell so the command is not confused with PowerShell's `curl` alias.

```powershell
curl.exe http://localhost:3000/api/scim/status
curl.exe http://localhost:3000/scim/v2/ServiceProviderConfig
curl.exe http://localhost:3000/scim/v2/Schemas
curl.exe http://localhost:3000/scim/v2/ResourceTypes
curl.exe -i http://localhost:3000/scim/v2/Users
curl.exe -i http://localhost:3000/scim/v2/Groups
```

After local `.env` is configured:

```powershell
curl.exe -H "Authorization: Bearer <local-training-token-only>" http://localhost:3000/scim/v2/Users
curl.exe -X POST http://localhost:3000/scim/v2/Users -H "Authorization: Bearer <local-training-token-only>" -H "Content-Type: application/scim+json" -d "{\"userName\":\"new.user@identitycore.local\",\"displayName\":\"New User\",\"active\":true}"
curl.exe -H "Authorization: Bearer <local-training-token-only>" http://localhost:3000/scim/v2/Groups
curl.exe -X POST http://localhost:3000/scim/v2/Groups -H "Authorization: Bearer <local-training-token-only>" -H "Content-Type: application/scim+json" -d "{\"displayName\":\"IdentityCore SCIM Test Group\",\"members\":[]}"
```

### Phase 6 Break/Fix Scenario

Break: send a PATCH request with `op` misspelled or without a supported `members` operation.

Symptom: the group is returned, but membership does not change.

Fix: send `op` as `add`, `replace`, or `remove`, set `path` to `members`, and include member objects with a `value`.

Lesson: SCIM PATCH behavior depends on exact operation names and attribute paths.

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
| `/provider-comparison` | Browser view comparing local, Entra, and Okta identity indicators |
| `/api/provider-comparison` | JSON response containing safe provider comparison and mapping guardrails |
| `/role-mapping` | Browser view explaining safe role mapping and local RBAC decisions |
| `/api/role-mapping` | JSON response containing safe role mapping guardrails and RBAC examples |

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

## Phase 13 Entra OIDC Local Practice Checklist

Without local Entra config:

1. Start the app with `npm.cmd start`.
2. Open `/login`.
3. Confirm local dummy login works.
4. Open `/oidc-readiness` after signing in locally.
5. Confirm `/api/oidc/status` reports disabled or placeholder-based readiness without returning secrets.
6. Click `Sign in with Entra OIDC` and confirm no real provider redirect starts while config is incomplete.

With local uncommitted `.env` configured:

1. Set only local private Entra values in `iam-practice-app/.env`.
2. Restart the app.
3. Click `Sign in with Entra OIDC`.
4. Complete Microsoft Entra lab sign-in.
5. Confirm the callback returns to `/dashboard`.
6. Confirm the dashboard shows the configured provider context.
7. Confirm `/api/me` shows `authSource: "oidc"` and `role: "standard_user"`.
8. Open `/claims` and confirm the provider context contains safe presence-only indicators.
9. Confirm admin access is still blocked for the OIDC-authenticated user.
10. Confirm raw tokens are not visible in pages, APIs, console output, or files.

## Phase 14 Okta OIDC Local Practice Checklist

Without local Okta config:

1. Start the app with `npm.cmd start`.
2. Open `/login`.
3. Confirm local dummy login works.
4. Open `/oidc-readiness` after signing in locally.
5. Confirm `/api/okta/status` reports disabled or placeholder-based readiness without returning secrets.
6. Click `Sign in with Okta OIDC` and confirm no real Okta redirect starts while config is incomplete.
7. Confirm `/api/oidc/status` still reports the Entra state independently.

With local uncommitted `.env` configured:

1. Set only local private Okta values in `iam-practice-app/.env`.
2. Restart the app.
3. Click `Sign in with Okta OIDC`.
4. Complete Okta lab sign-in.
5. Confirm the callback returns to `/dashboard`.
6. Confirm the dashboard shows `Okta Lab` provider context.
7. Confirm `/api/me` shows `authSource: "oidc"`, `authProviderType: "okta"`, and `role: "standard_user"`.
8. Open `/claims` and confirm the provider context contains safe presence-only indicators.
9. Confirm admin access is still blocked for the Okta-authenticated user.
10. Confirm raw tokens are not visible in pages, APIs, console output, or files.

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
6. Open `/provider-comparison` and confirm provider comparison loads without real provider configuration.
7. Open `/role-mapping` and confirm role mapping practice shows local role source and RBAC examples.
8. Log out.
9. Sign in as `user@identitycore.local` with `UserPass123!`.
10. Confirm `/dashboard` loads.
11. Try `/admin` and confirm the app shows `/access-denied`.

## API Testing Checklist

Browser-based API checks work after signing in because the browser already has the session cookie.

1. Sign in as `admin@identitycore.local`.
2. Open `/api/me` and confirm the response contains the admin profile without a password.
3. Open `/api/debug/session` and confirm it returns safe local session details.
4. Open `/api/claims` and confirm simulated claims are returned.
5. Open `/api/token-simulation` and confirm the response is clearly marked as not a real JWT.
6. Open `/api/claims/authorization-check` and confirm admin access is allowed.
7. Open `/api/provider-comparison` and confirm it contains safe provider indicators and no raw tokens.
8. Open `/api/role-mapping` and confirm external admin mapping and external group admin mapping are false.
9. Open `/api/oidc/status` and confirm no client secret is exposed.
10. Open `/api/jwt/status` and confirm no raw token or secret is exposed.
11. Open `/api/scim/status` and confirm no SCIM bearer token is exposed.
12. Open `/api/jml/status` and confirm it is local-only.
13. Open `/api/jml/events` and confirm event history is returned.
14. Confirm `/api/protected/profile` rejects a request without a bearer token.
15. Confirm `/api/protected/profile` rejects `Authorization: Bearer not-a-jwt`.
16. Confirm `/scim/v2/Users` fails closed while SCIM is disabled or placeholder-based.
17. Confirm `/scim/v2/Groups` fails closed while SCIM is disabled or placeholder-based.
18. Open `/api/admin/users` and confirm all dummy users are returned without passwords.
19. Log out and sign in as `user@identitycore.local`.
20. Open `/api/me` and confirm the standard user profile appears.
21. Open `/api/admin/users` and confirm access is denied.

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

### Entra login does not redirect to Microsoft

Symptom: clicking `Sign in with Entra OIDC` shows that OIDC is disabled, incomplete, or placeholder-based.

Fix: confirm `OIDC_ENABLED=true` and all OIDC values are set only in local `iam-practice-app/.env`. Restart the app after changing `.env`.

### Entra login succeeds but user is not admin

Symptom: the dashboard loads after Entra authentication, but `/admin` is still denied.

Fix: this is expected. Phase 13 treats Entra authentication and local authorization separately. Entra-authenticated users map to `standard_user`; privileged role mapping requires a later approved phase.

### Claims page does not show raw Entra claims

Symptom: `/claims` shows simulated local claims and a safe provider summary instead of raw Entra claim values.

Fix: this is expected. Phase 13 stores only presence indicators for learning and does not expose raw external claim values, tokens, group IDs, tenant IDs, or user identifiers.

### Okta login does not redirect to Okta

Symptom: clicking `Sign in with Okta OIDC` shows that Okta OIDC is disabled, incomplete, or placeholder-based.

Fix: confirm `OKTA_OIDC_ENABLED=true` and all Okta OIDC values are set only in local `iam-practice-app/.env`. Restart the app after changing `.env`.

### Okta login succeeds but user is not admin

Symptom: the dashboard loads after Okta authentication, but `/admin` is still denied.

Fix: this is expected. Phase 14 treats Okta authentication and local authorization separately. Okta-authenticated users map to `standard_user`; group-to-role mapping requires a later approved phase.

### Claims page does not show raw Okta claims

Symptom: `/claims` shows simulated local claims and a safe provider summary instead of raw Okta claim values.

Fix: this is expected. Phase 14 stores only presence indicators for learning and does not expose raw external claim values, tokens, group IDs, Okta domains, or user identifiers.

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

Symptom: `/scim/v2/Users` or `/scim/v2/Groups` returns a SCIM error that provisioning is disabled, incomplete, or placeholder-based.

Fix: keep this behavior unless you are testing locally. For local testing, put `SCIM_ENABLED=true` and a local bearer token only in uncommitted `.env`.

### Missing SCIM bearer token

Symptom: `/scim/v2/Users` or `/scim/v2/Groups` returns a missing bearer token error.

Fix: send `Authorization: Bearer <local-training-token-only>` with the request.

### SCIM user disappears after restart

Symptom: a SCIM user created during testing is gone after restarting the app.

Fix: this is expected. Phase 5 uses in-memory storage only. No database or persistent storage is included.

### SCIM group disappears after restart

Symptom: a SCIM group created during testing is gone after restarting the app.

Fix: this is expected. Phase 6 uses in-memory storage only. No database or persistent storage is included.

### SCIM group membership patch does not change members

Symptom: PATCH returns the group, but the `members` array is unchanged.

Fix: confirm the operation uses `op` as `add`, `replace`, or `remove`, uses `path` as `members`, and sends member objects with a `value`.

### JML events are empty

Symptom: `/api/jml/events` returns no events.

Fix: run `/api/jml/joiner`, `/api/jml/mover`, or `/api/jml/leaver` first. The event store is in-memory only and resets when the app restarts or `/api/jml/reset` is called.

### Mover updates the wrong identity

Symptom: the Mover response does not show the expected identity.

Fix: use the `identity.id` returned by the Joiner event. Stable identity correlation is the key lifecycle lesson in Phase 7.

### Audit events are empty

Symptom: `/api/audit/events` returns no events.

Fix: trigger a local login, failed login, logout, JWT missing-token request, SCIM fail-closed request, JML action, or SAML disabled login attempt. Audit events are in-memory only and reset when the app restarts or `/api/audit/reset` is called.

### Audit evidence does not show raw tokens

Symptom: `/api/audit/events` does not include Authorization headers, cookies, raw JWTs, SAML assertions, SCIM bearer tokens, certificates, or passwords.

Fix: this is expected. Phase 9 intentionally records only safe troubleshooting evidence.

### Docker container cannot start

Symptom: `docker run` exits or the app is not reachable.

Fix: confirm Docker Desktop is running, port `3000` is not already in use, and the image was built from `iam-practice-app/`.

### Docker image should not contain `.env`

Symptom: a reviewer is concerned that local environment values may have been copied into the image.

Fix: inspect `iam-practice-app/.dockerignore`. It excludes `.env`, `.env.*`, logs, screenshots, Git files, certificates, keys, token-like files, and local dependency folders. Use only `.env.example` for committed placeholders.

## Phase 1 Security Limitations

- Authentication is local-only and not production-safe.
- Dummy users and passwords are stored in local source code for training only.
- Passwords are not hashed in Phase 1.
- The fallback session secret is only for local training.
- `/api/debug/session` is for local troubleshooting only and must not be exposed in production.
- Simulated tokens are not real JWTs and must not be trusted.
- Raw OIDC and JWT token values are not stored in session and are not returned by APIs.
- OIDC session data stores only a conservative local user profile and safe claim-presence summary.
- Entra-authenticated users map to `standard_user`; Entra claims do not grant admin access in Phase 13.
- Okta-authenticated users map to `standard_user`; Okta claims and groups do not grant admin access in Phase 14.
- Phase 16 role mapping practice is deny-by-default and does not trust external claims or groups for privileged authorization.
- Real OIDC values belong only in local uncommitted `.env`.
- Real JWT validation values belong only in local uncommitted `.env`.
- Real SCIM bearer tokens belong only in local uncommitted `.env`.
- SCIM user and group data is in-memory only and resets on restart.
- JML identity and event data is in-memory only and resets on restart.
- JML is a local simulation only and does not call external identity systems.
- Real SAML certificates and production SAML values belong only in local uncommitted `.env`.
- SAML readiness and local simulation do not validate real assertions.
- SAML-authenticated users are mapped to `standard_user` only.
- Audit events are local, in-memory, redacted, and not production audit logs.
- Docker support is local portfolio runtime only and does not add cloud deployment or production infrastructure.
- There is no database, account lockout, local MFA enforcement, external SIEM, Splunk, CloudTrail, file-based logging, CSRF protection, production SAML integration, role/group authorization from Entra claims, real workflow automation, or production identity governance integration.
- Do not use these credentials, configuration values, or patterns in production.
