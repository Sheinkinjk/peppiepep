"use client";

import { useState } from "react";
import Link from "next/link";
import { PartnerLogo } from "@/components/preview/PartnerLogo";
import { formatReading, isDueForRecheck, splitSaving, verifiedOffers } from "@/lib/preview/data";

/**
 * Variant B renders the same eight verified offers as cards.
 *
 * The brand link is internal: it goes to our own offer page, not the merchant.
 * The homepage defers the offsite click; the offer page keeps it direct.
 */
function CopyCode({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch { setCopied(false); }
  }
  return (
    <button type="button" className="rl-copy2" onClick={copy}>
      <span>{code}</span>
      <span className="rl-copy2__s" aria-live="polite">{copied ? "Copied" : "Copy"}</span>
    </button>
  );
}

export function OfferCards2() {
  return (
    <div className="rl-cards2">
      {verifiedOffers.map((d) => {
        const { saving } = splitSaving(d.offer);
        const due = isDueForRecheck(d.verified);
        return (
          <article className="rl-card2" key={d.brand}>
            <div className="rl-card2__t">
              <PartnerLogo src={d.logo} alt="" width={32} height={32} />
              <div>
                <p className="rl-brand">
                  <Link href={d.href} style={{ color: "inherit", textDecoration: "none" }}>{d.brand}</Link>
                </p>
                <p className="rl-cat">{d.category}</p>
              </div>
            </div>
            {saving ? <p className="rl-card2__s">{saving}</p> : null}
            <p className="rl-card2__o">{d.offer}</p>
            <div className="rl-card2__f">
              {d.code ? <CopyCode code={d.code} /> : <span>no code needed</span>}
              <span className="rl-status2">Active</span>
              <span style={{ fontVariantNumeric: "tabular-nums" }}>
                read <time dateTime={d.verified}>{formatReading(d.verified as string)}</time>
                {due ? " (due for re-check)" : null}
              </span>
            </div>
          </article>
        );
      })}
    </div>
  );
}
