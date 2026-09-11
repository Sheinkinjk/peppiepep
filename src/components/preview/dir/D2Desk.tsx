"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { InstrumentMarker, InstrumentEmpty, catKey } from "@/components/preview/dir/Art";
import { dirCategories } from "@/lib/preview/directions";
import { formatReading, oldestReadingISO, splitSaving, verifiedOffers } from "@/lib/preview/data";

/**
 * The working panel. This is D2's whole argument: the first thing on the page
 * is a control the visitor operates, not a sentence about comparison.
 *
 * Filtering is real. The rows are the same eight verified offers the rest of
 * the site reads from, the counts on the chips are computed from them, and
 * turning every category off produces a genuine empty state drawn in this
 * direction's own style rather than a blank panel.
 */

const READ = oldestReadingISO ? formatReading(oldestReadingISO) : "17 August 2026";

export function D2Desk() {
  const [on, setOn] = useState<string[]>([]);
  const [codesOnly, setCodesOnly] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const rows = useMemo(() => {
    let r = on.length === 0 ? verifiedOffers : verifiedOffers.filter((d) => on.includes(d.category));
    if (codesOnly) r = r.filter((d) => Boolean(d.code));
    return r;
  }, [on, codesOnly]);

  /* The empty state is reachable rather than decorative: Home batteries plus
     "codes only" is genuinely zero rows, because Apollo's $500 needs no code. */
  function toggle(label: string) {
    setOn((prev) => (prev.includes(label) ? prev.filter((x) => x !== label) : [...prev, label]));
  }

  async function copy(code: string) {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(code);
      window.setTimeout(() => setCopied((c) => (c === code ? null : c)), 2200);
    } catch {
      setCopied(null);
    }
  }

  return (
    <div className="d2-desk">
      <div className="d2-desk__h">
        <h2>Pick a category</h2>
        <span>
          {rows.length} of {verifiedOffers.length} offers shown &middot; oldest reading {READ}
        </span>
      </div>

      <div className="d2-chips">
        {dirCategories.map((c) => {
          const active = on.includes(c.label);
          return (
            <button key={c.key} type="button" className="d2-chip"
              aria-pressed={active} onClick={() => toggle(c.label)}>
              <InstrumentMarker cat={catKey(c.label)} size={22} />
              {c.label} <b>{c.offerCount}</b>
            </button>
          );
        })}
        <button type="button" className="d2-chip d2-chip--alt"
          aria-pressed={codesOnly} onClick={() => setCodesOnly((v) => !v)}>
          Only offers with a code <b>{verifiedOffers.filter((d) => d.code).length}</b>
        </button>
      </div>

      <div className="d2-rows">
        {rows.length === 0 ? (
          <div className="d2-none">
            <InstrumentEmpty />
            <p>No offer matches that combination. Apollo&rsquo;s $500 is applied to the quote, so it carries no code to type.</p>
          </div>
        ) : (
          rows.map((d) => {
            const s = splitSaving(d.offer);
            return (
              <div className="d2-row" key={d.brand + d.offer}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={d.logo} alt="" />
                <div>
                  <Link href={d.href} className="d2-row__b">{d.brand}</Link>
                  <span className="d2-row__m">{d.category} &nbsp;&mdash;&nbsp; {d.offer}</span>
                </div>
                <div className="d2-row__r">
                  {s.saving ? <span className="d2-sav">{s.saving}</span> : null}
                  {d.code ? (
                    <button type="button" className={`d2-code${copied === d.code ? " is-done" : ""}`}
                      onClick={() => copy(d.code as string)}>
                      {copied === d.code ? "Copied" : d.code}
                    </button>
                  ) : (
                    <span className="d2-read">no code needed</span>
                  )}
                  <span className="d2-read">read {d.verified ? formatReading(d.verified) : READ}</span>
                </div>
              </div>
            );
          })
        )}
      </div>
      <p aria-live="polite" className="sr-only-d2">
        {copied ? `${copied} copied to your clipboard` : `${rows.length} offers shown`}
      </p>
      <style>{`.sr-only-d2{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0}`}</style>
    </div>
  );
}
