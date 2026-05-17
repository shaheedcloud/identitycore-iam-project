# Phase 21 Checklist — Guided IAM Learning Journey Foundation

## Purpose

This checklist controls Phase 21 from planning through implementation readiness, local testing, review, commit, push, pull request, merge, and local `main` update.

Phase 21 must add a safe guided IAM learning journey foundation without adding real integrations, complex scenario workflow execution, external API calls, secrets, cloud deployment, database persistence, or production behavior.

Phase 21 starts as a documentation and planning phase.

Implementation must not begin until the Phase 21 spec and this checklist are committed to `main`, local `main` is clean, and a Phase 21 feature branch is created.

---

## Phase 21 Goal

Create a guided IAM learning journey foundation inside IdentityCore.

The learner should understand:

* where to start in the app
* what each IdentityCore module teaches
* how authentication, claims, authorization, federation, provisioning, lifecycle, audit, and AWS readiness connect
* what pages should be opened in what order
* what is simulated locally
* what is readiness-only
* what is not connected to real systems
* how to explain each module in practical IAM interview language
* how the existing modules fit into a larger IAM engineer-to-architect learning path

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
* [ ] Phase 20 is committed to `main`
* [ ] Phase 20 was pushed to GitHub
* [ ] Phase 20 was merged and local `main` was updated
* [ ] no `.env` file is staged or tracked
* [ ] no screenshots are staged
* [ ] no secrets are present
* [ ] no app code is being changed during planning

---

## 2. Planning Documents

Create these documents:

```text
docs/Post-Phase-10/Phase 21 — Guided IAM Learning Journey Foundation Spec.md
docs/Post-Phase-10/Phase 21 Checklist — Guided IAM Learning Journey Foundation.md
```

Confirm:

* [ ] Phase 21 spec exists
* [ ] Phase 21 checklist exists
* [ ] spec defines purpose
* [ ] spec defines objective
* [ ] spec defines business scenario
* [ ] spec defines current project status
* [ ] spec defines Phase 21 scope
* [ ] spec defines out of scope
* [ ] spec defines the Phase 21 versus Phase 22 boundary
* [ ] spec defines recommended guided learning page
* [ ] spec defines guided journey sections
* [ ] spec defines safe status model
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

## 3. Phase 21 Planning Scope

Phase 21 planning may define:

* [ ] guided learning journey page
* [ ] guided learning journey route
* [ ] guided learning journey dashboard card
* [ ] structured module sequence
* [ ] module cards for existing IdentityCore concepts
* [ ] learning stage labels
* [ ] completion/status indicators using safe local/static data
* [ ] local-only guidance messages
* [ ] links to existing pages only
* [ ] short explanations of each IAM module
* [ ] recommended learner path
* [ ] interview explanation prompts
* [ ] architecture thinking prompts
* [ ] README update plan
* [ ] dashboard navigation update plan
* [ ] styling update plan if needed
* [ ] manual screenshot evidence plan
* [ ] future Phase 22 boundary

---

## 4. Phase 21 Forbidden Work During Planning

Do not change app code during planning.

Do not add:

* [ ] guided learning implementation before planning docs are committed
* [ ] complex scenario workflow execution
* [ ] animated workflow engine
* [ ] scenario-based login simulation
* [ ] scenario-based claims transformation
* [ ] scenario-based access denied workflow
* [ ] scenario-based JML automation
* [ ] scenario-based audit evidence generation
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
* [ ] private keys
* [ ] certificates
* [ ] screenshots
* [ ] real user data

---

## 5. Phase 21 Versus Phase 22 Boundary

Confirm this boundary is clear:

```text
Phase 21 = guided learner structure, module sequence, navigation, explanations, and interview prompts.
Phase 22 = scenario-based IAM practice workflows where things happen visually.
```

Checklist:

* [ ] Phase 21 does not add scenario execution
* [ ] Phase 21 does not add workflow state machine behavior
* [ ] Phase 21 does not simulate full IAM events visually
* [ ] Phase 21 does not generate new audit events for scenarios
* [ ] Phase 21 does not create a full interactive training engine
* [ ] Phase 21 only organizes and explains existing modules
* [ ] Phase 22 is preserved as the next implementation layer

---

## 6. Commit Planning Documents First

After creating the Phase 21 spec and checklist, commit them to `main` before implementation work begins.

Run:

```bash
cd /d/identitycore

git status --short
```

Expected new files:

```text
?? "docs/Post-Phase-10/Phase 21 Checklist — Guided IAM Learning Journey Foundation.md"
?? "docs/Post-Phase-10/Phase 21 — Guided IAM Learning Journey Foundation Spec.md"
```

Stage the exact files:

```bash
git add "docs/Post-Phase-10/Phase 21 — Guided IAM Learning Journey Foundation Spec.md"
git add "docs/Post-Phase-10/Phase 21 Checklist — Guided IAM Learning Journey Foundation.md"

git status --short
```

Expected staged files:

```text
A  "docs/Post-Phase-10/Phase 21 Checklist — Guided IAM Learning Journey Foundation.md"
A  "docs/Post-Phase-10/Phase 21 — Guided IAM Learning Journey Foundation Spec.md"
```

Commit and push:

```bash
git commit -m "docs: add phase-21 guided IAM learning journey planning"
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

## 7. Create Phase 21 Feature Branch

Only after the planning docs are committed and `main` is clean, create the implementation branch.

Run:

```bash
cd /d/identitycore

git checkout -b feature/phase-21-guided-iam-learning-journey

git branch --show-current
git status --short
```

Expected branch:

```text
feature/phase-21-guided-iam-learning-journey
```

Expected status:

```text
(no output)
```

Confirm:

* [ ] branch is not `main`
* [ ] branch name is correct
* [ ] branch was created from updated `main`
* [ ] Phase 21 implementation will happen only on this feature branch

---

## 8. Pre-Codex Checklist

Before giving Codex the Phase 21 prompt, confirm:

* [ ] Phase 21 spec is committed to `main`
* [ ] Phase 21 checklist is committed to `main`
* [ ] local `main` was clean before branch creation
* [ ] Phase 21 feature branch exists
* [ ] current branch is `feature/phase-21-guided-iam-learning-journey`
* [ ] Codex must not work on `main`
* [ ] Codex must inspect the project before editing
* [ ] Codex must preserve existing functionality
* [ ] Codex must not rewrite the app from scratch
* [ ] Codex must not add scenario execution
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
* [ ] Codex must not commit `.env`
* [ ] Codex must not commit secrets

---

## 9. Codex Handoff Prompt

Use the approved prompt from:

```text
docs/Post-Phase-10/Phase 21 — Guided IAM Learning Journey Foundation Spec.md
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

## 10. Core Learning Principle

Confirm Phase 21 supports the IdentityCore learning loop:

```text
Learn → Build → Break → Fix → Document → Diagram → Rebuild → Explain
```

Checklist:

* [ ] guided journey helps the learner know what to learn first
* [ ] guided journey connects existing modules to practical learning
* [ ] guided journey encourages explanation, not just clicking pages
* [ ] guided journey includes interview explanation prompts
* [ ] guided journey supports rebuild/review thinking
* [ ] guided journey makes the app easier to use as a portfolio walkthrough

---

## 11. Guided Learning Page Requirements

If implemented, the guided learning page should be available at:

```text
/guided-learning
```

Confirm page shows:

* [ ] IdentityCore is local-first
* [ ] IdentityCore is a skill practice app
* [ ] IdentityCore is not production
* [ ] modules are organized in a logical learning sequence
* [ ] authentication foundation section
* [ ] claims/token understanding section
* [ ] authorization/RBAC section
* [ ] federation concepts section
* [ ] provisioning and lifecycle section
* [ ] audit and evidence section
* [ ] AWS federation readiness section
* [ ] portfolio/interview explanation section
* [ ] safe status badges
* [ ] links to existing pages only, or clearly marked future items

Suggested badges:

```text
Local Only
Simulated
Readiness Only
Protected
Available
Not Connected
Review Next
```

---

## 12. Guided Journey Module Requirements

Each guided journey module should clearly explain:

* [ ] module name
* [ ] IAM concept taught
* [ ] business purpose
* [ ] page or route to open
* [ ] current status
* [ ] safety note if relevant
* [ ] interview explanation prompt

Example module pattern:

```text
Module: Role Mapping
Concept: Authorization
Business purpose: Shows how user roles and claims become application access decisions.
Open: /role-mapping
Status: Simulated / Local Only
Interview prompt: Explain why authentication alone should not grant admin access.
```

---

## 13. Safe Status Model

Allowed statuses:

* [ ] Available
* [ ] Readiness Only
* [ ] Simulated
* [ ] Local Only
* [ ] Protected
* [ ] Review Next
* [ ] Not Connected

Forbidden statuses:

* [ ] Production Ready
* [ ] Connected to AWS
* [ ] Connected to Production Tenant
* [ ] Real Cloud Monitoring Enabled
* [ ] Real SCIM Provider Connected
* [ ] Real SAML Provider Active
* [ ] Real Tenant Active

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
* [ ] OIDC readiness page loads
* [ ] JWT readiness page loads if present
* [ ] SAML readiness page loads
* [ ] provider comparison page loads
* [ ] role mapping page loads
* [ ] SCIM readiness/users/groups behavior still works
* [ ] JML simulation still works
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

Codex may change files related to guided learning display, dashboard navigation, documentation, and styling.

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

Codex may add route:

```text
/guided-learning
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
* [ ] Phase 21 should not require new dependencies
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

* [ ] changed files make sense for guided learning work
* [ ] new guided learning view makes sense if added
* [ ] new guided learning route makes sense if added
* [ ] dashboard navigation update makes sense if added
* [ ] guided learning links point to existing pages or clearly marked future items
* [ ] no unexpected backend rewrite
* [ ] no unrelated feature added
* [ ] no scenario execution engine added
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

## 20. Local Testing

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

* [ ] app starts without errors
* [ ] login page loads
* [ ] local-only simulator warning remains visible
* [ ] local dummy login works
* [ ] dashboard loads
* [ ] dashboard includes guided learning journey card or navigation
* [ ] guided learning page loads
* [ ] guided learning page clearly says IdentityCore is local-first and skill-practice focused
* [ ] guided learning page organizes modules in logical IAM sequence
* [ ] guided learning links work
* [ ] guided learning statuses are safe and accurate
* [ ] guided learning page does not claim real integrations are active
* [ ] navigation works
* [ ] logout works
* [ ] protected pages still enforce access
* [ ] access denied still works
* [ ] OIDC readiness page still loads
* [ ] SAML readiness page still loads
* [ ] provider comparison page still loads
* [ ] role mapping page still loads
* [ ] SCIM pages/endpoints still load if present
* [ ] JML page still loads if present
* [ ] audit page still loads if present
* [ ] AWS federation readiness page still loads if present

Stop the app after testing:

```text
CTRL + C
```

---

## 21. Security Review Before Commit

Run from repo root:

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

Important:

Placeholder strings are allowed only if clearly fake and documented as examples.

---

## 22. Manual Screenshot Evidence Plan

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

* [ ] tenant IDs
* [ ] client secrets
* [ ] tokens
* [ ] AWS account IDs
* [ ] AWS role ARNs
* [ ] provider ARNs
* [ ] real user data
* [ ] production environments

---

## 23. Commit Phase 21 Implementation

After testing and security review pass, run:

```bash
cd /d/identitycore

git status --short
```

Confirm only expected files are changed.

Stage changes:

```bash
git add .
```

Review staged files:

```bash
git status --short
```

Confirm:

* [ ] only expected files are staged
* [ ] no `.env` is staged
* [ ] no screenshots are staged unless intentionally added and redacted
* [ ] no secrets are staged
* [ ] no unrelated files are staged

Commit:

```bash
git commit -m "phase-21: add guided IAM learning journey foundation"
```

Push:

```bash
git push origin feature/phase-21-guided-iam-learning-journey
```

Confirm:

* [ ] commit succeeded
* [ ] push succeeded
* [ ] branch pushed to GitHub

---

## 24. Pull Request

Create the pull request from:

```text
feature/phase-21-guided-iam-learning-journey
```

into:

```text
main
```

Pull request title:

```text
Phase 21: Guided IAM Learning Journey Foundation
```

Pull request description:

```markdown
## Summary
Adds Phase 21 Guided IAM Learning Journey Foundation for the IdentityCore IAM Practice App.

This phase connects existing IdentityCore IAM modules into a structured learner flow so the app is easier to use, easier to explain, and more portfolio-ready.

IdentityCore remains a local-first IAM skill practice app and simulator.

## What changed
- Added guided IAM learning journey foundation
- Added or updated dashboard navigation for guided learning
- Organized existing IAM modules into a logical learning sequence
- Added safe local/static status indicators
- Added short learning explanations for IAM modules
- Added interview explanation prompts
- Preserved local-only simulator behavior

## Validation
- App starts locally
- Login page loads
- Local dummy login works
- Dashboard loads
- Guided learning page loads
- Guided learning links work
- Protected pages still enforce access
- Readiness/status pages still load
- Existing provider comparison and role mapping pages still load
- Existing SCIM/JML/audit/AWS readiness pages still load if present

## Security review
- No `.env` committed
- No secrets committed
- No tenant IDs committed
- No AWS account IDs committed
- No AWS role ARNs committed
- No raw tokens displayed or logged
- No real integrations added
- No external API calls added
- No new dependencies added unless explicitly justified
```

Confirm:

* [ ] PR created
* [ ] PR targets `main`
* [ ] PR source branch is correct
* [ ] PR title is correct
* [ ] PR description is complete
* [ ] files changed are expected
* [ ] no secrets appear in GitHub diff

---

## 25. Merge Phase 21

Before merge, confirm:

* [ ] PR files changed are expected
* [ ] no secrets in PR diff
* [ ] no `.env` in PR diff
* [ ] no raw tokens in PR diff
* [ ] no tenant IDs in PR diff
* [ ] no AWS account IDs in PR diff
* [ ] no AWS role ARNs in PR diff
* [ ] no real integrations added
* [ ] no unrelated code added
* [ ] local testing was completed
* [ ] acceptance criteria passed

Then merge into `main` using the normal GitHub merge flow.

Confirm:

* [ ] PR merged
* [ ] PR closed
* [ ] feature branch can be deleted after merge if desired

---

## 26. Update Local Main After Merge

After the PR is merged, update local `main`:

```bash
cd /d/identitycore

git checkout main
git pull origin main
git status --short
git branch --show-current
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

* [ ] local `main` is updated
* [ ] working tree is clean
* [ ] Phase 21 is fully closed

---

## 27. Phase 21 Completion Checklist

Phase 21 is complete only when:

* [ ] Phase 21 spec is committed to `main`
* [ ] Phase 21 checklist is committed to `main`
* [ ] Phase 21 feature branch was created from clean `main`
* [ ] Codex worked only on feature branch
* [ ] guided learning journey page was added or updated
* [ ] dashboard links to guided learning
* [ ] guided learning modules are in logical IAM sequence
* [ ] safe status badges are used
* [ ] interview explanation prompts are included
* [ ] existing local login still works
* [ ] existing dashboard still works
* [ ] existing RBAC still works
* [ ] existing protected pages still enforce access
* [ ] existing readiness pages still load
* [ ] existing provider comparison still loads
* [ ] existing role mapping still loads
* [ ] existing SCIM/JML/audit/AWS readiness pages still load if present
* [ ] no `.env` committed
* [ ] no secrets committed
* [ ] no tenant IDs committed
* [ ] no AWS account IDs committed
* [ ] no AWS role ARNs committed
* [ ] no raw tokens displayed or logged
* [ ] no real integrations added
* [ ] no external API calls added
* [ ] README updated if needed
* [ ] PR opened
* [ ] PR reviewed
* [ ] PR merged into `main`
* [ ] local `main` updated after merge
* [ ] local working tree clean

---

## Final Phase 21 Rule

Do not start Phase 22 until Phase 21 is planned, implemented, tested, reviewed, pushed, opened as a PR, merged, and local `main` is clean.

Phase 21 creates the guided learner foundation.

Phase 22 creates scenario-based IAM practice workflows.
