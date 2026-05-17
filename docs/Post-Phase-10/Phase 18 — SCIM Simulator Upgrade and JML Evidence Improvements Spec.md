# Phase 18 — SCIM Simulator Upgrade and JML Evidence Improvements Spec

## Purpose

Phase 18 defines the next safe implementation step after Phase 17 Safe SCIM Practice Planning.

Phase 17 confirmed that IdentityCore should not connect a real SCIM provider yet. Real Entra ID or Okta SCIM provisioning usually requires the SCIM endpoint to be reachable over public HTTPS, which introduces extra risk, public exposure concerns, bearer-token handling concerns, and possible use of tunneling tools. Phase 18 therefore improves the existing local SCIM simulator first.

The goal is to make SCIM provisioning, SCIM groups, Joiner/Mover/Leaver lifecycle behavior, audit evidence, and RBAC separation easier to understand without exposing IdentityCore to the public internet and without adding real provider provisioning.

IdentityCore must remain:

* local-first
* safe
* no-secrets
* skill-practice focused
* portfolio-friendly
* not production
* not cloud-deployed by default

---

## Objective

Improve the local SCIM simulator and JML evidence experience so the learner can clearly understand how provisioning events relate to lifecycle changes, local application records, group membership, access decisions, and audit evidence.

The learner should be able to understand:

* what a SCIM user record represents
* what a SCIM group record represents
* how SCIM user lifecycle events map to Joiner, Mover, and Leaver scenarios
* why SCIM is not login
* why SCIM group membership does not automatically grant application access
* how SCIM-created or SCIM-updated records should still be controlled by RBAC
* how provisioning events should generate audit-style evidence
* why deactivation is safer than unsafe hard delete in IAM lifecycle practice
* how to troubleshoot common SCIM simulator behavior locally
* why real SCIM provider integration should wait until a later decision point

---

## Business Scenario

IdentityCore represents a fictional enterprise IAM learning environment.

In a real enterprise, identity providers such as Microsoft Entra ID or Okta may provision users and groups into downstream applications using SCIM. When a person joins the company, moves departments, changes roles, or leaves, provisioning events help keep the downstream application account state aligned with the identity source.

However, provisioning is not the same as authentication or authorization.

A safe IAM design separates:

```text
Authentication: Who signed in?
Authorization: What can they access?
Provisioning: What account or group record exists in the application?
Lifecycle: What changed when the person joined, moved, or left?
Audit: What evidence proves what happened?
```

Phase 18 teaches that separation by improving the simulator before adding real external provider provisioning.

---

## Current Project Status

IdentityCore currently supports:

* local dummy login
* Microsoft Entra ID OIDC local practice
* Okta OIDC local practice
* safe provider context
* safe claim summary behavior
* provider comparison page
* provider comparison API
* role mapping practice foundation
* role mapping page
* role mapping API
* local RBAC enforcement
* protected pages
* access denied learning flow
* OIDC readiness
* JWT readiness
* SCIM users simulation
* SCIM groups simulation
* JML simulation
* SAML simulation
* audit readiness
* Docker runtime support
* no raw token display
* no raw token logging
* local-only simulator behavior

Phase 18 must build on the existing SCIM, JML, role mapping, provider comparison, and audit learning foundation without weakening safety.

---

## Phase 18 North Star

After Phase 18, IdentityCore should make this lifecycle flow clearer:

```text
Simulated Joiner/Mover/Leaver event
        ↓
SCIM user or group record changes
        ↓
Lifecycle status is visible
        ↓
Audit-style evidence explains what happened
        ↓
RBAC still controls protected pages and APIs
        ↓
Learner understands provisioning is not login
```

The app should feel more useful as an IAM practice tool while remaining safe and local.

---

## Phase 18 Scope

Phase 18 may include:

* improved SCIM readiness page
* improved SCIM user lifecycle explanations
* improved SCIM group lifecycle explanations
* clearer SCIM and JML relationship display
* clearer SCIM and RBAC relationship display
* local SCIM simulator page improvements
* safe SCIM request examples using dummy data only
* safe SCIM response examples using dummy data only
* Joiner/Mover/Leaver evidence improvements
* audit-style lifecycle event summaries
* dashboard links to SCIM/JML practice areas
* explanatory cards showing SCIM is not login
* explanatory cards showing SCIM does not replace RBAC
* better empty states for SCIM users/groups
* better error states for missing or disabled SCIM config
* local-only warning improvements
* README updates
* troubleshooting documentation updates
* manual screenshot evidence plan

---

## Out of Scope

Phase 18 must not add:

* real Entra ID SCIM provisioning connection
* real Okta SCIM provisioning connection
* production SCIM endpoint exposure
* public internet exposure
* tunneling tools
* ngrok
* cloud deployment
* database persistence
* CI/CD
* SIEM integration
* webhook integration
* email integration
* scheduled tasks
* background jobs
* AWS IAM integration
* AWS federation
* production authorization
* production authentication
* raw token display
* raw token logging
* committed `.env`
* committed SCIM bearer tokens
* tenant IDs
* Okta domains
* client IDs
* client secrets
* access tokens
* refresh tokens
* ID tokens
* private keys
* certificates
* unredacted screenshots
* real user data

---

## Critical Safety Rule

Phase 18 improves local simulation only.

It must not expose IdentityCore externally and must not require a real provider to call the app.

Allowed:

* local SCIM simulator improvements
* fake users
* fake groups
* fake departments
* fake lifecycle events
* placeholder `.env.example` values
* local-only testing
* redacted screenshots later if screenshots are used

Forbidden:

* public SCIM endpoints
* real provider SCIM connections
* real SCIM bearer tokens in GitHub
* tunneling tools
* cloud-hosted SCIM target
* production tenant data
* real business users

---

## Core Design Principle

Phase 18 must preserve this principle:

```text
SCIM provisions identity records.
RBAC still decides access.
```

SCIM should help show account lifecycle state.

SCIM must not bypass local authorization.

SCIM group membership must not automatically grant admin access.

---

## SCIM Is Not Login

Phase 18 should make this concept visible in the app and documentation:

```text
OIDC/SAML handles sign-in.
SCIM handles provisioning.
RBAC handles authorization.
JML explains lifecycle process.
Audit evidence explains what happened.
```

A SCIM-created user should not automatically create a browser session.

A SCIM-created group should not automatically bypass RBAC.

A SCIM-provisioned account record is not proof that the user is currently authenticated.

---

## SCIM and JML Relationship

Phase 18 should improve how Joiner, Mover, and Leaver events are explained.

### Joiner Scenario

A joiner event should demonstrate:

```text
New worker joins IdentityCore
SCIM user record is created or shown as active
Default access remains conservative
RBAC still controls protected pages
Audit evidence records provisioning event
```

Expected learning point:

```text
Provisioning creates the account record, but access still depends on role mapping and RBAC.
```

### Mover Scenario

A mover event should demonstrate:

```text
Worker changes department or job role
SCIM user attributes are updated
SCIM group membership may change
Access should change only through explicit authorization rules
Audit evidence records the lifecycle change
```

Expected learning point:

```text
A mover event is one of the highest-risk IAM moments because incorrect access may remain or excessive access may be added.
```

### Leaver Scenario

A leaver event should demonstrate:

```text
Worker leaves IdentityCore
SCIM user active flag becomes false
Application record is deactivated
Audit evidence is retained
Protected access should be denied
```

Expected learning point:

```text
Deactivation preserves evidence and is safer than unsafe hard delete for lifecycle learning.
```

---

## SCIM and RBAC Relationship

Phase 18 must preserve the difference between provisioning and authorization.

Correct model:

```text
SCIM creates or updates records.
Role mapping may assign a local role only if explicitly designed.
RBAC enforces page and API access.
```

Incorrect model:

```text
SCIM group name bypasses RBAC.
```

Phase 18 may improve explanations, simulator displays, and evidence views, but it must not introduce automatic privileged access from SCIM data.

---

## SCIM Token Safety Rules

IdentityCore already uses local SCIM safety concepts. Phase 18 must preserve token safety.

Never commit:

* SCIM bearer token
* authorization header
* `.env`
* `.env.local`
* `.env.production`
* logs showing authorization headers
* screenshots showing token values

Allowed placeholder pattern only:

```env
SCIM_ENABLED=false
SCIM_BEARER_TOKEN=YOUR_LOCAL_SCIM_BEARER_TOKEN
```

Real values, if used locally for simulator testing, must remain only in:

```text
D:\identitycore\iam-practice-app\.env
```

---

## Recommended User Experience Improvements

### SCIM Readiness Page

The SCIM readiness page should clearly show:

* SCIM is local simulator behavior
* SCIM is not login
* SCIM bearer tokens are secrets
* SCIM users are application identity records
* SCIM groups are provisioning/group records
* RBAC still controls protected pages
* real Entra/Okta SCIM integration is not enabled yet
* future provider SCIM integration requires separate planning

### SCIM User Practice Area

If the app already has a SCIM user display or API references, improve explanation around:

* active vs inactive user
* joiner-created user
* mover-updated user
* leaver-deactivated user
* user attributes such as department/title
* why deactivation preserves evidence

### SCIM Group Practice Area

If the app already has a SCIM group display or group API references, improve explanation around:

* group creation
* group membership update
* group removal/deactivation concepts
* group membership is not automatic admin access
* RBAC remains the final control

### JML Evidence Area

Improve JML evidence so the learner can understand:

* what event occurred
* which identity record changed
* what lifecycle state changed
* what access risk exists
* what control prevents privilege escalation
* what audit evidence should prove

### Dashboard

The dashboard may add or improve cards such as:

* SCIM Provisioning Simulator
* JML Lifecycle Evidence
* Provisioning vs Login
* SCIM and RBAC Separation
* Future Entra SCIM Lab
* Future Okta SCIM Lab

Future provider cards must be clearly labeled as future/not connected.

---

## Safe Dummy Data Rules

Phase 18 may use fake users and groups only.

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

* real employee names
* real company users
* real email addresses
* real tenant values
* real Okta domains
* real IDs from Entra or Okta

---

## Audit Evidence Concept

Phase 18 may improve local audit-style evidence around SCIM/JML events.

Audit evidence should answer:

* what event occurred?
* was it joiner, mover, or leaver?
* what user or group record changed?
* what changed before and after?
* was the user active or inactive?
* did RBAC remain enforced?
* did the event grant admin access automatically?
* was the action simulated/local-only?

Safe example event summary:

```json
{
  "eventType": "scim_user_deactivated",
  "lifecycleStage": "leaver",
  "subject": "user.scim.leaver",
  "activeBefore": true,
  "activeAfter": false,
  "rbacStillEnforced": true,
  "adminAccessAutomatic": false,
  "source": "local_simulator"
}
```

Audit evidence must not include:

* bearer tokens
* authorization headers
* raw provider tokens
* real tenant IDs
* real client IDs
* secrets
* real user data

---

## Files Codex May Inspect

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

## Files Codex May Change

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

## Files Codex Should Avoid Changing Unless Necessary

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

Any RBAC change must be reviewed manually.

Any package change must be justified.

No new dependency should be added unless clearly necessary and approved by the phase scope.

---

## Existing Functionality To Preserve

Phase 18 implementation must preserve:

* app starts locally
* app works without `.env`
* local dummy login works
* Entra OIDC still works if configured
* Okta OIDC still works if configured
* logout works
* dashboard loads
* provider comparison page loads
* role mapping page loads
* claims page loads
* RBAC still works
* protected pages still enforce access
* unauthorized users are blocked
* access denied page still works
* claims/token simulation still works
* OIDC readiness page loads
* JWT readiness page loads if present
* SCIM readiness page loads
* SCIM users simulation still works
* SCIM groups simulation still works
* JML simulation still works
* SAML readiness page loads if present
* audit readiness page loads if present
* Docker runtime remains safe
* local-only simulator messaging remains clear
* no `.env` is committed
* no secrets are committed

---

## Testing Plan

When Phase 18 implementation happens, testing should include the following checks.

### Test 1 — App Runs Without Provider Config

Expected:

* app starts without errors
* local dummy login works
* dashboard loads
* SCIM/JML pages do not require real Entra or Okta config
* no provider secrets are required
* no page crashes when provider config is missing

### Test 2 — SCIM Readiness Page

Expected:

* SCIM readiness page loads
* page explains SCIM is local/simulated
* page explains SCIM is not login
* page explains SCIM bearer token safety
* page explains no real provider provisioning is active
* page explains RBAC still controls access

### Test 3 — SCIM User Simulator

Expected:

* SCIM user simulation still works
* user lifecycle state is understandable
* active/inactive concept is clear
* joiner/mover/leaver examples are clear if implemented
* no real user data appears

### Test 4 — SCIM Group Simulator

Expected:

* SCIM group simulation still works
* group membership concept is understandable
* group membership does not automatically grant admin access
* RBAC separation is explained
* no real group IDs appear

### Test 5 — JML Evidence

Expected:

* JML lifecycle explanation loads
* evidence shows what event occurred
* evidence explains what changed
* evidence explains access risk
* evidence confirms RBAC remains enforced
* no tokens or secrets are displayed

### Test 6 — RBAC Preservation

Expected:

* normal user remains blocked from admin-only pages
* admin/security user access still follows existing local RBAC
* SCIM records do not bypass protected routes
* access denied behavior remains clear

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

## Manual Browser Test Flow

Suggested flow:

1. Start the app locally.
2. Open `http://localhost:3000`.
3. Confirm login page loads.
4. Log in with a normal/local demo user.
5. Confirm dashboard loads.
6. Open SCIM readiness page.
7. Confirm SCIM local-only messaging is clear.
8. Open SCIM user/group simulator area if available.
9. Confirm user/group lifecycle explanations are clear.
10. Open JML/lifecycle page if available.
11. Confirm evidence explains joiner/mover/leaver concepts.
12. Attempt admin-only page as non-admin.
13. Confirm access denied still works.
14. Log out.
15. Log in with admin/security demo user if available.
16. Confirm protected/admin behavior still follows RBAC.
17. Confirm no real provider connection is required.

---

## Documentation Requirements

Phase 18 should update documentation if implementation changes the user experience.

Possible documentation updates:

```text
README.md
iam-practice-app/README.md
```

Documentation should explain:

* what Phase 18 adds
* SCIM simulator improvement purpose
* SCIM is not login
* SCIM and JML relationship
* SCIM and RBAC relationship
* how to test locally
* no real SCIM provider is connected
* no public endpoint is exposed
* no secrets should be committed

---

## Screenshot Evidence Plan

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

* `.env`
* bearer tokens
* authorization headers
* tenant IDs
* Okta domains
* client IDs
* client secrets
* real users
* unredacted browser/session data

---

## Future Branch

Phase 18 implementation branch:

```text
feature/phase-18-scim-simulator-jml-evidence
```

Do not start implementation until:

* Phase 18 spec is committed to `main`
* Phase 18 checklist is committed to `main`
* local `main` is clean
* feature branch is created from updated `main`

---

## Suggested Commit Messages

Planning docs commit:

```text
docs: add phase-18 SCIM simulator and JML evidence planning
```

Future implementation commit:

```text
phase-18: improve SCIM simulator and JML evidence
```

---

## Codex Handoff Prompt For Future Implementation

Use this prompt only after the Phase 18 spec and checklist are committed to `main`, local `main` is clean, and the Phase 18 feature branch has been created.

```text
You are working on the IdentityCore IAM Project.

IdentityCore is a local-first IAM skill practice app. It is not a production IAM system.

Repository: shaheedcloud/identitycore-iam-project
Local folder: D:\identitycore
Current branch: feature/phase-18-scim-simulator-jml-evidence

Do not work on main.

Task: Implement Phase 18 — SCIM Simulator Upgrade and JML Evidence Improvements.

Goal:
Improve the existing local SCIM simulator and JML evidence experience so a learner can clearly understand SCIM provisioning, SCIM users, SCIM groups, Joiner/Mover/Leaver lifecycle behavior, audit-style evidence, and the separation between provisioning, authentication, authorization, and RBAC.

Allowed work:
- improve SCIM readiness page
- improve SCIM user lifecycle explanations
- improve SCIM group lifecycle explanations
- improve SCIM and JML relationship display
- improve SCIM and RBAC relationship display
- improve local SCIM simulator presentation
- add safe dummy SCIM/JML examples if useful
- add audit-style lifecycle evidence if useful
- improve dashboard links/cards for SCIM/JML practice
- improve local-only simulator messaging
- update README documentation if needed
- add a small view/helper only if needed and explain why

Forbidden work:
- do not add real Entra ID SCIM provisioning
- do not add real Okta SCIM provisioning
- do not expose a production SCIM endpoint
- do not add public internet exposure
- do not add ngrok or tunneling tools
- do not add cloud deployment
- do not add database persistence
- do not add CI/CD
- do not add SIEM, webhook, email, scheduled task, or background job integration
- do not add AWS IAM or AWS federation work
- do not display raw tokens
- do not log raw tokens
- do not commit .env
- do not commit SCIM bearer tokens
- do not commit tenant IDs, Okta domains, client IDs, client secrets, access tokens, refresh tokens, ID tokens, private keys, certificates, or screenshots
- do not use real user data
- do not weaken RBAC
- do not allow SCIM groups to grant admin access automatically

Preserve existing functionality:
- app starts locally
- app works without .env
- local dummy login works
- Entra OIDC still works if configured
- Okta OIDC still works if configured
- logout works
- dashboard loads
- provider comparison page loads
- role mapping page loads
- claims page loads
- RBAC still works
- protected pages still enforce access
- unauthorized users are blocked
- access denied page still works
- OIDC/JWT/SCIM readiness pages still load if present
- SCIM users and groups simulation still work
- JML simulation still works
- SAML/audit readiness still works if present
- Docker runtime remains safe
- local-only simulator messaging remains clear

Files to inspect:
- README.md
- AGENTS.md
- iam-practice-app/README.md
- iam-practice-app/package.json
- iam-practice-app/.env.example
- iam-practice-app/src/app.js
- iam-practice-app/src/scimStore.js
- iam-practice-app/src/scimGroupStore.js
- iam-practice-app/src/scimConfig.js
- iam-practice-app/src/middleware/scimAuth.js
- iam-practice-app/src/routes/apiRoutes.js
- iam-practice-app/src/routes/pageRoutes.js
- iam-practice-app/src/views/dashboard.html
- iam-practice-app/src/views/scim-readiness.html
- iam-practice-app/src/views/role-mapping.html
- iam-practice-app/src/views/provider-comparison.html
- iam-practice-app/src/public/styles.css

If route filenames differ, inspect the current repo and use the existing structure.

Acceptance criteria:
- app starts locally
- local dummy login works
- dashboard loads
- SCIM readiness page explains local simulator behavior
- SCIM is clearly explained as provisioning, not login
- SCIM and JML relationship is clearer
- SCIM and RBAC separation is clearer
- JML evidence is improved or clearly explained
- SCIM users/groups simulation still works
- protected routes still enforce RBAC
- no real provider SCIM connection is added
- no public endpoint/tunneling/cloud deployment is added
- no .env or secrets are added
- README is updated if user-facing behavior changed

After finishing, summarize:
- files changed
- what improved
- how you tested
- whether any package files changed and why
- confirmation that no .env, secrets, tokens, public endpoint, database, cloud deployment, or real SCIM provider integration was added
```

---

## Acceptance Criteria

Phase 18 planning is complete when:

* Phase 18 spec exists
* Phase 18 checklist exists
* both files are under `docs/Post-Phase-10/`
* spec defines objective, business scenario, scope, out of scope, safety rules, implementation direction, testing plan, and Codex prompt
* checklist defines planning, implementation readiness, safety review, testing, and commit workflow
* both planning documents are committed to `main`
* local `main` is clean after push
* no app code changed during planning
* no `.env` file is committed
* no secrets are committed
* no screenshots are committed

---

## Final Phase 18 Decision

Phase 18 should proceed as a local simulator upgrade phase.

Approved direction:

```text
Improve local SCIM simulator and JML evidence first.
Do not connect real Entra or Okta SCIM provider yet.
Do not expose IdentityCore publicly.
Do not use tunneling tools.
Do not weaken RBAC.
```
