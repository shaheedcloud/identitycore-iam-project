# Phase 13 — Entra ID OIDC Local Practice Spec

## Purpose

This document defines the implementation plan for connecting IdentityCore to a Microsoft Entra ID lab tenant using OpenID Connect for local practice.

Phase 13 is the first real identity-provider practice phase after the local simulator and enterprise UI foundation.

The goal is to let the learner safely practice real Entra ID OIDC login behavior while keeping IdentityCore local-first, safe, no-secrets, and portfolio-friendly.

IdentityCore must remain a skill practice app.

It is not a production identity platform.

---

## Current Project Status

IdentityCore has completed:

- Phase 10 — Docker runtime and final portfolio documentation
- Phase 11 — Enterprise UI Foundation
- Phase 12 — Real Identity Provider Practice Planning

The app currently includes:

- local dummy login
- role-based access control
- protected pages
- claims and token simulation
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
- placeholder messaging for future Entra ID and Okta practice

Phase 13 should build on the existing OIDC readiness foundation.

---

## Phase 13 Objective

Enable safe local login with a Microsoft Entra ID lab tenant using OpenID Connect.

The learner should be able to:

1. Create or use a dedicated Entra ID lab tenant.
2. Create an Entra ID app registration for IdentityCore.
3. Configure a localhost redirect URI.
4. Store real values only in a local uncommitted `.env` file.
5. Start IdentityCore locally.
6. Click an Entra ID login option.
7. Authenticate through the lab tenant.
8. Return to IdentityCore.
9. View a safe claim summary.
10. Compare local dummy identity behavior with real Entra ID OIDC login behavior.
11. Troubleshoot common Entra OIDC errors safely.

---

## Business Scenario

IdentityCore represents a fictional enterprise identity environment.

In a real organization, internal applications often rely on a central identity provider such as Microsoft Entra ID for authentication.

This phase teaches how a custom application can delegate login to Entra ID using OpenID Connect.

The learner should understand:

- what an app registration is
- what a redirect URI does
- what an issuer URL is
- what a client ID is
- why client secrets must be protected
- what claims are
- how OIDC login differs from local dummy login
- how a real identity provider returns authenticated user context
- why authentication is not the same as authorization
- why local RBAC must not blindly trust any external claim as admin access

---

## Phase 13 North Star

After Phase 13, IdentityCore should support two safe login paths:

```text
Local dummy login
```

and:

```text
Microsoft Entra ID lab OIDC login
```

The learner should clearly see the difference between:

- simulator identity
- real lab identity-provider authentication

The app should remain usable even if Entra ID is not configured.

---

## Scope

Phase 13 may include:

- Entra ID OIDC login button or section
- safe Entra ID login start route if not already fully usable
- safe Entra ID callback behavior
- local session creation after successful Entra OIDC login
- safe claim summary display
- OIDC readiness page improvements specific to Entra ID
- safe provider status indicators
- safe error handling for missing or invalid configuration
- `.env.example` placeholder updates
- README updates
- troubleshooting notes for common OIDC issues
- documentation explaining Entra ID app registration setup
- manual screenshot list for future portfolio evidence

---

## Out of Scope

Phase 13 must not add:

- real Okta integration
- real AWS IAM integration
- real SCIM target
- real SAML identity provider
- production authentication
- production authorization
- database persistence
- cloud deployment
- CI/CD
- SIEM integration
- email integration
- webhook integration
- scheduled tasks
- background jobs
- persistent token storage
- raw token display
- raw token logging
- automatic admin role assignment from external claims
- tenant IDs committed to GitHub
- client IDs committed to GitHub if tied to a real lab tenant
- client secrets committed to GitHub
- access tokens committed to GitHub
- refresh tokens committed to GitHub
- ID tokens committed to GitHub
- screenshots showing tenant IDs, app IDs, secret values, or real users

---

## Critical Safety Rule

Use only a dedicated lab tenant.

Never use:

- employer tenant
- production Microsoft tenant
- production user accounts
- customer tenant
- real business users
- real production app registration
- real production credentials

Allowed:

- Entra ID developer tenant
- Azure free/lab tenant
- lab-only test users
- fake names
- fake departments
- fake roles
- local `.env`
- placeholder `.env.example`
- redacted screenshots

---

## Required Local `.env` Values

Real Entra values must live only in:

```text
D:\identitycore\iam-practice-app\.env
```

Example local-only `.env`:

```env
OIDC_ENABLED=true
OIDC_ISSUER_URL=https://login.microsoftonline.com/YOUR-LAB-TENANT-ID/v2.0
OIDC_CLIENT_ID=YOUR-LAB-CLIENT-ID
OIDC_CLIENT_SECRET=YOUR-LOCAL-CLIENT-SECRET
OIDC_REDIRECT_URI=http://localhost:3000/auth/oidc/callback
OIDC_PROVIDER_NAME=Microsoft Entra ID Lab
```

The `.env` file must never be committed.

---

## `.env.example` Rules

The repository may include placeholders only.

Allowed placeholder values:

```env
OIDC_ENABLED=false
OIDC_ISSUER_URL=https://login.microsoftonline.com/YOUR_TENANT_ID/v2.0
OIDC_CLIENT_ID=YOUR_CLIENT_ID
OIDC_CLIENT_SECRET=YOUR_CLIENT_SECRET
OIDC_REDIRECT_URI=http://localhost:3000/auth/oidc/callback
OIDC_PROVIDER_NAME=Microsoft Entra ID Lab
```

The `.env.example` file must not contain real tenant values.

---

## Secrets and Sensitive Values That Must Never Be Committed

Never commit:

- `.env`
- `.env.local`
- `.env.production`
- real tenant ID
- real client ID tied to the lab tenant
- client secret
- access token
- refresh token
- ID token
- authorization code
- raw claims containing real email addresses
- private keys
- certificates
- app registration screenshots showing IDs
- secret screenshots
- unredacted Entra portal screenshots
- unredacted user screenshots

Even if tenant ID and client ID are not passwords, treat them as sensitive for this public portfolio project.

---

## Entra ID Lab Setup Requirements

Before implementation, the learner must have:

- access to Microsoft Entra admin center
- a dedicated lab tenant
- at least one lab test user
- permission to create app registrations
- permission to create client secrets
- ability to configure redirect URI
- ability to test sign-in

Recommended lab user examples:

```text
user.identitycore.admin@[labtenant].onmicrosoft.com
user.identitycore.standard@[labtenant].onmicrosoft.com
```

Use fake users only.

---

## Entra ID App Registration Plan

Create an app registration in the lab tenant.

Suggested values:

```text
App name:
APP-Entra-OIDC-IdentityCore-Local

Supported account types:
Accounts in this organizational directory only

Redirect URI:
http://localhost:3000/auth/oidc/callback
```

Required configuration:

- platform type: Web
- redirect URI: `http://localhost:3000/auth/oidc/callback`
- ID tokens enabled only if needed by current app flow
- client secret created locally
- secret copied once into local `.env`
- secret never committed
- screenshots redacted before saving

---

## Expected User Experience

If Entra OIDC is not configured:

- app still starts
- local dummy login still works
- Entra login is shown as not configured or disabled
- readiness page explains what is missing
- app does not attempt real provider login
- app fails closed safely

If Entra OIDC is configured correctly:

- app starts locally
- user can click Entra ID login
- browser redirects to Microsoft login
- user authenticates with lab account
- browser returns to IdentityCore callback route
- local session is created safely
- dashboard loads
- page shows Entra provider context
- claims page shows safe claim summary
- raw tokens are not displayed
- raw tokens are not logged
- local dummy login remains available

---

## Authentication vs Authorization Rule

Phase 13 may authenticate a user through Entra ID.

Phase 13 must not automatically grant admin access just because Entra authenticated the user.

Authentication answers:

```text
Who is this user?
```

Authorization answers:

```text
What is this user allowed to access?
```

Phase 13 should keep authorization conservative.

Allowed behavior:

- Entra-authenticated users can map to a safe default local role such as `standard_user`
- admin access remains controlled by existing local RBAC unless explicit safe role mapping is implemented in a later phase
- claim-to-role mapping should be deferred to Phase 16 or a dedicated later phase

Not allowed:

- arbitrary Entra claim automatically becomes local admin
- any authenticated Entra user automatically receives admin access
- group claims automatically trusted without explicit mapping design
- role mapping hidden in code without documentation

---

## Token Handling Rules

IdentityCore must not:

- store raw access tokens
- store raw refresh tokens
- store raw ID tokens
- print raw tokens to console
- show raw tokens on pages
- return raw tokens from APIs
- commit any token material
- save tokens to files
- log authorization headers

Allowed:

- safe claim summaries
- provider name
- boolean authentication status
- masked claim identifiers
- selected non-sensitive claim fields if safe
- educational explanation of what claims mean

---

## Safe Claim Summary

If claims are displayed, only show safe learning fields.

Allowed examples:

```text
provider
subject present: yes/no
preferred username present: yes/no
display name present: yes/no
email present: yes/no
issuer masked or described
audience present: yes/no
authentication method reference present: yes/no
```

Avoid showing real values unless redacted or obviously fake lab values.

---

## Files Codex May Inspect

Codex may inspect the whole repo to understand existing structure.

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
iam-practice-app/src/routes/auth.js
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
iam-practice-app/src/routes/auth.js
iam-practice-app/src/routes/pages.js
iam-practice-app/src/views/login.html
iam-practice-app/src/views/dashboard.html
iam-practice-app/src/views/claims.html
iam-practice-app/src/views/oidc-readiness.html
iam-practice-app/src/public/styles.css
```

Codex may add a small helper file only if needed for safe claim normalization.

If a new file is added, Codex must explain why.

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
iam-practice-app/package-lock.json
```

Any change to RBAC must be reviewed manually.

Any package change must be justified.

---

## Existing Functionality That Must Be Preserved

Phase 13 must preserve:

- app starts locally
- local dummy login works
- logout works
- dashboard loads
- RBAC still works
- protected pages still enforce access
- unauthorized users are still blocked
- claims/token simulation still works
- OIDC readiness page still loads
- JWT readiness page still loads
- SCIM readiness page still loads
- JML readiness page still loads
- SAML readiness page still loads
- audit readiness page still loads
- Docker runtime support remains safe
- local-only simulator warning remains clear
- no `.env` committed
- no secrets committed

---

## Required Documentation Updates

Phase 13 should update documentation with:

- Entra ID lab tenant warning
- local `.env` setup instructions
- `.env.example` placeholder explanation
- redirect URI explanation
- app registration setup steps
- local test steps
- troubleshooting section
- no-secrets reminder
- statement that local dummy login remains available
- statement that Entra authentication does not automatically grant admin authorization

---

## Required Troubleshooting Coverage

Documentation should explain common errors:

### Wrong Redirect URI

Symptom:

```text
Microsoft login fails or callback does not return to app.
```

Likely cause:

```text
Redirect URI in Entra app registration does not exactly match app callback URL.
```

Fix:

```text
Set redirect URI to http://localhost:3000/auth/oidc/callback.
```

### Missing Client Secret

Symptom:

```text
OIDC login fails during token exchange.
```

Likely cause:

```text
OIDC_CLIENT_SECRET is missing or expired.
```

Fix:

```text
Create a new client secret in the lab app registration and update local .env.
```

### Wrong Issuer URL

Symptom:

```text
OIDC discovery or issuer validation fails.
```

Likely cause:

```text
OIDC_ISSUER_URL uses the wrong tenant or wrong v2.0 endpoint.
```

Fix:

```text
Use https://login.microsoftonline.com/YOUR-LAB-TENANT-ID/v2.0.
```

### App Not Assigned Or User Not Allowed

Symptom:

```text
User cannot complete login or access app.
```

Likely cause:

```text
Tenant/app assignment/user permission issue.
```

Fix:

```text
Verify lab user exists, app registration is correct, and the user is allowed to sign in.
```

---

## Manual Screenshots To Capture Later

Screenshots must be captured manually and redacted before committing.

Suggested screenshots:

```text
screenshots/phase-13-entra-oidc-local-practice/PHASE-13-LOGIN-ENTRA-OPTION.png
screenshots/phase-13-entra-oidc-local-practice/PHASE-13-OIDC-READINESS-CONFIGURED.png
screenshots/phase-13-entra-oidc-local-practice/PHASE-13-ENTRA-DASHBOARD-SIGNED-IN.png
screenshots/phase-13-entra-oidc-local-practice/PHASE-13-CLAIMS-SAFE-SUMMARY.png
screenshots/phase-13-entra-oidc-local-practice/PHASE-13-ACCESS-DENIED-STILL-WORKS.png
```

Do not commit screenshots until they are redacted.

Never commit screenshots showing:

- tenant ID
- client ID
- client secret
- app registration IDs
- real user email
- raw tokens
- authorization code
- session cookie values

---

## Testing Plan

### Test 1 — App Runs Without Entra Config

With no local `.env` or with OIDC disabled:

```bash
cd /d/identitycore/iam-practice-app
npm install
npm start
```

Expected:

- app starts
- local login works
- Entra login does not attempt real provider call
- readiness page shows safe not-configured state

### Test 2 — Local Dummy Login Still Works

Expected:

- login as local admin still works
- login as standard user still works
- dashboard loads
- logout works

### Test 3 — Entra OIDC Login Works When Configured

With local `.env` configured:

Expected:

- Entra login redirects to Microsoft
- lab user signs in
- callback returns to IdentityCore
- local session is created
- dashboard loads
- safe provider context is visible
- raw tokens are not displayed

### Test 4 — RBAC Still Blocks Unauthorized Users

Expected:

- standard user cannot access admin page
- access-denied page displays
- admin user can access admin page

### Test 5 — Readiness Pages Still Work

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
- no tenant ID
- no client ID tied to real tenant
- no client secret
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
- no Okta implementation
- no AWS implementation
- no real SCIM target
- no real SAML identity provider

Suggested command:

```bash
cd /d/identitycore
git status --short
git diff -- . ":(exclude)package-lock.json" | grep -Ei "secret|token|password|tenant|client_id|client_secret|aws_access_key|private_key|BEGIN RSA|BEGIN PRIVATE"
```

Review any output manually.

Safety words in documentation may appear. That is acceptable if no real values are present.

---

## Rollback Plan

If Entra login breaks the app:

1. Stop the app.
2. Remove or disable local `.env` OIDC values.
3. Set `OIDC_ENABLED=false`.
4. Restart app.
5. Confirm local dummy login still works.
6. Review latest code changes.
7. Revert Phase 13 branch if needed before merge.

Phase 13 must not leave the app unusable without Entra configuration.

---

## Acceptance Criteria

Phase 13 is complete when:

- app starts locally without Entra config
- local dummy login still works
- OIDC readiness page handles missing config safely
- Entra login works when local `.env` is correctly configured
- callback returns user safely to IdentityCore
- dashboard shows safe provider context
- claims page shows safe claim summary only
- raw tokens are not displayed
- raw tokens are not logged
- standard user access is still restricted
- admin access still requires proper local authorization
- README files are updated
- `.env.example` contains placeholders only
- no `.env` file is committed
- no secrets are committed
- no tenant IDs are committed
- no unredacted screenshots are committed
- branch is pushed
- PR is opened
- PR is reviewed
- PR is merged into `main` only after review

---

## Suggested Branch

```bash
feature/phase-13-entra-oidc-local-practice
```

Codex must not work directly on `main`.

---

## Codex Prompt For Phase 13

Use this prompt only after:

- this spec is committed
- Phase 13 checklist is committed
- local `main` is clean
- Phase 13 feature branch is created

```text
You are working on the IdentityCore IAM Project.

IdentityCore is a local-first IAM skill practice app and simulator. It is not a production IAM system.

Repository: shaheedcloud/identitycore-iam-project
Local folder: D:\identitycore
Current branch: feature/phase-13-entra-oidc-local-practice

Do not work on main.

Task: Implement Phase 13 — Entra ID OIDC Local Practice.

Goal:
Enable safe local Microsoft Entra ID OpenID Connect login practice while preserving the existing local dummy login and all simulator behavior.

Important:
- Use only local uncommitted `.env` values for real Entra configuration.
- Do not commit `.env`.
- Do not commit tenant IDs, client IDs, client secrets, tokens, private keys, certificates, or screenshots.
- Do not display or log raw tokens.
- Do not add Okta, AWS, real SCIM target, real SAML IdP, database persistence, cloud deployment, CI/CD, SIEM, email, webhook, or background jobs.
- Do not rewrite the app from scratch.

Allowed:
- improve/use existing Entra OIDC login flow
- improve OIDC readiness page for Entra local practice
- update login page with safe Entra login option
- create safe local session after successful Entra OIDC login
- show safe provider/claim summary only
- update `.env.example` with placeholder values only
- update README documentation
- add safe troubleshooting notes
- preserve local dummy login

Preserve:
- app starts without Entra config
- local dummy login works
- logout works
- dashboard works
- RBAC still blocks unauthorized users
- readiness pages still work
- SCIM/JML/SAML/audit simulator behavior still works
- Docker support remains safe
- local-only warning remains clear

Acceptance criteria:
- app starts with no `.env`
- local dummy login works
- OIDC readiness shows safe not-configured state when missing config
- Entra login works with local `.env` values
- callback creates safe local session
- safe claim summary is shown
- raw tokens are not displayed or logged
- RBAC behavior is preserved
- README files updated
- `.env.example` contains placeholders only
- no secrets committed

When done, summarize:
1. Files changed
2. Entra OIDC behavior implemented
3. Existing functionality preserved
4. Local test steps
5. No-secrets confirmation
6. Suggested commit message

Suggested commit message:
phase-13: add Entra OIDC local practice
```

---

## Suggested Commit Message

```bash
phase-13: add Entra OIDC local practice
```

---

## Pull Request Title

```text
Phase 13: Entra ID OIDC Local Practice
```

---

## Pull Request Description

```markdown
## Summary

Adds Phase 13 Entra ID OIDC local practice support for IdentityCore.

IdentityCore remains a local-first IAM skill practice app and simulator.

## What changed

- Added or improved safe Entra ID OIDC local login flow
- Preserved local dummy login
- Improved OIDC readiness behavior
- Added safe provider/claim summary behavior
- Updated `.env.example` with placeholders only
- Updated documentation and troubleshooting notes

## Validation

- App starts without Entra config
- Local dummy login works
- OIDC readiness handles missing config safely
- Entra OIDC login works with local uncommitted `.env`
- Callback returns to IdentityCore
- Dashboard loads
- Safe claim summary displays
- RBAC still blocks unauthorized users
- Readiness pages still load

## Security review

- No `.env` committed
- No secrets committed
- No tenant IDs committed
- No client secrets committed
- No access tokens committed
- No refresh tokens committed
- No ID tokens committed
- No private keys or certificates committed
- No raw tokens displayed or logged
- No real Okta integration added
- No AWS integration added
- No cloud deployment added
- No database persistence added
```

---

## Final Rule

Do not start Phase 14 Okta work until Phase 13 is implemented, tested, reviewed, pushed, opened as a PR, and merged into `main`.

Do not implement claim-to-role mapping yet unless a dedicated later phase spec exists.

Do not allow external identity-provider authentication to automatically grant admin access.