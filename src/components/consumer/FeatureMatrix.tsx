import { Check, Minus } from "lucide-react";

const GREEN = "#0a7c42";
const TINT = `${GREEN}0A`;

export type MatrixCol = { name: string; highlight?: boolean; badge?: string };
export type MatrixVal = boolean | string;
export type MatrixRow = { label: string; note?: string; vals: MatrixVal[] };

/**
 * Premium comparison matrix. The product surface people actually decide on, so
 * it earns real engineering: the criteria column stays pinned while the product
 * columns scroll on mobile, one column can be highlighted as the pick, and rows
 * light up on hover. Booleans render as check / dash; strings render as text.
 */
export default function FeatureMatrix({
  columns,
  rows,
  footnote,
  firstColLabel = "",
}: {
  columns: MatrixCol[];
  rows: MatrixRow[];
  footnote?: string;
  firstColLabel?: string;
}) {
  return (
    <div>
      <div className="overflow-x-auto rounded-2xl border border-[#e5e9e7] bg-white shadow-[0_1px_2px_rgba(16,37,27,0.04),0_8px_24px_rgba(16,37,27,0.05)]">
        <table className="w-full min-w-[560px] border-collapse text-sm">
          <thead>
            <tr>
              <th className="sticky left-0 z-20 w-44 border-b border-[#e5e9e7] bg-white px-4 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-[#9aa39c]">
                {firstColLabel}
              </th>
              {columns.map((c, j) => (
                <th
                  key={j}
                  className="border-b border-[#e5e9e7] px-4 py-4 text-center align-bottom"
                  style={c.highlight ? { background: TINT } : undefined}
                >
                  {c.badge && (
                    <span
                      className="mb-1.5 inline-block rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.1em] text-white"
                      style={{ background: GREEN }}
                    >
                      {c.badge}
                    </span>
                  )}
                  <span className={`block text-sm font-extrabold ${c.highlight ? "text-[#0a7c42]" : "text-[#10251b]"}`}>
                    {c.name}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="group border-b border-[#e5e9e7] last:border-0">
                <th
                  scope="row"
                  className="sticky left-0 z-10 bg-white px-4 py-3 text-left text-xs font-medium leading-snug text-[#3d4b44] transition-colors group-hover:bg-[#f5f8f6]"
                >
                  {r.label}
                  {r.note && <span className="mt-0.5 block text-[10px] font-normal text-[#9aa39c]">{r.note}</span>}
                </th>
                {r.vals.map((v, j) => (
                  <td
                    key={j}
                    className="px-4 py-3 text-center transition-colors group-hover:bg-[#f5f8f6]"
                    style={columns[j]?.highlight ? { background: TINT } : undefined}
                  >
                    {typeof v === "boolean" ? (
                      v ? (
                        <Check className="mx-auto h-4 w-4" style={{ color: GREEN }} aria-label="Yes" />
                      ) : (
                        <Minus className="mx-auto h-3.5 w-3.5 text-[#c7cec9]" aria-label="No" />
                      )
                    ) : (
                      <span className="text-xs text-[#3d4b44]">{v}</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {footnote && <p className="mt-3 text-[10px] leading-relaxed text-[#9aa39c]">{footnote}</p>}
    </div>
  );
}
