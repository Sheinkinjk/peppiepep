-- Supabase schema for Pepform.
-- Run with: supabase db push --file supabase/schema.sql

create extension if not exists "pgcrypto";

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.businesses (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users (id) on delete cascade,
  name text,
  offer_text text,
  reward_type text check (reward_type in ('credit', 'upgrade', 'discount', 'points')),
  reward_amount numeric(12,2) default 0,
  upgrade_name text,
  client_reward_text text,
  new_user_reward_text text,
  reward_terms text,
  brand_highlight_color text,
  brand_tone text,
  logo_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create trigger businesses_set_updated_at
before update on public.businesses
for each row execute function public.set_updated_at();

alter table public.businesses
  add column if not exists client_reward_text text,
  add column if not exists new_user_reward_text text,
  add column if not exists reward_terms text;

alter table public.businesses
  add column if not exists brand_highlight_color text,
  add column if not exists brand_tone text;

create table if not exists public.customers (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses (id) on delete cascade,
  name text,
  phone text,
  email text,
  referral_code text unique,
  status text default 'pending',
  credits numeric(12,2) default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists customers_business_id_idx on public.customers (business_id);
create index if not exists customers_referral_code_idx on public.customers (referral_code);

create trigger customers_set_updated_at
before update on public.customers
for each row execute function public.set_updated_at();

create table if not exists public.referrals (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses (id) on delete cascade,
  ambassador_id uuid references public.customers (id) on delete set null,
  campaign_id uuid references public.campaigns (id) on delete set null,
  referred_name text,
  referred_email text,
  referred_phone text,
  status text default 'pending' check (status in ('pending', 'completed')),
  transaction_value numeric(12,2),
  transaction_date timestamptz,
  service_type text,
  created_by uuid references auth.users (id) on delete set null,
  consent_given boolean default false,
  locale text default 'en',
  rewarded_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists referrals_business_id_idx on public.referrals (business_id);
create index if not exists referrals_ambassador_id_idx on public.referrals (ambassador_id);
create index if not exists referrals_campaign_id_idx on public.referrals (campaign_id);
create index if not exists referrals_transaction_date_idx on public.referrals (transaction_date);
create index if not exists referrals_created_by_idx on public.referrals (created_by);

create trigger referrals_set_updated_at
before update on public.referrals
for each row execute function public.set_updated_at();

alter table public.businesses enable row level security;
alter table public.customers enable row level security;
alter table public.referrals enable row level security;
create table if not exists public.referral_events (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses (id) on delete cascade,
  ambassador_id uuid references public.customers (id) on delete set null,
  referral_id uuid references public.referrals (id) on delete set null,
  event_type text not null check (event_type in ('link_visit','signup_submitted','conversion_completed','campaign_message_queued','campaign_message_sent','campaign_message_delivered','campaign_message_failed')),
  source text,
  device text,
  metadata jsonb,
  created_at timestamptz default now()
);

create index if not exists referral_events_business_id_idx on public.referral_events (business_id);
create index if not exists referral_events_ambassador_id_idx on public.referral_events (ambassador_id);
create index if not exists referral_events_event_type_idx on public.referral_events (event_type);

alter table public.referral_events enable row level security;

create table if not exists public.campaign_messages (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid not null references public.campaigns (id) on delete cascade,
  business_id uuid not null references public.businesses (id) on delete cascade,
  customer_id uuid references public.customers (id) on delete set null,
  channel text not null check (channel in ('sms','email')),
  to_address text,
  referral_link text,
  message_body text,
  status text not null default 'queued' check (status in ('queued','sending','sent','failed','delivered')),
  provider_message_id text,
  error text,
  metadata jsonb,
  scheduled_at timestamptz default now(),
  attempts integer not null default 0,
  last_attempt_at timestamptz,
  sent_at timestamptz,
  delivered_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists campaign_messages_campaign_id_idx on public.campaign_messages (campaign_id);
create index if not exists campaign_messages_status_idx on public.campaign_messages (status);
create index if not exists campaign_messages_provider_idx on public.campaign_messages (provider_message_id);
create index if not exists campaign_messages_scheduled_at_idx on public.campaign_messages (scheduled_at);

create trigger campaign_messages_set_updated_at
before update on public.campaign_messages
for each row execute function public.set_updated_at();

alter table public.campaign_messages enable row level security;

alter table public.campaigns
  add column if not exists snapshot_story_blocks jsonb;

alter table public.campaigns
  add column if not exists snapshot_include_qr boolean default true;

drop policy if exists "Owners can view campaign messages" on public.campaign_messages;
create policy "Owners can view campaign messages"
  on public.campaign_messages for select
  using (
    business_id in (
      select id from public.businesses where owner_id = auth.uid()
    )
  );

drop policy if exists "Owners can insert campaign messages" on public.campaign_messages;
create policy "Owners can insert campaign messages"
  on public.campaign_messages for insert
  with check (
    business_id in (
      select id from public.businesses where owner_id = auth.uid()
    )
  );

drop policy if exists "Owners can update campaign messages" on public.campaign_messages;
create policy "Owners can update campaign messages"
  on public.campaign_messages for update
  using (
    business_id in (
      select id from public.businesses where owner_id = auth.uid()
    )
  );

create or replace function public.increment_campaign_counts(target uuid, sent_delta integer, failed_delta integer)
returns void
language plpgsql
security definer
as $$
begin
  update public.campaigns
  set
    sent_count = coalesce(sent_count, 0) + coalesce(sent_delta, 0),
    failed_count = coalesce(failed_count, 0) + coalesce(failed_delta, 0)
  where id = target;
end;
$$;

-- Business owner policies
drop policy if exists "Owners can select their business" on public.businesses;
create policy "Owners can select their business"
  on public.businesses for select
  using (owner_id = auth.uid());

drop policy if exists "Owners can insert their business" on public.businesses;
create policy "Owners can insert their business"
  on public.businesses for insert
  with check (owner_id = auth.uid());

drop policy if exists "Owners can update their business" on public.businesses;
create policy "Owners can update their business"
  on public.businesses for update
  using (owner_id = auth.uid());

-- Customers policies (owner controls)
drop policy if exists "Owners can select customers" on public.customers;
create policy "Owners can select customers"
  on public.customers for select
  using (exists (
    select 1 from public.businesses b
    where b.id = business_id and b.owner_id = auth.uid()
  ));

drop policy if exists "Owners can insert customers" on public.customers;
create policy "Owners can insert customers"
  on public.customers for insert
  with check (exists (
    select 1 from public.businesses b
    where b.id = business_id and b.owner_id = auth.uid()
  ));

drop policy if exists "Owners can update customers" on public.customers;
create policy "Owners can update customers"
  on public.customers for update
  using (exists (
    select 1 from public.businesses b
    where b.id = business_id and b.owner_id = auth.uid()
  ));

-- Referrals policies (owner controls)
drop policy if exists "Owners can select referrals" on public.referrals;
create policy "Owners can select referrals"
  on public.referrals for select
  using (exists (
    select 1 from public.businesses b
    where b.id = business_id and b.owner_id = auth.uid()
  ));

drop policy if exists "Owners can insert referrals" on public.referrals;
create policy "Owners can insert referrals"
  on public.referrals for insert
  with check (exists (
    select 1 from public.businesses b
    where b.id = business_id and b.owner_id = auth.uid()
  ));

drop policy if exists "Owners can update referrals" on public.referrals;
create policy "Owners can update referrals"
  on public.referrals for update
  using (exists (
    select 1 from public.businesses b
    where b.id = business_id and b.owner_id = auth.uid()
  ));

drop policy if exists "Owners can select referral events" on public.referral_events;
create policy "Owners can select referral events"
  on public.referral_events for select
  using (exists (
    select 1 from public.businesses b
    where b.id = business_id and b.owner_id = auth.uid()
  ));

-- Service role bypasses RLS automatically.

-- Demo referral captures (service role writes only)
create table if not exists public.demo_referrals (
  id uuid primary key default gen_random_uuid(),
  name text,
  phone text,
  email text,
  source text,
  context text,
  created_at timestamptz default now()
);

alter table public.demo_referrals enable row level security;
