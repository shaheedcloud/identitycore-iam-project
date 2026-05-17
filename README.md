# IdentityCore IAM Project

IdentityCore is a unified IAM Engineer to IAM Architect portfolio project. It builds one practice application and a supporting documentation package to demonstrate identity architecture, federation, provisioning, lifecycle governance, protected APIs, troubleshooting evidence, and local runtime operations.

## Portfolio Story

The project shows how an IAM professional can move from application-level identity fundamentals to architecture-level thinking:

- local authentication, sessions, and RBAC
- simulated claims and token inspection
- Entra ID OIDC login readiness and local login integration
- protected API JWT validation
- SCIM Users and Groups endpoint simulations
- Joiner, Mover, Leaver lifecycle simulation
- SAML readiness and local SAML session simulation
- local audit logging and troubleshooting evidence
- local Docker runtime support for portfolio review
- enterprise-style UI foundation for a professional IAM learning portal
- safe Microsoft Entra ID OIDC local practice without committing real tenant configuration
- safe Okta OIDC local practice without committing a real Okta domain or application credentials
- provider comparison and claims mapping guardrails across local, Entra, and Okta identity sources
- role mapping and authorization practice showing deny-by-default mapping and local RBAC as the final control
- SCIM simulator and JML evidence improvements that explain provisioning, lifecycle, and RBAC separation

## Main Application

The hands-on app lives in:

```text
iam-practice-app/
```

Run locally with npm:

```powershell
cd D:\identitycore\iam-practice-app
npm.cmd install
npm.cmd start
```

Run locally with Docker:

```powershell
cd D:\identitycore\iam-practice-app
docker build -t identitycore-iam-practice-app:local .
docker run --rm -p 3000:3000 --name identitycore-iam-practice-app identitycore-iam-practice-app:local
```

Open:

```text
http://localhost:3000
```

## Security Posture

This repository is designed for safe local learning. It must not contain real `.env` files, tenant IDs, client secrets, access tokens, refresh tokens, ID tokens, raw JWTs, SAML assertions, SCIM bearer tokens, private keys, certificates, AWS keys, screenshots with secrets, databases, persistent logs, or production deployment configuration.

Docker support is local portfolio runtime only. It does not add cloud deployment, production infrastructure, CI/CD deployment, registry publishing, production secrets management, external logging, or persistent storage.

Entra OIDC practice uses only local uncommitted `.env` values. The app must never commit real tenant IDs, client IDs tied to a real lab tenant, client secrets, access tokens, refresh tokens, ID tokens, private keys, certificates, or screenshots containing unredacted identity data.

Okta OIDC practice also uses only local uncommitted `.env` values. The app must never commit real Okta domains, Okta client IDs, Okta client secrets, tokens, private keys, certificates, or screenshots containing unredacted identity data.

Role mapping practice is local-only. External Entra or Okta authentication does not automatically grant admin access, and external claims or groups are not blindly trusted for privileged authorization.

SCIM and JML practice are local-only simulations. SCIM provisions identity and group records; it does not create browser sessions, expose the app publicly, connect to a real provider, or bypass local RBAC.

## Final Portfolio Package

The final project summary and reviewer runbook live in:

```text
12-final-portfolio-package/
```
