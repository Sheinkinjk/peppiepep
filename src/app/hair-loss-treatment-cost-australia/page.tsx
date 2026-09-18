import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL, comparisonArticleSchema } from "@/lib/seo";
import { MOSH_HAIR_URL } from "@/lib/affiliate-links";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import StickyCta from "@/components/consumer/StickyCta";
import EditorialMeta from "@/components/consumer/EditorialMeta";

export const metadata = generateSEOMetadata(seoConfig.hairLossTreatmentCost);

const SLUG = "/hair-loss-treatment-cost-australia";

// ─── JSON-LD ──────────────────────────────────────────────────────────────────

const articleSchema = comparisonArticleSchema({
  headline: "Hair loss treatment cost in Australia: Refer Labs' 2026 breakdown",
  description: "Refer Labs sets out what hair-loss treatment costs in Australia, comparing over-the-counter options with telehealth plans.",
  url: "https://referlabs.com.au/hair-loss-treatment-cost-australia",
  datePublished: "2026-07-17",
  dateModified: "2026-08-14",
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

const faqs = [
  {
    q: "How much does hair-loss treatment cost in Australia?",
    a: "It depends on the route. Buying an over-the-counter topical product is a one-off cost that varies by pharmacy. A telehealth plan is usually a monthly subscription that bundles treatment, practitioner oversight and delivery: Mosh, for example, offers tiered plans with free delivery, and shows the plan and price before you commit. The exact plan a practitioner assigns is confirmed during the assessment, so check the current figure on the provider's own site.",
  },
  {
    q: "Why is telehealth hair-loss treatment priced as a subscription?",
    a: "Because the treatments are ongoing rather than one-off. Prescription hair-loss treatments only keep working while you keep using them, so services bundle the medicine, practitioner oversight and delivery into a monthly plan. The upside is convenience and included review; the thing to check is that you are comparing like plans, since a single-active plan and a multi-active plan are priced differently.",
  },
  {
    q: "Is hair-loss treatment covered by Medicare or the PBS?",
    a: "Generally not for cosmetic hair loss. Prescription treatment for male pattern hair loss is not PBS-subsidised, so you pay a private price, and over-the-counter topical products are not subsidised either. A telehealth consultation may attract a Medicare rebate in some circumstances, but the treatment and plan costs are typically out of pocket. Check current details with each provider.",
  },
  {
    q: "Is it cheaper to buy an over-the-counter product myself?",
    a: "For an over-the-counter topical alone, buying it at a pharmacy can be the cheapest route, since it does not need a prescription. The trade-off is that you are managing it yourself with no practitioner assessment, and prescription treatment is not available that way. Many people who want a combined, assessed plan find the convenience of a telehealth subscription worth the price. It comes down to whether you want a full plan or a single product.",
  },
  {
    q: "What does the Mosh hair-loss offer include?",
    a: "New customers get 55% off their first order through the link on this page, and plans include free, discreet delivery. Mosh does not publish its plan prices publicly: the plan and price are set by the assessment and shown to you before you commit. Two things Mosh does publish are worth knowing if you are comparing on cost. It advertises a 180-day money-back guarantee, and a price-match guarantee on substantially comparable programs, so a cheaper like-for-like plan elsewhere is worth raising with them directly. Checked on Mosh's own site, 14 August 2026; terms can change, so verify before you commit.",
  },
  {
    q: "Does Refer Labs earn money from this page?",
    a: "Some links are disclosed affiliate links, including the link to Mosh, so we may earn a commission if you sign up through them, at no extra cost to you. It never changes what we write or how we compare options. Everything here is general information about cost, not medical or financial advice.",
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
  dateModified: "2026-08-14",
  about: [
    { "@type": "Thing", name: "hair loss treatment cost Australia" },
    { "@type": "Thing", name: "Mosh hair loss cost" },
    { "@type": "Thing", name: "hair loss telehealth cost Australia" },
    { "@type": "Thing", name: "hair loss treatment subscription cost" },
  ],
  isPartOf: { "@id": `${SITE_URL}/#website` },
};

// Mosh's plan tiers. We deliberately do not quote specific plan prices: they are
// shown on Mosh's own site before you commit, and pricing can change.
const plans: { name: string; tier: string; note: string }[] = [
  { name: "Single-active plan", tier: "Entry", note: "One active. Positioned for early thinning or a receding hairline." },
  { name: "Two-active plan", tier: "Most popular", note: "Two actives combined, the combination approach clinical reviews rate highest." },
  { name: "Advanced plan", tier: "Most comprehensive", note: "Multiple actives, for more established hair loss." },
];

export default function HairLossTreatmentCostAustraliaPage() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      <main className="text-[#14120f]">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">

          {/* Breadcrumb */}
          <nav className="flex flex-wrap items-center gap-2 pt-8 text-sm text-[#56504a]">
            <Link href="/" className="hover:text-[#14120f] transition-colors">Refer Labs</Link>
            <span>/</span>
            <Link href="/hair-loss" className="hover:text-[#14120f] transition-colors">Hair loss</Link>
            <span>/</span>
            <span className="text-[#14120f]">Treatment cost</span>
          </nav>

          {/* Hero */}
          <header className="pt-9 pb-6">
            <h1 className="mt-4 text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold leading-[1.08] tracking-tight text-[#14120f]">
              What hair-loss treatment costs in Australia
            </h1>
            <p className="mt-5 text-base sm:text-lg leading-relaxed text-[#56504a]">
              There are two routes and they are priced on different models, which is why a single figure does not exist.
              An over-the-counter topical is a one-off purchase that varies by pharmacy. A telehealth plan is a monthly
              subscription that continues whether you consult or not, and nothing in this category attracts a Medicare
              rebate on the product itself. Annualise both before comparing them. General information about cost, not
              medical or financial advice.
            </p>
            <EditorialMeta lastUpdated="2026-08-14" className="mt-5" />
          </header>

          {/* Info-only note */}
          <div className="nw-card px-5 py-4 text-sm leading-relaxed text-[#56504a]">
            <span className="font-bold text-[#14120f]">Prices change.</span> The figures below are the providers&apos; own
            published prices, which can change, so verify current pricing on each provider before you
            commit. This page contains a disclosed affiliate link to Mosh.
          </div>

          {/* First CTA */}
          <div className="mt-7 flex flex-col items-start gap-3 rounded-2xl border border-[#007a95]/25 bg-[#e4f2f5] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md text-[15px] leading-relaxed text-[#14120f]">
              New customers get 55% off their first order through our link, with free delivery. The plan and price are
              shown on Mosh and confirmed after a practitioner assessment.
            </p>
            <a
              href={MOSH_HAIR_URL}
              target="_blank"
              rel="nofollow sponsored"
              data-cta="hairloss-cost-hero"
              className="nw-btn shrink-0 whitespace-nowrap"
            >
              See Mosh plans <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          {/* Body */}
          <article className="mt-10 space-y-9">

            {/* Answer-first block. The page carried the buyer's question only as
                the sixth FAQ, so an engine had to read to the bottom to find the
                answer, and it was cited in none of eleven sampled answers.
                The question is now a visible H2 at the top with a liftable answer
                beneath it, which is the pattern the sibling comparison pages use.

                It deliberately does not invent a monthly figure. Mosh does not
                publish plan prices: the plan and price are set after a
                practitioner assessment. Competitor pages that win this question
                quote numbers we cannot honestly match, so this states the cost
                STRUCTURE and the one figure that is verified. */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#14120f]">
                How much does hair-loss treatment cost per month in Australia?
              </h2>
              <div className="mt-4 rounded-xl border border-[#b9e3eb] bg-[#e4f2f5] px-6 py-5">
                <p className="text-[15px] leading-relaxed text-[#14120f]">
                  There are two cost structures, and they are not comparable on a single number. An over-the-counter
                  topical product is a one-off purchase you repeat, priced by the pharmacy and paid for entirely by you.
                  A telehealth plan is a monthly subscription that bundles the practitioner assessment, ongoing review
                  and delivery into one recurring charge, so the monthly figure covers more than the product. Neither
                  route attracts a Medicare rebate or a PBS subsidy for cosmetic hair loss, so the price you see is the
                  price you pay.
                </p>
                <p className="mt-3 text-[15px] leading-relaxed text-[#14120f]">
                  Mosh does not publish its plan prices, because the plan is assigned after the assessment and shown to
                  you before you commit. Rather than quote a figure that would be a guess, this page explains what sits
                  inside each route so you can compare the quote you are given. Refer Labs readers get{" "}
                  <strong className="font-semibold text-[#14120f]">55% off a first order</strong> through our link
                  (verified on Mosh&apos;s own page, 17 August 2026).
                </p>
              </div>
            </section>
            <section>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#14120f]">
                The two cost routes
              </h2>
              <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-[#56504a]">
                <p>
                  <span className="font-semibold text-[#14120f]">Buy over the counter.</span> Some topical products are
                  available at a pharmacy without a prescription. The cost is a one-off product price that varies by
                  pharmacy, brand and pack size, and you manage it yourself. It is often the cheapest single route, but it
                  only covers over-the-counter options, not prescription treatment.
                </p>
                <p>
                  <span className="font-semibold text-[#14120f]">A telehealth plan.</span> Services bundle treatment,
                  practitioner oversight and delivery into a monthly subscription. This is how you access prescription
                  treatment where a practitioner assesses it as appropriate, and how most combined plans are sold. The
                  rest of this page uses Mosh&apos;s published prices as the worked example, because it publishes them
                  openly.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#14120f]">
                Mosh hair-loss plans, by tier
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-[#56504a]">
                Mosh offers tiered plans, with the exact plan assigned after a practitioner assessment. You see the plan
                and price inside Mosh&apos;s own flow before you commit, which is why we point you there rather than quote
                a figure that can change.
              </p>
              <div className="mt-5 overflow-x-auto rounded-xl border border-[#ded8cd]">
                <table className="w-full min-w-[520px] text-sm">
                  <thead>
                    <tr className="bg-[#f7f4ee] text-left">
                      <th className="px-4 py-3 font-semibold text-[#14120f]">Plan</th>
                      <th className="px-4 py-3 font-semibold text-[#14120f]">Tier</th>
                      <th className="px-4 py-3 font-semibold text-[#14120f]">Best for</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#ded8cd]">
                    {plans.map((p) => (
                      <tr key={p.name}>
                        <td className="px-4 py-3 font-semibold text-[#14120f]">{p.name}</td>
                        <td className="px-4 py-3 whitespace-nowrap font-semibold text-[#007a95]">{p.tier}</td>
                        <td className="px-4 py-3 text-[#56504a]">{p.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-[#56504a]">
                Plans include free, discreet delivery, and Mosh advertises a money-back guarantee. New customers get 55%
                off their first order through our link. You see the current plan and price on Mosh before you commit.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#14120f]">
                What is, and is not, subsidised
              </h2>
              <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-[#56504a]">
                <p>
                  For cosmetic hair loss, expect to pay privately. Prescription treatment for male pattern hair
                  loss is not subsidised on the PBS, and over-the-counter products are not subsidised either. A telehealth
                  consultation may attract a Medicare rebate in some circumstances, but the treatment and plan costs are
                  typically out of pocket. It is worth confirming the current position with each provider rather than
                  assuming.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#14120f]">
                How to compare like with like
              </h2>
              <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-[#56504a]">
                <p>
                  The trap is comparing a single-active plan against a multi-active one on price alone. A cheaper plan
                  that includes one active is not cheaper than a dearer plan that includes two, if the two-active
                  plan is what a practitioner assigns you. Compare on what is included, not just the headline monthly
                  figure, and remember any introductory discount applies to the first order rather than the ongoing price.
                </p>
                <p>
                  For the routes themselves, our{" "}
                  <Link href="/best-hair-loss-treatment-australia" className="nw-link">comparison of the main providers</Link>{" "}
                  lines up the clinical and topical options side by side, and the{" "}
                  <Link href="/hair-loss" className="nw-link">hair-loss hub</Link> explains which route fits which stage.
                </p>
              </div>
            </section>

            {/* Second CTA */}
            <section className="rounded-2xl border border-[#ded8cd] bg-[#f1ede4] px-6 py-6">
              <h2 className="text-lg font-bold text-[#14120f]">See the plan and price for you</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-[#56504a]">
                The exact plan and price are confirmed after a practitioner assessment. Mosh runs a men&apos;s hair-loss
                assessment online, reviewed by registered Australian practitioners, with free delivery and 55% off your
                first order through our link.
              </p>
              <a
                href={MOSH_HAIR_URL}
                target="_blank"
                rel="nofollow sponsored"
                data-cta="hairloss-cost-footer"
                className="nw-btn mt-5"
              >
                See Mosh plans <ArrowRight className="h-4 w-4" />
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
                affiliate link to Mosh, which means we may earn a commission if you sign up through our link. Commissions
                never change what we write. Prices shown are the providers&apos; own published figures and can change, so
                verify current pricing before you commit. Content is general information, not medical or financial advice.
              </p>
            </section>
          </article>
        </div>
      </main>
      <StickyCta href={MOSH_HAIR_URL} product="Mosh hair-loss telehealth" label="See plans" />
    </ConsumerShell>
  );
}
