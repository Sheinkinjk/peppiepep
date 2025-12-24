#!/usr/bin/env node

/* eslint-disable @typescript-eslint/no-require-imports */
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

async function findBusiness() {
  try {
    // Get all businesses
    const { data: businesses, error } = await supabase
      .from('businesses')
      .select('id, name, owner_id, created_at')
      .order('created_at', { ascending: false })
      .limit(20);

    if (error) {
      console.error('Error:', error);
      process.exit(1);
    }

    console.log('\n📋 Recent businesses:');
    businesses.forEach((biz, idx) => {
      console.log(`${idx + 1}. ${biz.name}`);
      console.log(`   ID: ${biz.id}`);
      console.log(`   Owner: ${biz.owner_id}`);
      console.log(`   Created: ${biz.created_at}\n`);
    });

    // Since we can't easily query auth.users, let's look for "Pepform" or similar
    const pepformBusiness = businesses.find(b =>
      b.name.toLowerCase().includes('pepform') ||
      b.name.toLowerCase().includes('refer') ||
      b.name.toLowerCase().includes('labs')
    );

    if (pepformBusiness) {
      console.log('\n✅ Likely candidate for jarred@referlabs.com.au:');
      console.log(`   Business: ${pepformBusiness.name}`);
      console.log(`   ID: ${pepformBusiness.id}`);
      console.log(`\nTo set this, run:`);
      console.log(`   sed -i '' 's/PARTNER_PROGRAM_BUSINESS_ID=.*/PARTNER_PROGRAM_BUSINESS_ID=${pepformBusiness.id}/' .env.local`);
    }

  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

findBusiness();
