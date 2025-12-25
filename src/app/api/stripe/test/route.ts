/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server';
import { stripe, getStripePublishableKey } from '@/lib/stripe';
import { requireAdmin } from '@/lib/admin-auth';

/**
 * Test endpoint to verify Stripe connection
 * GET /api/stripe/test
 * PROTECTED: Requires admin authentication
 */
export async function GET(request: NextRequest) {
  // Require admin access to prevent information disclosure
  try {
    await requireAdmin();
  } catch (error) {
    return NextResponse.json(
      { error: 'Unauthorized. Admin access required.' },
      { status: 403 }
    );
  }

  try {
    // Test Stripe connection by fetching account details
    const account = await stripe.accounts.retrieve();

    return NextResponse.json({
      success: true,
      message: 'Stripe connection successful',
      account: {
        id: account.id,
        email: account.email,
        country: account.country,
        currency: account.default_currency,
        charges_enabled: account.charges_enabled,
        payouts_enabled: account.payouts_enabled,
        details_submitted: account.details_submitted,
      },
      config: {
        publishableKey: getStripePublishableKey().substring(0, 20) + '...',
        currency: 'AUD',
        environment: process.env.NODE_ENV,
      },
    });
  } catch (error) {
    console.error('Stripe test failed:', error);

    // Check if it's an authentication error
    const errorMessage = (error as Error).message;
    const isAuthError = errorMessage.includes('API key') || errorMessage.includes('Invalid');

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        hint: isAuthError
          ? 'Check that STRIPE_SECRET_KEY is set correctly in environment variables'
          : 'Check server logs for details',
      },
      { status: 500 }
    );
  }
}
