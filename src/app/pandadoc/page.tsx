import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import PremiumAffiliateLanding from "@/components/affiliate/PremiumAffiliateLanding";
import Link from "next/link";
import { pandadocConfig } from "./config";

import { pageDates } from "@/lib/page-dates";
export const metadata = generateSEOMetadata(seoConfig.pandadoc);

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: pandadocConfig.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Business software", item: `${SITE_URL}/business-software` },
    { "@type": "ListItem", position: 3, name: "PandaDoc", item: seoConfig.pandadoc.url },
  ],
};
const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.pandadoc.title,
  description: seoConfig.pandadoc.description,
  url: seoConfig.pandadoc.url,
  inLanguage: "en-AU",
  datePublished: "2026-07-14",
  dateModified: pageDates("/pandadoc")?.updated ?? "2026-07-14",
  isPartOf: { "@id": `${SITE_URL}/#website` },
};
const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "PandaDoc",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: "Document-automation software for proposals, quotes, contracts and forms, with built-in legally binding e-signatures, templates, real-time tracking and CRM integrations.",
  offers: { "@type": "Offer", description: "See current offer and pricing on the provider.", availability: "https://schema.org/InStock" },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <PremiumAffiliateLanding config={pandadocConfig} />
      <div className="border-t border-[#e5e9e7] bg-white py-6">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">
          <p className="text-[#9aa39c] text-xs mb-1.5">See all business software</p>
          <Link href="/business-software" className="text-sm text-[#0a7c42] font-semibold hover:text-[#086536] transition-colors">
            See all business software &rarr;
          </Link>
        </div>
      </div>
    </>
  );
}
