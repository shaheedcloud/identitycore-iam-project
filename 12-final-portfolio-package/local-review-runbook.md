# Local Review Runbook

Use this runbook to review the IdentityCore IAM Practice App without cloud deployment or production infrastructure.

## Npm Runtime

```powershell
cd D:\identitycore\iam-practice-app
npm.cmd install
npm.cmd start
```

Open:

```text
http://localhost:3000
```

## Docker Runtime

Build:

```powershell
cd D:\identitycore\iam-practice-app
docker build -t identitycore-iam-practice-app:local .
```

Run:

```powershell
docker run --rm -p 3000:3000 --name identitycore-iam-practice-app identitycore-iam-practice-app:local
```

Compose alternative:

```powershell
docker compose up --build
docker compose down
```

## Smoke Test Checklist

After signing in with `admin@identitycore.local` and `AdminPass123!`, open:

- `/dashboard`
- `/oidc-readiness`
- `/jwt-readiness`
- `/scim-readiness`
- `/jml-readiness`
- `/saml-readiness`
- `/audit-readiness`
- `/api/oidc/status`
- `/api/jwt/status`
- `/api/scim/status`
- `/api/jml/status`
- `/api/saml/status`
- `/api/audit/status`

## Docker Safety Checklist

- `.env` is not copied into the image.
- `.dockerignore` excludes `.env`, `.env.*`, logs, Git files, screenshots, certificates, keys, token-like files, and `node_modules`.
- Compose uses only safe placeholder/disabling values.
- No cloud deployment, registry push, database, persistent logging, SIEM, email, webhook, or background jobs are configured.

## Troubleshooting

Port `3000` in use: stop the npm server or existing container, then retry.

Docker daemon unavailable: start Docker Desktop.

Build cannot download dependencies: confirm local network access to the npm registry.

Container starts but login page does not load: run `docker ps` and confirm port `3000:3000` is published.
