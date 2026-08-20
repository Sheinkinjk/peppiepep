import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { generateMetadata as generateSEOMetadata, SITE_URL } from "@/lib/seo";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import LenderVersus from "@/components/lending/LenderVersus";
import { LENDER_COMPARISONS, getComparison } from "@/lib/lender-comparisons";
import { getLender, hasHeadlineRate } from "@/lib/lenders";

export function generateStaticParams() {
  return LENDER_COMPARISONS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = getComparison(slug);
  if (!c) return {};
  return generateSEOMetadata({ title: c.title, description: c.description, url: `${SITE_URL}/compare-business-lenders/${c.slug}`, keywords: c.keywords });
}

export default async function ComparisonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getComparison(slug);
  if (!c) notFound();
  const a = getLender(c.a);
  const b = getLender(c.b);
  if (!a || !b) notFound();

  const url = `${SITE_URL}/compare-business-lenders/${c.slug}`;
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Business Loans", item: `${SITE_URL}/business-loans` },
      { "@type": "ListItem", position: 3, name: `${a.name} vs ${b.name}`, item: url },
    ],
  };
  // Head-to-head FAQs derived from both lenders' verified config. These pages
  // target "X vs Y" queries, which is exactly the shape an answer engine wants to
  // quote, and they carried no FAQPage at all.
  const money = (n: number) => `$${n.toLocaleString("en-AU")}`;
  const faqs = a && b ? [
    {
      q: `What is the difference between ${a.name} and ${b.name}?`,
      a: `${a.name} funds ${money(a.minAmount)} to ${money(a.maxAmount)} and indicates ${a.speed.toLowerCase()}. ${b.name} funds ${money(b.minAmount)} to ${money(b.maxAmount)} and indicates ${b.speed.toLowerCase()}. ${c.verdict}`,
    },
    {
      q: `Which is faster, ${a.name} or ${b.name}?`,
      a: `${a.name} indicates ${a.speed.toLowerCase()} and ${b.name} indicates ${b.speed.toLowerCase()}. Both assume a complete application with documents ready; an incomplete file is the usual reason a fast lender is not fast for a particular borrower.`,
    },
    {
      q: `Which lends more, ${a.name} or ${b.name}?`,
      a: `${a.name} publishes a maximum of ${money(a.maxAmount)} and ${b.name} publishes ${money(b.maxAmount)}. The published maximum is what the lender will consider rather than what you will be offered, which depends on their assessment of your business.`,
    },
    {
      q: `How do ${a.name} and ${b.name} price a loan?`,
      a: `${hasHeadlineRate(a) ? `${a.name} advertises ${a.advertisedRateFrom} as at ${a.rateAsAt}` : `${a.name} does not publish a headline rate, so pricing is quote-based`}. ${hasHeadlineRate(b) ? `${b.name} advertises ${b.advertisedRateFrom} as at ${b.rateAsAt}` : `${b.name} does not publish a headline rate, so pricing is quote-based`}. Compare the total repayment figure rather than the headline rate, since fee structures differ.`,
    },
    {
      q: `Does Refer Labs favour one of these lenders?`,
      a: `No. We have no partnership or standing arrangement with either, rankings are never sold, and each enquiry is submitted individually and assessed by the lender on its own criteria.`,
    },
  ] : [];

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: c.title,
    description: c.description,
    url,
    inLanguage: "en-AU",
    isPartOf: { "@type": "WebSite", name: "Refer Labs", url: SITE_URL },
  };

  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      {faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqs.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            }),
          }}
        />
      )}
      <LenderVersus cfg={c} />
      {/* Rendered, not schema-only. FAQPage markup describing questions a reader
          cannot see on the page breaches Google's structured-data guidelines. */}
      {faqs.length > 0 && (
        <section className="mx-auto max-w-3xl px-5 pb-16 sm:px-8">
          <h2 className="text-2xl font-extrabold text-[#10251b]">Common questions</h2>
          <dl className="mt-5 divide-y divide-[#eef1ef] rounded-2xl border border-[#e5e9e7] bg-white">
            {faqs.map((f) => (
              <div key={f.q} className="px-5 py-5">
                <dt className="text-[15px] font-bold text-[#10251b]">{f.q}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-[#3d4b44]">{f.a}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}
    </ConsumerShell>
  );
}
