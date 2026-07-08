import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import PremiumAffiliateLanding from "@/components/affiliate/PremiumAffiliateLanding";
import Link from "next/link";
import { brevoConfig } from "./config";

export const metadata = generateSEOMetadata(seoConfig.brevo);

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: brevoConfig.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Newsletter & email tools", item: `${SITE_URL}/best-newsletter-platform` },
    { "@type": "ListItem", position: 3, name: "Brevo Review", item: `${SITE_URL}/brevo` },
  ],
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.brevo.title,
  description: seoConfig.brevo.description,
  url: seoConfig.brevo.url,
  inLanguage: "en-AU",
  datePublished: "2026-07-08",
  dateModified: "2026-07-08",
  isPartOf: { "@type": "WebSite", name: "Refer Labs", url: SITE_URL },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Brevo",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "All-in-one marketing platform: email marketing, SMS and WhatsApp, marketing automation, a sales CRM and transactional email. Priced by monthly email volume rather than list size, with a free plan.",
  offers: {
    "@type": "Offer",
    priceCurrency: "USD",
    description: "Free plan with a daily send limit; paid tiers priced by monthly email volume at the time of writing. Verify current pricing on the provider.",
    availability: "https://schema.org/InStock",
  },
  url: "https://www.brevo.com",
  sameAs: ["https://www.brevo.com"],
};

export default function BrevoPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <PremiumAffiliateLanding config={brevoConfig} />
      <div className="border-t border-[#e5e9e7] bg-white py-6">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">
          <p className="text-[#9aa39c] text-xs mb-1.5">Compare email &amp; newsletter tools</p>
          <Link href="/best-newsletter-platform" className="text-sm text-[#0a7c42] font-semibold hover:text-[#086536] transition-colors">
            See how the newsletter and email platforms compare &rarr;
          </Link>
        </div>
      </div>
    </>
  );
}
