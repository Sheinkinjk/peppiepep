import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import { allFAQs } from "./faqs";

export const metadata = generateSEOMetadata(seoConfig.faq);

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  url: `${SITE_URL}/faq`,
  mainEntity: allFAQs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {children}
    </>
  );
}
