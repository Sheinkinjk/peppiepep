import Link from "next/link";
import { ExternalLink, Globe, ShieldCheck, Square, Wrench } from "lucide-react";

import { Card } from "@/components/ui/card";

export const metadata = {
  title: "Squarespace Integration | Refer Labs",
  description:
    "Embed Refer Labs referral pages in Squarespace using a Code block. Includes a step-by-step testing checklist and conversion capture options.",
};

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 text-xs font-mono leading-relaxed text-slate-800 overflow-auto">
      {children}
    </pre>
  );
}

export default function SquarespaceGuidePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
            <Square className="h-4 w-4" />
            Squarespace setup
          </div>
          <h1 className="mt-4 text-3xl font-black text-slate-900">Squarespace (embed referral pages)</h1>
          <p className="mt-2 text-slate-600">
            Add a referral page to Squarespace with a Code block and verify tracking end-to-end before inviting ambassadors.
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
              <Globe className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Step 1 — Embed the referral page</h2>
              <p className="mt-2 text-sm text-slate-600">
                Create a “Referrals” page and embed the iframe using a Code block (or Code Injection on a page section).
              </p>
              <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-700">
                <li>Squarespace → Pages → add a new page.</li>
                <li>Edit page → Add block → <span className="font-semibold">Code</span>.</li>
                <li>Paste the iframe and save.</li>
              </ol>
              <p className="mt-4 text-sm font-semibold text-slate-800">Iframe embed</p>
              <CodeBlock>{`<iframe
  src="https://referlabs.com.au/r/AMBCODE?embed=1"
  title="Referral reward"
  style="width:100%;min-height:720px;border:none;border-radius:24px;overflow:hidden;"
></iframe>`}</CodeBlock>
              <p className="mt-3 text-xs text-slate-500">
                Replace <code className="font-mono">AMBCODE</code> with a real ambassador code to test.
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6 rounded-2xl border border-slate-200 bg-white">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-amber-600 p-2">
              <ShieldCheck className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Step 2 — Decide how conversions are captured</h2>
              <p className="mt-2 text-sm text-slate-600">
                Refer Labs attributes conversions when discount code redemptions are posted from your checkout/payment system.
              </p>
              <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                If your Squarespace checkout can’t call server-side webhooks reliably, use Zapier/Make (or your backend) to post conversions.
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link
                  href="/zapier"
                  className="rounded-xl bg-slate-900 px-3 py-2 text-xs font-bold text-white hover:bg-slate-800"
                >
                  Zapier guide
                </Link>
                <Link
                  href="/make"
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-800 hover:bg-slate-50"
                >
                  Make guide
                </Link>
                <Link
                  href="/api-guide"
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-800 hover:bg-slate-50"
                >
                  Custom API
                </Link>
              </div>
              <p className="mt-4 text-sm font-semibold text-slate-800">Conversion endpoint (server/automation)</p>
              <CodeBlock>{`POST https://referlabs.com.au/api/discount-codes/redeem
Headers:
  Content-Type: application/json
  x-pepf-discount-secret: <YOUR_SECRET>
Body:
{
  "discountCode": "CODE_USED_AT_CHECKOUT",
  "orderReference": "ORDER-12345",
  "amount": "199.00",
  "metadata": { "platform": "squarespace" }
}`}</CodeBlock>
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card className="p-6 rounded-2xl border border-slate-200 bg-white">
          <h2 className="text-lg font-bold text-slate-900">Common troubleshooting</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
            <li>
              <span className="font-semibold">Iframe blocked:</span> confirm your site is HTTPS and your plan/settings allow embedded iframes.
            </li>
            <li>
              <span className="font-semibold">Layout issues:</span> increase iframe height and avoid placing it inside a narrow column.
            </li>
            <li>
              <span className="font-semibold">Conversions not showing:</span> verify your conversion automation is posting the discount code redemption.
            </li>
          </ul>
          <p className="mt-4 text-xs text-slate-500">
            Use{" "}
            <Link href="/status" className="underline font-semibold text-slate-700 hover:text-slate-900">
              /status
            </Link>{" "}
            for quick diagnostics.
          </p>
        </Card>

        <Card className="p-6 rounded-2xl border border-slate-200 bg-white">
          <h2 className="text-lg font-bold text-slate-900">Testing checkpoints (do these in order)</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-700">
            <li>Embed the referral iframe on a published Squarespace page.</li>
            <li>Open it in an incognito window and confirm the referral page loads.</li>
            <li>Submit the referral form and confirm the signup appears in the dashboard.</li>
            <li>Run a test purchase/booking with the ambassador discount code.</li>
            <li>Confirm the conversion is posted and attributed correctly in the dashboard.</li>
          </ol>
        </Card>
      </div>
    </div>
  );
}

