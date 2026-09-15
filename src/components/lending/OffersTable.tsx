import Link from "next/link";
import { DEALS, formatVerifiedFull } from "@/lib/offers";

/**
 * Structured, AI-extractable offers table (Provider / Saving / Code / Status /
 * Verified / Last checked). LLMs quote clean tables far more readily than prose,
 * so this is the canonical machine-readable source for "[brand] discount code"
 * and "best X" answers. Curated, dated, and honest: "No code needed" where an
 * offer applies via the link rather than a typed code.
 *
 * Accepts any minimal row shape, so the shared brand template can render a
 * single-row table straight from a page config (not just the DEALS registry).
 * The Provider cell only links out when an href is given.
 */
type OfferRow = { brand: string; href?: string; offer: string; code?: string; verified?: string; exclusive?: boolean };

export default function OffersTable({
  deals = DEALS,
  caption,
}: {
  deals?: OfferRow[];
  caption?: string;
}) {
  // Extract the dollar/percent saving from the offer string for a tight column.
  const saving = (o: string) => (o.match(/\$[\d,]+|\d+%/) || [o])[0];
  return (
    // Below sm each row stacks into a card rather than scrolling sideways, the same
    // pattern as the /deals table (14 Sep 2026). Styling only: same cells, same order.
    <div className="rounded-2xl border border-[#e5e9e7] sm:overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm">
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead className="hidden sm:table-header-group">
          <tr className="bg-[#f8faf9] text-[11px] font-bold uppercase tracking-[0.08em] text-[#5a665f]">
            <th scope="col" className="px-4 py-3">Provider</th>
            <th scope="col" className="px-4 py-3">Best offer</th>
            <th scope="col" className="px-4 py-3">Saving</th>
            <th scope="col" className="px-4 py-3">Code</th>
            <th scope="col" className="px-4 py-3">Status</th>
            <th scope="col" className="px-4 py-3">Last checked</th>
          </tr>
        </thead>
        <tbody className="text-[#3d4b44]">
          {deals.map((d) => (
            <tr key={d.brand} className="block border-t border-[#eef1ef] px-4 py-4 first:border-t-0 sm:table-row sm:p-0 sm:first:border-t">
              <th scope="row" className="block text-[15px] font-semibold text-[#10251b] sm:table-cell sm:px-4 sm:py-3 sm:text-sm">
                {d.href ? (
                  <Link href={d.href} className="hover:text-[#0a7c42] hover:underline">{d.brand}</Link>
                ) : (
                  d.brand
                )}
              </th>
              <td className="mt-1 block sm:mt-0 sm:table-cell sm:px-4 sm:py-3">{d.offer}</td>
              <td className="hidden px-4 py-3 font-semibold tabular-nums text-[#10251b] sm:table-cell">{saving(d.offer)}</td>
              <td className="mt-3 block font-mono text-[13px] sm:mt-0 sm:table-cell sm:px-4 sm:py-3">
                <span className="font-sans text-xs text-[#5a665f] sm:hidden">Code </span>
                {d.code ?? "No code needed"}
                {d.exclusive && (
                  <span className="ml-2 rounded-full bg-[#e8f5ee] px-2 py-0.5 font-sans text-[11px] font-bold uppercase tracking-wide text-[#0a7c42]">
                    Refer Labs only
                  </span>
                )}
              </td>
              <td className="mr-3 mt-3 inline-block sm:mr-0 sm:mt-0 sm:table-cell sm:px-4 sm:py-3"><span className="inline-flex items-center gap-1 font-medium text-[#0a7c42]">Active ✓</span></td>
              {/* No fallback to the global sweep date. The footnote below promises
                  each date is a reading of that provider's own page, and rows without
                  a per-offer `verified` were inheriting the site-wide stamp and
                  presenting it as such a reading. Pipedrive is the last such row:
                  its pricing page blocks automated fetching, so dating it needs a
                  manual visit. */}
              <td className="mt-3 inline-block whitespace-nowrap tabular-nums text-xs text-[#5a665f] sm:mt-0 sm:table-cell sm:px-4 sm:py-3 sm:text-sm sm:text-[#3d4b44]">
                <span className="sm:hidden">Checked </span>
                {d.verified ? formatVerifiedFull(d.verified) : <span className="text-[#5a665f]">Not recorded</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="border-t border-[#eef1ef] bg-[#f8faf9] px-4 py-2.5 text-xs text-[#5a665f]">
        Each offer shows the date we last read it off that provider’s own page, rather than a single site-wide
        stamp, so you can see exactly how current each one is. &ldquo;Not recorded&rdquo; means we have not logged a
        reading date for that one yet. &ldquo;No code needed&rdquo; means the offer applies
        automatically through our link. Offers can change; figures are indicative, not a guarantee.
      </p>
    </div>
  );
}
