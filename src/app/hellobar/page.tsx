import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import PremiumAffiliateLanding from "@/components/affiliate/PremiumAffiliateLanding";
import Link from "next/link";
import { helloBarConfig } from "./config";

import { pageDates } from "@/lib/page-dates";
export const metadata = generateSEOMetadata(seoConfig.helloBar);

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: helloBarConfig.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Lead generation", item: `${SITE_URL}/compare/lead-generation` },
    { "@type": "ListItem", position: 3, name: "Hello Bar", item: `${SITE_URL}/hellobar` },
  ],
};
const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.helloBar.title,
  description: seoConfig.helloBar.description,
  url: seoConfig.helloBar.url,
  inLanguage: "en-AU",
  datePublished: "2026-07-11",
  dateModified: pageDates("/hellobar")?.updated ?? "2026-07-11",
  isPartOf: { "@id": `${SITE_URL}/#website` },
};
const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Hello Bar",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: "No-code tool for adding popups, notification bars and overlays to a website to capture emails and drive conversions, with targeting and A/B testing.",
  offers: { "@type": "Offer", price: "29", priceCurrency: "USD", description: "Free plan; paid plans from US$29/month billed annually.", availability: "https://schema.org/InStock" },
  url: "https://www.hellobar.com",
  sameAs: ["https://www.hellobar.com"],
};

export default function HelloBarPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <PremiumAffiliateLanding config={helloBarConfig} />
      <div className="border-t border-[#e5e9e7] bg-white py-6">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">
          <p className="text-[#9aa39c] text-xs mb-1.5">Compare lead-generation tools</p>
          <Link href="/compare/lead-generation" className="text-sm text-[#0a7c42] font-semibold hover:text-[#086536] transition-colors">
            See Hello Bar next to the other lead tools &rarr;
          </Link>
        </div>
      </div>
    </>
  );
}
