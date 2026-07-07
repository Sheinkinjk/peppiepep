import { POLYMARKET_DOCS } from "@/lib/polymarket";

/**
 * Risk + eligibility disclaimer shown in the footer of every Polymarket guide.
 */
export default function RiskDisclaimer() {
  return (
    <div className="rounded-xl border border-[#e5e9e7] bg-[#faf9f5] px-5 py-4">
      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#9aa39c] mb-2">
        Risk &amp; eligibility
      </p>
      <p className="text-xs leading-relaxed text-[#6e7b74]">
        Trading prediction markets involves risk, including loss of your entire stake. Availability
        and rules vary by country and US state. 18+ only. This is general information, not financial
        or legal advice. Verify current terms on{" "}
        <a
          href={POLYMARKET_DOCS.docs}
          target="_blank"
          rel="noopener nofollow"
          className="underline underline-offset-2 hover:text-[#3d4b44]"
        >
          Polymarket&apos;s official site
        </a>{" "}
        before trading.
      </p>
    </div>
  );
}
