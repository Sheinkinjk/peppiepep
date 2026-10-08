import Image from "next/image";
import { HomeLogo } from "@/components/home/HomeLogo";
import { HubObject } from "@/components/home/Objects";
import {
  ABOUT_BODY,
  ABOUT_HEADING,
  CHIPS,
  CLOSING,
  DISCLOSURE,
  FAQ_HEADING,
  FAQS,
  HEADER_RIGHT,
  HERO,
  MOSHY_TERMS_URL,
  NOTICE,
  OFFER_CONFIRM,
  OFFER_CTA,
  OFFER_HEADING,
  OFFER_VALUE,
  REFERRAL120_CHECKED_ON,
  REFERRAL120_TERMS,
  STEPS,
  STEPS_HEADING,
} from "./copy";
import { CtaLink } from "./CtaLink";
import { OfferWithTerms } from "./OfferWithTerms";
import { PreviewBanner } from "./PreviewBanner";

/**
 * The /preview/moshy-updates page body, in the homepage's design system
 * (.rd.hy tokens, Geist, the drawn object set). Every word comes from copy.ts.
 * `preview` drives the banner and the confirm step before links open.
 */
export function MoshyUpdatesView({ href, preview, footer }: { href: string; preview: boolean; footer?: React.ReactNode }) {
  const cta = (label: string, tone: "light" | "dark") => (
    <CtaLink href={href} label={label} tone={tone} preview={preview} confirmText={OFFER_CONFIRM} />
  );

  return (
    <div className="rd hy mp">
      {preview && <PreviewBanner />}
      <div className={preview ? "pt-16 sm:pt-11" : ""}>
        <header className="mp-hd">
          <div className="rd-w mp-hd__g">
            <div className="mp-lock">
              <HomeLogo className="mp-lock__rl" />
              <span className="mp-lock__x" aria-hidden="true">×</span>
              <Image src="/logos/moshy.png" alt="Moshy" width={40} height={40} className="mp-lock__mo" unoptimized />
              <span className="mp-lock__name" aria-hidden="true">Moshy</span>
            </div>
            <span className="mp-hd__r">{HEADER_RIGHT}</span>
          </div>
        </header>

        <main id="main-content">
          <section className="mp-hero">
            <div className="rd-w mp-hero__g">
              <div>
                <p className="rd-kicker">{HERO.kicker}</p>
                <h1 className="rd-d1 rd-optical">{HERO.h1}</h1>
                <p className="rd-lede">{HERO.lede}</p>
                <div className="mp-hero__cta">{cta(HERO.button, "light")}</div>
                <p className="mp-hero__small">{HERO.small}</p>
              </div>
              <div className="mp-art" aria-hidden="true">
                <div className="mp-art__plate">
                  <HubObject kind="envelope" size={240} className="hy-obj mp-art__main" />
                </div>
                <div className="mp-art__sat mp-art__sat--a">
                  <HubObject kind="clinic" size={64} />
                </div>
                <div className="mp-art__sat mp-art__sat--b">
                  <HubObject kind="phone" size={64} />
                </div>
              </div>
            </div>
          </section>

          <div className="rd-w mp-notice-wrap">
            <aside className="mp-notice" aria-labelledby="mp-notice-h">
              <div className="mp-notice__plate">
                <HubObject kind="document" size={56} />
              </div>
              <div>
                <h2 id="mp-notice-h" className="rd-d3">{NOTICE.h2}</h2>
                <p>{NOTICE.body}</p>
              </div>
            </aside>
          </div>

          <section className="mp-sec">
            <div className="rd-w">
              <ul className="mp-chips">
                {CHIPS.map((c) => (
                  <li key={c.title} className="mp-chip">
                    <div className="mp-chip__plate">
                      <HubObject kind={c.object} size={52} />
                    </div>
                    <p className="mp-chip__t">{c.title}</p>
                    <p className="mp-chip__b">{c.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="mp-sec" style={{ paddingTop: 0 }}>
            <div className="rd-w">
              <h2 className="rd-d2">{STEPS_HEADING}</h2>
              <ol className="mp-steps">
                {STEPS.map((s, i) => (
                  <li key={s.title} className="mp-step">
                    <span className="mp-step__n" aria-hidden="true">{i + 1}</span>
                    <p className="mp-step__t">{s.title}</p>
                    <p className="mp-step__b">{s.body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <section className="mp-sec mp-offer-sec">
            <div className="rd-w mp-offer-g">
              <div>
                <HubObject kind="offer" size={72} className="hy-obj hy-sec-obj" />
                <h2 className="rd-d2">{OFFER_HEADING}</h2>
              </div>
              <OfferWithTerms
                code="REFERRAL120"
                valueLine={OFFER_VALUE}
                terms={
                  <>
                    <p>{REFERRAL120_TERMS}</p>
                    <p className="mt-2">
                      Full terms:{" "}
                      <a href={MOSHY_TERMS_URL} target="_blank" rel="noopener noreferrer">
                        getmoshy.com.au/terms
                      </a>
                      . Checked on Moshy&apos;s sign-up page on {REFERRAL120_CHECKED_ON}.
                    </p>
                  </>
                }
                ctaHref={href}
                ctaLabel={OFFER_CTA}
                preview={preview}
                confirmText={OFFER_CONFIRM}
              />
            </div>
          </section>

          <section className="mp-sec">
            <div className="rd-w mp-about">
              <div>
                <h2 className="rd-d2">{ABOUT_HEADING}</h2>
                <p className="mp-about__b">{ABOUT_BODY}</p>
              </div>
              <div>
                <h2 className="rd-d3" style={{ marginBottom: 18 }}>{FAQ_HEADING}</h2>
                <div className="mp-faq">
                  {FAQS.map((f) => (
                    <details key={f.q}>
                      <summary>
                        {f.q}
                        <span className="mp-faq__pm" aria-hidden="true">+</span>
                      </summary>
                      <p>{f.a}</p>
                    </details>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="mp-close">
            <div className="rd-w mp-close__g">
              <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
                <HubObject kind="send" size={72} />
                <h2 className="rd-d2">{CLOSING.h2}</h2>
              </div>
              {cta(CLOSING.button, "light")}
            </div>
          </section>

          <section className="mp-disc">
            <div className="rd-w">
              <p>{DISCLOSURE}</p>
            </div>
          </section>
        </main>

        {footer}
      </div>
    </div>
  );
}
