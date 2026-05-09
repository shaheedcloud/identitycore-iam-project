# IdentityCore Enterprise IAM Lab
## Revised Master Blueprint — Audit, Gap Analysis, and Complete Program Guide

> **Version:** 2.0 — Revised for safety, licensing clarity, and practical sequencing  
> **Source of Truth:** IAM Engineer to IAM Architect Mastery Program (uploaded document)  
> **Primary Rule:** Build one unified enterprise identity architecture, not disconnected labs.

---

## AUDIT FINDINGS — What Was Missing, Unclear, Risky, or Out of Order

Before the revised blueprint, here is a transparent audit of the original outline with every identified problem and its correction.

---

### CATEGORY 1 — SAFETY AND SECURITY RISKS

**Problem 1.1 — No explicit warning about Entra ID tenant isolation**
The original outline instructs you to "set up or access an Entra ID tenant" without warning that you must use a dedicated development tenant, never your employer's production tenant, never a Microsoft 365 tenant where real users exist.

**Correction:** Phase 0 now explicitly requires creating a free Microsoft Entra ID developer tenant through the Microsoft 365 Developer Program or Azure free trial. Every instruction confirms you are working in an isolated lab environment before proceeding.

---

**Problem 1.2 — No root account lockdown procedure at AWS setup**
The original outline says "do not use root account for daily work" as a footnote. This is not enough. AWS root account exposure is one of the most critical cloud identity risks. The first AWS task must be securing the root account before any IAM work begins.

**Correction:** Phase 8 (AWS IAM) now begins with a mandatory root account security procedure: enable root MFA, create an IAM admin role, verify root is never used again, and confirm with CloudTrail. This is Step 8.0, not an afterthought.

---

**Problem 1.3 — No GitHub secrets warning integrated into steps**
The original outline mentions "do not expose secrets" as a general rule but does not integrate the warning into the specific steps where secrets are created — such as when creating app registrations (client secrets), AWS access keys, or capturing screenshots of tenant IDs and account IDs.

**Correction:** A secrets warning is now embedded at every specific step where a secret is created or a screenshot might capture sensitive data. You will see `⚠️ SECURITY CHECKPOINT` callouts inline.

---

**Problem 1.4 — Break-glass account guidance incomplete**
The original outline says to "create or document two emergency access accounts" but does not explain the monitoring requirement, naming convention, storage of credentials, or alerting setup. A misconfigured break-glass account is itself a security risk.

**Correction:** Phase 3 now includes a complete break-glass account procedure with naming, credential storage guidance (offline vault, not in cloud), exclusion scope, monitoring alert requirement, and quarterly verification schedule.

---

**Problem 1.5 — No .gitignore guidance**
The repository setup does not include a .gitignore file, meaning a learner could accidentally commit screenshots with sensitive metadata, environment files, or cached credential files.

**Correction:** Phase 0 now includes creating a .gitignore file as a required first step before any other files are committed.

---

### CATEGORY 2 — LICENSING PROBLEMS

**Problem 2.1 — Access Packages require Entra ID P2 licensing**
Access Packages (Entitlement Management) require Microsoft Entra ID P2 or Microsoft Entra ID Governance licensing. The original outline treats this as a standard lab step without flagging the licensing requirement.

**Correction:** Every feature that requires paid licensing is now flagged with a `💳 LICENSING NOTE` callout explaining: what license is required, what the feature does, what a documentation-only alternative looks like, and what diagram or written design should be produced instead.

---

**Problem 2.2 — Access Reviews require Entra ID P2 licensing**
Access Reviews are an Entra ID Governance feature. Same issue as above.

**Correction:** Same treatment as 2.1.

---

**Problem 2.3 — Privileged Identity Management (PIM) requires Entra ID P2**
PIM requires Entra ID P2 licensing. This is one of the most important skills in the program but is locked behind a paid feature. The original outline does not make this clear.

**Correction:** Phase 5 now includes a full PIM design document that can be built without a license, plus a simulation of what PIM would look like using eligible role assignments if the Microsoft 365 Developer Program provides P2 features (it sometimes does temporarily). Instructions are included for both scenarios.

---

**Problem 2.4 — Okta Workflows require a specific Okta plan**
Okta Workflows is not available on the free Okta Developer account. The original outline includes Okta Workflows as a standard lab without flagging this.

**Correction:** Phase 7 now documents Okta Workflows as a design exercise when the feature is unavailable, with instructions to diagram the workflow logic and document what the configuration would look like. A documentation-only version produces the same portfolio value.

---

**Problem 2.5 — SCIM provisioning targets may require paid applications**
Configuring SCIM from Entra ID or Okta to a real application requires the target application to support SCIM. Most real SCIM targets require paid subscriptions (Salesforce, ServiceNow, etc.). The original outline does not address this gap.

**Correction:** Phase 4 and Phase 7 now include instructions for using free SCIM test targets: the Microsoft Entra ID SCIM provisioning test app, Okta's built-in provisioning test apps, or an open-source SCIM simulator. Specific tools are named.

---

**Problem 2.6 — AWS Organizations and SCPs require a real multi-account setup**
SCPs (Service Control Policies) require AWS Organizations, which requires multiple AWS accounts. A learner with a single free-tier AWS account cannot test SCPs in production mode.

**Correction:** Phase 8 now treats SCPs as a design and documentation exercise with sample SCP JSON, architecture decision records, and diagrams — while noting that the learner can test SCPs only if they have access to an AWS Organizations environment or use AWS Control Tower in a lab account.

---

### CATEGORY 3 — SEQUENCING PROBLEMS

**Problem 3.1 — GitHub repository created without a documented commit strategy**
The original outline says to create the folder structure but does not establish a commit discipline, branch strategy, or pull request habit. This matters because the repository is a portfolio artifact and should show incremental, professional commits.

**Correction:** Phase 0 now includes a commit strategy: one commit per completed lab step, with a required commit message format, a main branch protection explanation, and a note about using feature branches for larger phases.

---

**Problem 3.2 — Diagrams are mentioned but no diagramming tool is specified**
The original outline says "create a diagram" repeatedly without specifying what tool to use. A learner new to IAM may not know what diagramming tools are available for free.

**Correction:** Phase 0 now specifies three free diagramming tool options: draw.io (diagrams.net, free, browser-based, no account required), Lucidchart free tier, and Excalidraw (open-source, browser-based). Instructions explain how to export diagrams as PNG for GitHub and how to use the diagrams/ folder.

---

**Problem 3.3 — Okta setup comes too late relative to platform comparison**
The program compares Entra ID and Okta in Phase 6, but a learner will not understand the comparison meaningfully until they have used both platforms. The comparison should be built incrementally from Phase 6 onward, not introduced as a one-time lab.

**Correction:** The Entra-vs-Okta comparison document is now a living document started in Phase 6 and updated through Phase 9. Each phase that adds an Okta concept also adds a comparison row to the document.

---

**Problem 3.4 — AWS IAM (Phase 8) is disconnected from Entra/Okta work**
The original outline builds AWS IAM independently and then tries to connect it in Phase 9. This makes Phase 9 feel like a retrofit. AWS IAM should be introduced conceptually in Phase 1 and connected to Entra/Okta earlier.

**Correction:** The access matrix built in Phase 1 now includes AWS access requirements. Phase 8 builds the AWS roles that mirror the departments and roles already created in Phases 2–5, making the connection natural.

---

**Problem 3.5 — Zero Trust is treated as a final phase rather than a thread**
Zero Trust is introduced only in Phase 10. But Zero Trust principles (MFA, Conditional Access, least privilege, device trust) are built into every phase. Treating it as a final topic creates a gap where earlier phases lack Zero Trust framing.

**Correction:** Each phase now ends with a "Zero Trust connection" section that explicitly maps the phase's controls to one or more Zero Trust principles: Verify Explicitly, Use Least Privilege, Assume Breach.

---

### CATEGORY 4 — MISSING CONTENT

**Problem 4.1 — No explanation of how to get a free Entra ID tenant**
The original outline says "set up or access an Entra ID tenant" but does not tell a beginner how to get one for free.

**Correction:** Phase 2 now begins with exact steps for obtaining a free Entra ID tenant through either: (a) the Microsoft 365 Developer Program (free 25-user tenant, recommended), or (b) an Azure free trial with Entra ID Free tier.

---

**Problem 4.2 — No explanation of how to get a free Okta tenant**
Same problem for Okta.

**Correction:** Phase 6 now begins with exact steps for creating a free Okta Workforce Identity developer account at developer.okta.com.

---

**Problem 4.3 — No AWS free tier guidance or spending alert setup**
The original outline does not mention AWS billing alerts or free tier limits. A learner who forgets to tear down resources could incur unexpected charges.

**Correction:** Phase 8 now begins with mandatory steps: enable AWS billing alerts, set a $5 budget alarm, and confirm the account is on the free tier before creating any resources.

---

**Problem 4.4 — No screenshot redaction workflow**
The original outline says to "blur or redact sensitive information" before committing screenshots but does not explain how to do this.

**Correction:** Phase 0 now includes a screenshot redaction workflow using three free tools: Microsoft Paint (Windows), Preview (Mac), or an online image editor. Specific instructions explain what to redact in each type of screenshot.

---

**Problem 4.5 — No troubleshooting note template integrated into early phases**
Troubleshooting notes are mentioned as a folder but the template is only shown in the documentation section. Learners will not use a template they have not seen.

**Correction:** The troubleshooting note template is now introduced in Phase 0, used explicitly in Phase 2 (first Entra ID labs), and referenced in every subsequent phase.

---

**Problem 4.6 — Architecture Decision Records explained but never demonstrated**
ADRs (Architecture Decision Records) have a folder and a template but no example is provided until Phase 9. A learner who has never written an ADR will not know how to produce a professional one.

**Correction:** Phase 0 now includes one fully written example ADR (the decision to use Entra ID as the primary identity platform) so the learner sees the exact format before they need to write one.

---

**Problem 4.7 — No naming convention enforcement mechanism**
The naming convention is documented but not enforced. A learner who deviates in Phase 2 will have naming inconsistencies through Phase 11.

**Correction:** Phase 0 now includes a naming convention cheat sheet that must be printed or kept open during every lab session. Phase 2 includes a naming validation step before moving forward.

---

**Problem 4.8 — No interview preparation integrated into phases**
Interview preparation is deferred entirely to Phase 11. But the STAR format stories should be drafted while the lab work is fresh.

**Correction:** Each phase now ends with a "Draft your STAR story for this phase" prompt. This means the learner enters Phase 11 with 10–11 rough STAR stories already written, not with nothing.

---

**Problem 4.9 — Repetition schedule mentioned but not tracked**
The spaced repetition schedule (rebuild on Day 1, Day 3, Day 7, Day 14, Day 30) is described in the source document but there is no tracking mechanism.

**Correction:** Phase 0 now includes creating a rebuild-tracker.md file in the repository with a table for each major lab, its rebuild dates, and a status column.

---

### CATEGORY 5 — UNCLEAR INSTRUCTIONS

**Problem 5.1 — "Configure SSO" without navigation**
Multiple phases say to "configure SSO" or "set up MFA" without specifying where in the portal to go.

**Correction:** Every implementation step now uses navigation-style instructions. No step says only "configure." Every step names the exact console, menu path, field name, and value.

---

**Problem 5.2 — "Test the policy" without test procedure**
Testing is mentioned without a defined test procedure. A learner may not know what a successful test looks like versus a failed one.

**Correction:** Every major configuration now includes a test procedure with: exact steps to trigger the policy, what the expected result is, what success looks like in the logs, and what failure looks like.

---

**Problem 5.3 — "Create a diagram" without diagram content guidance**
Diagrams are requested without specifying what elements must appear in them.

**Correction:** Every diagram instruction now includes a list of required elements, a suggested layout description, and a reference to an example diagram type (swimlane, flowchart, architecture box diagram, sequence diagram).

---

---

## REVISED BLUEPRINT

The following is the complete, corrected, phase-by-phase blueprint incorporating all audit corrections above.

---

## Repository Structure

```
identitycore-iam-project/
├── README.md                          ← Master portfolio README
├── .gitignore                         ← Must be created first
├── 00-program-overview/
│   ├── README.md
│   ├── naming-convention-cheatsheet.md
│   ├── lab-documentation-template.md
│   ├── troubleshooting-note-template.md
│   ├── adr-template.md
│   ├── rebuild-tracker.md
│   └── example-adr-entra-as-primary-idp.md
├── 01-lab-setup-and-documentation/
│   └── README.md
├── 02-identity-fundamentals/
│   ├── README.md
│   ├── identitycore-org-chart.md
│   ├── access-matrix.md
│   ├── iam-glossary.md
│   └── jml-flow-diagram.md
├── 03-entra-id-foundation/
│   ├── README.md
│   ├── user-inventory.md
│   ├── group-inventory.md
│   ├── dynamic-group-rules.md
│   └── entra-foundation-troubleshooting.md
├── 04-entra-conditional-access-mfa/
│   ├── README.md
│   ├── ca-policy-matrix.md
│   ├── break-glass-account-procedure.md
│   ├── mfa-policy-documentation.md
│   └── ca-troubleshooting.md
├── 05-entra-app-integrations/
│   ├── README.md
│   ├── saml-integration-document.md
│   ├── oidc-app-registration-document.md
│   └── scim-provisioning-document.md
├── 06-entra-lifecycle-governance/
│   ├── README.md
│   ├── jml-process-document.md
│   ├── access-package-design.md
│   ├── access-review-design.md
│   └── pim-design-document.md
├── 07-okta-foundation-federation/
│   ├── README.md
│   ├── okta-user-group-inventory.md
│   ├── okta-mfa-policy-matrix.md
│   └── entra-vs-okta-comparison.md
├── 08-okta-provisioning-workflows/
│   ├── README.md
│   ├── scim-provisioning-document.md
│   ├── joiner-workflow-document.md
│   ├── mover-workflow-document.md
│   └── leaver-workflow-document.md
├── 09-aws-iam-cloud-identity/
│   ├── README.md
│   ├── aws-role-matrix.md
│   ├── least-privilege-policy-examples.md
│   ├── permission-boundary-document.md
│   ├── scp-guardrail-document.md
│   └── cloudtrail-investigation-notes.md
├── 10-cross-platform-architecture/
│   ├── README.md
│   ├── source-of-truth-decision.md
│   ├── end-to-end-jml-architecture.md
│   └── federation-trust-document.md
├── 11-zero-trust-identity-design/
│   ├── README.md
│   ├── zero-trust-policy-map.md
│   ├── access-decision-tree.md
│   └── privileged-access-model.md
├── 12-final-portfolio-package/
│   ├── README.md
│   ├── executive-summary.md
│   ├── architecture-overview.md
│   ├── resume-bullets.md
│   ├── linkedin-summary.md
│   └── star-interview-stories.md
├── diagrams/
│   └── README.md
├── screenshots/
│   └── README.md
├── troubleshooting-notes/
│   └── README.md
├── architecture-decision-records/
│   └── README.md
├── glossary/
│   └── README.md
└── templates/
    └── README.md
```

---

## Naming Conventions — Cheat Sheet

Keep this open during every lab session.

| Object | Convention | Example |
|--------|-----------|---------|
| Users | user.department.role | user.finance.analyst |
| Groups (Entra) | GRP-Department-Role-Level | GRP-Finance-Analyst-Standard |
| Groups (Okta) | OKTA-GRP-Department-Role | OKTA-GRP-Finance-Analyst |
| Policies | POL-Platform-Control-Purpose | POL-Entra-CA-BlockLegacyAuth |
| Apps | APP-Platform-Protocol-Purpose | APP-Entra-SAML-TestApp |
| AWS Roles | ROLE-AWS-Function-PrivilegeLevel | ROLE-AWS-SecurityAudit-ReadOnly |
| Screenshots | PHASE-STEP-DESCRIPTION.png | P03-S2-CA-Policy-Created.png |
| Diagrams | DIA-Phase-Topic-Version.png | DIA-P03-CADecisionFlow-v1.png |
| ADRs | ADR-NNN-short-title.md | ADR-001-entra-as-primary-idp.md |
| Troubleshooting Notes | TRB-Phase-Topic.md | TRB-P04-SAML-ReplyURL-Error.md |

---

## Abbreviations Reference

Every abbreviation is defined here. Each is defined again the first time it appears in its phase.

| Abbreviation | Full Name | One-Line Meaning |
|---|---|---|
| IAM | Identity and Access Management | Managing who can access what, and how |
| Entra ID | Microsoft Entra ID | Microsoft's cloud identity platform (formerly Azure AD) |
| AWS IAM | Amazon Web Services IAM | AWS service for managing cloud access |
| SSO | Single Sign-On | Authenticate once, access many apps |
| MFA | Multi-Factor Authentication | Require two or more factors to authenticate |
| CA | Conditional Access | Entra policy engine that evaluates conditions before granting access |
| SAML | Security Assertion Markup Language | XML-based federation protocol for SSO |
| OAuth 2.0 | Open Authorization 2.0 | Authorization framework for delegated access |
| OIDC | OpenID Connect | Identity layer built on OAuth 2.0 for modern authentication |
| SCIM | System for Cross-domain Identity Management | Standard for automated provisioning |
| JML | Joiner, Mover, Leaver | Identity lifecycle: onboard, transfer, offboard |
| RBAC | Role-Based Access Control | Access based on roles |
| ABAC | Attribute-Based Access Control | Access based on user/resource attributes |
| PIM | Privileged Identity Management | Microsoft Entra tool for time-limited privileged access |
| PAM | Privileged Access Management | Broader discipline for controlling admin access |
| IGA | Identity Governance and Administration | Access reviews, lifecycle governance, compliance |
| SCP | Service Control Policy | AWS Organizations guardrail policy |
| IdP | Identity Provider | System that authenticates users (Entra ID, Okta) |
| SP | Service Provider | Application that trusts the IdP |
| ADR | Architecture Decision Record | Documented rationale for an architectural choice |

---

## Phase 0 — Project Setup and GitHub Documentation Foundation

### Objective

Build the complete working environment, documentation system, and GitHub repository before touching any identity platform. Nothing else starts until Phase 0 is complete.

### Business Scenario

IdentityCore, a fictional 500-person enterprise, is building a professional IAM practice from scratch. The IAM team needs a documentation system, a version-controlled repository, and a naming convention before any identity platform work begins. Without this foundation, the lab becomes a collection of disconnected screenshots with no portfolio value.

### Skills Learned
- GitHub repository creation and structure
- Professional technical documentation
- Naming conventions
- Screenshot management and redaction
- Architecture Decision Record (ADR) format
- Troubleshooting note format
- .gitignore for sensitive data protection

### Tools Needed
- GitHub account (free at github.com)
- Git installed locally (git-scm.com)
- A code editor: VS Code (free, recommended), Notepad++, or any plain text editor
- A diagramming tool — choose one:
  - draw.io / diagrams.net: free, browser-based, no account required at app.diagrams.net
  - Excalidraw: free, open-source at excalidraw.com
  - Lucidchart: free tier at lucidchart.com
- A screenshot tool:
  - Windows: Snipping Tool (built-in) or Snagit (paid)
  - Mac: Screenshot (built-in, Command+Shift+4)
- An image editor for redaction:
  - Windows: Paint (built-in)
  - Mac: Preview (built-in)
  - Any platform: pixlr.com (free browser-based)

### Prerequisites
- GitHub account created
- Git installed on your local machine
- VS Code or preferred editor installed

---

### Step-by-Step Implementation

#### Step 0.1 — Create the GitHub Repository

Navigate to: **github.com → Sign in → + icon (top right) → New repository**

Field values:
- Repository name: `identitycore-iam-project`
- Description: `IdentityCore Enterprise IAM Lab — hands-on identity architecture across Microsoft Entra ID, Okta, and AWS IAM`
- Visibility: **Public** (required for portfolio purposes — this will be your portfolio artifact)
- Initialize with: check **Add a README file**
- Add .gitignore: **None** (you will create a custom one in Step 0.3)
- License: **MIT** (recommended for portfolio projects)

Click **Create repository**.

**What this does:** Creates the public repository that will be your portfolio artifact. Recruiters, hiring managers, and interviewers will see this repository.

**Why it matters:** A portfolio without version control has no proof of incremental work. GitHub timestamps every commit, showing that you built this progressively over time.

---

#### Step 0.2 — Clone the Repository Locally

Open your terminal (Command Prompt, PowerShell, or Terminal on Mac):

```bash
git clone https://github.com/YOUR-USERNAME/identitycore-iam-project.git
cd identitycore-iam-project
```

Replace `YOUR-USERNAME` with your actual GitHub username.

**What this does:** Downloads the repository to your local machine so you can add files and push changes.

---

#### Step 0.3 — Create the .gitignore File

⚠️ **SECURITY CHECKPOINT: This step must happen before any other files are added. The .gitignore prevents accidentally committing sensitive data.**

Inside the `identitycore-iam-project/` folder, create a file named `.gitignore` with the following content:

```
# Environment and credential files
.env
*.env
*.key
*.pem
*.pfx
*.p12
secrets.json
credentials.json

# Sensitive screenshot patterns (rename these before committing)
*-UNREDACTED*
*-RAW*

# OS files
.DS_Store
Thumbs.db
desktop.ini

# Editor files
.vscode/settings.json
*.swp
*~

# Temporary files
*.tmp
*.log
/tmp/
```

Save the file. Then commit it:

```bash
git add .gitignore
git commit -m "phase-0: add .gitignore to protect sensitive data"
git push origin main
```

**What this does:** Tells Git to ignore files that could contain secrets, credentials, or raw sensitive screenshots.

**Why it matters:** One of the most common portfolio mistakes is accidentally committing environment variables, client secrets, or tenant IDs to a public repository. This file is your first line of defense.

---

#### Step 0.4 — Create the Folder Structure

From inside your repository folder, run the following commands. On Windows PowerShell, use `mkdir`. On Mac/Linux, use `mkdir -p`.

**Mac/Linux:**
```bash
mkdir -p 00-program-overview
mkdir -p 01-lab-setup-and-documentation
mkdir -p 02-identity-fundamentals
mkdir -p 03-entra-id-foundation
mkdir -p 04-entra-conditional-access-mfa
mkdir -p 05-entra-app-integrations
mkdir -p 06-entra-lifecycle-governance
mkdir -p 07-okta-foundation-federation
mkdir -p 08-okta-provisioning-workflows
mkdir -p 09-aws-iam-cloud-identity
mkdir -p 10-cross-platform-architecture
mkdir -p 11-zero-trust-identity-design
mkdir -p 12-final-portfolio-package
mkdir -p diagrams
mkdir -p screenshots
mkdir -p troubleshooting-notes
mkdir -p architecture-decision-records
mkdir -p glossary
mkdir -p templates
```

**Windows PowerShell:**
```powershell
"00-program-overview","01-lab-setup-and-documentation","02-identity-fundamentals","03-entra-id-foundation","04-entra-conditional-access-mfa","05-entra-app-integrations","06-entra-lifecycle-governance","07-okta-foundation-federation","08-okta-provisioning-workflows","09-aws-iam-cloud-identity","10-cross-platform-architecture","11-zero-trust-identity-design","12-final-portfolio-package","diagrams","screenshots","troubleshooting-notes","architecture-decision-records","glossary","templates" | ForEach-Object { New-Item -ItemType Directory -Name $_ }
```

GitHub does not track empty folders. Add a `.gitkeep` placeholder to each:

**Mac/Linux:**
```bash
find . -type d -empty -exec touch {}/.gitkeep \;
```

**Windows:** Create a blank file named `.gitkeep` inside each folder manually, or use this PowerShell:
```powershell
Get-ChildItem -Directory | ForEach-Object { New-Item -Path "$($_.FullName)\.gitkeep" -ItemType File }
```

---

#### Step 0.5 — Create the Root README.md

Replace the default README.md with a professional portfolio README. Copy this template exactly and fill in the bracketed fields:

```markdown
# IdentityCore Enterprise IAM Lab

> A hands-on enterprise identity architecture portfolio project covering Microsoft Entra ID,
> Okta Workforce Identity, and AWS IAM — built to demonstrate IAM engineering and 
> IAM architecture skills.

## Portfolio Summary

This project simulates a real enterprise identity environment for a fictional company called
IdentityCore. It is built incrementally across 12 phases, connecting identity lifecycle,
authentication, authorization, federation, provisioning, governance, cloud identity, and
Zero Trust architecture into one unified lab.

## Skills Demonstrated

- Microsoft Entra ID: users, groups, dynamic groups, Conditional Access, MFA, app integrations, lifecycle governance, PIM
- Okta: SSO, SAML, OIDC, SCIM provisioning, Workflows automation, MFA policies
- AWS IAM: roles, policies, least privilege, permission boundaries, SCPs, CloudTrail, Access Analyzer
- Identity Protocols: SAML 2.0, OAuth 2.0, OIDC, SCIM 2.0
- Identity Lifecycle: Joiner, Mover, Leaver (JML) automation across platforms
- Access Governance: access packages, access reviews, entitlement management
- Privileged Access: PIM design, PAM controls, break-glass procedures
- Zero Trust Architecture: MFA everywhere, device trust, Conditional Access, least privilege
- Documentation: architecture diagrams, ADRs, troubleshooting notes, portfolio documentation

## Tools Used

| Tool | Purpose |
|------|---------|
| Microsoft Entra ID | Primary identity platform |
| Okta Workforce Identity | Secondary IdP and federation |
| AWS IAM | Cloud identity and access control |
| draw.io | Architecture and flow diagrams |
| GitHub | Version control and portfolio hosting |
| VS Code | Documentation and lab notes |

## Architecture Overview

[Link to DIA-P10-CrossPlatformArchitecture-v1.png once created]

## Project Phases

| Phase | Topic | Status |
|-------|-------|--------|
| Phase 0 | Project Setup and GitHub Foundation | In Progress |
| Phase 1 | Identity Fundamentals | Not Started |
| Phase 2 | Microsoft Entra ID Foundation | Not Started |
| Phase 3 | Entra ID Conditional Access and MFA | Not Started |
| Phase 4 | Entra ID Application Integration | Not Started |
| Phase 5 | Entra ID Lifecycle and Governance | Not Started |
| Phase 6 | Okta Foundation and Federation | Not Started |
| Phase 7 | Okta Provisioning and Workflows | Not Started |
| Phase 8 | AWS IAM and Cloud Identity | Not Started |
| Phase 9 | Cross-Platform Identity Architecture | Not Started |
| Phase 10 | Zero Trust IAM Architecture | Not Started |
| Phase 11 | Final Portfolio Package | Not Started |

## Security Disclaimer

This repository contains lab documentation only. No real tenant IDs, client secrets, access 
keys, private keys, or user credentials are stored here. All screenshots have been reviewed 
and sensitive information has been redacted. This project uses isolated development tenants 
and does not connect to any production environment.

## How to Reproduce This Lab

See [00-program-overview/README.md](00-program-overview/README.md) for prerequisites and setup instructions.

---
*Built by [Your Name] | [Your LinkedIn URL] | [Date started]*
```

---

#### Step 0.6 — Create the Lab Documentation Template

Create file: `templates/lab-documentation-template.md`

```markdown
# Lab [PHASE.LAB] — [Lab Title]

**Phase:** [Phase number and name]  
**Date completed:** [YYYY-MM-DD]  
**Time spent:** [X hours]  
**Rebuild count:** [How many times rebuilt]

---

## Objective

What this lab teaches. One to three sentences.

## Business Scenario

Why this configuration would exist in a real company. What problem does it solve?

## Concepts Covered

- Concept 1 (with one-line definition)
- Concept 2
- Concept 3

## Tools and Platforms Used

- Platform name: specific feature used

## Prerequisites

- What must already be completed before this lab
- What accounts or access are required

## Architecture Context

How this lab fits into the larger IdentityCore enterprise identity architecture.

## What I Built

Describe what was configured. Be specific about names, values, and settings chosen.

## Step-by-Step Build Notes

### Step 1 — [Step name]
**Navigation:** [Platform → Menu → Submenu → Feature]  
**What I did:** [Exact actions taken]  
**Field values used:**
- Field name: value
- Field name: value

**Why this setting matters:** [Explanation]

### Step 2 — [Step name]
[Repeat format]

## What I Broke on Purpose

Describe the intentional misconfiguration. Be specific about what field or value was changed.

## Symptoms Observed

What failed. What error message appeared. What the user experience was.

## Troubleshooting Process

1. What I checked first
2. What I ruled out
3. What the sign-in logs or audit logs showed
4. What pointed me to the root cause

## Fix

What corrected the issue. What the correct value or setting is.

## Diagram

[Link to or embed diagram from /diagrams/ folder]

**Diagram type:** [Flowchart / Architecture / Sequence / Decision tree]  
**Tool used:** [draw.io / Excalidraw / Lucidchart]  
**File:** [DIA-PXX-Topic-v1.png]

## Testing and Validation

### Test Procedure
1. [Step to trigger the behavior]
2. [Expected result]
3. [Where to verify in logs]

### Test Result
- ✅ or ❌ and what was observed

## Screenshots Captured

| File | What it shows |
|------|--------------|
| P[XX]-S[X]-[description].png | [What is visible] |

## Security Lesson

What risk does this control address? What happens if this is misconfigured?

## Zero Trust Connection

Which Zero Trust principle does this apply to?
- [ ] Verify Explicitly
- [ ] Use Least Privilege
- [ ] Assume Breach

How?

## Architect Lesson

What design principle does this teach? What would an IAM architect decide differently than an operator?

## STAR Story Draft

**Situation:** [Context]  
**Task:** [What needed to be done]  
**Action:** [What you configured, investigated, or designed]  
**Result:** [What changed or improved]  
**Security lesson:** [Risk reduced]  
**Architecture lesson:** [Design principle]  

## Rebuild Checklist

Use this to rebuild the lab from scratch without instructions.

- [ ] Step 1
- [ ] Step 2
- [ ] Step 3
- [ ] Test validation complete
- [ ] Screenshots captured
- [ ] GitHub committed

## GitHub Files Updated

| File | Change made |
|------|-------------|
| [path/filename.md] | [What was added or updated] |

## Commit Message Used

```
phase-[X]: [short description of what was built]
```
```

---

#### Step 0.7 — Create the Troubleshooting Note Template

Create file: `templates/troubleshooting-note-template.md`

```markdown
# Troubleshooting Note — [Short Description]

**Reference ID:** TRB-P[XX]-[Topic]  
**Phase:** [Phase number]  
**Date:** [YYYY-MM-DD]  
**Platform:** [Entra ID / Okta / AWS IAM]

---

## Symptom

What did the user or system experience? What error message appeared? What did NOT work?

## Likely Cause

Before investigating — what was the most likely cause based on the symptom?

## Investigation Steps

1. Where I looked first: [Console / Log / Policy]
2. What I found: [Log entry / Error code / Setting value]
3. What I ruled out: [What was NOT the cause]
4. What confirmed the root cause: [Specific finding]

## Root Cause

What was actually wrong. Be specific.

## Fix

Exact steps to resolve the issue. Include navigation paths and field values.

## Verification

How I confirmed the fix worked.

## Prevention

What configuration or process change prevents this from happening again?

## Security Lesson

Does this misconfiguration create a security risk? What is the impact?

## Architect Lesson

What does this teach about designing IAM systems to avoid this class of problem?
```

---

#### Step 0.8 — Create the Architecture Decision Record Template

Create file: `templates/adr-template.md`

```markdown
# ADR-[NNN] — [Short Title]

**Status:** [Proposed / Accepted / Deprecated / Superseded by ADR-NNN]  
**Date:** [YYYY-MM-DD]  
**Deciders:** [IAM team / IdentityCore architecture team]

---

## Context

What is the problem or question that requires a decision? What forces or constraints exist?

## Decision

What was decided? State it clearly in one or two sentences.

## Options Considered

### Option A — [Name]
**Description:** What this option is  
**Pros:** Advantages  
**Cons:** Disadvantages  

### Option B — [Name]
**Description:** What this option is  
**Pros:** Advantages  
**Cons:** Disadvantages  

### Option C — [Name] (if applicable)
[Same format]

## Rationale

Why was the chosen option selected over the alternatives?

## Consequences

What changes as a result of this decision? What becomes easier? What becomes harder?

## Security Impact

Does this decision improve or reduce security? What risks does it introduce or mitigate?

## Operational Impact

How does this affect day-to-day IAM operations, helpdesk workflows, or user experience?

## Future Review

When should this decision be revisited? What conditions would trigger a change?
```

---

#### Step 0.9 — Create the First Example ADR

Create file: `architecture-decision-records/ADR-001-entra-as-primary-idp.md`

```markdown
# ADR-001 — Use Microsoft Entra ID as the Primary Identity Provider

**Status:** Accepted  
**Date:** [YYYY-MM-DD]  
**Deciders:** IdentityCore IAM Architecture Team

---

## Context

IdentityCore needs to choose a primary identity provider (IdP) for the enterprise. The 
primary IdP will be the source of truth for user accounts, authentication, and access 
control. All other platforms will federate to or from this IdP.

The organization uses Microsoft 365 for email and productivity, has an Azure presence for 
cloud infrastructure, and is evaluating Okta for application access management.

## Decision

Microsoft Entra ID will be the primary identity provider for IdentityCore. User accounts 
will be created and mastered in Entra ID. Okta will serve as a federation and application 
access layer. AWS will federate to Entra ID or Okta for console access.

## Options Considered

### Option A — Entra ID as Primary IdP
**Description:** Entra ID is the authoritative user directory. All users are created here. 
Conditional Access policies are enforced here. Apps authenticate through Entra ID directly 
or via Okta federation.  
**Pros:** Tight Microsoft 365 integration, native Conditional Access, PIM for privileged access, 
mature governance features, no additional license cost beyond Microsoft 365.  
**Cons:** Deep Microsoft dependency, less flexible for non-Microsoft SaaS applications.

### Option B — Okta as Primary IdP
**Description:** Okta is the authoritative user directory. Entra ID federates to Okta.  
**Pros:** Broader SaaS integration catalog, strong workflow automation, platform-neutral.  
**Cons:** Additional licensing cost, Microsoft 365 integration is less native, duplicates 
functionality already purchased.

### Option C — Hybrid (HR system as source of truth, both Entra and Okta as IdPs)
**Description:** HR system pushes identity events to both Entra ID and Okta. Each platform 
manages its own application set.  
**Pros:** Best of both platforms, realistic enterprise model.  
**Cons:** Complexity, synchronization challenges, higher operational overhead for a lab environment.

## Rationale

Entra ID is selected as the primary IdP because:
1. IdentityCore uses Microsoft 365, making Entra ID the natural directory.
2. Conditional Access, PIM, and governance features are native to Entra ID.
3. The lab learning path starts with Entra ID, making it the logical foundation.
4. Option C (hybrid) reflects real enterprise architecture but adds complexity 
   unsuitable for initial phases.

## Consequences

- All users are created in Entra ID first.
- Okta will be configured in Phase 6 as a federation layer and secondary IdP.
- AWS will use Entra ID (or Okta) for federated console access in Phase 8.
- If IdentityCore migrated to full Okta in the future, this decision would need to be revisited.

## Security Impact

Centralizing identity in Entra ID means Conditional Access policies and MFA enforcement 
apply at the primary authentication point. This is a security improvement over distributed 
identity sources. The risk is single-platform dependency — if Entra ID is unavailable, 
break-glass accounts must be available.

## Operational Impact

IAM operations will primarily happen in the Entra admin center. Okta admin tasks are 
secondary. AWS IAM role management is a separate discipline.

## Future Review

Review if: Okta is selected as primary for a new use case, the organization moves away 
from Microsoft 365, or a third IdP is introduced.
```

---

#### Step 0.10 — Create the Rebuild Tracker

Create file: `00-program-overview/rebuild-tracker.md`

```markdown
# Rebuild Tracker

Use this file to track when each major lab has been rebuilt from scratch.
Rebuilding from memory (with only your notes) is the primary retention mechanism.

## Rebuild Schedule

For each major lab, plan rebuilds on:
- Day 1: First build (during the phase)
- Day 3: First rebuild from notes
- Day 7: Second rebuild — faster this time
- Day 14: Third rebuild — near-automatic
- Day 30: Final rebuild — should be fully internalized

## Tracker

| Lab | Phase | First Build | Day 3 | Day 7 | Day 14 | Day 30 |
|-----|-------|-------------|-------|-------|--------|--------|
| GitHub repo setup | Phase 0 | | | | | |
| Folder structure | Phase 0 | | | | | |
| Entra ID user creation | Phase 2 | | | | | |
| Dynamic group rules | Phase 2 | | | | | |
| Block legacy auth CA policy | Phase 3 | | | | | |
| MFA for sensitive apps CA policy | Phase 3 | | | | | |
| Break-glass account setup | Phase 3 | | | | | |
| SAML app integration | Phase 4 | | | | | |
| OIDC app registration | Phase 4 | | | | | |
| SCIM provisioning | Phase 4 | | | | | |
| Joiner workflow | Phase 5 | | | | | |
| Mover workflow | Phase 5 | | | | | |
| Leaver workflow | Phase 5 | | | | | |
| Okta users and groups | Phase 6 | | | | | |
| Okta SAML SSO | Phase 6 | | | | | |
| Okta MFA policy | Phase 6 | | | | | |
| AWS IAM role baseline | Phase 8 | | | | | |
| Least privilege policy | Phase 8 | | | | | |
| Permission boundary | Phase 8 | | | | | |
| CloudTrail review | Phase 8 | | | | | |

*Add rows as new labs are completed.*
```

---

#### Step 0.11 — Create the Naming Convention Cheat Sheet

Create file: `00-program-overview/naming-convention-cheatsheet.md`

This file contains the naming convention table shown earlier in this document. Copy the naming convention table from the "Naming Conventions — Cheat Sheet" section above into this file.

---

#### Step 0.12 — Screenshot Redaction Workflow

Before committing any screenshot to GitHub, follow this mandatory redaction process.

**What must always be redacted in screenshots:**
- Tenant ID (appears as a GUID like `a1b2c3d4-...`)
- Azure subscription ID
- AWS Account ID (12-digit number)
- Email addresses of real users
- Client secrets or API keys visible in any field
- Internal IP addresses
- Your real name if you are using a personal Microsoft account

**How to redact using built-in tools:**

Windows Paint:
1. Open the screenshot in Paint
2. Use the Rectangle Select tool to select the sensitive area
3. Use Fill (paint bucket) with a solid color — black or white — to cover it
4. Save the file with the naming convention: `P[XX]-S[X]-[description].png`

Mac Preview:
1. Open the screenshot in Preview
2. Click Tools → Annotate → Rectangle
3. Set fill color to black
4. Draw over the sensitive area
5. Save

**Naming convention for screenshots:**
`P[PhaseNumber]-S[StepNumber]-[Description].png`

Examples:
- `P02-S1-UserList-Entra.png`
- `P03-S2-CA-PolicyCreated.png`
- `P08-S3-IAMRole-TrustPolicy.png`

Store all screenshots in: `screenshots/`

---

#### Step 0.13 — Commit Phase 0

```bash
git add .
git commit -m "phase-0: complete project setup, templates, ADR-001, rebuild tracker, naming conventions"
git push origin main
```

---

### Phase 0 Completion Checklist

Before moving to Phase 1, verify every item:

- [ ] GitHub repository created and public
- [ ] Repository cloned locally
- [ ] .gitignore created and committed first
- [ ] All folders created with .gitkeep placeholders
- [ ] Root README.md updated with portfolio content
- [ ] Lab documentation template created in templates/
- [ ] Troubleshooting note template created in templates/
- [ ] ADR template created in templates/
- [ ] ADR-001 (Entra as primary IdP) written and committed
- [ ] Rebuild tracker created
- [ ] Naming convention cheat sheet created
- [ ] Screenshot redaction workflow understood and documented
- [ ] All files committed and pushed to GitHub
- [ ] Repository visible and readable on github.com

---

### Phase 0 Deliverables Summary

| Deliverable | File Location |
|-------------|--------------|
| Repository structure | Root of identitycore-iam-project/ |
| .gitignore | /.gitignore |
| Root README | /README.md |
| Lab documentation template | /templates/lab-documentation-template.md |
| Troubleshooting note template | /templates/troubleshooting-note-template.md |
| ADR template | /templates/adr-template.md |
| ADR-001 example | /architecture-decision-records/ADR-001-entra-as-primary-idp.md |
| Rebuild tracker | /00-program-overview/rebuild-tracker.md |
| Naming convention cheat sheet | /00-program-overview/naming-convention-cheatsheet.md |

**Suggested commit message:** `phase-0: complete project setup, templates, ADR-001, rebuild tracker, naming conventions`

**Next step:** Phase 1 — Identity Fundamentals and Business Requirements.

---

## Phase 1 — Identity Fundamentals and Business Requirements

### Objective

Define what IdentityCore is, who works there, what access they need, and how identity flows work — before configuring any platform.

### Business Scenario

Before any IAM engineer configures a single policy, an IAM architect needs to understand the business. Who are the users? What do they access? How do they onboard? How do they leave? This phase produces the requirements that every future lab will implement.

### Skills Learned
- Org chart design
- Access matrix creation
- Identity flow diagramming
- JML (Joiner, Mover, Leaver) process design
- IAM glossary development
- Business requirements translation into IAM controls

### Tools Needed
- VS Code or text editor (for Markdown files)
- draw.io, Excalidraw, or Lucidchart (for diagrams)
- GitHub (for committing deliverables)

### Prerequisites
- Phase 0 complete and all files committed

---

### Step-by-Step Implementation

#### Step 1.1 — Create the IdentityCore Company Profile

Create file: `02-identity-fundamentals/identitycore-org-chart.md`

```markdown
# IdentityCore — Company Identity Profile

## Company Overview

**Company name:** IdentityCore Solutions  
**Industry:** Technology consulting  
**Employees:** 500 (simulated in lab with 8–12 test users)  
**Environment:** Hybrid (on-premises Active Directory not in scope; cloud-first for lab)

## Departments and Roles

| Department | Roles | Count (real) | Lab users |
|-----------|-------|-------------|-----------|
| Information Technology | IT Admin, Helpdesk | 25 | 1 |
| Security Operations | Security Analyst, SOC Analyst | 20 | 1 |
| Finance | Finance Analyst, Finance Manager | 50 | 1 |
| Human Resources | HR Specialist, HR Manager | 30 | 1 |
| Cloud Engineering | Cloud Engineer, DevOps Engineer | 40 | 1 |
| Contractors | Various | Variable | 1 |
| Executive Leadership | CEO, CFO, CISO, CTO | 8 | 1 |

## Lab Test User Roster

| Username | Department | Job Title | User Type | Access Level |
|----------|-----------|-----------|-----------|-------------|
| user.it.admin | IT | IT Administrator | Employee | Privileged |
| user.security.analyst | Security Ops | Security Analyst | Employee | Read-Only Cloud |
| user.finance.analyst | Finance | Finance Analyst | Employee | Standard |
| user.hr.specialist | HR | HR Specialist | Employee | Standard |
| user.cloud.engineer | Cloud Engineering | Cloud Engineer | Employee | Cloud Deployment |
| user.contractor.limited | Contractors | External Contractor | Contractor | Limited, time-bound |
| user.exec.cfo | Executive | CFO | Employee | Sensitive, phishing-resistant MFA |
| user.breakglass.01 | IT (Emergency) | Break-Glass Account | Emergency | Emergency only |
| user.breakglass.02 | IT (Emergency) | Break-Glass Account | Emergency | Emergency only |

## Identity Types Managed

| Identity Type | Description | Special Requirements |
|--------------|-------------|---------------------|
| Standard employees | Regular full-time staff | MFA required |
| Contractors | Third-party staff | Time-bound access, limited scope |
| Privileged administrators | IT and IAM admins | PIM/JIT, separate account |
| Break-glass accounts | Emergency access | Excluded from CA (partially), monitored |
| Service accounts | Non-human identities | No interactive login, monitored |
| Cloud roles | AWS IAM roles | Least privilege, no long-term keys |
| Application identities | Service principals | Certificate preferred over secret |
```

---

#### Step 1.2 — Create the Access Matrix

Create file: `02-identity-fundamentals/access-matrix.md`

This document defines who gets access to what and why. It becomes the authoritative reference for all group and policy configurations in later phases.

```markdown
# IdentityCore Access Matrix

## Legend
- ✅ Full access
- 📖 Read-only
- ❌ No access
- 🔐 Requires approval / JIT
- ⏱️ Time-limited

## Application and Resource Access Matrix

| User / Role | Finance App | HR System | SIEM / Security Tools | AWS Console | Cloud Infra Deploy | Executive Reports | Email / M365 |
|---|---|---|---|---|---|---|---|
| IT Admin | ❌ | ❌ | 📖 | 🔐 | ❌ | ❌ | ✅ |
| Security Analyst | ❌ | ❌ | ✅ | 📖 | ❌ | ❌ | ✅ |
| Finance Analyst | ✅ | ❌ | ❌ | ❌ | ❌ | 📖 | ✅ |
| HR Specialist | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ |
| Cloud Engineer | ❌ | ❌ | 📖 | ✅ | ✅ | ❌ | ✅ |
| Contractor | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ⏱️ |
| Executive (CFO) | ✅ | 📖 | 📖 | ❌ | ❌ | ✅ | ✅ |
| Break-Glass | 🔐 | 🔐 | 🔐 | 🔐 | 🔐 | 🔐 | 🔐 |

## MFA and Authentication Requirements

| User / Role | MFA Required | MFA Strength | Conditional Access |
|---|---|---|---|
| IT Admin | ✅ | Authenticator app minimum | Required for admin portals |
| Security Analyst | ✅ | Authenticator app | Required for security tools |
| Finance Analyst | ✅ | Authenticator app | Required for finance app |
| HR Specialist | ✅ | Authenticator app | Required |
| Cloud Engineer | ✅ | Authenticator app | Required for cloud access |
| Contractor | ✅ | Authenticator app | Required, location restricted |
| Executive (CFO) | ✅ | Phishing-resistant preferred | Required for all apps |
| Break-Glass | ✅ | Strong auth, offline stored | Partial CA exclusion |

## AWS Access Matrix

| Role | AWS Services | Permission Level |
|---|---|---|
| IT Admin | None by default | — |
| Security Analyst | CloudTrail, GuardDuty, IAM Access Analyzer | Read-only |
| Cloud Engineer | EC2, S3, Lambda, CloudFormation | Deploy (no IAM) |
| Finance User | AWS Cost Explorer, Billing | Read-only |
| Break-Glass | All services (emergency) | Full (monitored) |
```

---

#### Step 1.3 — Create the IAM Glossary

Create file: `glossary/iam-glossary.md`

Write each definition in your own words, not copied from vendor documentation. The act of writing definitions in your own words is part of the retention process. Use the abbreviations table at the top of this document as your source and rewrite each in your own words.

The glossary must include at minimum:
IAM, SSO, MFA, SAML, OAuth 2.0, OIDC, SCIM, JML, RBAC, ABAC, PIM, PAM, IGA, SCP, Permission Boundary, CloudTrail, IAM Access Analyzer, Zero Trust, IdP, SP, CA (Conditional Access), ADR, RBAC, ABAC.

---

#### Step 1.4 — Create the Identity Login Flow Diagram

Using draw.io (app.diagrams.net):

1. Open app.diagrams.net in your browser
2. Select "Create new diagram" → select "Flowchart"
3. Build this flow with rectangular boxes and arrows:

```
User opens application
        ↓
Application redirects to Identity Provider (Entra ID / Okta)
        ↓
User enters credentials (username + password)
        ↓
MFA challenge triggered
        ↓
User completes MFA
        ↓
Conditional Access policy evaluated
        ↓
[Policy grants access] → IdP issues token (SAML assertion or OIDC token)
        ↓
Token sent to application
        ↓
Application validates token
        ↓
User granted access to application
        ↓
Sign-in logged in IdP audit log
```

Required diagram elements:
- User (actor icon or box)
- Application (box)
- Identity Provider (box, labeled "Entra ID / Okta")
- MFA step (diamond — decision shape)
- Conditional Access evaluation (diamond)
- Token issuance (parallelogram or document shape)
- Log generation (cylinder shape for database/log)

Export: File → Export as → PNG → save to `diagrams/DIA-P01-IdentityLoginFlow-v1.png`

---

#### Step 1.5 — Create the JML Flow Diagram

Build a second diagram showing the Joiner, Mover, Leaver lifecycle.

**Joiner flow:**
```
HR creates employee record
        ↓
Identity provisioned in Entra ID (or Okta)
        ↓
Dynamic group assigns user to department group
        ↓
Applications provisioned via group membership or SCIM
        ↓
MFA registration required at first login
        ↓
Access confirmed in sign-in logs
```

**Mover flow:**
```
HR updates employee record (department change)
        ↓
Attribute updated in Entra ID / Okta
        ↓
Old department group removed (dynamic rule triggers)
        ↓
New department group added
        ↓
Old application access removed
        ↓
New application access granted
        ↓
Privileged access reviewed if applicable
        ↓
Change confirmed in audit logs
```

**Leaver flow:**
```
HR triggers offboarding event
        ↓
Account disabled in Entra ID
        ↓
Active sessions revoked
        ↓
Group memberships removed
        ↓
Application access removed
        ↓
AWS roles removed or access keys deleted
        ↓
Account retained (disabled) for X days per policy
        ↓
Audit evidence retained
```

Export: `diagrams/DIA-P01-JMLLifecycleFlow-v1.png`

---

#### Step 1.6 — Commit Phase 1

```bash
git add .
git commit -m "phase-1: identity fundamentals — org chart, access matrix, glossary, login flow diagram, JML diagram"
git push origin main
```

### Phase 1 Completion Checklist

- [ ] IdentityCore org chart created with all departments and test users
- [ ] Access matrix created covering all applications and user types
- [ ] AWS access requirements included in access matrix
- [ ] IAM glossary created with definitions in your own words
- [ ] Identity login flow diagram created and exported to diagrams/
- [ ] JML lifecycle flow diagram created and exported to diagrams/
- [ ] All files committed to GitHub
- [ ] STAR story draft written for "explaining IAM to a non-technical stakeholder"

**Next step:** Phase 2 — Microsoft Entra ID Foundation.

---

## Phase 2 — Microsoft Entra ID Foundation

### Objective

Build the primary identity platform. Create all test users, groups, and dynamic groups. Review sign-in and audit logs.

### 💳 LICENSING NOTE — Free Tier Available

Microsoft Entra ID Free is sufficient for Phase 2. Dynamic groups require Entra ID P1 or P2. However, the Microsoft 365 Developer Program provides a free 90-day renewable tenant with E5 licensing (which includes P2). **This is the recommended path.**

How to get a free tenant:
1. Go to: developer.microsoft.com/en-us/microsoft-365/dev-program
2. Click "Join now"
3. Sign in with or create a Microsoft account
4. Complete the registration — you receive a free Microsoft 365 E5 tenant with 25 test user licenses

Alternative (no Microsoft 365): Create a free Azure account at azure.com/free — this provides Entra ID Free tier. Dynamic groups will not be available without P1, but users and groups can still be created.

---

### Step-by-Step Implementation

#### Step 2.1 — Access the Entra Admin Center

Navigate to: **entra.microsoft.com**

Sign in with your developer tenant admin account (the one created when you joined the Microsoft 365 Developer Program, ending in `.onmicrosoft.com`).

⚠️ **SECURITY CHECKPOINT:** Confirm you are in your lab tenant. Check the tenant name in the top right corner of the portal. It should be your developer tenant (something like `identitycorelabXXX.onmicrosoft.com`). Do not proceed if you see your employer's tenant name.

---

#### Step 2.2 — Create Test Users

Navigate to: **Microsoft Entra admin center → Identity → Users → All users → + New user → Create new user**

Create each user from your access matrix. For each user, follow this exact process:

**User 1 — IT Admin**

On the "Create new user" screen:

- **User principal name:** `user.it.admin@[yourtenant].onmicrosoft.com`
- **Display name:** `IT Admin (Lab)`
- **Password:** Auto-generate (click "Show password" and save it temporarily in a local notepad — do NOT put it in GitHub)
- Click **Next: Properties**
- **First name:** IT
- **Last name:** Admin
- **Job title:** IT Administrator
- **Department:** Information Technology
- **Usage location:** United States (required for license assignment)
- Click **Next: Assignments** → skip for now
- Click **Review + create** → **Create**

Repeat for each remaining user:

| Username | Display Name | Job Title | Department |
|----------|-------------|-----------|-----------|
| user.security.analyst | Security Analyst (Lab) | Security Analyst | Security Operations |
| user.finance.analyst | Finance Analyst (Lab) | Finance Analyst | Finance |
| user.hr.specialist | HR Specialist (Lab) | HR Specialist | Human Resources |
| user.cloud.engineer | Cloud Engineer (Lab) | Cloud Engineer | Cloud Engineering |
| user.contractor.limited | Contractor Limited (Lab) | External Contractor | Contractors |
| user.exec.cfo | CFO Executive (Lab) | Chief Financial Officer | Executive Leadership |
| user.breakglass.01 | Break-Glass Account 01 | Emergency Access | IT |
| user.breakglass.02 | Break-Glass Account 02 | Emergency Access | IT |

**Why job titles and departments matter:** Dynamic groups in Step 2.5 use these attributes as membership rules. If department is blank, dynamic group assignment fails. This is a common real-world misconfiguration.

⚠️ **SECURITY CHECKPOINT — Break-Glass Users:** Break-glass accounts must use strong passwords stored offline (password manager or physical secure location — not in GitHub). These accounts should not have a manager assigned and should not be used for normal administration.

---

#### Step 2.3 — Create Security Groups

Navigate to: **Microsoft Entra admin center → Identity → Groups → All groups → + New group**

For each group, use these settings:

- **Group type:** Security
- **Membership type:** Assigned (for now — dynamic groups come next)

Create these groups:

| Group Name | Description |
|-----------|-------------|
| GRP-Finance-Analyst-Standard | Finance department standard users |
| GRP-HR-Specialist-Standard | HR department standard users |
| GRP-Security-Analyst-ReadOnly | Security Operations read-only access |
| GRP-CloudEngineer-Standard | Cloud Engineering standard access |
| GRP-Contractor-Limited | Contractor limited time-bound access |
| GRP-Executive-Sensitive | Executive leadership sensitive app access |
| GRP-IAM-Admins-Privileged | IAM administrators privileged access |
| GRP-BreakGlass-Emergency | Emergency access accounts |

After creating each group, add the corresponding test user as a member:
Navigate to the group → **Members → + Add members** → search for the user → select → click **Select**

---

#### Step 2.4 — Review Sign-In Logs (Baseline)

Before creating dynamic groups, generate some sign-in activity to review.

⚠️ Only do this in a private browser window and only with your lab tenant accounts.

1. Open a private/incognito browser window
2. Navigate to: **myapps.microsoft.com**
3. Sign in as `user.finance.analyst@[yourtenant].onmicrosoft.com`
4. Use the temporary password, then set a new password when prompted
5. Close the browser window

Now review the log:

Navigate to: **Microsoft Entra admin center → Identity → Monitoring & health → Sign-in logs**

You should see:
- User principal name: user.finance.analyst
- Application: My Apps
- Status: Success (or Interrupted if MFA was not yet configured)
- Authentication method: Password

**Screenshot to capture:** `P02-S4-SignInLog-FirstUserLogin.png`

⚠️ **SECURITY CHECKPOINT:** Before taking this screenshot, check that no sensitive tenant ID or real user email is visible. Redact or blur the tenant GUID.

---

#### Step 2.5 — Create Dynamic Groups

💳 **LICENSING NOTE:** Dynamic groups require Entra ID P1 or P2. If you are using the Microsoft 365 Developer Program tenant (E5), this feature is available. If you have Entra ID Free only, skip this step and document the design in a text file instead.

Navigate to: **Microsoft Entra admin center → Identity → Groups → All groups → + New group**

- **Group type:** Security
- **Membership type:** Dynamic User

Create this dynamic group:

**Dynamic Group 1 — Finance Department**
- **Group name:** GRP-Finance-Dynamic-AutoAssign
- **Membership rules:**
  - Click **Add dynamic query**
  - Property: `department`
  - Operator: `Equals`
  - Value: `Finance`
- Click **Save**

**Why this matters:** When a new user is created with `Department = Finance`, they are automatically added to this group. When they leave Finance, they are automatically removed. This is how lifecycle automation works at scale — without this, an admin must manually manage group membership for every user change.

**Break/Fix Exercise:**
1. Set the dynamic rule to `Department = Financce` (misspelled)
2. Observe: your Finance Analyst user is NOT in the group
3. Review the dynamic group membership and membership rules in the portal
4. Fix: correct the spelling to `Finance`
5. Observe: user joins the group within 1–5 minutes
6. Document this in a troubleshooting note: `troubleshooting-notes/TRB-P02-DynamicGroupRuleError.md`

---

#### Step 2.6 — Review Audit Logs

Navigate to: **Microsoft Entra admin center → Identity → Monitoring & health → Audit logs**

Filter by:
- **Date range:** Last 24 hours
- **Activity:** User created, Group created, Member added to group

You should see entries for every user and group you created.

**Screenshot to capture:** `P02-S6-AuditLog-UserGroupCreation.png`

**What this teaches:** Audit logs are your proof that configurations were made. In a real IAM incident investigation, audit logs prove who made what change and when. This is not optional documentation — it is IAM evidence.

---

#### Step 2.7 — Commit Phase 2

```bash
git add .
git commit -m "phase-2: Entra ID foundation — users, groups, dynamic groups, sign-in and audit log review"
git push origin main
```

Create and update: `03-entra-id-foundation/user-inventory.md` and `03-entra-id-foundation/group-inventory.md` using the lab documentation template.

### Phase 2 Completion Checklist

- [ ] Developer tenant obtained (Microsoft 365 Developer Program or Azure free trial)
- [ ] Signed in to Entra admin center and confirmed correct tenant
- [ ] All 9 test users created with correct department and job title attributes
- [ ] All 8 security groups created
- [ ] Users assigned to groups
- [ ] At least one dynamic group created (or documented if licensing unavailable)
- [ ] Sign-in log reviewed and screenshot captured
- [ ] Audit log reviewed and screenshot captured
- [ ] Break/fix exercise completed for dynamic group rule error
- [ ] Troubleshooting note written
- [ ] User inventory and group inventory documents committed to GitHub
- [ ] Zero Trust connection documented: Verify Explicitly (identity attributes enable attribute-based access control)
- [ ] STAR story draft written for "creating user lifecycle foundation in Entra ID"

**Next step:** Phase 3 — Entra ID Conditional Access and MFA.

---

## Phase 3 — Entra ID Conditional Access and MFA

### Objective

Configure modern access controls that evaluate identity, device, location, and risk before granting access. Build a break-glass account strategy before touching any policy.

### 💳 LICENSING NOTE

Conditional Access requires Entra ID P1 or P2. Sign-in risk policies require Entra ID P2. The Microsoft 365 Developer Program E5 tenant includes P2. Basic Conditional Access (P1-level) is the focus of this phase. Report-only mode is available to all tenants.

---

### MANDATORY FIRST STEP — Break-Glass Account Procedure

Before creating any Conditional Access policy, complete the break-glass account setup. A misconfigured CA policy can lock every user — including admins — out of the tenant. Break-glass accounts are the emergency exit.

#### Step 3.0 — Establish Break-Glass Account Procedure

Your two break-glass accounts (`user.breakglass.01` and `user.breakglass.02`) must be configured now.

Create file: `04-entra-conditional-access-mfa/break-glass-account-procedure.md`

```markdown
# Break-Glass Account Procedure — IdentityCore

## Account Details
- Account 1: user.breakglass.01@[tenant].onmicrosoft.com
- Account 2: user.breakglass.02@[tenant].onmicrosoft.com

## Password Storage
Passwords are stored in an offline password manager or physical vault.
Passwords are NOT stored in GitHub, cloud storage, or any digital system accessible
without a separate authentication layer.

## Role Assignment
Both accounts are assigned the Global Administrator role (permanent, not time-limited).
This is an exception to the PIM rule because PIM activation requires MFA,
which may not be accessible in an emergency.

## MFA Configuration
Break-glass accounts use a hardware security key (YubiKey) as MFA, or in a lab environment,
use the Microsoft Authenticator on a dedicated device. Do not use a phone that also receives 
MFA challenges for your regular admin account.

## Conditional Access Exclusion Rules
Break-glass accounts are excluded only from:
- Policies that would block all access during an emergency (e.g., location-based blocking)
- Policies requiring compliant devices (they may need to be used from any device)

Break-glass accounts are NOT excluded from:
- MFA requirement policies (they must still use MFA)
- Sign-in risk policies

## Monitoring
Configure an alert for any sign-in by either break-glass account:
- Go to Entra admin center → Identity → Monitoring → Diagnostic settings
- Alternatively, note that Entra ID P2 allows Identity Protection alerts
- At minimum, review sign-in logs weekly for any break-glass activity

## Usage Rules
1. Break-glass accounts are used ONLY when all other admin access fails
2. Use is documented immediately with timestamp, reason, and actions taken
3. Password is rotated after every use
4. Both accounts are tested quarterly (sign in, verify access, sign out, do not make changes)

## Quarterly Verification Schedule
| Quarter | Test Date | Tested By | Result |
|---------|-----------|-----------|--------|
| Q1 | | | |
| Q2 | | | |
| Q3 | | | |
| Q4 | | | |
```

---

#### Step 3.1 — Assign Global Admin to Break-Glass Accounts

Navigate to: **Microsoft Entra admin center → Identity → Users → All users → [select user.breakglass.01]**

→ **Assigned roles → + Add assignments → search "Global Administrator" → select → Add**

Repeat for user.breakglass.02.

⚠️ **SECURITY CHECKPOINT:** In a production environment, having two permanent Global Administrator accounts that are excluded from some CA policies is a calculated risk managed by the break-glass procedure above. This is the accepted industry practice, not a misconfiguration.

---

#### Step 3.2 — Create a Policy to Block Legacy Authentication

**What is legacy authentication?** Legacy authentication protocols (Basic Auth, older IMAP, POP3, SMTP) do not support MFA. Attackers use them to bypass MFA by authenticating directly without going through the Conditional Access evaluation. Blocking legacy auth is one of the highest-value CA policies you can deploy.

Navigate to: **Microsoft Entra admin center → Protection → Conditional Access → Policies → + New policy**

**Policy name:** `POL-Entra-CA-BlockLegacyAuth`

**Assignments:**
- **Users:** Click "Users and groups"
  - Include: All users
  - Exclude: Click "Exclude" tab → Users and groups → add `user.breakglass.01` and `user.breakglass.02`
  
**Target resources:**
- **Target resources:** Cloud apps → All cloud apps

**Conditions:**
- **Client apps:** Click "Client apps" → toggle to "Yes"
  - Check: **Exchange ActiveSync clients**
  - Check: **Other clients**
  - Leave unchecked: Browser, Mobile apps and desktop clients (those support modern auth)

**Access controls → Grant:**
- Select: **Block access**
- Click **Select**

**Enable policy:**
- Set to **Report-only** first (not "On")

Click **Create**

**Why report-only first:** Report-only mode evaluates the policy and records what it would have done in sign-in logs, without actually blocking anyone. This is how you test the impact before enforcing. Run the policy in report-only for at least 24–48 hours before switching to "On."

**Screenshot to capture:** `P03-S2-CA-BlockLegacyAuth-PolicyCreated.png`

---

#### Step 3.3 — Create a Policy Requiring MFA for Sensitive Apps

Navigate to: **Microsoft Entra admin center → Protection → Conditional Access → Policies → + New policy**

**Policy name:** `POL-Entra-CA-MFARequired-SensitiveGroups`

**Assignments:**
- **Users:** Groups tab → Include the following groups:
  - GRP-Finance-Analyst-Standard
  - GRP-Executive-Sensitive
  - GRP-IAM-Admins-Privileged
- **Exclude:** user.breakglass.01, user.breakglass.02

**Target resources:**
- **Cloud apps:** All cloud apps (for maximum coverage in lab)

**Grant:**
- **Grant access** → check **Require multifactor authentication**
- Click **Select**

**Enable policy:** Report-only first

Click **Create**

---

#### Step 3.4 — Test in Report-Only Mode

To test what the policy would have done:

1. Sign in as `user.finance.analyst` in a private browser window
2. Navigate to myapps.microsoft.com
3. After signing in, go back to Entra admin center

Navigate to: **Microsoft Entra admin center → Identity → Monitoring & health → Sign-in logs**

Find the sign-in event for user.finance.analyst and click it.

Look for the tab: **Conditional Access**

You will see your policy listed with result: **"Report-only: Would have applied"** or **"Report-only: Would not have applied"**

**Screenshot to capture:** `P03-S4-SignInLog-CAReportOnlyResult.png`

---

#### Step 3.5 — Enable MFA Policy and Test

Once you have reviewed the report-only results and confirmed the correct users are targeted:

Navigate to your MFA policy → Set **Enable policy** to **On** → **Save**

Test MFA:
1. Open a private browser window
2. Sign in as user.finance.analyst
3. You should be prompted to register MFA if not already done
4. Complete MFA registration using Microsoft Authenticator or SMS

**Screenshot to capture:** `P03-S5-MFA-RegistrationPrompt.png`

---

#### Step 3.6 — Break/Fix Exercise — Accidental Lockout Recovery

This exercise teaches you to recover from a misconfigured policy — one of the most critical real-world IAM skills.

**Break it:**
1. Modify the MFA policy to target "All users" (remove the group filter)
2. Remove break-glass exclusions
3. Sign out
4. Notice: all users now require MFA, including accounts that haven't registered

**How this would be fixed in production:**
- Sign in with a break-glass account (which has MFA configured)
- Navigate to the policy and restore the original group targeting and exclusions
- OR disable the policy temporarily to restore access

**In the lab:**
- Sign in with user.breakglass.01 (which has MFA configured)
- Go to Conditional Access → find the misconfigured policy → edit → restore exclusions
- Save

**Document this in:** `troubleshooting-notes/TRB-P03-CA-AccidentalLockout.md`

---

#### Step 3.7 — Create a Location-Based Named Location

Navigate to: **Microsoft Entra admin center → Protection → Conditional Access → Named locations → + Countries location**

- **Name:** `LOC-Trusted-UnitedStates`
- Select: United States
- Click **Create**

Now reference this in a new policy:

**Policy name:** `POL-Entra-CA-BlockHighRiskCountries`

Conditions → Locations:
- Include: Any location
- Exclude: LOC-Trusted-UnitedStates

Grant: Block access

Enable: Report-only

---

#### Step 3.8 — Commit Phase 3

```bash
git add .
git commit -m "phase-3: Conditional Access policies — block legacy auth, MFA for sensitive groups, location policy, break-glass procedure"
git push origin main
```

### Phase 3 Completion Checklist

- [ ] Break-glass account procedure document created and committed
- [ ] Break-glass accounts assigned Global Admin role
- [ ] Legacy authentication blocking policy created (report-only first)
- [ ] MFA policy created for Finance, Executive, and IAM Admin groups
- [ ] Report-only mode tested and sign-in log reviewed
- [ ] MFA policy enabled and MFA registration tested
- [ ] Break/fix exercise completed and documented
- [ ] Location-based policy created
- [ ] Named location created
- [ ] CA policy matrix document created and committed
- [ ] All screenshots captured and redacted
- [ ] Troubleshooting note written
- [ ] Zero Trust connection documented: Verify Explicitly (every access request is evaluated against conditions)
- [ ] STAR story draft written for "building a Conditional Access MFA policy"

**Next step:** Phase 4 — Entra ID Application Integration (SAML, OIDC, SCIM).

---

## Phase 4 — Entra ID Application Integration

### Objective

Configure federated authentication for enterprise applications using SAML and OIDC. Configure automated provisioning using SCIM.

### 💳 LICENSING NOTE — SAML and OIDC

SAML and OIDC app integrations are available in Entra ID Free tier for applications in the Microsoft Entra application gallery. For custom non-gallery SAML apps, Entra ID P1 is required. The Microsoft 365 Developer Program E5 tenant includes P1.

**Free SAML test option:** Use an application from the Entra ID gallery. AWS, Salesforce, ServiceNow, and hundreds of others are in the gallery. For a free self-hosted test, use **SAML Test Connector** (search for it in the gallery) or configure the AWS SSO integration if you have an AWS account.

**Free OIDC test option:** App Registrations (OIDC/OAuth) are available in all tiers. You will create an App Registration in your own tenant.

---

### Step 4.1 — Configure a SAML Application

**What SAML is:** SAML (Security Assertion Markup Language) allows Entra ID (the Identity Provider) to send a signed XML assertion to an application (the Service Provider) proving the user has authenticated. The application trusts Entra ID and grants access based on the assertion.

Navigate to: **Microsoft Entra admin center → Applications → Enterprise applications → + New application**

Search for: `AWS IAM Identity Center` (if you have an AWS account) or `SAML Test Connector` (no AWS needed)

Select the application → **Create**

Navigate to: **Single sign-on → SAML**

In the Basic SAML Configuration section, click **Edit**:

- **Identifier (Entity ID):** This is the unique name your application has registered. For the test connector, use: `https://identitycore-test-saml-app`
- **Reply URL (Assertion Consumer Service URL):** Where Entra sends the SAML assertion after authentication. Use: `https://identitycore-test-saml-app/acs` (for a real app, this is provided by the SP)
- **Sign-on URL:** Where the user is sent to initiate SSO. Use: `https://identitycore-test-saml-app/login`

Click **Save**

⚠️ **Break/Fix embedded in this step:** Deliberately enter the wrong Reply URL once and then try to "test" the SSO. You will see an error. The Entra sign-in logs will show the specific mismatch. Document what the error looks like, then correct the URL and confirm the test passes.

**Screenshot to capture:** `P04-S1-EnterpriseApp-SAMLConfig.png`

Create file: `05-entra-app-integrations/saml-integration-document.md` using the lab documentation template.

---

### Step 4.2 — Review SAML Claims

In the same SAML configuration:

Navigate to: **Attributes & Claims section → Edit**

Default claims include:
- `givenname` → user.givenname
- `surname` → user.surname
- `emailaddress` → user.mail
- `name` → user.userprincipalname

These are the attributes Entra sends in the SAML assertion to the application.

**Break/Fix exercise:** Remove the `emailaddress` claim. Test SSO (or observe what would happen). Document: if an application depends on receiving the email address claim and it is missing, the user may be denied access or receive an error. Restore the claim.

---

### Step 4.3 — Assign Users to the SAML App

Navigate to: **Applications → Enterprise applications → [your app] → Users and groups → + Add user/group**

Add:
- GRP-Finance-Analyst-Standard
- GRP-IAM-Admins-Privileged

**Why group assignment matters:** Only users in assigned groups can use this application. Assigning groups (not individual users) scales to enterprise size. An unassigned user attempting to access the app will receive an error.

---

### Step 4.4 — Register an OIDC Application

**What OIDC is:** OpenID Connect is a modern authentication protocol built on top of OAuth 2.0. When a user signs in, the application receives an ID token (proving who the user is) and optionally an access token (allowing the app to call APIs on the user's behalf).

Navigate to: **Microsoft Entra admin center → Applications → App registrations → + New registration**

- **Name:** `APP-Entra-OIDC-LabPortal`
- **Supported account types:** Accounts in this organizational directory only
- **Redirect URI:** Web → `https://localhost:3000/callback` (for a lab with no real app)

Click **Register**

After creation, note:
- **Application (client) ID** — this is the unique app identifier
- **Directory (tenant) ID** — your tenant

⚠️ **SECURITY CHECKPOINT:** These IDs are not secrets, but they are sensitive enough to redact from any public screenshot. Blur or cover these GUIDs before capturing screenshots.

Navigate to: **Certificates & secrets → + New client secret**
- Description: `LabPortalSecret-Phase4`
- Expires: 90 days
- Click **Add**

⚠️ **CRITICAL SECURITY CHECKPOINT:** Copy the client secret value immediately after creation. You cannot see it again after leaving this page. Store it only in a local secure notepad during the lab session. Do NOT paste it anywhere in your GitHub repository — not in documentation, not in notes, not in a README. If you accidentally commit a secret, rotate it immediately and use `git rm` to remove the file.

**Screenshot to capture:** `P04-S4-AppRegistration-Overview.png` (blur client ID and tenant ID)

Create file: `05-entra-app-integrations/oidc-app-registration-document.md`

---

### Step 4.5 — Configure SCIM Provisioning

💳 **LICENSING NOTE:** SCIM provisioning from Entra ID is available for gallery applications. Some applications require Entra ID P1 for provisioning. The Microsoft 365 Developer Program E5 tenant includes P1.

**Free SCIM test option:** The best free SCIM testing approach is to use **scim-faker** (an open-source SCIM endpoint simulator) or to use Entra ID's built-in SCIM test with a gallery application that has a free tier.

**Alternative — Document-only approach:** If a live SCIM target is not available, configure the provisioning settings in Entra for a gallery app (like AWS IAM Identity Center), document every field and setting, and capture screenshots of the provisioning configuration screen without activating provisioning.

Navigate to: **Applications → Enterprise applications → [your SAML app] → Provisioning → Get started**

- **Provisioning mode:** Automatic
- **Tenant URL:** [The SCIM endpoint of your target app]
- **Secret token:** [Token from your target app]

In the **Mappings** section:
- Review attribute mappings: which Entra attribute maps to which app attribute
- Common mappings:
  - `userPrincipalName` → `userName`
  - `displayName` → `displayName`
  - `mail` → `emails[type eq "work"].value`
  - `department` → `urn:ietf:params:scim:schemas:extension:enterprise:2.0:User:department`

**What each mapping does:** When Entra creates or updates a user in the target application, these mappings determine what data is sent. If a mapping is wrong, the application receives incorrect user attributes or provisioning fails.

Create file: `05-entra-app-integrations/scim-provisioning-document.md`

---

### Step 4.6 — Create a Token Flow Diagram

Using draw.io, create diagrams for:

**Diagram 1 — SAML Authentication Flow:**
```
User → Application
Application → Entra ID (redirect with AuthnRequest)
User → Entra ID (credentials + MFA)
Entra ID → User (SAML Assertion)
User → Application (SAML Assertion)
Application → (validates assertion signature)
Application → User (access granted)
```

Export: `diagrams/DIA-P04-SAMLAuthFlow-v1.png`

**Diagram 2 — OIDC Authentication Flow:**
```
User → Application
Application → Entra ID (authorization request)
User → Entra ID (credentials + MFA + consent)
Entra ID → Application (authorization code)
Application → Entra ID (exchange code for tokens)
Entra ID → Application (ID token + access token)
Application → User (access granted)
```

Export: `diagrams/DIA-P04-OIDCAuthFlow-v1.png`

---

### Step 4.7 — Commit Phase 4

```bash
git add .
git commit -m "phase-4: Entra app integrations — SAML config, OIDC registration, SCIM provisioning document, token flow diagrams"
git push origin main
```

### Phase 4 Completion Checklist

- [ ] SAML enterprise app configured (or documented for gallery app)
- [ ] SAML claims reviewed and modified in break/fix exercise
- [ ] Users and groups assigned to SAML app
- [ ] OIDC app registration created
- [ ] Client secret created and stored securely (not in GitHub)
- [ ] SCIM provisioning configured or documented
- [ ] Attribute mappings documented
- [ ] SAML flow diagram created
- [ ] OIDC flow diagram created
- [ ] All three lab documents created and committed
- [ ] Break/fix exercise: wrong Reply URL documented
- [ ] Break/fix exercise: missing claim documented
- [ ] Zero Trust connection: applications require authenticated, authorized, verified identity — no anonymous access
- [ ] STAR story drafted: "troubleshooting a SAML SSO integration failure"

**Next step:** Phase 5 — Entra ID Lifecycle and Governance.

---

## Phase 5 — Entra ID Lifecycle and Governance

### Objective

Build and document the full Joiner, Mover, Leaver lifecycle. Design access governance controls. Design Privileged Identity Management, with hands-on configuration where licensing allows.

### 💳 LICENSING NOTE — Phase 5 Features

| Feature | License Required | Available in M365 Dev Program E5? | Lab Approach |
|---------|-----------------|----------------------------------|--------------|
| Lifecycle Workflows | Entra ID Governance | Sometimes — check your tenant | Build if available; document design if not |
| Access Packages (Entitlement Management) | Entra ID P2 | Yes (E5 includes P2) | Build in lab |
| Access Reviews | Entra ID P2 | Yes (E5 includes P2) | Build in lab |
| Privileged Identity Management | Entra ID P2 | Yes (E5 includes P2) | Build in lab |

To check your license:
Navigate to: **Microsoft Entra admin center → Identity → Overview → Licenses**

---

### Step 5.1 — Joiner Workflow (Manual Simulation)

Even without Lifecycle Workflows automation, you can simulate and document the joiner process manually.

**Scenario:** A new Finance Analyst, `user.finance.newjoin`, joins IdentityCore.

**Steps:**

1. Navigate to: **Microsoft Entra admin center → Identity → Users → All users → + New user → Create new user**

2. Create the user with:
   - Username: `user.finance.newjoin@[tenant].onmicrosoft.com`
   - Department: Finance
   - Job title: Finance Analyst

3. Observe dynamic group: Within 1–5 minutes, check if `GRP-Finance-Dynamic-AutoAssign` now includes this user. Navigate to: **Identity → Groups → [group name] → Members**

4. Assign the SAML app to the Finance group if not already done

5. Sign in as the new user in a private browser to confirm access

6. Review audit logs for the onboarding events

Document in: `06-entra-lifecycle-governance/jml-process-document.md`

---

### Step 5.2 — Mover Workflow

**Scenario:** user.finance.analyst moves to Security Operations.

**Steps:**

1. Navigate to: **Identity → Users → user.finance.analyst → Edit properties**

2. Change **Department** from `Finance` to `Security Operations`

3. Change **Job title** to `Security Analyst`

4. Save

5. Observe within 5 minutes:
   - Dynamic Finance group: user should be removed
   - Document: check if the user still has Finance app access (they should be removed if app is assigned via group)

6. Manually add the user to GRP-Security-Analyst-ReadOnly

7. Review audit logs for the attribute change and group membership changes

**Architect lesson:** This manual simulation reveals why automation is critical. In a company with 500 movers per year, manual attribute updates are error-prone. SCIM + dynamic groups + lifecycle workflows eliminate this risk.

---

### Step 5.3 — Leaver Workflow

**Scenario:** user.contractor.limited's contract ends.

**Steps:**

1. Navigate to: **Identity → Users → user.contractor.limited**

2. Click **Block sign-in**: Toggle to "Yes" → Save

3. Navigate to: **Sessions → Revoke sessions**

4. Navigate to: **Groups** tab → review memberships (note them before removal)

5. Remove from all groups: each group → Members → remove user

6. Review sign-in logs: attempt to sign in as this user in a private browser — confirm you receive "Your account is blocked" error

7. Capture this error screen as a screenshot: `P05-S3-Leaver-AccountBlocked.png`

8. Navigate to: **Audit logs** → filter for this user → export the events as evidence

---

### Step 5.4 — Access Package (If Entra ID P2 Available)

Navigate to: **Microsoft Entra admin center → Identity Governance → Entitlement management → Access packages → + New access package**

- **Name:** `AP-Finance-StandardAccess`
- **Description:** Standard access package for Finance department users
- **Catalog:** Default catalog

**Resource roles tab:**
- Add resource → Groups → GRP-Finance-Analyst-Standard
- Role: Member

**Requests tab:**
- Who can request: Users in your directory
- Approvers: user.it.admin (the IT Admin user)
- Require approval: Yes

**Lifecycle tab:**
- Expiration: After number of days → 365

Click **Create**

**Test:** Sign in as user.hr.specialist and navigate to myaccess.microsoft.com — they should be able to request the Finance access package, which then routes to user.it.admin for approval.

💳 **If Entra ID P2 is not available:** Create the design document `06-entra-lifecycle-governance/access-package-design.md` describing what you would configure, why each setting matters, and what the user and approver experience would be. This design document has portfolio value even without a live configuration.

---

### Step 5.5 — Privileged Identity Management Design and Configuration

💳 **If PIM is available (Entra ID P2):**

Navigate to: **Microsoft Entra admin center → Identity governance → Privileged Identity Management → Microsoft Entra roles → Manage → Role settings**

Select: **Security Administrator**

Configure:
- **Activation maximum duration:** 4 hours
- **Require MFA on activation:** Yes
- **Require justification on activation:** Yes
- **Require approval to activate:** Optional (yes for production, optional for lab)

Now assign user.it.admin as **Eligible** (not Active) for Security Administrator:

Navigate to: **PIM → Microsoft Entra roles → Assignments → + Add assignments**
- Role: Security Administrator
- Assignment type: Eligible
- Member: user.it.admin
- Duration: permanent eligible (for lab; time-limited in production)

**Test PIM activation:**
1. Sign in as user.it.admin in a private browser
2. Navigate to: entra.microsoft.com → Identity governance → PIM → My roles
3. Find Security Administrator → Activate
4. Enter justification: "Testing PIM activation for lab documentation"
5. Complete MFA
6. Observe: role is now Active for 4 hours

**Screenshot to capture:** `P05-S5-PIM-RoleActivated.png`

💳 **If PIM is not available:** Create: `06-entra-lifecycle-governance/pim-design-document.md` with the full design: which roles require PIM, activation duration, approval requirements, and audit expectations.

---

### Step 5.6 — Commit Phase 5

```bash
git add .
git commit -m "phase-5: lifecycle governance — joiner/mover/leaver workflows, access package design, PIM configuration"
git push origin main
```

### Phase 5 Completion Checklist

- [ ] Joiner workflow simulated and documented
- [ ] Mover workflow simulated (department change → group change → access change)
- [ ] Leaver workflow simulated (account disabled, session revoked, groups removed)
- [ ] Account blocked state screenshot captured
- [ ] Access package configured (or designed and documented)
- [ ] PIM eligible role assignment configured (or designed and documented)
- [ ] PIM activation tested (if available)
- [ ] JML process document committed
- [ ] Break/fix: user keeps old access after mover event — documented
- [ ] Audit log evidence captured for each lifecycle event
- [ ] Zero Trust connection: access is time-limited, reviewed, and revoked promptly
- [ ] STAR story drafted: "designing and implementing a leaver offboarding process"

**Next step:** Phase 6 — Okta Foundation and Federation.

---

## Phase 6 — Okta Foundation and Federation

### Objective

Set up Okta as a secondary identity platform. Build users, groups, and SSO applications. Create the living Entra-vs-Okta comparison document.

### How to Get a Free Okta Environment

Navigate to: **developer.okta.com → Sign up for free**

Create a free Okta Workforce Identity developer account. This provides:
- Full Okta admin console
- User and group management
- App integrations
- MFA policies
- SAML and OIDC SSO

⚠️ **Important:** Use a dedicated email address for this account (not your work email). The account is your personal lab tenant.

---

### Step 6.1 — Access the Okta Admin Console

After creating your developer account:

Navigate to: **[yourname]-admin.okta.com** (the admin URL provided in your welcome email)

Sign in with your admin credentials.

⚠️ **SECURITY CHECKPOINT:** This is your Okta lab tenant. Confirm the tenant URL before proceeding. Do not sign in to a shared or employer Okta tenant.

---

### Step 6.2 — Create Okta Users

Navigate to: **Okta Admin Console → Directory → People → Add person**

For each user, fill in:
- First name, Last name, Username, Primary email
- Groups: assign the appropriate Okta group (created in next step)
- Password: set by admin (temporary)

Create these users:

| Full Name | Username | Department |
|-----------|----------|-----------|
| Finance Analyst (Okta) | user.finance.analyst@oktalab.com | Finance |
| HR Specialist (Okta) | user.hr.specialist@oktalab.com | HR |
| Security Analyst (Okta) | user.security.analyst@oktalab.com | Security |
| Cloud Engineer (Okta) | user.cloud.engineer@oktalab.com | Cloud Engineering |
| Contractor (Okta) | user.contractor.limited@oktalab.com | Contractors |

---

### Step 6.3 — Create Okta Groups

Navigate to: **Okta Admin Console → Directory → Groups → Add Group**

Create:
- OKTA-GRP-Finance-Analyst
- OKTA-GRP-HR-Specialist
- OKTA-GRP-Security-Analyst
- OKTA-GRP-CloudEngineer
- OKTA-GRP-Contractor
- OKTA-GRP-IAM-Admins

Add corresponding users to each group: Groups → [group name] → Manage People → add user → Save.

---

### Step 6.4 — Configure Okta MFA Policy

Navigate to: **Okta Admin Console → Security → Authenticators**

Review which authenticators are enabled (Okta Verify, Google Authenticator, SMS, etc.)

Navigate to: **Security → Authentication policies → Default policy → Edit**

Add a rule:
- **Rule name:** `POL-Okta-MFA-AllUsers`
- **IF user's group membership includes:** select all groups
- **THEN:** require: Okta Verify or Google Authenticator
- **Access is:** Allowed after MFA

Save.

Create file: `07-okta-foundation-federation/okta-mfa-policy-matrix.md` documenting this policy.

---

### Step 6.5 — Configure a SAML App in Okta

Navigate to: **Okta Admin Console → Applications → Applications → Create App Integration**

- **Sign-in method:** SAML 2.0
- Click **Next**

**General Settings:**
- App name: `APP-Okta-SAML-TestApp`

**SAML Settings:**
- Single sign-on URL: `https://identitycore-test-saml-okta/acs`
- Audience URI (SP Entity ID): `https://identitycore-test-saml-okta`
- Name ID format: EmailAddress
- Application username: Okta username

**Attribute statements:**
- Add: `department` → `user.department`
- Add: `email` → `user.email`

Click **Next → Finish**

**Assign to groups:**
Navigate to: Applications → [your app] → Assignments → Assign → Assign to Groups → OKTA-GRP-Finance-Analyst → Assign

**Screenshot to capture:** `P06-S5-Okta-SAMLAppConfig.png`

---

### Step 6.6 — Create the Living Entra-vs-Okta Comparison Document

Create file: `07-okta-foundation-federation/entra-vs-okta-comparison.md`

```markdown
# Entra ID vs Okta — Living Comparison Document

*Updated throughout Phases 6–9 as each capability is built in both platforms.*

| Capability | Entra ID | Okta | Notes |
|-----------|---------|------|-------|
| User management | Entra admin center → Identity → Users | Okta Admin → Directory → People | Both have full user lifecycle |
| Group types | Assigned + Dynamic | Assigned + Rules-based | Dynamic = Entra, Rules-based = Okta |
| SAML SSO | Enterprise Applications | App Integration → SAML 2.0 | Both produce signed assertions |
| OIDC | App Registrations | App Integration → OIDC | Both support modern auth |
| MFA | Conditional Access → Grant → Require MFA | Security → Authentication policies | CA is more granular in Entra |
| SCIM provisioning | Enterprise App → Provisioning → Automatic | Application → Provisioning → API Integration | Both support SCIM 2.0 |
| Audit logs | Monitoring → Audit logs | Reports → System Log | Both record all admin events |
| Sign-in logs | Monitoring → Sign-in logs | Reports → System Log | Both record authentication events |
| Lifecycle automation | Lifecycle Workflows (P2/Governance) | Okta Workflows (requires specific plan) | Both require paid features for full automation |
| Access reviews | Identity Governance → Access reviews | No native equivalent (use third-party) | Entra has stronger native IGA |
| Privileged access | PIM (P2) | No native PIM equivalent | Entra advantage for Microsoft-centric orgs |
| SSO app catalog | 3,000+ gallery apps | 7,000+ integrations | Okta has larger catalog |

*Add rows as new capabilities are configured.*
```

---

### Step 6.7 — Commit Phase 6

```bash
git add .
git commit -m "phase-6: Okta foundation — users, groups, MFA policy, SAML app, Entra-vs-Okta comparison started"
git push origin main
```

### Phase 6 Completion Checklist

- [ ] Okta developer account created
- [ ] Okta users created matching IdentityCore roster
- [ ] Okta groups created with naming convention
- [ ] Users assigned to groups
- [ ] MFA policy created and documented
- [ ] SAML app configured in Okta
- [ ] App assigned to Finance group
- [ ] Entra-vs-Okta comparison document created and populated
- [ ] Screenshots captured and redacted
- [ ] Break/fix: misconfigured SAML sign-on URL — documented
- [ ] Zero Trust connection: Okta enforces identity verification regardless of network location
- [ ] STAR story drafted: "comparing Entra ID and Okta capabilities for enterprise SSO"

**Next step:** Phase 7 — Okta Provisioning and Workflows.

---

## Phase 7 — Okta Provisioning and Workflows

### Objective

Configure SCIM provisioning from Okta. Design and document Okta Workflows for JML automation.

### 💳 LICENSING NOTE — Okta Workflows

Okta Workflows requires a specific Okta plan (Okta Workflows or Okta Identity Engine with Workflows add-on). The free Okta developer account may not include Workflows.

**Lab approach when Workflows is unavailable:**
1. Design the workflow logic in your documentation
2. Create workflow diagrams in draw.io showing the trigger → condition → action flow
3. Document what each card in the workflow would look like
4. This design documentation has the same portfolio value as a live screenshot

---

### Step 7.1 — Configure SCIM Provisioning from Okta

Navigate to: **Okta Admin Console → Applications → Applications → [your SAML app] → Provisioning → Configure API Integration**

Enable provisioning by entering the target SCIM endpoint and token.

Navigate to: **Provisioning → To App**

Enable:
- Create users: On
- Update user attributes: On
- Deactivate users: On

**Attribute mappings:** Review and document:
- `login` → `userName`
- `email` → `emails[primary eq "true"].value`
- `firstName` → `name.givenName`
- `lastName` → `name.familyName`
- `department` → `urn:ietf:params:scim:schemas:extension:enterprise:2.0:User:department`

Create file: `08-okta-provisioning-workflows/scim-provisioning-document.md`

---

### Step 7.2 — Design Joiner Workflow

Even without Okta Workflows access, design the workflow:

Create file: `08-okta-provisioning-workflows/joiner-workflow-document.md`

```markdown
# Okta Workflow — Joiner Automation

## Trigger
Event: User Created in Okta

## Conditions
If user.department = Finance → proceed to Finance onboarding flow
If user.department = Security Operations → proceed to Security onboarding flow

## Actions — Finance Onboarding
1. Add user to OKTA-GRP-Finance-Analyst
2. Assign APP-Okta-SAML-TestApp to user
3. Send welcome email to user
4. Create ticket in ITSM system (if integrated)
5. Log action to audit record

## Actions — Security Onboarding
1. Add user to OKTA-GRP-Security-Analyst
2. Assign Security tools application
3. Require additional MFA factor registration
4. Notify Security team manager

## Error Handling
If group assignment fails → send alert to IAM admin
If app assignment fails → create incident ticket

## Diagram
[Link to DIA-P07-OktaJoinerWorkflow-v1.png]
```

Build the diagram in draw.io using a swimlane format:
- Lane 1: HR System (trigger source)
- Lane 2: Okta (workflow actions)
- Lane 3: Target Application (result)

Export: `diagrams/DIA-P07-OktaJoinerWorkflow-v1.png`

---

### Step 7.3 — Design Mover Workflow

Create file: `08-okta-provisioning-workflows/mover-workflow-document.md`

Follow the same format as the joiner document. Trigger: User Profile Updated (department attribute changes). Actions: remove old group, add new group, update app assignments, trigger access review if user had privileged access.

---

### Step 7.4 — Design Leaver Workflow

Create file: `08-okta-provisioning-workflows/leaver-workflow-document.md`

Trigger: User status changes to Deprovisioned or Suspended. Actions: remove all group memberships, remove all app assignments, revoke sessions, log evidence, notify manager and IT.

---

### Step 7.5 — Break/Fix Exercise — Wrong Attribute Mapping

Document this scenario in a troubleshooting note:

**Symptom:** Users provisioned to the target application have no department value — the department field is blank in the target app.

**Cause:** The attribute mapping for `department` was not configured, or was mapped to the wrong Okta profile attribute.

**Investigation:** Check Okta provisioning logs (Applications → [app] → Provisioning → Logs) for errors or warnings on user create events.

**Fix:** Go to Provisioning → To App → Attribute Mappings → find department → map to `user.department`

Save file: `troubleshooting-notes/TRB-P07-SCIM-MissingAttributeMapping.md`

---

### Step 7.6 — Commit Phase 7

```bash
git add .
git commit -m "phase-7: Okta provisioning — SCIM config, JML workflow designs, attribute mapping troubleshooting"
git push origin main
```

### Phase 7 Completion Checklist

- [ ] SCIM provisioning configured or documented
- [ ] Attribute mappings documented
- [ ] Joiner workflow designed, documented, and diagrammed
- [ ] Mover workflow designed, documented, and diagrammed
- [ ] Leaver workflow designed, documented, and diagrammed
- [ ] Attribute mapping break/fix documented
- [ ] Entra-vs-Okta comparison updated with provisioning row
- [ ] Zero Trust connection: deprovisioning removes access immediately — no residual access

**Next step:** Phase 8 — AWS IAM and Cloud Identity.

---

## Phase 8 — AWS IAM and Cloud Identity

### Objective

Build AWS IAM roles, policies, permission boundaries, and monitoring. Apply least privilege throughout. Secure the root account as the mandatory first action.

### How to Get a Free AWS Account

Navigate to: **aws.amazon.com → Create a Free Account**

Requirements: email address, phone number, credit card (required but not charged for free tier usage).

⚠️ **SECURITY CHECKPOINT — Billing Alert (Mandatory):**

After creating your account, before anything else:

Navigate to: **AWS Console → Billing → Budgets → Create budget**
- Budget type: Cost budget
- Amount: $5.00
- Alert threshold: 80% of budgeted amount
- Email alert to your email address

This ensures you receive an alert before incurring unexpected charges.

---

### Step 8.0 — MANDATORY: Secure the AWS Root Account

**What the root account is:** The AWS root account has unrestricted access to every AWS service and billing. It cannot be restricted by IAM policies. Compromise of the root account is catastrophic.

**Steps — do these now, in this order:**

1. **Enable MFA on root account:**
   Navigate to: **AWS Console → [your name, top right] → Security credentials → Multi-factor authentication → Assign MFA device**
   - Select: Authenticator app
   - Scan the QR code with your MFA app
   - Enter two consecutive codes to confirm

2. **Delete root access keys (if any exist):**
   Navigate to: **Security credentials → Access keys**
   - If any access keys exist: Delete them immediately
   - Root access keys should never exist

3. **Create an IAM admin user for daily work:**
   Navigate to: **AWS Console → IAM → Users → Add users**
   - Username: `admin-iam-lab`
   - Access type: AWS Management Console access
   - Console password: custom, strong password
   - Require password reset: Yes
   - Attach policies: AdministratorAccess (for this admin user only)

4. **Sign out of root and sign in as admin-iam-lab from this point forward**

5. **Document:** `09-aws-iam-cloud-identity/README.md` — add a note that root is secured and you are using a named IAM admin user.

---

### Step 8.1 — Build the AWS IAM Role Baseline

Navigate to: **AWS Console (signed in as admin-iam-lab) → IAM → Roles → Create role**

Create these five roles:

**Role 1 — Security Audit Role**

- **Trusted entity:** AWS account (same account, for cross-role assumption in lab)
- **Role name:** `ROLE-AWS-SecurityAudit-ReadOnly`
- **Permission policy:** `SecurityAudit` (AWS managed policy)

This role gives a security analyst read-only access to security-relevant services: CloudTrail, GuardDuty, IAM, Security Hub.

**Role 2 — Cloud Engineer Deployment Role**

- **Role name:** `ROLE-AWS-CloudEngineer-Deploy`
- **Permissions:** Create a custom policy (next step)

**Role 3 — Billing Read-Only Role**

- **Role name:** `ROLE-AWS-Billing-ReadOnly`
- **Permission policy:** `Billing` (AWS managed — may require billing console access enabled)

**Role 4 — Developer Role**

- **Role name:** `ROLE-AWS-Developer-Standard`
- **Permission policy:** custom least-privilege policy (next step)

**Role 5 — IAM Diagnostic Role (read-only)**

- **Role name:** `ROLE-AWS-IAMReadOnly-Diagnostic`
- **Permission policy:** `IAMReadOnlyAccess` (AWS managed)

⚠️ Do not create an IAM Admin role that allows `iam:*` without a permission boundary. If you create such a role, add a permission boundary in Step 8.3.

---

### Step 8.2 — Build Least-Privilege Policies

Navigate to: **AWS Console → IAM → Policies → Create policy**

Use the JSON editor. Create this policy for the Cloud Engineer role:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "EC2DeploymentAccess",
      "Effect": "Allow",
      "Action": [
        "ec2:DescribeInstances",
        "ec2:RunInstances",
        "ec2:TerminateInstances",
        "ec2:StopInstances",
        "ec2:StartInstances",
        "ec2:DescribeSecurityGroups",
        "ec2:DescribeVpcs",
        "ec2:DescribeSubnets"
      ],
      "Resource": "*"
    },
    {
      "Sid": "S3BucketAccess",
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:PutObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::identitycore-lab-*",
        "arn:aws:s3:::identitycore-lab-*/*"
      ]
    },
    {
      "Sid": "DenyIAMChanges",
      "Effect": "Deny",
      "Action": "iam:*",
      "Resource": "*"
    }
  ]
}
```

**What each section does:**
- `EC2DeploymentAccess`: Allows launching, stopping, and terminating EC2 instances, and reading network configuration
- `S3BucketAccess`: Allows reading and writing to only S3 buckets that start with "identitycore-lab-" — no wildcard on all buckets
- `DenyIAMChanges`: Explicitly denies all IAM actions — a cloud engineer should never be able to modify IAM policies or escalate their own privileges

**Policy name:** `POL-AWS-CloudEngineer-LeastPrivilege`

---

### Step 8.3 — Create a Permission Boundary

A permission boundary is an advanced IAM control. It defines the maximum permissions an IAM entity can have, even if another policy grants more. Used when delegating IAM management to team leads or developers.

Navigate to: **IAM → Policies → Create policy**

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowedServicesBoundary",
      "Effect": "Allow",
      "Action": [
        "ec2:*",
        "s3:*",
        "cloudwatch:*",
        "logs:*"
      ],
      "Resource": "*"
    },
    {
      "Sid": "DenyPrivilegeEscalation",
      "Effect": "Deny",
      "Action": [
        "iam:CreateUser",
        "iam:DeleteUser",
        "iam:AttachUserPolicy",
        "iam:PutUserPermissionsBoundary",
        "iam:CreateRole",
        "iam:DeleteRole",
        "iam:AttachRolePolicy",
        "sts:AssumeRole"
      ],
      "Resource": "*"
    }
  ]
}
```

**Policy name:** `POL-AWS-PermissionBoundary-CloudEngineer`

Attach this as a permission boundary to ROLE-AWS-CloudEngineer-Deploy:
Navigate to: **IAM → Roles → ROLE-AWS-CloudEngineer-Deploy → Permissions boundary → Set boundary → select the boundary policy → Set boundary**

**Architect lesson:** Without a permission boundary, a delegated developer could create a new IAM role, attach AdministratorAccess, and assume it — effectively escaping their restrictions. The permission boundary prevents this privilege escalation path.

---

### Step 8.4 — Enable and Review CloudTrail

CloudTrail records every API call to AWS — who did what, when, from where.

Navigate to: **AWS Console → CloudTrail → Trails → Create trail**

- **Trail name:** `identitycore-audit-trail`
- **Storage location:** Create new S3 bucket → `identitycore-cloudtrail-logs-[random]`
- **Log file SSE encryption:** Enabled (use AWS managed key for lab)
- **Enable for all regions:** Yes
- **Management events:** Read + Write
- **Data events:** Skip for now (incurs cost at scale)

Click **Create trail**

**Review events:**

Navigate to: **CloudTrail → Event history**

Filter by:
- Event name: `CreateRole` — find the roles you just created
- Event name: `ConsoleLogin` — find your recent logins

**Screenshot to capture:** `P08-S4-CloudTrail-CreateRoleEvent.png`

⚠️ **SECURITY CHECKPOINT:** CloudTrail logs may contain your IAM usernames and account IDs. Redact account IDs (12-digit numbers) before committing screenshots to GitHub.

**Key CloudTrail events to know:**
- `ConsoleLogin` — who signed into the AWS console and when
- `AssumeRole` — who assumed which role
- `CreateUser / DeleteUser` — IAM user changes
- `AttachUserPolicy / AttachRolePolicy` — policy changes
- `PutBucketPolicy` — S3 resource policy changes
- `CreateAccessKey` — new credentials created

---

### Step 8.5 — IAM Access Analyzer

Navigate to: **AWS Console → IAM → Access Analyzer → Create analyzer**

- **Analyzer name:** `identitycore-access-analyzer`
- **Zone of trust:** Current account

Click **Create analyzer**

After a few minutes, review findings. In a new account, you may see no findings. In a real environment, Access Analyzer finds:
- S3 buckets accessible from outside the account
- IAM roles with trust policies allowing external principals
- KMS keys accessible externally
- Lambda functions with resource-based policies allowing public access

Create file: `09-aws-iam-cloud-identity/aws-role-matrix.md` documenting all roles created, their purpose, their trust policy, and their permission level.

---

### Step 8.6 — Document SCP Strategy

💳 **LICENSING NOTE:** SCPs require AWS Organizations with multiple accounts. You cannot test SCPs with a single free-tier account.

Create file: `09-aws-iam-cloud-identity/scp-guardrail-document.md`

Document the SCP strategy you would implement in a multi-account environment:

```json
// SCP: Deny disabling CloudTrail
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "DenyCloudTrailDisable",
      "Effect": "Deny",
      "Action": [
        "cloudtrail:StopLogging",
        "cloudtrail:DeleteTrail"
      ],
      "Resource": "*"
    }
  ]
}
```

Document these SCPs (design only, since Organizations is not available):
1. Deny disabling CloudTrail
2. Deny leaving the organization
3. Deny use of non-approved regions (allow only us-east-1, us-west-2)
4. Deny root account activity outside break-glass procedures
5. Deny creating IAM users with console access (use SSO instead)

---

### Step 8.7 — Commit Phase 8

```bash
git add .
git commit -m "phase-8: AWS IAM — root secured, role baseline, least-privilege policies, permission boundary, CloudTrail, Access Analyzer"
git push origin main
```

### Phase 8 Completion Checklist

- [ ] AWS account billing alert set ($5 budget)
- [ ] Root account MFA enabled
- [ ] Root access keys confirmed absent or deleted
- [ ] Named IAM admin user created; root not used again
- [ ] All five IAM roles created with correct naming convention
- [ ] Least-privilege policy created for Cloud Engineer role
- [ ] Permission boundary created and attached
- [ ] CloudTrail trail enabled for all regions
- [ ] CloudTrail events reviewed and screenshot captured
- [ ] IAM Access Analyzer created and findings reviewed
- [ ] SCP strategy document created
- [ ] AWS role matrix document committed
- [ ] Break/fix: wildcard permission policy documented
- [ ] Break/fix: permission boundary blocking expected action documented
- [ ] Zero Trust connection: least privilege + permission boundaries = assume breach for any compromised role

**Next step:** Phase 9 — Cross-Platform Identity Architecture.

---

## Phase 9 — Cross-Platform Identity Architecture

### Objective

Connect Entra ID, Okta, and AWS into one documented enterprise identity architecture. Define the source of truth, federation trust flows, and end-to-end JML architecture across all platforms.

### Step 9.1 — Define the Source of Truth

Create file: `10-cross-platform-architecture/source-of-truth-decision.md`

Document the IdentityCore identity system hierarchy:

```
HR System (source of truth for employee data)
        ↓ (pushes new hire / termination events)
Microsoft Entra ID (primary identity platform — user accounts mastered here)
        ↓ (federation)
Okta (application access orchestration layer)
        ↓ (SCIM provisioning)
Target Applications (Salesforce, ServiceNow, custom apps)

AWS IAM (cloud identity — roles assumed by federated identities from Entra or Okta)
```

Write an ADR for this decision: `architecture-decision-records/ADR-002-source-of-truth-hr-system.md`

---

### Step 9.2 — Create the End-to-End JML Architecture Diagram

Create a comprehensive architecture diagram showing the full JML flow across all platforms.

This is the most important diagram in the portfolio. Use draw.io with swimlanes:

**Swimlanes:**
- Lane 1: HR System
- Lane 2: Microsoft Entra ID
- Lane 3: Okta
- Lane 4: AWS IAM
- Lane 5: Target Applications

Show the Joiner, Mover, and Leaver flows across all lanes with arrows showing data flow and triggers.

Export: `diagrams/DIA-P09-EndToEnd-JMLArchitecture-v1.png`

---

### Step 9.3 — Create the Cross-Platform Architecture Diagram

Create a second diagram showing the full identity platform relationships:

Required elements:
- HR System (box, labeled "Source of Truth")
- Entra ID (box, labeled "Primary IdP")
- Okta (box, labeled "Application Access Layer / Secondary IdP")
- AWS IAM (box, labeled "Cloud Identity — Role-Based")
- Microsoft 365 / Azure (box, labeled "Microsoft Services")
- SAML Apps (box)
- OIDC Apps (box)
- SCIM-provisioned Apps (box)
- Arrows labeled with protocols: SAML 2.0, OIDC, SCIM 2.0, federation trust

Export: `diagrams/DIA-P09-CrossPlatformArchitecture-v1.png`

---

### Step 9.4 — Update Root README with Architecture Diagram

Update the root `README.md` to include the cross-platform architecture diagram:

```markdown
## Architecture Overview

![IdentityCore Cross-Platform Identity Architecture](diagrams/DIA-P09-CrossPlatformArchitecture-v1.png)
```

---

### Step 9.5 — Commit Phase 9

```bash
git add .
git commit -m "phase-9: cross-platform architecture — source of truth decision, JML diagram, architecture diagram, ADR-002"
git push origin main
```

### Phase 9 Completion Checklist

- [ ] Source-of-truth document created with ADR
- [ ] End-to-end JML architecture diagram created
- [ ] Cross-platform architecture diagram created
- [ ] Root README updated with architecture diagram
- [ ] Federation trust document created
- [ ] Entra-vs-Okta comparison document finalized
- [ ] Zero Trust connection: the architecture enforces "never trust, always verify" at every platform boundary

---

## Phase 10 — Zero Trust Identity Architecture

### Objective

Design and document a complete Zero Trust identity model for IdentityCore, connecting every control built in the previous phases.

### Zero Trust Principles Applied in This Lab

| Principle | Implementation in IdentityCore |
|-----------|-------------------------------|
| Verify Explicitly | Conditional Access evaluates user, device, location, app, and risk on every request |
| Use Least Privilege | RBAC groups, least-privilege AWS policies, PIM for privileged roles |
| Assume Breach | CloudTrail monitoring, Access Analyzer, session revocation, break-glass procedure |

### Step 10.1 — Create the Zero Trust Policy Map

Create file: `11-zero-trust-identity-design/zero-trust-policy-map.md`

Map every control built in this program to a Zero Trust pillar:

```markdown
# Zero Trust Identity Policy Map — IdentityCore

## Pillar 1: Identity
| Control | Platform | Policy Name | Zero Trust Effect |
|---------|---------|-------------|------------------|
| MFA required for all users | Entra ID | POL-Entra-CA-MFARequired-SensitiveGroups | Requires proof of identity beyond password |
| Legacy auth blocked | Entra ID | POL-Entra-CA-BlockLegacyAuth | Prevents MFA bypass |
| Break-glass accounts monitored | Entra ID | (manual monitoring) | Ensures emergency access is audited |
| PIM for privileged roles | Entra ID | (PIM configuration) | Limits standing privileged access |

## Pillar 2: Device
| Control | Platform | Zero Trust Effect |
|---------|---------|------------------|
| Device compliance required (design) | Entra ID CA | Access denied from unknown or non-compliant devices |

## Pillar 3: Application
| Control | Platform | Zero Trust Effect |
|---------|---------|------------------|
| App assignment required | Entra ID + Okta | Users cannot access apps they aren't assigned to |
| SCIM deprovisioning | Entra ID + Okta | App access removed when user is offboarded |

## Pillar 4: Data / Infrastructure
| Control | Platform | Zero Trust Effect |
|---------|---------|------------------|
| Least-privilege AWS policies | AWS IAM | No more than required access |
| Permission boundaries | AWS IAM | Prevents privilege escalation |
| SCPs (design) | AWS Organizations | Account-level guardrails |

## Pillar 5: Monitoring
| Control | Platform | Zero Trust Effect |
|---------|---------|------------------|
| CloudTrail logging | AWS | All actions recorded |
| Entra sign-in logs | Entra ID | All authentication events recorded |
| Access Analyzer | AWS | External access findings surfaced |
| Audit logs | Entra ID + Okta | All admin events recorded |
```

---

### Step 10.2 — Create the Zero Trust Architecture Diagram

Create a diagram showing how the Zero Trust model functions at the access decision point.

Use a decision tree / flowchart format:

```
User requests access to application
        ↓
Is identity verified? (valid credentials)
   No → Access Denied, log event
   Yes → Continue
        ↓
Is MFA completed?
   No → MFA challenge issued
   MFA failed → Access Denied, log event
   Yes → Continue
        ↓
Is device trusted / compliant?
   No → Block (if device policy enforced) or Step-up MFA
   Yes → Continue
        ↓
Is location trusted?
   High-risk location → Require stronger auth or block
   Trusted location → Continue
        ↓
Is there elevated sign-in risk?
   High risk → Block or require additional verification
   Low risk → Continue
        ↓
Is the user authorized for this app?
   Not assigned → Access Denied
   Assigned → Continue
        ↓
Is the user's access still valid? (account active, not leaver)
   Account disabled → Access Denied
   Active → Grant access
        ↓
Log all access events → Review in sign-in logs and CloudTrail
```

Export: `diagrams/DIA-P10-ZeroTrustAccessDecision-v1.png`

---

### Step 10.3 — Commit Phase 10

```bash
git add .
git commit -m "phase-10: Zero Trust architecture — policy map, access decision diagram, privileged access model"
git push origin main
```

---

## Phase 11 — Final GitHub Portfolio Package

### Objective

Polish the repository for portfolio presentation. Write resume bullets, LinkedIn content, and STAR interview stories.

### Step 11.1 — Finalize the Root README

The root README should now be complete with:
- Architecture diagram (from Phase 9)
- Updated phase status table (all phases complete)
- Skills demonstrated
- Tools used
- Link to each phase folder

### Step 11.2 — Write Resume Bullets

Create file: `12-final-portfolio-package/resume-bullets.md`

```markdown
# Resume Bullets — IdentityCore IAM Lab

## IAM Engineering

- Designed and implemented enterprise identity architecture across Microsoft Entra ID, Okta, and AWS IAM for a simulated 500-person organization
- Configured Conditional Access policies enforcing MFA, blocking legacy authentication, and applying location-based access controls for finance, executive, and privileged user populations
- Built SAML 2.0 and OIDC/OAuth 2.0 application integrations with claims configuration, user assignment governance, and break/fix troubleshooting documentation
- Configured SCIM 2.0 provisioning flows with attribute mapping, group push, and deprovisioning behavior for automated lifecycle management
- Designed and implemented Joiner, Mover, and Leaver identity lifecycle workflows using dynamic groups, access packages, and account disablement procedures across Entra ID and Okta

## IAM Architecture

- Designed a Zero Trust identity architecture applying Verify Explicitly, Use Least Privilege, and Assume Breach principles across all identity platforms
- Created cross-platform architecture documentation connecting Entra ID as primary IdP, Okta as application access layer, and AWS IAM as cloud identity platform
- Authored Architecture Decision Records documenting identity platform selection rationale, source-of-truth hierarchy, and privileged access model design
- Designed Privileged Identity Management (PIM) controls with eligible role assignment, activation MFA, time-bound access, and audit trail requirements

## AWS Cloud Identity

- Built AWS IAM role baseline with least-privilege policies for Security Audit, Cloud Engineer, Billing, and Developer roles
- Implemented permission boundaries to prevent privilege escalation by delegated administrators
- Enabled CloudTrail for multi-region API activity logging and identified key events: ConsoleLogin, AssumeRole, CreateUser, AttachRolePolicy
- Used IAM Access Analyzer to identify external access findings and policy validation issues
- Documented Service Control Policy guardrail strategy for multi-account AWS Organizations environments
```

---

### Step 11.3 — Write STAR Interview Stories

Create file: `12-final-portfolio-package/star-interview-stories.md`

Compile the STAR drafts written at the end of each phase. Finalize the top 5:

1. Designing a Conditional Access policy and recovering from a lockout
2. Troubleshooting a SAML SSO integration failure (wrong Reply URL)
3. Building a complete JML lifecycle workflow
4. Reducing AWS IAM permissions using least-privilege principles
5. Explaining Zero Trust identity architecture design decisions

---

### Step 11.4 — Final Commit

```bash
git add .
git commit -m "phase-11: final portfolio package — executive summary, resume bullets, STAR stories, LinkedIn content"
git push origin main
```

### Final Completion Checklist

- [ ] All 12 phase folders have a README
- [ ] Root README is professional and complete
- [ ] Cross-platform architecture diagram is in root README
- [ ] All diagrams are in the diagrams/ folder with correct naming
- [ ] All screenshots are in screenshots/ folder, redacted, correctly named
- [ ] All troubleshooting notes are complete
- [ ] At least 3 Architecture Decision Records are written
- [ ] Rebuild tracker is current
- [ ] Resume bullets are written and committed
- [ ] STAR stories are finalized
- [ ] LinkedIn summary is written
- [ ] Glossary is complete
- [ ] .gitignore has protected the repository throughout
- [ ] No secrets, tenant IDs, account IDs, or client secrets are in any committed file
- [ ] Repository is public and accessible on github.com

---

## Quick Reference — What Each Phase Produces

| Phase | Key Deliverables |
|-------|----------------|
| Phase 0 | Repository, templates, ADR-001, .gitignore, naming conventions |
| Phase 1 | Org chart, access matrix, glossary, login flow diagram, JML diagram |
| Phase 2 | User inventory, group inventory, dynamic group rules, audit log screenshots |
| Phase 3 | CA policy matrix, MFA policy docs, break-glass procedure, troubleshooting note |
| Phase 4 | SAML integration doc, OIDC registration doc, SCIM design, token flow diagrams |
| Phase 5 | JML process doc, access package design, PIM design, lifecycle diagrams |
| Phase 6 | Okta user/group inventory, MFA policy matrix, Entra-vs-Okta comparison |
| Phase 7 | SCIM provisioning doc, JML workflow designs, workflow diagrams |
| Phase 8 | AWS role matrix, least-privilege policies, permission boundary, CloudTrail notes |
| Phase 9 | Source-of-truth decision, JML architecture diagram, cross-platform diagram |
| Phase 10 | Zero Trust policy map, access decision diagram |
| Phase 11 | Executive summary, resume bullets, STAR stories, LinkedIn summary |

---

## Architect Thinking Checkpoints

At the end of every phase, ask yourself these questions before moving forward:

1. **What problem does this control solve?**
2. **Where in the platform does this control live?**
3. **Which identity does this apply to?**
4. **What access does it allow or deny?**
5. **What logs prove the result?**
6. **What could break?**
7. **How would I troubleshoot it?**
8. **How does this connect to Zero Trust?**
9. **What would an architect design differently than an operator?**
10. **Can I explain this to a junior analyst in two minutes?**

If you can answer all ten for every major lab, you are building IAM architecture muscle memory — not just following steps.

---

*Blueprint Version 2.0 — Revised for safety, licensing clarity, sequential integrity, and practical implementation.*  
*Source of truth: IAM Engineer to IAM Architect Mastery Program (uploaded document)*
