import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import PremiumAffiliateLanding from "@/components/affiliate/PremiumAffiliateLanding";
import Link from "next/link";
import { employmentHeroConfig } from "./config";

export const metadata = generateSEOMetadata(seoConfig.employmentHero);

// ─── JSON-LD Schemas ──────────────────────────────────────────────────────────

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: employmentHeroConfig.faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/guides` },
    { "@type": "ListItem", position: 3, name: "Employment Hero Review Australia", item: `${SITE_URL}/employmenthero` },
  ],
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.employmentHero.title,
  description: seoConfig.employmentHero.description,
  url: seoConfig.employmentHero.url,
  inLanguage: "en-AU",
  datePublished: "2026-07-06",
  dateModified: "2026-07-06",
  about: [
    { "@type": "Thing", name: "Employment Hero HR and payroll platform" },
    { "@type": "Thing", name: "HR software Australia" },
    { "@type": "Thing", name: "payroll software Australia" },
    { "@type": "Thing", name: "Single Touch Payroll STP Phase 2" },
    { "@type": "Thing", name: "Fair Work compliance" },
    { "@type": "Thing", name: "employment platform Australia" },
  ],
  isPartOf: { "@type": "WebSite", name: "Refer Labs", url: SITE_URL },
};

// Pricing is not published publicly, so no Offer with a price is asserted.
const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Employment Hero",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web, iOS, Android",
  description:
    "Australian-built, all-in-one HR, payroll and employment platform: HR and people operations, ATO-certified Single Touch Payroll (STP Phase 2), AI recruitment and applicant tracking, employee benefits and earned wage access, and an employee app. Fair Work and ATO compliant.",
  url: "https://employmenthero.com",
  sameAs: ["https://employmenthero.com"],
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function EmploymentHeroPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <PremiumAffiliateLanding config={employmentHeroConfig} />
      <div className="border-t border-[#e5e9e7] bg-white py-6">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">
          <p className="text-[#9aa39c] text-xs mb-1.5">More business tools</p>
          <Link
            href="/best-ai-sales-tools"
            className="text-sm text-[#0a7c42] font-semibold hover:text-[#086536] transition-colors"
          >
            See the best AI sales and automation tools for 2026 &rarr;
          </Link>
        </div>
      </div>
    </>
  );
}
