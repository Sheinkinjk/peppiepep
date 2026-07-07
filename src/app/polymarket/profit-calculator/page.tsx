import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import Link from "next/link";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import StickyCta from "@/components/consumer/StickyCta";
import RelatedGuides from "@/components/consumer/RelatedGuides";
import AffiliateDisclosure from "@/components/polymarket/AffiliateDisclosure";
import RiskDisclaimer from "@/components/polymarket/RiskDisclaimer";
import PolymarketCta from "@/components/polymarket/PolymarketCta";
import { polymarketRef } from "@/lib/polymarket";
import ProfitCalc from "./ProfitCalc";

export const metadata = generateSEOMetadata(seoConfig.polymarketProfitCalculator);

const faqs = [
  {
    q: "How do I calculate profit on Polymarket?",
    a: "Each share costs between $0.00 and $1.00 and pays exactly $1.00 if the outcome happens, or $0.00 if it does not. So your shares = stake divided by price, your payout if it resolves Yes = shares times $1, and your profit = payout minus stake. Buy at $0.40 and a winning share returns $1.00, a 150% gain; if it loses, you lose your stake.",
  },
  {
    q: "What does the share price mean?",
    a: "The price is the market's implied probability of the outcome. A share at $0.65 implies roughly a 65% chance. If your own estimate is higher than the price, you have positive 'edge' on paper, which is what the estimate slider shows.",
  },
  {
    q: "Does this include Polymarket's fees?",
    a: "No. Maker orders (resting limit orders) generally pay no fee, while taker orders (instant fills) pay a fee computed from a variable formula, so net profit on a taker fill is a little lower than shown. We don't estimate fees here rather than guess the formula; check current fees on Polymarket's official docs.",
  },
  {
    q: "What is 'edge' and why does it matter?",
    a: "Edge is the gap between your probability estimate and the market price. Positive edge is necessary to be profitable but not sufficient, because your estimate is itself uncertain and fees and adverse selection eat into returns. Edge has to be measured over many trades, not assumed from one.",
  },
  {
    q: "Is this financial advice?",
    a: "No. This calculator is arithmetic from the numbers you enter, not a prediction or recommendation. Trading prediction markets involves risk, including loss of your entire stake. Nothing here is financial advice.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Polymarket", item: `${SITE_URL}/polymarket` },
    { "@type": "ListItem", position: 3, name: "Profit calculator", item: `${SITE_URL}/polymarket/profit-calculator` },
  ],
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.polymarketProfitCalculator.title,
  description: seoConfig.polymarketProfitCalculator.description,
  url: seoConfig.polymarketProfitCalculator.url,
  inLanguage: "en-AU",
  datePublished: "2026-07-08",
  dateModified: "2026-07-08",
  isPartOf: { "@type": "WebSite", name: "Refer Labs", url: SITE_URL },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function ProfitCalculatorPage() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main className="text-[#10251b]">
        <div className="mx-auto max-w-3xl px-6 sm:px-8 lg:px-12">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 pt-8 text-sm text-[#3d4b44]">
            <Link href="/" className="hover:text-[#0a7c42] transition-colors">Refer Labs</Link>
            <span aria-hidden="true">/</span>
            <Link href="/polymarket" className="hover:text-[#0a7c42] transition-colors">Polymarket</Link>
            <span aria-hidden="true">/</span>
            <span className="text-[#2b362f]">Profit calculator</span>
          </nav>

          <section className="pt-9 pb-7 sm:pt-11">
            <p className="nw-kicker mb-5">Interactive tool · Prediction markets</p>
            <h1 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold leading-[1.08] tracking-tight text-[#10251b] mb-4 max-w-3xl">
              Polymarket profit calculator: payout, return &amp; edge
            </h1>
            <div className="text-[#3d4b44] text-sm sm:text-base leading-relaxed max-w-2xl mb-5 space-y-3">
              <p>
                Enter a stake and a share price to see exactly what a trade returns if it wins, what you lose if it
                does not, and, if you add your own probability estimate, whether you have any edge over the market.
              </p>
            </div>
            <AffiliateDisclosure />
          </section>

          <section className="pb-4">
            <ProfitCalc />
          </section>

          <section className="border-t border-[#e5e9e7] mt-8 py-9">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#10251b] mb-4">
              How to read the numbers
            </h2>
            <div className="space-y-4 text-[15px] leading-relaxed text-[#3d4b44] max-w-2xl">
              <p>
                The maths is simple: a winning share is worth $1, so a cheaper price means a bigger return but a lower
                implied probability. The harder part is the <strong className="text-[#10251b] font-semibold">edge</strong>{" "}
                figure. It only means something if your probability estimate is genuinely better than the crowd&apos;s,
                reliably, after fees. That is the whole subject of our guide to{" "}
                <Link href="/polymarket/optimising-edge" className="text-[#0a7c42] underline underline-offset-2">finding and measuring edge</Link>, and if you want to automate a strategy, the{" "}
                <Link href="/polymarket/trading-bots" className="text-[#0a7c42] underline underline-offset-2">trading-bot guide</Link>{" "}
                shows how. New to the mechanics? Start with{" "}
                <Link href="/polymarket/markets-explained" className="text-[#0a7c42] underline underline-offset-2">markets explained</Link>.
              </p>
            </div>
          </section>

          <section className="border-t border-[#e5e9e7] py-9">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#10251b] mb-6">Frequently asked questions</h2>
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

          <section className="border-t border-[#e5e9e7] py-10">
            <div className="rounded-2xl border px-6 py-7 text-center sm:px-8" style={{ borderColor: "#0a7c4230", background: "#0a7c4208" }}>
              <h2 className="text-lg sm:text-xl font-black text-[#10251b]">Ready to place a trade?</h2>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-[#3d4b44]">
                Create your account and put the numbers to work. Signing up through our link costs you nothing extra.
              </p>
              <div className="mt-5 flex justify-center">
                <PolymarketCta label="Sign up now" campaign="profit-calculator" location="closing" />
              </div>
            </div>
          </section>

          <RelatedGuides category="Prediction markets" currentHref="/polymarket/profit-calculator" limit={6} />

          <section className="border-t border-[#e5e9e7] py-8 pb-16 space-y-4">
            <RiskDisclaimer />
            <p className="text-[#9aa39c] text-xs leading-relaxed">
              This page is operated by Refer Labs and contains a disclosed affiliate referral link to Polymarket. We
              may earn a commission if you sign up through it, at no extra cost to you. The calculator is arithmetic
              from your inputs, not a prediction or financial advice. Our standards are at{" "}
              <Link href="/how-we-research" className="underline underline-offset-2">how we research</Link>.
            </p>
          </section>
        </div>
      </main>
      <StickyCta href={polymarketRef("profit-calculator")} product="Polymarket · prediction markets" label="Sign up now" />
    </ConsumerShell>
  );
}
