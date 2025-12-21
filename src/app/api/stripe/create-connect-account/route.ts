import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createServerComponentClient } from '@/lib/supabase';

/**
 * Create a Stripe Connect Express account for an ambassador
 *
 * POST /api/stripe/create-connect-account
 * Body: {
 *   customerId: string (customer UUID)
 *   email: string
 *   refreshUrl: string (where to redirect if onboarding is refreshed)
 *   returnUrl: string (where to redirect after onboarding)
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { customerId, email, refreshUrl, returnUrl } = body;

    if (!customerId || !email) {
      return NextResponse.json(
        { error: 'Customer ID and email are required' },
        { status: 400 }
      );
    }

    if (!refreshUrl || !returnUrl) {
      return NextResponse.json(
        { error: 'Refresh and return URLs are required' },
        { status: 400 }
      );
    }

    const supabase = await createServerComponentClient();

    // Check if customer already has a Connect account
    const { data: existingAccount } = await supabase
      .from('stripe_connect_accounts')
      .select('*')
      .eq('customer_id', customerId)
      .single() as {
        data: {
          stripe_account_id: string;
          onboarding_url: string | null;
          onboarding_expires_at: string | null;
        } | null;
      };

    if (existingAccount) {
      // Account exists, create new onboarding link
      const accountLink = await stripe.accountLinks.create({
        account: existingAccount.stripe_account_id,
        refresh_url: refreshUrl,
        return_url: returnUrl,
        type: 'account_onboarding',
      });

      // Update onboarding URL and expiry
      await supabase
        .from('stripe_connect_accounts')
        .update({
          onboarding_url: accountLink.url,
          onboarding_expires_at: new Date(accountLink.expires_at * 1000).toISOString(),
        } as any)
        .eq('customer_id', customerId);

      return NextResponse.json({
        success: true,
        accountId: existingAccount.stripe_account_id,
        onboardingUrl: accountLink.url,
        exists: true,
      });
    }

    // Create new Stripe Connect Express account
    const account = await stripe.accounts.create({
      type: 'express',
      country: 'AU',
      email: email,
      capabilities: {
        transfers: { requested: true },
      },
      business_type: 'individual',
      metadata: {
        platform_customer_id: customerId,
      },
    });

    // Create account link for onboarding
    const accountLink = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: refreshUrl,
      return_url: returnUrl,
      type: 'account_onboarding',
    });

    // Save to database
    const { data: connectAccount, error: dbError } = await supabase
      .from('stripe_connect_accounts')
      .insert({
        customer_id: customerId,
        stripe_account_id: account.id,
        account_type: 'express',
        charges_enabled: account.charges_enabled,
        payouts_enabled: account.payouts_enabled,
        details_submitted: account.details_submitted || false,
        country: account.country,
        email: account.email,
        onboarding_completed: false,
        onboarding_url: accountLink.url,
        onboarding_expires_at: new Date(accountLink.expires_at * 1000).toISOString(),
        metadata: {
          created_at: new Date().toISOString(),
        },
      } as any)
      .select()
      .single();

    if (dbError) {
      throw new Error(`Failed to save Connect account: ${dbError.message}`);
    }

    return NextResponse.json({
      success: true,
      accountId: account.id,
      onboardingUrl: accountLink.url,
      exists: false,
    });
  } catch (error) {
    console.error('Connect account creation error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * Check Connect account status
 *
 * GET /api/stripe/create-connect-account?customerId=xxx
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const customerId = searchParams.get('customerId');

    if (!customerId) {
      return NextResponse.json(
        { error: 'Customer ID is required' },
        { status: 400 }
      );
    }

    const supabase = await createServerComponentClient();

    const { data: connectAccount, error } = await supabase
      .from('stripe_connect_accounts')
      .select('*')
      .eq('customer_id', customerId)
      .single() as {
        data: {
          id: string;
          stripe_account_id: string;
          charges_enabled: boolean;
          payouts_enabled: boolean;
          details_submitted: boolean;
          onboarding_completed: boolean;
        } | null;
        error: any;
      };

    if (error || !connectAccount) {
      return NextResponse.json({
        success: true,
        exists: false,
        account: null,
      });
    }

    // Refresh account status from Stripe
    try {
      const account = await stripe.accounts.retrieve(connectAccount.stripe_account_id);

      // Update database with latest info
      await supabase
        .from('stripe_connect_accounts')
        .update({
          charges_enabled: account.charges_enabled,
          payouts_enabled: account.payouts_enabled,
          details_submitted: account.details_submitted || false,
          onboarding_completed: account.details_submitted && account.payouts_enabled,
          requirements: account.requirements as any,
        } as any)
        .eq('id', connectAccount.id);

      return NextResponse.json({
        success: true,
        exists: true,
        account: {
          id: connectAccount.id,
          stripe_account_id: connectAccount.stripe_account_id,
          charges_enabled: account.charges_enabled,
          payouts_enabled: account.payouts_enabled,
          details_submitted: account.details_submitted,
          onboarding_completed: account.details_submitted && account.payouts_enabled,
          requirements: account.requirements,
        },
      });
    } catch (stripeError) {
      console.error('Failed to refresh account from Stripe:', stripeError);
      // Return cached data if Stripe call fails
      return NextResponse.json({
        success: true,
        exists: true,
        account: {
          id: connectAccount.id,
          stripe_account_id: connectAccount.stripe_account_id,
          charges_enabled: connectAccount.charges_enabled,
          payouts_enabled: connectAccount.payouts_enabled,
          details_submitted: connectAccount.details_submitted,
          onboarding_completed: connectAccount.onboarding_completed,
        },
      });
    }
  } catch (error) {
    console.error('Connect account status error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
