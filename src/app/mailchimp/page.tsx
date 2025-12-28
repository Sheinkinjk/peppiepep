import Link from "next/link";
import { ExternalLink, Mail, ShieldCheck, Wrench } from "lucide-react";

import { Card } from "@/components/ui/card";

export const metadata = {
  title: "Mailchimp Integration | Refer Labs",
  description:
    "Import ambassadors into Mailchimp, map merge tags for referral links, and verify click + conversion attribution in your Refer Labs dashboard.",
};

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 text-xs font-mono leading-relaxed text-slate-800 overflow-auto">
      {children}
    </pre>
  );
}

export default function MailchimpGuidePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
            <Mail className="h-4 w-4" />
            Mailchimp setup
          </div>
          <h1 className="mt-4 text-3xl font-black text-slate-900">Mailchimp (email campaigns)</h1>
          <p className="mt-2 text-slate-600">
            Map referral fields once, then every campaign uses a unique referral link per ambassador.
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
              <h2 className="text-lg font-bold text-slate-900">Step 1 — Import ambassadors + create fields</h2>
              <p className="mt-2 text-sm text-slate-600">
                Import your ambassador CSV and create custom audience fields for referral tracking.
              </p>
              <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-700">
                <li>Refer Labs Dashboard → Step 2 → Export ambassadors (CSV).</li>
                <li>Mailchimp → Audience → All contacts → Import contacts.</li>
                <li>When prompted, create/map new fields for the referral data.</li>
              </ol>
              <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                <p className="font-semibold text-slate-900">Recommended Audience fields</p>
                <p className="mt-1">
                  <code className="font-mono">REFCODE</code>, <code className="font-mono">REFLINK</code>,{" "}
                  <code className="font-mono">DISCOUNT</code>
                </p>
                <p className="mt-2 text-xs text-slate-500">
                  You can name fields anything; just keep a consistent mapping. The most important one is the referral link field.
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
              <h2 className="text-lg font-bold text-slate-900">Step 2 — Add merge tags to emails</h2>
              <p className="mt-2 text-sm text-slate-600">
                Put the referral link field in your primary CTA button (URL). Refer Labs logs visits and ties conversions back to the ambassador.
              </p>
              <p className="mt-3 text-sm font-semibold text-slate-800">Example merge tags (Mailchimp)</p>
              <CodeBlock>{`Hi *|FNAME|*,

Share your link:
*|REFLINK|*

Button URL:
*|REFLINK|*`}</CodeBlock>
              <p className="mt-3 text-xs text-slate-500">
                Replace <code className="font-mono">REFLINK</code> with the merge tag for your chosen field if you named it differently.
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card className="p-6 rounded-2xl border border-slate-200 bg-white">
          <h2 className="text-lg font-bold text-slate-900">Optional — Post conversions via webhook</h2>
          <p className="mt-2 text-sm text-slate-600">
            If you redeem discount codes in a system that isn’t Shopify/Stripe, post the conversion to Refer Labs from your server/automation tool.
          </p>
          <p className="mt-4 text-sm font-semibold text-slate-800">Webhook format</p>
          <CodeBlock>{`POST https://referlabs.com.au/api/discount-codes/redeem
Headers:
  Content-Type: application/json
  x-pepf-discount-secret: <YOUR_SECRET>
Body:
{
  "discountCode": "CODE_FROM_ORDER",
  "orderReference": "ORDER-12345",
  "amount": "199.00",
  "metadata": { "platform": "mailchimp" }
}`}</CodeBlock>
          <p className="mt-3 text-xs text-slate-500">
            Get the secret from Refer Labs Dashboard → Program Settings. Keep it private.
          </p>
        </Card>

        <Card className="p-6 rounded-2xl border border-slate-200 bg-white">
          <h2 className="text-lg font-bold text-slate-900">Common troubleshooting</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
            <li>
              <span className="font-semibold">Merge tag shows blank:</span> confirm the field exists on the contact record and was mapped during import.
            </li>
            <li>
              <span className="font-semibold">Link goes to the wrong place:</span> the CTA URL should be the ambassador’s Refer Labs link.
            </li>
            <li>
              <span className="font-semibold">Conversions not attributed:</span> ensure the checkout posts discount code redemption to Refer Labs.
            </li>
          </ul>
          <p className="mt-4 text-xs text-slate-500">
            Use the{" "}
            <Link href="/status" className="underline font-semibold text-slate-700 hover:text-slate-900">
              Status page
            </Link>{" "}
            to verify integrations + configuration.
          </p>
        </Card>
      </div>

      <Card className="mt-6 p-6 rounded-2xl border border-slate-200 bg-white">
        <h2 className="text-lg font-bold text-slate-900">Testing checkpoints (do these in order)</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-700">
          <li>Import ambassadors and confirm at least one contact has your referral link field populated.</li>
          <li>Send yourself a test email and verify the CTA button URL is personalized.</li>
          <li>Click the link in an incognito window and confirm the referral page loads.</li>
          <li>Submit the referral form and confirm the signup appears in Refer Labs (Journey timeline).</li>
          <li>Trigger a conversion (discount code redemption) and confirm it attributes correctly.</li>
        </ol>
      </Card>
    </div>
  );
}

