import "./home.css";
import { HomePage } from "@/components/home/HomePage";
import { SITE_URL } from "@/lib/seo";
import { faqs } from "@/lib/home/content";
import { categoryCards } from "@/lib/home/sections";

/**
 * The homepage (redesigned 18 Sep 2026). Metadata comes from the root layout
 * (seoConfig.home). The page itself lives in src/components/home and draws its
 * copy from src/lib/home, and its offers from src/lib/offers.ts, so no figure
 * on it is typed by hand.
 *
 * Structured data is derived from the same arrays the page renders, so it
 * cannot describe a category or a question the visitor does not see.
 */

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Refer Labs comparison categories",
  // The live categories in the order the page shows them, then the one section
  // still being built (Men's Health), which is a real, reachable hub.
  itemListElement: [
    ...categoryCards.map((c) => ({ name: c.label, href: c.href })),
    { name: "Men's Health", href: "/mens-health" },
  ].map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: c.name,
    url: `${SITE_URL}${c.href}`,
  })),
};

// Matches the visible "Common questions" word for word, so the FAQPage is legitimate.
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.items.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <HomePage />
    </>
  );
}
