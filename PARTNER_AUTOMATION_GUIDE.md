# Partner Application Automation & Tracking

This document captures the platform-side wiring that happens after someone hits **Apply to Become a Partner**.

## Notification path

1. The `submitPartnerApplication` server action (in `src/app/our-referral-program/page.tsx`) calls the Resend REST API using `RESEND_API_KEY`.
2. The payload includes the applicant’s name, email, phone, application time, and next steps, all rendered inside an inline HTML template for `jarred@referlabs.com.au`.
3. Confirm the notification by:
   - Setting `RESEND_API_KEY` in `.env.local` to a valid Resend key for your project.
   - Adjusting the `to` array if you want multiple recipients/CCs or formatting for Slack/email digests.
   - Triggering a test submission from `/our-referral-program` and checking your inbox for the styled alert.

## Supabase tracking

1. The same action writes a row into the `partner_applications` table with `name`, `email`, `phone`, `source`, and `created_at`/`updated_at` timestamps.
2. Visit: https://app.supabase.com/ovpsgbstrdahrdcllswa/database/tables/partner_applications/rows to inspect entries.
3. Extend the table with fields such as `status`, `owner`, `notes`, or `reviewed_at` if you need saved follow-up state.
4. Use Supabase filters or views to show only pending applications, assign owners, or surface leads that need callbacks.

## Next steps

- Consider adding a Supabase Stream (or use Zapier/Pipedream) to forward new rows to email, Slack, or another ticketing system for faster follow-up.
- Document any manual onboarding steps for the team in the same thread so people can re-run them when they touch the table.

Keep this guide updated if the Resend payload or Supabase schema changes so you always know what happens next after a partner applies.
