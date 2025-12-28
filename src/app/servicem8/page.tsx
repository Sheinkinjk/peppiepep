import Link from "next/link";
import { ExternalLink, ShieldCheck, Truck, Wrench } from "lucide-react";

import { Card } from "@/components/ui/card";

export const metadata = {
  title: "ServiceM8 Integration | Refer Labs",
  description:
    "Capture job conversions from ServiceM8 by collecting the ambassador discount code and posting completed jobs/invoices to Refer Labs for attribution.",
};

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 text-xs font-mono leading-relaxed text-slate-800 overflow-auto">
      {children}
    </pre>
  );
}

export default function ServiceM8GuidePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
            <Truck className="h-4 w-4" />
            ServiceM8 setup
          </div>
          <h1 className="mt-4 text-3xl font-black text-slate-900">ServiceM8 (field service)</h1>
          <p className="mt-2 text-slate-600">
            Track referral-driven jobs by capturing the ambassador’s discount/referral code and posting completed jobs or paid invoices to Refer Labs.
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
              <h2 className="text-lg font-bold text-slate-900">Step 1 — Store the code on each job</h2>
              <p className="mt-2 text-sm text-slate-600">
                Add a consistent place for staff to record the ambassador code (custom field, job note, or invoice reference).
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
                <li>
                  <span className="font-semibold">Recommended:</span> a custom field “Discount code” on the job.
                </li>
                <li>
                  <span className="font-semibold">Alternative:</span> record it in job notes and extract it in your automation.
                </li>
              </ul>
              <p className="mt-4 text-xs text-slate-500">
                The value you post must match the ambassador discount code exactly for attribution.
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
              <h2 className="text-lg font-bold text-slate-900">Step 2 — Post completed jobs/invoices to Refer Labs</h2>
              <p className="mt-2 text-sm text-slate-600">
                Use Zapier/Make (or your backend) to trigger on job completion or invoice paid, then POST to Refer Labs.
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
  "discountCode": "CODE_FROM_JOB_FIELD",
  "orderReference": "SERVICEM8-JOB-ID",
  "amount": "199.00",
  "metadata": { "platform": "servicem8" }
}`}</CodeBlock>
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card className="p-6 rounded-2xl border border-slate-200 bg-white">
          <h2 className="text-lg font-bold text-slate-900">Recommended triggers</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
            <li>Job completed</li>
            <li>Invoice issued (if you want “lead → job” attribution)</li>
            <li>Invoice paid (recommended for revenue-based rewards)</li>
          </ul>
          <p className="mt-4 text-xs text-slate-500">
            If you trigger on invoice paid, set <code className="font-mono">amount</code> to the paid total.
          </p>
        </Card>

        <Card className="p-6 rounded-2xl border border-slate-200 bg-white">
          <h2 className="text-lg font-bold text-slate-900">Testing checkpoints (do these in order)</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-700">
            <li>Create a test ambassador and copy their discount code.</li>
            <li>Create a test job and set the discount/referral code field to that value.</li>
            <li>Mark the job completed (or pay the invoice) to trigger your automation.</li>
            <li>Confirm the webhook POST returns 200.</li>
            <li>Confirm the conversion appears in the dashboard attributed to the correct ambassador.</li>
          </ol>
        </Card>
      </div>
    </div>
  );
}

