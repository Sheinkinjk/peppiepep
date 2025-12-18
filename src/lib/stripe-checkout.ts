/**
 * Client-side Stripe checkout utilities
 */

export interface CheckoutSessionParams {
  priceId: string;
  customerId?: string;
  businessId?: string;
  metadata?: Record<string, string>;
}

export async function createCheckoutSession(
  params: CheckoutSessionParams
): Promise<{ sessionId: string; url: string }> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || window.location.origin;

  const response = await fetch('/api/stripe/create-checkout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...params,
      successUrl: `${baseUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${baseUrl}/payment/cancel`,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create checkout session');
  }

  const data = await response.json();

  if (!data.success) {
    throw new Error(data.error || 'Failed to create checkout session');
  }

  return {
    sessionId: data.sessionId,
    url: data.url,
  };
}

/**
 * Redirect to Stripe Checkout
 */
export async function redirectToCheckout(
  params: CheckoutSessionParams
): Promise<void> {
  try {
    const { url } = await createCheckoutSession(params);
    window.location.href = url;
  } catch (error) {
    console.error('Checkout error:', error);
    throw error;
  }
}

/**
 * Example usage:
 *
 * import { redirectToCheckout } from '@/lib/stripe-checkout';
 *
 * async function handleSubscribe() {
 *   await redirectToCheckout({
 *     priceId: 'price_1234567890',
 *     customerId: 'customer-uuid',
 *     businessId: 'business-uuid',
 *     metadata: {
 *       plan: 'professional',
 *     },
 *   });
 * }
 */
