import { INCLUSIONS, INCLUSIONS_READ_ON, type InclusionsKey } from "@/content/hims/inclusions";
import { MOSH } from "@/content/hims/config";
import { Flag } from "./ui";

/**
 * The dated "What does each include?" table for Hims and Mosh (30 Sep 2026), on
 * the pattern of src/components/consumer/WeightInclusionsTable.tsx. Rows come from
 * src/content/hims/inclusions.ts. Columns are alphabetical and there is no winner
 * column. A Mosh cell with no verified fact renders "Awaiting Mosh" with a flag.
 */
export function InclusionsTable({ table, preview }: { table: InclusionsKey; preview: boolean }) {
  const data = INCLUSIONS[table];
  // The weight table compares Moshy, Mosh's partner brand for weight (Jarred, 30 Sep 2026).
  const other = table === "weight" ? MOSH.weight.name : "Mosh";
  return (
    <div>
      <div className="overflow-x-auto rounded-xl border border-[#ded8cd] bg-white">
        <table className="w-full min-w-[560px] text-left text-sm leading-relaxed">
          <thead>
            <tr className="bg-[#f7f4ee]">
              <th scope="col" className="w-40 px-4 py-3 font-semibold text-[#56504a]">
                <span className="sr-only">Feature</span>
              </th>
              <th scope="col" className="px-4 py-3 font-black text-[#14120f]">Hims</th>
              <th scope="col" className="px-4 py-3 font-black text-[#14120f]">{other}</th>
            </tr>
          </thead>
          <tbody>
            {data.rows.map((r) => (
              <tr key={r.label} className="border-t border-[#ded8cd] align-top">
                <th scope="row" className="px-4 py-3 font-medium text-[#56504a]">{r.label}</th>
                <td className="px-4 py-3 text-[#14120f]">
                  {r.hims}
                  <Flag show={preview && !!r.himsFlag}>{r.himsFlag}</Flag>
                </td>
                <td className="px-4 py-3 text-[#14120f]">
                  {r.mosh === null ? (
                    preview ? <Flag show>Awaiting Mosh</Flag> : "Awaiting Mosh"
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
