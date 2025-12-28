import Link from "next/link";
import { Code2, ExternalLink, ShieldCheck, Wrench } from "lucide-react";

import { Card } from "@/components/ui/card";

export const metadata = {
  title: "Custom API Integration | Refer Labs",
  description:
    "Send conversion signals and attribution data to Refer Labs from your backend. Includes security, retries, and a testing checklist.",
};

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 text-xs font-mono leading-relaxed text-slate-800 overflow-auto">
      {children}
    </pre>
  );
}

export default function ApiGuidePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
            <Code2 className="h-4 w-4" />
            Custom API setup
          </div>
          <h1 className="mt-4 text-3xl font-black text-slate-900">Custom API integration (recommended for engineering teams)</h1>
          <p className="mt-2 text-slate-600">
            Post conversions from your backend for maximum reliability: retries, idempotency, and complete auditability.
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
              <h2 className="text-lg font-bold text-slate-900">Step 1 — Store your secret securely</h2>
              <p className="mt-2 text-sm text-slate-600">
                You’ll use the Discount Capture Secret to authenticate conversion posts. Keep it in server-side env vars only.
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
                <li>Use Vercel / Supabase environment variables (never client-side).</li>
                <li>Rotate it if it’s ever exposed.</li>
                <li>Prefer a single integration service account for posting conversions.</li>
              </ul>
              <p className="mt-4 text-xs text-slate-500">
                Supported headers: <code className="font-mono">x-pepf-discount-secret</code> or{" "}
                <code className="font-mono">x-referlabs-discount-secret</code>.
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
              <h2 className="text-lg font-bold text-slate-900">Step 2 — Post conversions server-to-server</h2>
              <p className="mt-2 text-sm text-slate-600">
                When a transaction is confirmed (paid/complete), call the discount capture endpoint from your backend.
              </p>
              <p className="mt-4 text-sm font-semibold text-slate-800">HTTP request</p>
              <CodeBlock>{`POST https://referlabs.com.au/api/discount-codes/redeem
Headers:
  Content-Type: application/json
  x-pepf-discount-secret: <YOUR_SECRET>
Body:
{
  "discountCode": "VIP100",
  "orderReference": "ORDER-12345",
  "amount": "199.00",
  "metadata": {
    "platform": "custom_api",
    "customerEmail": "buyer@example.com"
  }
}`}</CodeBlock>
              <p className="mt-3 text-xs text-slate-500">
                Use the real discount code used in the transaction. This is what drives correct ambassador attribution.
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card className="p-6 rounded-2xl border border-slate-200 bg-white">
          <h2 className="text-lg font-bold text-slate-900">Reliability checklist</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
            <li>
              <span className="font-semibold">Idempotency:</span> send the same <code className="font-mono">orderReference</code> on retries.
            </li>
            <li>
              <span className="font-semibold">Retries:</span> retry 5xx and network failures with backoff.
            </li>
            <li>
              <span className="font-semibold">Logging:</span> log request id, order id, discount code, and response status for audits.
            </li>
          </ul>
          <p className="mt-4 text-xs text-slate-500">
            If you need a quick no-code option, use{" "}
            <Link href="/zapier" className="underline font-semibold text-slate-700 hover:text-slate-900">
              Zapier
            </Link>{" "}
            or{" "}
            <Link href="/make" className="underline font-semibold text-slate-700 hover:text-slate-900">
              Make
            </Link>
            .
          </p>
        </Card>

        <Card className="p-6 rounded-2xl border border-slate-200 bg-white">
          <h2 className="text-lg font-bold text-slate-900">Common troubleshooting</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
            <li>
              <span className="font-semibold">401 responses:</span> secret header missing/wrong.
            </li>
            <li>
              <span className="font-semibold">No attribution:</span> discount code posted doesn’t match the code used at checkout.
            </li>
            <li>
              <span className="font-semibold">Not appearing in dashboard:</span> check the Journey timeline and then run{" "}
              <Link href="/status" className="underline font-semibold text-slate-700 hover:text-slate-900">
                /status
              </Link>
              .
            </li>
          </ul>
        </Card>
      </div>

      <Card className="mt-6 p-6 rounded-2xl border border-slate-200 bg-white">
        <h2 className="text-lg font-bold text-slate-900">Testing checkpoints (do these in order)</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-700">
          <li>Create a test ambassador, copy their discount code.</li>
          <li>Run a test transaction that uses that discount code (or simulate one in your backend).</li>
          <li>POST to <code className="font-mono">/api/discount-codes/redeem</code> from your server and confirm a 200 response.</li>
          <li>Confirm the conversion appears in the dashboard and attributes to the correct ambassador.</li>
        </ol>
      </Card>
    </div>
  );
}

