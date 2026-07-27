import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, ShieldCheck, Gift } from "lucide-react";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import StickyCta from "@/components/consumer/StickyCta";
import { OFFERS_VERIFIED } from "@/lib/offers";
import OffersTable from "@/components/lending/OffersTable";
import type { AffiliatePageConfig } from "./types";

// Pull a typed code out of an offer string like "55% off your first order (code REFERAL55)".
function offerCode(offer: string): string | undefined {
  const m = offer.match(/\(code\s+([A-Za-z0-9]+)\)/i);
  return m ? m[1] : undefined;
}

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

// Sections that are purely about the affiliate mechanics read as spam in a
// premium layout, surfaced instead via the at-a-glance card + CTAs.
function isOfferSection(heading: string) {
  return /current offer|codes?\s*&|how they work|codes & how/i.test(heading);
}

/**
 * Premium affiliate landing template on the light NerdWallet-style system.
 * Runs inside ConsumerShell so every brand page shares the site header, search,
 * nav and footer. CRO baked in: a scroll-triggered mobile sticky CTA and
 * data-cta attributes for placement-level click tracking. Information-only:
 * no ratings, no byline, no "review/verdict" framing.
 */
export default function PremiumAffiliateLanding({ config }: { config: AffiliatePageConfig }) {
  const url = config.affiliateUrl;
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
        className={`nw-btn justify-center ${sizes[size]} ${block ? "w-full" : ""}`}
      >
        {label}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </a>
    );
  };

  const continueLabel = `Continue to ${config.brand}`;

  return (
    <ConsumerShell>
      <main id="main-content" className="mx-auto max-w-5xl px-5 pb-24 sm:px-8">
        {/* Hero */}
        <section className="grid gap-10 pt-10 sm:pt-14 lg:grid-cols-[1.55fr_1fr] lg:gap-14">
          <div>
            {config.logo ? (
              <span className="mb-5 inline-flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-[#e5e9e7] bg-white shadow-[0_10px_28px_-16px_rgba(16,37,27,0.35)]">
                <Image src={`/logos/${config.logo}.png`} alt={`${config.brand} logo`} width={52} height={52} className="h-12 w-12 object-contain" />
              </span>
            ) : (
              // Monogram fallback when we don't have the brand's logo file yet, so
              // the hero reads finished rather than blank. Drop a real PNG in
              // /public/logos and set `logo` in the config to replace it.
              <span
                aria-hidden="true"
                className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-[#10251b] text-2xl font-bold text-white shadow-[0_10px_28px_-16px_rgba(16,37,27,0.45)]"
              >
                {config.brand.charAt(0)}
              </span>
            )}
            <p className="nw-kicker">{config.eyebrow ?? config.badgeText}</p>
            <h1 className="mt-4 text-4xl font-extrabold leading-[1.05] tracking-[-0.02em] text-[#10251b] sm:text-5xl lg:text-[3.1rem]">
              {config.hero.h1Prefix} <span className="text-[#0a7c42]">{config.hero.h1Highlight}</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#3d4b44]">{config.hero.subheading}</p>

            {config.showResearchNote && (
              <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[#6e7b74]">
                <span className="font-semibold text-[#3d4b44]">Independent guide</span>
                <span className="text-[#cdd5cf]">·</span>
                <Link href="/about#how-we-research" className="nw-link !text-sm">How we research</Link>
              </div>
            )}

            {config.offer && (
              <div className="mt-7 flex items-start gap-3 rounded-2xl border border-[#0a7c42]/30 bg-[#0a7c42]/[0.08] px-5 py-4">
                <Gift className="mt-0.5 h-5 w-5 shrink-0 text-[#0a7c42]" strokeWidth={1.9} />
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#0a7c42]">Current offer via our link</p>
                  <p className="mt-1 text-[15px] font-bold leading-snug text-[#10251b]">{config.offer}</p>
                  <p className="mt-1.5 text-[11px] font-medium text-[#6e7b74]">Checked &amp; verified {OFFERS_VERIFIED}</p>
                </div>
              </div>
            )}

            <div className="mt-8">{cta(config.ctas.primary, "hero", "lg")}</div>
            <p className="mt-4 text-xs text-[#9aa39c]">Information only · contains a disclosed affiliate link</p>
          </div>

          {/* At-a-glance card */}
          <aside className="lg:pt-2">
            <div className="nw-card rounded-2xl p-6">
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#9aa39c]">At a glance</span>
              <dl className="mt-4 divide-y divide-[#eef1ef] text-sm">
                {config.offer && (
                  <div className="flex gap-3 py-2.5">
                    <dt className="w-24 shrink-0 text-[#0a7c42] font-semibold">Offer</dt>
                    <dd className="font-semibold text-[#10251b]">{config.offer}</dd>
                  </div>
                )}
                {(config.atAGlance ?? [{ k: "What it is", v: config.hero.h1Prefix }]).map((row) => (
                  <div key={row.k} className="flex gap-3 py-2.5">
                    <dt className="w-24 shrink-0 text-[#9aa39c]">{row.k}</dt>
                    <dd className="text-[#2b362f]">{row.v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-5">{cta(continueLabel, "glance-card", "md", true)}</div>
            </div>
          </aside>
        </section>

        {/* Trust strip */}
        {config.trustStrip && config.trustStrip.length > 0 && (
          <section className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[#e5e9e7] bg-[#e5e9e7] sm:grid-cols-4">
            {config.trustStrip.slice(0, 4).map((label) => (
              <div key={label} className="flex items-center gap-3 bg-white px-5 py-5">
                <ShieldCheck className="h-5 w-5 shrink-0 text-[#0a7c42]" strokeWidth={1.7} />
                <span className="text-[13px] font-medium leading-snug text-[#3d4b44]">{label}</span>
              </div>
            ))}
          </section>
        )}

        {/* Structured, AI-extractable offer table (auto on every brand page with an offer) */}
        {config.offer && (
          <section className="mt-12">
            <h2 className="text-lg font-extrabold text-[#10251b]">{config.brand} offer at a glance</h2>
            <div className="mt-4">
              <OffersTable
                deals={[{ brand: config.brand, offer: config.offer, code: offerCode(config.offer) }]}
                caption={`${config.brand} discount code and current offer, verified`}
              />
            </div>
          </section>
        )}

        {/* Body: TOC + article */}
        <div className="mt-16 grid gap-12 lg:grid-cols-[200px_1fr] lg:gap-16">
          <nav aria-label="On this page" className="hidden lg:block">
            <div className="sticky top-24">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-[#9aa39c]">On this page</p>
              <ul className="space-y-2.5 text-sm">
                {bodySections.map((s) => (
                  <li key={s.heading}>
                    <a href={`#${slugify(s.heading)}`} className="text-[#6e7b74] transition-colors hover:text-[#0a7c42]">
                      {s.heading}
                    </a>
                  </li>
                ))}
                <li><a href="#bottom-line" className="text-[#6e7b74] transition-colors hover:text-[#0a7c42]">The bottom line</a></li>
                <li><a href="#faq" className="text-[#6e7b74] transition-colors hover:text-[#0a7c42]">FAQ</a></li>
              </ul>
            </div>
          </nav>

          <article className="max-w-2xl">
            {config.pullQuote && (
              <figure className="mb-10 border-l-2 border-[#0a7c42] pl-5">
                <blockquote className="text-xl font-semibold italic leading-snug text-[#2b362f]">
                  {config.pullQuote}
                </blockquote>
              </figure>
            )}

            {bodySections.map((section, i) => (
              <section key={section.heading} id={slugify(section.heading)} className={`scroll-mt-24 ${i === 0 ? "" : "mt-12"}`}>
                <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b] sm:text-3xl">{section.heading}</h2>
                <div className="mt-4 space-y-4 text-[15.5px] leading-relaxed text-[#3d4b44]">
                  {section.paragraphs.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                </div>
                {section.disclaimer && <p className="mt-3 text-xs leading-relaxed text-[#9aa39c]">{section.disclaimer}</p>}
                {section.hasCta && (
                  <div className="mt-6 rounded-xl border border-[#cfe6da] bg-[#e8f5ee] p-5">
                    <div>{cta(section.ctaText ?? continueLabel, `section-${slugify(section.heading)}`)}</div>
                  </div>
                )}
              </section>
            ))}

            {/* How it works */}
            {config.steps.length > 0 && (
              <section id="how-it-works" className="mt-12 scroll-mt-24">
                <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b] sm:text-3xl">How to get started</h2>
                <ol className="mt-6 space-y-5">
                  {config.steps.map((s) => (
                    <li key={s.num} className="flex gap-4">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e8f5ee] text-sm font-bold text-[#0a7c42]">
                        {s.num}
                      </span>
                      <div>
                        <p className="font-bold text-[#10251b]">{s.heading}</p>
                        <p className="mt-1 text-sm leading-relaxed text-[#3d4b44]">{s.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {/* Bottom line */}
            <section id="bottom-line" className="mt-14 scroll-mt-24">
              <div className="nw-card rounded-2xl p-7 sm:p-8">
                <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b] sm:text-3xl">The bottom line</h2>
                <p className="mt-4 text-[15.5px] leading-relaxed text-[#3d4b44]">
                  {config.verdict ?? config.quickAnswer ?? config.hero.subheading}
                </p>
                {config.verdictPoints && config.verdictPoints.length > 0 && (
                  <ul className="mt-5 space-y-2">
                    {config.verdictPoints.map((point) => (
                      <li key={point} className="flex items-start gap-2.5 text-sm text-[#2b362f]">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#0a7c42]" />
                        {point}
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mt-7">{cta(continueLabel, "bottom-line", "lg")}</div>
              </div>
            </section>

            {/* FAQ */}
            {config.faqs.length > 0 && (
              <section id="faq" className="mt-14 scroll-mt-24">
                <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b] sm:text-3xl">Frequently asked questions</h2>
                <div className="mt-6 divide-y divide-[#e5e9e7] border-y border-[#e5e9e7]">
                  {config.faqs.map((f) => (
                    <details key={f.q} className="group py-4">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-[#10251b]">
                        {f.q}
                        <span className="text-xl leading-none text-[#0a7c42] transition-transform group-open:rotate-45">+</span>
                      </summary>
                      <p className="mt-3 text-[15px] leading-relaxed text-[#3d4b44]">{f.a}</p>
                    </details>
                  ))}
                </div>
              </section>
            )}

            {/* Related */}
            {config.relatedLinks && config.relatedLinks.length > 0 && (
              <section className="mt-14">
                <h2 className="text-xl font-bold text-[#10251b]">Related reading</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {config.relatedLinks.map((l) => (
                    <Link key={l.href} href={l.href} className="nw-card nw-card-hover group rounded-xl p-4">
                      <p className="text-sm font-bold text-[#10251b] group-hover:text-[#0a7c42]">{l.label}</p>
                      <p className="mt-1 text-xs leading-relaxed text-[#6e7b74]">{l.desc}</p>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </article>
        </div>

        {/* Final CTA band */}
        <section className="mt-20 overflow-hidden rounded-3xl bg-[#10251b] px-7 py-12 text-center sm:px-12 sm:py-16">
          <h2 className="mx-auto max-w-xl text-3xl font-bold leading-tight text-white sm:text-4xl">
            {config.ctas.bottomHeading}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-white/70">{config.ctas.bottomBody}</p>
          <div className="mt-8 flex justify-center">
            <a href={url} target="_blank" rel="nofollow sponsored" data-cta="final-band" className="nw-btn justify-center !bg-white !text-[#0a7c42] px-8 py-4 text-base hover:!bg-[#e8f5ee]">
              {continueLabel}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <p className="mx-auto mt-6 max-w-lg text-xs leading-relaxed text-white/45">{config.disclaimer}</p>
        </section>
      </main>

      <StickyCta href={url} product={config.brand} label={config.offer ? "Claim offer" : "Get started"} offer={config.offer} />
    </ConsumerShell>
  );
}
