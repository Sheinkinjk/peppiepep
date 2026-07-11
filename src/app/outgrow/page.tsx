import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import PremiumAffiliateLanding from "@/components/affiliate/PremiumAffiliateLanding";
import Link from "next/link";
import { outgrowConfig } from "./config";

export const metadata = generateSEOMetadata(seoConfig.outgrow);

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: outgrowConfig.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Lead generation", item: `${SITE_URL}/compare/lead-generation` },
    { "@type": "ListItem", position: 3, name: "Outgrow", item: `${SITE_URL}/outgrow` },
  ],
};
const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.outgrow.title,
  description: seoConfig.outgrow.description,
  url: seoConfig.outgrow.url,
  inLanguage: "en-AU",
  datePublished: "2026-07-11",
  dateModified: "2026-07-11",
  isPartOf: { "@type": "WebSite", name: "Refer Labs", url: SITE_URL },
};
const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Outgrow",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: "No-code interactive-content platform for building calculators, quizzes, assessments, polls and forms that capture qualified leads.",
  offers: { "@type": "Offer", priceCurrency: "USD", description: "Free plan; 7-day Business trial with no card; paid plans from around US$14/month billed annually.", availability: "https://schema.org/InStock" },
  url: "https://outgrow.co",
  sameAs: ["https://outgrow.co"],
};

export default function OutgrowPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <PremiumAffiliateLanding config={outgrowConfig} />
      <div className="border-t border-[#e5e9e7] bg-white py-6">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">
          <p className="text-[#9aa39c] text-xs mb-1.5">Compare lead-generation tools</p>
          <Link href="/compare/lead-generation" className="text-sm text-[#0a7c42] font-semibold hover:text-[#086536] transition-colors">
            See Outgrow next to the other lead tools &rarr;
          </Link>
        </div>
      </div>
    </>
  );
}
