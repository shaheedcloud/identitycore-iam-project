# Phase 18 Checklist — SCIM Simulator Upgrade and JML Evidence Improvements

## Purpose

This checklist controls Phase 18 from planning through implementation readiness, local testing, review, commit, push, and merge.

Phase 18 must improve the local SCIM simulator and JML evidence experience without connecting a real SCIM provider, exposing the app publicly, weakening RBAC, or committing secrets.

Phase 18 starts as a documentation and planning phase.

Implementation must not begin until the Phase 18 spec and this checklist are committed to `main`, local `main` is clean, and a Phase 18 feature branch is created.

---

## Phase 18 Goal

Improve the local SCIM simulator and JML evidence experience so the learner can understand:

* SCIM provisioning concepts
* SCIM user lifecycle behavior
* SCIM group lifecycle behavior
* Joiner, Mover, Leaver evidence
* SCIM and JML relationship
* SCIM and RBAC relationship
* SCIM bearer token safety
* why SCIM is not login
* why SCIM groups must not automatically grant admin access
* why real provider SCIM integration is deferred
* why simulator-first improvement is safer before real provider provisioning

---

## 1. Before Starting Planning

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

Expected status before creating or editing planning files:

```text
(no output)
```

Confirm:

* [ ] current branch is `main`
* [ ] local `main` is updated
* [ ] working tree was clean before planning files were created
* [ ] Phase 17 is committed to `main`
* [ ] Phase 17 was pulled locally
* [ ] no `.env` file is staged or tracked
* [ ] no screenshots are staged
* [ ] no secrets are present
* [ ] no app code is being changed during planning

---

## 2. Planning Documents

Create these documents:

```text
docs/Post-Phase-10/Phase 18 — SCIM Simulator Upgrade and JML Evidence Improvements Spec.md
docs/Post-Phase-10/Phase 18 Checklist — SCIM Simulator Upgrade and JML Evidence Improvements.md
```

Confirm:

* [ ] Phase 18 spec exists
* [ ] Phase 18 checklist exists
* [ ] spec defines objective
* [ ] spec defines business scenario
* [ ] spec defines current project status
* [ ] spec defines scope
* [ ] spec defines out of scope
* [ ] spec defines safety rules
* [ ] spec explains SCIM is not login
* [ ] spec explains SCIM and JML relationship
* [ ] spec explains SCIM and RBAC relationship
* [ ] spec defines SCIM token safety rules
* [ ] spec defines safe dummy data rules
* [ ] spec defines audit evidence concept
* [ ] spec defines files Codex may inspect later
* [ ] spec defines files Codex may change later
* [ ] spec defines files Codex should avoid changing
* [ ] spec defines testing plan
* [ ] spec defines security review command
* [ ] spec includes future Codex handoff prompt
* [ ] checklist is complete

---

## 3. Phase 18 Planning Scope

Phase 18 planning may define:

* [ ] improved SCIM readiness page
* [ ] improved SCIM user lifecycle explanations
* [ ] improved SCIM group lifecycle explanations
* [ ] SCIM and JML relationship display
* [ ] SCIM and RBAC relationship display
* [ ] local SCIM simulator page improvements
* [ ] safe SCIM request examples using dummy data
* [ ] safe SCIM response examples using dummy data
* [ ] Joiner/Mover/Leaver evidence improvements
* [ ] audit-style lifecycle event summaries
* [ ] dashboard links to SCIM/JML practice areas
* [ ] local-only warning improvements
* [ ] README update plan
* [ ] troubleshooting documentation update plan
* [ ] screenshot evidence plan
* [ ] future implementation branch naming
* [ ] future Codex implementation prompt

---

## 4. Phase 18 Forbidden Work During Planning

Do not change app code during planning.

Do not add:

* [ ] real Entra ID SCIM provisioning connection
* [ ] real Okta SCIM provisioning connection
* [ ] production SCIM endpoint exposure
* [ ] public internet exposure
* [ ] tunneling tools
* [ ] ngrok
* [ ] cloud deployment
* [ ] database persistence
* [ ] CI/CD
* [ ] SIEM integration
* [ ] webhook integration
* [ ] email integration
* [ ] scheduled tasks
* [ ] background jobs
* [ ] AWS IAM integration
* [ ] AWS federation
* [ ] production authorization
* [ ] production authentication
* [ ] raw token display
* [ ] raw token logging
* [ ] committed `.env`
* [ ] committed SCIM bearer token
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
* [ ] real user data

---

## 5. Core Safety Principle

Confirm Phase 18 follows this principle:

```text
SCIM provisions identity records.
RBAC still decides access.
```

Checklist:

* [ ] SCIM is not treated as login
* [ ] SCIM group membership does not automatically grant admin access
* [ ] SCIM provisioning does not bypass RBAC
* [ ] SCIM bearer tokens are treated as secrets
* [ ] real provider provisioning is deferred
* [ ] simulator remains available
* [ ] lab-only rule is documented
* [ ] public endpoint exposure is not approved
* [ ] tunneling is not approved

---

## 6. SCIM Is Not Login

Confirm documentation and future implementation explain:

* [ ] OIDC/SAML handles sign-in
* [ ] SCIM handles provisioning
* [ ] RBAC handles authorization
* [ ] JML explains lifecycle process
* [ ] audit evidence explains what happened
* [ ] SCIM-created users do not automatically create authenticated sessions
* [ ] SCIM-created groups do not bypass RBAC
* [ ] SCIM records are lifecycle artifacts, not active browser sessions

---

## 7. SCIM and JML Relationship

Confirm Phase 18 documents and future implementation can show:

### Joiner

* [ ] new worker joins IdentityCore
* [ ] SCIM user record is created or shown as active
* [ ] default access remains conservative
* [ ] RBAC still controls protected pages
* [ ] audit evidence records provisioning event

### Mover

* [ ] worker changes department or job role
* [ ] SCIM user attributes are updated
* [ ] SCIM group membership may change
* [ ] access changes only through explicit authorization rules
* [ ] audit evidence records lifecycle change

### Leaver

* [ ] worker leaves IdentityCore
* [ ] SCIM user active flag becomes false
* [ ] application record is deactivated
* [ ] audit evidence is retained
* [ ] protected access should be denied
* [ ] deactivation is preferred over unsafe hard delete for lifecycle learning

---

## 8. SCIM and RBAC Relationship

Confirm:

* [ ] SCIM does not replace RBAC
* [ ] role mapping does not replace RBAC
* [ ] local RBAC remains final access control
* [ ] SCIM group names are not blindly trusted
* [ ] SCIM records do not bypass protected route checks
* [ ] admin access requires explicit safe authorization design
* [ ] SCIM simulator improvements do not weaken route protection

Correct model:

```text
SCIM creates or updates records.
Role mapping may assign a local role only if explicitly designed.
RBAC enforces page and API access.
```

Forbidden model:

```text
SCIM group name bypasses RBAC.
```

---

## 9. SCIM Token Safety

Confirm documentation warns that SCIM bearer tokens must never be committed.

Never commit:

* [ ] SCIM bearer token
* [ ] authorization header
* [ ] `.env`
* [ ] `.env.local`
* [ ] `.env.production`
* [ ] screenshots showing token values
* [ ] logs showing authorization headers

Allowed placeholder only:

```env
SCIM_ENABLED=false
SCIM_BEARER_TOKEN=YOUR_LOCAL_SCIM_BEARER_TOKEN
```

Confirm:

* [ ] placeholders only are allowed in committed files
* [ ] real values stay local only
* [ ] real bearer token is never shown in docs, logs, screenshots, or commits

---

## 10. Safe Dummy Data

Confirm Phase 18 uses fake users and fake groups only.

Allowed fake examples:

```text
user.scim.joiner
user.scim.mover
user.scim.leaver
GRP-SCIM-Finance-Standard
GRP-SCIM-Security-ReadOnly
GRP-SCIM-Contractor-Limited
```

Do not use:

* [ ] real employee names
* [ ] real company users
* [ ] real email addresses
* [ ] real tenant values
* [ ] real Okta domains
* [ ] real Entra IDs
* [ ] real Okta IDs
* [ ] real provider data

---

## 11. Audit Evidence Concept

Future implementation may improve local audit-style evidence.

Audit evidence should answer:

* [ ] what event occurred?
* [ ] was it joiner, mover, or leaver?
* [ ] what user or group record changed?
* [ ] what changed before and after?
* [ ] was the user active or inactive?
* [ ] did RBAC remain enforced?
* [ ] did the event grant admin access automatically?
* [ ] was the action simulated/local-only?

Audit evidence must not include:

* [ ] bearer tokens
* [ ] authorization headers
* [ ] raw provider tokens
* [ ] real tenant IDs
* [ ] real client IDs
* [ ] secrets
* [ ] real user data

---

## 12. Future Implementation Readiness

Before Codex implementation later, confirm:

* [ ] Phase 18 spec is committed to `main`
* [ ] Phase 18 checklist is committed to `main`
* [ ] local `main` is clean
* [ ] implementation branch is created from updated `main`
* [ ] branch is not `main`
* [ ] Codex prompt uses the approved spec
* [ ] Codex is told not to work on `main`
* [ ] Codex is told not to add real SCIM provider integration
* [ ] Codex is told not to add public endpoint exposure
* [ ] Codex is told not to weaken RBAC

Suggested future branch:

```text
feature/phase-18-scim-simulator-jml-evidence
```

Suggested future implementation commit message:

```text
phase-18: improve SCIM simulator and JML evidence
```

---

## 13. Files Codex May Inspect Later

Codex may inspect the whole project.

Codex should inspect at minimum:

```text
README.md
AGENTS.md
iam-practice-app/README.md
iam-practice-app/package.json
iam-practice-app/.env.example
iam-practice-app/src/app.js
iam-practice-app/src/scimStore.js
iam-practice-app/src/scimGroupStore.js
iam-practice-app/src/scimConfig.js
iam-practice-app/src/middleware/scimAuth.js
iam-practice-app/src/routes/apiRoutes.js
iam-practice-app/src/routes/pageRoutes.js
iam-practice-app/src/views/dashboard.html
iam-practice-app/src/views/scim-readiness.html
iam-practice-app/src/views/role-mapping.html
iam-practice-app/src/views/provider-comparison.html
iam-practice-app/src/public/styles.css
```

If actual route filenames differ in the repo, Codex must inspect the current structure and use the existing project naming.

---

## 14. Files Codex May Change Later

Codex may change files related to SCIM simulator display, SCIM readiness, JML evidence, dashboard links, local documentation, and safe explanatory UI.

Possible files:

```text
README.md
iam-practice-app/README.md
iam-practice-app/src/scimStore.js
iam-practice-app/src/scimGroupStore.js
iam-practice-app/src/routes/apiRoutes.js
iam-practice-app/src/routes/pageRoutes.js
iam-practice-app/src/views/dashboard.html
iam-practice-app/src/views/scim-readiness.html
iam-practice-app/src/views/role-mapping.html
iam-practice-app/src/views/provider-comparison.html
iam-practice-app/src/public/styles.css
```

Codex may add a small view or helper file only if needed for the SCIM/JML simulator learning experience.

Possible approved additions if justified:

```text
iam-practice-app/src/views/scim-simulator.html
iam-practice-app/src/views/jml-evidence.html
iam-practice-app/src/scimEvidence.js
```

If Codex adds a new file, Codex must explain why.

---

## 15. Files Codex Should Avoid Changing Unless Necessary

Codex should avoid unnecessary changes to:

```text
iam-practice-app/src/middleware/rbac.js
iam-practice-app/src/middleware/jwtAuth.js
iam-practice-app/src/oidcClient.js
iam-practice-app/src/oidcConfig.js
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
* [ ] no new dependency is added unless clearly necessary and approved by phase scope

---

## 16. Existing Functionality To Preserve Later

Phase 18 implementation must preserve:

* [ ] app starts locally
* [ ] app works without `.env`
* [ ] local dummy login works
* [ ] Entra OIDC still works if configured
* [ ] Okta OIDC still works if configured
* [ ] logout works
* [ ] dashboard loads
* [ ] provider comparison page loads
* [ ] role mapping page loads
* [ ] claims page loads
* [ ] RBAC still works
* [ ] protected pages still enforce access
* [ ] unauthorized users are blocked
* [ ] access denied page still works
* [ ] claims/token simulation still works
* [ ] OIDC readiness page loads
* [ ] JWT readiness page loads if present
* [ ] SCIM readiness page loads
* [ ] SCIM users simulation still works
* [ ] SCIM groups simulation still works
* [ ] JML simulation still works
* [ ] SAML readiness page loads if present
* [ ] audit readiness page loads if present
* [ ] Docker runtime remains safe
* [ ] local-only simulator messaging remains clear
* [ ] no `.env` is committed
* [ ] no secrets are committed

---

## 17. Testing Plan For Future Implementation

When Phase 18 implementation happens, testing should include the following checks.

### Test 1 — App Runs Without Provider Config

Expected:

* [ ] app starts without errors
* [ ] local dummy login works
* [ ] dashboard loads
* [ ] SCIM/JML pages do not require real Entra or Okta config
* [ ] no provider secrets are required
* [ ] no page crashes when provider config is missing

### Test 2 — SCIM Readiness Page

Expected:

* [ ] SCIM readiness page loads
* [ ] page explains SCIM is local/simulated
* [ ] page explains SCIM is not login
* [ ] page explains SCIM bearer token safety
* [ ] page explains no real provider provisioning is active
* [ ] page explains RBAC still controls access

### Test 3 — SCIM User Simulator

Expected:

* [ ] SCIM user simulation still works
* [ ] user lifecycle state is understandable
* [ ] active/inactive concept is clear
* [ ] joiner/mover/leaver examples are clear if implemented
* [ ] no real user data appears

### Test 4 — SCIM Group Simulator

Expected:

* [ ] SCIM group simulation still works
* [ ] group membership concept is understandable
* [ ] group membership does not automatically grant admin access
* [ ] RBAC separation is explained
* [ ] no real group IDs appear

### Test 5 — JML Evidence

Expected:

* [ ] JML lifecycle explanation loads
* [ ] evidence shows what event occurred
* [ ] evidence explains what changed
* [ ] evidence explains access risk
* [ ] evidence confirms RBAC remains enforced
* [ ] no tokens or secrets are displayed

### Test 6 — RBAC Preservation

Expected:

* [ ] normal user remains blocked from admin-only pages
* [ ] admin/security user access still follows existing local RBAC
* [ ] SCIM records do not bypass protected routes
* [ ] access denied behavior remains clear

### Test 7 — No Secrets Review

Run:

```bash
git status --short
git diff -- . ":(exclude)package-lock.json" | grep -Ei "secret|token|password|tenant|client_id|client_secret|aws_access_key|private_key|BEGIN RSA|BEGIN PRIVATE|authorization|bearer"
```

If matches appear, inspect them manually. Placeholder documentation may be acceptable. Real secrets are not acceptable.

Windows-friendly alternative:

```bash
git diff -- . ":(exclude)package-lock.json" | findstr /i "secret token password tenant client_id client_secret aws_access_key private_key authorization bearer"
```

---

## 18. Manual Browser Test Flow For Future Implementation

Suggested flow:

* [ ] Start the app locally
* [ ] Open `http://localhost:3000`
* [ ] Confirm login page loads
* [ ] Log in with a normal/local demo user
* [ ] Confirm dashboard loads
* [ ] Open SCIM readiness page
* [ ] Confirm SCIM local-only messaging is clear
* [ ] Open SCIM user/group simulator area if available
* [ ] Confirm user/group lifecycle explanations are clear
* [ ] Open JML/lifecycle page if available
* [ ] Confirm evidence explains joiner/mover/leaver concepts
* [ ] Attempt admin-only page as non-admin
* [ ] Confirm access denied still works
* [ ] Log out
* [ ] Log in with admin/security demo user if available
* [ ] Confirm protected/admin behavior still follows RBAC
* [ ] Confirm no real provider connection is required

---

## 19. Security Review Before Commit

Before committing future implementation, run:

```bash
cd /d/identitycore
git status --short
git diff --stat
git diff -- . ":(exclude)package-lock.json" | grep -Ei "secret|token|password|tenant|client_id|client_secret|aws_access_key|private_key|BEGIN RSA|BEGIN PRIVATE|authorization|bearer"
```

Windows-friendly alternative:

```bash
git diff -- . ":(exclude)package-lock.json" | findstr /i "secret token password tenant client_id client_secret aws_access_key private_key authorization bearer"
```

Confirm:

* [ ] no `.env` is staged
* [ ] no `.env.local` is staged
* [ ] no `.env.production` is staged
* [ ] no SCIM bearer token is staged
* [ ] no authorization header is staged
* [ ] no tenant ID is staged
* [ ] no Okta domain is staged
* [ ] no client secret is staged
* [ ] no access token is staged
* [ ] no refresh token is staged
* [ ] no ID token is staged
* [ ] no private key is staged
* [ ] no certificate is staged
* [ ] no unredacted screenshot is staged
* [ ] no real user data is staged

Placeholder documentation may contain words such as `token`, `secret`, or `bearer`, but real values must not appear.

---

## 20. Documentation Requirements

Phase 18 should update documentation if implementation changes the user experience.

Possible documentation updates:

```text
README.md
iam-practice-app/README.md
```

Documentation should explain:

* [ ] what Phase 18 adds
* [ ] SCIM simulator improvement purpose
* [ ] SCIM is not login
* [ ] SCIM and JML relationship
* [ ] SCIM and RBAC relationship
* [ ] how to test locally
* [ ] no real SCIM provider is connected
* [ ] no public endpoint is exposed
* [ ] no secrets should be committed

---

## 21. Screenshot Evidence Plan

Screenshots are not required during planning.

If screenshots are captured during implementation, they must be manual and redacted.

Suggested future screenshots:

```text
screenshots/phase-18-scim-simulator-jml-evidence/PHASE-18-SCIM-READINESS.png
screenshots/phase-18-scim-simulator-jml-evidence/PHASE-18-SCIM-USERS.png
screenshots/phase-18-scim-simulator-jml-evidence/PHASE-18-SCIM-GROUPS.png
screenshots/phase-18-scim-simulator-jml-evidence/PHASE-18-JML-EVIDENCE.png
screenshots/phase-18-scim-simulator-jml-evidence/PHASE-18-RBAC-STILL-ENFORCED.png
```

Do not commit screenshots showing:

* [ ] `.env`
* [ ] bearer tokens
* [ ] authorization headers
* [ ] tenant IDs
* [ ] Okta domains
* [ ] client IDs
* [ ] client secrets
* [ ] real users
* [ ] unredacted browser/session data

---

## 22. Planning Docs Commit Workflow

After both planning docs are filled and reviewed, run:

```bash
cd /d/identitycore

git add "docs/Post-Phase-10/Phase 18 — SCIM Simulator Upgrade and JML Evidence Improvements Spec.md"
git add "docs/Post-Phase-10/Phase 18 Checklist — SCIM Simulator Upgrade and JML Evidence Improvements.md"

git status --short

git commit -m "docs: add phase-18 SCIM simulator and JML evidence planning"

git push origin main

git status --short
```

Expected before commit:

```text
A  "docs/Post-Phase-10/Phase 18 Checklist — SCIM Simulator Upgrade and JML Evidence Improvements.md"
A  "docs/Post-Phase-10/Phase 18 — SCIM Simulator Upgrade and JML Evidence Improvements Spec.md"
```

Expected after push:

```text
(no output)
```

---

## 23. Create Implementation Branch Later

Only after planning docs are committed and local `main` is clean, create the implementation branch:

```bash
cd /d/identitycore
git checkout main
git pull origin main
git status --short
git checkout -b feature/phase-18-scim-simulator-jml-evidence
git branch --show-current
git status --short
```

Expected branch:

```text
feature/phase-18-scim-simulator-jml-evidence
```

Confirm:

* [ ] branch is not `main`
* [ ] branch was created from updated `main`
* [ ] working tree is clean before Codex starts
* [ ] Codex receives the approved Phase 18 prompt

---

## 24. Post-Codex Review Later

After Codex finishes future implementation, run:

```bash
cd /d/identitycore
git status --short
git diff --stat
git diff
```

Review:

* [ ] changed files make sense for Phase 18
* [ ] no unrelated backend rewrite
* [ ] no RBAC weakening
* [ ] no `.env` file created or staged
* [ ] no screenshots unexpectedly added
* [ ] no real provider SCIM integration added
* [ ] no public endpoint exposure added
* [ ] no tunneling tools added
* [ ] no cloud deployment added
* [ ] no database persistence added
* [ ] no CI/CD added
* [ ] no external SIEM/webhook/email/background job added
* [ ] no real secrets added
* [ ] documentation changes make sense

If `rbac.js` changed, inspect carefully:

```bash
git diff -- iam-practice-app/src/middleware/rbac.js
```

If `package.json` or `package-lock.json` changed, confirm why.

No new dependency should be added unless clearly necessary and safe.

---

## 25. Future Implementation Commit Workflow

After future implementation is reviewed and tested:

```bash
cd /d/identitycore

git status --short

git add README.md iam-practice-app/README.md iam-practice-app/src

git status --short

git commit -m "phase-18: improve SCIM simulator and JML evidence"

git push origin feature/phase-18-scim-simulator-jml-evidence
```

Only stage actual changed files. Do not use `git add .` if unsafe files are present.

---

## 26. Pull Request Checklist Later

Before merging Phase 18 PR:

* [ ] PR targets `main`
* [ ] PR source branch is `feature/phase-18-scim-simulator-jml-evidence`
* [ ] PR summary explains SCIM simulator/JML evidence improvements
* [ ] PR confirms no real SCIM provider integration
* [ ] PR confirms no public endpoint exposure
* [ ] PR confirms no tunneling tools
* [ ] PR confirms no `.env`
* [ ] PR confirms no secrets
* [ ] PR confirms RBAC is preserved
* [ ] local testing completed
* [ ] screenshots, if used, are redacted
* [ ] final `git status --short` is clean after merge/pull

---

## 27. Acceptance Criteria

Phase 18 planning is complete when:

* [ ] Phase 18 spec exists
* [ ] Phase 18 checklist exists
* [ ] both files are under `docs/Post-Phase-10/`
* [ ] spec defines objective, business scenario, scope, out of scope, safety rules, implementation direction, testing plan, and Codex prompt
* [ ] checklist defines planning, implementation readiness, safety review, testing, commit workflow, and PR workflow
* [ ] both planning documents are committed to `main`
* [ ] local `main` is clean after push
* [ ] no app code changed during planning
* [ ] no `.env` file is committed
* [ ] no secrets are committed
* [ ] no screenshots are committed

Phase 18 implementation is complete later when:

* [ ] implementation happens on `feature/phase-18-scim-simulator-jml-evidence`
* [ ] app starts locally
* [ ] local dummy login works
* [ ] dashboard loads
* [ ] SCIM readiness page explains simulator behavior
* [ ] SCIM is clearly explained as provisioning, not login
* [ ] SCIM and JML relationship is clearer
* [ ] SCIM and RBAC separation is clearer
* [ ] JML evidence is improved or clearly explained
* [ ] SCIM users/groups simulation still works
* [ ] protected routes still enforce RBAC
* [ ] no real provider SCIM connection is added
* [ ] no public endpoint/tunneling/cloud deployment is added
* [ ] no `.env` or secrets are added
* [ ] README is updated if user-facing behavior changed
* [ ] PR is reviewed and merged into `main`
* [ ] local `main` is clean after merge

---

## Final Phase 18 Decision

Approved direction:

```text
Improve local SCIM simulator and JML evidence first.
Do not connect real Entra or Okta SCIM provider yet.
Do not expose IdentityCore publicly.
Do not use tunneling tools.
Do not weaken RBAC.
```
