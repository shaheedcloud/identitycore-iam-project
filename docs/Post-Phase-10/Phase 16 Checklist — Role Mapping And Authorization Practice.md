# Phase 16 Checklist — Role Mapping and Authorization Practice

## Purpose

This checklist controls Phase 16 from planning through implementation readiness.

Phase 16 must safely introduce role mapping and authorization practice without weakening IdentityCore security behavior.

Phase 16 begins as a planning/documentation phase.

Implementation must not begin until the Phase 16 spec and this checklist are committed to `main`, local `main` is clean, and a Phase 16 feature branch is created.

---

## Phase 16 Goal

Create a safe role mapping and authorization practice foundation for IdentityCore.

The learner should understand:

* local dummy user role assignment
* Entra-authenticated user role handling
* Okta-authenticated user role handling
* authentication versus authorization
* safe default mapping
* deny-by-default authorization posture
* explicit allowlisted role mapping
* why external claims must not automatically grant admin access
* why external groups must not automatically grant privileged access
* how local RBAC remains the final authorization control

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
* [ ] Phase 15 is merged into `main`
* [ ] Phase 15 was pulled locally
* [ ] no `.env` file is staged or tracked
* [ ] no screenshots are staged
* [ ] no secrets are present
* [ ] no app code is being changed during planning

---

## 2. Planning Documents

Create these documents:

```text
docs/Post-Phase-10/Phase 16 — Role Mapping and Authorization Practice Spec.md
docs/Post-Phase-10/Phase 16 Checklist — Role Mapping and Authorization Practice.md
```

Confirm:

* [ ] Phase 16 spec exists
* [ ] Phase 16 checklist exists
* [ ] spec defines objective
* [ ] spec defines business scenario
* [ ] spec defines scope
* [ ] spec defines out of scope
* [ ] spec defines safe mapping model
* [ ] spec defines forbidden mapping model
* [ ] spec defines role source explanation
* [ ] spec defines authorization decision explanation
* [ ] spec defines provider-specific mapping notes
* [ ] spec defines files Codex may inspect later
* [ ] spec defines files Codex may change later
* [ ] spec defines files Codex should avoid changing
* [ ] spec defines testing plan
* [ ] spec defines security review command
* [ ] checklist is complete

---

## 3. Phase 16 Planning Scope

Phase 16 planning may define:

* [ ] role mapping documentation
* [ ] safe role mapping model
* [ ] allowlisted mapping rules
* [ ] deny-by-default mapping behavior
* [ ] role source explanation
* [ ] authorization decision explanation
* [ ] admin mapping guardrails
* [ ] provider-specific mapping examples
* [ ] future `/role-mapping` page idea
* [ ] future `/api/role-mapping` endpoint idea
* [ ] README update plan
* [ ] future Codex implementation prompt

---

## 4. Phase 16 Forbidden Work During Planning

Do not change app code during planning.

Do not add:

* [ ] automatic admin mapping from Entra claims
* [ ] automatic admin mapping from Okta claims
* [ ] automatic group-to-role mapping without allowlisted rules
* [ ] production authorization
* [ ] production role mapping
* [ ] database persistence
* [ ] AWS IAM integration
* [ ] AWS federation
* [ ] real SCIM target
* [ ] real SAML identity provider
* [ ] cloud deployment
* [ ] CI/CD
* [ ] external API calls beyond existing OIDC behavior
* [ ] raw token display
* [ ] raw token logging
* [ ] committed `.env`
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

## 5. Core Safety Principle

Confirm Phase 16 follows this principle:

```text
External authentication proves identity.
Local authorization decides access.
```

Checklist:

* [ ] Entra authentication does not automatically mean admin access
* [ ] Okta authentication does not automatically mean admin access
* [ ] external groups are not blindly trusted
* [ ] external claims are not blindly trusted
* [ ] local RBAC remains the authorization control
* [ ] role mapping is explicit and documented
* [ ] deny-by-default behavior is preserved

---

## 6. Safe Mapping Model

Safe mapping pattern:

```text
Provider claim → explicit allowlisted mapping rule → local role → RBAC decision
```

Confirm:

* [ ] provider authentication happens first
* [ ] claim indicators or summaries are evaluated safely
* [ ] only allowlisted mapping rules may assign roles
* [ ] no mapping rule means safe default role
* [ ] safe default role is not admin
* [ ] RBAC decides route/API access
* [ ] privileged mapping is not automatic

---

## 7. Forbidden Mapping Model

Forbidden mapping pattern:

```text
Any external claim or group → automatic admin access
```

Confirm Phase 16 does not allow:

* [ ] any Entra-authenticated user becoming admin automatically
* [ ] any Okta-authenticated user becoming admin automatically
* [ ] any claim named `admin` granting admin automatically
* [ ] any group containing `admin` granting admin automatically
* [ ] any external group name being trusted without allowlisting
* [ ] any email domain granting privileged access automatically
* [ ] any provider claim bypassing local RBAC

---

## 8. Safe Default Role

Recommended safe default:

```text
standard_user
```

Confirm:

* [ ] Entra-authenticated users default safely when no allowlisted rule matches
* [ ] Okta-authenticated users default safely when no allowlisted rule matches
* [ ] safe default role does not have admin access
* [ ] safe default role does not bypass RBAC
* [ ] safe default mapping is explained clearly

---

## 9. Role Source Explanation

Future implementation should make role source visible.

Allowed role source examples:

| Role Source                           | Meaning                                                                  |
| ------------------------------------- | ------------------------------------------------------------------------ |
| Local dummy user object               | Role came from built-in local simulator user data                        |
| Safe default external mapping         | User authenticated through Entra or Okta but no allowlisted rule matched |
| Explicit allowlisted provider mapping | A documented claim mapping rule assigned the role                        |
| Not mapped                            | No role mapping available or mapping intentionally denied                |

Confirm:

* [ ] role source is explained in documentation
* [ ] role source should be visible in future UI/API if implemented
* [ ] role source does not expose raw claims
* [ ] role source does not expose secrets

---

## 10. Authorization Decision Explanation

Future implementation should explain access decisions clearly.

Example decision explanation:

```text
You authenticated successfully through Okta Lab.
Your local role is standard_user.
This role does not have access to the admin page.
Access was denied because local RBAC requires admin_user.
```

Confirm:

* [ ] access granted/denied behavior is explained as a learning moment
* [ ] required role can be explained
* [ ] current role can be explained
* [ ] provider authentication can be separated from local authorization
* [ ] least privilege is explained

---

## 11. Provider-Specific Mapping Notes

### Local Dummy Login

Confirm:

* [ ] local dummy users may keep existing simulator roles
* [ ] local admin stays controlled by local dummy user object
* [ ] local standard user stays non-admin
* [ ] local finance/security roles remain simulator-controlled

### Microsoft Entra ID OIDC

Confirm:

* [ ] Entra claims are not blindly trusted
* [ ] Entra group claims are not automatically mapped to admin
* [ ] Entra-authenticated users remain conservative by default
* [ ] any future Entra privileged mapping must be explicit and allowlisted

### Okta OIDC

Confirm:

* [ ] Okta claims are not blindly trusted
* [ ] Okta group claims are not automatically mapped to admin
* [ ] Okta-authenticated users remain conservative by default
* [ ] any future Okta privileged mapping must be explicit and allowlisted

---

## 12. Future Implementation Readiness

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
feature/phase-16-role-mapping-authorization-practice
```

Suggested future commit message:

```text
phase-16: add role mapping and authorization practice foundation
```

---

## 13. Files Codex May Inspect Later

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
iam-practice-app/src/routes/pageRoutes.js
iam-practice-app/src/middleware/rbac.js
iam-practice-app/src/views/dashboard.html
iam-practice-app/src/views/claims.html
iam-practice-app/src/views/provider-comparison.html
iam-practice-app/src/views/oidc-readiness.html
iam-practice-app/src/public/styles.css
```

---

## 14. Files Codex May Change Later

Codex may change files related to role mapping explanation, safe mapping display, provider comparison display, documentation, and existing page presentation.

Possible files:

```text
README.md
iam-practice-app/README.md
iam-practice-app/src/claims.js
iam-practice-app/src/routes/apiRoutes.js
iam-practice-app/src/routes/pageRoutes.js
iam-practice-app/src/views/dashboard.html
iam-practice-app/src/views/claims.html
iam-practice-app/src/views/provider-comparison.html
iam-practice-app/src/views/oidc-readiness.html
iam-practice-app/src/public/styles.css
```

Codex may add a new role mapping view only if the implementation plan explicitly approves it:

```text
iam-practice-app/src/views/role-mapping.html
```

If Codex adds a new file, it must explain why.

---

## 15. Files Codex Should Avoid Changing Unless Necessary

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
* [ ] no new dependency is added unless clearly necessary and approved by phase scope

---

## 16. Existing Functionality To Preserve Later

Phase 16 implementation must preserve:

* [ ] app starts locally
* [ ] app works without `.env`
* [ ] local dummy login works
* [ ] Entra OIDC still works if configured
* [ ] Okta OIDC still works if configured
* [ ] logout works
* [ ] dashboard loads
* [ ] provider comparison page loads
* [ ] claims page loads
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

## 17. Testing Plan For Future Implementation

When Phase 16 implementation happens, testing should include the following checks.

### Test 1 — App Runs Without Provider Config

Expected:

* [ ] app starts without errors
* [ ] local dummy login works
* [ ] role mapping page or section does not require real Entra or Okta config
* [ ] no provider secrets are required
* [ ] no page crashes when provider config is missing

### Test 2 — Local Dummy Login Role Mapping

Expected:

* [ ] local user can sign in
* [ ] role mapping shows local provider context
* [ ] role source is local dummy user object
* [ ] local role is displayed correctly
* [ ] admin access follows existing local RBAC

### Test 3 — Entra OIDC Safe Default Mapping

With local Entra `.env` configured:

Expected:

* [ ] Entra login still works
* [ ] Entra-authenticated user maps conservatively unless explicitly allowlisted
* [ ] role source is safe default external mapping if no rule matches
* [ ] Entra-authenticated user does not automatically become admin
* [ ] raw tokens are not displayed
* [ ] raw tokens are not logged

### Test 4 — Okta OIDC Safe Default Mapping

With local Okta `.env` configured:

Expected:

* [ ] Okta login still works
* [ ] Okta-authenticated user maps conservatively unless explicitly allowlisted
* [ ] role source is safe default external mapping if no rule matches
* [ ] Okta-authenticated user does not automatically become admin
* [ ] raw tokens are not displayed
* [ ] raw tokens are not logged

### Test 5 — RBAC Regression

Expected:

* [ ] local admin can still access admin pages
* [ ] standard/local user cannot access admin pages
* [ ] Entra-authenticated standard user cannot access admin pages unless explicitly mapped in a later approved phase
* [ ] Okta-authenticated standard user cannot access admin pages unless explicitly mapped in a later approved phase
* [ ] access denied messaging remains clear

### Test 6 — API Safety

If `/api/role-mapping` is added:

Expected:

* [ ] endpoint returns safe role mapping summary
* [ ] endpoint does not return raw tokens
* [ ] endpoint does not return raw claims
* [ ] endpoint does not return secrets
* [ ] endpoint does not return tenant IDs, Okta domains, client IDs, or authorization codes

---

## 18. Security Review Before Commit

Before committing implementation later, run:

```bash
cd /d/identitycore

git diff --stat

git diff -- iam-practice-app/src/middleware/rbac.js

git diff -- iam-practice-app/package.json

git diff -- iam-practice-app/package-lock.json

git diff -- . ":(exclude)package-lock.json" | grep -Ei "secret|token|password|tenant|client_id|client_secret|aws_access_key|private_key|BEGIN RSA|BEGIN PRIVATE|okta|microsoftonline|login.microsoftonline"
```

Expected:

* [ ] no unexpected RBAC changes
* [ ] no package changes unless justified
* [ ] no `.env`
* [ ] no secrets
* [ ] no raw tokens
* [ ] no tenant IDs
* [ ] no real Okta domain
* [ ] no client IDs
* [ ] no client secrets
* [ ] no private keys
* [ ] no certificates

Provider words such as `Okta`, `Entra`, `Microsoft`, or `token` may appear in safe documentation or safety warnings. The review must confirm no real sensitive values appear.

---

## 19. Documentation Review Before Commit

Confirm documentation explains:

* [ ] role mapping purpose
* [ ] authentication versus authorization
* [ ] safe default mapping
* [ ] allowlisted mapping model
* [ ] forbidden automatic admin mapping
* [ ] local RBAC remains the authorization control
* [ ] Entra users do not automatically become admins
* [ ] Okta users do not automatically become admins
* [ ] raw tokens are not displayed
* [ ] raw tokens are not logged
* [ ] no secrets are committed
* [ ] role mapping is local practice only
* [ ] production role mapping requires governance, audit, approval, and change control

---

## 20. Manual Screenshot Rules

Screenshots must be captured manually and redacted before committing.

Suggested screenshots:

```text
screenshots/phase-16-role-mapping-authorization-practice/PHASE-16-ROLE-MAPPING-LOCAL-USER.png
screenshots/phase-16-role-mapping-authorization-practice/PHASE-16-ROLE-MAPPING-ENTRA-SAFE-DEFAULT.png
screenshots/phase-16-role-mapping-authorization-practice/PHASE-16-ROLE-MAPPING-OKTA-SAFE-DEFAULT.png
screenshots/phase-16-role-mapping-authorization-practice/PHASE-16-ADMIN-DENIED-FOR-EXTERNAL-STANDARD-USER.png
screenshots/phase-16-role-mapping-authorization-practice/PHASE-16-LOCAL-RBAC-STILL-ENFORCED.png
```

Do not commit screenshots until they are redacted.

Never commit screenshots showing:

* [ ] tenant ID
* [ ] Okta org domain if sensitive
* [ ] client ID
* [ ] client secret
* [ ] real user email
* [ ] raw tokens
* [ ] authorization code
* [ ] session cookie values

---

## 21. Planning Docs Commit

After creating the Phase 16 spec and checklist, commit only the planning documents to `main`.

Run:

```bash
cd /d/identitycore

git add "docs/Post-Phase-10/Phase 16 — Role Mapping and Authorization Practice Spec.md"
git add "docs/Post-Phase-10/Phase 16 Checklist — Role Mapping and Authorization Practice.md"

git status --short

git commit -m "docs: add phase-16 role mapping and authorization planning"

git push origin main
```

Confirm:

* [ ] only Phase 16 planning docs are staged
* [ ] no app code is staged
* [ ] no `.env` is staged
* [ ] no screenshots are staged
* [ ] no secrets are staged
* [ ] planning docs are pushed to `main`

---

## 22. Create Phase 16 Feature Branch Later

After planning docs are committed and pushed to `main`, run:

```bash
cd /d/identitycore

git status --short

git checkout -b feature/phase-16-role-mapping-authorization-practice

git branch --show-current
git status --short
```

Expected branch:

```text
feature/phase-16-role-mapping-authorization-practice
```

Confirm:

* [ ] branch is not `main`
* [ ] branch name is correct
* [ ] branch was created from updated `main`
* [ ] working tree is clean after branch creation
* [ ] Codex implementation will happen only on this branch

---

## 23. Pre-Codex Checklist

Before giving Codex the Phase 16 prompt, confirm:

* [ ] Phase 16 branch exists
* [ ] current branch is `feature/phase-16-role-mapping-authorization-practice`
* [ ] Codex must not work on `main`
* [ ] Codex must inspect before editing
* [ ] Codex must preserve local dummy login
* [ ] Codex must preserve Phase 13 Entra OIDC behavior
* [ ] Codex must preserve Phase 14 Okta OIDC behavior
* [ ] Codex must preserve Phase 15 provider comparison behavior
* [ ] Codex must preserve RBAC
* [ ] Codex must preserve readiness pages
* [ ] Codex must preserve SCIM/JML/SAML/audit simulator behavior
* [ ] Codex must not add AWS work
* [ ] Codex must not add database persistence
* [ ] Codex must not add cloud deployment
* [ ] Codex must not commit `.env`
* [ ] Codex must not commit secrets
* [ ] Codex must not display raw tokens
* [ ] Codex must not log raw tokens
* [ ] Codex must not automatically map Entra claims or groups to admin access
* [ ] Codex must not automatically map Okta claims or groups to admin access

---

## 24. Codex Handoff Prompt

Use the approved prompt from:

```text
docs/Post-Phase-10/Phase 16 — Role Mapping and Authorization Practice Spec.md
```

The Codex prompt must include:

* [ ] repository name
* [ ] local folder
* [ ] current branch
* [ ] phase goal
* [ ] allowed work
* [ ] forbidden work
* [ ] role mapping guardrails
* [ ] local RBAC preservation
* [ ] token handling rules
* [ ] functionality to preserve
* [ ] files Codex may inspect
* [ ] files Codex may change
* [ ] files Codex should avoid changing
* [ ] acceptance criteria
* [ ] testing expectations
* [ ] required summary
* [ ] suggested commit message

---

## 25. Post-Codex Review

After Codex finishes later, run:

```bash
cd /d/identitycore
git status --short
git diff --stat
```

Review:

* [ ] changed files make sense
* [ ] no `.env` file appears
* [ ] no screenshots unexpectedly added
* [ ] no unrelated feature added
* [ ] no AWS implementation added
* [ ] no database added
* [ ] no cloud deployment added
* [ ] no raw token display added
* [ ] no raw token logging added
* [ ] no RBAC weakening occurred
* [ ] Entra behavior was not broken
* [ ] Okta behavior was not broken
* [ ] provider comparison behavior was not broken
* [ ] documentation updated

If `rbac.js` changed, inspect it carefully:

```bash
git diff -- iam-practice-app/src/middleware/rbac.js
```

---

## 26. Local Test Commands Later

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

* [ ] login page loads
* [ ] local dummy login works
* [ ] dashboard loads
* [ ] claims page loads
* [ ] provider comparison page loads
* [ ] role mapping page or section loads if added
* [ ] OIDC readiness page loads
* [ ] JWT readiness page loads if present
* [ ] SCIM readiness page loads if present
* [ ] JML readiness page loads if present
* [ ] SAML readiness page loads if present
* [ ] audit readiness page loads if present
* [ ] standard user is blocked from admin
* [ ] local admin can access admin
* [ ] `/api/role-mapping` returns safe indicators if added
* [ ] no Git Bash errors appear

Stop the app:

```text
CTRL + C
```

---

## 27. Commit Implementation Later

After local testing and security review pass:

```bash
cd /d/identitycore

git add README.md
git add iam-practice-app/README.md
git add iam-practice-app/src/claims.js
git add iam-practice-app/src/routes/apiRoutes.js
git add iam-practice-app/src/routes/pageRoutes.js
git add iam-practice-app/src/views/dashboard.html
git add iam-practice-app/src/views/claims.html
git add iam-practice-app/src/views/provider-comparison.html
git add iam-practice-app/src/views/oidc-readiness.html
git add iam-practice-app/src/views/role-mapping.html
git add iam-practice-app/src/public/styles.css

git status --short

git commit -m "phase-16: add role mapping and authorization practice foundation"

git push origin feature/phase-16-role-mapping-authorization-practice
```

Only add files that actually changed or were created.

Do not stage `.env`, screenshots, secrets, or unrelated files.

---

## 28. Pull Request Later

Pull request title:

```text
Phase 16: Role Mapping and Authorization Practice Foundation
```

Pull request description:

```markdown
## Summary

Adds Phase 16 role mapping and authorization practice foundation for IdentityCore.

IdentityCore now explains how local dummy login, Microsoft Entra ID OIDC login, and Okta OIDC login relate to conservative local role assignment and RBAC enforcement.

## What changed

- Added safe role mapping practice foundation
- Added role source explanation
- Added safe default external mapping explanation
- Added authentication vs authorization explanation
- Added allowlisted mapping model
- Added forbidden automatic admin mapping warning
- Preserved provider comparison behavior
- Preserved local RBAC enforcement
- Updated documentation

## Security and guardrails

- No `.env` committed
- No secrets committed
- No tenant IDs committed
- No Okta domains committed
- No client IDs or client secrets committed
- No raw tokens displayed
- No raw tokens logged
- No automatic admin mapping from Entra claims
- No automatic admin mapping from Okta claims
- No automatic group-to-role mapping added
- Local RBAC remains the authorization control

## Validation

- App starts locally
- App works without `.env`
- Local dummy login works
- Dashboard loads
- Logout works
- Claims page loads
- Provider comparison page loads
- Role mapping page or section loads
- OIDC/JWT/SCIM/JML/SAML/audit readiness pages load
- Standard user is blocked from admin
- Local admin can access admin
- No Git Bash errors during local testing
```

---

## 29. Phase 16 Planning Completion Criteria

Phase 16 planning is complete when:

* [ ] Phase 16 spec exists
* [ ] Phase 16 checklist exists
* [ ] both documents are saved under `docs/Post-Phase-10/`
* [ ] both documents are committed to `main`
* [ ] both documents are pushed to GitHub
* [ ] no app code changed during planning
* [ ] no `.env` committed
* [ ] no screenshots committed
* [ ] no secrets committed
* [ ] local `main` is clean

---

## 30. Phase 16 Implementation Completion Criteria

Phase 16 implementation is complete when:

* [ ] implementation branch exists
* [ ] Codex worked only on the Phase 16 branch
* [ ] role mapping page or section works if implemented
* [ ] role mapping API returns safe indicators if implemented
* [ ] app works without `.env`
* [ ] local dummy login works
* [ ] Entra OIDC still works if configured
* [ ] Okta OIDC still works if configured
* [ ] provider comparison still works
* [ ] claims page still works
* [ ] local RBAC still works
* [ ] standard users are blocked from admin
* [ ] local admin can access admin
* [ ] raw tokens are not displayed
* [ ] raw tokens are not logged
* [ ] no automatic external admin mapping exists
* [ ] no `.env` is committed
* [ ] no secrets are committed
* [ ] README documentation is updated if needed
* [ ] PR is reviewed
* [ ] PR is merged into `main`
* [ ] local `main` is pulled after merge
* [ ] local `main` is clean after pull
