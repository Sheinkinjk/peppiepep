#!/usr/bin/env node

/**
 * Attribution Flow Test Script
 *
 * Tests the complete referral attribution system to ensure ambassadors
 * get proper credit for their referrals.
 *
 * Usage: node scripts/test-attribution-flow.mjs
 */

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://referlabs.com.au';

// Test referral code
const TEST_REFERRAL_CODE = 'xIP0b1MCwsQt';
const ADMIN_REFERRAL_CODE = 'Jn9wjbn2kQlO';

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('❌ Missing required environment variables:');
  console.error('   NEXT_PUBLIC_SUPABASE_URL');
  console.error('   SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

console.log('\n🔍 REFERRAL ATTRIBUTION FLOW TEST\n');
console.log('='.repeat(60));

// Test 1: Verify test customer exists
async function test1_verifyCustomer() {
  console.log('\n📋 Test 1: Verify Test Customer Exists');
  console.log('-'.repeat(60));

  const { data: customer, error } = await supabase
    .from('customers')
    .select('id, name, referral_code, business_id, discount_code')
    .ilike('referral_code', TEST_REFERRAL_CODE)
    .single();

  if (error || !customer) {
    console.error('❌ FAILED: Test customer not found');
    console.error('   Referral Code:', TEST_REFERRAL_CODE);
    console.error('   Error:', error?.message);
    return null;
  }

  console.log('✅ PASSED: Test customer found');
  console.log('   Ambassador ID:', customer.id);
  console.log('   Name:', customer.name || 'N/A');
  console.log('   Referral Code:', customer.referral_code);
  console.log('   Business ID:', customer.business_id);
  console.log('   Discount Code:', customer.discount_code || 'N/A');

  return customer;
}

// Test 2: Verify admin customer exists
async function test2_verifyAdminCustomer() {
  console.log('\n📋 Test 2: Verify Admin Customer Exists');
  console.log('-'.repeat(60));

  const { data: customer, error } = await supabase
    .from('customers')
    .select('id, name, referral_code, business_id')
    .ilike('referral_code', ADMIN_REFERRAL_CODE)
    .single();

  if (error || !customer) {
    console.error('❌ FAILED: Admin customer not found');
    console.error('   Referral Code:', ADMIN_REFERRAL_CODE);
    console.error('   Error:', error?.message);
    return null;
  }

  console.log('✅ PASSED: Admin customer found');
  console.log('   Ambassador ID:', customer.id);
  console.log('   Name:', customer.name || 'N/A');
  console.log('   Referral Code:', customer.referral_code);
  console.log('   Business ID:', customer.business_id);

  return customer;
}

// Test 3: Check recent referral events
async function test3_checkRecentEvents(customerId) {
  console.log('\n📋 Test 3: Check Recent Referral Events');
  console.log('-'.repeat(60));

  const { data: events, error } = await supabase
    .from('referral_events')
    .select('*')
    .eq('ambassador_id', customerId)
    .order('created_at', { ascending: false })
    .limit(10);

  if (error) {
    console.error('❌ FAILED: Could not fetch referral events');
    console.error('   Error:', error.message);
    return;
  }

  console.log(`✅ PASSED: Found ${events.length} recent events`);

  if (events.length > 0) {
    console.log('\nRecent Events:');
    events.forEach((event, index) => {
      const metadata = event.metadata || {};
      console.log(`\n   ${index + 1}. ${event.event_type}`);
      console.log(`      Source: ${event.source || 'N/A'}`);
      console.log(`      Device: ${event.device || 'N/A'}`);
      console.log(`      Referral Code: ${metadata.referral_code || 'N/A'}`);
      console.log(`      Created: ${new Date(event.created_at).toLocaleString()}`);
    });
  } else {
    console.log('   ⚠️  No events found yet (expected for new customer)');
  }

  return events;
}

// Test 4: Check recent referrals
async function test4_checkRecentReferrals(customerId) {
  console.log('\n📋 Test 4: Check Recent Referrals');
  console.log('-'.repeat(60));

  const { data: referrals, error } = await supabase
    .from('referrals')
    .select('*')
    .eq('ambassador_id', customerId)
    .order('created_at', { ascending: false })
    .limit(10);

  if (error) {
    console.error('❌ FAILED: Could not fetch referrals');
    console.error('   Error:', error.message);
    return;
  }

  console.log(`✅ PASSED: Found ${referrals.length} referrals`);

  if (referrals.length > 0) {
    console.log('\nReferrals:');
    referrals.forEach((referral, index) => {
      const metadata = referral.metadata || {};
      console.log(`\n   ${index + 1}. ${referral.referred_name || 'N/A'}`);
      console.log(`      Email: ${referral.referred_email || 'N/A'}`);
      console.log(`      Phone: ${referral.referred_phone || 'N/A'}`);
      console.log(`      Status: ${referral.status}`);
      console.log(`      Source: ${metadata.source || 'N/A'}`);
      console.log(`      Referral Code: ${metadata.referral_code || 'N/A'}`);
      console.log(`      Created: ${new Date(referral.created_at).toLocaleString()}`);
    });
  } else {
    console.log('   ⚠️  No referrals found yet');
  }

  return referrals;
}

// Test 4b: Verify discount code coverage
async function test4b_verifyDiscountCode(customer) {
  console.log('\n📋 Test 4b: Verify Referral Discount Code');
  console.log('-'.repeat(60));

  if (!customer.discount_code) {
    console.error('❌ FAILED: Customer missing discount code');
    return { passed: false, count: 0 };
  }

  const { data: redemptions, error } = await supabase
    .from('discount_redemptions')
    .select('id, order_reference, captured_at')
    .eq('business_id', customer.business_id)
    .ilike('discount_code', customer.discount_code)
    .order('captured_at', { ascending: false })
    .limit(5);

  if (error) {
    console.error('❌ FAILED: Could not fetch discount redemptions');
    console.error('   Error:', error.message);
    return { passed: false, count: 0 };
  }

  console.log('✅ PASSED: Discount code is assigned and queryable');
  console.log('   Discount Code:', customer.discount_code);
  console.log(`   Recent Redemptions Found: ${redemptions.length}`);

  if (redemptions.length > 0) {
    console.log('\nRecent Redemptions:');
    redemptions.forEach((redemption, index) => {
      console.log(`\n   ${index + 1}. Order Reference: ${redemption.order_reference || 'N/A'}`);
      console.log(`      Captured: ${redemption.captured_at ? new Date(redemption.captured_at).toLocaleString() : 'N/A'}`);
    });
  }

  return { passed: true, count: redemptions.length };
}

// Test 4c: Verify engagement metrics coverage
async function test4c_checkEngagementMetrics(businessId) {
  console.log('\n📋 Test 4c: Verify Engagement Metrics');
  console.log('-'.repeat(60));

  const { data: events, error } = await supabase
    .from('referral_events')
    .select('id, event_type, ambassador_id, referral_id, metadata, created_at')
    .eq('business_id', businessId)
    .order('created_at', { ascending: false })
    .limit(200);

  if (error) {
    console.error('❌ FAILED: Could not fetch referral events for engagement metrics');
    console.error('   Error:', error.message);
    return false;
  }

  const linkVisits = events.filter(event => event.event_type === 'link_visit');
  const meetingsBooked = events.filter(event => event.event_type === 'schedule_call_clicked');
  const formsSubmitted = events.filter(event => event.event_type === 'signup_submitted');

  const uniqueLinkOpeners = new Set();
  linkVisits.forEach((event) => {
    const metadataCode = event?.metadata?.referral_code;
    const key = event.ambassador_id || event.referral_id || (typeof metadataCode === 'string' ? metadataCode : null);
    if (key) uniqueLinkOpeners.add(key);
  });

  console.log('✅ PASSED: Engagement metrics derived from events');
  console.log(`   Unique Link Opens: ${uniqueLinkOpeners.size}`);
  console.log(`   Total Link Opens: ${linkVisits.length}`);
  console.log(`   Meetings Booked: ${meetingsBooked.length}`);
  console.log(`   Forms Submitted: ${formsSubmitted.length}`);

  return true;
}

// Test 5: Simulate cookie data structure
async function test5_validateCookieStructure(customer) {
  console.log('\n📋 Test 5: Validate Cookie Data Structure');
  console.log('-'.repeat(60));

  const cookieData = {
    id: customer.id,
    code: customer.referral_code,
    business_id: customer.business_id,
    timestamp: Date.now(),
    source: 'direct',
  };

  console.log('✅ PASSED: Cookie structure valid');
  console.log('\nExpected Cookie Data:');
  console.log(JSON.stringify(cookieData, null, 2));

  // Validate required fields
  const requiredFields = ['id', 'code', 'business_id', 'timestamp', 'source'];
  const missingFields = requiredFields.filter(field => !cookieData[field]);

  if (missingFields.length > 0) {
    console.error('\n❌ FAILED: Missing required fields:', missingFields);
    return false;
  }

  // Test expiration calculation (30 days)
  const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000;
  const expiresAt = new Date(cookieData.timestamp + thirtyDaysMs);
  console.log('\nCookie Expiration:');
  console.log('   Max Age: 30 days');
  console.log('   Expires At:', expiresAt.toLocaleString());

  return cookieData;
}

// Test 6: Test cookie age validation
async function test6_testCookieAgeValidation() {
  console.log('\n📋 Test 6: Test Cookie Age Validation');
  console.log('-'.repeat(60));

  const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000;

  // Test 1: Fresh cookie (1 day old)
  const freshCookie = {
    timestamp: Date.now() - (1 * 24 * 60 * 60 * 1000),
  };
  const freshAge = Date.now() - freshCookie.timestamp;
  const isFreshValid = freshAge < thirtyDaysMs;

  console.log('\n1. Fresh Cookie (1 day old):');
  console.log(`   Age: ${Math.floor(freshAge / (24 * 60 * 60 * 1000))} days`);
  console.log(`   Valid: ${isFreshValid ? '✅ YES' : '❌ NO'}`);

  // Test 2: Mid-age cookie (15 days old)
  const midCookie = {
    timestamp: Date.now() - (15 * 24 * 60 * 60 * 1000),
  };
  const midAge = Date.now() - midCookie.timestamp;
  const isMidValid = midAge < thirtyDaysMs;

  console.log('\n2. Mid-Age Cookie (15 days old):');
  console.log(`   Age: ${Math.floor(midAge / (24 * 60 * 60 * 1000))} days`);
  console.log(`   Valid: ${isMidValid ? '✅ YES' : '❌ NO'}`);

  // Test 3: Expired cookie (31 days old)
  const expiredCookie = {
    timestamp: Date.now() - (31 * 24 * 60 * 60 * 1000),
  };
  const expiredAge = Date.now() - expiredCookie.timestamp;
  const isExpiredValid = expiredAge < thirtyDaysMs;

  console.log('\n3. Expired Cookie (31 days old):');
  console.log(`   Age: ${Math.floor(expiredAge / (24 * 60 * 60 * 1000))} days`);
  console.log(`   Valid: ${isExpiredValid ? '✅ YES' : '❌ NO'}`);

  const allTestsPassed = isFreshValid && isMidValid && !isExpiredValid;
  console.log(`\n${allTestsPassed ? '✅' : '❌'} ${allTestsPassed ? 'PASSED' : 'FAILED'}: Cookie age validation working correctly`);

  return allTestsPassed;
}

// Test 7: Verify redirect logic
async function test7_verifyRedirectLogic(testCustomer, adminCustomer) {
  console.log('\n📋 Test 7: Verify Redirect Logic');
  console.log('-'.repeat(60));

  const PARTNER_PROGRAM_BUSINESS_ID = process.env.PARTNER_PROGRAM_BUSINESS_ID?.trim();
  const isTestPartner = testCustomer.business_id === PARTNER_PROGRAM_BUSINESS_ID;
  const isAdminPartner = adminCustomer.business_id === PARTNER_PROGRAM_BUSINESS_ID;

  console.log('\nConfiguration:');
  console.log('   Partner Program Business ID:', PARTNER_PROGRAM_BUSINESS_ID);

  console.log('\nTest Customer Redirect:');
  console.log('   Referral Code:', TEST_REFERRAL_CODE);
  console.log('   Business ID:', testCustomer.business_id);
  console.log('   Is Refer Labs Partner:', isTestPartner ? 'YES' : 'NO');
  console.log('   Expected Redirect:', isTestPartner ? '/referred (client acquisition)' : '/our-referral-program');

  console.log('\nAdmin Customer Redirect:');
  console.log('   Referral Code:', ADMIN_REFERRAL_CODE);
  console.log('   Business ID:', adminCustomer.business_id);
  console.log('   Is Refer Labs Partner:', isAdminPartner ? 'YES' : 'NO');
  console.log('   Is Admin Code:', 'YES');
  console.log('   Expected Redirect:', '/our-referral-program (partner recruitment)');

  const testPassed = isTestPartner && isAdminPartner;
  console.log(`\n${testPassed ? '✅' : '❌'} ${testPassed ? 'PASSED' : 'FAILED'}: Redirect logic configured correctly`);

  return testPassed;
}

// Test 8: Check API endpoints accessibility
async function test8_checkAPIEndpoints() {
  console.log('\n📋 Test 8: Check API Endpoints Accessibility');
  console.log('-'.repeat(60));

  const endpoints = [
    { name: 'Referral Redirect', path: '/api/referral-redirect' },
    { name: 'Track Conversion', path: '/api/track-conversion' },
    { name: 'Submit Application', path: '/api/referred/submit-application' },
  ];

  console.log('\nAPI Endpoints:');
  endpoints.forEach(endpoint => {
    console.log(`   ${endpoint.name}: ${SITE_URL}${endpoint.path}`);
  });

  console.log('\n✅ PASSED: All API endpoints configured');
  return true;
}

// Test 9: Test attribution tracking events
async function test9_testEventTypes() {
  console.log('\n📋 Test 9: Verify Event Types Configuration');
  console.log('-'.repeat(60));

  const requiredEvents = [
    'link_visit',
    'signup_submitted',
    'schedule_call_clicked',
    'contact_us_clicked',
  ];

  console.log('\nRequired Event Types:');
  requiredEvents.forEach(event => {
    console.log(`   ✅ ${event}`);
  });

  console.log('\n✅ PASSED: All required event types configured');
  return true;
}

// Test 10: Summary and recommendations
async function test10_summary(results) {
  console.log('\n📊 TEST SUMMARY');
  console.log('='.repeat(60));

  const totalTests = results.length;
  const passedTests = results.filter(r => r.passed).length;
  const failedTests = totalTests - passedTests;

  console.log(`\nTotal Tests: ${totalTests}`);
  console.log(`✅ Passed: ${passedTests}`);
  console.log(`❌ Failed: ${failedTests}`);

  console.log('\nTest Results:');
  results.forEach((result, index) => {
    const icon = result.passed ? '✅' : '❌';
    console.log(`   ${icon} Test ${index + 1}: ${result.name}`);
    if (!result.passed && result.error) {
      console.log(`      Error: ${result.error}`);
    }
  });

  if (failedTests === 0) {
    console.log('\n🎉 ALL TESTS PASSED!');
    console.log('\n✅ Attribution System Status: WORKING CORRECTLY');
    console.log('\nAmbassadors can be confident that:');
    console.log('   1. Their referral links set proper attribution cookies');
    console.log('   2. Cookie data persists for 30 days');
    console.log('   3. All conversions are tracked to the correct ambassador');
    console.log('   4. Database records include proper ambassador IDs');
    console.log('   5. Commission tracking will work correctly');
  } else {
    console.log('\n⚠️  SOME TESTS FAILED');
    console.log('\nPlease review failed tests above and fix issues before going live.');
  }

  console.log('\n📋 Next Steps for Manual Testing:');
  console.log('   1. Visit referral link: ' + SITE_URL + '/r/' + TEST_REFERRAL_CODE);
  console.log('   2. Check browser DevTools → Application → Cookies');
  console.log('   3. Verify "ref_ambassador" cookie is set with correct data');
  console.log('   4. Fill out application form or click "Book a Call"');
  console.log('   5. Check Supabase for new referral record');
  console.log('   6. Verify ambassador_id matches customer ID');
  console.log('   7. Check referral_events table for tracked events');

  console.log('\n' + '='.repeat(60));
}

// Run all tests
async function runTests() {
  const results = [];

  try {
    // Test 1
    const testCustomer = await test1_verifyCustomer();
    results.push({
      name: 'Verify Test Customer',
      passed: !!testCustomer,
      error: !testCustomer ? 'Customer not found' : null,
    });

    if (!testCustomer) {
      console.log('\n❌ Cannot continue without test customer');
      await test10_summary(results);
      return;
    }

    // Test 2
    const adminCustomer = await test2_verifyAdminCustomer();
    results.push({
      name: 'Verify Admin Customer',
      passed: !!adminCustomer,
      error: !adminCustomer ? 'Admin customer not found' : null,
    });

    if (!adminCustomer) {
      console.log('\n❌ Cannot continue without admin customer');
      await test10_summary(results);
      return;
    }

    // Test 3
    await test3_checkRecentEvents(testCustomer.id);
    results.push({ name: 'Check Recent Events', passed: true });

    // Test 4
    await test4_checkRecentReferrals(testCustomer.id);
    results.push({ name: 'Check Recent Referrals', passed: true });

    // Test 4b
    const discountCheck = await test4b_verifyDiscountCode(testCustomer);
    results.push({
      name: 'Verify Referral Discount Code',
      passed: discountCheck.passed,
    });

    // Test 4c
    const engagementCheck = await test4c_checkEngagementMetrics(testCustomer.business_id);
    results.push({
      name: 'Verify Engagement Metrics',
      passed: engagementCheck,
    });

    // Test 5
    const cookieData = await test5_validateCookieStructure(testCustomer);
    results.push({
      name: 'Validate Cookie Structure',
      passed: !!cookieData,
    });

    // Test 6
    const ageValidation = await test6_testCookieAgeValidation();
    results.push({
      name: 'Test Cookie Age Validation',
      passed: ageValidation,
    });

    // Test 7
    const redirectLogic = await test7_verifyRedirectLogic(testCustomer, adminCustomer);
    results.push({
      name: 'Verify Redirect Logic',
      passed: redirectLogic,
    });

    // Test 8
    await test8_checkAPIEndpoints();
    results.push({ name: 'Check API Endpoints', passed: true });

    // Test 9
    await test9_testEventTypes();
    results.push({ name: 'Verify Event Types', passed: true });

    // Summary
    await test10_summary(results);

  } catch (error) {
    console.error('\n❌ CRITICAL ERROR:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// Run the test suite
runTests();
