import { Check, Laptop, Stethoscope, Ticket, Users } from "lucide-react";
import { HomeLogo } from "@/components/home/HomeLogo";
import {
  CTA_BAND_H2,
  DISCLOSURE,
  FAQ_HEADING,
  FAQS,
  GLANCE,
  HEADER_RIGHT,
  HERO,
  INCLUDED,
  INCLUDED_HEADING,
  INCLUDED_INTRO,
  MOSHY_TERMS_URL,
  OFFER_CONFIRM,
  OFFER_CTA,
  OFFER_SECTION_TITLE,
  OFFER_VALUE,
  REFERRAL120_CHECKED_ON,
  REFERRAL120_TERMS,
  RIGHT_FOR_ME,
  STEPS,
  STEPS_HEADING,
  TILES,
} from "./copy";
import { CtaLink } from "./CtaLink";
import { OfferWithTerms } from "./OfferWithTerms";
import { PreviewBanner } from "./PreviewBanner";

const ICONS = { stethoscope: Stethoscope, laptop: Laptop, users: Users, ticket: Ticket } as const;

const WRAP = "mx-auto w-full max-w-[1120px] px-4 sm:px-6";
const SECTION = "py-12 lg:py-20";
const H2 = "text-2xl font-bold tracking-[-0.01em] text-[#14120f] sm:text-3xl";

/**
 * The /preview/moshy-updates page body: a Moshy member-offer page modelled on
 * /moshy. `preview` drives the banner and the confirm step before links open.
 */
export function MoshyUpdatesView({ href, preview, footer }: { href: string; preview: boolean; footer?: React.ReactNode }) {
  const cta = (label: string = HERO.button) => <CtaLink href={href} label={label} preview={preview} confirmText={OFFER_CONFIRM} />;

  return (
    <div className="nw-root min-h-screen bg-white text-[#14120f]">
      {preview && <PreviewBanner />}
      <div className={preview ? "pt-16 sm:pt-11" : ""}>
        {/* Header */}
        <header className="border-b border-[#ded8cd] bg-white">
          <div className={`${WRAP} flex items-center justify-between gap-4 py-4`}>
            <HomeLogo className="h-7 w-auto" />
            <span className="text-sm text-[#56504a]">{HEADER_RIGHT}</span>
          </div>
        </header>

        <main id="main-content">
          {/* Hero */}
          <section className={`${SECTION} bg-white`}>
            <div className={`${WRAP} grid items-start gap-10 lg:grid-cols-[55fr_45fr] lg:gap-14`}>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#007a95]">{HERO.eyebrow}</p>
                <h1 className="mt-3 text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-4xl lg:text-[2.75rem]">{HERO.h1}</h1>
                <p className="mt-5 text-lg leading-relaxed text-[#3d3833]">{HERO.lead}</p>
                <div className="mt-8">{cta()}</div>
                <p className="mt-3 text-[13px] text-[#56504a]">{HERO.small}</p>
              </div>
              <aside className="rounded-2xl border border-[#ded8cd] bg-[#F6F5F1] p-6 sm:p-7">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#56504a]">At a glance</p>
                <dl className="mt-4 divide-y divide-[#e8e2d6] text-sm">
                  {GLANCE.map(([k, v]) => (
                    <div key={k} className="flex gap-3 py-3">
                      <dt className="w-28 shrink-0 text-[#56504a]">{k}</dt>
                      <dd className="text-[#14120f]">{v}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-5">{cta()}</div>
              </aside>
            </div>
          </section>

          {/* Benefit tiles */}
          <section className={`${SECTION} bg-[#F6F5F1]`}>
            <div className={`${WRAP} grid grid-cols-2 gap-4 lg:grid-cols-4`}>
              {TILES.map((t) => {
                const Icon = ICONS[t.icon];
                return (
                  <div key={t.label} className="rounded-2xl border border-[#ded8cd] bg-white p-5">
                    <Icon className="h-6 w-6 text-[#007a95]" aria-hidden="true" />
                    <p className="mt-3 font-bold">{t.label}</p>
                    <p className="mt-1 text-sm leading-relaxed text-[#56504a]">{t.line}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* How Moshy works */}
          <section className={`${SECTION} bg-white`}>
            <div className={WRAP}>
              <h2 className={H2}>{STEPS_HEADING}</h2>
              <ol className="mt-8 grid gap-6 lg:grid-cols-3">
                {STEPS.map((s, i) => (
                  <li key={s.title} className="rounded-2xl border border-[#ded8cd] bg-[#F6F5F1] p-6">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#14120f] text-sm font-bold text-white">{i + 1}</span>
                    <p className="mt-4 font-bold">{s.title}</p>
                    <p className="mt-2 text-[15px] leading-relaxed text-[#3d3833]">{s.body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* What's included */}
          <section className={`${SECTION} bg-[#F6F5F1]`}>
            <div className={`${WRAP} max-w-3xl`}>
              <h2 className={H2}>{INCLUDED_HEADING}</h2>
              <p className="mt-3 text-[15px] text-[#56504a]">{INCLUDED_INTRO}</p>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {INCLUDED.map((item) => (
                  <li key={item} className="flex items-start gap-3 rounded-xl border border-[#ded8cd] bg-white px-4 py-3 text-[15px] leading-relaxed">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-[#007a95]" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Member offer */}
          <section className={`${SECTION} bg-white`}>
            <div className={`${WRAP} max-w-3xl`}>
              <h2 className={H2}>{OFFER_SECTION_TITLE}</h2>
              <div className="mt-6">
                <OfferWithTerms
                  code="REFERRAL120"
                  valueLine={OFFER_VALUE}
                  terms={
                    <>
                      <p>{REFERRAL120_TERMS}</p>
                      <p className="mt-2">
                        Full terms:{" "}
                        <a href={MOSHY_TERMS_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#007a95] underline">
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
            </div>
          </section>

          {/* Is it right for me? */}
          <section className={`${SECTION} bg-[#F6F5F1]`}>
            <div className={`${WRAP} max-w-3xl`}>
              <h2 className={H2}>{RIGHT_FOR_ME.h2}</h2>
              <p className="mt-4 text-lg leading-relaxed text-[#3d3833]">{RIGHT_FOR_ME.body}</p>
            </div>
          </section>

          {/* FAQ */}
          <section className={`${SECTION} bg-white`}>
            <div className={`${WRAP} max-w-3xl`}>
              <h2 className={H2}>{FAQ_HEADING}</h2>
              <div className="mt-6 divide-y divide-[#ded8cd] rounded-2xl border border-[#ded8cd] bg-white">
                {FAQS.map((f) => (
                  <details key={f.q} className="group px-5 py-4">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#007a95]">
                      {f.q}
                      <span aria-hidden="true" className="text-lg leading-none text-[#56504a] transition-transform group-open:rotate-45">+</span>
                    </summary>
                    <p className="mt-3 leading-relaxed text-[#3d3833]">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          {/* Closing CTA */}
          <section className={`${SECTION} bg-[#F6F5F1]`}>
            <div className={`${WRAP} max-w-2xl text-center`}>
              <h2 className={H2}>{CTA_BAND_H2}</h2>
              <div className="mt-6">{cta()}</div>
            </div>
          </section>

          {/* Disclosure */}
          <section className="border-t border-[#ded8cd] bg-white py-10">
            <div className={`${WRAP} max-w-3xl`}>
              <p className="text-base leading-relaxed text-[#3d3833]">{DISCLOSURE}</p>
            </div>
          </section>
        </main>

        {footer}
      </div>
    </div>
  );
}
