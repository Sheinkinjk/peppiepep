import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL, comparisonArticleSchema } from "@/lib/seo";
import { SectionMark } from "@/components/brand/SectionMark";
import EditorialMeta from "@/components/consumer/EditorialMeta";
import { MOSHY_URL, JUNIPER_URL } from "@/lib/affiliate-links";
import { requiredDisclosureFor } from "@/lib/partner-disclosures";
import MatchPrompt from "@/components/consumer/MatchPrompt";
import { EdgeObject } from "@/components/brand/EdgeObject";
import Link from "next/link";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import NewsletterSignup from "@/components/consumer/NewsletterSignup";
import ProviderPair, { type PairProvider } from "@/components/consumer/ProviderPair";
import WeightInclusionsTable from "@/components/consumer/WeightInclusionsTable";
import OfferSchema from "@/components/offers/OfferSchema";

import AffiliateDisclosure from "@/components/consumer/AffiliateDisclosure";
export const metadata = generateSEOMetadata(seoConfig.bestWeightLossTelehealth);

const JUNIPER_REQUIRED = requiredDisclosureFor(JUNIPER_URL);

/* Rebuilt 30 Sep 2026. The page carried three overlapping comparisons (a
   five-column HubProviders grid, a quick table and a tick matrix) that described
   Moshy as "a lean clinical pathway, no built-in coaching". Moshy's own page lists
   in-app coaching, dietitian meal plans and a community, so the distinction was
   false. One dated table (src/lib/compare/weight-inclusions.ts) now carries the
   facts, and both providers get the same card. Alphabetical, no sticky CTA for
   either. */
const providers: PairProvider[] = [
  {
    name: "Juniper",
    logo: "/logos/juniper.png",
    logoAspect: 16 / 9,
    bestIf: "A weight program designed for women, with 1:1 coaching as an add-on.",
    points: [
      "Online assessment, then an initial consultation",
      "Dietitian chat in the app, meal plans and a private community",
      "Full refund if the practitioner decides it isn't right for you",
    ],
    offer: { text: "Initial consultation waived, valued at $89,", code: "JARREDKFC" },
    href: JUNIPER_URL,
    cta: "Continue to Juniper",
    loc: "best-wl-telehealth-juniper",
  },
  {
    name: "Moshy",
    logo: "/logos/moshy.png",
    bestIf: "An all-inclusive weight program from Mosh's brother brand.",
    points: [
      "Online questionnaire, then a consult by phone or video",
      "In-app coaching, dietitian meal plans and a community",
      "Also covers hair loss and skin care",
    ],
    offer: { text: "$120 off your first order", code: "REFERRAL120" },
    href: MOSHY_URL,
    cta: "Continue to Moshy",
    loc: "best-wl-telehealth-moshy",
  },
];

// ─── JSON-LD ──────────────────────────────────────────────────────────────────

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Best Weight Loss Telehealth Australia 2026", item: `${SITE_URL}/best-weight-loss-telehealth-australia` },
  ],
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Best Weight Loss Telehealth Platforms Australia 2026",
  description: "Comparison of Australian weight loss telehealth platforms Moshy and Juniper: how each assesses you, what support is included, and who each suits.",
  numberOfItems: 2,
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Moshy", description: "Australian telehealth weight management program from Mosh's brother brand. Online questionnaire and practitioner review, in-app coaching, dietitian meal plans and a community.", url: `${SITE_URL}/moshy` },
    { "@type": "ListItem", position: 2, name: "Juniper", description: "Australian weight management program designed for women. Practitioner review, app coaching, dietitian meal plans and a community, with 1:1 coaching as an add-on.", url: `${SITE_URL}/juniper` },
  ],
};

/**
 * The page's FAQ, rendered below AND used to build the FAQPage JSON-LD.
 *
 * One array, two consumers, deliberately. Until 28 Aug 2026 the schema held a
 * separate, differently-worded set of seven while the page rendered six: five of
 * the schema questions appeared nowhere on the page. Google's FAQPage guidance
 * requires the marked-up content to be visible on the source page, so that was a
 * structured-data policy breach on the site's highest-impression page. Deriving
 * the schema from the rendered array makes divergence impossible rather than
 * merely fixed. Do not reintroduce a second hand-written list.
 */
const FAQS: { q: string; a: string }[] = [
  {
    q: "What is the best weight loss telehealth platform in Australia?",
    a: "Moshy and Juniper are the two Australian weight-management telehealth services we compare, and neither is best for everyone. Both include practitioner review, app coaching, dietitian meal plans, a community and a 30-day money-back guarantee (each provider's own page, read 30 September 2026). Both are built with women in mind: Juniper offers 1:1 coaching as an add-on, and Moshy, which takes anyone a practitioner assesses as suitable, also covers hair and skin. A registered practitioner assesses suitability individually.",
  },
  {
    q: "How much does telehealth weight loss cost per month?",
    a: "Moshy and Juniper both publish their program pricing on their own sites. Moshy describes its fee as all-inclusive; Juniper's varies with the plan and level of support. Before you pay, check what the fee includes and whether there is a minimum commitment: Moshy's REFERRAL120 offer carries a 3-month minimum.",
  },
  {
    q: "Are online weight loss clinics in Australia legit?",
    a: "The established services operate as regulated telehealth: an Australian-registered practitioner reviews your assessment and decides whether any treatment is appropriate. Check for a practitioner consultation, an Australian business entity and published contact details. A service offering prescription-only medicines without a practitioner consultation is the red flag.",
  },
  // "Is Moshy or Juniper better?" removed 29 Sep 2026: /moshy-vs-juniper owns
  // that question, and the two pages were splitting "moshy vs juniper"
  // impressions (GSC, 90 days). The head-to-head is linked from the answer section.
  {
    q: "How do these platforms assess you?",
    a: "Both start online: you complete an assessment, and a registered practitioner reviews it and decides whether any treatment is appropriate. Weight-management medicines are prescription-only in Australia, neither service promises a specific treatment in advance, and not everyone who applies is accepted.",
  },
  {
    q: "Are these platforms available across all of Australia?",
    a: "Yes. Moshy and Juniper are both Australian services that consult online, by phone or by video, so where you live in Australia does not change access.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

// Describes Refer Labs' comparison service, NOT any telehealth provider's service.
// Refer Labs is not a medical or telehealth provider.
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Australian weight loss telehealth comparison",
  description:
    "Refer Labs compares Australian weight loss telehealth services using public pricing, eligibility, consultation process, support model, disclosures and suitability considerations.",
  provider: { "@type": "Organization", name: "Refer Labs", url: SITE_URL },
  areaServed: { "@type": "Country", name: "Australia" },
  serviceType: "Comparison publishing",
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.bestWeightLossTelehealth.title,
  description: seoConfig.bestWeightLossTelehealth.description,
  url: seoConfig.bestWeightLossTelehealth.url,
  inLanguage: "en-AU",
  datePublished: "2026-03-16",
  dateModified: "2026-09-30",
  about: [
    { "@type": "Thing", name: "weight loss telehealth Australia 2026" },
    { "@type": "Thing", name: "practitioner-assessed treatment telehealth Australia" },
    { "@type": "Thing", name: "online weight management Australia" },
    { "@type": "Thing", name: "Moshy weight loss review" },
    { "@type": "Thing", name: "Juniper weight loss Australia" },
  ],
  isPartOf: { "@id": `${SITE_URL}/#website` },
};

// ─── Page ─────────────────────────────────────────────────────────────────────

const articleSchema = comparisonArticleSchema({
  headline: "Best weight loss telehealth services in Australia: Refer Labs' comparison",
  description: "Refer Labs compares Australian weight-loss telehealth services on what each includes, how you start and who each is built for.",
  url: "https://referlabs.com.au/best-weight-loss-telehealth-australia",
  datePublished: "2026-07-05",
  dateModified: "2026-09-30",
});

export default function BestWeightLossTelehealthPage() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      <main className="text-[#14120f]">
        <div className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-12">

          <nav className="flex flex-wrap items-center gap-2 pt-8 text-sm text-[#56504a]">
            <Link href="/" className="hover:text-[#14120f] transition-colors">Refer Labs</Link>
            <span>/</span>
            <Link href="/guides" className="hover:text-[#14120f] transition-colors">Guides</Link>
            <span>/</span>
            <span className="text-[#14120f]">Best Weight Loss Telehealth</span>
          <SectionMark kind="scale" size={56} /></nav>

          <section className="pt-10 pb-4 sm:pt-12">
            <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
              <div className="max-w-3xl">
                <h1 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-black leading-[1.08] tracking-tight text-[#14120f] mb-4">
                  Best Weight Loss Telehealth Australia 2026
                </h1>
                {/* The answer, directly under the h1. Nothing between: check-answer-slot. */}
                <p className="text-[#14120f] text-base sm:text-lg leading-relaxed">
                  Moshy and Juniper are two Australian weight-management telehealth services, and what they include is
                  close: both start with an online assessment reviewed by a registered practitioner, and both include
                  app coaching, dietitian meal plans, a community and a 30-day money-back guarantee. Both are built with
                  women in mind. Juniper offers 1:1 coaching as an add-on; Moshy also covers hair and skin and takes
                  anyone a practitioner assesses as suitable. Both decline some applicants.
                </p>
                <div className="mt-4 space-y-2">
                  <AffiliateDisclosure compact partners={["Moshy", "Juniper"]} />
                  {JUNIPER_REQUIRED ? (
                    <p className="rounded-xl border border-[#ded8cd] bg-[#f7f4ee] px-4 py-3 text-[13px] leading-relaxed text-[#56504a]">
                      {JUNIPER_REQUIRED.text}
                    </p>
                  ) : null}
                </div>
              </div>
              <EdgeObject kind="scale" className="lg:mt-14">
                <MatchPrompt
                  stacked
                  href="/weight-loss-quiz"
                  title="Not sure which fits you?"
                  sub="Two questions on the support you want. No health questions, no assessment."
                  cta="Take the 30-second match"
                  dataCta="best-wl-telehealth-hero-quiz"
                />
              </EdgeObject>
            </div>
            <OfferSchema code="REFERRAL120" />
            <OfferSchema code="JARREDKFC" />
          </section>

          <ProviderPair providers={providers} className="mt-8" />

          {/* ── The buyer's question as an H2, with a liftable answer beneath it ── */}
          <section className="pt-12 pb-2">
            <h2 className="text-xl sm:text-2xl font-black text-[#14120f] mb-4">
              What is the best weight-loss telehealth in Australia?
            </h2>
            <p className="text-[#14120f] text-sm sm:text-base leading-relaxed max-w-3xl">
              There is no single best service. Moshy and Juniper include much the same support, so the choice comes
              down to fit: Juniper sells 1:1 coaching as an add-on, while Moshy has an all-inclusive fee and sits
              alongside Mosh&apos;s hair and skin services. Compare what each costs over a
              year on its own site, including the 3-month minimum that comes with Moshy&apos;s REFERRAL120 offer.
            </p>
            <p className="mt-3 text-sm sm:text-base max-w-3xl">
              <Link href="/moshy-vs-juniper" className="font-semibold text-[#007a95] hover:underline">
                Moshy vs Juniper: the two side by side
              </Link>{" "}
              <span className="text-[#56504a]">covers cost, who each suits and what each includes, question by question.</span>
            </p>
          </section>

          <section id="inclusions" className="border-t border-[#ded8cd] mt-10 py-8">
            <h2 className="text-xl sm:text-2xl font-black text-[#14120f] mb-2">What does each include?</h2>
            <p className="text-sm text-[#56504a] leading-relaxed max-w-2xl">
              Read off each provider&apos;s own page. Any treatment is decided by the practitioner and only where
              clinically appropriate.
            </p>
            <WeightInclusionsTable className="mt-5" />
          </section>

          {/* ── Where to start / how to compare (answer-first for unbranded queries) ── */}
          <section id="how-to-compare" className="border-t border-[#ded8cd] py-8">
            <h2 className="text-xl sm:text-2xl font-black text-[#14120f] mb-3">Where to start: how to compare weight-loss telehealth</h2>
            <p className="text-sm text-[#56504a] leading-relaxed max-w-2xl mb-4">
              These factors matter more than the sign-up price. Check each one before you commit:
            </p>
            <ul className="space-y-2.5 text-sm text-[#56504a] max-w-2xl mb-5">
              <li><strong className="text-[#14120f]">Eligibility.</strong> Each provider runs an online assessment and a practitioner reviews whether treatment is appropriate for you. Approval is assessed individually and is not guaranteed.</li>
              <li><strong className="text-[#14120f]">Total cost.</strong> Check what the fee includes and compare the full amount you would pay over the months you expect to stay.</li>
              <li><strong className="text-[#14120f]">Practitioner review and support.</strong> Check whether you get an initial consult, ongoing check-ins, and how you reach a practitioner if something changes.</li>
              <li><strong className="text-[#14120f]">The practitioner decides.</strong> Weight-management medicines are prescription-only in Australia, and neither service promises a specific treatment in advance.</li>
              <li><strong className="text-[#14120f]">Commitment and cancellation.</strong> Confirm any minimum term, and how to pause or cancel, before you subscribe.</li>
            </ul>
            <p className="text-sm text-[#56504a] leading-relaxed max-w-2xl">
              <strong className="text-[#14120f]">Looking for a cheaper option?</strong> The lowest total cost is not
              always a paid telehealth program. A GP (some appointments are bulk-billed) can also assess you, which may
              work out cheaper for some people. Speak with a qualified health professional before starting or changing
              any treatment.
            </p>
          </section>

          {/* How pricing works (no partner prices on this page: Jarred, 27 Sep 2026) */}
          <section id="cost" className="border-t border-[#ded8cd] py-8">
            <h2 className="text-xl sm:text-2xl font-black text-[#14120f] mb-3">What telehealth weight loss costs</h2>
            <p className="text-sm text-[#56504a] leading-relaxed max-w-2xl mb-4">
              Moshy and Juniper both publish their program pricing on their own sites. Moshy describes its fee as
              all-inclusive; Juniper&apos;s varies with the plan and level of support. Through our links,
              Moshy&apos;s REFERRAL120 takes $120 off a new customer&apos;s first order, with a 3-month minimum
              commitment, and Juniper&apos;s JARREDKFC waives the initial consultation, which Juniper values at $89.
            </p>
            <p className="text-xs text-[#56504a]">
              Sources: getmoshy.com.au/weight-loss and myjuniper.com, read 30 September 2026; the JARREDKFC value is from
              Juniper&apos;s affiliate handbook.
            </p>
          </section>

          {/* ── FAQ ──────────────────────────────────────────────────────────── */}
          <section className="border-t border-[#ded8cd] py-12 sm:py-14">
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-[#14120f] mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {FAQS.map(({ q, a }, i) => (
                <div key={i} className="border-b border-[#ded8cd] pb-6">
                  <h3 className="text-sm font-bold text-[#14120f] mb-2">{q}</h3>
                  <p className="text-sm text-[#56504a] leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Deal alert ────────────────────────────────────────────────────── */}
          <section className="border-t border-[#ded8cd] py-8">
            <NewsletterSignup
              variant="alert"
              source="deal-alert-best-weight-loss"
              interest="Weight-loss telehealth offers"
              heading="Get told when a weight-loss offer changes"
              sub="We'll email you if the Moshy or Juniper offers on this page change, and nothing else."
            />
          </section>

          {/* ── Disclaimer + internal links ───────────────────────────────────── */}
          <section className="border-t border-[#ded8cd] py-8 pb-16">
            <EditorialMeta lastUpdated="2026-09-30" className="mb-4" />
            <AffiliateDisclosure partners={["Moshy", "Juniper"]} className="mb-3 max-w-2xl" />
            <p className="text-[#56504a] text-xs leading-relaxed max-w-2xl">
              All content on this page is for informational purposes only and does not constitute medical advice. Suitability for any weight management programme depends on individual health factors. Consult a qualified health professional before starting any treatment.
            </p>
            <div className="mt-4 flex flex-wrap gap-4">
              <Link href="/juniper" className="text-xs text-[#56504a] hover:opacity-80 transition-opacity">
                Our Juniper guide
              </Link>
              <Link href="/moshy" className="text-xs text-[#56504a] hover:opacity-80 transition-opacity">
                Our Moshy guide
              </Link>
              <Link href="/weight-loss" className="text-xs text-[#56504a] hover:opacity-80 transition-opacity">
                Weight loss navigator
              </Link>
            </div>
          </section>

        </div>
      </main>
    </ConsumerShell>
  );
}
