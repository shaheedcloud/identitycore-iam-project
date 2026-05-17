# Phase 15 Checklist — Provider Comparison and Claims Mapping

## Purpose

This checklist controls Phase 15 from planning through implementation readiness.

Phase 15 must compare local dummy identity, Entra ID OIDC identity, and Okta OIDC identity without weakening authorization or committing secrets.

Phase 15 begins as a planning/documentation phase.

---

## Phase 15 Goal

Create a safe provider comparison and claims mapping foundation for IdentityCore.

The learner should understand:

* local dummy login behavior
* Entra ID OIDC login behavior
* Okta OIDC login behavior
* safe claim summaries
* provider differences
* authentication vs authorization
* why external claims must not automatically grant admin access
* how future claim-to-role mapping should be designed safely

---

## 1. Before Starting

Run from Git Bash:

```bash
cd /d/identitycore
git branch --show-current
git status --short
```

Expected branch:

```text
main
```

Expected status:

```text
(no output)
```

Confirm:

* [ ] current branch is `main`
* [ ] local `main` is updated
* [ ] working tree is clean
* [ ] Phase 14 is merged into `main`
* [ ] no `.env` file is staged or tracked
* [ ] no screenshots are staged
* [ ] no secrets are present

---

## 2. Planning Documents

Create these documents:

```text
docs/Post-Phase-10/Phase 15 — Provider Comparison and Claims Mapping Spec.md
docs/Post-Phase-10/Phase 15 Checklist — Provider Comparison and Claims Mapping.md
```

Confirm:

* [ ] Phase 15 spec exists
* [ ] Phase 15 checklist exists
* [ ] spec defines objective
* [ ] spec defines scope
* [ ] spec defines out of scope
* [ ] spec defines provider comparison model
* [ ] spec defines safe claim display rules
* [ ] spec defines claim mapping guardrails
* [ ] checklist is complete

---

## 3. Phase 15 Planning Scope

Phase 15 planning may define:

* [ ] provider comparison table
* [ ] safe claim summary model
* [ ] local vs Entra vs Okta comparison
* [ ] claim presence indicators
* [ ] role source explanation
* [ ] authorization explanation
* [ ] admin mapping warning
* [ ] future `/provider-comparison` page idea
* [ ] README update plan
* [ ] future Codex implementation prompt

---

## 4. Phase 15 Forbidden Work During Planning

Do not change app code during planning.

Do not add:

* [ ] automatic admin mapping from Entra claims
* [ ] automatic admin mapping from Okta claims
* [ ] automatic group-to-role mapping
* [ ] database persistence
* [ ] AWS IAM integration
* [ ] real SCIM target
* [ ] production authorization
* [ ] production deployment
* [ ] cloud deployment
* [ ] CI/CD
* [ ] new external API calls
* [ ] raw token display
* [ ] raw token logging
* [ ] `.env`
* [ ] secrets
* [ ] tenant IDs
* [ ] Okta domains
* [ ] client IDs
* [ ] client secrets
* [ ] access tokens
* [ ] refresh tokens
* [ ] ID tokens
* [ ] private keys
* [ ] certificates
* [ ] screenshots

---

## 5. Provider Comparison Model

The future implementation should compare:

| Field                 | Local Dummy Login       | Entra ID OIDC              | Okta OIDC                  |
| --------------------- | ----------------------- | -------------------------- | -------------------------- |
| Provider              | Local simulator         | Microsoft Entra ID Lab     | Okta Lab                   |
| Authentication source | Local app session       | External OIDC provider     | External OIDC provider     |
| Subject claim         | Simulated/local         | Present if returned        | Present if returned        |
| Username/email        | Local test user         | Present if returned        | Present if returned        |
| Display name          | Local test user         | Present if returned        | Present if returned        |
| Issuer                | None/simulated          | Microsoft issuer           | Okta issuer                |
| Audience              | None/simulated          | Present if returned        | Present if returned        |
| Groups claim          | Local role only         | Present only if configured | Present only if configured |
| Local role source     | Local dummy user object | Safe default mapping       | Safe default mapping       |
| Admin access          | Local RBAC only         | Not automatic              | Not automatic              |
| Raw tokens stored     | False                   | False                      | False                      |
| Raw tokens displayed  | False                   | False                      | False                      |

Confirm:

* [ ] comparison does not reveal raw tokens
* [ ] comparison does not reveal secrets
* [ ] comparison does not reveal real tenant/client values
* [ ] comparison clearly separates authentication from authorization

---

## 6. Safe Claim Display Rules

Allowed safe indicators:

* [ ] provider name
* [ ] subject present: yes/no
* [ ] email present: yes/no
* [ ] display name present: yes/no
* [ ] groups claim present: yes/no
* [ ] issuer present: yes/no
* [ ] audience present: yes/no
* [ ] local role
* [ ] role source
* [ ] admin mapping status
* [ ] raw token stored: false
* [ ] raw token displayed: false

Forbidden display:

* [ ] raw ID token
* [ ] raw access token
* [ ] raw refresh token
* [ ] authorization code
* [ ] authorization header
* [ ] client secret
* [ ] real tenant ID
* [ ] real Okta domain
* [ ] real client ID
* [ ] unredacted real user values in committed evidence

---

## 7. Claim Mapping Guardrails

Safe future mapping pattern:

```text
Provider claim → explicit allowlisted mapping → local role → RBAC decision
```

Forbidden pattern:

```text
Any external claim or group → automatic admin access
```

Confirm:

* [ ] Entra-authenticated users do not automatically become admins
* [ ] Okta-authenticated users do not automatically become admins
* [ ] external groups are not blindly trusted
* [ ] local RBAC remains the authorization control
* [ ] privileged mapping is deferred to a later dedicated phase

---

## 8. Future Implementation Readiness

Before Codex implementation later, define:

* [ ] branch name
* [ ] files Codex may inspect
* [ ] files Codex may change
* [ ] files Codex should avoid changing
* [ ] acceptance criteria
* [ ] testing plan
* [ ] security review command
* [ ] suggested commit message

Suggested future branch:

```text
feature/phase-15-provider-comparison-claims-mapping
```

Suggested future commit message:

```text
phase-15: add provider comparison and claims mapping foundation
```

---

## 9. Files Codex May Inspect Later

Codex may inspect the whole project to understand current behavior.

Codex should inspect at minimum:

```text
README.md
AGENTS.md
iam-practice-app/README.md
iam-practice-app/package.json
iam-practice-app/.env.example
iam-practice-app/src/app.js
iam-practice-app/src/claims.js
iam-practice-app/src/oidcClient.js
iam-practice-app/src/oidcConfig.js
iam-practice-app/src/routes/apiRoutes.js
iam-practice-app/src/routes/authRoutes.js
iam-practice-app/src/routes/pages.js
iam-practice-app/src/views/login.html
iam-practice-app/src/views/dashboard.html
iam-practice-app/src/views/claims.html
iam-practice-app/src/views/oidc-readiness.html
iam-practice-app/src/public/styles.css
```

---

## 10. Files Codex May Change Later

Codex may change files related to provider comparison display, safe claim summaries, documentation, and existing page presentation.

Possible files:

```text
README.md
iam-practice-app/README.md
iam-practice-app/src/claims.js
iam-practice-app/src/routes/apiRoutes.js
iam-practice-app/src/routes/pages.js
iam-practice-app/src/views/dashboard.html
iam-practice-app/src/views/claims.html
iam-practice-app/src/views/oidc-readiness.html
iam-practice-app/src/public/styles.css
```

Codex may add a new provider comparison view only if the implementation plan explicitly approves it, such as:

```text
iam-practice-app/src/views/provider-comparison.html
```

If Codex adds a new file, it must explain why.

---

## 11. Files Codex Should Avoid Changing Unless Necessary

Codex should avoid unnecessary changes to:

```text
iam-practice-app/src/middleware/rbac.js
iam-practice-app/src/middleware/jwtAuth.js
iam-practice-app/src/oidcClient.js
iam-practice-app/src/oidcConfig.js
iam-practice-app/src/scimStore.js
iam-practice-app/src/scimGroupStore.js
iam-practice-app/src/auditStore.js
iam-practice-app/Dockerfile
iam-practice-app/docker-compose.yml
iam-practice-app/package.json
iam-practice-app/package-lock.json
```

Confirm:

* [ ] RBAC changes are avoided unless absolutely necessary
* [ ] any RBAC change is manually reviewed
* [ ] package changes are avoided unless absolutely necessary
* [ ] any package change is justified
* [ ] no new dependency is added unless clearly necessary and approved by the phase scope

---

## 12. Existing Functionality To Preserve Later

Phase 15 implementation must preserve:

* [ ] app starts locally
* [ ] app works without `.env`
* [ ] local dummy login works
* [ ] Entra OIDC still works if configured
* [ ] Okta OIDC still works if configured
* [ ] logout works
* [ ] dashboard loads
* [ ] RBAC still works
* [ ] protected pages still enforce access
* [ ] unauthorized users are blocked
* [ ] access denied page still works
* [ ] claims/token simulation still works
* [ ] OIDC readiness page loads
* [ ] JWT readiness page loads if present
* [ ] SCIM readiness page loads if present
* [ ] JML readiness page loads if present
* [ ] SAML readiness page loads if present
* [ ] audit readiness page loads if present
* [ ] Docker runtime remains safe
* [ ] local-only simulator messaging remains clear
* [ ] no `.env` is committed
* [ ] no secrets are committed

---

## 13. Testing Plan For Future Implementation

When Phase 15 implementation happens, testing should include the following checks.

### Test 1 — App Runs Without Provider Config

Expected:

* [ ] app starts without errors
* [ ] local dummy login works
* [ ] provider comparison does not require real Entra or Okta config
* [ ] no provider secrets are required
* [ ] no page crashes when provider config is missing

### Test 2 — Local Dummy Login Comparison

Expected:

* [ ] local user can sign in
* [ ] provider comparison shows Local simulator context
* [ ] local role source is clearly explained
* [ ] admin access is controlled only by local RBAC

### Test 3 — Entra OIDC Comparison

With local Entra `.env` configured:

Expected:

* [ ] Entra login still works
* [ ] provider comparison shows Microsoft Entra ID Lab context
* [ ] safe claim indicators display presence only or masked values
* [ ] Entra-authenticated user does not automatically become admin
* [ ] raw tokens are not displayed
* [ ] raw tokens are not logged

### Test 4 — Okta OIDC Comparison

With local Okta `.env` configured:

Expected:

* [ ] Okta login still works
* [ ] provider comparison shows Okta Lab context
* [ ] safe claim indicators display presence only or masked values
* [ ] Okta-authenticated user does not automatically become admin
* [ ] raw tokens are not displayed
* [ ] raw tokens are not logged

### Test 5 — RBAC Regression

Expected:

* [ ] local admin can still access admin pages
* [ ] standard/local user cannot access admin pages
* [ ] Entra-authenticated user cannot access admin pages unless explicitly allowed by existing safe local RBAC
* [ ] Okta-authenticated user cannot access admin pages unless explicitly allowed by existing safe local RBAC
* [ ] access denied page still works

### Test 6 — Readiness Pages Regression

Expected:

* [ ] `/oidc-readiness` loads
* [ ] `/jwt-readiness` loads if present
* [ ] `/scim-readiness` loads if present
* [ ] `/saml-readiness` loads if present
* [ ] `/jml-readiness` loads if present
* [ ] `/audit-readiness` loads if present
* [ ] local-only simulator messaging remains clear

---

## 14. Security Review Before Committing Planning Docs

Run:

```bash
cd /d/identitycore
git status --short
```

Confirm only these files appear:

```text
docs/Post-Phase-10/Phase 15 — Provider Comparison and Claims Mapping Spec.md
docs/Post-Phase-10/Phase 15 Checklist — Provider Comparison and Claims Mapping.md
```

Then run:

```bash
git diff -- docs/Post-Phase-10 | grep -Ei "secret|token|password|tenant|client_id|client_secret|okta|access_token|refresh_token|id_token|authorization|private_key|BEGIN RSA|BEGIN PRIVATE"
```

Safety words in documentation are acceptable.

Real values are not acceptable.

Confirm:

* [ ] no `.env`
* [ ] no real tenant ID
* [ ] no real Okta domain
* [ ] no real client ID
* [ ] no client secret
* [ ] no access token
* [ ] no refresh token
* [ ] no ID token
* [ ] no private key
* [ ] no certificate
* [ ] no screenshots

---

## 15. Security Review Before Committing Future Implementation

Before committing Phase 15 implementation later, run:

```bash
cd /d/identitycore
git status --short
git diff -- . ":(exclude)package-lock.json" | grep -Ei "secret|token|password|tenant|client_id|client_secret|okta|access_token|refresh_token|id_token|authorization|private_key|BEGIN RSA|BEGIN PRIVATE"
```

Safety words in documentation are acceptable.

Real values are not acceptable.

Confirm:

* [ ] no `.env`
* [ ] no `.env.local`
* [ ] no `.env.production`
* [ ] no real tenant ID
* [ ] no real Okta domain
* [ ] no real client ID
* [ ] no client secret
* [ ] no access token
* [ ] no refresh token
* [ ] no ID token
* [ ] no authorization code
* [ ] no private key
* [ ] no certificate
* [ ] no unredacted screenshots
* [ ] no raw claims with real user values
* [ ] no production endpoint
* [ ] no cloud deployment
* [ ] no database persistence
* [ ] no automatic admin mapping from external claims

---

## 16. Commit Planning Docs

Run:

```bash
cd /d/identitycore
git add "docs/Post-Phase-10/Phase 15 — Provider Comparison and Claims Mapping Spec.md"
git add "docs/Post-Phase-10/Phase 15 Checklist — Provider Comparison and Claims Mapping.md"
git status --short
git commit -m "docs: add phase-15 provider comparison planning"
git push origin main
```

---

## 17. Phase 15 Planning Completion Checklist

Phase 15 planning is complete when:

* [ ] Phase 15 spec is created
* [ ] Phase 15 checklist is created
* [ ] provider comparison table is defined
* [ ] safe claim display rules are defined
* [ ] claim mapping guardrails are defined
* [ ] future implementation branch is identified
* [ ] no app code changed
* [ ] no secrets committed
* [ ] no `.env` committed
* [ ] planning docs committed to `main`
* [ ] planning docs pushed to GitHub

---

## 18. Next Step After Planning

After planning docs are committed and pushed to `main`, create the Phase 15 implementation branch:

```bash
cd /d/identitycore
git checkout -b feature/phase-15-provider-comparison-claims-mapping
git branch --show-current
```

Expected result:

```text
feature/phase-15-provider-comparison-claims-mapping
```

Then prepare the Codex implementation prompt.
