import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { resolve } from 'path';

config({ path: resolve(process.cwd(), '.env.local') });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

console.log('🔍 Checking Production Database Tables...\n');

async function checkTable(tableName) {
  try {
    const { data, error, count } = await supabase
      .from(tableName)
      .select('*', { count: 'exact', head: true });

    if (error) {
      if (error.code === '42P01') {
        console.log(`❌ ${tableName}: TABLE DOES NOT EXIST`);
        return false;
      }
      console.log(`⚠️  ${tableName}: Error - ${error.message}`);
      return false;
    }
    console.log(`✅ ${tableName}: EXISTS (${count ?? 0} rows)`);
    return true;
  } catch (err) {
    console.log(`❌ ${tableName}: Exception - ${err.message}`);
    return false;
  }
}

// Check all critical tables
const tables = [
  'businesses',
  'customers',
  'campaigns',
  'referrals',
  'audit_logs',
  'service_provider_types',
  'partner_tiers',
  'partner_agreements',
  'partner_compliance_status',
  'admin_roles'
];

let allExist = true;
for (const table of tables) {
  const exists = await checkTable(table);
  if (!exists) allExist = false;
}

console.log('\n' + '='.repeat(50));
if (allExist) {
  console.log('✅ All tables exist!');
} else {
  console.log('❌ Some tables are missing - migrations not fully applied');
}

// Check if businesses table has new compliance columns
console.log('\n🔍 Checking businesses table columns...');
try {
  const { data, error } = await supabase
    .from('businesses')
    .select('id, service_provider_type, regulated_industry')
    .limit(1);

  if (error) {
    if (error.message?.includes('does not exist')) {
      console.log('❌ Compliance columns NOT added to businesses table');
    } else {
      console.log(`⚠️  Error checking columns: ${error.message}`);
    }
  } else {
    console.log('✅ Compliance columns exist on businesses table');
  }
} catch (err) {
  console.log(`❌ Exception checking columns: ${err.message}`);
}

console.log('\n' + '='.repeat(50));
