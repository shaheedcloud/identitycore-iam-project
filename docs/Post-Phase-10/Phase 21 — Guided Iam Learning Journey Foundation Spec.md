# Phase 21 — Guided IAM Learning Journey Foundation Spec

## Purpose

Phase 21 defines the next safe implementation step after Phase 20 AWS Federation Readiness Foundation.

IdentityCore has grown into a realistic local IAM practice app with local login, role-based access control, claims and token simulation, OIDC local practice, Okta local practice, provider comparison, role mapping, SCIM simulation, JML simulation, SAML simulation, audit readiness, and AWS federation readiness.

The current problem is that the app now has many learning areas, but the learner still has to decide where to go next. Phase 21 creates a guided IAM learning journey foundation that connects the existing pages into one structured learner flow.

Phase 21 must not create complex scenario automation yet. That belongs in Phase 22.

Phase 21 should make IdentityCore easier to use as a practical IAM learning system by guiding the learner through the existing concepts in the correct order.

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

Create a guided IAM learning journey foundation inside IdentityCore.

The learner should be able to open the app, log in locally, view a structured IAM learning path, and move through existing IdentityCore modules in a logical sequence.

The guided journey should help the learner understand:

* where to start
* what each IAM module teaches
* what page to open next
* how authentication, authorization, claims, federation, provisioning, lifecycle, audit, and AWS readiness connect
* what is already simulated locally
* what is readiness-only
* what is not connected to real systems
* how to explain each module in an interview

---

## Business Scenario

IdentityCore represents a fictional enterprise IAM learning environment.

In a real IAM team, a junior IAM analyst, cloud security learner, or identity engineer does not learn IAM by clicking random pages. They learn by following a structured sequence:

```text
Identity basics
        ↓
Authentication
        ↓
Claims and tokens
        ↓
Authorization and RBAC
        ↓
Provider comparison
        ↓
SAML and OIDC concepts
        ↓
SCIM provisioning
        ↓
Joiner/Mover/Leaver lifecycle
        ↓
Audit evidence
        ↓
AWS federation readiness
        ↓
Architecture and interview explanation
```

Phase 21 turns IdentityCore into a guided learner experience so the app becomes easier to understand, easier to present, and more valuable as a portfolio project.

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
* SCIM and JML evidence improvements
* JML simulation
* SAML simulation
* audit readiness
* AWS federation readiness
* Docker runtime support
* no raw token display
* no raw token logging
* local-only simulator behavior

Phase 21 should build on these existing modules without rewriting them.

---

## Phase 21 North Star

After Phase 21, the learner should be able to open IdentityCore and see a guided path that says, in effect:

```text
Start here.
Learn this concept.
Open this module.
Understand what happened.
See what evidence proves it.
Move to the next IAM concept.
```

The guided learning journey should not make things happen visually yet beyond navigation, status, and explanation. That deeper scenario-based behavior belongs in Phase 22.

Phase 21 is the foundation.

Phase 22 is the scenario workflow layer.

---

## Phase 21 Scope

Phase 21 may include:

* guided learning journey page
* guided learning journey route
* guided learning journey dashboard card
* structured module sequence
* module cards for existing IdentityCore concepts
* learning stage labels
* completion/status indicators using safe local/static data
* local-only guidance messages
* links to existing pages only
* short explanations of each IAM module
* recommended learner path
* interview explanation prompts
* architecture thinking prompts
* README updates
* dashboard navigation update
* styling updates if needed

---

## Recommended Page

Phase 21 may add a page such as:

```text
/guided-learning
```

Suggested page title:

```text
Guided IAM Learning Journey
```

This page should organize the existing app into a sequence.

Recommended journey sections:

### 1. Orientation

Purpose:

Explain that IdentityCore is a local IAM skill practice app, not a production IAM platform.

Possible module link:

* Dashboard

### 2. Authentication Foundation

Purpose:

Teach how users sign in and how local identity differs from external provider authentication.

Possible module links:

* Login
* OIDC readiness
* Provider comparison

### 3. Claims and Token Understanding

Purpose:

Teach how identity context is represented and interpreted safely.

Possible module links:

* Claims page if present
* Token simulation if present
* Provider comparison

### 4. Authorization and Role Mapping

Purpose:

Teach that authentication proves identity, but authorization decides access.

Possible module links:

* Role mapping
* Protected pages
* Access denied page or workflow

### 5. Federation Concepts

Purpose:

Teach how SAML, OIDC, Entra ID, Okta, and AWS federation concepts relate.

Possible module links:

* SAML readiness
* OIDC readiness
* AWS federation readiness

### 6. Provisioning and Lifecycle

Purpose:

Teach SCIM provisioning and Joiner/Mover/Leaver lifecycle behavior.

Possible module links:

* SCIM readiness
* SCIM users/groups pages if present
* JML simulation

### 7. Audit and Evidence

Purpose:

Teach that IAM work must be provable through logs and evidence.

Possible module links:

* Audit readiness
* JML evidence area if present

### 8. Portfolio and Interview Explanation

Purpose:

Prepare the learner to explain what each module teaches in practical interview language.

Possible content:

* What happened?
* Why does it matter?
* What could break?
* What log or evidence proves it?
* How would I explain this to an interviewer?

---

## Guided Journey Status Model

Phase 21 may use static/local status indicators only.

Allowed statuses:

```text
Available
Readiness Only
Simulated
Local Only
Protected
Review Next
Not Connected
```

Forbidden statuses:

```text
Production Ready
Connected to AWS
Connected to Production Tenant
Real Cloud Monitoring Enabled
Real SCIM Provider Connected
```

---

## Recommended Journey Card Fields

Each guided journey card may include:

* module name
* IAM concept taught
* business purpose
* what page to open
* status badge
* safety note
* interview explanation prompt

Example:

```text
Module: Role Mapping
Concept: Authorization
Business purpose: Shows how user claims or roles become application access decisions.
Open: /role-mapping
Status: Simulated / Local Only
Interview prompt: Explain why authentication alone should not grant admin access.
```

---

## Phase 21 Out of Scope

Phase 21 must not add:

* complex scenario workflow execution
* animated workflow engine
* scenario-based login simulation
* scenario-based claims transformation
* scenario-based access denied workflow
* scenario-based JML automation
* scenario-based audit evidence generation
* real Entra ID integration
* real Okta integration
* real AWS IAM integration
* real SCIM target
* real SAML identity provider
* real AWS account connection
* AWS SDK calls
* AWS CLI integration
* CloudTrail ingestion
* database persistence
* cloud deployment
* CI/CD
* public endpoint exposure
* external API calls
* webhook integration
* email integration
* scheduled tasks
* background jobs
* raw token display
* raw token logging
* production authorization
* committed `.env`
* committed secrets
* private keys
* certificates
* unredacted screenshots
* real user data

---

## Phase 21 Versus Phase 22 Boundary

Phase 21 should answer:

```text
Where should the learner go, and what does each existing module teach?
```

Phase 22 should answer:

```text
Can the learner run realistic IAM scenarios where things happen visually?
```

Do not collapse Phase 22 into Phase 21.

Phase 21 is navigation, structure, explanations, and guided learning.

Phase 22 is interactive scenario workflows.

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
iam-practice-app/src/routes/apiRoutes.js
iam-practice-app/src/routes/pageRoutes.js
iam-practice-app/src/views/dashboard.html
iam-practice-app/src/views/provider-comparison.html
iam-practice-app/src/views/role-mapping.html
iam-practice-app/src/views/oidc-readiness.html
iam-practice-app/src/views/saml-readiness.html
iam-practice-app/src/views/scim-readiness.html
iam-practice-app/src/views/audit-readiness.html
iam-practice-app/src/views/aws-federation-readiness.html
iam-practice-app/src/public/styles.css
```

If file names differ in the actual repo, Codex must inspect the current route and view structure before editing.

---

## Files Codex May Change

Codex may change files related to the guided learning page, dashboard navigation, safe local UI, documentation, and styling.

Possible files:

```text
README.md
iam-practice-app/README.md
iam-practice-app/src/routes/pageRoutes.js
iam-practice-app/src/views/dashboard.html
iam-practice-app/src/public/styles.css
```

Codex may add:

```text
iam-practice-app/src/views/guided-learning.html
```

Codex may add a route:

```text
/guided-learning
```

Any new file must be explained in the Codex summary.

---

## Files Codex Should Avoid Changing Unless Necessary

Codex should avoid unnecessary changes to:

```text
iam-practice-app/src/middleware/rbac.js
iam-practice-app/src/middleware/jwtAuth.js
iam-practice-app/src/oidcClient.js
iam-practice-app/src/oidcConfig.js
iam-practice-app/src/claims.js
iam-practice-app/src/scimStore.js
iam-practice-app/src/scimGroupStore.js
iam-practice-app/src/jmlStore.js
iam-practice-app/src/samlConfig.js
iam-practice-app/src/routes/authRoutes.js
iam-practice-app/src/routes/apiRoutes.js
iam-practice-app/package.json
iam-practice-app/package-lock.json
```

Package files should not change unless there is a clear, justified reason.

Phase 21 should not require new dependencies.

---

## Expected User Experience

After Phase 21 implementation, the learner should be able to:

1. Start the app locally.
2. Log in using existing local dummy login.
3. Open the dashboard.
4. See a Guided IAM Learning Journey card or navigation item.
5. Open the guided learning page.
6. See the IAM modules organized in a logical learning sequence.
7. Click links to existing IdentityCore pages.
8. Understand what each module teaches.
9. See clear local-only/simulated/readiness-only status badges.
10. See interview explanation prompts.
11. Confirm existing IdentityCore features still work.

---

## Acceptance Criteria

Phase 21 is complete when:

* app starts locally
* local dummy login still works
* dashboard loads
* dashboard includes guided learning journey navigation or card
* guided learning page loads
* guided learning page links only to existing pages or clearly marks unavailable items
* guided learning page organizes modules in a logical IAM sequence
* guided learning page explains authentication, claims, authorization, federation, provisioning, lifecycle, audit, and AWS readiness
* guided learning page clearly says IdentityCore is local-first and skill-practice focused
* guided learning page uses safe statuses such as Local Only, Simulated, Readiness Only, Protected, or Not Connected
* existing RBAC behavior still works
* protected pages still enforce access
* access denied behavior still works
* OIDC readiness still works
* SAML readiness still works
* provider comparison still works
* role mapping still works
* SCIM/JML/audit/AWS readiness pages still work if present
* no `.env` file is committed
* no secrets are committed
* no tenant IDs are committed
* no AWS account IDs are committed
* no AWS role ARNs are committed
* no raw tokens are displayed
* no raw tokens are logged
* no real integration is added
* no new dependency is added unless clearly justified
* README is updated if needed

---

## Local Testing Plan

After Codex implementation, run:

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

* login page loads
* local-only simulator warning remains visible
* local dummy login works
* dashboard loads
* guided learning card or navigation appears
* guided learning page loads
* guided journey links work
* existing navigation works
* logout works
* protected pages still enforce access
* access denied still works
* OIDC readiness page still loads
* SAML readiness page still loads
* provider comparison page still loads
* role mapping page still loads
* SCIM/JML/audit/AWS readiness pages still load if present

Stop the app:

```text
CTRL + C
```

---

## Security Review Command

Before commit, run from repo root:

```bash
cd /d/identitycore

git status --short
git diff --stat
git diff
```

Then search for forbidden secrets and identifiers:

```bash
grep -RInE "AKIA|ASIA|aws_secret_access_key|aws_access_key_id|AWS_SECRET_ACCESS_KEY|AWS_ACCESS_KEY_ID|session_token|account_id|AccountId|arn:aws|[0-9]{12}|BEGIN PRIVATE KEY|client_secret|access_token|refresh_token|id_token|tenant_id|TENANT_ID" . \
  --exclude-dir=.git \
  --exclude-dir=node_modules
```

Expected result:

* no real AWS credentials
* no real AWS account IDs
* no real role ARNs
* no private keys
* no raw tokens
* no tenant IDs
* no `.env` staged

Placeholder strings are allowed only if clearly fake and documented as examples.

---

## Manual Screenshot Evidence Plan

Screenshots are not required before commit unless the user chooses to capture them manually.

If screenshots are captured later, they must show local-only app pages only.

Allowed screenshot ideas:

```text
PHASE-21-GUIDED-LEARNING-PAGE.png
PHASE-21-GUIDED-JOURNEY-CARDS.png
PHASE-21-DASHBOARD-GUIDED-LEARNING-CARD.png
PHASE-21-IAM-MODULE-SEQUENCE.png
```

Screenshots must not show:

* tenant IDs
* client secrets
* tokens
* AWS account IDs
* AWS role ARNs
* provider ARNs
* real user data
* production environments

---

## Suggested Branch Name

Use:

```text
feature/phase-21-guided-iam-learning-journey
```

---

## Suggested Planning Commit Message

Use:

```text
docs: add phase-21 guided IAM learning journey planning
```

---

## Suggested Implementation Commit Message

Use:

```text
phase-21: add guided IAM learning journey foundation
```

---

## Codex Handoff Prompt

Use this prompt only after:

1. Phase 21 spec is committed to `main`.
2. Phase 21 checklist is committed to `main`.
3. Local `main` is clean.
4. The Phase 21 feature branch is created.
5. The current branch is `feature/phase-21-guided-iam-learning-journey`.

```text
You are working on the IdentityCore IAM Project.

Repository:
shaheedcloud/identitycore-iam-project

Local folder:
D:\identitycore

Current branch:
feature/phase-21-guided-iam-learning-journey

Phase:
Phase 21 — Guided IAM Learning Journey Foundation

Objective:
Add a guided IAM learning journey foundation to IdentityCore. The goal is to connect the existing pages/modules into one structured learner flow so the learner understands what to open, what each module teaches, and how IAM concepts connect.

Important project rule:
IdentityCore is a local-first IAM skill practice app. It is not a production IAM system.

You must not work on main.

You must inspect the project before editing.

Allowed work:
- Add a guided learning journey page if it does not already exist.
- Add a route such as /guided-learning if appropriate.
- Add dashboard navigation or a dashboard card for the guided learning journey.
- Organize existing IdentityCore modules into a logical IAM learning sequence.
- Add safe local/static status badges such as Local Only, Simulated, Readiness Only, Protected, Not Connected, or Available.
- Add short IAM concept explanations for existing modules.
- Add interview explanation prompts for modules.
- Link only to pages that exist, unless an item is clearly marked as future/not active.
- Reuse existing styling patterns.
- Update README documentation if needed.

Forbidden work:
- Do not add scenario workflow execution. That belongs in Phase 22.
- Do not add real Entra ID integration.
- Do not add real Okta integration.
- Do not add real AWS IAM integration.
- Do not connect to AWS.
- Do not add AWS SDK calls.
- Do not add AWS CLI integration.
- Do not add real SCIM provider integration.
- Do not add real SAML identity provider integration.
- Do not add database persistence.
- Do not add cloud deployment.
- Do not add CI/CD.
- Do not add public endpoint exposure.
- Do not add external API calls.
- Do not add webhooks, email integration, scheduled tasks, or background jobs.
- Do not display raw tokens.
- Do not log raw tokens.
- Do not commit .env.
- Do not commit secrets.
- Do not commit tenant IDs.
- Do not commit AWS account IDs.
- Do not commit AWS role ARNs.
- Do not commit private keys or certificates.

Files you may inspect:
- README.md
- AGENTS.md
- iam-practice-app/README.md
- iam-practice-app/package.json
- iam-practice-app/.env.example
- iam-practice-app/src/app.js
- iam-practice-app/src/routes/pageRoutes.js
- iam-practice-app/src/routes/apiRoutes.js
- iam-practice-app/src/views/dashboard.html
- iam-practice-app/src/views/provider-comparison.html
- iam-practice-app/src/views/role-mapping.html
- iam-practice-app/src/views/oidc-readiness.html
- iam-practice-app/src/views/saml-readiness.html
- iam-practice-app/src/views/scim-readiness.html
- iam-practice-app/src/views/audit-readiness.html
- iam-practice-app/src/views/aws-federation-readiness.html
- iam-practice-app/src/public/styles.css

Files you may change:
- README.md
- iam-practice-app/README.md
- iam-practice-app/src/routes/pageRoutes.js
- iam-practice-app/src/views/dashboard.html
- iam-practice-app/src/public/styles.css

You may add:
- iam-practice-app/src/views/guided-learning.html
- route: /guided-learning

Avoid changing unless necessary:
- iam-practice-app/src/middleware/rbac.js
- iam-practice-app/src/middleware/jwtAuth.js
- iam-practice-app/src/oidcClient.js
- iam-practice-app/src/oidcConfig.js
- iam-practice-app/src/claims.js
- iam-practice-app/src/scimStore.js
- iam-practice-app/src/scimGroupStore.js
- iam-practice-app/src/jmlStore.js
- iam-practice-app/src/samlConfig.js
- iam-practice-app/src/routes/authRoutes.js
- iam-practice-app/package.json
- iam-practice-app/package-lock.json

Acceptance criteria:
- app starts locally
- local dummy login still works
- dashboard loads
- guided learning page loads
- dashboard links to guided learning
- guided learning page organizes existing IAM modules in a logical sequence
- guided learning links only to existing pages or clearly marks unavailable/future items
- existing RBAC still works
- protected pages still enforce access
- access denied still works
- OIDC readiness still loads
- SAML readiness still loads
- provider comparison still loads
- role mapping still loads
- SCIM/JML/audit/AWS readiness pages still load if present
- local-only simulator messaging remains clear
- no .env is committed
- no secrets are committed
- no tenant IDs are committed
- no AWS account IDs are committed
- no real integrations are added
- no external API calls are added
- no new dependencies are added unless clearly justified

When done, summarize:
1. Files changed
2. Guided learning improvements made
3. Existing functionality preserved
4. Local test steps
5. Security/no-secrets confirmation
6. Whether package files changed and why
7. Suggested commit message

Suggested commit message:
phase-21: add guided IAM learning journey foundation
```

---

## Final Phase 21 Rule

Phase 21 is not the full scenario workflow phase.

Phase 21 creates the guided learner foundation.

Do not start Phase 22 until Phase 21 is planned, implemented, tested, reviewed, pushed, opened as a PR, merged, and local `main` is clean.
