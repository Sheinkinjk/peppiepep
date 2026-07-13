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
      { href: "/weight-loss", label: "Weight loss & telehealth", note: "Moshy, Juniper and the GP pathway, compared" },
      { href: "/hair-loss", label: "Hair loss treatment", note: "Clinical telehealth vs topical products" },
      { href: "/mens-health-telehealth-australia", label: "Men's health telehealth", note: "Online men's health clinics" },
      { href: "/best-peptide-supplier", label: "Research peptides", note: "Suppliers compared. Research use only" },
    ],
  },
  {
    label: "Websites & content",
    items: [
      { href: "/compare/website-builders", label: "Website builders", note: "Carrd, Durable AI, Butternut and more" },
      { href: "/compare/newsletter-platforms", label: "Newsletter platforms", note: "beehiiv, Substack and Kit, compared" },
      { href: "/brevo", label: "Email marketing (Brevo)", note: "Email, SMS and automation in one tool" },
    ],
  },
  {
    label: "Business software",
    items: [
      { href: "/business-software", label: "All business software", note: "Every category, in one place" },
      { href: "/best-ai-sales-tools", label: "Sales & CRM tools", note: "GoHighLevel, AiSDR, Nutshell and more" },
      { href: "/nutshell", label: "Nutshell", note: "Easy sales CRM with marketing built in" },
      { href: "/compare/sales-outreach", label: "Sales & outreach", note: "Snov.io and Reply.io, compared" },
      { href: "/compare/hr-payroll", label: "HR & payroll", note: "Employment Hero and Gusto" },
      { href: "/compare/payments", label: "Payments & finance", note: "Payments and accounting" },
      { href: "/compare/business-phone", label: "Business phone", note: "CloudTalk vs KrispCall" },
      { href: "/compare/ai-tools", label: "AI tools", note: "Lindy, ElevenLabs, Logome and more" },
      { href: "/compare/lead-generation", label: "Lead generation", note: "Landing pages, popups, quizzes" },
    ],
  },
  {
    label: "Money & side income",
    items: [
      { href: "/polymarket", label: "Polymarket", note: "How to sign up and trade" },
      { href: "/polymarket/markets-explained", label: "Markets explained", note: "How prediction markets work" },
      { href: "/polymarket/how-to-register", label: "How to register", note: "US and international sign-up paths" },
      { href: "/alidrop", label: "AliDrop", note: "AliExpress and Temu dropshipping tool" },
    ],
  },
  {
    label: "For business",
    items: [
      { href: "/for-business", label: "For business overview", note: "How brands grow with Refer Labs" },
      { href: "/affiliate-programs-australia", label: "Affiliate programs Australia", note: "The best programs, compared for 2026" },
      { href: "/superfiliate", label: "Superfiliate", note: "Run affiliate & creator programs for your brand" },
      { href: "/services", label: "Growth services", note: "Done-with-you distribution" },
      { href: "/comparison-website", label: "Get featured", note: "Partner on a comparison" },
    ],
  },
];

const DIRECT: Item[] = [
  { href: "/guides", label: "All guides" },
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
            {isOpen && (
              <div className="absolute left-0 top-full w-72 pt-2">
                <div className="overflow-hidden rounded-2xl border border-[#e5e9e7] bg-white p-1.5 shadow-[0_20px_50px_-20px_rgba(16,37,27,0.35)]">
                  {g.items.map((it) => (
                    <Link
                      key={it.href}
                      href={it.href}
                      onClick={() => setOpen(null)}
                      className="block rounded-xl px-3 py-2.5 transition-colors hover:bg-[#f2f4ee]"
                    >
                      <span className="block text-[14px] font-semibold text-[#10251b]">{it.label}</span>
                      {it.note && <span className="mt-0.5 block text-[12.5px] text-[#6e7b74]">{it.note}</span>}
                    </Link>
                  ))}
                </div>
              </div>
            )}
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
