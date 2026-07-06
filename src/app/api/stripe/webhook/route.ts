import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { stripe, requireStripe } from '@/lib/stripe';
import { createServerComponentClient } from '@/lib/supabase';
import { createBlueprintClient } from '@/lib/supabase-blueprint';
import { createApiLogger } from '@/lib/api-logger';
import { sendAdminNotification, buildBlueprintBuyerConfirmationEmail } from '@/lib/email-notifications';
import type { Json } from '@/types/supabase';

// Defensive trim, protects against trailing whitespace from how the env var was set (e.g. via `echo "..." | vercel env add`)
const webhookSecret = (process.env.STRIPE_WEBHOOK_SECRET || '').trim();

// Type-safe interfaces for webhook data
interface StripeWebhookEvent {
  stripe_event_id: string;
  event_type: string;
  object_type: string;
  object_id: string;
  payload: Json;
  processed: boolean;
}

export async function POST(request: NextRequest) {
  const logger = createApiLogger('stripe-webhook');

  try {
    requireStripe();
  } catch (error) {
    logger.error('Stripe not configured', { error });
    return NextResponse.json(
      { error: 'Payment processing is not available' },
      { status: 503 }
    );
  }

  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get('stripe-signature');

  if (!signature) {
    logger.warn('Webhook request missing signature');
    return NextResponse.json(
      { error: 'No signature provided' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    logger.error('Webhook signature verification failed', { error: err });
    return NextResponse.json(
      { error: `Webhook Error: ${(err as Error).message}` },
      { status: 400 }
    );
  }

  const supabase = await createServerComponentClient();

  // Log the webhook event, fire-and-forget so DB errors never cause a 500 to Stripe
  const eventData = event.data.object;
  const objectId = 'id' in eventData && typeof eventData.id === 'string' ? eventData.id : 'unknown';
  const webhookEvent: StripeWebhookEvent = {
    stripe_event_id: event.id,
    event_type: event.type,
    object_type: eventData.object,
    object_id: objectId,
    payload: JSON.parse(JSON.stringify(eventData)) as Json,
    processed: false,
  };
  void supabase.from('stripe_webhook_events').insert(webhookEvent).then(
    () => {},
    (logError: unknown) => { logger.error('Failed to log webhook event to database', { error: logError }); }
  );

  // Process the event
  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event.data.object as Stripe.Checkout.Session, logger);
        break;

      case 'payment_intent.succeeded':
        await handlePaymentIntentSucceeded(event.data.object as Stripe.PaymentIntent, logger);
        break;

      case 'payment_intent.payment_failed':
        await handlePaymentIntentFailed(event.data.object as Stripe.PaymentIntent, logger);
        break;

      case 'customer.created':
        await handleCustomerCreated(event.data.object as Stripe.Customer, logger);
        break;

      case 'charge.refunded':
        await handleChargeRefunded(event.data.object as Stripe.Charge, logger);
        break;

      default:
        logger.info('Unhandled event type received', { eventType: event.type });
    }

    // Mark event as processed, fire-and-forget so DB errors never cause a 500 to Stripe
    void supabase
      .from('stripe_webhook_events')
      .update({ processed: true, processed_at: new Date().toISOString() })
      .eq('stripe_event_id', event.id)
      .then(() => {}, () => {});

    logger.info('Webhook processed successfully', { eventType: event.type, eventId: event.id });
    return NextResponse.json({ received: true });
  } catch (error) {
    logger.error('Webhook handler error', { error, eventType: event.type, eventId: event.id });

    // Log error, fire-and-forget, never block the 200 response to Stripe
    void supabase
      .from('stripe_webhook_events')
      .update({ processing_error: (error as Error).message, retry_count: 1 })
      .eq('stripe_event_id', event.id)
      .then(() => {}, () => {});

    // Still return 200 for unhandled event types, only return 500 for signature failures (handled above)
    return NextResponse.json({ received: true });
  }
}

/**
 * Handle checkout session completed
 */
async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session, logger: ReturnType<typeof createApiLogger>) {
  logger.info('Processing checkout session completed', { sessionId: session.id, customerId: session.customer });

  const isBlueprint =
    session.metadata?.product === 'referral_growth_blueprint' ||
    session.metadata?.source === 'referral-blueprint';

  if (!isBlueprint) return;

  const buyerEmail = session.customer_email || (session.customer_details?.email ?? '');
  const buyerName  = session.metadata?.buyer_name || session.customer_details?.name || 'there';

  if (!buyerEmail) {
    logger.warn('Blueprint purchase missing buyer email', { sessionId: session.id });
    return;
  }

  // Generate access token and save purchase record to the dedicated blueprint Supabase project
  const accessToken = crypto.randomUUID();
  const SITE_URL    = process.env.NEXT_PUBLIC_SITE_URL || 'https://referlabs.com.au';
  const portalUrl   = `${SITE_URL}/blueprint-access?token=${accessToken}`;

  const blueprintDb = createBlueprintClient();
  const { error: dbError } = await blueprintDb.from('blueprint_purchases').insert({
    email:             buyerEmail,
    name:              buyerName,
    access_token:      accessToken,
    stripe_session_id: session.id,
    industry:          session.metadata?.industry || '',
    primary_goal:      session.metadata?.primary_goal || '',
    experience_level:  session.metadata?.experience_level || '',
    purchased_at:      new Date(session.created * 1000).toISOString(),
    status:            'preparing',
  });

  if (dbError) {
    logger.error('Failed to save blueprint purchase record', { error: dbError, buyerEmail });
    // Continue, still send the email, just without a portal link
  } else {
    logger.info('Blueprint purchase record created', { buyerEmail, accessToken });
  }

  // Send buyer confirmation email (with portal link if DB write succeeded)
  sendAdminNotification({
    to: buyerEmail,
    subject: 'Your Referral Growth Blueprint, confirmed',
    html: buildBlueprintBuyerConfirmationEmail({
      name:            buyerName,
      email:           buyerEmail,
      industry:        session.metadata?.industry || '',
      primaryGoal:     session.metadata?.primary_goal || '',
      experienceLevel: session.metadata?.experience_level || '',
      purchasedAt:     new Date(session.created * 1000).toISOString(),
      portalUrl:       dbError ? undefined : portalUrl,
    }),
  }).catch((err) => {
    logger.error('Failed to send blueprint buyer confirmation email', { error: err, buyerEmail });
  });

  logger.info('Blueprint purchase handled', { buyerEmail, portalUrl });
}

/**
 * Validate Stripe webhook metadata to prevent injection attacks
 */
function validateMetadata(metadata: Stripe.Metadata): { valid: boolean; businessId: string | null; customerId: string | null } {
  const businessId = metadata.platform_business_id || null;
  const customerId = metadata.platform_customer_id || null;

  // SECURITY FIX: Validate UUIDs to prevent injection
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

  const businessIdValid = !businessId || uuidRegex.test(businessId);
  const customerIdValid = !customerId || uuidRegex.test(customerId);

  return {
    valid: businessIdValid && customerIdValid,
    businessId: businessIdValid ? businessId : null,
    customerId: customerIdValid ? customerId : null,
  };
}

/**
 * Handle successful payment
 */
async function handlePaymentIntentSucceeded(paymentIntent: Stripe.PaymentIntent, logger: ReturnType<typeof createApiLogger>) {
  const supabase = await createServerComponentClient();

  logger.info('Processing payment intent succeeded', {
    paymentIntentId: paymentIntent.id,
    amount: paymentIntent.amount,
    currency: paymentIntent.currency
  });

  // SECURITY FIX: Validate metadata before using
  const validation = validateMetadata(paymentIntent.metadata);
  if (!validation.valid) {
    logger.error('Invalid metadata in payment intent', { metadata: paymentIntent.metadata });
    throw new Error('Invalid metadata format');
  }

  const businessId = validation.businessId;
  const customerId = validation.customerId;
  void customerId;

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
        payment_method_type: null, // Will be populated from charge webhook
        description: paymentIntent.description || null,
        receipt_url: null, // Will be populated from charge webhook
        paid_at: new Date(paymentIntent.created * 1000).toISOString(),
        metadata: paymentIntent.metadata,
      },
    ])
    .select()
    .single();

  if (paymentError) {
    logger.error('Failed to create payment record', { error: paymentError });
    throw new Error(`Failed to create payment record: ${paymentError.message}`);
  }

  logger.info('Payment record created', { paymentId: payment.id });

  // Check if this payment should generate revenue share commissions
  // This would happen for subscription payments where the customer was referred
  if (businessId) {
    await createRevenueShareCommission(businessId, payment.id, paymentIntent.amount, logger);
  }
}

/**
 * Handle failed payment
 */
async function handlePaymentIntentFailed(paymentIntent: Stripe.PaymentIntent, logger: ReturnType<typeof createApiLogger>) {
  const supabase = await createServerComponentClient();

  logger.warn('Processing payment intent failed', {
    paymentIntentId: paymentIntent.id,
    failureCode: paymentIntent.last_payment_error?.code,
    failureMessage: paymentIntent.last_payment_error?.message
  });

  // SECURITY FIX: Validate metadata before using
  const validation = validateMetadata(paymentIntent.metadata);
  if (!validation.valid) {
    logger.error('Invalid metadata in failed payment intent', { metadata: paymentIntent.metadata });
    throw new Error('Invalid metadata format');
  }

  // Record failed payment
  await supabase.from('stripe_payments').insert([
    {
      business_id: validation.businessId,
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
        failure_code: paymentIntent.last_payment_error?.code ?? null,
        failure_message: paymentIntent.last_payment_error?.message ?? null,
      },
    },
  ]);

  logger.info('Failed payment recorded');
}

/**
 * Handle customer creation
 */
async function handleCustomerCreated(customer: Stripe.Customer, logger: ReturnType<typeof createApiLogger>) {
  logger.info('Processing customer created', { customerId: customer.id });
  // Customer is already created via create-checkout endpoint
  // This is just for logging
}

/**
 * Handle refund
 */
async function handleChargeRefunded(charge: Stripe.Charge, logger: ReturnType<typeof createApiLogger>) {
  const supabase = await createServerComponentClient();

  logger.info('Processing charge refunded', { chargeId: charge.id, amountRefunded: charge.amount_refunded });

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

    logger.info('Payment marked as refunded', { paymentId: payment.id });
  }
}

/**
 * Create revenue share commission for partner subscriptions
 */
async function createRevenueShareCommission(
  businessId: string,
  paymentId: string,
  amount: number,
  logger: ReturnType<typeof createApiLogger>
) {
  const supabase = await createServerComponentClient();

  // Check if this business was referred by someone
  // Use a loosely typed query to avoid Supabase relationship inference errors at build time.
  const { data: referral } = await (supabase as any)
    .from('referrals')
    .select('id, referred_by, referrer:customers!referred_by(id, email, name)')
    .eq('referred_to', businessId)
    .eq('type', 'partner')
    .single();

  if (!referral) {
    logger.info('No referral found for business', { businessId });
    return;
  }

  if (!referral.referred_by) {
    logger.warn('Referral missing referrer, skipping commission', { businessId, referralId: referral.id });
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
    logger.error('Failed to create revenue share commission', { error: commissionError });
    throw commissionError;
  }

  logger.info('Revenue share commission created', { commissionId: commission.id, amount: commissionAmount });
}
