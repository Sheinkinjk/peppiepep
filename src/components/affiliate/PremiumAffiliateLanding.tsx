import { Fraunces } from "next/font/google";
import Link from "next/link";
import { ArrowRight, Check, Star, ShieldCheck } from "lucide-react";
import type { AffiliatePageConfig } from "./types";

// Editorial serif scoped to these standalone landing pages.
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-fraunces",
});

const DEFAULT_REVIEWED = "June 2026";

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

// Sections that are purely about the affiliate mechanics read as spam in a
// premium editorial layout — surfaced instead via the at-a-glance card + CTAs.
function isOfferSection(heading: string) {
  return /current offer|codes?\s*&|how they work|codes & how/i.test(heading);
}

/**
 * Premium, standalone (no site chrome) affiliate landing template.
 * Generalises the bespoke /moshy design so any brand page can adopt it from its
 * existing AffiliatePageConfig. CRO baked in: a sticky desktop CTA, a mobile
 * sticky bottom CTA, and data-cta attributes for placement-level click tracking.
 */
export default function PremiumAffiliateLanding({ config }: { config: AffiliatePageConfig }) {
  const url = config.affiliateUrl;
  const reviewed = config.lastReviewed ?? DEFAULT_REVIEWED;
  const rating = config.rating;
  const bodySections = config.sections.filter((s) => !isOfferSection(s.heading));

  const cta = (label: string, loc: string, size: "sm" | "md" | "lg" = "md", block = false) => {
    const sizes = {
      sm: "px-5 py-2.5 text-sm",
      md: "px-6 py-3.5 text-[15px]",
      lg: "px-8 py-4 text-base",
    } as const;
    return (
      <a
        href={url}
        target="_blank"
        rel="nofollow sponsored"
        data-cta={loc}
        className={`group inline-flex items-center justify-center gap-2 rounded-full bg-[#0E7C66] font-semibold text-white shadow-[0_10px_30px_-8px_rgba(14,124,102,0.6)] transition-all hover:-translate-y-0.5 hover:bg-[#0b6353] ${sizes[size]} ${block ? "w-full" : ""}`}
      >
        {label}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </a>
    );
  };

  const continueLabel = `Continue to ${config.brand}`;

  return (
    <div className={`${fraunces.variable} min-h-screen bg-[#F6F5F1] text-[#1B2420] selection:bg-[#0E7C66]/15`}>
      {/* Sticky page bar */}
      <header className="sticky top-0 z-50 border-b border-black/[0.06] bg-[#F6F5F1]/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3 sm:px-8">
          <div className="flex items-center gap-2.5">
            <span className="h-2 w-2 rounded-full bg-[#0E7C66]" />
            <span className="text-sm font-bold tracking-tight">Refer Labs</span>
            <span className="hidden text-[11px] font-medium text-[#6B756F] sm:inline">· Independent review</span>
          </div>
          {cta(continueLabel, "sticky-header", "sm")}
        </div>
      </header>

      <main id="main-content" className="mx-auto max-w-5xl px-5 pb-28 sm:px-8 sm:pb-24">
        {/* Hero */}
        <section className="grid gap-10 pt-12 sm:pt-16 lg:grid-cols-[1.55fr_1fr] lg:gap-14">
          <div>
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0E7C66]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0E7C66]" />
              {config.eyebrow ?? config.badgeText}
            </span>
            <h1 className="mt-5 font-[family-name:var(--font-fraunces)] text-4xl font-semibold leading-[1.07] tracking-[-0.01em] text-[#16201C] sm:text-5xl lg:text-[3.2rem]">
              {config.hero.h1Prefix} <span className="italic text-[#0E7C66]">{config.hero.h1Highlight}</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#46524C]">{config.hero.subheading}</p>

            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[#6B756F]">
              <span className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0E7C66]/12 text-[11px] font-bold text-[#0E7C66]">
                  RL
                </span>
                <span className="text-[#46524C]">Refer Labs Editorial</span>
              </span>
              <span>Last reviewed {reviewed}</span>
              {config.readTime && <span>{config.readTime}</span>}
              <Link href="/how-we-research" className="underline decoration-[#0E7C66]/40 underline-offset-4 hover:text-[#16201C]">
                How we research
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              {cta(config.ctas.primary, "hero", "lg")}
              <a href="#verdict" className="text-sm font-semibold text-[#16201C] underline decoration-black/15 underline-offset-4 hover:decoration-[#0E7C66]">
                Skip to the verdict
              </a>
            </div>
            <p className="mt-4 text-xs text-[#8A938E]">Independent review · contains an affiliate link</p>
          </div>

          {/* At-a-glance card */}
          <aside className="lg:pt-2">
            <div className="rounded-2xl border border-black/[0.07] bg-white p-6 shadow-[0_2px_24px_-12px_rgba(0,0,0,0.18)]">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#6B756F]">At a glance</span>
                {rating && (
                  <span className="flex items-center gap-1 rounded-full bg-[#0E7C66]/10 px-2.5 py-1 text-xs font-bold text-[#0E7C66]">
                    <Star className="h-3 w-3 fill-[#0E7C66]" /> {rating}/5
                  </span>
                )}
              </div>
              <dl className="mt-4 divide-y divide-black/[0.06] text-sm">
                {(config.atAGlance ?? [{ k: "What it is", v: config.hero.h1Prefix }]).map((row) => (
                  <div key={row.k} className="flex gap-3 py-2.5">
                    <dt className="w-24 shrink-0 text-[#8A938E]">{row.k}</dt>
                    <dd className="text-[#2B352F]">{row.v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-5">{cta(continueLabel, "glance-card", "md", true)}</div>
            </div>
          </aside>
        </section>

        {/* Trust strip */}
        {config.trustStrip && config.trustStrip.length > 0 && (
          <section className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-black/[0.07] bg-black/[0.06] sm:grid-cols-4">
            {config.trustStrip.slice(0, 4).map((label) => (
              <div key={label} className="flex items-center gap-3 bg-[#F6F5F1] px-5 py-5">
                <ShieldCheck className="h-5 w-5 shrink-0 text-[#0E7C66]" strokeWidth={1.6} />
                <span className="text-[13px] font-medium leading-snug text-[#46524C]">{label}</span>
              </div>
            ))}
          </section>
        )}

        {/* Body: TOC + article */}
        <div className="mt-16 grid gap-12 lg:grid-cols-[200px_1fr] lg:gap-16">
          <nav aria-label="On this page" className="hidden lg:block">
            <div className="sticky top-24">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8A938E]">On this page</p>
              <ul className="space-y-2.5 text-sm">
                {bodySections.map((s) => (
                  <li key={s.heading}>
                    <a href={`#${slugify(s.heading)}`} className="text-[#6B756F] transition-colors hover:text-[#0E7C66]">
                      {s.heading}
                    </a>
                  </li>
                ))}
                <li>
                  <a href="#verdict" className="text-[#6B756F] transition-colors hover:text-[#0E7C66]">The verdict</a>
                </li>
                <li>
                  <a href="#faq" className="text-[#6B756F] transition-colors hover:text-[#0E7C66]">FAQ</a>
                </li>
              </ul>
            </div>
          </nav>

          <article className="max-w-2xl">
            {config.pullQuote && (
              <figure className="mb-10 border-l-2 border-[#0E7C66] pl-5">
                <blockquote className="font-[family-name:var(--font-fraunces)] text-xl italic leading-snug text-[#2B352F]">
                  {config.pullQuote}
                </blockquote>
              </figure>
            )}

            {bodySections.map((section, i) => (
              <section key={section.heading} id={slugify(section.heading)} className={`scroll-mt-24 ${i === 0 ? "" : "mt-12"}`}>
                <h2 className="font-[family-name:var(--font-fraunces)] text-2xl font-semibold tracking-[-0.01em] text-[#16201C] sm:text-3xl">
                  {section.heading}
                </h2>
                <div className="mt-4 space-y-4 text-[15.5px] leading-relaxed text-[#46524C]">
                  {section.paragraphs.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                </div>
                {section.disclaimer && (
                  <p className="mt-3 text-xs leading-relaxed text-[#8A938E]">{section.disclaimer}</p>
                )}
                {section.hasCta && (
                  <div className="mt-6 rounded-xl border border-[#0E7C66]/20 bg-[#0E7C66]/[0.05] p-5">
                    <div>{cta(section.ctaText ?? continueLabel, `section-${slugify(section.heading)}`)}</div>
                  </div>
                )}
              </section>
            ))}

            {/* How it works */}
            {config.steps.length > 0 && (
              <section id="how-it-works" className="mt-12 scroll-mt-24">
                <h2 className="font-[family-name:var(--font-fraunces)] text-2xl font-semibold tracking-[-0.01em] text-[#16201C] sm:text-3xl">
                  How to get started
                </h2>
                <ol className="mt-6 space-y-5">
                  {config.steps.map((s) => (
                    <li key={s.num} className="flex gap-4">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0E7C66]/10 text-sm font-bold text-[#0E7C66]">
                        {s.num}
                      </span>
                      <div>
                        <p className="font-semibold text-[#16201C]">{s.heading}</p>
                        <p className="mt-1 text-sm leading-relaxed text-[#46524C]">{s.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {/* Verdict */}
            <section id="verdict" className="mt-14 scroll-mt-24">
              <div className="rounded-2xl border border-black/[0.08] bg-white p-7 shadow-[0_2px_24px_-12px_rgba(0,0,0,0.18)] sm:p-8">
                <div className="flex items-center gap-3">
                  {rating && (
                    <span className="flex items-center gap-1.5 rounded-full bg-[#0E7C66]/10 px-3 py-1.5 text-sm font-bold text-[#0E7C66]">
                      <Star className="h-3.5 w-3.5 fill-[#0E7C66]" /> {rating}/5
                    </span>
                  )}
                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8A938E]">
                    Refer Labs editorial assessment
                  </span>
                </div>
                <h2 className="mt-5 font-[family-name:var(--font-fraunces)] text-2xl font-semibold tracking-[-0.01em] text-[#16201C] sm:text-3xl">
                  The verdict
                </h2>
                <p className="mt-4 text-[15.5px] leading-relaxed text-[#46524C]">
                  {config.verdict ?? config.quickAnswer ?? config.hero.subheading}
                </p>
                {config.verdictPoints && config.verdictPoints.length > 0 && (
                  <ul className="mt-5 space-y-2">
                    {config.verdictPoints.map((point) => (
                      <li key={point} className="flex items-start gap-2.5 text-sm text-[#2B352F]">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#0E7C66]" />
                        {point}
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mt-7 flex flex-wrap items-center gap-4">{cta(continueLabel, "verdict", "lg")}</div>
              </div>
            </section>

            {/* FAQ */}
            {config.faqs.length > 0 && (
              <section id="faq" className="mt-14 scroll-mt-24">
                <h2 className="font-[family-name:var(--font-fraunces)] text-2xl font-semibold tracking-[-0.01em] text-[#16201C] sm:text-3xl">
                  Frequently asked questions
                </h2>
                <div className="mt-6 divide-y divide-black/[0.08] border-y border-black/[0.08]">
                  {config.faqs.map((f) => (
                    <details key={f.q} className="group py-4">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-[#16201C]">
                        {f.q}
                        <span className="text-xl leading-none text-[#0E7C66] transition-transform group-open:rotate-45">+</span>
                      </summary>
                      <p className="mt-3 text-[15px] leading-relaxed text-[#46524C]">{f.a}</p>
                    </details>
                  ))}
                </div>
              </section>
            )}

            {/* Related */}
            {config.relatedLinks && config.relatedLinks.length > 0 && (
              <section className="mt-14">
                <h2 className="font-[family-name:var(--font-fraunces)] text-xl font-semibold text-[#16201C]">Related reading</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {config.relatedLinks.map((l) => (
                    <Link key={l.href} href={l.href} className="group rounded-xl border border-black/[0.08] bg-white p-4 transition-colors hover:border-[#0E7C66]/40">
                      <p className="text-sm font-bold text-[#16201C] group-hover:text-[#0E7C66]">{l.label}</p>
                      <p className="mt-1 text-xs leading-relaxed text-[#6B756F]">{l.desc}</p>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </article>
        </div>

        {/* Final CTA band */}
        <section className="mt-20 rounded-3xl bg-[#16201C] px-7 py-12 text-center sm:px-12 sm:py-16">
          <h2 className="mx-auto max-w-xl font-[family-name:var(--font-fraunces)] text-3xl font-semibold leading-tight text-white sm:text-4xl">
            {config.ctas.bottomHeading}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-white/65">{config.ctas.bottomBody}</p>
          <div className="mt-8 flex justify-center">{cta(continueLabel, "final-band", "lg")}</div>
          <p className="mx-auto mt-6 max-w-lg text-xs leading-relaxed text-white/40">{config.disclaimer}</p>
        </section>

        {/* Standalone footer */}
        <footer className="mt-14 border-t border-black/[0.08] pt-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-sm">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#0E7C66]" />
                <span className="text-sm font-bold">Refer Labs</span>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-[#8A938E]">
                Independent comparison guides and reviews. Some pages contain affiliate links; we may earn a commission at
                no extra cost to you. Editorial assessments are independent.
              </p>
            </div>
            <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
              <Link href="/guides" className="text-[#46524C] hover:text-[#0E7C66]">All guides</Link>
              <Link href="/how-we-research" className="text-[#46524C] hover:text-[#0E7C66]">How we research</Link>
            </div>
          </div>
          <p className="mt-8 text-xs text-[#A6ADA8]">© {reviewed.split(" ").pop()} Refer Labs. Australia.</p>
        </footer>
      </main>

      {/* Mobile sticky CTA (CRO) */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-black/[0.08] bg-[#F6F5F1]/95 px-4 py-3 backdrop-blur-md sm:hidden">
        {cta(continueLabel, "mobile-sticky", "md", true)}
      </div>
    </div>
  );
}
