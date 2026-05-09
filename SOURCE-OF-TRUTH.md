# IdentityCore IAM Project — Source of Truth

## Project Name

IdentityCore IAM Project

## GitHub Repository

shaheedcloud/identitycore-iam-project

## Local Folder

D:\identitycore

## Main Goal

Build one unified, incremental IAM Engineer to IAM Architect portfolio project.

This project must demonstrate practical identity engineering and identity architecture skills across:

- Microsoft Entra ID
- Okta
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

## Working Model

ChatGPT = architect, project manager, reviewer, debugger, documentation planner  
Codex = builder, code editor, implementation agent, bug fixer  
GitHub = source of truth for code, docs, screenshots, diagrams, issues, pull requests  
VS Code = local testing and editing environment  

## Main Rule

Do not build random disconnected labs.

Every task must support the same unified project:

IdentityCore IAM Project

## Learning Loop

Every major IAM concept should follow this loop:

Learn → Build → Break → Fix → Document → Diagram → Rebuild → Explain

## Repository Structure

identitycore-iam-project/
  README.md
  iam-practice-app/
  00-program-overview/
  01-lab-setup-and-documentation/
  02-identity-fundamentals/
  03-entra-id-foundation/
  04-entra-conditional-access-mfa/
  05-entra-app-integrations/
  06-entra-lifecycle-governance/
  07-okta-foundation-federation/
  08-okta-provisioning-workflows/
  09-aws-iam-cloud-identity/
  10-cross-platform-architecture/
  11-zero-trust-identity-design/
  12-final-portfolio-package/
  diagrams/
  screenshots/
  troubleshooting-notes/
  architecture-decision-records/
  glossary/
  templates/

## Branching Rules

main = stable branch only  
feature branches = build work happens here  

Current Phase 1 branch:

feature/phase-1-app-skeleton

Codex must never work directly on main.

Every phase should use a separate branch.

Branch pattern:

feature/phase-1-app-skeleton
feature/phase-2-token-claims-simulation
feature/phase-3-oidc-login
feature/phase-4-protected-api-jwt
feature/phase-5-scim-users
feature/phase-6-scim-groups
feature/phase-7-jml-simulation
feature/phase-8-saml-login
feature/phase-9-audit-logging
feature/phase-10-docker-docs

## Build Order

Phase 0 — Project Setup and Source-of-Truth Documentation  
Phase 1 — IAM Practice App Skeleton with Local RBAC  
Phase 2 — Token and Claims Simulation  
Phase 3 — OIDC Login Integration  
Phase 4 — Protected APIs with JWT Validation  
Phase 5 — SCIM Users Endpoint  
Phase 6 — SCIM Groups Endpoint  
Phase 7 — JML Lifecycle Simulation  
Phase 8 — SAML Login Integration  
Phase 9 — Audit Logging and Troubleshooting Evidence  
Phase 10 — Docker and Final Portfolio Documentation  

## Current Status

Completed:
- GitHub repo created
- Local repo created
- Local repo connected to GitHub
- Base folder structure pushed
- Feature branch created: feature/phase-1-app-skeleton

Not completed:
- ChatGPT Project instructions added
- ChatGPT GitHub connector confirmed
- Codex connected to GitHub/repo/branch
- Phase 0 source-of-truth repo file created
- Phase 1 app skeleton built

## Phase 1 App Goal

Create a simple Node.js + Express IAM Practice App inside:

iam-practice-app/

Phase 1 must include only:

- local dummy login
- basic sessions
- local users
- RBAC middleware
- protected pages
- protected API routes
- README
- example config files

Phase 1 must not include:

- real OIDC
- real SAML
- real SCIM
- real AWS Cognito
- real tenant IDs
- real secrets

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

## Screenshot Rules

Screenshots must be captured manually by the user.

Screenshots should be stored in:

screenshots/

Phase-specific screenshots should use folders such as:

screenshots/phase-1-app-skeleton/

Screenshot names should be clear:

PHASE-01-LOGIN-PAGE.png
PHASE-01-ADMIN-LOGIN-PROFILE.png
PHASE-01-USER-BLOCKED-FROM-ADMIN.png
PHASE-01-API-DATA-SUCCESS.png

## Documentation Rules

Every phase must include:

- README updates
- step-by-step instructions
- screenshots list
- testing evidence
- troubleshooting notes
- security explanation
- architect-level explanation
- completion checklist
- Git commit message

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