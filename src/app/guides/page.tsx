import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import NewsletterSignup from "@/components/consumer/NewsletterSignup";

export const metadata = generateSEOMetadata(seoConfig.guides);

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Guides & Comparisons", item: `${SITE_URL}/guides` },
  ],
};

const hubs = [
  { href: "/weight-loss", label: "Weight Loss", desc: "Telehealth, programs and the GP pathway, compared." },
  { href: "/hair-loss", label: "Hair Loss", desc: "Clinical prescription treatment versus topical products." },
  { href: "/apollo-energy", label: "Home Batteries", desc: "Battery sizing, the federal rebate, and what a quote should include." },
  { href: "/compare/website-builders", label: "Website Builders", desc: "Free, AI-built and landing-page tools, sorted by job." },
  { href: "/compare/newsletter-platforms", label: "Newsletter Platforms", desc: "Where to build an email audience, and what each takes." },
  { href: "/compare/ai-sales-tools", label: "AI Sales Tools", desc: "Data, outreach, AI reps and CRMs, sorted by the job you need done." },
  { href: "/compare/sales-outreach", label: "Sales & Outreach", desc: "Find leads and reach them across email and channels." },
  { href: "/compare/ai-tools", label: "AI Tools", desc: "AI assistants and voice, sorted by what they actually do." },
  { href: "/compare/lead-generation", label: "Popups & Quizzes", desc: "On-site popups, interactive quizzes and assessments that capture leads." },
  { href: "/compare/hr-payroll", label: "HR & Payroll", desc: "Run pay, hiring, training and people admin from one place." },
  { href: "/compare/business-phone", label: "Business Phone", desc: "Cloud calling and virtual numbers for teams." },
  { href: "/compare/payments", label: "Payments & Finance", desc: "Get paid across borders, plus bookkeeping automation." },
  { href: "/business-loans", label: "Business Loans", desc: "Compare Australian business lenders and check your options in one short enquiry." },
];

const sections = [
  {
    label: "Comparison Roundups",
    description: "Head-to-head comparisons across categories. Independent, and never pay-to-rank.",
    guides: [
      { href: "/best-website-builder", label: "Best Website Builder 2026", desc: "Carrd vs Durable AI vs Butternut AI vs Swipe Pages." },
      { href: "/best-newsletter-platform", label: "Best Newsletter Platform 2026", desc: "beehiiv vs Substack vs ConvertKit." },
      { href: "/best-weight-loss-telehealth-australia", label: "Best Weight Loss Telehealth", desc: "Moshy vs Juniper, compared." },
      { href: "/best-hair-loss-treatment-australia", label: "Best Hair Loss Treatment", desc: "Clinical telehealth vs topical products." },
      { href: "/best-ai-sales-tools", label: "Best AI Sales Tools 2026", desc: "GoHighLevel, AiSDR, Reply.io and FullEnrich, by job." },
    ],
  },
  {
    label: "Business Lending",
    description: "Compare business lenders and understand the real cost before you borrow. Refer Labs is a referrer, not a lender.",
    guides: [
      { href: "/business-loans", label: "Business Loans Australia", desc: "Compare lenders and check your options through one short enquiry." },
      { href: "/what-a-business-loan-actually-costs", label: "What a Business Loan Actually Costs", desc: "Nominal rate vs factor rate vs fees, with a worked example." },
      { href: "/true-cost-of-business-loans-australia", label: "The Hidden Cost of Factor Rates", desc: "Analysis: a 1.2 factor rate is 35% a year, not 20%. Full method shown." },
      { href: "/business-loan-calculator", label: "Repayment Calculator", desc: "Estimate monthly repayments and total interest. No sign-up." },
      { href: "/unsecured-business-loans-australia", label: "Unsecured Business Loans", desc: "No collateral, faster funding, higher cost. When it makes sense." },
      { href: "/secured-vs-unsecured-business-loans", label: "Secured vs Unsecured", desc: "Cheaper-but-asset-on-the-line vs faster-but-dearer, decided." },
      { href: "/business-line-of-credit-australia", label: "Business Line of Credit", desc: "A revolving limit for lumpy cash flow. How it differs from a term loan." },
      { href: "/fast-business-loans-australia", label: "Fast Business Loans", desc: "What makes funding same-day, and how to be ready for it." },
      { href: "/business-loans-bad-credit-australia", label: "Bad-Credit Business Loans", desc: "What's realistic with a default or judgement. No false promises." },
      { href: "/business-loan-eligibility-australia", label: "What Lenders Look At", desc: "The four factors that decide a business loan, and how they trade off." },
      { href: "/how-to-get-a-business-loan-australia", label: "How to Get a Business Loan", desc: "A step-by-step that avoids denting your credit file." },
      { href: "/equipment-finance-instant-asset-write-off", label: "Equipment Finance & the Write-Off", desc: "Chattel mortgage vs lease, and how the instant asset write-off fits." },
    ],
  },
  {
    label: "Weight Loss & Telehealth",
    description: "How Australia's online weight-loss services work, and which suits whom.",
    guides: [
      { href: "/moshy", label: "Moshy, Offer & Referral Link", desc: "The current referral offer. No code required." },
      { href: "/moshy-review", label: "Moshy, Explained", desc: "How the service actually runs, application to subscription." },
      { href: "/moshy-vs-juniper", label: "Moshy vs Juniper", desc: "The clinical and coaching platforms, split properly." },
      { href: "/moshy-vs-gp", label: "Telehealth vs Your GP", desc: "Two doors to the same care. The practical trade." },
      { href: "/moshy-alternatives", label: "Moshy Alternatives", desc: "The shortlist, including your GP." },
      { href: "/mens-health-telehealth-australia", label: "Men's Health Telehealth", desc: "The wider category and its limits." },
    ],
  },
  {
    label: "Home Batteries & Energy",
    description: "What a home battery costs, what the federal rebate pays, and how to size one.",
    guides: [
      { href: "/apollo-energy", label: "Apollo Energy Group", desc: "Battery specialists, sized from your real usage. $500 off your quote via our link." },
      { href: "/home-battery-rebate-australia", label: "The 2026 Battery Rebate", desc: "What the Cheaper Home Batteries discount pays, and why it tapers above 14kWh." },
      { href: "/apollo-energy-review", label: "Apollo Energy, Reviewed", desc: "Accreditation, warranty, and the things worth checking before you sign." },
      { href: "/home-battery-cost-australia", label: "What a Battery Costs", desc: "Real installed price ranges by size, what the rebate takes off, and payback." },
      { href: "/home-battery-payback-calculator", label: "Payback Calculator", desc: "Estimate net cost, annual saving and payback from your own usage and tariff." },
      { href: "/best-home-battery-australia", label: "Best Home Battery", desc: "How to actually choose one: capacity, chemistry, warranty, and why the installer matters." },
      { href: "/what-size-home-battery-do-i-need-australia", label: "What Size Battery Do I Need", desc: "Size from your evening usage and spare solar, and why the rebate tapers above 14kWh." },
      { href: "/nsw-home-battery-rebate-2026", label: "NSW Battery Rebate 2026", desc: "The federal rebate plus the NSW VPP incentive, and how they stack." },
      { href: "/home-battery-installer-nsw", label: "Choosing a NSW Installer", desc: "SAA accreditation, licensing, warranties, and handling the rebate." }
    ],
  },
  {
    label: "Hair Loss & Hair Care",
    description: "Prescription telehealth and topical products for hair loss in Australia.",
    guides: [
      { href: "/moshhair", label: "Mosh Hair: What to Know", desc: "Men's hair-loss telehealth. Process, options, current offer." },
      { href: "/dense", label: "Dense Hair Experts", desc: "Topical, non-prescription density and scalp products." },
      { href: "/finasteride-australia", label: "Finasteride, Explained", desc: "What it is, why it is prescription-only, and how access works. Not medical advice." },
      { href: "/minoxidil-australia", label: "Minoxidil, Explained", desc: "Topical vs oral, the shedding phase, and how it combines with finasteride." },
      { href: "/hair-loss-treatment-cost-australia", label: "What Treatment Costs", desc: "Over-the-counter vs telehealth plans, using Mosh\u2019s published prices." },
      { href: "/finasteride-vs-minoxidil-australia", label: "Finasteride vs Minoxidil", desc: "The two most studied treatments, and how they work in opposite ways." },
      { href: "/online-hair-loss-treatment-australia", label: "Online Hair-Loss Treatment", desc: "How the telehealth assessment works, and what you can and can\u2019t get online." },
      { href: "/how-long-does-finasteride-take-to-work-australia", label: "How Long Finasteride Takes", desc: "A realistic timeline, the shedding phase, and why it\u2019s ongoing." },
      { href: "/how-to-stop-hair-loss-australia", label: "How to Stop Hair Loss", desc: "Understanding the cause, what the evidence supports, and acting early." },
    ],
  },
  {
    label: "Website Builders & Landing Pages",
    description: "AI website builders, one-page sites and landing-page tools built to convert.",
    guides: [
      { href: "/carrd", label: "Carrd", desc: "Free plan forever, Pro from $9/year. Best for simple sites." },
      { href: "/durableai", label: "Durable AI", desc: "Generate a business website in 30 seconds, with a CRM." },
      { href: "/butternut", label: "Butternut AI", desc: "A full site from a prompt in seconds. Free to try." },
      { href: "/swipepages", label: "Swipe Pages", desc: "Fast AMP landing pages. 14-day free trial." },
      { href: "/leadpages", label: "Leadpages", desc: "Landing pages built for lead capture, with A/B testing." },
      { href: "/landingi", label: "Landingi", desc: "No-code landing-page builder for marketers." },
      { href: "/carrd-vs-durable", label: "Carrd vs Durable AI", desc: "Cheap-and-simple vs AI-built business site." },
    ],
  },
  {
    label: "Popups, Quizzes & Surveys",
    description: "Turn visitors into leads with popups, interactive content and surveys.",
    guides: [
      { href: "/hellobar", label: "Hello Bar", desc: "No-code popups and bars for on-site email capture." },
      { href: "/outgrow", label: "Outgrow", desc: "Interactive calculators and quizzes that capture leads." },
      { href: "/flexiquiz", label: "FlexiQuiz", desc: "Online quizzes, tests and assessments with auto-marking." },
      { href: "/survicate", label: "Survicate", desc: "Customer-feedback surveys across web, email and app." },
    ],
  },
  {
    label: "Newsletters & Email Marketing",
    description: "Build an audience and run email, from creator newsletters to automation.",
    guides: [
      { href: "/beehiiv", label: "beehiiv", desc: "Newsletter platform built for growth. Free to start." },
      { href: "/brevo", label: "Brevo", desc: "Email, SMS, automation and a CRM in one tool." },
      { href: "/activecampaign", label: "ActiveCampaign", desc: "Email marketing with a powerful automation builder." },
    ],
  },
  {
    label: "Sales, CRM & Data",
    description: "Find leads, run outreach and manage the pipeline, sorted by the job.",
    guides: [
      { href: "/gohighlevel", label: "GoHighLevel", desc: "All-in-one CRM, marketing automation and funnels." },
      { href: "/nutshell", label: "Nutshell", desc: "An easy sales CRM with email marketing built in." },
      { href: "/pipedrive", label: "Pipedrive", desc: "A visual, pipeline-first sales CRM." },
      { href: "/aisdr", label: "AiSDR", desc: "A done-for-you AI rep that prospects and books meetings." },
      { href: "/replyio", label: "Reply.io", desc: "Run your own multichannel outbound across channels." },
      { href: "/fullenrich", label: "FullEnrich", desc: "Waterfall enrichment for verified emails and mobiles." },
      { href: "/keap", label: "Keap", desc: "Small-business CRM with sales and marketing automation." },
      { href: "/capsule", label: "Capsule", desc: "A simple CRM small teams actually keep using." },
    ],
  },
  {
    label: "AI Tools",
    description: "AI assistants, voice, branding and meeting notes, sorted by what they do.",
    guides: [
      { href: "/lindy", label: "Lindy", desc: "An AI assistant that automates inbox, scheduling and CRM." },
      { href: "/elevenlabs", label: "ElevenLabs", desc: "AI voice and text-to-speech with voice cloning." },
      { href: "/beautifulai", label: "Beautiful.ai", desc: "AI presentation software that designs slides for you." },
    ],
  },
  {
    label: "Business Phone, HR & Finance",
    description: "The tools that run the back office: calling, people and money.",
    guides: [
      { href: "/cloudtalk", label: "CloudTalk", desc: "AI call-centre and business phone for sales and support." },
      { href: "/krispcall", label: "KrispCall", desc: "Cloud phone with virtual numbers and a shared inbox." },
      { href: "/employmenthero", label: "Employment Hero", desc: "Australian HR, payroll and employment platform." },
      { href: "/trainual", label: "Trainual", desc: "Document processes, onboarding and SOPs in one place." },
      { href: "/dext", label: "Dext", desc: "Bookkeeping automation that syncs to Xero and QuickBooks." },
    ],
  },
  {
    label: "More Business & Creative Tools",
    description: "Analytics, virtual assistants, e-signatures, design and more.",
    guides: [
      { href: "/wing-assistant", label: "Wing Assistant", desc: "Managed virtual assistants across many roles." },
      { href: "/pandadoc", label: "PandaDoc", desc: "Proposals, contracts and e-signatures in one tool." },
      { href: "/blinq", label: "Blinq", desc: "Digital business cards you share by QR, link or NFC." },
      { href: "/alidrop", label: "AliDrop", desc: "Dropshipping tool for AliExpress, Alibaba and Temu." },
      { href: "/superfiliate", label: "Superfiliate", desc: "Run affiliate and creator programs for your brand." },
    ],
  },
  {
    label: "Affiliate Programs",
    description: "Which Australian affiliate programs are worth promoting, what they pay, and how to start.",
    guides: [
      { href: "/affiliate-programs-australia", label: "Best Affiliate Programs in Australia", desc: "The programs worth your time, sorted by category and payout." },
      { href: "/high-paying-affiliate-programs", label: "Highest Paying Programs", desc: "Twelve high-payout programs, what they typically pay, and the networks behind them." },
      { href: "/recurring-affiliate-programs", label: "Recurring Commission Programs", desc: "Programs that pay every month a customer stays, not once." },
      { href: "/affiliate-earnings-calculator", label: "Earnings Calculator", desc: "Turn audience size, channel and niche into an honest range, with the assumptions on show." },
      { href: "/how-to-start-affiliate-marketing-australia", label: "How to Start From Zero", desc: "The step-by-step path, from choosing a niche to first traffic." },
    ],
  },
];

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: seoConfig.guides.title,
  description: seoConfig.guides.description,
  url: `${SITE_URL}/guides`,
  inLanguage: "en-AU",
  isPartOf: { "@type": "WebSite", name: "Refer Labs", url: SITE_URL },
  mainEntity: {
    "@type": "ItemList",
    itemListElement: hubs.map((h, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: h.label,
      url: `${SITE_URL}${h.href}`,
    })),
  },
};

export default function GuidesPage() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />

      <main id="main-content" className="mx-auto max-w-6xl px-5 pb-20 pt-12 sm:px-8 sm:pt-16">
        <nav className="mb-7 flex items-center gap-2 text-sm text-[#9aa39c]">
          <Link href="/" className="hover:text-[#0a7c42]">Refer Labs</Link>
          <span>/</span>
          <span className="text-[#2b362f]">Guides</span>
        </nav>

        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0a7c42]">Independent comparisons</p>
          <h1 className="mt-4 text-4xl font-bold leading-[1.06] tracking-[-0.01em] text-[#10251b] sm:text-5xl">
            Every guide, in one place
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-[#2b362f]">
            Comparisons and guides across health, software and business tools. Researched by people, disclosed on
            every page, and never sold to the highest bidder.
          </p>
        </div>

        {/* Category hubs */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {hubs.map((h) => (
            <Link key={h.href} href={h.href} className="group rounded-2xl border border-[#0a7c42]/25 bg-[#f5f8f6] p-6 transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-16px_rgba(0,0,0,0.25)]">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0a7c42]">Compare</span>
                <ArrowRight className="h-4 w-4 text-[#0a7c42] transition-transform group-hover:translate-x-0.5" />
              </div>
              <h2 className="mt-3 text-xl font-bold text-[#10251b] group-hover:text-[#0a7c42]">{h.label}</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-[#3d4b44]">{h.desc}</p>
            </Link>
          ))}
        </div>

        {/* Sections */}
        <div className="mt-6 space-y-0">
          {sections.map((section) => (
            <section key={section.label} className="border-t border-[#e5e9e7] py-12">
              <div className="grid gap-8 lg:grid-cols-[220px_1fr] lg:gap-14">
                <div className="lg:pt-1">
                  <h2 className="text-xl font-bold text-[#10251b]">{section.label}</h2>
                  <p className="mt-2 text-[13px] leading-relaxed text-[#9aa39c]">{section.description}</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {section.guides.map((guide) => (
                    <Link key={guide.href} href={guide.href} className="group rounded-xl border border-[#e5e9e7] bg-[#f5f8f6] p-5 transition-all hover:-translate-y-0.5 hover:border-[#0a7c42]/40">
                      <h3 className="text-[15px] font-bold text-[#10251b] group-hover:text-[#0a7c42]">{guide.label}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-[#3d4b44]">{guide.desc}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>

        <div className="border-t border-[#e5e9e7] pt-10">
          <NewsletterSignup variant="band" source="guides" />
          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-[#3d4b44]">
            Some pages contain affiliate links, disclosed on the page. We may earn a commission if you buy through them,
            at no extra cost to you, and it never changes a conclusion.
          </p>
        </div>
      </main>
    </ConsumerShell>
  );
}
