import Link from "next/link";
import { ExternalLink, ShieldCheck, Wrench, Workflow } from "lucide-react";

import { Card } from "@/components/ui/card";

export const metadata = {
  title: "Make (Integromat) Integration | Refer Labs",
  description:
    "Report conversions and referral events to Refer Labs using Make webhooks/HTTP modules. Includes field mapping and an end-to-end test checklist.",
};

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 text-xs font-mono leading-relaxed text-slate-800 overflow-auto">
      {children}
    </pre>
  );
}

export default function MakeGuidePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
            <Workflow className="h-4 w-4" />
            Make setup
          </div>
          <h1 className="mt-4 text-3xl font-black text-slate-900">Make (Integromat)</h1>
          <p className="mt-2 text-slate-600">
            Use Make to post conversion signals to Refer Labs from tools that don’t have a native integration.
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
              <h2 className="text-lg font-bold text-slate-900">Step 1 — Choose the right trigger</h2>
              <p className="mt-2 text-sm text-slate-600">
                Fire the scenario at the moment you consider a conversion final (paid, confirmed, completed).
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
                <li>Payments: successful payment / invoice paid / subscription created</li>
                <li>Bookings: appointment confirmed / attendee created</li>
                <li>CRM: deal won / lifecycle stage moved to customer</li>
              </ul>
            </div>
          </div>
        </Card>

        <Card className="p-6 rounded-2xl border border-slate-200 bg-white">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-amber-600 p-2">
              <Wrench className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Step 2 — Add an HTTP module</h2>
              <p className="mt-2 text-sm text-slate-600">
                Use <span className="font-semibold">HTTP → Make a request</span> and send the conversion to Refer Labs.
              </p>
              <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                Never expose your Discount Capture Secret in public pages. Use it only in trusted server/automation contexts.
              </div>
              <p className="mt-4 text-sm font-semibold text-slate-800">HTTP request template</p>
              <CodeBlock>{`Method: POST
URL: https://referlabs.com.au/api/discount-codes/redeem
Headers:
  Content-Type: application/json
  x-pepf-discount-secret: <YOUR_SECRET>
Body (JSON):
{
  "discountCode": "CODE_FROM_TRIGGER",
  "orderReference": "ORDER-12345",
  "amount": "199.00",
  "metadata": { "platform": "make" }
}`}</CodeBlock>
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card className="p-6 rounded-2xl border border-slate-200 bg-white">
          <h2 className="text-lg font-bold text-slate-900">Recommended mappings</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
            <li>
              <span className="font-semibold">discountCode:</span> the exact discount code used at checkout
            </li>
            <li>
              <span className="font-semibold">orderReference:</span> stable id you can trace (order id, booking id, invoice id)
            </li>
            <li>
              <span className="font-semibold">amount:</span> number or numeric string (e.g. <code className="font-mono">199.00</code>)
            </li>
          </ul>
          <p className="mt-4 text-xs text-slate-500">
            If you can’t access the discount code in the trigger, add a step earlier in the scenario to fetch it (e.g. get order, get
            invoice, lookup custom field).
          </p>
        </Card>

        <Card className="p-6 rounded-2xl border border-slate-200 bg-white">
          <h2 className="text-lg font-bold text-slate-900">Common troubleshooting</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
            <li>
              <span className="font-semibold">401:</span> secret header missing/incorrect.
            </li>
            <li>
              <span className="font-semibold">No dashboard event:</span> confirm Make is actually running the scenario and not stuck on “Run once”.
            </li>
            <li>
              <span className="font-semibold">Double credits:</span> add a filter to prevent duplicate runs, or ensure your trigger is idempotent.
            </li>
          </ul>
          <p className="mt-4 text-xs text-slate-500">
            For a more controlled integration (retries, idempotency), use{" "}
            <Link href="/api-guide" className="underline font-semibold text-slate-700 hover:text-slate-900">
              the Custom API guide
            </Link>
            .
          </p>
        </Card>
      </div>

      <Card className="mt-6 p-6 rounded-2xl border border-slate-200 bg-white">
        <h2 className="text-lg font-bold text-slate-900">Testing checkpoints (do these in order)</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-700">
          <li>Create a test ambassador and copy their discount code.</li>
          <li>Complete a test conversion in your external tool so the scenario triggers with that discount code.</li>
          <li>Confirm the HTTP module returns 200.</li>
          <li>Confirm the conversion appears in the Refer Labs dashboard and attributes to the correct ambassador.</li>
        </ol>
      </Card>
    </div>
  );
}

