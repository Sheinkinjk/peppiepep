"use client";

import Link from "next/link";
import { useState } from "react";
import { Empty } from "@/components/preview/final/Art";
import {
  formatReading, isDueForRecheck, oldestReadingISO, splitSaving, verifiedOffers,
} from "@/lib/preview/data";

/**
 * The offer stack, and the page's one piece of async UX.
 *
 * SCALE RULE 1 of 5: the brand name is the largest element in the row and the
 * discount is set smaller. Every other comparison site does the reverse
 * because it earns on the click through to the promotion.
 *
 * OUTBOUND POLICY: every row links to our own comparison page, never to the
 * merchant. The homepage defers the offsite click, matching both primaries.
 * Offer pages keep the direct outbound path, because discount-code traffic
 * arrives wanting the code and an extra hop there costs revenue. The copy
 * control is a button rather than a link precisely so it does not become a
 * second, competing destination inside the row.
 */

const READ = oldestReadingISO ? formatReading(oldestReadingISO) : "17 August 2026";
type CopyState = "idle" | "busy" | "done" | "fail";

function Tick() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" aria-hidden="true">
      <path d="M1.5 7 L5 10.2 L11.5 2.6" stroke="currentColor" strokeWidth="2.2" fill="none" />
    </svg>
  );
}

export function OfferStack() {
  const [state, setState] = useState<Record<string, CopyState>>({});
  const [say, setSay] = useState("");

  async function copy(code: string) {
    setState((s) => ({ ...s, [code]: "busy" }));
    try {
      if (!navigator.clipboard) throw new Error("no clipboard");
      await navigator.clipboard.writeText(code);
      setState((s) => ({ ...s, [code]: "done" }));
      setSay(`${code} copied to your clipboard`);
      window.setTimeout(() => {
        setState((s) => (s[code] === "done" ? { ...s, [code]: "idle" } : s));
      }, 2400);
    } catch {
      /* a real failure state, not a silent one: the code stays on screen and
         the label tells the reader to select it by hand. */
      setState((s) => ({ ...s, [code]: "fail" }));
      setSay(`Could not copy automatically. The code is ${code}. Select it to copy.`);
    }
  }

  if (verifiedOffers.length === 0) {
    return (
      <div className="fx-empty">
        <Empty />
        <p>Nothing has been read yet. An offer appears here only once it has been opened on the provider&rsquo;s own page and dated.</p>
      </div>
    );
  }

  return (
    <>
      <div className="fx-stack">
        {verifiedOffers.map((d) => {
          const s = splitSaving(d.offer);
          const st = d.code ? state[d.code] ?? "idle" : "idle";
          const stale = isDueForRecheck(d.verified);
          return (
            <div className="fx-row" key={d.brand + d.offer}>
              <Link href={d.href} className="fx-o">
                <span className="fx-o__g">
                  <span className="fx-o__b">{d.brand}</span>
                  <span className="fx-o__s">{s.saving ?? "offer"}</span>
                  <span className="fx-o__m">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={d.logo} alt="" width={64} height={20} />
                    <span className="fx-o__cat">{d.category}</span>
                    <span>{d.offer}</span>
                    <span className="fx-o__read">read {d.verified ? formatReading(d.verified) : READ}</span>
                    {stale ? <span className="fx-o__stale">due for re-check</span> : null}
                    {!d.code ? <span>no code needed</span> : null}
                  </span>
                </span>
              </Link>
              {d.code ? (
                <button type="button" className="fx-copy" data-state={st}
                  onClick={() => copy(d.code as string)} disabled={st === "busy"}>
                  {st === "done" ? <><Tick /> Copied</> : st === "busy" ? "Copying" : st === "fail" ? `${d.code} — select to copy` : `Copy ${d.code}`}
                </button>
              ) : null}
            </div>
          );
        })}
      </div>
      <p aria-live="polite" className="fx-sr">{say}</p>
    </>
  );
}
