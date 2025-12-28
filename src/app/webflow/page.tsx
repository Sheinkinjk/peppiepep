import Link from "next/link";
import { ExternalLink, Globe, LayoutTemplate, ShieldCheck, Wrench } from "lucide-react";

import { Card } from "@/components/ui/card";

export const metadata = {
  title: "Webflow Integration | Refer Labs",
  description:
    "Embed Refer Labs referral pages in Webflow and validate attribution step-by-step. Includes recommended testing checkpoints and troubleshooting.",
};

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 text-xs font-mono leading-relaxed text-slate-800 overflow-auto">
      {children}
    </pre>
  );
}

export default function WebflowGuidePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
            <LayoutTemplate className="h-4 w-4" />
            Webflow setup
          </div>
          <h1 className="mt-4 text-3xl font-black text-slate-900">Webflow (embed referral pages)</h1>
          <p className="mt-2 text-slate-600">
            Add a referral landing page to Webflow using an Embed block and verify tracking end-to-end before launch.
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
                Create a dedicated “Referrals” page in Webflow and drop the iframe into an Embed block.
              </p>
              <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-700">
                <li>Webflow Designer → Pages → create/select a page.</li>
                <li>Add element: <span className="font-semibold">Embed</span>.</li>
                <li>Paste the iframe and publish.</li>
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
              <h2 className="text-lg font-bold text-slate-900">Step 2 — Confirm conversion capture strategy</h2>
              <p className="mt-2 text-sm text-slate-600">
                The referral page handles clicks + signups. Conversions are credited when your checkout reports discount code redemption.
              </p>
              <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                Webflow sites typically capture conversions via Stripe, Webflow Ecommerce, or a booking tool. Use the matching integration guide
                (Stripe / Zapier / Make / Custom API) to post redemptions reliably.
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link
                  href="/stripe"
                  className="rounded-xl bg-slate-900 px-3 py-2 text-xs font-bold text-white hover:bg-slate-800"
                >
                  Stripe guide
                </Link>
                <Link
                  href="/zapier"
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-800 hover:bg-slate-50"
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
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card className="p-6 rounded-2xl border border-slate-200 bg-white">
          <h2 className="text-lg font-bold text-slate-900">Common troubleshooting</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
            <li>
              <span className="font-semibold">Embed looks cut off:</span> increase iframe height (e.g. 720–900) and ensure the parent section has no fixed height.
            </li>
            <li>
              <span className="font-semibold">Blank embed:</span> confirm the page is published on HTTPS and no embed restrictions are applied.
            </li>
            <li>
              <span className="font-semibold">Conversions missing:</span> confirm your checkout is posting discount redemptions to Refer Labs.
            </li>
          </ul>
          <p className="mt-4 text-xs text-slate-500">
            Run live diagnostics on{" "}
            <Link href="/status" className="underline font-semibold text-slate-700 hover:text-slate-900">
              /status
            </Link>
            .
          </p>
        </Card>

        <Card className="p-6 rounded-2xl border border-slate-200 bg-white">
          <h2 className="text-lg font-bold text-slate-900">Testing checkpoints (do these in order)</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-700">
            <li>Embed the referral iframe on a published Webflow page using a real ambassador code.</li>
            <li>Open the page in an incognito window and confirm the referral page loads.</li>
            <li>Submit the referral form and confirm the signup appears in the dashboard (Journey timeline).</li>
            <li>Complete a test conversion in your checkout tool using the ambassador’s discount code.</li>
            <li>Confirm the conversion appears in the dashboard and attributes to the correct ambassador.</li>
          </ol>
        </Card>
      </div>
    </div>
  );
}

