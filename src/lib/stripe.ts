import Stripe from 'stripe';

// Validate environment variables
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing STRIPE_SECRET_KEY environment variable');
}

// Initialize Stripe with latest API version
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-12-18.acacia',
  typescript: true,
  appInfo: {
    name: 'Refer Labs',
    version: '1.0.0',
    url: 'https://referlabs.com.au',
  },
});

// Helper to get publishable key (client-side)
export function getStripePublishableKey(): string {
  const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  if (!key) {
    throw new Error('Missing NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY environment variable');
  }
  return key;
}

// Currency configuration
export const STRIPE_CURRENCY = 'aud';
export const CURRENCY_SYMBOL = '$';
export const LOCALE = 'en-AU';

// Commission configuration
export const PAYOUT_THRESHOLD = 50000; // $500 AUD in cents
export const PAYOUT_CURRENCY = 'aud';

export const COMMISSION_RULES = {
  PARTNER_SIGNUP_BONUS: 10000, // $100 AUD in cents
  PARTNER_REVENUE_SHARE_RATE: 10, // 10% of partner's subscription
  REFERRAL_REWARD: 5000, // $50 AUD in cents (example)
} as const;

// Format amount for display
export function formatAmount(
  amountInCents: number,
  currency: string = STRIPE_CURRENCY
): string {
  return new Intl.NumberFormat(LOCALE, {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(amountInCents / 100);
}

// Convert dollars to cents
export function dollarsToCents(dollars: number): number {
  return Math.round(dollars * 100);
}

// Convert cents to dollars
export function centsToDollars(cents: number): number {
  return cents / 100;
}

// Calculate commission based on type and amount
export function calculateCommission(
  type: 'signup_bonus' | 'revenue_share',
  paymentAmount?: number
): number {
  switch (type) {
    case 'signup_bonus':
      return COMMISSION_RULES.PARTNER_SIGNUP_BONUS;
    case 'revenue_share':
      if (!paymentAmount) {
        throw new Error('Payment amount required for revenue share calculation');
      }
      return Math.round((paymentAmount * COMMISSION_RULES.PARTNER_REVENUE_SHARE_RATE) / 100);
    default:
      throw new Error(`Unknown commission type: ${type}`);
  }
}

// Validate Stripe webhook signature
export function validateWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): Stripe.Event {
  try {
    return stripe.webhooks.constructEvent(payload, signature, secret);
  } catch (err) {
    throw new Error(`Webhook signature verification failed: ${(err as Error).message}`);
  }
}
