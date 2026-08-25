"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle2, Clock, FileSpreadsheet, Brain, Rocket,
  Share2, BarChart3, Wrench, Check, Mail, ArrowRight,
  RefreshCw, AlertCircle, ExternalLink, BookOpen,
} from "lucide-react";

const CYAN  = "#0AA7B5";
const AMBER = "#F59E0B";
const SITE_URL = "https://referlabs.com.au";

type PurchaseData = {
  name: string;
  email: string;
  industry: string;
  primaryGoal: string;
  experienceLevel: string;
  purchasedAt: string;
  status: "preparing" | "delivered";
};

const DELIVERABLES = [
  { icon: <FileSpreadsheet className="h-4 w-4" />, label: "250+ Affiliate & Referral Program Database", format: "Excel (.xlsx)" },
  { icon: <Brain className="h-4 w-4" />,           label: "Personalised Strategy Brief",               format: "PDF" },
  { icon: <BarChart3 className="h-4 w-4" />,       label: "Niche Selection Brief",                    format: "PDF" },
  { icon: <Rocket className="h-4 w-4" />,          label: "10+ SEO Page Concepts",                    format: "PDF" },
  { icon: <Share2 className="h-4 w-4" />,          label: "Distribution Playbooks",                   format: "PDF" },
  { icon: <Wrench className="h-4 w-4" />,          label: "Recommended Tool Stack",                   format: "PDF" },
];

const PREP_STEPS = [
  { id: "niche",     label: "Write down your top 3 niche options", detail: "Think about what you already know, what you enjoy, and where you spend time online. This feeds directly into your niche brief." },
  { id: "channels",  label: "List which channels you actively use", detail: "Reddit? Email list? Facebook groups? TikTok? Being honest here helps us write distribution playbooks that actually apply to you." },
  { id: "domain",    label: "Register a domain name (if you need one)", detail: "Namecheap or Cloudflare. $10-15 AUD. You will need this for your first SEO page or comparison site. Do this now while you wait." },
  { id: "tracking",  label: "Create a free Pretty Links account", detail: "prettylinksplugin.com, free tier is fine to start. This is how you track which affiliate links convert. Set it up now." },
  { id: "spreadsheet", label: "Open a fresh Google Sheet", detail: "When your database arrives, you will filter it immediately. Having a working spreadsheet environment open saves time on day one." },
];

const QUICK_LINKS = [
  { label: "Namecheap, domain registration",       href: "https://www.namecheap.com",         note: "$10 AUD/year" },
  { label: "Pretty Links, affiliate link tracking", href: "https://prettylinks.com",            note: "Free to start" },
  { label: "Ahrefs Webmaster Tools",                 href: "https://ahrefs.com/webmaster-tools", note: "Free SEO tool" },
  { label: "Google Search Console",                  href: "https://search.google.com/search-console", note: "Free indexing" },
  { label: "beehiiv, newsletter platform",          href: `${SITE_URL}/beehiiv`,                note: "30% recurring commissions" },
  { label: "Moshy, health telehealth AU",           href: `${SITE_URL}/moshy`,                  note: "$50-$150 per referral" },
];

function BlueprintPortal() {
  const searchParams     = useSearchParams();
  const [token, setToken] = useState<string | null>(null);
  const [purchase, setPurchase] = useState<PurchaseData | null>(null);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState<string | null>(null);
  const [checked, setChecked]   = useState<Record<string, boolean>>({});

  // Persist token from URL into localStorage so returning visitors stay logged in
  useEffect(() => {
    const urlToken = searchParams.get("token");
    if (urlToken) {
      localStorage.setItem("blueprint_token", urlToken);
      setToken(urlToken);
    } else {
      const stored = localStorage.getItem("blueprint_token");
      if (stored) setToken(stored);
      else setLoading(false);
    }
  }, [searchParams]);

  // Load checked state from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("blueprint_checklist");
      if (saved) setChecked(JSON.parse(saved) as Record<string, boolean>);
    } catch {}
  }, []);

  const toggleCheck = (id: string) => {
    setChecked((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      localStorage.setItem("blueprint_checklist", JSON.stringify(next));
      return next;
    });
  };

  const verify = useCallback(async (t: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/blueprint-access/verify?token=${encodeURIComponent(t)}`);
      const data = await res.json() as { valid: boolean; error?: string; reason?: string } & Partial<PurchaseData>;
      if (!res.ok || !data.valid) {
        setError(
          data.reason === "unavailable"
            ? "We could not check your access just now, and that is a problem at our end rather than anything wrong with your link. Email jarred@referlabs.com.au and we will restore your access."
            : "This portal link is not recognised. Please check your confirmation email or contact jarred@referlabs.com.au",
        );
      } else {
        setPurchase({
          name:             data.name || "there",
          email:            data.email || "",
          industry:         data.industry || "",
          primaryGoal:      data.primaryGoal || "",
          experienceLevel:  data.experienceLevel || "",
          purchasedAt:      data.purchasedAt || "",
          status:           (data.status as "preparing" | "delivered") || "preparing",
        });
      }
    } catch {
      setError("Could not connect. Please try refreshing the page.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (token) void verify(token);
  }, [token, verify]);

  const firstName   = purchase?.name?.split(" ")[0] || "there";
  const hoursLeft   = purchase?.purchasedAt
    ? Math.max(0, 48 - Math.floor((Date.now() - new Date(purchase.purchasedAt).getTime()) / 3_600_000))
    : 48;
  const isDelivered = purchase?.status === "delivered";

  // ── No token state ─────────────────────────────────────────────────────────
  if (!loading && !token) {
    return (
      <div className="min-h-screen bg-[#060f15] flex items-center justify-center px-5">
        <div className="max-w-md w-full text-center">
          <div className="h-14 w-14 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: `${AMBER}20` }}>
            <AlertCircle className="h-7 w-7" style={{ color: AMBER }} />
          </div>
          <h1 className="text-2xl font-black text-white mb-3">No access link found</h1>
          <p className="text-white/55 text-sm leading-relaxed mb-8">
            Your portal access link was included in your purchase confirmation email. Check your inbox for an email from Refer Labs with the subject line &ldquo;Your Referral Growth Blueprint, confirmed&rdquo;.
          </p>
          <div className="space-y-3">
            <a href="mailto:jarred@referlabs.com.au?subject=Blueprint%20portal%20access"
              className="flex items-center justify-center gap-2 w-full rounded-xl py-3.5 text-sm font-bold text-[#060f15] hover:opacity-90 transition-all"
              style={{ background: AMBER }}>
              <Mail className="h-4 w-4" />
              Email us for help
            </a>
            <Link href="/referral-blueprint" className="flex items-center justify-center gap-2 w-full rounded-xl border border-white/15 py-3.5 text-sm text-white/60 hover:text-white hover:border-white/30 transition-all">
              Back to the blueprint page
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ── Loading state ──────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-[#060f15] flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" style={{ color: CYAN }} />
          <p className="text-white/45 text-sm">Verifying your access...</p>
        </div>
      </div>
    );
  }

  // ── Error state ────────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="min-h-screen bg-[#060f15] flex items-center justify-center px-5">
        <div className="max-w-md w-full text-center">
          <div className="h-14 w-14 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="h-7 w-7 text-red-400" />
          </div>
          <h1 className="text-xl font-black text-white mb-3">Portal access not recognised</h1>
          <p className="text-white/55 text-sm leading-relaxed mb-8">{error}</p>
          <a href="mailto:jarred@referlabs.com.au?subject=Blueprint%20portal%20access%20issue"
            className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold text-[#060f15] hover:opacity-90 transition-all"
            style={{ background: AMBER }}>
            <Mail className="h-4 w-4" />
            Contact us
          </a>
        </div>
      </div>
    );
  }

  if (!purchase) return null;

  // ── Portal ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#060f15] text-white pb-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,rgba(10,167,181,0.08),transparent_55%)]" />

      <div className="relative mx-auto max-w-4xl px-5 sm:px-8 pt-20">

        {/* Header */}
        <div className="mb-12">
          <p className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: CYAN }}>Blueprint Portal</p>
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">
            Hi {firstName}. Welcome to your portal.
          </h1>
          <p className="text-white/50 text-sm">
            {purchase.email} &nbsp;·&nbsp; Purchased {new Date(purchase.purchasedAt).toLocaleDateString("en-AU", { dateStyle: "long" })}
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_300px] gap-6">

          {/* LEFT COLUMN */}
          <div className="space-y-5">

            {/* Status card */}
            <div className={`rounded-2xl border p-6 ${isDelivered ? "border-green-500/30 bg-green-500/[0.05]" : "border-[#0AA7B5]/25 bg-[#0AA7B5]/[0.05]"}`}>
              <div className="flex items-start gap-4">
                <div className={`h-11 w-11 rounded-xl flex items-center justify-center flex-shrink-0 ${isDelivered ? "bg-green-500/20" : ""}`} style={isDelivered ? {} : { background: `${CYAN}20` }}>
                  {isDelivered
                    ? <CheckCircle2 className="h-6 w-6 text-green-400" />
                    : <Clock className="h-6 w-6" style={{ color: CYAN }} />
                  }
                </div>
                <div className="flex-1">
                  {isDelivered ? (
                    <>
                      <h2 className="text-base font-black text-white mb-1">Your blueprint has been delivered.</h2>
                      <p className="text-sm text-white/60 leading-relaxed">
                        All six deliverables were sent to <strong className="text-white">{purchase.email}</strong>. Check your inbox (and spam folder). If you can&apos;t find the email, contact jarred@referlabs.com.au.
                      </p>
                    </>
                  ) : (
                    <>
                      <h2 className="text-base font-black text-white mb-1">
                        Your blueprint is being prepared.
                        {hoursLeft > 0 && <span className="ml-2 text-xs font-semibold rounded-full px-2.5 py-0.5" style={{ background: `${CYAN}20`, color: CYAN }}>Est. {hoursLeft}h remaining</span>}
                      </h2>
                      <p className="text-sm text-white/60 leading-relaxed">
                        We are reviewing your intake answers and writing your personalised strategy brief and niche recommendations. All six deliverables will be sent to <strong className="text-white">{purchase.email}</strong> within 48 hours of purchase.
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <h2 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-5">Delivery timeline</h2>
              <div className="space-y-0">
                {[
                  { label: "Payment received",    desc: "Your intake answers captured. Purchase confirmed.",                              done: true  },
                  { label: "Intake reviewed",      desc: "We read your niche, goals, channels, and experience level.",              done: !isDelivered ? hoursLeft < 36 : true },
                  { label: "Blueprint assembled",  desc: "Strategy brief written. Database filtered. SEO concepts and playbooks built.", done: !isDelivered ? hoursLeft < 12 : true  },
                  { label: "Files delivered",      desc: "Six deliverables emailed to you. Check your inbox.",                          done: isDelivered },
                ].map(({ label, desc, done }, i, arr) => (
                  <div key={label} className="flex gap-4 pb-5 relative">
                    {i < arr.length - 1 && (
                      <div className={`absolute left-[15px] top-8 w-px h-full ${done ? "" : "opacity-20"}`} style={{ background: done ? CYAN : "rgba(255,255,255,0.3)" }} />
                    )}
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${done ? "" : "border border-white/20"}`} style={done ? { background: `${CYAN}25` } : { background: "#060f15" }}>
                      {done
                        ? <Check className="h-4 w-4" style={{ color: CYAN }} />
                        : <div className="h-2 w-2 rounded-full bg-white/20" />
                      }
                    </div>
                    <div className="pt-0.5">
                      <p className={`text-sm font-bold ${done ? "text-white" : "text-white/35"}`}>{label}</p>
                      <p className={`text-xs leading-relaxed mt-0.5 ${done ? "text-white/55" : "text-white/25"}`}>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* What you're receiving */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <h2 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-5">What arrives in your inbox</h2>
              <div className="space-y-3">
                {DELIVERABLES.map(({ icon, label, format }) => (
                  <div key={label} className="flex items-center gap-3 py-2 border-b border-white/[0.05] last:border-0">
                    <div className="h-7 w-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${CYAN}15`, color: CYAN }}>
                      {icon}
                    </div>
                    <p className="text-sm text-white/75 flex-1">{label}</p>
                    <span className="text-[10px] font-bold text-white/30 uppercase tracking-wider flex-shrink-0">{format}</span>
                    {isDelivered
                      ? <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-green-400" />
                      : <Clock className="h-4 w-4 flex-shrink-0 text-white/20" />
                    }
                  </div>
                ))}
              </div>
              {isDelivered && (
                <div className="mt-4 p-3 rounded-xl bg-green-500/10 border border-green-500/20">
                  <p className="text-xs text-green-400 font-semibold">All files sent to {purchase.email}. Check your inbox, promotions tab, and spam folder.</p>
                </div>
              )}
            </div>

            {/* Your intake summary */}
            {(purchase.industry || purchase.primaryGoal || purchase.experienceLevel) && (
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <h2 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">What we noted from your intake</h2>
                <div className="space-y-2">
                  {purchase.industry && (
                    <div className="flex items-start gap-3 text-sm">
                      <span className="text-white/35 w-28 flex-shrink-0">Industry</span>
                      <span className="text-white/75 font-medium">{purchase.industry}</span>
                    </div>
                  )}
                  {purchase.primaryGoal && (
                    <div className="flex items-start gap-3 text-sm">
                      <span className="text-white/35 w-28 flex-shrink-0">Primary goal</span>
                      <span className="text-white/75 font-medium">{purchase.primaryGoal}</span>
                    </div>
                  )}
                  {purchase.experienceLevel && (
                    <div className="flex items-start gap-3 text-sm">
                      <span className="text-white/35 w-28 flex-shrink-0">Experience</span>
                      <span className="text-white/75 font-medium">{purchase.experienceLevel}</span>
                    </div>
                  )}
                </div>
                <p className="text-xs text-white/35 mt-4 leading-relaxed">Your strategy brief and niche recommendations are written against these answers.</p>
              </div>
            )}

          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-5">

            {/* Prep checklist */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="h-4 w-4" style={{ color: AMBER }} />
                <h2 className="text-xs font-bold uppercase tracking-widest text-white/40">While you wait</h2>
              </div>
              <p className="text-xs text-white/45 leading-relaxed mb-5">Five things to do now so you hit the ground running when your files arrive.</p>
              <div className="space-y-3">
                {PREP_STEPS.map(({ id, label, detail }) => (
                  <label key={id} className="flex items-start gap-3 cursor-pointer group">
                    <div
                      onClick={() => toggleCheck(id)}
                      className={`h-4 w-4 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${checked[id] ? "border-[#0AA7B5] bg-[#0AA7B5]" : "border-white/20 group-hover:border-white/40"}`}
                    >
                      {checked[id] && <Check className="h-2.5 w-2.5 text-white" />}
                    </div>
                    <div onClick={() => toggleCheck(id)}>
                      <p className={`text-xs font-semibold leading-relaxed transition-colors ${checked[id] ? "text-white/35 line-through" : "text-white/75"}`}>{label}</p>
                      <p className="text-[10px] text-white/30 leading-relaxed mt-0.5">{detail}</p>
                    </div>
                  </label>
                ))}
              </div>
              <p className="text-[10px] text-white/20 mt-4">Progress saved in your browser.</p>
            </div>

            {/* Quick links */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
              <h2 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">Useful links</h2>
              <div className="space-y-2">
                {QUICK_LINKS.map(({ label, href, note }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="flex items-start justify-between gap-3 py-2 border-b border-white/[0.05] last:border-0 group"
                  >
                    <div className="flex items-start gap-2">
                      <ExternalLink className="h-3 w-3 flex-shrink-0 mt-0.5 text-white/20 group-hover:text-white/50 transition-colors" />
                      <p className="text-xs text-white/55 group-hover:text-white/80 transition-colors leading-relaxed">{label}</p>
                    </div>
                    <span className="text-[10px] text-white/25 flex-shrink-0 mt-0.5">{note}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
              <h2 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-3">Questions?</h2>
              <p className="text-xs text-white/50 leading-relaxed mb-4">
                Reply to your confirmation email or email us directly. All queries answered same day.
              </p>
              <a
                href={`mailto:jarred@referlabs.com.au?subject=Blueprint%20question%20%E2%80%94%20${encodeURIComponent(purchase.email)}`}
                className="flex items-center justify-center gap-2 w-full rounded-xl py-3 text-xs font-bold border border-white/15 text-white/70 hover:border-[#0AA7B5]/40 hover:text-white transition-all"
              >
                <Mail className="h-3.5 w-3.5" />
                jarred@referlabs.com.au
              </a>
            </div>

            {/* Lost your link? */}
            <div className="rounded-xl border border-white/[0.07] p-4">
              <p className="text-[10px] text-white/30 leading-relaxed">
                <strong className="text-white/45">Bookmark this page.</strong> Your portal link is permanent, no login required. If you lose it, email us with your purchase email and we will resend it.
              </p>
            </div>

          </div>
        </div>

        {/* Bottom nav */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xs text-white/30 hover:text-white/60 transition-colors">Refer Labs</Link>
            <Link href="/referral-blueprint" className="text-xs text-white/30 hover:text-white/60 transition-colors">Blueprint page</Link>
            <Link href="/guides" className="text-xs text-white/30 hover:text-white/60 transition-colors">All guides</Link>
          </div>
          <p className="text-xs text-white/20">Pepform Pty Ltd (Refer Labs) · ABN 32 660 008 159</p>
        </div>

      </div>
    </div>
  );
}

export default function BlueprintAccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#060f15] flex items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 border-2 border-[#0AA7B5]/30 border-t-[#0AA7B5] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/45 text-sm">Loading your portal...</p>
        </div>
      </div>
    }>
      <BlueprintPortal />
    </Suspense>
  );
}
