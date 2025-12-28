import Link from "next/link";
import { CreditCard, ExternalLink, ShieldCheck, Wrench } from "lucide-react";

import { Card } from "@/components/ui/card";

export const metadata = {
  title: "Stripe Integration | Refer Labs",
  description:
    "Stripe setup guide: webhooks, testing, and common troubleshooting so payments and conversions reflect in the dashboard reliably.",
};

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 text-xs font-mono leading-relaxed text-slate-800 overflow-auto">
      {children}
    </pre>
  );
}

export default function StripeGuidePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
            <CreditCard className="h-4 w-4" />
            Stripe setup
          </div>
          <h1 className="mt-4 text-3xl font-black text-slate-900">
            Stripe integration (webhooks + testing)
          </h1>
          <p className="mt-2 text-slate-600">
            Use Stripe webhooks so payments and downstream conversions reflect in your Refer Labs dashboard reliably.
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
              <h2 className="text-lg font-bold text-slate-900">Required environment variables</h2>
              <p className="mt-2 text-sm text-slate-600">
                Stripe requires server-side secrets and webhook signing to be configured in your deployment environment.
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
                <li><code className="font-mono">STRIPE_SECRET_KEY</code></li>
                <li><code className="font-mono">NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY</code></li>
                <li><code className="font-mono">STRIPE_WEBHOOK_SECRET</code></li>
              </ul>
              <p className="mt-3 text-xs text-slate-500">
                Validate configuration via the <Link href="/status" className="underline font-semibold text-slate-700 hover:text-slate-900">Status page</Link>.
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
              <h2 className="text-lg font-bold text-slate-900">Webhook endpoint</h2>
              <p className="mt-2 text-sm text-slate-600">
                Stripe should send events to the webhook endpoint below (configured in Stripe Dashboard → Developers → Webhooks).
              </p>
              <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Webhook URL</p>
                <p className="mt-1 font-mono text-sm text-slate-900">https://referlabs.com.au/api/stripe/webhook</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Card className="mt-6 p-6 rounded-2xl border border-slate-200 bg-white">
        <h2 className="text-lg font-bold text-slate-900">Testing checkpoints (do these in order)</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-700">
          <li>Confirm Stripe env vars are set (Status page).</li>
          <li>In Stripe Dashboard, create a webhook pointing to <code className="font-mono">/api/stripe/webhook</code> and copy the signing secret into <code className="font-mono">STRIPE_WEBHOOK_SECRET</code>.</li>
          <li>Run a test payment (Stripe test mode) and confirm events deliver successfully in Stripe’s webhook logs.</li>
          <li>Confirm the related transaction/commission data updates in the Refer Labs dashboard (admin analytics/payments pages).</li>
          <li>If anything doesn’t appear, verify webhook signature errors first, then confirm event type support.</li>
        </ol>
      </Card>

      <Card className="mt-6 p-6 rounded-2xl border border-slate-200 bg-white">
        <h2 className="text-lg font-bold text-slate-900">Common troubleshooting</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
          <li><span className="font-semibold">401/400 signature errors:</span> webhook secret mismatch between Stripe and Vercel env vars.</li>
          <li><span className="font-semibold">No events delivered:</span> webhook URL typo or blocked by WAF/proxy.</li>
          <li><span className="font-semibold">Test vs live mismatch:</span> ensure you set the correct keys and webhook secret for the mode you’re testing.</li>
        </ul>
        <div className="mt-4 space-y-2">
          <p className="text-sm font-semibold text-slate-800">Optional: Stripe CLI quick test</p>
          <CodeBlock>{`# Login once
stripe login

# Forward events to your local server (development)
stripe listen --forward-to http://localhost:3000/api/stripe/webhook

# Trigger a test event
stripe trigger payment_intent.succeeded`}</CodeBlock>
        </div>
      </Card>
    </div>
  );
}

