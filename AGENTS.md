# AGENTS.md — IdentityCore IAM Project Codex Rules

## Project Identity

This repository is the IdentityCore IAM Project.

Repository:
shaheedcloud/identitycore-iam-project

Local folder:
D:\identitycore

Primary purpose:
Build one unified, incremental IAM Engineer to IAM Architect portfolio project.

This project must demonstrate practical identity engineering and identity architecture skills across:

- Microsoft Entra ID
- Okta Workforce Identity
- AWS IAM
- SSO
- MFA
- Conditional Access
- SAML
- OAuth 2.0
- OIDC
- SCIM
- RBAC
- JML lifecycle workflows
- Access governance
- Privileged access
- CloudTrail monitoring
- IAM Access Analyzer
- Zero Trust identity architecture

Do not create random disconnected labs. Every file, feature, document, and code change must support the same unified IdentityCore IAM Project.

---

## Working Model

ChatGPT is the architect, reviewer, planner, debugger, and documentation guide.

Codex is the builder, code editor, implementation agent, and bug fixer.

GitHub is the source of truth for code, documentation, screenshots, diagrams, issues, pull requests, and review history.

VS Code and Git Bash are the local testing and validation environment.

Codex must follow the architecture and phase boundaries provided by ChatGPT and the project source-of-truth files.

---

## Source-of-Truth Files

Before making any major change, respect these files as authority:

1. `SOURCE-OF-TRUTH.md`
2. `IDENTITYCORE-REVISED-BLUEPRINT.md`
3. `IAM Engineer to IAM Architect Mastery Program.pdf`, if available in project context
4. `AGENTS.md`

If instructions conflict, follow this priority:

1. Security rules
2. Branching rules
3. Current phase scope
4. Source-of-truth project structure
5. Implementation preference

Do not invent project direction beyond the current phase.

---

## Branching Rules

The stable branch is:

`main`

The active working branch for the current phase is:

`feature/phase-5-scim-users`

Codex must never work directly on `main`.

Before editing files, Codex must verify the current branch.

Expected command:

```bash
git branch --show-current

```

---

## Current Phase

Phase 5 - SCIM Users Endpoint

Phase 5 adds a safe local SCIM 2.0 Users endpoint simulation while keeping local dummy login, Entra OIDC local login, protected API JWT validation, and all existing readiness/status routes available.

Phase 5 may include:

- placeholder-only SCIM settings in `.env.example`
- a SCIM configuration helper that reads from process.env
- SCIM bearer-token middleware for local testing only
- in-memory SCIM user storage
- SCIM 2.0 metadata routes for service provider config, schemas, and resource types
- SCIM 2.0 Users routes for list, get, create, replace, patch, and deactivate
- safe SCIM readiness/status output
- README documentation for SCIM versus OIDC versus JWT
- troubleshooting notes for local SCIM endpoint testing

Phase 5 write-provisioning and Users endpoints must fail closed when SCIM is disabled, incomplete, or placeholder-based.

Phase 5 must not include:

- committed `.env`
- real SCIM bearer tokens committed to GitHub
- Entra tokens committed to GitHub
- Okta tokens committed to GitHub
- client secrets committed to GitHub
- access tokens committed to GitHub
- refresh tokens committed to GitHub
- ID tokens committed to GitHub
- SCIM bearer token logging
- SCIM bearer tokens returned from any API
- private keys
- screenshots showing tenant/client/secrets/tokens unredacted
- SAML
- AWS integration
- Docker
- database
- persistent storage
- SCIM Groups
- JML lifecycle simulation
- production provisioning
- real Entra provisioning setup
- real Okta provisioning setup
- group push
- role mapping
- admin UI for SCIM users

SCIM Groups are deferred to Phase 6. JML lifecycle simulation is deferred to Phase 7. OIDC-authenticated users must remain mapped to the safest local role behavior already established by Phase 3B.

Suggested Phase 5 commit message:

```bash
git commit -m "phase-5: add SCIM users endpoint simulation"
```

---

## Security Rules

Never commit:

- secrets
- private keys
- client secrets
- access tokens
- refresh tokens
- real tenant IDs
- AWS account IDs
- unredacted screenshots
- .env files

Always use:

- .env.example
- oidc.example.json
- saml.example.json
- placeholder values
- redacted screenshots
- least privilege
- separate feature branches

---

## Definition of Done

A phase is done only when:

1. Code or documentation is created.
2. App runs or documentation is complete.
3. Acceptance criteria pass.
4. Screenshots are captured or listed.
5. README is updated.
6. No secrets are committed.
7. Git status is clean.
8. Changes are pushed to feature branch.
9. Pull request is reviewed.
10. Work is merged into main only after review.
