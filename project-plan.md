# SIEM Project Plan
**Project:** Microsoft Sentinel SIEM Implementation  
**Organisation:** Internal (Consultancy)  
**Owner:** Cameron Carter  
**Reviewed by:** Ribvar Shafeei  
**Last Updated:** 2026-05-24  
**Target Duration:** 1–2 weeks  

---

## Overview

This project implements a Security Information and Event Management (SIEM) system using Microsoft Sentinel for internal use. As a consultancy that develops exclusively on client projects, this is the only internal infrastructure project we own.

The goal is to centralise security monitoring across our two core platforms — Google Workspace (identity, email, collaboration) and our MDM platform (device management) — into a single SIEM that provides visibility, alerting, and incident tracking. The implementation will support our application for a security certification.

---

## Scope

**In scope:**
- Microsoft Sentinel setup on Azure
- Google Workspace log integration
- MDM platform log integration
- Dashboards for both integrations
- Detection rules and alerting
- Documentation sufficient for a security certification audit

**Out of scope:**
- Custom threat intelligence feeds
- Integration with client systems or environments
- On-premise infrastructure
- Advanced automation / SOAR workflows (beyond basic alerting)

---

## Goals

1. Achieve centralised visibility over identity, email, collaboration, and device activity
2. Detect and alert on suspicious behaviour across both platforms
3. Produce documentation and evidence sufficient for a security certification audit
4. Establish a repeatable, maintainable setup that can be handed to any team member

---

## Phases

---

### ✅ Phase 1 — Azure & Sentinel Infrastructure
**Effort:** Half a day  
**Status: Complete**

Stand up the core Azure infrastructure that everything else builds on.

- Create Azure subscription
- Create Resource Group
- Create Log Analytics Workspace
- Enable Microsoft Sentinel on the workspace

**Outcome:** A live Sentinel instance ready to receive log data.

---

### ✅ Phase 2 — Google Workspace Integration
**Effort:** Half a day  
**Status: Complete**

Connect Google Workspace to Sentinel so that user activity logs flow in automatically.

- Create a Google Cloud project under the company organisation
- Configure OAuth consent screen and credentials
- Enable Admin SDK API
- Install the Google Workspace Reports solution from Sentinel Content Hub
- Authenticate the connector using OAuth credentials
- Verify all log streams are active and data is flowing

**Connected log streams include:** Login, Admin, Drive, Meet, Chat, Mobile, SAML, Token, User Accounts and more.

**Outcome:** Google Workspace logs flowing into Sentinel in real time.

---

### 🔲 Phase 3 — MDM Integration
**Effort:** 1 day – 1 week (depends on platform)  
**Status: Blocked — MDM platform not yet identified**

Connect the MDM platform to Sentinel so that device activity and compliance logs flow in.

- Identify which MDM platform is in use
- Check if a native Sentinel connector exists in Content Hub
  - **If yes:** Configure similarly to Google Workspace (quick)
  - **If no:** Build a custom connector using an Azure Function that calls the MDM API and forwards logs to Sentinel (this is where the majority of development effort will be if required)
- Configure required API credentials and permissions in the MDM platform
- Verify device logs are flowing into Sentinel

**Note:** This phase carries the most uncertainty and is likely where the bulk of the 1–2 week estimate sits. The MDM platform must be confirmed before this phase can begin.

**Outcome:** Device enrolment, compliance status, and policy change logs flowing into Sentinel.

---

### 🔲 Phase 4 — Dashboards
**Effort:** 1–2 days  
**Status: Not started**

Enable and validate dashboards (Workbooks) for both integrations so the team has clear visibility over security activity.

- Enable and configure the Google Workspace Workbook in Sentinel
- Enable and configure the MDM Workbook in Sentinel (if available; otherwise build a basic custom one)
- Validate that both dashboards are displaying live, accurate data
- Make any layout or filtering adjustments to suit the team's needs

**Outcome:** Two live dashboards providing at-a-glance security visibility across Google Workspace and devices.

---

### 🔲 Phase 5 — Detection Rules & Alerting
**Effort:** 1–2 days  
**Status: Not started**

Activate detection rules so Sentinel raises incidents when suspicious activity is detected.

- Review and enable built-in Google Workspace analytics rules (e.g. login from unusual location, admin privilege changes, suspicious email forwarding rules)
- Review and enable built-in MDM analytics rules (e.g. non-compliant device, unknown device enrolment)
- Write any custom KQL rules specific to the consultancy's risk profile
- Configure alert notifications (e.g. email or Slack message on high severity incident)
- Test end-to-end: trigger a test event and confirm an incident is raised

**Outcome:** Sentinel is actively monitoring for threats and alerting the team when action is required.

---

### 🔲 Phase 6 — Documentation & Audit Readiness
**Effort:** 2–3 days  
**Status: Not started**

Produce documentation sufficient to evidence the SIEM setup to a security certification auditor.

- Document the architecture (what is connected, how logs flow, where data is stored)
- Document what is being monitored and why
- Document the incident response process (what happens when Sentinel raises an alert)
- Document roles and responsibilities (who manages the SIEM, who responds to incidents)
- Capture screenshots or exports as evidence that the system is live and functioning
- Review documentation against the target certification's requirements

**Outcome:** A documented, evidenced SIEM setup ready for security certification audit.

---

## Dependencies & Blockers

| Blocker | Impact | Resolution |
|---|---|---|
| MDM platform not identified | Phase 3 cannot start | Confirm with Ribvar which MDM is in use |
| Target security certification not confirmed | Phase 6 scope unclear | Confirm which cert is being pursued (ISO 27001, SOC 2, Cyber Essentials, etc.) |

---

## Timeline Estimate

| Phase | Estimated Effort |
|---|---|
| ~~Phase 1 — Azure & Sentinel~~ | ~~Done~~ |
| ~~Phase 2 — Google Workspace~~ | ~~Done~~ |
| Phase 3 — MDM Integration | 1 day – 1 week |
| Phase 4 — Dashboards | 1–2 days |
| Phase 5 — Detection Rules | 1–2 days |
| Phase 6 — Documentation | 2–3 days |
| **Total remaining** | **~1 to 1.5 weeks** |

---

## Risks

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| MDM has no native Sentinel connector | Medium | High — adds significant dev time | Confirm MDM platform early; escalate to Ribvar if custom build needed |
| Free Azure trial expires mid-project | Low | High — work stops | Move to paid subscription before trial expires; monitor costs |
| Google OAuth token expires or breaks | Low | Medium — logs stop flowing | Set a calendar reminder to review connector health monthly |
| Security cert requirements not met by basic setup | Low | High | Confirm cert requirements before Phase 6 begins |

---

## Notes

- All infrastructure lives in Azure — no on-premise components
- Google Workspace and MDM are the data sources; Sentinel is the detection and monitoring layer
- Sentinel provides pre-built dashboards and detection rules for most common integrations — custom development should be minimal unless the MDM platform requires a custom connector
- This plan should be reviewed with Ribvar before Phase 3 begins
