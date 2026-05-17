# Phase 20 Checklist — AWS Federation Readiness Foundation

## Purpose

This checklist controls Phase 20 from planning through implementation readiness, local testing, review, commit, push, and merge.

Phase 20 must add a safe local AWS federation readiness foundation without connecting to AWS, using AWS credentials, adding AWS SDK calls, exposing AWS account identifiers, ingesting CloudTrail logs, or weakening IdentityCore safety behavior.

Phase 20 starts as a documentation and planning phase.

Implementation must not begin until the Phase 20 spec and this checklist are committed to `main`, local `main` is clean, and a Phase 20 feature branch is created.

---

## Phase 20 Goal

Create a safe AWS federation readiness foundation inside IdentityCore.

The learner should understand:

* AWS IAM federation concepts
* how Entra ID may later federate users into AWS
* how Okta may later federate users into AWS
* why AWS federation is not the same as IdentityCore local login
* why IdentityCore local roles are separate from AWS IAM roles
* what AWS trust policies do
* what AWS permission policies do
* how least privilege applies to federated AWS roles
* why AWS access keys should not be the main learning path
* why AWS account IDs, role ARNs, provider ARNs, and AWS screenshots must be protected
* how CloudTrail evidence would support future auditability
* why real AWS implementation must wait until a later approved phase

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
* [ ] Phase 19 is committed to `main`
* [ ] Phase 19 was pushed to GitHub
* [ ] Phase 19 planning docs were uploaded to the ChatGPT Project source section
* [ ] no `.env` file is staged or tracked
* [ ] no screenshots are staged
* [ ] no secrets are present
* [ ] no app code is being changed during planning

---

## 2. Planning Documents

Create these documents:

```text
docs/Post-Phase-10/Phase 20 — AWS Federation Readiness Foundation Spec.md
docs/Post-Phase-10/Phase 20 Checklist — AWS Federation Readiness Foundation.md
```

Confirm:

* [ ] Phase 20 spec exists
* [ ] Phase 20 checklist exists
* [ ] spec defines purpose
* [ ] spec defines objective
* [ ] spec defines business scenario
* [ ] spec defines current project status
* [ ] spec defines Phase 20 scope
* [ ] spec defines out of scope
* [ ] spec defines AWS federation readiness model
* [ ] spec explains AWS federation is not IdentityCore login
* [ ] spec explains IdentityCore local roles versus AWS IAM roles
* [ ] spec explains AWS trust policies
* [ ] spec explains AWS permission policies
* [ ] spec explains least privilege
* [ ] spec explains AWS access key avoidance
* [ ] spec explains CloudTrail evidence planning
* [ ] spec defines safe placeholder examples
* [ ] spec defines files Codex may inspect later
* [ ] spec defines files Codex may change later
* [ ] spec defines files Codex should avoid changing later
* [ ] spec defines local testing plan
* [ ] spec defines security review command
* [ ] spec includes Codex handoff prompt
* [ ] checklist is complete

---

## 3. Phase 20 Planning Scope

Phase 20 planning may define:

* [ ] AWS federation readiness page
* [ ] AWS federation readiness route
* [ ] safe local AWS federation readiness API endpoint
* [ ] dashboard card or navigation item
* [ ] AWS federation concept model
* [ ] Entra ID to AWS future flow explanation
* [ ] Okta to AWS future flow explanation
* [ ] SAML-based AWS federation explanation
* [ ] OIDC federation concept explanation where appropriate
* [ ] IdentityCore local role versus AWS IAM role explanation
* [ ] AWS trust policy explanation
* [ ] AWS permission policy explanation
* [ ] least-privilege AWS role examples using placeholders only
* [ ] CloudTrail evidence planning explanation
* [ ] AWS account safety rules
* [ ] AWS screenshot redaction rules
* [ ] AWS access key avoidance warning
* [ ] future AWS implementation branch naming
* [ ] future Codex prompt direction
* [ ] README update plan
* [ ] screenshot evidence plan

---

## 4. Phase 20 Forbidden Work During Planning

Do not change app code during planning.

Do not add:

* [ ] real AWS federation implementation
* [ ] real AWS account connection
* [ ] AWS SDK calls
* [ ] AWS CLI integration
* [ ] AWS access keys
* [ ] AWS secret access keys
* [ ] AWS session tokens
* [ ] AWS credential profiles
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
* [ ] screenshots
* [ ] real user data

---

## 5. Commit Planning Documents First

After creating the Phase 20 spec and checklist, commit them to `main` before implementation work begins.

Run:

```bash
cd /d/identitycore

git status --short
```

Expected new files:

```text
?? "docs/Post-Phase-10/Phase 20 Checklist — AWS Federation Readiness Foundation.md"
?? "docs/Post-Phase-10/Phase 20 — AWS Federation Readiness Foundation Spec.md"
```

Stage the exact files:

```bash
git add "docs/Post-Phase-10/Phase 20 — AWS Federation Readiness Foundation Spec.md"
git add "docs/Post-Phase-10/Phase 20 Checklist — AWS Federation Readiness Foundation.md"

git status --short
```

Expected staged files:

```text
A  "docs/Post-Phase-10/Phase 20 Checklist — AWS Federation Readiness Foundation.md"
A  "docs/Post-Phase-10/Phase 20 — AWS Federation Readiness Foundation Spec.md"
```

Commit and push:

```bash
git commit -m "docs: add phase-20 AWS federation readiness planning"
git push origin main
```

Confirm:

* [ ] both planning docs are committed
* [ ] both planning docs are pushed to `main`
* [ ] no app code changed during planning
* [ ] no `.env` file was committed
* [ ] no AWS identifiers were committed
* [ ] no secrets were committed

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

## 6. Create Phase 20 Feature Branch

Only after the planning docs are committed and `main` is clean, create the implementation branch.

Run:

```bash
cd /d/identitycore

git checkout -b feature/phase-20-aws-federation-readiness

git branch --show-current
git status --short
```

Expected branch:

```text
feature/phase-20-aws-federation-readiness
```

Expected status:

```text
(no output)
```

Confirm:

* [ ] branch is not `main`
* [ ] branch name is correct
* [ ] branch was created from updated `main`
* [ ] Phase 20 implementation will happen only on this feature branch

---

## 7. Pre-Codex Checklist

Before giving Codex the Phase 20 prompt, confirm:

* [ ] Phase 20 spec is committed to `main`
* [ ] Phase 20 checklist is committed to `main`
* [ ] local `main` was clean before branch creation
* [ ] Phase 20 feature branch exists
* [ ] current branch is `feature/phase-20-aws-federation-readiness`
* [ ] Codex must not work on `main`
* [ ] Codex must inspect the project before editing
* [ ] Codex must preserve existing functionality
* [ ] Codex must not rewrite the app from scratch
* [ ] Codex must not add AWS implementation
* [ ] Codex must not add AWS SDK calls
* [ ] Codex must not add AWS credentials
* [ ] Codex must not add real AWS identifiers
* [ ] Codex must not add CloudTrail ingestion
* [ ] Codex must not add Terraform
* [ ] Codex must not add database persistence
* [ ] Codex must not add cloud deployment
* [ ] Codex must not add CI/CD
* [ ] Codex must not add external API calls
* [ ] Codex must not commit `.env`
* [ ] Codex must not commit secrets

---

## 8. Codex Handoff Prompt

Use the approved prompt from:

```text
docs/Post-Phase-10/Phase 20 — AWS Federation Readiness Foundation Spec.md
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
* [ ] routes/endpoints that may be added
* [ ] existing functionality to preserve
* [ ] acceptance criteria
* [ ] testing expectations
* [ ] security guardrails
* [ ] no-secrets requirement
* [ ] required Codex summary
* [ ] suggested commit message

---

## 9. Core Safety Principle

Confirm Phase 20 follows this principle:

```text
External authentication proves identity.
IdentityCore local RBAC controls IdentityCore access.
AWS IAM roles and policies control AWS access.
```

Checklist:

* [ ] local IdentityCore login does not automatically mean AWS access
* [ ] Entra authentication does not automatically mean AWS access
* [ ] Okta authentication does not automatically mean AWS access
* [ ] IdentityCore local admin does not automatically mean AWS admin
* [ ] AWS federation remains readiness-only
* [ ] AWS role mapping is documented as future work
* [ ] AWS role mapping must be explicit later
* [ ] AWS role mapping must be least-privilege based later
* [ ] AWS account IDs must not be committed
* [ ] AWS credentials must not be committed
* [ ] long-term AWS access keys are not introduced

---

## 10. AWS Federation Is Not IdentityCore Login

Confirm documentation and future implementation explain:

* [ ] OIDC/SAML handles sign-in
* [ ] federation trust allows AWS role assumption
* [ ] AWS IAM role policies decide AWS permissions
* [ ] IdentityCore local RBAC still controls IdentityCore pages
* [ ] CloudTrail would prove future AWS activity
* [ ] successful IdentityCore login does not automatically create AWS access
* [ ] AWS access requires separate federation and role authorization design

---

## 11. Local IdentityCore Role vs AWS IAM Role

Confirm Phase 20 clearly separates:

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
* [ ] AWS readiness page explains this clearly

---

## 12. AWS Readiness Page Requirements

If implemented, the AWS readiness page should be available at:

```text
/aws-federation-readiness
```

Confirm page shows:

* [ ] AWS federation is not active yet
* [ ] AWS account connected: false
* [ ] AWS credentials configured: false
* [ ] AWS SDK enabled: false
* [ ] AWS account ID stored: false
* [ ] CloudTrail ingestion enabled: false
* [ ] local-only readiness: true
* [ ] IdentityCore local roles are separate from AWS IAM roles
* [ ] Entra ID may later act as an AWS identity provider
* [ ] Okta may later act as an AWS identity provider
* [ ] SAML is commonly used for AWS console federation
* [ ] OIDC may be used in certain federation scenarios where appropriate
* [ ] trust policies define who can assume AWS roles
* [ ] permission policies define what AWS roles can do
* [ ] CloudTrail would provide future audit evidence
* [ ] access keys are not the main learning path

Suggested badges:

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

## 13. AWS Readiness API Requirements

If implemented, the safe local API endpoint should be:

```text
/api/aws-federation/status
```

Allowed safe response fields:

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

Confirm API does not return:

* [ ] AWS account ID
* [ ] AWS role ARN
* [ ] AWS SAML provider ARN
* [ ] AWS OIDC provider ARN
* [ ] AWS access key ID
* [ ] AWS secret access key
* [ ] AWS session token
* [ ] AWS profile name tied to real credentials
* [ ] raw tokens
* [ ] real CloudTrail event data
* [ ] real user data

---

## 14. Placeholder AWS Role Examples

Allowed placeholder role examples:

```text
ROLE-AWS-SecurityAudit-ReadOnly
ROLE-AWS-CloudEngineer-LimitedDeploy
ROLE-AWS-Finance-BillingReadOnly
ROLE-AWS-IAMAccessAnalyzer-ReadOnly
ROLE-AWS-BreakGlass-EmergencyAdmin-DocumentationOnly
```

Do not use:

* [ ] real AWS role ARNs
* [ ] real AWS account IDs
* [ ] real production role names
* [ ] real customer role names
* [ ] real employer role names

Confirm:

* [ ] examples are clearly placeholders
* [ ] no real AWS identifiers are present
* [ ] broad `AdministratorAccess` is not presented as the default pattern
* [ ] least privilege is emphasized

---

## 15. Trust Policy Learning Example

If a trust policy example is included, it must be placeholder-only.

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

Confirm:

* [ ] example is clearly labeled as placeholder-only
* [ ] no real AWS provider ARN is included
* [ ] no real AWS account ID is included
* [ ] no real AWS role ARN is included
* [ ] no employer/customer policy is copied
* [ ] example is not attached to any real AWS role

---

## 16. Permission Policy Learning Example

If a permission policy example is included, it must be placeholder/documentation-only.

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

Confirm:

* [ ] example is clearly labeled as a learning example only
* [ ] example is not attached to any real AWS role
* [ ] example does not include real resource ARNs
* [ ] example does not include real account IDs
* [ ] documentation says the policy must be reviewed and narrowed before real use

---

## 17. AWS Access Key Avoidance

Confirm Phase 20 warns against building the learning path around long-term AWS access keys.

Correct learning focus:

```text
Federated login → temporary role session → least-privilege permissions → CloudTrail evidence
```

Forbidden learning focus:

```text
Hardcoded AWS access keys → direct AWS API access
```

Checklist:

* [ ] no AWS access keys are created
* [ ] no AWS access keys are requested
* [ ] no AWS access keys are stored
* [ ] no AWS access keys are displayed
* [ ] no AWS SDK calls are added
* [ ] no `.aws/credentials` content is committed
* [ ] no long-term credential workflow is introduced

---

## 18. CloudTrail Evidence Planning

Confirm Phase 20 explains future CloudTrail evidence without ingesting real logs.

CloudTrail planning may explain:

* [ ] who assumed the role
* [ ] when the role session started
* [ ] what role was assumed
* [ ] what AWS actions were attempted
* [ ] whether actions were denied
* [ ] what session context was present
* [ ] how evidence supports access review or investigation

Do not include:

* [ ] real CloudTrail logs
* [ ] real account IDs
* [ ] real role ARNs
* [ ] real usernames
* [ ] real IP addresses
* [ ] real AWS resource names
* [ ] real production event data

---

## 19. Existing Functionality Codex Must Preserve

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
* [ ] Docker runtime remains safe
* [ ] local-only simulator messaging remains clear

---

## 20. Files Codex May Inspect

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

## 21. Files Codex May Change

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

Codex may add route:

```text
/aws-federation-readiness
```

Codex may add API endpoint:

```text
/api/aws-federation/status
```

Any new file must be explained in the Codex summary.

---

## 22. Files Codex Should Avoid Changing Unless Necessary

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

Confirm:

* [ ] package files do not change unless there is a clear reason
* [ ] no new dependencies are added unless absolutely necessary
* [ ] Phase 20 should not require new dependencies
* [ ] authentication logic is not rewritten
* [ ] RBAC middleware is not weakened
* [ ] OIDC/Okta/SCIM/SAML behavior is not broken

---

## 23. Post-Codex Review

After Codex finishes, run:

```bash
cd /d/identitycore

git status --short
```

Review every changed file.

Checklist:

* [ ] changed files make sense for AWS readiness work
* [ ] new AWS readiness view makes sense if added
* [ ] new AWS readiness route makes sense if added
* [ ] new AWS readiness API endpoint returns safe local-only data if added
* [ ] no unexpected backend rewrite
* [ ] no unrelated feature added
* [ ] no AWS SDK dependency added
* [ ] no AWS CLI integration added
* [ ] no `.env` created or staged
* [ ] no secrets added
* [ ] no real AWS account ID added
* [ ] no real AWS role ARN added
* [ ] no AWS credentials added
* [ ] no CloudTrail ingestion added
* [ ] no database added
* [ ] no cloud deployment added
* [ ] no CI/CD added
* [ ] no external API calls added
* [ ] documentation changes make sense

---

## 24. Review Diff Before Running App

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
* [ ] what API endpoint changed or was added
* [ ] whether existing behavior was preserved
* [ ] whether documentation changed
* [ ] whether package files changed
* [ ] whether any new dependency was introduced
* [ ] whether any AWS/secrets pattern appears

If `package.json` or `package-lock.json` changed, confirm why.

No new dependency should be added unless it is clearly necessary and safe.

---

## 25. Local Testing

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
* [ ] dashboard includes AWS federation readiness card or navigation
* [ ] AWS federation readiness page loads
* [ ] page clearly says AWS is not connected
* [ ] page clearly says no AWS credentials are configured
* [ ] page clearly says no AWS account ID is stored
* [ ] page explains local IdentityCore roles versus AWS IAM roles
* [ ] page explains trust policies
* [ ] page explains permission policies
* [ ] page explains least privilege
* [ ] page explains CloudTrail evidence planning
* [ ] page warns against AWS access keys
* [ ] page uses placeholders only
* [ ] page does not show real AWS values
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

Stop the app after testing:

```text
CTRL + C
```

---

## 26. Suggested Manual Browser Test Flow

### Normal User Demo Test

* [ ] open login page
* [ ] sign in with normal/demo user
* [ ] confirm dashboard loads
* [ ] open AWS federation readiness page
* [ ] confirm readiness page is visible to appropriate users if designed that way
* [ ] confirm AWS is shown as not connected
* [ ] confirm no credentials/account IDs are shown
* [ ] open allowed pages
* [ ] attempt restricted/admin page
* [ ] confirm access denied still works
* [ ] logout

### Admin/Security Demo Test

* [ ] sign in with admin/security demo user if available
* [ ] confirm dashboard loads
* [ ] confirm AWS readiness page loads
* [ ] confirm admin-only areas still work
* [ ] confirm local role does not imply AWS admin
* [ ] confirm logout works

### Readiness/Module Test

Test pages that exist in the app:

* [ ] OIDC readiness
* [ ] JWT readiness if present
* [ ] SAML readiness
* [ ] provider comparison
* [ ] role mapping
* [ ] SCIM readiness/users/groups if present
* [ ] JML lifecycle if present
* [ ] audit readiness/evidence if present
* [ ] AWS federation readiness

---

## 27. Security Review Command

Before staging, run from repo root:

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

* [ ] no real AWS credentials
* [ ] no real AWS access keys
* [ ] no real AWS secret keys
* [ ] no real AWS session tokens
* [ ] no real AWS account IDs
* [ ] no real role ARNs
* [ ] no real provider ARNs
* [ ] no private keys
* [ ] no raw tokens
* [ ] no `.env` staged

Important: placeholder strings are allowed only if clearly fake, such as:

```text
ACCOUNT_ID_PLACEHOLDER
ROLE_ARN_PLACEHOLDER
SAML_PROVIDER_PLACEHOLDER
OIDC_PROVIDER_PLACEHOLDER
YOUR_AWS_ACCOUNT_ID
```

---

## 28. Before Commit Checklist

Confirm:

* [ ] current branch is `feature/phase-20-aws-federation-readiness`
* [ ] app was tested locally
* [ ] AWS readiness page loads
* [ ] optional AWS readiness API returns safe local-only data
* [ ] dashboard navigation/card works
* [ ] existing login still works
* [ ] existing RBAC still works
* [ ] existing protected pages still work
* [ ] existing readiness pages still work
* [ ] README updated if needed
* [ ] no `.env` is staged
* [ ] no AWS credentials are staged
* [ ] no AWS account IDs are staged
* [ ] no real AWS ARNs are staged
* [ ] no private keys/certificates are staged
* [ ] no screenshots are staged unless intentionally redacted and approved
* [ ] no unrelated files are staged

Stage changes only after review:

```bash
git add README.md iam-practice-app/README.md iam-practice-app/src/routes/apiRoutes.js iam-practice-app/src/routes/pageRoutes.js iam-practice-app/src/views/dashboard.html iam-practice-app/src/views/aws-federation-readiness.html iam-practice-app/src/public/styles.css
```

If some listed files were not changed or do not exist, Git will report that. Only add files that actually changed.

Then run:

```bash
git status --short
```

Confirm staged files are expected.

---

## 29. Commit and Push

Use suggested commit message:

```bash
git commit -m "phase-20: add AWS federation readiness foundation"
git push origin feature/phase-20-aws-federation-readiness
```

Confirm:

* [ ] commit succeeded
* [ ] push succeeded
* [ ] branch pushed to GitHub
* [ ] no secrets were pushed
* [ ] no AWS identifiers were pushed

---

## 30. Pull Request Review

Open a pull request from:

```text
feature/phase-20-aws-federation-readiness
```

to:

```text
main
```

PR title:

```text
Phase 20: Add AWS Federation Readiness Foundation
```

PR description should include:

* [ ] phase objective
* [ ] files changed
* [ ] routes/endpoints added
* [ ] testing performed
* [ ] safety guardrails
* [ ] confirmation that no AWS connection was added
* [ ] confirmation that no AWS credentials were added
* [ ] confirmation that no AWS account IDs or ARNs were added
* [ ] confirmation that no AWS SDK calls were added

Before merge, confirm:

* [ ] PR targets `main`
* [ ] source branch is correct
* [ ] diff is limited to Phase 20 scope
* [ ] no secrets appear in GitHub diff
* [ ] no AWS identifiers appear in GitHub diff
* [ ] app was locally tested
* [ ] README updates are correct

---

## 31. After Merge

After PR merge, update local main:

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

Confirm:

* [ ] Phase 20 is merged into `main`
* [ ] local `main` is updated
* [ ] working tree is clean
* [ ] feature branch can remain or be deleted later
* [ ] Phase 20 completion is documented in ChatGPT Project source if needed

---

## 32. Manual Screenshot Evidence Plan

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

* [ ] real AWS console
* [ ] AWS account ID
* [ ] AWS role ARN
* [ ] AWS provider ARN
* [ ] AWS credentials
* [ ] CloudTrail logs from a real account
* [ ] real user data
* [ ] tenant IDs
* [ ] client secrets
* [ ] tokens

---

## 33. Phase 20 Completion Criteria

Phase 20 is complete when:

* [ ] planning docs are committed to `main`
* [ ] implementation branch was created from clean `main`
* [ ] AWS readiness foundation was implemented locally
* [ ] app starts locally
* [ ] local dummy login still works
* [ ] dashboard loads
* [ ] AWS readiness page loads
* [ ] optional AWS status API returns safe local-only data
* [ ] existing features still work
* [ ] security review is clean
* [ ] no `.env` was committed
* [ ] no AWS credentials were committed
* [ ] no AWS account IDs were committed
* [ ] no AWS ARNs were committed
* [ ] no AWS SDK calls were added
* [ ] no real AWS connection was added
* [ ] README/documentation is updated if needed
* [ ] feature branch is pushed
* [ ] PR is opened, reviewed, and merged
* [ ] local `main` is clean after merge

---

## Suggested Branch Name

```text
feature/phase-20-aws-federation-readiness
```

---

## Suggested Planning Commit Message

```text
docs: add phase-20 AWS federation readiness planning
```

---

## Suggested Implementation Commit Message

```text
phase-20: add AWS federation readiness foundation
```

---

## Final Phase 20 Rule

Phase 20 is not AWS implementation.

Phase 20 is a safe local readiness layer that prepares the learner to understand AWS federation before real lab AWS work begins.

No real AWS connection should happen in this phase.
