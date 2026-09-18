import Link from "next/link";
import { HomeLogo } from "@/components/home/HomeLogo";
import { Nav, NavRail } from "@/components/home/HomeNav";
import {
  Faqs, Feature, SiteFooter,
} from "@/components/home/HomeSections";
import { HeroSearch } from "@/components/home/HomeSearch";
import { HomeNewsletter } from "@/components/home/HomeNewsletter";
import { HubObject, type ObjectKind } from "@/components/home/Objects";
import { homeCategories, type HomeCategory } from "@/lib/home/readings";
import {
  categories, comparisons, footer, hero, how, newsletter, opticalHeight, partner, picks, trust,
} from "@/lib/home/content";
import { objectFor } from "@/lib/home/hubs";
import { hybridNav } from "@/lib/home/nav";
import {
  categoryCards, comingSoonCard, comparisonCards, howSteps,
} from "@/lib/home/sections";

/**
 * The redesign/b homepage, whole, with the object set applied.
 *
 * One drawn object per hub (Objects.tsx) is the only imagery on the page, and
 * it appears wherever that hub does: the hero stage, the Popular links, the
 * picks, the category row, Coming Soon and the comparison labels. The same
 * drawing at every size is what makes it read as a system rather than as
 * decoration. Every string is the redesign/b set from live-home.ts, except
 * the offer lines, which are computed from offers.ts.
 */

/** "$120 off", "55% off", "2 months free": the saving as a reader would say it. */
function said(fig: string): string {
  return /free/i.test(fig) ? fig : `${fig} off`;
}

/* The footer as the 11 Sep homepage had it, plus the three hubs that went live
   after: Health & Beauty, Sleep and Longevity. Sleep and Longevity have no card
   on this page, so the footer is what keeps a homepage link into each. */
const footerColumns = footer.columns.map((col, i) => i !== 0 ? col : {
  ...col,
  links: col.links.flatMap((l) =>
    l.href === "/hair-loss" ? [l, { label: "Health & Beauty", href: "/health-and-beauty" }]
    : l.href === "/solar-and-energy" ? [l, { label: "Sleep", href: "/sleep" }, { label: "Longevity", href: "/longevity" }]
    : [l]),
});

/** Display headings on this page carry no closing full stop. */
const noStop = (t: string) => t.replace(/\.\s*$/, "");

function Mark({ of, size = 18 }: { of: string; size?: number }) {
  const k = objectFor(of);
  return k ? <HubObject kind={k} size={size} className="hy-obj hy-obj--inline" /> : null;
}

function Header() {
  return (
    <header className="rd-hd rl-own hy-hd">
      <div className="rd-w rd-hd__g">
        <Link href="/" className="hy-logo" aria-label="Refer Labs, home">
          <HomeLogo className="hy-logo__svg" />
        </Link>
        <Nav groups={hybridNav} />
        <HeroSearch />
      </div>
      <NavRail groups={hybridNav} />
    </header>
  );
}

/* ---- the hero: six hub cards ------------------------------------------- */

/* The middle column sits lower than its neighbours, so the six read as a
   composed arrangement rather than a spreadsheet, without tilting any text. */
function Tile({ c }: { c: HomeCategory }) {
  const k = objectFor(c.href);
  const r = c.latest;
  return (
    <li className="hy-tile">
      <Link href={c.href} className="hy-tile__a">
        <span className="hy-tile__plate">{k && <HubObject kind={k} size={64} className="hy-obj hy-tile__obj" />}</span>
        <span className="hy-tile__n">{c.label}</span>
        <span className="hy-tile__o">
          {r?.figure ? said(r.figure) : "Compare options"}
        </span>
        <svg className="hy-tile__arr" width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
          <path d="M3 9 H14 M9.5 4.5 L14 9 L9.5 13.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
    </li>
  );
}

function Hero() {
  return (
    <section className="rd-hero hy-hero-sec">
      <div className="rd-w rd-g hy-hero">
        <div className="c6 hy-hero__text">
          <h1 className="rd-d1 rd-optical">{hero.h1a}<br />{noStop(hero.h1b)}</h1>
          <p className="rd-lede rd-balance">{hero.lede}</p>
          <p className="rd-biz">
            {hero.business.text} <Link href={hero.business.href}>{hero.business.linkText}</Link>
          </p>
        </div>
        <div className="c6 hy-hero__art">
          <ul className="hy-tiles" aria-label="Categories we compare">
            {homeCategories.map((c) => <Tile key={c.key} c={c} />)}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---- this month's top picks: logo, offer, one line, one action ----------- */

function Picks() {
  return (
    <section className="rd-sec rd-sec--tight" aria-labelledby="hy-picks">
      <div className="rd-w">
        <div className="rd-sechd">
          <h2 id="hy-picks" className="rd-d2 rd-optical">{picks.heading}</h2>
          <Link href={picks.allLink.href}>{picks.allLink.label}</Link>
        </div>
        <ul className="hy-picks">
          {picks.items.map((p) => (
            <li key={p.brand} className="hy-pick">
              <div className="hy-pick__hd">
                <span className="hy-pick__logo">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.logo} alt="" width={48} height={opticalHeight(p.logo, 30)}
                    style={{ maxHeight: opticalHeight(p.logo, 30) }} />
                </span>
                <span className="hy-pick__b">{p.brand}</span>
              </div>
              <p className="hy-pick__o">{p.offer}</p>
              <p className="hy-pick__w">{p.body}</p>
              <Link href={p.href} className="hy-pick__cta">{p.cta}</Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---- sections ------------------------------------------------------------ */

function Arrow() {
  return (
    <svg className="hy-arr" width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path d="M3 9 H14 M9.5 4.5 L14 9 L9.5 13.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ---- select your category ------------------------------------------------ */

/* Each hub's object stands on the card's top edge rather than inside a frame,
   so it reads as the thing itself and not as an icon in a box. The title and
   the call to action both land on the hub; the two guide links are the
   shortcuts a returning reader wants. */
function CategoryCardView({ c, offer, soon }: {
  c: { label: string; href: string; body: string; object: ObjectKind;
    links: { label: string; href: string }[]; cta: string };
  offer?: string; soon?: boolean;
}) {
  return (
    <li className={soon ? "hy-cc hy-cc--soon" : "hy-cc"}>
      <HubObject kind={c.object} size={104} className="hy-obj hy-cc__obj" />
      <h3 className="hy-cc__t"><Link href={c.href}>{c.label}</Link></h3>
      {offer && <p className="hy-cc__o">{offer}</p>}
      <p className="hy-cc__b">{c.body}</p>
      <ul className="hy-cc__l">
        {c.links.map((l) => <li key={l.href}><Link href={l.href}>{l.label}</Link></li>)}
      </ul>
      <Link href={c.href} className="hy-cc__cta">{c.cta}<Arrow /></Link>
    </li>
  );
}

function Categories() {
  return (
    <section className="hy-cats-sec" aria-labelledby="hy-cats">
      <div className="rd-w">
        <h2 id="hy-cats" className="rd-d2 rd-optical">{categories.heading}</h2>
        <ul className="hy-cc-grid">
          {categoryCards.map((c) => {
            const r = homeCategories.find((h) => h.href === c.href)?.latest;
            return <CategoryCardView key={c.href} c={c} offer={r?.figure ? `${said(r.figure)} at ${r.brand}` : undefined} />;
          })}
          <CategoryCardView c={comingSoonCard} soon />
        </ul>
      </div>
    </section>
  );
}

/* ---- popular comparisons: the matchup is the picture --------------------- */

function Comparisons() {
  return (
    <section className="rd-sec rd-sec--tight" aria-labelledby="hy-cmp">
      <div className="rd-w">
        <div className="rd-sechd">
          <h2 id="hy-cmp" className="rd-d2 rd-optical">{comparisons.heading}</h2>
          <Link href={comparisons.allLink.href}>{comparisons.allLink.label}</Link>
        </div>
        <ul className="hy-vs-grid">
          {comparisonCards.map((c) => (
            <li key={c.href}>
              <Link href={c.href} className="hy-vs">
                <span className="hy-vs__art" aria-hidden="true">
                  <HubObject kind={c.object} size={72} className="hy-obj hy-vs__obj" />
                  <span className="hy-vs__m">
                    {c.names.map((n, i) => (
                      <span key={n} className="hy-vs__row">
                        {i > 0 && <span className="hy-vs__j">{c.join}</span>}
                        <span className="hy-vs__n">{n}</span>
                      </span>
                    ))}
                  </span>
                </span>
                <span className="hy-vs__k">{c.kicker}</span>
                <span className="hy-vs__t">{c.title}</span>
                <span className="hy-vs__go">Read the comparison<Arrow /></span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---- how refer labs compares: the method, in the order it is done -------- */

function How() {
  return (
    <section className="hy-how" aria-labelledby="hy-how">
      <div className="rd-w">
        <h2 id="hy-how" className="rd-d2 hy-how__h">{how.heading}</h2>
        <ol className="hy-steps">
          {howSteps.map((s) => (
            <li key={s.n} className="hy-step">
              <span className="hy-step__art">
                <HubObject kind={s.object} size={88} className="hy-obj hy-step__obj" />
                <span className="hy-step__node" aria-hidden="true" />
              </span>
              <h3 className="hy-step__t">{s.title}</h3>
              <p className="hy-step__b">{s.body}</p>
              {s.chips && (
                <ul className="hy-step__chips">{s.chips.map((c) => <li key={c}>{c}</li>)}</ul>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---- trust strip: four promises, centred on the page ------------------- */

function Trust() {
  return (
    <section className="hy-trust" aria-label="What Refer Labs promises">
      <div className="rd-w">
        <ul className="hy-trust__bar">
          {trust.map((t) => (
            <li key={t}>
              <svg className="hy-trust__i" width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
                <circle cx="11" cy="11" r="11" fill="var(--teal-soft)" />
                <path d="M6.5 11.4 L9.6 14.3 L15.6 7.9" fill="none" stroke="var(--teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---- partner: centred, on the page ground, so it cannot run into the
   footer's teal. The six hub objects say "every category we cover". ------- */

const PARTNER_OBJECTS: ObjectKind[] = ["scale", "comb", "bottle", "solar", "browser", "tag"];

function Partner() {
  return (
    <section className="hy-partner" aria-labelledby="hy-partner">
      <div className="rd-w">
        <div className="hy-partner__card">
          <div className="hy-partner__objs" aria-hidden="true">
            {PARTNER_OBJECTS.map((k) => <HubObject key={k} kind={k} size={64} className="hy-obj hy-partner__obj" />)}
          </div>
          <h2 id="hy-partner" className="rd-d2 hy-partner__h">{noStop(partner.heading)}</h2>
          <p className="hy-partner__b">{partner.body}</p>
          <Link href={partner.href} className="hy-partner__cta">{partner.cta}<Arrow /></Link>
        </div>
      </div>
    </section>
  );
}

function News() {
  return (
    <section className="rd-news rd-sec rd-sec--wide" aria-labelledby="hy-news">
      <div className="rd-w rd-g">
        <div className="c6">
          <HubObject kind="envelope" size={84} className="hy-obj hy-sec-obj" />
          <h2 id="hy-news" className="rd-d2 rd-optical">{newsletter.heading}</h2>
        </div>
        <div className="c6 start7">
          <p className="rd-body" style={{ maxWidth: "54ch" }}>{newsletter.body}</p>
          <HomeNewsletter />
        </div>
      </div>
    </section>
  );
}

export function HomePage() {
  return (
    <div className="rd hy">
      <Header />
      <main id="main-content">
        <Hero />
        <Trust />
        <Picks />
        <Feature />
        <Categories />
        <Comparisons />
        <How />
        <Faqs />
        <News />
        <Partner />
      </main>
      <SiteFooter columns={footerColumns} brand={<HomeLogo className="hy-logo__svg hy-logo__svg--ft" />} />
    </div>
  );
}
