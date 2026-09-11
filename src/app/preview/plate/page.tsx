import type { Metadata } from "next";
import { publicSans } from "../legacy-font";
import { Public_Sans } from "next/font/google";
import "./plate.css";
import { PlateReadout } from "@/components/preview/PlateReadout";
import { PartnerLogo } from "@/components/preview/PartnerLogo";
import {
  categoriesWithVerifiedOffer,
  formatReading,
  liveCategories,
  oldestReadingISO,
  partnerLogos,
  splitSaving,
  verifiedOfferCount,
  verifiedOffers,
} from "@/lib/preview/data";

const sans = Public_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-rl-plate",
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Style plate",
  robots: { index: false, follow: false },
};

const SCALE = [
  ["--rl-p-t12", 56], ["--rl-p-t11", 48], ["--rl-p-t10", 40], ["--rl-p-t9", 32],
  ["--rl-p-t8", 28], ["--rl-p-t7", 24], ["--rl-p-t6", 20], ["--rl-p-t5", 18],
  ["--rl-p-t4", 16], ["--rl-p-t3", 14], ["--rl-p-t2", 13], ["--rl-p-t1", 12],
] as const;

const RADII = [
  ["--rl-p-r1", "2"], ["--rl-p-r2", "4"], ["--rl-p-r3", "6"], ["--rl-p-r4", "8"],
  ["--rl-p-r5", "10"], ["--rl-p-r6", "12"], ["--rl-p-r7", "16"], ["--rl-p-r8", "20"],
  ["--rl-p-r9", "24"], ["--rl-p-rpill", "pill"],
] as const;

const SHADOWS = [
  ["--rl-p-e1", "e1 rest"], ["--rl-p-e1-hover", "e1 hover"],
  ["--rl-p-e2", "e2 rest"], ["--rl-p-e2-hover", "e2 hover"],
] as const;

function Cap({ children }: { children: React.ReactNode }) {
  return <p className="rl-p-cap">{children}</p>;
}

export default function Plate() {
  const first = verifiedOffers[0];
  const second = verifiedOffers[1];
  const s1 = splitSaving(first.offer);

  return (
    <div className={`rl-plate rl-p-shell ${sans.variable}`} style={{ fontFamily: "var(--font-rl-plate), ui-sans-serif, system-ui, sans-serif" }}>
      {/* ---- Readout ---- */}
      <section className="rl-p-section" style={{ paddingBottom: 0 }}>
        <div className="rl-p-wrap">
          <h1 className="rl-p-h" style={{ fontSize: "var(--rl-p-t10)" }}>
            Style plate
          </h1>
          <p className="rl-p-sub">
            Tokens derived from the Phase 1 medians. Every element below is captioned
            with the measurement it came from. Nothing here is a homepage.
          </p>
          <PlateReadout />
        </div>
      </section>

      {/* ---- Hero on a flooded field, with the tray overlapping ---- */}
      <section className="rl-p-field rl-p-hero" style={{ marginTop: "var(--rl-p-section)" }}>
        <div className="rl-p-wrap">
          <div className="rl-p-hero__grid">
            <div>
              <h2 className="rl-p-hero__h1">
                Every offer carries <em>the date we read it</em>.
              </h2>
              <p className="rl-p-hero__sub">
                We check each offer on the provider&rsquo;s own page and publish the date.
                No provider pays to appear here.
              </p>
              <div className="rl-p-actions">
                <a className="rl-p-btn rl-p-btn--primary" href="#offers">
                  Browse current offers
                </a>
                <a className="rl-p-btn rl-p-btn--secondary" href="#type">
                  How we verify
                </a>
              </div>
              <Cap>
                field #0D4735, white body 10.66:1 (target 7:1) · headline 56px vs
                measured median 52px · button 44px tall, 20px pad, weight 700 vs
                references 700-800
              </Cap>
            </div>

            {/* imagery slot */}
            <div>
              <div className="rl-p-imgslot">
                <p className="rl-p-imgslot__t">
                  IMAGE SLOT, NOT FINAL<br />
                  1040 x 780, 4:3<br />
                  <br />
                  No partner photography is obtainable yet. Placeholder is marked
                  rather than filled with a grey box or unlicensed stock.
                </p>
              </div>
              <Cap>
                median 7 photographic or illustrative assets per reference page;
                our build has 0. This is the gap, held open rather than faked.
              </Cap>
            </div>
          </div>

          {/* the tray, overlapping the band's bottom edge */}
          <div className="rl-p-overlap">
            <div className="rl-p-tray">
              <div className="rl-p-tiles">
                {liveCategories.map((c) => (
                  <a key={c.href} href="#offers" className="rl-p-tile">
                    <span className="rl-p-tile__l">{c.label}</span>
                    <span className="rl-p-tile__b">{c.blurb}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="rl-p-overlap-spacer" aria-hidden="true" />

      <section className="rl-p-section">
        <div className="rl-p-wrap">
          <Cap>
            filled white cards on coloured ground, elevation 2 tray over elevation 1
            tiles. 4 of 5 references use an overlapping tray; none uses transparent
            hairline chips, which is what our build had.
          </Cap>
        </div>
      </section>

      {/* ---- Two elevation levels against colour ---- */}
      <section className="rl-p-section">
        <div className="rl-p-wrap">
          <h2 className="rl-p-h">Two elevation levels</h2>
          <p className="rl-p-sub">
            Both cards sit on the same coloured ground so the difference between
            level 1 and level 2 is visible rather than theoretical. The ground is
            an inset panel, not a third flooded band: the page floods exactly two
            regions, the hero and the verified strip.
          </p>
          <div className="rl-p-inset">
          <div className="rl-p-cardrow">
            <div>
              <article className="rl-p-card">
                <div className="rl-p-card__top">
                  <PartnerLogo src={first.logo} alt="" width={32} height={32} />
                  <div>
                    <p className="rl-p-card__brand">{first.brand}</p>
                    <p className="rl-p-card__cat">{first.category}</p>
                  </div>
                </div>
                {s1.saving ? <span className="rl-p-saving">{s1.saving}</span> : null}
                <p className="rl-p-card__offer">{first.offer}</p>
                <div className="rl-p-meta">
                  {first.code ? <span className="rl-p-code">{first.code}</span> : <span>no code needed</span>}
                  <span className="rl-p-status">Active</span>
                  <span>
                    read <time dateTime={first.verified}>{formatReading(first.verified as string)}</time>
                  </span>
                </div>
              </article>
              <Cap>
                elevation 1: 0 4px 16px rgba(13,71,53,.06), derived from
                NerdWallet&rsquo;s most-used card shadow (0 4px 16px at .05, seen 35
                times) · radius 12px, the measured median
              </Cap>
            </div>

            <div>
              <article className="rl-p-card rl-p-card--raised">
                <p className="rl-p-card__cat" style={{ marginBottom: "0.6rem" }}>
                  <span className="rl-p-num" style={{ fontVariantNumeric: "tabular-nums" }}>
                    {verifiedOfferCount}
                  </span>{" "}
                  offers verified. Oldest reading{" "}
                  {oldestReadingISO ? (
                    <time dateTime={oldestReadingISO}>{formatReading(oldestReadingISO)}</time>
                  ) : ("not recorded")}.
                </p>
                {verifiedOffers.slice(0, 3).map((d) => {
                  const s = splitSaving(d.offer);
                  return (
                    <div key={d.brand} className="rl-p-meta" style={{ borderTop: 0, paddingTop: 0, marginBottom: "0.55rem", justifyContent: "space-between" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--rl-p-ink)", fontWeight: 600 }}>
                        <PartnerLogo src={d.logo} alt="" width={22} height={22} />
                        {d.brand}
                      </span>
                      <span style={{ color: "var(--rl-p-gold)", fontWeight: 700 }}>{s.saving}</span>
                    </div>
                  );
                })}
              </article>
              <Cap>
                elevation 2: 0 20px 25px -5px rgba(13,71,53,.12), derived from
                NerdWallet&rsquo;s raised tray · radius 16px, its value · shadow tinted
                with the field colour, not black
              </Cap>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* ---- Ladders: every radius and every shadow, at rest ---- */}
      <section className="rl-p-section" style={{ paddingTop: 0 }}>
        <div className="rl-p-wrap">
          <h2 className="rl-p-h">Radius and elevation ladders</h2>
          <p className="rl-p-sub">
            Every value in both ladders, rendered at rest so the readout counts
            what the system actually defines rather than what one component happens
            to use.
          </p>
          <div className="rl-p-ladder">
            {RADII.map(([t, px]) => (
              <div key={t} className="rl-p-rung" style={{ borderRadius: `var(${t})` }}>
                <span>{px}</span>
              </div>
            ))}
          </div>
          <Cap>
            10 distinct radii against a measured median of 10 (range 5-16); our
            build had 3. Card default is 12px, the median; the raised tray uses
            16px, NerdWallet&rsquo;s value.
          </Cap>
          <div className="rl-p-ladder" style={{ marginTop: "1.5rem" }}>
            {SHADOWS.map(([t, label]) => (
              <div key={t} className="rl-p-rung rl-p-rung--sh" style={{ boxShadow: `var(${t})` }}>
                <span>{label}</span>
              </div>
            ))}
          </div>
          <Cap>
            4 shadow values across 2 real levels, against a measured median of 4
            (range 1-6); our build had 1 value used on everything. Rest and hover
            for each level, all tinted with the field colour rather than black.
          </Cap>
        </div>
      </section>

      {/* ---- Comparison row ---- */}
      <section className="rl-p-section" id="offers">
        <div className="rl-p-wrap">
          <h2 className="rl-p-h">Comparison row</h2>
          <p className="rl-p-sub">Real figures. Two of the eight verified offers.</p>
          <div className="rl-p-tablewrap">
            <table className="rl-p-table">
              <thead>
                <tr>
                  <th scope="col">Provider</th>
                  <th scope="col">Offer</th>
                  <th scope="col">Saving</th>
                  <th scope="col">Code</th>
                  <th scope="col">Last checked</th>
                </tr>
              </thead>
              <tbody>
                {[first, second].map((d) => {
                  const s = splitSaving(d.offer);
                  return (
                    <tr key={d.brand}>
                      <td>
                        <span className="rl-p-cell-l">Provider</span>
                        <span className="rl-p-prov">
                          <PartnerLogo src={d.logo} alt="" width={26} height={26} />
                          {d.brand}
                        </span>
                      </td>
                      <td><span className="rl-p-cell-l">Offer</span>{d.offer}</td>
                      <td>
                        <span className="rl-p-cell-l">Saving</span>
                        <span style={{ color: "var(--rl-p-gold)", fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>
                          {s.saving}
                        </span>
                      </td>
                      <td>
                        <span className="rl-p-cell-l">Code</span>
                        {d.code ? <span className="rl-p-code">{d.code}</span> : <span style={{ color: "var(--rl-p-muted)" }}>none needed</span>}
                      </td>
                      <td>
                        <span className="rl-p-cell-l">Last checked</span>
                        <time dateTime={d.verified} style={{ fontVariantNumeric: "tabular-nums" }}>
                          {formatReading(d.verified as string)}
                        </time>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <Cap>
            body 16px, matching the measured median exactly; our build set this at
            13px · row hover tints to canvas · gold #8F6A1C on white 4.95:1
          </Cap>
        </div>
      </section>

      {/* ---- Verified strip: second flooded region ---- */}
      <section className="rl-p-strip">
        <div className="rl-p-wrap">
          <div className="rl-p-strip__g">
            <div>
              <span className="rl-p-fig rl-p-fig--gold">{verifiedOfferCount}</span>
              <span className="rl-p-figl">offers with a discount we have verified</span>
            </div>
            <div>
              <span className="rl-p-fig rl-p-fig--gold">{categoriesWithVerifiedOffer.length}</span>
              <span className="rl-p-figl">categories with a verified offer</span>
            </div>
            <div>
              <span className="rl-p-fig rl-p-fig--gold">
                {oldestReadingISO ? formatReading(oldestReadingISO) : "not recorded"}
              </span>
              <span className="rl-p-figl">oldest reading on the table above</span>
            </div>
          </div>
          <Cap>
            second of exactly two flooded regions. Two bands is what reaches the
            12-18% accent target without CTM&rsquo;s 44.3%, which would undercut an
            independence claim · gold #F2C14E on field 6.35:1
          </Cap>
        </div>
      </section>

      {/* ---- Buttons, all states ---- */}
      <section className="rl-p-section">
        <div className="rl-p-wrap">
          <h2 className="rl-p-h">Buttons</h2>
          <p className="rl-p-sub">Default, hover, focus and disabled. Hover and focus are live; tab to see focus.</p>
          <div className="rl-p-actions" style={{ marginBottom: "1rem" }}>
            <a className="rl-p-btn rl-p-btn--primary" href="#offers">Browse current offers</a>
            <a className="rl-p-btn rl-p-btn--secondary" href="#offers">How we verify</a>
            <button className="rl-p-btn rl-p-btn--primary" disabled>Disabled primary</button>
            <button className="rl-p-btn rl-p-btn--secondary" disabled>Disabled secondary</button>
          </div>
          <Cap>
            44px tall and 20px horizontal padding, both inside the measured range
            (34-44px tall, 9-16px pad) · weight 700 against references at 700-800;
            our build was 500 · focus 2px solid at 2px offset, kept because Phase 1
            found it stronger than every reference
          </Cap>
        </div>
      </section>

      {/* ---- Partner strip ---- */}
      <section className="rl-p-section" style={{ paddingTop: 0 }}>
        <div className="rl-p-wrap">
          <h2 className="rl-p-h">Partner logos</h2>
          <div className="rl-p-logos">
            {partnerLogos.map((p) => (
              <PartnerLogo key={p.name} src={p.src} alt={p.name} width={110} height={28} />
            ))}
          </div>
          <Cap>
            the only real imagery we hold: 6 partner logos, greyscale. 4 of 5
            references carry a logo wall. These are marks used to identify a
            partner we link to, not licensed photography.
          </Cap>
        </div>
      </section>

      {/* ---- Colour ---- */}
      <section className="rl-p-section" style={{ paddingTop: 0 }}>
        <div className="rl-p-wrap">
          <h2 className="rl-p-h">Colour</h2>
          <div className="rl-p-swatches">
            <div className="rl-p-sw" style={{ background: "var(--rl-p-field)", color: "#fff", borderColor: "transparent" }}>
              <b>--rl-p-field</b>#0D4735<br />white 10.66:1
            </div>
            <div className="rl-p-sw" style={{ background: "var(--rl-p-action)", color: "#fff", borderColor: "transparent" }}>
              <b>--rl-p-action</b>#0E7C5A<br />on white 5.19:1
            </div>
            <div className="rl-p-sw" style={{ background: "var(--rl-p-surface)", color: "var(--rl-p-gold)" }}>
              <b>--rl-p-gold</b>#8F6A1C<br />on white 4.95:1
            </div>
            <div className="rl-p-sw" style={{ background: "var(--rl-p-field)", color: "var(--rl-p-gold-field)", borderColor: "transparent" }}>
              <b>--rl-p-gold-field</b>#F2C14E<br />on field 6.35:1
            </div>
          </div>
          <Cap>
            green is a deliberate departure, not an average: every Australian
            reference measured is blue or teal (CTM #0F58AB, Finder #1D53FF,
            Canstar #0095A9, Bankrate #13223B). Green cannot go brighter than
            about #0E7C5A and hold AA on white; #0F8A64 measures 4.34:1.
          </Cap>
        </div>
      </section>

      {/* ---- Type specimen ---- */}
      <section className="rl-p-section" id="type" style={{ paddingTop: 0 }}>
        <div className="rl-p-wrap">
          <h2 className="rl-p-h">Type scale, all 12 steps</h2>
          <div className="rl-p-spec">
            {SCALE.map(([token, px]) => (
              <div className="rl-p-spec__row" key={token}>
                <span className="rl-p-spec__k">
                  {px}px
                  <br />
                  {token.replace("--rl-p-", "")}
                </span>
                <span
                  className="rl-p-spec__v"
                  style={{
                    fontSize: `var(${token})`,
                    fontWeight: px >= 28 ? 600 : 400,
                    letterSpacing: px >= 32 ? "-0.02em" : undefined,
                  }}
                >
                  Every offer carries the date we read it
                </span>
              </div>
            ))}
          </div>
          <Cap>
            12 steps against a measured median of 12 (range 8-14); our build had 5.
            Shape copies the references rather than a fixed ratio: 1.08-1.14x
            through the small sizes, 1.17-1.25x into display. The two steps our
            old scale was missing, 24px and 40px, are both here.
          </Cap>
        </div>
      </section>
    </div>
  );
}
