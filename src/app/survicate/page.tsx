import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import PremiumAffiliateLanding from "@/components/affiliate/PremiumAffiliateLanding";
import Link from "next/link";
import { survicateConfig } from "./config";

import { pageDates } from "@/lib/page-dates";
export const metadata = generateSEOMetadata(seoConfig.survicate);

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: survicateConfig.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Surveys & feedback", item: `${SITE_URL}/guides` },
    { "@type": "ListItem", position: 3, name: "Survicate", item: seoConfig.survicate.url },
  ],
};
const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.survicate.title,
  description: seoConfig.survicate.description,
  url: seoConfig.survicate.url,
  inLanguage: "en-AU",
  datePublished: "2026-07-09",
  dateModified: pageDates("/survicate")?.updated ?? "2026-07-09",
  isPartOf: { "@id": `${SITE_URL}/#website` },
};
const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Survicate",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: "Customer-feedback platform for running surveys across website, email, app and chat, with AI analysis and 50+ integrations.",
  offers: { "@type": "Offer", description: "See current offer and pricing on the provider.", availability: "https://schema.org/InStock" },
  url: "https://survicate.com",
  sameAs: ["https://survicate.com"],
};

export default function SurvicatePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <PremiumAffiliateLanding config={survicateConfig} />
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
