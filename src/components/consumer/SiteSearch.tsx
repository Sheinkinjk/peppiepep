"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowRight } from "lucide-react";
import { searchEntries, type SearchEntry } from "@/lib/search-index";

const POPULAR = ["Weight loss", "Website builders", "Moshy review", "Newsletters"];

/**
 * NerdWallet-style site search. variant "hero" is large and prominent;
 * "header" is compact. Filters a static index and routes on select.
 */
export default function SiteSearch({ variant = "hero" }: { variant?: "hero" | "header" }) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const router = useRouter();
  const wrapRef = useRef<HTMLDivElement>(null);

  const results: SearchEntry[] = q ? searchEntries(q) : [];

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  function go(href: string) {
    setOpen(false);
    setQ("");
    router.push(href);
  }

  function onKey(e: React.KeyboardEvent) {
    if (!open || results.length === 0) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => (a + 1) % results.length); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => (a - 1 + results.length) % results.length); }
    else if (e.key === "Enter") { e.preventDefault(); go(results[active].href); }
    else if (e.key === "Escape") setOpen(false);
  }

  const big = variant === "hero";

  return (
    <div ref={wrapRef} className={`relative ${big ? "w-full max-w-xl" : "w-full max-w-xs"}`}>
      <div className={`nw-search ${big ? "" : "!py-2 !px-4"}`}>
        <Search className={`shrink-0 text-[#6e7b74] ${big ? "h-5 w-5" : "h-4 w-4"}`} />
        <input
          value={q}
          onChange={(e) => { setQ(e.target.value); setOpen(true); setActive(0); }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKey}
          placeholder={big ? "Search — try 'weight loss' or 'website builder'" : "Search comparisons"}
          aria-label="Search comparisons"
          className={big ? "!text-[15px]" : "!text-sm"}
        />
      </div>

      {open && (
        <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-2xl border border-[#e5e9e7] bg-white shadow-[0_20px_50px_-20px_rgba(16,37,27,0.35)]">
          {results.length > 0 ? (
            <ul className="max-h-[22rem] overflow-y-auto py-1.5">
              {results.map((r, i) => (
                <li key={r.href}>
                  <button
                    onMouseEnter={() => setActive(i)}
                    onClick={() => go(r.href)}
                    className={`flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left ${i === active ? "bg-[#f5f8f6]" : ""}`}
                  >
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold text-[#10251b]">{r.title}</span>
                      <span className="text-xs text-[#6e7b74]">{r.category} · {r.kind}</span>
                    </span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-[#0a7c42]" />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#9aa39c]">Popular</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {POPULAR.map((p) => (
                  <button key={p} onClick={() => { setQ(p); setActive(0); }} className="rounded-full border border-[#e5e9e7] bg-white px-3 py-1.5 text-[13px] font-medium text-[#3d4b44] hover:border-[#bfe0cf] hover:bg-[#e8f5ee]">
                    {p}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
