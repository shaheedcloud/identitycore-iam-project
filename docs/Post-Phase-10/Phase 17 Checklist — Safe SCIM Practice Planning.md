# Phase 17 Checklist — Safe SCIM Practice Planning

## Purpose

This checklist controls Phase 17 from planning through implementation readiness.

Phase 17 must safely plan future SCIM practice without starting real SCIM integration and without weakening IdentityCore safety behavior.

Phase 17 is a documentation and planning phase.

Implementation must not begin until the Phase 17 spec and this checklist are committed to `main`, local `main` is clean, and the next implementation phase is explicitly approved.

---

## Phase 17 Goal

Create a safe SCIM practice planning foundation for IdentityCore.

The learner should understand:

* SCIM provisioning concepts
* SCIM user lifecycle behavior
* SCIM group lifecycle behavior
* SCIM and JML relationship
* SCIM and RBAC relationship
* SCIM bearer token safety
* why SCIM is not login
* why SCIM groups must not automatically grant admin access
* why real SCIM integration requires careful endpoint planning
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

Expected status:

```text
(no output)
```

Confirm:

* [ ] current branch is `main`
* [ ] local `main` is updated
* [ ] working tree is clean
* [ ] Phase 16 is merged into `main`
* [ ] Phase 16 was pulled locally
* [ ] no `.env` file is staged or tracked
* [ ] no screenshots are staged
* [ ] no secrets are present
* [ ] no app code is being changed during planning

---

## 2. Planning Documents

Create these documents:

```text
docs/Post-Phase-10/Phase 17 — Safe SCIM Practice Planning Spec.md
docs/Post-Phase-10/Phase 17 Checklist — Safe SCIM Practice Planning.md
```

Confirm:

* [ ] Phase 17 spec exists
* [ ] Phase 17 checklist exists
* [ ] spec defines objective
* [ ] spec defines business scenario
* [ ] spec defines scope
* [ ] spec defines out of scope
* [ ] spec defines SCIM concept model
* [ ] spec defines SCIM is not login
* [ ] spec defines SCIM and JML relationship
* [ ] spec defines SCIM and RBAC relationship
* [ ] spec defines token safety rules
* [ ] spec defines future SCIM practice options
* [ ] spec defines recommended next phase
* [ ] spec defines files Codex may inspect later
* [ ] spec defines files Codex may change later
* [ ] spec defines files Codex should avoid changing
* [ ] spec defines testing plan
* [ ] spec defines security review command
* [ ] checklist is complete

---

## 3. Phase 17 Planning Scope

Phase 17 planning may define:

* [ ] SCIM safety model
* [ ] SCIM provisioning scenarios
* [ ] SCIM user lifecycle scenarios
* [ ] SCIM group lifecycle scenarios
* [ ] SCIM token handling rules
* [ ] SCIM bearer token guardrails
* [ ] Entra ID SCIM practice considerations
* [ ] Okta SCIM practice considerations
* [ ] local simulator improvement plan
* [ ] future implementation branch naming
* [ ] future Codex prompt direction
* [ ] README update plan
* [ ] screenshot evidence plan

---

## 4. Phase 17 Forbidden Work During Planning

Do not change app code during planning.

Do not add:

* [ ] real SCIM integration
* [ ] real Entra ID provisioning connection
* [ ] real Okta provisioning connection
* [ ] production SCIM endpoint exposure
* [ ] database persistence
* [ ] cloud deployment
* [ ] public internet exposure
* [ ] tunneling tools
* [ ] ngrok
* [ ] CI/CD
* [ ] SIEM integration
* [ ] webhook integration
* [ ] email integration
* [ ] scheduled tasks
* [ ] background jobs
* [ ] AWS IAM integration
* [ ] AWS federation
* [ ] raw token display
* [ ] raw token logging
* [ ] committed `.env`
* [ ] SCIM bearer token
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

## 5. Core Safety Principle

Confirm Phase 17 follows this principle:

```text
SCIM provisions identity records.
RBAC still decides access.
```

Checklist:

* [ ] SCIM is not treated as login
* [ ] SCIM group membership does not automatically grant admin access
* [ ] SCIM provisioning does not bypass RBAC
* [ ] SCIM bearer tokens are treated as secrets
* [ ] real provider provisioning is deferred until explicitly planned
* [ ] simulator remains available
* [ ] lab-only rule is clearly documented

---

## 6. SCIM Is Not Login

Confirm documentation explains:

* [ ] OIDC/SAML handles sign-in
* [ ] SCIM handles provisioning
* [ ] RBAC handles authorization
* [ ] JML explains lifecycle process
* [ ] audit evidence explains what happened
* [ ] SCIM-created users do not automatically create authenticated sessions

---

## 7. SCIM And JML Relationship

Confirm Phase 17 documents:

### Joiner

* [ ] new user provisioning
* [ ] active status
* [ ] default conservative access
* [ ] RBAC still controls protected pages

### Mover

* [ ] department or role update
* [ ] group membership update
* [ ] access change explanation
* [ ] audit evidence explanation

### Leaver

* [ ] user deactivation
* [ ] session/access concern explanation
* [ ] audit retention explanation
* [ ] deactivation preferred over unsafe hard delete

---

## 8. SCIM And RBAC Relationship

Confirm:

* [ ] SCIM does not replace RBAC
* [ ] role mapping does not replace RBAC
* [ ] local RBAC remains final access control
* [ ] SCIM group names are not blindly trusted
* [ ] SCIM records do not bypass protected route checks
* [ ] admin access requires explicit safe authorization design

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

---

## 10. Future Practice Options

Confirm Phase 17 compares future options:

* [ ] improve local SCIM simulator first
* [ ] plan Entra ID SCIM lab later
* [ ] plan Okta SCIM lab later

Recommended decision:

```text
Improve local SCIM simulator before real provider provisioning.
```

Confirm:

* [ ] decision is documented
* [ ] reason is safety
* [ ] no public endpoint exposure is approved yet
* [ ] no tunneling is approved yet
* [ ] no real provider SCIM connection is approved yet

---

## 11. Future Implementation Readiness

Before future implementation, define:

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
feature/phase-18-scim-simulator-jml-evidence
```

Suggested future commit message:

```text
phase-18: improve SCIM simulator and JML evidence
```

---

## 12. Files Codex May Inspect Later

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

---

## 13. Files Codex May Change Later

Possible future SCIM simulator files:

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
iam-practice-app/src/public/styles.css
```

Codex may add a SCIM practice page only if approved in the future:

```text
iam-practice-app/src/views/scim-practice.html
```

---

## 14. Files Codex Should Avoid Changing Unless Necessary

Avoid unnecessary changes to:

```text
iam-practice-app/src/middleware/rbac.js
iam-practice-app/src/middleware/jwtAuth.js
iam-practice-app/src/oidcClient.js
iam-practice-app/src/oidcConfig.js
iam-practice-app/src/routes/authRoutes.js
iam-practice-app/Dockerfile
iam-practice-app/docker-compose.yml
iam-practice-app/package.json
iam-practice-app/package-lock.json
```

Confirm:

* [ ] RBAC changes are avoided unless absolutely necessary
* [ ] package changes are avoided unless absolutely necessary
* [ ] no new dependency is added unless clearly justified and approved
* [ ] no Docker/cloud behavior is changed unless explicitly approved

---

## 15. Existing Functionality To Preserve Later

Future implementation must preserve:

* [ ] app starts locally
* [ ] app works without `.env`
* [ ] local dummy login works
* [ ] Entra OIDC still works if configured
* [ ] Okta OIDC still works if configured
* [ ] logout works
* [ ] dashboard loads
* [ ] claims page loads
* [ ] provider comparison page loads
* [ ] role mapping page loads
* [ ] SCIM readiness page loads
* [ ] SCIM users simulation works
* [ ] SCIM groups simulation works
* [ ] JML simulation works
* [ ] RBAC still works
* [ ] protected pages still enforce access
* [ ] unauthorized users are blocked
* [ ] access denied behavior remains clear
* [ ] no raw tokens are displayed
* [ ] no raw tokens are logged
* [ ] no `.env` is committed
* [ ] no secrets are committed

---

## 16. Future Testing Plan

### Test 1 — App Runs Without SCIM Config

Expected:

* [ ] app starts without errors
* [ ] local login works
* [ ] dashboard loads
* [ ] SCIM readiness page loads
* [ ] no secret is required to view normal learning pages

### Test 2 — SCIM Readiness Page

Expected:

* [ ] local-only simulator message is clear
* [ ] SCIM provisioning is explained
* [ ] SCIM bearer token is never shown
* [ ] page does not claim production readiness

### Test 3 — SCIM User Simulation

Expected:

* [ ] user simulation still works
* [ ] user create/update/deactivate behavior remains safe
* [ ] no real user data is required

### Test 4 — SCIM Group Simulation

Expected:

* [ ] group simulation still works
* [ ] group membership behavior remains simulated
* [ ] groups do not bypass RBAC
* [ ] groups do not automatically grant admin access

### Test 5 — JML Explanation

Expected:

* [ ] Joiner provisioning is explained
* [ ] Mover attribute/group change is explained
* [ ] Leaver deactivation is explained
* [ ] audit evidence concept is explained

### Test 6 — Security Review

Expected:

* [ ] no `.env` appears in Git status
* [ ] no secrets appear in diff
* [ ] no bearer tokens appear in committed files
* [ ] no screenshots are added unless approved
* [ ] no public endpoint or tunneling is added

---

## 17. Security Review Before Future Commit

Run from repo root:

```bash
cd /d/identitycore
git status --short
git diff --stat
git diff -- . ":(exclude)package-lock.json" | grep -Ei "secret|token|password|tenant|client_id|client_secret|scim_bearer|authorization: bearer|aws_access_key|private_key|BEGIN RSA|BEGIN PRIVATE|okta|microsoftonline|ngrok|tunnel"
```

If output contains safe documentation language only, inspect manually.

If output contains real values, stop and remove them.

---

## 18. Phase 17 Planning Commit

After creating the two Phase 17 planning files, run:

```bash
cd /d/identitycore
git add "docs/Post-Phase-10/Phase 17 — Safe SCIM Practice Planning Spec.md"
git add "docs/Post-Phase-10/Phase 17 Checklist — Safe SCIM Practice Planning.md"
git status --short
git commit -m "docs: add phase-17 safe SCIM practice planning"
git push origin main
```

Confirm:

* [ ] both docs are staged
* [ ] no app code is staged
* [ ] no `.env` is staged
* [ ] no screenshots are staged
* [ ] commit succeeds
* [ ] push succeeds

---

## 19. ChatGPT Project Source Update

After the two files are created, add them to the ChatGPT Project source section:

```text
docs/Post-Phase-10/Phase 17 — Safe SCIM Practice Planning Spec.md
docs/Post-Phase-10/Phase 17 Checklist — Safe SCIM Practice Planning.md
```

Confirm:

* [ ] Phase 17 spec uploaded to ChatGPT Project source
* [ ] Phase 17 checklist uploaded to ChatGPT Project source

---

## 20. Phase 17 Completion Checklist

Phase 17 is complete when:

* [ ] Phase 17 spec created
* [ ] Phase 17 checklist created
* [ ] both files saved in `docs/Post-Phase-10/`
* [ ] both files uploaded to ChatGPT Project source section
* [ ] both files committed to `main`
* [ ] both files pushed to GitHub
* [ ] no app code changed
* [ ] no `.env` committed
* [ ] no secrets committed
* [ ] no screenshots committed
* [ ] working tree clean
* [ ] future Phase 18 direction is clear

---

## Suggested File Location

Save this checklist as:

```text
docs/Post-Phase-10/Phase 17 Checklist — Safe SCIM Practice Planning.md
```

---

## Suggested Commit Message

```text
docs: add phase-17 safe SCIM practice planning
```
