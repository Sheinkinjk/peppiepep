-- Add branding + referral tracking columns required by the dashboard UI
alter table public.businesses
  add column if not exists logo_url text;

alter table public.referrals
  add column if not exists transaction_value numeric(12,2),
  add column if not exists transaction_date timestamptz,
  add column if not exists service_type text,
  add column if not exists created_by uuid references auth.users (id) on delete set null;

create index if not exists referrals_transaction_date_idx on public.referrals (transaction_date);
create index if not exists referrals_created_by_idx on public.referrals (created_by);

update public.referrals
set transaction_date = coalesce(transaction_date, rewarded_at, created_at)
where transaction_date is null;

-- Add campaign snapshot columns so historical messages keep prior settings
alter table public.campaigns
  add column if not exists snapshot_offer_text text,
  add column if not exists snapshot_new_user_reward_text text,
  add column if not exists snapshot_client_reward_text text,
  add column if not exists snapshot_reward_type text,
  add column if not exists snapshot_reward_amount numeric(12,2),
  add column if not exists snapshot_upgrade_name text,
  add column if not exists snapshot_reward_terms text,
  add column if not exists snapshot_logo_url text;

update public.campaigns c
set
  snapshot_offer_text = coalesce(c.snapshot_offer_text, b.offer_text),
  snapshot_new_user_reward_text = coalesce(c.snapshot_new_user_reward_text, b.new_user_reward_text, b.offer_text),
  snapshot_client_reward_text = coalesce(
    c.snapshot_client_reward_text,
    b.client_reward_text,
    case
      when b.reward_type = 'credit' then
        case when b.reward_amount is not null then '$' || b.reward_amount::text || ' credit' else null end
      when b.reward_type = 'upgrade' then coalesce(b.upgrade_name, 'a free upgrade')
      when b.reward_type = 'discount' then
        case when b.reward_amount is not null then b.reward_amount::text || '% discount' else null end
      when b.reward_type = 'points' then
        case when b.reward_amount is not null then b.reward_amount::text || ' points' else null end
      else null
    end
  ),
  snapshot_reward_type = coalesce(c.snapshot_reward_type, b.reward_type),
  snapshot_reward_amount = coalesce(c.snapshot_reward_amount, b.reward_amount),
  snapshot_upgrade_name = coalesce(c.snapshot_upgrade_name, b.upgrade_name),
  snapshot_reward_terms = coalesce(c.snapshot_reward_terms, b.reward_terms),
  snapshot_logo_url = coalesce(c.snapshot_logo_url, b.logo_url)
from public.businesses b
where c.business_id = b.id;
