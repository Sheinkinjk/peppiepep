import Link from "next/link";
import { ExternalLink, ShieldCheck, Wrench, Zap } from "lucide-react";

import { Card } from "@/components/ui/card";

export const metadata = {
  title: "Zapier Integration | Refer Labs",
  description:
    "Send conversions and referral events into Refer Labs using Zapier Webhooks. Includes a step-by-step testing checklist and troubleshooting.",
};

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 text-xs font-mono leading-relaxed text-slate-800 overflow-auto">
      {children}
    </pre>
  );
}

export default function ZapierGuidePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
            <Zap className="h-4 w-4" />
            Zapier setup
          </div>
          <h1 className="mt-4 text-3xl font-black text-slate-900">Zapier (no-code automation)</h1>
          <p className="mt-2 text-slate-600">
            Use Zapier to report conversions to Refer Labs when payments, bookings, or CRM stages happen in other tools.
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
              <h2 className="text-lg font-bold text-slate-900">Step 1 — Pick your conversion trigger</h2>
              <p className="mt-2 text-sm text-slate-600">
                Your Zap should fire when you are confident a conversion happened (payment succeeded, booking confirmed, deal won).
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
                <li>Stripe: “Checkout Session Completed” or “Payment Intent Succeeded”</li>
                <li>Calendly/booking: “Invitee Created” or “Appointment Confirmed”</li>
                <li>HubSpot: “Deal stage changed” (won)</li>
                <li>Shopify: “Order paid” (if you’re not using webhooks already)</li>
              </ul>
              <p className="mt-4 text-xs text-slate-500">
                If you already have native integrations (Shopify/Stripe webhooks), prefer those first for reliability; use Zapier for
                long-tail tools.
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
              <h2 className="text-lg font-bold text-slate-900">Step 2 — Post the conversion to Refer Labs</h2>
              <p className="mt-2 text-sm text-slate-600">
                Add an action: <span className="font-semibold">Webhooks by Zapier → Custom Request</span>.
              </p>
              <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                Keep your Discount Capture Secret private. Don’t place it in public-facing pages or client-side scripts.
              </div>
              <p className="mt-4 text-sm font-semibold text-slate-800">Request template</p>
              <CodeBlock>{`Method: POST
URL: https://referlabs.com.au/api/discount-codes/redeem
Headers:
  Content-Type: application/json
  x-pepf-discount-secret: <YOUR_SECRET>
Data:
  discountCode: <DISCOUNT_CODE_FROM_TRIGGER>
  orderReference: <ORDER_ID_OR_BOOKING_ID>
  amount: <AMOUNT>
  metadata:
    platform: "zapier"
    source: <APP_NAME>`}</CodeBlock>
              <p className="mt-3 text-xs text-slate-500">
                You can also use <code className="font-mono">x-referlabs-discount-secret</code>; both are accepted.
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card className="p-6 rounded-2xl border border-slate-200 bg-white">
          <h2 className="text-lg font-bold text-slate-900">How attribution works (quick mental model)</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-700">
            <li>Ambassador shares their unique referral link (clicks tracked automatically).</li>
            <li>The referral link leads to your referral page where a customer signs up.</li>
            <li>When your system redeems the ambassador’s discount code, Refer Labs credits the right ambassador.</li>
          </ol>
          <p className="mt-4 text-xs text-slate-500">
            The Zapier step is the final “conversion signal”. The discount code is the key used for reliable attribution.
          </p>
        </Card>

        <Card className="p-6 rounded-2xl border border-slate-200 bg-white">
          <h2 className="text-lg font-bold text-slate-900">Common troubleshooting</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
            <li>
              <span className="font-semibold">401/unauthorized:</span> secret header is missing/wrong (check Program Settings).
            </li>
            <li>
              <span className="font-semibold">Conversion not attributed:</span> confirm the trigger contains the exact discount code used by the ambassador.
            </li>
            <li>
              <span className="font-semibold">Duplicates:</span> set Zapier to only fire once per order id (or include a stable{" "}
              <code className="font-mono">orderReference</code> you can de-duplicate on your side).
            </li>
          </ul>
          <p className="mt-4 text-xs text-slate-500">
            Use{" "}
            <Link href="/status" className="underline font-semibold text-slate-700 hover:text-slate-900">
              /status
            </Link>{" "}
            to verify the endpoint is reachable and your environment is configured.
          </p>
        </Card>
      </div>

      <Card className="mt-6 p-6 rounded-2xl border border-slate-200 bg-white">
        <h2 className="text-lg font-bold text-slate-900">Testing checkpoints (do these in order)</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-700">
          <li>Create a test ambassador in Refer Labs and copy their discount code + referral link.</li>
          <li>Use the referral link in an incognito window, submit the referral form, and confirm the signup shows in the dashboard.</li>
          <li>Run the conversion flow in your external tool so the Zap trigger fires with the discount code.</li>
          <li>Confirm the Zap Webhook step receives a 200 response.</li>
          <li>Confirm the conversion appears in the Refer Labs dashboard and attributes to the correct ambassador.</li>
        </ol>
      </Card>
    </div>
  );
}

