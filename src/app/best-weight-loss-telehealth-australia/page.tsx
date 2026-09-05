import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL, comparisonArticleSchema } from "@/lib/seo";
import EarningsBalanceNote from "@/components/consumer/EarningsBalanceNote";
import EditorialMeta from "@/components/consumer/EditorialMeta";
import { MOSHY_URL } from "@/lib/affiliate-links";
import { CheckCircle2, XCircle, ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import StickyCta from "@/components/consumer/StickyCta";
import NewsletterSignup from "@/components/consumer/NewsletterSignup";
import FeatureMatrix from "@/components/consumer/FeatureMatrix";
import CodeAnswer from "@/components/offers/CodeAnswer";
import OfferSchema from "@/components/offers/OfferSchema";

import AffiliateDisclosure from "@/components/consumer/AffiliateDisclosure";
export const metadata = generateSEOMetadata(seoConfig.bestWeightLossTelehealth);

// No affiliate arrangement with Pilot, so it is a plain nofollow link. Juniper is an affiliate partner (sponsored) from July 2026.
const PILOT_URL = "https://pilot.com.au/";

const aff = (url: string, loc = "best-wl-telehealth") => ({
  href: url,
  target: "_blank" as const,
  rel: "nofollow sponsored" as const,
  "data-cta": loc,
});

const ext = (url: string) => ({
  href: url,
  target: "_blank" as const,
  rel: "noopener noreferrer" as const,
});

// ─── JSON-LD ──────────────────────────────────────────────────────────────────

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Best Weight Loss Telehealth Australia 2026", item: `${SITE_URL}/best-weight-loss-telehealth-australia` },
  ],
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Best Weight Loss Telehealth Platforms Australia 2026",
  description: "In-depth comparison of Australian weight loss telehealth platforms: Moshy, Juniper and Pilot. Treatment access, eligibility process and who each platform suits.",
  numberOfItems: 3,
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Moshy", description: "Australian clinically-led telehealth weight management platform, open to anyone eligible. Online eligibility questionnaire, practitioner review, and treatment access where clinically appropriate. Subscription with home delivery.", url: `${SITE_URL}/moshy` },
    { "@type": "ListItem", position: 2, name: "Juniper", description: "Australian weight management program for women. Combines a medical program with health coaching and ongoing practitioner support. Premium subscription model.", url: `${SITE_URL}/juniper` },
    { "@type": "ListItem", position: 3, name: "Pilot", description: "Men-focused telehealth from Eucalyptus, covering weight management alongside broader men's health.", url: PILOT_URL },
  ],
};

/**
 * The page's FAQ, rendered below AND used to build the FAQPage JSON-LD.
 *
 * One array, two consumers, deliberately. Until 28 Aug 2026 the schema held a
 * separate, differently-worded set of seven while the page rendered six: five of
 * the schema questions appeared nowhere on the page. Google's FAQPage guidance
 * requires the marked-up content to be visible on the source page, so that was a
 * structured-data policy breach on the site's highest-impression page. Deriving
 * the schema from the rendered array makes divergence impossible rather than
 * merely fixed. Do not reintroduce a second hand-written list.
 */
const FAQS: { q: string; a: string }[] = [
                {
                  q: "What is the best weight loss telehealth platform in Australia?",
                  a: "Moshy (a lean clinical pathway, open to anyone eligible) and Juniper (a coaching-led program marketed to women) are the most widely used weight-loss telehealth platforms in Australia. The best platform depends on your health profile and whether you want a medication-focused clinical pathway or a coaching-heavy program. Suitability is assessed by each platform's practitioners individually.",
                },
                {
                  q: "How much does telehealth weight loss cost per month?",
                  a: "Most providers confirm pricing after an online consultation rather than publishing a fixed figure. Expect a monthly subscription that bundles treatment, consultations and delivery, shown before you commit. Final cost depends on the treatment prescribed.",
                },
                {
                  q: "Are online weight loss clinics in Australia legit?",
                  a: "The established platforms operate as regulated telehealth services: questionnaires reviewed by Australian-registered practitioners, and any medicine prescribed only after individual clinical assessment, because they are prescription-only. Check for a practitioner consultation before any prescription, an Australian business entity, and published contact details. A service offering prescription medication without practitioner review is the red flag.",
                },
                {
                  q: "Is Moshy or Juniper better?",
                  a: "Moshy and Juniper take different approaches. Moshy runs a lean clinical pathway, open to anyone eligible. Juniper adds health coaching to its programme and markets primarily to Australian women. If you want a focused clinical pathway, Moshy is the relevant option. If you want coaching alongside clinical care, Juniper is worth a look. Both require individual clinical eligibility assessment.",
                },
                {
                  q: "How do these platforms handle treatment access?",
                  a: "Both Moshy and Juniper operate practitioner-supervised weight-management pathways that can involve treatment that a registered practitioner assesses as appropriate. Weight-management medicines are prescription-only in Australia and are prescribed only after an individual assessment by a registered practitioner, who decides suitability. Whether any specific medicine is appropriate is a clinical decision, not something a platform promises in advance, and not everyone who applies is prescribed medication. This page does not constitute medical advice.",
                },
                {
                  q: "Are these platforms available across all of Australia?",
                  a: "Moshy and Juniper are both Australian platforms operating nationally. Availability may vary by state for certain services. Check each platform's website for current service coverage.",
                },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

// Describes Refer Labs' comparison service, NOT any telehealth provider's service.
// Refer Labs is not a medical or telehealth provider.
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Australian weight loss telehealth comparison",
  description:
    "Refer Labs compares Australian weight loss telehealth services using public pricing, eligibility, treatment pathway information, support model, disclosures and suitability considerations.",
  provider: { "@type": "Organization", name: "Refer Labs", url: SITE_URL },
  areaServed: { "@type": "Country", name: "Australia" },
  serviceType: "Comparison publishing",
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.bestWeightLossTelehealth.title,
  description: seoConfig.bestWeightLossTelehealth.description,
  url: seoConfig.bestWeightLossTelehealth.url,
  inLanguage: "en-AU",
  datePublished: "2026-03-16",
  dateModified: "2026-08-03",
  about: [
    { "@type": "Thing", name: "weight loss telehealth Australia 2026" },
    { "@type": "Thing", name: "Moshy vs Juniper Australia" },
    { "@type": "Thing", name: "practitioner-assessed treatment telehealth Australia" },
    { "@type": "Thing", name: "online weight management Australia" },
    { "@type": "Thing", name: "prescription weight-loss medication Australia" },
    { "@type": "Thing", name: "Moshy weight loss review" },
    { "@type": "Thing", name: "Juniper weight loss Australia" },
  ],
  isPartOf: { "@id": `${SITE_URL}/#website` },
};

// ─── Design tokens ────────────────────────────────────────────────────────────

const CYAN    = "#0a7c42";
const CYAN_LT = "#0a7c42";

// ─── Sub-components ───────────────────────────────────────────────────────────

function Pro({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-2 text-sm text-[#2b362f] leading-snug">
      <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" style={{ color: CYAN_LT }} />
      {text}
    </li>
  );
}

function Con({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-2 text-sm text-[#9aa39c] leading-snug">
      <XCircle className="h-3.5 w-3.5 flex-shrink-0 mt-0.5 text-[#9aa39c]" />
      {text}
    </li>
  );
}


// ─── Platform card ────────────────────────────────────────────────────────────

interface PlatformCardProps {
  id: string;
  index: string;
  name: string;
  tagline: string;
  /* Optional: a provider we hold no arrangement with, and whose process we
     cannot verify, shows no "Current access" box rather than a guess. */
  deal?: string;
  dealNote?: string;
  pros: string[];
  cons: string[];
  affUrl?: string;
  extUrl?: string;
  ctaLabel: string;
  internalUrl?: string;
  reviewLabel?: string;
  isAffiliate: boolean;
}

function PlatformCard({
  id, index, name, tagline, deal, dealNote,
  pros, cons, affUrl, extUrl, ctaLabel, internalUrl, reviewLabel, isAffiliate,
}: PlatformCardProps) {
  const ctaHref = isAffiliate ? affUrl! : extUrl!;
  const ctaLinkProps = isAffiliate ? aff(ctaHref) : ext(ctaHref);

  return (
    <section
      id={id}
      className="border-t border-[#e5e9e7] py-10 sm:py-12 scroll-mt-24"
    >
      <div className="grid lg:grid-cols-[1fr_260px] gap-8 lg:gap-12">

        {/* Left, identity + content */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div
              className="h-9 w-9 rounded-lg flex items-center justify-center text-[11px] font-black text-[#2b362f] flex-shrink-0"
              style={{ background: `${CYAN}1A`, border: `1px solid ${CYAN}30` }}
            >
              {index}
            </div>
            <h2 className="text-xl font-black text-[#10251b] leading-none">{name}</h2>
          </div>

          <p className="text-[#3d4b44] text-sm sm:text-base leading-relaxed mb-5 max-w-lg">
            {tagline}
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#9aa39c] mb-2.5">Strengths</p>
              <ul className="space-y-2">
                {pros.map((p) => <Pro key={p} text={p} />)}
              </ul>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#9aa39c] mb-2.5">Limitations</p>
              <ul className="space-y-2">
                {cons.map((c) => <Con key={c} text={c} />)}
              </ul>
            </div>
          </div>
        </div>

        {/* Right, deal + CTA */}
        <div className="flex flex-col gap-4">
          {deal && (
            <div
              className="rounded-xl p-5"
              style={{ background: `${CYAN}0D`, border: `1px solid ${CYAN}30` }}
            >
              <p className="text-[10px] font-black uppercase tracking-widest mb-1.5" style={{ color: CYAN_LT }}>
                Current access
              </p>
              <p className="text-[#10251b] font-black text-base leading-snug mb-1">{deal}</p>
              {dealNote && <p className="text-[#3d4b44] text-xs leading-snug">{dealNote}</p>}
            </div>
          )}

          <a
            {...ctaLinkProps}
            className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
            style={{ background: CYAN, boxShadow: `0 6px 24px ${CYAN}30` }}
          >
            {ctaLabel}
            <ArrowRight className="h-4 w-4" />
          </a>

          {internalUrl && reviewLabel && (
            <Link
              href={internalUrl}
              className="inline-flex items-center justify-center gap-1.5 text-xs transition-colors hover:opacity-80"
              style={{ color: `${CYAN_LT}60` }}
            >
              {reviewLabel} <ExternalLink className="h-3 w-3" />
            </Link>
          )}

          {/* Only the card we actually earn from. This page ranks Juniper
              alongside Moshy while carrying a link for Moshy alone, so the
              asymmetry is stated where the link is rather than as a banner
              above the article. */}
          {isAffiliate && <EarningsBalanceNote earnFrom={name} noEarnFrom={["Juniper", "Pilot"]} /* PILOT-NON-PARTNER */ className="mt-1" />}

          {/* PILOT-NON-PARTNER. Says where the button actually goes. We hold no
              affiliate link for Pilot, so this is their home page rather than a
              tracked or deep link, and a reader who expects to land on a
              weight-management sign-up should know that before clicking. */}
          {!isAffiliate && !deal && (
            <p className="text-xs leading-relaxed text-[#6e7b74]">
              We hold no affiliate arrangement with {name}, so this link goes to their home page
              rather than a tracked or dedicated sign-up page, and we earn nothing if you use it.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── Page data ────────────────────────────────────────────────────────────────

const platforms: PlatformCardProps[] = [
  {
    id: "moshy",
    index: "01",
    name: "Moshy",
    tagline: "Australian clinically-led telehealth weight management, open to anyone eligible. Moshy's online eligibility questionnaire is reviewed by Australian-registered practitioners. Any treatment is decided by the practitioner and only where clinically appropriate. Subscription with home delivery.",
    deal: "Online eligibility, referral link",
    dealNote: "The discount code is REFERRAL120. Our referral link takes you to the Moshy eligibility page with it already applied, so there is nothing to type.",
    pros: [
      "Clinically-led pathway, open to anyone eligible",
      "Practitioner-assessed treatment where appropriate",
      "Online-only process, no in-person GP visit required",
      "Subscription home delivery",
    ],
    cons: [
      "Lean clinical focus, no built-in coaching program",
      "Not all applicants are eligible for medication",
    ],
    affUrl: MOSHY_URL,
    isAffiliate: true,
    ctaLabel: "Check Eligibility with Moshy",
    internalUrl: "/moshy",
    reviewLabel: "Full Moshy review & current offer",
  },
  {
    id: "juniper",
    index: "02",
    name: "Juniper",
    tagline: "Australian weight management programme for women. Juniper combines a practitioner-led program with structured health coaching and support. The programme takes a more comprehensive approach than a clinical pathway alone.",
    deal: "Online eligibility check",
    dealNote: "Juniper uses an online eligibility and consultation process. Practitioners review each submission individually before recommending a programme.",
    pros: [
      "Purpose-built for Australian women",
      "Practitioner-assessed treatment where appropriate",
      "Health coaching included in programme",
      "Online process, no in-person GP visit required",
    ],
    cons: [
      "Women only, not available for men",
      "More premium pricing than some alternatives",
    ],
    extUrl: "/juniper",
    isAffiliate: false,
    ctaLabel: "Read our Juniper review",
  },
  {
    id: "pilot",
    index: "03",
    name: "Pilot",
    /* No deal, dealNote, or process description. Refer Labs holds no arrangement
       with Pilot and has not verified their sign-up flow, so the page described a
       quiz-then-phone-consult sequence it could not stand behind. Removed 3 Sep
       2026 as misleading. Do not restore it without reading Pilot's own page and
       dating the observation. */
    tagline: "Men-focused telehealth from Eucalyptus, covering weight management alongside broader men's health. Weight management sits inside a wider men's health service rather than standing alone.",
    pros: [
      "Practitioner-assessed treatment where appropriate",
      "Covers other men's health areas in the same account",
      "Discreet packaging and free shipping, no lock-in contracts",
    ],
    cons: [
      "Men only, not available for women",
      "Weight management is one service among several, not the sole focus",
    ],
    extUrl: PILOT_URL,
    isAffiliate: false,
    ctaLabel: "Visit Pilot",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

const articleSchema = comparisonArticleSchema({
  headline: "Best weight loss telehealth services in Australia: Refer Labs' comparison",
  description: "Refer Labs compares Australian weight-loss telehealth platforms on published pricing, eligibility process and program model.",
  url: "https://referlabs.com.au/best-weight-loss-telehealth-australia",
  datePublished: "2026-07-05",
  dateModified: "2026-08-08",
});

export default function BestWeightLossTelehealthPage() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      <main className="text-[#10251b]">
        <div className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-12">

          <nav className="flex flex-wrap items-center gap-2 pt-8 text-sm text-[#3d4b44]">
            <Link href="/" className="hover:text-[#2b362f] transition-colors">Refer Labs</Link>
            <span>/</span>
            <Link href="/guides" className="hover:text-[#2b362f] transition-colors">Guides</Link>
            <span>/</span>
            <span className="text-[#2b362f]">Best Weight Loss Telehealth</span>
          </nav>

          {/* ── Hero ─────────────────────────────────────────────────────────── */}
          <section className="pt-10 pb-8 sm:pt-12">
            <p className="text-[#9aa39c] text-xs mb-6">
              Australia only &middot; Not medical advice
            </p>

            <h1 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-black leading-[1.08] tracking-tight text-[#10251b] mb-4 max-w-3xl">
              Best Weight Loss Telehealth Australia 2026
            </h1>

            {/* Above the first affiliate link, not below it. */}
            <AffiliateDisclosure compact className="mt-4 max-w-2xl" />
            <p className="text-[#3d4b44] text-sm sm:text-base leading-relaxed max-w-2xl mb-3">
              Moshy and Juniper are the two most-used weight-management platforms in Australia and they are built
              differently. Moshy runs a lean clinical pathway open to anyone eligible, and Refer Labs holds REFERRAL120,
              $120 off a new customer&apos;s first order. Juniper wraps clinical care in a coaching program, markets
              primarily to women, and offers a free first consultation instead of a code.
            </p>
            <p className="text-[#3d4b44] text-sm sm:text-base leading-relaxed max-w-2xl mb-5">
              Below: what each platform actually does, who it suits, and how to access each eligibility flow. This page does not constitute medical advice. Suitability is assessed individually by each platform&apos;s clinical team.
            </p>

            <CodeAnswer code="REFERRAL120" className="mt-2 mb-7">
              Of the providers compared here, only Moshy carries a Refer Labs code: REFERRAL120, worth $120 off a new customer&apos;s first order, one use per customer.
            </CodeAnswer>
            <OfferSchema code="REFERRAL120" />


            {/* A VerifiedStamp and a one-row OffersTable stood here until 2 Sep 2026,
                restating the $120/REFERRAL120 fact the CodeAnswer above had already
                given, three times in one screenful. The table was worse than
                redundant: filtered to Moshy on a page comparing three providers, it
                rendered a "Provider / Best offer / Saving" header with a single row,
                and dragged in four lines of footnotes about "Not recorded" and "No
                code needed" that describe states no row on it could have. One
                statement of the code, with its date, is the whole of what is needed. */}

            {/* Jump nav */}
            <nav aria-label="Jump to section" className="flex flex-wrap gap-2">
              {[
                { href: "#moshy",       label: "Moshy" },
                { href: "#juniper",     label: "Juniper" },
              ].map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  className="inline-flex items-center gap-1.5 rounded-sm px-4 py-2 text-xs font-bold transition-all hover:opacity-80"
                  style={{ color: CYAN_LT, border: `1px solid ${CYAN}40`, background: `${CYAN}08` }}
                >
                  {label}
                </a>
              ))}
            </nav>
          </section>

          {/* ── Quick Verdict (answer-first, GEO): the buyer's question as an H2 so engines match it ── */}
          <section className="pb-2">
            <h2 className="text-xl sm:text-2xl font-black text-[#10251b] mb-4">
              What is the best weight-loss telehealth in Australia?
            </h2>
            <div className="rounded-xl border px-6 py-5" style={{ borderColor: `${CYAN}40`, background: `${CYAN}0A` }}>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] mb-2" style={{ color: CYAN_LT }}>
                Quick Verdict
              </p>
              <p className="text-[#2b362f] text-sm sm:text-base leading-relaxed max-w-2xl">
                Refer Labs&apos; August 2026 comparison of Australian weight-loss telehealth found Moshy (a lean clinical pathway, open to anyone eligible) and Juniper (a coaching-led program marketed to women) the leading weight-management platforms. Eligibility and suitability are assessed individually by each platform&apos;s clinical team. This page does not constitute medical advice.
              </p>
            </div>
          </section>

          {/* ── Where to start / how to compare (answer-first for unbranded queries) ── */}
          <section id="how-to-compare" className="border-t border-[#e5e9e7] py-8">
            <h2 className="text-xl sm:text-2xl font-black text-[#10251b] mb-3">Where to start: how to compare weight-loss telehealth</h2>
            <p className="text-sm text-[#3d4b44] leading-relaxed max-w-2xl mb-4">
              If you are weighing up options, these factors matter more than the sign-up price. Check each one before you
              commit:
            </p>
            <ul className="space-y-2.5 text-sm text-[#3d4b44] max-w-2xl mb-5">
              <li><strong className="text-[#10251b]">Eligibility.</strong> Each provider runs an online questionnaire and a practitioner reviews whether treatment is appropriate for you. Approval is assessed individually and is not guaranteed.</li>
              <li><strong className="text-[#10251b]">Total monthly cost.</strong> Add the program or subscription fee <em>and</em> the medication, which is usually billed separately and can vary by dose. A low program fee can still mean a high total.</li>
              <li><strong className="text-[#10251b]">Practitioner review and support.</strong> Check whether you get an initial consult, ongoing check-ins, and how you reach a practitioner if something changes.</li>
              <li><strong className="text-[#10251b]">Medication pathway.</strong> Weight-management medicines are prescription-only and dispensed by a pharmacy. Availability depends on the practitioner&apos;s assessment and current supply.</li>
              <li><strong className="text-[#10251b]">Cancellation terms.</strong> Confirm whether it is month-to-month and how to pause or cancel before you subscribe.</li>
            </ul>
            <p className="text-sm text-[#3d4b44] leading-relaxed max-w-2xl">
              <strong className="text-[#10251b]">Looking for a cheaper option?</strong> The lowest total cost is not always a
              paid telehealth program. A GP (some appointments are bulk-billed) can assess eligibility and prescribe, which
              may work out cheaper for some people. Compare the all-in monthly cost, not just the joining price. Speak with a
              qualified health professional before starting or changing any treatment.
            </p>
          </section>

          {/* How pricing works (no specific figures; confirmed in the consult) */}
          <section id="cost" className="border-t border-[#e5e9e7] py-8">
            <h2 className="text-xl sm:text-2xl font-black text-[#10251b] mb-3">What telehealth weight loss actually costs</h2>
            <p className="text-sm text-[#3d4b44] leading-relaxed max-w-2xl mb-4">
              Here is what makes this market hard to compare: <strong className="text-[#10251b]">most Australian providers confirm pricing after an online consultation</strong> rather than publishing a fixed figure. Expect a monthly subscription that bundles treatment, consultations and delivery, shown before you commit, with the final cost depending on the treatment prescribed. New Moshy customers get $120 off their first order through our link.
            </p>
            <p className="text-xs text-[#6b7a72]">
              Sources: getmoshy.com.au/weight-loss (price as published) and Juniper (no public pricing at time of check),
              21 July 2026. Pilot process, practitioner and breadth claims read off pilot.com.au on 28 August 2026.
            </p>
          </section>

          {/* ── Quick comparison table ─────────────────────────────────────────── */}
          <section className="border-t border-[#e5e9e7] py-8">
            <div className="overflow-x-auto -mx-2 px-2">
              <table className="w-full min-w-[540px] text-sm">
                <thead>
                  <tr className="border-b border-[#e5e9e7]">
                    <th className="text-left pb-3 pr-4 text-[#9aa39c] font-semibold text-[11px] uppercase tracking-wider w-36">Platform</th>
                    <th className="pb-3 px-3 text-left text-[#9aa39c] font-semibold text-[11px] uppercase tracking-wider">Who it&apos;s for</th>
                    <th className="pb-3 px-3 text-left text-[#9aa39c] font-semibold text-[11px] uppercase tracking-wider">Approach</th>
                    <th className="pb-3 px-3 text-left text-[#9aa39c] font-semibold text-[11px] uppercase tracking-wider">Treatment access</th>
                    <th className="pb-3 pl-3 text-right text-[#9aa39c] font-semibold text-[11px] uppercase tracking-wider"></th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: "Moshy",        audience: "Anyone eligible (Australia)", approach: "Telehealth + medication",    treatment: "Yes (subject to eligibility)", href: "#moshy",       url: MOSHY_URL,    cta: "Check eligibility",  isAff: true },
                    { name: "Juniper",      audience: "Women (Australia)",        approach: "Coaching + medical program", treatment: "Yes (subject to eligibility)", href: "#juniper",     url: "/juniper",  cta: "Juniper review",     isAff: false },
                  ].map((row) => (
                    <tr key={row.name} className="border-b border-[#e5e9e7] hover:bg-[#f5f8f6] transition-colors">
                      <td className="py-3 pr-4">
                        <a href={row.href} className="text-[#10251b] font-bold text-sm hover:opacity-80 transition-opacity">{row.name}</a>
                      </td>
                      <td className="py-3 px-3 text-[#3d4b44] text-xs">{row.audience}</td>
                      <td className="py-3 px-3 text-[#3d4b44] text-xs">{row.approach}</td>
                      <td className="py-3 px-3 text-xs font-semibold" style={{ color: CYAN_LT }}>{row.treatment}</td>
                      <td className="py-3 pl-3 text-right">
                        <a
                          {...(row.isAff ? aff(row.url) : ext(row.url))}
                          className="inline-flex items-center gap-1 rounded-full bg-[#0a7c42] px-3 py-1.5 text-[11px] font-bold text-white whitespace-nowrap transition-all hover:-translate-y-0.5 hover:bg-[#086536]"
                        >
                          {row.cta} <ArrowRight className="h-3 w-3" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[#9aa39c] text-[10px] mt-3">
              Treatment access is subject to individual clinical assessment by each platform&apos;s practitioners. This comparison does not constitute medical advice.
            </p>
          </section>

          {/* ── Platform cards ────────────────────────────────────────────────── */}
          {platforms.map((p) => (
            <PlatformCard key={p.id} {...p} />
          ))}

          {/* ── Feature breakdown ─────────────────────────────────────────────── */}
          <section className="border-t border-[#e5e9e7] py-12 sm:py-14">
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-[#10251b] mb-6">
              Platform Comparison: Key Criteria
            </h2>

            <FeatureMatrix
              firstColLabel="Criteria"
              columns={[
                /* No highlight, and alphabetical. The Moshy column was tinted green
                   and placed first on a page that ranks three providers and carries a
                   link for one of them, which reads as the pick rather than as a
                   column heading. */
                { name: "Juniper" },
                { name: "Moshy" },
                { name: "Pilot" },
              ]}
              rows={[
                { label: "Available in Australia",     vals: [true , true , true]  },
                // Moshy is open to anyone eligible, so it serves both. This row
                // previously said Moshy had no women's programme, contradicting the
                // rest of the page.
                { label: "Men's programme",            vals: [false, true , true]  },
                { label: "Women's programme",          vals: [true , true , false] },
                { label: "Practitioner-assessed treatment",    vals: [true , true , true], note: "Subject to individual clinical eligibility" },
                { label: "Online eligibility process", vals: [true , true , true]  },
                { label: "No in-person GP required",   vals: [true , true , true]  },
                { label: "Health coaching included",   vals: [true , false, false] },
                { label: "Home delivery",              vals: [true , true , true]  },
                { label: "Lifestyle programme",        vals: [true , false, false] },
                { label: "Community discussion",       vals: [true , true , false] },
              ]}
              footnote="Feature availability is based on publicly available information at time of publication and may change. This page does not constitute medical advice."
            />
          </section>

          {/* ── Verdict ──────────────────────────────────────────────────────── */}
          <section className="border-t border-[#e5e9e7] py-12 sm:py-14">
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-[#10251b] mb-6">
              The Verdict
            </h2>
            <div className="space-y-4 max-w-2xl">
              {[
                { label: "Choose Moshy if:", body: "You want a clinically supervised weight management programme with access to practitioner-assessed treatment options, done online. Moshy is open to anyone eligible, and its online-only process means no in-person GP appointment is required to start. Eligibility is assessed individually. Use our referral link for the current Moshy offer." },
                // "designed for women exclusively" until 2 Sep 2026. Juniper's own FAQ answer
                // on /juniper deliberately says "designs and markets its program for women",
                // not "only": suitability is decided individually by a practitioner in the
                // consultation. "Exclusively" was a stronger claim than Juniper makes about
                // itself, it contradicted our own Juniper page, and it sat on the page with
                // the most impressions on the site, where it would have turned away readers
                // searching "is juniper for men" and "can men use juniper".
                { label: "Choose Juniper if:", body: "You want a weight management programme that combines practitioner-led care with structured health coaching and community support. Juniper's programme is more coaching-intensive than Moshy's, and Juniper designs and markets it for women; suitability is decided individually in your consultation." },
              ].map(({ label, body }) => (
                <div key={label} className="border-b border-[#e5e9e7] pb-4">
                  <p className="text-sm font-bold text-[#10251b] mb-1">{label}</p>
                  <p className="text-sm text-[#3d4b44] leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── FAQ ──────────────────────────────────────────────────────────── */}
          <section className="border-t border-[#e5e9e7] py-12 sm:py-14">
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-[#10251b] mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {FAQS.map(({ q, a }, i) => (
                <div key={i} className="border-b border-[#e5e9e7] pb-6">
                  <h3 className="text-sm font-bold text-[#10251b] mb-2">{q}</h3>
                  <p className="text-sm text-[#3d4b44] leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Deal alert ────────────────────────────────────────────────────── */}
          <section className="border-t border-[#e5e9e7] py-8">
            <NewsletterSignup
              variant="alert"
              source="deal-alert-best-weight-loss"
              interest="Weight-loss telehealth offers"
              heading="Get told when a weight-loss offer changes"
              sub="Moshy new customers can currently get $120 off. We'll email you if the offers on this page change, and nothing else."
            />
          </section>

          {/* ── Disclaimer + internal links ───────────────────────────────────── */}
          <section className="border-t border-[#e5e9e7] py-8 pb-16">
          {/* Moved below the fold, 28 Aug 2026. The last-updated line sat in the
              opening screenful alongside the code sentence, the verification
              stamp, the disclaimer and the CTAs, so a reader met roughly 120
              words of provenance before the second idea. The date is a trust
              signal, not an opening argument; it belongs next to the disclosure
              at the foot. The verification stamp stays above: that one is
              load-bearing for the attribution work. */}
            <EditorialMeta lastUpdated="2026-08-03" className="mb-4" />
            <AffiliateDisclosure partners={["Moshy", "Juniper"]} className="mb-3 max-w-2xl" />
            <p className="text-[#9aa39c] text-xs leading-relaxed max-w-2xl">
              Pilot is linked without an affiliate arrangement. All content on this page is for informational purposes only and does not constitute medical advice. Suitability for any weight management programme depends on individual health factors. Consult a qualified health professional before starting any treatment.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/moshy" className="text-xs hover:opacity-80 transition-opacity" style={{ color: `${CYAN_LT}50` }}>
                Moshy discount code &amp; full review
              </Link>
              <Link href="/moshhair" className="text-xs hover:opacity-80 transition-opacity" style={{ color: `${CYAN_LT}50` }}>
                Mosh hair loss review
              </Link>
            </div>
          </section>

        </div>
      </main>
      <StickyCta href={MOSHY_URL} product="Moshy · weight-loss telehealth" label="Check eligibility" />
    </ConsumerShell>
  );
}
