import Link from "next/link";
import { ExternalLink, Rocket, ShieldCheck, Wrench } from "lucide-react";

import { Card } from "@/components/ui/card";

export const metadata = {
  title: "TikTok Ads (Pixel/Events API) | Refer Labs",
  description:
    "Set up TikTok Pixel (and optionally Events API) while keeping Refer Labs referral attribution reliable via server-side conversion capture.",
};

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 text-xs font-mono leading-relaxed text-slate-800 overflow-auto">
      {children}
    </pre>
  );
}

export default function TikTokAdsGuidePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
            <Rocket className="h-4 w-4" />
            TikTok Ads setup
          </div>
          <h1 className="mt-4 text-3xl font-black text-slate-900">TikTok Ads (Pixel + optional Events API)</h1>
          <p className="mt-2 text-slate-600">
            Track ads performance while Refer Labs remains the source of truth for referral attribution and payouts.
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
              <h2 className="text-lg font-bold text-slate-900">Step 1 — Install TikTok Pixel via GTM</h2>
              <p className="mt-2 text-sm text-slate-600">
                Install the pixel through GTM to standardize across websites and reduce implementation drift.
              </p>
              <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-700">
                <li>Create a Pixel in TikTok Events Manager.</li>
                <li>In GTM: add TikTok Pixel tag (template or custom HTML).</li>
                <li>Fire on All Pages; add event tags for conversion pages if needed.</li>
                <li>Validate with TikTok Pixel Helper and GTM Preview mode.</li>
              </ol>
              <p className="mt-4 text-xs text-slate-500">
                GTM guide: <Link href="/gtm" className="underline font-semibold text-slate-700 hover:text-slate-900">/gtm</Link>
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
              <h2 className="text-lg font-bold text-slate-900">Step 2 — Keep referral conversion capture server-side</h2>
              <p className="mt-2 text-sm text-slate-600">
                Pixels can be blocked; Refer Labs conversion capture should remain server-side so attribution is consistent.
              </p>
              <p className="mt-4 text-sm font-semibold text-slate-800">Authoritative conversion capture</p>
              <CodeBlock>{`POST https://referlabs.com.au/api/discount-codes/redeem
Headers:
  Content-Type: application/json
  x-pepf-discount-secret: <YOUR_SECRET>
Body:
{
  "discountCode": "CODE_USED_AT_CHECKOUT",
  "orderReference": "ORDER-12345",
  "amount": "199.00",
  "metadata": { "platform": "tiktok_ads" }
}`}</CodeBlock>
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card className="p-6 rounded-2xl border border-slate-200 bg-white">
          <h2 className="text-lg font-bold text-slate-900">Troubleshooting</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
            <li>Pixel helper shows nothing: confirm the tag is on the published domain and not blocked by CSP/consent.</li>
            <li>Dashboard attribution seems off: confirm the posted discount code matches the ambassador’s discount code exactly.</li>
            <li>Missing conversions: ensure your checkout actually posts redemption events (Stripe/Shopify/POS/booking).</li>
          </ul>
          <p className="mt-4 text-xs text-slate-500">
            Run <Link href="/status" className="underline font-semibold text-slate-700 hover:text-slate-900">/status</Link> for live checks.
          </p>
        </Card>

        <Card className="p-6 rounded-2xl border border-slate-200 bg-white">
          <h2 className="text-lg font-bold text-slate-900">Testing checkpoints (do these in order)</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-700">
            <li>Click a referral link in incognito and confirm the referral page loads.</li>
            <li>Submit the referral form and confirm the signup appears in the dashboard.</li>
            <li>Complete a conversion using the discount code and confirm dashboard attribution.</li>
            <li>Optionally validate TikTok pixel events fire (Pixel Helper) without impacting attribution.</li>
          </ol>
        </Card>
      </div>
    </div>
  );
}

