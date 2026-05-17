# Phase 19 — AWS IAM Federation Planning Spec

## Purpose

Phase 19 defines the safe planning path for adding AWS IAM federation practice to IdentityCore.

IdentityCore has already progressed through local simulator work, real Entra ID OIDC local practice, Okta OIDC local practice, provider comparison, role mapping practice, SCIM planning, and local SCIM/JML simulator improvements.

Phase 19 does **not** implement AWS federation yet.

Phase 19 is a planning and safety phase. It defines how IdentityCore should eventually teach AWS IAM federation concepts safely without connecting to a production AWS account, exposing AWS account identifiers, committing secrets, weakening RBAC, or turning the app into a cloud-deployed production identity system.

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

Create a safe AWS IAM federation planning foundation for IdentityCore.

The learner should understand:

* what AWS IAM federation means
* how Entra ID or Okta can act as an external identity provider for AWS access
* how authentication differs from AWS authorization
* how AWS IAM roles differ from local IdentityCore roles
* how SAML or OIDC federation can be used for AWS console or role access
* why AWS account IDs must not be exposed in public portfolio evidence
* why AWS access keys should not be used for this federation learning path
* why long-term AWS credentials are risky
* how AWS IAM roles, trust policies, permission policies, and session context relate
* how least privilege applies to federated AWS roles
* what should be simulated first before connecting a real AWS lab account
* what documentation must exist before any future AWS implementation

---

## Business Scenario

IdentityCore represents a fictional enterprise IAM learning environment.

In a real enterprise, users do not usually receive permanent AWS IAM users with long-term access keys for daily cloud access. A safer enterprise pattern is to authenticate users through a central identity provider such as Microsoft Entra ID or Okta, then allow them to assume specific AWS IAM roles with limited permissions.

This phase prepares IdentityCore to teach that model.

The learner should understand that AWS federation involves multiple layers:

```text
Identity Provider Authentication
        ↓
Federation Trust
        ↓
AWS IAM Role Assumption
        ↓
Permission Policy Evaluation
        ↓
CloudTrail Evidence
```

A safe design separates:

```text
Authentication: Who signed in through Entra ID or Okta?
Federation: Which provider does AWS trust?
Role assumption: Which AWS role can this identity assume?
Authorization: What does that AWS role allow?
Governance: Who approved this access and how is it reviewed?
Audit: What evidence proves the access occurred?
```

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
* Docker runtime support
* no raw token display
* no raw token logging
* local-only simulator behavior

Phase 19 must build on the existing provider comparison, role mapping, SAML/OIDC readiness, and audit learning foundation without weakening safety.

---

## Phase 19 North Star

Phase 19 should prepare IdentityCore to eventually teach this AWS federation flow:

```text
User authenticates through Entra ID or Okta
        ↓
Identity provider sends federation assertion or token
        ↓
AWS trusts the configured identity provider
        ↓
User is allowed to assume an approved AWS IAM role
        ↓
AWS permission policy controls what the user can do
        ↓
CloudTrail records the activity
        ↓
IdentityCore explains the access decision and evidence
```

Phase 19 only plans this safely.

No AWS federation code should be added yet.

---

## Phase 19 Scope

Phase 19 may include planning for:

* AWS federation concept model
* Entra ID to AWS federation practice planning
* Okta to AWS federation practice planning
* SAML-based AWS federation planning
* OIDC-based AWS federation planning where appropriate
* AWS IAM role model planning
* AWS trust policy explanation
* AWS permission policy explanation
* least-privilege role design
* AWS role mapping examples
* AWS access decision explanation
* CloudTrail evidence planning
* AWS account safety rules
* AWS screenshot redaction rules
* AWS lab account safety requirements
* future AWS federation simulator page idea
* future AWS federation readiness page idea
* future implementation branch naming
* future Codex implementation prompt direction
* README update plan
* screenshot evidence plan

---

## Out of Scope

Phase 19 must not add:

* real AWS federation implementation
* real AWS account connection
* AWS access keys
* AWS secret access keys
* AWS CLI credential profiles
* real AWS IAM role ARNs
* real AWS account IDs
* real AWS SAML provider ARNs
* real AWS OIDC provider ARNs
* production AWS access
* AWS Organizations implementation
* AWS IAM Identity Center implementation
* Terraform implementation
* cloud deployment
* database persistence
* CI/CD
* public endpoint exposure
* external API calls to AWS
* AWS SDK calls
* CloudTrail ingestion
* SIEM integration
* webhook integration
* email integration
* scheduled tasks
* background jobs
* production authorization
* raw token display
* raw token logging
* committed `.env`
* committed secrets
* private keys
* certificates
* unredacted screenshots
* real user data

---

## Critical Safety Rule

AWS federation practice must use only lab environments.

Never use:

* employer AWS account
* customer AWS account
* production AWS account
* production AWS IAM roles
* production AWS IAM users
* production AWS account IDs
* production AWS SAML/OIDC providers
* production Entra tenant
* production Okta tenant
* real business users
* long-term AWS access keys for app behavior

Allowed later only after explicit approval:

* dedicated AWS lab account
* fake users
* fake groups
* fake roles
* placeholder AWS role examples
* local documentation
* safe diagrams
* redacted screenshots
* documentation-only AWS trust policy examples
* documentation-only AWS permission policy examples

---

## AWS Federation Concept Model

AWS federation allows users authenticated outside AWS to access AWS resources by assuming IAM roles.

The common enterprise pattern is:

```text
User → Entra ID or Okta → Federation trust → AWS IAM role → AWS permissions
```

Important components:

| Component                 | Meaning                                            |
| ------------------------- | -------------------------------------------------- |
| Identity Provider         | Entra ID or Okta authenticates the user            |
| Federation Protocol       | SAML or OIDC passes identity context to AWS        |
| AWS IAM Identity Provider | AWS-side trust object for the external provider    |
| IAM Role                  | AWS identity the user assumes after federation     |
| Trust Policy              | Defines who is allowed to assume the role          |
| Permission Policy         | Defines what the role can do in AWS                |
| Session                   | Temporary AWS access granted after role assumption |
| CloudTrail                | Audit evidence showing AWS API activity            |

---

## AWS Federation Is Not Local Login

Phase 19 must make this clear:

```text
OIDC/SAML handles sign-in.
Federation trust allows role assumption.
AWS IAM role policies decide AWS permissions.
IdentityCore local RBAC still controls IdentityCore pages.
CloudTrail proves AWS activity.
```

A user who logs into IdentityCore through Entra ID or Okta should not automatically receive AWS access.

A user with an IdentityCore local admin role should not automatically receive AWS admin access.

AWS access requires a separate explicit federation and role authorization design.

---

## AWS Role Mapping Relationship

AWS role mapping should follow this safe model:

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

Forbidden model:

```text
Any external admin claim → AWS AdministratorAccess
```

Phase 19 must preserve the principle introduced in earlier phases:

```text
External authentication proves identity.
Local authorization decides IdentityCore access.
AWS IAM decides AWS access.
```

---

## Local IdentityCore Role vs AWS IAM Role

Phase 19 should document the difference between local IdentityCore roles and AWS IAM roles.

| Role Type                  | Example                           | Purpose                                          |
| -------------------------- | --------------------------------- | ------------------------------------------------ |
| IdentityCore local role    | `admin_user`                      | Controls access inside IdentityCore only         |
| IdentityCore practice role | `security_user`                   | Teaches local RBAC behavior                      |
| AWS IAM role               | `ROLE-AWS-SecurityAudit-ReadOnly` | Controls AWS permissions                         |
| AWS federated role session | temporary assumed role session    | Represents temporary AWS access after federation |

A local IdentityCore role must not automatically become an AWS IAM role.

A future mapping may show a proposed relationship, but it must be explicit, documented, conservative, and least-privilege based.

---

## Recommended AWS Lab Role Examples

Phase 19 may define fake or placeholder AWS roles only.

Allowed placeholder examples:

```text
ROLE-AWS-SecurityAudit-ReadOnly
ROLE-AWS-CloudEngineer-LimitedDeploy
ROLE-AWS-Finance-BillingReadOnly
ROLE-AWS-IAMAccessAnalyzer-ReadOnly
ROLE-AWS-BreakGlass-EmergencyAdmin-DocumentationOnly
```

Do not use:

* real AWS role ARNs
* real AWS account IDs
* real production role names
* real customer role names
* real employer role names

---

## Least Privilege Planning

Phase 19 should prepare a least-privilege mindset for AWS federation.

A good AWS federation design should avoid giving broad permissions by default.

Examples:

| Business Role     | Safer AWS Role Idea                                    | Access Level                               |
| ----------------- | ------------------------------------------------------ | ------------------------------------------ |
| Security Analyst  | `ROLE-AWS-SecurityAudit-ReadOnly`                      | Read-only security visibility              |
| Cloud Engineer    | `ROLE-AWS-CloudEngineer-LimitedDeploy`                 | Limited deployment actions                 |
| Finance Analyst   | `ROLE-AWS-Finance-BillingReadOnly`                     | Billing read-only                          |
| IAM Engineer      | `ROLE-AWS-IAMAccessAnalyzer-ReadOnly`                  | IAM review and analysis                    |
| Break-glass Admin | `ROLE-AWS-BreakGlass-EmergencyAdmin-DocumentationOnly` | Emergency design only, not implemented now |

Avoid:

```text
Everyone → AdministratorAccess
```

---

## AWS Trust Policy Planning

A future AWS federation lab may require an AWS IAM role trust policy.

Phase 19 may include documentation-only examples with placeholders.

Safe placeholder example:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::ACCOUNT_ID_PLACEHOLDER:saml-provider/PROVIDER_PLACEHOLDER"
      },
      "Action": "sts:AssumeRoleWithSAML",
      "Condition": {
        "StringEquals": {
          "SAML:aud": "https://signin.aws.amazon.com/saml"
        }
      }
    }
  ]
}
```

This is documentation-only. It must not include a real AWS account ID or real provider ARN.

---

## AWS Permission Policy Planning

A future AWS federation lab may include least-privilege permission policy examples.

Safe placeholder example for read-only security learning:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "cloudtrail:LookupEvents",
        "access-analyzer:ListAnalyzers",
        "access-analyzer:ListFindings",
        "iam:GetAccountSummary",
        "iam:ListRoles",
        "iam:ListPolicies"
      ],
      "Resource": "*"
    }
  ]
}
```

This is a learning example only. Future implementation must validate permissions carefully before any real AWS use.

---

## Entra ID To AWS Federation Planning

A future phase may plan or simulate Entra ID as the identity provider for AWS federation.

Possible future concepts:

* Entra enterprise application for AWS
* SAML assertion from Entra ID to AWS
* group-based assignment to AWS roles
* app role or claim mapping
* least-privilege role assignment
* CloudTrail evidence after role assumption

Phase 19 must not implement this yet.

Phase 19 may document the expected future flow:

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

---

## Okta To AWS Federation Planning

A future phase may plan or simulate Okta as the identity provider for AWS federation.

Possible future concepts:

* Okta AWS Account Federation app
* SAML assertion from Okta to AWS
* Okta group assignment to AWS roles
* role attribute statements
* least-privilege role assignment
* CloudTrail evidence after role assumption

Phase 19 must not implement this yet.

Phase 19 may document the expected future flow:

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

---

## AWS Account Safety Rules

AWS account identifiers must be treated as sensitive for this public portfolio project.

Never commit:

* AWS account ID
* AWS role ARN
* AWS SAML provider ARN
* AWS OIDC provider ARN
* AWS access key ID
* AWS secret access key
* AWS session token
* AWS CLI profile with real values
* CloudTrail logs containing real account IDs
* screenshots showing real account IDs
* screenshots showing real role ARNs

Allowed placeholders:

```text
ACCOUNT_ID_PLACEHOLDER
ROLE_ARN_PLACEHOLDER
SAML_PROVIDER_PLACEHOLDER
OIDC_PROVIDER_PLACEHOLDER
AWS_LAB_ACCOUNT_PLACEHOLDER
```

---

## AWS Access Key Rule

Phase 19 should explicitly avoid AWS access keys as the main learning path.

Do not build IdentityCore around long-term AWS access keys.

Safer learning focus:

```text
Federated login → temporary role session → least-privilege permissions → CloudTrail evidence
```

Long-term access keys are risky because they can be leaked, committed, copied, reused, or left active after they are no longer needed.

---

## CloudTrail Evidence Planning

Future AWS federation practice should include CloudTrail evidence, but Phase 19 only plans it.

CloudTrail evidence should eventually answer:

* who assumed the role?
* which provider was used?
* which AWS role was assumed?
* when did the session occur?
* what AWS actions were performed?
* was access denied or allowed?
* did permissions align to least privilege?

CloudTrail evidence must not expose:

* real AWS account IDs
* real role ARNs
* real user emails
* access keys
* session tokens
* private resource names
* production activity

---

## Future AWS Federation Simulator Idea

A future implementation may add a page such as:

```text
/aws-federation-readiness
```

Or:

```text
/aws-role-mapping
```

A safe simulator page may show:

* provider selected: Local / Entra / Okta
* AWS federation status: simulated / not connected
* proposed AWS role mapping
* least-privilege explanation
* trust policy concept
* permission policy concept
* CloudTrail evidence concept
* warnings that AWS federation is not enabled yet
* confirmation that no AWS credentials are stored

The page must not show:

* real AWS account IDs
* real AWS role ARNs
* access keys
* secret keys
* session tokens
* raw tokens
* private infrastructure names

---

## Future AWS Federation API Idea

A future implementation may add a safe local-only endpoint such as:

```text
/api/aws-federation/status
```

Allowed safe response example:

```json
{
  "awsFederationEnabled": false,
  "mode": "planning_only",
  "realAwsConnection": false,
  "awsCredentialsStored": false,
  "awsAccountIdStored": false,
  "providerOptions": ["Microsoft Entra ID Lab", "Okta Lab"],
  "exampleRoles": [
    "ROLE-AWS-SecurityAudit-ReadOnly",
    "ROLE-AWS-CloudEngineer-LimitedDeploy",
    "ROLE-AWS-Finance-BillingReadOnly"
  ],
  "corePrinciple": "Federation authenticates access to AWS roles; AWS IAM policies authorize AWS actions."
}
```

Forbidden response fields:

* real AWS account ID
* real role ARN
* AWS access key ID
* AWS secret access key
* AWS session token
* raw SAML assertion
* raw OIDC token
* private infrastructure data

---

## Architecture Decision To Capture Later

Phase 19 should prepare an Architecture Decision Record later, but does not need to implement it immediately.

Possible ADR:

```text
ADR-00X — Use Federated AWS IAM Roles Instead of Long-Term AWS IAM Users
```

Decision idea:

```text
IdentityCore will teach AWS access through federated IAM roles and temporary sessions instead of long-term IAM users and access keys.
```

Rationale:

* reduces long-term credential risk
* aligns with enterprise identity patterns
* supports centralized identity provider control
* supports least privilege
* supports auditability through CloudTrail

---

## Documentation Deliverables

Phase 19 planning should produce:

```text
docs/Post-Phase-10/Phase 19 — AWS IAM Federation Planning Spec.md
docs/Post-Phase-10/Phase 19 Checklist — AWS IAM Federation Planning.md
```

Optional later documentation:

```text
docs/Post-Phase-10/ADR — Federated AWS IAM Roles Instead of Long-Term IAM Users.md
docs/Post-Phase-10/AWS Federation Lab Notes.md
docs/Post-Phase-10/AWS Federation Screenshot Redaction Guide.md
```

Do not create optional documents until explicitly approved.

---

## Files Codex May Inspect Later

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

## Files Codex May Change Later

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

## Files Codex Should Avoid Changing Unless Necessary Later

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

No package changes should be made unless a later phase explicitly approves them.

---

## Future Implementation Readiness

Before any AWS federation implementation begins, confirm:

* Phase 19 spec is committed to `main`
* Phase 19 checklist is committed to `main`
* local `main` is clean
* implementation branch is created from updated `main`
* branch is not `main`
* Codex prompt uses the approved spec
* Codex is told not to work on `main`
* Codex is told not to add real AWS connections
* Codex is told not to add AWS SDK calls unless explicitly approved
* Codex is told not to add AWS credentials
* Codex is told not to add real AWS account IDs
* Codex is told not to weaken RBAC

Suggested future branch:

```text
feature/phase-20-aws-federation-readiness
```

Suggested future implementation commit message:

```text
phase-20: add AWS federation readiness foundation
```

---

## Testing Plan For Future Implementation

A future AWS federation readiness implementation should be tested locally only.

Expected tests:

* app starts locally
* app works without `.env`
* local dummy login still works
* Entra OIDC still works if locally configured
* Okta OIDC still works if locally configured
* dashboard loads
* provider comparison page loads
* role mapping page loads
* AWS federation readiness page loads if added
* AWS status API returns safe planning-only values if added
* no AWS SDK call is made
* no AWS credentials are required
* no AWS account ID is displayed
* no AWS role ARN is displayed
* RBAC still blocks unauthorized access
* no secrets are committed

---

## Security Review Command For Future Implementation

Before any future commit, run:

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

## Screenshot Evidence Plan

Phase 19 does not require screenshots.

Future AWS screenshots must be manually captured, redacted, and reviewed before commit.

Always redact:

* AWS account ID
* AWS role ARN
* AWS user identity details
* AWS SAML provider ARN
* AWS OIDC provider ARN
* access keys
* session values
* real user emails
* private resource names

Do not commit screenshots until explicitly approved.

---

## Recommended Next Phase After Phase 19

Recommended next phase:

```text
Phase 20 — AWS Federation Readiness Foundation
```

Phase 20 should remain local and safe.

It may add a planning-only AWS federation readiness page and safe status API, but it should not connect to AWS yet.

Real AWS lab federation should be deferred until the readiness foundation is complete and safety rules are proven.

---

## Phase 19 Definition Of Done

Phase 19 is complete when:

* Phase 19 spec exists
* Phase 19 checklist exists
* both documents are reviewed
* both documents are committed to `main`
* both documents are pushed to GitHub
* both documents are added to the ChatGPT Project source section
* no app code is changed
* no `.env` file is committed
* no AWS account IDs are committed
* no AWS credentials are committed
* no screenshots are committed
* local `main` is clean after commit

---

## Final Phase 19 Principle

Phase 19 should leave the project with one clear message:

```text
AWS federation should be learned through temporary federated IAM roles, least-privilege permissions, explicit trust policies, and CloudTrail evidence — not through long-term access keys or broad administrator access.
```

IdentityCore must teach this safely, incrementally, and without exposing real AWS data.
