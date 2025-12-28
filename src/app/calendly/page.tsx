import Link from "next/link";
import { Calendar, ExternalLink, ShieldCheck, Wrench } from "lucide-react";

import { Card } from "@/components/ui/card";

export const metadata = {
  title: "Calendly Integration | Refer Labs",
  description:
    "Capture booking conversions from Calendly by collecting the ambassador discount code and posting confirmed bookings to Refer Labs via Zapier/Make or your backend.",
};

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 text-xs font-mono leading-relaxed text-slate-800 overflow-auto">
      {children}
    </pre>
  );
}

export default function CalendlyGuidePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
            <Calendar className="h-4 w-4" />
            Calendly setup
          </div>
          <h1 className="mt-4 text-3xl font-black text-slate-900">Calendly (bookings)</h1>
          <p className="mt-2 text-slate-600">
            Track referral conversions for service bookings by collecting the ambassador’s discount code and posting confirmed bookings to Refer Labs.
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
              <h2 className="text-lg font-bold text-slate-900">Step 1 — Add a booking question for the code</h2>
              <p className="mt-2 text-sm text-slate-600">
                Add a required question like “Referral / discount code” so the customer can enter the ambassador’s code.
              </p>
              <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-700">
                <li>Calendly → Event Type → Edit.</li>
                <li>Questions → Add a question (short answer).</li>
                <li>Name it “Discount code” or “Referral code” and mark it required.</li>
              </ol>
              <p className="mt-4 text-xs text-slate-500">
                This value is what you’ll post to Refer Labs to credit the correct ambassador.
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
              <h2 className="text-lg font-bold text-slate-900">Step 2 — Post confirmed bookings as conversions</h2>
              <p className="mt-2 text-sm text-slate-600">
                Use Zapier/Make to trigger on “Invitee Created” and then POST to Refer Labs with the collected code.
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
  "discountCode": "CODE_FROM_BOOKING_QUESTION",
  "orderReference": "CALENDLY-INVITEE-UUID",
  "amount": "0.00",
  "metadata": {
    "platform": "calendly",
    "eventType": "Initial consult"
  }
}`}</CodeBlock>
              <p className="mt-3 text-xs text-slate-500">
                If you collect payment later (invoice/Stripe/Square), you can post the paid amount then instead.
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card className="p-6 rounded-2xl border border-slate-200 bg-white">
          <h2 className="text-lg font-bold text-slate-900">Recommended conversion definition</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
            <li>
              <span className="font-semibold">Booking conversion:</span> invitee confirmed (use amount 0.00)
            </li>
            <li>
              <span className="font-semibold">Revenue conversion:</span> invoice paid / payment succeeded (use the paid amount)
            </li>
          </ul>
          <p className="mt-4 text-xs text-slate-500">
            You can track both by posting at booking time and again at payment time (use different <code className="font-mono">orderReference</code> values).
          </p>
        </Card>

        <Card className="p-6 rounded-2xl border border-slate-200 bg-white">
          <h2 className="text-lg font-bold text-slate-900">Testing checkpoints (do these in order)</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-700">
            <li>Create a test ambassador in Refer Labs and copy their discount code.</li>
            <li>Book a test appointment entering that code into your Calendly question.</li>
            <li>Confirm your automation posts the conversion to Refer Labs (HTTP 200).</li>
            <li>Confirm the conversion appears in the dashboard attributed to the correct ambassador.</li>
            <li>If anything doesn’t appear, run <Link href="/status" className="underline font-semibold text-slate-700 hover:text-slate-900">/status</Link>.</li>
          </ol>
        </Card>
      </div>
    </div>
  );
}

