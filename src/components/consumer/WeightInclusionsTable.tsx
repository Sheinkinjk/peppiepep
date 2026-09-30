import { INCLUSIONS_READ_ON, INCLUSIONS_SOURCES, WEIGHT_INCLUSIONS } from "@/lib/compare/weight-inclusions";

/**
 * The dated "what each includes" table for Juniper and Moshy (30 Sep 2026).
 * Rows come from src/lib/compare/weight-inclusions.ts so every comparison page
 * shows the same facts. Columns are alphabetical; there is no winner column.
 */
export default function WeightInclusionsTable({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <div className="overflow-x-auto rounded-xl border border-[#ded8cd] bg-white">
        <table className="w-full min-w-[560px] text-left text-sm leading-relaxed">
          <thead>
            <tr className="bg-[#f7f4ee]">
              <th scope="col" className="w-40 px-4 py-3 font-semibold text-[#56504a]"><span className="sr-only">Feature</span></th>
              <th scope="col" className="px-4 py-3 font-black text-[#14120f]">Juniper</th>
              <th scope="col" className="px-4 py-3 font-black text-[#14120f]">Moshy</th>
            </tr>
          </thead>
          <tbody>
            {WEIGHT_INCLUSIONS.map((r) => (
              <tr key={r.label} className="border-t border-[#ded8cd] align-top">
                <th scope="row" className="px-4 py-3 font-medium text-[#56504a]">{r.label}</th>
                <td className="px-4 py-3 text-[#14120f]">{r.juniper}</td>
                <td className="px-4 py-3 text-[#14120f]">{r.moshy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-[12px] leading-relaxed text-[#56504a]">
        Read off{" "}
        <a href={INCLUSIONS_SOURCES.Juniper} rel="nofollow noopener" target="_blank" className="underline decoration-[#ded8cd] underline-offset-2">
          Juniper&apos;s
        </a>{" "}
        and{" "}
        <a href={INCLUSIONS_SOURCES.Moshy} rel="nofollow noopener" target="_blank" className="underline decoration-[#ded8cd] underline-offset-2">
          Moshy&apos;s
        </a>{" "}
        own pages, {INCLUSIONS_READ_ON}. The JARREDKFC value is from Juniper&apos;s affiliate handbook. Scroll sideways on a
        phone to see both columns.
      </p>
    </div>
  );
}
