import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import StickyCta from "@/components/consumer/StickyCta";
import PolymarketCta from "@/components/polymarket/PolymarketCta";
import AffiliateDisclosure from "@/components/polymarket/AffiliateDisclosure";
import RiskDisclaimer from "@/components/polymarket/RiskDisclaimer";
import { polymarketRef } from "@/lib/polymarket";

export const metadata = generateSEOMetadata(seoConfig.polymarketHub);

const GREEN = "#0a7c42";
const CAMPAIGN = "hub";

const guides = [
  { href: "/polymarket/markets-explained", label: "Markets explained", desc: "How shares, the order book, fees and resolution actually work. Start here if you are new." },
  { href: "/polymarket/how-to-register", label: "How to register", desc: "The US and international sign-up paths, wallets, funding and requirements, step by step." },
  { href: "/polymarket/optimising-edge", label: "Finding your edge", desc: "Where a real trading advantage comes from, and how to measure whether you have one." },
  { href: "/polymarket/trading-bots", label: "Building a trading bot", desc: "Automate market making and arbitrage through the CLOB API, with the risk controls that matter." },
  { href: "/polymarket/profitable-trading-bots", label: "Profitable bot strategies", desc: "Four strategies where a bot can earn, sports, politics, market making and arbitrage, and the catch on each." },
  { href: "/polymarket/profit-calculator", label: "Profit calculator", desc: "Enter a stake and price to see payout, return, max loss and your edge before you trade." },
];

const steps = [
  { n: "1", h: "Check your eligibility", b: "You need to be 18 or older, and your location decides which platform you use. Some US states and some countries are restricted, so confirm yours first." },
  { n: "2", h: "Create your account", b: "On Polymarket US you sign up and complete KYC. Internationally you connect a wallet such as MetaMask or Coinbase, or buy USDC with a card via MoonPay." },
  { n: "3", h: "Fund and place your first trade", b: "Add US dollars or USDC, pick a market you have a view on, and buy Yes or No shares. Browsing the markets is free before you commit anything." },
];

const faqs = [
  {
    q: "What is Polymarket?",
    a: "Polymarket is a prediction-market platform where you trade on the outcome of real-world events, from elections and sports to crypto prices and economic data. Each outcome is a share priced between $0.00 and $1.00 that reads as its implied probability; winning shares pay $1.00 and losing shares pay nothing.",
  },
  {
    q: "How do I sign up for Polymarket?",
    a: "It depends on your location. Polymarket US is an app that requires KYC (ID, SSN and proof of US residency) and settles in US dollars. Polymarket International is crypto-native: you connect a wallet and trade in USDC on Polygon, or buy USDC with a card via MoonPay. Our registration guide walks through both paths.",
  },
  {
    q: "Do I need cryptocurrency to use Polymarket?",
    a: "Only for the international platform, which settles in USDC. Even then you can buy USDC with a card or bank transfer through MoonPay, so you do not need to already hold crypto. Polymarket US uses US dollars and no crypto at all.",
  },
  {
    q: "Is Polymarket available in my country or state?",
    a: "Polymarket US is available in roughly 40 or more states, though several have restrictions or bans, and internationally it is blocked in OFAC-sanctioned countries and some others. These lists change frequently, so confirm your own jurisdiction on Polymarket's official site before signing up. Using a VPN to bypass a geo-block violates the terms and can freeze an account.",
  },
  {
    q: "Are there fees to trade?",
    a: "Maker orders (resting limit orders) generally pay no fee, while taker orders (instant fills) pay a fee based on share count and price. Polymarket charges no deposit or withdrawal fees, though on-chain network fees can apply internationally. Some markets are fee-free.",
  },
  {
    q: "Is there a sign-up bonus?",
    a: "Any promotions vary over time and by platform and change frequently, so we do not quote a fixed offer. Check the current terms on Polymarket's official site rather than relying on a figure quoted elsewhere. Signing up through our referral link costs you nothing extra.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Polymarket", item: `${SITE_URL}/polymarket` },
  ],
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.polymarketHub.title,
  description: seoConfig.polymarketHub.description,
  url: seoConfig.polymarketHub.url,
  inLanguage: "en-AU",
  datePublished: "2026-07-07",
  dateModified: "2026-07-07",
  isPartOf: { "@type": "WebSite", name: "Refer Labs", url: SITE_URL },
  about: [
    { "@type": "Thing", name: "Polymarket" },
    { "@type": "Thing", name: "prediction markets" },
    { "@type": "Thing", name: "how to sign up for Polymarket" },
  ],
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Polymarket guides",
  itemListElement: guides.map((g, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: g.label,
    url: `${SITE_URL}${g.href}`,
  })),
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function PolymarketHubPage() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main className="text-[#10251b]">
        <div className="mx-auto max-w-3xl px-6 sm:px-8 lg:px-12">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 pt-8 text-sm text-[#3d4b44]">
            <Link href="/" className="hover:text-[#0a7c42] transition-colors">Refer Labs</Link>
            <span aria-hidden="true">/</span>
            <span className="text-[#2b362f]">Polymarket</span>
          </nav>

          {/* Hero */}
          <section className="pt-9 pb-7 sm:pt-11">
            <p className="nw-kicker mb-5">Prediction markets</p>
            <h1 className="text-3xl sm:text-4xl lg:text-[2.7rem] font-extrabold leading-[1.07] tracking-tight text-[#10251b] mb-4 max-w-3xl">
              Polymarket: how to sign up and trade prediction markets
            </h1>
            <div className="text-[#3d4b44] text-sm sm:text-base leading-relaxed max-w-2xl mb-5 space-y-3">
              <p>
                Polymarket is the largest prediction market of its kind. You trade on the outcome of real-world
                events, elections, sports, crypto prices, the economy, by buying shares that track how likely
                each outcome is. If a share costs $0.63, the market is pricing roughly a 63% chance.
              </p>
              <p>
                This is your starting point: what Polymarket is, how to get on it, and how people actually trade
                it. You can sign up in minutes, and browsing the markets is free before you commit a cent.
              </p>
            </div>
            <AffiliateDisclosure />
            <div className="mt-6">
              <PolymarketCta label="Sign up now" campaign={CAMPAIGN} location="hero" />
            </div>
          </section>

          {/* What it is */}
          <section className="border-t border-[#e5e9e7] py-9">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#10251b] mb-4">
              What Polymarket is, in plain terms
            </h2>
            <div className="space-y-4 text-[15px] leading-relaxed text-[#3d4b44] max-w-2xl">
              <p>
                Every question becomes a set of shares priced between $0.00 and $1.00. You buy{" "}
                <strong className="text-[#10251b] font-semibold">Yes</strong> if you think an outcome is more
                likely than the price implies, or <strong className="text-[#10251b] font-semibold">No</strong>{" "}
                if you think it is less likely. When the event resolves, winning shares are worth $1.00 and
                losing shares are worth nothing. You can also sell at any time before then as prices move.
              </p>
              <p>
                There are now two platforms.{" "}
                <strong className="text-[#10251b] font-semibold">Polymarket US</strong> is CFTC-regulated,
                settles in US dollars, and requires identity verification.{" "}
                <strong className="text-[#10251b] font-semibold">Polymarket International</strong> is
                crypto-native and settles in USDC on the Polygon network, with onboarding by connecting a
                wallet. Which one you use comes down to where you are. For the full mechanics, read{" "}
                <Link href="/polymarket/markets-explained" className="text-[#0a7c42] underline underline-offset-2">markets explained</Link>.
              </p>
            </div>
          </section>

          {/* 3 steps */}
          <section className="border-t border-[#e5e9e7] py-9">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#10251b] mb-6">
              Get started in three steps
            </h2>
            <ol className="space-y-5">
              {steps.map((s) => (
                <li key={s.n} className="flex gap-4">
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white"
                    style={{ background: GREEN }}
                    aria-hidden="true"
                  >
                    {s.n}
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-[#10251b] mb-1">{s.h}</h3>
                    <p className="text-[15px] leading-relaxed text-[#3d4b44] max-w-xl">{s.b}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-7 rounded-2xl border px-6 py-5 sm:flex sm:items-center sm:justify-between sm:gap-6" style={{ borderColor: `${GREEN}25`, background: `${GREEN}0A` }}>
              <p className="max-w-md text-sm leading-relaxed text-[#10251b] mb-4 sm:mb-0">
                Ready to go? Create your account now, or read the full{" "}
                <Link href="/polymarket/how-to-register" className="text-[#0a7c42] underline underline-offset-2">registration guide</Link>{" "}
                for the details of each path.
              </p>
              <PolymarketCta label="Sign up now" campaign={CAMPAIGN} location="mid-steps" note={false} className="shrink-0" />
            </div>
          </section>

          {/* Guide cluster */}
          <section className="border-t border-[#e5e9e7] py-9">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#10251b] mb-2">
              The full Polymarket guides
            </h2>
            <p className="text-[15px] leading-relaxed text-[#3d4b44] max-w-2xl mb-6">
              Four in-depth guides, from your first trade to running an automated strategy. Read them in any
              order.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {guides.map((g) => (
                <Link
                  key={g.href}
                  href={g.href}
                  className="group rounded-xl border border-[#e5e9e7] bg-[#f5f8f6] p-5 transition-all hover:-translate-y-0.5 hover:border-[#0a7c42]/40"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-[15px] font-bold text-[#10251b] group-hover:text-[#0a7c42]">{g.label}</h3>
                    <ArrowRight className="h-4 w-4 text-[#0a7c42] transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#3d4b44]">{g.desc}</p>
                </Link>
              ))}
            </div>
          </section>

          {/* What you can trade */}
          <section className="border-t border-[#e5e9e7] py-9">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#10251b] mb-4">
              What you can trade
            </h2>
            <div className="space-y-4 text-[15px] leading-relaxed text-[#3d4b44] max-w-2xl">
              <p>
                Polymarket spans <strong className="text-[#10251b] font-semibold">politics, sports, crypto,
                economics, and geopolitics and world events</strong>. The same account can price an election,
                a token&apos;s year-end level, an interest-rate decision, and a championship.
              </p>
              <p>
                One practical note: the US app&apos;s market list is not identical to the international
                site&apos;s, so which markets you can access depends on the platform you are eligible for. It
                is worth checking both when you plan what you want to trade.
              </p>
            </div>
          </section>

          {/* FAQ */}
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

          {/* Closing CTA */}
          <section className="border-t border-[#e5e9e7] py-10">
            <div className="rounded-2xl border px-6 py-7 text-center sm:px-8" style={{ borderColor: `${GREEN}30`, background: `${GREEN}08` }}>
              <h2 className="text-lg sm:text-xl font-black text-[#10251b]">Ready to start trading?</h2>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-[#3d4b44]">
                Create your account in minutes and place your first trade today. Signing up through our link
                costs you nothing extra.
              </p>
              <div className="mt-5 flex justify-center">
                <PolymarketCta label="Sign up now" campaign={CAMPAIGN} location="closing" />
              </div>
            </div>
          </section>

          {/* Disclosures */}
          <section className="border-t border-[#e5e9e7] py-8 pb-16 space-y-4">
            <RiskDisclaimer />
            <p className="text-[#9aa39c] text-xs leading-relaxed">
              This page is operated by Refer Labs and contains a disclosed affiliate referral link to
              Polymarket. We may earn a commission if you sign up through it, at no extra cost to you. Referral
              rewards, fees, and country or US-state availability are set by Polymarket, change frequently, and
              are described here as current at the time of writing; always confirm the current terms on
              Polymarket&apos;s official documentation. Our full standards are at{" "}
              <Link href="/how-we-research" className="underline underline-offset-2">how we research</Link>.
            </p>
          </section>
        </div>
      </main>

      <StickyCta href={polymarketRef(CAMPAIGN)} product="Polymarket · prediction markets" label="Sign up now" />
    </ConsumerShell>
  );
}
