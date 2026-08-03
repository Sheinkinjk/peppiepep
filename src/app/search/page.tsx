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
        <h1 className="text-3xl font-black tracking-[-0.02em] text-[#10251b] sm:text-4xl">Search</h1>

        {query ? (
          <p className="mt-3 text-[15px] text-[#6e7b74]">
            {results.length} result{results.length === 1 ? "" : "s"} for{" "}
            <span className="font-semibold text-[#10251b]">&ldquo;{query}&rdquo;</span>
          </p>
        ) : (
          <p className="mt-3 text-[15px] text-[#6e7b74]">
            Search our comparisons, guides and deals across Australian health, home energy, business finance and software.
          </p>
        )}

        {query && results.length === 0 && (
          <p className="mt-8 text-[15px] leading-relaxed text-[#3d4b44]">
            No matches for that search. Browse the{" "}
            <Link href="/guides" className="font-semibold text-[#0a7c42] hover:underline">full guide index</Link> instead.
          </p>
        )}

        {results.length > 0 && (
          <ul className="mt-8 divide-y divide-[#e5e9e7]">
            {results.map((r) => (
              <li key={r.href}>
                <Link href={r.href} className="group flex items-center justify-between gap-3 py-4">
                  <span className="min-w-0">
                    <span className="block text-[17px] font-bold leading-snug text-[#10251b] transition-colors group-hover:text-[#0a7c42]">
                      {r.title}
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#9aa39c]">{r.category}</span>
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-[#0a7c42] transition-transform group-hover:translate-x-0.5" />
                </Link>
              </li>
            ))}
          </ul>
        )}

        <Link
          href="/guides"
          className="mt-10 inline-flex items-center gap-1 text-sm font-semibold text-[#0a7c42] hover:text-[#086536]"
        >
          Browse all guides <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </main>
    </ConsumerShell>
  );
}
