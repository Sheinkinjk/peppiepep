import { INCLUSIONS, INCLUSIONS_READ_ON, type InclusionsKey } from "@/content/hims/inclusions";
import { MOSH } from "@/content/hims/config";
import { Flag } from "./ui";

/**
 * The dated "What does each include?" table for Hims and Mosh (30 Sep 2026), on
 * the pattern of src/components/consumer/WeightInclusionsTable.tsx. Rows come from
 * src/content/hims/inclusions.ts. Columns are alphabetical and there is no winner
 * column. A Mosh cell with no fact yet (null) renders a muted "To be added", and a
 * column with no facts at all (Mosh ED, 1 Oct 2026) is shaded as a placeholder.
 */
export function InclusionsTable({
  table,
  preview,
  rows,
  caption,
}: {
  table: InclusionsKey;
  preview: boolean;
  /** Show only these rows, in this order (the /hims-vs-mosh panels). Omit for the whole table. */
  rows?: string[];
  /** Visually hidden table caption, for screen readers. */
  caption?: string;
}) {
  const data = INCLUSIONS[table];
  const shown = rows
    ? rows.map((label) => {
        const r = data.rows.find((x) => x.label === label);
        // A typo in a panel's row list must fail the build, not drop a row silently.
        if (!r) throw new Error(`InclusionsTable: no "${label}" row in the ${table} table`);
        return r;
      })
    : data.rows;
  // The weight table compares Moshy, Mosh's partner brand for weight (Jarred, 30 Sep 2026).
  const other = table === "weight" ? MOSH.weight.name : "Mosh";
  const otherPending = shown.every((r) => r.mosh === null);
  const pendingCell = "bg-[#f7f4ee] text-[#8a8379]";
  return (
    <div>
      <div className="overflow-x-auto rounded-xl border border-[#ded8cd] bg-white">
        <table className="w-full min-w-[560px] text-left text-sm leading-relaxed">
          {caption ? <caption className="sr-only">{caption}</caption> : null}
          <thead>
            <tr className="bg-[#f7f4ee]">
              <th scope="col" className="w-40 px-4 py-3 font-semibold text-[#56504a]">
                <span className="sr-only">Feature</span>
              </th>
              <th scope="col" className="px-4 py-3 font-black text-[#14120f]">Hims</th>
              <th scope="col" className={`px-4 py-3 font-black ${otherPending ? "text-[#8a8379]" : "text-[#14120f]"}`}>{other}</th>
            </tr>
          </thead>
          <tbody>
            {shown.map((r) => (
              <tr key={r.label} className="border-t border-[#ded8cd] align-top">
                <th scope="row" className="px-4 py-3 font-medium text-[#56504a]">{r.label}</th>
                <td className="px-4 py-3 text-[#14120f]">
                  {r.hims}
                  <Flag show={preview && !!r.himsFlag}>{r.himsFlag}</Flag>
                </td>
                <td className={`px-4 py-3 ${r.mosh === null ? pendingCell : "text-[#14120f]"}`}>
                  {r.mosh === null ? (
                    <span className="italic">To be added</span>
                  ) : (
                    <>
                      {r.mosh}
                      <Flag show={preview && !!r.moshFlag}>{r.moshFlag}</Flag>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-[12px] leading-relaxed text-[#56504a]">
        Read off each provider&apos;s own pages on {INCLUSIONS_READ_ON}. Hims:{" "}
        {data.sources.hims.map((s, i) => (
          <span key={s.url}>
            {i > 0 ? ", " : ""}
            <a href={s.url} rel="nofollow noopener" target="_blank" className="underline decoration-[#ded8cd] underline-offset-2">
              {s.label}
            </a>
          </span>
        ))}
        . {other}:{" "}
        {data.sources.mosh.length === 0 ? "details to be added" : null}
        {data.sources.mosh.map((s, i) => (
          <span key={s.url}>
            {i > 0 ? ", " : ""}
            <a href={s.url} rel="nofollow noopener" target="_blank" className="underline decoration-[#ded8cd] underline-offset-2">
              {s.label}
            </a>
          </span>
        ))}
        . Scroll sideways on a phone to see both columns.
      </p>
    </div>
  );
}
