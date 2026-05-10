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

`feature/phase-7-jml-simulation`

Codex must never work directly on `main`.

Before editing files, Codex must verify the current branch.

Expected command:

```bash
git branch --show-current

```

---

## Current Phase

Phase 7 - JML Lifecycle Simulation

Phase 7 adds a safe local Joiner, Mover, Leaver lifecycle simulation while keeping local dummy login, Entra OIDC local login, protected API JWT validation, SCIM Users and Groups, and all existing readiness/status routes available.

Phase 7 may include:

- in-memory JML lifecycle simulation storage
- local Joiner simulation with simulated identity creation, department/job title assignment, SCIM-style user action evidence, group assignment, and evidence records
- local Mover simulation with department/job title updates, old access removal, new access assignment, and evidence records
- local Leaver simulation with account deactivation, access removal, simulated session/access revocation evidence, and evidence records
- safe JML status and event history API routes
- a JML readiness page
- README documentation for Joiner, Mover, and Leaver flows
- troubleshooting notes for local JML simulation testing

Phase 7 must remain local-only and in-memory only.

Phase 7 must not include:

- committed `.env`
- real SCIM bearer tokens committed to GitHub
- Entra tokens committed to GitHub
- Okta tokens committed to GitHub
- real tenant IDs committed to GitHub
- client secrets committed to GitHub
- access tokens committed to GitHub
- refresh tokens committed to GitHub
- ID tokens committed to GitHub
- SCIM bearer token logging
- SCIM bearer tokens returned from any API
- raw JWT logging or storage
- private keys
- screenshots showing tenant/client/secrets/tokens unredacted
- external API calls
- real Entra Lifecycle Workflows
- real Okta Workflows
- real HR integration
- real SCIM provisioning from Entra or Okta
- background jobs
- scheduled tasks
- real automation
- real session revocation
- SAML
- AWS integration
- Docker
- database
- persistent storage
- production provisioning
- email notifications
- approval workflow engine
- role mapping
- admin UI
- JWT authorization mapping

SAML login remains Phase 8. OIDC-authenticated users must remain mapped to the safest local role behavior already established by Phase 3B.

Suggested Phase 7 commit message:

```bash
git commit -m "phase-7: add local JML lifecycle simulation"
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
