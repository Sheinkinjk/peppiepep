import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import { createServerComponentClient } from '@/lib/supabase';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'No signature provided' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json(
      { error: `Webhook Error: ${(err as Error).message}` },
      { status: 400 }
    );
  }

  const supabase = createServerComponentClient();

  // Log the webhook event
  try {
    await supabase.from('stripe_webhook_events').insert([
      {
        stripe_event_id: event.id,
        event_type: event.type,
        object_type: event.data.object.object,
        object_id: (event.data.object as any).id,
        payload: event.data.object as any,
        processed: false,
      },
    ]);
  } catch (logError) {
    console.error('Failed to log webhook event:', logError);
    // Continue processing even if logging fails
  }

  // Process the event
  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event.data.object as Stripe.Checkout.Session);
        break;

      case 'payment_intent.succeeded':
        await handlePaymentIntentSucceeded(event.data.object as Stripe.PaymentIntent);
        break;

      case 'payment_intent.payment_failed':
        await handlePaymentIntentFailed(event.data.object as Stripe.PaymentIntent);
        break;

      case 'customer.created':
        await handleCustomerCreated(event.data.object as Stripe.Customer);
        break;

      case 'charge.refunded':
        await handleChargeRefunded(event.data.object as Stripe.Charge);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    // Mark event as processed
    await supabase
      .from('stripe_webhook_events')
      .update({ processed: true, processed_at: new Date().toISOString() })
      .eq('stripe_event_id', event.id);

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook handler error:', error);

    // Update error in webhook log
    await supabase
      .from('stripe_webhook_events')
      .update({
        processing_error: (error as Error).message,
        retry_count: 1,
      })
      .eq('stripe_event_id', event.id);

    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}

/**
 * Handle checkout session completed
 */
async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  const supabase = createServerComponentClient();

  console.log('Processing checkout.session.completed:', session.id);

  // Payment is already recorded in payment_intent.succeeded
  // This event is mainly for subscription setups or additional metadata
  console.log('Checkout session completed for:', session.customer);
}

/**
 * Handle successful payment
 */
async function handlePaymentIntentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  const supabase = createServerComponentClient();

  console.log('Processing payment_intent.succeeded:', paymentIntent.id);

  // Extract metadata
  const businessId = paymentIntent.metadata.platform_business_id || null;
  const customerId = paymentIntent.metadata.platform_customer_id || null;

  // Create payment record
  const { data: payment, error: paymentError } = await supabase
    .from('stripe_payments')
    .insert([
      {
        business_id: businessId,
        stripe_customer_id: paymentIntent.customer as string || null,
        stripe_payment_intent_id: paymentIntent.id,
        amount_total: paymentIntent.amount,
        amount_subtotal: paymentIntent.amount,
        currency: paymentIntent.currency,
        status: 'succeeded',
        payment_method: paymentIntent.payment_method as string || null,
        payment_method_type: paymentIntent.charges.data[0]?.payment_method_details?.type || null,
        description: paymentIntent.description || null,
        receipt_url: paymentIntent.charges.data[0]?.receipt_url || null,
        paid_at: new Date(paymentIntent.created * 1000).toISOString(),
        metadata: paymentIntent.metadata,
      },
    ])
    .select()
    .single();

  if (paymentError) {
    throw new Error(`Failed to create payment record: ${paymentError.message}`);
  }

  console.log('Payment record created:', payment.id);

  // Check if this payment should generate revenue share commissions
  // This would happen for subscription payments where the customer was referred
  if (businessId) {
    await createRevenueShareCommission(businessId, payment.id, paymentIntent.amount);
  }
}

/**
 * Handle failed payment
 */
async function handlePaymentIntentFailed(paymentIntent: Stripe.PaymentIntent) {
  const supabase = createServerComponentClient();

  console.log('Processing payment_intent.payment_failed:', paymentIntent.id);

  // Record failed payment
  await supabase.from('stripe_payments').insert([
    {
      business_id: paymentIntent.metadata.platform_business_id || null,
      stripe_customer_id: paymentIntent.customer as string || null,
      stripe_payment_intent_id: paymentIntent.id,
      amount_total: paymentIntent.amount,
      amount_subtotal: paymentIntent.amount,
      currency: paymentIntent.currency,
      status: 'failed',
      payment_method: paymentIntent.payment_method as string || null,
      description: paymentIntent.description || null,
      metadata: {
        ...paymentIntent.metadata,
        failure_code: paymentIntent.last_payment_error?.code,
        failure_message: paymentIntent.last_payment_error?.message,
      },
    },
  ]);

  console.log('Failed payment recorded');
}

/**
 * Handle customer creation
 */
async function handleCustomerCreated(customer: Stripe.Customer) {
  console.log('Processing customer.created:', customer.id);
  // Customer is already created via create-checkout endpoint
  // This is just for logging
}

/**
 * Handle refund
 */
async function handleChargeRefunded(charge: Stripe.Charge) {
  const supabase = createServerComponentClient();

  console.log('Processing charge.refunded:', charge.id);

  // Find the payment by payment intent
  const { data: payment } = await supabase
    .from('stripe_payments')
    .select('id')
    .eq('stripe_payment_intent_id', charge.payment_intent as string)
    .single();

  if (payment) {
    await supabase
      .from('stripe_payments')
      .update({
        status: 'refunded',
        refund_amount: charge.amount_refunded,
        refunded_at: new Date().toISOString(),
      })
      .eq('id', payment.id);

    console.log('Payment marked as refunded:', payment.id);
  }
}

/**
 * Create revenue share commission for partner subscriptions
 */
async function createRevenueShareCommission(
  businessId: string,
  paymentId: string,
  amount: number
) {
  const supabase = createServerComponentClient();

  // Check if this business was referred by someone
  const { data: referral } = await supabase
    .from('referrals')
    .select('id, referred_by, referrer:customers!referred_by(id, email, name)')
    .eq('referred_to', businessId)
    .eq('type', 'partner')
    .single();

  if (!referral) {
    console.log('No referral found for business:', businessId);
    return;
  }

  // Calculate 10% revenue share
  const commissionAmount = Math.round((amount * 10) / 100);

  // Create commission record
  const { data: commission, error: commissionError } = await supabase
    .from('stripe_commissions')
    .insert([
      {
        business_id: referral.referrer?.id ? null : businessId, // Commission belongs to referrer's business context
        ambassador_id: referral.referred_by,
        referral_id: referral.id,
        payment_id: paymentId,
        amount: commissionAmount,
        currency: 'aud',
        commission_type: 'revenue_share',
        commission_rate: 10.0,
        original_payment_amount: amount,
        status: 'approved', // Auto-approve revenue share
        approved_at: new Date().toISOString(),
        metadata: {
          rule: 'Partner revenue share',
          percentage: 10,
          original_amount_aud: amount / 100,
          commission_amount_aud: commissionAmount / 100,
        },
      },
    ])
    .select()
    .single();

  if (commissionError) {
    console.error('Failed to create revenue share commission:', commissionError);
    throw commissionError;
  }

  console.log('Revenue share commission created:', commission.id);
}
