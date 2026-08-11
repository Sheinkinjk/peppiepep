import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import PremiumAffiliateLanding from "@/components/affiliate/PremiumAffiliateLanding";
import Link from "next/link";
import { flexiQuizConfig } from "./config";

export const metadata = generateSEOMetadata(seoConfig.flexiQuiz);

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: flexiQuizConfig.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Lead generation", item: `${SITE_URL}/compare/lead-generation` },
    { "@type": "ListItem", position: 3, name: "FlexiQuiz", item: `${SITE_URL}/flexiquiz` },
  ],
};
const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.flexiQuiz.title,
  description: seoConfig.flexiQuiz.description,
  url: seoConfig.flexiQuiz.url,
  inLanguage: "en-AU",
  datePublished: "2026-07-11",
  dateModified: "2026-07-11",
  isPartOf: { "@type": "WebSite", name: "Refer Labs", url: SITE_URL },
};
const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "FlexiQuiz",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: "Online quiz, test and assessment maker with automatic marking, timers, certificates and reporting for training and education.",
  offers: { "@type": "Offer", price: "17", priceCurrency: "USD", description: "Free plan (up to 20 responses/month, no card); paid plans from US$17/month.", availability: "https://schema.org/InStock" },
  url: "https://www.flexiquiz.com",
  sameAs: ["https://www.flexiquiz.com"],
};

export default function FlexiQuizPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <PremiumAffiliateLanding config={flexiQuizConfig} />
      <div className="border-t border-[#e5e9e7] bg-white py-6">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">
          <p className="text-[#9aa39c] text-xs mb-1.5">Compare lead-generation tools</p>
          <Link href="/compare/lead-generation" className="text-sm text-[#0a7c42] font-semibold hover:text-[#086536] transition-colors">
            See FlexiQuiz next to the other tools &rarr;
          </Link>
        </div>
      </div>
    </>
  );
}
