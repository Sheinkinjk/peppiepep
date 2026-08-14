import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import { MOSHY_URL } from "@/lib/affiliate-links";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import StickyCta from "@/components/consumer/StickyCta";
import MatchPrompt from "@/components/consumer/MatchPrompt";

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
    a: "Pricing varies between services and changes over time, so there is no single fixed figure. Cost is usually made up of two parts: a consultation or subscription fee for the telehealth service, and the separate cost of any medicine that is dispensed. The exact amount is confirmed during your consult, once a practitioner has assessed what, if anything, is appropriate for you. This page is general information, not medical or financial advice.",
  },
  {
    q: "How much does Moshy cost?",
    a: "Moshy advertises its program from $229 a month on its own site, checked 14 August 2026. That is a starting figure rather than a quote: the total depends on the plan a practitioner considers appropriate for you, and it is confirmed inside Moshy's eligibility flow before you commit to anything. New customers get $120 off their first order through the link on this page, which Moshy states applies to eligible programs with a minimum three-month commitment. Prices change, so confirm the current figure on Moshy before you sign up.",
  },
  {
    q: "Is the medication included in the telehealth subscription?",
    a: "Usually not. Most Australian weight-loss telehealth services separate the two: you pay for the service, consult or subscription, and any medicine that is prescribed is billed separately by the pharmacy that dispenses it. This matters when you are comparing services, because a low headline service fee does not include medicine cost. Always read the full cost breakdown before signing up.",
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
    q: "How do I find out what it will actually cost me?",
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
  dateModified: "2026-07-05",
  about: [
    { "@type": "Thing", name: "weight loss telehealth cost Australia" },
    { "@type": "Thing", name: "Moshy cost" },
    { "@type": "Thing", name: "online weight loss pricing Australia" },
    { "@type": "Thing", name: "weight loss subscription Australia" },
    { "@type": "Thing", name: "GLP-1 cost Australia" },
  ],
  isPartOf: { "@type": "WebSite", name: "Refer Labs", url: SITE_URL },
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function WeightLossTelehealthCostAustraliaPage() {
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
            <Link href="/weight-loss" className="hover:text-[#10251b] transition-colors">Weight loss</Link>
            <span>/</span>
            <span className="text-[#10251b]">Telehealth cost</span>
          </nav>

          {/* Hero */}
          <header className="pt-9 pb-6">
            <h1 className="mt-4 text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold leading-[1.08] tracking-tight text-[#10251b]">
              Weight-loss telehealth cost in Australia: how the pricing actually works
            </h1>
            <p className="mt-5 text-base sm:text-lg leading-relaxed text-[#3d4b44]">
              &ldquo;How much does weight-loss telehealth cost?&rdquo; is one of the most common questions Australians ask before
              they start, and it depends on the plan you land on. This page breaks down the pricing model most online
              weight-management services use, why medicine is usually billed separately, and what actually drives the number, so you
              can compare services sensibly. It is general information, not medical or financial advice, and we do not quote a single
              guaranteed price because there isn&apos;t one.
            </p>
          </header>

          {/* Info-only note */}
          <div className="nw-card px-5 py-4 text-sm leading-relaxed text-[#3d4b44]">
            <span className="font-bold text-[#10251b]">Information only.</span> Nothing here is medical or financial advice.
            Prices vary between services, change over time, and are confirmed during your consult after a practitioner has assessed
            what is appropriate for you. This page contains a disclosed affiliate link to Moshy.
          </div>

          {/* First CTA */}
          <div className="mt-7 flex flex-col items-start gap-3 rounded-2xl border border-[#0a7c42]/25 bg-[#e8f5ee] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md text-[15px] leading-relaxed text-[#10251b]">
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

          {/* Body */}
          <article className="mt-10 space-y-9">

            <section>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#10251b]">
                The two parts of the cost
              </h2>
              <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-[#3d4b44]">
                <p>
                  The most useful thing to understand is that weight-loss telehealth pricing in Australia almost always splits into two
                  separate parts, and many people only notice the first one when they compare services.
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="nw-card px-5 py-5">
                    <h3 className="text-lg font-bold text-[#10251b]">The service fee</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#3d4b44]">
                      A consultation fee or an ongoing subscription that covers the practitioner assessment, follow-ups and ongoing
                      support. Medical telehealth is usually structured as a subscription because weight management is ongoing rather
                      than a single visit.
                    </p>
                  </div>
                  <div className="nw-card px-5 py-5">
                    <h3 className="text-lg font-bold text-[#10251b]">Any medicine, separately</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#3d4b44]">
                      If a practitioner assesses that a prescription medicine is appropriate, it is typically billed separately by the
                      pharmacy that dispenses it. This is not included in the headline service fee, so it is the part that is easiest
                      to overlook when comparing.
                    </p>
                  </div>
                </div>
                <p>
                  Because of this split, a low advertised service fee does not tell you the full story. When you compare two services,
                  you are really comparing the service fee plus any medicine cost together, and both can change over time.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#10251b]">
                Why there is no single &ldquo;Moshy cost&rdquo; we can print
              </h2>
              <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-[#3d4b44]">
                <p>
                  People often search for an exact Moshy price, and it is a fair thing to want. There is no
                  single fixed figure that applies to everyone. The total depends on what a practitioner assesses as appropriate for
                  your individual situation, and both service fees and medicine prices move over time. Any page confidently quoting one
                  guaranteed dollar figure is likely to be out of date, or to be presenting an assumption as a fact.
                </p>
                <p>
                  The reliable number is the one shown to you inside the Moshy flow itself, after the assessment and before you pay.
                  That is by design: the cost is tied to what is actually suitable for you, not a one-size-fits-all sticker price. You
                  can read more about how the service runs end to end in our{" "}
                  <Link href="/moshy-review" className="nw-link">independent Moshy review</Link>, and see how Moshy sits against other
                  providers in our roundup of the{" "}
                  <Link href="/best-weight-loss-telehealth-australia" className="nw-link">best weight-loss telehealth in Australia</Link>.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#10251b]">
                What drives the price up or down
              </h2>
              <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-[#3d4b44]">
                <p>
                  A few factors shape what you end up paying, and understanding them helps you compare like with like:
                </p>
                <ul className="ml-1 space-y-3">
                  {[
                    ["Subscription versus one-off", "Medical telehealth usually runs as a recurring subscription that bundles ongoing practitioner support. A one-off consult with a GP is priced differently and may attract a Medicare rebate."],
                    ["Whether a medicine is involved", "If a practitioner assesses that a prescription medicine is appropriate, that cost sits on top of the service fee. If it is not appropriate for you, that part does not apply."],
                    ["What support is included", "Some services bundle coaching, check-ins and messaging into the fee. More support generally means a higher service price, which may or may not be worth it for you."],
                    ["Billing cycle and cancellation", "Monthly versus longer billing periods change the headline number. Always check how cancellation works before you commit, not after."],
                    ["Medicare and insurance", "Depending on your circumstances, a consult may attract a rebate, but subscriptions and medicines are typically not fully covered. Coverage is individual."],
                  ].map(([title, body]) => (
                    <li key={title} className="flex gap-3">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e8f5ee] text-xs font-bold text-[#0a7c42]">•</span>
                      <span><span className="font-semibold text-[#10251b]">{title}.</span> {body}</span>
                    </li>
                  ))}
                </ul>
                <p>
                  If any medicine in your plan is an injectable, our page on{" "}
                  <Link href="/weight-loss-injections-australia" className="nw-link">weight-loss injections in Australia</Link> and our
                  guide to{" "}
                  <Link href="/glp-1-weight-loss-australia" className="nw-link">GLP-1 weight loss in Australia</Link> explain that side
                  of the category. Remember that any medicine is prescription-only and only supplied after a practitioner assessment.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#10251b]">
                How to get an accurate cost for you
              </h2>
              <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-[#3d4b44]">
                <p>
                  The dependable way to find out what you would actually pay is to start the eligibility check with the service you are
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
            <section className="rounded-2xl border border-[#e5e9e7] bg-[#eef1ec] px-6 py-6">
              <h2 className="text-lg font-bold text-[#10251b]">See the cost that applies to you</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-[#3d4b44]">
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
                <li><Link href="/weight-loss-cost-calculator" className="nw-link">Try the cost planner: find your pathway in three questions</Link></li>
                <li><Link href="/moshy" className="nw-link">Moshy: the offer and how to start</Link></li>
                <li><Link href="/moshy-review" className="nw-link">Our independent Moshy review</Link></li>
                <li><Link href="/weight-loss-injections-australia" className="nw-link">Weight-loss injections in Australia, explained</Link></li>
                <li><Link href="/glp-1-weight-loss-australia" className="nw-link">GLP-1 weight loss in Australia</Link></li>
                <li><Link href="/online-weight-loss-doctor-australia" className="nw-link">Seeing an online weight-loss doctor in Australia</Link></li>
                <li><Link href="/best-weight-loss-telehealth-australia" className="nw-link">Best weight-loss telehealth in Australia, compared</Link></li>
                <li><Link href="/weight-loss" className="nw-link">The full weight-loss hub</Link></li>
              </ul>
            </section>

            {/* Disclosure */}
            <section className="border-t border-[#e5e9e7] pt-6 pb-16">
              <p className="text-xs leading-relaxed text-[#9aa39c]">
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
