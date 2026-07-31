"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search, ArrowRight, CornerDownLeft, Activity, Scissors, Zap,
  Banknote, AppWindow, Tag, Compass, LayoutGrid,
} from "lucide-react";
import { searchEntries, type SearchEntry } from "@/lib/search-index";

// Curated "browse" shortcuts for the empty and no-match states.
const BROWSE: { label: string; href: string; cat: string }[] = [
  { label: "Weight loss & telehealth", href: "/weight-loss", cat: "Weight loss" },
  { label: "Hair loss treatment", href: "/hair-loss", cat: "Hair loss" },
  { label: "Home batteries & solar", href: "/apollo-energy-group", cat: "Home & energy" },
  { label: "Business loans", href: "/business-loans", cat: "Business finance" },
  { label: "Business software", href: "/business-software", cat: "Software" },
  { label: "All guides", href: "/guides", cat: "Browse" },
];

// Category -> small tinted icon tile. Encodes the vertical at a glance, which is
// what turns a flat text list into something scannable.
type Tile = { Icon: typeof Activity; fg: string; bg: string };
function tileFor(category: string, kind: SearchEntry["kind"]): Tile {
  const c = category.toLowerCase();
  if (c.includes("weight") || c === "health") return { Icon: Activity, fg: "#0a7c42", bg: "#e8f5ee" };
  if (c.includes("hair")) return { Icon: Scissors, fg: "#0a7c42", bg: "#e8f5ee" };
  if (c.includes("energy") || c.includes("home")) return { Icon: Zap, fg: "#b45309", bg: "#fbeedd" };
  if (c.includes("finance") || c.includes("lend")) return { Icon: Banknote, fg: "#1d4ed8", bg: "#e7edfd" };
  if (c.includes("deal")) return { Icon: Tag, fg: "#be123c", bg: "#fde7ec" };
  if (c.includes("software") || c.includes("sales") || c.includes("creator") || c.includes("commerce") || c.includes("payment") || c.includes("ai"))
    return { Icon: AppWindow, fg: "#6d28d9", bg: "#f0e9fd" };
  if (kind === "Category" || c.includes("browse")) return { Icon: LayoutGrid, fg: "#475569", bg: "#eef1f4" };
  return { Icon: Compass, fg: "#475569", bg: "#eef1f4" };
}

const KIND_ORDER: Record<SearchEntry["kind"], number> = { Category: 0, Guide: 1, Review: 2 };
const KIND_LABEL: Record<SearchEntry["kind"], string> = {
  Category: "Categories",
  Guide: "Guides & comparisons",
  Review: "Reviews",
};

// Bold the matched query inside a title without dangerouslySetInnerHTML.
function highlight(title: string, q: string) {
  const t = q.trim();
  if (!t) return title;
  const i = title.toLowerCase().indexOf(t.toLowerCase());
  if (i === -1) return title;
  return (
    <>
      {title.slice(0, i)}
      <mark className="bg-transparent font-bold text-[#10251b]">{title.slice(i, i + t.length)}</mark>
      {title.slice(i + t.length)}
    </>
  );
}

/**
 * Site search. variant "hero" is large and prominent; "header" is compact.
 * Filters a static index, groups results by kind, and routes on select.
 */
export default function SiteSearch({ variant = "hero" }: { variant?: "hero" | "header" }) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const router = useRouter();
  const wrapRef = useRef<HTMLDivElement>(null);
  const big = variant === "hero";

  // Results in display order (Categories first), so keyboard nav matches the eye.
  const ordered = useMemo(() => {
    if (!q.trim()) return [];
    return [...searchEntries(q, 9)].sort((a, b) => KIND_ORDER[a.kind] - KIND_ORDER[b.kind]);
  }, [q]);

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
    if (e.key === "Escape") { setOpen(false); return; }
    if (!open || ordered.length === 0) {
      if (e.key === "Enter" && q.trim()) { e.preventDefault(); go("/guides"); }
      return;
    }
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => (a + 1) % ordered.length); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => (a - 1 + ordered.length) % ordered.length); }
    else if (e.key === "Enter") { e.preventDefault(); go(ordered[active].href); }
  }

  const hasQuery = q.trim().length > 0;

  return (
    <div ref={wrapRef} className={`relative ${big ? "w-full max-w-xl" : "w-full max-w-xs"}`}>
      <div className={`nw-search ${big ? "" : "!py-2 !px-4"}`}>
        <Search className={`shrink-0 text-[#6e7b74] ${big ? "h-5 w-5" : "h-4 w-4"}`} />
        <input
          value={q}
          onChange={(e) => { setQ(e.target.value); setOpen(true); setActive(0); }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKey}
          placeholder={big ? "Search comparisons, guides and deals" : "Search"}
          aria-label="Search comparisons"
          className={big ? "!text-[15px]" : "!text-sm"}
        />
      </div>

      {open && (
        <div className={`absolute top-[calc(100%+8px)] z-[60] overflow-hidden rounded-2xl border border-[#e5e9e7] bg-white shadow-[0_24px_60px_-24px_rgba(16,37,27,0.4)] ${big ? "left-0 right-0" : "right-0 w-[22rem]"}`}>
          {/* ── Results ── */}
          {hasQuery && ordered.length > 0 && (
            <ul className="max-h-[24rem] overflow-y-auto py-1.5">
              {ordered.map((r, i) => {
                const t = tileFor(r.category, r.kind);
                const showHeader = i === 0 || ordered[i - 1].kind !== r.kind;
                return (
                  <li key={r.href}>
                    {showHeader && (
                      <p className="px-4 pb-1 pt-2.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#9aa39c]">
                        {KIND_LABEL[r.kind]}
                      </p>
                    )}
                    <button
                      onMouseEnter={() => setActive(i)}
                      onClick={() => go(r.href)}
                      className={`flex w-full items-center gap-3 px-3 py-2 text-left transition-colors ${i === active ? "bg-[#f5f8f6]" : ""}`}
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: t.bg }}>
                        <t.Icon className="h-[18px] w-[18px]" style={{ color: t.fg }} aria-hidden="true" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-semibold text-[#10251b]">{highlight(r.title, q)}</span>
                        <span className="text-xs text-[#6e7b74]">{r.category}</span>
                      </span>
                      <ArrowRight className={`h-4 w-4 shrink-0 transition-opacity ${i === active ? "text-[#0a7c42] opacity-100" : "opacity-0"}`} />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}

          {/* ── No matches ── */}
          {hasQuery && ordered.length === 0 && (
            <div className="px-4 pb-1 pt-4">
              <p className="text-sm text-[#3d4b44]">
                No matches for <span className="font-semibold text-[#10251b]">&ldquo;{q.trim()}&rdquo;</span>. Browse instead:
              </p>
              <div className="mt-2 grid grid-cols-2 gap-1">
                {BROWSE.map((b) => {
                  const t = tileFor(b.cat, "Category");
                  return (
                    <button key={b.href} onClick={() => go(b.href)}
                      className="group flex items-center gap-2.5 rounded-xl px-2 py-2 text-left transition-colors hover:bg-[#f5f8f6]">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: t.bg }}>
                        <t.Icon className="h-4 w-4" style={{ color: t.fg }} aria-hidden="true" />
                      </span>
                      <span className="truncate text-[13px] font-semibold text-[#10251b] group-hover:text-[#0a7c42]">{b.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── Empty state (no query): browse shortcuts ── */}
          {!hasQuery && (
            <div className="px-4 py-3.5">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#9aa39c]">Browse</p>
              <div className="mt-2 grid grid-cols-2 gap-1">
                {BROWSE.map((b) => {
                  const t = tileFor(b.cat, "Category");
                  return (
                    <button key={b.href} onClick={() => go(b.href)}
                      className="group flex items-center gap-2.5 rounded-xl px-2 py-2 text-left transition-colors hover:bg-[#f5f8f6]">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: t.bg }}>
                        <t.Icon className="h-4 w-4" style={{ color: t.fg }} aria-hidden="true" />
                      </span>
                      <span className="truncate text-[13px] font-semibold text-[#10251b] group-hover:text-[#0a7c42]">{b.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── Footer: keyboard hints + all guides ── */}
          <div className="flex items-center justify-between border-t border-[#eef1ef] bg-[#fafcfb] px-4 py-2">
            <span className="hidden items-center gap-3 text-[11px] text-[#9aa39c] sm:flex">
              <span className="inline-flex items-center gap-1"><kbd className="rounded border border-[#e5e9e7] bg-white px-1 font-sans text-[10px]">↑</kbd><kbd className="rounded border border-[#e5e9e7] bg-white px-1 font-sans text-[10px]">↓</kbd> navigate</span>
              <span className="inline-flex items-center gap-1"><kbd className="rounded border border-[#e5e9e7] bg-white px-1 font-sans text-[10px]"><CornerDownLeft className="h-2.5 w-2.5" /></kbd> open</span>
            </span>
            <button onClick={() => go("/guides")} className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-[#0a7c42] hover:text-[#086536]">
              {hasQuery && ordered.length > 0 ? `See all ${ordered.length > 8 ? "results" : "guides"}` : "All guides"}
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
