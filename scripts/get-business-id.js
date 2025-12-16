#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function getBusinessId() {
  try {
    // First, get the user ID for jarred@referlabs.com.au
    const { data: users, error: userError } = await supabase
      .from('auth.users')
      .select('id')
      .eq('email', 'jarred@referlabs.com.au')
      .single();

    if (userError) {
      console.error('Error finding user:', userError);

      // Try alternative query
      const { data: businesses, error: bizError } = await supabase
        .from('businesses')
        .select('id, name, owner_id')
        .limit(5);

      if (bizError) {
        console.error('Error querying businesses:', bizError);
        process.exit(1);
      }

      console.log('\nFound businesses:');
      console.log(JSON.stringify(businesses, null, 2));
      console.log('\nPlease manually identify the business ID for jarred@referlabs.com.au');
      process.exit(0);
    }

    // Get the business for this user
    const { data: business, error: bizError } = await supabase
      .from('businesses')
      .select('id, name, owner_id')
      .eq('owner_id', users.id)
      .single();

    if (bizError) {
      console.error('Error finding business:', bizError);
      process.exit(1);
    }

    console.log('\n✅ Found business for jarred@referlabs.com.au:');
    console.log(`   Business ID: ${business.id}`);
    console.log(`   Business Name: ${business.name}`);
    console.log(`\nTo set this in .env.local, run:`);
    console.log(`   sed -i '' 's/PARTNER_PROGRAM_BUSINESS_ID=.*/PARTNER_PROGRAM_BUSINESS_ID=${business.id}/' .env.local`);
    console.log(`\nOr manually update .env.local with:`);
    console.log(`   PARTNER_PROGRAM_BUSINESS_ID=${business.id}`);

  } catch (error) {
    console.error('Unexpected error:', error);
    process.exit(1);
  }
}

getBusinessId();
