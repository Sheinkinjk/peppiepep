import Link from "next/link";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import ComingSoonNote from "@/components/consumer/ComingSoonNote";
import NewsletterSignup from "@/components/consumer/NewsletterSignup";
import { SITE_URL, comparisonArticleSchema } from "@/lib/seo";

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
  updated: string;
  children: React.ReactNode;
}) {
  const url = `${SITE_URL}${slug}`;
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
    datePublished: updated,
    dateModified: updated,
  });

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: crumb,
    url,
    inLanguage: "en-AU",
    isPartOf: { "@type": "WebSite", name: "Refer Labs", url: SITE_URL },
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
        <p className="mt-4 text-xs font-medium text-[#6e7b74]">
          Last checked{" "}
          {new Date(`${updated}T00:00:00`).toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" })}
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
