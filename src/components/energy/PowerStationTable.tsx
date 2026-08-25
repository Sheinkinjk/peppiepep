import { STATIONS, perWh, fmtPerWh, fmtAud, PRICES_READ_ON, type PowerStation } from "@/lib/portable-power";
import { ECOFLOW_URL, ANKER_SOLIX_URL } from "@/lib/affiliate-links";

/**
 * The price table these pages exist for.
 *
 * Sorted by cost per watt-hour, because capacity alone makes two units look
 * comparable when they are not. Every row carries the brand's own AUD price and
 * the date it was read; nothing here is converted from USD or taken from a
 * retailer listing.
 *
 * Wide, so it sits in its own horizontal scroll container. On a phone the table
 * scrolls inside the container rather than the page scrolling sideways.
 *
 * Each row carries its own disclosed link to the brand's store. Before that, a
 * reader on the hub page passed 761 words before reaching any way to act on what
 * the table told them; the row they are already reading is the natural place to
 * act, and it is the same link either way.
 */
const AFF: Record<string, string> = { EcoFlow: ECOFLOW_URL, "Anker SOLIX": ANKER_SOLIX_URL };
export default function PowerStationTable({
  filter,
  caption,
}: {
  filter?: (s: PowerStation) => boolean;
  caption?: string;
}) {
  const rows = [...STATIONS].filter(filter ?? (() => true)).sort((a, b) => perWh(a) - perWh(b));
  return (
    <figure className="mt-5">
      <div className="overflow-x-auto rounded-2xl border border-[#e5e9e7]">
        <table className="w-full min-w-[720px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-[#e5e9e7] bg-[#f8faf9] text-[#6e7b74]">
              <th className="px-4 py-3 font-semibold">Model</th>
              <th className="px-4 py-3 font-semibold">Capacity</th>
              <th className="px-4 py-3 font-semibold">Output</th>
              <th className="px-4 py-3 font-semibold">Price</th>
              <th className="px-4 py-3 font-semibold">Cost per Wh</th>
              <th className="px-4 py-3 font-semibold"><span className="sr-only">Check the current price</span></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((s) => (
              <tr key={s.brand + s.model} className="border-b border-[#eef1ef] last:border-0">
                <td className="px-4 py-3">
                  <span className="font-semibold text-[#10251b]">{s.model}</span>
                  <span className="ml-2 text-[12px] text-[#6e7b74]">{s.brand}</span>
                </td>
                <td className="px-4 py-3 tabular-nums text-[#3d4b44]">{s.wh.toLocaleString("en-AU")}Wh</td>
                <td className="px-4 py-3 tabular-nums text-[#3d4b44]">{s.watts.toLocaleString("en-AU")}W</td>
                <td className="px-4 py-3 tabular-nums text-[#3d4b44]">
                  {fmtAud(s.aud)}
                  {s.wasAud ? <span className="ml-1.5 text-[12px] text-[#9aa39c]">was {fmtAud(s.wasAud)}</span> : null}
                </td>
                <td className="px-4 py-3 font-semibold tabular-nums text-[#10251b]">{fmtPerWh(s)}</td>
                <td className="px-4 py-3 text-right whitespace-nowrap">
                  <a
                    href={AFF[s.brand]}
                    target="_blank"
                    rel="nofollow sponsored"
                    data-cta={`table-${s.brand === "EcoFlow" ? "ecoflow" : "anker"}`}
                    className="text-[13px] font-semibold text-[#0a7c42] underline-offset-2 hover:underline"
                  >
                    Check price
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption className="mt-2.5 text-[13px] leading-relaxed text-[#6e7b74]">
        {caption ?? "Australian range, sorted by cost per watt-hour."} Read off each brand&apos;s own Australian store
        on {PRICES_READ_ON}. Where a struck-through price was shown it is recorded, so a sale is not mistaken for the
        standing price. Prices change often in this category: check the current figure before you buy. The
        &ldquo;check price&rdquo; links are disclosed affiliate links to each brand&apos;s own Australian store, and we
        earn from both.
      </figcaption>
    </figure>
  );
}
