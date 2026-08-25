import { ArrowRight, CheckCircle2, Check } from "lucide-react";
import Link from "next/link";
import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import ListingForm from "./ListingForm";

export const metadata = generateSEOMetadata(seoConfig.partnerWithReferLabs);

const URL = `${SITE_URL}/partner-with-refer-labs`;
const contactEmail = "jarred@referlabs.com.au";

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Partner with Refer Labs", item: URL },
  ],
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.partnerWithReferLabs.title,
  description: seoConfig.partnerWithReferLabs.description,
  url: URL,
  inLanguage: "en-AU",
  isPartOf: { "@id": `${SITE_URL}/#website` },
};

// The categories Refer Labs actually compares today, across health, home energy
// and business. A business only gets featured if it stands up to the criteria.
const categories = [
  {
    num: "01",
    label: "Weight loss & telehealth",
    intro:
      "Online weight management in Australia has grown fast, and quality ranges from properly supervised clinical programs to little more than a landing page. We compare the providers Australians search for most, on how the care is actually delivered.",
    detail:
      "Medically supervised telehealth programs and the pathways around them. Information only, never medical advice, and any treatment is a decision for a registered practitioner. We do not name prescription medicines on this site.",
    eval: [
      "Registered-practitioner assessment before any treatment",
      "Monitoring and follow-up, not just a prescription",
      "What is included in the subscription, and what costs extra",
      "Claims that are accurate and not misleading (no guaranteed outcomes)",
    ],
  },
  {
    num: "02",
    label: "Hair loss & men's health",
    intro:
      "Hair-loss and men's-health telehealth is fragmented, and clinics often default to their most profitable treatment rather than the most appropriate one. We profile providers that do a real assessment and set out the trade-offs.",
    detail:
      "Telehealth providers and clinics across hair loss and broader men's health. Information only, not medical advice; suitability is decided by a registered practitioner.",
    eval: [
      "A diagnostic process, not photos only",
      "Range of treatments offered and explained",
      "Clinical oversight and prescriber qualifications",
      "Whether follow-ups are built into the program",
    ],
  },
  {
    num: "03",
    label: "Solar & energy",
    intro:
      "Home batteries are a high-ticket category where marketing spend has no relationship to install quality, and the rebate arithmetic is where most buyers get lost. We compare installers on what is checkable, and portable power for the third of households who rent.",
    detail:
      "Accredited battery and solar installers, and portable power brands. We weight verifiable credentials over sales polish, and how transparently the federal and state rebates are applied.",
    eval: [
      "SAA accreditation and a current electrical licence",
      "Warranty terms and what they actually cover",
      "Systems sized from real usage rather than sold as a package",
      "The rebate itemised and applied, not just implied",
    ],
  },
  {
    num: "04",
    label: "Pet insurance",
    intro:
      "Pet cover is sold on monthly price and decided by the fine print: benefit percentage, annual limits, waiting periods and what counts as pre-existing. We publish what each policy document actually says, including who underwrites it.",
    detail:
      "Australian pet insurers and the underwriters behind them. We state where two brands share an insurer, because that changes whether they are genuine alternatives.",
    eval: [
      "Benefit percentage and annual benefit limit, stated plainly",
      "Waiting periods, excess and hereditary or congenital cover",
      "The underwriter named, not just the brand",
      "Product disclosure that matches the marketing",
    ],
  },
  {
    num: "05",
    label: "Business software",
    intro:
      "The software that runs a business, CRM, websites and landing pages, email, HR and payroll, payments, is a maze of near-identical tools. We sort them by the job you need done and recommend on fit, not on who pays the most.",
    detail:
      "SaaS tools across sales and CRM, websites, email, HR, payments and AI. Some links are disclosed affiliate links, which never change a recommendation or the order tools appear in.",
    eval: [
      "A genuine free trial, or transparent pricing",
      "Fit for the specific job, not feature bloat",
      "Support quality and ease of switching in and out",
      "No lock-in and no misleading \"from\" pricing",
    ],
  },
];

const APPROACH = [
  "Several options per category, never a single sponsored result",
  "Assessed against category criteria, and we publish no star ratings of our own",
  "Prices and offers dated on the page, and re-checked as they change",
  "No fee to be listed, and no paid placement",
];

function SectionHead({ kicker, children }: { kicker: string; children: React.ReactNode }) {
  return (
    <div>
      <span className="nw-kicker">{kicker}</span>
      <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-[#10251b] sm:text-3xl">{children}</h2>
    </div>
  );
}

export default function PartnerWithReferLabsPage() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      <main id="main-content" className="mx-auto max-w-4xl px-5 pb-24 sm:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 pt-8 text-sm text-[#6e7b74]">
          <Link href="/" className="transition-colors hover:text-[#10251b]">Refer Labs</Link>
          <span>/</span>
          <span className="text-[#10251b]">Partner with us</span>
        </nav>

        {/* Hero */}
        <header className="pt-9">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#0a7c42]/25 bg-[#e6f3ec] px-3.5 py-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#0a7c42]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#0a7c42]">Applications open</span>
          </span>
          <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-[-0.02em] text-[#10251b] sm:text-5xl">
            Apply to partner with{" "}
            <span className="text-[#0a7c42]">Refer Labs</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#3d4b44]">
            We compare providers across health, solar and energy, pet insurance and business software, and reach
            Australians at the point they are choosing. Placement is earned against published criteria and is never
            sold, which is what makes the traffic worth having.
          </p>
          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2.5 text-[14px] font-medium text-[#10251b]">
            {["Independent research", "Australian audience", "Rankings are never sold"].map((tag) => (
              <span key={tag} className="inline-flex items-center gap-1.5">
                <Check className="h-4 w-4 text-[#0a7c42]" strokeWidth={2.5} aria-hidden="true" /> {tag}
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#apply" className="nw-btn">Apply to partner with us <ArrowRight className="h-4 w-4" /></a>
            <a href={`mailto:${contactEmail}?subject=Partner with Refer Labs - Enquiry`} className="nw-btn-ghost">Email us instead</a>
          </div>
        </header>

        {/* What it is */}
        <section className="mt-16 border-t border-[#e5e9e7] pt-12">
          <SectionHead kicker="What it is">The independent alternative to a pay-to-rank directory</SectionHead>
          <div className="mt-5 max-w-2xl space-y-4 text-[15px] leading-relaxed text-[#3d4b44]">
            <p>
              There are more providers than ever across health, energy and business software, and the marketing budgets
              of the loudest players have no relationship to the quality of what they offer.
            </p>
            <p>
              Refer Labs profiles a small number of providers in each category against published criteria. We take a
              commission when a reader signs up or buys through a link, and that is disclosed on every page it applies
              to. What we do not do is sell position: no brand has ever paid to rank above another, and there is no fee
              to be listed.
            </p>
            <p>
              It follows that we publish things partners would rather we did not. Where two brands we earn from share an
              underwriter, we say so. Where a partner is more expensive than its rival, the table shows it. That is the
              reason readers act on what they read here.
            </p>
          </div>
        </section>

        {/* Categories */}
        <section className="mt-16 border-t border-[#e5e9e7] pt-12">
          <SectionHead kicker="Categories">What we compare, and what we assess</SectionHead>
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
          <SectionHead kicker="Our approach">What partnering actually involves</SectionHead>
          <div className="mt-5 max-w-2xl space-y-4 text-[15px] leading-relaxed text-[#3d4b44]">
            <p>
              Each category carries a shortlist assessed on standards, transparency, pricing honesty and the experience
              a real customer would have. The list stays small on purpose: a page listing everything is a directory, and
              directories do not convert.
            </p>
            <p>
              A partnership is usually a commission arrangement (an affiliate program, or a referral fee on enquiries we
              introduce), and where a brand offers our readers a genuine discount we will name the code and the
              conditions. We do not take payment for placement, we do not publish sponsored posts dressed as
              comparisons, and we do not invent ratings or testimonials.
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
        <section id="apply" className="mt-16 scroll-mt-24 border-t border-[#e5e9e7] pt-12">
          <SectionHead kicker="Apply">Apply to partner with us</SectionHead>
          <div className="mt-5 max-w-2xl space-y-4 text-[15px] leading-relaxed text-[#3d4b44]">
            <p>
              If you run a business in one of the categories above, apply below. Tell us what you sell, what an
              Australian customer pays, and what you can offer our readers that they cannot get by going direct. We
              reply to every application, including the ones we decline.
            </p>
            <p>
              We will ask for the things we publish: real prices from your own site, the terms of any offer, and who
              stands behind the product. If a claim cannot be verified from a primary source, it does not go on the
              page, which is the same standard we hold ourselves to.
            </p>
          </div>
          <div className="mt-8 max-w-2xl">
            <ListingForm />
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="mt-16 rounded-2xl border border-[#cfe6da] bg-[#e6f3ec] px-6 py-10 text-center sm:px-10">
          <h2 className="text-2xl font-extrabold tracking-tight text-[#10251b] sm:text-3xl">
            Ready to apply?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-[15px] leading-relaxed text-[#28453a]">
            We are assessing providers across every category above. Applications are read by Jarred, not a form
            queue, and you will get an answer either way.
          </p>
          <a href="#apply" className="nw-btn mt-6">Apply to partner with us <ArrowRight className="h-4 w-4" /></a>
          <p className="mt-5 text-xs text-[#6e7b74]">{contactEmail}</p>
        </section>
      </main>
    </ConsumerShell>
  );
}
