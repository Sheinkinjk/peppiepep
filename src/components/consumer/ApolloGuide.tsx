import Link from "next/link";
import { ArrowRight, BadgeCheck, ShieldCheck, Wrench } from "lucide-react";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import StickyCta from "@/components/consumer/StickyCta";
import { SITE_URL } from "@/lib/seo";
import { APOLLO_ENERGY_URL } from "@/lib/affiliate-links";

// ─────────────────────────────────────────────────────────────────────────────
// Shared layout for the home-battery guide cluster (funnels to Apollo Energy Group,
// $500 off via Refer Labs). Structure is shared; ALL copy lives in the per-page
// config so sibling pages never share a sentence skeleton. Rebate figures are
// indicative only (the STC spot price floats) and always labelled as such.
// ─────────────────────────────────────────────────────────────────────────────

export type GuideSection = { h: string; body: string[]; bullets?: string[] };

export interface ApolloGuideConfig {
  slug: string;
  crumb: string;
  h1: string;
  /** Direct, citable answer in the first ~100 words (AEO/GEO). */
  lead: string;
  sections: GuideSection[];
  faqs: { q: string; a: string }[];
  related: { href: string; label: string }[];
}

const TRUST = [
  { icon: BadgeCheck, label: "SAA-accredited installer" },
  { icon: ShieldCheck, label: "10-year battery warranty" },
  { icon: Wrench, label: "Sized from your real usage" },
];

export function apolloGuideSchemas(cfg: ApolloGuideConfig) {
  const url = `${SITE_URL}${cfg.slug}`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Home batteries", item: `${SITE_URL}/apollo-energy` },
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

function ApolloCta({ heading, body, loc }: { heading: string; body: string; loc: string }) {
  return (
    <div className="flex flex-col items-start gap-3 rounded-2xl border border-[#0a7c42]/25 bg-[#e8f5ee] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="max-w-md">
        <p className="font-bold text-[#10251b]">{heading}</p>
        <p className="mt-1 text-[14px] leading-relaxed text-[#10251b]">{body}</p>
      </div>
      <a href={APOLLO_ENERGY_URL} target="_blank" rel="nofollow sponsored" data-cta={`battery-${loc}`} className="nw-btn shrink-0 whitespace-nowrap">
        Get your $500-off quote <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </a>
    </div>
  );
}

export default function ApolloGuide({ cfg }: { cfg: ApolloGuideConfig }) {
  return (
    <ConsumerShell>
      {apolloGuideSchemas(cfg).map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      <main className="mx-auto max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
        <nav className="flex flex-wrap items-center gap-2 text-sm text-[#6e7b74]">
          <Link href="/" className="hover:text-[#10251b]">Refer Labs</Link>
          <span>/</span>
          <Link href="/apollo-energy" className="hover:text-[#10251b]">Home batteries</Link>
          <span>/</span>
          <span className="text-[#10251b]">{cfg.crumb}</span>
        </nav>

        <h1 className="mt-4 text-3xl font-extrabold leading-[1.08] tracking-tight text-[#10251b] sm:text-4xl">{cfg.h1}</h1>
        <p className="mt-5 text-lg leading-relaxed text-[#3d4b44]">{cfg.lead}</p>

        {/* Trust strip */}
        <div className="mt-6 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[#e5e9e7] bg-[#e5e9e7] sm:grid-cols-3">
          {TRUST.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-3 bg-white px-5 py-4">
              <Icon className="h-5 w-5 shrink-0 text-[#0a7c42]" strokeWidth={1.7} aria-hidden="true" />
              <span className="text-[13px] font-medium leading-snug text-[#3d4b44]">{label}</span>
            </div>
          ))}
        </div>

        {/* Top CTA */}
        <div className="mt-7">
          <ApolloCta
            loc="top"
            heading="Want it sized and quoted properly?"
            body="Apollo Energy Group is an SAA-accredited Australian installer (Electrical Licence 400672, 10-year battery warranty). Refer Labs readers get $500 off their quote, on top of the federal rebate."
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
          <ApolloCta
            loc="bottom"
            heading="Get a quote sized to your home"
            body="A battery is only worth it when it's sized to how you actually use power. Apollo sizes from your real usage and applies the federal rebate at the point of sale, plus $500 off through our link."
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

        {/* Disclaimer */}
        <p className="mt-10 text-xs leading-relaxed text-[#6e7b74]">
          Rebate and savings figures are indicative only and depend on your system size, usage, tariff, and the STC spot
          price, which floats. Confirm current rebate terms and your specific quote before committing. Some links are
          disclosed affiliate links, and commissions never change a comparison or a conclusion. Read our{" "}
          <Link href="/about#how-we-research" className="underline hover:text-[#10251b]">editorial standards</Link>.
        </p>
      </main>

      <StickyCta href={APOLLO_ENERGY_URL} product="Apollo Energy home batteries" label="Claim offer" offer="$500 off your quote" />
    </ConsumerShell>
  );
}
