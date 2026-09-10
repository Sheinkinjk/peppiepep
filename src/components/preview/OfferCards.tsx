"use client";

import { useState } from "react";
import Link from "next/link";
import { PartnerLogo } from "@/components/preview/PartnerLogo";
import {
  formatReading,
  isDueForRecheck,
  splitSaving,
  verifiedOffers,
} from "@/lib/preview/data";

/**
 * Variant B renders the same verified offers as cards, with the code as a
 * copy-to-clipboard control.
 *
 * The confirmation is a text swap rather than a toast: a toast is another
 * surface to design and this has to work with the keyboard and a screen reader
 * without one. `aria-live` announces the change.
 */

function CopyCode({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked by permissions. The code stays selectable as
      // text either way, so there is nothing to recover from.
      setCopied(false);
    }
  }

  return (
    <button type="button" className="rl-copy" onClick={copy}>
      <span>{code}</span>
      <span className="rl-copy__state" aria-live="polite">
        {copied ? "Copied" : "Copy"}
      </span>
    </button>
  );
}

export function OfferCards() {
  return (
    <div className="rl-cards">
      {verifiedOffers.map((d) => {
        const { saving } = splitSaving(d.offer);
        const due = isDueForRecheck(d.verified);
        return (
          <article className="rl-card" key={d.brand}>
            <div className="rl-card__top">
              <PartnerLogo src={d.logo} alt="" width={32} height={32} />
              <div>
                <p className="rl-card__brand">
                  <Link href={d.href} style={{ color: "inherit", textDecoration: "none" }}>
                    {d.brand}
                  </Link>
                </p>
                <p className="rl-card__cat">{d.category}</p>
              </div>
            </div>

            {saving ? <p className="rl-card__saving">{saving}</p> : null}

            {/* The full sentence, not the remainder after the saving is cut out:
                Leadpages reads "7-day free trial; 20% off annual billing", and
                removing the saving from the middle of that leaves "7-day free
                trial; off annual billing". */}
            <p className="rl-card__offer">{d.offer}</p>

            <div className="rl-card__foot">
              {d.code ? (
                <CopyCode code={d.code} />
              ) : (
                <span className="rl-recheck">no code needed</span>
              )}
              <span className="rl-status">Active</span>
              <span className={due ? "rl-recheck" : "rl-read"}>
                read{" "}
                <time dateTime={d.verified}>
                  {formatReading(d.verified as string)}
                </time>
                {due ? " (due for re-check)" : null}
              </span>
            </div>
          </article>
        );
      })}
    </div>
  );
}
