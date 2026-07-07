import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";
import Link from "next/link";
import GuideLayout, { type GuideSection, type GuideFaq, type GuideRelated } from "@/components/polymarket/GuideLayout";
import PolymarketCta from "@/components/polymarket/PolymarketCta";

export const metadata = generateSEOMetadata(seoConfig.polymarketEdge);

const CAMPAIGN = "optimising-edge";

const sections: GuideSection[] = [
  {
    id: "what-is-edge",
    h2: "What “edge” actually means",
    body: (
      <>
        <p>
          Edge is the gap between <strong>your estimate of a probability and the price the market is
          charging</strong>. If you believe an outcome is a 60% chance and the Yes share is trading at $0.50,
          you have a 10-point edge, on paper. Every profitable strategy, from research to arbitrage, is a
          different way of finding and capturing that gap.
        </p>
        <p>
          The catch is that the market price already reflects a lot of collective information. So the real
          question is not &ldquo;do I have a view?&rdquo; but <strong>&ldquo;is my view better than the
          crowd&apos;s, reliably, after costs?&rdquo;</strong> Most of this guide is about answering that
          honestly. If share prices and the order book are still fuzzy, start with{" "}
          <Link href="/polymarket/markets-explained">markets explained</Link>.
        </p>
      </>
    ),
  },
  {
    id: "sources",
    h2: "Where real edge comes from",
    body: (
      <>
        <p>There are a handful of genuine, repeatable sources of edge:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Information / research edge</strong>: you know a domain (a sport, a region, a data series) well enough to price specific markets better than the crowd.</li>
          <li><strong>Speed</strong>: you react to a result or headline before the book fully reprices.</li>
          <li><strong>Maker rebates and liquidity rewards</strong>: a <em>subsidised</em> edge: makers generally pay no fee and can earn a share of daily reward pools, which can turn a break-even quoting strategy into a positive one.</li>
          <li><strong>Cross-market and cross-venue arbitrage</strong>: price gaps between correlated markets, or between Polymarket and another venue such as Kalshi, where the same event is priced differently.</li>
          <li><strong>Correlation and hedging</strong>: combining related positions to lock in a mispricing or reduce variance.</li>
        </ul>
        <p>
          The reward-driven and arbitrage sources are the most systematic, which is exactly why traders{" "}
          <Link href="/polymarket/trading-bots">automate them with bots</Link>.
        </p>
        <div className="not-prose my-6">
          <PolymarketCta label="Put your edge to work, open a Polymarket account" campaign={CAMPAIGN} location="mid-sources" />
        </div>
      </>
    ),
  },
  {
    id: "fees",
    h2: "Fees are the drag on every edge",
    body: (
      <>
        <p>
          A paper edge only becomes profit after costs. On Polymarket, <strong>taker orders pay a fee</strong>{" "}
          computed from a formula based on share count and price, so crossing the spread repeatedly quietly
          erodes returns. <strong>Maker orders generally pay no fee</strong>, which is the structural advantage
          behind most systematic strategies here: quote, don&apos;t cross.
        </p>
        <p>
          There is a subtlety that cuts the other way. Because <strong>not all markets charge fees</strong>,
          some fee-free markets pay makers no rebates and generate no referral rewards. So a market&apos;s fee
          structure is part of your edge calculation, not a footnote: the fee-bearing, actively-traded markets
          are where maker rewards actually accrue.
        </p>
      </>
    ),
  },
  {
    id: "measuring",
    h2: "Measuring realised edge",
    body: (
      <>
        <p>
          The difference between traders who last and traders who blow up is that the first group{" "}
          <strong>measures</strong> edge instead of assuming it. The core tool is{" "}
          <strong>markout analysis</strong>: for each fill, compare your execution price to the market&apos;s
          fair value a short time later (say, seconds or minutes on). If prices consistently move against you
          right after you get filled, you are being <strong>adversely selected</strong>, informed traders are
          taking the other side of your quotes.
        </p>
        <p>
          Track fills against fair value over hundreds of trades, not a handful. A strategy can look great for
          a day on variance alone. Only a decent sample tells you whether the spread and rewards you earn
          actually exceed the adverse selection you pay. This is also where a bot&apos;s{" "}
          <Link href="/polymarket/trading-bots">detailed logging</Link> pays off.
        </p>
      </>
    ),
  },
  {
    id: "sizing",
    h2: "Bankroll and sizing",
    body: (
      <>
        <p>
          Even a genuine edge can ruin you if you size it wrong. Prediction-market payoffs are high-variance:
          a share is worth $1 or $0, and losing streaks are normal. The standard framework is{" "}
          <strong>fractional Kelly</strong> sizing, betting a fraction of what full Kelly would suggest, which
          trades a little growth for much lower <strong>risk of ruin</strong> and a smoother equity curve.
        </p>
        <p>
          Practical rules that follow from this: never stake money you cannot lose, cap the fraction of your
          bankroll in any single market, and remember that your edge estimate is itself uncertain, so size as
          if it is smaller than you think. Variance, not the occasional bad call, is what ends most accounts.
        </p>
      </>
    ),
  },
  {
    id: "honest",
    h2: "The honest part: most edges aren’t real",
    body: (
      <>
        <p>
          Here is the section most guides skip. <strong>Most naive and systematic strategies show no proven
          edge after costs.</strong> Spread income gets handed back through adverse selection; a backtest that
          ignored fees falls apart live; a research view that felt sharp was already in the price. This is the
          default outcome, not the exception.
        </p>
        <p>
          The way to trade anyway, responsibly, is to treat every strategy as a hypothesis. Decide your test
          in advance: how many trades, what markout result would count as a real edge, and the{" "}
          <strong>kill condition</strong> that stops you if it does not show up. Only size up once the data,
          not the story, supports it. If you automate, bake those pre-committed limits into the bot&apos;s{" "}
          <Link href="/polymarket/trading-bots">risk controls</Link> so discipline is enforced by code, not
          willpower.
        </p>
      </>
    ),
  },
];

const faqs: GuideFaq[] = [
  {
    q: "What does “edge” mean on a prediction market?",
    a: "Edge is the gap between your probability estimate and the market price. If you think an outcome is 60% likely and the Yes share trades at $0.50, you have a 10-point paper edge. It only becomes profit if your estimate is genuinely better than the crowd's, reliably, after fees.",
  },
  {
    q: "What are the most reliable sources of edge on Polymarket?",
    a: "The most systematic are maker rebates plus liquidity rewards (a subsidised edge), and cross-market or cross-venue arbitrage, including price gaps versus a venue like Kalshi. Research edge and speed also work if you genuinely know a domain or can react faster than the book reprices.",
  },
  {
    q: "How do I know if my strategy actually has an edge?",
    a: "Measure it with markout analysis: compare each fill to the market's fair value shortly after, across a large sample of trades. If prices consistently move against you right after you're filled, you're being adversely selected and the apparent edge isn't real. A day of good results is usually just variance.",
  },
  {
    q: "How should I size my positions?",
    a: "Use fractional Kelly sizing to cut the risk of ruin, cap how much of your bankroll sits in any single market, and size as if your edge is smaller than you estimate, because it's uncertain. Prediction-market payoffs are high-variance, so conservative sizing is what keeps you in the game.",
  },
  {
    q: "Why do most strategies fail after fees?",
    a: "Taker fees erode returns on every crossing trade, and spread income earned as a maker often gets handed back to better-informed traders through adverse selection. Backtests that ignore fees and adverse selection look profitable but don't survive live. Treat each strategy as a hypothesis with a pre-set kill condition.",
  },
];

const related: GuideRelated[] = [
  { href: "/polymarket/trading-bots", label: "Building a trading bot", desc: "Automate maker strategies and arbitrage, with logging to measure edge." },
  { href: "/polymarket/profitable-trading-bots", label: "Profitable bot strategies", desc: "The four strategies where a bot edge tends to show up, and the catch on each." },
  { href: "/polymarket/how-to-register", label: "Getting registered", desc: "Set up and fund the account you'll put your edge to work on." },
];

export default function OptimisingEdgePage() {
  return (
    <GuideLayout
      slug="polymarket/optimising-edge"
      campaign={CAMPAIGN}
      articleType="Article"
      breadcrumbLabel="Optimising edge"
      kicker="Guide · Strategy"
      h1="How to find and measure edge on Polymarket"
      description={seoConfig.polymarketEdge.description}
      heroCtaLabel="Put your edge to work, open a Polymarket account"
      intro={
        <>
          <p>
            Participating in a market is easy; being profitable is not. This guide is for traders who want a
            real, measurable advantage, not just a seat at the table, and who would rather know the honest odds
            than be sold a system.
          </p>
          <p>
            We cover what edge really is, where it genuinely comes from, how fees and adverse selection eat into
            it, how to measure whether you actually have it, and how to size so variance does not end your run.
          </p>
        </>
      }
      sections={sections}
      faqs={faqs}
      related={related}
      closing={{
        heading: "Test a real edge, carefully",
        body: "Open an account, start small, and let markout data, not a good story, decide when to size up. Signing up through our link costs you nothing extra.",
        ctaLabel: "Open a Polymarket account",
      }}
    />
  );
}
