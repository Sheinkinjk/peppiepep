"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { CtaLink } from "./CtaLink";

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
    <div data-offer-card="" className="mp-card">
      <div className="flex flex-wrap items-center gap-3">
        <button type="button" onClick={copy} className="mp-card__code" aria-label={`Copy code ${code}`}>
          {code}
          {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
        </button>
        <span aria-live="polite" className="mp-card__copied">
          {copied ? "Copied" : ""}
        </span>
      </div>

      <p className="mp-card__val">{valueLine}</p>

      <div className="mp-card__terms">
        <p className="mp-card__terms-h">Terms</p>
        {terms}
      </div>

      <div className="mp-card__cta">
        <CtaLink href={ctaHref} label={ctaLabel} tone="dark" preview={preview} confirmText={confirmText} />
      </div>
    </div>
  );
}
