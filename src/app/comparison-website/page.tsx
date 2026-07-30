import { ArrowRight, CheckCircle2, Check } from "lucide-react";
import Link from "next/link";
import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import ListingForm from "./ListingForm";

export const metadata = generateSEOMetadata(seoConfig.comparisonWebsite);

const URL = `${SITE_URL}/comparison-website`;
const contactEmail = "jarred@referlabs.com.au";

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Get Featured", item: URL },
  ],
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.comparisonWebsite.title,
  description: seoConfig.comparisonWebsite.description,
  url: URL,
  inLanguage: "en-AU",
  isPartOf: { "@type": "WebSite", name: "Refer Labs", url: SITE_URL },
};

const categories = [
  {
    num: "01",
    label: "Erectile Dysfunction",
    intro:
      "ED is one of the most searched but least talked about health issues in Australia. The options have improved: telehealth has made access far easier, and treatment now goes well beyond the traditional pill. Shockwave therapy, injectable options, and longer-acting medications are all available, but finding a provider who does a real clinical assessment rather than just sending a script is harder than it should be.",
    detail:
      "We profile clinics and telehealth platforms that offer proper consultations, transparent pricing, and genuine clinical oversight. Not whoever spends the most on ads.",
    eval: [
      "Clinical credentials and prescriber qualifications",
      "Range of treatment options offered",
      "Pricing and what is included in a consultation",
      "Follow-up protocols and ongoing support",
    ],
  },
  {
    num: "02",
    label: "Weight Loss",
    intro:
      "The weight loss space in Australia has moved fast. GLP-1 medications have changed what is possible for a lot of people, and the number of medical weight loss providers has grown quickly as a result, not all of them well. Some are legitimate clinics with proper supervision. Others are basically a landing page and a script.",
    detail:
      "We cover the full picture: medically supervised programs, prescribers, dietitian services, and structured lifestyle programs. We pay close attention to what happens after the prescription: monitoring, lifestyle support, and whether there is a real plan for the long term.",
    eval: [
      "Medical supervision and prescriber credentials",
      "Monitoring and follow-up protocols",
      "Whether lifestyle support is included or optional",
      "Total cost transparency across the full program",
    ],
  },
  {
    num: "03",
    label: "Hair Loss",
    intro:
      "Hair loss treatment in Australia is more fragmented than it should be. The effective options, finasteride, minoxidil, PRP, surgical transplants, have been around for years, but finding a provider who does a proper diagnosis and recommends the right combination is genuinely difficult. Most clinics default to their most profitable treatment rather than the most appropriate one.",
    detail:
      "We profile telehealth providers, dermatologists, and hair clinics who do real assessments and explain the trade-offs of each approach honestly. Surgical and non-surgical options both covered.",
    eval: [
      "Diagnostic process: photos only vs. clinical assessment",
      "Range of treatments offered and explained",
      "Clinical oversight and prescriber qualifications",
      "Whether follow-ups are built into the program",
    ],
  },
  {
    num: "04",
    label: "Testosterone & Hormone Optimisation",
    intro:
      "TRT has gone mainstream in Australia and the number of clinics offering it has grown fast. Quality varies significantly. A proper clinic should be running thorough bloodwork before and during treatment, managing the full hormonal picture, and checking in regularly, not just prescribing testosterone and leaving you to figure out the rest.",
    detail:
      "We profile men's health clinics and telehealth providers with real clinical protocols. We look at what they test, how they monitor, and whether they treat testosterone as part of a broader health approach or just as a product to prescribe.",
    eval: [
      "Bloodwork requirements before starting treatment",
      "Ongoing monitoring frequency and what is tested",
      "Prescriber credentials and clinical approach",
      "Treatment options beyond testosterone alone",
    ],
  },
  {
    num: "05",
    label: "Supplements & Longevity",
    intro:
      "Australia has some strong supplement brands, but the category is full of underdosed products, inflated claims, and marketing that outpaces the evidence. Finding brands that are honest about what their products do, and what they do not, takes more research than most people have time for.",
    detail:
      "We focus on brands that are transparent about formulations, use effective doses of the right ingredients, and do not oversell outcomes. This covers everyday performance supplements, protein, creatine, vitamins and minerals, as well as longevity-focused compounds like NMN, NAD+ precursors, and resveratrol.",
    eval: [
      "Ingredient quality and sourcing transparency",
      "Dosing accuracy vs. effective amounts in the research",
      "Third-party testing and certification",
      "Whether health claims are honest and evidence-referenced",
    ],
  },
];

const APPROACH = [
  "Multiple options per category, not a single sponsored result",
  "Assessed against category-specific criteria, not just star ratings",
  "Updated regularly as the market changes",
  "Not a pay-to-rank model",
];

function SectionHead({ kicker, children }: { kicker: string; children: React.ReactNode }) {
  return (
    <div>
      <span className="nw-kicker">{kicker}</span>
      <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-[#10251b] sm:text-3xl">{children}</h2>
    </div>
  );
}

export default function ComparisonWebsitePage() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      <main id="main-content" className="mx-auto max-w-4xl px-5 pb-24 sm:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 pt-8 text-sm text-[#6e7b74]">
          <Link href="/" className="transition-colors hover:text-[#10251b]">Refer Labs</Link>
          <span>/</span>
          <span className="text-[#10251b]">Get featured</span>
        </nav>

        {/* Hero */}
        <header className="pt-9">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#0a7c42]/25 bg-[#e6f3ec] px-3.5 py-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#0a7c42]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#0a7c42]">Accepting applications</span>
          </span>
          <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-[-0.02em] text-[#10251b] sm:text-5xl">
            Get featured on Australia&apos;s curated{" "}
            <span className="text-[#0a7c42]">health &amp; performance</span> platform
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#3d4b44]">
            A properly researched comparison platform across five health and performance categories. We assess providers
            against clinical standards, transparency, and real-world quality, not ad spend. Placement is earned against
            published criteria, never bought.
          </p>
          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2.5 text-[14px] font-medium text-[#10251b]">
            {["5 curated categories", "Australian providers only", "Not a pay-to-rank directory"].map((tag) => (
              <span key={tag} className="inline-flex items-center gap-1.5">
                <Check className="h-4 w-4 text-[#0a7c42]" strokeWidth={2.5} aria-hidden="true" /> {tag}
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#list-your-business" className="nw-btn">Apply to be listed <ArrowRight className="h-4 w-4" /></a>
            <a href={`mailto:${contactEmail}?subject=Get Featured - Enquiry`} className="nw-btn-ghost">Contact us</a>
          </div>
        </header>

        {/* What it is */}
        <section className="mt-16 border-t border-[#e5e9e7] pt-12">
          <SectionHead kicker="What it is">The independent alternative to a pay-to-rank directory</SectionHead>
          <div className="mt-5 max-w-2xl space-y-4 text-[15px] leading-relaxed text-[#3d4b44]">
            <p>
              The self-improvement market in Australia has grown quickly and it is increasingly hard to navigate well.
              There are more providers than ever across health, performance, and optimisation, and the marketing budgets
              of the loudest players have no relationship to the quality of what they offer.
            </p>
            <p>
              We are building a platform that cuts through that. Not a directory that charges businesses to be listed, and
              not a review site that anyone can game: a properly researched comparison platform that profiles the leading
              providers in five categories, so Australians can decide based on something real.
            </p>
            <p>
              We cover multiple options in each category, across different approaches and price points. Every business we
              feature has been assessed against a clear set of criteria.
            </p>
          </div>
        </section>

        {/* Categories */}
        <section className="mt-16 border-t border-[#e5e9e7] pt-12">
          <SectionHead kicker="Five categories">What we profile, and what we assess</SectionHead>
          <div className="mt-8 space-y-5">
            {categories.map((cat) => (
              <div key={cat.label} className="nw-card rounded-2xl p-6 sm:p-7">
                <div className="flex items-baseline gap-3">
                  <span className="select-none text-2xl font-black tabular-nums text-[#cfe0d6]">{cat.num}</span>
                  <h3 className="text-lg font-extrabold text-[#10251b]">{cat.label}</h3>
                </div>
                <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-[#3d4b44]">
                  <p>{cat.intro}</p>
                  <p>{cat.detail}</p>
                </div>
                <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#0a7c42]">What we evaluate</p>
                <ul className="mt-2.5 grid gap-2 sm:grid-cols-2">
                  {cat.eval.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-[#3d4b44]">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#0a7c42]" strokeWidth={2.5} aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Our approach */}
        <section className="mt-16 border-t border-[#e5e9e7] pt-12">
          <SectionHead kicker="Our approach">Being featured means something because not everything is</SectionHead>
          <div className="mt-5 max-w-2xl space-y-4 text-[15px] leading-relaxed text-[#3d4b44]">
            <p>
              Most comparison platforms list everything and rank by whoever pays the most. That works fine for the
              platform. It is bad for the person trying to make a real decision.
            </p>
            <p>
              We take a different approach. Each category has a shortlist of providers we have assessed against criteria
              that actually matter: clinical standards, transparency, pricing honesty, and the quality of the experience a
              real customer would have. The list stays small on purpose.
            </p>
            <ul className="space-y-3 pt-1">
              {APPROACH.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[15px] text-[#3d4b44]">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#0a7c42]" aria-hidden="true" /> {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* List your business */}
        <section id="list-your-business" className="mt-16 scroll-mt-24 border-t border-[#e5e9e7] pt-12">
          <SectionHead kicker="Get featured">Apply to be listed</SectionHead>
          <div className="mt-5 max-w-2xl space-y-4 text-[15px] leading-relaxed text-[#3d4b44]">
            <p>
              If you run a business in one of the five categories and want to be considered for the platform, apply below.
              We assess every enquiry against our criteria.
            </p>
            <p>
              Being featured on a genuinely independent, curated platform is different to appearing in a generic
              directory. It signals your business stands up to scrutiny, because placement is earned against published
              criteria rather than bought.
            </p>
          </div>
          <div className="mt-8 max-w-2xl">
            <ListingForm />
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="mt-16 rounded-2xl border border-[#cfe6da] bg-[#e6f3ec] px-6 py-10 text-center sm:px-10">
          <h2 className="text-2xl font-extrabold tracking-tight text-[#10251b] sm:text-3xl">
            Run a health or performance business?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-[15px] leading-relaxed text-[#28453a]">
            We are actively assessing providers across all five categories. If you meet the bar, we&apos;ll reach out.
          </p>
          <a href="#list-your-business" className="nw-btn mt-6">Apply to be listed <ArrowRight className="h-4 w-4" /></a>
          <p className="mt-5 text-xs text-[#6e7b74]">{contactEmail}</p>
        </section>
      </main>
    </ConsumerShell>
  );
}
