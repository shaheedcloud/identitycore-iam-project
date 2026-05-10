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

`feature/phase-3-oidc-login`

Codex must never work directly on `main`.

Before editing files, Codex must verify the current branch.

Expected command:

```bash
git branch --show-current

```

---

## Current Phase

Phase 3 - OIDC Login Readiness and Placeholder Integration

Phase 3A is OIDC readiness only.

Phase 3A must prepare the app for future OIDC without requiring a real identity provider yet. Any real OIDC values must be placed only in a local uncommitted .env file later, never in GitHub.

Phase 3A may include:

- OIDC route placeholders
- login-with-oidc button or disabled placeholder
- callback route placeholder
- OIDC configuration example values in .env.example only
- documentation explaining OIDC authorization code flow
- documentation explaining how Entra ID or Okta will later provide issuer, client ID, redirect URI, scopes, and claims
- safe "not configured yet" behavior
- clear comments showing where real OIDC logic will later be added

Phase 3A must not include:

- real Entra ID tenant ID
- real Okta domain
- real client ID
- real client secret
- real issuer URL
- real discovery metadata
- real authorization endpoint
- real token endpoint
- real JWKS endpoint
- real OIDC login execution
- real token exchange
- real JWT validation
- committed .env
- access tokens
- refresh tokens
- ID tokens
- private keys
- AWS integration
- SAML
- SCIM
- Docker
- database
- tenant IDs
- .env files committed to Git

Suggested Phase 3A commit message:

```bash
git commit -m "chore: update Codex guardrails for Phase 3 OIDC readiness"
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
