import { STATIONS, perWh, fmtPerWh, fmtAud, PRICES_READ_ON, type PowerStation } from "@/lib/portable-power";

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
 */
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
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-[#e5e9e7] bg-[#f8faf9] text-[#6e7b74]">
              <th className="px-4 py-3 font-semibold">Model</th>
              <th className="px-4 py-3 font-semibold">Capacity</th>
              <th className="px-4 py-3 font-semibold">Output</th>
              <th className="px-4 py-3 font-semibold">Price</th>
              <th className="px-4 py-3 font-semibold">Cost per Wh</th>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption className="mt-2.5 text-[13px] leading-relaxed text-[#6e7b74]">
        {caption ?? "Australian range, sorted by cost per watt-hour."} Read off each brand&apos;s own Australian store
        on {PRICES_READ_ON}. Where a struck-through price was shown it is recorded, so a sale is not mistaken for the
        standing price. Prices change often in this category: check the current figure before you buy.
      </figcaption>
    </figure>
  );
}
