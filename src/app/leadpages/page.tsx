import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import PremiumAffiliateLanding from "@/components/affiliate/PremiumAffiliateLanding";
import Link from "next/link";
import { leadpagesConfig } from "./config";

export const metadata = generateSEOMetadata(seoConfig.leadpages);

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: leadpagesConfig.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Website builders", item: `${SITE_URL}/best-website-builder` },
    { "@type": "ListItem", position: 3, name: "Leadpages Review", item: `${SITE_URL}/leadpages` },
  ],
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.leadpages.title,
  description: seoConfig.leadpages.description,
  url: seoConfig.leadpages.url,
  inLanguage: "en-AU",
  datePublished: "2026-07-08",
  dateModified: "2026-07-08",
  isPartOf: { "@type": "WebSite", name: "Refer Labs", url: SITE_URL },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Leadpages",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "Landing-page builder focused on lead generation: conversion template library, lead-capture forms, pop-ups and alert bars, built-in A/B testing, and email/CRM integrations.",
  offers: {
    "@type": "Offer",
    priceCurrency: "USD",
    description: "Free trial with paid plans at the time of writing. Verify current pricing on the provider.",
    availability: "https://schema.org/InStock",
  },
  url: "https://www.leadpages.com",
  sameAs: ["https://www.leadpages.com"],
};

export default function LeadpagesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <PremiumAffiliateLanding config={leadpagesConfig} />
      <div className="border-t border-[#e5e9e7] bg-white py-6">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">
          <p className="text-[#9aa39c] text-xs mb-1.5">Compare website &amp; landing-page builders</p>
          <Link href="/best-website-builder" className="text-sm text-[#0a7c42] font-semibold hover:text-[#086536] transition-colors">
            See how the builders compare in the 2026 roundup &rarr;
          </Link>
        </div>
      </div>
    </>
  );
}
