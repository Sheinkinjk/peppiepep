import { Fraunces } from "next/font/google";
import { moshyConfig, MOSHY_URL } from "./config";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ShieldCheck,
  Stethoscope,
  Truck,
  ClipboardList,
  Star,
} from "lucide-react";

// Editorial serif scoped to this standalone page only.
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-fraunces",
});

const LAST_REVIEWED = "June 2026";
const RATING = "4.3";

// ── Money CTA (tracked: rel=sponsored is picked up by AffiliateClickTracker) ──
function MoshyCTA({
  label = "Continue to Moshy",
  size = "md",
  block = false,
}: {
  label?: string;
  size?: "sm" | "md" | "lg";
  block?: boolean;
}) {
  const sizes = {
    sm: "px-5 py-2.5 text-sm",
    md: "px-6 py-3.5 text-[15px]",
    lg: "px-8 py-4 text-base",
  } as const;
  return (
    <a
      href={MOSHY_URL}
      target="_blank"
      rel="nofollow sponsored"
      className={`group inline-flex items-center justify-center gap-2 rounded-full bg-[#0E7C66] font-semibold text-white shadow-[0_10px_30px_-8px_rgba(14,124,102,0.6)] transition-all hover:-translate-y-0.5 hover:bg-[#0b6353] ${sizes[size]} ${block ? "w-full" : ""}`}
    >
      {label}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </a>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0E7C66]">
      <span className="h-1.5 w-1.5 rounded-full bg-[#0E7C66]" />
      {children}
    </span>
  );
}

export default function MoshyLanding() {
  return (
    <div className={`${fraunces.variable} min-h-screen bg-[#F6F5F1] text-[#1B2420] selection:bg-[#0E7C66]/15`}>
      {/* ── Sticky page bar (own nav — persistent money CTA) ── */}
      <header className="sticky top-0 z-50 border-b border-black/[0.06] bg-[#F6F5F1]/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3 sm:px-8">
          <div className="flex items-center gap-2.5">
            <span className="h-2 w-2 rounded-full bg-[#0E7C66]" />
            <span className="text-sm font-bold tracking-tight">Refer Labs</span>
            <span className="hidden text-[11px] font-medium text-[#6B756F] sm:inline">· Independent review</span>
          </div>
          <MoshyCTA size="sm" />
        </div>
      </header>

      <main id="main-content" className="mx-auto max-w-5xl px-5 pb-24 sm:px-8">
        {/* ── Hero ── */}
        <section className="grid gap-10 pt-12 sm:pt-16 lg:grid-cols-[1.55fr_1fr] lg:gap-14">
          <div>
            <Eyebrow>Weight-loss telehealth · Australia · 2026</Eyebrow>
            <h1
              className="mt-5 font-[family-name:var(--font-fraunces)] text-4xl font-semibold leading-[1.06] tracking-[-0.01em] text-[#16201C] sm:text-5xl lg:text-[3.4rem]"
            >
              Moshy, reviewed: the men&apos;s weight-loss telehealth service,{" "}
              <span className="italic text-[#0E7C66]">explained properly</span> before you start.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#46524C]">
              A clear, independent look at how Moshy actually works in Australia — what the service is, how the online
              eligibility process runs, and how prescription GLP-1 access is handled. Information only, no hype, no expired
              discount codes.
            </p>

            {/* Byline */}
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[#6B756F]">
              <span className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0E7C66]/12 text-[11px] font-bold text-[#0E7C66]">
                  RL
                </span>
                <span className="text-[#46524C]">Refer Labs Editorial</span>
              </span>
              <span>Last reviewed {LAST_REVIEWED}</span>
              <span>7 min read</span>
              <a href="/how-we-research" className="underline decoration-[#0E7C66]/40 underline-offset-4 hover:text-[#16201C]">
                How we research
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <MoshyCTA label="Check your eligibility on Moshy" size="lg" />
              <a href="#verdict" className="text-sm font-semibold text-[#16201C] underline decoration-black/15 underline-offset-4 hover:decoration-[#0E7C66]">
                Skip to the verdict
              </a>
            </div>

            <p className="mt-4 text-xs text-[#8A938E]">
              Independent review · contains an affiliate link · not medical advice
            </p>
          </div>

          {/* At-a-glance card */}
          <aside className="lg:pt-2">
            <div className="rounded-2xl border border-black/[0.07] bg-white p-6 shadow-[0_2px_24px_-12px_rgba(0,0,0,0.18)]">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#6B756F]">
                  At a glance
                </span>
                <span className="flex items-center gap-1 rounded-full bg-[#0E7C66]/10 px-2.5 py-1 text-xs font-bold text-[#0E7C66]">
                  <Star className="h-3 w-3 fill-[#0E7C66]" /> {RATING}/5
                </span>
              </div>
              <dl className="mt-4 divide-y divide-black/[0.06] text-sm">
                {[
                  ["What it is", "Australian men's weight-management telehealth"],
                  ["For", "Men seeking a clinically-supervised program"],
                  ["Format", "Online eligibility → practitioner review → delivery"],
                  ["Medication", "GLP-1 access if clinically appropriate"],
                  ["Pricing", "Subscription, confirmed in the consult"],
                  ["Discount code", "None needed — referral applies via the link"],
                ].map(([k, v]) => (
                  <div key={k} className="flex gap-3 py-2.5">
                    <dt className="w-24 shrink-0 text-[#8A938E]">{k}</dt>
                    <dd className="text-[#2B352F]">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-5">
                <MoshyCTA block />
              </div>
              <p className="mt-3 text-center text-[11px] text-[#8A938E]">Opens getmoshy.com.au · AU only</p>
            </div>
          </aside>
        </section>

        {/* ── Trust strip ── */}
        <section className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-black/[0.07] bg-black/[0.06] sm:grid-cols-4">
          {[
            { icon: Stethoscope, label: "AHPRA-registered practitioners" },
            { icon: ClipboardList, label: "Online eligibility in ~5 minutes" },
            { icon: Truck, label: "Subscription with home delivery" },
            { icon: ShieldCheck, label: "No code — referral via the link" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-3 bg-[#F6F5F1] px-5 py-5">
              <Icon className="h-5 w-5 shrink-0 text-[#0E7C66]" strokeWidth={1.6} />
              <span className="text-[13px] font-medium leading-snug text-[#46524C]">{label}</span>
            </div>
          ))}
        </section>

        {/* ── Compliance notice ── */}
        <p className="mt-8 rounded-xl border border-black/[0.07] bg-white px-5 py-4 text-xs leading-relaxed text-[#6B756F]">
          <span className="font-semibold text-[#46524C]">Information only.</span> This page describes Moshy as a service
          and is not medical advice. It does not recommend any treatment or imply suitability for any individual.
          Prescription medicines in Australia are available only after assessment by a registered practitioner. Always
          consult a qualified health professional before making any health decision.
        </p>

        {/* ── Body grid: TOC + article ── */}
        <div className="mt-12 grid gap-12 lg:grid-cols-[200px_1fr] lg:gap-16">
          {/* TOC */}
          <nav aria-label="On this page" className="hidden lg:block">
            <div className="sticky top-24">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8A938E]">On this page</p>
              <ul className="space-y-2.5 text-sm">
                {[
                  ["what", "What Moshy actually is"],
                  ["glp1", "GLP-1 & semaglutide"],
                  ["is-legit", "Is Moshy legit?"],
                  ["start", "How to start"],
                  ["verdict", "The verdict"],
                  ["faq", "FAQ"],
                ].map(([id, label]) => (
                  <li key={id}>
                    <a href={`#${id}`} className="text-[#6B756F] transition-colors hover:text-[#0E7C66]">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* Article */}
          <article className="max-w-2xl">
            {/* What */}
            <section id="what" className="scroll-mt-24">
              <h2 className="font-[family-name:var(--font-fraunces)] text-2xl font-semibold tracking-[-0.01em] text-[#16201C] sm:text-3xl">
                What Moshy actually is
              </h2>
              <div className="mt-4 space-y-4 text-[15.5px] leading-relaxed text-[#46524C]">
                <p>
                  Moshy is an Australian telehealth service for men, best known for its weight-management program. You
                  complete a health questionnaire online, a registered Australian practitioner reviews your case, and —
                  if it&apos;s appropriate — you continue on a subscription with treatment delivered to your door. There&apos;s
                  no in-person GP appointment to book to get started.
                </p>
                <p>
                  It exists because a lot of men simply won&apos;t make a GP appointment for weight. The online flow removes
                  that friction without removing the clinician: every submission is assessed individually, and not everyone
                  is approved. That last part matters — a service that screens people out is behaving like a clinical
                  provider, not a vending machine.
                </p>
              </div>

              <figure className="my-7 border-l-2 border-[#0E7C66] pl-5">
                <blockquote className="font-[family-name:var(--font-fraunces)] text-xl italic leading-snug text-[#2B352F]">
                  &ldquo;The convenience is the point — but the practitioner review is what makes it worth taking
                  seriously.&rdquo;
                </blockquote>
              </figure>
            </section>

            {/* GLP-1 */}
            <section id="glp1" className="mt-12 scroll-mt-24">
              <h2 className="font-[family-name:var(--font-fraunces)] text-2xl font-semibold tracking-[-0.01em] text-[#16201C] sm:text-3xl">
                GLP-1 &amp; semaglutide, the facts
              </h2>
              <div className="mt-4 space-y-4 text-[15.5px] leading-relaxed text-[#46524C]">
                <p>
                  A lot of people reach Moshy while researching GLP-1 medications, the class that includes semaglutide. The
                  most important fact to understand up front is a regulatory one, not a sales pitch.
                </p>
                <p>
                  In Australia these medications are{" "}
                  <strong className="font-semibold text-[#2B352F]">prescription-only</strong>. A platform like Moshy can
                  connect you with a registered practitioner who may prescribe one <em>only if</em> they judge it clinically
                  appropriate after assessing you individually. No platform can promise you a specific medication before that
                  consultation — be cautious of any that implies otherwise. This is information, not medical advice or a
                  recommendation to use any medicine.
                </p>
              </div>
              <div className="mt-6 rounded-xl border border-[#0E7C66]/20 bg-[#0E7C66]/[0.05] p-5">
                <p className="text-sm leading-relaxed text-[#2B352F]">
                  Ready to see whether you&apos;re eligible? It takes a few minutes and commits you to nothing.
                </p>
                <div className="mt-4">
                  <MoshyCTA label="Start the Moshy eligibility check" />
                </div>
              </div>
            </section>

            {/* Is Moshy legit (trust — compliant, service-focused) */}
            <section id="is-legit" className="mt-12 scroll-mt-24">
              <h2 className="font-[family-name:var(--font-fraunces)] text-2xl font-semibold tracking-[-0.01em] text-[#16201C] sm:text-3xl">
                Is Moshy legit?
              </h2>
              <div className="mt-4 space-y-4 text-[15.5px] leading-relaxed text-[#46524C]">
                <p>
                  Yes — Moshy is a registered Australian telehealth provider, not an overseas storefront. It operates under
                  Australian health-service regulations, and every eligibility submission is reviewed by an AHPRA-registered
                  practitioner before anything moves forward.
                </p>
                <p>
                  The clearest signal is that it turns people away: not everyone who applies is approved. A service that
                  screens people out is behaving like a clinical provider, not a checkout. As with any health service, it is
                  worth reading Moshy&apos;s own terms and clinical process before you start — this page describes the
                  service, it does not assess your suitability for it.
                </p>
              </div>
            </section>

            {/* How to start (steps from config) */}
            <section id="start" className="mt-12 scroll-mt-24">
              <h2 className="font-[family-name:var(--font-fraunces)] text-2xl font-semibold tracking-[-0.01em] text-[#16201C] sm:text-3xl">
                How to start with Moshy
              </h2>
              <ol className="mt-6 space-y-5">
                {moshyConfig.steps.map((s) => (
                  <li key={s.num} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0E7C66]/10 text-sm font-bold text-[#0E7C66]">
                      {s.num}
                    </span>
                    <div>
                      <p className="font-semibold text-[#16201C]">{s.heading}</p>
                      <p className="mt-1 text-sm leading-relaxed text-[#46524C]">{s.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {/* Verdict */}
            <section id="verdict" className="mt-14 scroll-mt-24">
              <div className="rounded-2xl border border-black/[0.08] bg-white p-7 shadow-[0_2px_24px_-12px_rgba(0,0,0,0.18)] sm:p-8">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1.5 rounded-full bg-[#0E7C66]/10 px-3 py-1.5 text-sm font-bold text-[#0E7C66]">
                    <Star className="h-3.5 w-3.5 fill-[#0E7C66]" /> {RATING}/5
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8A938E]">
                    Refer Labs editorial assessment
                  </span>
                </div>
                <h2 className="mt-5 font-[family-name:var(--font-fraunces)] text-2xl font-semibold tracking-[-0.01em] text-[#16201C] sm:text-3xl">
                  The verdict
                </h2>
                <p className="mt-4 text-[15.5px] leading-relaxed text-[#46524C]">
                  As a service, Moshy is a credible, well-run option: the online process is genuinely fast, the
                  practitioner review is real, and it is transparent that any prescription medication is prescription-only
                  and assessed individually. Whether it is appropriate for you is a decision for you and a registered
                  practitioner — this page is information about the service, not medical advice.
                </p>
                <ul className="mt-5 space-y-2">
                  {[
                    "Fast, fully online eligibility — no GP appointment to start",
                    "Real practitioner review; not everyone is approved",
                    "Clear that GLP-1 medication is prescription-only and assessed individually",
                  ].map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-sm text-[#2B352F]">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#0E7C66]" />
                      {point}
                    </li>
                  ))}
                </ul>
                <div className="mt-7 flex flex-wrap items-center gap-4">
                  <MoshyCTA label="Continue to Moshy" size="lg" />
                  <span className="text-xs text-[#8A938E]">Opens getmoshy.com.au · referral applied automatically</span>
                </div>
              </div>
            </section>

            {/* FAQ */}
            <section id="faq" className="mt-14 scroll-mt-24">
              <h2 className="font-[family-name:var(--font-fraunces)] text-2xl font-semibold tracking-[-0.01em] text-[#16201C] sm:text-3xl">
                Frequently asked questions
              </h2>
              <div className="mt-6 divide-y divide-black/[0.08] border-y border-black/[0.08]">
                {moshyConfig.faqs.map((f) => (
                  <details key={f.q} className="group py-4">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-[#16201C]">
                      {f.q}
                      <span className="text-xl leading-none text-[#0E7C66] transition-transform group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <p className="mt-3 text-[15px] leading-relaxed text-[#46524C]">{f.a}</p>
                  </details>
                ))}
              </div>
            </section>
          </article>
        </div>

        {/* ── Final CTA band ── */}
        <section className="mt-20 rounded-3xl bg-[#16201C] px-7 py-12 text-center sm:px-12 sm:py-16">
          <h2 className="mx-auto max-w-xl font-[family-name:var(--font-fraunces)] text-3xl font-semibold leading-tight text-white sm:text-4xl">
            See where you stand with Moshy
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-white/65">
            A few minutes, no obligation, and no code to enter. The referral is applied automatically through the link.
          </p>
          <div className="mt-8 flex justify-center">
            <MoshyCTA label="Continue to Moshy" size="lg" />
          </div>
          <p className="mx-auto mt-6 max-w-lg text-xs leading-relaxed text-white/40">
            You&apos;ll be taken to getmoshy.com.au. This page is operated by Refer Labs and contains an affiliate
            referral link. It does not constitute medical advice — consult a qualified health professional before making
            any health decision.
          </p>
        </section>

        {/* ── Page footer (standalone) ── */}
        <footer className="mt-14 border-t border-black/[0.08] pt-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-sm">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#0E7C66]" />
                <span className="text-sm font-bold">Refer Labs</span>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-[#8A938E]">
                Independent comparison guides and reviews. Some pages contain affiliate links; we may earn a commission at
                no extra cost to you. Editorial assessments are independent.
              </p>
            </div>
            <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
              <a href="/best-weight-loss-telehealth-australia" className="text-[#46524C] hover:text-[#0E7C66]">
                Weight-loss telehealth
              </a>
              <a href="/how-we-research" className="text-[#46524C] hover:text-[#0E7C66]">How we research</a>
              <a href="/guides" className="text-[#46524C] hover:text-[#0E7C66]">All guides</a>
            </div>
          </div>
          <p className="mt-8 text-xs text-[#A6ADA8]">© {LAST_REVIEWED.split(" ")[1]} Refer Labs. Australia.</p>
        </footer>
      </main>
    </div>
  );
}
