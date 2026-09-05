import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import PremiumAffiliateLanding from "@/components/affiliate/PremiumAffiliateLanding";
import { pageDates } from "@/lib/page-dates";
import { databoxConfig } from "./config";
import { DATABOX } from "@/lib/partners/databox";

export const metadata = generateSEOMetadata(seoConfig.databox);

/**
 * Built 5 Sep 2026 from the Search Console join. Three Databox discount-code
 * queries drew 160 impressions at a best position of 10.3 and zero clicks,
 * because this URL 308ed to /business-software. The affiliate link was live the
 * whole time.
 *
 * The page answers the query it ranks for rather than dodging it: there is no
 * code, and saying so is the only honest version. The permanent free plan and
 * the annual 20% are the real savings and they are what a reader searching for a
 * coupon actually wants.
 */

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: databoxConfig.faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Business software", item: `${SITE_URL}/business-software` },
    { "@type": "ListItem", position: 3, name: "Databox", item: `${SITE_URL}/databox` },
  ],
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.databox.title,
  description: seoConfig.databox.description,
  url: seoConfig.databox.url,
  inLanguage: "en-AU",
  datePublished: "2026-09-05",
  dateModified: pageDates("/databox")?.updated ?? "2026-09-05",
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Databox",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: seoConfig.databox.description,
  offers: DATABOX.plans.map((p) => ({
    "@type": "Offer",
    name: p.name,
    price: p.price.replace("US$", ""),
    priceCurrency: "USD",
    description: `${p.sources}, ${p.users}. ${DATABOX.billing}.`,
  })),
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <PremiumAffiliateLanding config={databoxConfig} />
    </>
  );
}
