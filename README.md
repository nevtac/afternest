# AfterNest

AfterNest is an academic pilot prototype for MGMT 3538. It demonstrates a proposed nonprofit recovery-support program for patients who may face practical barriers after hospital discharge.

## What is included

- Public nonprofit website
- Program / differentiation page
- Hospital and sponsor partnership page
- Volunteer / Recovery Navigator recruitment form
- Four-step hospital referral intake / Recovery Readiness Check
- Automatic non-clinical Recovery Support Plan generation
- Recovery Navigator workspace with case assignment and task-status updates
- Patient-facing "My AfterNest Plan" view
- Illustrative pilot outcomes dashboard
- Navigator resource directory
- Printable Recovery Navigator training handbook
- Printable hospital partner brief
- Printable sponsor / funder brief
- Six-month pilot roadmap
- Team and proposed nonprofit governance page
- Privacy and scope page

## Demo data and privacy

This repository is a presentation prototype. It intentionally has no production patient backend and no EHR connection. Forms are stored only in the current browser via `localStorage` so the full referral-to-workspace lifecycle can be demonstrated without transmitting information to a server.

**Do not enter real patient information, PHI, diagnoses, medications, symptoms, lab values, clinical notes, or medical-record uploads.**

A production pilot would require partner-approved legal, privacy, security, consent, insurance, clinical-escalation, volunteer-screening, transportation, language-access, and regulatory design before real patient use.

## Local preview

Serve the repository root with any static server, for example:

```bash
python3 -m http.server 4173
```

Then open `http://localhost:4173`.

## Production-backend path

The current prototype is intentionally backend-free. For a shared multi-user pilot workspace, the next infrastructure phase would add:

1. Supabase or another approved database/authentication layer.
2. Role-based access for hospital referral users, AfterNest staff, and Recovery Navigators.
3. Server-side validation and audit logs.
4. Partner-approved data retention and access policies.
5. Secure notification and assignment workflow.
6. Production analytics and reporting.

## Status

Academic prototype / demo environment. No hospital partnership, sponsorship, nonprofit tax-exempt status, or clinical outcome is represented as confirmed.
