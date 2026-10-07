import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL, comparisonArticleSchema } from "@/lib/seo";
import { SectionMark } from "@/components/brand/SectionMark";
import { MOSHY_URL, JUNIPER_URL } from "@/lib/affiliate-links";
import { requiredDisclosureFor } from "@/lib/partner-disclosures";
import { Check } from "lucide-react";
import Link from "next/link";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import OfferSchema from "@/components/offers/OfferSchema";
import ProviderPair, { type PairProvider } from "@/components/consumer/ProviderPair";
import WeightInclusionsTable from "@/components/consumer/WeightInclusionsTable";

import AffiliateDisclosure from "@/components/consumer/AffiliateDisclosure";
import { pageDates } from "@/lib/page-dates";
import { MOSHY_TERMS_URL } from "@/lib/offers";
import { OfferTermsNote } from "@/components/consumer/TermsApplyLink";
export const metadata = generateSEOMetadata(seoConfig.weightLossTelehealthWomen);

const CYAN = "#007a95";
const CYAN_LT = "#007a95";
const JUNIPER_REQUIRED = requiredDisclosureFor(JUNIPER_URL);

// Rewritten 30 Sep 2026. The page was built on a "coaching-led (Juniper) vs lean
// clinical (Moshy)" split, which Moshy's own page contradicts: it lists in-app
// coaching, dietitian meal plans and a community. Facts now come from
// src/lib/compare/weight-inclusions.ts. Alphabetical, same card for each.
const providers: PairProvider[] = [
  {
    name: "Juniper",
    logo: "/logos/juniper.png",
    logoAspect: 16 / 9,
    bestIf: "A weight program designed for women, with meal plans, a physio-designed exercise program and a private community.",
    points: [
      "Online assessment, then a phone consultation with an Australian practitioner",
      "Unlimited practitioner support from specialist GPs and nurse practitioners",
      "Full refund if you do not proceed after the consultation (Juniper's terms)",
    ],
    offer: { text: "No charge for the initial consultation, valued at $89 (program fees apply),", code: "JARREDKFC" },
    href: JUNIPER_URL,
    cta: "Continue to Juniper",
    loc: "women-telehealth-juniper",
  },
  {
    name: "Moshy",
    logo: "/logos/moshy.png",
    bestIf: "An all-inclusive weight program from an online women's health clinic.",
    points: [
      "Online questionnaire, then a consult by phone or video",
      "In-app coaching, dietitian meal plans and a community",
      "Also covers hair loss and skin care",
    ],
    offer: { text: "$120 off your first order", code: "REFERRAL120" },
    href: MOSHY_URL,
    cta: "Continue to Moshy",
    loc: "women-telehealth-moshy",
  },
];

const faqs = [
  {
    q: "Which weight loss telehealth services are aimed at women?",
    a: "Both are built for women: Juniper is designed for women, and Moshy describes itself as an online women's health clinic, and its services are open to anyone a practitioner assesses as suitable. Both start with an online assessment that a registered Australian practitioner reviews, and both include meal plans, a community and app progress tracking (each provider's own pages, read 1 October 2026). Juniper lists a physio-designed exercise program; Moshy includes in-app health coaching.",
  },
  {
    q: "Do I need a referral or an in-person appointment to start?",
    a: "Not to start. Both services begin with an online assessment that a registered Australian practitioner reviews. If your situation needs an in-person assessment, a credible service will tell you rather than proceed.",
  },
  {
    q: "How is online weight-management care regulated in Australia?",
    a: "Practitioners consulting through these services must be registered with AHPRA, and telehealth providers operate under Australian health service regulations. A registered practitioner reviews each applicant and some are declined.",
  },
  {
    q: "What does a women's program usually include?",
    a: "Both services we cover include an online assessment, practitioner review, ongoing follow-ups, meal plans, a community, app progress tracking and a 30-day money-back guarantee. Inclusions and pricing are shown on each provider's own site before you commit.",
  },
  {
    q: "How much does Juniper cost, and is there a discount?",
    a: "Juniper publishes its program pricing on its own site. The fee varies with the plan and level of support, and there is a 30-day money-back guarantee. Through Refer Labs, JARREDKFC means no charge for the initial consultation, which Juniper values at $89; program fees apply.",
  },
];

const articleSchema = comparisonArticleSchema({
  headline: "Weight loss telehealth for women in Australia: Refer Labs' comparison",
  description: "Refer Labs compares what Juniper and Moshy each include for women in Australia, read off each provider's own page.",
  url: "https://referlabs.com.au/weight-loss-telehealth-women-australia",
  datePublished: "2026-07-24",
  dateModified: "2026-10-01",
});

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/guides` },
    { "@type": "ListItem", position: 3, name: "Weight Loss Telehealth for Women", item: `${SITE_URL}/weight-loss-telehealth-women-australia` },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  datePublished: "2026-07-24",
  dateModified: pageDates("/weight-loss-telehealth-women-australia")?.updated ?? "2026-07-24",
  name: seoConfig.weightLossTelehealthWomen.title,
  description: seoConfig.weightLossTelehealthWomen.description,
  url: seoConfig.weightLossTelehealthWomen.url,
  inLanguage: "en-AU",
  isPartOf: { "@id": `${SITE_URL}/#website` },
};

export default function WeightLossTelehealthWomenPage() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      <main id="main-content" className="relative mx-auto max-w-3xl px-5 sm:px-8 lg:px-12 pb-24 pt-12 sm:pt-16">
        <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-[#56504a]">
          <Link href="/" className="hover:text-[#14120f] transition-colors">Refer Labs</Link>
          <span>/</span>
          <Link href="/guides" className="hover:text-[#14120f] transition-colors">Guides</Link>
          <span>/</span>
          <span className="text-[#14120f]">Weight Loss Telehealth for Women</span>
        <SectionMark kind="scale" size={56} /></nav>

        <h1 className="text-3xl sm:text-4xl lg:text-[2.7rem] font-black leading-[1.08] tracking-tight mb-5">
          Weight loss telehealth for women in Australia: <span>the options, and how to choose</span>
        </h1>
        <p className="text-[#56504a] text-base sm:text-lg leading-relaxed mb-6 max-w-2xl">
          Juniper and Moshy are two Australian weight-management telehealth services built for women: Juniper is
          designed for women, and Moshy describes itself as an online women&apos;s health clinic. Both start with an online assessment reviewed by a registered
          practitioner, and both include meal plans, a community, app progress tracking and a 30-day money-back
          guarantee. The differences: Juniper lists a physio-designed exercise program and a practitioner team of
          specialist GPs and nurse practitioners, and Moshy has an all-inclusive fee and hair and skin services.
        </p>
        <div className="max-w-2xl space-y-2">
          <AffiliateDisclosure compact partners={["Juniper", "Moshy"]} required={JUNIPER_REQUIRED?.text} />
        </div>
        <OfferSchema code="JARREDKFC" />
        <OfferSchema code="REFERRAL120" />

        <ProviderPair providers={providers} className="mt-8 mb-10" />

        <p className="mb-10 rounded-lg border border-[#ded8cd] bg-[#f7f4ee] px-4 py-3 text-xs leading-relaxed text-[#56504a]">
          <span className="font-semibold text-[#14120f]">Information only.</span> This page describes a category of
          services. It is not medical advice and does not recommend a course of care. A registered practitioner decides what is right for you after an individual assessment. REFERRAL120 is one use per new customer and carries
          a 3-month minimum commitment.
        </p>

        <section className="mb-10">
          <h2 className="text-xl font-black mb-2">What does each include?</h2>
          <WeightInclusionsTable className="mt-4" />
          <p className="mt-4 text-[#56504a] text-sm sm:text-base leading-relaxed">
            The two include much the same support, so the choice is about fit. Juniper suits someone who wants a program
            designed around women, with a physio-designed exercise program. Moshy suits someone who wants an all-inclusive fee or may
            later use Mosh&apos;s hair or skin services. We compare the two question by question in our{" "}
            <Link href="/moshy-vs-juniper" className="underline decoration-[#ded8cd] underline-offset-2 hover:text-[#14120f]" style={{ color: CYAN }}>
              Moshy vs Juniper guide
            </Link>.
          </p>
        </section>


        <section className="mb-12">
          <h2 className="text-xl font-black mb-5">Common questions</h2>
          <div className="space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className="group rounded-xl border border-[#ded8cd] bg-[#f7f4ee] px-5 py-4">
                <summary className="cursor-pointer list-none font-semibold text-[#14120f] text-sm sm:text-base flex items-center justify-between gap-4">
                  {f.q}
                  <span className="text-[#56504a] group-open:rotate-45 transition-transform text-lg leading-none">+</span>
                </summary>
                <p className="text-[#56504a] text-sm leading-relaxed mt-3">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <OfferTermsNote brand="Moshy" className="mb-8" />

        <div className="border-t border-[#ded8cd] pt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <Link href="/moshy-vs-juniper" style={{ color: CYAN }} className="hover:opacity-80">Moshy vs Juniper &rarr;</Link>
          <Link href="/juniper" style={{ color: CYAN }} className="hover:opacity-80">Juniper review &rarr;</Link>
          <Link href="/moshy" style={{ color: CYAN }} className="hover:opacity-80">Moshy guide &rarr;</Link>
          <Link href="/moshy-review" style={{ color: CYAN }} className="hover:opacity-80">Moshy review &rarr;</Link>
          <Link href="/best-weight-loss-telehealth-australia" style={{ color: CYAN }} className="hover:opacity-80">Best weight loss telehealth &rarr;</Link>
        </div>

        <AffiliateDisclosure partners={["Juniper", "Moshy"]} className="mt-8" />
        <p className="text-[#56504a] text-xs mt-3 leading-relaxed">
          Nothing here is medical advice. Always consult a qualified health
          professional before making health decisions.
        </p>
        <p className="text-[#56504a] text-xs mt-4">&copy; 2026 Refer Labs &middot; Australia &middot; <Link href="/guides" className="hover:text-[#56504a]">All guides</Link></p>
      </main>
    </ConsumerShell>
  );
}
