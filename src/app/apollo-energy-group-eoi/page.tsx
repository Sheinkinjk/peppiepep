import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Check, ShieldCheck, BatteryCharging, HandCoins, Wrench, BadgeCheck } from "lucide-react";
import ConsumerShell from "@/components/consumer/ConsumerShell";
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

const STATS = [
  { v: "70%+", l: "average bill reduction (Apollo's figure)" },
  { v: "$500", l: "off your quote via Refer Labs" },
  { v: "10 yr", l: "battery warranty" },
  { v: "4.9/5", l: "Google rating (Apollo's own site)" },
];

const WHY = [
  { icon: Wrench, h: "Custom-engineered, not a package", p: "Every system is sized from your real usage data, not sold as a one-size box. You get a system that fits your home, not a sales target." },
  { icon: HandCoins, h: "Transparent pricing & finance", p: "Clear pricing with finance options through Australian lenders, the federal rebate applied at the point of sale, and no surprises." },
  { icon: ShieldCheck, h: "No high-pressure sales", p: "Just advice. Apollo is SAA-accredited (Electrical Licence 400672) with a 10-year battery warranty and 12 years of installer experience." },
];

const STEPS = [
  { n: "01", h: "Register your interest", p: "Fill in the short form above. It takes about a minute, there are no documents to upload and no obligation." },
  { n: "02", h: "We introduce you to Apollo", p: "With your consent, we pass your enquiry to Apollo Energy Group with your $500 Refer Labs discount attached." },
  { n: "03", h: "A person calls you back", p: "Apollo contacts you within 2 business days to size a system from your usage and walk you through the numbers." },
];

export default function ApolloEoiPage() {
  return (
    <ConsumerShell>
      <main id="main-content" className="mx-auto max-w-5xl px-5 pb-24 sm:px-8">
        {/* ── Hero + form ── */}
        <section className="grid items-start gap-10 pt-10 sm:pt-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div>
            <span className="nw-kicker inline-flex items-center gap-1.5">
              <BatteryCharging className="h-3.5 w-3.5" aria-hidden="true" /> Home battery enquiry
            </span>
            <h1 className="mt-4 text-4xl font-extrabold leading-[1.06] tracking-[-0.02em] text-[#10251b] sm:text-5xl lg:text-[3.1rem]">
              $500 off a home battery,{" "}
              <span className="text-[#0a7c42]">on top of the government rebate.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#3d4b44]">
              Refer Labs readers get an exclusive $500 off a home battery quote from Apollo Energy Group, a Sydney-based,
              SAA-accredited installer, applied on top of the federal Cheaper Home Batteries rebate rather than instead
              of it. Register your interest and a person will be in touch{" "}
              <strong className="text-[#10251b]">within 2 business days</strong>.
            </p>
            <ul className="mt-7 grid gap-2.5 text-[15px] font-medium text-[#10251b]">
              {["$500 off, applied on top of the rebate", "System sized from your real usage", "No documents, no obligation"].map((t) => (
                <li key={t} className="flex items-center gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e6f3ec]">
                    <Check className="h-3.5 w-3.5 text-[#0a7c42]" strokeWidth={2.5} aria-hidden="true" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex items-center gap-3 rounded-2xl border border-[#e3e7e2] bg-white p-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#e5e9e7] bg-white">
                <Image src="/logos/apollo-energy.png" alt="Apollo Energy Group" width={34} height={34} className="h-8 w-8 object-contain" />
              </span>
              <p className="text-[13px] leading-snug text-[#6e7b74]">
                In partnership with <span className="font-semibold text-[#10251b]">Apollo Energy Group</span>. On Apollo&apos;s
                own site, voted SBC&apos;s #1 NSW battery installer.
              </p>
            </div>
          </div>

          <div id="register" className="scroll-mt-24 lg:sticky lg:top-24">
            <div className="mb-4 flex items-baseline justify-between">
              <h2 className="text-lg font-extrabold tracking-tight text-[#10251b]">Register your interest</h2>
              <span className="inline-flex items-center gap-1 text-[12px] font-medium text-[#0a7c42]">
                <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" /> Verified {VERIFIED_FULL}
              </span>
            </div>
            <ApolloEoiForm />
          </div>
        </section>

        {/* ── Stats strip ── */}
        <section className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.l} className="nw-card p-5 text-center">
              <div className="text-2xl font-extrabold text-[#0a7c42]">{s.v}</div>
              <div className="mt-1 text-[12px] leading-snug text-[#6e7b74]">{s.l}</div>
            </div>
          ))}
        </section>

        {/* ── Why Apollo ── */}
        <section className="mt-16">
          <h2 className="text-2xl font-extrabold tracking-tight text-[#10251b] sm:text-3xl">Why people choose Apollo</h2>
          <div className="mt-7 grid gap-4 sm:grid-cols-3">
            {WHY.map(({ icon: Icon, h, p }) => (
              <div key={h} className="nw-card p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e6f3ec]">
                  <Icon className="h-5 w-5 text-[#0a7c42]" strokeWidth={1.9} aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-extrabold text-[#10251b]">{h}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#3d4b44]">{p}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── How the $500 works ── */}
        <section className="mt-14 rounded-2xl border border-[#cfe6da] bg-[#e6f3ec] p-7 sm:p-9">
          <h2 className="text-2xl font-extrabold tracking-tight text-[#10251b]">How the $500 works</h2>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[#28453a]">
            The $500 is the Refer Labs discount, applied directly to your Apollo quote, on top of the federal Cheaper
            Home Batteries rebate, not instead of it. Some states, including NSW, add a Virtual Power Plant incentive as
            well. There is no code to enter: register above and it is attached to your enquiry. Rebate figures are
            indicative and confirmed on your quote.
          </p>
          <a href="#register" className="nw-btn mt-6">Register my interest</a>
        </section>

        {/* ── What happens next ── */}
        <section className="mt-16">
          <h2 className="text-2xl font-extrabold tracking-tight text-[#10251b] sm:text-3xl">What happens after you register</h2>
          <div className="mt-7 grid gap-4 sm:grid-cols-3">
            {STEPS.map((s) => (
              <div key={s.n} className="nw-card p-6">
                <span className="text-sm font-extrabold text-[#0a7c42]">{s.n}</span>
                <h3 className="mt-2 font-extrabold text-[#10251b]">{s.h}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#3d4b44]">{s.p}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Referrer disclosure ── */}
        <section className="mt-14 rounded-2xl border border-[#e3e7e2] bg-white p-6 sm:p-7">
          <p className="text-[13px] leading-relaxed text-[#6e7b74]">
            Refer Labs is an independent referrer, not Apollo Energy Group and not the installer. With your consent we
            introduce your enquiry to Apollo; they assess it and make any offer to you directly. We may be paid a
            commission if you proceed, at no extra cost to you, and it never changes what you are quoted. The $500 is the
            Refer Labs discount. Figures such as the 4.9/5 rating, 70%+ bill reduction and &ldquo;#1 NSW installer&rdquo;
            are Apollo&apos;s own published figures; rebate amounts float and are confirmed on your quote. Prefer the full
            write-up first? Read our{" "}
            <Link href="/apollo-energy-review" className="font-semibold text-[#0a7c42] underline">independent Apollo review</Link>.
          </p>
        </section>
      </main>
    </ConsumerShell>
  );
}
