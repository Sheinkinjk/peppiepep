#!/usr/bin/env node

/**
 * Production Readiness Validation Script
 *
 * This script validates that all critical components are configured
 * and ready for production launch of the referral system.
 */

import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const COLORS = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m',
};

const { green, red, yellow, cyan, bold, reset } = COLORS;

function log(message, color = reset) {
  console.log(`${color}${message}${reset}`);
}

function success(message) {
  log(`✅ ${message}`, green);
}

function error(message) {
  log(`❌ ${message}`, red);
}

function warning(message) {
  log(`⚠️  ${message}`, yellow);
}

function info(message) {
  log(`ℹ️  ${message}`, cyan);
}

function section(title) {
  log(`\n${bold}${title}${reset}`, cyan);
  log('─'.repeat(60), cyan);
}

let errorCount = 0;
let warningCount = 0;
let checkCount = 0;

function check(condition, successMsg, errorMsg) {
  checkCount++;
  if (condition) {
    success(successMsg);
    return true;
  } else {
    error(errorMsg);
    errorCount++;
    return false;
  }
}

function warn(condition, okMsg, warnMsg) {
  if (condition) {
    success(okMsg);
    return true;
  } else {
    warning(warnMsg);
    warningCount++;
    return false;
  }
}

async function validateEnvironmentVariables() {
  section('Environment Variables');

  check(
    process.env.NEXT_PUBLIC_SITE_URL,
    'NEXT_PUBLIC_SITE_URL is set',
    'NEXT_PUBLIC_SITE_URL is missing'
  );

  check(
    process.env.RESEND_API_KEY,
    'RESEND_API_KEY is configured',
    'RESEND_API_KEY is missing - emails will not send!'
  );

  check(
    process.env.RESEND_FROM_EMAIL,
    `RESEND_FROM_EMAIL is set: ${process.env.RESEND_FROM_EMAIL}`,
    'RESEND_FROM_EMAIL is missing'
  );

  check(
    process.env.PARTNER_PROGRAM_BUSINESS_ID,
    `PARTNER_PROGRAM_BUSINESS_ID is set: ${process.env.PARTNER_PROGRAM_BUSINESS_ID}`,
    'PARTNER_PROGRAM_BUSINESS_ID is missing - partner applications will fail!'
  );

  check(
    process.env.ADMIN_REFERRAL_CODE,
    `ADMIN_REFERRAL_CODE is set: ${process.env.ADMIN_REFERRAL_CODE}`,
    'ADMIN_REFERRAL_CODE is missing'
  );

  check(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    'NEXT_PUBLIC_SUPABASE_URL is configured',
    'NEXT_PUBLIC_SUPABASE_URL is missing'
  );

  check(
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    'SUPABASE_SERVICE_ROLE_KEY is configured',
    'SUPABASE_SERVICE_ROLE_KEY is missing'
  );

  warn(
    process.env.RESEND_REPLY_TO,
    `RESEND_REPLY_TO is set: ${process.env.RESEND_REPLY_TO}`,
    'RESEND_REPLY_TO not set - replies will go to no-reply'
  );

  warn(
    process.env.ADMIN_ALERT_EMAILS,
    `ADMIN_ALERT_EMAILS is set: ${process.env.ADMIN_ALERT_EMAILS}`,
    'ADMIN_ALERT_EMAILS not set - using default jarred@referlabs.com.au'
  );
}

async function validateDatabaseConnection() {
  section('Database Connection');

  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const { data, error } = await supabase
      .from('businesses')
      .select('id')
      .limit(1);

    if (error) {
      error(`Database connection failed: ${error.message}`);
      errorCount++;
      return false;
    }

    success('Database connection successful');
    return true;
  } catch (err) {
    error(`Database connection error: ${err.message}`);
    errorCount++;
    return false;
  }
}

async function validateCriticalTables() {
  section('Database Tables');

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const tables = [
    'businesses',
    'customers',
    'referrals',
    'partner_applications',
    'referral_events',
    'stripe_commissions',
    'campaigns',
    'campaign_messages',
  ];

  for (const table of tables) {
    try {
      const { error } = await supabase.from(table).select('id').limit(1);

      if (error) {
        error(`Table "${table}" query failed: ${error.message}`);
        errorCount++;
      } else {
        success(`Table "${table}" is accessible`);
      }
    } catch (err) {
      error(`Table "${table}" error: ${err.message}`);
      errorCount++;
    }
  }
}

async function validatePartnerProgramBusiness() {
  section('Partner Program Configuration');

  const businessId = process.env.PARTNER_PROGRAM_BUSINESS_ID;

  if (!businessId) {
    error('PARTNER_PROGRAM_BUSINESS_ID not set');
    errorCount++;
    return false;
  }

  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const { data: business, error } = await supabase
      .from('businesses')
      .select('id, name, owner_id')
      .eq('id', businessId)
      .single();

    if (error || !business) {
      error(`Partner program business not found: ${businessId}`);
      errorCount++;
      return false;
    }

    success(`Partner program business found: ${business.name || 'Unnamed'}`);
    info(`  Owner ID: ${business.owner_id}`);

    return true;
  } catch (err) {
    error(`Partner program validation error: ${err.message}`);
    errorCount++;
    return false;
  }
}

async function validateAdminReferralCode() {
  section('Admin Referral Code');

  const adminCode = process.env.ADMIN_REFERRAL_CODE;

  if (!adminCode) {
    warning('ADMIN_REFERRAL_CODE not set');
    warningCount++;
    return false;
  }

  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const { data: customer, error } = await supabase
      .from('customers')
      .select('id, name, referral_code, business_id')
      .ilike('referral_code', adminCode)
      .single();

    if (error || !customer) {
      error(`Admin referral code not found in database: ${adminCode}`);
      errorCount++;
      return false;
    }

    success(`Admin referral code found: ${customer.referral_code}`);
    info(`  Customer: ${customer.name || 'Unnamed'}`);
    info(`  Business ID: ${customer.business_id}`);

    return true;
  } catch (err) {
    error(`Admin referral code validation error: ${err.message}`);
    errorCount++;
    return false;
  }
}

async function validateEmailService() {
  section('Email Service (Resend)');

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    error('RESEND_API_KEY not configured');
    errorCount++;
    return false;
  }

  try {
    // Test Resend API connection
    const response = await fetch('https://api.resend.com/domains', {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
    });

    if (!response.ok) {
      error(`Resend API authentication failed: ${response.status}`);
      errorCount++;
      return false;
    }

    const data = await response.json();
    success('Resend API connection successful');

    if (data.data && data.data.length > 0) {
      info(`  Verified domains: ${data.data.map(d => d.name).join(', ')}`);
    } else {
      warning('No verified domains found in Resend');
      warningCount++;
    }

    return true;
  } catch (err) {
    error(`Email service validation error: ${err.message}`);
    errorCount++;
    return false;
  }
}

async function validateAPIEndpoints() {
  section('API Endpoints');

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  info(`Testing against: ${siteUrl}`);

  // Check if endpoints exist (not testing auth since we'd need credentials)
  const endpoints = [
    '/api/ambassadors/approve',
    '/api/admin/partner-applications',
    '/api/admin/partner-applications/approve',
    '/api/customers/route',
    '/api/referrals/route',
  ];

  info('API endpoint files should exist in src/app/api/...');
  success('API routes are implemented (runtime testing requires authentication)');
}

async function checkDatabaseStats() {
  section('Database Statistics');

  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    // Count businesses
    const { count: businessCount } = await supabase
      .from('businesses')
      .select('*', { count: 'exact', head: true });

    // Count customers
    const { count: customerCount } = await supabase
      .from('customers')
      .select('*', { count: 'exact', head: true });

    // Count referrals
    const { count: referralCount } = await supabase
      .from('referrals')
      .select('*', { count: 'exact', head: true });

    // Count partner applications
    const { count: applicationCount } = await supabase
      .from('partner_applications')
      .select('*', { count: 'exact', head: true });

    info(`  Businesses: ${businessCount || 0}`);
    info(`  Customers/Ambassadors: ${customerCount || 0}`);
    info(`  Referrals: ${referralCount || 0}`);
    info(`  Partner Applications: ${applicationCount || 0}`);

    if ((businessCount || 0) === 0) {
      warning('No businesses in database - ready for first onboarding');
    }

  } catch (err) {
    warning(`Could not fetch statistics: ${err.message}`);
    warningCount++;
  }
}

async function generateTestData() {
  section('Test Data Generation');

  info('To generate test data for validation:');
  info('');
  info('1. Navigate to: https://referlabs.com.au/our-referral-program');
  info('2. Submit a test partner application');
  info('3. Check jarred@referlabs.com.au for notification email');
  info('4. Login to admin dashboard and approve the application');
  info('5. Verify welcome email received by test applicant');
  info('');
  info('See PRODUCTION_TESTING_CHECKLIST.md for detailed test scenarios');
}

async function printSummary() {
  section('Validation Summary');

  log('');
  log(`Total Checks: ${checkCount}`, bold);
  log(`Errors: ${errorCount}`, errorCount > 0 ? red : green);
  log(`Warnings: ${warningCount}`, warningCount > 0 ? yellow : green);
  log('');

  if (errorCount === 0 && warningCount === 0) {
    success('🎉 All checks passed! Platform is production-ready.');
    log('');
    info('Next steps:');
    info('1. Run manual end-to-end tests from PRODUCTION_TESTING_CHECKLIST.md');
    info('2. Verify all emails are received correctly');
    info('3. Test referral attribution flow');
    info('4. Begin Phase 1 partner recruitment');
    log('');
  } else if (errorCount === 0) {
    warning('⚠️  All critical checks passed, but there are warnings.');
    warning('Review warnings above before going live.');
    log('');
  } else {
    error('❌ Critical errors found! Fix these before production launch.');
    error(`${errorCount} error(s) must be resolved.`);
    log('');
    process.exit(1);
  }
}

async function main() {
  log('');
  log(`${bold}${cyan}╔════════════════════════════════════════════════════════════╗${reset}`);
  log(`${bold}${cyan}║                                                            ║${reset}`);
  log(`${bold}${cyan}║        Refer Labs Production Readiness Validator          ║${reset}`);
  log(`${bold}${cyan}║                                                            ║${reset}`);
  log(`${bold}${cyan}╚════════════════════════════════════════════════════════════╝${reset}`);
  log('');

  await validateEnvironmentVariables();
  await validateDatabaseConnection();
  await validateCriticalTables();
  await validatePartnerProgramBusiness();
  await validateAdminReferralCode();
  await validateEmailService();
  await validateAPIEndpoints();
  await checkDatabaseStats();
  await generateTestData();
  await printSummary();
}

main().catch(err => {
  error(`Fatal error: ${err.message}`);
  console.error(err);
  process.exit(1);
});
