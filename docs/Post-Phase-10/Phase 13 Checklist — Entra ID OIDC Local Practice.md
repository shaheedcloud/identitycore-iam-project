# Phase 13 Checklist — Entra ID OIDC Local Practice

## Purpose

This checklist controls Phase 13 from planning through merge.

Use this checklist before starting, before giving Codex work, after Codex finishes, during local testing, before commit, before push, before PR review, and before merge.

Phase 13 must safely add Microsoft Entra ID OIDC local practice while preserving IdentityCore as a local-first skill practice app.

---

## Phase 13 Goal

Safely connect IdentityCore to a Microsoft Entra ID lab tenant using OpenID Connect for local practice.

The app should support:

- local dummy login
- optional Entra ID lab login
- safe OIDC readiness behavior
- safe claim summary display
- no raw token display
- no raw token logging
- no secrets committed
- no automatic admin trust from external claims

---

## 1. Before Starting

Run from Git Bash:

```bash
cd /d/identitycore
git checkout main
git pull origin main
git status --short
```

Expected result:

```text
(no output)
```

Confirm:

- [ ] current branch is `main`
- [ ] local `main` is updated
- [ ] working tree is clean
- [ ] Phase 12 planning document is committed to `main`
- [ ] Phase 13 spec is created
- [ ] Phase 13 checklist is created
- [ ] no `.env` file is staged or tracked
- [ ] no secrets are present

---

## 2. Commit Planning Documents First

Before creating the feature branch, commit these two documents to `main`:

```text
docs/Post-Phase-10/Phase 13 — Entra ID OIDC Local Practice Spec.md
docs/Post-Phase-10/Phase 13 Checklist — Entra ID OIDC Local Practice.md
```

Run:

```bash
cd /d/identitycore
git add "docs/Post-Phase-10/Phase 13 — Entra ID OIDC Local Practice Spec.md"
git add "docs/Post-Phase-10/Phase 13 Checklist — Entra ID OIDC Local Practice.md"
git status --short
git commit -m "docs: add phase-13 Entra OIDC local practice planning"
git push origin main
```

Confirm:

- [ ] both planning docs are committed
- [ ] both planning docs are pushed to `main`
- [ ] both planning docs are added to ChatGPT Project Source
- [ ] no app code has changed yet
- [ ] no `.env` has been committed
- [ ] no secrets have been committed

---

## 3. Create Phase 13 Feature Branch

After planning docs are committed and `main` is clean, run:

```bash
cd /d/identitycore
git checkout -b feature/phase-13-entra-oidc-local-practice
git branch --show-current
```

Expected result:

```text
feature/phase-13-entra-oidc-local-practice
```

Confirm:

- [ ] branch is not `main`
- [ ] branch name is correct
- [ ] branch was created from updated `main`
- [ ] Phase 13 implementation will happen only on this branch

---

## 4. Pre-Codex Checklist

Before giving Codex the Phase 13 prompt, confirm:

- [ ] Phase 13 branch exists
- [ ] current branch is `feature/phase-13-entra-oidc-local-practice`
- [ ] Codex must not work on `main`
- [ ] Codex must inspect before editing
- [ ] Codex must preserve local dummy login
- [ ] Codex must preserve RBAC
- [ ] Codex must preserve readiness pages
- [ ] Codex must preserve SCIM/JML/SAML/audit simulator behavior
- [ ] Codex must not add Okta work
- [ ] Codex must not add AWS work
- [ ] Codex must not add database persistence
- [ ] Codex must not add cloud deployment
- [ ] Codex must not add external API work beyond the intended local Entra OIDC login flow
- [ ] Codex must not commit `.env`
- [ ] Codex must not commit secrets
- [ ] Codex must not display raw tokens
- [ ] Codex must not log raw tokens
- [ ] Codex must not automatically map external claims to admin access

---

## 5. Codex Handoff Prompt

Use the approved prompt from:

```text
docs/Post-Phase-10/Phase 13 — Entra ID OIDC Local Practice Spec.md
```

The Codex prompt must include:

- [ ] repository name
- [ ] local folder
- [ ] current branch
- [ ] phase goal
- [ ] allowed work
- [ ] forbidden work
- [ ] local `.env` rules
- [ ] `.env.example` placeholder rules
- [ ] no-secrets rules
- [ ] token handling rules
- [ ] functionality to preserve
- [ ] acceptance criteria
- [ ] testing expectations
- [ ] required summary
- [ ] suggested commit message

---

## 6. Required Entra ID Lab Setup

Before testing real login, confirm:

- [ ] lab tenant exists
- [ ] tenant is not employer tenant
- [ ] tenant is not production tenant
- [ ] lab user exists
- [ ] app registration can be created
- [ ] redirect URI can be configured
- [ ] client secret can be created
- [ ] app registration screenshots can be redacted
- [ ] all real values will stay in local `.env`

Suggested app registration values:

```text
App name:
APP-Entra-OIDC-IdentityCore-Local

Redirect URI:
http://localhost:3000/auth/oidc/callback

Supported account type:
Accounts in this organizational directory only
```

---

## 7. Local `.env` Checklist

Create or update this file locally only:

```text
D:\identitycore\iam-practice-app\.env
```

Never commit it.

Required local values:

```env
OIDC_ENABLED=true
OIDC_ISSUER_URL=https://login.microsoftonline.com/YOUR-LAB-TENANT-ID/v2.0
OIDC_CLIENT_ID=YOUR-LAB-CLIENT-ID
OIDC_CLIENT_SECRET=YOUR-LOCAL-CLIENT-SECRET
OIDC_REDIRECT_URI=http://localhost:3000/auth/oidc/callback
OIDC_PROVIDER_NAME=Microsoft Entra ID Lab
```

Confirm:

- [ ] `.env` exists locally only if needed
- [ ] `.env` is ignored by Git
- [ ] `.env` is not shown in `git status --short`
- [ ] real tenant ID is not in committed files
- [ ] real client ID is not in committed files
- [ ] client secret is not in committed files

---

## 8. `.env.example` Checklist

The committed `.env.example` may contain placeholders only.

Allowed placeholder pattern:

```env
OIDC_ENABLED=false
OIDC_ISSUER_URL=https://login.microsoftonline.com/YOUR_TENANT_ID/v2.0
OIDC_CLIENT_ID=YOUR_CLIENT_ID
OIDC_CLIENT_SECRET=YOUR_CLIENT_SECRET
OIDC_REDIRECT_URI=http://localhost:3000/auth/oidc/callback
OIDC_PROVIDER_NAME=Microsoft Entra ID Lab
```

Confirm:

- [ ] placeholders only
- [ ] no real tenant ID
- [ ] no real client ID
- [ ] no client secret
- [ ] no token values
- [ ] no real user values

---

## 9. Existing Functionality Codex Must Preserve

Codex must preserve:

- [ ] app starts locally
- [ ] app works without `.env`
- [ ] local dummy login works
- [ ] logout works
- [ ] dashboard loads
- [ ] RBAC still works
- [ ] protected pages still enforce access
- [ ] unauthorized users are blocked
- [ ] access denied page still works
- [ ] claims/token simulation still works
- [ ] OIDC readiness page loads
- [ ] JWT readiness page loads
- [ ] SCIM readiness page loads
- [ ] JML readiness page loads
- [ ] SAML readiness page loads
- [ ] audit readiness page loads
- [ ] Docker runtime remains safe
- [ ] local-only simulator messaging remains clear

---

## 10. Forbidden Phase 13 Work

Codex must not add:

- [ ] real Okta integration
- [ ] real AWS IAM integration
- [ ] real SCIM target
- [ ] real SAML identity provider
- [ ] database persistence
- [ ] cloud deployment
- [ ] production deployment
- [ ] CI/CD
- [ ] SIEM integration
- [ ] email integration
- [ ] webhook integration
- [ ] scheduled tasks
- [ ] background jobs
- [ ] raw token logging
- [ ] raw token display
- [ ] automatic admin mapping from Entra claims
- [ ] real tenant IDs in repo
- [ ] real client IDs in repo
- [ ] client secrets in repo
- [ ] access tokens in repo
- [ ] refresh tokens in repo
- [ ] ID tokens in repo
- [ ] private keys
- [ ] certificates
- [ ] unredacted screenshots

---

## 11. Post-Codex Review

After Codex finishes, run:

```bash
cd /d/identitycore
git status --short
git diff --stat
```

Review:

- [ ] changed files make sense
- [ ] no `.env` file appears
- [ ] no screenshots unexpectedly added
- [ ] no unrelated feature added
- [ ] no Okta implementation added
- [ ] no AWS implementation added
- [ ] no database added
- [ ] no cloud deployment added
- [ ] no raw token display added
- [ ] no raw token logging added
- [ ] no RBAC weakening occurred
- [ ] documentation updated

If `rbac.js` changed, inspect it carefully:

```bash
git diff -- iam-practice-app/src/middleware/rbac.js
```

---

## 12. Local Test Without Entra Config

First test with Entra disabled or without `.env`.

Run:

```bash
cd /d/identitycore/iam-practice-app
npm install
npm start
```

Open:

```text
http://localhost:3000
```

Validate:

- [ ] app starts without errors
- [ ] login page loads
- [ ] local dummy login works
- [ ] dashboard loads
- [ ] OIDC readiness page loads
- [ ] Entra login does not attempt real provider call when not configured
- [ ] readiness page shows safe missing-config/not-configured state
- [ ] no crash occurs
- [ ] no raw error exposes secrets

Stop app:

```text
CTRL + C
```

---

## 13. Local Test With Entra Config

Create local `.env` only.

Run:

```bash
cd /d/identitycore/iam-practice-app
npm start
```

Validate:

- [ ] login page loads
- [ ] Entra login option appears
- [ ] clicking Entra login redirects to Microsoft
- [ ] lab user can authenticate
- [ ] callback returns to IdentityCore
- [ ] dashboard loads
- [ ] session is created
- [ ] provider context shows Entra or Microsoft Entra ID Lab
- [ ] safe claim summary appears
- [ ] raw tokens are not visible
- [ ] raw tokens are not logged
- [ ] logout works

Stop app:

```text
CTRL + C
```

---

## 14. RBAC Test

Test after Entra login and after local login.

Standard user test:

- [ ] sign in as standard/local user
- [ ] attempt admin page
- [ ] access denied page appears
- [ ] required role/current role logic still works

Admin user test:

- [ ] sign in as local admin
- [ ] admin page loads
- [ ] security page loads if allowed
- [ ] finance page loads if allowed
- [ ] `/api/admin/users` works for admin user

Important:

- [ ] Entra-authenticated user does not automatically become admin
- [ ] external claims are not blindly trusted for admin access

---

## 15. Readiness Page Test

Confirm these routes still work:

```text
/oidc-readiness
/jwt-readiness
/scim-readiness
/saml-readiness
/jml-readiness
/audit-readiness
```

Checklist:

- [ ] all pages load
- [ ] layout is not broken
- [ ] simulator messaging remains clear
- [ ] Entra-specific readiness is clear
- [ ] no page claims production readiness
- [ ] no page exposes real secrets

---

## 16. Documentation Review

Confirm documentation explains:

- [ ] Phase 13 adds local Entra OIDC practice only
- [ ] app remains local-first
- [ ] app remains a skill practice simulator
- [ ] `.env` is local only
- [ ] `.env.example` contains placeholders only
- [ ] local dummy login remains available
- [ ] Entra login is optional
- [ ] missing config fails closed
- [ ] raw tokens are not displayed or logged
- [ ] Entra authentication does not automatically grant admin authorization
- [ ] screenshots must be redacted

---

## 17. Security Review Before Commit

Run from repo root:

```bash
cd /d/identitycore
git status --short
```

Confirm:

- [ ] no `.env`
- [ ] no `.env.local`
- [ ] no `.env.production`
- [ ] no screenshots unless intentionally added and redacted
- [ ] no tenant IDs
- [ ] no client secrets
- [ ] no tokens
- [ ] no private keys
- [ ] no certificates

Run:

```bash
git diff -- . ":(exclude)package-lock.json" | grep -Ei "secret|token|password|tenant|client_id|client_secret|aws_access_key|private_key|BEGIN RSA|BEGIN PRIVATE"
```

Review output manually.

Safety text such as “do not commit secrets” is acceptable.

Real values are not acceptable.

---

## 18. Commit

Only after review and testing:

```bash
cd /d/identitycore
git add .
git status --short
git commit -m "phase-13: add Entra OIDC local practice"
```

---

## 19. Push

Run:

```bash
git push origin feature/phase-13-entra-oidc-local-practice
```

---

## 20. Pull Request

Pull request title:

```text
Phase 13: Entra ID OIDC Local Practice
```

Pull request description:

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

## 21. PR Review Checklist

Before merge:

- [ ] PR targets `main`
- [ ] PR source is `feature/phase-13-entra-oidc-local-practice`
- [ ] changed files reviewed
- [ ] app tested without Entra config
- [ ] app tested with local Entra config
- [ ] local dummy login still works
- [ ] RBAC still works
- [ ] no `.env`
- [ ] no secrets
- [ ] no raw tokens
- [ ] no unredacted screenshots
- [ ] no Okta work
- [ ] no AWS work
- [ ] no database
- [ ] no cloud deployment
- [ ] documentation reviewed
- [ ] PR approved

---

## 22. Merge Checklist

After PR approval:

```bash
cd /d/identitycore
git checkout main
git pull origin main
git status --short
```

Expected:

```text
(no output)
```

Confirm:

- [ ] PR merged
- [ ] PR closed
- [ ] local main updated
- [ ] working tree clean
- [ ] Phase 13 complete

---

## 23. After Phase 13

Do not start Phase 14 immediately.

First confirm:

- [ ] Phase 13 merged into `main`
- [ ] local `main` updated
- [ ] working tree clean
- [ ] Phase 13 screenshots captured/redacted if needed
- [ ] Phase 13 documentation complete
- [ ] no secrets committed
- [ ] Entra OIDC local practice works
- [ ] local dummy login still works

---

## 24. Final Rule

Do not start Okta, AWS, SCIM target, SAML IdP, database, cloud deployment, CI/CD, SIEM, email, webhook, scheduled jobs, or claim-to-role mapping until a dedicated phase spec and checklist exist.

Do not let external identity-provider authentication automatically grant admin access.

IdentityCore must remain:

- local-first
- safe
- skill-practice focused
- no-secrets
- no-production-tenant
- no-real-cloud-account by default
- portfolio-friendly
- realistic enough to teach IAM concepts clearly