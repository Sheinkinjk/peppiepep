import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL, SCHEMA_AUTHOR, SCHEMA_PUBLISHER } from "@/lib/seo";
import { SectionMark } from "@/components/brand/SectionMark";
import { MOSHY_URL } from "@/lib/affiliate-links";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import StickyCta from "@/components/consumer/StickyCta";
import EditorialMeta from "@/components/consumer/EditorialMeta";
import MatchPrompt from "@/components/consumer/MatchPrompt";

import EarningsBalanceNote from "@/components/consumer/EarningsBalanceNote";
export const metadata = generateSEOMetadata(seoConfig.weightLossTelehealthCost);

const SLUG = "/weight-loss-telehealth-cost-australia";

// ─── JSON-LD ──────────────────────────────────────────────────────────────────

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Weight Loss", item: `${SITE_URL}/weight-loss` },
    { "@type": "ListItem", position: 3, name: "Weight Loss Telehealth Cost Australia", item: `${SITE_URL}${SLUG}` },
  ],
};

const faqs = [
  {
    q: "How much does weight-loss telehealth cost in Australia?",
    a: "Pricing varies between services and changes over time, so there is no single fixed figure. Services charge in one of two ways: an all-inclusive program fee (Moshy, for example, lists its program as including treatment, practitioner support and delivery), or a consultation fee with anything dispensed billed separately by a pharmacy. The exact amount is confirmed during your consult, once a practitioner has assessed what, if anything, is appropriate for you. This page is general information, not medical or financial advice.",
  },
  {
    q: "How much does Moshy cost?",
    a: "Moshy lists its program price on its own site, and describes the program as all-inclusive: treatment, practitioner support and delivery (read on getmoshy.com.au, 30 September 2026). What you pay depends on the plan a practitioner considers appropriate for you, confirmed before you commit. New customers get $120 off their first order with the code REFERRAL120 through the link on this page, which Moshy states applies to eligible programs with a minimum three-month commitment.",
  },
  {
    q: "Is treatment included in the telehealth subscription?",
    a: "It depends on the service. Some, such as Moshy, list an all-inclusive program fee covering treatment, support and delivery. Others charge for the consultation and bill anything dispensed separately through a pharmacy. Read each provider's cost breakdown so you compare the full amount.",
  },
  {
    q: "Is weight-loss telehealth covered by Medicare?",
    a: "Coverage depends on your individual circumstances and the specific service. Some telehealth consultations may attract a Medicare rebate in certain situations, but the subscription and any weight-management medicine are typically not fully covered. Private health insurance coverage varies by policy. Check with the service and your insurer for current details. This is general information, not financial advice.",
  },
  {
    q: "Why can't you give me an exact price?",
    a: "Because there isn't one fixed price that applies to everyone. The total depends on what a practitioner assesses as appropriate for you, and both service fees and medicine prices change over time. Any page quoting a single guaranteed figure would likely be out of date or misleading. The reliable number is the one shown to you inside the service's own flow, after assessment and before you pay.",
  },
  {
    q: "Are there ongoing or subscription costs?",
    a: "Weight management is generally ongoing rather than a one-off, so most medical telehealth services run on a subscription or recurring model that includes practitioner support and follow-up. Any medicine is usually an additional, separate cost. Before committing, check the billing cycle, what is included, and how cancellation works, ideally before you sign up rather than after.",
  },
  {
    q: "How do I find out what it will cost me?",
    a: "Start the eligibility check with the service you are considering. A practitioner assesses your situation, and the applicable cost is confirmed to you before you commit. Moshy's eligibility check is free to complete, so you can see how the process works without paying anything up front. Completing it does not obligate you to proceed.",
  },
  {
    q: "Does Refer Labs set or control these prices?",
    a: "No. Refer Labs is an independent comparison publisher. We explain how pricing generally works and link out to services, including a disclosed affiliate link to Moshy. We do not set prices, cannot quote your individual cost, and nothing here is medical or financial advice. Confirm current pricing directly with the service.",
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
  name: seoConfig.weightLossTelehealthCost.title,
  description: seoConfig.weightLossTelehealthCost.description,
  url: seoConfig.weightLossTelehealthCost.url,
  inLanguage: "en-AU",
  datePublished: "2026-07-05",
  dateModified: "2026-08-14",
  about: [
    { "@type": "Thing", name: "weight loss telehealth cost Australia" },
    { "@type": "Thing", name: "Moshy cost" },
    { "@type": "Thing", name: "online weight loss pricing Australia" },
    { "@type": "Thing", name: "weight loss subscription Australia" },
    { "@type": "Thing", name: "weight management cost Australia" },
  ],
  isPartOf: { "@id": `${SITE_URL}/#website` },
  author: SCHEMA_AUTHOR,
  publisher: SCHEMA_PUBLISHER,
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function WeightLossTelehealthCostAustraliaPage() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      <main className="text-[#14120f]">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">

          {/* Breadcrumb */}
          <nav className="flex flex-wrap items-center gap-2 pt-8 text-sm text-[#56504a]">
            <Link href="/" className="hover:text-[#14120f] transition-colors">Refer Labs</Link>
            <span>/</span>
            <Link href="/weight-loss" className="hover:text-[#14120f] transition-colors">Weight loss</Link>
            <span>/</span>
            <span className="text-[#14120f]">Telehealth cost</span>
          <SectionMark kind="scale" size={56} /></nav>

          {/* Hero */}
          <header className="pt-9 pb-6">
            <h1 className="mt-4 text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold leading-[1.08] tracking-tight text-[#14120f]">
              Weight-loss telehealth cost in Australia: how the pricing works
            </h1>
            <p className="mt-5 text-base sm:text-lg leading-relaxed text-[#56504a]">
              There is no single price, because services charge in two different ways. Some, such as Moshy, list one
              all-inclusive program fee covering treatment, support and delivery. Others charge a consultation fee and
              bill anything dispensed separately through a pharmacy. Compare the full monthly amount, multiplied by twelve. General information, not medical or financial advice.
            </p>
            <EditorialMeta lastUpdated="2026-09-30" className="mt-5" />
          </header>

          {/* Info-only note */}
          <div className="nw-card px-5 py-4 text-sm leading-relaxed text-[#56504a]">
            <span className="font-bold text-[#14120f]">Information only.</span> Nothing here is medical or financial advice.
            Prices vary between services, change over time, and are confirmed during your consult after a practitioner has assessed
            what is appropriate for you. This page contains a disclosed affiliate link to Moshy.
          </div>

          {/* First CTA */}
          <div className="mt-7 flex flex-col items-start gap-3 rounded-2xl border border-[#007a95]/25 bg-[#e4f2f5] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md text-[15px] leading-relaxed text-[#14120f]">
              Want the real number for your situation? Moshy&apos;s eligibility check is free to complete, and the applicable cost
              is confirmed to you inside the flow before you commit to anything.
            </p>
            <a
              href={MOSHY_URL}
              target="_blank"
              rel="nofollow sponsored"
              data-cta="cost-hero"
              className="nw-btn shrink-0 whitespace-nowrap"
            >
              Check your eligibility on Moshy <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <EarningsBalanceNote earnFrom="Moshy" className="mt-3 max-w-2xl" />

          {/* Body */}
          <article className="mt-10 space-y-9">

            <section>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#14120f]">
                The two ways services charge
              </h2>
              <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-[#56504a]">
                <p>
                  Before comparing prices, check which of these two models a service uses.
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="nw-card px-5 py-5">
                    <h3 className="text-lg font-bold text-[#14120f]">All-inclusive program</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#56504a]">
                      One monthly fee covering the practitioner assessment, follow-ups, support and, where appropriate, treatment and
                      delivery. Moshy lists its program this way.
                    </p>
                  </div>
                  <div className="nw-card px-5 py-5">
                    <h3 className="text-lg font-bold text-[#14120f]">Consult fee, dispensing separate</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#56504a]">
                      You pay for the consultation, and anything a practitioner decides is appropriate is dispensed and billed
                      separately by a pharmacy. Add both parts before comparing.
                    </p>
                  </div>
                </div>
                <p>
                  Compare the full monthly amount under each model, not the headline fee.
                </p>
                <p>
                  People often search for an exact Moshy price, and it is a fair thing to want. There is no
                  single fixed figure that applies to everyone. The total depends on what a practitioner assesses as appropriate for
                  your individual situation, and prices move over time.
                </p>
                <p>
                  The reliable number is the one shown to you inside the Moshy flow itself, after the assessment and before you pay.
                  That is by design: the cost is tied to what is suitable for you, not a one-size-fits-all sticker price. You
                  can read more about how the service runs end to end in our{" "}
                  <Link href="/moshy-review" className="nw-link">independent Moshy review</Link>, and see how Moshy sits against other
                  providers in our roundup of the{" "}
                  <Link href="/best-weight-loss-telehealth-australia" className="nw-link">best weight-loss telehealth in Australia</Link>.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#14120f]">
                What drives the price up or down
              </h2>
              <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-[#56504a]">
                <p>
                  A few factors shape what you end up paying, and understanding them helps you compare like with like:
                </p>
                <ul className="ml-1 space-y-3">
                  {[
                    ["Subscription versus one-off", "Medical telehealth usually runs as a recurring subscription that bundles ongoing practitioner support. A one-off consult with a GP is priced differently and may attract a Medicare rebate."],
                    ["Whether treatment is in the fee", "On an all-inclusive program, treatment decided by the practitioner is part of the fee. On a consult model, anything dispensed is billed separately by a pharmacy."],
                    ["What support is included", "Some services bundle coaching, check-ins and messaging into the fee. More support generally means a higher service price, which may or may not be worth it for you."],
                    ["Billing cycle and cancellation", "Monthly versus longer billing periods change the headline number. Always check how cancellation works before you commit, not after."],
                    ["Medicare and insurance", "Depending on your circumstances, a consult may attract a rebate, but subscriptions and medicines are typically not fully covered. Coverage is individual."],
                  ].map(([title, body]) => (
                    <li key={title} className="flex gap-3">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e4f2f5] text-xs font-bold text-[#00748e]">•</span>
                      <span><span className="font-semibold text-[#14120f]">{title}.</span> {body}</span>
                    </li>
                  ))}
                </ul>
                <p>
                  Whether any medicine forms part of your plan is decided by the practitioner during your assessment, and
                  our guide to{" "}
                  <Link href="/online-weight-loss-doctor-australia" className="nw-link">seeing an online weight-loss doctor</Link> explains that side
                  of the category. Remember that any medicine is prescription-only and only supplied after a practitioner assessment.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#14120f]">
                How to get an accurate cost for you
              </h2>
              <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-[#56504a]">
                <p>
                  The dependable way to find out what you would pay is to start the eligibility check with the service you are
                  considering. A practitioner assesses your situation, and the applicable cost is confirmed to you before you commit.
                  With Moshy, the eligibility check is free to complete, so you can see the process and the numbers that apply to you
                  without paying anything up front, and without being obligated to proceed. If you would rather understand the
                  practitioner side first, our guide to the{" "}
                  <Link href="/online-weight-loss-doctor-australia" className="nw-link">online weight-loss doctor process</Link> walks
                  through what a consult involves.
                </p>
              </div>
            </section>

            {/* Second CTA */}
            <section className="rounded-2xl border border-[#ded8cd] bg-[#f1ede4] px-6 py-6">
              <h2 className="text-lg font-bold text-[#14120f]">See the cost that applies to you</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-[#56504a]">
                Rather than guessing from a generic figure, complete Moshy&apos;s free eligibility check and the applicable cost is
                confirmed to you inside the flow, after a practitioner assessment and before you pay. About ten minutes, no obligation.
              </p>
              <a
                href={MOSHY_URL}
                target="_blank"
                rel="nofollow sponsored"
                data-cta="cost-footer"
                className="nw-btn mt-5"
              >
                Check your eligibility on Moshy <ArrowRight className="h-4 w-4" />
              </a>
            </section>

            <MatchPrompt />

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
                <li><Link href="/weight-loss-cost-calculator" className="nw-link">Try the cost planner: find your pathway in three questions</Link></li>
                <li><Link href="/moshy" className="nw-link">Moshy: the offer and how to start</Link></li>
                <li><Link href="/moshy-review" className="nw-link">Our independent Moshy review</Link></li>
                <li><Link href="/online-weight-loss-doctor-australia" className="nw-link">Seeing an online weight-loss doctor in Australia</Link></li>
                <li><Link href="/best-weight-loss-telehealth-australia" className="nw-link">Best weight-loss telehealth in Australia, compared</Link></li>
                <li><Link href="/cheapest-weight-loss-telehealth-australia" className="nw-link">The cheapest weight-loss telehealth routes</Link></li>
                <li><Link href="/moshy-vs-juniper" className="nw-link">Moshy vs Juniper, side by side</Link></li>
                <li><Link href="/weight-loss" className="nw-link">The full weight-loss hub</Link></li>
              </ul>
            </section>

            {/* Disclosure */}
            <section className="border-t border-[#ded8cd] pt-6 pb-16">
              <p className="text-xs leading-relaxed text-[#56504a]">
                This page is published by Refer Labs, an independent comparison publisher, and contains a disclosed affiliate link to
                Moshy, which means we may earn a commission if you sign up through our link. Commissions never change what we write.
                All content is for general information only and does not constitute medical or financial advice. Prices vary between
                services and change over time, and any prescription medicine in Australia is supplied only after individual assessment
                by a registered practitioner who decides suitability. Confirm current pricing directly with the service, and consult a
                qualified health professional before starting any treatment.
              </p>
            </section>
          </article>
        </div>
      </main>
      <StickyCta href={MOSHY_URL} product="Moshy weight-loss telehealth" label="Check eligibility" />
    </ConsumerShell>
  );
}
