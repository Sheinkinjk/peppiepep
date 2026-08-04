"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

type Item = { href: string; label: string; note?: string };
type Group = { label: string; items: Item[] };

/** Grouped dropdown shortcuts + direct links for the consumer header. */
const GROUPS: Group[] = [
  {
    label: "Health",
    items: [
      { href: "/weight-loss", label: "Weight Loss & Telehealth", note: "Moshy, Juniper and the GP pathway, compared" },
      { href: "/hair-loss", label: "Hair Loss Treatment", note: "Clinical telehealth vs topical products" },
      { href: "/mens-health-telehealth-australia", label: "Men's Health Telehealth", note: "Online men's health clinics" },
    ],
  },
  {
    label: "Insurance",
    items: [
      { href: "/pet-insurance", label: "Pet Insurance", note: "Cover explained, plus current offers" },
      { href: "/what-pet-insurance-covers-australia", label: "What It Covers", note: "Cover types, waiting periods, exclusions" },
    ],
  },
  {
    label: "Home & Energy",
    items: [
      { href: "/apollo-energy-group", label: "Home Batteries", note: "Apollo Energy Group, sized to your usage" },
      { href: "/home-battery-rebate-australia", label: "Battery Rebate 2026", note: "What the federal rebate actually pays" },
      { href: "/apollo-energy-review", label: "Apollo Energy Review", note: "Credentials, warranty and what to check" },
    ],
  },
  {
    label: "Business Lending",
    items: [
      { href: "/business-loans", label: "Business Loans", note: "Compare Australian lenders in one enquiry" },
      { href: "/business-loan-calculator", label: "Repayment Calculator", note: "Repayments, total cost and effective rate" },
      { href: "/what-a-business-loan-actually-costs", label: "What Loans Really Cost", note: "Rate vs factor rate vs fees, explained" },
      { href: "/secured-vs-unsecured-business-loans", label: "Secured vs Unsecured", note: "Which fits, and the trade-offs" },
      { href: "/business-loan-eligibility-australia", label: "What Lenders Look At", note: "The four things that decide it" },
    ],
  },
  // B2B software: consolidated into one simplified dropdown and placed last, since
  // the focus is B2C + lending. Nothing is removed; the full set lives on the
  // /business-software hub and the /compare category pages.
  {
    label: "Business Software",
    items: [
      { href: "/business-software", label: "All Business Software", note: "Every category, in one place" },
      { href: "/compare/website-builders", label: "Websites & Landing Pages", note: "Carrd, Durable AI, Leadpages and more" },
      { href: "/compare/newsletter-platforms", label: "Newsletters & Email", note: "beehiiv, Substack and Brevo" },
      { href: "/best-ai-sales-tools", label: "Sales, CRM & Outreach", note: "GoHighLevel, Pipedrive, Reply.io" },
      { href: "/compare/ai-tools", label: "AI Tools", note: "Lindy, ElevenLabs and more" },
      { href: "/compare/hr-payroll", label: "HR, Payroll & Phone", note: "Employment Hero, CloudTalk and more" },
      { href: "/affiliate-programs-australia", label: "Affiliate Programs", note: "The best programs to join in 2026" },
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
