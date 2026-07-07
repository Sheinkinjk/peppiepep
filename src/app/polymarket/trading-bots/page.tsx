import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";
import Link from "next/link";
import GuideLayout, { type GuideSection, type GuideFaq, type GuideRelated } from "@/components/polymarket/GuideLayout";
import PolymarketCta from "@/components/polymarket/PolymarketCta";
import { POLYMARKET_DOCS } from "@/lib/polymarket";

export const metadata = generateSEOMetadata(seoConfig.polymarketBots);

const CAMPAIGN = "trading-bots";

const MM_LOOP = `# Illustrative market-making loop (pseudo-code, not production-ready)
from py_clob_client.client import ClobClient

client = ClobClient(host, key=API_KEY, ...)   # authenticated client
MARKET        = "0x..."   # token id for the Yes outcome
HALF_SPREAD   = 0.02      # how far off mid we quote each side
SIZE          = 50        # shares per side
MAX_INVENTORY = 500       # hard position cap

while running:                       # your main loop
    book = client.get_order_book(MARKET)
    mid  = (book.best_bid + book.best_ask) / 2
    inv  = get_position(MARKET)       # your own inventory tracker

    # skew quotes against inventory so you don't pile up one side
    skew = (inv / MAX_INVENTORY) * HALF_SPREAD
    bid  = round(mid - HALF_SPREAD - skew, 2)
    ask  = round(mid + HALF_SPREAD - skew, 2)

    cancel_all(client, MARKET)
    if inv <  MAX_INVENTORY:
        client.post_order(build_signed_order(MARKET, "BUY",  bid, SIZE))
    if inv > -MAX_INVENTORY:
        client.post_order(build_signed_order(MARKET, "SELL", ask, SIZE))

    sleep(REQUOTE_SECONDS)            # requote on a timer or on fills`;

const sections: GuideSection[] = [
  {
    id: "what-it-does",
    h2: "What a Polymarket bot actually does",
    body: (
      <>
        <p>
          A trading bot is just software that places and manages orders faster and more consistently than you
          could by hand. On Polymarket, most bots fall into four archetypes:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Market making</strong> — quote both sides of a market to earn the spread, plus a share of the platform&apos;s liquidity rewards.</li>
          <li><strong>Cross-market / cross-venue arbitrage</strong> — capture price gaps between correlated markets, or between Polymarket and another venue such as Kalshi.</li>
          <li><strong>Event-driven / news reaction</strong> — react to a result or headline faster than the book reprices.</li>
          <li><strong>Inventory / hedging</strong> — manage and offset exposure you have taken on elsewhere.</li>
        </ul>
        <p>
          All four sit on the same foundation: programmatic access to the order book. If the terms{" "}
          &ldquo;bid&rdquo;, &ldquo;ask&rdquo;, &ldquo;maker&rdquo; and &ldquo;taker&rdquo; are new, read{" "}
          <Link href="/polymarket/markets-explained">markets explained</Link> first, then come back.
        </p>
      </>
    ),
  },
  {
    id: "prerequisites",
    h2: "Prerequisites",
    body: (
      <>
        <p>Before a single line of code runs, you need the account and access set up:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>A funded account.</strong> On the international platform that means a wallet funded with
            USDC on Polygon; on Polymarket US it means a verified, funded US account. Our{" "}
            <Link href="/polymarket/how-to-register">registration guide</Link> covers both.
          </li>
          <li>
            <strong>CLOB API access and allowances.</strong> You generate API credentials and set the on-chain
            token allowances that let the exchange contract move your USDC when orders fill.
          </li>
          <li>
            <strong>Order signing.</strong> Every order is cryptographically signed by your wallet before it is
            posted, so the bot needs secure access to the signing key (typically via a dedicated wallet, not
            your main one).
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "architecture",
    h2: "Architecture: the CLOB API and order lifecycle",
    body: (
      <>
        <p>
          Polymarket exposes trading through its <strong>CLOB API</strong>, with official clients:{" "}
          <strong>py-clob-client</strong> for Python and <strong>clob-client</strong> for TypeScript. You do
          not need to hand-roll HTTP calls; the clients wrap authentication, order construction and submission.
        </p>
        <p>The order lifecycle is straightforward once you see it end to end:</p>
        <ol className="list-decimal pl-5 space-y-2">
          <li><strong>Read the book</strong> — pull current bids and asks for the market&apos;s token id.</li>
          <li><strong>Build an order</strong> — outcome token, side, price and size.</li>
          <li><strong>Sign it</strong> — your wallet signs the order (Polymarket uses a proxy-wallet model, so the signing wallet authorises trades against your funded balance).</li>
          <li><strong>Post it</strong> — submit as a resting limit order (<strong>maker</strong>) or one that fills immediately (<strong>taker</strong>).</li>
          <li><strong>Handle fills</strong> — listen for fills, update your inventory, and requote or hedge.</li>
        </ol>
        <p>
          The maker/taker choice is the crux of bot economics: makers generally pay no fee and can earn
          rewards, while takers pay a fee for immediacy. A market-making bot lives almost entirely on the maker
          side.
        </p>
        <div className="not-prose my-6">
          <PolymarketCta label="You need a live account to build this — create your Polymarket account" campaign={CAMPAIGN} location="mid-architecture" />
        </div>
      </>
    ),
  },
  {
    id: "market-making-loop",
    h2: "A minimal market-making loop",
    body: (
      <>
        <p>
          The simplest useful bot quotes both sides around the mid-price, then adjusts as it accumulates
          inventory. The sketch below is <strong>illustrative pseudo-code</strong> to show the shape of the
          loop, not production code, real bots add error handling, rate-limit backoff, partial-fill logic and
          the risk controls further down this page.
        </p>
        <div className="not-prose overflow-x-auto rounded-xl border border-[#e5e9e7] bg-[#0e1512] p-4 my-2">
          <pre className="text-[12.5px] leading-relaxed text-[#c6d4cc] font-mono whitespace-pre"><code>{MM_LOOP}</code></pre>
        </div>
        <p>
          The important idea is the <strong>inventory skew</strong>: as you accumulate Yes shares, you quote a
          little lower on both sides to encourage selling back down, so you earn the spread without drifting
          into a large directional position you never intended.
        </p>
      </>
    ),
  },
  {
    id: "infrastructure",
    h2: "Infrastructure",
    body: (
      <>
        <p>A bot that only runs while your laptop is open is a liability. A minimal reliable setup:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Hosting</strong> — a small always-on server such as an AWS EC2 instance, close to the API for low latency.</li>
          <li><strong>Process management</strong> — a supervisor (systemd, pm2 or similar) that restarts the bot if it crashes.</li>
          <li><strong>Monitoring and alerts</strong> — push key events and errors to a channel you actually watch, for example a Telegram bot, so you know within seconds if something breaks.</li>
          <li><strong>Logging</strong> — record every order, fill and cancel so you can reconstruct what happened and measure performance.</li>
          <li><strong>Secrets handling</strong> — keep API keys and the signing key out of your code, in environment variables or a secrets manager, never committed to a repo.</li>
        </ul>
      </>
    ),
  },
  {
    id: "risk-controls",
    h2: "Risk controls and kill conditions",
    body: (
      <>
        <p>
          The fastest way to lose money with a bot is to let a bug run unattended. Hard, non-negotiable limits
          matter more than clever strategy:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Max position</strong> per market and overall, enforced before every order.</li>
          <li><strong>Inventory caps</strong> that stop the bot quoting the side that would breach them.</li>
          <li><strong>Max drawdown</strong> — a daily or total loss limit that halts trading when hit.</li>
          <li><strong>Circuit breaker / kill switch</strong> — an automatic stop on abnormal conditions (stale data, wild spreads, repeated errors) and a manual one you can trigger instantly.</li>
        </ul>
        <p>
          Treat these as the parts you build first and test hardest. A strategy that is merely mediocre
          survives; a strategy with no kill switch does not.
        </p>
      </>
    ),
  },
  {
    id: "economics",
    h2: "Where the money actually comes from",
    body: (
      <>
        <p>
          For a market-making bot, returns come from two places: the <strong>spread</strong> you earn when both
          your quotes get filled, and the <strong>liquidity rewards</strong> Polymarket pays makers for posting
          competitive two-sided orders, distributed daily around midnight UTC.
        </p>
        <p>
          Here is the honest part. Those rewards are real, but they exist to compensate for{" "}
          <strong>adverse selection</strong>: informed traders pick you off when the price is about to move,
          and naive strategies often bleed exactly what they earn in spread back to those traders. There is no
          durable edge you can assume, only edge you can <strong>measure</strong>. Before you scale size, read{" "}
          <Link href="/polymarket/optimising-edge">how to find and measure edge</Link>, which covers markout
          analysis and sizing so you can tell a real advantage from a mirage.
        </p>
      </>
    ),
  },
];

const faqs: GuideFaq[] = [
  {
    q: "What language and library should I use to build a Polymarket bot?",
    a: "Polymarket provides official clients for the CLOB API: py-clob-client for Python and clob-client for TypeScript. Both wrap authentication, order construction, signing and submission, so you can focus on strategy rather than raw HTTP calls.",
  },
  {
    q: "Do I need to run my own server?",
    a: "For anything beyond experimentation, yes. A bot needs to run continuously, so host it on an always-on server such as an AWS EC2 instance, with process management to restart it on crashes and monitoring to alert you when something breaks.",
  },
  {
    q: "How does order signing work?",
    a: "Every order is cryptographically signed by your wallet before submission. Polymarket uses a proxy-wallet model, so the signing wallet authorises trades against your funded balance. Give the bot access to a dedicated signing key kept out of your codebase, not your main wallet's keys.",
  },
  {
    q: "Can a trading bot actually be profitable?",
    a: "Sometimes, but not by default. Market making earns spread and liquidity rewards, yet those returns can be given back to better-informed traders through adverse selection. Any edge must be measured with markout analysis and controlled sizing, not assumed. Build the risk controls before you chase returns.",
  },
  {
    q: "What risk controls are essential?",
    a: "At minimum: a max position per market and overall, inventory caps that stop the bot quoting a side that would breach them, a max-drawdown limit that halts trading, and both an automatic circuit breaker and a manual kill switch. Build and test these first.",
  },
];

const related: GuideRelated[] = [
  { href: "/polymarket/optimising-edge", label: "Finding your edge", desc: "Whether a strategy has a real advantage after fees, and how to prove it." },
  { href: "/polymarket/how-to-register", label: "Getting registered", desc: "Set up and fund the account and wallet your bot will trade through." },
  { href: "/polymarket/markets-explained", label: "Markets explained", desc: "The order book, maker vs taker and fees your bot is built around." },
];

export default function TradingBotsPage() {
  return (
    <GuideLayout
      slug="polymarket/trading-bots"
      campaign={CAMPAIGN}
      articleType="TechArticle"
      breadcrumbLabel="Trading bots"
      kicker="Guide · Automation"
      h1="How to build a trading bot for Polymarket (2026 guide)"
      description={seoConfig.polymarketBots.description}
      heroCtaLabel="You need a live account to run this — create your Polymarket account"
      intro={
        <>
          <p>
            Want to automate trading on Polymarket? This guide walks through what a bot does, the CLOB API and
            official clients you build on, a minimal market-making loop, the infrastructure to run it reliably,
            and the risk controls that keep a bug from emptying your account.
          </p>
          <p>
            It is written for developers and quants. You will still need a live, funded account to run any of
            it, and a clear-eyed view of where returns really come from.
          </p>
        </>
      }
      sections={sections}
      faqs={faqs}
      related={related}
      closing={{
        heading: "Get an account to build against",
        body: "Every strategy on this page needs a funded, live account and API access. Create yours, then start with the market-making loop above.",
        ctaLabel: "Create your Polymarket account",
      }}
    />
  );
}
