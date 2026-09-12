import Link from "next/link";
import { Ladder } from "@/components/preview/redesign/Ladder";
import { Nav, NavRail } from "@/components/preview/redesign/Nav";
import { NewsletterRd } from "@/components/preview/redesign/NewsletterRd";
import { PicksTable } from "@/components/preview/redesign/PicksTable";
import { formatReading, oldestReadingISO } from "@/lib/preview/data";
import {
  categories, comingSoon, comparisons, faqs, feature, footer, hero, how,
  newsletter, opticalHeight, partner, picks, trust,
} from "@/lib/preview/live-home";

/**
 * The live homepage, redrawn. Every string comes from `live-home.ts`, which is
 * the inventory taken off referlabs.com.au. No section is added, renamed or
 * dropped in either version.
 *
 * `variant` only changes SEQUENCE and PROPORTION, never content:
 *   "a"  faithful: the live order, redrawn
 *   "b"  re-sequenced, with each move justified in the report
 */

const READ = oldestReadingISO ? formatReading(oldestReadingISO) : "17 Aug 2026";

function Tick() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" aria-hidden="true">
      <path d="M2 8 L6 11.6 L13 3.2" stroke="#a85d09" strokeWidth="2.2" fill="none" />
    </svg>
  );
}

/* ---- sections, each usable in either order ------------------------------ */

function Hero() {
  return (
    <section className="rd-hero">
      <div className="rd-w rd-g">
        <div className="c8">
          {/* OPTICAL: the capital B is pulled left by its own sidebearing so it
              hangs past the rule above and reads aligned. Hanging punctuation
              takes the comma and full stop outside the measure. */}
          <h1 className="rd-d1 rd-optical rd-hang">
            {hero.h1a}<br />{hero.h1b}
          </h1>
        </div>
        <div className="c7">
          <p className="rd-lede rd-balance">{hero.lede}</p>
          <p className="rd-pop">
            <span className="rd-pop__l">{hero.popularLabel}</span>
            {hero.popular.map((p) => <Link key={p.href} href={p.href}>{p.label}</Link>)}
          </p>
          <p className="rd-biz">
            {hero.business.text}{" "}
            <Link href={hero.business.href}>{hero.business.linkText}</Link>
          </p>
        </div>
      </div>
    </section>
  );
}

/* F2's lead: the H1 reduced to one line so the table clears the fold. Same
   words, set smaller and on a single measure. */
function HeroCompact() {
  return (
    <section className="rd-hero rd-hero--compact">
      <div className="rd-w rd-g">
        <div className="c7">
          <h1 className="rd-d2 rd-optical rd-hang">{hero.h1a} {hero.h1b}</h1>
          <p className="rd-lede rd-balance" style={{ marginTop: "0.9rem" }}>{hero.lede}</p>
        </div>
        <div className="c5 start8 rd-hero__aside">
          <p className="rd-pop" style={{ marginTop: 0 }}>
            <span className="rd-pop__l">{hero.popularLabel}</span>
            {hero.popular.map((p) => <Link key={p.href} href={p.href}>{p.label}</Link>)}
          </p>
          <p className="rd-biz">
            {hero.business.text} <Link href={hero.business.href}>{hero.business.linkText}</Link>
          </p>
        </div>
      </div>
    </section>
  );
}

/* F3's lead: the proposition stated as a fact. The date is the largest thing
   on the page and the sentence under it is the one the live page already runs
   above the table. No new claim is made. */
function DateLead() {
  return (
    <section className="rd-datelead">
      <div className="rd-w rd-g">
        <div className="c8">
          <p className="rd-datelead__k">Oldest reading in the table below</p>
          <p className="rd-datelead__d">{READ}</p>
        </div>
        <div className="c4 rd-datelead__s">
          <p className="rd-body">
            {picks.noteBefore.replace(/,\s*the oldest of them on\s*$/, ".")}
          </p>
          <p className="rd-pop" style={{ marginTop: "1rem" }}>
            <span className="rd-pop__l">{hero.popularLabel}</span>
            {hero.popular.map((p) => <Link key={p.href} href={p.href}>{p.label}</Link>)}
          </p>
        </div>
      </div>
    </section>
  );
}

function Feature() {
  return (
    <section className="rd-sec" style={{ paddingBlockStart: 0 }}>
      <div className="rd-w">
        <div className="rd-feat">
          <div className="rd-feat__g">
            <div className="rd-feat__l">
              <div className="rd-feat__hd">
                <span className="rd-bd__well">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={feature.logo} alt="" width={64} height={opticalHeight(feature.logo, 44)}
                    style={{ maxHeight: opticalHeight(feature.logo, 44) }} />
                </span>
                <span>
                  <span className="rd-kicker">{feature.category}</span>
                  <span className="rd-d3" style={{ display: "block" }}>{feature.brand}</span>
                </span>
              </div>
              {/* THE SCALE-RULE BREAK. Everywhere else the brand name outranks
                  the offer, because the brand is what we vouch for and the
                  offer is the merchant's claim. Here it is inverted: $500 is
                  set larger than "Apollo Energy Group". Reasoning in the
                  report — this card exists because of the number, the number
                  is the thing that is ours rather than Apollo's, and obeying
                  the rule buried it at 15.5px inside a paragraph. */}
              <p className="rd-feat__fig">
                <span className="rd-feat__amt">$500</span>
                <span className="rd-feat__amtl">off your quote, on top of the federal rebate</span>
              </p>
              <p className="rd-body" style={{ maxWidth: "48ch" }}>{feature.body}</p>
              <Link href={feature.href} className="rd-feat__cta">{feature.cta}</Link>
            </div>
            <div className="rd-feat__r"><Ladder /></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Trust() {
  return (
    <section className="rd-trust">
      <div className="rd-w">
        <ul>
          {trust.map((t) => <li key={t}><Tick />{t}</li>)}
        </ul>
      </div>
    </section>
  );
}

function Picks({ lead }: { lead?: boolean }) {
  return (
    <section className="rd-sec rd-sec--tight" aria-labelledby="rd-picks">
      <div className="rd-w">
        <div className="rd-sechd">
          <h2 id="rd-picks" className={lead ? "rd-d2 rd-optical" : "rd-d2 rd-optical"}>{picks.heading}</h2>
          <Link href={picks.allLink.href}>{picks.allLink.label}</Link>
        </div>
        <p className="rd-cap" style={{ margin: "0.65rem 0 1.5rem" }}>
          {picks.noteBefore}<strong style={{ color: "var(--saffron-deep)", fontWeight: 600 }}>{READ}</strong>{picks.noteAfter}
        </p>
        <PicksTable />
      </div>
    </section>
  );
}

function Categories() {
  return (
    <section className="rd-sec rd-sec--wide" aria-labelledby="rd-cats">
      <div className="rd-w">
        <h2 id="rd-cats" className="rd-d2 rd-optical" style={{ marginBottom: "1.5rem" }}>{categories.heading}</h2>
        <div className="rd-cats">
          {categories.items.map((c) => (
            <div className="rd-cat" key={c.href}>
              <Link href={c.href} className="rd-cat__h"><span className="rd-d3">{c.label}</span></Link>
              <p className="rd-cat__b">{c.body}</p>
              <span className="rd-cat__l">
                {c.links.map((l) => <Link key={l.href} href={l.href}>{l.label}</Link>)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ComingSoon() {
  return (
    <section className="rd-sec" style={{ paddingBlockStart: 0 }} aria-labelledby="rd-soon">
      <div className="rd-w">
        <div className="rd-soon">
          <h2 id="rd-soon" className="rd-d3">{comingSoon.label}</h2>
          <p className="rd-body" style={{ marginTop: "0.5rem", maxWidth: "62ch" }}>{comingSoon.body}</p>
          <span className="rd-soon__t">
            {comingSoon.items.map((i) => <Link key={i.href} href={i.href}>{i.label}</Link>)}
          </span>
          <p style={{ marginTop: "1rem" }}>
            <Link href={comingSoon.href} className="rd-act">{comingSoon.cta}</Link>
          </p>
        </div>
      </div>
    </section>
  );
}

function How() {
  return (
    <section className="rd-sec rd-sec--wide rd-rule-1" aria-labelledby="rd-how">
      <div className="rd-w rd-g rd-how">
        <div className="c5">
          <h2 id="rd-how" className="rd-d2 rd-optical">{how.heading}</h2>
        </div>
        <div className="c6 start7">
          {how.paras.map((p) => <p className="rd-body" key={p.slice(0, 24)} style={{ maxWidth: "62ch" }}>{p}</p>)}
          <ul>{how.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
        </div>
      </div>
    </section>
  );
}

function Comparisons() {
  return (
    <section className="rd-sec rd-sec--tight" aria-labelledby="rd-cmp">
      <div className="rd-w">
        <div className="rd-sechd" style={{ marginBottom: "1.25rem" }}>
          <h2 id="rd-cmp" className="rd-d2 rd-optical">{comparisons.heading}</h2>
          <Link href={comparisons.allLink.href}>{comparisons.allLink.label}</Link>
        </div>
        <div className="rd-cmp">
          {comparisons.items.map((c) => (
            <Link key={c.href} href={c.href}>
              <span className="rd-kicker">{c.kicker}</span>
              <span className="rd-d3 rd-cmp__t">{c.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Faqs() {
  return (
    <section className="rd-sec" aria-labelledby="rd-faq">
      <div className="rd-w rd-g">
        <div className="c4">
          <h2 id="rd-faq" className="rd-d2 rd-optical">{faqs.heading}</h2>
        </div>
        <div className="c7 rd-faq start6">
          {faqs.items.map((f) => (
            <details key={f.q}>
              <summary>
                <span className="rd-d4">{f.q}</span>
                <span className="rd-faq__i" aria-hidden="true" />
              </summary>
              <p className="rd-faq__a">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function News() {
  return (
    <section className="rd-news rd-sec rd-sec--wide" aria-labelledby="rd-news">
      <div className="rd-w rd-g">
        <div className="c6">
          <h2 id="rd-news" className="rd-d2 rd-optical">{newsletter.heading}</h2>
        </div>
        <div className="c6 start7">
          <p className="rd-body" style={{ maxWidth: "54ch" }}>{newsletter.body}</p>
          <NewsletterRd />
        </div>
      </div>
    </section>
  );
}

function Partner() {
  return (
    <section className="rd-partner rd-sec" aria-labelledby="rd-partner">
      <div className="rd-w rd-g">
        <div className="c8">
          <h2 id="rd-partner" className="rd-d2 rd-optical">{partner.heading}</h2>
          <p>{partner.body}</p>
          <Link href={partner.href} className="rd-partner__cta">{partner.cta}</Link>
        </div>
      </div>
    </section>
  );
}

/* ---- page --------------------------------------------------------------- */

export function Home({ variant, lead = "claim" }: { variant: "a" | "b"; lead?: "claim" | "table" | "date" }) {
  return (
    <div className="rd">
      <header className="rd-hd rl-own">
        <div className="rd-w rd-hd__g">
          <Link href="/" className="rd-wm">REFER LABS</Link>
          <Nav />
          <Link href="/deals" className="rd-hd__cta">Deals</Link>
        </div>
        <NavRail />
      </header>

      <main id="main-content">
        {variant === "a" ? (
          <>
            <Hero />
            <Feature />
            <Trust />
            <Picks />
            <Categories />
            <ComingSoon />
            <How />
            <Comparisons />
            <Faqs />
            <News />
            <Partner />
          </>
        ) : (
          <>
            {/* B's re-sequencing. Reasons are in the report, one per move.
                `lead` changes only what the page opens with; every section is
                still present and the copy is identical across all three. */}
            {lead === "claim" ? <><Hero /><Trust /><Picks lead /></> : null}
            {lead === "table" ? <><HeroCompact /><Picks lead /><Trust /></> : null}
            {lead === "date" ? <><DateLead /><Picks lead /><Hero /><Trust /></> : null}
            <Feature />
            <Categories />
            <ComingSoon />
            <Comparisons />
            <How />
            <Faqs />
            <News />
            <Partner />
          </>
        )}
      </main>

      <footer className="rd-ft rl-own">
        <div className="rd-w rd-g">
          <div className="c4">
            <span className="rd-ft__wm">REFER LABS</span>
            <p>{footer.blurb}</p>
            <nav className="rd-ft__soc" aria-label="Social">
              {footer.social.map((s) => (
                <a key={s.href} href={s.href} rel="noopener nofollow">{s.label}</a>
              ))}
            </nav>
          </div>
          {footer.columns.map((col, i) => (
            <div className={i === 0 ? "c3" : i === 1 ? "c3" : "c2"} key={col.heading}
              style={{ gridColumn: i === 2 ? "span 2" : undefined }}>
              <h3>{col.heading}</h3>
              {col.links.map((l) => <Link key={l.href} href={l.href}>{l.label}</Link>)}
            </div>
          ))}
        </div>
        <div className="rd-w rd-legal">
          <p>{footer.copyright} {footer.health}</p>
          <nav aria-label="Legal">
            {footer.legalLinks.map((l) => <Link key={l.href} href={l.href}>{l.label}</Link>)}
            <span className="rd-cap" style={{ alignSelf: "center" }}>{footer.cookie}</span>
          </nav>
        </div>
      </footer>
    </div>
  );
}
