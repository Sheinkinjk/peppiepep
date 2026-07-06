"use client";

import { Lock, Check } from "lucide-react";

const CYAN  = "#0AA7B5";
const AMBER = "#F59E0B";

const categoryColor: Record<string, string> = {
  "SaaS":       "#0AA7B5",
  "AI Tools":   "#8B5CF6",
  "Health AU":  "#10B981",
  "Fintech":    "#F59E0B",
  "Startup":    "#EF4444",
};

export const DB_ROWS = [
  { company: "beehiiv",    category: "SaaS",      commission: "30%",      type: "Recurring",  cookie: "30d", angle: "Best Substack alternative for creators",        highlight: true  },
  { company: "Jasper AI",  category: "AI Tools",  commission: "25%",      type: "Recurring",  cookie: "60d", angle: "AI writing for bloggers and content teams",      highlight: false },
  { company: "Moshy",      category: "Health AU", commission: "$100/sale", type: "CPA",        cookie: "14d", angle: "Weight loss telehealth Australia",               highlight: true  },
  { company: "Wise",       category: "Fintech",   commission: "$30 flat",  type: "Flat fee",   cookie: "30d", angle: "International transfers for AU expats",          highlight: false },
  { company: "Carrd",      category: "Startup",   commission: "30%",      type: "One-time",   cookie: "30d", angle: "Cheapest way to build a website",                highlight: false },
  { company: "Durable AI", category: "AI Tools",  commission: "20%",      type: "Recurring",  cookie: "60d", angle: "Generate a business website in 30 seconds",      highlight: true  },
  { company: "Notion",     category: "SaaS",      commission: "50%",      type: "First year", cookie: "90d", angle: "Notion vs Obsidian for productivity",             highlight: false },
  { company: "Stake",      category: "Fintech",   commission: "$50 flat",  type: "CPA",        cookie: "30d", angle: "Commission-free investing Australia",             highlight: false },
  { company: "Mosh Hair",  category: "Health AU", commission: "$85/sale",  type: "CPA",        cookie: "14d", angle: "Hair loss treatment for men AU",                  highlight: true  },
  { company: "Webflow",    category: "SaaS",      commission: "50%",      type: "Recurring",  cookie: "90d", angle: "Webflow vs WordPress migration guide",            highlight: false },
];

// ─── Spreadsheet database mock ────────────────────────────────────────────────

export function SpreadsheetMock({ blurred = false, rows = 6, compact = false }: { blurred?: boolean; rows?: number; compact?: boolean }) {
  const cols = ["Company", "Category", "Commission", "Type", "Cookie", "Marketing Angle"];
  const data = DB_ROWS.slice(0, rows);
  const px = compact ? "px-2 py-1.5" : "px-2.5 py-2";
  return (
    <div className={`relative rounded-xl border border-white/10 overflow-hidden font-mono bg-[#0a1520] ${blurred ? "select-none" : ""} ${compact ? "text-[9px]" : "text-[10px]"}`}>
      {blurred && (
        <>
          <div className="absolute inset-0 backdrop-blur-[2.5px] z-10" style={{ background: "rgba(6,15,21,0.15)" }} />
          <div className="absolute bottom-0 left-0 right-0 h-20 z-20" style={{ background: "linear-gradient(to top, #060f15 0%, transparent 100%)" }} />
          <div className="absolute top-2.5 right-2.5 z-30 flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest" style={{ background: "rgba(10,167,181,0.15)", color: CYAN, border: "1px solid rgba(10,167,181,0.3)" }}>
            <Lock className="h-2.5 w-2.5" /> Preview blurred
          </div>
        </>
      )}
      <div className="grid bg-white/[0.06] border-b border-white/10" style={{ gridTemplateColumns: "110px 75px 85px 75px 45px 1fr" }}>
        {cols.map((c) => (
          <div key={c} className={`${px} text-[8px] font-bold uppercase tracking-wider text-white/40 truncate`}>{c}</div>
        ))}
      </div>
      {data.map((row, i) => (
        <div key={row.company} className="grid border-b border-white/[0.05]"
          style={{ gridTemplateColumns: "110px 75px 85px 75px 45px 1fr", background: row.highlight ? "rgba(10,167,181,0.07)" : i % 2 === 0 ? "rgba(255,255,255,0.01)" : "transparent" }}>
          <div className={`${px} text-white/85 font-semibold truncate`}>{row.company}</div>
          <div className={`${px} truncate`}>
            <span className="rounded-full px-1.5 py-0.5 text-[8px] font-bold" style={{ background: `${categoryColor[row.category] ?? CYAN}20`, color: categoryColor[row.category] ?? CYAN }}>
              {row.category}
            </span>
          </div>
          <div className={`${px} font-bold text-white/85 truncate`}>{row.commission}</div>
          <div className={`${px} text-white/50 truncate`}>{row.type}</div>
          <div className={`${px} text-white/40`}>{row.cookie}</div>
          <div className={`${px} text-white/55 truncate`}>{row.angle}</div>
        </div>
      ))}
    </div>
  );
}

// ─── Strategy brief PDF mock ──────────────────────────────────────────────────

export function DocMock({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`rounded-xl border border-white/10 bg-[#0a1520] font-mono ${compact ? "p-3 text-[9px]" : "p-4 text-[10px]"}`}>
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/10">
        <div className="h-2 w-2 rounded-full bg-red-500/70" />
        <div className="h-2 w-2 rounded-full bg-amber-500/70" />
        <div className="h-2 w-2 rounded-full bg-green-500/70" />
        <span className="ml-1 text-white/30">strategy-brief.pdf</span>
      </div>
      <div className="space-y-1.5">
        <div className="text-[9px] font-bold uppercase tracking-widest mb-2" style={{ color: CYAN }}>Referral Growth Blueprint, Strategy Brief</div>
        <div className="flex flex-wrap gap-3 text-white/50 mb-2">
          <span>Niche: <span className="text-white/80 font-semibold">AI Tools</span></span>
          <span>Channel: <span className="text-white/80 font-semibold">SEO</span></span>
          <span>Level: <span className="text-white/80 font-semibold">Intermediate</span></span>
        </div>
        <div className="h-px bg-white/[0.07] my-2" />
        <div className="text-white/60 font-bold mb-1">WEEK 1-2: Foundation</div>
        {["Register Jasper, Durable AI, Notion, beehiiv (priority list attached)", "Set up Pretty Links, installation guide in tool stack PDF", "Build comparison page: Durable AI vs Wix (full brief in SEO concepts)"].map((t) => (
          <div key={t} className="flex gap-1.5 text-white/45">
            <span style={{ color: CYAN }}>✓</span>
            <span className="leading-relaxed">{t}</span>
          </div>
        ))}
        <div className="h-px bg-white/[0.07] my-2" />
        <div className="text-white/60 font-bold mb-1">WEEK 3-4: Content</div>
        {['Target: "best AI website builder 2026", 3,200 searches/mo', "Build: 2 review pages + 1 comparison page", "Monetise: Durable AI (20%) + Carrd (30%) per page"].map((t) => (
          <div key={t} className="flex gap-1.5 text-white/45">
            <span className="text-white/30">→</span>
            <span className="leading-relaxed">{t}</span>
          </div>
        ))}
        <div className="mt-2 text-white/25 italic">...continues across 8 pages</div>
      </div>
    </div>
  );
}

// ─── SEO concepts keyword mock ────────────────────────────────────────────────

export function SeoMock({ compact = false }: { compact?: boolean }) {
  const keywords = [
    { kw: "best AI tools for affiliate marketing 2026", vol: "2.4K", comp: "Low",  prog: 85 },
    { kw: "moshy vs juniper australia",                  vol: "1.8K", comp: "Low",  prog: 92 },
    { kw: "best newsletter platform australia",          vol: "3.1K", comp: "Med",  prog: 70 },
    { kw: "beehiiv vs substack australia",               vol: "2.1K", comp: "Low",  prog: 88 },
  ];
  return (
    <div className={`rounded-xl border border-white/10 bg-[#0a1520] font-mono space-y-2.5 ${compact ? "p-3 text-[9px]" : "p-4 text-[10px]"}`}>
      <div className="text-[9px] font-bold uppercase tracking-widest mb-2" style={{ color: CYAN }}>SEO Page Concepts, Sample</div>
      {keywords.map((k) => (
        <div key={k.kw} className="space-y-1">
          <div className="flex items-center justify-between gap-2">
            <span className="text-white/75">{k.kw}</span>
            <span className="flex-shrink-0 text-[8px] font-bold px-1.5 py-0.5 rounded" style={{ background: k.comp === "Low" ? "rgba(16,185,129,0.15)" : "rgba(245,158,11,0.15)", color: k.comp === "Low" ? "#10B981" : AMBER }}>{k.comp}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${k.prog}%`, background: CYAN }} />
            </div>
            <span className="text-white/40 w-10">{k.vol}/mo</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Distribution playbook checklist mock ─────────────────────────────────────

export function ChecklistMock({ compact = false }: { compact?: boolean }) {
  const steps = [
    "Install Pretty Links plugin on your WordPress site",
    "Create tracking links for your top 3 programs",
    'Write pillar post: "Best [niche] tools for [audience]"',
    "Submit to 3 relevant subreddits with link in bio only",
    "Build email drip: 5-email affiliate intro sequence",
  ];
  return (
    <div className={`rounded-xl border border-white/10 bg-[#0a1520] font-mono space-y-2 ${compact ? "p-3 text-[9px]" : "p-4 text-[10px]"}`}>
      <div className="text-[9px] font-bold uppercase tracking-widest mb-2" style={{ color: CYAN }}>SEO Distribution Playbook, Step 1 of 6</div>
      {steps.map((s, i) => (
        <div key={s} className="flex gap-2 items-start">
          <div className="h-4 w-4 rounded border flex items-center justify-center flex-shrink-0 mt-0.5" style={{ borderColor: i < 2 ? CYAN : "rgba(255,255,255,0.15)", background: i < 2 ? `${CYAN}20` : "transparent" }}>
            {i < 2 && <Check className="h-2.5 w-2.5" style={{ color: CYAN }} />}
          </div>
          <span className={i < 2 ? "text-white/40 line-through" : "text-white/70"}>{s}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Niche selection mock ─────────────────────────────────────────────────────

export function NichesMock({ compact = false }: { compact?: boolean }) {
  const niches = [
    { rank: 1, name: "AI Tools (SaaS)",       comm: "25-40% recurring", fit: 96 },
    { rank: 2, name: "Health Telehealth AU",   comm: "$50-$150 CPA",     fit: 89 },
    { rank: 3, name: "Fintech AU",             comm: "$30-$200 CPA",     fit: 77 },
  ];
  return (
    <div className={`rounded-xl border border-white/10 bg-[#0a1520] font-mono space-y-2.5 ${compact ? "p-3 text-[9px]" : "p-4 text-[10px]"}`}>
      <div className="text-[9px] font-bold uppercase tracking-widest mb-2" style={{ color: CYAN }}>Niche Selection, Your Top 3</div>
      {niches.map((n) => (
        <div key={n.name} className="flex items-center gap-3 rounded-lg p-2"
          style={{ background: n.rank === 1 ? `${CYAN}10` : "rgba(255,255,255,0.02)", border: `1px solid ${n.rank === 1 ? `${CYAN}30` : "rgba(255,255,255,0.06)"}` }}>
          <div className="h-5 w-5 rounded-full flex items-center justify-center text-[8px] font-black flex-shrink-0"
            style={{ background: n.rank === 1 ? CYAN : "rgba(255,255,255,0.1)", color: n.rank === 1 ? "#060f15" : "rgba(255,255,255,0.5)" }}>
            {n.rank}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-white/80 font-semibold">{n.name}</div>
            <div className="text-white/40">{n.comm}</div>
          </div>
          <div className="text-right">
            <div className="font-black text-xs" style={{ color: n.rank === 1 ? CYAN : "rgba(255,255,255,0.5)" }}>{n.fit}%</div>
            <div className="text-white/30 text-[8px]">match</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Tool stack mock ──────────────────────────────────────────────────────────

export function ToolsMock({ compact = false }: { compact?: boolean }) {
  const tools = [
    { name: "WordPress",         cat: "CMS" },
    { name: "Pretty Links",      cat: "Tracking" },
    { name: "ConvertKit",        cat: "Email" },
    { name: "Ahrefs Webmaster",  cat: "SEO" },
    { name: "Carrd",             cat: "Landing" },
    { name: "Google Analytics",  cat: "Analytics" },
  ];
  return (
    <div className={`rounded-xl border border-white/10 bg-[#0a1520] font-mono ${compact ? "p-3 text-[9px]" : "p-4 text-[10px]"}`}>
      <div className="text-[9px] font-bold uppercase tracking-widest mb-3" style={{ color: CYAN }}>Recommended Tool Stack, Intermediate</div>
      <div className="grid grid-cols-3 gap-1.5">
        {tools.map((t) => (
          <div key={t.name} className="rounded-lg border border-white/10 bg-white/[0.03] px-2 py-1.5 text-center">
            <div className="text-white/75 font-semibold">{t.name}</div>
            <div className="text-white/30">{t.cat}</div>
          </div>
        ))}
      </div>
      <div className="mt-2 text-white/30">Est. total: ~$35/mo</div>
    </div>
  );
}

// ─── Delivery email preview mock ──────────────────────────────────────────────

export function EmailPreviewMock() {
  return (
    <div className="rounded-xl border border-white/10 bg-[#0a1520] overflow-hidden font-mono text-[10px]">
      {/* Email client chrome */}
      <div className="bg-white/[0.04] border-b border-white/10 px-4 py-3 flex items-center gap-3">
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
          <div className="h-2.5 w-2.5 rounded-full bg-amber-500/60" />
          <div className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
        </div>
        <div className="flex-1 bg-white/[0.05] rounded px-3 py-1 text-white/30 text-[9px]">
          jarred@referlabs.com.au
        </div>
      </div>
      {/* Email header */}
      <div className="px-4 py-3 border-b border-white/[0.07] space-y-1">
        <div className="flex items-center justify-between">
          <span className="font-bold text-white/70">Your Referral Growth Blueprint, delivered</span>
          <span className="text-white/25 text-[9px]">just now</span>
        </div>
        <div className="text-white/35 text-[9px]">From: Jarred Krowitz &lt;jarred@referlabs.com.au&gt;</div>
      </div>
      {/* Email body preview */}
      <div className="px-4 py-3 space-y-2">
        <div className="text-white/65 leading-relaxed">Hi Sarah,</div>
        <div className="text-white/50 leading-relaxed">
          Your blueprint is attached, six files as promised. Start with the Excel database, filter by your niche, and cross-reference the strategy brief for your week 1 priorities.
        </div>
        <div className="mt-2 rounded border border-white/[0.07] bg-white/[0.02] p-2.5 space-y-1.5">
          {[
            { name: "affiliate-database-250-programs.xlsx", size: "284 KB" },
            { name: "strategy-brief-sarah.pdf",              size: "1.2 MB" },
            { name: "niche-selection-brief.pdf",             size: "480 KB" },
            { name: "seo-page-concepts.pdf",                 size: "620 KB" },
            { name: "distribution-playbooks-seo-email.pdf",  size: "890 KB" },
            { name: "tool-stack-intermediate.pdf",           size: "310 KB" },
          ].map(({ name, size }) => (
            <div key={name} className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded flex items-center justify-center text-[7px] font-bold flex-shrink-0"
                  style={{ background: name.endsWith(".xlsx") ? "rgba(16,185,129,0.2)" : "rgba(10,167,181,0.15)", color: name.endsWith(".xlsx") ? "#10B981" : CYAN }}>
                  {name.endsWith(".xlsx") ? "XLS" : "PDF"}
                </div>
                <span className="text-white/60 truncate">{name}</span>
              </div>
              <span className="text-white/25 flex-shrink-0">{size}</span>
            </div>
          ))}
        </div>
        <div className="text-white/35 leading-relaxed text-[9px] pt-1">
          Questions on any of these, reply here. Looking forward to hearing how it goes.
        </div>
        <div className="text-white/45 font-semibold">Jarred</div>
      </div>
    </div>
  );
}

// ─── "In your inbox" delivery panel ──────────────────────────────────────────

export function DeliveryMock() {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0a1520] overflow-hidden">
      {/* Window chrome */}
      <div className="flex items-center gap-2 px-4 py-3 bg-white/[0.03] border-b border-white/10">
        <div className="h-2.5 w-2.5 rounded-full bg-red-500/50" />
        <div className="h-2.5 w-2.5 rounded-full bg-amber-500/50" />
        <div className="h-2.5 w-2.5 rounded-full bg-green-500/50" />
        <span className="ml-2 text-[9px] text-white/25 font-mono">Inbox, 1 new message</span>
      </div>
      <div className="p-4">
        <EmailPreviewMock />
      </div>
    </div>
  );
}
