import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL, SCHEMA_AUTHOR, SCHEMA_PUBLISHER } from "@/lib/seo";
import { SectionMark } from "@/components/brand/SectionMark";
import { JUNIPER_URL } from "@/lib/affiliate-links";
import { ArrowRight, Check } from "lucide-react";
import { requiredDisclosureFor } from "@/lib/partner-disclosures";
import Image from "next/image";
import Link from "next/link";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import StickyCta from "@/components/consumer/StickyCta";
import FactHistory from "@/components/facts/FactHistory";

import AffiliateDisclosure from "@/components/consumer/AffiliateDisclosure";
export const metadata = generateSEOMetadata(seoConfig.juniper);

const SLUG = "/juniper";

// Sponsored CTA (rel=nofollow sponsored, picked up by AffiliateClickTracker).
const juniperAff = {
  href: JUNIPER_URL,
  target: "_blank" as const,
  rel: "nofollow sponsored" as const,
};

// Read on myjuniper.com (homepage, in a browser; curl is blocked) on this date.
const READ_ON = "30 September 2026";

// Juniper's handbook wording, word for word, from the shared registry.
const JUNIPER_DISCLOSURE = requiredDisclosureFor(JUNIPER_URL)?.text ?? "";

const glance: [string, string][] = [
  ["What it is", "Weight-management telehealth, “a digital health clinic by Eucalyptus”"],
  ["For", "Juniper says it is “dedicated to helping women”"],
  ["How it works", "Online quiz → phone consultation with an accredited Australian practitioner"],
  ["Included", "Unlimited follow-ups, app health tracking, patient community"],
  ["Coaching", "1:1 health coaching, can be added at any time"],
  ["Pricing", "Different pricing options, confirmed with your practitioner"],
  ["Code", "JARREDKFC: no charge for the initial consultation, which Juniper values at $89; program fees apply"],
];

// Juniper's own wording from its homepage, read READ_ON.
const included = [
  "Unlimited follow-up consultations with an Australian practitioner",
  "Health tracking via Juniper's app",
  "Access to Juniper's supportive community",
  "1:1 health coaching, which Juniper says can be added for extra support at any time",
  "A 30-day money-back guarantee on the first order, on Juniper's own terms",
];

const steps = [
  { num: 1, heading: "Take the online quiz", body: "Questions about your health history and goals. Juniper says your practitioner reviews your answers confidentially." },
  { num: 2, heading: "Talk to a practitioner", body: "Juniper books a secure phone call with an accredited Australian practitioner, who asks follow-up questions and answers yours." },
  { num: 3, heading: "If you go ahead", body: "The program runs with unlimited follow-up consultations, health tracking in Juniper's app and its patient community, with 1:1 coaching available as an add-on." },
];

const toc: [string, string][] = [
  ["included", "What's included"],
  ["how", "How it works"],
  ["cost", "How it's priced"],
  ["alternatives", "Alternatives"],
  ["faq", "FAQ"],
];

const related: { href: string; label: string; desc: string }[] = [
  { href: "/moshy-vs-juniper", label: "Moshy vs Juniper", desc: "The two weight-management telehealth services side by side, with each one's code." },
  { href: "/best-weight-loss-telehealth-australia", label: "Best weight loss telehealth in Australia", desc: "The Australian online weight-management providers compared on how they work and how they are priced." },
  { href: "/weight-loss-telehealth-women-australia", label: "Weight-loss telehealth for women", desc: "How the women-focused services work." },
  { href: "/weight-loss-telehealth-cost-australia", label: "What weight-loss telehealth costs", desc: "How the services in this category are priced." },
];

const faqs = [
  {
    q: "What is the current Juniper discount code?",
    a: `JARREDKFC. Through our link it means no charge for Juniper's initial consultation, which Juniper values at $89 (source: Juniper's affiliate handbook, confirmed 23 September 2026; no public Juniper page states it); program fees apply.`,
  },
  {
    q: "Is Juniper legit?",
    a: `Juniper describes itself as "a digital health clinic by Eucalyptus", and its consultations are phone calls with an accredited Australian practitioner. Its homepage offers a 30-day money-back guarantee on the first order, and a full refund if you do not proceed after the consultation, both on Juniper's own terms (read ${READ_ON}).`,
  },
  {
    q: "Is Juniper only for women?",
    a: `Juniper says it is "dedicated to helping women", and its program is marketed to women. Whether the program suits a particular person is decided by the practitioner in the consultation.`,
  },
  {
    q: "Can I cancel Juniper, and are refunds available?",
    a: `Juniper states two refund terms on its homepage: a 30-day money-back guarantee on your first order, and a full refund if you do not proceed after the consultation (read ${READ_ON}). Cancellation and refund terms are Juniper's and can change, so check them before you start. Refer Labs does not manage Juniper billing.`,
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
  dateModified: "2026-10-01",
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

function JuniperCTA({ label = "Continue to Juniper", loc, block = false, size = "md" }: { label?: string; loc: string; block?: boolean; size?: "md" | "lg" }) {
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

      <main id="main-content" className="mx-auto max-w-5xl px-5 pb-24 sm:px-8 text-[#14120f]">
        {/* Breadcrumb */}
        <nav className="flex flex-wrap items-center gap-2 pt-8 text-sm text-[#56504a]">
          <Link href="/" className="transition-colors hover:text-[#14120f]">Refer Labs</Link>
          <span>/</span>
          <Link href="/weight-loss" className="transition-colors hover:text-[#14120f]">Weight loss</Link>
          <span>/</span>
          <span className="text-[#14120f]">Juniper</span>
        <SectionMark kind="scale" size={56} /></nav>

        {/* ── Hero: h1, the answer, Juniper's required wording, then the first link ── */}
        <section className="grid gap-10 pt-8 sm:pt-10 lg:grid-cols-[1.55fr_1fr] lg:gap-14">
          <div>
            <span className="mb-5 inline-flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-[#ded8cd] bg-white shadow-[0_10px_28px_-16px_rgba(20,18,15,0.35)]">
              <Image src="/logos/juniper.png" alt="Juniper logo" width={52} height={52} className="h-12 w-12 object-contain" />
            </span>
            <h1 className="mt-4 text-4xl font-extrabold leading-[1.06] tracking-[-0.02em] text-[#14120f] sm:text-5xl lg:text-[3.2rem]">
              Juniper discount code Australia: <span>JARREDKFC waives the $89 consultation</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#56504a]">
              The current Juniper discount code is JARREDKFC: through our link it means no charge for Juniper&apos;s
              initial consultation, which Juniper values at $89; program fees apply. Juniper is a
              weight-management telehealth program that says it is &ldquo;dedicated to helping women&rdquo;, run as
              &ldquo;a digital health clinic by Eucalyptus&rdquo;. The service is an online consultation with a
              registered practitioner, who decides whether the program is right for you.
            </p>
            {/* Juniper's handbook sentence (src/lib/partner-disclosures.ts), verbatim and before any
                Juniper link, in the same block as our own disclosure (2 Oct 2026). */}
            <AffiliateDisclosure compact required={JUNIPER_DISCLOSURE} className="mt-5 max-w-xl" />
            <div className="mt-6">
              <JuniperCTA loc="hero" size="lg" />
            </div>
          </div>

          {/* At-a-glance card */}
          <aside className="lg:pt-2">
            <div className="nw-card rounded-2xl p-6">
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#56504a]">At a glance</span>
              <dl className="mt-4 divide-y divide-[#f1ede4] text-sm">
                {glance.map(([k, v]) => (
                  <div key={k} className="flex gap-3 py-2.5">
                    <dt className="w-24 shrink-0 text-[#56504a]">{k}</dt>
                    <dd className="text-[#14120f]">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-5">
                <JuniperCTA loc="glance-card" block />
              </div>
              <p className="mt-3 text-center text-[11px] text-[#56504a]">Opens myjuniper.com · AU only · read {READ_ON}</p>
            </div>
          </aside>
        </section>

        {/* ── Body grid: TOC + article ── */}
        <div className="mt-14 grid gap-12 lg:grid-cols-[200px_1fr] lg:gap-16">
          {/* TOC */}
          <nav aria-label="On this page" className="hidden lg:block">
            <div className="sticky top-24">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-[#56504a]">On this page</p>
              <ul className="space-y-2.5 text-sm">
                {toc.map(([id, label]) => (
                  <li key={id}>
                    <a href={`#${id}`} className="text-[#56504a] transition-colors hover:text-[#007a95]">{label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* Article */}
          <article className="max-w-2xl">
            <section id="included" className="scroll-mt-24">
              <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#14120f] sm:text-3xl">What does Juniper include?</h2>
              <p className="mt-4 text-[15.5px] leading-relaxed text-[#56504a]">
                In Juniper&apos;s own words on myjuniper.com, read {READ_ON}, all Juniper programs include:
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

            <section id="how" className="mt-12 scroll-mt-24">
              <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#14120f] sm:text-3xl">How does Juniper work?</h2>
              <p className="mt-4 text-[15.5px] leading-relaxed text-[#56504a]">
                Three stages, all done remotely.
              </p>
              <ol className="mt-6 space-y-5">
                {steps.map((s) => (
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

            <section id="cost" className="mt-12 scroll-mt-24">
              <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#14120f] sm:text-3xl">How much does Juniper cost?</h2>
              <div className="mt-4 space-y-4 text-[15.5px] leading-relaxed text-[#56504a]">
                <p>
                  Juniper says &ldquo;Different pricing options are available and may vary depending on the plan
                  confirmed with your practitioner.&rdquo; Juniper confirms the plan price in the consultation, and 1:1
                  health coaching is an optional add-on.
                </p>
                <p>
                  JARREDKFC means no charge for the initial consultation, which Juniper values at $89; program fees
                  apply. Juniper offers a full refund if you do not proceed after the consultation (Juniper&apos;s
                  terms).
                </p>
              </div>
            </section>

            <section id="alternatives" className="mt-12 scroll-mt-24">
              <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#14120f] sm:text-3xl">Comparisons and related guides</h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {related.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="block h-full rounded-xl border border-[#ded8cd] bg-white px-4 py-3 transition-colors hover:border-[#007a95]">
                      <span className="font-semibold text-[#14120f]">{l.label}</span>
                      <span className="mt-1 block text-sm leading-relaxed text-[#56504a]">{l.desc}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            {/* FAQ */}
            <section id="faq" className="mt-14 scroll-mt-24">
              <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#14120f] sm:text-3xl">Frequently asked questions</h2>
              <div className="mt-6 divide-y divide-[#ded8cd] border-y border-[#ded8cd]">
                {faqs.map((f) => (
                  <details key={f.q} className="group py-4">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-[#14120f]">
                      {f.q}
                      <span className="text-xl leading-none text-[#007a95] transition-transform group-open:rotate-45">+</span>
                    </summary>
                    <p className="mt-3 text-[15px] leading-relaxed text-[#56504a]">{f.a}</p>
                  </details>
                ))}
              </div>
            </section>
          </article>
        </div>

        {/* ── Closing CTA ── */}
        <section className="mt-20 overflow-hidden rounded-3xl bg-[#14120f] px-7 py-12 text-center sm:px-12 sm:py-16">
          <h2 className="mx-auto max-w-xl text-3xl font-bold leading-tight text-white sm:text-4xl">
            Start with Juniper, no charge for the initial consultation
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-white/70">
            JARREDKFC through our link means no charge for the initial consultation, which Juniper values at $89;
            program fees apply.
          </p>
          <div className="mt-8 flex justify-center">
            <a {...juniperAff} data-cta="final-band" className="nw-btn justify-center !bg-white !text-[#00748e] px-8 py-4 text-base hover:!bg-[#e4f2f5]">
              Continue to Juniper <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <p className="mx-auto mt-6 max-w-lg text-xs leading-relaxed text-white/60">
            Content is general information about a service, not medical advice. A registered practitioner decides what is right for you after an individual assessment. Juniper&apos;s inclusions and pricing
            are drawn from Juniper&apos;s own site and can change, so confirm current terms before you commit.
          </p>
        </section>
      {/* Renders nothing until this subject has a third observation. The slot
          exists so the series appears here the moment the next re-check lands. */}
      <FactHistory subject="Juniper" kind="availability_check" hub="weight-loss" route="/juniper" />

      </main>

      <StickyCta href={JUNIPER_URL} product="Juniper weight-management program" label="Get started" />
    </ConsumerShell>
  );
}
