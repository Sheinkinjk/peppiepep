-- Consolidate every capture path onto newsletter_subscribers.
--
-- The table is altered in place rather than replaced by a new `subscribers`
-- table: it already holds real people who subscribed under the old flow, and a
-- new table would mean either migrating them or running two lists, which is the
-- problem this is meant to end.
--
-- Idempotent so it can be applied to a database that has had part of it run.

alter table public.newsletter_subscribers
  add column if not exists source_path      text,
  add column if not exists hub              text,
  add column if not exists confirmed_at     timestamptz,
  add column if not exists confirm_token    text,
  add column if not exists unsubscribed_at  timestamptz;

-- Unique as a constraint on the column, so a null token never collides.
create unique index if not exists newsletter_subscribers_confirm_token_key
  on public.newsletter_subscribers (confirm_token)
  where confirm_token is not null;

create index if not exists newsletter_subscribers_confirmed_at_idx
  on public.newsletter_subscribers (confirmed_at)
  where confirmed_at is not null;

-- Backfill: everyone already on the list gave express consent under the single
-- opt-in flow. Leaving confirmed_at null would silently reclassify them as
-- unconfirmed and, on any future "confirmed only" send, drop them from the list.
update public.newsletter_subscribers
   set confirmed_at = created_at
 where confirmed_at is null;

-- No public read. The service role bypasses RLS; the anon key must see nothing,
-- because this table is a list of people's email addresses.
alter table public.newsletter_subscribers enable row level security;
