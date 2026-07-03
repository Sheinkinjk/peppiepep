import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import NewsletterSignup from "@/components/consumer/NewsletterSignup";
import PathwayQuiz from "@/components/consumer/PathwayQuiz";
import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import { MOSHY_URL } from "@/lib/affiliate-links";

export const metadata = generateSEOMetadata(seoConfig.weightLossHub);

const aff = { href: MOSHY_URL, target: "_blank" as const, rel: "nofollow sponsored" as const };

const guides = [
  { href: "/moshy-review", title: "Moshy review", desc: "How the service actually runs, from application to subscription." },
  { href: "/moshy-vs-juniper", title: "Moshy vs Juniper", desc: "The clinical and coaching platforms, split properly." },
  { href: "/best-weight-loss-telehealth-australia", title: "Best weight loss telehealth", desc: "Moshy, Juniper and Better Being side by side." },
  { href: "/moshy-vs-gp", title: "Telehealth vs your GP", desc: "Two doors to the same care. The practical trade." },
  { href: "/moshy-eligibility", title: "The eligibility check, explained", desc: "What the quiz asks and why some people are declined." },
  { href: "/moshy-alternatives", title: "Moshy alternatives", desc: "The honest shortlist, including the option nobody markets." },
  { href: "/online-weight-loss-programs-australia", title: "Online programs, untangled", desc: "Medical telehealth vs coaching apps vs meal plans." },
  { href: "/weight-loss-telehealth-men-australia", title: "The men's guide", desc: "How men's services work and the pre-signup checklist." },
  { href: "/mens-health-telehealth-australia", title: "Men's health telehealth", desc: "The wider category, and what online clinics can't do." },
  { href: "/getmoshy", title: "getmoshy.com.au", desc: "Confirming the official site and the fastest way in." },
  { href: "/moshy", title: "Moshy offer & referral link", desc: "The current referral offer. No code required." },
];

const faqs = [
  {
    q: "Where should I start if I'm comparing weight loss options in Australia?",
    a: "Start by working out which of the three pathways fits you: medical telehealth with practitioner oversight, a lifestyle and coaching program, or self-serve tools. They are different products at different price points. Our guide to online weight loss programs walks through the split, and the telehealth comparison covers the main providers.",
  },
  {
    q: "Are online weight loss services in Australia legitimate?",
    a: "The medical telehealth providers operate under Australian health regulations, use registered practitioners, and decline applicants who are not suitable. That screening step is the marker to look for. Services that promise a specific medicine before anyone has assessed you are the ones to avoid.",
  },
  {
    q: "Does Refer Labs earn money from these pages?",
    a: "Some links are disclosed affiliate links, and Moshy's referral link is one of them. Commissions never change a comparison or a conclusion, and every page that contains one says so. Our full standards are at how we research.",
  },
  {
    q: "Is any of this medical advice?",
    a: "No. Everything in this hub is general information about services and how they work. Suitability for any program or treatment is assessed individually by registered practitioners. Talk to a qualified health professional about your own circumstances.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Weight Loss", item: `${SITE_URL}/weight-loss` },
  ],
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Weight Loss in Australia: Compare Your Options",
  description:
    "Refer Labs' weight loss hub for Australians. Compare medical telehealth, lifestyle programs and self-serve tools, with independent guides to the main providers.",
  url: `${SITE_URL}/weight-loss`,
  inLanguage: "en-AU",
  isPartOf: { "@type": "WebSite", name: "Refer Labs", url: SITE_URL },
  mainEntity: {
    "@type": "ItemList",
    itemListElement: guides.map((g, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: g.title,
      url: `${SITE_URL}${g.href}`,
    })),
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function WeightLossHubPage() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main id="main-content">
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-5 pt-12 sm:px-8 sm:pt-16">
          <nav className="mb-7 flex items-center gap-2 text-sm text-[#9aa39c]">
            <Link href="/" className="hover:text-[#0a7c42]">Refer Labs</Link>
            <span>/</span>
            <span className="text-[#2b362f]">Weight loss</span>
          </nav>
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0a7c42]">
              Category hub · Australia
            </p>
            <h1 className="mt-4 font-[family-name:var(--font-fraunces)] text-4xl font-semibold leading-[1.06] tracking-[-0.01em] text-[#10251b] sm:text-5xl">
              Weight loss in Australia: <span className="italic text-[#0a7c42]">the options, compared properly</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#2b362f]">
              Telehealth services, coaching programs, apps and everything in between now compete for the same
              decision. This hub sorts them into three honest pathways and gives you the research for each.
            </p>
          </div>
          <p className="mt-8 max-w-3xl rounded-xl border border-[#e5e9e7] bg-[#f5f8f6] px-5 py-4 text-xs leading-relaxed text-[#3d4b44]">
            <span className="font-semibold text-[#2b362f]">Information only.</span> Nothing in this hub is medical
            advice or a recommendation of any treatment. Prescription medicines in Australia are available only after
            individual assessment by a registered practitioner. Some links are disclosed affiliate links.
          </p>
        </section>

        {/* Quiz */}
        <section className="mx-auto max-w-3xl px-5 pt-6 sm:px-8">
          <PathwayQuiz />
        </section>

        {/* Three pathways */}
        <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
          <h2 className="font-[family-name:var(--font-fraunces)] text-2xl font-semibold tracking-[-0.01em] text-[#10251b] sm:text-3xl">
            Or explore the pathways yourself
          </h2>
          <div className="mt-7 grid gap-4 lg:grid-cols-3">
            <div className="rounded-2xl border border-[#0a7c42]/30 bg-[#f5f8f6] p-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0a7c42]">Pathway one</p>
              <h3 className="mt-3 font-[family-name:var(--font-fraunces)] text-xl font-semibold text-[#10251b]">
                Medical telehealth
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-[#3d4b44]">
                A registered practitioner assesses you individually before anything starts, and some applicants are
                declined. Moshy runs a lean clinical pathway open to anyone eligible, Juniper adds coaching and markets
                to women. The most structured route, priced as a subscription.
              </p>
              <div className="mt-5 space-y-2 text-sm font-semibold">
                <p><Link href="/best-weight-loss-telehealth-australia" className="text-[#0a7c42] hover:underline">Compare the providers →</Link></p>
                <p><Link href="/moshy-review" className="text-[#0a7c42] hover:underline">Read the Moshy review →</Link></p>
              </div>
            </div>
            <div className="rounded-2xl border border-[#e5e9e7] bg-[#f5f8f6] p-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9aa39c]">Pathway two</p>
              <h3 className="mt-3 font-[family-name:var(--font-fraunces)] text-xl font-semibold text-[#10251b]">
                Lifestyle programs
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-[#3d4b44]">
                Coaching, habits and nutrition first, with practitioner support in the background. Better Being is the
                main Australian name. Suits people who want structure and accountability rather than a clinical
                pathway.
              </p>
              <p className="mt-5 text-sm font-semibold">
                <Link href="/online-weight-loss-programs-australia" className="text-[#0a7c42] hover:underline">
                  How the program types differ →
                </Link>
              </p>
            </div>
            <div className="rounded-2xl border border-[#e5e9e7] bg-[#f5f8f6] p-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9aa39c]">Pathway three</p>
              <h3 className="mt-3 font-[family-name:var(--font-fraunces)] text-xl font-semibold text-[#10251b]">
                Your GP
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-[#3d4b44]">
                The option nobody advertises. In-person assessment, whole-of-health context, Medicare offsets part of
                the cost. Slower to start, and for plenty of people still the right room.
              </p>
              <p className="mt-5 text-sm font-semibold">
                <Link href="/moshy-vs-gp" className="text-[#0a7c42] hover:underline">Telehealth vs GP, compared →</Link>
              </p>
            </div>
          </div>

          {/* Flagship CTA */}
          <div className="mt-8 flex flex-col items-start justify-between gap-5 rounded-2xl border border-[#0a7c42]/20 bg-[#0a7c42]/[0.05] px-7 py-6 sm:flex-row sm:items-center">
            <p className="max-w-xl text-[15px] leading-relaxed text-[#10251b]">
              If you are leaning toward the telehealth pathway, Moshy&apos;s eligibility check is the usual starting
              point. About ten minutes, no commitment, and the referral applies automatically through our link.
            </p>
            <a
              {...aff}
              data-cta="hub-weight-loss"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-[#0a7c42] px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_-8px_rgba(14,124,102,0.6)] transition-all hover:-translate-y-0.5 hover:bg-[#0a7c42]"
            >
              Check eligibility on Moshy
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </section>

        {/* All guides */}
        <section className="border-y border-[#e5e9e7] bg-[#f5f8f6]">
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
            <h2 className="font-[family-name:var(--font-fraunces)] text-2xl font-semibold tracking-[-0.01em] text-[#10251b] sm:text-3xl">
              Every guide in this hub
            </h2>
            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {guides.map((g) => (
                <Link
                  key={g.href}
                  href={g.href}
                  className="group rounded-xl border border-[#e5e9e7] bg-[#f5f8f6] p-5 transition-all hover:-translate-y-0.5 hover:border-[#0a7c42]/40"
                >
                  <h3 className="text-[15px] font-bold text-[#10251b] group-hover:text-[#0a7c42]">{g.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#3d4b44]">{g.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
          <NewsletterSignup
            variant="band"
            source="weight-loss-hub"
            heading="New weight-loss services launch constantly"
            sub="We track them so you don't have to. Get the important updates and honest comparisons, no spam."
          />
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
          <h2 className="font-[family-name:var(--font-fraunces)] text-2xl font-semibold tracking-[-0.01em] text-[#10251b] sm:text-3xl">
            Before you dive in
          </h2>
          <div className="mt-6 max-w-3xl divide-y divide-white/[0.08] border-y border-[#e5e9e7]">
            {faqs.map((f) => (
              <details key={f.q} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-[#10251b]">
                  {f.q}
                  <span className="text-xl leading-none text-[#0a7c42] transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-[15px] leading-relaxed text-[#2b362f]">{f.a}</p>
              </details>
            ))}
          </div>
          <p className="mt-8 text-sm text-[#3d4b44]">
            How this hub is funded and researched:{" "}
            <Link href="/how-we-research" className="font-semibold text-[#0a7c42] underline decoration-[#0a7c42]/30 underline-offset-4">
              our editorial standards
            </Link>
            .
          </p>
        </section>
      </main>
    </ConsumerShell>
  );
}
