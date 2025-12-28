import Link from "next/link";
import { BarChart3, ExternalLink, ShieldCheck, Wrench } from "lucide-react";

import { Card } from "@/components/ui/card";

export const metadata = {
  title: "Analytics Setup | Refer Labs",
  description:
    "Set up GA4 and client-side analytics with clear testing steps so referral traffic and conversions are visible alongside Refer Labs dashboard attribution.",
};

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 text-xs font-mono leading-relaxed text-slate-800 overflow-auto">
      {children}
    </pre>
  );
}

export default function AnalyticsGuidePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
            <BarChart3 className="h-4 w-4" />
            Analytics setup
          </div>
          <h1 className="mt-4 text-3xl font-black text-slate-900">Analytics (GA4 + standard tracking)</h1>
          <p className="mt-2 text-slate-600">
            Keep marketing analytics consistent while Refer Labs handles attribution and payouts. Validate everything with a repeatable checklist.
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
              <h2 className="text-lg font-bold text-slate-900">Step 1 — Confirm UTM visibility</h2>
              <p className="mt-2 text-sm text-slate-600">
                Refer Labs referral links include UTM parameters for analytics. Make sure your analytics setup captures them.
              </p>
              <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-700">
                <li>Click a referral link in an incognito window.</li>
                <li>Confirm the landing URL retains UTM query parameters (no redirect stripping).</li>
                <li>Confirm GA4 shows the session with those UTMs (Realtime → Traffic sources).</li>
              </ol>
              <p className="mt-4 text-xs text-slate-500">
                If you standardize analytics via GTM, follow{" "}
                <Link href="/gtm" className="underline font-semibold text-slate-700 hover:text-slate-900">
                  /gtm
                </Link>
                .
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
              <h2 className="text-lg font-bold text-slate-900">Step 2 — Keep conversions server-side for attribution</h2>
              <p className="mt-2 text-sm text-slate-600">
                GA4/Ads tracking is for marketing reporting. Refer Labs conversion attribution is based on discount code redemption posting.
              </p>
              <p className="mt-4 text-sm font-semibold text-slate-800">Conversion endpoint (authoritative)</p>
              <CodeBlock>{`POST https://referlabs.com.au/api/discount-codes/redeem
Headers:
  Content-Type: application/json
  x-pepf-discount-secret: <YOUR_SECRET>
Body:
{
  "discountCode": "CODE_USED_AT_CHECKOUT",
  "orderReference": "ORDER-12345",
  "amount": "199.00",
  "metadata": { "platform": "analytics_checklist" }
}`}</CodeBlock>
              <p className="mt-3 text-xs text-slate-500">
                Use Stripe/Shopify native webhook guides when possible; use Zapier/Make/Custom API for long-tail systems.
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card className="p-6 rounded-2xl border border-slate-200 bg-white">
          <h2 className="text-lg font-bold text-slate-900">Recommended checks</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
            <li>GA4 Realtime shows traffic when you click a referral link.</li>
            <li>UTMs persist through any redirects/landing pages.</li>
            <li>Consent banner doesn’t block essential page loads (but may affect marketing tags).</li>
            <li>Ad blockers don’t affect Refer Labs attribution (conversion capture is server-side).</li>
          </ul>
        </Card>

        <Card className="p-6 rounded-2xl border border-slate-200 bg-white">
          <h2 className="text-lg font-bold text-slate-900">Testing checkpoints (do these in order)</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-700">
            <li>Click a referral link in an incognito window and confirm GA4 Realtime records the session.</li>
            <li>Submit the referral form and confirm the signup appears in the Refer Labs dashboard.</li>
            <li>Trigger a conversion in the real checkout system (Stripe/Shopify/POS/booking) using the discount code.</li>
            <li>Confirm the conversion appears in the dashboard attributed to the correct ambassador.</li>
          </ol>
        </Card>
      </div>
    </div>
  );
}

