# AI Implementation Testing Checklist
**Pre-Deployment Validation - Complete Before Going Live**

---

## ⚠️ CRITICAL: API Key Required

**Before running ANY tests, add this to `.env.local`:**

```bash
ANTHROPIC_API_KEY=sk-ant-api03-your-key-here
```

Get your API key from: https://console.anthropic.com/settings/keys

**Without this key, AI scoring will fallback to neutral scores (score=50).**

---

## Test Phase 1: Database Migration ✅

### Test 1.1: Run Migration
```bash
# Option A: Using Supabase CLI
npx supabase db push

# Option B: Manual (if CLI fails)
# 1. Go to Supabase Dashboard → SQL Editor
# 2. Open: supabase/migrations/20260112000000_ai_scoring_system.sql
# 3. Copy all contents
# 4. Paste into SQL Editor
# 5. Click "Run"
```

**Expected Result:**
- ✅ All tables created successfully
- ✅ No errors in console
- ✅ Green success message

### Test 1.2: Verify Tables Exist
```sql
-- Run in Supabase SQL Editor:
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_name LIKE 'ai_%'
ORDER BY table_name;
```

**Expected Result:**
```
ai_campaign_variations
ai_health_alerts
ai_predictions
ai_revenue_attribution
ai_scoring_jobs
```

### Test 1.3: Verify Customer Columns Added
```sql
-- Check that new AI columns exist on customers table:
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'customers'
  AND column_name LIKE 'ai_%'
ORDER BY column_name;
```

**Expected Result:**
```
ai_best_contact_time     | timestamp with time zone
ai_estimated_value       | numeric
ai_likelihood_to_refer   | numeric
ai_optimal_approach      | text
ai_referral_score        | integer
ai_score_explanation     | text
ai_score_version         | character varying
ai_scored_at            | timestamp with time zone
```

### Test 1.4: Verify View Created
```sql
-- Check AI insights dashboard view exists:
SELECT * FROM ai_insights_dashboard LIMIT 1;
```

**Expected Result:**
- ✅ Query runs without error
- ✅ Returns column headers even if no data

---

## Test Phase 2: TypeScript Build ✅

### Test 2.1: Clean Build
```bash
# Remove old build artifacts
rm -rf .next

# Fresh build
npm run build
```

**Expected Result:**
- ✅ Build completes successfully
- ✅ No TypeScript errors
- ✅ No module not found errors
- ✅ "Compiled successfully" message

**If build fails:**
1. Check that `@anthropic-ai/sdk` is installed: `npm list @anthropic-ai/sdk`
2. If not: `npm install @anthropic-ai/sdk`
3. Rebuild: `npm run build`

### Test 2.2: Start Dev Server
```bash
npm run dev
```

**Expected Result:**
- ✅ Server starts on http://localhost:3000
- ✅ No console errors
- ✅ Homepage loads correctly

---

## Test Phase 3: AI Scoring Engine (Mock Data)

### Test 3.1: Create Test Customer

First, get a business ID from your database:
```sql
SELECT id, name FROM businesses LIMIT 1;
```

Then create a test customer:
```sql
INSERT INTO customers (
  business_id,
  name,
  company,
  email,
  linkedin_handle,
  audience_profile,
  notes
) VALUES (
  'YOUR_BUSINESS_ID_HERE',
  'Test User - Sarah Chen',
  'TechCorp Solutions',
  'sarah.chen@techcorp.com',
  'sarahchen',
  '5,000+ LinkedIn followers, active in SaaS community',
  'Loves our product, frequently posts about referral marketing. Very engaged.'
)
RETURNING id, name;
```

**Save the returned customer ID** for next tests.

### Test 3.2: Test Scoring API (Single Customer)

**Important:** Make sure `ANTHROPIC_API_KEY` is in `.env.local` first!

```bash
# Replace YOUR_BUSINESS_ID with actual ID from Test 3.1
curl -X POST http://localhost:3000/api/ai/score-referrals \
  -H "Content-Type: application/json" \
  -d '{
    "businessId": "YOUR_BUSINESS_ID"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "jobId": "abc-123-def-456",
  "message": "Scoring job queued. All unscored customers will be analyzed."
}
```

**If you get an error:**
- Check that API key is set correctly
- Check that dev server is running
- Check that business ID exists

### Test 3.3: Check Job Status

```bash
# Use the jobId from previous response
curl "http://localhost:3000/api/ai/score-referrals?jobId=abc-123-def-456"
```

**Expected Response (while processing):**
```json
{
  "jobId": "abc-123-def-456",
  "status": "processing",
  "startedAt": "2026-01-12T10:30:00Z",
  "completedAt": null,
  "output": null,
  "error": null
}
```

**Expected Response (completed):**
```json
{
  "jobId": "abc-123-def-456",
  "status": "completed",
  "startedAt": "2026-01-12T10:30:00Z",
  "completedAt": "2026-01-12T10:30:05Z",
  "output": {
    "scored": 1,
    "failed": 0,
    "completedAt": "2026-01-12T10:30:05Z"
  },
  "error": null
}
```

### Test 3.4: Verify Score Saved to Database

```sql
SELECT
  name,
  company,
  ai_referral_score,
  ai_score_explanation,
  ai_estimated_value,
  ai_likelihood_to_refer,
  ai_optimal_approach,
  ai_scored_at
FROM customers
WHERE name LIKE '%Sarah Chen%'
  AND ai_referral_score IS NOT NULL;
```

**Expected Result:**
```
name: Test User - Sarah Chen
company: TechCorp Solutions
ai_referral_score: 75-90 (should be high due to good profile)
ai_score_explanation: "Sarah has a strong professional network..."
ai_estimated_value: $2000-$10000 (varies based on business context)
ai_likelihood_to_refer: 0.70-0.90
ai_optimal_approach: "Reach out with..."
ai_scored_at: <recent timestamp>
```

**Quality Checks:**
- ✅ Score is between 0-100
- ✅ Explanation is human-readable (not JSON or error message)
- ✅ Estimated value is reasonable (not 0, not millions)
- ✅ Likelihood is between 0-1
- ✅ Optimal approach is actionable advice

---

## Test Phase 4: Error Handling

### Test 4.1: Test Without API Key

```bash
# Temporarily rename .env.local
mv .env.local .env.local.backup

# Restart dev server
npm run dev

# Try scoring (in new terminal)
curl -X POST http://localhost:3000/api/ai/score-referrals \
  -H "Content-Type: application/json" \
  -d '{
    "businessId": "YOUR_BUSINESS_ID"
  }'

# Restore .env.local
mv .env.local.backup .env.local
```

**Expected Result:**
- ✅ API returns success (doesn't crash)
- ✅ Job is created
- ✅ Customer gets fallback score of 50
- ✅ Error is logged but user workflow continues

**Verify fallback:**
```sql
SELECT name, ai_referral_score, ai_score_explanation
FROM customers
WHERE ai_referral_score = 50
  AND ai_score_explanation LIKE '%default%';
```

### Test 4.2: Test Invalid Business ID

```bash
curl -X POST http://localhost:3000/api/ai/score-referrals \
  -H "Content-Type: application/json" \
  -d '{
    "businessId": "invalid-uuid-12345"
  }'
```

**Expected Result:**
```json
{
  "error": "Business not found"
}
```
Status code: 404

### Test 4.3: Test Missing Business ID

```bash
curl -X POST http://localhost:3000/api/ai/score-referrals \
  -H "Content-Type: application/json" \
  -d '{}'
```

**Expected Result:**
```json
{
  "error": "businessId is required"
}
```
Status code: 400

### Test 4.4: Test Malformed JSON

```bash
curl -X POST http://localhost:3000/api/ai/score-referrals \
  -H "Content-Type: application/json" \
  -d '{invalid json'
```

**Expected Result:**
```json
{
  "error": "Internal server error"
}
```
Status code: 500

---

## Test Phase 5: Batch Processing

### Test 5.1: Create Multiple Test Customers

```sql
INSERT INTO customers (business_id, name, company, email)
VALUES
  ('YOUR_BUSINESS_ID', 'Test User 1', 'Company A', 'user1@test.com'),
  ('YOUR_BUSINESS_ID', 'Test User 2', 'Company B', 'user2@test.com'),
  ('YOUR_BUSINESS_ID', 'Test User 3', 'Company C', 'user3@test.com'),
  ('YOUR_BUSINESS_ID', 'Test User 4', 'Company D', 'user4@test.com'),
  ('YOUR_BUSINESS_ID', 'Test User 5', 'Company E', 'user5@test.com'),
  ('YOUR_BUSINESS_ID', 'Test User 6', 'Company F', 'user6@test.com'),
  ('YOUR_BUSINESS_ID', 'Test User 7', 'Company G', 'user7@test.com'),
  ('YOUR_BUSINESS_ID', 'Test User 8', 'Company H', 'user8@test.com'),
  ('YOUR_BUSINESS_ID', 'Test User 9', 'Company I', 'user9@test.com'),
  ('YOUR_BUSINESS_ID', 'Test User 10', 'Company J', 'user10@test.com');
```

### Test 5.2: Score All Customers

```bash
curl -X POST http://localhost:3000/api/ai/score-referrals \
  -H "Content-Type: application/json" \
  -d '{
    "businessId": "YOUR_BUSINESS_ID",
    "forceRescore": true
  }'
```

**Expected Result:**
- ✅ Job queued successfully
- ✅ All 10+ customers get scored
- ✅ Takes ~30-60 seconds (3 seconds per customer)
- ✅ No rate limit errors

**Verify all scored:**
```sql
SELECT
  COUNT(*) as total_customers,
  COUNT(ai_referral_score) as scored_customers,
  AVG(ai_referral_score) as avg_score
FROM customers
WHERE business_id = 'YOUR_BUSINESS_ID';
```

**Expected:**
- total_customers = scored_customers (all scored)
- avg_score ≈ 50-60 (normal distribution)

### Test 5.3: Test Specific Customer IDs

Get some customer IDs:
```sql
SELECT id FROM customers
WHERE business_id = 'YOUR_BUSINESS_ID'
LIMIT 3;
```

Score only those:
```bash
curl -X POST http://localhost:3000/api/ai/score-referrals \
  -H "Content-Type: application/json" \
  -d '{
    "businessId": "YOUR_BUSINESS_ID",
    "customerIds": ["id1", "id2", "id3"]
  }'
```

**Expected Result:**
- ✅ Only 3 customers scored
- ✅ Others remain unchanged

---

## Test Phase 6: Performance & Rate Limiting

### Test 6.1: Test Rate Limiting

Score 20 customers and monitor timing:

```bash
# Create 20 test customers first, then:
time curl -X POST http://localhost:3000/api/ai/score-referrals \
  -H "Content-Type: application/json" \
  -d '{
    "businessId": "YOUR_BUSINESS_ID",
    "forceRescore": true
  }'
```

**Expected Result:**
- ✅ Takes ~60-90 seconds for 20 customers
- ✅ ~3-4 seconds per customer
- ✅ No Anthropic rate limit errors
- ✅ Batch processing works (5 concurrent max)

### Test 6.2: Check Logs

```bash
# In dev server terminal, check for:
# - "AI scoring job created" logs
# - "AI scoring job completed" logs
# - No error messages (unless testing failures)
```

**Expected Log Output:**
```
[info] AI scoring job created { jobId: 'xxx', businessId: 'yyy', customersCount: 'all' }
[info] AI scoring job completed { jobId: 'xxx', scored: 20, failed: 0 }
```

---

## Test Phase 7: Data Quality Validation

### Test 7.1: Score Distribution Analysis

```sql
SELECT
  CASE
    WHEN ai_referral_score >= 80 THEN 'High (80-100)'
    WHEN ai_referral_score >= 50 THEN 'Medium (50-79)'
    WHEN ai_referral_score < 50 THEN 'Low (0-49)'
  END as score_range,
  COUNT(*) as customer_count,
  AVG(ai_estimated_value) as avg_estimated_value,
  AVG(ai_likelihood_to_refer) as avg_likelihood
FROM customers
WHERE business_id = 'YOUR_BUSINESS_ID'
  AND ai_referral_score IS NOT NULL
GROUP BY score_range
ORDER BY score_range;
```

**Expected Distribution:**
- High (80-100): 10-25% of customers
- Medium (50-79): 50-70% of customers
- Low (0-49): 10-30% of customers

**If distribution is way off:**
- Check if test data is too similar (all same company/role)
- Try with more diverse customer data
- Review AI prompt in `referral-scorer.ts` for bias

### Test 7.2: Explanation Quality Check

```sql
SELECT
  name,
  ai_referral_score,
  ai_score_explanation
FROM customers
WHERE business_id = 'YOUR_BUSINESS_ID'
  AND ai_referral_score IS NOT NULL
ORDER BY ai_referral_score DESC
LIMIT 5;
```

**Quality Checks:**
- ✅ Explanations are 2-3 sentences
- ✅ Explanations reference specific data (name, company, LinkedIn)
- ✅ No JSON fragments in explanations
- ✅ No error messages in explanations
- ✅ Higher scores have more positive language

---

## Test Phase 8: Production Build

### Test 8.1: Production Build

```bash
# Clean build
rm -rf .next
npm run build
```

**Expected Result:**
- ✅ Build completes successfully
- ✅ No errors or warnings (except middleware deprecation - safe to ignore)
- ✅ All routes compile
- ✅ "Compiled successfully" message

### Test 8.2: Production Mode Test

```bash
npm run build
npm run start
```

**Test the API in production mode:**
```bash
curl -X POST http://localhost:3000/api/ai/score-referrals \
  -H "Content-Type: application/json" \
  -d '{
    "businessId": "YOUR_BUSINESS_ID"
  }'
```

**Expected Result:**
- ✅ API works in production mode
- ✅ Faster response than dev mode
- ✅ No errors

---

## Test Phase 9: Integration Tests

### Test 9.1: End-to-End Workflow

**Simulate real user workflow:**

1. User uploads CSV with customers ✅ (manual)
2. System auto-scores customers ✅ (call API)
3. Dashboard displays scores ⏳ (to be built in Phase 2)
4. User filters by high-potential ⏳ (to be built)
5. User creates campaign targeting top 10 ⏳ (to be built)

**For now, test 1-2:**

```bash
# 1. Insert customer via CSV (simulated)
# Already done in Test 3.1

# 2. Auto-score via API
curl -X POST http://localhost:3000/api/ai/score-referrals \
  -H "Content-Type: application/json" \
  -d '{
    "businessId": "YOUR_BUSINESS_ID"
  }'

# 3. Verify scores visible in database
# Already tested in Test 3.4
```

### Test 9.2: Rescore Existing Customers

```bash
# First score
curl -X POST http://localhost:3000/api/ai/score-referrals \
  -H "Content-Type: application/json" \
  -d '{"businessId": "YOUR_BUSINESS_ID"}'

# Get original score
# SELECT ai_referral_score FROM customers WHERE id = 'xxx';

# Update customer data
# UPDATE customers SET company = 'Different Company' WHERE id = 'xxx';

# Force rescore
curl -X POST http://localhost:3000/api/ai/score-referrals \
  -H "Content-Type: application/json" \
  -d '{
    "businessId": "YOUR_BUSINESS_ID",
    "forceRescore": true
  }'

# Verify score changed
# SELECT ai_referral_score FROM customers WHERE id = 'xxx';
```

**Expected Result:**
- ✅ Score updates based on new data
- ✅ `ai_scored_at` timestamp updates

---

## Test Phase 10: Security & Access Control

### Test 10.1: Row Level Security

```sql
-- Try to access another business's AI data
-- (This should fail if RLS is working)

-- First, get another business ID
SELECT id FROM businesses WHERE id != 'YOUR_BUSINESS_ID' LIMIT 1;

-- Try to read their scoring jobs (should return 0 rows)
SELECT * FROM ai_scoring_jobs
WHERE business_id = 'OTHER_BUSINESS_ID';
```

**Expected Result:**
- ✅ Returns 0 rows (you can't see other businesses' data)

### Test 10.2: API Authentication

Test that API requires valid session (if auth is implemented):

```bash
# Try without authentication cookie
curl -X POST http://localhost:3000/api/ai/score-referrals \
  -H "Content-Type: application/json" \
  -d '{"businessId": "RANDOM_UUID"}'
```

**Expected Result:**
- Depends on your auth implementation
- Should either require login or validate business ownership

---

## Pre-Deployment Checklist

Before deploying to production:

### Environment Variables
- [ ] `ANTHROPIC_API_KEY` is set in production environment
- [ ] `NEXT_PUBLIC_SUPABASE_URL` is correct
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` is correct
- [ ] `SUPABASE_SERVICE_ROLE_KEY` is set (for server-side)

### Database
- [ ] Migration has run successfully
- [ ] All 5 AI tables exist
- [ ] Customer columns added successfully
- [ ] RLS policies are enabled
- [ ] Indexes are created

### Code
- [ ] `npm run build` succeeds with no errors
- [ ] TypeScript compilation clean
- [ ] All API endpoints tested
- [ ] Error handling works (tested without API key)

### Functionality
- [ ] Can score single customer successfully
- [ ] Can score batch of customers
- [ ] Scores save to database correctly
- [ ] Job status tracking works
- [ ] Explanations are high quality
- [ ] Score distribution is reasonable

### Performance
- [ ] Rate limiting works (no API errors)
- [ ] Batch processing efficient (~3 sec/customer)
- [ ] Database queries are fast (<100ms)

### Documentation
- [ ] AI_IMPLEMENTATION_GUIDE.md is complete
- [ ] AI_PHASE_1_COMPLETE.md is reviewed
- [ ] API endpoints documented
- [ ] Next steps are clear

---

## Post-Deployment Monitoring

### Week 1: Monitor These Metrics

```sql
-- Scoring coverage
SELECT
  COUNT(*) as total_customers,
  COUNT(ai_referral_score) as scored,
  ROUND(100.0 * COUNT(ai_referral_score) / COUNT(*), 2) as coverage_pct
FROM customers;

-- Score distribution
SELECT
  CASE
    WHEN ai_referral_score >= 80 THEN 'High'
    WHEN ai_referral_score >= 50 THEN 'Medium'
    ELSE 'Low'
  END as category,
  COUNT(*),
  SUM(ai_estimated_value) as total_potential_value
FROM customers
WHERE ai_referral_score IS NOT NULL
GROUP BY category;

-- Job success rate
SELECT
  status,
  COUNT(*) as job_count,
  AVG(EXTRACT(EPOCH FROM (completed_at - started_at))) as avg_duration_seconds
FROM ai_scoring_jobs
WHERE created_at > NOW() - INTERVAL '7 days'
GROUP BY status;

-- Failed jobs (investigate these)
SELECT *
FROM ai_scoring_jobs
WHERE status = 'failed'
  AND created_at > NOW() - INTERVAL '7 days'
ORDER BY created_at DESC;
```

### Cost Tracking

```sql
-- Estimate API costs
SELECT
  COUNT(*) as customers_scored,
  COUNT(*) * 0.0045 as estimated_cost_usd
FROM customers
WHERE ai_scored_at > NOW() - INTERVAL '30 days';
```

---

## Troubleshooting Guide

### Issue: Build fails with "Module not found: @anthropic-ai/sdk"
**Solution:**
```bash
npm install @anthropic-ai/sdk
npm run build
```

### Issue: All scores are exactly 50
**Cause:** Anthropic API key not set or invalid
**Solution:**
```bash
# Check .env.local has:
ANTHROPIC_API_KEY=sk-ant-api03-...

# Restart dev server
npm run dev
```

### Issue: "Turbopack build failed"
**Solution:**
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

### Issue: Migration fails
**Solution:**
```bash
# Check existing table structure
# Drop AI tables if they exist from previous attempts
DROP TABLE IF EXISTS ai_revenue_attribution CASCADE;
DROP TABLE IF EXISTS ai_scoring_jobs CASCADE;
DROP TABLE IF EXISTS ai_health_alerts CASCADE;
DROP TABLE IF EXISTS ai_predictions CASCADE;
DROP TABLE IF EXISTS ai_campaign_variations CASCADE;

# Re-run migration
```

### Issue: Scores seem random
**Cause:** Not enough customer data
**Solution:**
- Add more context: company, LinkedIn, role, notes
- Provide historical referral data
- Accumulate more business context over time

### Issue: Scoring is slow (>5 sec/customer)
**Cause:** API latency or rate limiting
**Solution:**
- Check Anthropic API status
- Reduce batch concurrency from 5 to 3
- Use Claude Haiku instead of Sonnet (faster, cheaper)

---

## Success Criteria

✅ **All tests pass**
✅ **Build is clean**
✅ **API responds correctly**
✅ **Scores are reasonable (not all 50, not all 100)**
✅ **Explanations are human-readable**
✅ **Error handling works**
✅ **Production build succeeds**

**When all above are ✅, you're ready to deploy!**
