import Link from "next/link";
import { LENDERS, panelRatesAsAt, type Lender } from "@/lib/lenders";
import { label } from "@/lib/lending-schema";

const money = (n: number) => `$${n.toLocaleString("en-AU")}`;

/**
 * Semantic comparison table of the current lender panel, read straight from the
 * lenders config. Used on the hub and (filtered) on lender pages. Rates are
 * advertised "from" figures with a shared "as at" date; the calculator and copy
 * never imply these are the rate any given business is offered.
 */
export default function LenderTable({ lenders = LENDERS, caption }: { lenders?: Lender[]; caption?: string }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-[#e5e9e7]">
      <table className="w-full border-collapse text-left text-sm">
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead>
          <tr className="bg-[#f8faf9] text-[11px] font-bold uppercase tracking-[0.08em] text-[#6e7b74]">
            <th scope="col" className="px-4 py-3">Lender</th>
            <th scope="col" className="px-4 py-3">Advertised rate from</th>
            <th scope="col" className="px-4 py-3">Loan size</th>
            <th scope="col" className="px-4 py-3">Typical speed</th>
            <th scope="col" className="px-4 py-3">Products</th>
            <th scope="col" className="px-4 py-3">Industry code</th>
          </tr>
        </thead>
        <tbody className="text-[#3d4b44]">
          {lenders.map((l) => (
            <tr key={l.slug} className="border-t border-[#eef1ef]">
              <th scope="row" className="px-4 py-3 font-semibold text-[#10251b]">
                <Link href={`/business-loans/${l.slug}`} className="hover:text-[#0a7c42] hover:underline">{l.name}</Link>
              </th>
              <td className="px-4 py-3 tabular-nums">{l.advertisedRateFrom}</td>
              <td className="px-4 py-3 tabular-nums whitespace-nowrap">{money(l.minAmount)} – {money(l.maxAmount)}</td>
              <td className="px-4 py-3">{l.speed}</td>
              <td className="px-4 py-3">{l.products.map((p) => label(p)).join(", ")}</td>
              <td className="px-4 py-3">{l.afiaCodeSignatory ? "AFIA Code signatory" : "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="border-t border-[#eef1ef] bg-[#f8faf9] px-4 py-2.5 text-xs text-[#6e7b74]">
        Terms as at {panelRatesAsAt()}, from each lender&apos;s own site. &ldquo;Quote-based&rdquo; means the lender prices each loan individually (Lumi quotes a total repayment; Prospa uses simple interest) rather than publishing a headline rate. Figures are indicative, not a quote; your rate depends on the lender&apos;s assessment. Verify current terms with the lender.
      </p>
    </div>
  );
}
