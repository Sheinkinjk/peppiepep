'use client';

import { useState } from "react";
import {
  ClipboardList,
  Code2,
  Globe,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { WebsiteIntegrationCard } from "@/components/WebsiteIntegrationCard";

type IntegrationTabProps = {
  siteUrl: string;
  businessName: string;
  offerText?: string | null;
  clientRewardText?: string | null;
  newUserRewardText?: string | null;
  discountCaptureSecret?: string | null;
  hasProgramSettings: boolean;
  hasCustomers: boolean;
};

export function IntegrationTab({
  siteUrl,
  businessName,
  offerText,
  clientRewardText,
  newUserRewardText,
  discountCaptureSecret,
  hasProgramSettings,
  hasCustomers,
}: IntegrationTabProps) {
  const normalizedSite =
    siteUrl && siteUrl.endsWith("/") ? siteUrl.slice(0, -1) : siteUrl || "https://example.com";
  const endpointPreview = `${normalizedSite}/api/discount-codes/redeem`;
  const secretPreview = discountCaptureSecret ?? "<Generate this secret in Program Settings>";

  const [openSection, setOpenSection] = useState<string | null>('setup-guide');

  return (
    <div className="space-y-6">
      {/* Step-by-Step Setup Guide - Expandable */}
      <Collapsible open={openSection === 'setup-guide'} onOpenChange={(isOpen) => setOpenSection(isOpen ? 'setup-guide' : null)}>
        <CollapsibleTrigger className="w-full">
          <div className="rounded-3xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer">
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-4 flex-1 text-left">
                <div className="rounded-2xl bg-emerald-600 p-3 shadow-lg">
                  <ClipboardList className="h-8 w-8 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-xs uppercase tracking-[0.35em] text-emerald-700 font-semibold">
                    Complete Integration Guide
                  </p>
                  <h2 className="text-2xl font-black text-slate-900 leading-tight mt-1">
                    How to Connect Your Website & Verify Tracking Works
                  </h2>
                  <p className="text-sm text-slate-700 mt-1">
                    Step-by-step instructions to connect {businessName || "your website"}, test referral links, and confirm everything is working
                  </p>
                </div>
              </div>
              {openSection === 'setup-guide' ? (
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
                  <h3 className="text-lg font-black text-slate-900">Configure Your Program Settings</h3>
                  <p className="text-sm text-slate-700 mt-1">Before connecting your website, you need to set up your referral program basics.</p>
                </div>
              </div>
              <div className="ml-13 space-y-3 pl-6 border-l-2 border-emerald-200">
                <div>
                  <p className="font-semibold text-slate-900 text-sm">Go to Step 2: Clients & Ambassadors</p>
                  <p className="text-sm text-slate-600 mt-1">Click "Program Settings" button (top right)</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">Fill out these required fields:</p>
                  <ul className="list-disc list-inside text-sm text-slate-600 mt-1 space-y-1">
                    <li><strong>Business name:</strong> Your company name</li>
                    <li><strong>Offer text:</strong> What you're offering (e.g., "Refer a friend and get $25 credit")</li>
                    <li><strong>Client reward:</strong> What the referrer gets (e.g., "$25 in store credit")</li>
                    <li><strong>New user reward:</strong> What the referred person gets (e.g., "15% off first visit")</li>
                    <li><strong>Reward type:</strong> Choose credit, discount, upgrade, or points</li>
                    <li><strong>Reward amount:</strong> Enter dollar amount (e.g., 25)</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">Generate discount capture secret:</p>
                  <p className="text-sm text-slate-600 mt-1">Click "Generate Secret" in the Website Capture section. <strong>Copy this secret</strong> - you'll need it for Step 4.</p>
                </div>
                <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3">
                  <p className="text-xs font-semibold text-emerald-900">✓ How to verify: Click "Save Changes" - you should see a success message.</p>
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
                  <h3 className="text-lg font-black text-slate-900">Create a Test Ambassador</h3>
                  <p className="text-sm text-slate-700 mt-1">Create a test profile so you have a real referral link to work with.</p>
                </div>
              </div>
              <div className="ml-13 space-y-3 pl-6 border-l-2 border-emerald-200">
                <div>
                  <p className="font-semibold text-slate-900 text-sm">In Step 2: Clients & Ambassadors</p>
                  <p className="text-sm text-slate-600 mt-1">Find the "Quick Add Customer" card (right side)</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">Add a test customer:</p>
                  <ul className="list-disc list-inside text-sm text-slate-600 mt-1 space-y-1">
                    <li><strong>Name:</strong> "Test Ambassador" (or your name)</li>
                    <li><strong>Email:</strong> Your email address</li>
                    <li><strong>Phone:</strong> Your phone number (optional)</li>
                    <li>Click "Add Customer"</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">Copy your test link:</p>
                  <p className="text-sm text-slate-600 mt-1">Scroll to "All Customers" table below. Find your test customer and click "Copy Link". <strong>Save this link</strong> - you'll test it in Step 5.</p>
                </div>
                <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3">
                  <p className="text-xs font-semibold text-emerald-900">✓ How to verify: You should see your test customer in the table with a referral link like <code className="bg-white px-1 rounded">{siteUrl}/r/ABC123DEF456</code></p>
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
                  <h3 className="text-lg font-black text-slate-900">Add Referral Page to Your Website</h3>
                  <p className="text-sm text-slate-700 mt-1">Embed the referral landing page on your website so customers can refer friends and view your offer.</p>
                </div>
              </div>
              <div className="ml-13 space-y-3 pl-6 border-l-2 border-emerald-200">
                <div className="rounded-xl bg-blue-50 border border-blue-200 p-3">
                  <p className="text-sm font-black text-blue-900 mb-2">📖 How Referral Pages Work:</p>
                  <p className="text-xs text-blue-800 leading-relaxed">
                    When a customer clicks their unique referral link (like {siteUrl}/r/ABC123), they land on a branded referral page showing your offer ("Get $25 credit when you refer a friend").
                    Friends who visit can then submit the form to join. This page is the connection between your referral links and new customer signups—it's where the magic happens!
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">Scroll down to "Website & Shopify Integration" section below</p>
                  <p className="text-sm text-slate-600 mt-1">Click to expand it</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">Choose your integration method:</p>
                  <ul className="list-disc list-inside text-sm text-slate-600 mt-1 space-y-1">
                    <li><strong>Iframe embed (recommended):</strong> Copy the iframe code and paste into your website's HTML. This embeds the full referral form on your page.</li>
                    <li><strong>Redirect button:</strong> Copy the button code and add to your "Refer a friend" page. Clicking redirects to the hosted referral page.</li>
                    <li><strong>WordPress:</strong> Use the WordPress section below for shortcode method to embed directly in WordPress pages.</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">Where to add the code:</p>
                  <p className="text-sm text-slate-600 mt-1">Create a dedicated referral page on your site (e.g., yoursite.com/referrals or yoursite.com/refer-a-friend). For Shopify, add a new page and paste the code in the HTML editor. For WordPress, see the WordPress section below.</p>
                </div>
                <div className="rounded-xl bg-purple-50 border border-purple-200 p-3">
                  <p className="text-xs font-black text-purple-900 mb-1">💡 Pro Tip:</p>
                  <p className="text-xs text-purple-800">The referral page you create here is what customers will see when they click any ambassador's referral link. Make sure it clearly shows your offer and how the referral program works!</p>
                </div>
                <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3">
                  <p className="text-xs font-semibold text-emerald-900">✓ How to verify: Visit your referral page at yoursite.com/referrals - you should see the Refer Labs referral form embedded with your branding and offer details.</p>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-emerald-600 text-white font-black text-lg w-10 h-10 flex items-center justify-center flex-shrink-0">
                  4
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-black text-slate-900">Connect Your Checkout (Discount Tracking)</h3>
                  <p className="text-sm text-slate-700 mt-1">Set up discount code tracking so you know when referrals convert to sales.</p>
                </div>
              </div>
              <div className="ml-13 space-y-3 pl-6 border-l-2 border-emerald-200">
                <div>
                  <p className="font-semibold text-slate-900 text-sm">You need your discount capture secret from Step 1</p>
                  <p className="text-sm text-slate-600 mt-1">If you didn't save it, go back to Program Settings → Website Capture and copy it</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">Choose your platform:</p>
                  <ul className="list-disc list-inside text-sm text-slate-600 mt-1 space-y-2">
                    <li><strong>Shopify:</strong> Scroll to "Discount Capture Endpoint" section below and follow the Shopify Flow instructions</li>
                    <li><strong>WooCommerce:</strong> Scroll to "WordPress & WooCommerce Setup" section below and copy the PHP code into functions.php</li>
                    <li><strong>Custom checkout:</strong> Use the "Discount Capture Endpoint" section - send a POST request when a discount code is used</li>
                  </ul>
                </div>
                <div className="rounded-xl bg-amber-50 border border-amber-200 p-3">
                  <p className="text-xs font-semibold text-amber-900">⚠️ Important: Keep your secret secure! Never expose it in client-side code. This must be server-side only.</p>
                </div>
              </div>
            </div>

            {/* Step 5 */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-emerald-600 text-white font-black text-lg w-10 h-10 flex items-center justify-center flex-shrink-0">
                  5
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-black text-slate-900">Test Everything End-to-End</h3>
                  <p className="text-sm text-slate-700 mt-1">Verify that referral links work, tracking is active, and conversions are recorded.</p>
                </div>
              </div>
              <div className="ml-13 space-y-3 pl-6 border-l-2 border-emerald-200">
                <div>
                  <p className="font-semibold text-slate-900 text-sm">Test 1: Referral link tracking</p>
                  <ul className="list-disc list-inside text-sm text-slate-600 mt-1 space-y-1">
                    <li>Open your test ambassador's referral link from Step 2</li>
                    <li>Fill out the referral form with a fake friend's details</li>
                    <li>Submit the form</li>
                    <li>Go to <strong>Step 5: Measure ROI → Journey timeline</strong> tab</li>
                    <li><strong>✓ You should see:</strong> A "link_visit" event and a "signup_submitted" event</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">Test 2: Discount code tracking</p>
                  <ul className="list-disc list-inside text-sm text-slate-600 mt-1 space-y-1">
                    <li>Copy the discount code from your test ambassador (in the Customers table)</li>
                    <li>Go to your checkout page and enter the discount code</li>
                    <li>Complete a test purchase (or test transaction)</li>
                    <li>Go to <strong>Step 5: Measure ROI → Referral table</strong></li>
                    <li><strong>✓ You should see:</strong> A new referral marked as "pending" with the transaction details</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">Test 3: Manual referral logging</p>
                  <ul className="list-disc list-inside text-sm text-slate-600 mt-1 space-y-1">
                    <li>Go to <strong>Step 5: Measure ROI → Referral table</strong></li>
                    <li>Scroll down to "Add Manual Referral" form</li>
                    <li>Fill out a test offline booking</li>
                    <li><strong>✓ You should see:</strong> The manual referral appear in the table immediately</li>
                  </ul>
                </div>
                <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3">
                  <p className="text-xs font-semibold text-emerald-900">✓ Everything working? You're ready to import your real customers and launch campaigns!</p>
                </div>
              </div>
            </div>

            {/* Troubleshooting */}
            <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
              <h4 className="font-bold text-slate-900 text-sm mb-2">Common Issues & Solutions:</h4>
              <div className="space-y-2 text-xs text-slate-600">
                <div>
                  <p className="font-semibold text-slate-900">Referral link doesn't show my branding:</p>
                  <p>Go back to Program Settings and make sure you filled out all fields and clicked "Save Changes"</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Events not showing in Journey timeline:</p>
                  <p>Wait 30 seconds and refresh the page. If still not working, check that your referral link includes the correct code</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Discount code not tracking:</p>
                  <p>Verify your discount capture secret is correct and your checkout is sending the POST request. Check browser console for errors</p>
                </div>
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>


      <Collapsible open={openSection === 'website'} onOpenChange={(isOpen) => setOpenSection(isOpen ? 'website' : null)}>
        <CollapsibleTrigger className="w-full">
          <div className="rounded-3xl border-2 border-slate-200 bg-white/95 p-6 shadow-lg shadow-slate-200/60 hover:border-[#0abab5] transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1 text-left">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[#0abab5] to-cyan-500 flex items-center justify-center">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Website & Shopify Integration</h3>
                  <p className="text-sm text-slate-600">Embed referral pages and CTA buttons on your site</p>
                </div>
              </div>
              {openSection === 'website' ? (
                <ChevronDown className="h-6 w-6 text-slate-400 flex-shrink-0" />
              ) : (
                <ChevronRight className="h-6 w-6 text-slate-400 flex-shrink-0" />
              )}
            </div>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-4">
          <WebsiteIntegrationCard
            siteUrl={siteUrl}
            businessName={businessName}
            offerText={offerText}
            clientRewardText={clientRewardText}
            newUserRewardText={newUserRewardText}
            discountCaptureSecret={discountCaptureSecret ?? null}
          />
        </CollapsibleContent>
      </Collapsible>

      <Collapsible open={openSection === 'wordpress'} onOpenChange={(isOpen) => setOpenSection(isOpen ? 'wordpress' : null)}>
        <CollapsibleTrigger className="w-full">
          <div className="rounded-3xl border-2 border-slate-200 bg-white/95 p-6 shadow-lg shadow-slate-200/60 hover:border-[#0abab5] transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1 text-left">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-sky-600 to-cyan-500 flex items-center justify-center">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">WordPress &amp; WooCommerce Setup</h3>
                  <p className="text-sm text-slate-600">Add referral pages and discount capture to WordPress sites</p>
                </div>
              </div>
              {openSection === 'wordpress' ? (
                <ChevronDown className="h-6 w-6 text-slate-400 flex-shrink-0" />
              ) : (
                <ChevronRight className="h-6 w-6 text-slate-400 flex-shrink-0" />
              )}
            </div>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-4">
          <div className="rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-xl shadow-slate-200/60 space-y-4">
            <ol className="list-decimal space-y-2 pl-5 text-sm text-slate-600">
              <li>Create a new page and add a Custom HTML block</li>
              <li>Use the shortcode below (swap <code className="font-mono text-xs">YOURCODE</code> with ambassador's code)</li>
              <li>For WooCommerce, paste the PHP hook into <code className="font-mono text-xs">functions.php</code></li>
            </ol>
            <div className="grid gap-4 lg:grid-cols-2">
              <div className="space-y-2">
                <p className="text-sm font-semibold text-slate-800">Gutenberg shortcode</p>
                <pre className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 text-xs font-mono leading-relaxed text-slate-700 overflow-auto">
{`add_shortcode('peppiepep_referral', function($atts = []) {
  $code = isset($atts['code']) ? esc_attr($atts['code']) : 'VIPCODE1234';
  return '<iframe src="${siteUrl}/r/' . $code . '?embed=1" style="width:100%;min-height:640px;border:none;border-radius:32px;"></iframe>';
});`}
                </pre>
                <p className="text-xs text-slate-500">
                  Usage: <code className="font-mono">[peppiepep_referral code=&quot;AMBCODE&quot;]</code>
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-semibold text-slate-800">WooCommerce capture</p>
                <pre className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 text-xs font-mono leading-relaxed text-slate-700 overflow-auto">
{`add_action('woocommerce_checkout_create_order', function($order) {
  $code = $order->get_coupon_codes() ? reset($order->get_coupon_codes()) : null;
  if (!$code) {
    $code = $order->get_meta('discount_code') ?: null;
  }
  if (!$code) return;
  wp_remote_post('${siteUrl}/api/discount-codes/redeem', [
    'headers' => [
      'Content-Type' => 'application/json',
      'x-pepf-discount-secret' => '${discountCaptureSecret ?? "<ADD_SECRET>"}',
    ],
    'body' => wp_json_encode([
      'discountCode' => $code,
      'orderReference' => $order->get_order_number(),
      'amount' => (float) $order->get_total(),
      'source' => 'woocommerce',
    ]),
    'timeout' => 12,
  ]);
}, 20, 1);`}
                </pre>
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible open={openSection === 'discount'} onOpenChange={(isOpen) => setOpenSection(isOpen ? 'discount' : null)}>
        <CollapsibleTrigger className="w-full">
          <div className="rounded-3xl border-2 border-slate-200 bg-white/95 p-6 shadow-lg shadow-slate-200/60 hover:border-[#0abab5] transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1 text-left">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center">
                  <Code2 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Discount Capture Endpoint</h3>
                  <p className="text-sm text-slate-600">API call for checkout, Shopify, or POS integration</p>
                </div>
              </div>
              {openSection === 'discount' ? (
                <ChevronDown className="h-6 w-6 text-slate-400 flex-shrink-0" />
              ) : (
                <ChevronRight className="h-6 w-6 text-slate-400 flex-shrink-0" />
              )}
            </div>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-4">
          <div className="rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-xl shadow-slate-200/60 space-y-4">
            <pre className="rounded-2xl bg-slate-900/95 p-4 text-xs text-slate-100 overflow-x-auto">
{`POST ${endpointPreview}
Headers:
  x-pepf-discount-secret: ${secretPreview}
Body:
{
  "discountCode": "LARRYLESS90",
  "orderReference": "shopify-#1234",
  "amount": 450,
  "source": "shopify-checkout"
}`}
            </pre>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
