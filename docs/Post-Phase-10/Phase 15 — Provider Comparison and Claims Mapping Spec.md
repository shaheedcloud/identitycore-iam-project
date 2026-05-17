# Phase 15 — Provider Comparison and Claims Mapping Spec

## Purpose

Phase 15 defines the next safe step after Entra ID OIDC local practice and Okta OIDC local practice.

The purpose of this phase is to help the learner compare identity information from:

* Local dummy login
* Microsoft Entra ID OIDC login
* Okta OIDC login

This phase should make authentication source, claim presence, provider context, and authorization behavior easier to understand.

IdentityCore must remain local-first, safe, no-secrets, and skill-practice focused.

---

## Objective

Create a safe provider comparison and claims mapping foundation.

The learner should be able to understand:

* which provider authenticated the user
* what claim fields are present
* what claim fields are missing
* how Entra and Okta claims differ
* how local dummy identity differs from real provider identity
* why authentication is not the same as authorization
* why external claims must not automatically grant admin access
* what a future safe claim-to-role mapping design might look like

---

## Business Scenario

IdentityCore represents a fictional enterprise IAM learning environment.

In a real enterprise, applications may receive identity claims from different identity providers. IAM engineers must understand what those claims mean before using them for authorization decisions.

A bad design blindly trusts external claims and accidentally grants privileged access.

A good design compares claims, documents mapping rules, and applies least privilege before granting access.

---

## Current Project Status

IdentityCore currently supports:

* local dummy login
* Entra ID OIDC local practice
* Okta OIDC local practice
* safe provider context
* safe claim summary behavior
* RBAC enforcement
* readiness/status pages
* no raw token display
* no raw token logging
* local-only simulator behavior

---

## Phase 15 Scope

Phase 15 may include:

* provider comparison documentation
* claims comparison documentation
* safe claim mapping design
* dashboard or claims page improvements if later implemented
* provider comparison table
* claim presence indicators
* role source explanation
* authorization explanation
* admin mapping warning
* README updates
* future implementation plan

---

## Out of Scope

Phase 15 must not add:

* automatic admin mapping from Entra claims
* automatic admin mapping from Okta claims
* automatic group-to-role mapping
* database persistence
* AWS IAM integration
* real SCIM target
* production authorization
* production deployment
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

## Provider Comparison Model

The comparison should eventually show:

| Field                 | Local Dummy Login       | Entra ID OIDC              | Okta OIDC                  |
| --------------------- | ----------------------- | -------------------------- | -------------------------- |
| Provider              | Local simulator         | Microsoft Entra ID Lab     | Okta Lab                   |
| Authentication source | Local app session       | External OIDC provider     | External OIDC provider     |
| Subject claim         | Simulated/local         | Present if returned        | Present if returned        |
| Username/email        | Local test user         | Present if returned        | Present if returned        |
| Display name          | Local test user         | Present if returned        | Present if returned        |
| Issuer                | None/simulated          | Microsoft issuer           | Okta issuer                |
| Audience              | None/simulated          | Present if returned        | Present if returned        |
| Groups claim          | Local role only         | Present only if configured | Present only if configured |
| Local role source     | Local dummy user object | Safe default mapping       | Safe default mapping       |
| Admin access          | Local RBAC only         | Not automatic              | Not automatic              |
| Raw tokens stored     | False                   | False                      | False                      |
| Raw tokens displayed  | False                   | False                      | False                      |

---

## Claims Mapping Design Rule

Phase 15 may document future claim mapping, but it must not blindly trust external claims.

Safe rule:

```text
External authentication proves identity.
Local authorization decides access.
```

Allowed future mapping concept:

```text
Provider claim → explicit allowlisted mapping → local role → RBAC decision
```

Forbidden mapping concept:

```text
Any external group or claim → automatic admin access
```

This means Phase 15 may explain or prepare a mapping model, but it must not implement automatic privileged access from Entra ID claims, Okta claims, Entra groups, or Okta groups.

---

## Safe Claim Display Rules

Only safe summaries should be displayed.

Allowed safe indicators:

* provider name
* subject present: yes/no
* email present: yes/no
* display name present: yes/no
* groups claim present: yes/no
* issuer present: yes/no
* audience present: yes/no
* local role
* role source
* admin mapping status
* raw token stored: false
* raw token displayed: false

Not allowed:

* raw ID token
* raw access token
* raw refresh token
* authorization code
* full authorization header
* client secret
* real tenant ID
* real Okta domain
* real client ID
* unredacted user identity values in committed evidence

---

## Future UI Idea

A future implementation may add a page such as:

```text
/provider-comparison
```

Or improve the existing claims page to show:

* current session provider
* safe claim presence summary
* local role assigned
* role source
* why the user did or did not receive admin access
* comparison table for Local vs Entra vs Okta
* warning that real role mapping comes later
* explanation that authentication does not equal authorization
* confirmation that raw tokens are not stored or displayed

---

## Authentication vs Authorization Explanation

Authentication answers:

```text
Who are you?
```

Authorization answers:

```text
What are you allowed to access?
```

Phase 15 should make this distinction obvious in the app and documentation.

A user may successfully authenticate through Entra ID or Okta and still receive only a safe default local role.

Successful external authentication must not automatically mean admin access.

Local RBAC remains the authorization control until a later dedicated role-mapping phase is designed and implemented.

---

## Future Implementation Readiness

Before Codex implementation begins, the implementation plan should define:

* branch name
* files Codex may inspect
* files Codex may change
* files Codex should avoid changing
* acceptance criteria
* testing plan
* security review command
* suggested commit message

Suggested future branch:

```text
feature/phase-15-provider-comparison-claims-mapping
```

Suggested future commit message:

```text
phase-15: add provider comparison and claims mapping foundation
```

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
iam-practice-app/src/routes/pages.js
iam-practice-app/src/views/login.html
iam-practice-app/src/views/dashboard.html
iam-practice-app/src/views/claims.html
iam-practice-app/src/views/oidc-readiness.html
iam-practice-app/src/public/styles.css
```

---

## Files Codex May Change Later

Codex may change files related to provider comparison display, safe claim summaries, documentation, and existing page presentation.

Possible files:

```text
README.md
iam-practice-app/README.md
iam-practice-app/src/claims.js
iam-practice-app/src/routes/apiRoutes.js
iam-practice-app/src/routes/pages.js
iam-practice-app/src/views/dashboard.html
iam-practice-app/src/views/claims.html
iam-practice-app/src/views/oidc-readiness.html
iam-practice-app/src/public/styles.css
```

Codex may add a new provider comparison view only if the implementation plan explicitly approves it, such as:

```text
iam-practice-app/src/views/provider-comparison.html
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

Any RBAC change must be reviewed manually.

Any package change must be justified.

No new dependency should be added unless clearly necessary and approved by the phase scope.

---

## Existing Functionality That Must Be Preserved

Phase 15 must preserve:

* app starts locally
* app works without `.env`
* local dummy login works
* Entra OIDC still works if configured
* Okta OIDC still works if configured
* logout works
* dashboard loads
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

When Phase 15 implementation happens, testing should include:

### Test 1 — App Runs Without Provider Config

Expected:

* app starts without errors
* local dummy login works
* provider comparison does not require real Entra or Okta config
* no provider secrets are required
* no page crashes when provider config is missing

### Test 2 — Local Dummy Login Comparison

Expected:

* local user can sign in
* provider comparison shows Local simulator context
* local role source is clearly explained
* admin access is controlled only by local RBAC

### Test 3 — Entra OIDC Comparison

With local Entra `.env` configured:

Expected:

* Entra login still works
* provider comparison shows Microsoft Entra ID Lab context
* safe claim indicators display presence only or masked values
* Entra-authenticated user does not automatically become admin
* raw tokens are not displayed
* raw tokens are not logged

### Test 4 — Okta OIDC Comparison

With local Okta `.env` configured:

Expected:

* Okta login still works
* provider comparison shows Okta Lab context
* safe claim indicators display presence only or masked values
* Okta-authenticated user does not automatically become admin
* raw tokens are not displayed
* raw tokens are not logged

### Test 5 — RBAC Regression

Expected:

* local admin can still access admin pages
* standard/local user cannot access admin pages
* Entra-authenticated user cannot access admin pages unless explicitly allowed by existing safe local RBAC
* Okta-authenticated user cannot access admin pages unless explicitly allowed by existing safe local RBAC
* access denied page still works

### Test 6 — Readiness Pages Regression

Expected:

* `/oidc-readiness` loads
* `/jwt-readiness` loads if present
* `/scim-readiness` loads if present
* `/saml-readiness` loads if present
* `/jml-readiness` loads if present
* `/audit-readiness` loads if present
* local-only simulator messaging remains clear

---

## Security Review Command For Future Implementation

Before committing Phase 15 implementation, run:

```bash
cd /d/identitycore
git status --short
git diff -- . ":(exclude)package-lock.json" | grep -Ei "secret|token|password|tenant|client_id|client_secret|okta|access_token|refresh_token|id_token|authorization|private_key|BEGIN RSA|BEGIN PRIVATE"
```

Safety words in documentation are acceptable.

Real values are not acceptable.

Confirm before commit:

* no `.env`
* no `.env.local`
* no `.env.production`
* no real tenant ID
* no real Okta domain
* no real client ID
* no client secret
* no access token
* no refresh token
* no ID token
* no authorization code
* no private key
* no certificate
* no unredacted screenshots
* no raw claims with real user values
* no production endpoint
* no cloud deployment
* no database persistence
* no automatic admin mapping from external claims

---

## Acceptance Criteria

Phase 15 planning is complete when:

* Phase 15 spec is created
* Phase 15 checklist is created
* provider comparison table is defined
* safe claim display rules are defined
* claim mapping guardrails are defined
* out-of-scope items are clearly documented
* future implementation branch is identified
* no app code is changed during planning
* no secrets are committed
* no `.env` is committed
* planning docs are committed to `main`
* planning docs are pushed to GitHub

Future Phase 15 implementation is complete only when:

* provider comparison behavior is implemented safely
* local dummy login still works
* Entra login still works if configured
* Okta login still works if configured
* RBAC still blocks unauthorized users
* provider comparison does not expose raw tokens
* provider comparison does not expose secrets
* provider comparison does not reveal real tenant/client values
* documentation is updated
* no `.env` is committed
* no secrets are committed
* PR is reviewed before merge
