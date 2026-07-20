-- Business Lending: on-site lead capture + per-lender submission tracking.
-- Leads are captured directly (not affiliate); the operator manually submits each
-- lead into individual lender broker portals and tracks outcomes per lender.
-- RLS is ON with NO public policies: service-role access only (server routes + admin).

create table if not exists lending_leads (
  id                    uuid primary key default gen_random_uuid(),
  created_at            timestamptz not null default now(),

  first_name            text not null,
  last_name             text not null,
  email                 text not null,
  phone                 text not null,
  preferred_contact     text,

  business_name         text not null,
  abn                   text,
  entity_type           text,
  industry              text,
  state                 text,
  trading_since         text,
  website               text,

  monthly_revenue       text not null,
  avg_bank_balance      text,
  has_existing_loans    boolean,
  existing_loan_detail  text,
  credit_profile        text,
  has_ato_debt          boolean,
  ato_debt_band         text,

  amount_requested      text not null,
  loan_purpose          text not null,
  urgency               text,
  product_interest      text[],
  security_available    boolean,

  consent_privacy       boolean not null,
  consent_contact       boolean not null,
  consent_text_version  text not null,
  consent_ip            inet,
  consent_user_agent    text,

  source_page           text,
  referrer              text,
  utm_source            text,
  utm_medium            text,
  utm_campaign          text,

  status                text not null default 'new',
  internal_notes        text,
  notified_at           timestamptz,
  settled_amount        numeric,
  commission_expected   numeric,
  commission_received   numeric
);

-- One lead goes to multiple lenders with independent outcomes. This table is the
-- point of the build: do NOT collapse it into a column on lending_leads.
create table if not exists lead_submissions (
  id            uuid primary key default gen_random_uuid(),
  lead_id       uuid not null references lending_leads(id) on delete cascade,
  lender        text not null,
  submitted_at  timestamptz not null default now(),
  lender_ref    text,
  outcome       text not null default 'pending',
  offer_amount  numeric,
  offer_rate    text,
  notes         text
);

create index if not exists lending_leads_created_at_idx on lending_leads (created_at desc);
create index if not exists lending_leads_status_idx on lending_leads (status);
create index if not exists lending_leads_abn_idx on lending_leads (abn);
create index if not exists lead_submissions_lead_id_idx on lead_submissions (lead_id);

alter table lending_leads enable row level security;
alter table lead_submissions enable row level security;
-- Deliberately NO public policies. Service-role access only.

-- Status values (enforced in the app layer, not a DB constraint, so ops can extend):
--   new | contacted | qualified | submitted | approved | declined | settled | dead
-- Outcome values: pending | approved | declined | withdrawn
