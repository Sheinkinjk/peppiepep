import Link from "next/link";
import { ExternalLink, ShieldCheck, ShoppingBag, Wrench } from "lucide-react";

import { Card } from "@/components/ui/card";

export const metadata = {
  title: "Shopify Checkout Extensibility | Refer Labs",
  description:
    "Modern Shopify conversion tracking using webhooks + a server (compatible with Checkout Extensibility). Includes testing checkpoints.",
};

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 text-xs font-mono leading-relaxed text-slate-800 overflow-auto">
      {children}
    </pre>
  );
}

export default function ShopifyCheckoutExtensibilityGuidePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
            <ShoppingBag className="h-4 w-4" />
            Shopify checkout
          </div>
          <h1 className="mt-4 text-3xl font-black text-slate-900">
            Shopify Checkout Extensibility tracking
          </h1>
          <p className="mt-2 text-slate-600">
            If your Shopify plan/theme no longer supports “Additional scripts”, use webhooks + a server to report conversions reliably.
          </p>
        </div>

        <Link
          href="/shopify"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-800 hover:bg-slate-50"
        >
          <ExternalLink className="h-4 w-4" />
          Back to Shopify guide
        </Link>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card className="p-6 rounded-2xl border border-slate-200 bg-white">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-slate-900 p-2">
              <ShieldCheck className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">What changes with Checkout Extensibility</h2>
              <p className="mt-2 text-sm text-slate-600">
                Many stores can’t run custom JavaScript on the order status page anymore. The reliable path is:
              </p>
              <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-700">
                <li>Shopify triggers an order webhook (paid/fulfilled).</li>
                <li>Your server receives the webhook and extracts the discount/coupon code and order details.</li>
                <li>Your server calls Refer Labs to credit the ambassador.</li>
              </ol>
            </div>
          </div>
        </Card>

        <Card className="p-6 rounded-2xl border border-slate-200 bg-white">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-amber-600 p-2">
              <Wrench className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Server → Refer Labs call</h2>
              <p className="mt-2 text-sm text-slate-600">
                Your server calls the discount capture endpoint using your Discount Capture Secret (from the dashboard).
              </p>
              <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                Never expose the secret in public storefront code. Keep it server-side.
              </div>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <p className="text-sm font-semibold text-slate-800">Request format</p>
            <CodeBlock>{`POST https://referlabs.com.au/api/discount-codes/redeem
Headers:
  Content-Type: application/json
  x-pepf-discount-secret: <ADD_SECRET>
Body:
{
  "discountCode": "CODE_FROM_ORDER",
  "orderReference": "ORDER-12345",
  "amount": "199.00",
  "metadata": {
    "platform": "shopify",
    "shopify_order_id": "1234567890",
    "email": "customer@example.com"
  }
}`}</CodeBlock>
          </div>
        </Card>
      </div>

      <Card className="mt-6 p-6 rounded-2xl border border-slate-200 bg-white">
        <h2 className="text-lg font-bold text-slate-900">Testing checkpoints (do these in order)</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-700">
          <li>Create a test ambassador in the dashboard and note their discount code.</li>
          <li>Confirm the Shopify order actually contains the discount code you expect (coupon codes are ideal).</li>
          <li>Trigger a test order (use a low-value test product) and confirm your webhook receiver gets the event.</li>
          <li>From your server logs, confirm your call to <code className="font-mono">/api/discount-codes/redeem</code> returns success.</li>
          <li>Confirm the redemption/conversion shows in the Refer Labs dashboard for the correct ambassador.</li>
          <li>If anything doesn’t appear, run the <Link href="/status" className="underline font-semibold text-slate-700 hover:text-slate-900">Status page</Link> checks.</li>
        </ol>
      </Card>

      <Card className="mt-6 p-6 rounded-2xl border border-slate-200 bg-white">
        <h2 className="text-lg font-bold text-slate-900">Common troubleshooting</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
          <li><span className="font-semibold">Missing discount code:</span> ensure the code is a real Shopify discount/coupon applied to the order.</li>
          <li><span className="font-semibold">Multiple codes:</span> pick the first coupon code consistently, or enforce one code at checkout.</li>
          <li><span className="font-semibold">Webhook retries:</span> make your server handler idempotent (use <code className="font-mono">orderReference</code> as a unique key).</li>
          <li><span className="font-semibold">Wrong timing:</span> use “order paid”/“fulfilled” (not “created”) to avoid false positives.</li>
        </ul>
      </Card>
    </div>
  );
}

