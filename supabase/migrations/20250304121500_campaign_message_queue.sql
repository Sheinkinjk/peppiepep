alter table public.campaigns
  drop constraint if exists campaigns_status_check,
  add constraint campaigns_status_check
    check (status in ('pending','queued','sending','completed','partial','failed'));

alter table public.referral_events
  drop constraint if exists referral_events_event_type_check,
  add constraint referral_events_event_type_check
    check (event_type in ('link_visit','signup_submitted','conversion_completed','campaign_message_queued','campaign_message_sent','campaign_message_delivered','campaign_message_failed'));

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
alter table public.campaign_messages
  add column if not exists scheduled_at timestamptz default now();

create trigger campaign_messages_set_updated_at
before update on public.campaign_messages
for each row execute function public.set_updated_at();

alter table public.campaign_messages enable row level security;

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
