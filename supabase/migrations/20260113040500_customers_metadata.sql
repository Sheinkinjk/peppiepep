-- Add json metadata for customers (used for extensible partner attribution fields)

ALTER TABLE public.customers
  ADD COLUMN IF NOT EXISTS metadata jsonb;

