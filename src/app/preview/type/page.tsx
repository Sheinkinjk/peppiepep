import type { Metadata } from "next";
import "./type.css";
import {
  Anybody, Fraunces, Instrument_Sans, Schibsted_Grotesk, Wix_Madefor_Display,
  Archivo, Source_Serif_4, Newsreader, Public_Sans,
} from "next/font/google";
import { hero, how } from "@/lib/preview/live-home";

export const metadata: Metadata = {
  title: "Display face, five candidates",
  robots: { index: false, follow: false },
};

/* the five candidates */
const schibsted = Schibsted_Grotesk({ subsets: ["latin"], display: "swap", variable: "--f-schibsted" });
const instrument = Instrument_Sans({ subsets: ["latin"], display: "swap", variable: "--f-instrument" });
const madefor = Wix_Madefor_Display({ subsets: ["latin"], display: "swap", variable: "--f-madefor" });
const fraunces = Fraunces({ subsets: ["latin"], display: "swap", axes: ["SOFT", "WONK", "opsz"], variable: "--f-fraunces" });
const anybody = Anybody({ subsets: ["latin"], display: "swap", axes: ["wdth"], variable: "--f-anybody" });

/* the proposed body faces, so the pairings are real rather than described */
const archivo = Archivo({ subsets: ["latin"], display: "swap", variable: "--f-archivo" });
const sourceSerif = Source_Serif_4({ subsets: ["latin"], display: "swap", variable: "--f-source" });
const newsreader = Newsreader({ subsets: ["latin"], display: "swap", variable: "--f-newsreader" });
const publicSans = Public_Sans({ subsets: ["latin"], display: "swap", variable: "--f-public" });

const H1 = `${hero.h1a} ${hero.h1b}`;
const PARA = how.paras[2];

type Cand = {
  id: string; name: string; by: string; why: string;
  at88: string; at14: string; licence: string;
  body: string; bodyVar: string; pairing: string;
  cls: string; weight: number; tracking: string;
};

const CANDS: Cand[] = [
  {
    id: "schibsted", name: "Schibsted Grotesk", by: "Bakken & Bæck, for Schibsted Media Group (2023)",
    why: "Commissioned as the house face for a Nordic news group running hundreds of mastheads, so it was drawn to carry a headline and a caption in the same voice. It exists because Schibsted was paying licence fees across dozens of titles and wanted one face it owned.",
    at88: "The g is a single-storey with a curled tail, the a has a genuine spur, and the terminals cut on a slight angle rather than square. At 88px the R's leg kicks out, which is the letter you notice.",
    at14: "Holds completely. It was designed for news body copy first, so the x-height and the counters survive small sizes better than any display-first face here.",
    licence: "SIL Open Font License 1.1. Free, including commercial use and web embedding. No cost.",
    body: "--f-source", bodyVar: "Source Serif 4",
    pairing: "Source Serif 4 rather than Schibsted's own text cut. A grotesque headline over a serif paragraph is the split that reads editorial rather than corporate, and this site's argument is that it is a publisher. Using the superfamily would make the page consistent and anonymous.",
    cls: "t-schibsted", weight: 700, tracking: "-0.032em",
  },
  {
    id: "instrument", name: "Instrument Sans", by: "Rodrigo Fuenzalida and Jordan Egstad, for Instrument (2023)",
    why: "Instrument is a Portland design agency; they drew this as their own identity face and released it. It is a grotesque with the width axis of a technical face, built to sit in product UI and marketing without switching families.",
    at88: "Slightly condensed by default, with flat-sided bowls and an unusually high x-height. The t has a slanted cut on the ascender and the y descender is straight, which reads engineered rather than humanist.",
    at14: "Very strong. This is the most legible of the five at 14px because it was drawn for interface text as much as display.",
    licence: "SIL Open Font License 1.1. Free for commercial and web use. No cost.",
    body: "--f-archivo", bodyVar: "Archivo",
    pairing: "Archivo. Both are grotesques, but Archivo is wider and warmer, so the pairing works by width contrast rather than by style contrast. Keeping the current body face also means only the display changes, which is the lowest-risk swap on this list.",
    cls: "t-instrument", weight: 700, tracking: "-0.03em",
  },
  {
    id: "madefor", name: "Wix Madefor Display", by: "TypeTogether — Veronika Burian and José Scaglione (2022)",
    why: "TypeTogether is a serious retail foundry; Wix commissioned a full display and text family for its own brand and released it openly. The Display cut is optically a separate design from the Text cut rather than the same drawing scaled.",
    at88: "The optical sizing is the point: tighter spacing, finer joins and smaller apertures than the text cut. The capital G has a spur and the Q's tail cuts through the bowl. It looks drawn for large sizes because it was.",
    at14: "This is the weak spot. Madefor Display collapses below about 18px — the joins fill in and the tight apertures close. It would need Madefor Text underneath it, which means shipping two families.",
    licence: "SIL Open Font License 1.1. Free. No cost, but budget for two files if you use it.",
    body: "--f-public", bodyVar: "Public Sans",
    pairing: "Public Sans, not Madefor Text. Madefor Text is the obvious pairing and that is the reason to avoid it: the whole page would be one designer's opinion. Public Sans is a neutral USWDS face that gets out of the way and lets the display carry the identity.",
    cls: "t-madefor", weight: 800, tracking: "-0.03em",
  },
  {
    id: "fraunces", name: "Fraunces", by: "Phaedra Charles and Flavia Zimbardi, Undercase Type (2020)",
    why: "A 'wonky' old-style with variable SOFT and WONK axes, drawn to bring back the eccentricity that optical-size digitisation flattened out. It exists as an argument against neutral type.",
    at88: "The most character of the five by a distance. Real stroke contrast, a swelling on the leg of the R, and at high WONK the g and the l change shape entirely. It is the only candidate here that would be recognisable cropped.",
    at14: "Usable but not comfortable. It is a display-first design; at 14px the contrast thins the hairlines and it needs a sans underneath it for anything dense.",
    licence: "SIL Open Font License 1.1. Free, variable, commercial use fine. No cost.",
    body: "--f-archivo", bodyVar: "Archivo",
    pairing: "Archivo. A high-contrast serif needs a low-contrast, wide-aperture sans under it or the page reads as all texture. Pairing Fraunces with another serif would be the obvious editorial move and would make the offer table much harder to read.",
    cls: "t-fraunces", weight: 700, tracking: "-0.022em",
  },
  {
    id: "anybody", name: "Anybody", by: "Matthieu Salvaggio, Velvetyne Type Foundry (2021)",
    why: "Velvetyne is a French libre type collective with a genuine experimental catalogue. Anybody is a revival of the 1970s Yes/No lettering tradition, variable on width from compressed to extended, drawn to be pushed.",
    at88: "The width axis is the character. Set compressed it goes poster-like; set extended the bowls flatten into slabs. The lowercase e has an angled bar. It is the riskiest face here and the only one that could look like nothing else in the category.",
    at14: "Poor. This is a display face and it does not pretend otherwise. It would never set body copy.",
    licence: "SIL Open Font License 1.1. Free. No cost.",
    body: "--f-newsreader", bodyVar: "Newsreader",
    pairing: "Newsreader, from Production Type. An eccentric display face needs a body face with real authority under it or the page reads as a poster rather than a publication. Newsreader is a straight news serif and it grounds the display.",
    cls: "t-anybody", weight: 700, tracking: "-0.025em",
  },
];

const COMMERCIAL = [
  {
    name: "Söhne", by: "Kris Sowersby, Klim Type Foundry",
    note: "A reinterpretation of Akzidenz-Grotesk as it was remembered through Helvetica in New York signage. The most-used serious grotesque of the last five years and the one a designer would reach for first.",
    price: "Web licence from about USD 250 per style, or roughly USD 1,050 for the six-style family, one-off, at up to 250k monthly pageviews. Klim's pricing is banded by traffic, not subscription.",
  },
  {
    name: "GT Alpina", by: "Reto Moser, Grilli Type",
    note: "A serif with a genuine display cut and real contrast, drawn to bridge editorial and screen. It would give the page the authority Fraunces gestures at, without the eccentricity.",
    price: "Web licence from about CHF 120 per style; the full family with the display cuts runs roughly CHF 600 to 1,000 one-off, banded by pageviews.",
  },
];

export default function Page() {
  const vars = [schibsted, instrument, madefor, fraunces, anybody, archivo, sourceSerif, newsreader, publicSans]
    .map((f) => f.variable).join(" ");
  return (
    <div className={`ty ${vars}`}>
      <header className="ty-hd rl-own">
        <div className="ty-w">
          <h1>Display face: five candidates</h1>
          <p>
            The live H1 and a real paragraph from the page, at the size each
            would actually run. Every candidate is rendered — nothing here is
            described without being shown. Archivo Black, Bricolage, Inter,
            Roboto, Open Sans, Lato, Montserrat, Poppins, Space Grotesk, Geist,
            Satoshi, General Sans and Clash Display are excluded as instructed.
          </p>
        </div>
      </header>

      {CANDS.map((c, i) => (
        <section className="ty-s" key={c.id}>
          <div className="ty-w">
            <div className="ty-meta">
              <span className="ty-n">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h2>{c.name}</h2>
                <p className="ty-by">{c.by}</p>
              </div>
            </div>

            <div className="ty-spec">
              <p className={`ty-h1 ${c.cls}`}
                style={{ fontWeight: c.weight, letterSpacing: c.tracking }}>{H1}</p>
              <p className="ty-para" style={{ fontFamily: `var(${c.body}), sans-serif` }}>{PARA}</p>
              <p className="ty-small" style={{ fontFamily: `var(${c.body}), sans-serif` }}>
                Body face: {c.bodyVar}. Set here at 14px, the size the offer
                table and the category list actually use.
              </p>
              {/* the display face at 14px, which is where display faces fail */}
              <p className={`ty-small ${c.cls}`} style={{ fontWeight: c.weight }}>
                The display face itself at 14px: {PARA.slice(0, 118)}…
              </p>
            </div>

            <div className="ty-notes">
              <div><h3>Why it exists</h3><p>{c.why}</p></div>
              <div><h3>Character at 88px</h3><p>{c.at88}</p></div>
              <div><h3>Behaviour at 14px</h3><p>{c.at14}</p></div>
              <div><h3>Licence and cost</h3><p>{c.licence}</p></div>
              <div><h3>Body pairing, and why not the superfamily</h3><p>{c.pairing}</p></div>
            </div>
          </div>
        </section>
      ))}

      <section className="ty-s ty-s--alt">
        <div className="ty-w">
          <h2>If you want to pay for it</h2>
          <p className="ty-by" style={{ maxWidth: "76ch" }}>
            These two are the commercial answers. Neither is rendered above,
            because rendering them needs a purchased licence and a webfont kit —
            I will not show you a specimen I cannot legally serve, and a
            substitute specimen would be worse than none.
          </p>
          {COMMERCIAL.map((c) => (
            <div className="ty-comm" key={c.name}>
              <h3>{c.name}</h3>
              <p className="ty-by">{c.by}</p>
              <p>{c.note}</p>
              <p className="ty-price">{c.price}</p>
            </div>
          ))}
          <p className="ty-by" style={{ marginTop: "1.25rem", maxWidth: "76ch" }}>
            Prices are indicative from published foundry tiers and would need
            confirming against the licence tier that matches your actual
            pageviews before anyone commits.
          </p>
        </div>
      </section>
    </div>
  );
}
