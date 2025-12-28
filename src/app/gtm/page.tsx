import Link from "next/link";
import { ExternalLink, ShieldCheck, Tag, Wrench } from "lucide-react";

import { Card } from "@/components/ui/card";

export const metadata = {
  title: "Google Tag Manager (GTM) | Refer Labs",
  description:
    "Add GTM to your website and verify referral tracking end-to-end. Includes recommended events, testing checkpoints, and troubleshooting.",
};

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 text-xs font-mono leading-relaxed text-slate-800 overflow-auto">
      {children}
    </pre>
  );
}

export default function GtmGuidePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
            <Tag className="h-4 w-4" />
            GTM setup
          </div>
          <h1 className="mt-4 text-3xl font-black text-slate-900">Google Tag Manager (GTM)</h1>
          <p className="mt-2 text-slate-600">
            Use GTM to standardize analytics across client sites, then verify referral links and conversions are reflected in the dashboard.
          </p>
        </div>

        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-800 hover:bg-slate-50"
        >
          <ExternalLink className="h-4 w-4" />
          Open dashboard
        </Link>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card className="p-6 rounded-2xl border border-slate-200 bg-white">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-slate-900 p-2">
              <ShieldCheck className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Step 1 — Install GTM</h2>
              <p className="mt-2 text-sm text-slate-600">
                Add your GTM container to the website you’re integrating. This doesn’t replace Refer Labs tracking; it helps you standardize
                client-side analytics.
              </p>
              <p className="mt-4 text-sm font-semibold text-slate-800">GTM snippet (example)</p>
              <CodeBlock>{`<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXXX');</script>
<!-- End Google Tag Manager -->`}</CodeBlock>
              <p className="mt-3 text-xs text-slate-500">
                Replace <code className="font-mono">GTM-XXXXXXX</code> with the client’s container id. Use GTM Preview mode to validate.
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6 rounded-2xl border border-slate-200 bg-white">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-amber-600 p-2">
              <Wrench className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Step 2 — Verify referral traffic + conversion flow</h2>
              <p className="mt-2 text-sm text-slate-600">
                Use a real ambassador referral link and verify the end-to-end journey: click → referral page → signup → conversion.
              </p>
              <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-700">
                <li>Open an ambassador referral link in an incognito window (e.g. <code className="font-mono">/r/AMBCODE</code>).</li>
                <li>Confirm the referral page loads and the signup appears in the dashboard Journey timeline.</li>
                <li>Trigger a conversion (Shopify/Stripe/POS/booking) using the ambassador discount code.</li>
                <li>Confirm the dashboard updates and attributes the conversion to the correct ambassador.</li>
              </ol>
              <p className="mt-4 text-xs text-slate-500">
                If you need to push conversions from non-native systems, use{" "}
                <Link href="/zapier" className="underline font-semibold text-slate-700 hover:text-slate-900">
                  Zapier
                </Link>{" "}
                /{" "}
                <Link href="/make" className="underline font-semibold text-slate-700 hover:text-slate-900">
                  Make
                </Link>{" "}
                or{" "}
                <Link href="/api-guide" className="underline font-semibold text-slate-700 hover:text-slate-900">
                  Custom API
                </Link>
                .
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card className="p-6 rounded-2xl border border-slate-200 bg-white">
          <h2 className="text-lg font-bold text-slate-900">Suggested events (optional)</h2>
          <p className="mt-2 text-sm text-slate-600">
            If you want standardized reporting in GA4/Ads across client sites, track these via GTM. Keep this separate from Refer Labs’
            server-side conversion capture.
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
            <li>
              <span className="font-semibold">referral_link_click</span> (when users click a <code className="font-mono">/r/</code> link)
            </li>
            <li>
              <span className="font-semibold">referral_signup_submitted</span> (when referral form is submitted)
            </li>
            <li>
              <span className="font-semibold">referral_conversion</span> (when checkout confirms payment/invoice/booking)
            </li>
          </ul>
          <p className="mt-4 text-xs text-slate-500">
            For conversion attribution inside Refer Labs, your checkout system must post discount redemptions to{" "}
            <code className="font-mono">/api/discount-codes/redeem</code>.
          </p>
        </Card>

        <Card className="p-6 rounded-2xl border border-slate-200 bg-white">
          <h2 className="text-lg font-bold text-slate-900">Troubleshooting</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
            <li>
              <span className="font-semibold">GTM Preview shows no container:</span> confirm the snippet is on the published domain and not blocked by CSP.
            </li>
            <li>
              <span className="font-semibold">Dashboard not updating:</span> verify the conversion source posts discount code redemptions (Stripe/Shopify/POS/booking).
            </li>
            <li>
              <span className="font-semibold">Confusing attribution:</span> ensure one code is used per conversion and the code matches the ambassador record.
            </li>
          </ul>
          <p className="mt-4 text-xs text-slate-500">
            Use{" "}
            <Link href="/status" className="underline font-semibold text-slate-700 hover:text-slate-900">
              /status
            </Link>{" "}
            for live integration checks.
          </p>
        </Card>
      </div>
    </div>
  );
}

