import Link from "next/link";

import ConsumerShell from "@/components/consumer/ConsumerShell";
import AffiliateDisclosure from "@/components/consumer/AffiliateDisclosure";
import { SITE_URL, SCHEMA_AUTHOR, SCHEMA_PUBLISHER } from "@/lib/seo";

/**
 * The shared shape for a Health & Beauty retail partner's own page.
 *
 * Three of the four partners (Foreo, Edible Beauty, Aussie Health Products) had
 * no page of their own until 16 Sep 2026: they existed only as /go/ redirects
 * fired from inside guides, which is why none of them could rank or be cited.
 * Each now has a page.
 *
 * It is a shared component rather than three copies because the SHAPE is the
 * same every time (what they sell, what it costs, what we could not verify, the
 * disclosure, the FAQ) while the CONTENT is entirely per-brand. The shape is
 * here; every word a reader sees is passed in.
 *
 * That last sentence was aspirational when it was first written, and the pages
 * did not honour it. Five of them shipped on 16 Sep 2026 with the same
 * disclosure tail ("nothing to type and no saving we can claim on your behalf")
 * and the same answer to "does Refer Labs earn money from this page?", nouns
 * swapped. A shared shell makes that easy: the props look filled in even when
 * the words are a template. Fixed the same day.
 *
 * So, for the next partner: `commissionNote` and the earnings FAQ must say what
 * the commission did NOT buy on THIS page, naming the specific unflattering
 * thing the page still states. If the sentence would read identically on
 * another brand's page, it is not finished.
 *
 * `unverified` is required and may not be empty. Every one of these pages earns
 * a commission, so each states plainly what we could NOT confirm about the
 * brand. A page that only lists what suits us reads as marketing and gets cited
 * like marketing.
 */

export type BrandFact = { label: string; value: string };

export type RetailerBrand = {
  name: string;
  slug: string;
  /**
   * The section this brand belongs to. Was hardcoded to Health & Beauty, which
   * was right for the four partners the shell was written for and wrong the
   * moment it was reused: Emma Sleep sits in /sleep and Technogym in /longevity,
   * and both shipped a breadcrumb, a BreadcrumbList and a "compare every
   * partner" link pointing at a section they are not in. Caught 16 Sep 2026.
   */
  section: { href: string; label: string };
  /** The italic half of the h1. Says what the page settles. */
  tagline: string;
  /** The answer, rendered directly under the h1 with nothing between. */
  lead: React.ReactNode;
  /** Dated facts, each already carrying its own read date in the value. */
  facts: BrandFact[];
  factsNote: React.ReactNode;
  /** What we could not verify. Required, and never empty. */
  unverified: React.ReactNode;
  body: { heading: string; paras: React.ReactNode[] }[];
  goPath: string;
  ctaLabel: string;
  /** Stated beneath the CTA, in the brand's own terms. */
  commissionNote: string;
  faqs: { q: string; a: string }[];
  disclaimer: React.ReactNode;
};

export default function RetailerBrandPage({ brand }: { brand: RetailerBrand }) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: brand.section.label, item: `${SITE_URL}${brand.section.href}` },
      { "@type": "ListItem", position: 3, name: brand.name, item: `${SITE_URL}${brand.slug}` },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: brand.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${brand.name}: ${brand.tagline}`,
    url: `${SITE_URL}${brand.slug}`,
    inLanguage: "en-AU",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    datePublished: "2026-09-16",
    dateModified: "2026-09-16",
    author: SCHEMA_AUTHOR,
    publisher: SCHEMA_PUBLISHER,
  };

  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      <main id="main-content">
        <section className="mx-auto max-w-6xl px-5 pt-12 sm:px-8 sm:pt-16">
          <nav className="mb-7 flex items-center gap-2 text-sm text-[#627068]">
            <Link href="/" className="hover:text-[#0a7c42]">Refer Labs</Link>
            <span>/</span>
            <Link href={brand.section.href} className="hover:text-[#0a7c42]">{brand.section.label}</Link>
            <span>/</span>
            <span className="text-[#2b362f]">{brand.name}</span>
          </nav>

          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold leading-[1.06] tracking-[-0.01em] text-[#10251b] sm:text-5xl">
              {brand.name}: <span className="italic text-[#0a7c42]">{brand.tagline}</span>
            </h1>
            {/* The answer sits here, directly after the h1. Guarded by check-answer-slot. */}
            <p className="mt-5 text-lg leading-relaxed text-[#2b362f]">{brand.lead}</p>
            <AffiliateDisclosure compact className="mt-4" />
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
          <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b] sm:text-3xl">
            What {brand.name} sells, and what it costs
          </h2>
          <dl className="mt-7 max-w-3xl divide-y divide-[#eef1ef] border-y border-[#eef1ef]">
            {brand.facts.map((f) => (
              <div key={f.label} className="flex flex-col gap-1 py-3.5 sm:flex-row sm:gap-6">
                <dt className="shrink-0 text-[13px] font-semibold uppercase tracking-[0.04em] text-[#5a665f] sm:w-44">
                  {f.label}
                </dt>
                <dd className="text-[15px] leading-relaxed text-[#3d4b44] [font-variant-numeric:tabular-nums]">{f.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 max-w-3xl text-[13px] leading-relaxed text-[#5a665f]">{brand.factsNote}</p>
        </section>

        {brand.body.map((s) => (
          <section key={s.heading} className="mx-auto max-w-6xl px-5 pb-14 sm:px-8">
            <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b] sm:text-3xl">{s.heading}</h2>
            <div className="mt-5 max-w-3xl space-y-4 text-[15px] leading-relaxed text-[#3d4b44]">
              {s.paras.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>
        ))}

        {/* Required, and deliberately above the CTA rather than buried under it. */}
        <section className="mx-auto max-w-6xl px-5 pb-14 sm:px-8">
          <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b] sm:text-3xl">What we could not verify</h2>
          <div className="mt-5 max-w-3xl text-[15px] leading-relaxed text-[#3d4b44]">{brand.unverified}</div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a
              href={brand.goPath}
              target="_blank"
              rel="nofollow sponsored"
              data-cta={`${brand.slug.replace(/^\//, "")}-primary`}
              className="inline-flex items-center rounded-full bg-[#0a7c42] px-6 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-[#086536]"
            >
              {brand.ctaLabel}
            </a>
            <Link href={brand.section.href} className="text-sm font-semibold text-[#0a7c42] hover:underline">
              Compare every {brand.section.label} partner →
            </Link>
          </div>
          <p className="mt-3 text-[13px] leading-relaxed text-[#5a665f]">{brand.commissionNote}</p>
        </section>

        <section className="border-y border-[#e5e9e7] bg-[#f5f8f6]">
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
            <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b] sm:text-3xl">Common questions</h2>
            <dl className="mt-7 max-w-3xl divide-y divide-[#e5e9e7]">
              {brand.faqs.map((f) => (
                <div key={f.q} className="py-5">
                  <dt className="text-[15px] font-bold text-[#10251b]">{f.q}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-[#3d4b44]">{f.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
          <p className="max-w-3xl rounded-xl border border-[#e5e9e7] bg-[#f5f8f6] px-5 py-4 text-xs leading-relaxed text-[#3d4b44]">
            {brand.disclaimer}
          </p>
          <p className="mt-6 text-sm leading-relaxed text-[#3d4b44]">
            More in this section:{" "}
            <Link href={brand.section.href} className="font-semibold text-[#0a7c42] hover:underline">
              {brand.section.label}
            </Link>
            .
          </p>
        </section>
      </main>
    </ConsumerShell>
  );
}
