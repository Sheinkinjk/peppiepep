import Link from "next/link";
import { ExternalLink, ShieldCheck, Store, Wrench } from "lucide-react";

import { Card } from "@/components/ui/card";

export const metadata = {
  title: "Square POS Integration | Refer Labs",
  description:
    "Capture in-person and invoice conversions from Square and post discount code redemptions to Refer Labs for reliable ambassador attribution.",
};

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 text-xs font-mono leading-relaxed text-slate-800 overflow-auto">
      {children}
    </pre>
  );
}

export default function SquareGuidePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
            <Store className="h-4 w-4" />
            Square setup
          </div>
          <h1 className="mt-4 text-3xl font-black text-slate-900">Square POS (in-person + invoices)</h1>
          <p className="mt-2 text-slate-600">
            Log referral conversions from Square by posting discount code redemption data to Refer Labs the moment a payment is completed.
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
              <h2 className="text-lg font-bold text-slate-900">Step 1 — Standardize how staff captures the code</h2>
              <p className="mt-2 text-sm text-slate-600">
                Pick one consistent place to enter the ambassador’s discount code during checkout so it’s available to automations.
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
                <li>
                  <span className="font-semibold">Best:</span> apply a Square discount/promo code that matches the ambassador discount code.
                </li>
                <li>
                  <span className="font-semibold">Alternative:</span> store it as an order note / custom field and fetch it via API in your automation.
                </li>
              </ul>
              <p className="mt-4 text-xs text-slate-500">
                Attribution depends on the exact discount code value that you post to Refer Labs.
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
              <h2 className="text-lg font-bold text-slate-900">Step 2 — Post completed payments to Refer Labs</h2>
              <p className="mt-2 text-sm text-slate-600">
                When Square confirms payment, call the discount capture endpoint from a trusted automation (Zapier/Make) or your server.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link
                  href="/zapier"
                  className="rounded-xl bg-slate-900 px-3 py-2 text-xs font-bold text-white hover:bg-slate-800"
                >
                  Zapier
                </Link>
                <Link
                  href="/make"
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-800 hover:bg-slate-50"
                >
                  Make
                </Link>
                <Link
                  href="/api-guide"
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-800 hover:bg-slate-50"
                >
                  Custom API
                </Link>
              </div>

              <p className="mt-4 text-sm font-semibold text-slate-800">Conversion endpoint</p>
              <CodeBlock>{`POST https://referlabs.com.au/api/discount-codes/redeem
Headers:
  Content-Type: application/json
  x-pepf-discount-secret: <YOUR_SECRET>
Body:
{
  "discountCode": "CODE_FROM_SQUARE",
  "orderReference": "SQUARE-PAYMENT-ID",
  "amount": "199.00",
  "metadata": { "platform": "square" }
}`}</CodeBlock>
              <p className="mt-3 text-xs text-slate-500">
                Don’t store the secret in client-side Wix/Webflow/etc scripts. Keep it in Zapier/Make or a backend.
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card className="p-6 rounded-2xl border border-slate-200 bg-white">
          <h2 className="text-lg font-bold text-slate-900">Recommended triggers</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
            <li>Payment completed/paid</li>
            <li>Invoice paid</li>
            <li>Order completed (if you use Square online orders)</li>
          </ul>
          <p className="mt-4 text-xs text-slate-500">
            If your trigger fires before the code is available, add a follow-up step to fetch the payment/order details from Square and
            extract the discount code.
          </p>
        </Card>

        <Card className="p-6 rounded-2xl border border-slate-200 bg-white">
          <h2 className="text-lg font-bold text-slate-900">Testing checkpoints (do these in order)</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-700">
            <li>Create a test ambassador in Refer Labs and copy their discount code.</li>
            <li>Run a $1 test transaction in Square applying that discount code.</li>
            <li>Confirm your automation posts the conversion to Refer Labs (HTTP 200).</li>
            <li>Confirm the conversion appears in the Refer Labs dashboard and attributes to the correct ambassador.</li>
            <li>If anything doesn’t appear, run <Link href="/status" className="underline font-semibold text-slate-700 hover:text-slate-900">/status</Link>.</li>
          </ol>
        </Card>
      </div>

      <Card className="mt-6 p-6 rounded-2xl border border-slate-200 bg-white">
        <h2 className="text-lg font-bold text-slate-900">Common troubleshooting</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
          <li>
            <span className="font-semibold">No attribution:</span> make sure the posted <code className="font-mono">discountCode</code> matches the ambassador’s code exactly.
          </li>
          <li>
            <span className="font-semibold">Duplicate conversions:</span> ensure your trigger only fires once per payment id; use a stable <code className="font-mono">orderReference</code>.
          </li>
          <li>
            <span className="font-semibold">401:</span> secret header missing/wrong.
          </li>
        </ul>
      </Card>
    </div>
  );
}

