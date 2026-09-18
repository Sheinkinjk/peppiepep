"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

import { GROUPS, DIRECT } from "@/lib/nav";

export default function HeaderNav() {
  const [open, setOpen] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(null);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(null);
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <nav ref={ref} className="hidden items-center gap-1 text-[14px] font-medium text-[#56504a] lg:flex">
      {GROUPS.map((g) => {
        const isOpen = open === g.label;
        return (
          <div key={g.label} className="relative" onMouseEnter={() => setOpen(g.label)} onMouseLeave={() => setOpen(null)}>
            <button
              onClick={() => setOpen(isOpen ? null : g.label)}
              aria-expanded={isOpen}
              className={`flex items-center gap-1 rounded-lg px-3 py-2 transition-colors hover:text-[#007a95] ${isOpen ? "text-[#007a95]" : ""}`}
            >
              {g.label}
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>
            {/* Rendered in the DOM always (not behind `isOpen &&`) so the category
                links are in the server HTML and Google can crawl them. Visibility is
                toggled with CSS, and pointer-events-none stops the hidden menu
                capturing clicks. */}
            <div
              className={`absolute left-0 top-full w-72 pt-2 transition-opacity duration-150 ${
                isOpen ? "visible opacity-100" : "invisible opacity-0 pointer-events-none"
              }`}
            >
              <div className="overflow-hidden rounded-2xl border border-[#ded8cd] bg-white p-1.5 shadow-[0_20px_50px_-20px_rgba(20,18,15,0.35)]">
                {g.items.map((it) => (
                  <Link
                    key={it.href}
                    href={it.href}
                    tabIndex={isOpen ? 0 : -1}
                    onClick={() => setOpen(null)}
                    className="block rounded-xl px-3 py-2.5 transition-colors hover:bg-[#f7f4ee]"
                  >
                    <span className="block text-[14px] font-semibold text-[#14120f]">{it.label}</span>
                    {it.note && <span className="mt-0.5 block text-[12.5px] text-[#56504a]">{it.note}</span>}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        );
      })}
      {DIRECT.map((it) => (
        <Link key={it.href} href={it.href} className="rounded-lg px-3 py-2 transition-colors hover:text-[#007a95]">
          {it.label}
        </Link>
      ))}
    </nav>
  );
}
