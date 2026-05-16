# Phase 14 — Okta OIDC Local Practice Spec

## Purpose

This document defines the implementation plan for connecting IdentityCore to an Okta lab tenant using OpenID Connect for local practice.

Phase 14 comes after Phase 13, where Microsoft Entra ID OIDC local practice was successfully implemented, tested, pushed, reviewed, and merged.

The goal of Phase 14 is to add a second real identity-provider practice path so the learner can compare Entra ID and Okta behavior safely.

IdentityCore must remain:

- local-first
- safe
- no-secrets
- skill-practice focused
- portfolio-friendly
- not production
- not cloud-deployed by default

---

## Current Project Status

IdentityCore has completed:

- Phase 10 — Docker runtime and final portfolio documentation
- Phase 11 — Enterprise UI Foundation
- Phase 12 — Real Identity Provider Practice Planning
- Phase 13 — Entra ID OIDC Local Practice

The app currently includes:

- local dummy login
- role-based access control
- protected pages
- claims and token simulation
- Microsoft Entra ID OIDC local practice
- safe Entra provider context
- safe Entra claim summary behavior
- OIDC readiness
- JWT readiness
- SCIM users simulation
- SCIM groups simulation
- Joiner, Mover, Leaver simulation
- SAML readiness and simulation
- audit readiness
- Docker runtime support
- enterprise UI foundation
- professional dashboard
- improved access-denied learning flow
- local-only simulator warnings

Phase 14 should build on the same OIDC foundation used in Phase 13, but it must add Okta as a separate optional provider path.

---

## Phase 14 Objective

Enable safe local login with an Okta lab tenant using OpenID Connect.

The learner should be able to:

1. Create or use a dedicated Okta lab/developer tenant.
2. Create an Okta OIDC app integration for IdentityCore.
3. Configure a localhost redirect URI.
4. Store real Okta values only in local uncommitted `.env`.
5. Start IdentityCore locally.
6. Click an Okta login option.
7. Authenticate through Okta.
8. Return to IdentityCore.
9. View safe provider context.
10. View safe Okta claim summary.
11. Compare Okta OIDC behavior with Entra OIDC behavior.
12. Confirm Okta authentication does not automatically grant admin access.

---

## Business Scenario

IdentityCore represents a fictional enterprise identity environment.

In real organizations, Okta is commonly used as a workforce identity provider for application access, SSO, MFA, app assignment, lifecycle workflows, and federation.

This phase teaches how a custom application can delegate authentication to Okta using OpenID Connect.

The learner should understand:

- what an Okta OIDC app integration is
- what an Okta issuer URL is
- what an authorization server is
- what a client ID is
- why client secrets must be protected
- what redirect URIs do
- how Okta claims compare to Entra claims
- how provider authentication differs from local app authorization
- why external claims should not automatically grant privileged local access

---

## Phase 14 North Star

After Phase 14, IdentityCore should support three safe login paths:

```text
Local dummy login
Microsoft Entra ID lab OIDC login
Okta lab OIDC login
```

The learner should clearly see:

```text
local simulator identity
vs.
real Entra authentication
vs.
real Okta authentication
```

IdentityCore must remain usable even when Okta is not configured.

---

## Scope

Phase 14 may include:

- Okta OIDC login button or section
- safe Okta login start route
- safe Okta callback route
- safe Okta config helper
- local session creation after successful Okta OIDC login
- safe Okta provider context
- safe Okta claim summary
- Okta readiness/status page or section
- login page updates
- dashboard updates
- claims page updates
- `/api/claims` provider context updates
- `/api/oidc/status` or a separate Okta status endpoint if needed
- `.env.example` placeholder updates
- README updates
- Okta troubleshooting notes
- local testing instructions

---

## Out of Scope

Phase 14 must not add:

- new Entra features beyond preserving Phase 13
- AWS IAM integration
- real SCIM target
- real SAML identity provider
- database persistence
- cloud deployment
- CI/CD
- SIEM integration
- email integration
- webhook integration
- scheduled tasks
- background jobs
- raw token display
- raw token logging
- persistent token storage
- automatic admin mapping from Okta claims
- automatic group-to-role mapping
- production authentication
- production authorization
- screenshots with unredacted Okta tenant data
- committed `.env`
- committed Okta domain tied to real lab tenant
- committed Okta client ID tied to real lab tenant
- committed Okta client secret
- committed access token
- committed refresh token
- committed ID token

---

## Critical Safety Rule

Use only a dedicated Okta lab/developer tenant.

Never use:

- employer Okta tenant
- production Okta tenant
- customer Okta tenant
- real business users
- production app integration
- production credentials
- production callback URLs

Allowed:

- Okta lab/developer tenant
- fake lab users
- fake names
- fake departments
- local `.env`
- placeholder `.env.example`
- redacted screenshots
- local-only testing

---

## Required Local `.env` Values

Real Okta values must live only in:

```text
D:\identitycore\iam-practice-app\.env
```

Example local-only `.env` values:

```env
OKTA_OIDC_ENABLED=true
OKTA_ISSUER_URL=https://YOUR_OKTA_DOMAIN/oauth2/default
OKTA_CLIENT_ID=YOUR_LOCAL_OKTA_CLIENT_ID
OKTA_CLIENT_SECRET=YOUR_LOCAL_OKTA_CLIENT_SECRET
OKTA_REDIRECT_URI=http://localhost:3000/auth/okta/callback
OKTA_PROVIDER_NAME=Okta Lab
```

The `.env` file must never be committed.

---

## `.env.example` Rules

The repository may contain placeholders only.

Allowed placeholder values:

```env
OKTA_OIDC_ENABLED=false
OKTA_ISSUER_URL=https://YOUR_OKTA_DOMAIN/oauth2/default
OKTA_CLIENT_ID=YOUR_OKTA_CLIENT_ID
OKTA_CLIENT_SECRET=YOUR_OKTA_CLIENT_SECRET
OKTA_REDIRECT_URI=http://localhost:3000/auth/okta/callback
OKTA_PROVIDER_NAME=Okta Lab
```

The `.env.example` file must not contain real Okta domain, real client ID, real client secret, access token, refresh token, ID token, or user data.

---

## Secrets and Sensitive Values That Must Never Be Committed

Never commit:

- `.env`
- `.env.local`
- `.env.production`
- real Okta domain
- real Okta client ID tied to the lab tenant
- Okta client secret
- access token
- refresh token
- ID token
- authorization code
- raw claims containing real user values
- Okta app integration screenshots showing secrets
- Okta screenshots showing real tenant data
- private keys
- certificates

---

## Okta Lab Setup Requirements

Before implementation testing, the learner must have:

- access to an Okta lab/developer environment
- at least one lab test user
- permission to create app integrations
- ability to configure redirect URI
- ability to create or copy client credentials
- ability to assign users to the app integration
- ability to test sign-in

Recommended lab users:

```text
user.identitycore.standard@oktalab.local
user.identitycore.admin@oktalab.local
```

Use fake users only.

---

## Okta App Integration Plan

Create an Okta OIDC app integration.

Suggested values:

```text
App integration name:
APP-Okta-OIDC-IdentityCore-Local

Sign-in method:
OIDC - OpenID Connect

Application type:
Web Application

Sign-in redirect URI:
http://localhost:3000/auth/okta/callback

Sign-out redirect URI:
http://localhost:3000/logout
```

Required configuration:

- application type should support a backend web app flow
- client ID copied to local `.env`
- client secret copied to local `.env`
- redirect URI must exactly match IdentityCore callback route
- app must be assigned to the lab test user
- screenshots must be redacted before any portfolio use

---

## Expected User Experience

If Okta OIDC is not configured:

- app still starts
- local dummy login still works
- Entra OIDC still works if configured
- Okta login is shown as not configured or disabled
- readiness page explains what is missing
- app does not attempt Okta provider login
- app fails closed safely

If Okta OIDC is configured correctly:

- app starts locally
- user can click Okta login
- browser redirects to Okta
- user authenticates with lab account
- browser returns to IdentityCore callback route
- local session is created safely
- dashboard loads
- dashboard shows Okta provider context
- claims page shows safe Okta claim summary
- raw tokens are not displayed
- raw tokens are not logged
- local dummy login remains available
- Entra login remains available if configured

---

## Authentication vs Authorization Rule

Phase 14 may authenticate a user through Okta.

Phase 14 must not automatically grant admin access just because Okta authenticated the user.

Authentication answers:

```text
Who is this user?
```

Authorization answers:

```text
What is this user allowed to access?
```

Allowed behavior:

- Okta-authenticated users map conservatively to `standard_user`
- Okta groups are not automatically mapped to admin
- privileged role mapping is deferred to a later dedicated phase
- local RBAC remains the authorization control

Not allowed:

- any Okta-authenticated user automatically becomes admin
- arbitrary Okta claims grant privileged access
- Okta group claims are trusted without explicit mapping design
- hidden claim-to-role mapping without documentation

---

## Token Handling Rules

IdentityCore must not:

- store raw access tokens
- store raw refresh tokens
- store raw ID tokens
- print raw tokens to console
- show raw tokens on pages
- return raw tokens from APIs
- save tokens to files
- log authorization headers
- expose authorization codes

Allowed:

- safe claim summaries
- provider name
- boolean authentication status
- masked issuer/domain descriptions
- selected presence-only claim indicators
- educational explanation of claims

---

## Safe Okta Claim Summary

If Okta claims are displayed, only show safe learning indicators.

Allowed examples:

```text
provider name
subject present: yes/no
preferred username present: yes/no
email present: yes/no
display name present: yes/no
issuer masked or described
audience present: yes/no
groups claim present: yes/no
raw tokens stored: false
raw claims stored: false
external claims mapped to admin: false
```

Avoid showing real claim values unless redacted or fake lab-only values.

---

## Files Codex May Inspect

Codex may inspect the whole repo.

Codex should inspect at minimum:

```text
README.md
AGENTS.md
iam-practice-app/README.md
iam-practice-app/package.json
iam-practice-app/.env.example
iam-practice-app/src/app.js
iam-practice-app/src/oidcConfig.js
iam-practice-app/src/oidcClient.js
iam-practice-app/src/claims.js
iam-practice-app/src/routes/authRoutes.js
iam-practice-app/src/routes/apiRoutes.js
iam-practice-app/src/routes/pages.js
iam-practice-app/src/views/login.html
iam-practice-app/src/views/dashboard.html
iam-practice-app/src/views/claims.html
iam-practice-app/src/views/oidc-readiness.html
iam-practice-app/src/public/styles.css
```

---

## Files Codex May Change

Codex may change:

```text
iam-practice-app/.env.example
iam-practice-app/README.md
README.md
iam-practice-app/src/app.js
iam-practice-app/src/oidcConfig.js
iam-practice-app/src/oidcClient.js
iam-practice-app/src/claims.js
iam-practice-app/src/routes/authRoutes.js
iam-practice-app/src/routes/apiRoutes.js
iam-practice-app/src/routes/pages.js
iam-practice-app/src/views/login.html
iam-practice-app/src/views/dashboard.html
iam-practice-app/src/views/claims.html
iam-practice-app/src/views/oidc-readiness.html
iam-practice-app/src/public/styles.css
```

Codex may add small Okta-specific helper files only if needed.

If new files are added, Codex must explain why.

---

## Files Codex Should Avoid Changing Unless Necessary

Codex should avoid unnecessary changes to:

```text
iam-practice-app/src/middleware/rbac.js
iam-practice-app/src/middleware/jwtAuth.js
iam-practice-app/src/scimStore.js
iam-practice-app/src/scimGroupStore.js
iam-practice-app/src/auditStore.js
iam-practice-app/Dockerfile
iam-practice-app/docker-compose.yml
iam-practice-app/package.json
iam-practice-app/package-lock.json
```

Any RBAC change must be reviewed manually.

Any package change must be justified.

No new dependency should be added unless absolutely necessary.

---

## Existing Functionality That Must Be Preserved

Phase 14 must preserve:

- app starts locally
- local dummy login works
- Entra OIDC still works if configured
- logout works
- dashboard loads
- RBAC still works
- protected pages still enforce access
- unauthorized users are blocked
- access denied page still works
- claims/token simulation still works
- OIDC readiness page still loads
- JWT readiness page still loads
- SCIM readiness page still loads
- JML readiness page still loads
- SAML readiness page still loads
- audit readiness page still loads
- Docker runtime remains safe
- local-only simulator warning remains clear
- no `.env` committed
- no secrets committed

---

## Required Documentation Updates

Phase 14 should update documentation with:

- Okta lab tenant warning
- local `.env` setup instructions
- `.env.example` placeholder explanation
- Okta app integration setup steps
- redirect URI explanation
- local test steps
- troubleshooting section
- no-secrets reminder
- statement that local dummy login remains available
- statement that Entra login remains available if configured
- statement that Okta authentication does not automatically grant admin authorization

---

## Required Troubleshooting Coverage

Documentation should explain common Okta OIDC errors.

### Wrong Redirect URI

Symptom:

```text
Okta login fails or callback does not return to IdentityCore.
```

Likely cause:

```text
The Okta app integration redirect URI does not exactly match OKTA_REDIRECT_URI.
```

Fix:

```text
Set redirect URI to http://localhost:3000/auth/okta/callback.
```

### Wrong Issuer URL

Symptom:

```text
OIDC discovery or issuer validation fails.
```

Likely cause:

```text
OKTA_ISSUER_URL is wrong, missing /oauth2/default, or points to the wrong Okta org.
```

Fix:

```text
Use https://YOUR_OKTA_DOMAIN/oauth2/default unless your lab uses a different authorization server.
```

### Wrong Client Secret

Symptom:

```text
Okta token exchange fails.
```

Likely cause:

```text
OKTA_CLIENT_SECRET is missing, expired, copied incorrectly, or from the wrong app integration.
```

Fix:

```text
Copy the correct client secret from the Okta app integration into local .env only.
```

### User Not Assigned To App

Symptom:

```text
Okta login blocks the user or says the app is unavailable.
```

Likely cause:

```text
The lab user is not assigned to the Okta app integration.
```

Fix:

```text
Assign the app integration to the lab user or lab group.
```

---

## Manual Screenshots To Capture Later

Screenshots must be captured manually and redacted before committing.

Suggested screenshots:

```text
screenshots/phase-14-okta-oidc-local-practice/PHASE-14-LOGIN-OKTA-OPTION.png
screenshots/phase-14-okta-oidc-local-practice/PHASE-14-OKTA-DASHBOARD-SIGNED-IN.png
screenshots/phase-14-okta-oidc-local-practice/PHASE-14-CLAIMS-SAFE-SUMMARY.png
screenshots/phase-14-okta-oidc-local-practice/PHASE-14-ACCESS-DENIED-STILL-WORKS.png
```

Do not commit screenshots until redacted.

Never commit screenshots showing:

- Okta org domain if sensitive
- Okta client ID
- Okta client secret
- real user email
- raw tokens
- authorization code
- session cookie values

---

## Testing Plan

### Test 1 — App Runs Without Okta Config

With no Okta local `.env` values or with Okta disabled:

```bash
cd /d/identitycore/iam-practice-app
npm install
npm start
```

Expected:

- app starts
- local dummy login works
- Okta login does not attempt real provider call
- readiness page shows safe not-configured state
- Entra behavior remains unchanged

### Test 2 — Local Dummy Login Still Works

Expected:

- local admin login works
- local standard user login works
- dashboard loads
- logout works

### Test 3 — Existing Entra OIDC Still Works

With Entra local `.env` values still configured:

Expected:

- Entra login still works
- Entra dashboard provider context still works
- Entra-authenticated user still maps to `standard_user`

### Test 4 — Okta OIDC Login Works When Configured

With local Okta `.env` values configured:

Expected:

- Okta login redirects to Okta
- lab user signs in
- callback returns to IdentityCore
- local session is created
- dashboard loads
- safe Okta provider context is visible
- raw tokens are not displayed

### Test 5 — RBAC Still Blocks Unauthorized Users

Expected:

- Okta-authenticated user cannot access admin page
- access-denied page displays
- local admin can access admin page

### Test 6 — Readiness Pages Still Work

Expected:

- `/oidc-readiness` loads
- `/jwt-readiness` loads
- `/scim-readiness` loads
- `/saml-readiness` loads
- `/jml-readiness` loads
- `/audit-readiness` loads

---

## Security Review Before Commit

Before commit, confirm:

- no `.env`
- no `.env.local`
- no `.env.production`
- no real Okta domain
- no Okta client ID tied to real tenant
- no Okta client secret
- no access token
- no refresh token
- no ID token
- no authorization code
- no private key
- no certificate
- no raw claims with real user values
- no unredacted screenshot
- no production endpoint
- no cloud deployment
- no database persistence
- no AWS implementation
- no real SCIM target
- no real SAML identity provider

Suggested command:

```bash
cd /d/identitycore
git status --short
git diff -- . ":(exclude)package-lock.json" | grep -Ei "secret|token|password|tenant|client_id|client_secret|okta|access_token|refresh_token|id_token|private_key|BEGIN RSA|BEGIN PRIVATE"
```

Review any output manually.

Safety words in documentation may appear. That is acceptable if no real values are present.

---

## Rollback Plan

If Okta login breaks the app:

1. Stop the app.
2. Disable Okta in local `.env`.
3. Set `OKTA_OIDC_ENABLED=false`.
4. Restart app.
5. Confirm local dummy login still works.
6. Confirm Entra login still works if configured.
7. Review latest code changes.
8. Revert Phase 14 branch if needed before merge.

Phase 14 must not leave the app unusable without Okta configuration.

---

## Acceptance Criteria

Phase 14 is complete when:

- app starts locally without Okta config
- local dummy login still works
- Entra OIDC still works if configured
- Okta readiness handles missing config safely
- Okta login works when local `.env` is correctly configured
- callback returns user safely to IdentityCore
- dashboard shows safe Okta provider context
- claims page shows safe Okta claim summary only
- raw tokens are not displayed
- raw tokens are not logged
- Okta-authenticated user remains restricted from admin
- local admin access still works
- README files are updated
- `.env.example` contains placeholders only
- no `.env` file is committed
- no secrets are committed
- no real Okta tenant/domain values are committed
- no screenshots are committed unless redacted
- branch is pushed
- PR is opened
- PR is reviewed
- PR is merged into `main` only after review

---

## Suggested Branch

```bash
feature/phase-14-okta-oidc-local-practice
```

Codex must not work directly on `main`.

---

## Codex Prompt For Phase 14

Use this prompt only after:

- this spec is committed
- Phase 14 checklist is committed
- local `main` is clean
- Phase 14 feature branch is created

```text
You are working on the IdentityCore IAM Project.

IdentityCore is a local-first IAM skill practice app and simulator. It is not a production IAM system.

Repository: shaheedcloud/identitycore-iam-project
Local folder: D:\identitycore
Current branch: feature/phase-14-okta-oidc-local-practice

Do not work on main.

Task: Implement Phase 14 — Okta OIDC Local Practice.

Goal:
Enable safe local Okta OpenID Connect login practice while preserving local dummy login, Entra OIDC local practice, RBAC, readiness pages, and simulator behavior.

Important:
- Use only local uncommitted `.env` values for real Okta configuration.
- Do not commit `.env`.
- Do not commit real Okta domain, client ID, client secret, tokens, private keys, certificates, screenshots, or real user data.
- Do not display raw tokens.
- Do not log raw tokens.
- Do not store raw access tokens, refresh tokens, or ID tokens.
- Do not add AWS work.
- Do not add real SCIM target.
- Do not add real SAML IdP.
- Do not add database persistence.
- Do not add cloud deployment.
- Do not add CI/CD.
- Do not add SIEM, email, webhook, scheduled jobs, or background jobs.
- Do not automatically map Okta claims or groups to admin access.
- Do not rewrite the app from scratch.

Allowed work:
- inspect the existing project before editing
- add or improve safe Okta OIDC login flow
- add Okta readiness/status behavior
- update login page with safe Okta login option
- create safe local session after successful Okta OIDC login
- show safe Okta provider context
- show safe Okta claim summary only
- update `.env.example` with placeholder Okta values only
- update README documentation
- add safe Okta troubleshooting notes
- preserve local dummy login
- preserve Entra OIDC local practice

Preserve:
- app starts without Okta config
- local dummy login works
- Entra OIDC still works if configured
- logout works
- dashboard works
- RBAC still blocks unauthorized users
- access denied page still works
- claims/token simulation still works
- OIDC readiness page still works
- JWT readiness page still works
- SCIM readiness page still works
- JML readiness page still works
- SAML readiness page still works
- audit readiness page still works
- SCIM/JML/SAML/audit simulator behavior remains intact
- Docker support remains safe
- local-only warning remains clear

Expected behavior without Okta config:
- app starts
- local dummy login works
- Okta login does not attempt real provider call
- readiness page shows safe not-configured state
- no crash occurs
- no raw error exposes secrets

Expected behavior with local `.env` configured:
- Okta login redirects to Okta
- lab user can authenticate
- callback returns to IdentityCore
- local session is created safely
- dashboard loads
- provider context shows Okta Lab
- safe claim summary appears
- raw tokens are not visible
- raw tokens are not logged
- logout works

Local Okta `.env` values are local only and must not be committed:

OKTA_OIDC_ENABLED=true
OKTA_ISSUER_URL=https://YOUR_OKTA_DOMAIN/oauth2/default
OKTA_CLIENT_ID=YOUR_LOCAL_OKTA_CLIENT_ID
OKTA_CLIENT_SECRET=YOUR_LOCAL_OKTA_CLIENT_SECRET
OKTA_REDIRECT_URI=http://localhost:3000/auth/okta/callback
OKTA_PROVIDER_NAME=Okta Lab

Committed `.env.example` may contain placeholders only:

OKTA_OIDC_ENABLED=false
OKTA_ISSUER_URL=https://YOUR_OKTA_DOMAIN/oauth2/default
OKTA_CLIENT_ID=YOUR_OKTA_CLIENT_ID
OKTA_CLIENT_SECRET=YOUR_OKTA_CLIENT_SECRET
OKTA_REDIRECT_URI=http://localhost:3000/auth/okta/callback
OKTA_PROVIDER_NAME=Okta Lab

Authentication versus authorization rule:
- Okta authentication proves who the user is.
- It must not automatically grant admin access.
- Okta-authenticated users should map conservatively to `standard_user`.
- Do not trust arbitrary Okta claims or groups as admin.

Acceptance criteria:
- app starts locally without Okta config
- local dummy login still works
- Entra OIDC still works if configured
- Okta readiness handles missing config safely
- Okta login works with local `.env`
- callback returns user safely to IdentityCore
- dashboard shows safe Okta provider context
- claims page shows safe claim summary only
- raw tokens are not displayed
- raw tokens are not logged
- Okta user access is still restricted
- local admin access still works
- README files updated
- `.env.example` contains placeholders only
- no `.env` file is committed
- no secrets are committed
- no real Okta tenant/domain values are committed
- no screenshots are committed unless redacted

When done, summarize:
1. Files changed
2. Okta OIDC behavior implemented
3. Existing functionality preserved
4. Local test steps performed
5. Security/no-secrets confirmation
6. Whether `.env.example` contains placeholders only
7. Whether package files changed and why
8. Suggested commit message

Suggested commit message:
phase-14: add Okta OIDC local practice
```

---

## Suggested Commit Message

```bash
phase-14: add Okta OIDC local practice
```

---

## Pull Request Title

```text
Phase 14: Okta OIDC Local Practice
```

---

## Pull Request Description

```markdown
## Summary

Adds Phase 14 Okta OIDC local practice support for IdentityCore.

IdentityCore remains a local-first IAM skill practice app and simulator.

## What changed

- Added or improved safe Okta OIDC local login flow
- Preserved local dummy login
- Preserved Entra OIDC local practice
- Added safe Okta provider/claim summary behavior
- Updated `.env.example` with placeholders only
- Updated documentation and troubleshooting notes

## Validation

- App starts without Okta config
- Local dummy login works
- Entra OIDC still works if configured
- Okta OIDC login works with local uncommitted `.env`
- Callback returns to IdentityCore
- Dashboard loads
- Safe Okta claim summary displays
- RBAC still blocks unauthorized users
- Readiness pages still load

## Security review

- No `.env` committed
- No secrets committed
- No real Okta domain committed
- No real Okta client ID committed
- No Okta client secret committed
- No access tokens committed
- No refresh tokens committed
- No ID tokens committed
- No private keys or certificates committed
- No raw tokens displayed or logged
- No AWS integration added
- No cloud deployment added
- No database persistence added
```

---

## Final Rule

Do not start Phase 15 provider comparison or Phase 16 role mapping until Phase 14 is implemented, tested, reviewed, pushed, opened as a PR, and merged into `main`.

Do not allow external identity-provider authentication to automatically grant admin access.