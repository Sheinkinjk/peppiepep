#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js');
const { nanoid } = require('nanoid');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

function generateDiscountCode(name) {
  const adjectives = ['Plus', 'Prime', 'Elite', 'Pro', 'VIP', 'Insider', 'Premium'];
  const suffixes = ['Benefits', 'Perks', 'Rewards', 'Access', 'Club'];
  const randomNum = Math.floor(Math.random() * 99) + 1;

  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];

  return `${name}${adj}${randomNum}`;
}

async function createAdminReferral() {
  try {
    const businessId = 'bd8f6179-8507-4098-95eb-28389a96c8c0';
    const adminEmail = 'jarred@referlabs.com.au';
    const adminName = 'Jarred Krowitz';

    console.log('\n🔧 Creating admin referral customer for', adminEmail);

    // Check if already exists
    const { data: existing } = await supabase
      .from('customers')
      .select('*')
      .eq('business_id', businessId)
      .eq('email', adminEmail)
      .maybeSingle();

    if (existing) {
      console.log('\n✅ Admin customer already exists:');
      console.log(`   Referral Code: ${existing.referral_code}`);
      console.log(`   Discount Code: ${existing.discount_code}`);
      console.log(`   🔗 Link: https://referlabs.com.au/r/${existing.referral_code}`);
      return;
    }

    // Generate codes
    const referralCode = nanoid(12);
    const discountCode = generateDiscountCode(adminName.split(' ')[0]);

    // Create admin customer
    const { data: customer, error } = await supabase
      .from('customers')
      .insert([{
        business_id: businessId,
        name: adminName,
        email: adminEmail,
        phone: null,
        company: 'Refer Labs',
        website: 'https://referlabs.com.au',
        referral_code: referralCode,
        discount_code: discountCode,
        status: 'active', // Admin is always active
        credits: 0,
        source: 'admin_setup',
        notes: 'Primary admin account for Refer Labs',
      }])
      .select()
      .single();

    if (error) {
      console.error('\n❌ Error creating admin customer:', error);
      process.exit(1);
    }

    console.log('\n✅ Admin customer created successfully!');
    console.log(`   Name: ${customer.name}`);
    console.log(`   Email: ${customer.email}`);
    console.log(`   Referral Code: ${customer.referral_code}`);
    console.log(`   Discount Code: ${customer.discount_code}`);
    console.log(`   Status: ${customer.status}`);
    console.log(`\n🔗 Admin referral link: https://referlabs.com.au/r/${customer.referral_code}`);
    console.log(`\n📋 To add to .env.local:`);
    console.log(`   ADMIN_REFERRAL_CODE=${customer.referral_code}`);

  } catch (error) {
    console.error('\n❌ Error:', error);
    process.exit(1);
  }
}

createAdminReferral();
