create table if not exists public.referral_events (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses (id) on delete cascade,
  ambassador_id uuid references public.customers (id) on delete set null,
  referral_id uuid references public.referrals (id) on delete set null,
  event_type text not null check (event_type in ('link_visit','signup_submitted','conversion_completed')),
  source text,
  device text,
  metadata jsonb,
  created_at timestamptz default now()
);

create index if not exists referral_events_business_id_idx on public.referral_events (business_id);
create index if not exists referral_events_ambassador_id_idx on public.referral_events (ambassador_id);
create index if not exists referral_events_event_type_idx on public.referral_events (event_type);

alter table public.referral_events enable row level security;

drop policy if exists "Owners can select referral events" on public.referral_events;

create policy "Owners can select referral events"
  on public.referral_events for select
  using (exists (
    select 1 from public.businesses b
    where b.id = business_id and b.owner_id = auth.uid()
  ));
