# Phase 17 — Safe SCIM Practice Planning Spec

## Purpose

Phase 17 defines the safe planning path for moving IdentityCore from simulated SCIM behavior toward more realistic SCIM practice.

IdentityCore already includes local SCIM users and groups simulation. Phase 17 does not immediately connect to a real SCIM target. Instead, this phase defines how future SCIM practice should be handled safely, incrementally, and without exposing secrets or turning the app into a production identity system.

Phase 17 is a planning and safety phase.

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

Create a safe SCIM practice planning foundation for IdentityCore.

The learner should understand:

* what SCIM is used for
* how SCIM supports provisioning and deprovisioning
* how SCIM users and groups differ from normal login users
* how SCIM connects to Joiner, Mover, Leaver workflows
* how Entra ID and Okta can push users and groups to an application
* why SCIM bearer tokens must be protected
* why SCIM practice must be done with lab tenants only
* why simulated SCIM should remain available even after future real SCIM practice
* how future SCIM integration should be tested safely
* what must never be committed to GitHub

---

## Business Scenario

IdentityCore represents a fictional enterprise IAM learning environment.

In a real enterprise, applications often need users and groups automatically created, updated, disabled, or removed based on identity-provider lifecycle events.

SCIM helps solve this problem by allowing identity providers such as Microsoft Entra ID or Okta to provision user and group records into downstream applications.

A safe SCIM implementation must separate:

```text
Authentication: Who signed in?
Authorization: What can they access?
Provisioning: What account or group record exists in the application?
Lifecycle: What happens when the person joins, moves, or leaves?
```

Phase 17 prepares IdentityCore to teach that separation clearly.

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

Phase 17 must build on the existing SCIM simulation without weakening safety.

---

## Phase 17 North Star

Phase 17 should prepare IdentityCore for future SCIM practice while keeping the current app stable.

The project should eventually support a learner practicing:

```text
Identity provider provisioning event
        ↓
SCIM request to IdentityCore
        ↓
User or group created/updated/deactivated
        ↓
JML lifecycle state changes
        ↓
Local app access remains controlled by RBAC
        ↓
Audit evidence explains what happened
```

Phase 17 only plans this safely.

---

## Phase 17 Scope

Phase 17 may include planning for:

* SCIM safety model
* SCIM provisioning scenarios
* Entra ID SCIM practice planning
* Okta SCIM practice planning
* SCIM token handling rules
* SCIM bearer token guardrails
* SCIM user lifecycle scenarios
* SCIM group lifecycle scenarios
* SCIM and JML relationship
* SCIM and RBAC relationship
* safe SCIM readiness checks
* future SCIM testing plan
* future SCIM troubleshooting plan
* future implementation branch naming
* future Codex implementation prompt
* README update plan
* screenshot evidence plan

---

## Out of Scope

Phase 17 must not add:

* real SCIM integration yet
* real Entra ID provisioning connection
* real Okta provisioning connection
* production SCIM endpoint exposure
* database persistence
* cloud deployment
* public internet exposure
* tunneling tools
* ngrok or public callback forwarding
* CI/CD
* SIEM integration
* webhook integration
* email integration
* scheduled tasks
* background jobs
* AWS IAM integration
* AWS federation
* production authorization
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

---

## Critical Safety Rule

SCIM practice must use only lab environments.

Never use:

* employer Entra tenant
* employer Okta tenant
* production identity provider
* production application credentials
* customer tenant
* real business users
* production SCIM bearer token
* public production endpoint
* private company user data

Allowed:

* local simulator SCIM
* lab-only Entra tenant later
* lab-only Okta tenant later
* fake lab users
* fake lab groups
* local `.env`
* placeholder `.env.example`
* redacted screenshots
* local-only testing

---

## SCIM Concept Model

SCIM stands for System for Cross-domain Identity Management.

SCIM is used to automate identity lifecycle actions between an identity provider and an application.

Common SCIM actions:

| SCIM Action            | Meaning                                                                  |
| ---------------------- | ------------------------------------------------------------------------ |
| Create user            | Provision a new application account                                      |
| Update user            | Change user attributes such as name, title, department, or active status |
| Deactivate user        | Disable access without deleting audit history                            |
| Create group           | Provision an application group                                           |
| Update group           | Change group name or membership                                          |
| Remove user from group | Remove application entitlement relationship                              |

---

## SCIM Is Not Login

Phase 17 must make this clear:

```text
OIDC/SAML handles sign-in.
SCIM handles provisioning.
RBAC handles access enforcement.
JML explains lifecycle flow.
Audit evidence explains what happened.
```

A SCIM-created user should not automatically become an authenticated session.

A SCIM-created group should not automatically bypass RBAC.

A SCIM-provisioned record is an account lifecycle artifact, not proof that the user is currently authenticated.

---

## SCIM And JML Relationship

SCIM should map naturally to Joiner, Mover, Leaver practice.

### Joiner

```text
HR creates employee
Identity provider creates user
SCIM provisions user into IdentityCore
User record appears as active
Default access remains conservative
RBAC still controls protected pages
```

### Mover

```text
HR updates employee department or role
Identity provider updates user attributes or group membership
SCIM updates user or group relationship
Application access changes only through explicit authorization rules
Audit evidence explains the change
```

### Leaver

```text
HR terminates employee
Identity provider disables user
SCIM deactivates user in IdentityCore
Active flag becomes false
Application access should be denied
Audit evidence shows deprovisioning
```

---

## SCIM And RBAC Relationship

SCIM provisioning does not replace RBAC.

Correct model:

```text
SCIM creates or updates identity records.
Role mapping may assign a local role if explicitly designed.
RBAC enforces access to pages and APIs.
```

Incorrect model:

```text
SCIM group name bypasses RBAC.
```

Phase 17 must preserve the Phase 16 principle:

```text
External authentication proves identity.
Local authorization decides access.
```

For SCIM, the related principle is:

```text
External provisioning creates or updates records.
Local authorization still decides access.
```

---

## SCIM Token Safety Rules

SCIM endpoints commonly use bearer tokens.

SCIM bearer tokens must be treated like secrets.

Never commit:

* SCIM bearer token
* authorization header
* real provisioning secret
* `.env`
* `.env.local`
* `.env.production`
* screenshots showing SCIM token values
* logs showing authorization headers

Allowed placeholder pattern only:

```env
SCIM_ENABLED=false
SCIM_BEARER_TOKEN=YOUR_LOCAL_SCIM_BEARER_TOKEN
```

Real values must remain local only:

```text
D:\identitycore\iam-practice-app\.env
```

---

## Future SCIM Practice Options

Phase 17 should decide which path is safest for the next implementation phase.

### Option A — Improve Local SCIM Simulator First

Improve the existing local SCIM simulator before connecting a real provider.

Possible future improvements:

* clearer SCIM readiness page
* SCIM user lifecycle explanation
* SCIM group lifecycle explanation
* SCIM request examples using safe dummy data
* safer audit summaries
* JML relationship display
* SCIM troubleshooting examples

Pros:

* safest path
* no real provider needed
* no public endpoint required
* no secrets beyond local placeholders
* good for portfolio learning

Cons:

* does not yet show real Entra or Okta provisioning behavior

### Option B — Entra ID SCIM Lab Planning

Plan a future Entra ID provisioning connection to IdentityCore.

Important limitation:

A real cloud identity provider usually needs to reach the SCIM endpoint over a public HTTPS URL. A local-only app at `localhost` is not directly reachable by Entra ID.

Because IdentityCore must remain local-first and safe, direct real Entra SCIM integration should not be rushed.

Pros:

* highly realistic IAM practice
* teaches Entra enterprise app provisioning
* connects to SC-300 style skills

Cons:

* may require public endpoint exposure or tunneling
* increases security risk
* requires careful no-secrets handling
* not appropriate until explicitly designed

### Option C — Okta SCIM Lab Planning

Plan a future Okta provisioning connection to IdentityCore.

Like Entra, Okta usually requires the SCIM endpoint to be reachable from Okta.

Pros:

* realistic workforce IAM practice
* teaches Okta provisioning concepts
* connects to Okta admin skills

Cons:

* may require public endpoint exposure or tunneling
* requires careful token handling
* must not be rushed

### Recommended Phase 17 Decision

For Phase 17, the safest recommended decision is:

```text
Plan SCIM carefully now.
Do not connect a real SCIM provider yet.
Next implementation should improve the local SCIM simulator and readiness experience before exposing any endpoint externally.
```

---

## Future Phase Recommendation

Recommended next sequence:

```text
Phase 17 — Safe SCIM Practice Planning
Phase 18 — SCIM Simulator Upgrade and JML Evidence Improvements
Phase 19 — Real SCIM Lab Integration Decision Point
Phase 20 — AWS IAM Federation Planning
Phase 21 — Portfolio Evidence and Interview Walkthrough
```

This sequence keeps the project safe and incremental.

---

## Future Phase 18 Candidate

### Phase 18 — SCIM Simulator Upgrade and JML Evidence Improvements

Potential Phase 18 objective:

Improve IdentityCore’s existing SCIM simulation so the learner can clearly see how SCIM user and group provisioning connects to Joiner, Mover, Leaver lifecycle workflows and local authorization behavior.

Potential Phase 18 scope:

* improve SCIM readiness page
* add SCIM practice dashboard section
* improve SCIM user display
* improve SCIM group display
* add safe SCIM request examples
* add JML relationship explanation
* add deprovisioning explanation
* improve audit evidence for SCIM events
* update README documentation

Potential Phase 18 out of scope:

* real Entra SCIM integration
* real Okta SCIM integration
* public endpoint exposure
* tunneling
* production deployment
* database persistence
* secrets

---

## Future Codex Implementation Prompt Direction

Phase 17 should not send Codex to code real SCIM integration.

If Phase 18 is approved later, the Codex prompt should say:

```text
Implement Phase 18 — SCIM Simulator Upgrade and JML Evidence Improvements.
Do not add real Entra SCIM integration.
Do not add real Okta SCIM integration.
Do not expose the app publicly.
Do not add tunneling.
Do not add database persistence.
Improve the existing local SCIM simulator, SCIM readiness page, SCIM explanation panels, JML relationship display, and safe audit evidence only.
```

---

## Files Codex May Inspect Later

Codex may inspect the whole repo.

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

## Files Codex May Change Later

For a future simulator-focused implementation, Codex may change files related to SCIM display, readiness, documentation, and existing safe simulator behavior.

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
iam-practice-app/src/public/styles.css
```

Codex may add a SCIM practice view only if approved in a future implementation plan:

```text
iam-practice-app/src/views/scim-practice.html
```

If a new file is added, Codex must explain why.

---

## Files Codex Should Avoid Changing Unless Necessary

Codex should avoid unnecessary changes to:

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

No package change should happen unless clearly justified and approved.

No RBAC change should happen unless clearly required and manually reviewed.

---

## Existing Functionality To Preserve Later

Any future SCIM implementation must preserve:

* app starts locally
* app works without `.env`
* local dummy login works
* Entra OIDC still works if configured
* Okta OIDC still works if configured
* logout works
* dashboard loads
* claims page loads
* provider comparison page loads
* role mapping page loads
* SCIM readiness page loads
* SCIM users simulation works
* SCIM groups simulation works
* JML simulation works
* RBAC still works
* protected pages still enforce access
* unauthorized users are blocked
* access denied behavior remains clear
* raw tokens are not displayed
* raw tokens are not logged
* no `.env` is committed
* no secrets are committed

---

## Testing Plan For Future Implementation

When future SCIM simulator improvements happen, testing should include the following checks.

### Test 1 — App Runs Without SCIM Config

Expected:

* app starts without errors
* login page loads
* local dummy login works
* dashboard loads
* SCIM readiness page loads
* SCIM endpoints fail closed if SCIM is disabled or missing required config
* no secret is required to view normal learning pages

### Test 2 — SCIM Readiness Page

Expected:

* SCIM readiness page explains local-only practice
* SCIM readiness page explains simulated provisioning
* SCIM readiness page does not show bearer token values
* SCIM readiness page does not claim production readiness

### Test 3 — SCIM Users Simulation

Expected:

* SCIM user list works if existing feature is enabled
* create/update/deactivate behavior remains safe
* deactivation is explained as safer than hard delete
* no real user data is required

### Test 4 — SCIM Groups Simulation

Expected:

* SCIM group list works if existing feature is enabled
* group membership behavior remains simulated
* groups do not bypass RBAC
* groups do not automatically grant admin access

### Test 5 — JML Relationship

Expected:

* Joiner scenario explains provisioning
* Mover scenario explains attribute/group change
* Leaver scenario explains deactivation
* lifecycle behavior is explained as practice-only

### Test 6 — Security Review

Expected:

* no `.env` appears in Git status
* no secrets appear in diff
* no bearer tokens appear in committed files
* no screenshots are added unless redacted and approved
* no public endpoint or tunneling is added

---

## Security Review Command

Before committing any future SCIM implementation, run:

```bash
git diff -- . ":(exclude)package-lock.json" | grep -Ei "secret|token|password|tenant|client_id|client_secret|scim_bearer|authorization: bearer|aws_access_key|private_key|BEGIN RSA|BEGIN PRIVATE|okta|microsoftonline|ngrok|tunnel"
```

If the command returns safe explanatory text only, inspect it manually.

If it returns real values, stop immediately and remove them before committing.

---

## Documentation Requirements

Phase 17 documentation should explain:

* SCIM is provisioning, not login
* SCIM supports JML workflows
* SCIM bearer tokens are secrets
* real SCIM integration needs careful endpoint planning
* local simulator SCIM remains useful
* Entra and Okta SCIM integration should not be rushed
* RBAC remains the final authorization control
* SCIM groups do not automatically grant admin access
* future SCIM work must remain no-secrets and lab-only

---

## Acceptance Criteria

Phase 17 planning is complete when:

* Phase 17 spec exists
* Phase 17 checklist exists
* both files are saved under `docs/Post-Phase-10/`
* both files are added to ChatGPT Project source section
* both files are committed to `main`
* no app code is changed during planning
* no `.env` is committed
* no secrets are committed
* no screenshots are committed
* future Phase 18 direction is clear
* working tree is clean after commit

---

## Suggested File Location

Save this spec as:

```text
docs/Post-Phase-10/Phase 17 — Safe SCIM Practice Planning Spec.md
```

---

## Suggested Commit Message

```text
docs: add phase-17 safe SCIM practice planning
```

---

