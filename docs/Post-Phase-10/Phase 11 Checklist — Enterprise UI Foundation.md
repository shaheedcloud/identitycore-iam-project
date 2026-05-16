# Phase 11 Checklist — Enterprise UI Foundation

## Purpose

This checklist controls Phase 11 from preparation through merge.

Use this checklist before starting, while handing work to Codex, after Codex finishes, before commit, before push, and before pull request merge.

Phase 11 must improve the IdentityCore UI while preserving the existing local simulator behavior.

---

## Phase 11 Goal

Make IdentityCore look and feel like a professional internal IAM portal.

The app should become:

- more beautiful
- more presentable
- more useful
- easier to explore
- easier to explain
- better for portfolio demonstration
- better for IAM practice

The app must remain:

- local-first
- safe
- simulated
- no-secrets
- no production integration
- no real tenant connection by default

---

## 1. Before Starting

Run from Git Bash:

```bash
cd /d/identitycore
git checkout main
git pull origin main
git status --short
```

2. Create Phase 11 Branch

Run:

git checkout -b feature/phase-11-enterprise-ui-foundation
git branch --show-current

Expected result:

feature/phase-11-enterprise-ui-foundation

Confirm:

 branch is not main
 branch name is correct
 working tree was clean before branch creation
 Phase 11 work will happen only on this feature branch
3. Pre-Codex Checklist

Before giving Codex the Phase 11 prompt, confirm:

 Phase 10 is complete
 Phase 10 is merged into main
 local main is updated
 Phase 11 branch exists
 current branch is feature/phase-11-enterprise-ui-foundation
 Codex understands this is UI-focused work
 Codex must not work on main
 Codex must inspect the project before editing
 Codex must preserve existing functionality
 Codex must not rewrite the app from scratch
 Codex must not add secrets
 Codex must not add real integrations
 Codex must not add database persistence
 Codex must not add cloud deployment
 Codex must not add external API calls
4. Codex Handoff Prompt

Use the approved prompt from:

docs/Post-Phase-10/Phase 11 — Enterprise UI Foundation Specification.md

The Codex prompt must include:

 repository name
 local folder
 correct branch
 objective
 allowed work
 forbidden work
 files Codex may inspect
 files Codex may change
 files Codex should avoid changing unless necessary
 existing functionality to preserve
 acceptance criteria
 testing expectations
 no-secrets requirement
 summary requirements
 suggested commit message
5. Existing Functionality Codex Must Preserve

Codex must preserve:

 app starts locally
 login page loads
 dummy login works
 logout works
 dashboard loads
 sessions still work
 RBAC still works
 protected pages still enforce access
 unauthorized users are still blocked
 claims/token simulation still works
 protected API behavior still works
 OIDC readiness/status pages still load
 JWT readiness/status pages still load if present
 SCIM users still work
 SCIM groups still work
 JML simulation still works
 SAML simulation still works
 audit logging/evidence still works
 Docker runtime remains safe
 local-only simulator warning remains clear
6. Allowed Phase 11 Improvements

Codex may improve:

 login page
 dashboard page
 navigation
 page layout
 CSS
 protected page design
 role badges
 status badges
 cards
 tables
 alerts
 access denied messages
 IAM explanation panels
 readiness/status page presentation
 SCIM page presentation if already present
 JML page presentation if already present
 SAML page presentation if already present
 OIDC readiness page presentation if already present
 audit page presentation if already present
 dashboard cards for future Entra ID practice
 dashboard cards for future Okta practice
 dashboard cards for future AWS IAM practice
 README instructions if needed
7. Forbidden Phase 11 Work

Codex must not add:

 real Entra ID connection
 real Okta connection
 real AWS IAM connection
 real SCIM target
 real SAML identity provider
 database persistence
 cloud deployment
 production deployment
 external API calls
 new IAM protocol implementation
 new secrets
 .env
 CI/CD
 SIEM integration
 webhook integration
 email integration
 scheduled tasks
 background jobs
 production authentication
 production authorization
 tenant IDs
 client IDs
 client secrets
 access tokens
 refresh tokens
 AWS account IDs
 private keys
 certificates
 unredacted screenshots
 real user data
 production endpoints
8. Post-Codex Review

After Codex finishes, run:

cd /d/identitycore
git status --short

Review every changed file.

Checklist:

 changed files make sense for UI work
 no unexpected backend rewrite
 no unrelated feature added
 no .env created
 no secrets added
 no production config added
 no external API call added
 no cloud deployment added
 no database added
 no real Entra integration added
 no real Okta integration added
 no real AWS integration added
 no unsafe screenshot added
 documentation changes make sense
9. Review Diff Before Running App

Run:

git diff --stat
git diff

Review:

 what files changed
 what UI changed
 what logic changed, if any
 whether existing behavior was preserved
 whether documentation changed
 whether package files changed
 whether any new dependency was introduced

If package.json or package-lock.json changed, confirm why.

No new dependency should be added unless it is clearly necessary and safe.

10. Local Testing

Run:

cd /d/identitycore/iam-practice-app
npm install
npm start

Open:

http://localhost:3000

Validate:

 app starts without errors
 login page loads
 login page looks improved
 local-only simulator warning is visible
 dummy login works
 dashboard loads
 dashboard looks improved
 dashboard has useful IAM module cards or sections
 dashboard is not empty or boring
 navigation works
 logout works
 user context displays correctly
 role/status badges display where appropriate
 IAM explanation panels are helpful
 protected pages still enforce access
 unauthorized users are blocked
 access denied page/message is clearer
 readiness/status pages load
 SCIM pages/endpoints load if present
 JML pages load if present
 SAML pages load if present
 audit pages load if present

Stop the app after testing:

CTRL + C
11. Suggested Manual Browser Test Flow
Normal/User Demo Test
 open login page
 sign in with normal/demo user
 confirm dashboard loads
 review user context
 open allowed pages
 attempt restricted/admin page
 confirm access denied works
 logout
Admin/Security Demo Test
 sign in with admin/security demo user if available
 confirm dashboard loads
 confirm admin/protected links work
 confirm admin-only areas show proper labels
 confirm logout works
Readiness/Module Test

Test pages that exist in the app:

 OIDC readiness
 JWT readiness if present
 SCIM readiness if present
 SAML readiness if present
 SCIM users page or endpoint if present
 SCIM groups page or endpoint if present
 JML page if present
 audit/status pages if present
12. Security Review Before Commit

Run:

cd /d/identitycore
git status --short

Confirm no unsafe files are staged or present.

Check:

 no .env
 no .env.local
 no .env.production
 no tenant IDs
 no client IDs
 no client secrets
 no access tokens
 no refresh tokens
 no AWS account IDs
 no private keys
 no certificates
 no real user data
 no production endpoints
 no unredacted screenshots
 no cloud deployment
 no external API calls
 no database persistence
 no real Entra integration
 no real Okta integration
 no real AWS integration

Optional safety command from Git Bash:

git diff -- . ":(exclude)package-lock.json" | grep -Ei "secret|token|password|tenant|client_id|client_secret|aws_access_key|private_key|BEGIN RSA|BEGIN PRIVATE"

If anything suspicious appears, stop and inspect before committing.

If grep is not available, use this Windows-friendly option:

git diff -- . ":(exclude)package-lock.json" | findstr /i "secret token password tenant client_id client_secret aws_access_key private_key"
13. Documentation Review Before Commit

Confirm:

 root README.md updated if needed
 iam-practice-app/README.md updated if needed
 Phase 11 behavior documented if needed
 local-only warning remains clear
 README does not claim production readiness
 README does not claim new real Entra integration
 README does not claim new real Okta integration
 README does not claim new real AWS integration
 no screenshots committed unless redacted
 documentation matches actual app behavior
14. Commit

From the repo root:

cd /d/identitycore
git add .
git status --short

Review staged files carefully.

Then commit:

git commit -m "phase-11: add enterprise UI foundation"
15. Push

Run:

git push origin feature/phase-11-enterprise-ui-foundation
16. Pull Request

Pull request title:

Phase 11: Enterprise UI Foundation

Pull request description:

## Summary

Adds Phase 11 Enterprise UI Foundation improvements for the IdentityCore IAM Practice App.

IdentityCore remains a local-first IAM skill practice app and simulator.

## What changed

- Improved enterprise-style UI
- Improved login page presentation
- Improved dashboard presentation
- Improved navigation
- Improved role/status indicators
- Improved IAM learning panels
- Preserved local simulator behavior
- Preserved existing identity simulation behavior

## Validation

- App starts locally
- Login page loads
- Dummy login works
- Dashboard loads
- Navigation works
- Protected pages still enforce access
- Unauthorized users are still blocked
- Readiness/status pages still load
- SCIM/JML/SAML/audit pages still load if present

## Security review

- No `.env` committed
- No secrets committed
- No tenant IDs committed
- No AWS account IDs committed
- No real integrations added
- No unredacted screenshots committed
- No cloud deployment added
- No external API calls added
17. PR Review Checklist

Before merge:

 PR targets main
 PR source is feature/phase-11-enterprise-ui-foundation
 changed files reviewed
 app tested locally
 screenshots reviewed locally if captured
 no secrets
 no .env
 no real integrations
 no unexpected backend rewrite
 documentation updated if needed
 UI is acceptable
 PR approved
18. Merge Checklist

After PR approval:

 merge PR into main
 confirm PR closed
 update local main

Run:

cd /d/identitycore
git checkout main
git pull origin main
git status --short

Expected result:
```
(no output)
```

--- 

19. After Phase 11

Do not start Phase 12 immediately.

First confirm:

 Phase 11 branch pushed
 PR opened
 PR reviewed
 PR merged into main
 local main updated
 working tree clean
 Phase 11 documented
 screenshots captured if needed
 no secrets committed
20. Final Rule

Do not start real Entra ID, Okta, AWS IAM, database, cloud deployment, or external API work until Phase 11 is complete and merged into main.

Phase 11 is the final polish phase for the current local simulator stage.

Future phases may safely add real practice integrations, but only after a separate source-of-truth plan is written and approved.