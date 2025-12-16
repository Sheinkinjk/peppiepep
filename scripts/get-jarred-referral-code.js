#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js');
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

async function getJarredReferralCode() {
  try {
    const businessId = 'bd8f6179-8507-4098-95eb-28389a96c8c0';

    // Get all customers for Refer Labs business
    const { data: customers, error } = await supabase
      .from('customers')
      .select('*')
      .eq('business_id', businessId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error:', error);
      process.exit(1);
    }

    console.log('\n📋 Customers for Refer Labs business:');
    if (!customers || customers.length === 0) {
      console.log('   No customers found. Need to create one for jarred@referlabs.com.au');
      return;
    }

    customers.forEach((customer, idx) => {
      console.log(`\n${idx + 1}. ${customer.name || 'Unnamed'}`);
      console.log(`   Email: ${customer.email || 'No email'}`);
      console.log(`   Referral Code: ${customer.referral_code || 'NONE'}`);
      console.log(`   Discount Code: ${customer.discount_code || 'NONE'}`);
      console.log(`   Status: ${customer.status}`);
      console.log(`   Created: ${customer.created_at}`);
    });

    // Look for jarred@referlabs.com.au specifically
    const jarredCustomer = customers.find(c =>
      c.email && c.email.toLowerCase() === 'jarred@referlabs.com.au'
    );

    if (jarredCustomer) {
      console.log('\n✅ Found jarred@referlabs.com.au customer:');
      console.log(`   Referral Code: ${jarredCustomer.referral_code || 'MISSING - NEEDS GENERATION'}`);
      console.log(`   Discount Code: ${jarredCustomer.discount_code || 'MISSING - NEEDS GENERATION'}`);

      if (jarredCustomer.referral_code) {
        console.log(`\n🔗 Admin referral link: https://referlabs.com.au/r/${jarredCustomer.referral_code}`);
      }
    } else {
      console.log('\n❌ No customer found for jarred@referlabs.com.au');
      console.log('   Need to create a customer record for the admin');
    }

  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

getJarredReferralCode();
