import { Laptop, MailCheck, Stethoscope, Ticket } from "lucide-react";
import { HomeLogo } from "@/components/home/HomeLogo";
import {
  CTA_BAND_H2,
  DISCLOSURE_BEFORE_ABN,
  FAQ_HEADING,
  FAQS,
  HEADER_RIGHT,
  HERO,
  OFFER_CONFIRM,
  OFFER_CTA,
  OFFER_SECTION_TITLE,
  PLACEHOLDERS,
  RIGHT_FOR_ME,
  STEP_1,
  STEP_2_AFTER,
  STEP_2_BEFORE,
  STEPS_HEADING,
  TILES,
} from "./copy";
import { CtaLink } from "./CtaLink";
import { OfferWithTerms } from "./OfferWithTerms";
import { Placeholder } from "./Placeholder";
import { PreviewBanner } from "./PreviewBanner";

const ICONS = { stethoscope: Stethoscope, laptop: Laptop, ticket: Ticket, mailcheck: MailCheck } as const;

const WRAP = "mx-auto w-full max-w-[1120px] px-4 sm:px-6";
const SECTION = "py-12 lg:py-20";
const H2 = "text-2xl font-bold tracking-[-0.01em] text-[#14120f] sm:text-3xl";

function Practitioner() {
  return <Placeholder>{PLACEHOLDERS.practitionerType}</Placeholder>;
}

/**
 * The /preview/moshy-updates page body. Moshy's site collects any email; this
 * page links there and shows the Refer Labs code with its terms. `preview`
 * drives the banner, badges and the confirm step before links open.
 */
export function MoshyUpdatesView({ href, preview, footer }: { href: string; preview: boolean; footer?: React.ReactNode }) {
  const cta = <CtaLink href={href} label={HERO.button} preview={preview} confirmText={OFFER_CONFIRM} />;

  return (
    <div className="nw-root min-h-screen bg-white text-[#14120f]">
      {preview && <PreviewBanner />}
      <div className={preview ? "pt-16 sm:pt-11" : ""}>
        {/* 1. Header */}
        <header className="border-b border-[#ded8cd] bg-white">
          <div className={`${WRAP} flex items-center justify-between gap-4 py-4`}>
            <HomeLogo className="h-7 w-auto" />
            <span className="text-sm text-[#56504a]">{HEADER_RIGHT}</span>
          </div>
        </header>

        <main id="main-content">
          {/* 2. Hero */}
          <section className={`${SECTION} bg-white`}>
            <div className={`${WRAP} grid items-center gap-10 lg:grid-cols-[55fr_45fr] lg:gap-14`}>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#007a95]">{HERO.eyebrow}</p>
                <h1 className="mt-3 text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-4xl lg:text-[2.75rem]">{HERO.h1}</h1>
                <p className="mt-5 text-lg leading-relaxed text-[#3d3833]">
                  {HERO.subBefore}
                  <Practitioner />
                  {HERO.subAfter}
                </p>
                <div className="mt-8">{cta}</div>
                <p className="mt-3 text-[13px] text-[#56504a]">{HERO.small}</p>
              </div>
              <div>
                <Placeholder block>
                  <span
                    role="img"
                    aria-label={HERO.imageAlt}
                    className="mt-2 flex aspect-[4/3] w-full items-center justify-center rounded-2xl bg-[#ece7dd] p-6 text-center text-sm text-[#56504a]"
                  >
                    {PLACEHOLDERS.image}
                  </span>
                </Placeholder>
              </div>
            </div>
          </section>

          {/* 3. Benefit tiles */}
          <section className={`${SECTION} bg-[#F6F5F1]`}>
            <div className={`${WRAP} grid grid-cols-2 gap-4 lg:grid-cols-4`}>
              {TILES.map((t) => {
                const Icon = ICONS[t.icon];
                return (
                  <div key={t.label} className="rounded-2xl border border-[#ded8cd] bg-white p-5">
                    <Icon className="h-6 w-6 text-[#007a95]" aria-hidden="true" />
                    <p className="mt-3 font-bold">{t.label}</p>
                    <p className="mt-1 text-sm leading-relaxed text-[#56504a]">
                      {"practitioner" in t ? (
                        <>
                          {t.lineBefore}
                          <Practitioner />
                        </>
                      ) : (
                        t.line
                      )}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* 4. How Moshy works */}
          <section className={`${SECTION} bg-white`}>
            <div className={WRAP}>
              <h2 className={H2}>{STEPS_HEADING}</h2>
              <ol className="mt-8 grid gap-6 lg:grid-cols-3">
                {[
                  <>{STEP_1}</>,
                  <>
                    {STEP_2_BEFORE}
                    <Practitioner />
                    {STEP_2_AFTER}
                  </>,
                  <Placeholder key="support">{PLACEHOLDERS.programSupport}</Placeholder>,
                ].map((body, i) => (
                  <li key={i} className="flex gap-4 rounded-2xl border border-[#ded8cd] bg-[#F6F5F1] p-5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#14120f] text-sm font-bold text-white">
                      {i + 1}
                    </span>
                    <span className="pt-1.5 leading-relaxed">{body}</span>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* 5. Member offer */}
          <section className={`${SECTION} bg-[#F6F5F1]`}>
            <div className={WRAP}>
              <h2 className={H2}>{OFFER_SECTION_TITLE}</h2>
              <div className="mt-6">
                <OfferWithTerms
                  code="REFERRAL120"
                  valueLine={<Placeholder>{PLACEHOLDERS.offerValue}</Placeholder>}
                  terms={<Placeholder block>{PLACEHOLDERS.offerTerms}</Placeholder>}
                  ctaHref={href}
                  ctaLabel={OFFER_CTA}
                  preview={preview}
                  confirmText={OFFER_CONFIRM}
                />
              </div>
            </div>
          </section>

          {/* 6. Is it right for me? */}
          <section className={`${SECTION} bg-white`}>
            <div className={`${WRAP} max-w-3xl`}>
              <h2 className={H2}>{RIGHT_FOR_ME.h2}</h2>
              <p className="mt-4 text-lg leading-relaxed text-[#3d3833]">{RIGHT_FOR_ME.body}</p>
            </div>
          </section>

          {/* 7. FAQ */}
          <section className={`${SECTION} bg-[#F6F5F1]`}>
            <div className={`${WRAP} max-w-3xl`}>
              <h2 className={H2}>{FAQ_HEADING}</h2>
              <div className="mt-6 divide-y divide-[#ded8cd] rounded-2xl border border-[#ded8cd] bg-white">
                {FAQS.map((f) => (
                  <details key={f.q} className="group px-5 py-4">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#007a95]">
                      {f.q}
                      <span aria-hidden="true" className="text-lg leading-none text-[#56504a] transition-transform group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <p className="mt-3 leading-relaxed text-[#3d3833]">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          {/* 8. Repeat CTA band */}
          <section className={`${SECTION} bg-white`}>
            <div className={`${WRAP} max-w-2xl text-center`}>
              <h2 className={H2}>{CTA_BAND_H2}</h2>
              <div className="mt-6">{cta}</div>
            </div>
          </section>

          {/* 9. Disclosure */}
          <section className="border-t border-[#ded8cd] bg-[#F6F5F1] py-10">
            <div className={`${WRAP} max-w-3xl`}>
              <p className="text-base leading-relaxed text-[#3d3833]">
                {DISCLOSURE_BEFORE_ABN}
                <Placeholder>{PLACEHOLDERS.abn}</Placeholder>.
              </p>
            </div>
          </section>
        </main>

        {footer}
      </div>
    </div>
  );
}
