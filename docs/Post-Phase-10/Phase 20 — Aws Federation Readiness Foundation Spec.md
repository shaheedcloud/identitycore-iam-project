# Phase 20 — AWS Federation Readiness Foundation Spec

## Purpose

Phase 20 defines the next safe implementation step after Phase 19 AWS IAM Federation Planning.

Phase 19 intentionally did not implement AWS federation. It created the planning foundation for understanding AWS IAM federation, AWS IAM roles, trust policies, permission policies, least privilege, CloudTrail evidence, and the separation between IdentityCore local access and AWS access.

Phase 20 should now turn that planning into a safe local readiness foundation inside IdentityCore.

This phase must not connect to AWS.

This phase must not use AWS credentials.

This phase must not call AWS APIs.

This phase must not implement real federation.

The goal is to help the learner understand AWS federation concepts through a local-only readiness page, documentation, safe examples, and simulator-style explanations before any real AWS lab account is connected in a future phase.

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

Create an AWS federation readiness foundation inside IdentityCore.

The learner should be able to understand:

* what AWS IAM federation means
* how Entra ID or Okta can eventually federate users into AWS
* why AWS federation is different from IdentityCore local login
* how AWS IAM roles differ from IdentityCore local roles
* what an AWS trust policy does
* what an AWS permission policy does
* why least privilege matters for federated AWS roles
* why AWS access keys should not be used as the main learning path
* why AWS account IDs, role ARNs, provider ARNs, and screenshots must be protected
* how CloudTrail would provide future audit evidence
* what would need to be configured later before real AWS federation practice

---

## Business Scenario

IdentityCore represents a fictional enterprise IAM learning environment.

In a real enterprise, users commonly authenticate through a workforce identity provider such as Microsoft Entra ID or Okta, then receive temporary access to AWS by assuming an approved AWS IAM role.

This is safer than giving every user a permanent AWS IAM user with long-term access keys.

Phase 20 should help the learner understand the future enterprise pattern:

```text
User authenticates through Entra ID or Okta
        ↓
Identity provider sends federation context
        ↓
AWS trusts the configured identity provider
        ↓
User assumes an approved AWS IAM role
        ↓
AWS permission policy limits what the role can do
        ↓
CloudTrail records the AWS activity
```

Phase 20 does not build this real federation yet.

Phase 20 creates the local readiness foundation so the learner understands what each AWS federation component means before real implementation.

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
* Phase 19 AWS federation planning documentation

Phase 20 must build on the existing provider comparison, role mapping, SAML/OIDC readiness, SCIM/JML evidence, and audit learning foundation without weakening safety.

---

## Phase 20 North Star

After Phase 20, IdentityCore should include a safe AWS federation readiness learning area that explains:

```text
External provider authentication
        ↓
Federation trust concept
        ↓
AWS IAM role assumption concept
        ↓
Least-privilege permission policy concept
        ↓
CloudTrail evidence concept
        ↓
No real AWS connection yet
```

The learner should be able to open the app locally, navigate to AWS federation readiness, and understand the difference between:

```text
IdentityCore local role
```

and:

```text
AWS IAM federated role
```

The page should clearly show that AWS federation is planned, not active.

---

## Phase 20 Scope

Phase 20 may include:

* AWS federation readiness page
* AWS federation readiness route
* AWS federation readiness API endpoint using safe local/static data
* dashboard card linking to AWS federation readiness
* local-only AWS federation explanation
* IdentityCore local role versus AWS IAM role explanation
* Entra-to-AWS future flow explanation
* Okta-to-AWS future flow explanation
* SAML federation concept explanation
* OIDC federation concept explanation where appropriate
* AWS IAM trust policy explanation
* AWS IAM permission policy explanation
* least-privilege AWS role examples using placeholders only
* CloudTrail evidence planning explanation
* AWS account safety warning
* AWS access key avoidance warning
* README updates
* troubleshooting notes for future AWS federation readiness
* manual screenshot evidence plan using redacted/local-only app screenshots only

---

## Out of Scope

Phase 20 must not add:

* real AWS federation implementation
* real AWS account connection
* AWS SDK calls
* AWS CLI integration
* AWS access keys
* AWS secret access keys
* AWS session tokens
* AWS credential profiles
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

Phase 20 is local-only readiness work.

It must not require a real AWS account.

It must not require AWS credentials.

It must not require AWS SDK packages.

It must not expose AWS identifiers.

Allowed:

* local static readiness data
* placeholder AWS role examples
* placeholder trust policy examples
* placeholder permission policy examples
* local-only UI explanations
* local-only API status response
* fake AWS role names
* fake business roles
* fake provider mapping examples
* README documentation
* redacted local screenshots later if needed

Forbidden:

* real AWS account ID
* real AWS role ARN
* real AWS SAML provider ARN
* real AWS OIDC provider ARN
* AWS access key ID
* AWS secret access key
* AWS session token
* real CloudTrail logs
* real AWS screenshots showing account data
* production AWS account details
* employer AWS account details
* customer AWS account details

---

## Core Design Principle

Phase 20 must preserve this principle:

```text
External authentication proves identity.
IdentityCore local RBAC controls IdentityCore access.
AWS IAM roles and policies control AWS access.
```

A user who logs into IdentityCore through local login, Entra ID, or Okta must not automatically receive AWS access.

An IdentityCore local admin must not automatically become an AWS admin.

AWS access requires a separate explicit federation and role authorization design.

---

## AWS Federation Is Not IdentityCore Login

Phase 20 should make this concept visible in the app and documentation:

```text
OIDC/SAML handles sign-in.
Federation trust allows AWS role assumption.
AWS IAM role policies decide AWS permissions.
IdentityCore local RBAC still controls IdentityCore pages.
CloudTrail proves AWS activity.
```

This means:

* IdentityCore local login is not AWS access.
* Entra ID login to IdentityCore is not AWS access.
* Okta login to IdentityCore is not AWS access.
* AWS access must be explicitly mapped to AWS IAM roles.
* AWS IAM permission policies decide what can be done in AWS.
* CloudTrail would later prove AWS activity.

---

## IdentityCore Local Role vs AWS IAM Role

Phase 20 should clearly separate IdentityCore roles from AWS IAM roles.

| Role Type                  | Example                           | Purpose                                          |
| -------------------------- | --------------------------------- | ------------------------------------------------ |
| IdentityCore local role    | `admin_user`                      | Controls access inside IdentityCore only         |
| IdentityCore practice role | `security_user`                   | Teaches local RBAC behavior                      |
| AWS IAM role               | `ROLE-AWS-SecurityAudit-ReadOnly` | Controls AWS permissions                         |
| AWS federated role session | temporary assumed role session    | Represents temporary AWS access after federation |

Important rule:

```text
Local IdentityCore role does not automatically become an AWS IAM role.
AWS IAM role does not automatically become an IdentityCore local role.
```

Any future mapping must be explicit, documented, conservative, and least-privilege based.

---

## Recommended AWS Readiness Page

Phase 20 may add a page such as:

```text
/aws-federation-readiness
```

This page should explain:

* AWS federation is not active yet
* no AWS account is connected
* no AWS credentials are configured
* no AWS SDK calls are made
* AWS access keys are not used
* local IdentityCore roles are separate from AWS IAM roles
* Entra ID and Okta may later act as external identity providers
* SAML is commonly used for AWS console federation
* OIDC may be used in some workload identity/federation scenarios
* trust policies define who can assume an AWS role
* permission policies define what the AWS role can do
* CloudTrail would provide future audit evidence

Suggested visible badges:

```text
Local Only
AWS Not Connected
Readiness Only
No Credentials
No SDK Calls
No Account ID Stored
Federation Planned
```

---

## Recommended AWS Readiness API

Phase 20 may add a safe local API endpoint such as:

```text
/api/aws-federation/status
```

Allowed response fields:

```json
{
  "awsFederationPlanned": true,
  "awsConnected": false,
  "awsSdkEnabled": false,
  "awsCredentialsConfigured": false,
  "awsAccountIdStored": false,
  "realRoleArnsStored": false,
  "cloudTrailIngestionEnabled": false,
  "localOnly": true,
  "phase": "Phase 20 — AWS Federation Readiness Foundation",
  "learningPurpose": "Explain AWS federation concepts before real implementation."
}
```

Forbidden response fields:

* AWS account ID
* AWS role ARN
* AWS SAML provider ARN
* AWS OIDC provider ARN
* AWS access key ID
* AWS secret access key
* AWS session token
* AWS profile name tied to real credentials
* raw tokens
* real CloudTrail event data
* real user data

---

## AWS Federation Concept Cards

The AWS readiness page may include concept cards.

Recommended cards:

### 1. Identity Provider

Explains that Entra ID or Okta authenticates the user.

### 2. Federation Trust

Explains that AWS must be configured to trust an external provider before role assumption is possible.

### 3. AWS IAM Role

Explains that users assume roles instead of receiving permanent AWS IAM users.

### 4. Trust Policy

Explains who or what may assume a role.

### 5. Permission Policy

Explains what the role can do after it is assumed.

### 6. Least Privilege

Explains that roles should receive only the permissions required for the business task.

### 7. CloudTrail Evidence

Explains that AWS activity should be auditable.

### 8. Access Key Avoidance

Explains why permanent access keys are not the preferred learning path for enterprise federation.

---

## Placeholder AWS Role Examples

Phase 20 may use placeholder AWS role examples only.

Allowed examples:

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

## Least-Privilege Role Model

Phase 20 should explain safer AWS role examples.

| Business Role    | Safer AWS Role Idea                                    | Access Level                              |
| ---------------- | ------------------------------------------------------ | ----------------------------------------- |
| Security Analyst | `ROLE-AWS-SecurityAudit-ReadOnly`                      | Read-only security visibility             |
| Cloud Engineer   | `ROLE-AWS-CloudEngineer-LimitedDeploy`                 | Limited deployment practice permissions   |
| Finance Analyst  | `ROLE-AWS-Finance-BillingReadOnly`                     | Billing and cost visibility only          |
| IAM Reviewer     | `ROLE-AWS-IAMAccessAnalyzer-ReadOnly`                  | IAM visibility and Access Analyzer review |
| Break Glass      | `ROLE-AWS-BreakGlass-EmergencyAdmin-DocumentationOnly` | Documentation-only future emergency model |

Phase 20 must not grant or simulate real AWS permissions.

This is a readiness explanation only.

---

## Placeholder Trust Policy Example

Phase 20 may include a documentation-only trust policy example using placeholders.

Allowed placeholder example:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "SAML_PROVIDER_PLACEHOLDER"
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

Required warning:

```text
This is a placeholder learning example only. It is not connected to a real AWS account.
```

Forbidden:

* real provider ARN
* real account ID
* real role ARN
* real tenant data
* production trust policy copied from an employer or customer account

---

## Placeholder Permission Policy Example

Phase 20 may include a documentation-only permission policy example using safe placeholder concepts.

Allowed placeholder example:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "iam:Get*",
        "iam:List*",
        "access-analyzer:List*",
        "access-analyzer:Get*"
      ],
      "Resource": "*"
    }
  ]
}
```

Required warning:

```text
This policy is a learning example only. It should be reviewed, narrowed, and tested in a dedicated AWS lab account before any real use.
```

Phase 20 must not attach this policy to any real AWS role.

---

## AWS Access Key Avoidance

Phase 20 should clearly warn against building the learning path around long-term AWS access keys.

Correct learning focus:

```text
Federated login → temporary role session → least-privilege permissions → CloudTrail evidence
```

Forbidden learning focus:

```text
Hardcoded AWS access keys → direct AWS API access
```

Phase 20 must not create, request, store, display, or document real AWS access keys.

---

## CloudTrail Evidence Planning

Phase 20 may explain how CloudTrail will be used in a later phase.

CloudTrail should eventually help answer:

* who assumed the role?
* when did the role session start?
* what role was assumed?
* what AWS actions were attempted?
* were any actions denied?
* what source identity or session context was present?
* what evidence supports access review or incident investigation?

Phase 20 must not ingest real CloudTrail logs.

Allowed:

* explanation of CloudTrail purpose
* fake sample event description
* placeholder evidence table
* future evidence plan

Forbidden:

* real CloudTrail logs
* real account IDs
* real role ARNs
* real usernames
* real IP addresses
* real AWS resource names

---

## Recommended UI Sections

The AWS readiness page should include these sections if implemented:

1. **Readiness Summary**

   * AWS federation planned
   * AWS connected: false
   * credentials configured: false
   * account ID stored: false
   * local-only: true

2. **Federation Flow**

   * IdP authentication
   * AWS trust
   * role assumption
   * permission policy
   * CloudTrail evidence

3. **Local Role vs AWS Role**

   * clear table separating role types

4. **Safe Role Examples**

   * placeholder role names only

5. **Trust Policy Learning Example**

   * placeholder-only JSON example

6. **Permission Policy Learning Example**

   * placeholder-only JSON example

7. **CloudTrail Evidence Planning**

   * what future evidence would prove

8. **Safety Guardrails**

   * no account IDs
   * no access keys
   * no AWS SDK
   * no real CloudTrail logs
   * no production AWS

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
iam-practice-app/src/views/oidc-readiness.html
iam-practice-app/src/views/saml-readiness.html
iam-practice-app/src/views/provider-comparison.html
iam-practice-app/src/views/role-mapping.html
iam-practice-app/src/views/audit-readiness.html
iam-practice-app/src/public/styles.css
```

If file names differ in the actual repo, Codex must inspect the existing route and view structure before editing.

---

## Files Codex May Change

Codex may change files related to AWS readiness display, safe local API status, dashboard navigation, documentation, and styling.

Possible files:

```text
README.md
iam-practice-app/README.md
iam-practice-app/src/routes/apiRoutes.js
iam-practice-app/src/routes/pageRoutes.js
iam-practice-app/src/views/dashboard.html
iam-practice-app/src/public/styles.css
```

Codex may add:

```text
iam-practice-app/src/views/aws-federation-readiness.html
```

Codex may add a route for:

```text
/aws-federation-readiness
```

Codex may add an API endpoint for:

```text
/api/aws-federation/status
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
iam-practice-app/src/samlConfig.js
iam-practice-app/src/routes/authRoutes.js
iam-practice-app/package.json
iam-practice-app/package-lock.json
```

Package files should not change unless there is a clear, justified reason.

Phase 20 should not require new dependencies.

---

## Expected User Experience

After Phase 20 implementation, the learner should be able to:

1. Start the app locally.
2. Log in using existing local dummy login.
3. Open the dashboard.
4. See an AWS Federation Readiness card or navigation item.
5. Open the AWS readiness page.
6. See that AWS is not connected.
7. See that no credentials are configured.
8. See that no AWS account ID is stored.
9. Understand local IdentityCore roles versus AWS IAM roles.
10. Understand basic trust policy and permission policy concepts.
11. Understand why AWS access keys are avoided.
12. Understand how CloudTrail evidence would matter later.
13. Confirm existing IdentityCore features still work.

---

## Acceptance Criteria

Phase 20 is complete when:

* app starts locally
* local dummy login still works
* dashboard loads
* dashboard includes AWS federation readiness navigation or card
* AWS federation readiness page loads
* AWS readiness page clearly says AWS is not connected
* AWS readiness page clearly says no AWS credentials are configured
* AWS readiness page clearly says no AWS account ID is stored
* AWS readiness page explains local roles versus AWS IAM roles
* AWS readiness page explains trust policies
* AWS readiness page explains permission policies
* AWS readiness page explains least privilege
* AWS readiness page explains CloudTrail evidence planning
* AWS readiness page warns against access keys
* optional `/api/aws-federation/status` returns safe local-only readiness data
* existing RBAC behavior still works
* existing OIDC readiness still works
* existing SAML readiness still works
* existing provider comparison still works
* existing role mapping still works
* existing SCIM/JML/audit pages still work
* no `.env` file is committed
* no AWS account IDs are committed
* no AWS role ARNs are committed
* no AWS credentials are committed
* no AWS SDK calls are added
* no new external API calls are added
* no real AWS implementation is added
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
* local dummy login works
* dashboard loads
* AWS federation readiness link/card appears
* AWS readiness page loads
* page says AWS is not connected
* page says no credentials are configured
* page says no account ID is stored
* page uses placeholders only
* page does not show any real AWS values
* navigation works
* logout works
* protected pages still enforce access
* access denied still works
* OIDC readiness page still loads
* SAML readiness page still loads
* provider comparison page still loads
* role mapping page still loads
* SCIM/JML/audit pages still load if present

If API endpoint is added, test:

```bash
curl http://localhost:3000/api/aws-federation/status
```

Expected safe values:

```text
awsConnected: false
awsSdkEnabled: false
awsCredentialsConfigured: false
awsAccountIdStored: false
localOnly: true
```

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

Then search for forbidden AWS/secrets patterns:

```bash
grep -RInE "AKIA|ASIA|aws_secret_access_key|aws_access_key_id|AWS_SECRET_ACCESS_KEY|AWS_ACCESS_KEY_ID|session_token|account_id|AccountId|arn:aws|[0-9]{12}|BEGIN PRIVATE KEY|client_secret|access_token|refresh_token|id_token" . \
  --exclude-dir=.git \
  --exclude-dir=node_modules
```

Expected result:

* no real AWS credentials
* no real AWS account IDs
* no real role ARNs
* no private keys
* no raw tokens
* no `.env` staged

Important: placeholder strings are allowed only if clearly fake, such as:

```text
ACCOUNT_ID_PLACEHOLDER
ROLE_ARN_PLACEHOLDER
SAML_PROVIDER_PLACEHOLDER
OIDC_PROVIDER_PLACEHOLDER
YOUR_AWS_ACCOUNT_ID
```

---

## Manual Screenshot Evidence Plan

Screenshots are not required before commit unless the user chooses to capture them manually.

If screenshots are captured later, they must show local-only app pages only.

Allowed screenshot ideas:

```text
PHASE-20-AWS-READINESS-PAGE.png
PHASE-20-AWS-NOT-CONNECTED-BADGE.png
PHASE-20-LOCAL-ROLE-VS-AWS-ROLE.png
PHASE-20-CLOUDTRAIL-EVIDENCE-PLAN.png
```

Screenshots must not show:

* real AWS console
* AWS account ID
* AWS role ARN
* AWS provider ARN
* AWS credentials
* CloudTrail logs from a real account
* real user data
* tenant IDs
* client secrets
* tokens

---

## Suggested Branch Name

Use:

```text
feature/phase-20-aws-federation-readiness
```

---

## Suggested Commit Message

Use:

```text
phase-20: add AWS federation readiness foundation
```

---

## Codex Handoff Prompt

Use this prompt only after:

1. Phase 20 spec is committed to `main`.
2. Phase 20 checklist is committed to `main`.
3. Local `main` is clean.
4. The Phase 20 feature branch is created.
5. The current branch is `feature/phase-20-aws-federation-readiness`.

```text
You are working on the IdentityCore IAM Project.

Repository:
shaheedcloud/identitycore-iam-project

Local folder:
D:\identitycore

Current branch:
feature/phase-20-aws-federation-readiness

Phase:
Phase 20 — AWS Federation Readiness Foundation

Objective:
Add a safe local-only AWS federation readiness foundation to IdentityCore. This should help the learner understand AWS IAM federation concepts before any real AWS implementation.

Important project rule:
IdentityCore is a local-first IAM skill practice app. It is not a production IAM system.

You must not work on main.

You must inspect the project before editing.

Allowed work:
- Add an AWS federation readiness page if it does not already exist.
- Add a route such as /aws-federation-readiness if appropriate.
- Add a safe local API endpoint such as /api/aws-federation/status if appropriate.
- Add dashboard navigation or a dashboard card for AWS federation readiness.
- Explain AWS federation concepts locally using static/safe data only.
- Explain IdentityCore local roles versus AWS IAM roles.
- Explain trust policies.
- Explain permission policies.
- Explain least privilege.
- Explain CloudTrail evidence planning.
- Warn clearly that AWS is not connected.
- Warn clearly that no AWS credentials are configured.
- Warn clearly that no AWS account ID is stored.
- Update README documentation if needed.
- Reuse existing styling patterns.

Forbidden work:
- Do not connect to AWS.
- Do not add AWS SDK calls.
- Do not add AWS CLI integration.
- Do not add AWS credentials.
- Do not add AWS access keys.
- Do not add AWS secret access keys.
- Do not add AWS session tokens.
- Do not add real AWS account IDs.
- Do not add real AWS role ARNs.
- Do not add real AWS SAML provider ARNs.
- Do not add real AWS OIDC provider ARNs.
- Do not add CloudTrail ingestion.
- Do not add Terraform.
- Do not add AWS Organizations.
- Do not add IAM Identity Center.
- Do not add database persistence.
- Do not add cloud deployment.
- Do not add CI/CD.
- Do not add public endpoint exposure.
- Do not add external API calls.
- Do not display raw tokens.
- Do not log raw tokens.
- Do not commit .env.
- Do not add secrets.
- Do not add private keys or certificates.
- Do not use real user data.

Files you may inspect:
- Whole repo as needed.
- README.md
- AGENTS.md
- iam-practice-app/README.md
- iam-practice-app/package.json
- iam-practice-app/.env.example
- iam-practice-app/src/app.js
- iam-practice-app/src/routes/apiRoutes.js
- iam-practice-app/src/routes/pageRoutes.js
- iam-practice-app/src/views/dashboard.html
- iam-practice-app/src/views/oidc-readiness.html
- iam-practice-app/src/views/saml-readiness.html
- iam-practice-app/src/views/provider-comparison.html
- iam-practice-app/src/views/role-mapping.html
- iam-practice-app/src/views/audit-readiness.html
- iam-practice-app/src/public/styles.css

Files you may change:
- README.md
- iam-practice-app/README.md
- iam-practice-app/src/routes/apiRoutes.js
- iam-practice-app/src/routes/pageRoutes.js
- iam-practice-app/src/views/dashboard.html
- iam-practice-app/src/public/styles.css

You may add:
- iam-practice-app/src/views/aws-federation-readiness.html

You may add route:
- /aws-federation-readiness

You may add API endpoint:
- /api/aws-federation/status

The API endpoint must return safe local-only data only. It must not return real AWS identifiers, credentials, tokens, or account values.

Expected safe API fields may include:
- awsFederationPlanned: true
- awsConnected: false
- awsSdkEnabled: false
- awsCredentialsConfigured: false
- awsAccountIdStored: false
- realRoleArnsStored: false
- cloudTrailIngestionEnabled: false
- localOnly: true

Preserve existing functionality:
- app starts locally
- local dummy login works
- logout works
- dashboard loads
- RBAC still works
- protected pages still enforce access
- access denied still works
- OIDC readiness still works
- SAML readiness still works
- provider comparison still works
- role mapping still works
- SCIM/JML/audit pages still work if present
- Docker runtime remains safe
- local-only simulator messaging remains clear

Do not add new dependencies unless absolutely necessary. Phase 20 should not require new dependencies.

Acceptance criteria:
- app starts locally
- dashboard includes AWS federation readiness navigation or card
- AWS federation readiness page loads
- page clearly says AWS is not connected
- page clearly says no credentials are configured
- page clearly says no account ID is stored
- page explains local roles versus AWS IAM roles
- page explains trust policies
- page explains permission policies
- page explains least privilege
- page explains CloudTrail evidence planning
- page warns against AWS access keys
- optional /api/aws-federation/status returns safe local-only data
- no .env is committed
- no AWS account IDs are committed
- no AWS role ARNs are committed
- no AWS credentials are committed
- no AWS SDK calls are added
- no real AWS implementation is added

After making changes, summarize:
1. Files changed.
2. New files added.
3. Routes/endpoints added.
4. How you preserved safety.
5. Testing performed.
6. Any issues or follow-up notes.

Suggested commit message later:
phase-20: add AWS federation readiness foundation
```

---

## Final Phase 20 Rule

Phase 20 is not AWS implementation.

Phase 20 is the safe local readiness layer that prepares the learner to understand AWS federation before real lab AWS work begins.

No real AWS connection should happen in this phase.
