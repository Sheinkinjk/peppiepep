#!/usr/bin/env node

/**
 * AI Scoring System Verification Script
 * Tests the deployed AI scoring endpoints
 */

const PRODUCTION_URL = 'https://referlabs.com.au';

async function testAIScoring() {
  console.log('🧪 Testing AI Scoring System\n');
  console.log('Production URL:', PRODUCTION_URL);
  console.log('─'.repeat(60));

  // Step 1: Get a business ID from database
  console.log('\n📊 Step 1: Fetching test business...');

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Error: Supabase credentials not found in environment');
    process.exit(1);
  }

  // Get first business with customers
  const businessResponse = await fetch(
    `${supabaseUrl}/rest/v1/businesses?select=id,name&limit=1`,
    {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
      },
    }
  );

  if (!businessResponse.ok) {
    console.error('❌ Failed to fetch business:', await businessResponse.text());
    process.exit(1);
  }

  const businesses = await businessResponse.json();

  if (businesses.length === 0) {
    console.log('⚠️  No businesses found in database');
    console.log('💡 Create a business first, then run this test again');
    process.exit(0);
  }

  const testBusiness = businesses[0];
  console.log('✅ Found test business:', testBusiness.name);
  console.log('   Business ID:', testBusiness.id);

  // Step 2: Check if business has customers
  console.log('\n📋 Step 2: Checking for customers...');

  const customersResponse = await fetch(
    `${supabaseUrl}/rest/v1/customers?select=id,name,email&business_id=eq.${testBusiness.id}&limit=5`,
    {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
      },
    }
  );

  const customers = await customersResponse.json();
  console.log(`✅ Found ${customers.length} customers to score`);

  if (customers.length > 0) {
    console.log('   Sample customers:');
    customers.forEach((c, i) => {
      console.log(`   ${i + 1}. ${c.name || 'Unnamed'} (${c.email || 'No email'})`);
    });
  } else {
    console.log('⚠️  No customers found for this business');
    console.log('💡 Add some customers first, then run this test again');
    process.exit(0);
  }

  // Step 3: Trigger AI scoring
  console.log('\n🤖 Step 3: Triggering AI scoring job...');

  const scoringResponse = await fetch(
    `${PRODUCTION_URL}/api/ai/score-referrals`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        businessId: testBusiness.id,
        forceRescore: false,
      }),
    }
  );

  if (!scoringResponse.ok) {
    const error = await scoringResponse.text();
    console.error('❌ Failed to trigger scoring:', error);
    process.exit(1);
  }

  const scoringResult = await scoringResponse.json();
  console.log('✅ Scoring job created!');
  console.log('   Job ID:', scoringResult.jobId);
  console.log('   Message:', scoringResult.message);

  // Step 4: Poll job status
  console.log('\n⏳ Step 4: Waiting for job to complete...');

  let attempts = 0;
  const maxAttempts = 30; // 30 seconds max
  let jobCompleted = false;

  while (attempts < maxAttempts && !jobCompleted) {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second

    const statusResponse = await fetch(
      `${PRODUCTION_URL}/api/ai/score-referrals?jobId=${scoringResult.jobId}`
    );

    if (statusResponse.ok) {
      const status = await statusResponse.json();

      if (status.status === 'completed') {
        jobCompleted = true;
        console.log('✅ Job completed successfully!');
        console.log('   Scored:', status.output?.scored || 0, 'customers');
        console.log('   Failed:', status.output?.failed || 0, 'customers');
      } else if (status.status === 'failed') {
        console.error('❌ Job failed:', status.error);
        process.exit(1);
      } else {
        process.stdout.write('.');
      }
    }

    attempts++;
  }

  if (!jobCompleted) {
    console.log('\n⚠️  Job is still processing (taking longer than expected)');
    console.log('💡 Check job status later with:');
    console.log(`   curl "${PRODUCTION_URL}/api/ai/score-referrals?jobId=${scoringResult.jobId}"`);
    return;
  }

  // Step 5: Verify scores in database
  console.log('\n🔍 Step 5: Verifying scores in database...');

  const scoredCustomersResponse = await fetch(
    `${supabaseUrl}/rest/v1/customers?select=name,email,ai_referral_score,ai_estimated_value,ai_optimal_approach&business_id=eq.${testBusiness.id}&ai_referral_score=not.is.null&order=ai_referral_score.desc&limit=5`,
    {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
      },
    }
  );

  const scoredCustomers = await scoredCustomersResponse.json();

  if (scoredCustomers.length > 0) {
    console.log('✅ Found scored customers in database!');
    console.log('\n📊 Top Referrers:');
    console.log('─'.repeat(60));

    scoredCustomers.forEach((customer, i) => {
      console.log(`\n${i + 1}. ${customer.name || 'Unnamed Customer'}`);
      console.log(`   Email: ${customer.email || 'N/A'}`);
      console.log(`   Score: ${customer.ai_referral_score}/100`);
      console.log(`   Estimated Value: $${customer.ai_estimated_value || 0}`);
      console.log(`   Approach: ${customer.ai_optimal_approach || 'N/A'}`);
    });
  } else {
    console.log('⚠️  No scored customers found yet');
    console.log('💡 This might mean the scoring is still in progress');
  }

  // Success summary
  console.log('\n' + '─'.repeat(60));
  console.log('🎉 AI SCORING SYSTEM TEST COMPLETE!\n');
  console.log('Next Steps:');
  console.log('1. Check Anthropic Console for API usage:');
  console.log('   https://console.anthropic.com/settings/billing');
  console.log('2. View all scores in Supabase Dashboard:');
  console.log('   https://supabase.com/dashboard/project/ovpsgbstrdahrdcllswa/editor');
  console.log('3. Monitor job queue:');
  console.log('   SELECT * FROM ai_scoring_jobs ORDER BY created_at DESC;');
  console.log('─'.repeat(60));
}

// Run the test
testAIScoring().catch(error => {
  console.error('\n❌ Test failed with error:', error.message);
  process.exit(1);
});
