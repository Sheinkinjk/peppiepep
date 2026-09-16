import Link from "next/link";

import ConsumerShell from "@/components/consumer/ConsumerShell";
import AffiliateDisclosure from "@/components/consumer/AffiliateDisclosure";
import { SITE_URL, SCHEMA_AUTHOR, SCHEMA_PUBLISHER } from "@/lib/seo";
import { partnerLogo } from "@/lib/partner-logos";
import { logoScale } from "@/lib/logo-optics";

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
  /**
   * The two or three facts worth putting in the hero card beside the CTA.
   * Defaults to the first three. These are what a reader weighs before
   * clicking, so they are chosen, not sliced, wherever the order differs.
   */
  headlineFacts?: BrandFact[];
  /**
   * Overrides the shared registry. Normally left unset: the logo is looked up
   * from src/lib/partner-logos.ts by slug, so a hub card and this page cannot
   * show different marks for the same brand.
   */
  logo?: string;
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

  const headline = brand.headlineFacts ?? brand.facts.slice(0, 3);
  const monogram = brand.name.replace(/[^A-Za-z ]/g, "").split(" ").filter(Boolean).slice(0, 2).map((w) => w[0]).join("");
  const logo = brand.logo ?? partnerLogo(brand.slug);

  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      <main id="main-content">
        {/* Hero. Two columns from lg: the answer on the left, the decision card
            on the right. It was a single max-w-3xl column with the CTA five
            sections below the fold, which left half the screen empty and made a
            commercial page read like a memo (16 Sep 2026). The text column is
            first in the DOM, so the lead still follows the h1 with nothing
            between it, and the disclosure still sits above the first link. */}
        <section className="mx-auto max-w-6xl px-5 pt-10 sm:px-8 sm:pt-14">
          <nav className="mb-7 flex items-center gap-2 text-sm text-[#627068]">
            <Link href="/" className="hover:text-[#0a7c42]">Refer Labs</Link>
            <span aria-hidden="true">/</span>
            <Link href={brand.section.href} className="hover:text-[#0a7c42]">{brand.section.label}</Link>
            <span aria-hidden="true">/</span>
            <span className="text-[#2b362f]">{brand.name}</span>
          </nav>

          <div className="grid items-start gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:gap-14">
            <div>
              <h1 className="text-4xl font-bold leading-[1.06] tracking-[-0.01em] text-[#10251b] sm:text-5xl">
                {brand.name}: <span className="italic text-[#0a7c42]">{brand.tagline}</span>
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-[#2b362f]">{brand.lead}</p>
              <AffiliateDisclosure compact className="mt-4" />
            </div>

            <aside className="rounded-2xl border border-[#e5e9e7] bg-white p-6 shadow-[0_1px_2px_rgba(16,37,27,0.05)] sm:p-7">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#eef1ef] bg-[#f8faf9]">
                  {logo ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={logo}
                      alt=""
                      width={32}
                      height={32}
                      className="h-8 w-8 object-contain"
                      style={{ transform: `scale(${logoScale(logo)})` }}
                    />
                  ) : (
                    <span className="text-[15px] font-bold tracking-tight text-[#0a7c42]">{monogram}</span>
                  )}
                </span>
                <div>
                  <p className="text-[17px] font-bold leading-tight text-[#10251b]">{brand.name}</p>
                  <p className="text-[13px] text-[#5a665f]">{brand.section.label}</p>
                </div>
              </div>

              <dl className="mt-6 space-y-4">
                {headline.map((f) => (
                  <div key={f.label} className="border-t border-[#eef1ef] pt-4 first:border-t-0 first:pt-0">
                    <dt className="text-[12px] font-semibold uppercase tracking-[0.05em] text-[#5a665f]">{f.label}</dt>
                    <dd className="mt-1 text-[15px] leading-relaxed text-[#2b362f] [font-variant-numeric:tabular-nums]">
                      {f.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <a
                href={brand.goPath}
                target="_blank"
                rel="nofollow sponsored"
                data-cta={`${brand.slug.replace(/^\//, "")}-hero`}
                className="mt-6 flex w-full items-center justify-center rounded-full bg-[#0a7c42] px-6 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-[#086536]"
              >
                {brand.ctaLabel}
              </a>
              <p className="mt-3 text-[12px] leading-relaxed text-[#5a665f]">{brand.commissionNote}</p>
            </aside>
          </div>
        </section>

        {/* Facts as a two-column panel rather than a thin stacked list. */}
        <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
          <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b] sm:text-3xl">
            What {brand.name} sells, and what it costs
          </h2>
          <dl className="mt-7 grid gap-x-10 gap-y-0 rounded-2xl border border-[#e5e9e7] bg-white p-6 sm:grid-cols-2 sm:p-8">
            {brand.facts.map((f) => (
              <div key={f.label} className="border-b border-[#eef1ef] py-4 last:border-b-0 sm:[&:nth-last-child(2)]:border-b-0">
                <dt className="text-[12px] font-semibold uppercase tracking-[0.05em] text-[#5a665f]">{f.label}</dt>
                <dd className="mt-1.5 text-[15px] leading-relaxed text-[#2b362f] [font-variant-numeric:tabular-nums]">
                  {f.value}
                </dd>
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

        {/* Required, and given its own panel so it reads as a finding rather
            than small print. Every one of these pages earns a commission. */}
        <section className="mx-auto max-w-6xl px-5 pb-14 sm:px-8">
          <div className="max-w-3xl rounded-2xl border border-[#e5e9e7] bg-[#f8faf9] p-6 sm:p-8">
            <h2 className="text-xl font-bold tracking-[-0.01em] text-[#10251b] sm:text-2xl">What we could not verify</h2>
            <div className="mt-4 text-[15px] leading-relaxed text-[#3d4b44]">{brand.unverified}</div>
          </div>
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

        {/* Closing action, for a reader who scrolled rather than clicked. */}
        <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
          <div className="flex flex-col gap-5 rounded-2xl border border-[#cfe6da] bg-[#e8f5ee] p-7 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div className="max-w-xl">
              <p className="text-[17px] font-bold text-[#10251b]">Ready to look at {brand.name} yourself?</p>
              <p className="mt-1.5 text-sm leading-relaxed text-[#3d4b44]">
                Prices and terms change. Check the current ones on their own site before you decide.
              </p>
            </div>
            <div className="flex flex-col items-start gap-2 sm:items-end">
              <a
                href={brand.goPath}
                target="_blank"
                rel="nofollow sponsored"
                data-cta={`${brand.slug.replace(/^\//, "")}-closing`}
                className="inline-flex shrink-0 items-center rounded-full bg-[#0a7c42] px-6 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-[#086536]"
              >
                {brand.ctaLabel}
              </a>
              <Link href={brand.section.href} className="text-sm font-semibold text-[#0a7c42] hover:underline">
                Compare every {brand.section.label} partner →
              </Link>
            </div>
          </div>

          <p className="mt-8 max-w-3xl rounded-xl border border-[#e5e9e7] bg-[#f5f8f6] px-5 py-4 text-xs leading-relaxed text-[#3d4b44]">
            {brand.disclaimer}
          </p>
        </section>
      </main>
    </ConsumerShell>
  );
}
