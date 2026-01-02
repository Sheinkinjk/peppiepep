import { NextRequest, NextResponse } from 'next/server';
import { stripe, PAYOUT_THRESHOLD, PAYOUT_CURRENCY } from '@/lib/stripe';
import { createServerComponentClient } from '@/lib/supabase';
import { checkRateLimit } from '@/lib/rate-limit';
import { sendTransactionalEmail } from "@/lib/transactional-email";

/**
 * Create a payout to an ambassador's connected account
 *
 * POST /api/stripe/create-payout
 * Body: {
 *   ambassadorId: string (customer UUID)
 *   amount?: number (optional, defaults to all approved commissions)
 * }
 */
export async function POST(request: NextRequest) {
  // Rate limiting: 3 payout attempts per minute to prevent abuse
  const rateLimitCheck = await checkRateLimit(request, 'payout');
  if (!rateLimitCheck.success && rateLimitCheck.response) {
    return rateLimitCheck.response;
  }

  try {
    const body = await request.json();
    const { ambassadorId, amount: requestedAmount } = body;

    if (!ambassadorId) {
      return NextResponse.json(
        { error: 'Ambassador ID is required' },
        { status: 400 }
      );
    }

    const supabase = await createServerComponentClient();

    // Get ambassador details
    const { data: ambassador, error: ambassadorError } = await supabase
      .from('customers')
      .select('id, email, name')
      .eq('id', ambassadorId)
      .single();

    if (ambassadorError || !ambassador) {
      return NextResponse.json(
        { error: 'Ambassador not found' },
        { status: 404 }
      );
    }

    // Get ambassador's Stripe Connect account
    const { data: connectAccount, error: connectError } = await supabase
      .from('stripe_connect_accounts')
      .select('*')
      .eq('customer_id', ambassadorId)
      .single();

    if (connectError || !connectAccount) {
      return NextResponse.json(
        {
          error: 'No Stripe Connect account found. Ambassador must complete onboarding first.',
          action: 'create_connect_account',
        },
        { status: 400 }
      );
    }

    if (!connectAccount.payouts_enabled) {
      return NextResponse.json(
        {
          error: 'Payouts not enabled for this account. Please complete onboarding.',
          action: 'complete_onboarding',
          onboarding_url: connectAccount.onboarding_url,
        },
        { status: 400 }
      );
    }

    // Get approved commissions that haven't been paid
    const { data: commissions, error: commissionsError } = await supabase
      .from('stripe_commissions')
      .select('id, amount')
      .eq('ambassador_id', ambassadorId)
      .eq('status', 'approved')
      .is('payout_id', null);

    if (commissionsError) {
      throw new Error(`Failed to fetch commissions: ${commissionsError.message}`);
    }

    if (!commissions || commissions.length === 0) {
      return NextResponse.json(
        { error: 'No approved commissions available for payout' },
        { status: 400 }
      );
    }

    // Calculate total available balance
    const totalAvailable = commissions.reduce((sum, c) => sum + c.amount, 0);

    // Determine payout amount
    const payoutAmount = requestedAmount || totalAvailable;

    if (payoutAmount > totalAvailable) {
      return NextResponse.json(
        {
          error: 'Requested amount exceeds available balance',
          available: totalAvailable,
          requested: payoutAmount,
        },
        { status: 400 }
      );
    }

    // Check minimum payout threshold
    if (payoutAmount < PAYOUT_THRESHOLD) {
      return NextResponse.json(
        {
          error: `Payout amount must be at least ${PAYOUT_THRESHOLD / 100} AUD`,
          available: totalAvailable,
          minimum: PAYOUT_THRESHOLD,
        },
        { status: 400 }
      );
    }

    // Get business ID for the payout record (use first commission's business)
    const { data: firstCommission } = await supabase
      .from('stripe_commissions')
      .select('business_id')
      .eq('id', commissions[0].id)
      .single();

    const businessId = firstCommission?.business_id || null;

    // Create Stripe Transfer to connected account
    const transfer = await stripe.transfers.create({
      amount: payoutAmount,
      currency: PAYOUT_CURRENCY,
      destination: connectAccount.stripe_account_id,
      description: `Commission payout for ${ambassador.name || ambassador.email}`,
      metadata: {
        ambassador_id: ambassadorId,
        ambassador_email: ambassador.email,
        commission_count: commissions.length.toString(),
      },
    });

    // Create payout record in database
    const { data: payout, error: payoutError } = await supabase
      .from('stripe_payouts')
      .insert([
        {
          business_id: businessId,
          ambassador_id: ambassadorId,
          stripe_transfer_id: transfer.id,
          stripe_connect_account_id: connectAccount.stripe_account_id,
          amount: payoutAmount,
          currency: PAYOUT_CURRENCY,
          status: 'in_transit',
          description: `Payout of ${commissions.length} commission(s)`,
          metadata: {
            commission_ids: commissions.map((c) => c.id),
            transfer_id: transfer.id,
          },
        },
      ])
      .select()
      .single();

    if (payoutError) {
      throw new Error(`Failed to create payout record: ${payoutError.message}`);
    }

    // Update commissions to mark them as paid
    const { error: updateError } = await supabase
      .from('stripe_commissions')
      .update({
        status: 'paid',
        paid_at: new Date().toISOString(),
        payout_id: payout.id,
      })
      .in(
        'id',
        commissions.map((c) => c.id)
      );

    if (updateError) {
      console.error('Failed to update commissions:', updateError);
      // Don't fail the payout if commission update fails
    }

    // Ambassador payout notification (best-effort)
    try {
      const ambassadorEmail = ambassador.email || null;
      const ambassadorName = ambassador.name || ambassador.email || "Ambassador";
      if (ambassadorEmail) {
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://referlabs.com.au";
        const amountAud = (payoutAmount / 100).toFixed(2);
        await sendTransactionalEmail({
          to: ambassadorEmail,
          subject: `Payout initiated — $${amountAud} AUD`,
          html: `<!doctype html><html><body style="font-family:Inter,system-ui,-apple-system,sans-serif;background:#f5f5f5;padding:32px"><div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:24px;padding:32px;border:1px solid #e2e8f0"><p style="font-size:18px;font-weight:900;margin:0 0 10px;color:#0f172a">Payout on the way, ${ambassadorName}.</p><p style="margin:0;color:#475569;font-size:14px;line-height:1.6">We just initiated a payout of <strong>$${amountAud} AUD</strong> to your connected account. It may take a short time to appear, depending on your bank.</p><p style="margin:18px 0 0"><a href="${siteUrl}/r/referral" style="display:inline-block;background:#0f172a;color:#ffffff;padding:12px 18px;border-radius:999px;text-decoration:none;font-weight:800">View my portal</a></p><p style="margin:18px 0 0;color:#94a3b8;font-size:12px">Transfer ID: ${transfer.id}</p></div><p style="text-align:center;font-size:12px;color:#94a3b8;margin-top:14px">Sent by Refer Labs</p></body></html>`,
        });
      }
    } catch (emailError) {
      console.error('Failed to send ambassador payout email (non-fatal):', emailError);
    }

    return NextResponse.json({
      success: true,
      payout: {
        id: payout.id,
        amount: payoutAmount,
        currency: PAYOUT_CURRENCY,
        status: 'in_transit',
        transfer_id: transfer.id,
        commissions_paid: commissions.length,
      },
    });
  } catch (error) {
    console.error('Payout creation error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
