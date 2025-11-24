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
  reward_type text check (reward_type in ('credit', 'upgrade')),
  reward_amount numeric(12,2) default 0,
  upgrade_name text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create trigger businesses_set_updated_at
before update on public.businesses
for each row execute function public.set_updated_at();

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
  referred_name text,
  referred_email text,
  referred_phone text,
  status text default 'pending' check (status in ('pending', 'completed')),
  rewarded_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists referrals_business_id_idx on public.referrals (business_id);
create index if not exists referrals_ambassador_id_idx on public.referrals (ambassador_id);

create trigger referrals_set_updated_at
before update on public.referrals
for each row execute function public.set_updated_at();

alter table public.businesses enable row level security;
alter table public.customers enable row level security;
alter table public.referrals enable row level security;

-- Business owner policies
create policy if not exists "Owners can select their business"
  on public.businesses for select
  using (owner_id = auth.uid());

create policy if not exists "Owners can insert their business"
  on public.businesses for insert
  with check (owner_id = auth.uid());

create policy if not exists "Owners can update their business"
  on public.businesses for update
  using (owner_id = auth.uid());

-- Customers policies (owner controls)
create policy if not exists "Owners can select customers"
  on public.customers for select
  using (exists (
    select 1 from public.businesses b
    where b.id = business_id and b.owner_id = auth.uid()
  ));

create policy if not exists "Owners can insert customers"
  on public.customers for insert
  with check (exists (
    select 1 from public.businesses b
    where b.id = business_id and b.owner_id = auth.uid()
  ));

create policy if not exists "Owners can update customers"
  on public.customers for update
  using (exists (
    select 1 from public.businesses b
    where b.id = business_id and b.owner_id = auth.uid()
  ));

-- Referrals policies (owner controls)
create policy if not exists "Owners can select referrals"
  on public.referrals for select
  using (exists (
    select 1 from public.businesses b
    where b.id = business_id and b.owner_id = auth.uid()
  ));

create policy if not exists "Owners can insert referrals"
  on public.referrals for insert
  with check (exists (
    select 1 from public.businesses b
    where b.id = business_id and b.owner_id = auth.uid()
  ));

create policy if not exists "Owners can update referrals"
  on public.referrals for update
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
