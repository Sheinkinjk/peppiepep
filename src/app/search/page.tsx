import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import { searchEntries } from "@/lib/search-index";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";

export const metadata = generateSEOMetadata(seoConfig.search);

// Real search results page. Makes the WebSite SearchAction (?q=) resolve to a
// working page, and gives the header search a "see all results" destination.
// Uses the existing static index (searchEntries) — no new data, no fabrication.
export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const query = q.trim();
  const results = query ? searchEntries(query, 30) : [];

  return (
    <ConsumerShell>
      <main id="main-content" className="mx-auto max-w-3xl px-5 py-14 sm:px-8">
        <h1 className="text-3xl font-black tracking-[-0.02em] text-[#14120f] sm:text-4xl">Search</h1>

        {query ? (
          <p className="mt-3 text-[15px] text-[#56504a]">
            {results.length} result{results.length === 1 ? "" : "s"} for{" "}
            <span className="font-semibold text-[#14120f]">&ldquo;{query}&rdquo;</span>
          </p>
        ) : (
          <p className="mt-3 text-[15px] text-[#56504a]">
            Search our comparisons, guides and deals across Australian health, home energy, business finance and software.
          </p>
        )}

        {query && results.length === 0 && (
          <p className="mt-8 text-[15px] leading-relaxed text-[#56504a]">
            No matches for that search. Browse the{" "}
            <Link href="/guides" className="font-semibold text-[#007a95] hover:underline">full guide index</Link> instead.
          </p>
        )}

        {results.length > 0 && (
          <ul className="mt-8 divide-y divide-[#ded8cd]">
            {results.map((r) => (
              <li key={r.href}>
                <Link href={r.href} className="group flex items-center justify-between gap-3 py-4">
                  <span className="min-w-0">
                    <span className="block text-[17px] font-bold leading-snug text-[#14120f] transition-colors group-hover:text-[#007a95]">
                      {r.title}
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#56504a]">{r.category}</span>
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-[#007a95] transition-transform group-hover:translate-x-0.5" />
                </Link>
              </li>
            ))}
          </ul>
        )}

        <Link
          href="/guides"
          className="mt-10 inline-flex items-center gap-1 text-sm font-semibold text-[#007a95] hover:text-[#003647]"
        >
          Browse all guides <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </main>
    </ConsumerShell>
  );
}
