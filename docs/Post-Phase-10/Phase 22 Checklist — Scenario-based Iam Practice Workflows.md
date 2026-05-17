# Phase 22 Checklist — Scenario-Based IAM Practice Workflows

## Purpose

This checklist controls Phase 22 from planning through implementation readiness, local testing, review, commit, push, pull request, merge, and local `main` update.

Phase 22 must add a safe local-only scenario-based IAM practice workflow foundation without adding real integrations, external API calls, secrets, cloud deployment, database persistence, production behavior, raw token display, or complex workflow engine behavior.

Phase 22 starts as a documentation and planning phase.

Implementation must not begin until the Phase 22 spec and this checklist are committed to `main`, local `main` is clean, and a Phase 22 feature branch is created.

---

## Phase 22 Goal

Create a safe scenario-based IAM practice workflow foundation inside IdentityCore.

The learner should understand:

* how IAM scenarios are evaluated
* how authentication differs from authorization
* how claims and roles influence access decisions
* how role mapping supports least privilege
* why access denied is a valid security outcome
* how Joiner/Mover/Leaver lifecycle changes affect access
* how audit evidence explains IAM decisions
* how to explain IAM scenarios in practical interview language
* how to think about IAM scenarios like an architect

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
* [ ] Phase 21 is committed to `main`
* [ ] Phase 21 was pushed to GitHub
* [ ] Phase 21 PR was merged
* [ ] Phase 21 was pulled locally into `main`
* [ ] Phase 21 was locally tested after merge
* [ ] no `.env` file is staged or tracked
* [ ] no screenshots are staged
* [ ] no secrets are present
* [ ] no app code is being changed during planning

---

## 2. Planning Documents

Create these documents:

```text
docs/Post-Phase-10/Phase 22 — Scenario-Based IAM Practice Workflows Spec.md
docs/Post-Phase-10/Phase 22 Checklist — Scenario-Based IAM Practice Workflows.md
```

Confirm:

* [ ] Phase 22 spec exists
* [ ] Phase 22 checklist exists
* [ ] spec defines purpose
* [ ] spec defines objective
* [ ] spec defines business scenario
* [ ] spec defines current project status
* [ ] spec defines Phase 22 scope
* [ ] spec defines out of scope
* [ ] spec defines recommended scenario practice page
* [ ] spec defines recommended scenario types
* [ ] spec defines scenario interaction model
* [ ] spec defines scenario card fields
* [ ] spec defines safe status badges
* [ ] spec defines Phase 22 versus future phase boundary
* [ ] spec defines files Codex may inspect
* [ ] spec defines files Codex may change
* [ ] spec defines files Codex should avoid changing
* [ ] spec defines expected user experience
* [ ] spec defines acceptance criteria
* [ ] spec defines local testing plan
* [ ] spec defines security review command
* [ ] spec includes Codex handoff prompt
* [ ] checklist is complete

---

## 3. Phase 22 Planning Scope

Phase 22 planning may define:

* [ ] scenario practice page
* [ ] scenario practice route
* [ ] dashboard scenario practice card
* [ ] guided learning scenario practice link
* [ ] local-only scenario cards
* [ ] simple scenario selector
* [ ] expandable scenario details
* [ ] step-by-step scenario walkthroughs
* [ ] simulated access decision explanations
* [ ] simulated evidence panels
* [ ] interview explanation prompts
* [ ] architecture thinking prompts
* [ ] local-only status badges
* [ ] README update plan
* [ ] styling update plan if needed
* [ ] manual screenshot evidence plan
* [ ] future phase boundary

---

## 4. Phase 22 Forbidden Work During Planning

Do not change app code during planning.

Do not add:

* [ ] scenario practice implementation before planning docs are committed
* [ ] real Entra ID integration
* [ ] real Okta integration
* [ ] real AWS IAM integration
* [ ] real AWS account connection
* [ ] real SCIM target
* [ ] real SAML identity provider
* [ ] AWS SDK calls
* [ ] AWS CLI integration
* [ ] CloudTrail ingestion
* [ ] database persistence
* [ ] cloud deployment
* [ ] CI/CD
* [ ] public endpoint exposure
* [ ] external API calls
* [ ] webhook integration
* [ ] email integration
* [ ] scheduled tasks
* [ ] background jobs
* [ ] production authorization
* [ ] raw token display
* [ ] raw token logging
* [ ] committed `.env`
* [ ] committed secrets
* [ ] tenant IDs
* [ ] AWS account IDs
* [ ] AWS role ARNs
* [ ] private keys
* [ ] certificates
* [ ] screenshots
* [ ] real user data
* [ ] full training engine
* [ ] scoring engine
* [ ] persistent learner progress tracking
* [ ] complex workflow state machine

---

## 5. Phase 22 Core Boundary

Confirm this boundary is clear:

```text
Phase 22 = simple local scenario walkthroughs, scenario cards, access decision explanations, simulated evidence, and interview/architecture prompts.

Future phases = deeper workflow engines, scoring, persistent progress tracking, richer evidence generation, and advanced portfolio demo behavior if separately approved.
```

Checklist:

* [ ] Phase 22 does not add real integrations
* [ ] Phase 22 does not add external calls
* [ ] Phase 22 does not add database persistence
* [ ] Phase 22 does not add scoring
* [ ] Phase 22 does not add learner progress tracking
* [ ] Phase 22 does not add a complex workflow state machine
* [ ] Phase 22 keeps all scenario behavior local-only
* [ ] Phase 22 keeps scenario evidence simulated and clearly labeled

---

## 6. Commit Planning Documents First

After creating the Phase 22 spec and checklist, commit them to `main` before implementation work begins.

Run:

```bash
cd /d/identitycore

git status --short
```

Expected new files:

```text
?? "docs/Post-Phase-10/Phase 22 Checklist — Scenario-Based IAM Practice Workflows.md"
?? "docs/Post-Phase-10/Phase 22 — Scenario-Based IAM Practice Workflows Spec.md"
```

If Git shows `Iam` instead of `IAM`, use the exact filename shown by Git.

Stage the exact files:

```bash
git add "docs/Post-Phase-10/Phase 22 — Scenario-Based IAM Practice Workflows Spec.md"
git add "docs/Post-Phase-10/Phase 22 Checklist — Scenario-Based IAM Practice Workflows.md"

git status --short
```

Expected staged files:

```text
A  "docs/Post-Phase-10/Phase 22 Checklist — Scenario-Based IAM Practice Workflows.md"
A  "docs/Post-Phase-10/Phase 22 — Scenario-Based IAM Practice Workflows Spec.md"
```

Commit and push:

```bash
git commit -m "docs: add phase-22 scenario-based IAM practice planning"
git push origin main
```

Confirm:

* [ ] both planning docs are committed
* [ ] both planning docs are pushed to `main`
* [ ] no app code changed during planning
* [ ] no `.env` file was committed
* [ ] no secrets were committed
* [ ] no tenant IDs were committed
* [ ] no AWS identifiers were committed
* [ ] no screenshots were committed

Verify clean `main`:

```bash
git status --short
git branch --show-current
```

Expected:

```text
main
```

with no status output.

---

## 7. Create Phase 22 Feature Branch

Only after the planning docs are committed and `main` is clean, create the implementation branch.

Run:

```bash
cd /d/identitycore

git checkout -b feature/phase-22-scenario-based-iam-practice

git branch --show-current
git status --short
```

Expected branch:

```text
feature/phase-22-scenario-based-iam-practice
```

Expected status:

```text
(no output)
```

Confirm:

* [ ] branch is not `main`
* [ ] branch name is correct
* [ ] branch was created from updated `main`
* [ ] Phase 22 implementation will happen only on this feature branch

---

## 8. Pre-Codex Checklist

Before giving Codex the Phase 22 prompt, confirm:

* [ ] Phase 22 spec is committed to `main`
* [ ] Phase 22 checklist is committed to `main`
* [ ] local `main` was clean before branch creation
* [ ] Phase 22 feature branch exists
* [ ] current branch is `feature/phase-22-scenario-based-iam-practice`
* [ ] Codex must not work on `main`
* [ ] Codex must inspect the project before editing
* [ ] Codex must preserve existing functionality
* [ ] Codex must not rewrite the app from scratch
* [ ] Codex must not add real Entra integration
* [ ] Codex must not add real Okta integration
* [ ] Codex must not add real AWS implementation
* [ ] Codex must not add AWS SDK calls
* [ ] Codex must not add AWS credentials
* [ ] Codex must not add real AWS identifiers
* [ ] Codex must not add database persistence
* [ ] Codex must not add cloud deployment
* [ ] Codex must not add CI/CD
* [ ] Codex must not add external API calls
* [ ] Codex must not add full training engine behavior
* [ ] Codex must not add scoring engine behavior
* [ ] Codex must not add persistent learner progress tracking
* [ ] Codex must not commit `.env`
* [ ] Codex must not commit secrets

---

## 9. Codex Handoff Prompt

Use the approved prompt from:

```text
docs/Post-Phase-10/Phase 22 — Scenario-Based IAM Practice Workflows Spec.md
```

The Codex prompt must include:

* [ ] repository name
* [ ] local folder
* [ ] current branch
* [ ] phase goal
* [ ] allowed work
* [ ] forbidden work
* [ ] files Codex may inspect
* [ ] files Codex may change
* [ ] files Codex should avoid changing
* [ ] route that may be added
* [ ] existing functionality to preserve
* [ ] acceptance criteria
* [ ] testing expectations
* [ ] security guardrails
* [ ] no-secrets requirement
* [ ] required Codex summary
* [ ] suggested commit message

---

## 10. Scenario Practice Page Requirements

If implemented, the scenario practice page should be available at:

```text
/scenario-practice
```

Confirm page shows:

* [ ] IdentityCore is local-first
* [ ] IdentityCore is a skill practice app
* [ ] IdentityCore is not production
* [ ] scenarios are simulated
* [ ] no real identity providers are connected by this page
* [ ] no AWS account is connected by this page
* [ ] scenario cards or sections are visible
* [ ] each scenario has an IAM concept taught
* [ ] each scenario has a business situation
* [ ] each scenario has identity context
* [ ] each scenario has access request
* [ ] each scenario has decision
* [ ] each scenario has reason
* [ ] each scenario has simulated evidence
* [ ] each scenario has interview prompt
* [ ] each scenario has architecture prompt
* [ ] related links point only to existing pages or clearly marked future items

---

## 11. Required Initial Scenario Types

Confirm Phase 22 includes multiple scenarios from this set:

* [ ] Authentication context scenario
* [ ] Claims interpretation scenario
* [ ] Role mapping access decision scenario
* [ ] Access denied scenario
* [ ] Joiner/Mover/Leaver scenario
* [ ] Audit evidence scenario

Recommended minimum:

* [ ] at least 5 scenario cards or sections

Best target:

* [ ] all 6 recommended scenario types included

---

## 12. Scenario Card Content Requirements

Each scenario should include:

* [ ] scenario name
* [ ] IAM concept taught
* [ ] business situation
* [ ] identity context
* [ ] access request
* [ ] expected decision
* [ ] reason for decision
* [ ] simulated evidence
* [ ] related module link
* [ ] interview explanation prompt
* [ ] architecture thinking prompt
* [ ] safe status badge

---

## 13. Safe Status Model

Allowed statuses:

* [ ] Local Only
* [ ] Simulated
* [ ] Practice Scenario
* [ ] Protected
* [ ] Available
* [ ] Readiness Only
* [ ] Review Next
* [ ] Evidence Example

Forbidden statuses:

* [ ] Production Ready
* [ ] Connected to Entra
* [ ] Connected to Okta
* [ ] Connected to AWS
* [ ] Connected to Production Tenant
* [ ] Real Cloud Monitoring Enabled
* [ ] Real SCIM Provider Connected
* [ ] Real SAML Provider Active
* [ ] Real CloudTrail Enabled

---

## 14. Existing Functionality Codex Must Preserve

Codex must preserve:

* [ ] app starts locally
* [ ] app works without `.env`
* [ ] local dummy login works
* [ ] Entra OIDC behavior still works if locally configured
* [ ] Okta OIDC behavior still works if locally configured
* [ ] logout works
* [ ] dashboard loads
* [ ] RBAC still works
* [ ] protected pages still enforce access
* [ ] unauthorized users are blocked
* [ ] access denied page still works
* [ ] claims/token simulation still works
* [ ] guided learning page still works
* [ ] OIDC readiness page loads
* [ ] JWT readiness page loads if present
* [ ] SAML readiness page loads
* [ ] provider comparison page loads
* [ ] role mapping page loads
* [ ] SCIM readiness/users/groups behavior still works
* [ ] JML simulation/readiness still works
* [ ] audit readiness/evidence still works
* [ ] AWS federation readiness still works
* [ ] Docker runtime remains safe
* [ ] local-only simulator messaging remains clear

---

## 15. Files Codex May Inspect

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

If file names differ in the actual repo, Codex must inspect the existing route and view structure before editing.

---

## 16. Files Codex May Change

Codex may change files related to scenario practice display, dashboard navigation, guided learning navigation, documentation, and styling.

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

Codex may add route:

```text
/scenario-practice
```

Any new file must be explained in the Codex summary.

---

## 17. Files Codex Should Avoid Changing Unless Necessary

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

Confirm:

* [ ] package files do not change unless there is a clear reason
* [ ] no new dependencies are added unless absolutely necessary
* [ ] Phase 22 should not require new dependencies
* [ ] authentication logic is not rewritten
* [ ] RBAC middleware is not weakened
* [ ] OIDC/Okta/SCIM/SAML/AWS readiness behavior is not broken

---

## 18. Post-Codex Review

After Codex finishes, run:

```bash
cd /d/identitycore

git status --short
```

Review every changed file.

Checklist:

* [ ] changed files make sense for scenario practice work
* [ ] new scenario practice view makes sense if added
* [ ] new scenario practice route makes sense if added
* [ ] dashboard navigation update makes sense if added
* [ ] guided learning link update makes sense if added
* [ ] scenario links point to existing pages or clearly marked future items
* [ ] no unexpected backend rewrite
* [ ] no unrelated feature added
* [ ] no real integration added
* [ ] no external API call added
* [ ] no AWS SDK dependency added
* [ ] no `.env` created or staged
* [ ] no secrets added
* [ ] no tenant IDs added
* [ ] no AWS account IDs added
* [ ] no AWS role ARNs added
* [ ] no raw tokens displayed or logged
* [ ] no database added
* [ ] no cloud deployment added
* [ ] no CI/CD added
* [ ] no scoring engine added
* [ ] no persistent progress tracking added
* [ ] no complex workflow state machine added
* [ ] documentation changes make sense

---

## 19. Review Diff Before Running App

Run:

```bash
cd /d/identitycore

git diff --stat
git diff
```

Review:

* [ ] what files changed
* [ ] what UI changed
* [ ] what routes changed
* [ ] whether existing behavior was preserved
* [ ] whether documentation changed
* [ ] whether package files changed
* [ ] whether any new dependency was introduced
* [ ] whether any secrets or identifiers appear

If `package.json` or `package-lock.json` changed, confirm why.

No new dependency should be added unless it is clearly necessary and safe.

---

## 20. Local Test Commands

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
* [ ] local-only simulator warning remains visible
* [ ] local dummy login works
* [ ] dashboard loads
* [ ] scenario practice card or navigation appears
* [ ] `/scenario-practice` loads
* [ ] scenario cards or sections display correctly
* [ ] scenario evidence examples display correctly
* [ ] scenario interview prompts display correctly
* [ ] scenario architecture prompts display correctly
* [ ] related links work
* [ ] guided learning page still loads
* [ ] existing navigation works
* [ ] logout works
* [ ] protected pages still enforce access
* [ ] access denied still works
* [ ] OIDC readiness page still loads
* [ ] SAML readiness page still loads
* [ ] provider comparison page still loads
* [ ] role mapping page still loads
* [ ] SCIM readiness page still loads if present
* [ ] JML readiness page still loads if present
* [ ] audit readiness page still loads if present
* [ ] AWS federation readiness page still loads if present

Stop the app:

```text
CTRL + C
```

---

## 21. Security Review Command

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

* [ ] no real AWS credentials
* [ ] no real AWS account IDs
* [ ] no real role ARNs
* [ ] no private keys
* [ ] no raw tokens
* [ ] no tenant IDs
* [ ] no `.env` staged

Placeholder strings are allowed only if clearly fake and documented as examples.

---

## 22. Manual Screenshot Evidence Plan

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

* [ ] tenant IDs
* [ ] client secrets
* [ ] tokens
* [ ] AWS account IDs
* [ ] AWS role ARNs
* [ ] provider ARNs
* [ ] real user data
* [ ] production environments

---

## 23. Commit Implementation

Only commit after:

* [ ] Codex summary reviewed
* [ ] changed files reviewed
* [ ] diff reviewed
* [ ] local testing passed
* [ ] security scan reviewed
* [ ] no forbidden files or secrets are staged

Stage expected files only.

Possible command:

```bash
cd /d/identitycore

git add README.md
git add iam-practice-app/README.md
git add iam-practice-app/src/routes/pageRoutes.js
git add iam-practice-app/src/views/dashboard.html
git add iam-practice-app/src/views/guided-learning.html
git add iam-practice-app/src/views/scenario-practice.html
git add iam-practice-app/src/public/styles.css

git status --short
```

Then commit:

```bash
git commit -m "phase-22: add scenario-based IAM practice foundation"
```

Confirm:

* [ ] commit succeeds
* [ ] only expected files are committed
* [ ] commit message is correct

---

## 24. Push Feature Branch

Run:

```bash
git push origin feature/phase-22-scenario-based-iam-practice
```

Confirm:

* [ ] push succeeds
* [ ] GitHub shows the feature branch
* [ ] no secrets warning appears

---

## 25. Pull Request

Create PR:

```text
base: main
compare: feature/phase-22-scenario-based-iam-practice
```

Suggested PR title:

```text
Phase 22: Scenario-Based IAM Practice Workflows
```

Suggested PR description sections:

```markdown
## Summary

This PR implements Phase 22 — Scenario-Based IAM Practice Workflows.

Phase 22 adds a safe local-only scenario practice foundation to IdentityCore so learners can walk through IAM scenarios and understand identity context, access requests, decisions, reasons, simulated evidence, interview explanations, and architecture thinking prompts.

This phase does not add real integrations, external API calls, database persistence, cloud deployment, scoring, progress tracking, or a complex workflow engine.

## Changes Made

- Added `/scenario-practice` page.
- Added scenario practice navigation or dashboard card.
- Added scenario cards or sections for core IAM learning scenarios.
- Added simulated access decision explanations.
- Added simulated evidence panels.
- Added interview explanation prompts.
- Added architecture thinking prompts.
- Updated guided learning navigation if needed.
- Updated README documentation if needed.
- Updated styling for the scenario practice page.

## Testing Performed

- [add local test results]

## Security Review

- No `.env` file added or staged.
- No secrets added.
- No tenant IDs added.
- No AWS account IDs added.
- No AWS role ARNs added.
- No private keys or certificates added.
- No raw tokens displayed or logged.
- No real Entra ID integration added.
- No real Okta integration added.
- No real AWS integration added.
- No AWS SDK or AWS CLI integration added.
- No external API calls added.
- No database persistence added.
- No cloud deployment added.
- No background jobs, scheduled tasks, webhooks, or email integration added.

## Phase Boundary Confirmation

Phase 22 adds simple local scenario walkthroughs, access decision explanations, simulated evidence, and interview/architecture prompts.

It does not add scoring, persistent progress tracking, real external integrations, or a complex workflow engine.
```

Confirm:

* [ ] PR title is correct
* [ ] PR description is complete
* [ ] PR targets `main`
* [ ] PR source branch is correct
* [ ] changed files are expected
* [ ] no secret warnings appear

---

## 26. Merge PR

After review, merge the PR into `main`.

Confirm:

* [ ] PR is merged
* [ ] PR is closed
* [ ] GitHub `main` includes Phase 22

---

## 27. Update Local Main After Merge

Run:

```bash
cd /d/identitycore

git checkout main
git pull origin main

git status --short
git branch --show-current
```

Expected:

```text
main
```

with no status output.

Optional delete local feature branch:

```bash
git branch -d feature/phase-22-scenario-based-iam-practice
```

Confirm:

* [ ] local `main` is updated
* [ ] working tree is clean
* [ ] current branch is `main`
* [ ] feature branch deleted locally if desired

---

## 28. Post-Merge Local Verification

After merge and local update, run the app one final time from `main`:

```bash
cd /d/identitycore/iam-practice-app

npm install
npm start
```

Open:

```text
http://localhost:3000
```

Verify:

* [ ] `/login` loads
* [ ] dummy login works
* [ ] `/dashboard` loads
* [ ] `/scenario-practice` loads
* [ ] scenario practice dashboard/navigation link works
* [ ] scenario cards or sections display correctly
* [ ] guided learning still works
* [ ] role mapping still works
* [ ] provider comparison still works
* [ ] AWS federation readiness still works
* [ ] access denied still blocks unauthorized access

Stop app:

```text
CTRL + C
```

Then run:

```bash
cd /d/identitycore

git status --short
git branch --show-current
```

Expected:

```text
main
```

with no status output.

---

## 29. Phase 22 Completion Checklist

Phase 22 is complete only when:

* [ ] Phase 22 planning docs committed to `main`
* [ ] Phase 22 planning docs pushed to GitHub
* [ ] Phase 22 feature branch created from clean `main`
* [ ] Codex implemented only approved scope
* [ ] scenario practice page added
* [ ] `/scenario-practice` route added
* [ ] dashboard or navigation updated
* [ ] guided learning updated if appropriate
* [ ] scenarios explain identity context, access request, decision, reason, and evidence
* [ ] interview prompts included
* [ ] architecture prompts included
* [ ] local testing passed
* [ ] security scan reviewed
* [ ] no secrets committed
* [ ] no `.env` committed
* [ ] no tenant IDs committed
* [ ] no AWS account IDs committed
* [ ] no AWS role ARNs committed
* [ ] no raw tokens displayed or logged
* [ ] no real integrations added
* [ ] no external APIs added
* [ ] no database added
* [ ] no cloud deployment added
* [ ] no scoring engine added
* [ ] no persistent learner progress tracking added
* [ ] no complex workflow state machine added
* [ ] implementation committed to feature branch
* [ ] feature branch pushed
* [ ] PR created
* [ ] PR reviewed
* [ ] PR merged into `main`
* [ ] local `main` updated
* [ ] app verified after merge
* [ ] final working tree clean

---

## 30. Suggested Commit Messages

Planning commit:

```text
docs: add phase-22 scenario-based IAM practice planning
```

Implementation commit:

```text
phase-22: add scenario-based IAM practice foundation
```

---

## 31. Next Phase Placeholder

Do not start the next phase until Phase 22 is merged, local `main` is updated, and the app is verified clean after merge.

Possible next phase direction:

```text
Phase 23 — Portfolio and Interview Explanation Mode
```

Possible focus:

* explain what happened in each scenario
* explain why it matters
* explain what could break
* explain what evidence proves it
* create portfolio walkthrough language
* create interview-style explanations

Do not begin Phase 23 until Phase 22 is fully closed.
