import Image from "next/image";
import VerifiedStamp from "@/components/consumer/VerifiedStamp";
import OffersTable from "@/components/lending/OffersTable";
import { MOSHY_OFFER, DEALS } from "@/lib/offers";
import OfferSchema from "@/components/offers/OfferSchema";
import { moshyConfig, MOSHY_URL } from "./config";
import { ArrowRight, Check, ShieldCheck, Stethoscope, Truck, ClipboardList } from "lucide-react";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import StickyCta from "@/components/consumer/StickyCta";
import FactHistory from "@/components/facts/FactHistory";

// ── Money CTA (tracked: rel=sponsored is picked up by AffiliateClickTracker) ──
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

export default function MoshyLanding() {
  return (
    <ConsumerShell>
      <OfferSchema code="REFERRAL120" />
      <main id="main-content" className="mx-auto max-w-5xl px-5 pb-24 sm:px-8">
        {/* ── Hero ── */}
        <section className="grid gap-10 pt-10 sm:pt-14 lg:grid-cols-[1.55fr_1fr] lg:gap-14">
          <div>
            <span className="mb-5 inline-flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-[#e5e9e7] bg-white shadow-[0_10px_28px_-16px_rgba(16,37,27,0.35)]">
              <Image src="/logos/moshy.png" alt="Moshy logo" width={52} height={52} className="h-12 w-12 object-contain" />
            </span>
            <h1 className="mt-4 text-4xl font-extrabold leading-[1.06] tracking-[-0.02em] text-[#10251b] sm:text-5xl lg:text-[3.3rem]">
              Moshy discount code Australia:{" "}
              <span className="text-[#0a7c42]">$120 off your first order.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#3d4b44]">
              The current Moshy offer is <strong className="text-[#10251b]">$120 off your first order</strong>, applied
              automatically through our referral link (code REFERRAL120), so there is no code to type. Below is an
              independent look at how Moshy actually works, what it costs, and how eligibility runs. Information only, and
              a real, current offer, not an expired one.
            </p>
            <div className="mt-5">
              <VerifiedStamp date={MOSHY_OFFER.verified} label="$120-off offer verified" />
            </div>

            <div className="mt-6">
              <MoshyCTA label="Get $120 off on Moshy" size="lg" loc="hero" />
            </div>
          </div>

          {/* At-a-glance card */}
          <aside className="lg:pt-2">
            <div className="nw-card rounded-2xl p-6">
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#9aa39c]">At a glance</span>
              <dl className="mt-4 divide-y divide-[#eef1ef] text-sm">
                {[
                  ["What it is", "Australian weight-management telehealth"],
                  ["For", "Anyone eligible seeking a clinically-supervised program"],
                  ["Format", "Online eligibility → practitioner review → delivery"],
                  ["Medication", "Treatment access if clinically appropriate"],
                  ["Pricing", "Subscription, confirmed in the consult"],
                  ["Discount code", "REFERRAL120, for $120 off your first order, via our link"],
                ].map(([k, v]) => (
                  <div key={k} className="flex gap-3 py-2.5">
                    <dt className="w-28 shrink-0 text-[#9aa39c]">{k}</dt>
                    <dd className="text-[#2b362f]">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-5">
                <MoshyCTA block loc="glance-card" />
              </div>
              <p className="mt-3 text-center text-[11px] text-[#9aa39c]">Opens getmoshy.com.au · AU only</p>
            </div>
          </aside>
        </section>

        {/* ── Trust strip ── */}
        <section className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[#e5e9e7] bg-[#e5e9e7] sm:grid-cols-4">
          {[
            { icon: Stethoscope, label: "AHPRA-registered practitioners" },
            { icon: ClipboardList, label: "Online eligibility in ~5 minutes" },
            { icon: Truck, label: "Subscription with home delivery" },
            { icon: ShieldCheck, label: "$120 off your first order via our link" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-3 bg-white px-5 py-5">
              <Icon className="h-5 w-5 shrink-0 text-[#0a7c42]" strokeWidth={1.7} />
              <span className="text-[13px] font-medium leading-snug text-[#3d4b44]">{label}</span>
            </div>
          ))}
        </section>

        {/* ── Offer at a glance (structured, AI-extractable) ── */}
        <section className="mt-8">
          <OffersTable deals={DEALS.filter((d) => d.brand === "Moshy")} caption="Moshy discount code and offer, verified" />
        </section>

        {/* ── Compliance notice ── */}
        <p className="mt-8 rounded-xl border border-[#e5e9e7] bg-white px-5 py-4 text-xs leading-relaxed text-[#6e7b74]">
          <span className="font-semibold text-[#3d4b44]">Information only.</span> This page describes Moshy as a service
          and is not medical advice. It does not recommend any treatment or imply suitability for any individual.
          Prescription medicines in Australia are available only after assessment by a registered practitioner. Always
          consult a qualified health professional before making any health decision.
        </p>

        {/* ── Body grid: TOC + article ── */}
        <div className="mt-12 grid gap-12 lg:grid-cols-[200px_1fr] lg:gap-16">
          {/* TOC */}
          <nav aria-label="On this page" className="hidden lg:block">
            <div className="sticky top-24">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-[#9aa39c]">On this page</p>
              <ul className="space-y-2.5 text-sm">
                {[
                  ["code", "The discount code"],
                  ["official-site", "Is getmoshy.com.au official?"],
                  ["what", "What Moshy actually is"],
                  ["treatment", "Treatment and eligibility"],
                  ["start", "How to start"],
                  ["bottom-line", "The bottom line"],
                  ["faq", "FAQ"],
                ].map(([id, label]) => (
                  <li key={id}>
                    <a href={`#${id}`} className="text-[#6e7b74] transition-colors hover:text-[#0a7c42]">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* Article */}
          <article className="max-w-2xl">
            {/* The buyer's question as an h2, verbatim. It existed only inside the
                FAQPage JSON-LD. It sits here rather than in the hero because the
                answer paragraph directly under the h1 owns that slot, and nothing
                goes above it. Worded differently from the FAQ entry: same facts,
                not the same sentence twice on one page. */}
            <section id="code" className="scroll-mt-24">
              <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b] sm:text-3xl">
                What is the current Moshy discount code?
              </h2>
              <div className="mt-4 space-y-4 text-[15.5px] leading-relaxed text-[#3d4b44]">
                <p>
                  REFERRAL120, worth $120 off a first order. It applies to new customers on a practitioner-assigned
                  weight-management program, one use per customer, with a minimum three-month commitment; dietitian,
                  over-the-counter and meal-replacement plans are excluded. Our link carries it into the sign-up flow,
                  so there is nothing to type.
                </p>
              </div>
            </section>

            {/* Absorbed from /getmoshy when it was folded in (Aug 2026). It is the
                one answer that page held and this one did not, and it is the whole
                reason anyone types "getmoshy": confirming the domain is real. The
                old page buried it below a discount box. */}
            <section id="official-site" className="mt-12 scroll-mt-24">
              <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b] sm:text-3xl">
                Is getmoshy.com.au the official Moshy site?
              </h2>
              <div className="mt-4 space-y-4 text-[15.5px] leading-relaxed text-[#3d4b44]">
                <p>
                  Yes. getmoshy.com.au is Moshy&apos;s own domain. &ldquo;Get Moshy&rdquo;, &ldquo;getmoshy&rdquo; and
                  &ldquo;getmoshy.com.au&rdquo; all refer to the same Australian telehealth weight-management service;
                  this page is operated by Refer Labs, not by Moshy.
                </p>
              </div>
            </section>

            {/* What */}
            <section id="what" className="mt-12 scroll-mt-24">
              <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b] sm:text-3xl">What Moshy actually is</h2>
              <div className="mt-4 space-y-4 text-[15.5px] leading-relaxed text-[#3d4b44]">
                <p>
                  Moshy is a clinically-led Australian telehealth service, best known for its weight-management program
                  and open to anyone eligible. You complete a health questionnaire online, a registered Australian
                  practitioner reviews your case, and if it&apos;s appropriate, you continue on a subscription with treatment
                  delivered to your door. There&apos;s no in-person GP appointment to book to get started.
                </p>
                <p>
                  It exists because a lot of people simply won&apos;t make a GP appointment for weight. The online flow removes
                  that friction without removing the clinician: every submission is assessed individually, and not everyone
                  is approved. That last part matters. A service that screens people out is behaving like a clinical
                  provider, not a vending machine.
                </p>
              </div>

              <p className="my-7 border-l-2 border-[#0a7c42] pl-5 text-[15px] leading-relaxed text-[#3d4b44]">
                The convenience is the draw, but the practitioner review is the part that matters: a registered
                practitioner assesses each application individually, and some are declined.
              </p>
            </section>

            {/* Treatment and eligibility */}
            <section id="treatment" className="mt-12 scroll-mt-24">
              <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b] sm:text-3xl">
                How treatment and eligibility actually work
              </h2>
              <div className="mt-4 space-y-4 text-[15.5px] leading-relaxed text-[#3d4b44]">
                <p>
                  A lot of people reach Moshy while researching medical weight management. The most important fact to understand
                  up front is a regulatory one.
                </p>
                <p>
                  In Australia these medications are{" "}
                  <strong className="font-semibold text-[#2b362f]">prescription-only</strong>. A platform like Moshy can
                  connect you with a registered practitioner who may prescribe one <em>only if</em> they judge it clinically
                  appropriate after assessing you individually. No platform can promise you a specific medication before that
                  consultation, so be cautious of any that implies otherwise. This is information, not medical advice or a
                  recommendation to use any medicine.
                </p>
              </div>
              <div className="mt-6 rounded-xl border border-[#cfe6da] bg-[#e8f5ee] p-5">
                <p className="text-sm leading-relaxed text-[#2b362f]">
                  Ready to see whether you&apos;re eligible? It takes a few minutes and commits you to nothing.
                </p>
                <div className="mt-4">
                  <MoshyCTA label="Start the Moshy eligibility check" loc="treatment" />
                </div>
              </div>
            </section>

            {/* How to start (steps from config) */}
            <section id="start" className="mt-12 scroll-mt-24">
              <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b] sm:text-3xl">How to start with Moshy</h2>
              <ol className="mt-6 space-y-5">
                {moshyConfig.steps.map((s) => (
                  <li key={s.num} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e8f5ee] text-sm font-bold text-[#0a7c42]">
                      {s.num}
                    </span>
                    <div>
                      <p className="font-bold text-[#10251b]">{s.heading}</p>
                      <p className="mt-1 text-sm leading-relaxed text-[#3d4b44]">{s.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {/* Bottom line */}
            <section id="bottom-line" className="mt-14 scroll-mt-24">
              <div className="nw-card rounded-2xl p-7 sm:p-8">
                <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b] sm:text-3xl">The bottom line</h2>
                <p className="mt-4 text-[15.5px] leading-relaxed text-[#3d4b44]">
                  As a service, Moshy is a credible, well-run option: the online process is genuinely fast, the
                  practitioner review is real, and it is transparent that any prescription medication is prescription-only
                  and assessed individually. Whether it is appropriate for you is a decision for you and a registered
                  practitioner. This page is information about the service, not medical advice.
                </p>
                <ul className="mt-5 space-y-2">
                  {[
                    "Fast, fully online eligibility, no GP appointment to start",
                    "Real practitioner review; not everyone is approved",
                    "Clear that any medicine is prescription-only and assessed individually",
                  ].map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-sm text-[#2b362f]">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#0a7c42]" />
                      {point}
                    </li>
                  ))}
                </ul>
                <div className="mt-7 flex flex-wrap items-center gap-4">
                  <MoshyCTA label="Continue to Moshy" size="lg" loc="bottom-line" />
                  <span className="text-xs text-[#9aa39c]">Opens getmoshy.com.au · referral applied automatically</span>
                </div>
              </div>
            </section>

            {/* FAQ */}
            <section id="faq" className="mt-14 scroll-mt-24">
              <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b] sm:text-3xl">
                Frequently asked questions
              </h2>
              <div className="mt-6 divide-y divide-[#e5e9e7] border-y border-[#e5e9e7]">
                {moshyConfig.faqs.map((f) => (
                  <details key={f.q} className="group py-4">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-[#10251b]">
                      {f.q}
                      <span className="text-xl leading-none text-[#0a7c42] transition-transform group-open:rotate-45">+</span>
                    </summary>
                    <p className="mt-3 text-[15px] leading-relaxed text-[#3d4b44]">{f.a}</p>
                  </details>
                ))}
              </div>
            </section>
          </article>
        </div>

        {/* ── Final CTA band ── */}
        <section className="mt-20 overflow-hidden rounded-3xl bg-[#10251b] px-7 py-12 text-center sm:px-12 sm:py-16">
          <h2 className="mx-auto max-w-xl text-3xl font-bold leading-tight text-white sm:text-4xl">
            See where you stand with Moshy
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-white/70">
            A few minutes, no obligation, and no code to enter. The referral is applied automatically through the link.
          </p>
          <div className="mt-8 flex justify-center">
            <a href={MOSHY_URL} target="_blank" rel="nofollow sponsored" data-cta="final-band" className="nw-btn justify-center !bg-white !text-[#0a7c42] px-8 py-4 text-base hover:!bg-[#e8f5ee]">
              Continue to Moshy
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <p className="mx-auto mt-6 max-w-lg text-xs leading-relaxed text-white/45">
            You&apos;ll be taken to getmoshy.com.au. This page is operated by Refer Labs and contains an affiliate
            referral link. It does not constitute medical advice; consult a qualified health professional before making
            any health decision.
          </p>
        </section>
      {/* Renders nothing until this subject has a third observation. The slot
          exists so the series appears here the moment the next re-check lands. */}
      <FactHistory subject="Moshy" kind="offer_observation" hub="weight-loss" route="/moshy" />

      </main>

      <StickyCta href={MOSHY_URL} product="Moshy · weight-loss telehealth" label="Check eligibility" />
    </ConsumerShell>
  );
}
