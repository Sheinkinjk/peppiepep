'use client';

import { useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  ClipboardList,
  Code2,
  Gift,
  Globe,
  LayoutDashboard,
  Link2,
  LineChart,
  MousePointerClick,
  PlugZap,
  ShieldCheck,
  Sparkles,
  Terminal,
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

  const statusCards = [
    {
      title: "Program identity",
      description:
        "Logo, reward copy, and highlight color configured in Program Settings so every referral surface is on-brand.",
      complete: hasProgramSettings,
    },
    {
      title: "Test ambassador",
      description:
        "Create at least one profile via Quick Add so you can copy their referral link and discount word while integrating.",
      complete: hasCustomers,
    },
  ];

  const stepCards = [
    {
      title: "1. Lock your referral brand",
      icon: <Sparkles className="h-5 w-5 text-cyan-500" />,
      body: [
        "Open Program Settings in Clients & Ambassadors.",
        "Add your offer copy, client reward text, and optionally upload a logo.",
        "Pick a highlight color / tone so emails, referral pages, and QR modules match your visual identity.",
      ],
    },
    {
      title: "2. Spin up a test ambassador",
      icon: <ClipboardList className="h-5 w-5 text-emerald-500" />,
      body: [
        "Use Quick Add to create an internal profile (e.g., “Integration Tester”).",
        "Copy their referral URL and discount code—these fuel the next steps.",
        "Visit /referral?project=<your-project>&code=<CODE> to see the ambassador portal with your brand.",
      ],
    },
    {
      title: "3. Place the referral surfaces",
      icon: <Link2 className="h-5 w-5 text-indigo-500" />,
      body: [
        "Either embed the hosted referral landing (recommended) or drop the referral CTA button onto your site.",
        "Link every “Refer a friend” button to the copied referral URL so tracking stays consistent.",
        "Use the Website Integration card below for iframe + CTA snippets.",
      ],
    },
    {
      title: "4. Capture discount submissions",
      icon: <Code2 className="h-5 w-5 text-amber-500" />,
      body: [
        "When your checkout or intake form receives the discount word, POST it to the secure endpoint.",
        "Include the secret header so PeppiePep can attribute the conversion to the correct ambassador.",
        "Log offline conversions via Performance → Manual Conversion whenever a guest references their code in person.",
      ],
    },
  ];

  const quickNav = [
    { id: "integration-website", label: "Website & Shopify", description: "Embed + CTA snippets", action: () => setOpenSection('website') },
    { id: "integration-wordpress", label: "WordPress setup", description: "Page + checkout hooks", action: () => setOpenSection('wordpress') },
    { id: "integration-discount", label: "Discount capture", description: "API + Shopify", action: () => setOpenSection('discount') },
    { id: "integration-testing", label: "Pre-flight", description: "QA checklist", action: () => setOpenSection('testing') },
  ];

  const [openSection, setOpenSection] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="rounded-3xl border border-cyan-200/60 bg-gradient-to-br from-[#0abab5] via-[#24d9e2] to-[#0abab5] shadow-[0_18px_60px_rgba(10,171,181,0.25)] p-6 sm:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-[#0a4b53]/75">
              Integration Setup
            </p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-black text-[#0a4b53]">
              Connect {businessName || "your studio"} to start tracking referrals
            </h2>
            <p className="mt-3 max-w-3xl text-sm sm:text-base text-[#0a4b53]/85">
              Set up tracking, add your website code, and test before importing customers.
            </p>
          </div>
          <div className="flex flex-col gap-3 rounded-2xl border border-white/20 bg-white/10 p-4 text-sm text-white/90">
            {statusCards.map((card) => (
              <div key={card.title} className="flex items-start gap-3">
                {card.complete ? (
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-200" />
                ) : (
                  <AlertTriangle className="mt-0.5 h-5 w-5 text-amber-200" />
                )}
                <div>
                  <p className="font-semibold">{card.title}</p>
                  <p className="text-xs text-white/75">{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick navigation */}
      <nav className="rounded-3xl border border-slate-200 bg-white/95 p-4 shadow-sm shadow-slate-200/60">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 mb-3">
          Quick shortcuts - Click to expand section
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {quickNav.map((item) => (
            <button
              key={item.id}
              onClick={item.action}
              className="group rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-left transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow"
            >
              <p className="text-sm font-semibold text-slate-800 group-hover:text-[#0abab5]">{item.label}</p>
              <p className="text-xs text-slate-500">{item.description}</p>
            </button>
          ))}
        </div>
      </nav>

      {/* Role-specific guide */}
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-lg shadow-slate-200/70 space-y-3">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <MousePointerClick className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">No-code path</h3>
              <p className="text-sm text-slate-600">
                For owners and ops teams
              </p>
            </div>
          </div>
          <ul className="list-disc space-y-2 pl-5 text-sm text-slate-600">
            <li>Create a test ambassador to get a real referral link</li>
            <li>Paste the iframe snippet into your website builder</li>
            <li>Track activity in <strong>Measure ROI → Journey timeline</strong></li>
            <li>Log offline bookings via <strong>Measure ROI → Manual referral</strong></li>
          </ul>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-lg shadow-slate-200/70 space-y-3">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Terminal className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Developer setup</h3>
              <p className="text-sm text-slate-600">
                For technical implementation
              </p>
            </div>
          </div>
          <ul className="list-disc space-y-2 pl-5 text-sm text-slate-600">
            <li>Get <code className="font-mono text-xs">x-pepf-discount-secret</code> from Program Settings</li>
            <li>POST discount codes to <code className="font-mono text-xs">/api/discount-codes/redeem</code></li>
            <li>Use <code className="font-mono text-xs">/api/referral-stats</code> for live data</li>
          </ul>
        </div>
      </div>

      {/* Data flow explanation */}
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/70 space-y-3">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-2xl bg-slate-900 text-white flex items-center justify-center">
            <LayoutDashboard className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">How tracking works</h3>
            <p className="text-sm text-slate-600">
              Link visits, form submissions, and checkouts automatically update your dashboard.
            </p>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 mb-1">
              <Link2 className="h-4 w-4 text-cyan-500" />
              Link visits
            </div>
            <p className="text-xs text-slate-600">Tracks clicks in Track Campaigns and Journey timeline</p>
          </div>
          <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 mb-1">
              <Gift className="h-4 w-4 text-emerald-500" />
              Form submissions
            </div>
            <p className="text-xs text-slate-600">Creates pending referrals in Measure ROI</p>
          </div>
          <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 mb-1">
              <PlugZap className="h-4 w-4 text-purple-500" />
              Checkout redemptions
            </div>
            <p className="text-xs text-slate-600">Updates credits and conversion stats</p>
          </div>
          <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 mb-1">
              <LineChart className="h-4 w-4 text-amber-500" />
              Manual logging
            </div>
            <p className="text-xs text-slate-600">For offline bookings via Manual Referral form</p>
          </div>
        </div>
      </section>

      <div className="grid gap-5 lg:grid-cols-2">
        {stepCards.map((card) => (
          <div
            key={card.title}
            className="rounded-2xl border border-slate-200/80 bg-white/95 p-5 shadow-sm shadow-slate-200/60"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-slate-100 flex items-center justify-center">
                {card.icon}
              </div>
              <h3 className="text-lg font-semibold text-slate-900">{card.title}</h3>
            </div>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-slate-600">
              {card.body.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <section
        id="integration-testing"
        className="rounded-2xl border border-slate-200/70 bg-white/95 p-5 shadow-lg shadow-slate-200/70 space-y-4 scroll-mt-32"
      >
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900">Pre-flight testing</p>
            <p className="text-xs text-slate-600">
              Run this checklist before inviting ambassadors or uploading CSVs.
            </p>
          </div>
        </div>
        <ol className="list-decimal space-y-2 pl-5 text-sm text-slate-600">
          <li>Visit /referral with your test ambassador code and verify every CTA opens your actual site.</li>
          <li>Submit the referral intake form and confirm the lead appears in the Performance tab.</li>
          <li>Trigger the discount capture API (sample below) and ensure the conversion logs against your tester.</li>
          <li>Use Manual Conversion to log an offline booking to confirm payouts post correctly.</li>
        </ol>
      </section>

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
