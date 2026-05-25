# SIEM Project Plan

Colour Ledger:
Green: Complete
Yellow: Pending Completion
Red: Blocked/Unknown

## Phase 1: Azure & Sentinel Infrastructure
**Duration: Half a day**

Stand up the core Azure infrastructure that everything else builds on. This involves creating an Azure subscription, setting up a Resource Group, creating a Log Analytics Workspace, and enabling Microsoft Sentinel on top of it.

- Create Azure subscription
- Create Resource Group
- Create Log Analytics Workspace
- Enable Microsoft Sentinel on the workspace

## Phase 2: Google Workspace Integration
**Duration: Half a day**

Connect Google Workspace to Sentinel so that user activity logs flow in automatically. This involves creating a Google Cloud project, configuring OAuth credentials, enabling the Admin SDK API, and installing the Google Workspace connector from the Sentinel Content Hub. Once connected, Sentinel will receive logs covering logins, admin activity, Drive, Meet, Chat, mobile devices, and more.

- Create a Google Cloud project under the company organisation
- Configure OAuth consent screen and credentials
- Enable Admin SDK API
- Install the Google Workspace connector from Sentinel Content Hub
- Authenticate the connector using OAuth credentials
- Verify all log streams are active and data is flowing

## Phase 3: MDM Integration
**Duration: ?**

Connect the MDM platform to Sentinel so that device activity and compliance logs flow in. If the MDM platform has a native Sentinel connector, this will be quick and follow the same process as Google Workspace. If there is no native connector, a custom integration will need to be built using an Azure Function that calls the MDM API and forwards logs into Sentinel. This phase carries the most uncertainty and is likely where the bulk of the project time sits. The MDM platform needs to be confirmed before this phase can begin.

- Identify which MDM platform is in use
- Check if a native Sentinel connector exists in Content Hub
- Configure API credentials and permissions in the MDM platform
- If no native connector exists, build a custom connector using an Azure Function
- Verify device logs are flowing into Sentinel

## Phase 4: Dashboards
**Duration: 2 days**

Enable and configure dashboards for both Google Workspace and MDM so the team has clear visibility over security activity. Sentinel provides pre-built dashboards for common integrations which will be used where available. Both dashboards will be validated against live data and adjusted to suit the team's needs.

- Enable and configure the Google Workspace dashboard in Sentinel
- Enable and configure the MDM dashboard in Sentinel
- Validate both dashboards are displaying live, accurate data
- Adjust layout and filtering to suit the team's needs

## Phase 5: Detection Rules & Alerting
**Duration: 2 days**

Activate detection rules so Sentinel raises incidents when suspicious activity is detected. This involves enabling the built-in rules for Google Workspace and MDM, writing any additional rules specific to the consultancy's risk profile, and configuring alert notifications so the team is notified when a high severity incident fires. The setup will be tested end-to-end to confirm incidents are being raised correctly.

- Review and enable built-in Google Workspace analytics rules
- Review and enable built-in MDM analytics rules
- Write any custom rules specific to the consultancy's risk profile
- Configure alert notifications for high severity incidents
- Test end-to-end to confirm incidents are raised correctly

## Phase 6: Documentation & Audit Readiness
**Duration: 2 days**

Produce documentation sufficient to evidence the SIEM setup to a security certification auditor. This covers the system architecture, what is being monitored and why, the incident response process, and roles and responsibilities. Evidence that the system is live and functioning will be captured alongside the documentation.

- Document the system architecture and how logs flow into Sentinel
- Document what is being monitored and why
- Document the incident response process
- Document roles and responsibilities
- Capture screenshots and exports as evidence the system is live and functioning
- Review documentation against the target certification's requirements
