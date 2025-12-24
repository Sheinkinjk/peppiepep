/**
 * Client-side payout utilities for ambassadors
 */

export interface ConnectAccountStatus {
  exists: boolean;
  account: {
    id: string;
    stripe_account_id: string;
    charges_enabled: boolean;
    payouts_enabled: boolean;
    details_submitted: boolean;
    onboarding_completed: boolean;
    requirements?: Record<string, unknown>;
  } | null;
}

export interface PayoutResult {
  success: boolean;
  payout?: {
    id: string;
    amount: number;
    currency: string;
    status: string;
    transfer_id: string;
    commissions_paid: number;
  };
  error?: string;
}

/**
 * Create or get onboarding URL for Stripe Connect
 */
export async function createConnectAccount(
  customerId: string,
  email: string
): Promise<{ onboardingUrl: string; accountId: string }> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || window.location.origin;

  const response = await fetch('/api/stripe/create-connect-account', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      customerId,
      email,
      refreshUrl: `${baseUrl}/dashboard/payouts?refresh=true`,
      returnUrl: `${baseUrl}/dashboard/payouts?setup=complete`,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create Connect account');
  }

  const data = await response.json();

  if (!data.success) {
    throw new Error(data.error || 'Failed to create Connect account');
  }

  return {
    onboardingUrl: data.onboardingUrl,
    accountId: data.accountId,
  };
}

/**
 * Check Connect account status
 */
export async function getConnectAccountStatus(
  customerId: string
): Promise<ConnectAccountStatus> {
  const response = await fetch(
    `/api/stripe/create-connect-account?customerId=${customerId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to get Connect account status');
  }

  const data = await response.json();

  if (!data.success) {
    throw new Error(data.error || 'Failed to get Connect account status');
  }

  return {
    exists: data.exists,
    account: data.account,
  };
}

/**
 * Request a payout
 */
export async function requestPayout(
  ambassadorId: string,
  amount?: number
): Promise<PayoutResult> {
  const response = await fetch('/api/stripe/create-payout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ambassadorId,
      amount,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    return {
      success: false,
      error: data.error || 'Failed to create payout',
    };
  }

  return data;
}

/**
 * Start Connect onboarding flow
 */
export async function startOnboarding(customerId: string, email: string) {
  try {
    const { onboardingUrl } = await createConnectAccount(customerId, email);
    window.location.href = onboardingUrl;
  } catch (error) {
    console.error('Onboarding error:', error);
    throw error;
  }
}

/**
 * Format payout amount for display
 */
export function formatPayoutAmount(amountInCents: number): string {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
  }).format(amountInCents / 100);
}

/**
 * Get minimum payout amount in cents
 */
export const MINIMUM_PAYOUT = 50000; // $500 AUD

/**
 * Check if amount meets minimum payout threshold
 */
export function meetsMinimumPayout(amountInCents: number): boolean {
  return amountInCents >= MINIMUM_PAYOUT;
}

/**
 * Example usage:
 *
 * // Check if user has Connect account
 * const status = await getConnectAccountStatus(customerId);
 *
 * if (!status.exists || !status.account?.payouts_enabled) {
 *   // Start onboarding
 *   await startOnboarding(customerId, email);
 * } else {
 *   // Request payout
 *   const result = await requestPayout(ambassadorId);
 *   if (result.success) {
 *     console.log('Payout created:', result.payout);
 *   }
 * }
 */
