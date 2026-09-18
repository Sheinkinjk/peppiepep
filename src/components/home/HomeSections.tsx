import type React from "react";
import Link from "next/link";
import CookiePreferencesLink from "@/components/consumer/CookiePreferencesLink";
import { Ladder } from "@/components/home/Ladder";
import { faqs, feature, footer, opticalHeight } from "@/lib/home/content";

/** The Apollo Energy feature: the $500 offer, and the rebate ladder that explains "on top of". */
export function Feature() {
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
              {/* The figure outranks the brand name here: this card exists because of the number. */}
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

/** Common questions. Matches the FAQPage JSON-LD in src/app/page.tsx word for word. */
export function Faqs() {
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

export function SiteFooter({ brand, columns = footer.columns, extra }: { brand?: React.ReactNode; columns?: typeof footer.columns; extra?: React.ReactNode }) {
  return (
    <footer className="rd-ft rl-own">
      <div className="rd-w rd-g">
        <div className="c4">
          {brand}
          <p>{footer.blurb}</p>
          {extra}
          <nav className="rd-ft__soc" aria-label="Social">
            {footer.social.map((s) => (
              <a key={s.href} href={s.href} rel="noopener nofollow">{s.label}</a>
            ))}
          </nav>
        </div>
        {columns.map((col, i) => (
          <div className={i === 2 ? "c2" : "c3"} key={col.heading} style={{ gridColumn: i === 2 ? "span 2" : undefined }}>
            <h3>{col.heading}</h3>
            {col.links.map((l) => <Link key={l.href} href={l.href}>{l.label}</Link>)}
          </div>
        ))}
      </div>
      <div className="rd-w rd-legal">
        <p>{footer.copyright} {footer.health}</p>
        <nav aria-label="Legal">
          {footer.legalLinks.map((l) => <Link key={l.href} href={l.href}>{l.label}</Link>)}
          <span className="rd-ft__cookie"><CookiePreferencesLink /></span>
        </nav>
      </div>
    </footer>
  );
}
