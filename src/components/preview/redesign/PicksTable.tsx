"use client";

import Link from "next/link";
import { useState } from "react";
import { opticalHeight, picks } from "@/lib/preview/live-home";
import { formatReading, oldestReadingISO, verifiedOffers } from "@/lib/preview/data";

/**
 * THE HERO OBJECT: "This month's top picks", drawn as a table rather than as
 * three equal cards.
 *
 * Column proportions are chosen, not equal:
 *   brand 30% · offer 21% · why 34% · action 15%
 * The brand column is widest because the brand is the thing we vouch for. The
 * offer column is narrower and its type is SMALLER than the brand name beside
 * it, which is the scale rule: what we verified outranks what the merchant
 * asserts. Figures are tabular so the three offers align on their digits.
 *
 * Rule hierarchy is three weights, not one: 2px under the head and under the
 * last row (the object's own boundary), 1px between rows, nothing inside a
 * row. No card, no shadow, no radius above 2px.
 *
 * Logos are optically sized per mark, never a uniform box. See
 * `logoOptical` in live-home.ts for the per-logo scale and the reason.
 *
 * OUTBOUND POLICY: every destination here is our own offer page. The homepage
 * defers the offsite click; the offer page keeps the direct outbound path.
 */

const READ = oldestReadingISO ? formatReading(oldestReadingISO) : "17 Aug 2026";
type S = "idle" | "busy" | "done" | "fail";

/* the code, read from the offers table rather than parsed out of display copy */
function codeFor(brand: string): string | undefined {
  return verifiedOffers.find((d) => d.brand === brand)?.code;
}

export function PicksTable() {
  const [st, setSt] = useState<Record<string, S>>({});
  const [say, setSay] = useState("");

  async function copy(code: string) {
    setSt((s) => ({ ...s, [code]: "busy" }));
    try {
      if (!navigator.clipboard) throw new Error("unavailable");
      await navigator.clipboard.writeText(code);
      setSt((s) => ({ ...s, [code]: "done" }));
      setSay(`${code} copied to your clipboard`);
      window.setTimeout(() => setSt((s) => (s[code] === "done" ? { ...s, [code]: "idle" } : s)), 2400);
    } catch {
      setSt((s) => ({ ...s, [code]: "fail" }));
      setSay(`Could not copy automatically. The code is ${code}. Select it to copy.`);
    }
  }

  return (
    <>
      <table className="rd-tbl">
        <caption className="rd-sr">
          {picks.heading}. {picks.noteBefore}{READ}{picks.noteAfter}
        </caption>
        <thead>
          <tr>
            <th scope="col" className="rd-col-brand">Provider</th>
            <th scope="col" className="rd-col-offer">Current offer</th>
            <th scope="col" className="rd-col-why">Why it is here</th>
            <th scope="col" className="rd-col-act">&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {picks.items.map((p) => {
            const code = codeFor(p.brand);
            const s = code ? st[code] ?? "idle" : "idle";
            return (
              <tr key={p.brand}>
                <td className="rd-col-brand">
                  <span className="rd-bd">
                    <span className="rd-bd__well">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.logo} alt="" width={56} height={opticalHeight(p.logo, 34)}
                        style={{ maxHeight: opticalHeight(p.logo, 34) }} />
                    </span>
                    <Link href={p.href}>
                      <span className="rd-kicker">{p.kicker}</span>
                      <span className="rd-bd__n">{p.brand}</span>
                    </Link>
                  </span>
                </td>
                <td className="rd-col-offer">
                  <span className="rd-offer">{p.offer}</span>
                  {code ? (
                    <>
                      <br />
                      <button type="button" className="rd-copy" data-state={s}
                        disabled={s === "busy"} onClick={() => copy(code)}>
                        {s === "done" ? "Copied" : s === "busy" ? "Copying" : s === "fail" ? `${code} — select to copy` : `Copy ${code}`}
                      </button>
                    </>
                  ) : null}
                </td>
                <td className="rd-col-why"><span className="rd-why">{p.body}</span></td>
                <td className="rd-col-act">
                  <Link href={p.href} className="rd-act">{p.cta}</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p aria-live="polite" className="rd-sr">{say}</p>
    </>
  );
}
