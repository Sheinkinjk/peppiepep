import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL, SCHEMA_AUTHOR, SCHEMA_PUBLISHER } from "@/lib/seo";
import { JUNIPER_URL } from "@/lib/affiliate-links";
import { ArrowRight, Check, ShieldCheck, Stethoscope, Truck, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import StickyCta from "@/components/consumer/StickyCta";
import FactHistory from "@/components/facts/FactHistory";

import AffiliateDisclosure from "@/components/consumer/AffiliateDisclosure";
export const metadata = generateSEOMetadata(seoConfig.juniper);

const SLUG = "/juniper";

// Sponsored CTA (rel=nofollow sponsored, picked up by AffiliateClickTracker).
// JARREDKFC is commission-only: NO customer discount is claimed anywhere here.
const juniperAff = {
  href: JUNIPER_URL,
  target: "_blank" as const,
  rel: "nofollow sponsored" as const,
};

const glance: [string, string][] = [
  ["What it is", "Australian women's weight-management telehealth"],
  ["For", "Women seeking a coaching-led, clinically-supervised program"],
  ["Format", "Online eligibility → practitioner review → program & delivery"],
  ["Included", "Unlimited follow-ups, app tracking, patient community"],
  ["Pricing", "Monthly subscription, two program options, confirmed in the consult"],
  ["Referral", "Free first consultation when you start via our link"],
];

const trust = [
  { icon: Stethoscope, label: "AHPRA-registered practitioners" },
  { icon: Users, label: "Coaching, app and patient community" },
  { icon: Truck, label: "Subscription with home delivery" },
  { icon: ShieldCheck, label: "30-day money-back guarantee (Juniper's own)" },
];

const included = [
  "Online consultations with Australian-registered practitioners",
  "A medical weight-management program tailored by your practitioner",
  "Unlimited practitioner follow-ups, seven days a week",
  "Health tracking through the award-winning Juniper app, with June AI",
  "The 20,000-member Juniper patient community",
  "Optional 1:1 health coaching from dietitians (a paid add-on)",
];

const steps = [
  { num: 1, heading: "Complete the online consultation", body: "You answer a health questionnaire about your history, weight and goals. It takes a few minutes and commits you to nothing." },
  { num: 2, heading: "A practitioner reviews your case", body: "An Australian-registered practitioner assesses your answers individually. Not everyone is suitable, and some applicants are declined at review." },
  { num: 3, heading: "Your Weight Reset Program is set", body: "If you are suitable, your program is discussed with you and tailored by your practitioner, with the cost shown before you commit." },
  { num: 4, heading: "Ongoing support and delivery", body: "The program runs on a subscription with unlimited follow-ups, app tracking, the patient community, and everything delivered discreetly to your door." },
];

const toc: [string, string][] = [
  ["what", "What Juniper is"],
  ["included", "What the program includes"],
  ["start", "How it works"],
  ["cost", "What it costs"],
  ["verdict", "Is it legit & worth it?"],
  ["bottom-line", "Why Juniper"],
  ["faq", "FAQ"],
];

const faqs = [
  {
    q: "What is Juniper?",
    a: "Juniper is an Australian medical weight-management program designed for women. Its Weight Reset Program pairs online consultations with Australian-registered practitioners with a full wraparound of care: unlimited follow-ups, health tracking through an award-winning app with June AI, a 20,000-member patient community, and optional 1:1 health coaching from dietitians as a paid add-on.",
  },
  {
    q: "Is Juniper only for women?",
    a: "Juniper designs and markets its program for women. It is built around understanding what women experience with weight, from the practitioners to the coaching and community. Suitability for the program is decided individually by a registered Australian practitioner in your consultation.",
  },
  {
    q: "How much does Juniper cost?",
    a: "Juniper runs as a monthly subscription that its own site says includes the program, unlimited consultations and delivery, plus optional 1:1 health coaching as a paid add-on and a 30-day money-back window. Juniper offers two program options at different price points, so the figure that applies to you is confirmed inside Juniper's own flow before you commit.",
  },
  {
    q: "What makes Juniper different?",
    a: "The wraparound care. Beyond the medical program, you get a care team available seven days a week for unlimited follow-up consultations, an award-winning app with tracking, recipes and a 24/7 in-app AI companion, optional 1:1 coaching from dietitians, and a 20,000-member patient community. A free first consultation lets you check whether it fits before committing.",
  },
  {
    q: "What does the program actually involve?",
    a: "Juniper's Weight Reset Program is a practitioner-led medical weight-management program wrapped in ongoing support. The clinical specifics are decided individually by your treating practitioner in your consultation, not from a webpage, which is exactly why the free first consultation exists. This page is general information, not medical advice.",
  },
  {
    q: "How do I start with Juniper?",
    a: "You complete an online questionnaire, an Australian-registered practitioner reviews it, and if you are suitable your program is discussed with you. Some applicants are declined at review. You can begin from the link on this page, and new patients get a free first consultation.",
  },
  {
    q: "Is Juniper legit?",
    a: "Yes. Juniper is an established Australian weight-management telehealth service, and applications are reviewed individually by AHPRA-registered practitioners rather than approved automatically. It publishes its inclusions openly, runs a 20,000-member patient community, and offers a 30-day money-back window on eligible first orders. Some applicants are declined at review, which is the clinical screening working as it should.",
  },
  {
    q: "Is Juniper worth it?",
    a: "It depends on what you want from a program. Juniper's value is the wraparound: a practitioner-led program plus unlimited follow-ups seven days a week, coaching, an award-winning app and a large patient community, rather than a program on its own. Because it runs on an ongoing subscription, the value tracks how consistently you use it. The free first consultation for new patients is a no-commitment way to judge whether the fit is right before you pay for anything.",
  },
  {
    q: "Does Juniper actually work?",
    a: "Juniper is a program and support service rather than a one-off intervention, so whether it works comes down to the individual and is a clinical matter decided with your practitioner, not something a webpage can promise. What Juniper provides is structure: practitioner-led care, unlimited follow-ups, coaching, tracking and a patient community, all designed to help people stay consistent. Results vary between people and depend on suitability and how closely the program is followed. This is general information, not medical advice.",
  },
  {
    q: "Can I cancel Juniper, and are refunds available?",
    a: "Juniper runs on a subscription and offers a 30-day money-back window on eligible first orders. Cancellation and refund terms are set by Juniper and can change, so check the current terms on Juniper's own site before subscribing, and keep written confirmation of any cancellation. Refer Labs does not manage Juniper billing.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Weight Loss", item: `${SITE_URL}/weight-loss` },
    { "@type": "ListItem", position: 3, name: "Juniper", item: `${SITE_URL}${SLUG}` },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.juniper.title,
  description: seoConfig.juniper.description,
  url: seoConfig.juniper.url,
  inLanguage: "en-AU",
  datePublished: "2026-07-29",
  dateModified: "2026-08-06",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  author: SCHEMA_AUTHOR,
  publisher: SCHEMA_PUBLISHER,
  about: {
    "@type": "Service",
    name: "Weight management telehealth",
    serviceType: "Telehealth weight management program",
    areaServed: { "@type": "Country", name: "Australia" },
    provider: { "@type": "Organization", name: "Juniper", url: "https://www.myjuniper.com" },
  },
};

function JuniperCTA({ label = "Check your eligibility", loc, block = false, size = "md" }: { label?: string; loc: string; block?: boolean; size?: "md" | "lg" }) {
  const pad = size === "lg" ? "px-8 py-4 text-base" : "";
  return (
    <a {...juniperAff} data-cta={loc} className={`nw-btn justify-center ${pad} ${block ? "w-full" : ""}`}>
      {label} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </a>
  );
}

export default function JuniperPage() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      <main id="main-content" className="mx-auto max-w-5xl px-5 pb-24 sm:px-8 text-[#10251b]">
        {/* Breadcrumb */}
        <nav className="flex flex-wrap items-center gap-2 pt-8 text-sm text-[#6e7b74]">
          <Link href="/" className="transition-colors hover:text-[#10251b]">Refer Labs</Link>
          <span>/</span>
          <Link href="/weight-loss" className="transition-colors hover:text-[#10251b]">Weight loss</Link>
          <span>/</span>
          <span className="text-[#10251b]">Juniper</span>
        </nav>

        {/* ── Hero ── */}
        <section className="grid gap-10 pt-8 sm:pt-10 lg:grid-cols-[1.55fr_1fr] lg:gap-14">
          <div>
            <span className="mb-5 inline-flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-[#e5e9e7] bg-white shadow-[0_10px_28px_-16px_rgba(16,37,27,0.35)]">
              <Image src="/logos/juniper.png" alt="Juniper logo" width={52} height={52} className="h-12 w-12 object-contain" />
            </span>
            <h1 className="mt-4 text-4xl font-extrabold leading-[1.06] tracking-[-0.02em] text-[#10251b] sm:text-5xl lg:text-[3.2rem]">
              Juniper Australia: <span className="text-[#0a7c42]">a free first consultation for new patients</span>
            </h1>
            <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#cfe6da] bg-[#e8f5ee] px-4 py-1.5 text-[13px] font-bold text-[#0a7c42]">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" /> New patients get a free first consultation through our link
            </p>
            {/* Below the lead. The first paragraph after the h1 is the answer;
                a disclosure in that slot is what an engine lifts instead. Still
                above the first affiliate link, which is what it is for. */}
            <AffiliateDisclosure compact className="mt-4 max-w-2xl" />
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#3d4b44]">
              Juniper is an Australian medical weight-management program designed for women. Its Weight Reset Program
              pairs online consultations with Australian-registered practitioners with a full wraparound of care:
              structured coaching, unlimited follow-ups, an award-winning app and a 20,000-member patient community. Start
              with a free first consultation to check whether it fits, no commitment.
            </p>
            <div className="mt-6">
              <JuniperCTA label="Start with a free consultation" loc="hero" size="lg" />
            </div>
              {/* Juniper's handbook requires one of two disclosure statements
                  word-for-word AND prominently displayed, benchmarked against a
                  social caption. It previously appeared once, in 45%-opacity text
                  at the very bottom of a 440-line page, which a reader who clicked
                  the hero CTA would never reach. This is the exact wording, in
                  readable contrast, beside the CTA. Do not reword, abbreviate or
                  append to this sentence. */}
              <p className="mt-5 max-w-xl rounded-xl border border-[#e5e9e7] bg-[#f8faf9] px-4 py-3 text-[13px] leading-relaxed text-[#3d4b44]">
                This post contains affiliate links. If you are a new Juniper patient and make a purchase through these
                links, I may earn a small commission at no extra cost to you.
              </p>
          </div>

          {/* At-a-glance card */}
          <aside className="lg:pt-2">
            <div className="nw-card rounded-2xl p-6">
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#9aa39c]">At a glance</span>
              <dl className="mt-4 divide-y divide-[#eef1ef] text-sm">
                {glance.map(([k, v]) => (
                  <div key={k} className="flex gap-3 py-2.5">
                    <dt className="w-24 shrink-0 text-[#9aa39c]">{k}</dt>
                    <dd className="text-[#2b362f]">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-5">
                <JuniperCTA loc="glance-card" block />
              </div>
              <p className="mt-3 text-center text-[11px] text-[#9aa39c]">Opens myjuniper.com · AU only</p>
            </div>
          </aside>
        </section>

        {/* ── Trust strip ── */}
        <section className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[#e5e9e7] bg-[#e5e9e7] sm:grid-cols-4">
          {trust.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-3 bg-white px-5 py-5">
              <Icon className="h-5 w-5 shrink-0 text-[#0a7c42]" strokeWidth={1.7} aria-hidden="true" />
              <span className="text-[13px] font-medium leading-snug text-[#3d4b44]">{label}</span>
            </div>
          ))}
        </section>

        {/* ── Compliance notice ── */}
        <p className="mt-8 rounded-xl border border-[#e5e9e7] bg-white px-5 py-4 text-xs leading-relaxed text-[#6e7b74]">
          <span className="font-semibold text-[#3d4b44]">Information only.</span> This page describes Juniper&apos;s
          program as a service and is not medical advice. Suitability for any program is decided individually by a
          registered Australian practitioner in a consultation. Always consult a qualified health professional before
          making any health decision.
        </p>

        {/* ── Body grid: TOC + article ── */}
        <div className="mt-12 grid gap-12 lg:grid-cols-[200px_1fr] lg:gap-16">
          {/* TOC */}
          <nav aria-label="On this page" className="hidden lg:block">
            <div className="sticky top-24">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-[#9aa39c]">On this page</p>
              <ul className="space-y-2.5 text-sm">
                {toc.map(([id, label]) => (
                  <li key={id}>
                    <a href={`#${id}`} className="text-[#6e7b74] transition-colors hover:text-[#0a7c42]">{label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* Article */}
          <article className="max-w-2xl">
            {/* What */}
            <section id="what" className="scroll-mt-24">
              <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b] sm:text-3xl">What Juniper is</h2>
              <div className="mt-4 space-y-4 text-[15.5px] leading-relaxed text-[#3d4b44]">
                <p>
                  Juniper is a clinically-led Australian weight-management program designed for women, built around its
                  Weight Reset Program. You complete a health questionnaire online, an Australian-registered practitioner
                  reviews your case, and if it is appropriate you continue on a subscription with everything delivered
                  discreetly to your door. There is no in-person GP appointment to book to get started.
                </p>
                <p>
                  What sets it apart is the wraparound: unlimited follow-ups seven days a week, health tracking through an
                  award-winning app, a 20,000-member patient community, and optional 1:1 coaching from dietitians. It is
                  built for people who want structure and a whole care team in their corner, not just a program.
                </p>
              </div>
              <p className="my-7 border-l-2 border-[#0a7c42] pl-5 text-[15px] leading-relaxed text-[#3d4b44]">
                The coaching and community are the draw, but the practitioner review is the part that matters: every
                application is assessed individually, and some are declined.
              </p>
            </section>

            {/* Included */}
            <section id="included" className="mt-12 scroll-mt-24">
              <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b] sm:text-3xl">What the Weight Reset Program includes</h2>
              <p className="mt-4 text-[15.5px] leading-relaxed text-[#3d4b44]">
                Juniper positions itself as more than a program: it wraps clinical care in ongoing support. Based on
                Juniper&apos;s own site, a plan includes:
              </p>
              <ul className="mt-5 grid gap-2.5">
                {included.map((t) => (
                  <li key={t} className="flex items-start gap-2.5 text-[15px] leading-relaxed text-[#3d4b44]">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e6f3ec]">
                      <Check className="h-3.5 w-3.5 text-[#0a7c42]" strokeWidth={2.5} aria-hidden="true" />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </section>

            {/* How it works */}
            <section id="start" className="mt-12 scroll-mt-24">
              <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b] sm:text-3xl">How it works</h2>
              <ol className="mt-6 space-y-5">
                {steps.map((s) => (
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
              <div className="mt-7 rounded-xl border border-[#cfe6da] bg-[#e8f5ee] p-5">
                <p className="text-sm leading-relaxed text-[#2b362f]">
                  Want to see if Juniper is a fit? The online eligibility check takes a few minutes and commits you to
                  nothing, and new patients get a free first consultation with a practitioner through our link.
                </p>
                <div className="mt-4">
                  <JuniperCTA label="Start the Juniper eligibility check" loc="start" />
                </div>
              </div>
            </section>

            {/* Cost */}
            <section id="cost" className="mt-12 scroll-mt-24">
              <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b] sm:text-3xl">What Juniper costs</h2>
              <div className="mt-4 space-y-4 text-[15.5px] leading-relaxed text-[#3d4b44]">
                <p>
                  Juniper runs as a monthly subscription that its own site says covers the program, unlimited
                  consultations and delivery, with optional 1:1 health coaching as a paid add-on and a 30-day money-back
                  window. Juniper offers two program options at different price points, so the cost that applies to you is
                  confirmed inside Juniper&apos;s own flow before you commit to anything.
                </p>
                <p>
                  New patients who start through our Juniper link get a free first consultation, applied when you use our
                  link at checkout. It is a no-cost, no-commitment way to talk to a practitioner and find out whether the
                  program suits you.
                </p>
              </div>
            </section>

            {/* Legit & worth it (review intent) */}
            <section id="verdict" className="mt-12 scroll-mt-24">
              <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b] sm:text-3xl">Is Juniper legit, and is it worth it?</h2>
              <div className="mt-4 space-y-4 text-[15.5px] leading-relaxed text-[#3d4b44]">
                <p>
                  On the markers that matter, Juniper is a real clinical service, not a storefront. Applications are
                  reviewed individually by AHPRA-registered practitioners, some applicants are declined, the inclusions
                  are published openly, and there is a 30-day money-back window on eligible first orders. It is an
                  established Australian brand with a 20,000-member patient community behind it.
                </p>
                <p>
                  Whether it is worth it comes down to what you want from a program. Juniper&apos;s real draw is the
                  wraparound: unlimited follow-ups seven days a week, coaching, an award-winning app and a large
                  community, rather than a program on its own. Because it runs on an ongoing subscription, the value
                  tracks how consistently you use it. If you want structure and a whole care team in your corner, that is
                  where it earns its place; if you would rather manage everything with your own GP, that is a reasonable
                  choice too.
                </p>
              </div>
              <p className="my-7 border-l-2 border-[#0a7c42] pl-5 text-[15px] leading-relaxed text-[#3d4b44]">
                The free first consultation exists for exactly this question: it is a no-commitment way to talk to a
                practitioner and judge the fit before you pay for anything.
              </p>
            </section>

            {/* Bottom line */}
            <section id="bottom-line" className="mt-14 scroll-mt-24">
              <div className="nw-card rounded-2xl p-7 sm:p-8">
                <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b] sm:text-3xl">Why Juniper</h2>
                <p className="mt-4 text-[15.5px] leading-relaxed text-[#3d4b44]">
                  Juniper is built for women who want a whole care team in their corner, not just a program: coaching,
                  community, an award-winning app, and unlimited follow-ups seven days a week. The free first consultation
                  is the low-stakes way to check whether it fits, with a 30-day money-back window on eligible first orders.
                </p>
                <ul className="mt-5 space-y-2">
                  {[
                    "Wraparound care: unlimited follow-ups, coaching, app and a 20,000-member community",
                    "Designed for and marketed to women",
                    "Registered Australian practitioners; not everyone is approved",
                    "Free first consultation via our link, no commitment",
                  ].map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-sm text-[#2b362f]">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#0a7c42]" aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
                <div className="mt-7 flex flex-wrap items-center gap-4">
                  <JuniperCTA label="Start with a free consultation" loc="bottom-line" size="lg" />
                </div>
              </div>
            </section>

            {/* FAQ */}
            <section id="faq" className="mt-14 scroll-mt-24">
              <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b] sm:text-3xl">Frequently asked questions</h2>
              <div className="mt-6 divide-y divide-[#e5e9e7] border-y border-[#e5e9e7]">
                {faqs.map((f) => (
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

            {/* Related */}
            <section className="mt-12">
              <h2 className="text-lg font-bold text-[#10251b]">Keep reading</h2>
              <ul className="mt-3 space-y-2 text-[15px]">
                <li><Link href="/weight-loss-telehealth-women-australia" className="nw-link">Weight-loss telehealth for women, explained</Link></li>
                <li><Link href="/weight-loss-telehealth-cost-australia" className="nw-link">What weight-loss telehealth costs</Link></li>
                <li><Link href="/weight-loss" className="nw-link">The full weight-loss hub</Link></li>
              </ul>
            </section>
          </article>
        </div>

        {/* ── Final CTA band ── */}
        <section className="mt-20 overflow-hidden rounded-3xl bg-[#10251b] px-7 py-12 text-center sm:px-12 sm:py-16">
          <h2 className="mx-auto max-w-xl text-3xl font-bold leading-tight text-white sm:text-4xl">
            See where you stand with Juniper
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-white/70">
            A few minutes and no obligation. New patients get a free first consultation with an Australian-registered
            practitioner through our link, and you see the cost before you commit.
          </p>
          <div className="mt-8 flex justify-center">
            <a {...juniperAff} data-cta="final-band" className="nw-btn justify-center !bg-white !text-[#0a7c42] px-8 py-4 text-base hover:!bg-[#e8f5ee]">
              Start with a free consultation <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <p className="mx-auto mt-6 max-w-lg text-xs leading-relaxed text-white/45">
            This post contains affiliate links. If you are a new Juniper patient and make a purchase through these links,
            I may earn a small commission at no extra cost to you.
          </p>
          <p className="mx-auto mt-3 max-w-lg text-xs leading-relaxed text-white/45">
            Content is general information, not medical advice, and suitability for any program is decided by a registered Australian practitioner. Juniper&apos;s inclusions and pricing are drawn from Juniper&apos;s own site and can change, so confirm current terms before you commit.
          </p>
        </section>
      {/* Renders nothing until this subject has a third observation. The slot
          exists so the series appears here the moment the next re-check lands. */}
      <FactHistory subject="Juniper" kind="availability_check" hub="weight-loss" route="/juniper" />

      </main>

      <StickyCta href={JUNIPER_URL} product="Juniper weight-management program" label="Check eligibility" />
    </ConsumerShell>
  );
}
