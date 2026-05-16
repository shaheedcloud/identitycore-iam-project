# Phase 14 Checklist — Okta OIDC Local Practice

## Purpose

This checklist controls Phase 14 from planning through merge.

Use this checklist before starting, before giving Codex work, after Codex finishes, during local testing, before commit, before push, before PR review, and before merge.

Phase 14 must safely add Okta OIDC local practice while preserving IdentityCore as a local-first skill practice app.

---

## Phase 14 Goal

Safely connect IdentityCore to an Okta lab/developer tenant using OpenID Connect for local practice.

The app should support:

- local dummy login
- Microsoft Entra ID lab login from Phase 13
- optional Okta lab login
- safe provider context
- safe claim summary display
- no raw token display
- no raw token logging
- no secrets committed
- no automatic admin trust from external Okta claims

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
- [ ] Phase 13 is merged into `main`
- [ ] Phase 14 spec is created
- [ ] Phase 14 checklist is created
- [ ] no `.env` file is staged or tracked
- [ ] no secrets are present

---

## 2. Commit Planning Documents First

Before creating the feature branch, commit these two documents to `main`:

```text
docs/Post-Phase-10/Phase 14 — Okta OIDC Local Practice Spec.md
docs/Post-Phase-10/Phase 14 Checklist — Okta OIDC Local Practice.md
```

Run:

```bash
cd /d/identitycore
git add "docs/Post-Phase-10/Phase 14 — Okta OIDC Local Practice Spec.md"
git add "docs/Post-Phase-10/Phase 14 Checklist — Okta OIDC Local Practice.md"
git status --short
git commit -m "docs: add phase-14 Okta OIDC local practice planning"
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

## 3. Create Phase 14 Feature Branch

After planning docs are committed and `main` is clean, run:

```bash
cd /d/identitycore
git checkout -b feature/phase-14-okta-oidc-local-practice
git branch --show-current
git status --short
```

Expected result:

```text
feature/phase-14-okta-oidc-local-practice
```

Confirm:

- [ ] branch is not `main`
- [ ] branch name is correct
- [ ] branch was created from updated `main`
- [ ] Phase 14 implementation will happen only on this branch

---

## 4. Pre-Codex Checklist

Before giving Codex the Phase 14 prompt, confirm:

- [ ] Phase 14 branch exists
- [ ] current branch is `feature/phase-14-okta-oidc-local-practice`
- [ ] Codex must not work on `main`
- [ ] Codex must inspect before editing
- [ ] Codex must preserve local dummy login
- [ ] Codex must preserve Phase 13 Entra OIDC behavior
- [ ] Codex must preserve RBAC
- [ ] Codex must preserve readiness pages
- [ ] Codex must preserve SCIM/JML/SAML/audit simulator behavior
- [ ] Codex must not add AWS work
- [ ] Codex must not add database persistence
- [ ] Codex must not add cloud deployment
- [ ] Codex must not commit `.env`
- [ ] Codex must not commit secrets
- [ ] Codex must not display raw tokens
- [ ] Codex must not log raw tokens
- [ ] Codex must not automatically map Okta claims or groups to admin access

---

## 5. Codex Handoff Prompt

Use the approved prompt from:

```text
docs/Post-Phase-10/Phase 14 — Okta OIDC Local Practice Spec.md
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

## 6. Required Okta Lab Setup

Before testing real Okta login, confirm:

- [ ] Okta lab/developer tenant exists
- [ ] tenant is not employer tenant
- [ ] tenant is not production tenant
- [ ] lab user exists
- [ ] OIDC app integration can be created
- [ ] redirect URI can be configured
- [ ] client secret can be copied
- [ ] app can be assigned to lab user
- [ ] screenshots can be redacted
- [ ] all real values will stay in local `.env`

Suggested app integration values:

```text
App name:
APP-Okta-OIDC-IdentityCore-Local

Application type:
Web Application

Sign-in redirect URI:
http://localhost:3000/auth/okta/callback
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
OKTA_OIDC_ENABLED=true
OKTA_ISSUER_URL=https://YOUR_OKTA_DOMAIN/oauth2/default
OKTA_CLIENT_ID=YOUR_LOCAL_OKTA_CLIENT_ID
OKTA_CLIENT_SECRET=YOUR_LOCAL_OKTA_CLIENT_SECRET
OKTA_REDIRECT_URI=http://localhost:3000/auth/okta/callback
OKTA_PROVIDER_NAME=Okta Lab
```

Confirm:

- [ ] `.env` exists locally only if needed
- [ ] `.env` is ignored by Git
- [ ] `.env` is not shown in `git status --short`
- [ ] real Okta domain is not in committed files
- [ ] real Okta client ID is not in committed files
- [ ] Okta client secret is not in committed files

---

## 8. `.env.example` Checklist

The committed `.env.example` may contain placeholders only.

Allowed placeholder pattern:

```env
OKTA_OIDC_ENABLED=false
OKTA_ISSUER_URL=https://YOUR_OKTA_DOMAIN/oauth2/default
OKTA_CLIENT_ID=YOUR_OKTA_CLIENT_ID
OKTA_CLIENT_SECRET=YOUR_OKTA_CLIENT_SECRET
OKTA_REDIRECT_URI=http://localhost:3000/auth/okta/callback
OKTA_PROVIDER_NAME=Okta Lab
```

Confirm:

- [ ] placeholders only
- [ ] no real Okta domain
- [ ] no real Okta client ID
- [ ] no Okta client secret
- [ ] no token values
- [ ] no real user values

---

## 9. Existing Functionality Codex Must Preserve

Codex must preserve:

- [ ] app starts locally
- [ ] app works without `.env`
- [ ] local dummy login works
- [ ] Phase 13 Entra OIDC still works if configured
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

## 10. Forbidden Phase 14 Work

Codex must not add:

- [ ] AWS IAM integration
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
- [ ] automatic admin mapping from Okta claims
- [ ] automatic admin mapping from Okta groups
- [ ] real Okta domain in repo
- [ ] real Okta client ID in repo
- [ ] Okta client secret in repo
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
- [ ] no AWS implementation added
- [ ] no database added
- [ ] no cloud deployment added
- [ ] no raw token display added
- [ ] no raw token logging added
- [ ] no RBAC weakening occurred
- [ ] Entra behavior was not broken
- [ ] documentation updated

If `rbac.js` changed, inspect it carefully:

```bash
git diff -- iam-practice-app/src/middleware/rbac.js
```

---

## 12. Local Test Without Okta Config

First test with Okta disabled or without Okta `.env`.

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
- [ ] Okta login does not attempt real provider call when not configured
- [ ] readiness page shows safe missing-config/not-configured state
- [ ] no crash occurs
- [ ] no raw error exposes secrets

Stop app:

```text
CTRL + C
```

---

## 13. Local Test With Okta Config

Create local `.env` only.

Run:

```bash
cd /d/identitycore/iam-practice-app
npm start
```

Validate:

- [ ] login page loads
- [ ] Okta login option appears
- [ ] clicking Okta login redirects to Okta
- [ ] lab user can authenticate
- [ ] callback returns to IdentityCore
- [ ] dashboard loads
- [ ] session is created
- [ ] provider context shows Okta Lab
- [ ] safe claim summary appears
- [ ] raw tokens are not visible
- [ ] raw tokens are not logged
- [ ] logout works

Stop app:

```text
CTRL + C
```

---

## 14. Entra Regression Test

With Entra local `.env` values configured:

- [ ] Entra login still appears
- [ ] Entra login still redirects to Microsoft
- [ ] Entra lab user can authenticate
- [ ] Entra callback still works
- [ ] dashboard loads
- [ ] Entra provider context still appears
- [ ] Entra-authenticated user still maps to `standard_user`

---

## 15. RBAC Test

Test after Okta login and after local login.

Okta user test:

- [ ] sign in through Okta
- [ ] attempt admin page
- [ ] access denied page appears
- [ ] required role/current role logic still works
- [ ] Okta-authenticated user does not become admin

Local admin test:

- [ ] sign in as local admin
- [ ] admin page loads
- [ ] security page loads if allowed
- [ ] finance page loads if allowed
- [ ] `/api/admin/users` works for admin user

---

## 16. Readiness Page Test

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
- [ ] Okta-specific readiness is clear
- [ ] no page claims production readiness
- [ ] no page exposes real secrets

---

## 17. Documentation Review

Confirm documentation explains:

- [ ] Phase 14 adds local Okta OIDC practice only
- [ ] app remains local-first
- [ ] app remains a skill practice simulator
- [ ] `.env` is local only
- [ ] `.env.example` contains placeholders only
- [ ] local dummy login remains available
- [ ] Entra login remains available
- [ ] Okta login is optional
- [ ] missing config fails closed
- [ ] raw tokens are not displayed or logged
- [ ] Okta authentication does not automatically grant admin authorization
- [ ] screenshots must be redacted

---

## 18. Security Review Before Commit

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
- [ ] no real Okta domain
- [ ] no real Okta client ID
- [ ] no Okta client secret
- [ ] no tokens
- [ ] no private keys
- [ ] no certificates

Run:

```bash
git diff -- . ":(exclude)package-lock.json" | grep -Ei "secret|token|password|tenant|client_id|client_secret|okta|access_token|refresh_token|id_token|private_key|BEGIN RSA|BEGIN PRIVATE"
```

Review output manually.

Safety text such as “do not commit secrets” is acceptable.

Real values are not acceptable.

---

## 19. Commit

Only after review and testing:

```bash
cd /d/identitycore
git add .
git status --short
git commit -m "phase-14: add Okta OIDC local practice"
```

---

## 20. Push

Run:

```bash
git push origin feature/phase-14-okta-oidc-local-practice
```

---

## 21. Pull Request

Pull request title:

```text
Phase 14: Okta OIDC Local Practice
```

Pull request description:

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

## 22. PR Review Checklist

Before merge:

- [ ] PR targets `main`
- [ ] PR source is `feature/phase-14-okta-oidc-local-practice`
- [ ] changed files reviewed
- [ ] app tested without Okta config
- [ ] app tested with local Okta config
- [ ] Entra regression test passed
- [ ] local dummy login still works
- [ ] RBAC still works
- [ ] no `.env`
- [ ] no secrets
- [ ] no raw tokens
- [ ] no unredacted screenshots
- [ ] no AWS work
- [ ] no database
- [ ] no cloud deployment
- [ ] documentation reviewed
- [ ] PR approved

---

## 23. Merge Checklist

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
- [ ] Phase 14 complete

---

## 24. After Phase 14

Do not start Phase 15 immediately.

First confirm:

- [ ] Phase 14 merged into `main`
- [ ] local `main` updated
- [ ] working tree clean
- [ ] Phase 14 screenshots captured/redacted if needed
- [ ] Phase 14 documentation complete
- [ ] no secrets committed
- [ ] Okta OIDC local practice works
- [ ] Entra OIDC local practice still works
- [ ] local dummy login still works

---

## 25. Final Rule

Do not start AWS, SCIM target, SAML IdP, database, cloud deployment, CI/CD, SIEM, email, webhook, scheduled jobs, provider comparison, or claim-to-role mapping until a dedicated phase spec and checklist exist.

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