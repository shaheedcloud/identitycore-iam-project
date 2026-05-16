# Phase 11 — Enterprise UI Foundation Specification

## Purpose

Phase 11 improves the IdentityCore IAM Practice App interface.

This phase makes the app look and feel more like a professional internal IAM portal while keeping it a safe skill-practice simulator.

The goal is not just to make the app prettier. The goal is to make IdentityCore easier to understand, easier to present, and more useful for practicing IAM concepts.

IdentityCore should feel like an enterprise identity dashboard where a learner can explore authentication, authorization, claims, role-based access, provisioning, lifecycle workflows, SSO concepts, audit evidence, and future identity-provider practice paths.

---

## IdentityCore Reminder

IdentityCore is a skill practice app.

It is built to help the learner understand IAM concepts through hands-on practice.

It is not a production identity platform.

It must remain:

- local-first
- safe
- portfolio-friendly
- no-secrets
- no production tenant by default
- no real cloud account by default
- realistic enough to teach IAM concepts clearly

---

## Current Status Before Phase 11

Phase 10 is complete.

The app currently includes:

- local dummy login
- role-based protected pages
- token and claims simulation
- OIDC readiness and local login support
- protected API behavior
- SCIM users simulation
- SCIM groups simulation
- Joiner, Mover, Leaver simulation
- SAML simulation
- audit logging and troubleshooting evidence
- Docker runtime support
- portfolio documentation
- local review runbook

The app is currently functional, but the user interface should become more professional, more realistic, and more useful as a learning tool.

---

## Phase 11 Branch

```bash
feature/phase-11-enterprise-ui-foundation
```
---

## Phase 11 Objective

Transform the existing IdentityCore IAM Practice App from a functional simulator into a professional, enterprise-style IAM learning portal.

The finished app should feel like a realistic internal identity portal used by IAM engineers, security analysts, and administrators.

Phase 11 should improve the visual design, dashboard, navigation, protected pages, learning panels, badges, access-denied messaging, and overall usability without changing the core identity behavior.

## Business Scenario

IdentityCore represents a fictional enterprise identity environment.

A learner uses the app to understand how identity systems behave in real organizations.

The app should help the learner explore:

login behavior
role-based access control
claims
simulated tokens
SSO concepts
OIDC readiness
SAML concepts
SCIM provisioning concepts
Joiner, Mover, Leaver lifecycle concepts
audit evidence
access decisions
least privilege
administrator-only pages
user context
future Entra ID and Okta connection practice

A professional UI matters because IAM can feel abstract. A realistic dashboard helps the learner connect concepts to real-world systems.

## Phase 11 North Star

After Phase 11, IdentityCore should feel like an extremely useful IAM practice toy.

It should not feel like a boring connect/disconnect demo.

It should feel like a safe miniature identity lab where the learner can click around, inspect user context, explore modules, review simulated access decisions, and understand what each IAM concept means.

The app should be useful for:

learning
explaining concepts
portfolio demonstration
interview discussion
future Entra ID practice
future Okta practice
future AWS IAM practice
Phase 11 Scope

## Phase 11 may improve:

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
IAM concept descriptions
local-only simulator messaging
readiness/status page presentation
SCIM page presentation if already present
JML page presentation if already present
SAML page presentation if already present
OIDC readiness page presentation if already present
audit page presentation if already present
README instructions if needed
Required UI Improvements

1. Login Page

The login page should clearly show:

IdentityCore name
this is an IAM practice app
this is local-only by default
dummy login is simulated
real identity provider integration is not active unless locally configured
available demo login options if the app already supports them
clear explanation of what each demo role represents

The login page should feel professional, not plain.

Suggested visual sections:

left-side branding panel
right-side login card
badges such as Local Only, Simulator, No Secrets
short explanation of the app purpose
role demo hints

2. Dashboard

The dashboard should become the main learning hub.

The dashboard should show:

signed-in user context
current role or access level
authentication status
local simulator status
quick links to IAM modules
module cards for authentication, authorization, provisioning, lifecycle, SSO, audit, and readiness
role-aware labels
protected area indicators
realistic enterprise dashboard layout

The dashboard should not be empty or boring.

It should give the learner things to explore.

Suggested dashboard modules:

Authentication & Login
Claims & Token Simulation
Role-Based Access Control
Protected APIs
OIDC Readiness
SAML Simulation
SCIM Users
SCIM Groups
JML Lifecycle
Audit Evidence
Access Decisions
Future Entra ID Practice
Future Okta Practice

3. Navigation

Navigation should be clear and professional.

It should link only to pages that actually exist.

Navigation should make it easy to move between:

dashboard
claims/token pages
protected pages
admin pages
readiness pages
SCIM pages
JML pages
SAML pages
audit pages
logout

Navigation should show the current user context if possible.

4. Role-Aware UI

Where possible, the app should show:

current role
access level
protected area indicators
admin-only labels
user-only labels
security-only labels
finance-only labels
access denied labels when blocked

Examples of badges:

Admin
Security
Finance
User
Protected
Admin Only
Access Granted
Access Denied
Simulated
Local Only
5. IAM Explanation Panels

Pages should include short learning explanations where helpful.

Examples:

“This page demonstrates RBAC.”
“This page simulates SCIM provisioning.”
“This page shows audit evidence.”
“This page explains token claims.”
“This page represents an admin-only area.”
“This page demonstrates least privilege.”
“This page shows local-only OIDC readiness.”
“This page prepares future Entra ID or Okta practice.”

The explanations should be short, practical, and useful.

They should not overwhelm the user.

6. Access Denied Page

If access is blocked, the page should explain:

what was blocked
what role was required
what role the current user has
why least privilege matters
what IAM concept is being demonstrated

The access denied page should feel like a learning moment, not just an error.

7. Status Badges

Use clear status badges for:

Local-only
Simulated
Ready
Not configured
Protected
Admin-only
Access denied
Access granted
Future integration
Practice mode

8. Useful Practice Dashboard Interactions

The dashboard should include useful learning elements where possible without adding risky backend changes.

Allowed examples:

clickable module cards
visual status indicators
role/access summary
simulated readiness status display
explanation cards
“what this teaches” sections
“try this next” links
lightweight client-side UI interactions if safe
existing route links grouped by IAM concept

The app should feel interactive enough for practice and demonstration.

9. Entra ID and Okta Practice Readiness

Phase 11 may include UI areas that explain future Entra ID and Okta practice paths.

Allowed:

dashboard cards labeled Future Entra ID Practice
dashboard cards labeled Future Okta Practice
explanation that real connections require local .env configuration
readiness indicators if existing backend status endpoints already support them
safe placeholder messaging
no secrets
no real tenant values
no new external calls

Not allowed in Phase 11:

adding new real Entra ID backend integration
adding new real Okta backend integration
committing tenant IDs
committing client IDs
committing client secrets
committing .env
adding production authentication

Important distinction:

Phase 11 may prepare the UI for future Entra ID and Okta practice, but it must not start a new real integration phase.

Out of Scope

Phase 11 must not add:

real Entra ID connection
real Okta connection
real AWS IAM connection
real SCIM target
real SAML identity provider
database persistence
production deployment
cloud deployment
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
real tenant IDs
real client secrets
access tokens
refresh tokens
AWS account IDs
private keys
certificates
unredacted screenshots
Files Codex May Inspect

Codex may inspect the entire project to understand the current structure before editing.

Codex should inspect at minimum:

root README
AGENTS.md if present
iam-practice-app/README.md
iam-practice-app/package.json
iam-practice-app/src/
existing route files
existing views/templates/static files
existing CSS files
existing public assets
existing readiness/status routes
Files Codex May Change

Codex may change files related to UI presentation and documentation.

Examples:

CSS files
static assets if already used
view/template files
frontend JavaScript if already present
route-rendered page markup if needed for presentation
README files if documentation needs updating

Codex may update backend-rendered page content only where needed to improve existing page presentation.

Codex must preserve existing backend behavior.

Files Codex Should Avoid Changing Unless Necessary

Codex should avoid unnecessary changes to:

authentication logic
session logic
RBAC middleware
OIDC client logic
JWT validation logic
SCIM store logic
SAML simulation logic
audit logging logic
Dockerfile
docker-compose.yml
package-lock.json unless package changes are truly required

No new package should be added unless absolutely necessary for UI and approved by the phase scope.

Existing Functionality That Must Be Preserved

Phase 11 must preserve:

app starts locally
login page loads
dummy login works
logout works
dashboard loads
sessions still work
role-based pages still enforce access
unauthorized users are still blocked
protected API behavior still works
claims/token simulation still works
OIDC readiness/status pages still load
JWT readiness/status pages still load if present
SCIM user endpoints still work
SCIM group endpoints still work
JML simulation still works
SAML simulation still works
audit pages/logging still work
Docker runtime remains safe
local-only warning remains clear
Acceptance Criteria

Phase 11 is complete when:

app starts locally
login page loads
dummy login still works
dashboard loads
navigation works
existing protected pages still enforce access
unauthorized users are still blocked
readiness/status pages still load
SCIM/JML/SAML/audit pages still load if present
UI looks more professional
dashboard feels useful and not empty
role/status badges are present where helpful
local-only simulator warning remains clear
Entra/Okta future practice messaging is safe and placeholder-only
no real integrations are added
documentation is updated if needed
no secrets are added
no .env file is committed
Git status is reviewed before commit
PR is reviewed before merge
Phase 12 is not started