import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { generateMetadata as generateSEOMetadata, SITE_URL } from "@/lib/seo";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import LenderVersus from "@/components/lending/LenderVersus";
import { LENDER_COMPARISONS, getComparison } from "@/lib/lender-comparisons";
import { getLender } from "@/lib/lenders";

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
      <LenderVersus cfg={c} />
    </ConsumerShell>
  );
}
