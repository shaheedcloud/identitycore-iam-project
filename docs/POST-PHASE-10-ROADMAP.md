# IdentityCore Post-Phase 10 Roadmap

## Purpose

This document defines the next direction for the IdentityCore IAM Project after completion of Phase 10.

Phase 10 completed the first planned build cycle of the IdentityCore IAM Practice App. The project now has a working local IAM simulator with local-only runtime support, portfolio documentation, Docker runtime support, and final review documentation.

The next objective is not to immediately add more backend features. The next objective is to plan the next stage carefully so IdentityCore becomes more realistic, more professional, and more useful as an IAM learning and portfolio platform.

This roadmap becomes the source-of-truth document for all post-Phase-10 work.

---

## Current Project Status

IdentityCore Phase 10 is complete.

The following are complete:

- Local IAM practice app
- Local dummy login
- Role-based protected pages
- Token and claims simulation
- OIDC local login support
- Protected routes and API behavior
- SCIM user and group simulation
- Joiner, Mover, Leaver simulation
- SAML simulation
- Audit logging and troubleshooting evidence
- Docker runtime support
- Final portfolio documentation
- Local review runbook
- Safe `.dockerignore`
- No committed `.env`
- No committed secrets
- No production deployment
- No real tenant integration committed to the repo

The app is currently a safe local simulator. It is not yet a production IAM platform.

---

## Post-Phase-10 North Star

The long-term goal is to evolve IdentityCore from a simple IAM simulator into a realistic IAM practice application that helps a learner understand how real-world identity systems behave.

The application should eventually support realistic practice around:

- Microsoft Entra ID
- Okta
- AWS IAM
- SSO
- MFA
- Conditional Access concepts
- OIDC
- SAML
- SCIM
- Joiner, Mover, Leaver workflows
- Role-based access control
- Attribute-based access control concepts
- Audit logging
- Access governance
- Privileged access
- Zero Trust identity architecture

The app should remain safe, local-first, and portfolio-friendly.

---

## Guiding Principles

### 1. Stay Incremental

Every future phase must be small, reviewable, and testable.

Do not combine unrelated work into one large phase.

### 2. Preserve Safety

Do not commit:

- `.env` files
- tenant IDs
- client secrets
- access tokens
- refresh tokens
- AWS account IDs
- private keys
- certificates
- unredacted screenshots
- real user data

Use only:

- placeholders
- example configuration files
- safe local defaults
- redacted screenshots
- documentation-first design

### 3. Keep IdentityCore Practical

The app should help a practical learner understand IAM by seeing workflows behave visually and logically.

Every new feature should answer:

- What IAM concept does this teach?
- What real-world problem does it represent?
- What could break?
- How would an IAM engineer troubleshoot it?
- What logs prove what happened?
- What would an IAM architect care about?

### 4. Avoid Random Features

Do not add features just because they are technically interesting.

Each feature must support IAM engineering, IAM architecture, or portfolio readiness.

### 5. Documentation Before Coding

Before any new coding phase begins, there must be a short design plan covering:

- objective
- scope
- out of scope
- files expected to change
- acceptance criteria
- testing plan
- screenshots needed
- security guardrails

---

# Roadmap Overview

The post-Phase-10 roadmap is divided into two major tracks:

1. Enterprise UI and usability improvement
2. Real-world IAM practice integrations

The first focus is Enterprise UI because the app must feel realistic and professional before deeper lab integrations are added.

---

# Phase 11 — Enterprise UI Foundation

## Objective

Transform the current app from a functional local simulator into a professional enterprise-style IAM practice interface.

This phase focuses on visual design, layout, navigation, and user experience.

## Why This Matters

IAM is difficult to understand when the interface feels like a toy app.

The app should visually feel closer to tools used in real environments, such as:

- identity admin portals
- access management dashboards
- audit review systems
- application access consoles
- security operations dashboards

A professional interface improves learning because the user can connect concepts to realistic workflows.

## Scope

Phase 11 may include:

- professional color system
- improved typography
- better spacing and layout
- dashboard-style landing page
- improved navigation
- cleaner login page
- role-aware UI badges
- realistic admin/user separation
- improved protected page layout
- consistent buttons, cards, alerts, and tables
- enterprise-style status indicators
- better empty states
- better error states

## Out of Scope

Phase 11 must not include:

- real Entra connection
- real Okta connection
- real AWS connection
- database persistence
- production deployment
- new IAM protocol implementation
- secrets
- external API calls
- cloud infrastructure

## Expected User Experience

After Phase 11, the app should feel like a clean internal IAM portal.

Example pages should feel like:

- IAM dashboard
- user profile / claims viewer
- access request page
- admin access review page
- audit log viewer
- SCIM user viewer
- JML workflow viewer

## Acceptance Criteria

Phase 11 is complete when:

- UI feels visually professional and consistent
- login page is improved
- dashboard is improved
- navigation is clearer
- role-based pages are easier to understand
- all existing functionality still works
- no new secrets are introduced
- README is updated
- screenshots are captured
- Git status is clean
- PR is reviewed and merged into main

## Suggested Branch

```bash
feature/phase-11-enterprise-ui-foundation