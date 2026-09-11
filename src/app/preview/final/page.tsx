import type { Metadata } from "next";
import Link from "next/link";
import "./index.css";
import { archivoBlack, bricolage, darker } from "./fonts";
import { liveCodes, wallBrands } from "@/lib/preview/directions";
import { formatReading, oldestReadingISO, verifiedOfferCount } from "@/lib/preview/data";

export const metadata: Metadata = {
  title: "Final build, three accents",
  robots: { index: false, follow: false },
};

const READ = oldestReadingISO ? formatReading(oldestReadingISO) : "17 August 2026";
const H1 = "We opened the page on a day, and the day is printed.";

const SPECIMENS = [
  {
    cls: "fz-b", name: "Bricolage Grotesque", note: "the incumbent",
    argue: "Most character of the three and the widest weight range, but it is the 2025-26 startup face and a designer will place it on sight. Its quirks (the flared terminals, the tall x-height) read as personality at 88px and as noise at 14px.",
  },
  {
    cls: "fz-a", name: "Archivo Black", note: "recommended",
    argue: "An industrial grotesque with real mass and no period tells. It pairs with Archivo as a true family rather than a guess, so display and body share proportions. At 112px it carries the fold on weight rather than on novelty, which is what makes it survive being looked at twice.",
  },
  {
    cls: "fz-d", name: "Darker Grotesque", note: "the condensed option",
    argue: "Very tall x-height and narrow, so a long headline fits at a larger size than either alternative. That is a real advantage here. It is also lighter in colour at the same size, so the page loses the weight that makes D5 read as confident.",
  },
];

const VARIANTS = [
  { id: "a", name: "Magenta", hex: "#d0126e", deep: "#8e0a4a", soft: "#fbe7f0",
    note: "What made D5 stand out. Unusual on a money site, which is the point, but it carries a cosmetic and retail association that works against a health vertical." },
  { id: "b", name: "Saffron", hex: "#a85d09", deep: "#7d4405", soft: "#f9ecdc",
    note: "The colour of marking a line you have read, which is literally the proposition. Sits in the warm paper rather than fighting it. Darkened from #b4640a, which failed AA as a hover text colour at 4.01:1." },
  { id: "c", name: "Ultramarine", hex: "#2f3ad0", deep: "#1f278f", soft: "#e6e8fb",
    note: "Highest contrast of the three and the safest for a US launch, where blue reads institutional. Also the most crowded: every AU competitor is already blue or green." },
];

export default function Page() {
  return (
    <div className={`fz ${bricolage.variable} ${archivoBlack.variable} ${darker.variable}`}>
      <header className="fz-hd rl-own">
        <div className="fz-w">
          <h1>Final build: D5&rsquo;s language on the live information architecture</h1>
          <p>
            <b>The structural idea: scale encodes who verified it.</b> In every
            module the largest type is the thing Refer Labs checked, and
            whatever the merchant asserts is set smaller. Applied in five
            places, so it is a system rather than a flourish, and it survives a
            typeface change because it is a rule about hierarchy.
          </p>
          <p>
            Why no competitor has it: every other comparison site earns on the
            click through to the promotion, so the promotion has to be the
            biggest thing on the page. Refer Labs is the only one whose product
            is the dated verification itself, so it is the only one that can
            make the merchant&rsquo;s claim the smaller number without
            undercutting its own business model.
          </p>
          <p>
            Real data throughout: {verifiedOfferCount} verified offers,{" "}
            {liveCodes.length} live codes, {wallBrands.length} partner brands,
            oldest reading {READ}.
          </p>
        </div>
      </header>

      <section className="fz-s">
        <div className="fz-w">
          <h2>Display face, three specimens at full size</h2>
          <p>The real H1, on the real ground, in the real colour. Nothing else changes.</p>
          {SPECIMENS.map((s) => (
            <div className="fz-spec" key={s.name}>
              <p className="fz-spec__l">
                <b>{s.name}</b> <span>{s.note}</span>
              </p>
              <p className={`fz-spec__h ${s.cls}`}>{H1}</p>
              <p style={{ marginTop: "1rem", color: "#56504a", maxWidth: "76ch", fontSize: 12.5 }}>{s.argue}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="fz-s">
        <div className="fz-w">
          <h2>Accent, three variants</h2>
          <p>Identical in every respect except one token pair.</p>
          <div className="fz-v">
            {VARIANTS.map((v) => (
              <div className="fz-c" key={v.id}>
                <h3>{v.id.toUpperCase()} &mdash; {v.name}</h3>
                <div className="fz-sw" aria-hidden="true">
                  <i style={{ background: v.hex }} />
                  <i style={{ background: v.deep }} />
                  <i style={{ background: v.soft }} />
                </div>
                <p>{v.note}</p>
                <Link href={`/preview/final/${v.id}`} className="fz-go">Open {v.id.toUpperCase()}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="fz-s">
        <div className="fz-w">
          <h2>Measured contrast, every text pair that ships</h2>
          <table className="fz-t">
            <thead>
              <tr><th>Pair</th><th>Ratio</th><th>AA</th></tr>
            </thead>
            <tbody>
              {[
                ["ink #14120f on paper #f7f4ee", "17.03", true],
                ["ink-2 #56504a on paper (body secondary)", "7.24", true],
                ["ink-3 #766f66 on paper (input placeholder)", "4.52", true],
                ["paper on ink #14120f (method, footer)", "17.03", true],
                ["#b6afa4 on ink (method + footer body)", "8.60", true],
                ["#a09a90 on ink (legal)", "6.70", true],
                ["A accent #d0126e on paper (hover text, focus)", "4.79", true],
                ["A accent-deep #8e0a4a on paper (savings, date)", "8.34", true],
                ["A paper on accent (CTA hover fill)", "4.79", true],
                ["B accent #a85d09 on paper (hover text, focus)", "4.52", true],
                ["B accent-deep #7d4405 on paper (savings, date)", "7.08", true],
                ["B paper on accent (CTA hover fill)", "4.52", true],
                ["C accent #2f3ad0 on paper (hover text, focus)", "7.25", true],
                ["C accent-deep #1f278f on paper (savings, date)", "10.96", true],
                ["C paper on accent (CTA hover fill)", "7.25", true],
                ["ink on accent-soft, all three (newsletter)", "15.40 to 16.08", true],
              ].map(([p, r, ok]) => (
                <tr key={p as string}>
                  <td>{p as string}</td>
                  <td>{r as string}</td>
                  <td className={ok ? "fz-ok" : "fz-no"}>{ok ? "PASS" : "FAIL"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
