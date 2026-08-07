import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import { MOSH_HAIR_URL } from "@/lib/affiliate-links";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import StickyCta from "@/components/consumer/StickyCta";

export const metadata = generateSEOMetadata(seoConfig.hairLossTreatmentCost);

const SLUG = "/hair-loss-treatment-cost-australia";

// ─── JSON-LD ──────────────────────────────────────────────────────────────────

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
    a: "It depends on the route. Buying an over-the-counter topical product is a one-off cost that varies by pharmacy. A telehealth plan is usually a monthly subscription: Mosh, for example, publishes hair-loss plans from $24 a month for a single-active plan up to $56 a month for its more advanced plan, plus free delivery. These are 'from' prices set by the plan a practitioner assigns, not fixed figures, so the exact cost is confirmed during the assessment.",
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
    a: "Mosh publishes hair-loss plans from $24 a month, and new customers get 55% off their first order through the link on this page. Plans include free, discreet delivery, and Mosh advertises a money-back guarantee. The exact plan and price depend on the assessment, since a practitioner assigns the plan. Verify the current terms on Mosh before committing, as pricing can change.",
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
  dateModified: "2026-07-17",
  about: [
    { "@type": "Thing", name: "hair loss treatment cost Australia" },
    { "@type": "Thing", name: "Mosh hair loss cost" },
    { "@type": "Thing", name: "hair loss telehealth cost Australia" },
    { "@type": "Thing", name: "hair loss treatment subscription cost" },
  ],
  isPartOf: { "@type": "WebSite", name: "Refer Labs", url: SITE_URL },
};

// Mosh's own published "from" plan prices (getmosh.com.au/pricing). "From" minimums,
// not fixed per-drug prices; the assigned plan is decided at assessment.
const plans: { name: string; price: string; note: string }[] = [
  { name: "Single-active plan", price: "From $24/mo", note: "One active. Positioned for early thinning or a receding hairline." },
  { name: "Two-active plan", price: "From $45/mo", note: "Two actives combined, the combination approach clinical reviews rate highest." },
  { name: "Advanced plan", price: "From $56/mo", note: "Multiple actives, for more established hair loss." },
];

export default function HairLossTreatmentCostAustraliaPage() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      <main className="text-[#10251b]">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">

          {/* Breadcrumb */}
          <nav className="flex flex-wrap items-center gap-2 pt-8 text-sm text-[#6e7b74]">
            <Link href="/" className="hover:text-[#10251b] transition-colors">Refer Labs</Link>
            <span>/</span>
            <Link href="/hair-loss" className="hover:text-[#10251b] transition-colors">Hair loss</Link>
            <span>/</span>
            <span className="text-[#10251b]">Treatment cost</span>
          </nav>

          {/* Hero */}
          <header className="pt-9 pb-6">
            <h1 className="mt-4 text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold leading-[1.08] tracking-tight text-[#10251b]">
              What hair-loss treatment costs in Australia
            </h1>
            <p className="mt-5 text-base sm:text-lg leading-relaxed text-[#3d4b44]">
              Hair-loss treatment does not have one price, because there are different routes. This page breaks down the
              real numbers: buying an over-the-counter topical product, and telehealth subscription plans, using Mosh&apos;s
              own published prices as the worked example. It explains why treatment is priced monthly, what is and is not
              subsidised, and how to compare like with like. It is general information about cost, not medical or
              financial advice.
            </p>
          </header>

          {/* Info-only note */}
          <div className="nw-card px-5 py-4 text-sm leading-relaxed text-[#3d4b44]">
            <span className="font-bold text-[#10251b]">Prices change.</span> The figures below are the providers&apos; own
            published prices, which can change, so verify current pricing on each provider before you
            commit. This page contains a disclosed affiliate link to Mosh.
          </div>

          {/* First CTA */}
          <div className="mt-7 flex flex-col items-start gap-3 rounded-2xl border border-[#0a7c42]/25 bg-[#e8f5ee] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md text-[15px] leading-relaxed text-[#10251b]">
              Mosh publishes hair-loss plans from $24 a month, and new customers get 55% off their first order through
              our link. The plan and price are confirmed after a practitioner assessment.
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

            <section>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#10251b]">
                The two cost routes
              </h2>
              <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-[#3d4b44]">
                <p>
                  <span className="font-semibold text-[#10251b]">Buy over the counter.</span> Some topical products are
                  available at a pharmacy without a prescription. The cost is a one-off product price that varies by
                  pharmacy, brand and pack size, and you manage it yourself. It is often the cheapest single route, but it
                  only covers over-the-counter options, not prescription treatment.
                </p>
                <p>
                  <span className="font-semibold text-[#10251b]">A telehealth plan.</span> Services bundle treatment,
                  practitioner oversight and delivery into a monthly subscription. This is how you access prescription
                  treatment where a practitioner assesses it as appropriate, and how most combined plans are sold. The
                  rest of this page uses Mosh&apos;s published prices as the worked example, because it publishes them
                  openly.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#10251b]">
                Mosh hair-loss plans, by tier
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-[#3d4b44]">
                Mosh publishes tiered plans priced from a monthly minimum, with the exact plan assigned after a
                practitioner assessment. These are &ldquo;from&rdquo; prices, not fixed figures.
              </p>
              <div className="mt-5 overflow-x-auto rounded-xl border border-[#e5e9e7]">
                <table className="w-full min-w-[520px] text-sm">
                  <thead>
                    <tr className="bg-[#f5f8f6] text-left">
                      <th className="px-4 py-3 font-semibold text-[#10251b]">Plan</th>
                      <th className="px-4 py-3 font-semibold text-[#10251b]">Price</th>
                      <th className="px-4 py-3 font-semibold text-[#10251b]">Best for</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e5e9e7]">
                    {plans.map((p) => (
                      <tr key={p.name}>
                        <td className="px-4 py-3 font-semibold text-[#10251b]">{p.name}</td>
                        <td className="px-4 py-3 whitespace-nowrap font-semibold text-[#0a7c42]">{p.price}</td>
                        <td className="px-4 py-3 text-[#3d4b44]">{p.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-[#9aa39c]">
                Prices are Mosh&apos;s own published &ldquo;from&rdquo; figures and include free, discreet delivery. Mosh
                advertises a money-back guarantee. New customers get 55% off their first order through our link. Verify
                current pricing on Mosh, as it can change.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#10251b]">
                What is, and is not, subsidised
              </h2>
              <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-[#3d4b44]">
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
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#10251b]">
                How to compare like with like
              </h2>
              <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-[#3d4b44]">
                <p>
                  The trap is comparing a single-active plan against a multi-active one on price alone. A cheaper plan
                  that includes one active is not really cheaper than a dearer plan that includes two, if the two-active
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
            <section className="rounded-2xl border border-[#e5e9e7] bg-[#eef1ec] px-6 py-6">
              <h2 className="text-lg font-bold text-[#10251b]">See the plan and price for you</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-[#3d4b44]">
                The exact plan and price are confirmed after a practitioner assessment. Mosh runs a men&apos;s hair-loss
                assessment online, reviewed by registered Australian practitioners, with plans from $24 a month and 55%
                off your first order through our link.
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
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#10251b]">Frequently asked questions</h2>
              <div className="mt-5 divide-y divide-[#e5e9e7] border-y border-[#e5e9e7]">
                {faqs.map((f) => (
                  <details key={f.q} className="group py-4">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-[#10251b]">
                      {f.q}
                      <span className="text-xl leading-none text-[#0a7c42] transition-transform group-open:rotate-45">+</span>
                    </summary>
                    <p className="mt-3 text-[15px] leading-relaxed text-[#3d4b44]">{f.a}</p>
                  </details>
                ))}
              </div>
            </section>

            {/* Related */}
            <section>
              <h2 className="text-lg font-bold text-[#10251b]">Keep reading</h2>
              <ul className="mt-3 space-y-2 text-[15px]">
                <li><Link href="/best-hair-loss-treatment-australia" className="nw-link">Best hair-loss treatment in Australia, compared</Link></li>
                <li><Link href="/how-to-stop-hair-loss-australia" className="nw-link">How to slow hair loss, and what the evidence supports</Link></li>
                <li><Link href="/online-hair-loss-treatment-australia" className="nw-link">How online hair-loss treatment works</Link></li>
                <li><Link href="/moshhair" className="nw-link">Mosh hair-loss: how it works and the current offer</Link></li>
                <li><Link href="/hair-loss" className="nw-link">The full hair-loss hub</Link></li>
              </ul>
            </section>

            {/* Disclosure */}
            <section className="border-t border-[#e5e9e7] pt-6 pb-16">
              <p className="text-xs leading-relaxed text-[#9aa39c]">
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
