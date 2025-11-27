# Campaign Flow Testing Guide

## Complete End-to-End Testing Checklist

This guide walks through testing the entire campaign flow from customer upload to live SMS sending.

---

## Prerequisites

### ✅ Environment Variables (Verified)
- [x] `TWILIO_ACCOUNT_SID` configured in .env.local
- [x] `TWILIO_AUTH_TOKEN` configured in .env.local
- [x] `TWILIO_PHONE_NUMBER` configured in .env.local
- [x] `NEXT_PUBLIC_SUPABASE_URL` configured
- [x] `SUPABASE_SERVICE_ROLE_KEY` configured
- [ ] `RESEND_API_KEY` (Not configured yet - Email will show error)

### Supabase Configuration
- [ ] **CRITICAL**: Site URL must be set to production URL (https://peppiepep.vercel.app)
  - See [QUICK_FIX_SITE_URL.md](QUICK_FIX_SITE_URL.md) for instructions
- [ ] OAuth redirect URLs configured for production
- [ ] Email confirmation disabled (optional, for easier testing)

---

## Test Flow 1: Customer Upload (CSV/Excel)

### Step 1: Prepare Test Data
Create a CSV file named `test_customers.csv`:

```csv
name,phone,email
John Doe,+1234567890,john@example.com
Jane Smith,+1987654321,jane@example.com
Bob Johnson,+1555123456,bob@example.com
```

**OR** create an Excel file with the same columns.

### Step 2: Upload Customers
1. Navigate to https://peppiepep.vercel.app/dashboard
2. Click the **"Clients & Ambassadors"** tab
3. Scroll to **"Import Your Customer List"** section
4. Click the file input and select `test_customers.csv`
5. Click **"Upload & Generate Links"**

### Expected Results:
- ✅ Success toast appears: "Successfully uploaded X customers"
- ✅ Table below shows new customers with:
  - Name
  - Phone number
  - Email
  - Unique referral code (e.g., `a1b2c3d4e5f6`)
  - 0 credits
  - Status: Active
- ✅ Stats cards at top update with new customer count

### Troubleshooting:
- **Error: "Invalid CSV format"** → Check CSV has header row with "name" column
- **Error: "Upload failed"** → Check Supabase connection
- **No customers appear** → Refresh page, check browser console for errors

---

## Test Flow 2: Create and Send SMS Campaign

### Step 1: Navigate to Campaigns Tab
1. Go to https://peppiepep.vercel.app/dashboard
2. Click the **"Campaigns"** tab (Rocket icon)
3. You should see **"Launch Campaign"** card with **"Start New Campaign"** button

### Step 2: Open Campaign Builder
1. Click **"Start New Campaign"**
2. Modal should open with title "Create New Campaign"

### Step 3: Configure Campaign
Fill in the form:

**Campaign Name:**
```
Holiday Referral Push
```

**Channel:**
- Click **"SMS"** button (should turn blue/active)

**Message:**
```
Hi {{name}}! Share your referral link with friends and earn $15 credit at our salon: {{referral_link}}
```

**Variables Available:**
- `{{name}}` - Replaced with customer's name
- `{{referral_link}}` - Replaced with `https://peppiepep.vercel.app/r/[their_code]`

**Schedule:**
- Click **"Send Now"** (blue/active)
- Note: "Schedule Later" will show error (not implemented yet)

### Step 4: Select Recipients
1. Scroll to **"Select Recipients"** section
2. **CRITICAL**: Only customers with phone numbers will appear for SMS
3. Click **"Select All"** or manually check individual customers
4. Verify count shows: "X selected"
5. Check estimated cost: `$0.02 per SMS × X recipients = $X.XX`

### Step 5: Send Campaign
1. Click **"Send Campaign"** button at bottom
2. Button shows "Sending..." with loading state
3. Modal remains open during sending

### Expected Results:
- ✅ Success message appears: "Campaign sent successfully! Sent X SMS messages"
- ✅ Modal automatically closes
- ✅ Form resets (all fields cleared)
- ✅ Real SMS messages sent via Twilio to customer phone numbers
- ✅ SMS received with personalized name and referral link

### Expected SMS Format:
```
Hi John Doe! Share your referral link with friends and earn $15 credit at our salon: https://peppiepep.vercel.app/r/a1b2c3d4e5f6
```

---

## Test Flow 3: Verify SMS Delivery

### Option A: Use Your Own Phone
1. Add yourself as a customer with your real phone number
2. Run campaign flow above
3. Check your phone for SMS within 10-30 seconds

### Option B: Use Twilio Console
1. Go to https://console.twilio.com
2. Login with Twilio account
3. Navigate to **Monitor** → **Logs** → **Messages**
4. Verify messages show status: "Delivered"
5. Check message body matches template with substitutions

### Twilio Message Statuses:
- ✅ **Delivered** - Success!
- ⏳ **Queued** - Still sending (wait 30 seconds)
- ⏳ **Sent** - Carrier accepted (wait for delivery)
- ❌ **Failed** - Check error message
- ❌ **Undelivered** - Invalid phone number format

---

## Test Flow 4: AI Tools Tab

### Test AI Message Generator
1. Navigate to **"AI Tools"** tab (Sparkles icon)
2. Scroll to **"Generate Smart Messages"** card
3. Enter context: `Holiday campaign for returning customers`
4. Click **"Generate Message"**
5. **Expected**: AI-generated message appears using OpenAI API
6. Click **"Copy Message"** to copy to clipboard
7. Paste into Campaign Builder message field

### Test Ambassador Scoring
1. Ensure you have uploaded customers with referrals
2. Click **"Rank My Ambassadors"** button
3. **Expected**: Top 5 performers appear ranked by AI score
4. Shows: Name, AI score (0-100), referrals made, total value

### Test ROI Calculator
1. Click **"Calculate ROI Forecast"**
2. **Expected**: Shows 30/60/90 day forecasts with:
   - Expected revenue
   - Expected referrals
   - ROI percentage

---

## Test Flow 5: Performance Analytics

1. Navigate to **"Performance"** tab (BarChart icon)
2. Verify 6 analytics cards show:
   - **Total Ambassadors** - Count of customers
   - **Total Referrals** - Count of referrals
   - **Conversion Rate** - % of completed referrals
   - **Credits Issued** - $ total rewards
   - **Pending Rewards** - Count of pending referrals
   - **Avg per Ambassador** - Referrals per customer

---

## Common Issues and Solutions

### Issue: "SMS service not configured"
**Solution**: Check `.env.local` has all 3 Twilio variables:
```
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_PHONE_NUMBER=+1xxxxxxxxxx
```

### Issue: "No customers have phone numbers on file"
**Solution**:
- Re-upload CSV with valid phone numbers
- Phone format: `+1234567890` (include country code)
- US format: `+1` followed by 10 digits

### Issue: Twilio error "Invalid 'To' phone number"
**Solution**:
- Phone must include country code: `+1` for US
- Remove spaces, dashes, parentheses
- Valid: `+19523339425`
- Invalid: `952-333-9425`, `(952) 333-9425`

### Issue: "Application error: a server-side exception has occurred"
**Solution**:
- Check Supabase Site URL is set to production (not localhost)
- See [QUICK_FIX_SITE_URL.md](QUICK_FIX_SITE_URL.md)

### Issue: Campaign sends but no SMS received
**Solution**:
1. Check Twilio console for delivery status
2. Verify Twilio account has balance
3. Verify Twilio trial account restrictions:
   - Can only send to verified phone numbers
   - Add your phone to verified callers: https://console.twilio.com/us1/develop/phone-numbers/manage/verified

### Issue: Email campaign shows error
**Solution**:
- Email requires Resend API key (not configured yet)
- Error message: "Email service not configured"
- **This is expected** - only SMS works currently

---

## Production Readiness Checklist

### ✅ Completed
- [x] Dashboard with 6 tabs (AI Tools, Campaigns, Clients, Referrals, Performance, Settings)
- [x] CSV/Excel customer upload
- [x] Campaign builder with SMS support
- [x] Live Twilio SMS sending
- [x] Message personalization ({{name}}, {{referral_link}})
- [x] Customer selection (all/none/individual)
- [x] Cost estimation
- [x] AI message generator (OpenAI)
- [x] Ambassador scoring (ML-based)
- [x] ROI calculator (predictive analytics)
- [x] Performance analytics dashboard
- [x] Referral tracking

### 🔄 In Progress
- [ ] Email campaigns (Resend integration)
  - Need to add RESEND_API_KEY to environment variables
  - Need to configure sender email address
  - Code is ready, just needs API key

### 📋 Future Enhancements
- [ ] Scheduled campaigns (calendar picker works, backend logic pending)
- [ ] Campaign tracking table (optional, currently console-only)
- [ ] Message preview before sending
- [ ] A/B testing for messages
- [ ] Campaign analytics (open rates, click rates)
- [ ] SMS delivery receipts
- [ ] Email open/click tracking

---

## Quick Test Script

**5-Minute Smoke Test:**

1. ✅ Login to https://peppiepep.vercel.app/login
2. ✅ Upload `test_customers.csv` with 3 customers
3. ✅ Verify 3 customers appear in table
4. ✅ Click "Start New Campaign"
5. ✅ Enter campaign name
6. ✅ Select SMS channel
7. ✅ Enter message with {{name}} and {{referral_link}}
8. ✅ Select all recipients
9. ✅ Click "Send Campaign"
10. ✅ Verify success message
11. ✅ Check Twilio console for 3 delivered messages
12. ✅ (Optional) Check your phone if you added yourself

**Expected Time:** 5-7 minutes
**Expected Result:** All steps ✅ with SMS delivered

---

## Support Contacts

- **Twilio Issues**: Check https://console.twilio.com → Monitor → Logs
- **Supabase Issues**: Check https://supabase.com/dashboard → Logs
- **OpenAI Issues**: Check API usage at https://platform.openai.com

---

## Test Data Examples

### Sample CSV (Minimal):
```csv
name,phone
Alice Cooper,+15551234567
Bob Dylan,+15559876543
```

### Sample CSV (Full):
```csv
name,phone,email
Alice Cooper,+15551234567,alice@example.com
Bob Dylan,+15559876543,bob@example.com
Charlie Brown,+15551111111,charlie@example.com
```

### Sample Excel:
Same columns as CSV, save as `.xlsx` format.

---

## Next Steps for Production

1. **Configure Resend for Email:**
   ```bash
   # Add to .env.local and Vercel
   RESEND_API_KEY=re_xxxxxxxxxxxxx
   ```

2. **Update Supabase Site URL:**
   - Login to https://supabase.com/dashboard
   - Go to Authentication → URL Configuration
   - Change Site URL from `http://localhost:3000` to `https://peppiepep.vercel.app`

3. **Test with Real Customers:**
   - Export customer list from existing system
   - Format as CSV with name, phone, email columns
   - Upload to dashboard
   - Send first campaign to small test group (5-10 customers)

4. **Monitor First Campaign:**
   - Check Twilio delivery rates
   - Track referral link clicks
   - Measure conversions
   - Gather customer feedback

---

**Last Updated:** 2025-01-27
**Status:** ✅ Ready for SMS Testing | 🔄 Email Pending Resend Setup
