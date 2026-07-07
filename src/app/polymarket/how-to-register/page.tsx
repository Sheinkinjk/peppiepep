import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";
import Link from "next/link";
import GuideLayout, { type GuideSection, type GuideFaq, type GuideRelated } from "@/components/polymarket/GuideLayout";
import PolymarketCta from "@/components/polymarket/PolymarketCta";
import { POLYMARKET_DOCS } from "@/lib/polymarket";

export const metadata = generateSEOMetadata(seoConfig.polymarketRegister);

const CAMPAIGN = "how-to-register";

const compareRows: { label: string; us: string; intl: string }[] = [
  { label: "Settlement currency", us: "US dollars (USD)", intl: "USDC on Polygon" },
  { label: "Identity check", us: "Full KYC: government ID, SSN, proof of US residency", intl: "Connect a wallet; no traditional KYC" },
  { label: "How you fund it", us: "USD deposit in the app", intl: "Deposit USDC, or buy with card/bank via MoonPay" },
  { label: "Custody", us: "Custodial, held in the regulated app", intl: "Self-custody in your own wallet" },
  { label: "Access", us: "App-based, ~40+ US states (some restricted)", intl: "Web, geo-restricted by country" },
  { label: "Regulation", us: "CFTC-regulated", intl: "Crypto-native, terms by jurisdiction" },
];

const sections: GuideSection[] = [
  {
    id: "eligibility",
    h2: "Quick eligibility check",
    body: (
      <>
        <p>
          Before you start, three things decide which door you use. First, you must be{" "}
          <strong>18 or older</strong>. Second, your <strong>location</strong> determines whether you use
          Polymarket US or Polymarket International. Third, some regions are restricted, so it is worth
          confirming yours before you sign up.
        </p>
        <p>
          In the United States, Polymarket US is available in <strong>roughly 40 or more states</strong>, but
          several have issued restrictions or bans. States that have appeared on that list include{" "}
          <strong>Nevada, Tennessee, Massachusetts, Connecticut, Arizona and Minnesota</strong>. This list
          changes, so treat it as current at the time of writing and confirm your own state in the{" "}
          <a href={POLYMARKET_DOCS.help} target="_blank" rel="noopener nofollow">official help centre</a>.
        </p>
        <p>
          Internationally, Polymarket is <strong>blocked in OFAC-sanctioned countries</strong> and several
          others, and access is enforced by IP address and the terms of service. Using a{" "}
          <strong>VPN to get around a geo-block violates the terms and can lead to a frozen account</strong>,
          so do not rely on one. If in doubt about your country, verify before depositing.
        </p>
      </>
    ),
  },
  {
    id: "us-path",
    h2: "Path A: Polymarket US (regulated, USD)",
    body: (
      <>
        <p>
          Polymarket returned to the United States in late 2025 through the QCEX/QCX acquisition and relaunched
          in December 2025 as a <strong>CFTC-regulated</strong>, app-based platform that settles in{" "}
          <strong>US dollars</strong>. If you are a US resident in an eligible state, this is your path.
        </p>
        <ol className="list-decimal pl-5 space-y-2">
          <li><strong>Create an account</strong> with email or Google in the app.</li>
          <li>
            <strong>Complete KYC.</strong> You will verify your identity with a government ID, your SSN, and
            proof of US residency. This is a regulatory requirement, not an optional step.
          </li>
          <li><strong>Fund in USD</strong> once verified.</li>
          <li><strong>Start trading</strong> in the app, choosing from the US market list.</li>
        </ol>
        <p>
          Remember that the US app&apos;s market list is not identical to the international site&apos;s, and
          that a handful of states cannot access it at all.
        </p>
        <div className="not-prose my-6">
          <PolymarketCta label="Create your Polymarket account" campaign={CAMPAIGN} location="us-path" />
        </div>
      </>
    ),
  },
  {
    id: "international-path",
    h2: "Path B: Polymarket International (crypto, USDC)",
    body: (
      <>
        <p>
          Outside the US, Polymarket is <strong>crypto-native</strong> and settles in <strong>USDC</strong> on
          the <strong>Polygon</strong> network. You do not fill in a traditional KYC form; instead you onboard
          by connecting a wallet.
        </p>
        <ol className="list-decimal pl-5 space-y-2">
          <li>
            <strong>Connect a wallet</strong> such as MetaMask, Coinbase Wallet, or any WalletConnect-compatible
            wallet. If you do not hold crypto yet, you can <strong>buy USDC with a card or bank transfer via
            MoonPay</strong>.
          </li>
          <li>
            <strong>Deposit USDC.</strong> Polymarket supports multi-chain deposits from{" "}
            <strong>Ethereum, Base, Arbitrum and Solana</strong>; larger deposits can bridge across via
            services like Across or deBridge.
          </li>
          <li><strong>Start trading</strong> from the international market list.</li>
        </ol>
        <p>
          Because you keep funds in your own wallet, this path is <strong>self-custodial</strong>: you control
          the keys, which means both more control and more responsibility for security (see below). New to how
          the markets themselves work? Start with{" "}
          <Link href="/polymarket/markets-explained">markets explained</Link>.
        </p>
        <div className="not-prose my-6">
          <PolymarketCta label="Start trading on Polymarket" campaign={CAMPAIGN} location="international-path" />
        </div>
      </>
    ),
  },
  {
    id: "comparison",
    h2: "US vs International at a glance",
    body: (
      <div className="not-prose overflow-x-auto -mx-2 px-2">
        <table className="w-full min-w-[560px] text-sm">
          <thead>
            <tr className="border-b border-[#e5e9e7]">
              <th className="text-left pb-3 pr-4 text-[#9aa39c] font-semibold text-[11px] uppercase tracking-wider w-44"></th>
              <th className="pb-3 px-3 text-left font-extrabold text-[#10251b] text-sm">Polymarket US</th>
              <th className="pb-3 px-3 text-left font-extrabold text-[#10251b] text-sm">International</th>
            </tr>
          </thead>
          <tbody>
            {compareRows.map((r) => (
              <tr key={r.label} className="border-b border-[#e5e9e7] align-top">
                <td className="py-3 pr-4 text-[#3d4b44] text-xs font-medium leading-snug">{r.label}</td>
                <td className="py-3 px-3 text-[#3d4b44] text-xs leading-snug">{r.us}</td>
                <td className="py-3 px-3 text-[#3d4b44] text-xs leading-snug">{r.intl}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ),
  },
  {
    id: "attribution",
    h2: "Referral attribution: the 30-day window",
    body: (
      <>
        <p>
          If you are arriving through a referral link, one detail matters: you need to{" "}
          <strong>sign up within 30 days of clicking the link</strong> for the referral to be attributed. The
          link can be shared well in advance, but the clock on attribution starts when you click and runs for
          30 days.
        </p>
        <p>
          Referral rewards are paid to the referrer out of trading fees and are governed entirely by
          Polymarket&apos;s program terms, which change; the full current rules are in the{" "}
          <a href={POLYMARKET_DOCS.referral} target="_blank" rel="noopener nofollow">official referral docs</a>.
          It costs you nothing extra to sign up through a referral link.
        </p>
      </>
    ),
  },
  {
    id: "security",
    h2: "Security basics",
    body: (
      <ul className="list-disc pl-5 space-y-2">
        <li>
          <strong>Protect your wallet.</strong> On the international platform your funds are self-custodied.
          Never share your seed phrase, store it offline, and consider a hardware wallet for larger balances.
        </li>
        <li>
          <strong>Turn on 2FA</strong> wherever it is offered, including on the US app and any connected
          exchange accounts.
        </li>
        <li>
          <strong>Only use the official app and site.</strong> Bookmark the real URL, be wary of lookalike
          domains and &ldquo;support&rdquo; DMs, and never approve a transaction you did not initiate.
        </li>
      </ul>
    ),
  },
];

const faqs: GuideFaq[] = [
  {
    q: "Do I need cryptocurrency to sign up?",
    a: "Only for the international platform, which settles in USDC. Even then you can buy USDC with a card or bank transfer through MoonPay, so you do not need to already own crypto. Polymarket US uses US dollars and no crypto at all.",
  },
  {
    q: "Is KYC required?",
    a: "On Polymarket US, yes: you verify your identity with a government ID, SSN and proof of US residency, because it is a CFTC-regulated platform. On Polymarket International you onboard by connecting a wallet rather than completing a traditional KYC form.",
  },
  {
    q: "Which states and countries can't use Polymarket?",
    a: "In the US, several states have issued restrictions or bans, with examples including Nevada, Tennessee, Massachusetts, Connecticut, Arizona and Minnesota; the list changes. Internationally, OFAC-sanctioned countries and several others are blocked. Always verify your own jurisdiction on Polymarket's official site, as these lists change frequently.",
  },
  {
    q: "Is there a signup bonus?",
    a: "Any promotions or bonuses vary over time and by platform, and they change frequently, so we do not quote a fixed offer. Check the current terms on Polymarket's official site before signing up rather than relying on a figure quoted elsewhere.",
  },
  {
    q: "Can I use a VPN to access Polymarket from a blocked region?",
    a: "No. Access is enforced by IP address and the terms of service, and using a VPN to bypass a geo-block violates those terms and can result in a frozen account. Confirm your jurisdiction is eligible before depositing.",
  },
  {
    q: "How does the referral link work for me as a new user?",
    a: "Signing up through a referral link costs you nothing extra. To be attributed to the referrer, you need to create your account within 30 days of clicking the link. The reward the referrer may earn comes from trading fees under Polymarket's program terms, not from you.",
  },
];

const related: GuideRelated[] = [
  { href: "/polymarket/markets-explained", label: "Markets explained", desc: "What you'll actually be trading: shares, the order book, fees and resolution." },
  { href: "/polymarket/optimising-edge", label: "Finding your edge", desc: "Once you're in, where a real advantage comes from and how to measure it." },
  { href: "/polymarket/trading-bots", label: "Building a trading bot", desc: "Automate market making and arbitrage through the CLOB API." },
];

export default function HowToRegisterPage() {
  return (
    <GuideLayout
      slug="polymarket/how-to-register"
      campaign={CAMPAIGN}
      articleType="Article"
      breadcrumbLabel="How to register"
      kicker="Guide · Getting started"
      h1="How to register on Polymarket: accounts, wallets & requirements"
      description={seoConfig.polymarketRegister.description}
      heroCtaLabel="Create your Polymarket account in minutes"
      intro={
        <>
          <p>
            Ready to sign up? There are now two Polymarkets: a US, CFTC-regulated app that settles in dollars,
            and a crypto-native international site that settles in USDC. This guide gets you onto the right one
            quickly.
          </p>
          <p>
            Below: a fast eligibility check, the exact steps for each path, a side-by-side comparison, how
            referral attribution works, and the security basics worth getting right from day one.
          </p>
        </>
      }
      sections={sections}
      faqs={faqs}
      related={related}
      closing={{
        heading: "Create your Polymarket account",
        body: "Pick the path that fits your location, complete the steps above, and you can be trading today. Signing up through our link costs you nothing extra.",
        ctaLabel: "Create your Polymarket account",
      }}
    />
  );
}
