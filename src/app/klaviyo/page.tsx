import Link from "next/link";
import { ExternalLink, Mail, ShieldCheck, Wrench } from "lucide-react";

import { Card } from "@/components/ui/card";

export const metadata = {
  title: "Klaviyo Integration | Refer Labs",
  description:
    "Sync ambassadors into Klaviyo, map merge fields, and (optionally) post conversions back to Refer Labs with a secure webhook.",
};

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 text-xs font-mono leading-relaxed text-slate-800 overflow-auto">
      {children}
    </pre>
  );
}

export default function KlaviyoGuidePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
            <Mail className="h-4 w-4" />
            Klaviyo setup
          </div>
          <h1 className="mt-4 text-3xl font-black text-slate-900">Klaviyo (email + automation)</h1>
          <p className="mt-2 text-slate-600">
            Import ambassadors, map merge fields, and test attribution end-to-end before you start sending.
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
              <h2 className="text-lg font-bold text-slate-900">Step 1 — Import ambassadors</h2>
              <p className="mt-2 text-sm text-slate-600">
                Export ambassadors from Refer Labs and import them into Klaviyo with the right custom properties.
              </p>
              <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-700">
                <li>Refer Labs Dashboard → Step 2 → Export ambassadors (CSV).</li>
                <li>Klaviyo → Lists &amp; Segments → choose a list → Import.</li>
                <li>Map fields to Klaviyo properties (create new properties if prompted).</li>
              </ol>
              <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                <p className="font-semibold text-slate-900">Required properties</p>
                <p className="mt-1">
                  <code className="font-mono">referral_code</code>, <code className="font-mono">referral_link</code>,{" "}
                  <code className="font-mono">discount_code</code>
                </p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 rounded-2xl border border-slate-200 bg-white">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-amber-600 p-2">
              <Wrench className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Step 2 — Add the referral link to templates</h2>
              <p className="mt-2 text-sm text-slate-600">
                Use the ambassador’s unique link as your primary CTA. Refer Labs tracks clicks automatically via UTM tags.
              </p>
              <p className="mt-3 text-sm font-semibold text-slate-800">Example merge tags (Klaviyo)</p>
              <CodeBlock>{`Hi {{ first_name|default:"there" }},

Share your link:
{{ person.referral_link }}

Or use it as your button URL:
{{ person.referral_link }}`}</CodeBlock>
              <p className="mt-3 text-xs text-slate-500">
                If your account uses different tag syntax, keep the same property name:{" "}
                <code className="font-mono">referral_link</code>.
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card className="p-6 rounded-2xl border border-slate-200 bg-white">
          <h2 className="text-lg font-bold text-slate-900">Optional — Post conversions from Klaviyo workflows</h2>
          <p className="mt-2 text-sm text-slate-600">
            If your conversion event happens outside Shopify/Stripe and you want to report it directly, use a webhook action
            from a Klaviyo flow (server-to-server) and include the discount capture secret in headers.
          </p>
          <p className="mt-4 text-sm font-semibold text-slate-800">Webhook target</p>
          <CodeBlock>{`POST https://referlabs.com.au/api/discount-codes/redeem

Headers:
  Content-Type: application/json
  x-pepf-discount-secret: <YOUR_SECRET>

Body:
{
  "discountCode": "{{ person.discount_code }}",
  "orderReference": "KlaviyoFlow-{{ event_id }}",
  "amount": "199.00",
  "metadata": { "platform": "klaviyo" }
}`}</CodeBlock>
          <p className="mt-3 text-xs text-slate-500">
            Header names supported: <code className="font-mono">x-pepf-discount-secret</code> or{" "}
            <code className="font-mono">x-referlabs-discount-secret</code>.
          </p>
        </Card>

        <Card className="p-6 rounded-2xl border border-slate-200 bg-white">
          <h2 className="text-lg font-bold text-slate-900">Common troubleshooting</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
            <li>
              <span className="font-semibold">Button links not personalized:</span> confirm <code className="font-mono">referral_link</code>{" "}
              is mapped as a property (not only a column in the import preview).
            </li>
            <li>
              <span className="font-semibold">Clicks not appearing:</span> the destination must be the Refer Labs link (e.g.{" "}
              <code className="font-mono">https://referlabs.com.au/r/AMBCODE</code>) so tracking can attach.
            </li>
            <li>
              <span className="font-semibold">Conversions missing:</span> ensure the actual transaction system posts discount redemptions (Shopify, Stripe, POS, etc.).
            </li>
          </ul>
          <p className="mt-4 text-xs text-slate-500">
            Run live diagnostics on the{" "}
            <Link href="/status" className="underline font-semibold text-slate-700 hover:text-slate-900">
              Status page
            </Link>
            .
          </p>
        </Card>
      </div>

      <Card className="mt-6 p-6 rounded-2xl border border-slate-200 bg-white">
        <h2 className="text-lg font-bold text-slate-900">Testing checkpoints (do these in order)</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-700">
          <li>Export ambassadors in Refer Labs and import to Klaviyo with <code className="font-mono">referral_link</code>.</li>
          <li>
            Send yourself a test email where the CTA uses <code className="font-mono">{"{{ person.referral_link }}"}</code>.
          </li>
          <li>Click the link in an incognito window and confirm the referral page loads.</li>
          <li>Submit the referral form and confirm the signup appears in the dashboard (Journey timeline).</li>
          <li>Trigger a test conversion (discount code redemption) and confirm it attributes to the correct ambassador.</li>
        </ol>
      </Card>
    </div>
  );
}
