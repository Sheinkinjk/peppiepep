# Twilio Australian SMS Setup Guide

## Overview

This guide explains how to configure Twilio for sending SMS messages to Australian phone numbers from your Peppiepep dashboard.

---

## ⚠️ Current Status

**Phone Number Formatting**: ✅ Fixed - Now automatically normalizes Australian numbers to E.164 format
**Twilio Account**: Needs configuration for Australian SMS

---

## Phone Number Format

### Australian Phone Numbers

The system now automatically handles Australian phone numbers in multiple formats:

**Input Formats Accepted:**
- `0412 345 678` (with spaces)
- `0412345678` (without spaces)
- `+61412345678` (E.164 format)
- `61412345678` (without +)
- `04 1234 5678` (with spaces)

**All converted to E.164:**
```
+61412345678
```

**Format Rules:**
- Country code: `+61` (Australia)
- Mobile numbers: Start with `4` after country code
- Length: 9 digits after country code
- Full E.164: `+61` + 9 digits = 12 characters total

---

## Twilio Configuration Required

### Step 1: Verify Twilio Account Settings

1. **Login to Twilio Console**
   - Go to https://console.twilio.com
   - Login with your account

2. **Check Account Type**
   - Navigate to **Console Dashboard**
   - Look for account type: "Trial" or "Upgraded"

### Step 2: Upgrade Account (Required for Australian SMS)

**Trial Account Limitations:**
- ❌ Can only send to verified phone numbers
- ❌ Cannot send to customers in Australia (unless verified)
- ❌ Limited to pre-approved numbers only

**Upgraded Account Benefits:**
- ✅ Send to any Australian mobile number
- ✅ No recipient restrictions
- ✅ Higher sending limits
- ✅ Production-ready

**To Upgrade:**
1. Go to https://console.twilio.com/us1/billing/manage-billing/upgrade-account
2. Click **Upgrade your account**
3. Add billing information
4. Add credit (minimum $20 USD recommended)

**Cost for Australian SMS:**
- Outbound SMS to Australia: ~$0.07 USD per message
- Higher than US SMS ($0.0079) due to carrier fees

### Step 3: Get Australian Phone Number (Sender ID)

**Current Configuration:**
```
TWILIO_PHONE_NUMBER=+19523339425
```

This is a **US number** and may not work reliably for Australian SMS.

**Options for Australian Sender:**

#### Option A: Buy Australian Phone Number (Recommended)
1. Go to https://console.twilio.com/us1/develop/phone-numbers/manage/search
2. Select **Country**: Australia
3. Select **Capabilities**: SMS
4. Purchase number (costs ~$1-2 USD/month)
5. Update .env.local with new number:
   ```
   TWILIO_PHONE_NUMBER=+614XXXXXXXX
   ```

#### Option B: Use Alphanumeric Sender ID
**Note:** Australia supports alphanumeric sender IDs (e.g., "PEPPIEPEP")

1. Go to https://console.twilio.com/us1/develop/sms/settings/alpha-sender
2. Register alphanumeric sender: `PEPPIEPEP`
3. Approval process takes 1-5 business days
4. Once approved, update code to use alpha sender

**Pros:**
- More professional (shows "PEPPIEPEP" instead of number)
- No monthly phone number cost

**Cons:**
- Requires approval
- Recipients cannot reply
- Longer setup time

### Step 4: Enable Geographic Permissions

1. Go to https://console.twilio.com/us1/develop/sms/settings/geo-permissions
2. Find **Australia** in the list
3. Ensure checkbox is **CHECKED** for:
   - ✅ Send SMS to Australia
4. Click **Save**

**This is critical** - if not enabled, all SMS to Australia will fail.

### Step 5: Check Messaging Service (Optional but Recommended)

1. Go to https://console.twilio.com/us1/develop/sms/services
2. Create a new Messaging Service:
   - Name: "Peppiepep SMS"
   - Use case: "Marketing/Promotional"
3. Add your phone number to the service
4. Set up **Opt-Out Management** (required for compliance)
5. Update code to use Messaging Service SID instead of phone number

---

## Testing Checklist

### Before Testing
- [ ] Twilio account upgraded (not trial)
- [ ] Billing information added
- [ ] Credit balance > $20 USD
- [ ] Geographic permissions enabled for Australia
- [ ] Australian phone number purchased OR alphanumeric sender approved

### Test Process

1. **Add Test Customer**
   - Use your own Australian mobile number
   - Format: `0412 345 678` or `+61412345678`
   - Upload via CSV or add manually

2. **Create Test Campaign**
   - Go to Dashboard → Campaigns
   - Click "Start New Campaign"
   - Enter campaign name
   - Select SMS channel
   - Write test message
   - Select your phone number
   - Click "Send Now"

3. **Verify Delivery**
   - Check your phone for SMS (should arrive within 10-30 seconds)
   - Check Twilio console logs:
     - Go to https://console.twilio.com/us1/monitor/logs/messages
     - Look for recent message
     - Status should show "Delivered"

---

## Common Errors and Solutions

### Error: "The number +61XXXXXXXXX is unverified"

**Cause:** Twilio account is still in trial mode

**Solution:**
1. Upgrade Twilio account
2. OR add Australian numbers to verified caller list:
   - Go to https://console.twilio.com/us1/develop/phone-numbers/manage/verified
   - Click "Add a new number"
   - Enter Australian number with +61 prefix
   - Verify via SMS code

### Error: "Permission to send an SMS has not been enabled"

**Cause:** Geographic permissions not enabled for Australia

**Solution:**
1. Go to https://console.twilio.com/us1/develop/sms/settings/geo-permissions
2. Enable Australia
3. Save changes
4. Wait 5 minutes for propagation

### Error: "The 'From' number +1952333XXXX is not a valid phone number"

**Cause:** Using US number to send to Australian recipients

**Solution:**
1. Purchase Australian phone number
2. Update TWILIO_PHONE_NUMBER in .env.local
3. Redeploy to Vercel with new environment variable

### Error: "Failed to send SMS" (all messages fail)

**Causes:**
1. No credit balance in Twilio account
2. Phone numbers not in E.164 format (now fixed)
3. Twilio API credentials incorrect

**Solutions:**
1. Check Twilio balance: https://console.twilio.com/us1/billing
2. Verify credentials in .env.local
3. Check Twilio console logs for specific error messages

---

## Phone Number Normalization

The system automatically normalizes phone numbers. Here's how:

### Input Examples
```csv
name,phone,email
Alice Cooper,0412 345 678,alice@example.com
Bob Dylan,+61423456789,bob@example.com
Charlie Brown,61434567890,charlie@example.com
Diana Prince,04 4567 8901,diana@example.com
```

### After Normalization
```
Alice Cooper: +61412345678 ✅
Bob Dylan: +61423456789 ✅
Charlie Brown: +61434567890 ✅
Diana Prince: +61445678901 ✅
```

### Invalid Examples
```
John Doe,12345 ❌ (too short)
Jane Smith,0912345678 ❌ (landline, starts with 9)
```

---

## Compliance Requirements

### Australian SMS Regulations

1. **Opt-Out Management**
   - Must provide unsubscribe option
   - Add "Reply STOP to unsubscribe" to messages
   - Maintain opt-out list

2. **Spam Act 2003**
   - Must have consent to send commercial messages
   - Include sender identification
   - Provide contact information

3. **Recommended Message Format**
```
Hi {{name}}! Share your referral link and earn $15 credit at
Peppiepep: {{referral_link}}

Reply STOP to unsubscribe
```

---

## Cost Estimation

### SMS Pricing (Australian Recipients)
- Per message: ~$0.07 USD
- 100 messages: ~$7 USD
- 500 messages: ~$35 USD
- 1000 messages: ~$70 USD

### Phone Number Cost
- Australian number: ~$1-2 USD/month
- OR alphanumeric sender: Free (after approval)

### Recommended Starting Balance
- Minimum: $20 USD
- Recommended: $50 USD (covers ~700 messages)

---

## Quick Setup Checklist

For fastest setup to start sending Australian SMS:

### Essential Steps (Required)
1. ✅ Upgrade Twilio account from trial
2. ✅ Add credit ($20+ USD)
3. ✅ Enable Australia geographic permissions
4. ✅ Purchase Australian phone number
5. ✅ Update TWILIO_PHONE_NUMBER environment variable
6. ✅ Deploy to Vercel

### Optional Steps (Recommended)
- [ ] Set up Messaging Service for better deliverability
- [ ] Register alphanumeric sender ID
- [ ] Configure opt-out management
- [ ] Set up compliance features

### Time Estimate
- Essential setup: 15-20 minutes
- Optional setup: 1-3 business days (approval wait time)

---

## Monitoring SMS Delivery

### Twilio Console Logs
https://console.twilio.com/us1/monitor/logs/messages

**What to Check:**
- ✅ Status: "Delivered" (success)
- ⏳ Status: "Sent" (in transit, wait 30 seconds)
- ⏳ Status: "Queued" (being sent)
- ❌ Status: "Failed" (check error code)
- ❌ Status: "Undelivered" (check phone number)

### Common Status Codes
- **30003**: Unreachable destination (invalid number)
- **30005**: Unknown destination (number not in service)
- **30006**: Landline or unreachable carrier
- **21408**: Permission to send SMS not enabled
- **21211**: Invalid 'To' phone number

---

## Environment Variables Summary

### Required in .env.local and Vercel
```bash
# Twilio Credentials
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Twilio Phone Number (Australian)
TWILIO_PHONE_NUMBER=+614XXXXXXXX  # Changed from US number

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxx
SUPABASE_SERVICE_ROLE_KEY=xxxxx

# Site URL
NEXT_PUBLIC_SITE_URL=https://peppiepep.vercel.app

# OpenAI (for AI tools)
OPENAI_API_KEY=sk-xxxxx
```

---

## Support Resources

### Twilio Documentation
- Australian SMS: https://www.twilio.com/docs/sms/send-messages/australia
- Geographic Permissions: https://www.twilio.com/docs/usage/sms-geo-permissions
- Phone Numbers: https://www.twilio.com/docs/phone-numbers

### Get Help
- Twilio Support: https://support.twilio.com
- Twilio Console: https://console.twilio.com
- Status Page: https://status.twilio.com

---

## Next Steps

1. **Immediate** (Do First):
   - [ ] Upgrade Twilio account
   - [ ] Add credit balance
   - [ ] Enable Australia geo permissions
   - [ ] Purchase Australian phone number
   - [ ] Update environment variables
   - [ ] Deploy to Vercel
   - [ ] Test with your own phone number

2. **Short Term** (This Week):
   - [ ] Test campaign with 5-10 customers
   - [ ] Monitor delivery rates in Twilio console
   - [ ] Verify message formatting
   - [ ] Check opt-out compliance

3. **Long Term** (This Month):
   - [ ] Register alphanumeric sender ID
   - [ ] Set up Messaging Service
   - [ ] Implement opt-out management
   - [ ] Scale to full customer base

---

**Last Updated:** January 27, 2025
**Status:** ✅ Code Ready | ⏳ Twilio Configuration Required
