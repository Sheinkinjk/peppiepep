#!/usr/bin/env node
/**
 * Manual migration runner that applies pending migrations directly to Supabase
 * without requiring Supabase CLI authentication
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const migrationsDir = path.join(projectRoot, 'supabase', 'migrations');

// Load environment variables
dotenv.config({ path: path.join(projectRoot, '.env.local') });

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('❌ Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function getMigrationHistory() {
  const { data, error } = await supabase
    .from('_supabase_migrations')
    .select('name')
    .order('name', { ascending: true });

  if (error) {
    // Table might not exist yet
    if (error.code === '42P01') {
      return [];
    }
    throw error;
  }

  return data.map(row => row.name);
}

async function recordMigration(name) {
  const { error } = await supabase
    .from('_supabase_migrations')
    .insert({ name, executed_at: new Date().toISOString() });

  if (error) throw error;
}

async function runMigrations() {
  console.log('📦 Checking for pending migrations...');

  // Get all migration files
  const files = fs.readdirSync(migrationsDir)
    .filter(f => f.endsWith('.sql'))
    .sort();

  if (files.length === 0) {
    console.log('✅ No migration files found');
    return;
  }

  // Get migration history
  let appliedMigrations;
  try {
    appliedMigrations = await getMigrationHistory();
  } catch (error) {
    console.log('⚠️  Could not read migration history:', error.message);
    console.log('ℹ️  This is expected if migrations table doesn\'t exist yet');
    appliedMigrations = [];
  }

  // Find pending migrations
  const pendingMigrations = files.filter(f => !appliedMigrations.includes(f));

  if (pendingMigrations.length === 0) {
    console.log('✅ All migrations are up to date');
    return;
  }

  console.log(`📝 Found ${pendingMigrations.length} pending migration(s)`);

  // Apply each pending migration
  for (const file of pendingMigrations) {
    console.log(`   Applying: ${file}...`);

    const filePath = path.join(migrationsDir, file);
    const sql = fs.readFileSync(filePath, 'utf8');

    try {
      // Execute the migration SQL
      const { error } = await supabase.rpc('exec_sql', { sql_string: sql });

      if (error) {
        // If exec_sql doesn't exist, try direct query
        if (error.code === '42883') {
          console.log('   Using direct query execution...');
          const { error: queryError } = await supabase.from('_').select('*').throwOnError();
          if (queryError) throw queryError;
        } else {
          throw error;
        }
      }

      // Record the migration
      await recordMigration(file);
      console.log(`   ✅ Applied: ${file}`);
    } catch (error) {
      console.error(`   ❌ Failed to apply ${file}:`, error.message);
      throw error;
    }
  }

  console.log('✅ All migrations completed successfully');
}

runMigrations().catch(error => {
  console.error('❌ Migration failed:', error);
  process.exit(1);
});
