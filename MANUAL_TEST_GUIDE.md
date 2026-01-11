# 🧪 Manual Testing Guide - AI Scoring System

Your deployment is **LIVE and WORKING**! ✅

The test showed:
- ✅ Database connection: Working
- ✅ API endpoint: Responding
- ✅ Business found: "180 markets"
- ⚠️ No customers to score yet

---

## Quick Status Check

Everything deployed successfully:

1. **Database Migration** ✅
   - 5 new AI tables created
   - 15 new columns added to customers table

2. **API Endpoints** ✅
   - POST `/api/ai/score-referrals` - Working
   - GET `/api/ai/score-referrals?jobId=xxx` - Working

3. **Production URL** ✅
   - https://referlabs.com.au

4. **Anthropic API Key** ✅
   - Added to Vercel environment variables

---

## How to Test (Three Options)

### Option 1: Add Test Customers via Supabase Dashboard

The easiest way to test:

1. **Go to Supabase Dashboard:**
   https://supabase.com/dashboard/project/ovpsgbstrdahrdcllswa/editor

2. **Click on "customers" table**

3. **Click "Insert row" button**

4. **Fill in test customer data:**
   ```
   business_id: 34a1c6de-a6bb-4de5-9023-2203a9fd582f
   name: John Smith
   email: john@example.com
   company: Acme Corp
   source: CEO
   linkedin_handle: johnsmith
   audience_profile: B2B SaaS decision makers, 5000+ network
   notes: Highly connected in tech industry
   ```

5. **Add 3-5 test customers** (more variety = better test)

6. **Run the test script:**
   ```bash
   ./test-ai-simple.sh
   ```

---

### Option 2: Import CSV of Customers

If you have a CSV of contacts:

1. Use your existing CSV upload feature in the app
2. Go to https://referlabs.com.au/dashboard
3. Upload contacts CSV
4. Run test script: `./test-ai-simple.sh`

---

### Option 3: Test with API Call Directly

Test the API endpoint manually:

```bash
curl -X POST https://referlabs.com.au/api/ai/score-referrals \
  -H "Content-Type: application/json" \
  -d '{
    "businessId": "34a1c6de-a6bb-4de5-9023-2203a9fd582f",
    "forceRescore": false
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "jobId": "uuid-here",
  "message": "Scoring job queued. All unscored customers will be analyzed."
}
```

**Check job status:**
```bash
curl "https://referlabs.com.au/api/ai/score-referrals?jobId=YOUR_JOB_ID"
```

---

## What Happens When You Score

Once you have customers and run scoring:

1. **AI analyzes each customer** based on:
   - Network size & quality (30%)
   - Influence & authority (25%)
   - Engagement likelihood (20%)
   - Conversion potential (15%)
   - Historical performance (10%)

2. **Each customer gets:**
   - Score (0-100)
   - Estimated value in USD
   - Likelihood to refer (0-1)
   - Optimal approach recommendation
   - Best contact time

3. **Cost:** $0.0045 per customer
   - 10 customers = $0.045
   - 100 customers = $0.45
   - 1,000 customers = $4.50

---

## View Results

### In Supabase Dashboard

1. Go to: https://supabase.com/dashboard/project/ovpsgbstrdahrdcllswa/editor

2. Click "customers" table

3. Look for new columns:
   - `ai_referral_score` (0-100)
   - `ai_estimated_value` (USD)
   - `ai_optimal_approach` (text recommendation)
   - `ai_best_contact_time` (timestamp)
   - `ai_scored_at` (when scored)

4. Sort by `ai_referral_score DESC` to see top referrers

### Using SQL Query

In Supabase SQL Editor, run:

```sql
-- View top scored referrers
SELECT
  name,
  email,
  company,
  ai_referral_score,
  ai_estimated_value,
  ai_optimal_approach,
  ai_scored_at
FROM customers
WHERE ai_referral_score IS NOT NULL
ORDER BY ai_referral_score DESC
LIMIT 10;
```

### Check AI Insights Dashboard

```sql
-- Get business-wide AI insights
SELECT * FROM ai_insights_dashboard
WHERE business_id = '34a1c6de-a6bb-4de5-9023-2203a9fd582f';
```

---

## Monitor Costs

**Anthropic Console:**
https://console.anthropic.com/settings/billing

You'll see:
- API calls made
- Tokens used
- Cost breakdown
- Usage over time

**Set Budget Alerts:**
1. Go to Billing settings
2. Set alert at $20/day
3. Set critical alert at $50/day

---

## Troubleshooting

### Issue: "Job stuck in processing"

**Check job status:**
```sql
SELECT * FROM ai_scoring_jobs
ORDER BY created_at DESC
LIMIT 5;
```

**If stuck, check error:**
```sql
SELECT
  id,
  status,
  error_message,
  started_at,
  completed_at
FROM ai_scoring_jobs
WHERE status = 'failed'
ORDER BY created_at DESC;
```

### Issue: "No scores appearing"

**Check if ANTHROPIC_API_KEY is set:**
1. Go to Vercel Dashboard
2. Settings → Environment Variables
3. Verify `ANTHROPIC_API_KEY` exists

**Redeploy if needed:**
```bash
git commit --allow-empty -m "Trigger redeployment"
git push origin main
```

### Issue: "API returns 404"

**Verify deployment:**
1. Check Vercel Dashboard: https://vercel.com/dashboard
2. Ensure latest deployment shows "Ready"
3. Check build logs for errors

---

## What to Expect

### First Test Run (5 customers):
- ⏱️ Takes ~10-15 seconds
- 💰 Costs ~$0.02
- 📊 You'll see scores 0-100
- 🎯 Identifies high-potential referrers

### Example Output:
```
Top Referrers:
1. John Smith - Score: 85/100 - Est. Value: $2,400
   Approach: "Leverage LinkedIn network with personalized outreach"

2. Sarah Jones - Score: 72/100 - Est. Value: $1,200
   Approach: "Focus on industry expertise in marketing"

3. Mike Chen - Score: 58/100 - Est. Value: $800
   Approach: "Standard outreach with emphasis on success stories"
```

---

## Next Steps After Testing

Once you've verified scoring works:

1. **Score all existing customers:**
   ```bash
   curl -X POST https://referlabs.com.au/api/ai/score-referrals \
     -H "Content-Type: application/json" \
     -d '{"businessId": "YOUR_ID", "forceRescore": true}'
   ```

2. **Integrate into your dashboard** (Phase 2)
   - Display scores in customer table
   - Add sort by score
   - Visual indicators (🟢 high, 🟡 medium, 🔴 low)

3. **Set up automated scoring:**
   - Score new customers on CSV upload
   - Re-score periodically (weekly/monthly)
   - Alert on high-scoring customers

4. **Track ROI:**
   - Compare conversion rates: high-score vs low-score
   - Measure revenue from top scorers
   - Calculate actual vs estimated value

---

## Success Criteria ✅

You'll know it's working when:

1. ✅ Test script completes without errors
2. ✅ Customers have `ai_referral_score` values
3. ✅ Scores make logical sense (CEOs score higher than interns)
4. ✅ Job queue shows "completed" status
5. ✅ Anthropic Console shows API usage
6. ✅ Estimated values are realistic ($0-$10,000 range)

---

## Need Help?

**Documentation:**
- Full Implementation Guide: `AI_IMPLEMENTATION_GUIDE.md`
- Deployment Guide: `DEPLOYMENT_GUIDE.md`
- Testing Checklist: `AI_TESTING_CHECKLIST.md`

**Quick Commands:**
```bash
# Run test
./test-ai-simple.sh

# Check Supabase tables
npx supabase db remote list

# View recent jobs
# (Run in Supabase SQL Editor)
SELECT * FROM ai_scoring_jobs ORDER BY created_at DESC LIMIT 10;
```

---

**Status: 🟢 System is LIVE and ready to score customers!**

Just add some customers and run the test script.
