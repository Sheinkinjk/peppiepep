import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Check, ShieldCheck, Zap, BadgeCheck, Wrench, HandCoins } from "lucide-react";
import { SITE_URL } from "@/lib/seo";
import { VERIFIED_FULL } from "@/lib/offers";
import ApolloEoiForm from "@/components/apollo/ApolloEoiForm";

const URL = `${SITE_URL}/apollo-energy-group-eoi`;

// Campaign / grassroots landing page: noindex so it doesn't compete with the
// editorial /apollo-energy-group money page, but fully crawlable and shareable.
export const metadata: Metadata = {
  title: "Home Battery + $500 Off | Apollo Energy Group Enquiry | Refer Labs",
  description:
    "Register your interest in a home battery with Apollo Energy Group and get $500 off your quote through Refer Labs, on top of the government rebate. A person contacts you within 2 business days. No documents, no obligation.",
  alternates: { canonical: URL },
  robots: { index: false, follow: true },
};

const GOLD = "#f4b740";

const STATS = [
  { v: "70%+", l: "average bill reduction (Apollo's figure)" },
  { v: "$500", l: "off your quote via Refer Labs" },
  { v: "10 yr", l: "battery warranty" },
  { v: "4.9/5", l: "Google rating (Apollo's own site)" },
];

const WHY = [
  { icon: Wrench, h: "Custom-engineered, not a package", p: "Every system is sized from your real usage data, not sold as a one-size box. You get a system that fits your home, not a sales target." },
  { icon: HandCoins, h: "Transparent pricing & finance", p: "Clear pricing with finance options through Australian lenders, the federal rebate applied at the point of sale, and no surprises." },
  { icon: ShieldCheck, h: "No high-pressure sales", p: "Just great advice. Apollo is SAA-accredited (Electrical Licence 400672) with a 10-year battery warranty and 12 years of installer experience." },
];

export default function ApolloEoiPage() {
  return (
    <main className="min-h-screen bg-[#0c1720] text-white antialiased">
      {/* Top bar */}
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 pt-6 sm:px-8">
        <Link href="/" className="text-sm font-bold tracking-tight text-white/90">Refer Labs</Link>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1 text-[12px] font-medium text-white/70">
          <BadgeCheck className="h-3.5 w-3.5" style={{ color: GOLD }} aria-hidden="true" /> Offer verified {VERIFIED_FULL}
        </span>
      </div>

      {/* Hero + form */}
      <section className="mx-auto grid max-w-5xl items-start gap-10 px-5 pb-14 pt-10 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:pt-14">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[12px] font-bold uppercase tracking-[0.14em]" style={{ background: `${GOLD}1a`, color: GOLD }}>
            <Zap className="h-3.5 w-3.5" aria-hidden="true" /> Home battery, done properly
          </span>
          <h1 className="mt-5 text-4xl font-black leading-[1.04] tracking-[-0.02em] sm:text-[3.2rem]">
            $500 off a home battery,{" "}
            <span style={{ color: GOLD }}>on top of the government rebate.</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/75">
            Refer Labs readers get an exclusive $500 off a home battery quote from Apollo Energy Group, a Sydney-based,
            SAA-accredited installer, applied on top of the federal Cheaper Home Batteries rebate rather than instead of
            it. Register your interest below and a person will be in touch <strong className="text-white">within 2
            business days</strong>.
          </p>
          <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2.5 text-[14px] font-medium text-white/80">
            {["$500 off, on top of the rebate", "Sized from your real usage", "No documents, no obligation"].map((t) => (
              <li key={t} className="inline-flex items-center gap-1.5"><Check className="h-4 w-4" style={{ color: GOLD }} strokeWidth={2.5} aria-hidden="true" /> {t}</li>
            ))}
          </ul>
          <div className="mt-8 flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-white/95">
              <Image src="/logos/apollo-energy.png" alt="Apollo Energy Group" width={36} height={36} className="h-9 w-9 object-contain" />
            </span>
            <p className="text-sm text-white/60">In partnership with Apollo Energy Group.<br />Voted, on Apollo&apos;s own site, SBC&apos;s #1 NSW battery installer.</p>
          </div>
        </div>

        <div id="register" className="scroll-mt-6">
          <div className="mb-4 flex items-baseline justify-between">
            <h2 className="text-lg font-extrabold">Register your interest</h2>
            <span className="text-[12px] text-white/50">~1 minute</span>
          </div>
          <ApolloEoiForm />
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-px px-5 py-2 sm:grid-cols-4 sm:px-8">
          {STATS.map((s) => (
            <div key={s.l} className="px-3 py-5 text-center">
              <div className="text-2xl font-black" style={{ color: GOLD }}>{s.v}</div>
              <div className="mt-1 text-[12px] leading-snug text-white/60">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Apollo */}
      <section className="mx-auto max-w-5xl px-5 py-14 sm:px-8">
        <h2 className="text-2xl font-black tracking-tight sm:text-3xl">Why people choose Apollo</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {WHY.map(({ icon: Icon, h, p }) => (
            <div key={h} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <Icon className="h-6 w-6" style={{ color: GOLD }} strokeWidth={1.8} aria-hidden="true" />
              <h3 className="mt-4 font-extrabold text-white">{h}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">{p}</p>
            </div>
          ))}
        </div>
      </section>

      {/* The $500 + rebate */}
      <section className="mx-auto max-w-5xl px-5 pb-14 sm:px-8">
        <div className="rounded-2xl border p-7 sm:p-9" style={{ borderColor: `${GOLD}40`, background: `${GOLD}0d` }}>
          <h2 className="text-2xl font-black tracking-tight">How the $500 works</h2>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-white/80">
            The $500 is the Refer Labs discount, applied directly to your Apollo quote, on top of the federal Cheaper
            Home Batteries rebate, not instead of it. Some states, including NSW, add a Virtual Power Plant incentive as
            well. There&apos;s no code to enter: register below and it&apos;s attached to your enquiry. Figures like the
            rebate are indicative and confirmed on your quote.
          </p>
          <a href="#register" className="mt-6 inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-[15px] font-bold text-[#0c1720]" style={{ background: GOLD }}>
            Register my interest
          </a>
        </div>
      </section>

      {/* Disclosure footer */}
      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-5xl px-5 py-10 text-[13px] leading-relaxed text-white/50 sm:px-8">
          <p>
            Refer Labs is an independent referrer, not Apollo Energy Group and not the installer. With your consent we
            introduce your enquiry to Apollo; they assess it and make any offer to you directly. We may be paid a
            commission if you proceed, at no extra cost to you, and it never changes what you&apos;re quoted. The $500 is
            the Refer Labs discount. Stats such as the 4.9/5 rating, 70%+ bill reduction and &ldquo;#1 NSW installer&rdquo;
            are Apollo&apos;s own published figures. Rebate amounts float and are confirmed on your quote.
          </p>
          <p className="mt-4 text-white/40">
            Pepform Pty Ltd trading as Refer Labs · ABN 32 660 008 159 ·{" "}
            <Link href="/privacy" className="underline hover:text-white/70">Privacy Policy</Link> ·{" "}
            <Link href="/apollo-energy-review" className="underline hover:text-white/70">Read our Apollo review</Link>
          </p>
        </div>
      </footer>
    </main>
  );
}
