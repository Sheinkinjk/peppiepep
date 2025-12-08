'use client';

import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight, Users, Mail, Target, BarChart3 } from "lucide-react";

export function Step2Explainer() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="w-full">
        <div className="rounded-3xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50 p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer">
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-4 flex-1 text-left">
              <div className="rounded-2xl bg-purple-600 p-3 shadow-lg">
                <Users className="h-8 w-8 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-xs uppercase tracking-[0.35em] text-purple-700 font-semibold">
                  Step-by-Step Guide
                </p>
                <h2 className="text-2xl font-black text-slate-900 leading-tight mt-1">
                  How to Add Customers & Generate Referral Links
                </h2>
                <p className="text-sm text-slate-700 mt-1">
                  Import your customer list and automatically create unique referral links for each person
                </p>
              </div>
            </div>
            {isOpen ? (
              <ChevronDown className="h-6 w-6 text-slate-400 flex-shrink-0" />
            ) : (
              <ChevronRight className="h-6 w-6 text-slate-400 flex-shrink-0" />
            )}
          </div>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-4">
        <div className="rounded-3xl border-2 border-purple-200 bg-white p-6 sm:p-8 shadow-xl space-y-6">
          {/* Step 1 */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-purple-600 text-white font-black text-lg w-10 h-10 flex items-center justify-center flex-shrink-0">
                1
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-black text-slate-900">Choose Your Import Method</h3>
                <p className="text-sm text-slate-700 mt-1">You can add customers in bulk via CSV or one-by-one manually.</p>
              </div>
            </div>
            <div className="ml-13 space-y-3 pl-6 border-l-2 border-purple-200">
              <div>
                <p className="font-semibold text-slate-900 text-sm">Option A: Bulk CSV Upload (Recommended for 10+ customers)</p>
                <ul className="list-disc list-inside text-sm text-slate-600 mt-1 space-y-1">
                  <li>Export your customer list from your CRM, POS, or email platform</li>
                  <li>Make sure your spreadsheet has columns: <code className="bg-slate-100 px-1 rounded">name</code>, <code className="bg-slate-100 px-1 rounded">email</code>, <code className="bg-slate-100 px-1 rounded">phone</code></li>
                  <li>Save as CSV file</li>
                  <li>Click "Choose File" in the Import Customers card (left side)</li>
                  <li>Select your CSV and click upload</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-slate-900 text-sm">Option B: Quick Add (For individual customers)</p>
                <ul className="list-disc list-inside text-sm text-slate-600 mt-1 space-y-1">
                  <li>Use the Quick Add Customer form (right side)</li>
                  <li>Enter name, email, and/or phone</li>
                  <li>Click "Add Customer"</li>
                  <li>Repeat for each customer</li>
                </ul>
              </div>
              <div className="rounded-xl bg-purple-50 border border-purple-200 p-3">
                <p className="text-xs font-semibold text-purple-900">✓ How to verify: Scroll down to "All Customers" table - you should see all your added customers listed.</p>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-purple-600 text-white font-black text-lg w-10 h-10 flex items-center justify-center flex-shrink-0">
                2
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-black text-slate-900">Access & Share Referral Links</h3>
                <p className="text-sm text-slate-700 mt-1">Each customer automatically gets a unique referral link and discount code.</p>
              </div>
            </div>
            <div className="ml-13 space-y-3 pl-6 border-l-2 border-purple-200">
              <div>
                <p className="font-semibold text-slate-900 text-sm">Find their links in the customers table:</p>
                <ul className="list-disc list-inside text-sm text-slate-600 mt-1 space-y-1">
                  <li>Scroll to the customer row</li>
                  <li>Click "Copy Link" to copy their unique referral URL</li>
                  <li>Click "Copy Code" to copy their discount code</li>
                  <li>Send these to your customer via email, SMS, or in-person</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-slate-900 text-sm">What each customer receives:</p>
                <ul className="list-disc list-inside text-sm text-slate-600 mt-1 space-y-1">
                  <li><strong>Referral link:</strong> A personalized URL they can share (e.g., yoursite.com/r/ABC123)</li>
                  <li><strong>Discount code:</strong> A word their friends can use at checkout (e.g., JOHNSMITH25)</li>
                </ul>
              </div>
              <div className="rounded-xl bg-purple-50 border border-purple-200 p-3">
                <p className="text-xs font-semibold text-purple-900">✓ How to verify: Click "Copy Link" for any customer and paste it in your browser - you should see the referral page with your branding.</p>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-purple-600 text-white font-black text-lg w-10 h-10 flex items-center justify-center flex-shrink-0">
                3
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-black text-slate-900">Manage Credits & Rewards</h3>
                <p className="text-sm text-slate-700 mt-1">Adjust ambassador credits manually or let the system handle it automatically.</p>
              </div>
            </div>
            <div className="ml-13 space-y-3 pl-6 border-l-2 border-purple-200">
              <div>
                <p className="font-semibold text-slate-900 text-sm">How credits work:</p>
                <ul className="list-disc list-inside text-sm text-slate-600 mt-1 space-y-1">
                  <li><strong>Automatic:</strong> When a referral is marked complete in Step 5, credits are added automatically</li>
                  <li><strong>Manual:</strong> Use "Adjust Credits" in the table to add/remove credits for offline transactions or bonuses</li>
                  <li>Credits appear in the ambassador's portal and in your Measure ROI stats</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-slate-900 text-sm">To manually adjust credits:</p>
                <ul className="list-disc list-inside text-sm text-slate-600 mt-1 space-y-1">
                  <li>Find the customer in the "All Customers" table</li>
                  <li>Click the "Adjust Credits" button in their row</li>
                  <li>Enter amount (positive to add, negative to subtract)</li>
                  <li>Click Save</li>
                </ul>
              </div>
              <div className="rounded-xl bg-purple-50 border border-purple-200 p-3">
                <p className="text-xs font-semibold text-purple-900">✓ How to verify: Check the "Credits" column in the table and the "Referral Rewards" stat at the top of the dashboard.</p>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 p-4">
            <p className="font-bold text-slate-900 text-sm mb-2">✅ Ready for Step 3?</p>
            <p className="text-xs text-slate-700">
              Once you have customers added, move to <strong>Step 3: Launch Campaigns</strong> to send them referral invitations via SMS or email.
            </p>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

export function Step3Explainer() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="w-full">
        <div className="rounded-3xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer">
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-4 flex-1 text-left">
              <div className="rounded-2xl bg-emerald-600 p-3 shadow-lg">
                <Mail className="h-8 w-8 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-xs uppercase tracking-[0.35em] text-emerald-700 font-semibold">
                  Step-by-Step Guide
                </p>
                <h2 className="text-2xl font-black text-slate-900 leading-tight mt-1">
                  How to Send Referral Campaigns
                </h2>
                <p className="text-sm text-slate-700 mt-1">
                  Create and launch SMS or email campaigns to invite your customers to start referring
                </p>
              </div>
            </div>
            {isOpen ? (
              <ChevronDown className="h-6 w-6 text-slate-400 flex-shrink-0" />
            ) : (
              <ChevronRight className="h-6 w-6 text-slate-400 flex-shrink-0" />
            )}
          </div>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-4">
        <div className="rounded-3xl border-2 border-emerald-200 bg-white p-6 sm:p-8 shadow-xl space-y-6">
          {/* Step 1 */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-emerald-600 text-white font-black text-lg w-10 h-10 flex items-center justify-center flex-shrink-0">
                1
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-black text-slate-900">Choose Your Campaign Type</h3>
                <p className="text-sm text-slate-700 mt-1">Decide whether to use our built-in Campaign Builder or send through your own CRM.</p>
              </div>
            </div>
            <div className="ml-13 space-y-3 pl-6 border-l-2 border-emerald-200">
              <div>
                <p className="font-semibold text-slate-900 text-sm">Option A: Built-in Campaign Builder (Easiest)</p>
                <ul className="list-disc list-inside text-sm text-slate-600 mt-1 space-y-1">
                  <li>Scroll down to the "Campaign Builder" section</li>
                  <li>Choose SMS or Email</li>
                  <li>Select recipients from your customer list</li>
                  <li>Customize the message (it auto-includes their unique link)</li>
                  <li>Click "Send Campaign"</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-slate-900 text-sm">Option B: Use Your Own CRM</p>
                <ul className="list-disc list-inside text-sm text-slate-600 mt-1 space-y-1">
                  <li>Export customer data using the "Export Data" button below</li>
                  <li>Import into your CRM (Klaviyo, Mailchimp, etc.)</li>
                  <li>Use the referral link merge tags in your email template</li>
                  <li>Send through your normal campaign flow</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-emerald-600 text-white font-black text-lg w-10 h-10 flex items-center justify-center flex-shrink-0">
                2
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-black text-slate-900">Create Your Message</h3>
                <p className="text-sm text-slate-700 mt-1">Write a message that explains your referral program and encourages sharing.</p>
              </div>
            </div>
            <div className="ml-13 space-y-3 pl-6 border-l-2 border-emerald-200">
              <div>
                <p className="font-semibold text-slate-900 text-sm">Message best practices:</p>
                <ul className="list-disc list-inside text-sm text-slate-600 mt-1 space-y-1">
                  <li><strong>Lead with the benefit:</strong> "Get $25 credit when your friend books"</li>
                  <li><strong>Keep it short:</strong> 2-3 sentences max for SMS, 1 short paragraph for email</li>
                  <li><strong>Include a clear CTA:</strong> "Share your link now" or "Refer a friend"</li>
                  <li><strong>Personal tone:</strong> Write like you're talking to a friend, not a sales pitch</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-slate-900 text-sm">Example SMS message:</p>
                <div className="rounded-lg bg-slate-50 p-3 text-xs text-slate-700 mt-2">
                  Hey [Name]! 👋 Love having you as a client. Want $25 credit? Just share your link with friends who'd love us too. Every booking = $25 for you! [LINK]
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-emerald-600 text-white font-black text-lg w-10 h-10 flex items-center justify-center flex-shrink-0">
                3
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-black text-slate-900">Send & Monitor</h3>
                <p className="text-sm text-slate-700 mt-1">Launch your campaign and track performance in real-time.</p>
              </div>
            </div>
            <div className="ml-13 space-y-3 pl-6 border-l-2 border-emerald-200">
              <div>
                <p className="font-semibold text-slate-900 text-sm">After sending:</p>
                <ul className="list-disc list-inside text-sm text-slate-600 mt-1 space-y-1">
                  <li>Go to <strong>Step 4: Track Campaigns</strong> to see send status</li>
                  <li>Check the "Campaign History" tab for delivery stats</li>
                  <li>Monitor clicks in the Analytics section</li>
                  <li>Watch referrals come in at <strong>Step 5: Measure ROI</strong></li>
                </ul>
              </div>
              <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3">
                <p className="text-xs font-semibold text-emerald-900">✓ How to verify: Check "Campaigns" stat at the top - it should increase by 1. Also check Step 4 for campaign details.</p>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 p-4">
            <p className="font-bold text-slate-900 text-sm mb-2">✅ Campaign sent!</p>
            <p className="text-xs text-slate-700">
              Move to <strong>Step 4: Track Campaigns</strong> to monitor performance and see which ambassadors are sharing their links.
            </p>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

export function Step4Explainer() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="w-full">
        <div className="rounded-3xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-50 p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer">
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-4 flex-1 text-left">
              <div className="rounded-2xl bg-blue-600 p-3 shadow-lg">
                <Target className="h-8 w-8 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-xs uppercase tracking-[0.35em] text-blue-700 font-semibold">
                  Step-by-Step Guide
                </p>
                <h2 className="text-2xl font-black text-slate-900 leading-tight mt-1">
                  How to Track Campaign Performance
                </h2>
                <p className="text-sm text-slate-700 mt-1">
                  Monitor your campaigns, see who's clicking links, and identify top performers
                </p>
              </div>
            </div>
            {isOpen ? (
              <ChevronDown className="h-6 w-6 text-slate-400 flex-shrink-0" />
            ) : (
              <ChevronRight className="h-6 w-6 text-slate-400 flex-shrink-0" />
            )}
          </div>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-4">
        <div className="rounded-3xl border-2 border-blue-200 bg-white p-6 sm:p-8 shadow-xl space-y-6">
          {/* Step 1 */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-blue-600 text-white font-black text-lg w-10 h-10 flex items-center justify-center flex-shrink-0">
                1
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-black text-slate-900">View Campaign Analytics</h3>
                <p className="text-sm text-slate-700 mt-1">See high-level metrics for all your campaigns.</p>
              </div>
            </div>
            <div className="ml-13 space-y-3 pl-6 border-l-2 border-blue-200">
              <div>
                <p className="font-semibold text-slate-900 text-sm">Click the "Analytics" tab:</p>
                <ul className="list-disc list-inside text-sm text-slate-600 mt-1 space-y-1">
                  <li><strong>Total sent:</strong> How many messages were delivered</li>
                  <li><strong>Click rate:</strong> % of recipients who clicked their referral link</li>
                  <li><strong>Referrals generated:</strong> How many new leads came from campaigns</li>
                  <li><strong>Revenue per campaign:</strong> Sales attributed to each campaign</li>
                </ul>
              </div>
              <div className="rounded-xl bg-blue-50 border border-blue-200 p-3">
                <p className="text-xs font-semibold text-blue-900">✓ What to look for: Click rates above 10% indicate strong engagement. Adjust messaging if below 5%.</p>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-blue-600 text-white font-black text-lg w-10 h-10 flex items-center justify-center flex-shrink-0">
                2
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-black text-slate-900">Review Campaign History</h3>
                <p className="text-sm text-slate-700 mt-1">See detailed stats for each campaign you've sent.</p>
              </div>
            </div>
            <div className="ml-13 space-y-3 pl-6 border-l-2 border-blue-200">
              <div>
                <p className="font-semibold text-slate-900 text-sm">Click the "Campaign History" tab:</p>
                <ul className="list-disc list-inside text-sm text-slate-600 mt-1 space-y-1">
                  <li>See each campaign listed with name, channel (SMS/Email), and date sent</li>
                  <li>Check send status - how many succeeded vs failed</li>
                  <li>View clicks and conversions per campaign</li>
                  <li>Calculate ROI (revenue generated vs campaign cost)</li>
                </ul>
              </div>
              <div className="rounded-xl bg-blue-50 border border-blue-200 p-3">
                <p className="text-xs font-semibold text-blue-900">✓ Pro tip: Compare campaigns to see which messages and timing work best for your audience.</p>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-blue-600 text-white font-black text-lg w-10 h-10 flex items-center justify-center flex-shrink-0">
                3
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-black text-slate-900">Share Referral Assets</h3>
                <p className="text-sm text-slate-700 mt-1">Create shareable graphics and QR codes for ambassadors.</p>
              </div>
            </div>
            <div className="ml-13 space-y-3 pl-6 border-l-2 border-blue-200">
              <div>
                <p className="font-semibold text-slate-900 text-sm">Click the "Share Assets" tab:</p>
                <ul className="list-disc list-inside text-sm text-slate-600 mt-1 space-y-1">
                  <li>Generate QR codes for any ambassador's referral link</li>
                  <li>Download social media graphics</li>
                  <li>Create email templates with referral links</li>
                  <li>Export links for use in other marketing materials</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 p-4">
            <p className="font-bold text-slate-900 text-sm mb-2">✅ Ready to measure results?</p>
            <p className="text-xs text-slate-700">
              Move to <strong>Step 5: Measure ROI</strong> to see all referrals, track conversions, and calculate your program's return on investment.
            </p>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

export function Step5Explainer() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="w-full">
        <div className="rounded-3xl border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 via-purple-50 to-indigo-50 p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer">
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-4 flex-1 text-left">
              <div className="rounded-2xl bg-indigo-600 p-3 shadow-lg">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-xs uppercase tracking-[0.35em] text-indigo-700 font-semibold">
                  Step-by-Step Guide
                </p>
                <h2 className="text-2xl font-black text-slate-900 leading-tight mt-1">
                  How to Track Referrals & Calculate ROI
                </h2>
                <p className="text-sm text-slate-700 mt-1">
                  Monitor all referrals, mark them complete, and measure your program's return on investment
                </p>
              </div>
            </div>
            {isOpen ? (
              <ChevronDown className="h-6 w-6 text-slate-400 flex-shrink-0" />
            ) : (
              <ChevronRight className="h-6 w-6 text-slate-400 flex-shrink-0" />
            )}
          </div>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-4">
        <div className="rounded-3xl border-2 border-indigo-200 bg-white p-6 sm:p-8 shadow-xl space-y-6">
          {/* Step 1 */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-indigo-600 text-white font-black text-lg w-10 h-10 flex items-center justify-center flex-shrink-0">
                1
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-black text-slate-900">View All Referrals</h3>
                <p className="text-sm text-slate-700 mt-1">See every referral that's come through your program.</p>
              </div>
            </div>
            <div className="ml-13 space-y-3 pl-6 border-l-2 border-indigo-200">
              <div>
                <p className="font-semibold text-slate-900 text-sm">Click the "Referral table" tab:</p>
                <ul className="list-disc list-inside text-sm text-slate-600 mt-1 space-y-1">
                  <li><strong>Pending:</strong> Referral submitted but not yet converted to a booking</li>
                  <li><strong>Completed:</strong> Customer booked and ambassador was rewarded</li>
                  <li>See who referred who, transaction values, and dates</li>
                  <li>Filter by ambassador, date range, or status</li>
                </ul>
              </div>
              <div className="rounded-xl bg-indigo-50 border border-indigo-200 p-3">
                <p className="text-xs font-semibold text-indigo-900">✓ What each referral shows: Ambassador name, referred customer details, status, transaction value, and date.</p>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-indigo-600 text-white font-black text-lg w-10 h-10 flex items-center justify-center flex-shrink-0">
                2
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-black text-slate-900">Mark Referrals Complete</h3>
                <p className="text-sm text-slate-700 mt-1">When a referred customer books, mark the referral as complete to credit the ambassador.</p>
              </div>
            </div>
            <div className="ml-13 space-y-3 pl-6 border-l-2 border-indigo-200">
              <div>
                <p className="font-semibold text-slate-900 text-sm">For automatically tracked referrals:</p>
                <ul className="list-disc list-inside text-sm text-slate-600 mt-1 space-y-1">
                  <li>Find the pending referral in the table</li>
                  <li>Click "Mark Complete"</li>
                  <li>Enter transaction value and date</li>
                  <li>Click Confirm - ambassador gets credited automatically</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-slate-900 text-sm">For offline/manual referrals:</p>
                <ul className="list-disc list-inside text-sm text-slate-600 mt-1 space-y-1">
                  <li>Scroll to "Add Manual Referral" form</li>
                  <li>Select the ambassador or enter their referral code</li>
                  <li>Enter referred customer details</li>
                  <li>Add transaction value and date</li>
                  <li>Submit - this creates and completes the referral in one step</li>
                </ul>
              </div>
              <div className="rounded-xl bg-indigo-50 border border-indigo-200 p-3">
                <p className="text-xs font-semibold text-indigo-900">✓ How to verify: Check the "Referral Rewards" stat at the top - it should increase. Ambassador will also receive SMS/email notification.</p>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-indigo-600 text-white font-black text-lg w-10 h-10 flex items-center justify-center flex-shrink-0">
                3
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-black text-slate-900">Track Journey & Calculate ROI</h3>
                <p className="text-sm text-slate-700 mt-1">See the full customer journey and measure program performance.</p>
              </div>
            </div>
            <div className="ml-13 space-y-3 pl-6 border-l-2 border-indigo-200">
              <div>
                <p className="font-semibold text-slate-900 text-sm">Click "Journey timeline" tab:</p>
                <ul className="list-disc list-inside text-sm text-slate-600 mt-1 space-y-1">
                  <li>See every event: link visits, form submissions, conversions</li>
                  <li>Track which ambassadors are most active</li>
                  <li>Identify drop-off points in the referral funnel</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-slate-900 text-sm">Click "Metrics" tab for ROI analysis:</p>
                <ul className="list-disc list-inside text-sm text-slate-600 mt-1 space-y-1">
                  <li><strong>Total ambassadors:</strong> Your referral program size</li>
                  <li><strong>Referral revenue:</strong> Total sales from referrals</li>
                  <li><strong>Credits issued:</strong> Total rewards paid to ambassadors</li>
                  <li><strong>Program ROI:</strong> Revenue ÷ (rewards + campaign costs)</li>
                  <li><strong>Avg per ambassador:</strong> How many referrals each person sends</li>
                </ul>
              </div>
              <div className="rounded-xl bg-indigo-50 border border-indigo-200 p-3">
                <p className="text-xs font-semibold text-indigo-900">✓ Healthy benchmarks: 5x+ ROI, 2+ referrals per ambassador, 40%+ conversion rate (pending → completed)</p>
              </div>
            </div>
          </div>

          {/* Final Note */}
          <div className="rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 p-4">
            <p className="font-bold text-slate-900 text-sm mb-2">🎉 Your referral program is running!</p>
            <p className="text-xs text-slate-700">
              Keep monitoring this dashboard weekly. Look for top performers to reward with bonuses, and reach out to inactive ambassadors with reminder campaigns.
            </p>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
