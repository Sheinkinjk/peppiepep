import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import StickyCta from "@/components/consumer/StickyCta";
import { SITE_URL } from "@/lib/seo";
import { MOSH_HAIR_URL } from "@/lib/affiliate-links";

// ─────────────────────────────────────────────────────────────────────────────
// Shared layout for the hair-loss guide cluster (men's hair loss, funnels to Mosh).
// Structure is shared; ALL copy lives in the per-page config so sibling pages never
// share a sentence skeleton. TGA-safe by construction: the CTA promotes the SERVICE
// (a practitioner-led assessment), never the medicine; every page carries the
// information-only notice and the affiliate disclosure. See health-tga-compliance memory.
// ─────────────────────────────────────────────────────────────────────────────

export type GuideSection = { h: string; body: string[]; bullets?: string[] };

export interface HairLossGuideConfig {
  slug: string;                 // e.g. "/finasteride-vs-minoxidil-australia"
  crumb: string;
  h1: string;
  /** Direct, citable answer in the first ~100 words (AEO/GEO). */
  lead: string;
  sections: GuideSection[];
  faqs: { q: string; a: string }[];
  related: { href: string; label: string }[];
}

export function hairLossGuideSchemas(cfg: HairLossGuideConfig) {
  const url = `${SITE_URL}${cfg.slug}`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Hair loss", item: `${SITE_URL}/hair-loss` },
        { "@type": "ListItem", position: 3, name: cfg.crumb, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: cfg.h1,
      url,
      dateModified: "2026-07-20",
      author: { "@type": "Organization", name: "Refer Labs" },
      publisher: { "@type": "Organization", name: "Refer Labs", url: SITE_URL },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      url,
      mainEntity: cfg.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ];
}

/** Service-focused Mosh CTA (assessment, not medicine). Reused top and bottom. */
function MoshCta({ heading, body, loc }: { heading: string; body: string; loc: string }) {
  return (
    <div className="flex flex-col items-start gap-3 rounded-2xl border border-[#0a7c42]/25 bg-[#e8f5ee] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="max-w-md">
        <p className="font-bold text-[#10251b]">{heading}</p>
        <p className="mt-1 text-[14px] leading-relaxed text-[#10251b]">{body}</p>
      </div>
      <a href={MOSH_HAIR_URL} target="_blank" rel="nofollow sponsored" data-cta={`hairloss-${loc}`} className="nw-btn shrink-0 whitespace-nowrap">
        Start a Mosh assessment <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </a>
    </div>
  );
}

export default function HairLossGuide({ cfg }: { cfg: HairLossGuideConfig }) {
  return (
    <ConsumerShell>
      {hairLossGuideSchemas(cfg).map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      <main className="mx-auto max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
        <nav className="flex flex-wrap items-center gap-2 text-sm text-[#6e7b74]">
          <Link href="/" className="hover:text-[#10251b]">Refer Labs</Link>
          <span>/</span>
          <Link href="/hair-loss" className="hover:text-[#10251b]">Hair loss</Link>
          <span>/</span>
          <span className="text-[#10251b]">{cfg.crumb}</span>
        </nav>

        <h1 className="mt-4 text-3xl font-extrabold leading-[1.08] tracking-tight text-[#10251b] sm:text-4xl">{cfg.h1}</h1>
        <p className="mt-5 text-lg leading-relaxed text-[#3d4b44]">{cfg.lead}</p>

        {/* Information-only notice */}
        <div className="nw-card mt-6 px-5 py-4 text-sm leading-relaxed text-[#3d4b44]">
          <span className="font-bold text-[#10251b]">Information only.</span> Nothing here is medical advice or a
          recommendation of any treatment. Finasteride is a prescription-only medicine in Australia, supplied only after an
          individual assessment by a registered practitioner who decides suitability. This page contains a disclosed
          affiliate link to Mosh.
        </div>

        {/* Top CTA (service-focused) */}
        <div className="mt-7">
          <MoshCta
            loc="top"
            heading="Want a practitioner to assess your options?"
            body="Mosh runs a men's hair-loss assessment online, reviewed by registered Australian practitioners, with treatment delivered if appropriate. Plans from $24/month, free delivery, and 55% off your first order through our link."
          />
        </div>

        <article className="mt-10 space-y-9">
          {cfg.sections.map((s) => (
            <section key={s.h}>
              <h2 className="text-xl font-bold tracking-tight text-[#10251b] sm:text-2xl">{s.h}</h2>
              <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-[#3d4b44]">
                {s.body.map((p, i) => <p key={i}>{p}</p>)}
                {s.bullets && (
                  <ul className="space-y-2">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex gap-2.5 leading-relaxed">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0a7c42]" aria-hidden="true" />{b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          ))}
        </article>

        {/* Bottom CTA */}
        <div className="mt-12">
          <MoshCta
            loc="bottom"
            heading="Start with a practitioner, not a guess"
            body="If you want your options assessed properly, Mosh's online consultation is reviewed by a registered Australian practitioner. 55% off your first order through our link; money-back guarantee applies."
          />
        </div>

        {/* FAQ */}
        <section className="mt-14">
          <h2 className="text-2xl font-bold tracking-tight text-[#10251b]">Common questions</h2>
          <div className="mt-6 divide-y divide-[#e5e9e7] border-y border-[#e5e9e7]">
            {cfg.faqs.map((f) => (
              <details key={f.q} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-[#10251b]">
                  {f.q}
                  <span className="text-xl leading-none text-[#0a7c42] transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <p className="mt-3 text-[15px] leading-relaxed text-[#3d4b44]">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Related */}
        <section className="mt-12 flex flex-wrap gap-x-6 gap-y-2 border-t border-[#eef1ef] pt-8 text-sm">
          {cfg.related.map((r) => (
            <Link key={r.href} href={r.href} className="font-semibold text-[#0a7c42] hover:text-[#086536]">{r.label}</Link>
          ))}
        </section>

        {/* Bottom disclaimer */}
        <p className="mt-10 flex items-start gap-2 text-xs leading-relaxed text-[#6e7b74]">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#0a7c42]" aria-hidden="true" />
          <span>
            Information only, not medical advice. Prescription medicines in Australia are supplied only after individual
            assessment by a registered practitioner. Some links are disclosed affiliate links, and commissions never change
            a comparison or a conclusion.
          </span>
        </p>
      </main>

      <StickyCta href={MOSH_HAIR_URL} product="Mosh hair-loss telehealth" label="Claim offer" offer="55% off your first order" />
    </ConsumerShell>
  );
}
