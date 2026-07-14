import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import ApolloLanding from "./ApolloLanding";
import { faqs } from "./config";

export const metadata = generateSEOMetadata(seoConfig.apolloEnergy);

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
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
    { "@type": "ListItem", position: 2, name: "Apollo Energy Group", item: seoConfig.apolloEnergy.url },
  ],
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.apolloEnergy.title,
  description: seoConfig.apolloEnergy.description,
  url: seoConfig.apolloEnergy.url,
  inLanguage: "en-AU",
  datePublished: "2026-07-15",
  dateModified: "2026-07-15",
  isPartOf: { "@type": "WebSite", name: "Refer Labs", url: SITE_URL },
  about: {
    "@type": "Service",
    name: "Home battery installation",
    serviceType: "Home battery storage installation",
    areaServed: { "@type": "State", name: "New South Wales" },
    provider: {
      "@type": "Organization",
      name: "Apollo Energy Group",
      url: "https://apolloenergygroup.com.au",
    },
  },
};

export default function ApolloEnergyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <ApolloLanding />
    </>
  );
}
