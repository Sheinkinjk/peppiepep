import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import PremiumAffiliateLanding from "@/components/affiliate/PremiumAffiliateLanding";
import Link from "next/link";
import { keapConfig } from "./config";

export const metadata = generateSEOMetadata(seoConfig.keap);

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: keapConfig.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Sales & CRM tools", item: `${SITE_URL}/best-ai-sales-tools` },
    { "@type": "ListItem", position: 3, name: "Keap", item: seoConfig.keap.url },
  ],
};
const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.keap.title,
  description: seoConfig.keap.description,
  url: seoConfig.keap.url,
  inLanguage: "en-AU",
  datePublished: "2026-07-14",
  dateModified: "2026-07-14",
  isPartOf: { "@id": `${SITE_URL}/#website` },
};
const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Keap",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: "All-in-one CRM with sales and marketing automation for small businesses: contact management, sales pipeline, email and SMS marketing, and automated follow-up.",
  offers: { "@type": "Offer", description: "See current offer and pricing on the provider.", availability: "https://schema.org/InStock" },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <PremiumAffiliateLanding config={keapConfig} />
      <div className="border-t border-[#e5e9e7] bg-white py-6">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">
          <p className="text-[#9aa39c] text-xs mb-1.5">Compare sales & CRM tools</p>
          <Link href="/compare/ai-sales-tools" className="text-sm text-[#0a7c42] font-semibold hover:text-[#086536] transition-colors">
            Compare sales & CRM tools &rarr;
          </Link>
        </div>
      </div>
    </>
  );
}
