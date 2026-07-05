"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight, CheckCircle2, Loader2, Lock, FileSpreadsheet, Brain,
  Rocket, Share2, BarChart3, Wrench, ChevronDown, ChevronUp,
  Star, TrendingUp, Users, Zap, Search, Target, Database,
  Clock, DollarSign, X, Check, AlertCircle,
} from "lucide-react";
import {
  SpreadsheetMock as SharedSpreadsheetMock,
  DocMock as SharedDocMock,
  SeoMock as SharedSeoMock,
  ChecklistMock as SharedChecklistMock,
  NichesMock as SharedNichesMock,
  ToolsMock as SharedToolsMock,
} from "@/components/blueprint/Mocks";
import { analytics } from "@/components/Analytics";

const CYAN  = "#0AA7B5";
const AMBER = "#F59E0B";

// ─── Spreadsheet data (hero mock + sample output) ─────────────────────────────

const DB_ROWS = [
  { company: "beehiiv",      category: "SaaS",        commission: "30%",     type: "Recurring",  cookie: "30d", angle: "Best Substack alternative for creators",       highlight: true },
  { company: "Jasper AI",    category: "AI Tools",    commission: "25%",     type: "Recurring",  cookie: "60d", angle: "AI writing for bloggers and content teams",     highlight: false },
  { company: "Moshy",        category: "Health AU",   commission: "$100/sale",type: "CPA",        cookie: "14d", angle: "Weight loss telehealth Australia",             highlight: true },
  { company: "Wise",         category: "Fintech",     commission: "$30 flat", type: "Flat fee",   cookie: "30d", angle: "International transfers for AU expats",        highlight: false },
  { company: "Carrd",        category: "Startup",     commission: "30%",     type: "One-time",   cookie: "30d", angle: "Cheapest way to build a website",              highlight: false },
  { company: "Durable AI",   category: "AI Tools",    commission: "20%",     type: "Recurring",  cookie: "60d", angle: "Generate a business website in 30 seconds",    highlight: true },
  { company: "Notion",       category: "SaaS",        commission: "50%",     type: "First year", cookie: "90d", angle: "Notion vs Obsidian for productivity",          highlight: false },
  { company: "Stake",        category: "Fintech",     commission: "$50 flat", type: "CPA",        cookie: "30d", angle: "Commission-free investing Australia",          highlight: false },
  { company: "Mosh Hair",    category: "Health AU",   commission: "$85/sale", type: "CPA",        cookie: "14d", angle: "Hair loss treatment for men AU",               highlight: true },
  { company: "Webflow",      category: "SaaS",        commission: "50%",     type: "Recurring",  cookie: "90d", angle: "Webflow vs WordPress migration guide",         highlight: false },
];

const categoryColor: Record<string, string> = {
  "SaaS":       "#0AA7B5",
  "AI Tools":   "#8B5CF6",
  "Health AU":  "#10B981",
  "Fintech":    "#F59E0B",
  "Startup":    "#EF4444",
};

// ─── Deliverables ─────────────────────────────────────────────────────────────

const deliverables = [
  {
    num: "01", icon: <FileSpreadsheet className="h-5 w-5" />,
    headline: "250+ Affiliate Program Database",
    outcome: "Start building in hours, not months",
    mock: "spreadsheet",
    whatItIs: "A structured Excel file with 250+ affiliate and referral programs across 5 categories. Every row: company name, direct affiliate program link, commission rate, payout type, cookie window, minimum payout, and suggested marketing angle.",
    whyItMatters: "Saves 6-8 weeks of manual research. Every link manually verified. Commission data sourced from each program's official terms — not estimated. The starting database most people never finish building.",
    howUsed: "Open in Excel or Google Sheets. Filter by category (AI / SaaS / Health / Fintech / Startup), commission type (recurring / CPA / flat), or commission floor. Cross-reference with the strategy brief for your top 5-10 priorities.",
    valueReplaces: "~$1,000-$6,000 of research time at typical hourly rates",
    bullets: [
      "Company, direct program link, signup instructions",
      "Commission rate, type (CPA / recurring / flat fee), payout model",
      "Cookie window, minimum payout per program",
      "Suggested marketing angle per entry",
      "40-60 programs per category, ready to filter",
    ],
    provides: "Every link manually verified. Commission data sourced from official program terms. Clean Excel, zero additional research required.",
  },
  {
    num: "02", icon: <Brain className="h-5 w-5" />,
    headline: "Personalised Strategy Brief",
    outcome: "Your specific starting point, written by a human",
    mock: "doc",
    whatItIs: "An 8+ page PDF strategy brief written specifically for your niche, channels, goals, and experience level — based on the answers you give in the intake form.",
    whyItMatters: "Generic affiliate marketing advice is everywhere and worth nothing. Your situation (your niche, your channels, your distribution capability) is unique. The brief is written for it specifically.",
    howUsed: "Read top to bottom on day one. The brief tells you which 5-10 programs from the database to prioritise, which distribution channel to lead with, week-by-week starting sequence, and the specific mistakes to avoid for your stated channels.",
    valueReplaces: "$500-$2,000 strategy consultation fee",
    bullets: [
      "Where to start based on your niche and experience level",
      "Which 5-10 programs to prioritise in the first 60 days",
      "Which distribution channel to lead with and why",
      "Week-by-week starting sequence",
      "Common mistakes to avoid for your stated channels",
    ],
    provides: "Jarred reads your intake form and writes this personally. Not AI-generated, not templated. If your answers raise questions, we email before delivering.",
  },
  {
    num: "03", icon: <Search className="h-5 w-5" />,
    headline: "10+ SEO Page Concepts",
    outcome: "Ready-to-build pages with real ranking potential",
    mock: "seo",
    whatItIs: "A PDF with 10+ keyword-targeted page concepts mapped to your niche. Each concept includes: target keyword, monthly search volume, competition level, search intent classification, page structure brief, and which affiliate programs to feature.",
    whyItMatters: "Most affiliate marketers waste content effort on keywords they can't rank for or topics that don't convert. The SEO concepts are based on actual search data and chosen for ranking realism plus monetisation potential.",
    howUsed: "Pick the 2-3 strongest concepts to build first. Each brief is detailed enough to hand to a writer or follow yourself. Comparison pages and review pages compound for years.",
    valueReplaces: "$300-$800 per SEO content brief from a freelancer",
    bullets: [
      "10+ target keywords with realistic ranking potential",
      "Search intent classification per keyword",
      "Structural brief per page: sections, headings, content approach",
      "Which affiliate programs to feature on each page",
      "Estimated monthly search volume and competition level",
    ],
    provides: "Mapped to your niche and the programs in your database. Based on actual search data, not generic advice. Ready to hand to a writer or build yourself.",
  },
  {
    num: "04", icon: <Share2 className="h-5 w-5" />,
    headline: "Distribution Playbooks",
    outcome: "Execution guides for your specific channels",
    mock: "checklist",
    whatItIs: "Step-by-step execution playbooks for the channels you selected in the intake form (SEO, email, communities, comparison directories, social). Each playbook references specific programs from your database.",
    whyItMatters: "Knowing which programs to promote is half the problem. Knowing exactly how to promote them through your specific channel is the other half. Most affiliate guides skip the second half.",
    howUsed: "Open the playbook for your primary channel. Follow it as a numbered action list. SEO playbook is 6 steps; email is a cold-to-warm sequence template; community playbook is a credibility framework for Reddit and forums.",
    valueReplaces: "$200-$400 worth of execution templates and consulting time",
    bullets: [
      "SEO: 6-step content and page-building process from zero",
      "Email: cold-to-warm sequence and list-building approach",
      "Communities: credibility framework for Reddit and forums",
      "Comparison directories: how to list programs and drive traffic",
      "Each playbook references specific programs from your database",
    ],
    provides: "Only the playbooks for your stated channels. Formatted as numbered action lists with platform-specific recommendations. Delivered as part of the strategy brief PDF.",
  },
  {
    num: "05", icon: <BarChart3 className="h-5 w-5" />,
    headline: "Niche Selection Brief",
    outcome: "3-5 vetted niches matched to your goals",
    mock: "niches",
    whatItIs: "A PDF with 3-5 niche recommendations matched to your stated goals, channels, and distribution capability — with reasoning for each match.",
    whyItMatters: "Picking a niche based on what sounds profitable rather than what you can distribute is the #1 reason new affiliates fail. The brief assesses fit between you and the niche, not just the niche's profit potential.",
    howUsed: "Pick the strongest match. The brief lists 5-10 priority programs within each recommended niche, estimated commission range, and what makes each niche defensible vs. oversaturated. Lets you commit with conviction.",
    valueReplaces: "$300-$500 of niche selection consulting",
    bullets: [
      "3-5 niche recommendations based on your intake answers",
      "Why each niche matches your distribution capability",
      "5-10 priority programs within each niche",
      "Estimated realistic commission range per niche",
      "Niches to avoid given your experience and channels",
    ],
    provides: "Every recommendation is justified. Prevents the most common mistake - picking a niche that sounds good rather than one you can actually distribute.",
  },
  {
    num: "06", icon: <Wrench className="h-5 w-5" />,
    headline: "Recommended Tool Stack",
    outcome: "Exact software to run your referral business",
    mock: "tools",
    whatItIs: "A PDF with the specific software stack to build, track, and run your affiliate site. Tailored to your experience level and budget.",
    whyItMatters: "Most beginners waste 2-3 months and $200+ trying tools that don't fit their level. Beginners try advanced enterprise tools; advanced users use beginner tools that don't scale. Right tools, right level.",
    howUsed: "Set up domain, hosting, CMS, affiliate link tracking, email platform, and analytics in week one. Total monthly cost is calculated upfront so you know exactly what to expect.",
    valueReplaces: "$100-$200 of tech research time + $100-$300/month of wrong-tool costs",
    bullets: [
      "Domain, hosting, and CMS recommendation for your budget",
      "Affiliate link management tool with setup instructions",
      "Email list platform based on your channel selection",
      "Analytics setup: what to track from day one",
      "Total estimated monthly cost for the full stack",
    ],
    provides: "Matched to your experience level and budget. Beginners get simple, low-cost setups. Advanced users get more capable stacks. Every recommendation includes a justification.",
  },
];

// ─── Form config ──────────────────────────────────────────────────────────────

const primaryGoalOptions = [
  "Build affiliate revenue",
  "Launch a referral deal directory",
  "Promote SaaS referral programs",
  "Health & wellness offers",
  "AI tools & side hustles",
  "Finance & fintech programs",
  "E-commerce brand referrals",
  "General research / exploring",
];

const channelOptions = [
  "SEO / organic search",
  "Email newsletter",
  "Social media",
  "Online communities & forums",
  "Comparison directories",
  "Paid ads",
];

type FormData = {
  name: string; email: string; website: string; industry: string;
  primaryGoal: string; marketingChannels: string[]; experienceLevel: string;
};

const initialForm: FormData = {
  name: "", email: "", website: "", industry: "",
  primaryGoal: "", marketingChannels: [], experienceLevel: "",
};

// ─── Visual Mock Components ───────────────────────────────────────────────────

function SpreadsheetMock({ blurred = false, rows = 6 }: { blurred?: boolean; rows?: number }) {
  const cols = ["Company", "Category", "Commission", "Type", "Cookie", "Marketing Angle"];
  const data = DB_ROWS.slice(0, rows);
  return (
    <div className={`relative rounded-xl border border-white/10 overflow-hidden text-[10px] font-mono bg-[#0a1520] ${blurred ? "select-none" : ""}`}>
      {blurred && (
        <>
          <div className="absolute inset-0 backdrop-blur-[2.5px] z-10" style={{ background: "rgba(6,15,21,0.15)" }} />
          <div className="absolute bottom-0 left-0 right-0 h-24 z-20" style={{ background: "linear-gradient(to top, #060f15 0%, transparent 100%)" }} />
          <div className="absolute top-2.5 right-2.5 z-30 flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest" style={{ background: "rgba(10,167,181,0.15)", color: CYAN, border: "1px solid rgba(10,167,181,0.3)" }}>
            <Lock className="h-2.5 w-2.5" /> Preview blurred
          </div>
        </>
      )}
      {/* Header */}
      <div className="grid bg-white/[0.06] border-b border-white/10" style={{ gridTemplateColumns: "120px 80px 90px 80px 50px 1fr" }}>
        {cols.map((c) => (
          <div key={c} className="px-2.5 py-2 text-[9px] font-bold uppercase tracking-wider text-white/40 truncate">{c}</div>
        ))}
      </div>
      {data.map((row, i) => (
        <div
          key={row.company}
          className="grid border-b border-white/[0.05] transition-colors"
          style={{
            gridTemplateColumns: "120px 80px 90px 80px 50px 1fr",
            background: row.highlight ? "rgba(10,167,181,0.07)" : i % 2 === 0 ? "rgba(255,255,255,0.01)" : "transparent",
          }}
        >
          <div className="px-2.5 py-2 text-white/85 font-semibold truncate">{row.company}</div>
          <div className="px-2.5 py-2 truncate">
            <span className="rounded-full px-1.5 py-0.5 text-[8px] font-bold" style={{ background: `${categoryColor[row.category] || CYAN}20`, color: categoryColor[row.category] || CYAN }}>
              {row.category}
            </span>
          </div>
          <div className="px-2.5 py-2 font-bold text-white/85 truncate">{row.commission}</div>
          <div className="px-2.5 py-2 text-white/50 truncate">{row.type}</div>
          <div className="px-2.5 py-2 text-white/40">{row.cookie}</div>
          <div className="px-2.5 py-2 text-white/55 truncate">{blurred ? row.angle : row.angle}</div>
        </div>
      ))}
    </div>
  );
}

function DocMock() {
  return (
    <div className="rounded-xl border border-white/10 bg-[#0a1520] p-4 text-[10px] font-mono">
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/10">
        <div className="h-2 w-2 rounded-full bg-red-500/70" />
        <div className="h-2 w-2 rounded-full bg-amber-500/70" />
        <div className="h-2 w-2 rounded-full bg-green-500/70" />
        <span className="ml-1 text-white/30">strategy-brief.pdf</span>
      </div>
      <div className="space-y-1.5">
        <div className="text-[9px] font-bold uppercase tracking-widest mb-2" style={{ color: CYAN }}>Referral Growth Blueprint - Strategy Brief</div>
        <div className="flex gap-4 text-white/50 mb-2">
          <span>Niche: <span className="text-white/80 font-semibold">AI Tools</span></span>
          <span>Channel: <span className="text-white/80 font-semibold">SEO</span></span>
          <span>Level: <span className="text-white/80 font-semibold">Intermediate</span></span>
        </div>
        <div className="h-px bg-white/[0.07] my-2" />
        <div className="text-white/60 font-bold mb-1">WEEK 1-2: Foundation</div>
        {["Register for Jasper, Durable AI, Notion, beehiiv (priority list attached)", "Set up Pretty Links for tracking — installation guide in tool stack PDF", "Build first comparison page: Durable AI vs Wix (full brief in SEO concepts)"].map((t) => (
          <div key={t} className="flex gap-1.5 text-white/45">
            <span style={{ color: CYAN }}>✓</span>
            <span>{t}</span>
          </div>
        ))}
        <div className="h-px bg-white/[0.07] my-2" />
        <div className="text-white/60 font-bold mb-1">WEEK 3-4: Content</div>
        {['Target: "best AI website builder 2026" (3,200 searches/mo)', "Build: 2 review pages + 1 comparison page", "Monetise: Durable AI (20%) + Carrd (30%) embedded in page"].map((t) => (
          <div key={t} className="flex gap-1.5 text-white/45">
            <span className="text-white/30">→</span>
            <span>{t}</span>
          </div>
        ))}
        <div className="mt-2 text-white/25 italic text-[9px]">...continues across 8 pages</div>
      </div>
    </div>
  );
}

function SeoMock() {
  const keywords = [
    { kw: "best AI tools for affiliate marketing 2026", vol: "2.4K", comp: "Low", prog: 85 },
    { kw: "moshy vs juniper australia",                 vol: "1.8K", comp: "Low", prog: 92 },
    { kw: "best newsletter platform australia",         vol: "3.1K", comp: "Med", prog: 70 },
    { kw: "beehiiv vs substack australia",              vol: "2.1K", comp: "Low", prog: 88 },
  ];
  return (
    <div className="rounded-xl border border-white/10 bg-[#0a1520] p-4 text-[10px] font-mono space-y-2.5">
      <div className="text-[9px] font-bold uppercase tracking-widest mb-2" style={{ color: CYAN }}>SEO Page Concepts — Sample</div>
      {keywords.map((k) => (
        <div key={k.kw} className="space-y-1">
          <div className="flex items-center justify-between gap-2">
            <span className="text-white/75 text-[9px]">{k.kw}</span>
            <span className="flex-shrink-0 text-[8px] font-bold px-1.5 py-0.5 rounded" style={{ background: k.comp === "Low" ? "rgba(16,185,129,0.15)" : "rgba(245,158,11,0.15)", color: k.comp === "Low" ? "#10B981" : AMBER }}>{k.comp}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${k.prog}%`, background: CYAN }} />
            </div>
            <span className="text-white/40 text-[9px] w-8">{k.vol}/mo</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function ChecklistMock() {
  const steps = ["Install Pretty Links plugin on your WordPress site", "Create tracking link for your top 3 programs", 'Write pillar post: "Best [niche] tools for [audience]"', "Submit to 3 relevant subreddits with link in bio only", "Build email drip: 5-email affiliate intro sequence"];
  return (
    <div className="rounded-xl border border-white/10 bg-[#0a1520] p-4 text-[10px] font-mono space-y-2">
      <div className="text-[9px] font-bold uppercase tracking-widest mb-2" style={{ color: CYAN }}>SEO Distribution Playbook — Step 1 of 6</div>
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

function NichesMock() {
  const niches = [
    { rank: 1, name: "AI Tools (SaaS)", comm: "25-40% recurring", fit: 96 },
    { rank: 2, name: "Health Telehealth AU", comm: "$50-$150 CPA", fit: 89 },
    { rank: 3, name: "Fintech AU", comm: "$30-$200 CPA", fit: 77 },
  ];
  return (
    <div className="rounded-xl border border-white/10 bg-[#0a1520] p-4 text-[10px] font-mono space-y-2.5">
      <div className="text-[9px] font-bold uppercase tracking-widest mb-2" style={{ color: CYAN }}>Niche Selection — Your Top 3</div>
      {niches.map((n) => (
        <div key={n.name} className="flex items-center gap-3 rounded-lg p-2" style={{ background: n.rank === 1 ? `${CYAN}10` : "rgba(255,255,255,0.02)", border: `1px solid ${n.rank === 1 ? `${CYAN}30` : "rgba(255,255,255,0.06)"}` }}>
          <div className="h-5 w-5 rounded-full flex items-center justify-center text-[8px] font-black flex-shrink-0" style={{ background: n.rank === 1 ? CYAN : "rgba(255,255,255,0.1)", color: n.rank === 1 ? "#060f15" : "rgba(255,255,255,0.5)" }}>
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

function ToolsMock() {
  const tools = [
    { name: "WordPress", cat: "CMS" }, { name: "Pretty Links", cat: "Tracking" },
    { name: "ConvertKit", cat: "Email" }, { name: "Ahrefs Webmaster", cat: "SEO" },
    { name: "Carrd", cat: "Landing" }, { name: "Google Analytics", cat: "Analytics" },
  ];
  return (
    <div className="rounded-xl border border-white/10 bg-[#0a1520] p-4 text-[10px] font-mono">
      <div className="text-[9px] font-bold uppercase tracking-widest mb-3" style={{ color: CYAN }}>Recommended Tool Stack — Intermediate</div>
      <div className="grid grid-cols-3 gap-1.5">
        {tools.map((t) => (
          <div key={t.name} className="rounded-lg border border-white/10 bg-white/[0.03] px-2 py-1.5 text-center">
            <div className="text-white/75 font-semibold text-[9px]">{t.name}</div>
            <div className="text-white/30 text-[8px]">{t.cat}</div>
          </div>
        ))}
      </div>
      <div className="mt-2 text-white/30 text-[9px]">Est. total: ~$35/mo</div>
    </div>
  );
}

function DeliverableMock({ type }: { type: string }) {
  if (type === "spreadsheet") return <SharedSpreadsheetMock rows={4} />;
  if (type === "doc") return <SharedDocMock />;
  if (type === "seo") return <SharedSeoMock />;
  if (type === "checklist") return <SharedChecklistMock />;
  if (type === "niches") return <SharedNichesMock />;
  if (type === "tools") return <SharedToolsMock />;
  return null;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ReferralBlueprintPage() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [stickyVisible, setStickyVisible] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [openDeliverable, setOpenDeliverable] = useState<number | null>(0);
  const heroRef = useRef<HTMLDivElement>(null);

  const set = (k: keyof FormData, v: string) => setForm((p) => ({ ...p, [k]: v }));
  const toggleChannel = (ch: string) =>
    setForm((p) => ({
      ...p,
      marketingChannels: p.marketingChannels.includes(ch)
        ? p.marketingChannels.filter((c) => c !== ch)
        : [...p.marketingChannels, ch],
    }));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setStickyVisible(!entry.isIntersecting),
      { threshold: 0 }
    );
    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.name.trim() || !form.email.trim()) {
      setError("Name and email are required.");
      return;
    }
    setSubmitting(true);
    analytics.blueprintIntakeStarted();
    try {
      const res = await fetch("/api/referral-blueprint-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }
      analytics.blueprintCheckoutInitiated();
      window.location.href = data.url;
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const faqs = [
    {
      q: "What exactly is in the 250+ program database?",
      a: "A structured Excel file with 250+ affiliate and referral programs sorted by industry category. Every row includes the company name, direct program link, commission structure (rate, type, payout model), cookie window, and a suggested marketing angle. Categories: AI tools, SaaS, health, startup tools, and fintech - with 40-60 programs per category. All entries are manually verified.",
    },
    {
      q: "How is this different from a free affiliate marketing guide?",
      a: "Free guides explain how affiliate marketing works conceptually. This blueprint tells you which specific programs to promote, how to position each one, which SEO pages to build, and which channels to use - with your niche and goals already factored in. The database alone represents 3-6 months of research most people never finish.",
    },
    {
      q: "How is the blueprint personalised to me?",
      a: "You complete an intake form before checkout covering your niche, primary goal, preferred channels, and experience level. Jarred reads your answers and writes the strategy brief, selects niche recommendations, and tailors distribution playbooks to your stated channels. If anything is unclear, we email before delivering.",
    },
    {
      q: "Do I need an existing website or audience?",
      a: "No. The blueprint is designed for people starting from scratch. It includes SEO page concepts you can build from zero, distribution strategies that do not require an existing following, and a tool stack recommendation for setting up your first affiliate site.",
    },
    {
      q: "What affiliate programs pay the highest commissions?",
      a: "The highest earners fall into three groups: recurring SaaS commissions (20-50% of monthly subscription, compounding over time), health and telehealth flat fees ($50-$150 per customer), and fintech referral bonuses ($30-$200 per verified referral). Full commission structures are listed for every entry in the database.",
    },
    {
      q: "What happens after I pay?",
      a: "You receive a confirmation email immediately. Jarred reviews your intake form and delivers the full package - database, strategy brief, SEO concepts, distribution playbooks, niche brief, and tool stack - within 48 hours. No subscription, no additional charges, no upsell.",
    },
    {
      q: "Is there a refund policy?",
      a: "Given the personalised strategy brief and digital delivery format, this product is non-refundable once delivered. But satisfaction is the point: if the brief misses the mark for your situation, reply and we will revise it until it fits - the goal is a brief you can act on, not a refund you have to chase. If you have questions before purchasing, email jarred@referlabs.com.au and we will answer them before you commit.",
    },
    {
      q: "Is this relevant for affiliate marketing in Australia specifically?",
      a: "Yes. The health and fintech categories are heavily weighted toward Australian programs - Moshy, Juniper, Mosh Hair, Stake, Pearler, and Hatch are all included with AU-specific commission structures. The SEO page concepts are written with the Australian search landscape in mind.",
    },
    {
      q: "Can I use this to build a comparison or deal directory site?",
      a: "Yes - that is one of the primary use cases. The database provides the raw program data and the SEO page concepts include comparison and directory page formats specifically. The niche selection brief flags which categories have the strongest search demand for comparison-style content.",
    },
  ];

  return (
    <div className="relative bg-[#060f15] text-white">

      {/* ── STICKY BOTTOM BAR ─────────────────────────────────────────────── */}
      <div className={`fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-[#060f15]/95 backdrop-blur-md transition-all duration-300 ${stickyVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}>
        <div className="mx-auto max-w-5xl px-5 sm:px-8 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <p className="text-sm font-black text-white">Referral Growth Blueprint</p>
            <p className="text-xs text-white/50">250+ programs · Personalised brief · Delivered in 48 hrs · $799 once</p>
          </div>
          <a href="#register" className="flex-shrink-0 inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-black text-[#060f15] hover:opacity-90 transition-all" style={{ background: AMBER }}>
            Get the Blueprint - $799 <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative pt-28 pb-16 sm:pt-36 sm:pb-20 overflow-hidden border-b border-white/10">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,rgba(10,167,181,0.12),transparent_50%)]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 text-xs text-white/35">
            <Link href="/" className="hover:text-white/60 transition-colors">Refer Labs</Link>
            <span>/</span>
            <Link href="/guides" className="hover:text-white/60 transition-colors">Guides</Link>
            <span>/</span>
            <span className="text-white/55">Referral Growth Blueprint</span>
          </nav>

          <div className="grid lg:grid-cols-[1fr_520px] gap-10 lg:gap-16 items-start">

            {/* LEFT */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-6 text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: CYAN, background: `${CYAN}12`, border: `1px solid ${CYAN}25` }}>
                <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: CYAN }} />
                By Refer Labs · Australia 2026
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-[58px] font-black tracking-tight leading-[0.96] mb-6 text-white">
                The Referral Growth Blueprint.<br />
                Refer Labs&apos; own affiliate playbook,<br />
                <span style={{ color: AMBER }}>built for your niche in 48 hours.</span>
              </h1>

              <p className="text-lg sm:text-xl text-white/70 leading-relaxed max-w-xl mb-8">
                Our own in-house product, not a third-party course. A 250+ affiliate program list plus a referral growth strategy Jarred writes for your specific niche. Not a template, not automated.
              </p>

              <div className="space-y-2.5 mb-10">
                {[
                  { icon: <Database className="h-4 w-4" />, text: "250+ programs - commission rate, link, and marketing angle per entry" },
                  { icon: <Brain className="h-4 w-4" />,    text: "Strategy brief written by Jarred for your specific niche and channels" },
                  { icon: <Clock className="h-4 w-4" />,    text: "Delivered to your inbox within 48 hours of purchase" },
                ].map(({ icon, text }) => (
                  <div key={text} className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: `${CYAN}20`, color: CYAN }}>
                      {icon}
                    </div>
                    <span className="text-sm text-white/75 leading-relaxed">{text}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-3">
                <a href="#register" className="inline-flex items-center gap-2.5 rounded-xl px-8 py-4 text-base font-black text-[#060f15] hover:-translate-y-0.5 transition-all shadow-xl" style={{ background: AMBER, boxShadow: `0 12px 40px ${AMBER}40` }}>
                  Get Your Blueprint — $799 AUD
                  <ArrowRight className="h-5 w-5" />
                </a>
                <a href="/#free-preview" className="inline-flex items-center gap-2 rounded-xl px-6 py-4 text-sm font-bold text-white/80 hover:text-white border border-white/20 hover:border-white/40 transition-all">
                  See free preview first
                </a>
              </div>
              <div className="text-xs text-white/45 leading-relaxed">
                One-time payment · No subscription · Delivered in 48 hours · Questions? <a href="mailto:jarred@referlabs.com.au" className="underline text-white/60 hover:text-white transition-colors">jarred@referlabs.com.au</a>
              </div>
            </div>

            {/* RIGHT - Spreadsheet preview */}
            <div className="relative">
              <SpreadsheetMock blurred rows={7} />
              {/* Callout labels */}
              <div className="absolute -left-3 top-[72px] z-30 hidden lg:flex items-center gap-1.5">
                <div className="rounded-lg px-2.5 py-1.5 text-[10px] font-bold shadow-xl" style={{ background: "#0d1a22", border: `1px solid ${CYAN}40`, color: CYAN }}>
                  Commission structure
                </div>
                <div className="h-px w-6 opacity-40" style={{ background: CYAN }} />
              </div>
              <div className="absolute -left-3 top-[108px] z-30 hidden lg:flex items-center gap-1.5">
                <div className="rounded-lg px-2.5 py-1.5 text-[10px] font-bold shadow-xl" style={{ background: "#0d1a22", border: "1px solid rgba(245,158,11,0.4)", color: AMBER }}>
                  Program category
                </div>
                <div className="h-px w-6 opacity-40" style={{ background: AMBER }} />
              </div>
              <div className="absolute -right-3 top-[148px] z-30 hidden lg:flex items-center gap-1.5 flex-row-reverse">
                <div className="rounded-lg px-2.5 py-1.5 text-[10px] font-bold shadow-xl" style={{ background: "#0d1a22", border: "1px solid rgba(139,92,246,0.4)", color: "#A78BFA" }}>
                  Marketing angle
                </div>
                <div className="h-px w-6 opacity-40 bg-purple-400" />
              </div>
              <p className="text-center mt-3 text-[10px] text-white/30 italic">Actual database preview - blurred for IP protection</p>
            </div>

          </div>
        </div>
      </section>

      {/* ── STATS BAR ─────────────────────────────────────────────────────── */}
      <section className="border-b border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-5xl px-5 sm:px-8 py-6 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-0 sm:divide-x divide-white/10">
          {[
            { stat: "250+",  label: "Programs researched and verified" },
            { stat: "5",     label: "Industry categories covered" },
            { stat: "48hrs", label: "Delivery from payment" },
            { stat: "$799",  label: "One-time, no subscription" },
          ].map(({ stat, label }) => (
            <div key={stat} className="text-center sm:px-8">
              <div className="text-2xl font-black text-white mb-0.5">{stat}</div>
              <div className="text-xs text-white/45 leading-relaxed">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── THREE OPTIONS PROBLEM ─────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 border-b border-white/10">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-3">
            You want affiliate income but...
          </h2>
          <p className="text-white/55 mb-12 max-w-xl text-base">
            Most people considering affiliate marketing run into one of these three dead ends.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 mb-10">
            {[
              {
                num: "01",
                title: "Spend 6 months researching programs yourself",
                pain: "You start enthusiastic, build a spreadsheet of 30-50 programs, lose momentum after week 4, and stop. The list sits unused.",
                cost: "Months of unpaid work, no clear strategy",
              },
              {
                num: "02",
                title: "Pay a consultant $5K+ for generic strategy",
                pain: "Most affiliate marketing consultants deliver a 20-page deck with the same advice they give every client. Then you still have to find the programs and build the pages yourself.",
                cost: "$5,000+, no execution layer",
              },
              {
                num: "03",
                title: "Buy a generic $99 affiliate program list",
                pain: "Half the programs are dead links. There's no strategy on which to prioritise. No personalisation for your niche or channels. Just a list.",
                cost: "$99, but you waste weeks figuring out what to do with it",
              },
            ].map(({ num, title, pain, cost }) => (
              <div key={num} className="rounded-2xl border border-red-500/15 bg-red-500/[0.03] p-6">
                <p className="text-[10px] font-bold uppercase tracking-widest text-red-400 mb-3">Option {num}</p>
                <h3 className="text-base font-black text-white mb-3">{title}</h3>
                <p className="text-sm text-white/50 leading-relaxed mb-4">{pain}</p>
                <div className="flex items-start gap-2 pt-3 border-t border-red-500/10">
                  <X className="h-3.5 w-3.5 text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-red-300/80 font-semibold">{cost}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-2xl border-2 p-6 text-center" style={{ borderColor: `${AMBER}50`, background: `${AMBER}07` }}>
            <p className="text-2xl font-black text-white mb-2">There&apos;s a better way.</p>
            <p className="text-sm text-white/65 max-w-2xl mx-auto">
              The Referral Growth Blueprint is the database (250+ programs, all verified) <strong className="text-white">plus</strong> the personalised strategy written for your specific situation. $799 once, delivered in 48 hours. No subscription, no upsell.
            </p>
          </div>
        </div>
      </section>

      {/* ── NOT A COURSE ──────────────────────────────────────────────────── */}
      <section className="py-16 border-b border-white/10 bg-[#071018]">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-8 text-white">
            Not a course. A working asset.
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { no: "No theory about affiliate marketing", yes: "250+ real programs, ready to promote" },
              { no: "No generic niche advice",             yes: "3-5 niches matched to your goals" },
              { no: "No subscription or ongoing cost",     yes: "One payment, everything delivered" },
              { no: "No templates that don't fit you",     yes: "Strategy brief written for your intake" },
            ].map(({ no, yes }) => (
              <div key={no} className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
                <div className="flex items-start gap-2 mb-3">
                  <X className="h-3.5 w-3.5 text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-white/35 line-through leading-relaxed">{no}</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" style={{ color: CYAN }} />
                  <p className="text-xs font-bold text-white leading-relaxed">{yes}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SIX DELIVERABLES (VISUAL CARDS) ───────────────────────────────── */}
      <section className="py-24 sm:py-32 border-b border-white/10">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-2">
                Six deliverables. One payment.
              </h2>
              <p className="text-white/55 max-w-xl">
                Everything arrives in your inbox within 48 hours. No drip schedule, no course platform, nothing held back.
              </p>
            </div>
            <a href="#register" className="flex-shrink-0 inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-black text-[#060f15] hover:opacity-90 transition-all" style={{ background: AMBER }}>
              Get All Six - $799
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="grid lg:grid-cols-2 gap-4">
            {deliverables.map((item, i) => {
              const isOpen = openDeliverable === i;
              return (
                <div key={item.num} className={`rounded-2xl border transition-all duration-200 ${isOpen ? "border-white/20 bg-white/[0.04]" : "border-white/10 bg-white/[0.02] hover:border-white/15"}`}>
                  <button type="button" onClick={() => setOpenDeliverable(isOpen ? null : i)} className="w-full flex items-start gap-4 p-5 text-left">
                    <div className="h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${CYAN}20`, color: CYAN }}>
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[9px] font-bold uppercase tracking-widest text-white/30 block mb-0.5">{item.num}</span>
                          <h3 className="text-sm font-black text-white">{item.headline}</h3>
                          <p className="text-xs text-white/55 mt-0.5">{item.outcome}</p>
                        </div>
                        <div className="h-7 w-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors mt-0.5" style={{ background: isOpen ? `${CYAN}25` : "rgba(255,255,255,0.06)" }}>
                          {isOpen ? <ChevronUp className="h-3.5 w-3.5" style={{ color: CYAN }} /> : <ChevronDown className="h-3.5 w-3.5 text-white/40" />}
                        </div>
                      </div>
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 border-t border-white/10">
                      <div className="pt-5 space-y-5">
                        {/* Visual mock */}
                        <DeliverableMock type={item.mock} />

                        {/* What / Why / How structure */}
                        <div className="grid sm:grid-cols-3 gap-3">
                          <div className="rounded-xl border border-white/10 bg-white/[0.025] p-4">
                            <p className="text-[9px] font-bold uppercase tracking-widest mb-2" style={{ color: CYAN }}>What it is</p>
                            <p className="text-xs text-white/70 leading-relaxed">{item.whatItIs}</p>
                          </div>
                          <div className="rounded-xl border border-white/10 bg-white/[0.025] p-4">
                            <p className="text-[9px] font-bold uppercase tracking-widest mb-2" style={{ color: CYAN }}>Why it matters</p>
                            <p className="text-xs text-white/70 leading-relaxed">{item.whyItMatters}</p>
                          </div>
                          <div className="rounded-xl border border-white/10 bg-white/[0.025] p-4">
                            <p className="text-[9px] font-bold uppercase tracking-widest mb-2" style={{ color: CYAN }}>How it&apos;s used</p>
                            <p className="text-xs text-white/70 leading-relaxed">{item.howUsed}</p>
                          </div>
                        </div>

                        {/* Value replaces */}
                        <div className="rounded-xl border p-4 flex items-start gap-3" style={{ borderColor: `${AMBER}40`, background: `${AMBER}07` }}>
                          <DollarSign className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: AMBER }} />
                          <div>
                            <p className="text-[9px] font-bold uppercase tracking-widest mb-1" style={{ color: AMBER }}>Value it replaces</p>
                            <p className="text-xs text-white/75 font-semibold">{item.valueReplaces}</p>
                          </div>
                        </div>

                        {/* Bullets */}
                        <div>
                          <p className="text-[9px] font-bold uppercase tracking-widest text-white/35 mb-3">What is included</p>
                          <ul className="grid sm:grid-cols-2 gap-2">
                            {item.bullets.map((b) => (
                              <li key={b} className="flex items-start gap-2">
                                <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" style={{ color: CYAN }} />
                                <span className="text-xs text-white/70 leading-relaxed">{b}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                          <p className="text-[9px] font-bold uppercase tracking-widest text-white/35 mb-2">What Refer Labs does</p>
                          <p className="text-xs text-white/65 leading-relaxed">{item.provides}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SAMPLE OUTPUTS ────────────────────────────────────────────────── */}
      <section className="py-24 sm:py-32 border-b border-white/10 bg-[#071018]">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-3">
              This is what you actually receive.
            </h2>
            <p className="text-white/55 max-w-xl">
              Sample extracts from real deliverables. The full versions are longer, more detailed, and written for your specific niche.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-5">
            {/* Sample 1 - Database */}
            <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-[#060f15] p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-7 w-7 rounded-lg flex items-center justify-center" style={{ background: `${CYAN}20`, color: CYAN }}>
                  <FileSpreadsheet className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-black text-white">Affiliate Program Database</p>
                  <p className="text-[10px] text-white/40">Sample extract — 10 of 250+ rows shown</p>
                </div>
              </div>
              <SpreadsheetMock rows={10} />
              <p className="text-[10px] text-white/30 mt-2">* Full database includes 250+ rows across 5 categories with direct program links</p>
            </div>

            {/* Sample 2 - Strategy brief */}
            <div className="rounded-2xl border border-white/10 bg-[#060f15] p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-7 w-7 rounded-lg flex items-center justify-center" style={{ background: `${CYAN}20`, color: CYAN }}>
                  <Brain className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-black text-white">Strategy Brief</p>
                  <p className="text-[10px] text-white/40">Sample extract</p>
                </div>
              </div>
              <DocMock />
              <p className="text-[10px] text-white/30 mt-2">* Full brief is 8+ pages, written for your specific answers</p>
            </div>

            {/* Sample 3 - SEO + Niche side by side */}
            <div className="rounded-2xl border border-white/10 bg-[#060f15] p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-7 w-7 rounded-lg flex items-center justify-center" style={{ background: `${CYAN}20`, color: CYAN }}>
                  <Search className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-black text-white">SEO Page Concepts</p>
                  <p className="text-[10px] text-white/40">Sample extract</p>
                </div>
              </div>
              <SeoMock />
              <p className="text-[10px] text-white/30 mt-2">* 10+ SEO concepts, each with structural page brief</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#060f15] p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-7 w-7 rounded-lg flex items-center justify-center" style={{ background: `${CYAN}20`, color: CYAN }}>
                  <BarChart3 className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-black text-white">Niche Selection Brief</p>
                  <p className="text-[10px] text-white/40">Sample extract</p>
                </div>
              </div>
              <NichesMock />
              <p className="text-[10px] text-white/30 mt-2">* Matched to your intake answers, not generic</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#060f15] p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-7 w-7 rounded-lg flex items-center justify-center" style={{ background: `${CYAN}20`, color: CYAN }}>
                  <Share2 className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-black text-white">Distribution Playbook</p>
                  <p className="text-[10px] text-white/40">Sample extract</p>
                </div>
              </div>
              <ChecklistMock />
              <p className="text-[10px] text-white/30 mt-2">* One playbook per stated channel, action-list format</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── BEFORE / AFTER ────────────────────────────────────────────────── */}
      <section className="py-24 sm:py-32 border-b border-white/10">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-12">
            The difference this makes.
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {/* Without */}
            <div className="rounded-2xl border border-red-500/20 bg-red-500/[0.04] p-6">
              <div className="flex items-center gap-2 mb-6">
                <div className="h-7 w-7 rounded-full bg-red-500/20 flex items-center justify-center">
                  <X className="h-4 w-4 text-red-400" />
                </div>
                <p className="text-sm font-black text-red-400">Without the blueprint</p>
              </div>
              <div className="space-y-4">
                {[
                  { icon: <Clock className="h-4 w-4" />, text: "3-6 months manually researching affiliate programs one by one" },
                  { icon: <AlertCircle className="h-4 w-4" />, text: "No structure - random programs, no commission data, no marketing angles" },
                  { icon: <Target className="h-4 w-4" />, text: "Picking a niche based on what sounds good, not what you can distribute" },
                  { icon: <Search className="h-4 w-4" />, text: "Guessing which SEO keywords to target with no validation" },
                  { icon: <DollarSign className="h-4 w-4" />, text: "Low early commissions because you started with the wrong programs" },
                ].map(({ icon, text }) => (
                  <div key={text} className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded flex items-center justify-center flex-shrink-0 mt-0.5 text-red-400/70">{icon}</div>
                    <p className="text-sm text-white/50 leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* With */}
            <div className="rounded-2xl border border-[#0AA7B5]/25 p-6" style={{ background: `${CYAN}07` }}>
              <div className="flex items-center gap-2 mb-6">
                <div className="h-7 w-7 rounded-full flex items-center justify-center" style={{ background: `${CYAN}25` }}>
                  <Check className="h-4 w-4" style={{ color: CYAN }} />
                </div>
                <p className="text-sm font-black" style={{ color: CYAN }}>With the blueprint</p>
              </div>
              <div className="space-y-4">
                {[
                  { icon: <Database className="h-4 w-4" />, text: "250+ programs already researched, verified, and formatted - start building day one" },
                  { icon: <Brain className="h-4 w-4" />,    text: "Personalised strategy brief tells you exactly where to start and in what order" },
                  { icon: <Target className="h-4 w-4" />,   text: "3-5 niches selected based on your specific goals and distribution capability" },
                  { icon: <Rocket className="h-4 w-4" />,   text: "10+ SEO page concepts with real keyword data and structural briefs ready to build" },
                  { icon: <DollarSign className="h-4 w-4" />, text: "High-commission programs prioritised from day one based on your niche" },
                ].map(({ icon, text }) => (
                  <div key={text} className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded flex items-center justify-center flex-shrink-0 mt-0.5" style={{ color: CYAN }}>{icon}</div>
                    <p className="text-sm text-white/75 leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW PERSONALISATION WORKS ─────────────────────────────────────── */}
      <section className="py-24 sm:py-32 border-b border-white/10 bg-[#071018]">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-4">
            How we build your blueprint.
          </h2>
          <p className="text-white/55 max-w-xl mb-14">
            This is not a download assembled once and sold to everyone. Every order is individually reviewed. Your intake answers are read. Your deliverables are prepared for your situation.
          </p>

          <div className="grid sm:grid-cols-3 gap-4 items-start">
            {/* Inputs */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">
              <p className="text-[9px] font-bold uppercase tracking-widest text-white/35 mb-5">You provide</p>
              <div className="space-y-3">
                {[
                  { label: "Niche / industry", example: "e.g. AI tools, health, fintech" },
                  { label: "Primary goal",      example: "e.g. build affiliate revenue" },
                  { label: "Preferred channels", example: "e.g. SEO + email" },
                  { label: "Experience level",   example: "Beginner / Intermediate / Advanced" },
                ].map(({ label, example }) => (
                  <div key={label} className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3">
                    <p className="text-xs font-semibold text-white/80">{label}</p>
                    <p className="text-[10px] text-white/35 mt-0.5">{example}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Arrow + process */}
            <div className="flex flex-col items-center justify-center gap-6 py-6">
              <div className="text-center">
                <div className="h-12 w-12 rounded-full border-2 flex items-center justify-center mx-auto mb-3" style={{ borderColor: `${CYAN}40`, background: `${CYAN}10` }}>
                  <Brain className="h-6 w-6" style={{ color: CYAN }} />
                </div>
                <p className="text-sm font-black text-white">Jarred reviews</p>
                <p className="text-xs text-white/45 mt-1 max-w-[160px] mx-auto">Every intake form read personally. Not automated.</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1 w-8 rounded-full" style={{ background: `${CYAN}40` }} />
                <div className="h-2 w-2 rounded-full" style={{ background: CYAN }} />
                <div className="h-1 w-8 rounded-full" style={{ background: `${CYAN}40` }} />
              </div>
              <div className="text-center">
                <div className="h-12 w-12 rounded-full border-2 flex items-center justify-center mx-auto mb-3" style={{ borderColor: `${AMBER}40`, background: `${AMBER}10` }}>
                  <Rocket className="h-6 w-6" style={{ color: AMBER }} />
                </div>
                <p className="text-sm font-black text-white">Delivered in 48 hrs</p>
                <p className="text-xs text-white/45 mt-1 max-w-[160px] mx-auto">Six files to your inbox. Everything at once.</p>
              </div>
            </div>

            {/* Outputs */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">
              <p className="text-[9px] font-bold uppercase tracking-widest text-white/35 mb-5">You receive</p>
              <div className="space-y-3">
                {[
                  { label: "Strategy brief",      note: "Written for your niche and channels" },
                  { label: "250+ program database", note: "Filtered by relevance to your niche" },
                  { label: "SEO page concepts",   note: "Matched to your target keywords" },
                  { label: "Distribution playbooks", note: "Only for your stated channels" },
                  { label: "Niche brief + tool stack", note: "Matched to your experience level" },
                ].map(({ label, note }) => (
                  <div key={label} className="flex items-start gap-2.5 rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2.5">
                    <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" style={{ color: CYAN }} />
                    <div>
                      <p className="text-xs font-semibold text-white/80">{label}</p>
                      <p className="text-[10px] text-white/35 mt-0.5">{note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TIMELINE ──────────────────────────────────────────────────────── */}
      <section className="py-24 sm:py-32 border-b border-white/10">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <h2 className="text-3xl font-black tracking-tight text-white mb-14">From order to execution in 48 hours.</h2>
          <div className="grid sm:grid-cols-4 gap-0 relative">
            {/* Connecting line */}
            <div className="absolute top-5 left-[12.5%] right-[12.5%] h-px hidden sm:block" style={{ background: `linear-gradient(to right, ${CYAN}60, ${AMBER}60)` }} />
            {[
              { day: "Day 0",   label: "Fill intake form",    desc: "Your niche, goal, channels, experience. Under 3 minutes.", color: CYAN,  done: true },
              { day: "Day 0",   label: "Complete checkout",   desc: "One-time $799 via Stripe. Confirmation immediate.",       color: CYAN,  done: true },
              { day: "Day 1-2", label: "Jarred builds yours", desc: "Strategy brief, SEO concepts, and playbooks written.",    color: AMBER, done: false },
              { day: "Day 2",   label: "Everything delivered",desc: "Six files to your inbox. Start building the same day.",  color: AMBER, done: false },
            ].map(({ day, label, desc, color, done }) => (
              <div key={label} className="flex flex-col items-center text-center relative px-4">
                <div className="h-10 w-10 rounded-full border-2 flex items-center justify-center mb-4 z-10 bg-[#060f15]" style={{ borderColor: color, background: done ? `${color}20` : "#060f15" }}>
                  {done ? <Check className="h-5 w-5" style={{ color }} /> : <Clock className="h-4 w-4" style={{ color }} />}
                </div>
                <p className="text-[9px] font-bold uppercase tracking-widest mb-1.5" style={{ color }}>{day}</p>
                <p className="text-sm font-black text-white mb-1.5">{label}</p>
                <p className="text-xs text-white/45 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO IT'S FOR ──────────────────────────────────────────────────── */}
      <section className="py-24 sm:py-32 border-b border-white/10 bg-[#071018]">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-3 text-white">
            Built for people who want results, not homework.
          </h2>
          <p className="text-white/55 text-lg mb-12 max-w-xl">
            No audience required. No prior experience required. A starting point and a plan.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { icon: <TrendingUp className="h-4 w-4" />, label: "Side hustlers",        desc: "Starting from zero who want a proven database rather than months of research" },
              { icon: <Users className="h-4 w-4" />,      label: "Content creators",     desc: "With an audience ready to monetise through matched affiliate programs" },
              { icon: <Zap className="h-4 w-4" />,        label: "Affiliate marketers",  desc: "Who want a structured, categorised database with commission data filled in" },
              { icon: <Rocket className="h-4 w-4" />,     label: "SaaS founders",        desc: "Exploring referral distribution as a scalable growth channel" },
              { icon: <FileSpreadsheet className="h-4 w-4" />, label: "Directory builders", desc: "Who need a starting database to power a comparison or deal site" },
              { icon: <Brain className="h-4 w-4" />,      label: "Entrepreneurs",        desc: "Who want a recurring income stream without building a product from scratch" },
            ].map(({ icon, label, desc }) => (
              <div key={label} className="flex items-start gap-3.5 rounded-xl border border-white/10 bg-white/[0.025] p-5">
                <div className="h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: `${CYAN}20`, color: CYAN }}>
                  {icon}
                </div>
                <div>
                  <p className="text-sm font-bold text-white mb-0.5">{label}</p>
                  <p className="text-xs text-white/50 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OBJECTION HANDLING ────────────────────────────────────────────── */}
      <section className="py-24 sm:py-32 border-b border-white/10">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <h2 className="text-3xl font-black tracking-tight text-white mb-12">
            Common questions before buying.
          </h2>
          <div className="grid lg:grid-cols-2 gap-4 max-w-4xl">
            {[
              {
                q: "What if I don't have a business or website yet?",
                a: "That's fine — and common. The strategy brief and niche selection brief are designed to help you decide what to build first. The tool stack PDF includes recommendations for setting up your first affiliate site from scratch. Many people buy the blueprint specifically to skip the months of indecision before they commit to a niche.",
              },
              {
                q: "What's the difference between this and a generic affiliate program list?",
                a: "Personalisation. A $99 affiliate database is the same file for everyone — no strategy, no execution layer, no help with your specific niche. The Refer Labs Blueprint is a 250+ program database PLUS a strategy brief written by Jarred for YOUR niche, channels, and experience. That's why it takes 48 hours to deliver and costs $799, not $99.",
              },
              {
                q: "Is $799 worth it for a digital product?",
                a: "A single commission from one health telehealth program is $50-$150. A recurring SaaS commission compounds monthly. One referral from one program in the database covers the cost. There are 250+ programs. The research cost avoided is $6,000+ of your time. The question is whether you want to spend $799 now or months finding the same information.",
              },
              {
                q: "What if the programs don't fit my audience?",
                a: "The strategy brief recommends programs based on the audience and niche you specify in the intake form. If your niche is unusual, Jarred emails you before delivering to confirm the fit. The 250+ program database covers 5 broad categories so most niches find strong matches, but the personalised strategy is what does the matching for you.",
              },
              {
                q: "How is this different from buying an online course?",
                a: "Courses teach you general principles. The blueprint gives you specific, ready-to-execute deliverables for your situation — no theory videos, no waiting for next week's module unlock. You get six files in 48 hours and start building on day three. It's a working asset, not a learning experience.",
              },
              {
                q: "Could I build this myself?",
                a: "Yes — in 3-6 months of research plus a strategy consultation. At $100/hr for your time that's $6,000-$12,000 of effort. Most people start that process and never finish. This eliminates the research entirely and adds the strategic layer on top.",
              },
            ].map(({ q, a }) => (
              <div key={q} className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">
                <div className="flex items-start gap-3 mb-3">
                  <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: AMBER }} />
                  <p className="text-sm font-black text-white">{q}</p>
                </div>
                <p className="text-sm text-white/60 leading-relaxed pl-7">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY JARRED WRITES IT, NOT AI ──────────────────────────────────── */}
      <section className="py-24 sm:py-32 border-b border-white/10 bg-[#071018]">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div className="grid lg:grid-cols-[280px_1fr] gap-12 lg:gap-16 items-start">
            <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">
              <div className="h-16 w-16 rounded-2xl flex items-center justify-center text-2xl font-black text-[#060f15] mb-4" style={{ background: `linear-gradient(135deg, ${CYAN}, #22C0CD)` }}>
                JK
              </div>
              <h3 className="text-base font-black text-white mb-0.5">Jarred Krowitz</h3>
              <p className="text-xs text-white/45 mb-4">Director, Refer Labs · Melbourne, AU</p>
              <div className="space-y-2 text-xs text-white/55">
                <div className="flex items-start gap-2">
                  <Check className="h-3 w-3 flex-shrink-0 mt-0.5" style={{ color: CYAN }} />
                  Reads every intake personally
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-3 w-3 flex-shrink-0 mt-0.5" style={{ color: CYAN }} />
                  Writes every strategy brief from scratch
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-3 w-3 flex-shrink-0 mt-0.5" style={{ color: CYAN }} />
                  Emails if your answers raise questions
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-3 w-3 flex-shrink-0 mt-0.5" style={{ color: CYAN }} />
                  Delivers within 48 hours, every time
                </div>
              </div>
              <a href="mailto:jarred@referlabs.com.au" className="mt-5 flex items-center gap-2 text-xs text-white/40 hover:text-white/70 transition-colors">
                <span>📧</span> jarred@referlabs.com.au
              </a>
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-3" style={{ color: AMBER }}>Why this isn&apos;t AI-generated</p>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-5 leading-tight">
                Why Jarred writes it, not an AI.
              </h2>
              <div className="space-y-5 text-white/60 leading-relaxed">
                <p>
                  Generative AI can write a generic affiliate marketing strategy in 30 seconds. It would be polished. It would also be wrong for you — because the model has no idea what your specific niche, channels, or audience look like, and it would invent reasonable-sounding advice rather than analyse your actual situation.
                </p>
                <p>
                  The strategy brief, niche selection, SEO concepts, and distribution playbooks are written from scratch for each customer. Jarred reads your intake form. If your answers raise a question — an ambiguous niche, a missing detail — he emails you before writing anything.
                </p>
                <p>
                  The database is the same for everyone (250+ programs, all manually verified). The strategy layer is fresh per order. That&apos;s the difference between a $99 generic database and a $799 personalised blueprint, and why it takes 48 hours rather than 30 seconds.
                </p>
              </div>

              <div className="mt-8 grid sm:grid-cols-2 gap-3">
                {[
                  { no: "AI-generated strategy brief",         yes: "Written by Jarred after reading your intake" },
                  { no: "Generic niche advice for everyone",   yes: "3-5 niches matched to your specific goals + channels" },
                  { no: "Every playbook included regardless",  yes: "Only playbooks for the channels YOU selected" },
                  { no: "Same tool stack for all levels",      yes: "Tool stack matched to your budget + experience" },
                ].map(({ no, yes }) => (
                  <div key={no} className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
                    <div className="flex items-start gap-2 mb-2.5">
                      <X className="h-3.5 w-3.5 text-red-400 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-white/30 line-through">{no}</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" style={{ color: CYAN }} />
                      <p className="text-xs font-semibold text-white/80">{yes}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF ──────────────────────────────────────────────────── */}
      <section className="py-24 sm:py-32 border-b border-white/10 bg-[#071018]">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <h2 className="text-3xl font-black tracking-tight mb-14 text-white">From people who have used it.</h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              {
                name: "James R.", role: "Freelance marketer",
                text: "I spent four months building a similar list from scratch last year and ended up with around 80 programs. Getting 250 with commission structures already filled in is a genuine shortcut. The database alone is worth the price.",
              },
              {
                name: "Sarah M.", role: "SaaS founder",
                text: "I expected a generic template. The strategy brief was more specific than I anticipated - it reflected the niche I mentioned in the intake form and surfaced five SEO angles I had not considered. Solid work.",
              },
              {
                name: "Daniel K.", role: "Comparison site builder",
                text: "Used the database as the starting point for a comparison site I had been putting off for months. Having the program links and commission data in one spreadsheet removed the main barrier that kept stalling the project.",
              },
            ].map((t) => (
              <div key={t.name} className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 flex flex-col gap-5">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-current" style={{ color: AMBER }} />
                  ))}
                </div>
                <p className="text-sm text-white/75 leading-relaxed flex-1">&ldquo;{t.text}&rdquo;</p>
                <div className="border-t border-white/10 pt-4">
                  <p className="text-sm font-bold text-white">{t.name}</p>
                  <p className="text-xs text-white/40">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING REFRAME ───────────────────────────────────────────────── */}
      <section className="py-24 sm:py-32 border-b border-white/10">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div className="flex flex-col lg:flex-row gap-14 lg:gap-20 items-start">

            <div className="lg:flex-1">
              <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-6 leading-tight text-white">
                The cost of not buying this.
              </h2>
              <div className="space-y-4 text-white/65 leading-relaxed max-w-lg text-base mb-8">
                <p>Most people spend 3-6 months researching affiliate programs manually. They find 60-80 programs with patchy commission data, no marketing angles, and no structure. Then they pick a niche based on what sounds good and build content that does not convert.</p>
                <p>The research cost is estimated at $6,000+ of your time. The cost of starting in the wrong niche is months of wasted content. The cost of not having a structured strategy is no clear execution path.</p>
                <p className="text-white font-semibold">$799 buys you the starting point most people never reach.</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 max-w-sm">
                <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-5">What $799 replaces</p>
                <div className="space-y-3">
                  {[
                    { item: "3-6 months of program research",     value: "~$6,000+ your time" },
                    { item: "Freelance strategy consultation",     value: "$500-$2,000" },
                    { item: "SEO content brief writing",          value: "$300-$800" },
                    { item: "Niche selection consulting",         value: "$200-$500" },
                  ].map(({ item, value }) => (
                    <div key={item} className="flex items-center justify-between gap-4 text-sm">
                      <span className="text-white/55">{item}</span>
                      <span className="text-red-400 font-semibold flex-shrink-0">{value}</span>
                    </div>
                  ))}
                  <div className="border-t border-white/10 pt-3 flex items-center justify-between gap-4 text-sm">
                    <span className="text-white font-bold">Referral Growth Blueprint</span>
                    <span className="font-black text-white">$799</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing card */}
            <div className="lg:w-80 flex-shrink-0 w-full">
              <div className="rounded-2xl border-2 p-8" style={{ borderColor: `${AMBER}60`, background: `${AMBER}06` }}>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1 text-white/55">Referral Growth Blueprint</p>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-4xl font-black text-white">$799</span>
                  <span className="text-white/45 text-sm">AUD - one-time</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {[
                    "250+ programs - Excel, categorised, commission data filled",
                    "Personalised strategy brief written by Jarred",
                    "Niche selection brief (3-5 matches with reasoning)",
                    "10+ SEO page concepts with structural briefs",
                    "Distribution playbooks for your stated channels",
                    "Recommended tool stack matched to your level",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: CYAN }} />
                      <span className="text-sm text-white/70">{item}</span>
                    </li>
                  ))}
                </ul>
                <a href="#register" className="flex items-center justify-center gap-2 w-full rounded-xl py-4 text-sm font-black text-[#060f15] hover:opacity-90 transition-all" style={{ background: AMBER }}>
                  Get the Full System in 48 Hours
                  <ArrowRight className="h-4 w-4" />
                </a>
                <div className="flex items-center justify-center gap-1.5 mt-4">
                  <Lock className="h-3 w-3 text-white/30" />
                  <p className="text-xs text-white/35">Secure checkout via Stripe</p>
                </div>
              </div>
              <div className="mt-4 rounded-xl border border-white/10 px-4 py-3 flex items-start gap-2.5">
                <Lock className="h-3.5 w-3.5 text-white/30 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-white/45">
                  Questions before buying? Email{" "}
                  <a href="mailto:jarred@referlabs.com.au" className="underline text-white/65 hover:text-white transition-colors">jarred@referlabs.com.au</a>
                  {" "}- same day response.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── INTAKE FORM ───────────────────────────────────────────────────── */}
      <section id="register" className="bg-white">
        <div className="mx-auto max-w-5xl px-5 sm:px-8 py-24 sm:py-32">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">

            <div className="lg:w-72 flex-shrink-0 lg:sticky lg:top-28">
              <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-6 text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: CYAN, background: `${CYAN}12`, border: `1px solid ${CYAN}30` }}>
                Step 1 of 2
              </div>
              <h2 className="text-3xl font-black text-black tracking-tight mb-4 leading-tight">
                Tell us about your goals.
              </h2>
              <p className="text-sm text-black/55 leading-relaxed mb-8">
                Your answers inform the strategy brief and niche selection. The difference between a generic document and something written for your situation. Under 3 minutes.
              </p>
              <div className="space-y-3">
                {[
                  "Takes under 3 minutes to complete",
                  "Secure checkout via Stripe - no account required",
                  "Blueprint delivered within 48 hours of payment",
                  "One payment. No subscription. Nothing held back.",
                ].map((t) => (
                  <div key={t} className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0" style={{ color: CYAN }} />
                    <span className="text-xs text-black/55">{t}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 rounded-xl border border-black/10 bg-black/[0.02] p-4">
                <div className="flex gap-0.5 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-current" style={{ color: AMBER }} />
                  ))}
                </div>
                <p className="text-xs text-black/55 leading-relaxed italic">
                  &ldquo;I spent four months building a similar list from scratch and ended up with about 80 programs. Getting 250 with commission structures filled in is a genuine shortcut.&rdquo;
                </p>
                <p className="text-[10px] text-black/35 mt-1.5 font-semibold">James R. - Freelance marketer</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 max-w-xl space-y-8">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-black/45 mb-2">
                    Name <span style={{ color: CYAN }}>*</span>
                  </label>
                  <input type="text" value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Your name" required className="w-full border-b-2 border-black/15 pb-3 text-sm text-black placeholder:text-black/30 focus:outline-none focus:border-[#0AA7B5] transition-colors bg-transparent" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-black/45 mb-2">
                    Email <span style={{ color: CYAN }}>*</span>
                  </label>
                  <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="you@example.com" required className="w-full border-b-2 border-black/15 pb-3 text-sm text-black placeholder:text-black/30 focus:outline-none focus:border-[#0AA7B5] transition-colors bg-transparent" />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-black/45 mb-2">
                  Website <span className="text-black/25 font-normal normal-case tracking-normal ml-1">- optional</span>
                </label>
                <input type="url" value={form.website} onChange={(e) => set("website", e.target.value)} placeholder="https://yoursite.com" className="w-full border-b-2 border-black/15 pb-3 text-sm text-black placeholder:text-black/30 focus:outline-none focus:border-[#0AA7B5] transition-colors bg-transparent" />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-black/45 mb-2">
                  Industry or niche of interest
                </label>
                <input type="text" value={form.industry} onChange={(e) => set("industry", e.target.value)} placeholder="e.g. AI tools, health, SaaS, fintech" className="w-full border-b-2 border-black/15 pb-3 text-sm text-black placeholder:text-black/30 focus:outline-none focus:border-[#0AA7B5] transition-colors bg-transparent" />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-black/45 mb-3">Primary goal</label>
                <div className="grid sm:grid-cols-2 gap-2">
                  {primaryGoalOptions.map((opt) => (
                    <button key={opt} type="button" onClick={() => set("primaryGoal", opt)}
                      className={`text-left px-4 py-3 rounded-xl border text-sm transition-all ${form.primaryGoal === opt ? "border-[#0AA7B5] bg-[#0AA7B5]/[0.07] text-black font-semibold" : "border-black/12 text-black/50 hover:border-black/25 hover:text-black/75"}`}>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-black/45 mb-3">
                  Preferred channels{" "}
                  <span className="text-black/25 font-normal normal-case tracking-normal ml-1">- select all that apply</span>
                </label>
                <div className="grid sm:grid-cols-2 gap-2">
                  {channelOptions.map((ch) => {
                    const active = form.marketingChannels.includes(ch);
                    return (
                      <button key={ch} type="button" onClick={() => toggleChannel(ch)}
                        className={`flex items-center gap-3 text-left px-4 py-3 rounded-xl border text-sm transition-all ${active ? "border-[#0AA7B5] bg-[#0AA7B5]/[0.07] text-black font-semibold" : "border-black/12 text-black/50 hover:border-black/25 hover:text-black/75"}`}>
                        <div className={`h-4 w-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${active ? "border-[#0AA7B5] bg-[#0AA7B5]" : "border-black/25"}`}>
                          {active && <Check className="h-3 w-3 text-white" />}
                        </div>
                        {ch}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-black/45 mb-3">Experience level</label>
                <div className="grid grid-cols-3 gap-2">
                  {["Beginner", "Intermediate", "Advanced"].map((lvl) => (
                    <button key={lvl} type="button" onClick={() => set("experienceLevel", lvl)}
                      className={`py-3 rounded-xl border text-sm font-semibold transition-all ${form.experienceLevel === lvl ? "border-[#0AA7B5] bg-[#0AA7B5]/[0.07] text-black" : "border-black/12 text-black/45 hover:border-black/25"}`}>
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              {error && (
                <div className="border border-red-200 bg-red-50 rounded-xl px-4 py-3 text-sm text-red-600">{error}</div>
              )}

              <button type="submit" disabled={submitting}
                className="flex items-center justify-center gap-3 w-full rounded-xl py-4 text-base font-black text-[#060f15] disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-all"
                style={{ background: AMBER }}>
                {submitting ? (
                  <><Loader2 className="h-4 w-4 animate-spin" />Preparing your checkout...</>
                ) : (
                  <>Continue to Secure Payment - $799 AUD<ArrowRight className="h-4 w-4" /></>
                )}
              </button>

              <div className="flex items-center justify-center gap-1.5 text-xs text-black/35">
                <Lock className="h-3 w-3" />
                Secure checkout via Stripe. Blueprint delivered within 48 hours of payment.
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="py-24 sm:py-32 border-t border-white/10">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <h2 className="text-3xl font-black tracking-tight mb-12 text-white">Common questions</h2>
          <div className="max-w-2xl space-y-1">
            {faqs.map((item, i) => (
              <div key={item.q} className="border-b border-white/10">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex items-center justify-between w-full py-5 text-left gap-4 group">
                  <h3 className="text-sm font-bold text-white group-hover:text-[#0AA7B5] transition-colors">{item.q}</h3>
                  {openFaq === i
                    ? <ChevronUp className="h-4 w-4 flex-shrink-0 text-white/40" />
                    : <ChevronDown className="h-4 w-4 flex-shrink-0 text-white/40" />
                  }
                </button>
                {openFaq === i && (
                  <p className="pb-5 text-sm text-white/65 leading-relaxed">{item.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SEO CONTENT ───────────────────────────────────────────────────── */}
      <section className="py-16 border-t border-white/10">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div className="grid lg:grid-cols-3 gap-10">
            <div>
              <h2 className="text-base font-black text-white mb-3">A referral marketing blueprint built in-house</h2>
              <p className="text-sm text-white/50 leading-relaxed">
                The Referral Growth Blueprint is our own in-house referral marketing blueprint, built by Refer Labs for Australians looking to start or scale affiliate income in 2026. It pairs an affiliate program list for Australia with a referral growth strategy across health telehealth (Moshy, Juniper), fintech (Stake, Pearler, Wise), SaaS platforms, AI tools, and startup tools. Every program includes a direct link, commission structure, and a marketing angle specific to the Australian market.
              </p>
            </div>
            <div>
              <h2 className="text-base font-black text-white mb-3">How to start affiliate marketing in Australia</h2>
              <p className="text-sm text-white/50 leading-relaxed">
                The fastest path to affiliate income is picking one niche with genuine search demand, selecting 5-10 programs with strong commissions, and building SEO-optimised review or comparison pages. The blueprint gives you the program database, niche selection, and SEO page concepts to do this without 3-6 months of research. Delivered within 48 hours of purchase.
              </p>
            </div>
            <div>
              <h2 className="text-base font-black text-white mb-3">Best affiliate programs Australia 2026</h2>
              <p className="text-sm text-white/50 leading-relaxed">
                The database covers 250+ programs including AI tools (20-40% recurring commissions), SaaS platforms (15-50% recurring), health and telehealth AU ($50-$150 CPA), startup tools (25-50% one-time), and fintech ($30-$200 per referral). Full commission data, cookie windows, and program links included for every entry. <Link href="/guides" className="underline text-white/65 hover:text-white transition-colors">Browse individual program reviews</Link> on Refer Labs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── RELATED GUIDES ────────────────────────────────────────────────── */}
      <section className="py-20 border-t border-white/10 bg-[#071018]">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <h2 className="text-2xl font-black tracking-tight mb-2 text-white">Preview programs from the database</h2>
          <p className="text-white/50 text-sm mb-8 max-w-lg">
            Several programs in the database have dedicated review pages on Refer Labs. These give a sample of the depth covered.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { href: "/moshy",     label: "Moshy Weight Loss",     cat: "Health AU",     comm: "$50-$150/sale" },
              { href: "/beehiiv",   label: "beehiiv Newsletter",    cat: "SaaS Platform", comm: "30% recurring" },
              { href: "/carrd",     label: "Carrd Builder",         cat: "Startup Tools", comm: "30% one-time" },
              { href: "/durableai", label: "Durable AI",            cat: "AI Tools",      comm: "20% recurring" },
            ].map((p) => (
              <Link key={p.href} href={p.href}
                className="group rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 hover:border-[#0AA7B5]/30 hover:bg-[#0AA7B5]/[0.04] transition-all">
                <p className="text-[9px] font-bold uppercase tracking-widest mb-2" style={{ color: CYAN }}>{p.cat}</p>
                <p className="text-sm font-bold text-white mb-1 group-hover:text-[#22C0CD] transition-colors">{p.label}</p>
                <p className="text-xs text-white/40 mb-3">{p.comm}</p>
                <p className="text-xs font-semibold transition-colors" style={{ color: CYAN }}>View review →</p>
              </Link>
            ))}
          </div>
          <p className="text-xs text-white/30 mt-4">
            The full database includes 250+ programs.{" "}
            <Link href="/guides" className="underline text-white/45 hover:text-white transition-colors">Browse all guides</Link> on Refer Labs.
          </p>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────────────── */}
      <section className="border-t border-white/10 bg-[#060f15] py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-5 sm:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4 text-white">
            Get the full system in 48 hours.
          </h2>
          <p className="text-white/55 text-base max-w-md mx-auto mb-8">
            250+ programs, personalised strategy, SEO concepts, playbooks, niche brief, and tool stack. One payment. Nothing held back.
          </p>

          {/* Mini deliverable icons */}
          <div className="flex items-center justify-center gap-3 mb-10 flex-wrap">
            {[
              { icon: <FileSpreadsheet className="h-4 w-4" />, label: "Database" },
              { icon: <Brain className="h-4 w-4" />,          label: "Strategy" },
              { icon: <Search className="h-4 w-4" />,         label: "SEO" },
              { icon: <Share2 className="h-4 w-4" />,         label: "Playbooks" },
              { icon: <BarChart3 className="h-4 w-4" />,      label: "Niches" },
              { icon: <Wrench className="h-4 w-4" />,         label: "Tools" },
            ].map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-1.5 rounded-full px-3 py-1.5 border border-white/10 bg-white/[0.03]">
                <span style={{ color: CYAN }}>{icon}</span>
                <span className="text-xs text-white/60">{label}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#register"
              className="inline-flex items-center gap-2 rounded-xl px-10 py-4 text-base font-black text-[#060f15] hover:-translate-y-0.5 transition-all shadow-xl"
              style={{ background: AMBER, boxShadow: `0 12px 40px ${AMBER}35` }}>
              Get the Blueprint - $799 AUD
              <ArrowRight className="h-5 w-5" />
            </a>
            <Link href="/contact" className="text-sm text-white/40 hover:text-white transition-colors">
              Questions first? Contact us
            </Link>
          </div>

          <p className="text-xs text-white/25 mt-6">One-time payment - No subscription - Delivered within 48 hours of purchase</p>
        </div>
      </section>

      <div className="h-20 sm:h-0" />
    </div>
  );
}
