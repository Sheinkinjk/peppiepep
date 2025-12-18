/**
 * Script to create Stripe products and prices
 * Run with: npx tsx scripts/setup-stripe-products.ts
 */

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-12-15.clover',
  typescript: true,
});

async function setupProducts() {
  console.log('🚀 Setting up Stripe products...\n');

  try {
    // Base Plan - Monthly
    const baseMonthly = await stripe.prices.create({
      currency: 'aud',
      unit_amount: 49900, // $499 AUD
      recurring: {
        interval: 'month',
      },
      product_data: {
        name: 'Refer Labs - Base Plan',
        description: 'Launch-ready program for small teams',
        metadata: {
          plan: 'base',
          billing: 'monthly',
          ambassadors: '50',
          messages: '5000',
        },
      },
    });
    console.log('✅ Base Monthly:', baseMonthly.id);

    // Base Plan - Annual
    const baseAnnual = await stripe.prices.create({
      currency: 'aud',
      unit_amount: 47900, // $479 AUD (20% discount from monthly)
      recurring: {
        interval: 'year',
      },
      product: baseMonthly.product as string,
    });
    console.log('✅ Base Annual:', baseAnnual.id);

    // Scale Plan - Monthly
    const scaleMonthly = await stripe.prices.create({
      currency: 'aud',
      unit_amount: 59900, // $599 AUD
      recurring: {
        interval: 'month',
      },
      product_data: {
        name: 'Refer Labs - Scale Plan',
        description: 'For teams running steady campaigns',
        metadata: {
          plan: 'scale',
          billing: 'monthly',
          ambassadors: '125',
          messages: '12500',
        },
      },
    });
    console.log('✅ Scale Monthly:', scaleMonthly.id);

    // Scale Plan - Annual
    const scaleAnnual = await stripe.prices.create({
      currency: 'aud',
      unit_amount: 57500, // $575 AUD (20% discount from monthly)
      recurring: {
        interval: 'year',
      },
      product: scaleMonthly.product as string,
    });
    console.log('✅ Scale Annual:', scaleAnnual.id);

    console.log('\n📋 Add these to your .env.local:\n');
    console.log(`NEXT_PUBLIC_STRIPE_PRICE_BASE_MONTHLY=${baseMonthly.id}`);
    console.log(`NEXT_PUBLIC_STRIPE_PRICE_BASE_ANNUAL=${baseAnnual.id}`);
    console.log(`NEXT_PUBLIC_STRIPE_PRICE_SCALE_MONTHLY=${scaleMonthly.id}`);
    console.log(`NEXT_PUBLIC_STRIPE_PRICE_SCALE_ANNUAL=${scaleAnnual.id}`);
    console.log('\n✅ Stripe products created successfully!');
  } catch (error) {
    console.error('❌ Error creating products:', error);
    process.exit(1);
  }
}

setupProducts();
