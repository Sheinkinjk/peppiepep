-- Generic lead-capture backstop table.
--
-- Apollo EOI, the software recommender and the Get Featured form were email-only:
-- if Resend failed or an email was filtered, the lead was lost with no record.
-- This table stores every such lead BEFORE the email is attempted, so a mail
-- failure can no longer lose a lead. (Business lending already has this via
-- lending_leads; this covers the remaining email-only captures.)
--
-- RLS is ON with NO public policies: service-role access only (server routes +
-- admin), same convention as lending_leads.

create table if not exists public.leads (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  type        text not null,               -- 'apollo_eoi' | 'software_quiz' | 'comparison_listing'
  name        text,
  email       text,
  phone       text,
  source_page text,
  payload     jsonb not null default '{}'::jsonb,
  status      text not null default 'new',
  notified_at timestamptz                  -- set when the admin email was sent
);

alter table public.leads enable row level security;

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_type_idx on public.leads (type);
