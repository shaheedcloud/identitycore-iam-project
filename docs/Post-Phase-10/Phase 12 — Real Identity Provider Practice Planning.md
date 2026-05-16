# Phase 12 — Real Identity Provider Practice Planning

## Purpose

This document defines the planning path for moving IdentityCore from a polished local IAM simulator into safe real identity-provider practice.

Phase 12 is not a coding phase yet.

Phase 12 is a planning and safety phase for deciding how IdentityCore will eventually connect to real lab identity providers such as Microsoft Entra ID and Okta without exposing secrets, breaking the simulator, or turning the project into an unsafe production-style system.

The goal is to move carefully from:

```text
local IAM simulator
```

toward:

```text
safe local practice with real Entra ID and Okta lab tenants
```

without committing real tenant data, secrets, tokens, private keys, or production configuration.

---

## Current Project Status

IdentityCore has completed Phase 11.

The app now includes:

- local dummy login
- role-based access control
- protected pages
- claims and token simulation
- OIDC readiness
- JWT readiness
- SCIM users simulation
- SCIM groups simulation
- Joiner, Mover, Leaver simulation
- SAML readiness and simulation
- audit readiness
- Docker runtime support
- final portfolio documentation
- enterprise UI foundation
- professional dashboard
- improved access-denied learning flow
- local-only simulator warnings
- placeholder messaging for future Entra ID and Okta practice

IdentityCore is still a local-first IAM practice app.

It is not a production IAM system.

---

## Phase 12 Objective

Plan the safe transition from simulator-only behavior into real lab identity-provider practice.

Phase 12 should answer:

1. What real provider should be connected first?
2. What exact practice scenario are we trying to support?
3. What should remain local and simulated?
4. What should become real?
5. What configuration belongs in `.env` only?
6. What must never be committed?
7. What documentation must be created before coding?
8. What branch should future implementation use?
9. What local testing steps will prove the integration works?
10. What evidence should be captured for portfolio use?

---

## Phase 12 North Star

IdentityCore should eventually become a realistic IAM practice app where a learner can safely practice:

- local dummy login
- Entra ID OIDC login
- Okta OIDC login
- claim comparison
- role mapping
- group claim interpretation
- access decisions
- user session behavior
- readiness checks
- troubleshooting common identity-provider errors
- safe local configuration through `.env`
- no-secrets GitHub workflow

The user should be able to see the difference between:

```text
local simulator identity
```

and:

```text
real lab identity provider login
```

without putting real tenant data or secrets into the repository.

---

## Critical Safety Rule

Real identity-provider practice must use only lab tenants.

Never use:

- employer tenant
- production Microsoft tenant
- production Okta tenant
- real customer tenant
- real business user accounts
- production AWS account
- production application credentials

Allowed:

- Microsoft Entra ID developer/lab tenant
- Okta developer/lab tenant
- local `.env`
- placeholder `.env.example`
- redacted screenshots
- safe documentation
- local-only testing

---

## What Phase 12 Is

Phase 12 is:

- a planning phase
- a design phase
- a safety phase
- a sequencing phase
- a documentation phase
- a decision checkpoint before new coding

Phase 12 may create or update documentation.

Phase 12 may define future implementation phases.

Phase 12 may define exact Codex prompts for later.

Phase 12 should not immediately change the app code.

---

## What Phase 12 Is Not

Phase 12 is not:

- real Entra ID implementation
- real Okta implementation
- AWS IAM implementation
- production authentication
- cloud deployment
- database persistence
- CI/CD
- SIEM integration
- email integration
- webhook integration
- background jobs
- scheduled tasks
- secrets management implementation
- enterprise production hardening

---

## Recommended Future Sequence

The real identity-provider work should not be one giant phase.

It should be split into small, safe phases.

Recommended order:

```text
Phase 12 — Real Identity Provider Practice Planning
Phase 13 — Entra ID OIDC Local Practice
Phase 14 — Okta OIDC Local Practice
Phase 15 — Provider Comparison and Claims Mapping
Phase 16 — Role Mapping and Authorization Practice
Phase 17 — Safe SCIM Practice Planning
Phase 18 — Okta/Entra SCIM Lab Integration or Simulator Upgrade
Phase 19 — AWS IAM Federation Planning
Phase 20 — Portfolio Evidence and Interview Walkthrough
```

This sequence may change later, but Phase 12 should define the safe starting point.

---

# Phase 13 Candidate — Entra ID OIDC Local Practice

## Purpose

Connect IdentityCore to a Microsoft Entra ID lab tenant using OpenID Connect for local login practice.

This should only happen after Phase 12 is complete and approved.

## Why Entra ID First

Entra ID should likely come first because:

- it is widely used in enterprise IAM
- it connects directly to SC-300 learning
- IdentityCore already has OIDC readiness work
- the app already has placeholder/local OIDC behavior
- Entra ID teaches app registrations, redirect URIs, client IDs, tenant context, and claims
- it prepares the learner for real IAM engineering interviews

## Expected Practice Outcome

The learner should be able to:

- configure an Entra ID lab app registration
- set a local redirect URI
- store values in local `.env`
- start IdentityCore locally
- click Entra login
- authenticate through the lab tenant
- return to IdentityCore
- view safe claim information
- compare Entra claims to local dummy claims
- understand what claims mean
- troubleshoot redirect URI, client secret, issuer, and callback errors

---

## Entra ID Implementation Must Use Local `.env`

Real values must only exist in:

```text
D:\identitycore\iam-practice-app\.env
```

The `.env` file must never be committed.

Allowed local `.env` style:

```env
OIDC_ENABLED=true
OIDC_ISSUER_URL=https://login.microsoftonline.com/YOUR-LAB-TENANT-ID/v2.0
OIDC_CLIENT_ID=YOUR-LAB-CLIENT-ID
OIDC_CLIENT_SECRET=YOUR-LOCAL-CLIENT-SECRET
OIDC_REDIRECT_URI=http://localhost:3000/auth/oidc/callback
OIDC_PROVIDER_NAME=Microsoft Entra ID Lab
```

The repository may only contain placeholder examples in:

```text
iam-practice-app/.env.example
```

Example placeholders only:

```env
OIDC_ENABLED=false
OIDC_ISSUER_URL=https://login.microsoftonline.com/YOUR_TENANT_ID/v2.0
OIDC_CLIENT_ID=YOUR_CLIENT_ID
OIDC_CLIENT_SECRET=YOUR_CLIENT_SECRET
OIDC_REDIRECT_URI=http://localhost:3000/auth/oidc/callback
OIDC_PROVIDER_NAME=Microsoft Entra ID Lab
```

---

## Entra ID Secrets That Must Never Be Committed

Never commit:

- tenant ID
- client ID if tied to a real lab tenant
- client secret
- redirect URI with private hostnames
- access token
- refresh token
- ID token
- raw claims with real email addresses
- screenshots showing tenant GUIDs
- screenshots showing app registration IDs
- screenshots showing secret values
- screenshots showing real users

Even if tenant ID and client ID are not passwords, treat them as sensitive for this public portfolio project.

---

## Entra ID Required Documentation Before Coding

Before starting Entra implementation, create:

```text
docs/Post-Phase-10/Phase 13 — Entra ID OIDC Local Practice Spec.md
docs/Post-Phase-10/Phase 13 Checklist — Entra ID OIDC Local Practice.md
```

The Phase 13 spec must define:

- objective
- business scenario
- scope
- out of scope
- files Codex may inspect
- files Codex may change
- local `.env` values required
- `.env.example` placeholder updates
- testing plan
- no-secrets checklist
- rollback plan
- screenshots to capture manually
- Codex prompt

---

# Phase 14 Candidate — Okta OIDC Local Practice

## Purpose

Connect IdentityCore to an Okta developer/lab tenant using OpenID Connect for local login practice.

This should happen only after Entra ID OIDC local practice is stable and merged.

## Why Okta After Entra

Okta should come after Entra because:

- the learner can compare two identity providers
- the app can reuse safe OIDC concepts
- Okta teaches app integrations, authorization servers, client IDs, client secrets, scopes, and claims
- Okta is heavily used in workforce identity
- it supports practical IAM interview discussion

## Expected Practice Outcome

The learner should be able to:

- create an Okta developer tenant
- create an OIDC app integration
- configure redirect URI
- store local values in `.env`
- start IdentityCore locally
- click Okta login
- authenticate through Okta
- return to IdentityCore
- inspect safe claims
- compare Okta claims to Entra claims
- troubleshoot issuer URL, redirect URI, client secret, and app assignment errors

---

## Okta Implementation Must Use Local `.env`

Real Okta values must only exist in:

```text
D:\identitycore\iam-practice-app\.env
```

Allowed local `.env` style:

```env
OKTA_OIDC_ENABLED=true
OKTA_ISSUER_URL=https://YOUR_OKTA_DOMAIN/oauth2/default
OKTA_CLIENT_ID=YOUR_LOCAL_OKTA_CLIENT_ID
OKTA_CLIENT_SECRET=YOUR_LOCAL_OKTA_CLIENT_SECRET
OKTA_REDIRECT_URI=http://localhost:3000/auth/okta/callback
OKTA_PROVIDER_NAME=Okta Lab
```

The repository may only contain placeholders in:

```text
iam-practice-app/.env.example
```

---

## Okta Secrets That Must Never Be Committed

Never commit:

- Okta domain if tied to a real lab tenant
- Okta client ID
- Okta client secret
- access token
- refresh token
- ID token
- raw user claims with real email addresses
- screenshots showing app IDs
- screenshots showing secret values
- screenshots showing real users

---

## Okta Required Documentation Before Coding

Before starting Okta implementation, create:

```text
docs/Post-Phase-10/Phase 14 — Okta OIDC Local Practice Spec.md
docs/Post-Phase-10/Phase 14 Checklist — Okta OIDC Local Practice.md
```

---

# Real Identity Provider Practice Design Decisions

## Decision 1 — Keep Local Dummy Login

Local dummy login must remain available even after real Entra or Okta login is added.

Reason:

- the app must work without real tenants
- portfolio reviewers should be able to run it locally
- the learner can compare simulated login vs real provider login
- broken external config should not make the whole app unusable

Decision:

```text
Keep local dummy login permanently.
```

---

## Decision 2 — Real Provider Login Must Be Optional

Real Entra or Okta login must be disabled by default.

Reason:

- the app should run safely after clone
- no one should need secrets to start the app
- public GitHub users should not hit real provider errors
- local simulator mode remains stable

Decision:

```text
Real provider login is opt-in through local `.env`.
```

---

## Decision 3 — Fail Closed If Misconfigured

If Entra or Okta config is missing, incomplete, or placeholder-based, the app should not attempt real provider login.

It should show a safe readiness message.

Decision:

```text
Provider login must fail closed when config is incomplete.
```

---

## Decision 4 — Do Not Store Raw Tokens

IdentityCore must not store raw access tokens, refresh tokens, or ID tokens in logs, pages, screenshots, or persistent files.

Allowed:

- safe claim summaries
- masked values
- boolean readiness status
- educational explanations

Not allowed:

- raw access tokens
- raw refresh tokens
- raw ID tokens
- full authorization headers
- token logs
- token screenshots

Decision:

```text
Show safe claim summaries only.
```

---

## Decision 5 — No Production Claims

Do not use real personal accounts, employer accounts, or production users for testing.

Allowed test accounts:

- lab-only Entra users
- lab-only Okta users
- fake names
- fake departments
- fake roles

Decision:

```text
Only lab users may authenticate into IdentityCore.
```

---

# Future Claim Mapping Goals

A later phase should help learners understand claim differences between providers.

Possible comparison table:

| Concept | Local Dummy Login | Entra ID OIDC | Okta OIDC |
|---|---|---|---|
| User identifier | local email | oid/sub/preferred_username | sub/email |
| Role source | local user object | group/role claim if configured | group claim if configured |
| Provider | local | Entra ID | Okta |
| Token issuer | none/simulated | login.microsoftonline.com | okta domain |
| MFA evidence | simulated | claim/sign-in context if available | claim/policy context if available |
| Authorization | local RBAC | mapped from claim later | mapped from claim later |

This should not be implemented until the provider integrations are stable.

---

# Future Role Mapping Goals

A later phase should let the learner practice mapping identity-provider claims into local app roles.

Example:

| Provider Claim | Local Role | Access Result |
|---|---|---|
| group = IdentityCore-Admins | admin | admin dashboard allowed |
| group = IdentityCore-Security | security | security page allowed |
| group = IdentityCore-Finance | finance | finance page allowed |
| no mapped group | standard_user | admin blocked |

Important:

Role mapping must be explicit.

The app must not automatically trust arbitrary claims as admin access.

---

# Future Troubleshooting Scenarios

IdentityCore should eventually teach common real identity-provider failures.

Examples:

## Entra ID Troubleshooting

- wrong redirect URI
- wrong tenant/issuer URL
- expired client secret
- missing app registration permission
- user not assigned to enterprise app
- invalid scope
- callback route mismatch
- clock skew/token validation issue
- group claim missing

## Okta Troubleshooting

- wrong issuer URL
- wrong redirect URI
- app not assigned to user
- wrong authorization server
- expired client secret
- missing scopes
- missing group claim
- user not activated
- MFA policy blocking login

Each troubleshooting scenario should include:

- symptom
- likely cause
- where to check
- fix
- what log proves it
- security lesson
- architect lesson

---

# Phase 12 Deliverables

Phase 12 is complete when the following are done:

- this planning document is created
- document is saved in `docs/Post-Phase-10/`
- document is committed to `main`
- document is added to ChatGPT Project Source
- no code changes are made
- no `.env` is created or committed
- no secrets are committed
- next phase is selected
- Phase 13 spec is not started until Phase 12 is committed
- Codex is not given implementation work yet

---

# Phase 12 Git Workflow

Because this is documentation-only planning, it may be committed directly to `main` if the working tree is clean.

Run:

```bash
cd /d/identitycore
git checkout main
git pull origin main
git status --short
```

Expected result:

```text
(no output)
```

Create the file:

```text
docs/Post-Phase-10/Phase 12 — Real Identity Provider Practice Planning.md
```

Then run:

```bash
git add "docs/Post-Phase-10/Phase 12 — Real Identity Provider Practice Planning.md"
git status --short
git commit -m "docs: add phase-12 real identity provider planning"
git push origin main
```

After push:

- add this file to ChatGPT Project Source
- keep it available for future Phase 13 planning
- do not start Codex coding yet

---

# Suggested Next Planning Document

After Phase 12 is committed, the next likely planning file should be:

```text
docs/Post-Phase-10/Phase 13 — Entra ID OIDC Local Practice Spec.md
```

This should be created before Codex receives any implementation prompt.

---

# Final Rule

Do not start real Entra ID, Okta, AWS IAM, SCIM target, SAML identity provider, database, cloud deployment, CI/CD, SIEM, email, webhook, or scheduled-job work until a dedicated phase spec and checklist exist.

IdentityCore must remain:

- local-first
- safe
- skill-practice focused
- no-secrets
- no-production-tenant
- no-real-cloud-account by default
- portfolio-friendly
- realistic enough to teach IAM concepts clearly