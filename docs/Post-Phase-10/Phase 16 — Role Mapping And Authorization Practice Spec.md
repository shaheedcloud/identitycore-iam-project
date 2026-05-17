# Phase 16 — Role Mapping and Authorization Practice Spec

## Purpose

Phase 16 defines the next safe step after Phase 15 Provider Comparison and Claims Mapping Foundation.

Phase 15 made IdentityCore compare local dummy login, Microsoft Entra ID OIDC login, and Okta OIDC login using safe provider and claim indicators.

Phase 16 moves from comparison into safe role mapping practice.

The purpose of this phase is to teach how identity claims may be evaluated and mapped into local application roles without blindly trusting external identity-provider claims and without automatically granting privileged access.

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

Create a safe role mapping and authorization practice foundation for IdentityCore.

The learner should be able to understand:

* how local dummy users receive local roles
* how Entra-authenticated users may be evaluated for local authorization
* how Okta-authenticated users may be evaluated for local authorization
* why authentication does not equal authorization
* why external claims must be explicitly mapped before affecting access
* why external groups must not automatically become privileged local roles
* how allowlisted mapping protects against privilege escalation
* how deny-by-default role mapping works
* how RBAC remains the final local authorization control
* how a role mapping decision should be documented, explained, and audited

---

## Business Scenario

IdentityCore represents a fictional enterprise IAM learning environment.

In a real enterprise, applications often receive claims from identity providers such as Microsoft Entra ID or Okta. Those claims may include user identifiers, email addresses, display names, group memberships, application roles, or custom attributes.

A poor implementation blindly trusts an external claim and grants privileged access automatically.

A safer implementation uses explicit allowlisted mapping rules. The application evaluates only approved provider claims, maps them to conservative local roles, and then relies on local RBAC to enforce access.

Phase 16 teaches this distinction in a safe practice environment.

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
* local RBAC enforcement
* protected pages
* access denied learning flow
* readiness/status pages
* SCIM simulation
* JML simulation
* SAML simulation
* audit readiness
* no raw token display
* no raw token logging
* local-only simulator behavior

Phase 16 must build on Phase 15 without weakening the safety model.

---

## Phase 16 Scope

Phase 16 may include:

* role mapping documentation
* safe role mapping model
* allowlisted mapping rules
* deny-by-default mapping behavior
* role source explanation
* authorization decision explanation
* admin mapping guardrails
* provider-specific mapping examples
* local role mapping simulator or display
* dashboard link to role mapping practice
* provider comparison page improvements if needed
* claims page improvements if needed
* safe `/role-mapping` page if implemented later
* safe `/api/role-mapping` endpoint if implemented later
* README updates
* future implementation prompt for Codex

---

## Out of Scope

Phase 16 must not add:

* automatic admin mapping from Entra claims
* automatic admin mapping from Okta claims
* automatic group-to-role mapping without allowlisted rules
* production authorization
* production role mapping
* database persistence
* AWS IAM integration
* AWS federation
* real SCIM target
* real SAML identity provider
* cloud deployment
* CI/CD
* external API calls beyond existing OIDC behavior
* raw token display
* raw token logging
* committed `.env`
* committed secrets
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

## Core Design Principle

Phase 16 must enforce this principle:

```text
External authentication proves identity.
Local authorization decides access.
```

Successful Entra ID or Okta login only proves that an external provider authenticated the user.

It must not automatically mean the user gets privileged access inside IdentityCore.

---

## Safe Mapping Model

Phase 16 should use this safe mapping model:

```text
Provider claim → explicit allowlisted mapping rule → local role → RBAC decision
```

This means:

1. The provider authenticates the user.
2. IdentityCore receives safe claim indicators or claim summaries.
3. IdentityCore checks whether a claim matches an explicitly allowed mapping rule.
4. If a rule matches, the user receives the mapped local role.
5. If no rule matches, the user receives a safe default role.
6. RBAC decides whether the user can access a page or API.

---

## Forbidden Mapping Model

Phase 16 must reject this unsafe model:

```text
Any external claim or group → automatic admin access
```

Examples of forbidden behavior:

* Any Entra-authenticated user becomes admin.
* Any Okta-authenticated user becomes admin.
* Any claim named `admin` grants admin access.
* Any group containing the word `admin` grants admin access.
* Any external group name is trusted without explicit allowlisting.
* Any email domain automatically grants privileged access.
* Any provider claim bypasses local RBAC.

---

## Role Mapping Philosophy

Role mapping must be:

* explicit
* conservative
* allowlisted
* documented
* deny-by-default
* easy to explain
* easy to test
* easy to audit
* separate from authentication

Role mapping must not be:

* automatic
* hidden
* broad
* based on unreviewed external groups
* based on raw token data
* based on arbitrary claim names
* capable of bypassing RBAC

---

## Role Mapping Examples

### Safe Example 1 — Default External User

```text
Provider: Microsoft Entra ID Lab
Claim observed: authenticated user present
Mapping rule: no privileged allowlist match
Local role assigned: standard_user
Admin access: false
Reason: external authentication succeeded, but no privileged mapping rule matched
```

### Safe Example 2 — Explicit Security Analyst Mapping

```text
Provider: Microsoft Entra ID Lab
Claim observed: groups claim present
Mapping rule: allowed group value equals GRP-Security-Analyst-ReadOnly
Local role assigned: security_user
Admin access: false
Reason: group is explicitly mapped to security read-only practice role
```

### Safe Example 3 — Explicit Admin Mapping Requiring Future Approval

```text
Provider: Okta Lab
Claim observed: groups claim present
Mapping rule: allowed group value equals OKTA-GRP-IAM-Admins-Privileged
Local role assigned: admin_user
Admin access: true
Required controls: later phase approval, explicit allowlist, documentation, testing, audit event
```

Important: Phase 16 may document this future pattern, but it should not introduce broad or unsafe automatic privileged mapping.

---

## Safe Default Role

If a user authenticates through Entra ID or Okta and no explicit mapping rule matches, IdentityCore should assign a safe default local role.

Recommended safe default:

```text
standard_user
```

This role should not have admin access.

This teaches the correct security posture:

```text
Authenticate first. Authorize conservatively. Escalate only by explicit rule.
```

---

## Role Source Explanation

Phase 16 should clearly show where a local role came from.

Possible role sources:

| Role Source                           | Meaning                                                                     |
| ------------------------------------- | --------------------------------------------------------------------------- |
| Local dummy user object               | Role came from built-in local simulator user data                           |
| Safe default external mapping         | User authenticated through Entra or Okta but no allowlisted mapping matched |
| Explicit allowlisted provider mapping | A documented claim mapping rule assigned the role                           |
| Not mapped                            | No role mapping available or mapping intentionally denied                   |

The app or documentation should make role source visible because IAM engineers must be able to explain why a user received access.

---

## Authorization Decision Explanation

Phase 16 should explain authorization decisions in plain language.

Example:

```text
You authenticated successfully through Okta Lab.
Your local role is standard_user.
This role does not have access to the admin page.
Access was denied because local RBAC requires admin_user.
This demonstrates least privilege and prevents external claims from granting admin access automatically.
```

This turns access denied behavior into a learning moment.

---

## Provider-Specific Mapping Notes

### Local Dummy Login

Local dummy users may already have local roles.

Example:

```text
local admin user → admin_user
local standard user → standard_user
local finance user → finance_user
local security user → security_user
```

Local dummy login is safe because it is part of the simulator.

### Microsoft Entra ID OIDC

Entra ID may return claims such as:

* subject identifier
* preferred username
* name
* email
* tenant/issuer information
* groups if configured
* roles if app roles are configured

Phase 16 must not display raw sensitive values or rely on unreviewed claims for privilege.

Allowed learning behavior:

* show whether important claim types are present
* explain that Entra claims can be mapped later
* keep default role conservative unless allowlisted

### Okta OIDC

Okta may return claims such as:

* subject identifier
* preferred username
* email
* name
* issuer
* groups if configured

Phase 16 must not trust Okta groups automatically.

Allowed learning behavior:

* show whether groups claim is present
* explain that Okta group-to-role mapping requires explicit allowlisting
* keep default role conservative unless allowlisted

---

## Future Role Mapping Page Idea

A future implementation may add a page such as:

```text
/role-mapping
```

This page may show:

* current provider
* current local role
* role source
* mapping decision
* whether a mapping rule matched
* safe default role explanation
* required role for admin access
* authentication vs authorization explanation
* allowlisted mapping model
* forbidden automatic admin mapping warning
* provider-specific mapping examples

The page must not show:

* raw ID tokens
* raw access tokens
* raw refresh tokens
* authorization codes
* client secrets
* real tenant IDs
* real Okta domains
* real client IDs
* raw sensitive claims

---

## Future Role Mapping API Idea

A future implementation may add an endpoint such as:

```text
/api/role-mapping
```

This endpoint may return safe learning data only.

Allowed response fields:

```json
{
  "provider": "Okta Lab",
  "authenticated": true,
  "localRole": "standard_user",
  "roleSource": "safe_default_external_mapping",
  "mappingRuleMatched": false,
  "adminAccessAutomatic": false,
  "rbacStillEnforced": true,
  "rawTokensStored": false,
  "rawTokensDisplayed": false,
  "authorizationDecision": "access_denied_for_admin_area",
  "explanation": "External authentication succeeded, but no allowlisted admin mapping rule matched."
}
```

Forbidden response fields:

* raw tokens
* full raw claims
* authorization code
* authorization header
* client secret
* real tenant ID
* real Okta domain
* real client ID

---

## Mapping Rule Structure

If Phase 16 implementation introduces mapping rules, they should be simple, local, and safe.

Example conceptual structure:

```json
[
  {
    "provider": "local",
    "source": "local_dummy_user",
    "match": "admin",
    "localRole": "admin_user",
    "adminAllowed": true
  },
  {
    "provider": "entra",
    "source": "safe_default",
    "match": "any_authenticated_lab_user",
    "localRole": "standard_user",
    "adminAllowed": false
  },
  {
    "provider": "okta",
    "source": "safe_default",
    "match": "any_authenticated_lab_user",
    "localRole": "standard_user",
    "adminAllowed": false
  }
]
```

Privileged mappings should remain documentation-only unless explicitly approved in a later dedicated phase.

---

## Claim-to-Role Mapping Guardrails

Any future claim-to-role mapping must follow these guardrails:

* no hidden admin mapping
* no wildcard admin mapping
* no automatic group-to-admin mapping
* no raw token parsing in views
* no token logging
* no secrets in mapping files
* no provider-specific real IDs in committed code
* no tenant-specific hardcoding
* no production tenant references
* no mapping that bypasses RBAC middleware
* every mapping rule must be documented
* every privileged mapping rule must explain why it exists
* every privileged mapping rule must be testable

---

## RBAC Relationship

Role mapping does not replace RBAC.

Role mapping only decides what local role the session should carry.

RBAC still decides whether the local role can access a route.

Correct relationship:

```text
Role mapping assigns local role.
RBAC enforces access.
```

Incorrect relationship:

```text
Provider claim bypasses RBAC.
```

Phase 16 must preserve existing RBAC behavior.

---

## Audit and Evidence Concept

A real IAM system should be able to answer:

* who authenticated the user?
* which provider authenticated the user?
* what role was assigned?
* why was that role assigned?
* what mapping rule matched?
* was access granted or denied?
* what control prevented privilege escalation?

Phase 16 may document or prepare these audit ideas, but it must not add external logging, SIEM integration, databases, or cloud services.

---

## Files Codex May Inspect Later

Codex may inspect the whole project to understand current behavior.

Codex should inspect at minimum:

```text
README.md
AGENTS.md
iam-practice-app/README.md
iam-practice-app/package.json
iam-practice-app/.env.example
iam-practice-app/src/app.js
iam-practice-app/src/claims.js
iam-practice-app/src/oidcClient.js
iam-practice-app/src/oidcConfig.js
iam-practice-app/src/routes/apiRoutes.js
iam-practice-app/src/routes/authRoutes.js
iam-practice-app/src/routes/pageRoutes.js
iam-practice-app/src/middleware/rbac.js
iam-practice-app/src/views/dashboard.html
iam-practice-app/src/views/claims.html
iam-practice-app/src/views/provider-comparison.html
iam-practice-app/src/views/oidc-readiness.html
iam-practice-app/src/public/styles.css
```

---

## Files Codex May Change Later

Codex may change files related to role mapping explanation, safe mapping display, provider comparison display, documentation, and existing page presentation.

Possible files:

```text
README.md
iam-practice-app/README.md
iam-practice-app/src/claims.js
iam-practice-app/src/routes/apiRoutes.js
iam-practice-app/src/routes/pageRoutes.js
iam-practice-app/src/views/dashboard.html
iam-practice-app/src/views/claims.html
iam-practice-app/src/views/provider-comparison.html
iam-practice-app/src/views/oidc-readiness.html
iam-practice-app/src/public/styles.css
```

Codex may add a new role mapping view only if the implementation plan explicitly approves it:

```text
iam-practice-app/src/views/role-mapping.html
```

If Codex adds a new file, it must explain why.

---

## Files Codex Should Avoid Changing Unless Necessary

Codex should avoid unnecessary changes to:

```text
iam-practice-app/src/middleware/rbac.js
iam-practice-app/src/middleware/jwtAuth.js
iam-practice-app/src/oidcClient.js
iam-practice-app/src/oidcConfig.js
iam-practice-app/src/scimStore.js
iam-practice-app/src/scimGroupStore.js
iam-practice-app/src/auditStore.js
iam-practice-app/Dockerfile
iam-practice-app/docker-compose.yml
iam-practice-app/package.json
iam-practice-app/package-lock.json
```

Any RBAC change must be manually reviewed.

Any package change must be justified.

No new dependency should be added unless clearly necessary and approved by the phase scope.

---

## Existing Functionality That Must Be Preserved

Phase 16 must preserve:

* app starts locally
* app works without `.env`
* local dummy login works
* Entra OIDC still works if configured
* Okta OIDC still works if configured
* logout works
* dashboard loads
* provider comparison page loads
* claims page loads
* RBAC still works
* protected pages still enforce access
* unauthorized users are blocked
* access denied page still works
* claims/token simulation still works
* OIDC readiness page loads
* JWT readiness page loads if present
* SCIM readiness page loads if present
* JML readiness page loads if present
* SAML readiness page loads if present
* audit readiness page loads if present
* Docker runtime remains safe
* local-only simulator messaging remains clear
* no `.env` is committed
* no secrets are committed

---

## Testing Plan For Future Implementation

When Phase 16 implementation happens, testing should include the following checks.

### Test 1 — App Runs Without Provider Config

Expected:

* app starts without errors
* local dummy login works
* role mapping page or section does not require real Entra or Okta config
* no provider secrets are required
* no page crashes when provider config is missing

### Test 2 — Local Dummy Login Role Mapping

Expected:

* local user can sign in
* role mapping shows local provider context
* role source is local dummy user object
* local role is displayed correctly
* admin access follows existing local RBAC

### Test 3 — Entra OIDC Safe Default Mapping

With local Entra `.env` configured:

Expected:

* Entra login still works
* Entra-authenticated user maps conservatively unless explicitly allowlisted
* role source is safe default external mapping if no rule matches
* Entra-authenticated user does not automatically become admin
* raw tokens are not displayed
* raw tokens are not logged

### Test 4 — Okta OIDC Safe Default Mapping

With local Okta `.env` configured:

Expected:

* Okta login still works
* Okta-authenticated user maps conservatively unless explicitly allowlisted
* role source is safe default external mapping if no rule matches
* Okta-authenticated user does not automatically become admin
* raw tokens are not displayed
* raw tokens are not logged

### Test 5 — RBAC Regression

Expected:

* local admin can still access admin pages
* standard/local user cannot access admin pages
* Entra-authenticated standard user cannot access admin pages unless explicitly mapped in a later approved phase
* Okta-authenticated standard user cannot access admin pages unless explicitly mapped in a later approved phase
* access denied messaging remains clear

### Test 6 — API Safety

If `/api/role-mapping` is added:

Expected:

* endpoint returns safe role mapping summary
* endpoint does not return raw tokens
* endpoint does not return raw claims
* endpoint does not return secrets
* endpoint does not return tenant IDs, Okta domains, client IDs, or authorization codes

---

## Security Review Command

Before committing implementation later, run:

```bash
cd /d/identitycore

git diff --stat

git diff -- iam-practice-app/src/middleware/rbac.js

git diff -- iam-practice-app/package.json

git diff -- iam-practice-app/package-lock.json

git diff -- . ":(exclude)package-lock.json" | grep -Ei "secret|token|password|tenant|client_id|client_secret|aws_access_key|private_key|BEGIN RSA|BEGIN PRIVATE|okta|microsoftonline|login.microsoftonline"
```

Expected:

* no unexpected RBAC changes
* no package changes unless justified
* no `.env`
* no secrets
* no raw tokens
* no tenant IDs
* no real Okta domain
* no client IDs
* no client secrets
* no private keys

Provider words such as `Okta`, `Entra`, `Microsoft`, or `token` may appear in safe documentation or safety warnings. The review must confirm no real sensitive values appear.

---

## Required Documentation Updates

Phase 16 documentation should explain:

* role mapping purpose
* authentication vs authorization
* safe default mapping
* allowlisted mapping model
* forbidden automatic admin mapping
* local RBAC remains the authorization control
* Entra and Okta users do not automatically become admins
* raw tokens are not displayed or logged
* no secrets are committed
* role mapping is local practice only
* production role mapping requires stronger governance, audit, approval, and change control

---

## Manual Screenshots To Capture Later

Screenshots must be captured manually and redacted before committing.

Suggested screenshots:

```text
screenshots/phase-16-role-mapping-authorization-practice/PHASE-16-ROLE-MAPPING-LOCAL-USER.png
screenshots/phase-16-role-mapping-authorization-practice/PHASE-16-ROLE-MAPPING-ENTRA-SAFE-DEFAULT.png
screenshots/phase-16-role-mapping-authorization-practice/PHASE-16-ROLE-MAPPING-OKTA-SAFE-DEFAULT.png
screenshots/phase-16-role-mapping-authorization-practice/PHASE-16-ADMIN-DENIED-FOR-EXTERNAL-STANDARD-USER.png
screenshots/phase-16-role-mapping-authorization-practice/PHASE-16-LOCAL-RBAC-STILL-ENFORCED.png
```

Do not commit screenshots until they are redacted.

Never commit screenshots showing:

* tenant ID
* Okta org domain if sensitive
* client ID
* client secret
* real user email
* raw tokens
* authorization code
* session cookie values

---

## Future Branch Name

Recommended implementation branch:

```text
feature/phase-16-role-mapping-authorization-practice
```

---

## Suggested Future Commit Message

```text
phase-16: add role mapping and authorization practice foundation
```

---

## Codex Handoff Prompt For Future Implementation

Use this only after the Phase 16 spec and checklist are committed to `main`, local `main` is clean, and the Phase 16 feature branch has been created.

```text
You are working on the IdentityCore IAM Project.

Repository: shaheedcloud/identitycore-iam-project
Local folder: D:\identitycore
Current branch: feature/phase-16-role-mapping-authorization-practice

Do not work on main.

Task: Implement Phase 16 — Role Mapping and Authorization Practice Foundation.

Use these source documents:
- docs/Post-Phase-10/Phase 16 — Role Mapping and Authorization Practice Spec.md
- docs/Post-Phase-10/Phase 16 Checklist — Role Mapping and Authorization Practice.md

Goal:
Add a safe role mapping and authorization practice foundation so IdentityCore clearly explains how local, Entra, and Okta authenticated users receive conservative local roles and how local RBAC remains the final authorization control.

The learner should clearly understand:
- authentication does not equal authorization
- provider claims must not automatically grant admin access
- external groups must not be trusted without explicit allowlisting
- local roles need a clear source
- deny-by-default mapping is safer
- RBAC still enforces protected routes

Allowed work:
- Add or improve a role mapping page, such as /role-mapping
- Add or improve a safe role mapping API, such as /api/role-mapping
- Improve provider comparison page if needed
- Improve claims page if needed
- Add safe role source indicators
- Add safe default role mapping explanation
- Add allowlisted mapping model explanation
- Add forbidden automatic admin mapping warning
- Add authentication vs authorization explanation
- Update dashboard navigation/cards if needed
- Update README documentation if needed
- Preserve existing UI style from Phase 11
- Preserve Phase 15 provider comparison behavior
- Preserve Entra and Okta behavior from Phases 13 and 14

Forbidden work:
- Do not add automatic admin mapping from Entra claims
- Do not add automatic admin mapping from Okta claims
- Do not add automatic group-to-role mapping without explicit allowlisted rules
- Do not weaken RBAC
- Do not display raw ID tokens
- Do not display raw access tokens
- Do not display raw refresh tokens
- Do not log raw tokens
- Do not store raw tokens
- Do not add AWS IAM integration
- Do not add real SCIM target
- Do not add database persistence
- Do not add cloud deployment
- Do not add CI/CD
- Do not add external API calls beyond existing OIDC behavior
- Do not add secrets
- Do not add .env
- Do not commit tenant IDs
- Do not commit Okta domains
- Do not commit client IDs
- Do not commit client secrets
- Do not commit screenshots

Files you may inspect:
- README.md
- AGENTS.md
- iam-practice-app/README.md
- iam-practice-app/package.json
- iam-practice-app/.env.example
- iam-practice-app/src/app.js
- iam-practice-app/src/claims.js
- iam-practice-app/src/oidcClient.js
- iam-practice-app/src/oidcConfig.js
- iam-practice-app/src/routes/apiRoutes.js
- iam-practice-app/src/routes/authRoutes.js
- iam-practice-app/src/routes/pageRoutes.js
- iam-practice-app/src/middleware/rbac.js
- iam-practice-app/src/views/dashboard.html
- iam-practice-app/src/views/claims.html
- iam-practice-app/src/views/provider-comparison.html
- iam-practice-app/src/views/oidc-readiness.html
- iam-practice-app/src/public/styles.css

Files you may change:
- README.md
- iam-practice-app/README.md
- iam-practice-app/src/claims.js
- iam-practice-app/src/routes/apiRoutes.js
- iam-practice-app/src/routes/pageRoutes.js
- iam-practice-app/src/views/dashboard.html
- iam-practice-app/src/views/claims.html
- iam-practice-app/src/views/provider-comparison.html
- iam-practice-app/src/views/oidc-readiness.html
- iam-practice-app/src/public/styles.css

You may add:
- iam-practice-app/src/views/role-mapping.html

Only add the new role mapping view if it is the cleanest way to implement Phase 16.

Files to avoid changing unless absolutely necessary:
- iam-practice-app/src/middleware/rbac.js
- iam-practice-app/src/middleware/jwtAuth.js
- iam-practice-app/src/oidcClient.js
- iam-practice-app/src/oidcConfig.js
- iam-practice-app/src/scimStore.js
- iam-practice-app/src/scimGroupStore.js
- iam-practice-app/src/auditStore.js
- iam-practice-app/Dockerfile
- iam-practice-app/docker-compose.yml
- iam-practice-app/package.json
- iam-practice-app/package-lock.json

Acceptance criteria:
- App starts locally
- App works without .env
- Local dummy login works
- Entra OIDC still works if locally configured
- Okta OIDC still works if locally configured
- Logout works
- Dashboard loads
- RBAC still works
- Protected pages still enforce access
- Unauthorized users are still blocked
- Claims/token simulation still works
- Provider comparison page still loads
- Role mapping page or section loads
- Role mapping does not require real provider config
- Safe role source indicators are shown
- Safe default mapping is clearly explained
- External provider users do not automatically become admin
- Local RBAC remains the authorization control
- Raw tokens are not displayed
- Raw tokens are not logged
- README is updated if needed
- No .env file is committed
- No secrets are committed

When done, summarize:
1. Files changed
2. Role mapping improvements made
3. Authorization guardrails added
4. Existing functionality preserved
5. Local test steps
6. Security/no-secrets confirmation
7. Suggested commit message

Suggested commit message:
phase-16: add role mapping and authorization practice foundation
```

---

## Phase 16 Completion Criteria

Phase 16 planning is complete when:

* this spec exists
* the Phase 16 checklist exists
* both documents are committed to `main`
* no app code has changed during planning
* no `.env` is committed
* no secrets are committed
* local `main` is clean

Phase 16 implementation may begin only after planning documents are committed and the feature branch is created.
