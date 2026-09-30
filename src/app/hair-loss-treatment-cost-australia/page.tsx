import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL, comparisonArticleSchema } from "@/lib/seo";
import { SectionMark } from "@/components/brand/SectionMark";
import { MOSH_HAIR_URL } from "@/lib/affiliate-links";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import StickyCta from "@/components/consumer/StickyCta";
import EditorialMeta from "@/components/consumer/EditorialMeta";
import CodeAnswer from "@/components/offers/CodeAnswer";
import AffiliateDisclosure from "@/components/consumer/AffiliateDisclosure";
import OfferSchema from "@/components/offers/OfferSchema";

export const metadata = generateSEOMetadata(seoConfig.hairLossTreatmentCost);

const SLUG = "/hair-loss-treatment-cost-australia";

// ─── JSON-LD ──────────────────────────────────────────────────────────────────

const articleSchema = comparisonArticleSchema({
  headline: "Hair loss treatment cost in Australia: Refer Labs' 2026 breakdown",
  description: "Refer Labs sets out what hair-loss treatment costs in Australia, comparing over-the-counter options with telehealth plans.",
  url: "https://referlabs.com.au/hair-loss-treatment-cost-australia",
  datePublished: "2026-07-17",
  dateModified: "2026-09-30",
});

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Hair Loss", item: `${SITE_URL}/hair-loss` },
    { "@type": "ListItem", position: 3, name: "Hair Loss Treatment Cost Australia", item: `${SITE_URL}${SLUG}` },
  ],
};

/*
 * 1 Oct 2026. The lead said nothing here attracts a Medicare rebate while a later
 * section said a telehealth consult may: the two now agree, and state only what
 * is sourced. The code FAQ is gone (it competed with /moshhair for the code query),
 * the plan-tier table that held no information is one sentence, and the offer box
 * sits below the first answer instead of above it.
 */
const MOSH_READ = "30 September 2026";

const faqs = [
  {
    q: "How much does hair-loss treatment cost in Australia?",
    a: "It depends on the route. An over-the-counter shampoo or serum is a one-off purchase priced by the retailer. A GP consult may be bulk-billed, or carry a gap fee after the Medicare rebate. A telehealth service such as Mosh charges a subscription: Mosh lists a monthly price for each of its three hair plans on its own pricing page, and the consultation confirms which applies before you pay.",
  },
  {
    q: "Why is online hair-loss care priced as a subscription?",
    a: "Because hair-loss care is ongoing rather than one-off, online services charge a recurring plan that covers the practitioner consultation and ongoing check-ins. When you compare, compare plans for the same stage: Mosh prices its plans for a receding hairline and for advanced hair loss differently.",
  },
  {
    q: "Is hair-loss treatment covered by Medicare or the PBS?",
    a: `Medicare can rebate a GP consult, which may also be bulk-billed. Hair-loss treatment is not PBS-subsidised, and over-the-counter products are not subsidised. Mosh does not charge for its initial consultation, and its program fees are private: its pricing page mentions bulk billing only for mental-health consults, not hair loss (read ${MOSH_READ}).`,
  },
  {
    q: "Is it cheaper to buy an over-the-counter product myself?",
    a: "For a single product, often yes. Over-the-counter shampoos and serums are cosmetic and need no consult, so you are managing it yourself with no assessment. It comes down to whether you want a practitioner or your GP to assess the cause.",
  },
  {
    q: "Does Refer Labs earn money from this page?",
    a: "Some links are disclosed affiliate links, including the link to Mosh, so we may earn a commission if you sign up through them, at no extra cost to you. Everything here is general information about cost, not medical or financial advice.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.hairLossTreatmentCost.title,
  description: seoConfig.hairLossTreatmentCost.description,
  url: seoConfig.hairLossTreatmentCost.url,
  inLanguage: "en-AU",
  datePublished: "2026-07-17",
  dateModified: "2026-09-30",
  about: [
    { "@type": "Thing", name: "hair loss treatment cost Australia" },
    { "@type": "Thing", name: "Mosh hair loss cost" },
    { "@type": "Thing", name: "hair loss telehealth cost Australia" },
    { "@type": "Thing", name: "hair loss treatment subscription cost" },
  ],
  isPartOf: { "@id": `${SITE_URL}/#website` },
};

export default function HairLossTreatmentCostAustraliaPage() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <OfferSchema code="REFERAL55" />

      <main className="text-[#14120f]">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">

          {/* Breadcrumb */}
          <nav className="flex flex-wrap items-center gap-2 pt-8 text-sm text-[#56504a]">
            <Link href="/" className="hover:text-[#14120f] transition-colors">Refer Labs</Link>
            <span>/</span>
            <Link href="/hair-loss" className="hover:text-[#14120f] transition-colors">Hair loss</Link>
            <span>/</span>
            <span className="text-[#14120f]">Treatment cost</span>
          <SectionMark kind="comb" size={56} /></nav>

          {/* Hero */}
          <header className="pt-9 pb-6">
            <h1 className="mt-4 text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold leading-[1.08] tracking-tight text-[#14120f]">
              What hair-loss treatment costs in Australia
            </h1>
            <p className="mt-5 text-base sm:text-lg leading-relaxed text-[#56504a]">
              There is no single figure, because the three routes are priced on different models. An over-the-counter
              shampoo or serum is a one-off purchase priced by the retailer. A GP consult may be bulk-billed, or carry a
              gap fee after the Medicare rebate. A telehealth service such as Mosh charges a subscription: its initial
              consultation carries no charge, and its program fees are private. Compare the yearly cost of each.
              General information about cost, not medical or financial advice.
            </p>
            <EditorialMeta lastUpdated="2026-09-30" className="mt-5" />
            <AffiliateDisclosure compact className="mt-4" />
          </header>

          {/* Body */}
          <article className="mt-10 space-y-9">

            {/* Answer-first block. The page carried the buyer's question only as
                the sixth FAQ, so an engine had to read to the bottom to find the
                answer, and it was cited in none of eleven sampled answers.
                The question is now a visible H2 at the top with a liftable answer
                beneath it, which is the pattern the sibling comparison pages use.

                It prints no partner price (Jarred, 27 Sep 2026): Mosh publishes
                its own on getmosh.com.au/pricing, and readers see it after the
                click. So this states the cost STRUCTURE of each route. */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#14120f]">
                How much does hair-loss treatment cost per month in Australia?
              </h2>
              <div className="mt-4 rounded-xl border border-[#b9e3eb] bg-[#e4f2f5] px-6 py-5">
                <p className="text-[15px] leading-relaxed text-[#14120f]">
                  The routes are priced differently, so they do not reduce to one monthly number. An over-the-counter
                  product is a one-off purchase you repeat, priced by the retailer and paid entirely by you. A telehealth
                  plan is a recurring charge that covers the practitioner consultation and ongoing check-ins, so the
                  monthly figure covers more than a product. A GP consult is a per-visit fee that Medicare may rebate or
                  the practice may bulk-bill. Hair-loss treatment is not PBS-subsidised.
                </p>
                <p className="mt-3 text-[15px] leading-relaxed text-[#14120f]">
                  Mosh lists a monthly price for each of its three hair plans on its own pricing page, and the
                  consultation confirms which one applies before you pay (getmosh.com.au/pricing, read {MOSH_READ}).
                </p>
              </div>
            </section>

            {/* The offer, below the first answer rather than above it. */}
            <CodeAnswer code="REFERAL55">
              The Mosh discount code through Refer Labs is REFERAL55, worth 55% off a new customer&apos;s first order.
              Our link carries it into Mosh&apos;s sign-up; if it isn&apos;t shown at checkout, enter REFERAL55. More on
              the code and how Mosh works on <Link href="/moshhair" className="nw-link">our Mosh page</Link>.
            </CodeAnswer>
            <div className="flex flex-col items-start gap-3 rounded-2xl border border-[#007a95]/25 bg-[#e4f2f5] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-md text-[15px] leading-relaxed text-[#14120f]">
                See Mosh&apos;s hair plans and their prices on Mosh&apos;s own site. The consultation confirms which plan
                applies before you pay.
              </p>
              <a
                href={MOSH_HAIR_URL}
                target="_blank"
                rel="nofollow sponsored"
                data-cta="hairloss-cost-hero"
                className="nw-btn shrink-0 whitespace-nowrap"
              >
                Continue to Mosh <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#14120f]">
                The three cost routes
              </h2>
              <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-[#56504a]">
                <p>
                  <span className="font-semibold text-[#14120f]">Buy over the counter.</span> Pharmacies sell shampoos,
                  conditioners and serums for thinning hair with no prescription. The cost is a one-off product price that
                  varies by retailer, brand and pack size. It is often the cheapest single route, and you manage it yourself
                  without an assessment.
                </p>
                <p>
                  <span className="font-semibold text-[#14120f]">See your GP.</span> A per-visit consult fee, which may be
                  bulk-billed or rebated by Medicare. A GP can also order tests and refer you to a dermatologist.
                </p>
                <p>
                  <span className="font-semibold text-[#14120f]">A telehealth plan.</span> An online consultation with a
                  registered practitioner, who decides whether any treatment is appropriate, billed as a recurring
                  subscription.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#14120f]">
                How Mosh prices its hair plans
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-[#56504a]">
                Mosh sells three hair plans by stage: for a receding hairline, for thinning and receding hair, and for
                advanced hair loss. Its promotion terms describe
                first-order hair discounts as covering the first three months, and a 180-day money-back guarantee applies
                to quarterly hair programs under Mosh&apos;s terms (getmosh.com.au, read {MOSH_READ}).
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#14120f]">
                What is, and is not, subsidised
              </h2>
              <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-[#56504a]">
                <p>
                  Medicare can rebate a GP consult, and some practices bulk-bill. Hair-loss treatment is not subsidised on
                  the PBS, and over-the-counter products are not subsidised either. Mosh does not charge for its initial
                  consultation, and its program fees are private: its pricing page mentions bulk billing only for its
                  mental-health consults, not for hair loss (read {MOSH_READ}).
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#14120f]">
                How to compare like with like
              </h2>
              <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-[#56504a]">
                <p>
                  Compare plans at the same stage: a plan for a receding hairline and a plan for advanced hair loss are
                  priced differently, and the practitioner decides which applies. Remember that a first-order discount
                  such as REFERAL55 comes off the first order, not every month after it.
                </p>
                <p>
                  For the routes themselves, our{" "}
                  <Link href="/best-hair-loss-treatment-australia" className="nw-link">hair-loss comparison</Link>{" "}
                  sets Mosh beside your GP, and the{" "}
                  <Link href="/hair-loss" className="nw-link">hair-loss hub</Link> explains which route fits which stage.
                </p>
              </div>
            </section>

            {/* Second CTA */}
            <section className="rounded-2xl border border-[#ded8cd] bg-[#f1ede4] px-6 py-6">
              <h2 className="text-lg font-bold text-[#14120f]">See the plan and price for you</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-[#56504a]">
                The plan and price are confirmed in the consultation, before you pay.
              </p>
              <a
                href={MOSH_HAIR_URL}
                target="_blank"
                rel="nofollow sponsored"
                data-cta="hairloss-cost-footer"
                className="nw-btn mt-5"
              >
                Continue to Mosh <ArrowRight className="h-4 w-4" />
              </a>
            </section>

            {/* FAQ */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#14120f]">Frequently asked questions</h2>
              <div className="mt-5 divide-y divide-[#ded8cd] border-y border-[#ded8cd]">
                {faqs.map((f) => (
                  <details key={f.q} className="group py-4">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-[#14120f]">
                      {f.q}
                      <span className="text-xl leading-none text-[#007a95] transition-transform group-open:rotate-45">+</span>
                    </summary>
                    <p className="mt-3 text-[15px] leading-relaxed text-[#56504a]">{f.a}</p>
                  </details>
                ))}
              </div>
            </section>

            {/* Related */}
            <section>
              <h2 className="text-lg font-bold text-[#14120f]">Keep reading</h2>
              <ul className="mt-3 space-y-2 text-[15px]">
                <li><Link href="/best-hair-loss-treatment-australia" className="nw-link">Best hair-loss treatment in Australia, compared</Link></li>
                <li><Link href="/how-to-stop-hair-loss-australia" className="nw-link">How to slow hair loss, and what the evidence supports</Link></li>
                <li><Link href="/online-hair-loss-treatment-australia" className="nw-link">How online hair-loss treatment works</Link></li>
                <li><Link href="/moshhair" className="nw-link">Mosh hair-loss: how it works and the current offer</Link></li>
                <li><Link href="/hair-loss" className="nw-link">The full hair-loss hub</Link></li>
              </ul>
            </section>

            {/* Disclosure */}
            <section className="border-t border-[#ded8cd] pt-6 pb-16">
              <p className="text-xs leading-relaxed text-[#56504a]">
                This page is published by Refer Labs, an independent comparison publisher, and contains a disclosed
                affiliate link to Mosh, which means we may earn a commission if you sign up through our link. This page
                prints no plan prices; Mosh lists its own, which can change, so verify current pricing on Mosh&apos;s own
                site before you commit. Content is general information, not medical or financial advice.
              </p>
            </section>
          </article>
        </div>
      </main>
      <StickyCta href={MOSH_HAIR_URL} product="Mosh · hair-loss telehealth" label="Continue to Mosh" />
    </ConsumerShell>
  );
}
