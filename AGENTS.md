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

`feature/phase-10-docker-docs`

Codex must never work directly on `main`.

Before editing files, Codex must verify the current branch.

Expected command:

```bash
git branch --show-current

```

---

## Current Phase

Phase 10 - Docker and Final Portfolio Documentation

Phase 10 adds safe local Docker runtime support and final portfolio documentation while keeping local dummy login, Entra OIDC local login, protected API JWT validation, SCIM Users and Groups, JML simulation, SAML readiness/local simulation, audit logging/troubleshooting evidence, and all existing readiness/status routes available.

Phase 10 may include:

- a local-only Dockerfile for `iam-practice-app`
- an `iam-practice-app/.dockerignore` that excludes `.env`, dependencies, logs, Git files, screenshots, and sensitive local artifacts
- a simple Docker Compose file for local portfolio runtime if useful
- README documentation for npm and Docker run paths
- Docker troubleshooting and local-only security notes
- root README portfolio overview updates
- final portfolio documentation under `12-final-portfolio-package/`
- concise local runbook documentation

Phase 10 Docker support must be local portfolio runtime only. It must not become cloud deployment or production infrastructure.

Phase 10 must not include:

- committed `.env`
- `.env` copied into Docker images
- secrets in Dockerfile
- secrets in Docker Compose
- real IdP certificates committed to GitHub
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
- real SAML assertions committed to GitHub
- full certificate values returned from status APIs
- screenshots showing tenant/client/secrets/tokens unredacted
- session cookie logging
- Authorization header logging
- password logging
- raw request logging
- raw token capture
- raw SAML assertion capture
- file-based log persistence
- external SIEM integration
- Splunk integration
- CloudTrail integration
- production logging pipeline
- real alerting
- Kubernetes
- AWS ECS
- AWS App Runner
- Azure App Service
- cloud deployment
- CI/CD deployment pipeline
- Docker registry publishing
- production secrets management
- real external IdP calls while placeholder/default config is active
- real Entra Lifecycle Workflows
- real Okta Workflows
- real HR integration
- real SCIM provisioning from Entra or Okta
- real Entra SAML production integration
- real Okta SAML production integration
- production SAML certificate handling
- SAML group-to-role authorization
- admin authorization from SAML attributes
- background jobs
- scheduled tasks
- real automation
- real session revocation
- AWS integration
- Docker
- database
- persistent storage
- production provisioning
- email notifications
- approval workflow engine
- logging API calls
- role mapping
- admin UI
- JWT authorization mapping
- SCIM changes
- JML changes
- new authentication protocol features
- new IAM app features

OIDC-authenticated users must remain mapped to the safest local role behavior already established by Phase 3B.

Suggested Phase 10 commit message:

```bash
git commit -m "phase-10: add local Docker runtime and portfolio docs"
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
