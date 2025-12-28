import Link from "next/link";
import Image from "next/image";
import { ExternalLink, ShieldCheck, ShoppingBag, Wrench } from "lucide-react";

import { Card } from "@/components/ui/card";

export const metadata = {
  title: "Shopify Integration | Refer Labs",
  description: "Embed Refer Labs referral pages on Shopify and capture conversions with discount code tracking. Includes testing checkpoints.",
};

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 text-xs font-mono leading-relaxed text-slate-800 overflow-auto">
      {children}
    </pre>
  );
}

export default function ShopifyGuidePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
            <ShoppingBag className="h-4 w-4" />
            Shopify setup
          </div>
          <h1 className="mt-4 text-3xl font-black text-slate-900">
            Shopify integration (embed + conversion capture)
          </h1>
          <p className="mt-2 text-slate-600">
            Add your referral page to Shopify and verify tracking step-by-step as you onboard.
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
              <h2 className="text-lg font-bold text-slate-900">Step 1 — Embed the referral page</h2>
              <p className="mt-2 text-sm text-slate-600">
                Add a dedicated page (recommended) or embed in an existing landing page.
              </p>
              <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-700">
                <li>Shopify Admin → Online Store → Themes → Customize</li>
                <li>Open the page/template you want to embed in</li>
                <li>Add block: <span className="font-semibold">Custom liquid</span></li>
                <li>Paste the iframe snippet and save</li>
              </ol>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <p className="text-sm font-semibold text-slate-800">Iframe embed (use a test code first)</p>
            <CodeBlock>{`<iframe
  src="https://referlabs.com.au/r/AMBCODE?embed=1"
  title="Referral reward"
  style="width:100%;min-height:720px;border:none;border-radius:24px;overflow:hidden;"
></iframe>`}</CodeBlock>
            <p className="text-xs text-slate-500">
              Replace <code className="font-mono">AMBCODE</code> with a real ambassador referral code to test, then automate how you render each customer’s code.
            </p>
          </div>
        </Card>

        <Card className="p-6 rounded-2xl border border-slate-200 bg-white">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-amber-600 p-2">
              <Wrench className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Step 2 — Capture conversions</h2>
              <p className="mt-2 text-sm text-slate-600">
                Conversions appear in your dashboard when you report discount code usage to Refer Labs.
              </p>
              <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                Use the Discount Capture Secret from your dashboard (Program Settings). Never expose it publicly outside trusted Shopify surfaces.
              </div>
              <p className="mt-3 text-xs text-slate-500">
                If your store uses Checkout Extensibility (no order status scripts), follow{" "}
                <Link href="/shopify/checkout-extensibility" className="underline font-semibold text-slate-700 hover:text-slate-900">
                  /shopify/checkout-extensibility
                </Link>
                .
              </p>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <p className="text-sm font-semibold text-slate-800">Option A — Order status page script (legacy)</p>
            <p className="text-xs text-slate-600">
              Works on stores that still allow additional scripts. If your store uses Checkout Extensibility, use Option B.
            </p>
            <CodeBlock>{`{% if checkout.discount_code %}
<script>
fetch("https://referlabs.com.au/api/discount-codes/redeem", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-pepf-discount-secret": "<ADD_SECRET>"
  },
  body: JSON.stringify({
    discountCode: "{{ checkout.discount_code.code }}",
    orderReference: "{{ order.name }}",
    amount: {{ order.total_price | json }},
    metadata: { email: "{{ checkout.email }}", platform: "shopify" }
  })
});
</script>
{% endif %}`}</CodeBlock>
            <p className="text-xs text-slate-500">
              Replace <code className="font-mono">&lt;ADD_SECRET&gt;</code> with your Discount Capture Secret.
            </p>
          </div>

          <div className="mt-4 space-y-2">
            <p className="text-sm font-semibold text-slate-800">Option B — Shopify webhooks (recommended)</p>
            <p className="text-xs text-slate-600">
              Trigger a webhook on “Order paid/fulfilled” to your server, then call the same Refer Labs endpoint from your server using the secret.
            </p>
            <CodeBlock>{`POST https://referlabs.com.au/api/discount-codes/redeem
Headers:
  Content-Type: application/json
  x-pepf-discount-secret: <ADD_SECRET>
Body:
{
  "discountCode": "CODE_FROM_ORDER",
  "orderReference": "ORDER-12345",
  "amount": "199.00",
  "metadata": { "platform": "shopify" }
}`}</CodeBlock>
          </div>
        </Card>
      </div>

      <Card className="mt-6 p-6 rounded-2xl border border-slate-200 bg-white">
        <h2 className="text-lg font-bold text-slate-900">Testing checkpoints (do these in order)</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-700">
          <li>Create a test ambassador in the dashboard (Quick Add) and copy their referral code + discount code.</li>
          <li>Open your Shopify page in an incognito window using <code className="font-mono">/r/AMBCODE</code> and confirm the page loads.</li>
          <li>Submit the referral form and confirm the signup appears in the dashboard (Journey timeline).</li>
          <li>Place a test order using the discount code and confirm the redemption appears in the dashboard (with the correct ambassador attribution).</li>
          <li>Re-run the <Link href="/status" className="underline font-semibold text-slate-700 hover:text-slate-900">Status page</Link> checks if anything doesn’t appear.</li>
        </ol>
      </Card>

      <Card className="mt-6 p-6 rounded-2xl border border-slate-200 bg-white">
        <h2 className="text-lg font-bold text-slate-900">Preview</h2>
        <p className="mt-2 text-sm text-slate-600">
          Example of embedding the referral iframe inside Shopify’s theme editor.
        </p>
        <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
          <Image
            src="/shopify-integration-preview.svg"
            alt="Shopify integration preview"
            width={1200}
            height={720}
            className="w-full h-auto"
            priority
          />
        </div>
      </Card>
    </div>
  );
}
