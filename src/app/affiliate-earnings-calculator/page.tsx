import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import Link from "next/link";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import NewsletterSignup from "@/components/consumer/NewsletterSignup";
import EarningsCalc from "./EarningsCalc";

import { pageDates } from "@/lib/page-dates";
export const metadata = generateSEOMetadata(seoConfig.affiliateEarningsCalculator);

const faqs = [
  {
    q: "How much can you realistically make from affiliate marketing?",
    a: "It depends on three multipliers: audience size, how much of that audience clicks offers (channel dependent, SEO and email beat social), and the commission per sale in your niche. Software and finance pay the most per sale; creator tools pay less but convert easily. The calculator on this page shows an illustrative range from those inputs. Plenty of affiliates earn nothing; the difference is usually programs matched to the audience, not effort.",
  },
  {
    q: "Are these numbers a guarantee?",
    a: "No. The output is an illustrative estimate computed from the visible assumptions (click-through, conversion and commission bands we model for each category). It is not a prediction or promise of income, real results vary widely and can be zero, and nothing on this page is financial advice.",
  },
  {
    q: "Which niche pays the most in affiliate marketing?",
    a: "Per sale, software/SaaS and finance typically pay the highest commissions, and many SaaS programs pay recurring monthly commissions for the life of the customer, which compounds. Health and wellness pays well in Australia but carries strict advertising rules. Creator tools pay less per sale but convert easily for creator audiences.",
  },
  {
    q: "How do I find programs that fit my audience?",
    a: "Start with our guide to the best affiliate programs in Australia, which sorts programs by category and payout. From there, the highest-paying and recurring-commission guides narrow it further. The filter that matters is whether your audience already wants the product: a lower rate on something they were going to buy anyway beats a high rate on something they do not need.",
  },
  {
    q: "Do I need a big audience to start?",
    a: "No, but you need a matched one. A small audience with strong intent (an email list or SEO traffic on buying keywords) regularly out-earns a large, cold social following, which the channel setting in the calculator reflects. Recurring-commission programs also let small audiences compound over time.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Affiliate programs Australia", item: `${SITE_URL}/affiliate-programs-australia` },
    { "@type": "ListItem", position: 3, name: "Earnings calculator", item: `${SITE_URL}/affiliate-earnings-calculator` },
  ],
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.affiliateEarningsCalculator.title,
  description: seoConfig.affiliateEarningsCalculator.description,
  url: seoConfig.affiliateEarningsCalculator.url,
  inLanguage: "en-AU",
  datePublished: "2026-07-07",
  dateModified: pageDates("/affiliate-earnings-calculator")?.updated ?? "2026-07-07",
  isPartOf: { "@id": `${SITE_URL}/#website` },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function AffiliateEarningsCalculatorPage() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main className="text-[#10251b]">
        <div className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-12">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 pt-8 text-sm text-[#3d4b44]">
            <Link href="/" className="hover:text-[#0a7c42] transition-colors">Refer Labs</Link>
            <span aria-hidden="true">/</span>
            <Link href="/affiliate-programs-australia" className="hover:text-[#0a7c42] transition-colors">Affiliate programs</Link>
            <span aria-hidden="true">/</span>
            <span className="text-[#2b362f]">Earnings calculator</span>
          </nav>

          <section className="pt-9 pb-7 sm:pt-11">
            <h1 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold leading-[1.08] tracking-tight text-[#10251b] mb-4 max-w-3xl">
              Affiliate earnings calculator: what could your audience make?
            </h1>
            <div className="text-[#3d4b44] text-sm sm:text-base leading-relaxed max-w-2xl mb-6 space-y-3">
              <p>
                Three inputs decide most affiliate income: how many people you reach, how many of them click,
                and what a sale pays in your niche. Set the three below and see a range, with every
                assumption on show.
              </p>
            </div>
          </section>

          <section className="pb-4">
            <EarningsCalc />
          </section>

          <section className="border-t border-[#e5e9e7] mt-8 py-9">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#10251b] mb-4">
              How to read the range
            </h2>
            <div className="space-y-4 text-[15px] leading-relaxed text-[#3d4b44] max-w-2xl">
              <p>
                The spread between the low and high number is where the outcome is actually decided. The low end
                assumes ordinary click-through, ordinary conversion and the cheaper end of your niche&apos;s
                commissions. The high end assumes everything is matched: offers your audience actually wants,
                placed where intent is highest. Same audience, several times the income.
              </p>
              <p>
                Matching is the lever you control. Our free{" "}
                <Link href="/affiliate-programs-australia" className="text-[#0a7c42] underline underline-offset-2">guide to the best affiliate programs in Australia</Link>{" "}
                sorts the options by category, and the{" "}
                <Link href="/recurring-affiliate-programs" className="text-[#0a7c42] underline underline-offset-2">recurring-commission programs</Link>{" "}
                are how small audiences compound.
              </p>
            </div>
          </section>

          <section className="border-t border-[#e5e9e7] py-9">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#10251b] mb-6">
              Frequently asked questions
            </h2>
            <div className="space-y-3">
              {faqs.map((f) => (
                <details key={f.q} className="group rounded-xl border border-[#e5e9e7] bg-[#f5f8f6] px-5 py-4">
                  <summary className="cursor-pointer list-none font-semibold text-[#10251b] text-sm sm:text-base flex items-center justify-between gap-4">
                    {f.q}
                    <span aria-hidden="true" className="text-[#9aa39c] group-open:rotate-45 transition-transform text-lg leading-none">+</span>
                  </summary>
                  <p className="text-[#3d4b44] text-sm leading-relaxed mt-3">{f.a}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="border-t border-[#e5e9e7] py-9">
            <NewsletterSignup variant="band" source="earnings-calculator" />
          </section>

          <section className="border-t border-[#e5e9e7] py-8 pb-16">
            <h2 className="text-sm font-bold text-[#10251b] mb-3">Keep going</h2>
            <div className="flex flex-wrap gap-3 mb-6">
              <Link href="/affiliate-programs-australia" className="nw-link text-sm">Best affiliate programs Australia</Link>
              <span className="text-[#9aa39c]">·</span>
              <Link href="/high-paying-affiliate-programs" className="nw-link text-sm">Highest-paying programs</Link>
              <span className="text-[#9aa39c]">·</span>
              <Link href="/how-to-start-affiliate-marketing-australia" className="nw-link text-sm">How to start from zero</Link>
            </div>
            <p className="text-[#9aa39c] text-xs leading-relaxed max-w-2xl">
              This calculator produces illustrative estimates from stated assumptions. It is not a prediction
              or promise of income, results vary widely and can be zero, and nothing on this page is financial
              advice.
            </p>
          </section>
        </div>
      </main>
    </ConsumerShell>
  );
}
