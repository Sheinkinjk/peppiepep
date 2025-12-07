# Referral & Integration QA Plan

Date: December 4, 2025

## Scope
This plan covers the referral landing page (`/r/[code]`), the project-level referral portal (`/referral`), and the dashboard Integration tab. Each step includes expected behavior and remediation notes.

## Prerequisites
- Valid ambassador with `referral_code`, `discount_code`, and associated business branding (logo, highlight color, tone).
- Environment variables set: `NEXT_PUBLIC_SITE_URL`, `SUPABASE_*`, `RESEND_*`, `TWILIO_*`.
- Access to dashboard with importer + manual referral tools.

## Test Matrix

| # | Scenario | Steps | Expected |
|---|----------|-------|----------|
| 1 | Referral hero branding | Open `/r/{code}` on desktop & mobile | Hero uses business logo/initials, gradient based on highlight color, ambassador stats show real counts |
| 2 | Share controls | Click `Copy link`, `Copy message`, and `Share now` buttons | Clipboard is populated; fallback warning appears only when native share unavailable |
| 3 | Discount code card | If ambassador has `discount_code`, copy button exposes code; if not, fallback instructions appear | Correct code copied; fallback text references ambassador name |
| 4 | Language toggles | Click EN/ES toggle | Locale query persists; invite copy and CTA text change |
| 5 | Submission form | Submit referral with valid name/phone | Success toast + referral entry logged under Performance tab |
| 6 | Embed mode | Load `/r/{code}?embed=1` in iframe | Layout switches to full-width stack, no gradients overlap, share/copy still work |
| 7 | Integration tab CTA | Click “Jump to Program Settings & CSV tools” | Clients tab activates and scrolls into view |
| 8 | Website integration snippets | Copy iframe/button/API snippets | Snippets include actual `siteUrl`, `discount_capture_secret`, and instructions block |
| 9 | Discount capture | POST sample payload to `/api/discount-codes/redeem` using secret | API accepts request and creates redemption row tied to ambassador |
|10 | Manual QA instructions | Review final section on Integration tab | Checklist explains referral link testing and manual conversion logging |

## Observations
- Referral landing now ties directly to live business data; no placeholder copy remains.
- Integration tab re-emphasizes prerequisites (program settings + test ambassador) and deep links to Clients tab.
- Sharing/discount controls rely on clipboard; ensure onboarding docs remind users that HTTPS is required for clipboard APIs.

## Follow-up
- Provide customer success with this checklist for go-live rehearsals.
- Monitor `/api/discount-codes/redeem` logs after onboarding to confirm secrets are configured correctly per project.
