// Test script to check what's failing in the dashboard
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables
config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('🔍 Testing Dashboard Dependencies\n');
console.log('Environment Variables:');
console.log(`  SUPABASE_URL: ${supabaseUrl ? '✓ Set' : '✗ Missing'}`);
console.log(`  ANON_KEY: ${supabaseAnonKey ? '✓ Set' : '✗ Missing'}`);
console.log(`  SERVICE_KEY: ${supabaseServiceKey ? '✓ Set' : '✗ Missing'}\n`);

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function testDashboardQueries() {
  console.log('Testing Critical Dashboard Queries:\n');

  // Test 1: Check audit_logs table exists
  console.log('1. Testing audit_logs table...');
  try {
    const { data, error } = await supabase
      .from('audit_logs')
      .select('count')
      .limit(1);

    if (error) {
      console.log(`   ❌ Error: ${error.message}`);
      console.log(`   Code: ${error.code}`);
    } else {
      console.log('   ✓ audit_logs table accessible');
    }
  } catch (err) {
    console.log(`   ❌ Exception: ${err.message}`);
  }

  // Test 2: Check businesses table
  console.log('\n2. Testing businesses table...');
  try {
    const { data, error } = await supabase
      .from('businesses')
      .select('id, name, owner_id')
      .limit(1);

    if (error) {
      console.log(`   ❌ Error: ${error.message}`);
    } else {
      console.log(`   ✓ businesses table accessible (${data?.length || 0} rows)`);
    }
  } catch (err) {
    console.log(`   ❌ Exception: ${err.message}`);
  }

  // Test 3: Check customers table
  console.log('\n3. Testing customers table...');
  try {
    const { data, error } = await supabase
      .from('customers')
      .select('id, name')
      .limit(1);

    if (error) {
      console.log(`   ❌ Error: ${error.message}`);
    } else {
      console.log(`   ✓ customers table accessible (${data?.length || 0} rows)`);
    }
  } catch (err) {
    console.log(`   ❌ Exception: ${err.message}`);
  }

  // Test 4: Check campaigns table
  console.log('\n4. Testing campaigns table...');
  try {
    const { data, error } = await supabase
      .from('campaigns')
      .select('id, name')
      .limit(1);

    if (error) {
      console.log(`   ❌ Error: ${error.message}`);
    } else {
      console.log(`   ✓ campaigns table accessible (${data?.length || 0} rows)`);
    }
  } catch (err) {
    console.log(`   ❌ Exception: ${err.message}`);
  }

  // Test 5: Check referrals table
  console.log('\n5. Testing referrals table...');
  try {
    const { data, error } = await supabase
      .from('referrals')
      .select('id')
      .limit(1);

    if (error) {
      console.log(`   ❌ Error: ${error.message}`);
    } else {
      console.log(`   ✓ referrals table accessible (${data?.length || 0} rows)`);
    }
  } catch (err) {
    console.log(`   ❌ Exception: ${err.message}`);
  }

  // Test 6: Check admin_roles table
  console.log('\n6. Testing admin_roles table...');
  try {
    const { data, error } = await supabase
      .from('admin_roles')
      .select('id, email')
      .limit(1);

    if (error) {
      console.log(`   ❌ Error: ${error.message}`);
    } else {
      console.log(`   ✓ admin_roles table accessible (${data?.length || 0} rows)`);
    }
  } catch (err) {
    console.log(`   ❌ Exception: ${err.message}`);
  }

  // Test 7: Try inserting an audit log
  console.log('\n7. Testing audit log insert...');
  try {
    const { error } = await supabase
      .from('audit_logs')
      .insert({
        action: 'admin_action',
        metadata: { test: true, purpose: 'dashboard_test' },
        ip_address: '127.0.0.1',
        user_agent: 'test-script',
      });

    if (error) {
      console.log(`   ❌ Error: ${error.message}`);
      console.log(`   Code: ${error.code}`);
    } else {
      console.log('   ✓ audit log insert successful');
    }
  } catch (err) {
    console.log(`   ❌ Exception: ${err.message}`);
  }

  console.log('\n✅ Test complete\n');
}

testDashboardQueries().catch(console.error);
