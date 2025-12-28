import Link from "next/link";
import { ExternalLink, ShieldCheck, Users, Wrench } from "lucide-react";

import { Card } from "@/components/ui/card";

export const metadata = {
  title: "HubSpot Integration | Refer Labs",
  description:
    "Create HubSpot contact properties for referral fields, import ambassadors, and (optionally) post conversion events back to Refer Labs with a secure webhook.",
};

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 text-xs font-mono leading-relaxed text-slate-800 overflow-auto">
      {children}
    </pre>
  );
}

export default function HubSpotGuidePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
            <Users className="h-4 w-4" />
            HubSpot setup
          </div>
          <h1 className="mt-4 text-3xl font-black text-slate-900">HubSpot (CRM + workflows)</h1>
          <p className="mt-2 text-slate-600">
            Add referral properties, import ambassadors, and validate click + conversion attribution end-to-end.
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
              <h2 className="text-lg font-bold text-slate-900">Step 1 — Create contact properties</h2>
              <p className="mt-2 text-sm text-slate-600">
                Create custom properties so HubSpot can store each ambassador’s unique referral data.
              </p>
              <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-700">
                <li>HubSpot → Settings → Data Management → Properties.</li>
                <li>Create properties on the Contact object:</li>
              </ol>
              <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                <p className="font-semibold text-slate-900">Recommended properties</p>
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
              <h2 className="text-lg font-bold text-slate-900">Step 2 — Import ambassadors + use tokens</h2>
              <p className="mt-2 text-sm text-slate-600">
                Import the ambassador CSV and use personalization tokens in email templates/buttons.
              </p>
              <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-700">
                <li>Refer Labs Dashboard → Step 2 → Export ambassadors (CSV).</li>
                <li>HubSpot → Contacts → Import → File from computer (CSV).</li>
                <li>Map the CSV columns to your custom properties.</li>
              </ol>
              <p className="mt-4 text-sm font-semibold text-slate-800">Example token usage</p>
              <CodeBlock>{`Button URL:
{{ contact.referral_link }}

Text:
Share your link: {{ contact.referral_link }}`}</CodeBlock>
              <p className="mt-3 text-xs text-slate-500">
                Token syntax can vary by editor. The important part is inserting the <code className="font-mono">referral_link</code> property.
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card className="p-6 rounded-2xl border border-slate-200 bg-white">
          <h2 className="text-lg font-bold text-slate-900">Optional — Post conversions from workflows</h2>
          <p className="mt-2 text-sm text-slate-600">
            If you have HubSpot workflows that represent a conversion (e.g. deal stage changes, payments, bookings), use a webhook
            action (available on certain HubSpot plans) to report the conversion to Refer Labs.
          </p>
          <p className="mt-4 text-sm font-semibold text-slate-800">Webhook format</p>
          <CodeBlock>{`POST https://referlabs.com.au/api/discount-codes/redeem
Headers:
  Content-Type: application/json
  x-pepf-discount-secret: <YOUR_SECRET>
Body:
{
  "discountCode": "{{ contact.discount_code }}",
  "orderReference": "HubSpot-{{ contact.hs_object_id }}",
  "amount": "199.00",
  "metadata": { "platform": "hubspot" }
}`}</CodeBlock>
          <p className="mt-3 text-xs text-slate-500">
            If you can’t send the secret from HubSpot securely, post from your own server instead.
          </p>
        </Card>

        <Card className="p-6 rounded-2xl border border-slate-200 bg-white">
          <h2 className="text-lg font-bold text-slate-900">Common troubleshooting</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
            <li>
              <span className="font-semibold">Tokens render empty:</span> check the contact has the custom property value populated.
            </li>
            <li>
              <span className="font-semibold">Attribution missing:</span> ensure conversions post discount code redemptions (or other conversion calls) to Refer Labs.
            </li>
            <li>
              <span className="font-semibold">Delayed dashboard updates:</span> confirm real-time is enabled; otherwise refresh or check the event timeline in the dashboard.
            </li>
          </ul>
          <p className="mt-4 text-xs text-slate-500">
            Use{" "}
            <Link href="/status" className="underline font-semibold text-slate-700 hover:text-slate-900">
              /status
            </Link>{" "}
            to verify configuration + connectivity.
          </p>
        </Card>
      </div>

      <Card className="mt-6 p-6 rounded-2xl border border-slate-200 bg-white">
        <h2 className="text-lg font-bold text-slate-900">Testing checkpoints (do these in order)</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-700">
          <li>Create the three properties and import ambassadors so the fields populate on contacts.</li>
          <li>Create a test email/workflow that uses <code className="font-mono">referral_link</code> as your CTA.</li>
          <li>Click the link in an incognito window and confirm the referral page loads.</li>
          <li>Submit the referral form and confirm the signup appears in Refer Labs (Journey timeline).</li>
          <li>Trigger a test conversion and confirm it attributes correctly in the dashboard.</li>
        </ol>
      </Card>
    </div>
  );
}

