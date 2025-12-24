/**
 * Automated QA Test Script for Refer Labs Dashboard
 *
 * This script performs automated checks on critical code paths
 * Run with: npx tsx qa-test.ts
 */

import fs from 'fs'
import path from 'path'
import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'
import type { Database } from './src/types/supabase'

// Load environment variables from .env.local
config({ path: path.join(process.cwd(), '.env.local') })

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

interface TestResult {
  name: string
  status: 'PASS' | 'FAIL' | 'SKIP'
  message?: string
  error?: unknown
}

const results: TestResult[] = []

function log(test: TestResult) {
  results.push(test)
  const icon = test.status === 'PASS' ? '✅' : test.status === 'FAIL' ? '❌' : '⏭️'
  console.log(`${icon} ${test.name}: ${test.status}`)
  if (test.message) console.log(`   ${test.message}`)
  if (test.error) console.log(`   Error:`, test.error)
}

async function testDatabaseConnectivity() {
  try {
    const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY)
    const { error } = await supabase.from('businesses').select('count').limit(1)

    if (error) {
      log({
        name: 'Database Connectivity',
        status: 'FAIL',
        message: 'Could not connect to Supabase',
        error
      })
    } else {
      log({
        name: 'Database Connectivity',
        status: 'PASS',
        message: 'Successfully connected to Supabase'
      })
    }
  } catch (error) {
    log({
      name: 'Database Connectivity',
      status: 'FAIL',
      message: 'Exception during database test',
      error
    })
  }
}

async function testRLSPolicies() {
  try {
    const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY)

    // Try to access businesses without auth (should fail or return empty)
    const { data } = await supabase.from('businesses').select('*')

    if (data && data.length > 0) {
      log({
        name: 'RLS Policy Check',
        status: 'FAIL',
        message: 'RLS may not be properly configured - unauthenticated access returned data'
      })
    } else {
      log({
        name: 'RLS Policy Check',
        status: 'PASS',
        message: 'RLS properly blocks unauthenticated access'
      })
    }
  } catch (error) {
    log({
      name: 'RLS Policy Check',
      status: 'FAIL',
      message: 'Exception during RLS test',
      error
    })
  }
}

async function testTableStructure() {
  try {
    const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY)

    const tables = [
      'businesses',
      'customers',
      'campaigns',
      'campaign_messages',
      'referrals',
      'referral_events',
      'stripe_payments',
      'stripe_commissions'
    ]

    let allTablesExist = true

    for (const table of tables) {
      const tableName = table as keyof Database['public']['Tables']
      const { error } = await supabase.from(tableName).select('count').limit(1)
      if (error && error.code === '42P01') {
        log({
          name: `Table Existence: ${table}`,
          status: 'FAIL',
          message: `Table ${table} does not exist`
        })
        allTablesExist = false
      }
    }

    if (allTablesExist) {
      log({
        name: 'Table Structure',
        status: 'PASS',
        message: 'All required tables exist'
      })
    }
  } catch (error) {
    log({
      name: 'Table Structure',
      status: 'FAIL',
      message: 'Exception during table structure test',
      error
    })
  }
}

async function testEnvironmentVariables() {
  const requiredVars = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'SUPABASE_SERVICE_ROLE_KEY',
    'NEXT_PUBLIC_SITE_URL',
    'ADMIN_REFERRAL_CODE'
  ]

  const missing: string[] = []

  for (const varName of requiredVars) {
    if (!process.env[varName]) {
      missing.push(varName)
    }
  }

  if (missing.length > 0) {
    log({
      name: 'Environment Variables',
      status: 'FAIL',
      message: `Missing required env vars: ${missing.join(', ')}`
    })
  } else {
    log({
      name: 'Environment Variables',
      status: 'PASS',
      message: 'All required environment variables present'
    })
  }
}

async function testBuildOutput() {
  const buildDir = path.join(process.cwd(), '.next')

  if (!fs.existsSync(buildDir)) {
    log({
      name: 'Build Output',
      status: 'FAIL',
      message: 'Build directory (.next) not found. Run npm run build first.'
    })
    return
  }

  log({
    name: 'Build Output',
    status: 'PASS',
    message: 'Build directory exists'
  })
}

async function runAllTests() {
  console.log('\n🧪 Starting Automated QA Tests...\n')

  await testEnvironmentVariables()
  await testBuildOutput()
  await testDatabaseConnectivity()
  await testRLSPolicies()
  await testTableStructure()

  console.log('\n📊 Test Summary:\n')
  const passed = results.filter(r => r.status === 'PASS').length
  const failed = results.filter(r => r.status === 'FAIL').length
  const skipped = results.filter(r => r.status === 'SKIP').length

  console.log(`✅ Passed: ${passed}`)
  console.log(`❌ Failed: ${failed}`)
  console.log(`⏭️  Skipped: ${skipped}`)
  console.log(`📝 Total: ${results.length}`)

  if (failed > 0) {
    console.log('\n⚠️  Some tests failed. Review the output above.')
    process.exit(1)
  } else {
    console.log('\n✨ All automated tests passed!')
    console.log('📋 Next: Perform manual testing using QA_CHECKLIST.md')
    process.exit(0)
  }
}

runAllTests()
