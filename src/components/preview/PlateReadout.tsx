"use client";

import { useEffect, useState } from "react";

/**
 * Live readout of the plate's own measurements.
 *
 * Runs the same algorithm `scripts/teardown/measure.mjs` ran against the five
 * references, in the browser, against this page. Hard-coding these numbers
 * would defeat the point: the readout has to be able to disagree with the
 * intent, which is how we find out the tokens did not land.
 */

type Readout = {
  accentPct: number;
  bandPct: number;
  radii: number;
  shadows: number;
  typeSteps: number;
  sizes: number[];
};

function measure(): Readout {
  const visible = [...document.querySelectorAll(".rl-plate *")].filter((el) => {
    const cs = getComputedStyle(el);
    if (cs.display === "none" || cs.visibility === "hidden" || +cs.opacity === 0) return false;
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0;
  });

  const parse = (c: string) => (c.match(/[\d.]+/g) || []).map(Number);
  const isNeutral = (rgb: number[]) => {
    if (rgb[0] === undefined) return true;
    const [r, g, b] = rgb;
    return Math.max(r, g, b) - Math.min(r, g, b) < 26;
  };

  let accentArea = 0;
  let bandArea = 0;   // the two flooded bands only, excluding plate-only demo devices
  const radii = new Set<string>();
  const shadows = new Set<string>();
  const sizes = new Set<number>();

  for (const el of visible) {
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();

    const bg = cs.backgroundColor.replace(/\s+/g, "");
    if (bg && !bg.startsWith("rgba(0,0,0,0")) {
      if (!isNeutral(parse(bg))) accentArea += Math.max(0, r.width) * Math.max(0, r.height);
    }
    // a gradient-filled band counts as accent too: it is the same flooded region
    if (/gradient/.test(cs.backgroundImage) && el.classList.contains("rl-p-field")) {
      accentArea += Math.max(0, r.width) * Math.max(0, r.height);
    }
    // the homepage-equivalent figure: the two full-bleed flooded bands only.
    // `.rl-p-inset` is a specimen device for showing elevation against colour
    // and has no homepage counterpart, so it is excluded from this figure and
    // included in the raw one above.
    if (el.classList.contains("rl-p-field") || el.classList.contains("rl-p-strip")) {
      bandArea += Math.max(0, r.width) * Math.max(0, r.height);
    }

    if (cs.borderRadius && cs.borderRadius !== "0px") radii.add(cs.borderRadius);
    if (cs.boxShadow && cs.boxShadow !== "none") shadows.add(cs.boxShadow);

    const hasText = [...el.childNodes].some((n) => n.nodeType === 3 && (n.textContent || "").trim().length > 1);
    if (hasText) sizes.add(Math.round(parseFloat(cs.fontSize)));
  }

  const docArea =
    document.documentElement.scrollWidth * document.documentElement.scrollHeight;

  return {
    accentPct: +((accentArea / docArea) * 100).toFixed(2),
    bandPct: +((bandArea / docArea) * 100).toFixed(2),
    radii: radii.size,
    shadows: shadows.size,
    typeSteps: sizes.size,
    sizes: [...sizes].sort((a, b) => a - b),
  };
}

const TARGETS = [
  { key: "bandPct", label: "accent, two bands", target: "12 to 18%", ref: "median 15.39%", was: "0.31%" },
  { key: "typeSteps", label: "type steps", target: "12", ref: "median 12", was: "5" },
  { key: "radii", label: "distinct radii", target: "10", ref: "median 10", was: "3" },
  { key: "shadows", label: "distinct shadows", target: "4+", ref: "median 4", was: "1" },
] as const;

export function PlateReadout() {
  const [r, setR] = useState<Readout | null>(null);

  useEffect(() => {
    const run = () => setR(measure());
    const t = window.setTimeout(run, 250);
    window.addEventListener("resize", run);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("resize", run);
    };
  }, []);

  return (
    <div className="rl-p-readout">
      <div className="rl-p-readout__g">
        {TARGETS.map((t) => (
          <div key={t.key}>
            <span className="rl-p-readout__n">
              {r ? (t.key === "bandPct" ? `${r.bandPct}%` : String(r[t.key as keyof Readout])) : "–"}
            </span>
            <span className="rl-p-readout__l">
              {t.label}
              <br />
              target {t.target}, was {t.was}
            </span>
          </div>
        ))}
      </div>
      <p className="rl-p-readout__d">
        Measured live in your browser against this page, using the same algorithm
        the teardown ran against the five references. Type steps counts distinct
        rendered font sizes on elements carrying their own text, so it reflects
        what this page actually uses rather than what the scale defines.
        {r ? ` Sizes on this page: ${r.sizes.join(", ")}px.` : ""}
        {r ? ` Raw accent including this page's demo inset panel is ${r.accentPct}%; the inset is a specimen device for showing elevation against colour and has no homepage counterpart, so the two-band figure is the one that transfers.` : ""}
      </p>
    </div>
  );
}
