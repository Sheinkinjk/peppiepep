"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

import { GROUPS, DIRECT } from "@/lib/nav";

/**
 * The header below lg, showing the same categories as the desktop dropdowns.
 *
 * It used to be a separate flat list that mixed brand pages with categories, so
 * a phone visitor met "Moshy · Weight Loss · Mosh · Hair Loss" where a desktop
 * visitor met six category menus. Same source now (src/lib/nav.ts), same labels,
 * same order.
 *
 * Tapping a category opens its links in a panel underneath rather than
 * navigating, which is what the chevron promises. The panel mounts only while
 * open (14 Sep 2026): the desktop HeaderNav already puts every category link in
 * the server HTML for crawlers, so rendering them a second time here shipped the
 * whole nav twice on every page for no gain.
 */
export default function MobileNav() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="lg:hidden">
      <nav
        aria-label="Categories"
        className="-my-1 flex gap-1 overflow-x-auto pr-8 text-[13px] font-medium text-[#3d4b44] [mask-image:linear-gradient(to_right,black_82%,transparent)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {GROUPS.map((g) => {
          const isOpen = open === g.label;
          return (
            <button
              key={g.label}
              type="button"
              onClick={() => setOpen(isOpen ? null : g.label)}
              aria-expanded={isOpen}
              className={`inline-flex min-h-[44px] shrink-0 items-center gap-1 whitespace-nowrap rounded-lg px-3 py-2.5 transition-colors ${
                isOpen ? "bg-[#f0f5f2] text-[#0a7c42]" : "hover:bg-[#f5f8f6] hover:text-[#0a7c42]"
              }`}
            >
              {g.label}
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>
          );
        })}
        {DIRECT.map((it) => (
          <Link
            key={it.href}
            href={it.href}
            className="inline-flex min-h-[44px] shrink-0 items-center whitespace-nowrap rounded-lg px-3 py-2.5 transition-colors hover:bg-[#f5f8f6] hover:text-[#0a7c42]"
          >
            {it.label}
          </Link>
        ))}
      </nav>

      {GROUPS.filter((g) => g.label === open).map((g) => {
        return (
          <div key={g.label} className="mt-2 border-t border-[#eef1ef] pt-2">
            {g.items.map((it) => (
              <Link
                key={it.href}
                href={it.href}
                onClick={() => setOpen(null)}
                className="block rounded-xl px-2.5 py-2.5 transition-colors active:bg-[#f2f4ee]"
              >
                <span className="block text-[14px] font-semibold text-[#10251b]">{it.label}</span>
                {it.note && <span className="mt-0.5 block text-[12.5px] leading-snug text-[#5a665f]">{it.note}</span>}
              </Link>
            ))}
          </div>
        );
      })}
    </div>
  );
}
