import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import PremiumAffiliateLanding from "@/components/affiliate/PremiumAffiliateLanding";
import Link from "next/link";
import { superfiliateConfig } from "./config";

export const metadata = generateSEOMetadata(seoConfig.superfiliate);

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: superfiliateConfig.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "For business", item: `${SITE_URL}/for-business` },
    { "@type": "ListItem", position: 3, name: "Superfiliate Review", item: `${SITE_URL}/superfiliate` },
  ],
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.superfiliate.title,
  description: seoConfig.superfiliate.description,
  url: seoConfig.superfiliate.url,
  inLanguage: "en-AU",
  datePublished: "2026-07-08",
  dateModified: "2026-07-08",
  isPartOf: { "@type": "WebSite", name: "Refer Labs", url: SITE_URL },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Superfiliate",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "Creator-led growth platform for e-commerce and DTC brands to run affiliate, referral and creator programs, with personalised landing pages and custom links per partner, rewards, tracking and store integrations.",
  offers: {
    "@type": "Offer",
    priceCurrency: "USD",
    description: "Pricing is quoted per brand rather than published; book a demo for current terms.",
    availability: "https://schema.org/InStock",
  },
  url: "https://www.superfiliate.com",
  sameAs: ["https://www.superfiliate.com"],
};

export default function SuperfiliatePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <PremiumAffiliateLanding config={superfiliateConfig} />
      <div className="border-t border-[#e5e9e7] bg-white py-6">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">
          <p className="text-[#9aa39c] text-xs mb-1.5">Looking for programs to promote instead?</p>
          <Link href="/affiliate-programs-australia" className="text-sm text-[#0a7c42] font-semibold hover:text-[#086536] transition-colors">
            See the best affiliate programs for Australians &rarr;
          </Link>
        </div>
      </div>
    </>
  );
}
