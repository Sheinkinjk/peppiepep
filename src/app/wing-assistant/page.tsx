import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import PremiumAffiliateLanding from "@/components/affiliate/PremiumAffiliateLanding";
import Link from "next/link";
import { wingAssistantConfig } from "./config";

export const metadata = generateSEOMetadata(seoConfig.wingAssistant);

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: wingAssistantConfig.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/guides` },
    { "@type": "ListItem", position: 3, name: "Wing Assistant", item: seoConfig.wingAssistant.url },
  ],
};
const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.wingAssistant.title,
  description: seoConfig.wingAssistant.description,
  url: seoConfig.wingAssistant.url,
  inLanguage: "en-AU",
  datePublished: "2026-07-09",
  dateModified: "2026-07-09",
  isPartOf: { "@id": `${SITE_URL}/#website` },
};
const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Wing Assistant",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: "Managed virtual-assistant service providing dedicated assistants across admin, sales, marketing and support roles, with hiring and management handled.",
  offers: { "@type": "Offer", description: "See current offer and pricing on the provider.", availability: "https://schema.org/InStock" },
  url: "https://wingassistant.com",
  sameAs: ["https://wingassistant.com"],
};

export default function WingAssistantPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <PremiumAffiliateLanding config={wingAssistantConfig} />
      <div className="border-t border-[#e5e9e7] bg-white py-6">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">
          <p className="text-[#9aa39c] text-xs mb-1.5">More tools & comparisons</p>
          <Link href="/guides" className="text-sm text-[#0a7c42] font-semibold hover:text-[#086536] transition-colors">
            Browse all guides & comparisons &rarr;
          </Link>
        </div>
      </div>
    </>
  );
}
