"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy, Check, Globe, Code } from "lucide-react";

type WebsiteIntegrationCardProps = {
  siteUrl: string;
  businessName: string;
  offerText?: string | null;
  clientRewardText?: string | null;
  newUserRewardText?: string | null;
  discountCaptureSecret?: string | null;
};

const SNIPPET_STYLE =
  "rounded-xl border border-slate-200 bg-slate-50/70 p-4 font-mono text-xs leading-relaxed text-slate-700 whitespace-pre-wrap break-words max-h-64 overflow-auto";

export function WebsiteIntegrationCard({
  siteUrl,
  businessName,
  offerText,
  clientRewardText,
  newUserRewardText,
  discountCaptureSecret,
}: WebsiteIntegrationCardProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const newUserCopy = newUserRewardText || offerText || "your reward";
  const ambassadorCopy = clientRewardText || "a loyalty reward";

  const iframeSnippet = `<iframe src="${siteUrl}/r/{{REFERRAL_CODE}}?embed=1" title="Referral reward" style="width:100%;min-height:640px;border:none;border-radius:24px;overflow:hidden;"></iframe>`;
  const linkSnippet = `<a href="${siteUrl}/r/{{REFERRAL_CODE}}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:.5rem;padding:14px 28px;border-radius:999px;background:#00838F;color:white;font-weight:700;text-decoration:none;">
  Claim ${newUserCopy} at ${businessName}
</a>`;

  const apiSnippet = `fetch("${siteUrl}/api/referral-stats?code=YOUR_REFERRAL_CODE&token=SIGNED_TOKEN")
  .then(res => res.json())
  .then(data => {
    console.log("Referral stats", data);
    // Use this to show live stats on your site
  });`;
  const discountCaptureSnippet = `fetch("${siteUrl}/api/discount-codes/redeem", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-pepf-discount-secret": "${discountCaptureSecret ?? "<ADD_SECRET>"}"
  },
  body: JSON.stringify({
    discountCode: document.querySelector("[name='discount_code']").value,
    orderReference: "ORDER-12345",
    amount: "199.00",
    metadata: {
      email: document.querySelector("[name='email']").value
    }
  })
});`;

  const shopifySnippet = `{% if checkout.discount_code %}
<script>
fetch("${siteUrl}/api/discount-codes/redeem", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-pepf-discount-secret": "${discountCaptureSecret ?? "<ADD_SECRET>"}"
  },
  body: JSON.stringify({
    discountCode: "{{ checkout.discount_code.code }}",
    orderReference: "{{ order.name }}",
    amount: {{ order.total_price | json }},
    metadata: {
      email: "{{ checkout.email }}",
      platform: "shopify"
    }
  })
});
</script>
{% endif %}`;

  const handleCopy = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1800);
    } catch (error) {
      console.error("Failed to copy snippet:", error);
    }
  };

  const renderSnippet = (label: string, snippet: string, key: string) => (
    <div className="space-y-2" key={key}>
      <p className="text-sm font-semibold text-slate-700 flex items-center gap-2">
        <Code className="h-4 w-4 text-slate-500" />
        {label}
      </p>
      <pre className={SNIPPET_STYLE}>{snippet}</pre>
      <Button
        type="button"
        variant={copiedKey === key ? "default" : "outline"}
        onClick={() => handleCopy(snippet, key)}
        className="w-full sm:w-auto"
      >
        {copiedKey === key ? (
          <>
            <Check className="h-4 w-4 mr-2" />
            Snippet copied
          </>
        ) : (
          <>
            <Copy className="h-4 w-4 mr-2" />
            Copy snippet
          </>
        )}
      </Button>
    </div>
  );

  return (
    <Card className="p-6 sm:p-8 shadow-xl shadow-slate-200/60 ring-1 ring-slate-200/80 rounded-3xl border-slate-200/80 bg-white/95 space-y-6">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-sky-500 to-emerald-500 flex items-center justify-center">
          <Globe className="h-6 w-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900">
            Website & Shopify Integration
          </h3>
          <p className="text-sm text-slate-600">
            Drop these snippets onto any page so ambassadors can promote
            {businessName ? ` ${businessName}` : ""} from your own site while highlighting{" "}
            {newUserCopy} for their friends and {ambassadorCopy} for themselves.
          </p>
        </div>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 text-sm text-slate-600 space-y-2">
        <p className="font-semibold text-slate-800">How to use these snippets:</p>
        <ol className="list-decimal space-y-1 pl-5">
          <li>Paste the iframe into a hero block or landing page—each ambassador link keeps their code in sync.</li>
          <li>Add the CTA button anywhere you mention referrals (navigation, blog, footer). Swap <code className="font-mono text-xs">{"{{REFERRAL_CODE}}"}</code> per ambassador.</li>
          <li>Optional: use the stats API in gated portals to show progress without logging into PeppiePep.</li>
        </ol>
        <p>
          Shopify teams can paste the iframe into a custom Liquid section, while Webflow/Squarespace users can drop it inside an embed block—no development required.
        </p>
      </div>

      <div className="space-y-6">
        {renderSnippet(
          "Embed the full referral landing page (swap {{REFERRAL_CODE}} per ambassador)",
          iframeSnippet,
          "iframe",
        )}
        {renderSnippet(
          "Use this CTA button anywhere on your site",
          linkSnippet,
          "cta",
        )}
        {renderSnippet(
          "Fetch live referral stats (optional)",
          apiSnippet,
          "api",
        )}
      </div>
      <div className="space-y-4 border-t border-slate-200 pt-4">
        <p className="text-sm font-semibold text-slate-800">
          Discount codes + checkout tracking
        </p>
        {discountCaptureSecret ? (
          <>
            <div className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-slate-50/70 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs uppercase font-semibold tracking-wide text-slate-500">
                  API secret
                </p>
                <p className="font-mono text-sm text-slate-900 break-all">
                  {discountCaptureSecret}
                </p>
              </div>
              <Button
                type="button"
                variant={copiedKey === "discount-secret" ? "default" : "outline"}
                onClick={() =>
                  handleCopy(discountCaptureSecret, "discount-secret")
                }
              >
                {copiedKey === "discount-secret" ? (
                  <>
                    <Check className="mr-2 h-4 w-4" /> Secret copied
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" /> Copy secret
                  </>
                )}
              </Button>
            </div>
            {renderSnippet(
              "Capture codes from any HTML form",
              discountCaptureSnippet,
              "discount-api",
            )}
            {renderSnippet(
              "Shopify confirmation snippet",
              shopifySnippet,
              "discount-shopify",
            )}
          </>
        ) : (
          <p className="text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-xl p-3">
            Generate your discount capture secret in Program Settings or contact support to enable API tracking.
          </p>
        )}
        <ul className="text-xs text-slate-600 space-y-1">
          <li>1. Add a <code className="font-mono">discount_code</code> field to your checkout or signup form.</li>
          <li>2. Send that value to <code className="font-mono">/api/discount-codes/redeem</code> with the secret above.</li>
          <li>3. We map it back to the correct ambassador so your dashboard shows redemptions instantly.</li>
        </ul>
      </div>

      <p className="text-xs text-slate-500 border-t border-slate-200 pt-4">
        Tip: Shopify merchants can paste the embed snippet into a custom liquid
        section or blog post. Any time an ambassador updates their link, the
        widget stays in sync. For API usage, generate a secure signed token on your
        server (using <code className="font-mono">AMBASSADOR_API_SECRET</code>) and
        pass it as the <code className="font-mono">token</code> query parameter.
      </p>

      <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 text-sm text-slate-700">
        <p className="font-semibold text-slate-900">Need a step-by-step guide?</p>
        <p className="mt-1 text-sm text-slate-600">
          Follow the dedicated setup pages (with testing checkpoints) for each platform.
        </p>
        <div className="mt-3 flex flex-wrap gap-3">
          <Link
            href="/shopify"
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-white hover:bg-slate-800"
          >
            Shopify guide
          </Link>
          <Link
            href="/wordpress"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-800 hover:bg-slate-50"
          >
            WordPress guide
          </Link>
          <Link
            href="/webflow"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-800 hover:bg-slate-50"
          >
            Webflow guide
          </Link>
          <Link
            href="/squarespace"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-800 hover:bg-slate-50"
          >
            Squarespace guide
          </Link>
          <Link
            href="/wix"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-800 hover:bg-slate-50"
          >
            Wix guide
          </Link>
          <Link
            href="/gtm"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-800 hover:bg-slate-50"
          >
            GTM guide
          </Link>
          <Link
            href="/analytics"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-800 hover:bg-slate-50"
          >
            Analytics
          </Link>
          <Link
            href="/go-live"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-800 hover:bg-slate-50"
          >
            Go-live checklist
          </Link>
          <Link
            href="/meta-ads"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-800 hover:bg-slate-50"
          >
            Meta Ads
          </Link>
          <Link
            href="/google-ads"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-800 hover:bg-slate-50"
          >
            Google Ads
          </Link>
          <Link
            href="/tiktok-ads"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-800 hover:bg-slate-50"
          >
            TikTok Ads
          </Link>
          <Link
            href="/integrations"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-800 hover:bg-slate-50"
          >
            All guides
          </Link>
        </div>
      </div>
    </Card>
  );
}
