import Link from "next/link";
import { ExternalLink, Globe, ShieldCheck, Sparkles, Wrench } from "lucide-react";

import { Card } from "@/components/ui/card";

export const metadata = {
  title: "Wix Integration | Refer Labs",
  description:
    "Embed Refer Labs referral pages on Wix and capture conversions via server-side automation (Velo, Zapier/Make, or your backend). Includes testing checkpoints.",
};

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 text-xs font-mono leading-relaxed text-slate-800 overflow-auto">
      {children}
    </pre>
  );
}

export default function WixGuidePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
            <Sparkles className="h-4 w-4" />
            Wix setup
          </div>
          <h1 className="mt-4 text-3xl font-black text-slate-900">Wix (embed + automation)</h1>
          <p className="mt-2 text-slate-600">
            Embed the referral page on Wix and report conversions from Wix Automations/Velo (or Zapier/Make) for reliable attribution.
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
                Add an HTML iframe embed to a Wix page (recommended: a dedicated “Referrals” page).
              </p>
              <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-700">
                <li>Wix Editor → Add Elements → Embed Code → Embed HTML.</li>
                <li>Paste the iframe and adjust height.</li>
                <li>Publish.</li>
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
              <h2 className="text-lg font-bold text-slate-900">Step 2 — Capture conversions (recommended: server-side)</h2>
              <p className="mt-2 text-sm text-slate-600">
                When an order is paid/confirmed, post the discount code redemption to Refer Labs from a trusted server context.
              </p>
              <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                If you use Wix + Velo, call the endpoint from backend code. Otherwise, use Zapier/Make.
              </div>
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
  "discountCode": "CODE_USED_AT_CHECKOUT",
  "orderReference": "ORDER-12345",
  "amount": "199.00",
  "metadata": { "platform": "wix" }
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
              <span className="font-semibold">Embed spacing:</span> adjust the iframe height and ensure it’s not inside a fixed-height container.
            </li>
            <li>
              <span className="font-semibold">Missing discount code:</span> confirm your checkout actually exposes the code in the order record/automation trigger.
            </li>
            <li>
              <span className="font-semibold">401 from conversion endpoint:</span> secret header missing/incorrect.
            </li>
          </ul>
          <p className="mt-4 text-xs text-slate-500">
            Run diagnostics via{" "}
            <Link href="/status" className="underline font-semibold text-slate-700 hover:text-slate-900">
              /status
            </Link>
            .
          </p>
        </Card>

        <Card className="p-6 rounded-2xl border border-slate-200 bg-white">
          <h2 className="text-lg font-bold text-slate-900">Testing checkpoints (do these in order)</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-700">
            <li>Embed the referral iframe on a published Wix page.</li>
            <li>Open the page in an incognito window and confirm the referral page loads.</li>
            <li>Submit the referral form and confirm the signup appears in the dashboard.</li>
            <li>Complete a test order with the ambassador discount code (or simulate one via automation).</li>
            <li>Confirm the conversion appears in the dashboard and attributes correctly.</li>
          </ol>
        </Card>
      </div>
    </div>
  );
}

