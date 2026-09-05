import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import PremiumAffiliateLanding from "@/components/affiliate/PremiumAffiliateLanding";
import Link from "next/link";
import { pipedriveConfig } from "./config";

import { pageDates } from "@/lib/page-dates";
export const metadata = generateSEOMetadata(seoConfig.pipedrive);

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: pipedriveConfig.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "AI sales tools", item: `${SITE_URL}/compare/ai-sales-tools` },
    { "@type": "ListItem", position: 3, name: "Pipedrive", item: `${SITE_URL}/pipedrive` },
  ],
};
const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.pipedrive.title,
  description: seoConfig.pipedrive.description,
  url: seoConfig.pipedrive.url,
  inLanguage: "en-AU",
  datePublished: "2026-07-11",
  dateModified: pageDates("/pipedrive")?.updated ?? "2026-07-11",
  isPartOf: { "@id": `${SITE_URL}/#website` },
};
const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Pipedrive",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: "Sales CRM and pipeline-management software with a visual deal pipeline, activity reminders, email sync, automation and reporting.",
  offers: { "@type": "Offer", price: "14", priceCurrency: "USD", description: "14-day free trial, no card; per-seat plans from US$14/seat/month billed annually.", availability: "https://schema.org/InStock" },
  url: "https://www.pipedrive.com",
  sameAs: ["https://www.pipedrive.com"],
};

export default function PipedrivePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <PremiumAffiliateLanding config={pipedriveConfig} />
      <div className="border-t border-[#e5e9e7] bg-white py-6">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">
          <p className="text-[#9aa39c] text-xs mb-1.5">Compare sales tools</p>
          <Link href="/compare/ai-sales-tools" className="text-sm text-[#0a7c42] font-semibold hover:text-[#086536] transition-colors">
            See Pipedrive next to the other sales tools &rarr;
          </Link>
        </div>
      </div>
    </>
  );
}
