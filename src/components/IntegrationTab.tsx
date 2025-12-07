'use client';

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
} from "lucide-react";
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
    { id: "integration-website", label: "Website & Shopify", description: "Embed + CTA snippets" },
    { id: "integration-wordpress", label: "WordPress setup", description: "Page + checkout hooks" },
    { id: "integration-discount", label: "Discount capture", description: "API + Shopify" },
    { id: "integration-testing", label: "Pre-flight", description: "QA checklist" },
  ];

  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="rounded-3xl border border-cyan-200/60 bg-gradient-to-br from-[#0abab5] via-[#24d9e2] to-[#0abab5] text-white shadow-[0_18px_60px_rgba(10,171,181,0.25)] p-6 sm:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-white/75">
              Integration playbook
            </p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-black">
              Connect {businessName || "your studio"} before importing a single contact.
            </h2>
            <p className="mt-3 max-w-3xl text-sm sm:text-base text-white/85">
              Follow these steps to wire referral links, discount capture, and manual testing so your site,
              forms, and CRM all speak to the dashboard. Once green, bulk imports and launches stay painless.
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
          Jump to a section
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {quickNav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="group rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-left transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow"
            >
              <p className="text-sm font-semibold text-slate-800 group-hover:text-[#0abab5]">{item.label}</p>
              <p className="text-xs text-slate-500">{item.description}</p>
            </a>
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
              <h3 className="text-xl font-bold text-slate-900">No-code concierge path</h3>
              <p className="text-sm text-slate-600">
                What owners, ops managers, or concierge teams can do without touching code.
              </p>
            </div>
          </div>
          <ul className="list-disc space-y-2 pl-5 text-sm text-slate-600">
            <li>Use Quick Add to create a “Test ambassador” so you always have a real referral link + discount word.</li>
            <li>Paste the iframe or CTA snippet (below) into Webflow, Squarespace, Notion, or any CMS block.</li>
            <li>Keep an eye on <strong>Performance → Journey tracker</strong>; every link visit or signup shows up instantly.</li>
            <li>If checkout updates aren’t ready, log bookings via <strong>Performance → Manual Conversion</strong> so payouts and stats stay accurate.</li>
          </ul>
          <p className="text-xs text-slate-500">
            Tip: pin this tab in your browser during onboarding—no developer required to start sending referral emails and landing guests on brand.
          </p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-lg shadow-slate-200/70 space-y-3">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Terminal className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Developer handoff packet</h3>
              <p className="text-sm text-slate-600">
                Everything an engineer needs to wire discount codes or custom automations.
              </p>
            </div>
          </div>
          <ul className="list-disc space-y-2 pl-5 text-sm text-slate-600">
            <li>Grab the <code className="font-mono text-xs">x-pepf-discount-secret</code> in Program Settings → Website capture and keep it server-side.</li>
            <li>POST every captured discount code to <code className="font-mono text-xs">/api/discount-codes/redeem</code> (example payload below).</li>
            <li>Optionally pull live stats via <code className="font-mono text-xs">/api/referral-stats</code> to show progress inside your app.</li>
            <li>Send devs to <strong>Performance → Journey tracker</strong> so they can see how link visits, submissions, and conversions sync in real time.</li>
          </ul>
          <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 text-xs text-slate-500">
            Need webhook or CRM integrations? Use the same ambassador IDs returned in the POST response to map data to HubSpot, Shopify Flow, or Zapier.
          </div>
        </div>
      </div>

      {/* Data flow explanation */}
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/70 space-y-4">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-2xl bg-slate-900 text-white flex items-center justify-center">
            <LayoutDashboard className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">How data flows into the dashboard</h3>
            <p className="text-sm text-slate-600">
              Every click, submission, and redemption fuels specific widgets across the dashboard tabs.
            </p>
          </div>
        </div>
        <div className="space-y-4">
          {[
            {
              title: "Referral link visit",
              icon: <Link2 className="h-4 w-4 text-cyan-500" />,
              copy:
                "Ambassadors share their personal /r/CODE link. Each visit logs an event you can see in Performance → Journey tracker and the Campaigns analytics.",
              metric: "Feeds: Campaign ROI chart, Journey heatmap, Ambassador activity badges.",
            },
            {
              title: "Landing form submission",
              icon: <Gift className="h-4 w-4 text-emerald-500" />,
              copy:
                "When a prospect completes the referral landing form, the lead appears in Performance with the source campaign, timestamp, and ambassador attribution.",
              metric: "Feeds: Pending referrals table, Manual conversion baseline, Performance summary cards.",
            },
            {
              title: "Discount code redemption",
              icon: <PlugZap className="h-4 w-4 text-purple-500" />,
              copy:
                "Your checkout or POS calls the discount redemption endpoint, instantly marking the referral as conversion-ready. Credits auto-calc once you approve.",
              metric: "Feeds: Rewards pending count, Credits issued stat, Ambassador portal balances.",
            },
            {
              title: "Manual conversion or payout",
              icon: <LineChart className="h-4 w-4 text-amber-500" />,
              copy:
                "If an offline booking happens, log it manually. Marking a referral complete updates Credits, triggers ambassador SMS/email alerts, and refreshes the snapshot tiles at the top of the dashboard.",
              metric: "Feeds: Referral tables, Credits ledger, Email/SMS notifications.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4 flex flex-col gap-1"
            >
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                <span className="h-8 w-8 rounded-xl bg-white flex items-center justify-center border border-slate-200">
                  {item.icon}
                </span>
                {item.title}
              </div>
              <p className="text-sm text-slate-600">{item.copy}</p>
              <p className="text-xs font-semibold text-slate-500">{item.metric}</p>
            </div>
          ))}
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

      <div className="space-y-6" id="integration-website" >
        <WebsiteIntegrationCard
          siteUrl={siteUrl}
          businessName={businessName}
          offerText={offerText}
          clientRewardText={clientRewardText}
          newUserRewardText={newUserRewardText}
          discountCaptureSecret={discountCaptureSecret ?? null}
        />
        <section
          id="integration-wordpress"
          className="rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-xl shadow-slate-200/60 space-y-4 scroll-mt-32"
        >
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-sky-600 to-cyan-500 flex items-center justify-center">
              <Globe className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">WordPress &amp; WooCommerce setup</h3>
              <p className="text-sm text-slate-600">
                Guide even non-technical teams through publishing referral links and capturing discount codes on WordPress.
              </p>
            </div>
          </div>
          <ol className="list-decimal space-y-2 pl-5 text-sm text-slate-600">
            <li>Create a new page (e.g., <em>Refer a friend</em>) and drop a Custom HTML block wherever you want the referral portal to render.</li>
            <li>Use the shortcode below if you prefer editing in Gutenberg. Swap <code className="font-mono text-xs">YOURCODE</code> with each ambassador&apos;s referral code.</li>
            <li>WooCommerce teams can paste the PHP hook into <code className="font-mono text-xs">functions.php</code> (or a site-specific plugin) so each checkout posts redemptions back to the dashboard.</li>
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
                Usage: <code className="font-mono">[peppiepep_referral code=&quot;AMBCODE&quot;]</code> inside any block or classic editor section.
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-semibold text-slate-800">WooCommerce discount capture</p>
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
              <p className="text-xs text-slate-500">
                Works with coupon codes or custom checkout fields. Keep the secret server-side so ambassadors can&apos;t tamper with it.
              </p>
            </div>
          </div>
          <div className="rounded-2xl border border-dashed border-cyan-200 bg-cyan-50/50 p-4 text-sm text-slate-600 space-y-1.5">
            <p className="font-semibold text-slate-900">Need a no-code alternative?</p>
            <p>
              Paste the iframe or CTA button snippet from above straight into Elementor, Divi, or Squarespace embed blocks. The referral card auto-resizes so mobile visitors still see the premium design.
            </p>
          </div>
        </section>
        <div
          id="integration-discount"
          className="rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-xl shadow-slate-200/60 space-y-4 scroll-mt-32"
        >
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center">
              <Code2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Discount capture endpoint</h3>
              <p className="text-sm text-slate-600">
                Drop this call into your checkout, Shopify function, or POS flow whenever a discount word is present.
              </p>
            </div>
          </div>
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
          <p className="text-xs text-slate-500">
            Need reusable code? Use the Website Integration snippets or contact support to wire custom flows.
          </p>
        </div>
      </div>

      {/* Troubleshooting */}
      <section className="rounded-3xl border border-slate-200 bg-slate-50/80 p-6 space-y-3">
        <h3 className="text-lg font-bold text-slate-900">Manual QA script</h3>
        <p className="text-sm text-slate-600">
          Share this with your dev or concierge team so they know exactly how to validate referrals end-to-end.
        </p>
        <ul className="list-disc space-y-1.5 pl-5 text-sm text-slate-600">
          <li>Copy your test ambassador’s referral link and open it on desktop + mobile—confirm branding, logo, and CTAs.</li>
          <li>Submit the referral landing form; the lead should appear under Performance → Journey tracker immediately.</li>
          <li>At checkout, enter the discount code and ensure your system POSTs to the endpoint above. Look for the entry under discount redemptions in the dashboard.</li>
          <li>If a referral happens offline, log it via Manual Conversion so ambassadors still receive instant credit.</li>
        </ul>
      </section>
    </div>
  );
}
