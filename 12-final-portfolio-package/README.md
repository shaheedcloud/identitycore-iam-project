# IdentityCore Final Portfolio Package

This folder summarizes the completed local IAM Practice App and gives reviewers a concise way to understand, run, and evaluate the project.

## Executive Summary

IdentityCore is a single incremental IAM portfolio project. It demonstrates how a target application can evolve from local authentication into a realistic identity learning lab covering OIDC, JWT validation, SCIM provisioning, JML lifecycle workflows, SAML readiness, audit evidence, and local runtime packaging.

The project is intentionally safe for a public portfolio:

- no committed `.env`
- no real tenant IDs
- no client secrets
- no access tokens, refresh tokens, ID tokens, or raw JWTs
- no real SAML assertions
- no SCIM bearer tokens
- no private keys or certificates
- no screenshots with secrets
- no database or persistent storage
- no cloud deployment or production infrastructure

## Phase Summary

| Phase | Capability | Portfolio Value |
| --- | --- | --- |
| 1 | Local login, sessions, RBAC | Shows app-level identity fundamentals |
| 2 | Claims and token simulation | Explains identity data before federation |
| 3 | OIDC readiness and Entra local login | Demonstrates relying-party login flow |
| 4 | Protected API JWT validation | Separates browser login from API authorization |
| 5 | SCIM Users simulation | Shows inbound provisioning patterns |
| 6 | SCIM Groups simulation | Adds group lifecycle and membership changes |
| 7 | JML simulation | Models joiner, mover, leaver identity governance |
| 8 | SAML readiness and local simulation | Explains IdP/SP, ACS, Entity ID, and assertion boundaries |
| 9 | Audit logging and troubleshooting evidence | Shows safe local evidence without secret capture |
| 10 | Docker and final documentation | Packages the app for local portfolio review |

## Reviewer Runbook

Run with npm:

```powershell
cd D:\identitycore\iam-practice-app
npm.cmd install
npm.cmd start
```

Run with Docker:

```powershell
cd D:\identitycore\iam-practice-app
docker build -t identitycore-iam-practice-app:local .
docker run --rm -p 3000:3000 --name identitycore-iam-practice-app identitycore-iam-practice-app:local
```

Open:

```text
http://localhost:3000
```

Use local dummy login:

| User | Password | Role |
| --- | --- | --- |
| `admin@identitycore.local` | `AdminPass123!` | `admin` |
| `analyst@identitycore.local` | `AnalystPass123!` | `security_analyst` |
| `finance@identitycore.local` | `FinancePass123!` | `finance_user` |
| `user@identitycore.local` | `UserPass123!` | `standard_user` |

## Key Review URLs

```text
http://localhost:3000/dashboard
http://localhost:3000/oidc-readiness
http://localhost:3000/jwt-readiness
http://localhost:3000/scim-readiness
http://localhost:3000/jml-readiness
http://localhost:3000/saml-readiness
http://localhost:3000/audit-readiness
```

Safe status APIs:

```text
http://localhost:3000/api/oidc/status
http://localhost:3000/api/jwt/status
http://localhost:3000/api/scim/status
http://localhost:3000/api/jml/status
http://localhost:3000/api/saml/status
http://localhost:3000/api/audit/status
```

## Security Review

Before publishing or creating a pull request, confirm:

- `.env` is not present in `git status`
- Docker image context excludes `.env` through `.dockerignore`
- no real tenant, client, secret, token, certificate, private key, or AWS value appears in committed files
- no screenshots or unredacted troubleshooting evidence were committed
- Docker is documented as local-only runtime, not production deployment

## Next Portfolio Step

Use this package to prepare the final project narrative, screenshots captured manually by the user, architecture diagrams, and interview-ready explanations.
