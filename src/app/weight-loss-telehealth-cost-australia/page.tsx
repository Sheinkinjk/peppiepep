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
import { MOSHY_TERMS_URL } from "@/lib/offers";
import TermsApplyLink, { OfferTermsNote } from "@/components/consumer/TermsApplyLink";
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
    a: "Online weight-management services charge a monthly program fee for consultations, follow-ups and support, and each publishes what its fee covers on its own pricing page. A GP consultation is partly offset by Medicare. Fees vary between services and change over time, so there is no single fixed figure. This page is general information, not medical or financial advice.",
  },
  {
    q: "How much does Moshy cost?",
    a: "Moshy publishes its program price on its own site and describes it as one all-inclusive program fee (read on getmoshy.com.au, 30 September 2026). New customers get $120 off their first order with the code REFERRAL120 at checkout, one use per new customer, with a 3-month minimum commitment under Moshy's terms.",
  },
  {
    q: "What does a program fee cover?",
    a: "It depends on the service. Look for consultations, follow-ups, practitioner support, coaching, meal plans and any minimum term. Moshy lists one all-inclusive program fee; a pay-per-consultation service charges for each appointment. Read each provider's own pricing page so you compare the full amount.",
  },
  {
    q: "Is weight-loss telehealth covered by Medicare?",
    a: "Coverage depends on your individual circumstances and the specific service. Some telehealth consultations may attract a Medicare rebate in certain situations, but online program fees are typically not covered. Private health insurance coverage varies by policy. Check with the service and your insurer for current details. This is general information, not financial advice.",
  },
  {
    q: "Why can't you give me an exact price?",
    a: "Because there isn't one fixed price that applies to everyone. The total depends on the service, the program and support level you choose, and any minimum term, and fees change over time. Any page quoting a single guaranteed figure would likely be out of date or misleading. The reliable number is the one each service publishes on its own pricing page and shows you before you pay.",
  },
  {
    q: "Are there ongoing or subscription costs?",
    a: "Weight management is generally ongoing rather than a one-off, so most online services run on a monthly program fee that includes practitioner support and follow-ups. Before committing, check the billing cycle, any minimum term, what the fee covers, and how cancellation works.",
  },
  {
    q: "How do I find out what it will cost me?",
    a: "Read the pricing page of the service you are considering: each publishes its program fee and what it covers on its own site, and shows the amount before you pay. Check any minimum term, including the 3-month minimum that comes with Moshy's REFERRAL120 offer.",
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
  dateModified: "2026-10-01",
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
              Online weight-management services charge a monthly program fee for consultations, follow-ups and support,
              and each publishes what its fee covers on its own pricing page. A GP consultation is partly offset by
              Medicare. Compare the full monthly amount, multiplied by twelve, and any minimum term. General
              information, not medical or financial advice.
            </p>
            <EditorialMeta lastUpdated="2026-10-01" className="mt-5" />
          </header>

          {/* Info-only note */}
          <div className="nw-card px-5 py-4 text-sm leading-relaxed text-[#56504a]">
            <span className="font-bold text-[#14120f]">Information only.</span> Nothing here is medical or financial advice.
            Fees vary between services and change over time; each service shows its price before you pay. This page
            contains a disclosed affiliate link to Moshy.
          </div>

          {/* First CTA */}
          <div className="mt-7 flex flex-col items-start gap-3 rounded-2xl border border-[#007a95]/25 bg-[#e4f2f5] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md text-[15px] leading-relaxed text-[#14120f]">
              Moshy publishes one all-inclusive program fee on its own site, and shows the amount before you pay.
            </p>
            <a
              href={MOSHY_URL}
              target="_blank"
              rel="nofollow sponsored"
              data-cta="cost-hero"
              className="nw-btn shrink-0 whitespace-nowrap"
            >
              Continue to Moshy <ArrowRight className="h-4 w-4" />
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
                      One monthly fee covering consultations, follow-ups, practitioner support and extras such as coaching
                      and meal plans. Moshy lists its program this way.
                    </p>
                  </div>
                  <div className="nw-card px-5 py-5">
                    <h3 className="text-lg font-bold text-[#14120f]">Pay per consultation</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#56504a]">
                      You pay for each consultation as you go, with no program fee. A GP consultation is partly offset by
                      Medicare.
                    </p>
                  </div>
                </div>
                <p>
                  Compare the full monthly amount under each model, not the headline fee, and check any minimum term.
                </p>
                <p>
                  People often search for an exact Moshy price. Moshy publishes its program fee on its own site, and
                  prices move over time, so that page is the one to read.
                </p>
                <p>
                  You can read more about how the service runs end to end in our{" "}
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
                    ["Program fee versus one-off", "Online services usually run as a monthly program fee that bundles ongoing practitioner support. A one-off consult with a GP is priced differently and may attract a Medicare rebate."],
                    ["What support is included", "Some services bundle coaching, check-ins, meal plans and messaging into the fee. More support generally means a higher fee, which may or may not be worth it for you."],
                    ["Minimum term", "Some offers and plans carry a minimum commitment. Moshy's REFERRAL120 offer, for example, carries a 3-month minimum."],
                    ["Billing cycle and cancellation", "Monthly versus longer billing periods change the headline number. Always check how cancellation works before you commit, not after."],
                    ["Medicare and insurance", "Depending on your circumstances, a consult may attract a rebate, but online program fees are typically not covered. Coverage is individual."],
                  ].map(([title, body]) => (
                    <li key={title} className="flex gap-3">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e4f2f5] text-xs font-bold text-[#00748e]">•</span>
                      <span><span className="font-semibold text-[#14120f]">{title}.</span> {body}</span>
                    </li>
                  ))}
                </ul>
                <p>
                  Our{" "}
                  <Link href="/weight-loss" className="nw-link">weight loss navigator</Link> explains how the online consultation
                  works.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#14120f]">
                How to get an accurate cost for you
              </h2>
              <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-[#56504a]">
                <p>
                  The dependable way to find out what you would pay is the pricing page of the service you are
                  considering: each publishes its program fee and what it covers, and shows the amount before you pay.
                  If you would rather understand the consultation first, our{" "}
                  <Link href="/weight-loss" className="nw-link">weight loss navigator</Link> walks through what it involves.
                </p>
              </div>
            </section>

            {/* Second CTA */}
            <section className="rounded-2xl border border-[#ded8cd] bg-[#f1ede4] px-6 py-6">
              <h2 className="text-lg font-bold text-[#14120f]">See Moshy&apos;s current fee</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-[#56504a]">
                Continue to Moshy. REFERRAL120 takes $120 off a new customer&apos;s first order and carries a 3-month
                minimum commitment. <TermsApplyLink href={MOSHY_TERMS_URL} />
              </p>
              <a
                href={MOSHY_URL}
                target="_blank"
                rel="nofollow sponsored"
                data-cta="cost-footer"
                className="nw-btn mt-5"
              >
                Continue to Moshy <ArrowRight className="h-4 w-4" />
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
              {/* The full offer terms; beside the code there is only "T&Cs apply" (1 Oct 2026). */}
              <OfferTermsNote brand="Moshy" className="mt-5" />
            </section>

            {/* Related */}
            <section>
              <h2 className="text-lg font-bold text-[#14120f]">Keep reading</h2>
              <ul className="mt-3 space-y-2 text-[15px]">
                <li><Link href="/weight-loss-cost-calculator" className="nw-link">Try the cost planner: compare fee models in three questions</Link></li>
                <li><Link href="/moshy" className="nw-link">Moshy: the offer and how to start</Link></li>
                <li><Link href="/moshy-review" className="nw-link">Our independent Moshy review</Link></li>
                <li><Link href="/weight-loss" className="nw-link">Weight loss navigator: how online consultations work</Link></li>
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
                services and change over time. Any treatment is decided by a registered practitioner after an individual
                assessment. Confirm current pricing directly with the service, and consult a
                qualified health professional before starting any treatment.
              </p>
            </section>
          </article>
        </div>
      </main>
      <StickyCta href={MOSHY_URL} product="Moshy weight-loss telehealth" label="Get started" />
    </ConsumerShell>
  );
}
