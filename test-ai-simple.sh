#!/bin/bash

# Simple AI Scoring Test Script

echo "🧪 Testing AI Scoring System"
echo "─────────────────────────────────────────────────────────────"
echo ""

# Load environment variables
set -a
source .env.local
set +a

echo "📊 Step 1: Getting test business ID from database..."
echo ""

# Query Supabase for a business
BUSINESS_DATA=$(curl -s \
  "${NEXT_PUBLIC_SUPABASE_URL}/rest/v1/businesses?select=id,name&limit=1" \
  -H "apikey: ${SUPABASE_SERVICE_ROLE_KEY}" \
  -H "Authorization: Bearer ${SUPABASE_SERVICE_ROLE_KEY}")

BUSINESS_ID=$(echo $BUSINESS_DATA | node -pe "JSON.parse(require('fs').readFileSync('/dev/stdin').toString())[0]?.id || ''")
BUSINESS_NAME=$(echo $BUSINESS_DATA | node -pe "JSON.parse(require('fs').readFileSync('/dev/stdin').toString())[0]?.name || ''")

if [ -z "$BUSINESS_ID" ]; then
  echo "❌ No businesses found in database"
  echo "💡 Create a business first, then run this test"
  exit 0
fi

echo "✅ Found business: $BUSINESS_NAME"
echo "   ID: $BUSINESS_ID"
echo ""

echo "📋 Step 2: Checking for customers..."

CUSTOMERS_DATA=$(curl -s \
  "${NEXT_PUBLIC_SUPABASE_URL}/rest/v1/customers?select=id,name,email&business_id=eq.${BUSINESS_ID}&limit=5" \
  -H "apikey: ${SUPABASE_SERVICE_ROLE_KEY}" \
  -H "Authorization: Bearer ${SUPABASE_SERVICE_ROLE_KEY}")

CUSTOMER_COUNT=$(echo $CUSTOMERS_DATA | node -pe "JSON.parse(require('fs').readFileSync('/dev/stdin').toString()).length")

echo "✅ Found $CUSTOMER_COUNT customers"
echo ""

if [ "$CUSTOMER_COUNT" -eq "0" ]; then
  echo "⚠️  No customers to score"
  echo "💡 Add customers first, then run this test"
  exit 0
fi

echo "🤖 Step 3: Triggering AI scoring job..."
echo ""

# Trigger scoring
SCORING_RESULT=$(curl -s -X POST \
  "https://referlabs.com.au/api/ai/score-referrals" \
  -H "Content-Type: application/json" \
  -d "{\"businessId\": \"${BUSINESS_ID}\", \"forceRescore\": false}")

echo "Response: $SCORING_RESULT"
echo ""

JOB_ID=$(echo $SCORING_RESULT | node -pe "JSON.parse(require('fs').readFileSync('/dev/stdin').toString()).jobId || ''")

if [ -z "$JOB_ID" ]; then
  echo "❌ Failed to create scoring job"
  exit 1
fi

echo "✅ Scoring job created!"
echo "   Job ID: $JOB_ID"
echo ""

echo "⏳ Step 4: Waiting for completion (checking every 2 seconds)..."
echo ""

# Poll for completion (max 30 seconds)
for i in {1..15}; do
  STATUS_RESULT=$(curl -s "https://referlabs.com.au/api/ai/score-referrals?jobId=${JOB_ID}")

  JOB_STATUS=$(echo $STATUS_RESULT | node -pe "JSON.parse(require('fs').readFileSync('/dev/stdin').toString()).status || ''")

  if [ "$JOB_STATUS" = "completed" ]; then
    echo ""
    echo "✅ Job completed successfully!"

    SCORED=$(echo $STATUS_RESULT | node -pe "JSON.parse(require('fs').readFileSync('/dev/stdin').toString()).output?.scored || 0")
    FAILED=$(echo $STATUS_RESULT | node -pe "JSON.parse(require('fs').readFileSync('/dev/stdin').toString()).output?.failed || 0")

    echo "   Scored: $SCORED customers"
    echo "   Failed: $FAILED customers"
    break
  elif [ "$JOB_STATUS" = "failed" ]; then
    echo ""
    echo "❌ Job failed"
    exit 1
  else
    echo -n "."
    sleep 2
  fi
done

echo ""
echo ""
echo "🔍 Step 5: Checking scored customers in database..."
echo ""

SCORED_CUSTOMERS=$(curl -s \
  "${NEXT_PUBLIC_SUPABASE_URL}/rest/v1/customers?select=name,email,ai_referral_score,ai_estimated_value&business_id=eq.${BUSINESS_ID}&ai_referral_score=not.is.null&order=ai_referral_score.desc&limit=3" \
  -H "apikey: ${SUPABASE_SERVICE_ROLE_KEY}" \
  -H "Authorization: Bearer ${SUPABASE_SERVICE_ROLE_KEY}")

echo "Top Scored Customers:"
echo "$SCORED_CUSTOMERS" | node -pe "
  const customers = JSON.parse(require('fs').readFileSync('/dev/stdin').toString());
  customers.map((c, i) =>
    \`\${i+1}. \${c.name || 'Unnamed'} - Score: \${c.ai_referral_score}/100 - Value: $\${c.ai_estimated_value || 0}\`
  ).join('\\n') || 'No scored customers found yet'
"

echo ""
echo "─────────────────────────────────────────────────────────────"
echo "🎉 TEST COMPLETE!"
echo ""
echo "View full results in Supabase:"
echo "https://supabase.com/dashboard/project/ovpsgbstrdahrdcllswa/editor"
echo ""
echo "Monitor API costs in Anthropic:"
echo "https://console.anthropic.com/settings/billing"
echo "─────────────────────────────────────────────────────────────"
