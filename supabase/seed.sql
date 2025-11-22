-- Seed data for Pepform. Assumes a user already exists in auth.users.
-- Run with: supabase db push --file supabase/seed.sql

do $$
declare
  owner uuid;
  biz uuid;
  ambassador uuid;
begin
  select id into owner from auth.users limit 1;
  if owner is null then
    raise notice 'No users found in auth.users. Create a user via Supabase Auth then re-run seeds.';
    return;
  end if;

  insert into public.businesses (owner_id, name, offer_text, reward_type, reward_amount, upgrade_name)
  values (owner, 'Pepform Demo Salon', '10% off for new clients', 'credit', 10, null)
  on conflict (id) do nothing
  returning id into biz;

  if biz is null then
    select id into biz from public.businesses where owner_id = owner limit 1;
  end if;

  insert into public.customers (business_id, name, phone, email, referral_code, status, credits)
  values
    (biz, 'Alex Ambassador', '+1234567000', 'alex@example.com', 'ambassador123', 'active', 20),
    (biz, 'Jamie Client', '+1234567001', 'jamie@example.com', 'client123', 'pending', 0)
  on conflict do nothing;

  select id into ambassador
  from public.customers
  where business_id = biz and referral_code = 'ambassador123'
  limit 1;

  insert into public.referrals (business_id, ambassador_id, referred_name, referred_email, referred_phone, status)
  values
    (biz, ambassador, 'Taylor Prospect', 'taylor@example.com', '+1234567002', 'pending')
  on conflict do nothing;
end $$;
