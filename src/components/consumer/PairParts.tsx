import type { ReactNode } from "react";

/**
 * Shared furniture for the business-software pair pages (4 Oct 2026).
 *
 * Layout only. Every word of copy is passed in by the page, so seven pages built
 * on these parts do not share a sentence skeleton. The h1, the lead and the
 * buyer-question h2 stay in each page.tsx, where check-aeo and check-answer-slot
 * can see them.
 */

export type FactRow = { label: string; cells: ReactNode[] };

export function FactsTable({
  columns,
  rows,
  caption,
  readOn,
}: {
  /** Provider names, one per column after the row label. */
  columns: string[];
  rows: FactRow[];
  caption: string;
  /** Printed in the header, so every row in a long table sits near its date. */
  readOn: string;
}) {
  return (
    <div className="mt-5 overflow-x-auto rounded-2xl border border-[#ded8cd] bg-white">
      <table className="w-full min-w-[560px] border-collapse text-left text-sm">
        <caption className="px-5 pt-4 text-left text-[13px] leading-relaxed text-[#56504a]">{caption}</caption>
        <thead>
          <tr className="border-b border-[#ded8cd]">
            <th scope="col" className="px-5 py-3 text-[13px] font-semibold text-[#56504a]">
              Read {readOn}
            </th>
            {columns.map((c) => (
              <th key={c} scope="col" className="px-5 py-3 text-[15px] font-bold text-[#14120f]">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label} className="border-b border-[#f1ede4] align-top last:border-0">
              <th scope="row" className="px-5 py-3 font-semibold text-[#14120f]">
                {r.label}
                {/* A row carrying a price prints its read date beside it, so the
                    figure is never further than one row from its date. */}
                {r.cells.some((c) => typeof c === "string" && /\$\s?\d/.test(c)) ? (
                  <span className="mt-0.5 block text-[12px] font-normal text-[#56504a]">read {readOn}</span>
                ) : null}
              </th>
              {r.cells.map((c, i) => (
                <td key={i} className="px-5 py-3 leading-relaxed text-[#56504a]">
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ChooseLists({ sides }: { sides: { name: string; items: string[] }[] }) {
  return (
    <section className="mt-14 grid gap-4 sm:grid-cols-2">
      {sides.map((s) => (
        <div key={s.name} className="rounded-2xl border border-[#ded8cd] bg-[#f7f4ee] p-6">
          <h2 className="text-lg font-bold text-[#14120f]">Choose {s.name} if</h2>
          <ul className="mt-3 space-y-2 text-[15px] leading-relaxed text-[#56504a]">
            {s.items.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}

export function PairFaqs({ heading, faqs, children }: { heading: string; faqs: { q: string; a: string }[]; children?: ReactNode }) {
  return (
    <section className="mt-14 max-w-3xl">
      <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#14120f] sm:text-3xl">{heading}</h2>
      <div className="mt-5 divide-y divide-[#ded8cd] border-y border-[#ded8cd]">
        {faqs.map((f) => (
          <details key={f.q} className="group py-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-[#14120f]">
              {f.q}
              <span aria-hidden className="text-xl leading-none text-[#007a95] transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 text-[15px] leading-relaxed text-[#56504a]">{f.a}</p>
          </details>
        ))}
      </div>
      {children}
    </section>
  );
}

export function PairSources({ sources, readOn }: { sources: { label: string; url: string }[]; readOn: string }) {
  return (
    <section className="mt-14 max-w-3xl">
      <h2 className="text-xl font-bold text-[#14120f]">Sources</h2>
      <p className="mt-2 text-[13px] leading-relaxed text-[#56504a]">
        Each page below is the vendor&apos;s own, read on {readOn}. Prices are shown in the currency and on the tax basis
        each vendor prints, and are not converted or added together.
      </p>
      <ul className="mt-3 space-y-1.5 text-[13px] leading-relaxed text-[#56504a]">
        {sources.map((s) => (
          <li key={s.url}>
            {s.label}:{" "}
            <a href={s.url} target="_blank" rel="nofollow noopener" className="break-all underline underline-offset-2 hover:text-[#14120f]">
              {s.url.replace(/^https?:\/\//, "")}
            </a>
            , read {readOn}
          </li>
        ))}
      </ul>
    </section>
  );
}
