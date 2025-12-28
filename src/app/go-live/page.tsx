import Link from "next/link";
import { ExternalLink, Rocket, ShieldCheck, Wrench } from "lucide-react";

import { Card } from "@/components/ui/card";

export const metadata = {
  title: "Go-live Checklist | Refer Labs",
  description:
    "Production go-live checklist to ensure referral links, cookies, webhooks, and dashboard updates work reliably across client sites.",
};

export default function GoLiveChecklistPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
            <Rocket className="h-4 w-4" />
            Go-live
          </div>
          <h1 className="mt-4 text-3xl font-black text-slate-900">Production go-live checklist</h1>
          <p className="mt-2 text-slate-600">
            Use this before launching on a new website to ensure attribution is accurate and the dashboard reflects events in real time.
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

      <div className="mt-8 grid gap-6">
        <Card className="p-6 rounded-2xl border border-slate-200 bg-white">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-slate-900 p-2">
              <ShieldCheck className="h-5 w-5 text-white" />
            </div>
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900">Critical path (must pass)</h2>
              <ol className="list-decimal space-y-2 pl-5 text-sm text-slate-700">
                <li>
                  <span className="font-semibold">Referral link loads:</span> open a real <code className="font-mono">/r/AMBCODE</code> link in incognito.
                </li>
                <li>
                  <span className="font-semibold">Signup captured:</span> submit the referral form and confirm it appears in the dashboard Journey timeline.
                </li>
                <li>
                  <span className="font-semibold">Conversion captured:</span> complete a real checkout/payment/booking using the ambassador discount code.
                </li>
                <li>
                  <span className="font-semibold">Attribution correct:</span> verify the conversion is credited to the right ambassador.
                </li>
                <li>
                  <span className="font-semibold">Real-time updates:</span> confirm the dashboard updates without manual refresh (or shows “Last updated just now”).
                </li>
              </ol>
              <p className="text-xs text-slate-500">
                If you can’t complete Step 3 via a native integration, post the conversion via{" "}
                <Link href="/stripe" className="underline font-semibold text-slate-700 hover:text-slate-900">
                  Stripe
                </Link>
                ,{" "}
                <Link href="/zapier" className="underline font-semibold text-slate-700 hover:text-slate-900">
                  Zapier
                </Link>
                ,{" "}
                <Link href="/make" className="underline font-semibold text-slate-700 hover:text-slate-900">
                  Make
                </Link>
                , or{" "}
                <Link href="/api-guide" className="underline font-semibold text-slate-700 hover:text-slate-900">
                  Custom API
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
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900">Integration checks (recommended)</h2>
              <ul className="list-disc space-y-2 pl-5 text-sm text-slate-700">
                <li>
                  <span className="font-semibold">Domain + HTTPS:</span> the client site is HTTPS and embeds aren’t blocked.
                </li>
                <li>
                  <span className="font-semibold">Discount Capture Secret:</span> stored only server-side (Vercel env, Make/Zapier, or backend).
                </li>
                <li>
                  <span className="font-semibold">Webhooks:</span> Stripe/Shopify/POS webhooks are live and not pointing at old environments.
                </li>
                <li>
                  <span className="font-semibold">Email campaigns:</span> CRM merge fields contain <code className="font-mono">referral_link</code> and resolve correctly.
                </li>
                <li>
                  <span className="font-semibold">Analytics:</span> UTMs are visible in GA4 (optional) — see <Link href="/analytics" className="underline font-semibold text-slate-700 hover:text-slate-900">/analytics</Link>.
                </li>
              </ul>
              <p className="text-xs text-slate-500">
                Run quick diagnostics on{" "}
                <Link href="/status" className="underline font-semibold text-slate-700 hover:text-slate-900">
                  /status
                </Link>{" "}
                before you invite ambassadors.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

