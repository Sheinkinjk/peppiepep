import Link from "next/link";
import { ExternalLink, ShieldCheck, Tag, Wrench } from "lucide-react";

import { Card } from "@/components/ui/card";

export const metadata = {
  title: "Meta Ads (Pixel/CAPI) | Refer Labs",
  description:
    "Set up Meta Pixel (and optionally CAPI) without breaking referral attribution. Includes testing checkpoints to confirm dashboard attribution stays accurate.",
};

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 text-xs font-mono leading-relaxed text-slate-800 overflow-auto">
      {children}
    </pre>
  );
}

export default function MetaAdsGuidePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
            <Tag className="h-4 w-4" />
            Meta Ads setup
          </div>
          <h1 className="mt-4 text-3xl font-black text-slate-900">Meta Ads (Pixel + optional CAPI)</h1>
          <p className="mt-2 text-slate-600">
            Track marketing performance in Meta while keeping Refer Labs referral attribution accurate and server-verified.
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
              <h2 className="text-lg font-bold text-slate-900">Step 1 — Install Pixel via GTM (recommended)</h2>
              <p className="mt-2 text-sm text-slate-600">
                Install Meta Pixel through Google Tag Manager so you can manage tags consistently across client sites.
              </p>
              <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-700">
                <li>Create a Meta Pixel in Meta Events Manager.</li>
                <li>In GTM: add a Meta Pixel tag (template or custom HTML).</li>
                <li>Fire on All Pages (or only on marketing pages if needed).</li>
                <li>Use GTM Preview + Meta Pixel Helper to verify events fire.</li>
              </ol>
              <p className="mt-4 text-xs text-slate-500">
                Need GTM first? Use <Link href="/gtm" className="underline font-semibold text-slate-700 hover:text-slate-900">/gtm</Link>.
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
              <h2 className="text-lg font-bold text-slate-900">Step 2 — Keep Refer Labs attribution server-side</h2>
              <p className="mt-2 text-sm text-slate-600">
                Pixels can be blocked by ad blockers/consent. Refer Labs attribution is based on discount code redemption posting.
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
  "metadata": { "platform": "meta_ads" }
}`}</CodeBlock>
              <p className="mt-3 text-xs text-slate-500">
                Use native integrations (Stripe/Shopify) where possible; otherwise post via{" "}
                <Link href="/zapier" className="underline font-semibold text-slate-700 hover:text-slate-900">Zapier</Link>,{" "}
                <Link href="/make" className="underline font-semibold text-slate-700 hover:text-slate-900">Make</Link>, or{" "}
                <Link href="/api-guide" className="underline font-semibold text-slate-700 hover:text-slate-900">Custom API</Link>.
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card className="p-6 rounded-2xl border border-slate-200 bg-white">
          <h2 className="text-lg font-bold text-slate-900">Recommended campaign hygiene</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
            <li>Don’t strip query params (keep UTMs on landing pages).</li>
            <li>Use one clear conversion definition (booking confirmed vs payment paid).</li>
            <li>Keep the ambassador discount code entry consistent across checkout/POS/booking.</li>
          </ul>
        </Card>

        <Card className="p-6 rounded-2xl border border-slate-200 bg-white">
          <h2 className="text-lg font-bold text-slate-900">Testing checkpoints (do these in order)</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-700">
            <li>Click a real referral link in incognito and confirm the referral page loads.</li>
            <li>Submit the referral form and confirm the signup appears in the dashboard Journey timeline.</li>
            <li>Complete a test conversion using the ambassador discount code (payment/booking).</li>
            <li>Confirm the conversion appears in the dashboard attributed to the correct ambassador.</li>
            <li>Optionally confirm Meta events fire (Pixel Helper) without impacting Refer Labs attribution.</li>
          </ol>
        </Card>
      </div>
    </div>
  );
}

