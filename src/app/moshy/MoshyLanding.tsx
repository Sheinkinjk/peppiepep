import Image from "next/image";
import Link from "next/link";
import OfferSchema from "@/components/offers/OfferSchema";
import CodeAnswer from "@/components/offers/CodeAnswer";
import { moshyConfig, MOSHY_URL, MOSHY_LEAD, MOSHY_FACTS_READ_ON, REFERRAL120_CHECKED } from "./config";
import { ArrowRight, Check } from "lucide-react";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import StickyCta from "@/components/consumer/StickyCta";
import FactHistory from "@/components/facts/FactHistory";
import AffiliateDisclosure from "@/components/consumer/AffiliateDisclosure";
import { MOSHY_TERMS_URL } from "@/lib/offers";
import { OfferTermsNote } from "@/components/consumer/TermsApplyLink";

// ── Money CTA (tracked: rel=sponsored is picked up by AffiliateClickTracker) ──
// Three placements plus the mobile sticky bar: hero, at-a-glance card, closing band.
function MoshyCTA({
  label = "Continue to Moshy",
  size = "md",
  block = false,
  loc,
}: {
  label?: string;
  size?: "sm" | "md" | "lg";
  block?: boolean;
  loc?: string;
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
      data-cta={loc}
      className={`nw-btn justify-center ${sizes[size]} ${block ? "w-full" : ""}`}
    >
      {label}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </a>
  );
}

const H2 = "text-2xl font-bold tracking-[-0.01em] text-[#14120f] sm:text-3xl";
const BODY = "mt-4 space-y-4 text-[15.5px] leading-relaxed text-[#56504a]";

const glance: [string, string][] = [
  ["What it is", "Australian weight-management telehealth, brother brand of Mosh"],
  ["How it works", "Online questionnaire → practitioner consultation"],
  ["Practitioners", "Independent AHPRA-registered doctors and nurses (Moshy's own site)"],
  ["Pricing", "One monthly program fee, listed on Moshy's site"],
  ["Discount code", "REFERRAL120: $120 off a first order"],
  ["Code checked", REFERRAL120_CHECKED],
];

// Quoted from getmoshy.com.au/weight-loss (and the homepage for the care team).
const included = [
  "Unlimited practitioner support",
  "In-app health tracking and health coaching",
  "Dietitian-approved meal plans, recipes and nutrition support",
  "An active and supportive community",
  "A care team including doctors, nurses, dietitians, psychologists and exercise physiologists",
  "A 30-day money back guarantee and a price match guarantee, each on Moshy's own terms",
];

const toc: [string, string][] = [
  ["code", "The discount code"],
  ["how", "How Moshy works"],
  ["included", "What's included"],
  ["alternatives", "Alternatives"],
  ["faq", "FAQ"],
];

export default function MoshyLanding() {
  const crumbs = moshyConfig.breadcrumb ?? [];
  return (
    <ConsumerShell>
      <OfferSchema code="REFERRAL120" />
      <main id="main-content" className="mx-auto max-w-5xl px-5 pb-24 sm:px-8">
        {/* Breadcrumb (matches the BreadcrumbList JSON-LD in page.tsx) */}
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 pt-8 text-sm text-[#56504a]">
          {crumbs.map((c, i) => (
            <span key={c.label} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden="true">/</span>}
              {c.href ? (
                <Link href={c.href} className="transition-colors hover:text-[#14120f]">{c.label}</Link>
              ) : (
                <span className="text-[#14120f]">{c.label}</span>
              )}
            </span>
          ))}
        </nav>

        {/* ── Hero: h1, then the answer, then the disclosure, then the first link ── */}
        <section className="grid gap-10 pt-8 sm:pt-10 lg:grid-cols-[1.55fr_1fr] lg:gap-14">
          <div>
            <span className="mb-5 inline-flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-[#ded8cd] bg-white shadow-[0_10px_28px_-16px_rgba(20,18,15,0.35)]">
              <Image src="/logos/moshy.png" alt="Moshy logo" width={52} height={52} className="h-12 w-12 object-contain" />
            </span>
            <h1 className="mt-4 text-4xl font-extrabold leading-[1.06] tracking-[-0.02em] text-[#14120f] sm:text-5xl lg:text-[3.3rem]">
              Moshy discount code Australia:{" "}
              <span>$120 off your first order.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#56504a]">{MOSHY_LEAD}</p>

            <AffiliateDisclosure compact partners={["Moshy"]} className="mt-5 max-w-xl" />

            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
              <MoshyCTA size="lg" loc="hero" />

            </div>
          </div>

          {/* At-a-glance card */}
          <aside className="lg:pt-2">
            <div className="nw-card rounded-2xl p-6">
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#56504a]">At a glance</span>
              <dl className="mt-4 divide-y divide-[#f1ede4] text-sm">
                {glance.map(([k, v]) => (
                  <div key={k} className="flex gap-3 py-2.5">
                    <dt className="w-28 shrink-0 text-[#56504a]">{k}</dt>
                    <dd className="text-[#14120f]">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-5">
                <MoshyCTA block loc="glance-card" />
              </div>
              <p className="mt-3 text-center text-[11px] text-[#56504a]">
                Opens getmoshy.com.au · AU only
              </p>
            </div>
          </aside>
        </section>

        {/* ── Body grid: TOC + article ── */}
        <div className="mt-14 grid gap-12 lg:grid-cols-[200px_1fr] lg:gap-16">
          <nav aria-label="On this page" className="hidden lg:block">
            <div className="sticky top-24">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-[#56504a]">On this page</p>
              <ul className="space-y-2.5 text-sm">
                {toc.map(([id, label]) => (
                  <li key={id}>
                    <a href={`#${id}`} className="text-[#56504a] transition-colors hover:text-[#007a95]">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          <article className="max-w-2xl">
            {/* The code and its terms, once. Replaces the one-row offers table and the
                separate code h2 that restated it. */}
            <section id="code" className="scroll-mt-24">
              <h2 className={H2}>What is the current Moshy discount code?</h2>
              <CodeAnswer code="REFERRAL120" className="mt-5">
                REFERRAL120 takes $120 off a new customer&apos;s first order on eligible Moshy weight
                programs.
              </CodeAnswer>
              <ul className="mt-5 space-y-2 text-[15px] leading-relaxed text-[#56504a]">
                {[
                  "New customers only, one use per customer",
                  "Applies to eligible Moshy weight programs",
                  "Minimum commitment period of 3 months",
                  "Cannot be combined with any other promotion",
                  "Use code REFERRAL120 at checkout; our link opens Moshy's sign-up with the offer",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2.5">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-[#007a95]" aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>
              
            </section>

            <section id="how" className="mt-12 scroll-mt-24">
              <h2 className={H2}>How Moshy works</h2>
              <div className={BODY}>
                <p>
                  Moshy is the brother brand of Mosh and runs weight-loss, hair and skin services online; this page covers
                  weight loss, which runs in three stages.
                </p>
              </div>
              <ol className="mt-6 space-y-5">
                {moshyConfig.steps.map((s) => (
                  <li key={s.num} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e4f2f5] text-sm font-bold text-[#00748e]">
                      {s.num}
                    </span>
                    <div>
                      <p className="font-bold text-[#14120f]">{s.heading}</p>
                      <p className="mt-1 text-sm leading-relaxed text-[#56504a]">{s.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <section id="included" className="mt-12 scroll-mt-24">
              <h2 className={H2}>What does the Moshy program include?</h2>
              <p className="mt-4 text-[15.5px] leading-relaxed text-[#56504a]">
                As listed on getmoshy.com.au, read {MOSHY_FACTS_READ_ON}:
              </p>
              <ul className="mt-5 grid gap-2.5">
                {included.map((t) => (
                  <li key={t} className="flex items-start gap-2.5 text-[15px] leading-relaxed text-[#56504a]">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e4f2f5]">
                      <Check className="h-3.5 w-3.5 text-[#007a95]" strokeWidth={2.5} aria-hidden="true" />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </section>



            <section id="alternatives" className="mt-12 scroll-mt-24">
              <h2 className={H2}>Moshy alternatives and comparisons</h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {(moshyConfig.relatedLinks ?? []).map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="block h-full rounded-xl border border-[#ded8cd] bg-white px-4 py-3 transition-colors hover:border-[#007a95]"
                    >
                      <span className="font-semibold text-[#14120f]">{l.label}</span>
                      <span className="mt-1 block text-sm leading-relaxed text-[#56504a]">{l.desc}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            <section id="faq" className="mt-14 scroll-mt-24">
              <h2 className={H2}>Frequently asked questions</h2>
              <div className="mt-6 divide-y divide-[#ded8cd] border-y border-[#ded8cd]">
                {moshyConfig.faqs.map((f) => (
                  <details key={f.q} className="group py-4">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-[#14120f]">
                      {f.q}
                      <span className="text-xl leading-none text-[#007a95] transition-transform group-open:rotate-45">+</span>
                    </summary>
                    <p className="mt-3 text-[15px] leading-relaxed text-[#56504a]">{f.a}</p>
                  </details>
                ))}
              </div>
              <OfferTermsNote brand="Moshy" className="mt-6" />
            </section>
          </article>
        </div>

        {/* ── Closing CTA ── */}
        <section className="mt-20 overflow-hidden rounded-3xl bg-[#14120f] px-7 py-12 text-center sm:px-12 sm:py-16">
          <h2 className="mx-auto max-w-xl text-3xl font-bold leading-tight text-white sm:text-4xl">
            Start with Moshy, $120 off your first order
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-white/70">
            REFERRAL120 at checkout, for new customers.
          </p>
          
          <div className="mt-8 flex justify-center">
            <a href={MOSHY_URL} target="_blank" rel="nofollow sponsored" data-cta="final-band" className="nw-btn justify-center !bg-white !text-[#00748e] px-8 py-4 text-base hover:!bg-[#e4f2f5]">
              Continue to Moshy
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <p className="mx-auto mt-6 max-w-lg text-xs leading-relaxed text-white/60">{moshyConfig.disclaimer}</p>
        </section>

        {/* Renders nothing until this subject has a third observation. The slot
            exists so the series appears here the moment the next re-check lands. */}
        <FactHistory subject="Moshy" kind="offer_observation" hub="weight-loss" route="/moshy" />
      </main>

      <StickyCta href={MOSHY_URL} product="Moshy · weight-loss telehealth" label="Get started" />
    </ConsumerShell>
  );
}
