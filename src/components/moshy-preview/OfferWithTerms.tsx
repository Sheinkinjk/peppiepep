"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

/**
 * The only place the Moshy code may appear on the page. Every prop is required,
 * so the code can never render without its value line, terms and link (National
 * Law s 133: an inducement must show its terms in the same view). Terms are
 * always visible; there is no toggle.
 */
export type OfferWithTermsProps = {
  code: string;
  valueLine: React.ReactNode;
  terms: React.ReactNode;
  ctaHref: string;
  ctaLabel: string;
  /** Preview mode: a confirm step before the link opens. */
  preview: boolean;
  confirmText: string;
};

export function OfferWithTerms({ code, valueLine, terms, ctaHref, ctaLabel, preview, confirmText }: OfferWithTermsProps) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div data-offer-card="" className="rounded-2xl border border-[#ded8cd] bg-white p-6 text-left sm:p-8">
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center gap-2 rounded-xl border-2 border-dashed border-[#007a95] bg-[#e4f2f5] px-4 py-2 font-mono text-lg font-bold tracking-wider text-[#14120f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#007a95]"
          aria-label={`Copy code ${code}`}
        >
          {code}
          {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
        </button>
        <span aria-live="polite" className="text-sm text-[#56504a]">
          {copied ? "Copied" : ""}
        </span>
      </div>

      <div className="mt-4 text-lg font-semibold text-[#14120f]">{valueLine}</div>

      <div className="mt-4 text-sm leading-relaxed text-[#3d3833]">
        <p className="mb-1 font-semibold text-[#14120f]">Terms</p>
        {terms}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <a
          href={ctaHref}
          target="_blank"
          rel="sponsored noopener"
          onClick={(e) => {
            if (preview && !window.confirm(confirmText)) e.preventDefault();
          }}
          className="nw-btn inline-flex items-center justify-center px-6 py-3 text-[15px]"
        >
          {ctaLabel}
        </a>
      </div>
    </div>
  );
}
