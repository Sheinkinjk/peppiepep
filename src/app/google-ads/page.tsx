import Link from "next/link";
import { BarChart3, ExternalLink, ShieldCheck, Wrench } from "lucide-react";

import { Card } from "@/components/ui/card";

export const metadata = {
  title: "Google Ads (Tag + Conversions) | Refer Labs",
  description:
    "Set up Google Ads conversion tracking (via GTM or gtag) while keeping Refer Labs attribution accurate. Includes an end-to-end testing checklist.",
};

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 text-xs font-mono leading-relaxed text-slate-800 overflow-auto">
      {children}
    </pre>
  );
}

export default function GoogleAdsGuidePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
            <BarChart3 className="h-4 w-4" />
            Google Ads setup
          </div>
          <h1 className="mt-4 text-3xl font-black text-slate-900">Google Ads (tag + conversions)</h1>
          <p className="mt-2 text-slate-600">
            Track Ads conversions without relying on fragile client-side attribution. Refer Labs remains the source of truth for referrals.
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
              <h2 className="text-lg font-bold text-slate-900">Step 1 — Install the Google tag</h2>
              <p className="mt-2 text-sm text-slate-600">
                Install via GTM whenever possible so you can reuse a consistent container across websites.
              </p>
              <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-700">
                <li>Create a conversion action in Google Ads.</li>
                <li>In GTM: add Google tag + conversion linker (if needed).</li>
                <li>Add a Conversion tag fired on your success/thank-you event.</li>
                <li>Test with GTM Preview and Google Tag Assistant.</li>
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
              <h2 className="text-lg font-bold text-slate-900">Step 2 — Ensure referral conversion capture is reliable</h2>
              <p className="mt-2 text-sm text-slate-600">
                Ads tracking helps marketing optimization; Refer Labs attribution requires server-side discount code redemption capture.
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
  "metadata": { "platform": "google_ads" }
}`}</CodeBlock>
              <p className="mt-3 text-xs text-slate-500">
                If your conversion happens in a system without native webhooks, post via{" "}
                <Link href="/zapier" className="underline font-semibold text-slate-700 hover:text-slate-900">Zapier</Link>{" "}
                or{" "}
                <Link href="/make" className="underline font-semibold text-slate-700 hover:text-slate-900">Make</Link>.
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card className="p-6 rounded-2xl border border-slate-200 bg-white">
          <h2 className="text-lg font-bold text-slate-900">Common pitfalls</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
            <li>Redirects stripping UTMs / gclid.</li>
            <li>Consent mode preventing tags (expected; shouldn’t break Refer Labs attribution).</li>
            <li>Firing Ads conversion on “form submitted” instead of “payment confirmed” (misreports revenue).</li>
          </ul>
        </Card>

        <Card className="p-6 rounded-2xl border border-slate-200 bg-white">
          <h2 className="text-lg font-bold text-slate-900">Testing checkpoints (do these in order)</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-700">
            <li>Click a referral link in incognito and confirm UTMs persist (optional GA4 realtime).</li>
            <li>Submit the referral form and confirm the signup appears in the dashboard.</li>
            <li>Complete a conversion using the ambassador discount code.</li>
            <li>Confirm the conversion appears in the dashboard attributed correctly.</li>
            <li>Optionally verify Google Ads tag firing (Tag Assistant) without impacting dashboard attribution.</li>
          </ol>
        </Card>
      </div>
    </div>
  );
}

