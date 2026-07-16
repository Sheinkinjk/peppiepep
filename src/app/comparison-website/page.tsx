import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";
import ListingForm from "./ListingForm";

export const metadata = generateSEOMetadata(seoConfig.comparisonWebsite);

const contactEmail = "jarred@referlabs.com.au";

const categories = [
  {
    num: "01",
    label: "Erectile Dysfunction",
    intro:
      "ED is one of the most searched but least talked about health issues in Australia. The options have improved - telehealth has made access far easier, and treatment now goes well beyond the traditional pill. Shockwave therapy, injectable options, and longer-acting medications are all available, but finding a provider who does a real clinical assessment rather than just sending a script is harder than it should be.",
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
      "The weight loss space in Australia has moved fast. GLP-1 medications like semaglutide have changed what is possible for a lot of people, and the number of medical weight loss providers has grown quickly as a result - not all of them well. Some are legitimate clinics with proper supervision. Others are basically a landing page and a script.",
    detail:
      "We cover the full picture: medically supervised programs, GLP-1 prescribers, dietitian services, and structured lifestyle programs. We pay close attention to what happens after the prescription - monitoring, lifestyle support, and whether there is a real plan for the long term.",
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
      "Hair loss treatment in Australia is more fragmented than it should be. The effective options - finasteride, minoxidil, PRP, surgical transplants - have been around for years, but finding a provider who does a proper diagnosis and recommends the right combination is genuinely difficult. Most clinics default to their most profitable treatment rather than the most appropriate one.",
    detail:
      "We profile telehealth providers, dermatologists, and hair clinics who do real assessments and explain the trade-offs of each approach honestly. Surgical and non-surgical options both covered.",
    eval: [
      "Diagnostic process - photos only vs. clinical assessment",
      "Range of treatments offered and explained",
      "Clinical oversight and prescriber qualifications",
      "Whether follow-ups are built into the program",
    ],
  },
  {
    num: "04",
    label: "Testosterone & Hormone Optimisation",
    intro:
      "TRT has gone mainstream in Australia and the number of clinics offering it has grown fast. Quality varies significantly. A proper clinic should be running thorough bloodwork before and during treatment, managing the full hormonal picture, and checking in regularly - not just prescribing testosterone and leaving you to figure out the rest.",
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
      "Australia has some strong supplement brands, but the category is full of underdosed products, inflated claims, and marketing that outpaces the evidence. Finding brands that are honest about what their products do - and what they do not - takes more research than most people have time for.",
    detail:
      "We focus on brands that are transparent about formulations, use effective doses of the right ingredients, and do not oversell outcomes. This covers everyday performance supplements - protein, creatine, vitamins and minerals - as well as longevity-focused compounds like NMN, NAD+ precursors, and resveratrol.",
    eval: [
      "Ingredient quality and sourcing transparency",
      "Dosing accuracy vs. effective amounts in the research",
      "Third-party testing and certification",
      "Whether health claims are honest and evidence-referenced",
    ],
  },
];

export default function ComparisonWebsitePage() {
  return (
    <div className="relative min-h-screen bg-[#060f15] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,rgba(10,167,181,0.13),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(34,192,205,0.05),transparent_55%)]" />
      </div>

      <main id="main-content" className="relative mx-auto max-w-5xl px-6 sm:px-8 lg:px-12 pb-24 pt-16 sm:pt-20">

        {/* Breadcrumb */}
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-[#0AA7B5]/60 hover:text-[#0AA7B5] transition-colors"
          >
            <ArrowRight className="h-3.5 w-3.5 rotate-180" />
            Refer Labs
          </Link>
        </div>

        {/* Hero */}
        <div className="mb-20 sm:mb-28 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#0AA7B5]/30 bg-[#0AA7B5]/[0.07] px-3.5 py-1.5 mb-7">
            <span className="h-1.5 w-1.5 rounded-full bg-[#22C0CD] animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#22C0CD]">Accepting Applications</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-black leading-[1.06] text-white mb-6 tracking-tight">
            {"Australia's Curated Platform For "}
            <span className="text-[#22C0CD]">Health & Performance</span>
          </h1>
          <p className="text-white/60 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl">
            A properly researched comparison platform across five health and performance categories. We assess providers against clinical standards, transparency, and real-world quality, not ad spend.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-3 mb-10">
            {["5 curated categories", "Australian providers only", "Not a pay-to-rank directory"].map((tag) => (
              <span key={tag} className="flex items-center gap-2 text-sm text-[#0AA7B5]/80">
                <span className="h-1.5 w-1.5 rounded-full bg-[#22C0CD] flex-shrink-0" />
                {tag}
              </span>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="#list-your-business"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0AA7B5] px-7 py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#22C0CD] shadow-lg shadow-[#0AA7B5]/20"
            >
              Apply to Be Listed
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={`mailto:${contactEmail}?subject=Comparison Platform - Enquiry`}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#0AA7B5]/25 bg-[#0AA7B5]/[0.05] px-7 py-3.5 text-sm font-semibold text-white/80 transition-all hover:bg-[#0AA7B5]/10 hover:text-white"
            >
              Contact Us
            </a>
          </div>
        </div>

        {/* What It Is */}
        <section className="border-t border-[#0AA7B5]/10 py-14 sm:py-16">
          <div className="grid lg:grid-cols-[200px_1fr] gap-8 lg:gap-16">
            <div>
              <h2 className="text-xl font-black text-[#22C0CD]">What It Is</h2>
            </div>
            <div className="space-y-5 text-white/55 text-sm sm:text-base leading-relaxed max-w-2xl">
              <p>
                The self-improvement market in Australia has grown quickly and it is increasingly hard to navigate well. There are more providers than ever across health, performance, and optimisation. Quality ranges from excellent to genuinely poor. And the marketing budgets of the loudest players have no relationship to the quality of what they offer.
              </p>
              <p>
                We are building a platform that cuts through that. Not a directory that charges businesses to be listed. Not a review site that anyone can game. A properly researched comparison platform that profiles the leading providers in five categories - so Australians can make decisions based on something real.
              </p>
              <p>
                We cover multiple options in each category, across different approaches and price points. Every business we feature has been assessed against a clear set of criteria. Our aim is to become the most reliable independent resource in this space.
              </p>
            </div>
          </div>
        </section>

        {/* The 5 Categories */}
        <section className="border-t border-[#0AA7B5]/10 py-14 sm:py-16">
          <div className="grid lg:grid-cols-[200px_1fr] gap-8 lg:gap-16">
            <div>
              <h2 className="text-xl font-black text-[#22C0CD]">5 Categories</h2>
            </div>
            <div className="space-y-0 max-w-2xl">
              {categories.map((cat) => (
                <div key={cat.label} className="border-t border-[#0AA7B5]/10 py-10 first:border-t-0 first:pt-0">
                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="text-2xl font-black text-[#0AA7B5]/25 leading-none select-none tabular-nums">{cat.num}</span>
                    <h3 className="text-base sm:text-lg font-bold text-white">{cat.label}</h3>
                  </div>
                  <div className="space-y-3 text-white/50 text-sm leading-relaxed mb-5">
                    <p>{cat.intro}</p>
                    <p>{cat.detail}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0AA7B5]/60 mb-3">What we evaluate</p>
                    <ul className="space-y-2">
                      {cat.eval.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-xs text-white/45">
                          <span className="mt-[5px] h-1 w-1 rounded-full bg-[#22C0CD]/60 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Approach */}
        <section className="border-t border-[#0AA7B5]/10 py-14 sm:py-16">
          <div className="grid lg:grid-cols-[200px_1fr] gap-8 lg:gap-16">
            <div>
              <h2 className="text-xl font-black text-[#22C0CD]">Our Approach</h2>
            </div>
            <div className="space-y-5 text-white/55 text-sm sm:text-base leading-relaxed max-w-2xl">
              <p>
                Most comparison platforms list everything and rank by whoever pays the most. That model works fine for the platform - it is bad for the person trying to make a real decision.
              </p>
              <p>
                We take a different approach. Each category has a shortlist of providers we have assessed against criteria that actually matter - clinical standards, transparency, pricing honesty, and the quality of the experience a real customer would have. The list stays small on purpose. Being featured means something because not everything gets featured.
              </p>
              <ul className="space-y-3 pt-1">
                {[
                  "Multiple options per category - not a single sponsored result",
                  "Assessed against category-specific criteria, not just star ratings",
                  "Updated regularly as the market changes",
                  "Not a pay-to-rank model",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-white/60">
                    <CheckCircle2 className="h-4 w-4 text-[#22C0CD] flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* For Businesses - Apply to List */}
        <section id="list-your-business" className="border-t border-[#0AA7B5]/10 py-14 sm:py-16 scroll-mt-24">
          <div className="grid lg:grid-cols-[200px_1fr] gap-8 lg:gap-16">
            <div>
              <h2 className="text-xl font-black text-[#22C0CD]">List Your Business</h2>
            </div>
            <div className="max-w-2xl">
              <div className="space-y-4 text-white/55 text-sm sm:text-base leading-relaxed mb-10">
                <p>
                  If you run a business in one of the five categories and want to be considered for the platform, apply below. We assess every enquiry against our criteria.
                </p>
                <p>
                  Being featured on a genuinely independent, curated platform is different to appearing in a generic directory. It signals your business stands up to scrutiny, because placement is earned against published criteria rather than bought.
                </p>
              </div>
              <ListingForm />
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="border-t border-[#0AA7B5]/10 pt-16 sm:pt-20 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            Run a Health or Performance Business?{" "}
            <span className="text-[#22C0CD]">Apply to Be Listed.</span>
          </h2>
          <p className="text-white/50 text-base max-w-lg mx-auto mb-8 leading-relaxed">
            We are actively assessing providers across all five categories. If you meet the bar, we will reach out.
          </p>
          <a
            href="#list-your-business"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0AA7B5] px-8 py-4 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#22C0CD] shadow-lg shadow-[#0AA7B5]/20"
          >
            Apply to Be Listed
            <ArrowRight className="h-4 w-4" />
          </a>
          <p className="text-white/30 text-xs mt-6">{contactEmail}</p>
        </section>

      </main>
    </div>
  );
}
