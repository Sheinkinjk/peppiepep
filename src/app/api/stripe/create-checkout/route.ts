import { NextRequest, NextResponse } from 'next/server';
import { stripe, STRIPE_CURRENCY } from '@/lib/stripe';
import { createServerComponentClient } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { priceId, customerId, businessId, successUrl, cancelUrl, metadata = {} } = body;

    // Validate required fields
    if (!priceId) {
      return NextResponse.json(
        { error: 'Price ID is required' },
        { status: 400 }
      );
    }

    if (!successUrl || !cancelUrl) {
      return NextResponse.json(
        { error: 'Success and cancel URLs are required' },
        { status: 400 }
      );
    }

    // Get or create Stripe customer
    let stripeCustomerId: string;

    if (customerId) {
      // Check if we already have a Stripe customer ID for this platform customer
      const supabase = createServerComponentClient();
      const { data: existingCustomer } = await supabase
        .from('stripe_customers')
        .select('stripe_customer_id')
        .eq('customer_id', customerId)
        .single();

      if (existingCustomer) {
        stripeCustomerId = existingCustomer.stripe_customer_id;
      } else {
        // Fetch customer details to create Stripe customer
        const { data: customerData } = await supabase
          .from('customers')
          .select('email, name')
          .eq('id', customerId)
          .single();

        if (!customerData) {
          return NextResponse.json(
            { error: 'Customer not found' },
            { status: 404 }
          );
        }

        // Create new Stripe customer
        const stripeCustomer = await stripe.customers.create({
          email: customerData.email,
          name: customerData.name || undefined,
          metadata: {
            platform_customer_id: customerId,
            platform_business_id: businessId || '',
          },
        });

        stripeCustomerId = stripeCustomer.id;

        // Save to database
        await supabase.from('stripe_customers').insert([
          {
            business_id: businessId || null,
            customer_id: customerId,
            stripe_customer_id: stripeCustomerId,
            email: customerData.email,
            name: customerData.name,
            metadata: {
              created_via: 'checkout',
            },
          },
        ]);
      }
    } else {
      // Create customer without platform linking (for one-off payments)
      stripeCustomerId = '';
    }

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomerId || undefined,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription', // Subscription mode for recurring payments
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        platform_business_id: businessId || '',
        platform_customer_id: customerId || '',
        ...metadata,
      },
      payment_method_types: ['card'],
      billing_address_collection: 'auto',
    });

    return NextResponse.json({
      success: true,
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
