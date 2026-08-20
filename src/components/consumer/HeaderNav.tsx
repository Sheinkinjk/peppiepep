"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

type Item = { href: string; label: string; note?: string };
type Group = { label: string; items: Item[] };

/**
 * Grouped dropdown shortcuts + direct links for the consumer header.
 *
 * Weighted to where the revenue actually is (Aug 2026). Weight loss and hair
 * loss earn effectively all of it and rank on page one, so they get their own
 * headers and lead with the offer pages rather than the hubs, which rank far
 * lower and were absorbing the clicks. Business software and lending are merged
 * into a single trailing group: they hold impressions but convert almost
 * nothing, so they keep their pages and lose the shelf space.
 */
const GROUPS: Group[] = [
  {
    label: "Weight Loss",
    items: [
      { href: "/moshy", label: "Moshy", note: "How the program works, plus $120 off your first order" },
      { href: "/juniper", label: "Juniper", note: "Built for women, with a free first consultation" },
      { href: "/best-weight-loss-telehealth-australia", label: "Compare all providers", note: "Pricing, eligibility and who each suits" },
      { href: "/weight-loss-quiz", label: "Which pathway fits you?", note: "A 60-second match, no sign-up" },
    ],
  },
  {
    label: "Hair Loss",
    items: [
      { href: "/moshhair", label: "Mosh", note: "How it works, plus 55% off your first order" },
      { href: "/best-hair-loss-treatment-australia", label: "Compare all options", note: "Clinical telehealth vs topical products" },
      { href: "/mosh-vs-pilot", label: "Mosh vs Pilot", note: "Which should you choose" },
      { href: "/hair-loss-treatment-cost-australia", label: "What treatment costs", note: "What you pay and what is included" },
      { href: "/hair-loss-quiz", label: "Which option fits you?", note: "A 30-second match" },
    ],
  },
  {
    label: "Home & Energy",
    items: [
      { href: "/apollo-energy-group", label: "Home Batteries", note: "Apollo Energy Group, sized to your usage" },
      { href: "/home-battery-rebate-australia", label: "Battery Rebate 2026", note: "What the federal rebate actually pays" },
      { href: "/home-battery-payback-calculator", label: "Payback Calculator", note: "Estimate your saving and payback period" },
      { href: "/home-battery-cost-australia", label: "What a Battery Costs", note: "Installed price ranges and realistic payback" },
    ],
  },
  {
    label: "Pets",
    items: [
      { href: "/best-pet-insurance-australia", label: "How to choose", note: "The six things that decide what you get back" },
      { href: "/knose", label: "Knose", note: "2 months free for new customers" },
      { href: "/petsonme", label: "PetsOnMe", note: "Three cover levels, plus the REFERLABS code" },
      { href: "/pet-insurance", label: "Compare all", note: "Pet insurance cover explained, plus current offers" },
    ],
  },
  // Merged and placed last. Every page below stays live and reachable; the full
  // set lives on the two hubs and the /compare category pages.
  {
    label: "Business",
    items: [
      { href: "/business-software", label: "Business Software", note: "CRM, email, AI and website tools, compared" },
      { href: "/business-loans", label: "Business Loans", note: "Compare Australian lenders in one enquiry" },
      { href: "/best-ai-sales-tools", label: "Sales, CRM & Outreach", note: "GoHighLevel, Pipedrive, Reply.io" },
      { href: "/affiliate-programs-australia", label: "Affiliate Programs", note: "The best programs to join in 2026" },
      { href: "/for-business", label: "Partner with us", note: "Get discovered, generate leads, build distribution" },
    ],
  },
  // Sections built ahead of their partners live together under one heading
  // rather than as separate top-level groups. Two half-empty categories in the
  // nav reads as an unfinished site; one honest "Coming soon" reads as a
  // roadmap. Each becomes its own group when it has a checked provider.
  {
    label: "Coming Soon",
    items: [
      { href: "/coming-soon", label: "What's Coming", note: "The sections we're building, and when" },
      { href: "/skin-and-beauty", label: "Skin & Beauty", note: "Actives, device prices, and the prescription route" },
      { href: "/sleep", label: "Sleep", note: "Apnoea diagnosis, CPAP costs, mattresses" },
    ],
  },
];

const DIRECT: Item[] = [
  { href: "/guides", label: "All Guides" },
];

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
    <nav ref={ref} className="hidden items-center gap-1 text-[14px] font-medium text-[#3d4b44] lg:flex">
      {GROUPS.map((g) => {
        const isOpen = open === g.label;
        return (
          <div key={g.label} className="relative" onMouseEnter={() => setOpen(g.label)} onMouseLeave={() => setOpen(null)}>
            <button
              onClick={() => setOpen(isOpen ? null : g.label)}
              aria-expanded={isOpen}
              className={`flex items-center gap-1 rounded-lg px-3 py-2 transition-colors hover:text-[#0a7c42] ${isOpen ? "text-[#0a7c42]" : ""}`}
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
              <div className="overflow-hidden rounded-2xl border border-[#e5e9e7] bg-white p-1.5 shadow-[0_20px_50px_-20px_rgba(16,37,27,0.35)]">
                {g.items.map((it) => (
                  <Link
                    key={it.href}
                    href={it.href}
                    tabIndex={isOpen ? 0 : -1}
                    onClick={() => setOpen(null)}
                    className="block rounded-xl px-3 py-2.5 transition-colors hover:bg-[#f2f4ee]"
                  >
                    <span className="block text-[14px] font-semibold text-[#10251b]">{it.label}</span>
                    {it.note && <span className="mt-0.5 block text-[12.5px] text-[#6e7b74]">{it.note}</span>}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        );
      })}
      {DIRECT.map((it) => (
        <Link key={it.href} href={it.href} className="rounded-lg px-3 py-2 transition-colors hover:text-[#0a7c42]">
          {it.label}
        </Link>
      ))}
    </nav>
  );
}
