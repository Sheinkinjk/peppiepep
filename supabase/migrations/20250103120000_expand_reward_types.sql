-- Expand reward_type options to match product UI
ALTER TABLE public.businesses
  DROP CONSTRAINT IF EXISTS businesses_reward_type_check;

ALTER TABLE public.businesses
  ADD CONSTRAINT businesses_reward_type_check
    CHECK (reward_type IN ('credit', 'upgrade', 'discount', 'points'));
