import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import { MOSHY_URL } from "@/lib/affiliate-links";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import StickyCta from "@/components/consumer/StickyCta";

export const metadata = generateSEOMetadata(seoConfig.moshyVsPilot);

const GREEN = "#0a7c42";
const PILOT_URL = "https://pilot.com.au/";

const aff = { href: MOSHY_URL, target: "_blank" as const, rel: "nofollow sponsored" as const };
const ext = { href: PILOT_URL, target: "_blank" as const, rel: "nofollow" as const };

// ── JSON-LD ──────────────────────────────────────────────────────────────────
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Weight Loss", item: `${SITE_URL}/weight-loss` },
    { "@type": "ListItem", position: 3, name: "Moshy vs Pilot", item: `${SITE_URL}/moshy-vs-pilot` },
  ],
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Moshy vs Pilot: Weight Loss Telehealth Australia 2026",
  description:
    "A side-by-side comparison of Moshy and Pilot, two Australian weight-management telehealth services, on price, lock-in, who each is built for, the online process, what is included, and GLP-1 access.",
  numberOfItems: 2,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Moshy",
      description:
        "Australian telehealth weight-management program, gender-neutral and open to anyone eligible. Lower entry price and no lock-in contract. Online eligibility check, practitioner review, GLP-1 access where clinically appropriate.",
      url: `${SITE_URL}/moshy-review`,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Pilot",
      description:
        "Men-focused telehealth from Eucalyptus, covering broader men's health alongside weight management. Subscription program within a wider ecosystem. Online consult, practitioner review, GLP-1 access where clinically appropriate.",
      url: PILOT_URL,
    },
  ],
};

const faqs = [
  {
    q: "Is Moshy or Pilot better for weight loss in Australia?",
    a: "Neither is universally better, they suit different people. On price, Moshy tends to sit lower, from around $249 per month on offer at the time of writing versus roughly $349 per month for Pilot, and Moshy has no lock-in contract. Pilot is Eucalyptus's men-focused service and folds weight management into a broader men's health offering, so it suits someone who wants that wider ecosystem. Both facilitate GLP-1 access only where an Australian-registered practitioner assesses it as clinically appropriate. This is general information, not medical advice.",
  },
  {
    q: "How much do Moshy and Pilot cost?",
    a: "Pricing changes often, so treat these as approximate and check the current figure on each provider before you commit. At the time of writing Moshy advertises a subscription from around $249 per month on offer, with a regular price closer to $349 per month, and no lock-in contract. Pilot's weight program sits in a broadly similar subscription range to its sibling service Juniper, around $349 per month. Any medication, if prescribed, may be billed within or on top of the subscription depending on the plan.",
  },
  {
    q: "Who is Pilot built for?",
    a: "Pilot is the men-focused telehealth brand from Eucalyptus, the parent company that also runs Juniper. It covers a range of men's health areas as well as weight management, so it suits someone who wants weight support inside a broader men's health service. Moshy, by contrast, is gender-neutral and open to anyone eligible. Eucalyptus was acquired by Hims and Hers Health in 2026.",
  },
  {
    q: "Do Moshy and Pilot both offer GLP-1 medications?",
    a: "Both are associated with GLP-1 weight-management pathways. GLP-1 medications are prescription-only in Australia and access depends entirely on an individual clinical assessment by a registered Australian practitioner. Suitability is decided case by case and is never guaranteed before that assessment. Not everyone who completes an eligibility check will be prescribed medication. This page is not medical advice.",
  },
  {
    q: "Does Moshy have a lock-in contract?",
    a: "At the time of writing Moshy advertises no lock-in contract, so it operates on a rolling subscription you can manage without a fixed-term commitment. Always confirm the current cancellation and billing terms directly on the provider before signing up, as these can change.",
  },
  {
    q: "Is the sign-up process online for both?",
    a: "Yes. Both Moshy and Pilot run an online eligibility or consultation flow: you complete a health questionnaire, a registered Australian practitioner reviews it, and if you are suitable a plan is discussed and any medication is delivered to you. No in-person GP visit is required to start. Some applicants are declined at the review stage, which is a sign the screening is working.",
  },
  {
    q: "Can I switch from Pilot to Moshy or the other way around?",
    a: "There is nothing stopping you comparing both and starting with whichever fits, then reassessing later. Because Moshy advertises no lock-in, moving away is straightforward, though you should always check the current cancellation terms on each service. Any change to a medication plan is a clinical decision made with a registered practitioner, not something to manage on price alone.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.moshyVsPilot.title,
  description: seoConfig.moshyVsPilot.description,
  url: seoConfig.moshyVsPilot.url,
  inLanguage: "en-AU",
  datePublished: "2026-07-06",
  dateModified: "2026-07-06",
  isPartOf: { "@type": "WebSite", name: "Refer Labs", url: SITE_URL },
};

// ── Comparison rows ──────────────────────────────────────────────────────────
const rows: { label: string; moshy: string; pilot: string; highlightMoshy?: boolean }[] = [
  { label: "Entry price (approx, at time of writing)", moshy: "From around $249/mo on offer (regular around $349/mo)", pilot: "Around $349/mo range", highlightMoshy: true },
  { label: "Lock-in contract", moshy: "No lock-in advertised", pilot: "Subscription program, check current terms", highlightMoshy: true },
  { label: "Who it is built for", moshy: "Gender-neutral, anyone eligible", pilot: "Men-focused (Eucalyptus men's brand)" },
  { label: "Parent company", moshy: "Moshy (Australian telehealth)", pilot: "Eucalyptus (also runs Juniper)" },
  { label: "Scope", moshy: "Weight management focus", pilot: "Broader men's health plus weight" },
  { label: "Online process", moshy: "Online eligibility check, no in-person GP", pilot: "Online consult, no in-person GP" },
  { label: "Practitioner review", moshy: "Registered Australian practitioner", pilot: "Registered Australian practitioner" },
  { label: "GLP-1 access", moshy: "Where clinically appropriate", pilot: "Where clinically appropriate" },
  { label: "Home delivery", moshy: "Yes, if prescribed", pilot: "Yes, if prescribed" },
];

export default function MoshyVsPilotPage() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      <main className="text-[#10251b]">
        <div className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-12">

          {/* Breadcrumb */}
          <nav className="flex flex-wrap items-center gap-2 pt-8 text-sm text-[#3d4b44]">
            <Link href="/" className="hover:text-[#0a7c42] transition-colors">Refer Labs</Link>
            <span>/</span>
            <Link href="/weight-loss" className="hover:text-[#0a7c42] transition-colors">Weight loss</Link>
            <span>/</span>
            <span className="text-[#2b362f]">Moshy vs Pilot</span>
          </nav>

          {/* Hero */}
          <section className="pt-10 pb-8 sm:pt-12">
            <p className="nw-kicker mb-5">Comparison · Australia · Updated July 2026</p>
            <h1 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold leading-[1.08] tracking-tight text-[#10251b] mb-4 max-w-3xl">
              Moshy vs Pilot: weight loss telehealth compared for 2026
            </h1>
            <p className="text-[#3d4b44] text-sm sm:text-base leading-relaxed max-w-2xl mb-3">
              Moshy and Pilot are two Australian telehealth routes into weight management, but they are built differently.
              Moshy is gender-neutral, open to anyone eligible, and at the time of writing advertises a lower entry price
              with no lock-in. Pilot is Eucalyptus&apos;s men-focused service, wrapping weight support inside a broader
              men&apos;s health offering. Below we line them up on price, lock-in, who each suits, the online process,
              what is included, and how GLP-1 access is handled.
            </p>
            <p className="text-[#9aa39c] text-xs leading-relaxed max-w-2xl mb-7">
              Information only, not medical advice. Prices are approximate and change, so check current pricing on each
              provider. This page contains a disclosed affiliate link to Moshy.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                {...aff}
                data-cta="moshy-vs-pilot-hero"
                className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5"
                style={{ background: GREEN, boxShadow: `0 6px 24px ${GREEN}30` }}
              >
                Check eligibility on Moshy
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                {...ext}
                className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold transition-all hover:-translate-y-0.5"
                style={{ color: GREEN, border: `1px solid ${GREEN}40`, background: `${GREEN}08` }}
              >
                Visit Pilot
              </a>
            </div>
          </section>

          {/* Quick verdict */}
          <section className="pb-2">
            <div className="rounded-xl border px-6 py-5" style={{ borderColor: `${GREEN}40`, background: `${GREEN}0A` }}>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] mb-2" style={{ color: GREEN }}>
                Quick verdict
              </p>
              <p className="text-[#2b362f] text-sm sm:text-base leading-relaxed max-w-2xl">
                Moshy is the lower-cost, no-lock-in option, and because it is gender-neutral it is open to anyone eligible.
                Pilot suits someone who specifically wants the Eucalyptus men&apos;s health ecosystem, with weight
                management as one part of a wider service. Both run fully online and both facilitate GLP-1 access only
                where a registered Australian practitioner assesses it as clinically appropriate. Suitability is
                practitioner-decided and never guaranteed.
              </p>
            </div>
          </section>

          {/* Comparison table */}
          <section className="border-t border-[#e5e9e7] mt-8 py-8">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#10251b] mb-6">
              Moshy vs Pilot at a glance
            </h2>
            <div className="overflow-x-auto -mx-2 px-2">
              <table className="w-full min-w-[560px] text-sm">
                <thead>
                  <tr className="border-b border-[#e5e9e7]">
                    <th className="text-left pb-3 pr-4 text-[#9aa39c] font-semibold text-[11px] uppercase tracking-wider w-52"></th>
                    <th className="pb-3 px-3 text-left font-extrabold text-[#10251b] text-sm">Moshy</th>
                    <th className="pb-3 px-3 text-left font-extrabold text-[#10251b] text-sm">Pilot</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.label} className="border-b border-[#e5e9e7] hover:bg-[#f5f8f6] transition-colors align-top">
                      <td className="py-3 pr-4 text-[#3d4b44] text-xs font-medium leading-snug">{r.label}</td>
                      <td className="py-3 px-3 text-xs leading-snug font-semibold" style={{ color: r.highlightMoshy ? GREEN : "#3d4b44" }}>{r.moshy}</td>
                      <td className="py-3 px-3 text-[#3d4b44] text-xs leading-snug">{r.pilot}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[#9aa39c] text-[10px] mt-3 leading-relaxed">
              Prices and terms are approximate and based on publicly available information at the time of writing. They
              change often, so check current pricing on each provider. GLP-1 access is subject to individual clinical
              assessment. This comparison is not medical advice.
            </p>
          </section>

          {/* Prose: price */}
          <section className="border-t border-[#e5e9e7] py-10">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#10251b] mb-4">
              Price and lock-in: where Moshy is the leaner option
            </h2>
            <div className="space-y-4 text-[15px] leading-relaxed text-[#3d4b44] max-w-2xl">
              <p>
                On the numbers, Moshy is the lower entry point. At the time of writing it advertises a subscription from
                around $249 per month on offer, against a regular price closer to $349 per month, and it markets no
                lock-in contract. Pilot&apos;s weight program sits in a broadly similar subscription range to its
                Eucalyptus sibling Juniper, around $349 per month. That gap is the clearest practical difference between
                the two on cost.
              </p>
              <p>
                Two caveats matter. First, prices move constantly in this category, so treat every figure here as
                approximate and confirm the current number on each provider before you commit. Second, medication, if it
                is prescribed at all, may be billed within or on top of the subscription depending on the plan, so the
                headline monthly figure is not always the full cost. The honest comparison is the pricing model, not a
                single advertised number on a single day.
              </p>
            </div>
          </section>

          {/* Prose: who each is for */}
          <section className="border-t border-[#e5e9e7] py-10">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#10251b] mb-4">
              Who each one is built for
            </h2>
            <div className="space-y-4 text-[15px] leading-relaxed text-[#3d4b44] max-w-2xl">
              <p>
                Pilot is the men-focused brand from Eucalyptus, the same parent company behind the women-focused Juniper.
                Eucalyptus was acquired by Hims and Hers Health in 2026. Pilot covers a spread of men&apos;s health areas
                alongside weight management, so its appeal is the wider ecosystem: if you want weight support to sit next
                to other men&apos;s health services in one place, that is the pitch.
              </p>
              <p>
                Moshy takes the opposite tack on audience. It is gender-neutral and open to anyone eligible, and it keeps
                the experience focused on the weight-management pathway rather than a broader health suite. If you want a
                lean, single-purpose program at a lower entry price with no lock-in, Moshy is the more direct fit. If you
                are a man who values the surrounding Eucalyptus services, Pilot is the one to look at.
              </p>
            </div>
          </section>

          {/* Prose: process + GLP-1 */}
          <section className="border-t border-[#e5e9e7] py-10">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#10251b] mb-4">
              The online process, what&apos;s included and GLP-1 access
            </h2>
            <div className="space-y-4 text-[15px] leading-relaxed text-[#3d4b44] max-w-2xl">
              <p>
                Both services run fully online and the shape of the process is similar. You complete a health
                questionnaire or consultation, a registered Australian practitioner reviews it, and if you are considered
                suitable a plan is discussed and anything prescribed is delivered to you. No in-person GP visit is
                required to start with either. Some applicants are declined at the review stage, and that screening step
                is the single most useful thing to look for in any provider.
              </p>
              <p>
                On medication, both are associated with GLP-1 weight-management pathways. GLP-1 medications are
                prescription-only in Australia. Access depends entirely on an individual clinical assessment by a
                registered practitioner, suitability is decided case by case, and nothing is guaranteed before that
                assessment. Not everyone who completes an eligibility check will be prescribed medication. Neither this
                page nor either provider can tell you in advance whether a medicine is right for you.
              </p>
            </div>
            <div className="mt-6 flex flex-col items-start gap-4 rounded-2xl border px-6 py-5 sm:flex-row sm:items-center sm:justify-between" style={{ borderColor: `${GREEN}25`, background: `${GREEN}0A` }}>
              <p className="max-w-lg text-sm leading-relaxed text-[#10251b]">
                Leaning toward the lower-cost, no-lock-in option? Moshy&apos;s eligibility check is the usual starting
                point. About ten minutes, no commitment, and the referral applies automatically through our link.
              </p>
              <a
                {...aff}
                data-cta="moshy-vs-pilot-prefaq"
                className="inline-flex shrink-0 items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5"
                style={{ background: GREEN, boxShadow: `0 6px 24px ${GREEN}30` }}
              >
                Check eligibility on Moshy
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </section>

          {/* FAQ */}
          <section className="border-t border-[#e5e9e7] py-10">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#10251b] mb-8">
              Moshy vs Pilot: frequently asked questions
            </h2>
            <div className="space-y-6">
              {faqs.map((f) => (
                <div key={f.q} className="border-b border-[#e5e9e7] pb-6">
                  <h3 className="text-sm font-bold text-[#10251b] mb-2 flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: GREEN }} />
                    {f.q}
                  </h3>
                  <p className="text-sm text-[#3d4b44] leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Related + disclosure */}
          <section className="border-t border-[#e5e9e7] py-8 pb-16">
            <h2 className="text-sm font-bold text-[#10251b] mb-3">Keep comparing</h2>
            <div className="flex flex-wrap gap-3 mb-6">
              <Link href="/moshy-review" className="nw-link text-sm">Moshy review</Link>
              <span className="text-[#9aa39c]">·</span>
              <Link href="/moshy-vs-juniper" className="nw-link text-sm">Moshy vs Juniper</Link>
              <span className="text-[#9aa39c]">·</span>
              <Link href="/cheapest-weight-loss-telehealth-australia" className="nw-link text-sm">Cheapest weight loss telehealth</Link>
              <span className="text-[#9aa39c]">·</span>
              <Link href="/best-weight-loss-telehealth-australia" className="nw-link text-sm">Best weight loss telehealth</Link>
              <span className="text-[#9aa39c]">·</span>
              <Link href="/weight-loss" className="nw-link text-sm">Weight loss hub</Link>
            </div>
            <p className="text-[#9aa39c] text-xs leading-relaxed max-w-2xl">
              This page is operated by Refer Labs and contains a disclosed affiliate referral link to Moshy. Pilot is
              linked without an affiliate arrangement. We compare on price, model and what is included, and we never sell
              rankings. All content is for informational purposes only and does not constitute medical advice.
              Prescription medicines in Australia, including GLP-1 medications, are available only after an individual
              assessment by a registered Australian practitioner, and suitability is practitioner-decided and never
              guaranteed. Consult a qualified health professional before starting any weight management program. Our
              full standards are at{" "}
              <Link href="/how-we-research" className="underline underline-offset-2">how we research</Link>.
            </p>
          </section>

        </div>
      </main>
      <StickyCta href={MOSHY_URL} product="Moshy weight-loss telehealth" label="Check eligibility" />
    </ConsumerShell>
  );
}
