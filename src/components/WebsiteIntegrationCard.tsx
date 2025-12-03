"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy, Check, Globe, Code } from "lucide-react";

type WebsiteIntegrationCardProps = {
  siteUrl: string;
  businessName: string;
  offerText?: string | null;
  clientRewardText?: string | null;
  newUserRewardText?: string | null;
};

const SNIPPET_STYLE =
  "rounded-xl border border-slate-200 bg-slate-50/70 p-4 font-mono text-xs leading-relaxed text-slate-700 whitespace-pre-wrap break-words max-h-64 overflow-auto";

export function WebsiteIntegrationCard({
  siteUrl,
  businessName,
  offerText,
  clientRewardText,
  newUserRewardText,
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

      <p className="text-xs text-slate-500 border-t border-slate-200 pt-4">
        Tip: Shopify merchants can paste the embed snippet into a custom liquid
        section or blog post. Any time an ambassador updates their link, the
        widget stays in sync. For API usage, generate a secure signed token on your
        server (using <code className="font-mono">AMBASSADOR_API_SECRET</code>) and
        pass it as the <code className="font-mono">token</code> query parameter.
      </p>
    </Card>
  );
}
