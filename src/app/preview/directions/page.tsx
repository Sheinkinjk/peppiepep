import type { Metadata } from "next";
import Link from "next/link";
import "./index.css";
import { dirCategories, liveCodes, logoDefects, wallBrands } from "@/lib/preview/directions";
import { formatReading, oldestReadingISO, verifiedOfferCount } from "@/lib/preview/data";

export const metadata: Metadata = {
  title: "Five homepage directions",
  robots: { index: false, follow: false },
};

const READ = oldestReadingISO ? formatReading(oldestReadingISO) : "17 August 2026";

const DIRECTIONS = [
  {
    id: "d1", name: "The Record",
    line: "An institution of record. Dark ground, editorial serif, small confident type, a ledger rather than a card grid. Premium through density, not whitespace.",
    family: "Red (oxblood)", face: "Newsreader / IBM Plex Sans", ground: "Dark",
    structure: "Centred masthead, 2-column lead, one dense ledger, ruled index. No card on the page.",
    swatches: ["#12161b", "#171c23", "#9b2c2c", "#d4756b", "#efe9dd"],
  },
  {
    id: "d2", name: "The Instrument",
    line: "The comparison tool is the hero. The first screen is a working object you operate, with the result list updating under your hand.",
    family: "Blue (cobalt)", face: "Familjen Grotesk", ground: "Saturated bands",
    structure: "Two flooded bands with a raised working desk breaking the boundary. Headline beside the control, not above it.",
    swatches: ["#0a1a5e", "#1b3fd8", "#e8edff", "#ffffff", "#b23c00"],
  },
  {
    id: "d3", name: "The Editorial",
    line: "A magazine that happens to compare things. Asymmetric 7/3/2 lead, a derived lead story, then the rest as a two-column run.",
    family: "Violet", face: "Instrument Serif / Archivo", ground: "Light",
    structure: "Heavy rules, 108px display against 13px body, lead story with a spot drawing. No card and no shadow anywhere.",
    swatches: ["#fbfaf8", "#191612", "#4a2d8c", "#6d4bc9", "#d8d3cb"],
  },
  {
    id: "d4", name: "The Specimen",
    line: "Extreme restraint. One narrow column, enormous air, two rules on the whole page, and exactly one large element: the date.",
    family: "None (warm neutral)", face: "Jost", ground: "Light, near-colourless",
    structure: "Single 720px column running down a very tall page. Nothing sits side by side.",
    swatches: ["#faf9f5", "#e3e0d8", "#a8a59d", "#6a6862", "#1a1a17"],
  },
  {
    id: "d5", name: "The Signal",
    line: "Oversized type as the primary visual element. The page is built out of words rather than boxes, and every row shifts its registration on hover and focus.",
    family: "Magenta", face: "Bricolage Grotesque", ground: "Warm light",
    structure: "168px opening, then eight 58px brand names edge to edge as the structure itself.",
    swatches: ["#f7f4ee", "#14120f", "#d0126e", "#8e0a4a", "#ded8cd"],
  },
];

export default function Page() {
  return (
    <div className="dx">
      <header className="dx-hd rl-own">
        <div className="dx-w">
          <h1>Five homepage directions</h1>
          <p>
            Each is a complete homepage, header through footer, on the same real
            data: {verifiedOfferCount} verified offers, {liveCodes.length} live
            codes, {dirCategories.length} categories, {wallBrands.length} partner
            brands, oldest reading {READ}. They share the content and the
            isolation rules and nothing else. No two use the same display face or
            the same primary colour family, and none of them is green, so all
            five are genuine alternatives to the palette already built at
            /preview/home-a.
          </p>
        </div>
      </header>

      <div className="dx-w">
        <div className="dx-g">
          {DIRECTIONS.map((d) => (
            <section className="dx-c" key={d.id}>
              <div className="dx-c__t">
                <span className="dx-c__id">{d.id.toUpperCase()}</span>
                <h2 className="dx-c__n">{d.name}</h2>
              </div>
              <div className="dx-sw" aria-hidden="true">
                {d.swatches.map((s) => <i key={s} style={{ background: s }} />)}
              </div>
              <p>{d.line}</p>
              <div className="dx-meta">
                <span>face</span><b>{d.face}</b>
                <span>colour</span><b>{d.family}</b>
                <span>ground</span><b>{d.ground}</b>
                <span>structure</span><b>{d.structure}</b>
              </div>
              <Link href={`/preview/directions/${d.id}`} className="dx-go">
                Open {d.id.toUpperCase()} full screen
              </Link>
            </section>
          ))}
        </div>

        <div className="dx-note">
          <p><b>Logo inventory, measured.</b> 89 files: 68 PNG, 21 SVG. Every one of the {wallBrands.length} brands on the wall has a usable mark. Two defects, both real:</p>
          <ul>
            {logoDefects.map((d) => (
              <li key={d.file}><b>{d.file}</b> — {d.fault} {d.fix}</li>
            ))}
          </ul>
          <p style={{ marginTop: "0.9rem" }}>
            <b>Not used, deliberately.</b> public/partners holds HubSpot,
            Salesforce, Shopify, Mailchimp, Klaviyo, Attentive and Resend. None
            appears in offers.ts or affiliate-links.ts; they are integration
            marks from the retired SaaS platform. On a wall captioned
            &ldquo;partners&rdquo; they would assert commercial relationships
            that do not exist, which is ACL s29(1)(e).
          </p>
        </div>
      </div>
    </div>
  );
}
