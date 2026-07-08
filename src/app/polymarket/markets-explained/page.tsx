import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";
import Link from "next/link";
import GuideLayout, { type GuideSection, type GuideFaq, type GuideRelated } from "@/components/polymarket/GuideLayout";
import PolymarketCta from "@/components/polymarket/PolymarketCta";
import { POLYMARKET_DOCS } from "@/lib/polymarket";

export const metadata = generateSEOMetadata(seoConfig.polymarketMarkets);

const CAMPAIGN = "markets-explained";

const sections: GuideSection[] = [
  {
    id: "basics",
    h2: "Prediction markets 101",
    body: (
      <>
        <p>
          A prediction market lets you trade on the outcome of a real-world event. On Polymarket, every
          question is turned into <strong>shares priced between $0.00 and $1.00</strong>. A share pays out
          exactly <strong>$1.00 if the outcome happens</strong> and <strong>$0.00 if it does not</strong>.
        </p>
        <p>
          Because a winning share is worth a dollar, the current price reads directly as the market&apos;s{" "}
          <strong>implied probability</strong>. If &ldquo;Yes&rdquo; is trading at $0.62, the market is
          pricing roughly a 62% chance of that outcome. You buy <strong>Yes</strong> shares if you think the
          event is more likely than the price implies, or <strong>No</strong> shares if you think it is less
          likely.
        </p>
        <p>
          You do not have to hold until the end. Prices move as new information arrives, so you can sell your
          shares at any time before the market resolves. Your profit is the difference between what you paid
          and what you sell or settle for. Buy Yes at $0.40, and if the event happens each share becomes
          worth $1.00, a $0.60 gain; if it does not, the share is worth nothing.
        </p>
      </>
    ),
  },
  {
    id: "market-types",
    h2: "The market types you will see",
    body: (
      <>
        <p>
          <strong>Binary (Yes/No).</strong> The simplest form: one question with two outcomes, such as
          &ldquo;Will this happen by a set date?&rdquo; You are buying Yes or No on a single event.
        </p>
        <p>
          <strong>Categorical / multi-outcome.</strong> One winner is chosen from many, for example
          &ldquo;Which candidate wins?&rdquo; across a field of names. Each option trades as its own share,
          and across the whole field the prices sum to roughly $1.00, because exactly one outcome will
          resolve Yes.
        </p>
        <p>
          <strong>Scalar / range.</strong> Some markets cover a numeric range rather than a single yes-or-no,
          resolving based on where a value lands within a band. These are less common but useful for
          data-driven questions.
        </p>
        <p>
          <strong>Time-bound.</strong> Most markets carry a resolution date or deadline. Knowing when a
          market resolves matters, because it shapes how much time is left for the outcome, and the price, to
          move.
        </p>
      </>
    ),
  },
  {
    id: "pricing",
    h2: "How pricing works: the order book",
    body: (
      <>
        <p>
          Polymarket runs on a <strong>Central Limit Order Book (CLOB)</strong>, the same model used by stock
          exchanges. Buyers post <strong>bids</strong> and sellers post <strong>asks</strong>. The price you
          see is where the best bid and best ask meet, and the gap between them is the <strong>spread</strong>.
        </p>
        <p>
          Two roles matter here. A <strong>maker</strong> posts a resting limit order that sits on the book
          and adds liquidity. A <strong>taker</strong> crosses the spread to fill instantly against those
          resting orders, removing liquidity. That distinction drives both the fees you pay and the rewards
          you can earn, which we cover next and in our{" "}
          <Link href="/polymarket/optimising-edge">guide to finding edge</Link>.
        </p>
        <div className="not-prose my-6">
          <PolymarketCta label="Explore live markets on Polymarket" campaign={CAMPAIGN} location="mid" />
        </div>
      </>
    ),
  },
  {
    id: "fees",
    h2: "Fees: maker-zero, taker-fee",
    body: (
      <>
        <p>
          Polymarket&apos;s fee model rewards liquidity. <strong>Maker orders generally pay no fee</strong>,
          because resting limit orders make the market work. <strong>Taker orders pay a fee</strong> that is
          computed from a formula based on the number of shares and the price, so the exact cost depends on
          the trade.
        </p>
        <p>
          Polymarket itself charges <strong>no deposit or withdrawal fees</strong>, though on the
          crypto-native international platform ordinary blockchain network fees can still apply when you move
          funds on-chain.
        </p>
        <p>
          One nuance worth knowing: <strong>not every market charges fees.</strong> Some world-event and
          geopolitical markets can be fee-free. That is fine if you are simply trading a view, but it matters
          for anyone chasing maker rewards or referral rewards, since a fee-free market generates neither.
          Always confirm current fee details in the{" "}
          <a href={POLYMARKET_DOCS.docs} target="_blank" rel="noopener nofollow">official docs</a>.
        </p>
      </>
    ),
  },
  {
    id: "resolution",
    h2: "Resolution and trust: the UMA oracle",
    body: (
      <>
        <p>
          A market is only as good as the way it settles. Polymarket resolves markets through the{" "}
          <strong>UMA optimistic oracle</strong>. After an event concludes, an outcome is proposed, and there
          is a <strong>dispute window</strong> during which anyone can challenge it. If it is disputed, the
          question goes through UMA&apos;s dispute-and-vote process before the final result is locked in.
        </p>
        <p>
          Once resolved, the accounting is simple: winning shares are worth <strong>$1.00</strong> each and
          losing shares are worth <strong>$0.00</strong>. Understanding the resolution source and the exact
          wording of a market matters, because well-written markets leave little room for ambiguity, and the
          wording is what the oracle ultimately judges against.
        </p>
      </>
    ),
  },
  {
    id: "categories",
    h2: "What you can trade",
    body: (
      <>
        <p>
          Polymarket spans <strong>politics, sports, crypto, economics, and geopolitics / world events</strong>.
          The breadth is part of the appeal: the same account can price an election, a token&apos;s year-end
          level, an interest-rate decision, and a championship.
        </p>
        <p>
          One practical point for 2026: there are now two platforms, and the{" "}
          <strong>US app&apos;s market list is not identical to the international site&apos;s</strong>. Which
          markets you can access depends on which platform you are eligible for, so it is worth checking both
          when you plan what you want to trade. Our{" "}
          <Link href="/polymarket/how-to-register">registration guide</Link> walks through the US and
          international paths.
        </p>
      </>
    ),
  },
  {
    id: "rewards",
    h2: "Liquidity rewards, and where to go next",
    body: (
      <>
        <p>
          Beyond trading for a view, Polymarket runs a <strong>Liquidity Rewards Program</strong>. Makers who
          post competitive two-sided limit orders that tighten the spread earn a share of daily reward pools,
          paid <strong>daily around midnight UTC</strong>. In other words, the platform pays you to make its
          markets more liquid.
        </p>
        <p>
          That is a big reason serious participants automate. If you want to earn spread and rewards
          systematically, see our guide to{" "}
          <Link href="/polymarket/trading-bots">building a trading bot</Link>. And if you want to understand
          whether any strategy actually has an advantage after costs, read{" "}
          <Link href="/polymarket/optimising-edge">how to find and measure edge</Link>. Both build directly on
          the mechanics above.
        </p>
      </>
    ),
  },
];

const faqs: GuideFaq[] = [
  {
    q: "Is Polymarket real money?",
    a: "Yes. On Polymarket US, markets settle in US dollars; on Polymarket International, they settle in USDC, a dollar-pegged stablecoin, on the Polygon network. Winning shares pay $1.00 each and losing shares pay nothing.",
  },
  {
    q: "What does a share price actually mean?",
    a: "The price of a share, between $0.00 and $1.00, is the market's implied probability of that outcome. A Yes share at $0.70 implies roughly a 70% chance. As the crowd's view changes, the price moves.",
  },
  {
    q: "What is the difference between Yes and No shares?",
    a: "They are the two sides of a binary market. Yes shares pay $1 if the event happens; No shares pay $1 if it does not. Buying No is how you take the opposite side without needing someone to short to you.",
  },
  {
    q: "How do markets get resolved?",
    a: "Through the UMA optimistic oracle. After the event, an outcome is proposed and there is a dispute window; if it is challenged, UMA runs a dispute-and-vote process before the result is finalised. Winning shares then settle at $1 and losing shares at $0.",
  },
  {
    q: "Are there fees to trade?",
    a: "Maker orders (resting limit orders) generally pay no fee, while taker orders (instant fills) pay a fee computed from a formula based on share count and price. Polymarket charges no deposit or withdrawal fees, though on-chain network fees can apply internationally. Some markets are fee-free.",
  },
  {
    q: "Do I need cryptocurrency to use Polymarket?",
    a: "It depends on the platform. Polymarket US uses US dollars and does not require crypto. Polymarket International is crypto-native and settles in USDC, though you can buy USDC with a card or bank transfer via MoonPay. Our registration guide covers both paths.",
  },
];

const related: GuideRelated[] = [
  { href: "/polymarket/how-to-register", label: "Getting registered", desc: "Set up a US or international account and fund it, step by step." },
  { href: "/polymarket/optimising-edge", label: "Finding your edge", desc: "Where a real trading advantage comes from, and how to measure it." },
  { href: "/polymarket/trading-bots", label: "Building a trading bot", desc: "Automate market making and arbitrage through the CLOB API." },
];

export default function MarketsExplainedPage() {
  return (
    <GuideLayout
      slug="polymarket/markets-explained"
      campaign={CAMPAIGN}
      articleType="Article"
      breadcrumbLabel="Markets explained"
      kicker="Prediction markets guide"
      h1="Polymarket markets explained: how prediction markets work"
      description={seoConfig.polymarketMarkets.description}
      heroCtaLabel="Explore live markets on Polymarket"
      intro={
        <>
          <p>
            Polymarket lets you trade on the outcome of real-world events, from elections and sports to crypto
            prices and economic data, by buying and selling shares that track how likely each outcome is.
          </p>
          <p>
            This guide explains the mechanics from the ground up: how prices map to probability, the order book
            behind every trade, the fees, and how markets settle. It is the foundation for our companion guides
            on registering, finding edge, and building bots.
          </p>
        </>
      }
      sections={sections}
      faqs={faqs}
      related={related}
      closing={{
        heading: "See how a real market looks",
        body: "The fastest way to make this click is to open Polymarket and watch prices move as probabilities. Browsing is free.",
        ctaLabel: "Explore live markets on Polymarket",
      }}
    />
  );
}
