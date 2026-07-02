import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import { MOSHY_URL } from "@/lib/affiliate-links";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata = generateSEOMetadata(seoConfig.moshyReview);

const CYAN = "#0AA7B5";
const CYAN_LT = "#22C0CD";
const aff = { href: MOSHY_URL, target: "_blank" as const, rel: "nofollow sponsored" as const };

const faqs = [
  {
    q: "Is Moshy a real Australian company?",
    a: "Yes. Moshy is an Australian telehealth provider operating under Australian health service regulations, and eligibility submissions are reviewed by registered Australian practitioners. It is the men's brand in the same family as Mosh.",
  },
  {
    q: "How long does the Moshy sign-up take?",
    a: "The online eligibility questionnaire usually takes around five to ten minutes. The practitioner review that follows is not instant, because a real person assesses each submission individually.",
  },
  {
    q: "Does everyone who applies get accepted?",
    a: "No. Some applicants are declined or pointed toward other care after the practitioner review. That screening step is a feature of a clinical service rather than a flaw.",
  },
  {
    q: "Do I need a referral from my GP to use Moshy?",
    a: "No. The starting point is Moshy's own online eligibility check, which does not require a GP referral. Whether any treatment follows is decided by the reviewing practitioner based on your individual circumstances.",
  },
  {
    q: "Is this page affiliated with Moshy?",
    a: "This page is published by Refer Labs and contains an affiliate referral link, which is disclosed on the page. The referral applies automatically when you click through. Nothing here is medical advice.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/guides` },
    { "@type": "ListItem", position: 3, name: "Moshy Review", item: `${SITE_URL}/moshy-review` },
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
  name: seoConfig.moshyReview.title,
  description: seoConfig.moshyReview.description,
  url: seoConfig.moshyReview.url,
  inLanguage: "en-AU",
  isPartOf: { "@type": "WebSite", name: "Refer Labs", url: SITE_URL },
};

function Cta({ label, loc }: { label: string; loc: string }) {
  return (
    <a
      {...aff}
      data-cta={loc}
      className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 shadow-lg"
      style={{ background: CYAN, boxShadow: `0 8px 32px ${CYAN}30` }}
    >
      {label}
      <ArrowRight className="h-4 w-4" />
    </a>
  );
}

export default function MoshyReviewPage() {
  return (
    <div className="relative min-h-screen bg-[#060f15] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,rgba(10,167,181,0.10),transparent_55%)]" />
      </div>

      <main id="main-content" className="relative mx-auto max-w-3xl px-5 sm:px-8 lg:px-12 pb-24 pt-12 sm:pt-16">
        <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-white/40">
          <Link href="/" className="hover:text-white/70 transition-colors">Refer Labs</Link>
          <span>/</span>
          <Link href="/guides" className="hover:text-white/70 transition-colors">Guides</Link>
          <span>/</span>
          <span className="text-white/60">Moshy Review</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl lg:text-[2.7rem] font-black leading-[1.08] tracking-tight mb-5">
          Moshy review: <span style={{ color: CYAN_LT }}>what the service is actually like</span>
        </h1>
        <p className="text-white/55 text-base sm:text-lg leading-relaxed mb-6 max-w-2xl">
          Most write-ups of Moshy either sell it or ignore it. This one just walks through the service: what happens
          when you apply, what the subscription involves, and where it does and does not fit.
        </p>

        <p className="mb-10 rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3 text-xs leading-relaxed text-white/45">
          <span className="font-semibold text-white/70">Information only.</span> This page describes a telehealth service.
          It is not medical advice, does not recommend any treatment, and does not imply suitability for any individual.
          This page contains an affiliate referral link.
        </p>

        <section className="space-y-4 mb-10">
          <h2 className="text-xl font-black">The short version</h2>
          <p className="text-white/55 text-sm sm:text-base leading-relaxed">
            Moshy is an Australian telehealth service for men, and its weight-management program is the part most people
            come looking for. You complete a questionnaire online, a registered practitioner looks at your answers, and
            if they consider it appropriate you continue on a subscription with anything prescribed delivered to your
            door. No waiting room, no referral letter, no phone queue.
          </p>
          <p className="text-white/55 text-sm sm:text-base leading-relaxed">
            The whole pitch rests on one idea: a lot of men put this conversation off for years because booking a GP
            appointment about weight feels like a big step. Moshy shrinks that first step to about ten minutes on a
            phone.
          </p>
          <div className="pt-1">
            <Cta label="Check your eligibility on Moshy" loc="short-version" />
          </div>
        </section>

        <section className="space-y-4 mb-10">
          <h2 className="text-xl font-black">What happens when you apply</h2>
          <p className="text-white/55 text-sm sm:text-base leading-relaxed">
            The eligibility check is a structured health questionnaire. It covers the basics you would expect a doctor
            to ask about: your history, your goals, and your current situation. It is not a formality. Real people
            review the submissions, and some applicants are declined or redirected to other care.
          </p>
          <p className="text-white/55 text-sm sm:text-base leading-relaxed">
            That last point is worth sitting with, because it is the strongest trust signal the service has. A platform
            that waves everyone through is a checkout. A platform that turns people away is behaving like a clinic.
          </p>
          <p className="text-white/55 text-sm sm:text-base leading-relaxed">
            If the practitioner approves you, the treatment options, the plan, and the pricing are laid out inside the
            platform before you commit to anything. You are never charged for a subscription you have not seen.
          </p>
        </section>

        <section className="space-y-4 mb-10">
          <h2 className="text-xl font-black">Living with the subscription</h2>
          <p className="text-white/55 text-sm sm:text-base leading-relaxed">
            Day to day, Moshy runs like any well-built subscription service. Deliveries arrive on schedule, check-ins
            happen through the platform, and questions go to the clinical team rather than a generic support inbox.
            Because everything is online, the quality of your experience depends partly on how comfortable you are
            managing health admin through an app and email.
          </p>
          <p className="text-white/55 text-sm sm:text-base leading-relaxed">
            It is a men-only service. Women looking for the equivalent are usually pointed to Juniper, which runs a
            similar model with a coaching layer added. We compare the wider field in our{" "}
            <Link href="/online-weight-loss-programs-australia" className="underline decoration-white/20 underline-offset-2 hover:text-white" style={{ color: CYAN }}>
              guide to online weight loss programs in Australia
            </Link>.
          </p>
        </section>

        <section className="space-y-4 mb-12">
          <h2 className="text-xl font-black">Who it suits, who it does not</h2>
          <p className="text-white/55 text-sm sm:text-base leading-relaxed">
            Moshy suits men who want a structured, supervised program and value the convenience of doing the whole
            thing from home. It is a poor fit if your situation is complicated or urgent, because an online
            questionnaire is the wrong front door for that. Anything unusual belongs with a doctor in person, and
            Moshy itself will screen those cases out.
          </p>
          <p className="text-white/55 text-sm sm:text-base leading-relaxed">
            If you are weighing it against simply seeing your own GP, both routes are legitimate. We wrote up the
            practical differences in{" "}
            <Link href="/moshy-vs-gp" className="underline decoration-white/20 underline-offset-2 hover:text-white" style={{ color: CYAN }}>
              Moshy vs your GP
            </Link>.
          </p>
          <div className="rounded-xl border px-6 py-5 mt-6" style={{ borderColor: `${CYAN}40`, background: `${CYAN}0A` }}>
            <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-4">
              The eligibility check takes a few minutes and commits you to nothing. The referral applies automatically
              through the link, so there is no code to hunt for.
            </p>
            <Cta label="Start the Moshy eligibility check" loc="mid-cta" />
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-black mb-5">Common questions</h2>
          <div className="space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className="group rounded-xl border border-white/[0.08] bg-white/[0.02] px-5 py-4">
                <summary className="cursor-pointer list-none font-semibold text-white text-sm sm:text-base flex items-center justify-between gap-4">
                  {f.q}
                  <span className="text-white/30 group-open:rotate-45 transition-transform text-lg leading-none">+</span>
                </summary>
                <p className="text-white/55 text-sm leading-relaxed mt-3">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <div className="border-t border-white/[0.08] pt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <Link href="/moshy" style={{ color: CYAN }} className="hover:opacity-80">Moshy referral link &amp; offer →</Link>
          <Link href="/moshy-eligibility" style={{ color: CYAN }} className="hover:opacity-80">The eligibility check, explained →</Link>
          <Link href="/moshy-alternatives" style={{ color: CYAN }} className="hover:opacity-80">Moshy alternatives →</Link>
        </div>

        <p className="text-white/25 text-xs mt-8 leading-relaxed">
          This page is operated by Refer Labs and contains an affiliate referral link. We may earn a commission if you
          sign up through it, at no extra cost to you. Nothing on this page is medical advice. Prescription medicines in
          Australia are available only after assessment by a registered practitioner.
        </p>
        <p className="text-white/20 text-xs mt-4">© 2026 Refer Labs · Australia · <Link href="/guides" className="hover:text-white/50">All guides</Link></p>
      </main>
    </div>
  );
}
