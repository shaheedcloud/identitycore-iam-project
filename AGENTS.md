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

`feature/phase-3b-entra-oidc-login`

Codex must never work directly on `main`.

Before editing files, Codex must verify the current branch.

Expected command:

```bash
git branch --show-current

```

---

## Current Phase

Phase 3B - Entra ID OIDC Local Login

Phase 3B adds real Entra ID OIDC local login behavior using values loaded only from a local uncommitted `iam-practice-app/.env` file.

Any real Entra ID values must be placed only in a local uncommitted `iam-practice-app/.env` file. The repository may contain only placeholder values in `.env.example` and documentation.

Phase 3B should default OIDC-authenticated users to the safest local role, `standard_user`, unless a later approved phase adds explicit role/group claim mapping.

Phase 3B may include:

- real OIDC authorization code flow support using a Node OIDC library
- Entra ID OIDC login using values loaded only from local uncommitted .env
- OIDC start route that redirects to Entra ID only when OIDC_ENABLED=true and config is complete
- OIDC callback route that exchanges authorization code for tokens
- safe extraction of ID token claims
- creation of local app session from safe OIDC claims
- local dummy login remaining available
- README documentation for Entra ID app registration
- README documentation for local .env setup
- safe OIDC troubleshooting notes

Phase 3B must not include:

- committed .env
- real tenant IDs committed to GitHub
- real client IDs committed to GitHub
- client secrets committed to GitHub
- access tokens committed to GitHub
- refresh tokens committed to GitHub
- ID tokens committed to GitHub
- private keys
- screenshots showing tenant/client/secrets unredacted
- Okta OIDC implementation
- SAML
- SCIM
- AWS integration
- Docker
- database
- protected API JWT validation beyond basic OIDC login session behavior

Suggested Phase 3B commit message:

```bash
git commit -m "chore: update Codex guardrails for Phase 3B Entra OIDC login"
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
