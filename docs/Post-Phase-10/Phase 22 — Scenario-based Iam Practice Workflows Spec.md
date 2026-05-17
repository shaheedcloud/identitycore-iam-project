# Phase 22 — Scenario-Based IAM Practice Workflows Spec

## Purpose

Phase 22 defines the next safe implementation step after Phase 21 Guided IAM Learning Journey Foundation.

Phase 21 created a guided learner structure that organizes the existing IdentityCore modules into a clear learning sequence. It helped the learner understand where to start, what each module teaches, and how authentication, claims, authorization, federation, provisioning, lifecycle, audit, and AWS readiness connect.

Phase 22 now adds the next layer: safe, local-only scenario-based IAM practice workflows.

The goal is to make selected IAM concepts feel more realistic by letting the learner walk through simple scenarios where decisions happen visually inside the app.

Phase 22 must not connect to real identity providers, real cloud accounts, real SCIM targets, real SAML providers, real AWS accounts, external APIs, databases, or production systems.

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

Create a safe scenario-based IAM practice workflow foundation inside IdentityCore.

The learner should be able to open the app, log in locally, navigate to a scenario practice area, and walk through simple IAM scenarios that explain:

* what identity event is being simulated
* what access decision is being evaluated
* what role, claim, group, or lifecycle state matters
* what the expected access result is
* why access is allowed or denied
* what evidence would prove the action in a real IAM environment
* how to explain the scenario in interview language

Phase 22 should make IdentityCore more interactive, but only in a controlled local simulator way.

---

## Business Scenario

IdentityCore represents a fictional enterprise IAM learning environment.

A learner has already seen individual modules for login, claims, role mapping, federation readiness, SCIM, JML, audit, and AWS federation readiness. However, real IAM work is not learned only by reading pages. IAM engineers learn by understanding scenarios:

```text
A user signs in.
A claim is evaluated.
A role is mapped.
An access decision is made.
A lifecycle event changes access.
An audit record explains what happened.
```

In real enterprises, IAM teams troubleshoot and explain scenarios such as:

* Why did this user get access?
* Why was this user denied?
* Which claim or group caused the decision?
* What changed after a department move?
* Why does authentication not automatically mean authorization?
* What evidence proves the decision?

Phase 22 introduces safe, local-only scenario practice so the learner can start thinking like an IAM engineer and eventually an IAM architect.

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
* Guided IAM Learning Journey page
* Docker runtime support
* no raw token display
* no raw token logging
* local-only simulator behavior

Phase 22 should build on this foundation without rewriting the app.

---

## Phase 22 North Star

After Phase 22, the learner should be able to open IdentityCore and practice simple IAM scenarios such as:

```text
Choose a scenario.
Review the identity context.
See the access decision.
Understand why it happened.
Review simulated evidence.
Answer an interview-style explanation prompt.
```

The app should become more interactive than a static learning page, but it should not become a complex workflow engine yet.

Phase 22 is the foundation for scenario-based practice.

Future phases can expand scenarios, add scoring, add deeper audit evidence, or create more advanced walkthroughs.

---

## Phase 22 Scope

Phase 22 may include:

* scenario practice page
* scenario practice route
* dashboard card or navigation link for scenario practice
* guided learning link to scenario practice if appropriate
* local-only scenario cards
* simple scenario selector
* static/local scenario data
* step-by-step scenario walkthroughs
* simple access decision explanations
* simple simulated evidence panels
* interview explanation prompts
* architecture thinking prompts
* local-only status badges
* README updates
* styling updates if needed

---

## Recommended Page

Phase 22 may add a page such as:

```text
/scenario-practice
```

Suggested page title:

```text
Scenario-Based IAM Practice
```

This page should provide a safe local practice area for walking through IAM scenarios.

---

## Recommended Scenario Types

Phase 22 should start small. It does not need to implement every possible IAM scenario.

Recommended initial scenarios:

### 1. Authentication Context Scenario

Purpose:

Teach that a signed-in user has identity context, but authentication alone does not grant all access.

Example scenario:

```text
User: Finance Analyst
Authentication result: Signed in locally
Access request: Admin dashboard
Decision: Denied
Reason: User is authenticated but does not have admin role
Evidence: Access denied event and role mismatch explanation
```

### 2. Claims Interpretation Scenario

Purpose:

Teach how claims describe identity context and why claims must be interpreted safely.

Example scenario:

```text
User: Security Analyst
Claim context: role = security_user
Access request: Security tools page
Decision: Allowed
Reason: Security role matches required access
Evidence: Simulated claim summary and role check
```

### 3. Role Mapping Access Decision Scenario

Purpose:

Teach that authorization depends on explicit mapping, not just identity provider login.

Example scenario:

```text
Provider context: Local / Entra / Okta simulation
Mapped role: finance_user
Access request: Finance page
Decision: Allowed
Reason: Mapped role matches finance access rule
Evidence: Role mapping explanation
```

### 4. Access Denied Scenario

Purpose:

Teach least privilege and why denial is a valid security outcome.

Example scenario:

```text
User: Standard user
Access request: Admin-only area
Decision: Denied
Reason: Required role is admin_user
Evidence: Protected route and access denied explanation
```

### 5. Joiner/Mover/Leaver Scenario

Purpose:

Teach how lifecycle state changes access.

Example scenario:

```text
Event: Finance Analyst moves to Security Operations
Before: Finance access allowed
After: Finance access removed, Security read-only access added
Risk: Access accumulation if old access is not removed
Evidence: Simulated lifecycle change summary
```

### 6. Audit Evidence Scenario

Purpose:

Teach that IAM actions must be explainable and provable.

Example scenario:

```text
Event: Access denied
Evidence: Who requested access, what was requested, what role was required, what role the user had, final decision
Architect lesson: Good IAM systems must explain decisions clearly
```

---

## Scenario Interaction Model

Phase 22 should use simple local UI interaction only.

Allowed interaction examples:

* clicking a scenario card
* expanding scenario details
* showing scenario steps
* showing a simulated decision result
* showing a simulated evidence panel
* showing an interview prompt
* showing an architecture prompt
* linking to the related existing module page

Forbidden interaction examples:

* executing real authentication flows
* modifying real user accounts
* calling Entra ID
* calling Okta
* calling AWS
* sending API requests to external services
* storing scenario state in a database
* creating background jobs
* generating real audit logs from external systems
* displaying raw tokens
* using real tenant or account identifiers

---

## Recommended Scenario Card Fields

Each scenario card may include:

* scenario name
* IAM concept taught
* business situation
* identity context
* access request
* expected decision
* why the decision happens
* simulated evidence
* related module link
* interview explanation prompt
* architecture thinking prompt
* status badge

Example:

```text
Scenario: Finance user attempts admin access
Concept: Authorization and least privilege
Business situation: A Finance Analyst signs in and attempts to open an admin-only page.
Identity context: finance_user
Access request: Admin dashboard
Decision: Denied
Reason: The user is authenticated, but the required role is admin_user.
Evidence: Simulated access decision record
Related module: /role-mapping
Interview prompt: Explain why authentication alone should not grant admin access.
Architecture prompt: What control prevents role creep?
Status: Simulated / Local Only
```

---

## Recommended Safe Status Badges

Allowed statuses:

```text
Local Only
Simulated
Practice Scenario
Protected
Available
Readiness Only
Review Next
Evidence Example
```

Forbidden statuses:

```text
Production Ready
Connected to Entra
Connected to Okta
Connected to AWS
Connected to Production Tenant
Real Cloud Monitoring Enabled
Real SCIM Provider Connected
Real SAML Provider Active
Real CloudTrail Enabled
```

---

## Phase 22 Out of Scope

Phase 22 must not add:

* real Entra ID integration
* real Okta integration
* real AWS IAM integration
* real AWS account connection
* real SCIM target
* real SAML identity provider
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
* production authorization
* raw token display
* raw token logging
* committed `.env`
* committed secrets
* tenant IDs
* AWS account IDs
* AWS role ARNs
* private keys
* certificates
* unredacted screenshots
* real user data
* full training engine
* scoring engine
* persistent learner progress tracking
* complex workflow state machine

---

## Phase 22 Versus Future Phases

Phase 22 should answer:

```text
Can the learner walk through simple IAM scenarios and understand the decision?
```

Future phases may answer:

```text
Can the learner run deeper workflows, compare outcomes, generate richer evidence, and explain results like a portfolio demo?
```

Do not overload Phase 22.

Phase 22 is scenario practice foundation.

Future phases may add:

* deeper interactive workflow steps
* scenario outcome comparisons
* richer audit evidence
* portfolio demo mode
* interview explanation mode
* optional progress tracking if a safe persistence design is approved later

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
iam-practice-app/src/views/guided-learning.html
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

Codex may change files related to scenario practice display, dashboard navigation, guided learning navigation, safe local UI, documentation, and styling.

Possible files:

```text
README.md
iam-practice-app/README.md
iam-practice-app/src/routes/pageRoutes.js
iam-practice-app/src/views/dashboard.html
iam-practice-app/src/views/guided-learning.html
iam-practice-app/src/public/styles.css
```

Codex may add:

```text
iam-practice-app/src/views/scenario-practice.html
```

Codex may add a route:

```text
/scenario-practice
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

Phase 22 should not require new dependencies.

---

## Expected User Experience

After Phase 22 implementation, the learner should be able to:

1. Start the app locally.
2. Log in using existing local dummy login.
3. Open the dashboard.
4. See a Scenario-Based IAM Practice card or navigation item.
5. Open the scenario practice page.
6. View scenario cards or scenario sections.
7. Select or review a scenario.
8. See identity context, access request, decision, reason, and simulated evidence.
9. See related module links.
10. See interview explanation prompts.
11. See architecture thinking prompts.
12. Confirm existing IdentityCore features still work.

---

## Acceptance Criteria

Phase 22 is complete when:

* app starts locally
* app works without `.env`
* local dummy login still works
* dashboard loads
* dashboard includes scenario practice navigation or card
* `/scenario-practice` page loads
* scenario practice page clearly says IdentityCore is local-first and skill-practice focused
* scenario practice page uses safe local-only/simulated status badges
* scenario practice page includes multiple IAM practice scenarios
* each scenario explains identity context, access request, decision, reason, and evidence
* scenarios include interview explanation prompts
* scenarios include architecture thinking prompts
* scenario links point only to existing pages or clearly marked future items
* existing RBAC behavior still works
* protected pages still enforce access
* access denied behavior still works
* guided learning page still works
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
* scenario practice card or navigation appears
* scenario practice page loads
* scenario cards or sections display correctly
* related links work
* guided learning page still loads
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
PHASE-22-SCENARIO-PRACTICE-PAGE.png
PHASE-22-SCENARIO-CARDS.png
PHASE-22-ACCESS-DECISION-SCENARIO.png
PHASE-22-AUDIT-EVIDENCE-SCENARIO.png
PHASE-22-DASHBOARD-SCENARIO-PRACTICE-CARD.png
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
feature/phase-22-scenario-based-iam-practice
```

---

## Suggested Planning Commit Message

Use:

```text
docs: add phase-22 scenario-based IAM practice planning
```

---

## Suggested Implementation Commit Message

Use:

```text
phase-22: add scenario-based IAM practice foundation
```

---

## Codex Handoff Prompt

Use this prompt only after:

1. Phase 22 spec is committed to `main`.
2. Phase 22 checklist is committed to `main`.
3. Local `main` is clean.
4. The Phase 22 feature branch is created.
5. The current branch is `feature/phase-22-scenario-based-iam-practice`.

```text
You are working on the IdentityCore IAM Project.

Repository:
shaheedcloud/identitycore-iam-project

Local folder:
D:\identitycore

Current branch:
feature/phase-22-scenario-based-iam-practice

Do not work on main.

Task:
Implement Phase 22 — Scenario-Based IAM Practice Workflows.

IdentityCore is a local-first IAM skill practice app. It is not a production IAM system. Phase 22 must add safe, local-only scenario-based IAM practice workflows that help the learner understand IAM access decisions, lifecycle behavior, and evidence without connecting to real external systems.

Goal:
Create a scenario practice foundation so the learner can review simple IAM scenarios, understand identity context, access requests, decisions, reasons, simulated evidence, and interview explanations.

Allowed work:
- Add a scenario practice page, preferably at /scenario-practice
- Add a scenario practice route
- Add a dashboard card or navigation link for Scenario-Based IAM Practice
- Add a guided learning link to scenario practice if appropriate
- Add local-only scenario cards or sections
- Add simple scenario selection or expandable scenario details if possible without new dependencies
- Add step-by-step scenario explanations
- Add simulated access decision explanations
- Add simulated evidence panels
- Add interview explanation prompts
- Add architecture thinking prompts
- Update README documentation if needed
- Update styling only as needed for the new scenario practice page

Recommended initial scenario types:
1. Authentication context scenario
2. Claims interpretation scenario
3. Role mapping access decision scenario
4. Access denied scenario
5. Joiner/Mover/Leaver scenario
6. Audit evidence scenario

Allowed status badges:
- Local Only
- Simulated
- Practice Scenario
- Protected
- Available
- Readiness Only
- Review Next
- Evidence Example

Forbidden work:
- Do not add real Entra ID integration
- Do not add real Okta integration
- Do not add real AWS IAM integration
- Do not add real AWS account connection
- Do not add real SCIM target
- Do not add real SAML identity provider
- Do not add AWS SDK calls
- Do not add AWS CLI integration
- Do not add CloudTrail ingestion
- Do not add database persistence
- Do not add cloud deployment
- Do not add CI/CD
- Do not add public endpoint exposure
- Do not add external API calls
- Do not add webhook, email, scheduled task, or background job integration
- Do not display or log raw tokens
- Do not add secrets
- Do not add or commit .env
- Do not add tenant IDs
- Do not add AWS account IDs
- Do not add AWS role ARNs
- Do not add private keys or certificates
- Do not add unredacted screenshots
- Do not rewrite the app from scratch
- Do not add a full training engine
- Do not add a scoring engine
- Do not add persistent learner progress tracking
- Do not add a complex workflow state machine

Files you may inspect:
- README.md
- AGENTS.md
- iam-practice-app/README.md
- iam-practice-app/package.json
- iam-practice-app/.env.example
- iam-practice-app/src/app.js
- iam-practice-app/src/routes/apiRoutes.js
- iam-practice-app/src/routes/pageRoutes.js
- iam-practice-app/src/views/dashboard.html
- iam-practice-app/src/views/guided-learning.html
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
- iam-practice-app/src/views/guided-learning.html
- iam-practice-app/src/public/styles.css

You may add:
- iam-practice-app/src/views/scenario-practice.html

You may add route:
- /scenario-practice

Avoid changing unless absolutely necessary:
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
- iam-practice-app/src/routes/apiRoutes.js
- iam-practice-app/package.json
- iam-practice-app/package-lock.json

Acceptance criteria:
- App starts locally
- App works without .env
- Local dummy login still works
- Dashboard loads
- Dashboard includes scenario practice navigation or card
- /scenario-practice page loads
- Scenario practice page clearly says IdentityCore is local-first and skill-practice focused
- Scenario practice page uses safe local-only/simulated status badges
- Scenario practice page includes multiple IAM practice scenarios
- Each scenario explains identity context, access request, decision, reason, and evidence
- Scenarios include interview explanation prompts
- Scenarios include architecture thinking prompts
- Scenario links point only to existing pages or clearly marked future items
- Existing RBAC behavior still works
- Protected pages still enforce access
- Access denied behavior still works
- Guided learning page still works
- OIDC readiness still works
- SAML readiness still works
- Provider comparison still works
- Role mapping still works
- SCIM/JML/audit/AWS readiness pages still work if present
- No new dependency is added unless clearly justified
- No .env file is committed
- No secrets are committed
- No tenant IDs are committed
- No AWS account IDs or AWS role ARNs are committed
- No raw tokens are displayed or logged
- No real integration is added

When done, summarize:
1. Files changed
2. New page or route added
3. Dashboard/guided learning navigation updates
4. Scenario types added
5. Existing functionality preserved
6. Local test steps performed
7. Security/no-secrets confirmation
8. Suggested commit message

Suggested commit message:
phase-22: add scenario-based IAM practice foundation
```

---

## Phase 22 Completion Summary Template

Use this after implementation is complete:

```markdown
# Phase 22 Completion Summary — Scenario-Based IAM Practice Workflows

## Implementation Summary

Phase 22 added a safe local-only scenario practice foundation to IdentityCore.

## New User Experience

The learner can now open the scenario practice page and walk through IAM scenarios that explain identity context, access request, decision, reason, simulated evidence, interview explanation, and architecture thinking.

## Files Changed

- [list files]

## New Route

- `/scenario-practice`

## Scenario Types Added

- Authentication context scenario
- Claims interpretation scenario
- Role mapping access decision scenario
- Access denied scenario
- Joiner/Mover/Leaver scenario
- Audit evidence scenario

## Testing Completed

- [list tests]

## Security Review

- No `.env` committed
- No secrets committed
- No tenant IDs committed
- No AWS account IDs committed
- No AWS role ARNs committed
- No raw tokens displayed or logged
- No real integrations added

## Commit Message

`phase-22: add scenario-based IAM practice foundation`
```
