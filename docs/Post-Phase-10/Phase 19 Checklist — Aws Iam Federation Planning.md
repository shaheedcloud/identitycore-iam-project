# Phase 19 Checklist — AWS IAM Federation Planning

## Purpose

This checklist controls Phase 19 from planning through documentation review, commit, push, and source update.

Phase 19 must safely plan future AWS IAM federation practice without starting real AWS implementation, connecting to AWS, adding AWS SDK calls, committing AWS identifiers, exposing credentials, or weakening IdentityCore safety behavior.

Phase 19 is a documentation and planning phase.

Implementation must not begin until the Phase 19 spec and this checklist are committed to `main`, local `main` is clean, and the next implementation phase is explicitly approved.

---

## Phase 19 Goal

Create a safe AWS IAM federation planning foundation for IdentityCore.

The learner should understand:

* AWS IAM federation concepts
* Entra ID to AWS federation planning
* Okta to AWS federation planning
* SAML and OIDC federation concepts as they relate to AWS
* AWS IAM role assumption
* AWS trust policies
* AWS permission policies
* least-privilege AWS role design
* why AWS access keys should not be the primary learning path
* why real AWS account IDs must not be committed
* why production AWS accounts must not be used
* how CloudTrail evidence supports auditability
* why AWS federation must be planned before implementation

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
* [ ] Phase 18 is merged into `main`
* [ ] Phase 18 was pulled locally
* [ ] no `.env` file is staged or tracked
* [ ] no screenshots are staged
* [ ] no secrets are present
* [ ] no app code is being changed during planning

---

## 2. Planning Documents

Create these documents:

```text
docs/Post-Phase-10/Phase 19 — AWS IAM Federation Planning Spec.md
docs/Post-Phase-10/Phase 19 Checklist — AWS IAM Federation Planning.md
```

Confirm:

* [ ] Phase 19 spec exists
* [ ] Phase 19 checklist exists
* [ ] spec defines purpose
* [ ] spec defines objective
* [ ] spec defines business scenario
* [ ] spec defines current project status
* [ ] spec defines Phase 19 scope
* [ ] spec defines out of scope
* [ ] spec defines AWS federation concept model
* [ ] spec explains AWS federation is not local login
* [ ] spec explains IdentityCore local roles versus AWS IAM roles
* [ ] spec explains AWS trust policies
* [ ] spec explains AWS permission policies
* [ ] spec explains least privilege
* [ ] spec explains AWS access key avoidance
* [ ] spec explains CloudTrail evidence planning
* [ ] spec defines files Codex may inspect later
* [ ] spec defines files Codex may change later
* [ ] spec defines files Codex should avoid changing later
* [ ] spec defines testing plan for future implementation
* [ ] spec defines security review command
* [ ] checklist is complete

---

## 3. Phase 19 Planning Scope

Phase 19 planning may define:

* [ ] AWS federation concept model
* [ ] Entra ID to AWS federation practice planning
* [ ] Okta to AWS federation practice planning
* [ ] SAML-based AWS federation planning
* [ ] OIDC-based AWS federation planning where appropriate
* [ ] AWS IAM role model planning
* [ ] AWS trust policy explanation
* [ ] AWS permission policy explanation
* [ ] least-privilege role design
* [ ] AWS role mapping examples
* [ ] AWS access decision explanation
* [ ] CloudTrail evidence planning
* [ ] AWS account safety rules
* [ ] AWS screenshot redaction rules
* [ ] AWS lab account safety requirements
* [ ] future AWS federation simulator page idea
* [ ] future AWS federation readiness page idea
* [ ] future implementation branch naming
* [ ] future Codex prompt direction
* [ ] README update plan
* [ ] screenshot evidence plan

---

## 4. Phase 19 Forbidden Work During Planning

Do not change app code during planning.

Do not add:

* [ ] real AWS federation implementation
* [ ] real AWS account connection
* [ ] AWS access keys
* [ ] AWS secret access keys
* [ ] AWS session tokens
* [ ] AWS CLI credential profiles
* [ ] real AWS IAM role ARNs
* [ ] real AWS account IDs
* [ ] real AWS SAML provider ARNs
* [ ] real AWS OIDC provider ARNs
* [ ] production AWS access
* [ ] AWS Organizations implementation
* [ ] AWS IAM Identity Center implementation
* [ ] Terraform implementation
* [ ] cloud deployment
* [ ] database persistence
* [ ] CI/CD
* [ ] public endpoint exposure
* [ ] external API calls to AWS
* [ ] AWS SDK calls
* [ ] CloudTrail ingestion
* [ ] SIEM integration
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
* [ ] unredacted screenshots
* [ ] real user data

---

## 5. Core Safety Principle

Confirm Phase 19 follows this principle:

```text
External authentication proves identity.
IdentityCore local RBAC controls IdentityCore access.
AWS IAM roles and policies control AWS access.
```

Checklist:

* [ ] Entra authentication does not automatically mean AWS access
* [ ] Okta authentication does not automatically mean AWS access
* [ ] IdentityCore local admin does not automatically mean AWS admin
* [ ] AWS role access requires explicit federation design
* [ ] AWS role mapping must be allowlisted and least-privilege based
* [ ] AWS account IDs must not be committed
* [ ] AWS credentials must not be committed
* [ ] long-term AWS access keys are not used as the main learning path

---

## 6. AWS Federation Is Not Local Login

Confirm documentation explains:

* [ ] OIDC/SAML handles sign-in
* [ ] federation trust allows AWS role assumption
* [ ] AWS IAM role policies decide AWS permissions
* [ ] IdentityCore local RBAC still controls IdentityCore pages
* [ ] CloudTrail proves AWS activity
* [ ] AWS access requires a separate authorization model
* [ ] successful IdentityCore login does not automatically create AWS access

---

## 7. AWS Role Mapping Relationship

Confirm Phase 19 documents the safe AWS role mapping model:

```text
Provider claim or group
        ↓
Explicit allowlisted federation mapping
        ↓
Approved AWS IAM role
        ↓
Least-privilege permission policy
        ↓
CloudTrail audit evidence
```

Confirm Phase 19 rejects this unsafe model:

```text
Any external admin claim → AWS AdministratorAccess
```

Checklist:

* [ ] AWS role mapping is explicit
* [ ] AWS role mapping is allowlisted
* [ ] AWS role mapping is least-privilege based
* [ ] AWS role mapping is documented
* [ ] AWS role mapping is not automatic
* [ ] broad `AdministratorAccess` is not the default pattern
* [ ] AWS access does not bypass IdentityCore learning guardrails

---

## 8. Local IdentityCore Role vs AWS IAM Role

Confirm documentation clearly separates:

| Role Type                  | Meaning                                  |
| -------------------------- | ---------------------------------------- |
| IdentityCore local role    | Controls access inside IdentityCore only |
| IdentityCore practice role | Teaches local RBAC behavior              |
| AWS IAM role               | Controls AWS permissions                 |
| AWS federated role session | Temporary AWS access after federation    |

Checklist:

* [ ] local IdentityCore role does not automatically become AWS IAM role
* [ ] AWS IAM role does not automatically become IdentityCore local role
* [ ] future mapping must be explicit and documented
* [ ] AWS roles must follow least privilege

---

## 9. AWS Account Safety Rules

Never commit:

* [ ] AWS account ID
* [ ] AWS role ARN
* [ ] AWS SAML provider ARN
* [ ] AWS OIDC provider ARN
* [ ] AWS access key ID
* [ ] AWS secret access key
* [ ] AWS session token
* [ ] AWS CLI profile with real values
* [ ] CloudTrail logs containing real account IDs
* [ ] screenshots showing real account IDs
* [ ] screenshots showing real role ARNs
* [ ] screenshots showing AWS identities
* [ ] screenshots showing private resource names

Allowed placeholder examples only:

```text
ACCOUNT_ID_PLACEHOLDER
ROLE_ARN_PLACEHOLDER
SAML_PROVIDER_PLACEHOLDER
OIDC_PROVIDER_PLACEHOLDER
AWS_LAB_ACCOUNT_PLACEHOLDER
```

Confirm:

* [ ] only placeholders are used
* [ ] no real AWS values are included
* [ ] no screenshots are added during Phase 19 planning

---

## 10. AWS Access Key Rule

Confirm Phase 19 avoids AWS access keys as the main learning path.

Correct learning focus:

```text
Federated login → temporary role session → least-privilege permissions → CloudTrail evidence
```

Forbidden learning focus:

```text
Hardcoded AWS access keys → direct AWS API access
```

Checklist:

* [ ] no AWS access keys are created for IdentityCore
* [ ] no AWS SDK calls are added
* [ ] no AWS credentials are stored
* [ ] no `.aws/credentials` content is committed
* [ ] no long-term credential workflow is introduced
* [ ] temporary federated role sessions are the future design direction

---

## 11. Least Privilege Planning

Confirm Phase 19 documents safer role examples such as:

```text
ROLE-AWS-SecurityAudit-ReadOnly
ROLE-AWS-CloudEngineer-LimitedDeploy
ROLE-AWS-Finance-BillingReadOnly
ROLE-AWS-IAMAccessAnalyzer-ReadOnly
ROLE-AWS-BreakGlass-EmergencyAdmin-DocumentationOnly
```

Checklist:

* [ ] examples are placeholders only
* [ ] no real role ARNs are included
* [ ] roles are tied to business purpose
* [ ] roles are not all administrator roles
* [ ] least privilege is explained
* [ ] break-glass admin is treated as documentation-only for now

---

## 12. AWS Trust Policy Planning

Confirm any trust policy examples are documentation-only and use placeholders.

Checklist:

* [ ] no real AWS account ID
* [ ] no real provider ARN
* [ ] no real tenant/provider data
* [ ] no production references
* [ ] trust policy is clearly marked as placeholder or future planning
* [ ] role assumption is explained safely

---

## 13. AWS Permission Policy Planning

Confirm any permission policy examples are documentation-only and conservative.

Checklist:

* [ ] no production policy is introduced
* [ ] example permissions are limited
* [ ] no broad admin pattern is recommended as default
* [ ] permissions are connected to learning outcomes
* [ ] future real AWS use requires review before implementation

---

## 14. Entra ID To AWS Federation Planning

Confirm Phase 19 may document future Entra-to-AWS federation flow:

```text
Entra lab user
        ↓
Assigned to AWS federation enterprise app
        ↓
SAML assertion sent to AWS
        ↓
AWS role selected or mapped
        ↓
Temporary AWS session created
        ↓
CloudTrail records role activity
```

Checklist:

* [ ] Entra is treated as lab-only later
* [ ] no real Entra tenant ID is committed
* [ ] no real app registration values are committed
* [ ] no real AWS account ID is committed
* [ ] no real SAML assertion is displayed
* [ ] no implementation is started in Phase 19

---

## 15. Okta To AWS Federation Planning

Confirm Phase 19 may document future Okta-to-AWS federation flow:

```text
Okta lab user
        ↓
Assigned to AWS federation app
        ↓
SAML assertion sent to AWS
        ↓
AWS role selected or mapped
        ↓
Temporary AWS session created
        ↓
CloudTrail records role activity
```

Checklist:

* [ ] Okta is treated as lab-only later
* [ ] no real Okta domain is committed
* [ ] no real app integration values are committed
* [ ] no real AWS account ID is committed
* [ ] no real SAML assertion is displayed
* [ ] no implementation is started in Phase 19

---

## 16. CloudTrail Evidence Planning

Confirm Phase 19 explains future CloudTrail evidence goals.

CloudTrail evidence should eventually answer:

* [ ] who assumed the role?
* [ ] which provider was used?
* [ ] which AWS role was assumed?
* [ ] when did the session occur?
* [ ] what AWS actions were performed?
* [ ] was access denied or allowed?
* [ ] did permissions align to least privilege?

CloudTrail evidence must not expose:

* [ ] real AWS account IDs
* [ ] real role ARNs
* [ ] real user emails
* [ ] access keys
* [ ] session tokens
* [ ] private resource names
* [ ] production activity

---

## 17. Future AWS Federation Readiness Idea

Confirm Phase 19 may propose future local-only pages such as:

```text
/aws-federation-readiness
/aws-role-mapping
```

Allowed future page content:

* [ ] provider selected: Local / Entra / Okta
* [ ] AWS federation status: simulated / not connected
* [ ] proposed AWS role mapping
* [ ] least-privilege explanation
* [ ] trust policy concept
* [ ] permission policy concept
* [ ] CloudTrail evidence concept
* [ ] warning that AWS federation is not enabled yet
* [ ] confirmation that no AWS credentials are stored

Forbidden future page content:

* [ ] real AWS account IDs
* [ ] real AWS role ARNs
* [ ] access keys
* [ ] secret keys
* [ ] session tokens
* [ ] raw tokens
* [ ] private infrastructure names

---

## 18. Future Implementation Readiness

Before future implementation, confirm:

* [ ] Phase 19 spec is committed to `main`
* [ ] Phase 19 checklist is committed to `main`
* [ ] local `main` is clean
* [ ] implementation branch is created from updated `main`
* [ ] branch is not `main`
* [ ] Codex prompt uses the approved spec
* [ ] Codex is told not to work on `main`
* [ ] Codex is told not to add real AWS connections
* [ ] Codex is told not to add AWS SDK calls unless explicitly approved
* [ ] Codex is told not to add AWS credentials
* [ ] Codex is told not to add real AWS account IDs
* [ ] Codex is told not to weaken RBAC

Suggested future branch:

```text
feature/phase-20-aws-federation-readiness
```

Suggested future implementation commit message:

```text
phase-20: add AWS federation readiness foundation
```

---

## 19. Files Codex May Inspect Later

If a future implementation phase is approved, Codex may inspect the whole project.

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
iam-practice-app/src/public/styles.css
```

If actual route filenames differ in the repo, Codex must inspect the current structure and use the existing naming.

---

## 20. Files Codex May Change Later

A future implementation phase may allow Codex to change files related to AWS federation planning display, dashboard links, safe documentation, and local-only readiness pages.

Possible files:

```text
README.md
iam-practice-app/README.md
iam-practice-app/src/routes/apiRoutes.js
iam-practice-app/src/routes/pageRoutes.js
iam-practice-app/src/views/dashboard.html
iam-practice-app/src/views/provider-comparison.html
iam-practice-app/src/views/role-mapping.html
iam-practice-app/src/public/styles.css
```

A future implementation may add new files only if explicitly approved, such as:

```text
iam-practice-app/src/views/aws-federation-readiness.html
iam-practice-app/src/awsFederationPlan.js
```

If Codex adds a new file, it must explain why.

---

## 21. Files Codex Should Avoid Changing Unless Necessary Later

Codex should avoid unnecessary changes to:

```text
iam-practice-app/src/middleware/rbac.js
iam-practice-app/src/middleware/jwtAuth.js
iam-practice-app/src/oidcClient.js
iam-practice-app/src/oidcConfig.js
iam-practice-app/src/scimStore.js
iam-practice-app/src/scimGroupStore.js
iam-practice-app/src/jmlStore.js
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

## 22. Future Testing Plan

A future AWS federation readiness implementation should be tested locally only.

Expected tests:

* [ ] app starts locally
* [ ] app works without `.env`
* [ ] local dummy login still works
* [ ] Entra OIDC still works if locally configured
* [ ] Okta OIDC still works if locally configured
* [ ] dashboard loads
* [ ] provider comparison page loads
* [ ] role mapping page loads
* [ ] AWS federation readiness page loads if added
* [ ] AWS status API returns safe planning-only values if added
* [ ] no AWS SDK call is made
* [ ] no AWS credentials are required
* [ ] no AWS account ID is displayed
* [ ] no AWS role ARN is displayed
* [ ] RBAC still blocks unauthorized access
* [ ] no secrets are committed

---

## 23. Security Review Command For Future Implementation

Before any future implementation commit, run:

```bash
cd /d/identitycore

git status --short

git diff --check

git diff -- . \
  ":(exclude)package-lock.json" \
  | grep -Ei "AWS_ACCESS_KEY|AWS_SECRET|AWS_SESSION|AKIA|ASIA|account id|arn:aws|secret|token|bearer|tenant|client_id|client secret|private key|BEGIN|okta|microsoftonline|ngrok|webhook|DATABASE_URL|\.env"
```

This command may show safe placeholder words. The reviewer must confirm there are no real values.

---

## 24. Screenshot Evidence Plan

Phase 19 does not require screenshots.

Future AWS screenshots must be manually captured, redacted, and reviewed before commit.

Always redact:

* [ ] AWS account ID
* [ ] AWS role ARN
* [ ] AWS user identity details
* [ ] AWS SAML provider ARN
* [ ] AWS OIDC provider ARN
* [ ] access keys
* [ ] session values
* [ ] real user emails
* [ ] private resource names

Do not commit screenshots until explicitly approved.

---

## 25. Phase 19 Local Review Before Commit

Run:

```bash
cd /d/identitycore

git status --short
```

Expected changed files:

```text
docs/Post-Phase-10/Phase 19 — AWS IAM Federation Planning Spec.md
docs/Post-Phase-10/Phase 19 Checklist — AWS IAM Federation Planning.md
```

Confirm:

* [ ] only Phase 19 planning docs changed
* [ ] no app code changed
* [ ] no `.env` file appears
* [ ] no screenshot appears
* [ ] no AWS credential appears
* [ ] no AWS account ID appears

---

## 26. Commit Phase 19 Planning Documents

After review, run:

```bash
cd /d/identitycore

git add "docs/Post-Phase-10/Phase 19 — AWS IAM Federation Planning Spec.md"
git add "docs/Post-Phase-10/Phase 19 Checklist — AWS IAM Federation Planning.md"

git status --short

git commit -m "docs: add phase-19 AWS IAM federation planning"
git push origin main
```

Confirm:

* [ ] both planning docs are committed
* [ ] both planning docs are pushed to `main`
* [ ] no app code is included
* [ ] no secrets are included
* [ ] no screenshots are included

---

## 27. Add Documents To ChatGPT Project Source

After push, add these files to the ChatGPT Project source section:

```text
docs/Post-Phase-10/Phase 19 — AWS IAM Federation Planning Spec.md
docs/Post-Phase-10/Phase 19 Checklist — AWS IAM Federation Planning.md
```

Confirm:

* [ ] Phase 19 spec added to ChatGPT Project source
* [ ] Phase 19 checklist added to ChatGPT Project source
* [ ] ChatGPT can reference Phase 19 documents before Phase 20 begins

---

## 28. Phase 19 Definition Of Done

Phase 19 is complete when:

* [ ] Phase 19 spec exists
* [ ] Phase 19 checklist exists
* [ ] both documents are reviewed
* [ ] both documents are committed to `main`
* [ ] both documents are pushed to GitHub
* [ ] both documents are added to ChatGPT Project source section
* [ ] no app code is changed
* [ ] no `.env` file is committed
* [ ] no AWS account IDs are committed
* [ ] no AWS credentials are committed
* [ ] no screenshots are committed
* [ ] local `main` is clean after commit

---

## Recommended Next Phase After Phase 19

Recommended next phase:

```text
Phase 20 — AWS Federation Readiness Foundation
```

Phase 20 should remain local and safe.

Phase 20 may add a planning-only AWS federation readiness page and safe status API, but it should not connect to AWS yet.

Real AWS lab federation should be deferred until the readiness foundation is complete and safety rules are proven.

---

## Final Phase 19 Principle

Phase 19 should leave the project with one clear message:

```text
AWS federation should be learned through temporary federated IAM roles, least-privilege permissions, explicit trust policies, and CloudTrail evidence — not through long-term access keys or broad administrator access.
```

IdentityCore must teach this safely, incrementally, and without exposing real AWS data.
