import Link from "next/link";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import ComingSoonNote from "@/components/consumer/ComingSoonNote";
import NewsletterSignup from "@/components/consumer/NewsletterSignup";
import { SITE_URL, comparisonArticleSchema } from "@/lib/seo";
import { pageDates } from "@/lib/page-dates";

/**
 * Chrome and structured data for a section guide.
 *
 * Deliberately holds layout and schema only. The body of every guide is written
 * per page rather than generated from a shared skeleton, because sibling pages
 * built from one template with the nouns swapped read as filler to a person and
 * as duplicate content to a crawler.
 */
export default function SectionGuideShell({
  section,
  sectionHref,
  slug,
  crumb,
  h1,
  intro,
  faqs,
  related,
  headline,
  description,
  updated,
  children,
}: {
  section: string;
  sectionHref: string;
  slug: string;
  crumb: string;
  h1: React.ReactNode;
  intro: string;
  faqs: { q: string; a: string }[];
  related: { href: string; label: string }[];
  headline: string;
  description: string;
  /**
   * A date on which a person actually re-read this page's sources. Optional,
   * because most pages do not have one and inventing it is the fault this
   * replaced: 25 pages showed "Last checked 19 August 2026", a day BEFORE their
   * own first commit. Pass it only where it is real, sourced from a partner data
   * file's readOn. Where it is absent the page says "Last updated" and uses the
   * generated git date, which is a fact rather than a claim about our diligence.
   */
  updated?: string;
  children: React.ReactNode;
}) {
  const url = `${SITE_URL}${slug}`;
  const dates = pageDates(slug);
  const published = dates?.published ?? updated ?? "";
  const modified = dates?.updated ?? updated ?? "";
  const checked = updated;
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: section, item: `${SITE_URL}${sectionHref}` },
      { "@type": "ListItem", position: 3, name: crumb, item: url },
    ],
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  // Article schema with a named author and a dateModified. Established guides on
  // the site carry both; the first cut of this section did not, which left the
  // new pages weaker on exactly the accountability and freshness signals that
  // health content is judged on.
  const articleSchema = comparisonArticleSchema({
    headline,
    description,
    url,
    // Distinct on purpose. Setting both to one value told Google every page was
    // published and modified on the same day, and moved datePublished forward on
    // every edit, so an established page kept presenting as brand new.
    datePublished: published,
    dateModified: modified,
  });

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: crumb,
    url,
    inLanguage: "en-AU",
    isPartOf: { "@id": `${SITE_URL}/#website` },
  };

  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      <main id="main-content" className="mx-auto max-w-3xl px-5 pb-20 pt-10 sm:px-8">
        <nav className="flex flex-wrap items-center gap-2 text-sm text-[#9aa39c]">
          <Link href="/" className="hover:text-[#0a7c42]">Refer Labs</Link>
          <span>/</span>
          <Link href={sectionHref} className="hover:text-[#0a7c42]">{section}</Link>
          <span>/</span>
          <span className="text-[#2b362f]">{crumb}</span>
        </nav>

        <h1 className="mt-5 text-3xl font-bold leading-[1.1] tracking-[-0.01em] text-[#10251b] sm:text-4xl">{h1}</h1>
        <p className="mt-5 text-lg leading-relaxed text-[#2b362f]">{intro}</p>
        {/* Named verifier, matching the brand-page offer stamp. A bare "Last
            checked <date>" is liftable but uncreditable; see the note in
            PremiumAffiliateLanding. */}
        <p className="mt-4 text-xs font-medium text-[#6e7b74]">
          {checked ? "Last checked by Refer Labs, " : "Last updated "}
          {new Date(`${checked ?? modified}T00:00:00`).toLocaleDateString("en-AU", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>

        <div className="mt-7">
          <ComingSoonNote category={section} />
        </div>

        <div className="mt-10 space-y-10 text-[15px] leading-relaxed text-[#3d4b44]">{children}</div>

        <section className="mt-14">
          <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">Common questions</h2>
          <dl className="mt-5 divide-y divide-[#eef1ef] rounded-2xl border border-[#e5e9e7] bg-white">
            {faqs.map((f) => (
              <div key={f.q} className="px-5 py-5">
                <dt className="text-[15px] font-bold text-[#10251b]">{f.q}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-[#3d4b44]">{f.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-12 border-t border-[#eef1ef] pt-8">
          <h2 className="text-xs font-bold uppercase tracking-[0.12em] text-[#9aa39c]">Keep reading</h2>
          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {related.map((r) => (
              <li key={r.href}>
                <Link href={r.href} className="font-semibold text-[#0a7c42] hover:underline">{r.label}</Link>
              </li>
            ))}
            <li>
              <Link href={sectionHref} className="text-[#3d4b44] hover:text-[#0a7c42] hover:underline">
                All {section.toLowerCase()} guides
              </Link>
            </li>
          </ul>
        </section>

        <p className="mt-10 text-xs leading-relaxed text-[#6e7b74]">
          General information for an Australian audience, not medical advice and not a diagnosis. Circumstances differ
          from person to person, and anything prescription-only is supplied in Australia only after an individual
          assessment by a registered practitioner who decides whether it is appropriate. Prices change; each figure
          states when we checked it.
        </p>

        <div className="mt-10">
          <NewsletterSignup />
        </div>
      </main>
    </ConsumerShell>
  );
}
