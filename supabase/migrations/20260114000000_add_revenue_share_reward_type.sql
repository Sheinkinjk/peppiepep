-- Allow revenue_share as a businesses.reward_type option.
-- This must match the reward types used throughout the dashboard UI and Measure ROI.

ALTER TABLE public.businesses
  DROP CONSTRAINT IF EXISTS businesses_reward_type_check;

ALTER TABLE public.businesses
  ADD CONSTRAINT businesses_reward_type_check
    CHECK (reward_type IN ('credit', 'upgrade', 'discount', 'points', 'revenue_share'));
