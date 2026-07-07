import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";
import Link from "next/link";
import GuideLayout, { type GuideSection, type GuideFaq, type GuideRelated } from "@/components/polymarket/GuideLayout";
import PolymarketCta from "@/components/polymarket/PolymarketCta";

export const metadata = generateSEOMetadata(seoConfig.polymarketProfitableBots);

const CAMPAIGN = "profitable-trading-bots";

const sections: GuideSection[] = [
  {
    id: "what-makes-it-profitable",
    h2: "What actually makes a bot profitable",
    body: (
      <>
        <p>
          A bot does not invent an edge. It executes one faster, cheaper and more consistently than a person
          can. On Polymarket, profit comes down to a simple equation: the <strong>edge you capture</strong>,
          plus <strong>liquidity rewards</strong>, minus <strong>fees</strong> and{" "}
          <strong>adverse selection</strong>. The four strategies below are the places that equation most often
          turns positive.
        </p>
        <p>
          None of them is a money printer, and anyone who tells you otherwise is selling something. Each is a
          real approach with a real catch. The versions that last are the ones where the operator{" "}
          <Link href="/polymarket/optimising-edge">measures the edge</Link> instead of assuming it, and builds
          the strategy on a proper bot with hard risk controls.
        </p>
      </>
    ),
  },
  {
    id: "sports-edge",
    h2: "Strategy 1: Sports edge, models and speed",
    body: (
      <>
        <p>
          Sports markets, game outcomes, tournaments and player props, reward two things a bot does well.
          The first is a <strong>better probability model</strong>: if you can price a match more accurately
          than the market, the gap is your edge, and a bot can act on it across dozens of markets at once. The
          second is <strong>speed</strong>. When a goal goes in, a player is subbed off, or a starting lineup
          drops, the fair price moves instantly, and a bot that reprices before the book catches up captures
          that move.
        </p>
        <p>
          Sports markets are also often <strong>thinner than politics</strong>, so a market-making bot can
          earn wider spreads for providing liquidity where there is less of it.
        </p>
        <p>
          <strong>The catch:</strong> your competition is sharp sports bettors with their own models and data
          feeds. Edge here comes from a genuinely better model or faster, cleaner data, not a hunch. Backtest
          against real closing prices before you trust it with size.
        </p>
      </>
    ),
  },
  {
    id: "politics-edge",
    h2: "Strategy 2: Politics edge, correlation and news",
    body: (
      <>
        <p>
          Politics is Polymarket&apos;s deepest category, which cuts both ways. It is liquid and heavily
          traded, so fees and rewards are meaningful, but it is also efficient, with a lot of informed money
          already in the price. Three edges suit a bot here:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Model-driven pricing:</strong> translate aggregated polling and fundamentals into probabilities faster and more consistently than the crowd.</li>
          <li><strong>News reaction:</strong> trade a debate result, a court ruling or a data release the instant it lands, before the book fully reprices.</li>
          <li><strong>Correlation:</strong> related markets must stay consistent. A candidate&apos;s national market and the sum of their state markets should line up, and when they drift apart there is a trade in the gap.</li>
        </ul>
        <p>
          <strong>The catch:</strong> efficient markets punish naive directional views. &ldquo;I think this
          candidate wins&rdquo; is already in the price. The durable angles are speed and internal
          consistency, not opinion.
        </p>
      </>
    ),
  },
  {
    id: "market-making",
    h2: "Strategy 3: Market making, spread plus rewards",
    body: (
      <>
        <p>
          This is the most systematic bot strategy, and the one Polymarket actively subsidises. You post
          competitive limit orders on <strong>both sides</strong> of a market and earn the spread when both
          fill, plus a share of the <strong>Liquidity Rewards Program</strong>, paid daily around midnight UTC,
          for posting the two-sided quotes that tighten spreads. In liquid, fee-bearing markets that reward can
          turn a break-even quoting strategy into a positive one.
        </p>
        <p>
          The bot&apos;s job is to quote around fair value, skew its quotes as it accumulates inventory, and
          requote on fills. That loop, and the risk controls around it, is exactly what our{" "}
          <Link href="/polymarket/trading-bots">guide to building a trading bot</Link> walks through.
        </p>
        <p>
          <strong>The catch:</strong> adverse selection. Informed traders pick off stale quotes right before
          the price moves, and naive market making bleeds its spread straight back to them. Tight inventory
          limits, fast requoting and choosing the right markets are what keep it profitable.
        </p>
        <div className="not-prose my-6">
          <PolymarketCta label="You need a funded account to quote a market, sign up now" campaign={CAMPAIGN} location="mid-market-making" />
        </div>
      </>
    ),
  },
  {
    id: "mispriced-opportunities",
    h2: "Strategy 4: Mispriced opportunities, arbitrage and dislocations",
    body: (
      <>
        <p>
          Sometimes the same information is priced two different ways, and a bot that scans continuously can
          capture the gap where a human never could. Three forms show up most:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Internal inconsistency:</strong> in a categorical market the outcomes should sum to about $1, and a Yes share plus its matching No should too. When they do not, there is a trade.</li>
          <li><strong>Cross-venue gaps:</strong> the same event can trade at a different price on Polymarket than on another book such as Kalshi.</li>
          <li><strong>Post-news dislocations:</strong> right after a result, one market updates before a correlated one does, and the lag is the opportunity.</li>
        </ul>
        <p>
          <strong>The catch:</strong> genuinely riskless arbitrage is rare and fiercely contested. Most
          &ldquo;mispricings&rdquo; carry some risk: resolution wording that differs between venues, fees that
          erase a thin edge, or the gap closing before you fill. Always net out fees and read the resolution
          terms before you call something free money.
        </p>
      </>
    ),
  },
  {
    id: "run-it",
    h2: "Turning a strategy into a live bot",
    body: (
      <>
        <p>
          A strategy is only worth as much as your ability to run it safely. Whichever of these four you
          pursue, the path is the same: build it on the <strong>CLOB API</strong>, wrap it in hard risk
          controls, a max position, inventory caps, a drawdown limit and a kill switch, and{" "}
          <strong>measure realised edge</strong> before you size up.
        </p>
        <p>
          Our guide to <Link href="/polymarket/trading-bots">building a Polymarket trading bot</Link> covers
          the architecture, a market-making loop and the infrastructure, and our guide to{" "}
          <Link href="/polymarket/optimising-edge">finding and measuring edge</Link> covers how to tell a real
          advantage from variance. Both assume the one thing none of this works without: a funded, live
          account.
        </p>
      </>
    ),
  },
];

const faqs: GuideFaq[] = [
  {
    q: "Can a Polymarket trading bot actually be profitable?",
    a: "Sometimes, but not by default. Profit comes from the edge you capture plus liquidity rewards, minus fees and adverse selection. The four strategies here, sports models, politics and correlation, market making, and arbitrage, are where that equation most often turns positive, but each has a real catch and must be measured rather than assumed.",
  },
  {
    q: "Which strategy is best to start with?",
    a: "Market making in liquid, fee-bearing markets is the most systematic and the only one Polymarket subsidises through liquidity rewards, but it needs tight inventory controls to survive adverse selection. Arbitrage sounds safest but is fiercely competitive and rarely riskless. Sports and politics edges depend on you having a genuinely better model or faster data.",
  },
  {
    q: "Do I need to be able to code?",
    a: "Yes. All four strategies run through Polymarket's CLOB API using the official clients, py-clob-client for Python or clob-client for TypeScript. Our guide to building a trading bot covers the architecture, order signing, hosting and risk controls.",
  },
  {
    q: "How much money do I need to run a bot?",
    a: "There is no fixed minimum, but you need enough to quote or trade meaningfully and to absorb the natural variance of a high-payout market. The sensible approach is to start small, prove the strategy has a measurable edge on a modest bankroll, and only scale once the data supports it. Never stake money you cannot afford to lose.",
  },
  {
    q: "Are sports bots or politics bots better?",
    a: "Neither is universally better; it depends on where your advantage is. Sports rewards a strong predictive model and fast reaction to in-game events, while politics rewards correlation trading and news speed in a deeper but more efficient market. Both require a genuine edge, because both attract sophisticated traders.",
  },
  {
    q: "Is running a trading bot risky?",
    a: "Yes. Trading prediction markets involves risk, including loss of your entire stake, and an unattended bug can lose money fast. That is why hard risk controls, a max position, inventory caps, a drawdown limit and a kill switch, matter more than the strategy itself. This page is general information, not financial advice.",
  },
];

const related: GuideRelated[] = [
  { href: "/polymarket/trading-bots", label: "Building a trading bot", desc: "The CLOB API, a market-making loop, hosting and the risk controls to run any of these." },
  { href: "/polymarket/optimising-edge", label: "Finding your edge", desc: "How to measure whether a strategy has a real advantage after costs." },
  { href: "/polymarket/how-to-register", label: "Getting registered", desc: "Set up and fund the account your bot will trade through." },
];

export default function ProfitableTradingBotsPage() {
  return (
    <GuideLayout
      slug="polymarket/profitable-trading-bots"
      campaign={CAMPAIGN}
      articleType="TechArticle"
      breadcrumbLabel="Profitable bot strategies"
      kicker="Guide · Bot strategy"
      h1="Polymarket trading bots that are profitable: 4 strategies"
      description={seoConfig.polymarketProfitableBots.description}
      heroCtaLabel="Sign up now to run a strategy"
      intro={
        <>
          <p>
            &ldquo;Profitable&rdquo; and &ldquo;trading bot&rdquo; belong in the same sentence far less often
            than the internet suggests. But there are genuine strategies where an automated Polymarket bot can
            earn, if you bring a real edge and run it with discipline.
          </p>
          <p>
            Here are the four that work most reliably, what makes each one pay, and the catch on every one of
            them. Every strategy needs the same starting point: a funded, live account.
          </p>
        </>
      }
      sections={sections}
      faqs={faqs}
      related={related}
      closing={{
        heading: "Ready to run one of these?",
        body: "None of these strategies works without a live, funded account. Create yours now, then build the bot to run it. Signing up through our link costs you nothing extra.",
        ctaLabel: "Sign up now",
      }}
    />
  );
}
