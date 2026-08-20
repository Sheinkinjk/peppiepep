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
  { href: "/best-pet-insurance-australia", label: "Best Pet Insurance: How to Choose", desc: "The six things that decide what you get back: benefit percentage, annual limit, hereditary cover, waiting periods, excess and exclusions." },
  { href: "/knose-vs-petsonme", label: "Knose vs PetsOnMe", desc: "The two compared on published cover: benefit percentage, annual limits, excess and sub-limits." },
  { href: "/petsonme", label: "PetsOnMe: Cover & Code", desc: "The Accidental, Classic and Deluxe plans, the 80% benefit, and what the REFERLABS code actually discounts." },
  { href: "/pet-insurance", label: "Pets", desc: "Cover types, waiting periods and exclusions explained, plus current offers. General information, not advice." },
  { href: "/skin-and-beauty", label: "Skin & Beauty", desc: "What skincare actives do, what devices cost here, and how the prescription route differs." },
  { href: "/sleep", label: "Sleep", desc: "Sleep apnoea diagnosis, CPAP costs, mattresses and trackers, separated properly." },
  { href: "/sleep/do-i-have-sleep-apnoea", label: "Do I Have Sleep Apnoea?", desc: "How it is diagnosed in Australia, and how to prepare for the GP appointment." },
  { href: "/sleep/home-sleep-test-australia-cost", label: "Home Sleep Study Cost", desc: "Referral, Medicare, and the four questions that get you a real number." },
  { href: "/sleep/cpap-machine-costs-australia", label: "CPAP Costs in Australia", desc: "Verified prices, and why the manufacturer was dearer than the retailer." },
  { href: "/sleep/mattress-comparison-australia", label: "Comparing Mattresses", desc: "The specifications that mean something, and trial terms worth reading." },
  { href: "/sleep/sleep-tracker-comparison-australia", label: "Sleep Trackers", desc: "What they estimate versus what a clinical study measures." },
  { href: "/sleep/how-much-does-good-sleep-cost", label: "What Good Sleep Costs", desc: "The free changes first, and when spending is actually justified." },
  { href: "/skin-and-beauty/retinol-vs-prescription-strength-australia", label: "Retinol vs Prescription-Strength", desc: "What separates them, and how each is accessed in Australia." },
  { href: "/skin-and-beauty/led-face-mask-comparison-australia", label: "LED Face Masks in Australia", desc: "Verified AUD prices, the US price gap, and checking the ARTG." },
  { href: "/skin-and-beauty/best-value-skincare-australia-cost-per-use", label: "Skincare Cost Per Use", desc: "Why a $90 serum can be cheaper than a $30 one." },
  { href: "/skin-and-beauty/acne-treatment-options-and-costs-australia", label: "Acne: Routes and Costs", desc: "Over-the-counter, GP and dermatologist pathways, and where Medicare applies." },
  { href: "/skin-and-beauty/anti-ageing-treatments-what-they-cost", label: "Anti-Ageing Treatment Pricing", desc: "Why clinics will not publish a price, and how to compare quotes." },
  { href: "/apollo-energy-group", label: "Home Batteries", desc: "Battery sizing, the federal rebate, and what a quote should include." },
  { href: "/business-software", label: "Business Software", desc: "A finder that matches you to the right tools by use case, size and budget, plus the full directory." },
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
      { href: "/small-business-loans-australia", label: "Small Business Loans", desc: "The main loan types for small operators, and what lenders look for." },
      { href: "/working-capital-loans-australia", label: "Working Capital Loans", desc: "Funding the gap between money out and money in, without overborrowing." },
      { href: "/low-doc-business-loans-australia", label: "Low-Doc Business Loans", desc: "Assessed from bank data rather than full financials. The trade-offs." },
      { href: "/startup-business-loans-australia", label: "Startup Business Loans", desc: "What's realistic before you have a trading history. No false promises." },
      { href: "/business-loans-sole-traders-australia", label: "Sole Trader Business Loans", desc: "Same products, but the whole application rests on you personally." },
      { href: "/business-loans-hospitality-australia", label: "Hospitality Business Loans", desc: "Cafes, restaurants and food businesses: fit-out, equipment and seasonal swings." },
      { href: "/equipment-finance-instant-asset-write-off", label: "Equipment Finance & the Write-Off", desc: "Chattel mortgage vs lease, and how the instant asset write-off fits." },
    ],
  },
  {
    label: "Business Lenders Compared",
    description: "Per-lender detail: what each actually funds, what it publishes, and what to check first. Refer Labs has no partnership with any of them.",
    guides: [
      { href: "/business-loans/lumi", label: "Lumi", desc: "$5,000 to $1 million, same business day. Quotes a total repayment, not a rate." },
      { href: "/business-loans/moula", label: "Moula", desc: "$10,000 to $500,000 from 15.99% p.a. Assessed from bank and accounting data." },
      { href: "/business-loans/prospa", label: "Prospa", desc: "ASX-listed, $5,000 to $500,000, funds within an hour. Wants a clean credit file." },
      { href: "/business-loans/moneytech", label: "Moneytech", desc: "$25,000 to $1 million from 13.95% p.a. Rate and limit both move with security." },
      { href: "/business-loans/shift", label: "Shift", desc: "Overdraft $10,000 to $2 million from 14.95% p.a. AFIA Code signatory." },
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
      { href: "/weight-loss-treatment-eligibility-australia", label: "Do You Qualify?", desc: "The eligibility criteria practitioners use, and how to check." },
      { href: "/mens-health-telehealth-australia", label: "Men's Health Telehealth", desc: "The wider category and its limits." },
      { href: "/weight-loss-telehealth-women-australia", label: "Weight Loss Telehealth for Women", desc: "Coaching-led vs clinical pathways, and how to choose." },
    ],
  },
  {
    label: "Home Batteries & Energy",
    description: "What a home battery costs, what the federal rebate pays, and how to size one.",
    guides: [
      { href: "/apollo-energy-group", label: "Apollo Energy Group", desc: "Battery specialists, sized from your real usage. $500 off your quote via our link." },
      { href: "/home-battery-rebate-australia", label: "The 2026 Battery Rebate", desc: "What the Cheaper Home Batteries discount pays, and why it tapers above 14kWh." },
      { href: "/home-battery-rebate-by-state-australia", label: "Battery Rebate by State", desc: "Which states add their own incentive on top of the federal rebate in 2026, and which no longer do." },
      { href: "/virtual-power-plant-australia", label: "Virtual Power Plants (VPP)", desc: "How VPP payments work, what a battery can earn, and the trade-offs on control and warranty." },
      { href: "/apollo-energy-review", label: "Apollo Energy, Reviewed", desc: "Accreditation, warranty, and the things worth checking before you sign." },
      { href: "/home-battery-cost-australia", label: "What a Battery Costs", desc: "Real installed price ranges by size, what the rebate takes off, and payback." },
      { href: "/home-battery-payback-calculator", label: "Payback Calculator", desc: "Estimate net cost, annual saving and payback from your own usage and tariff." },
      { href: "/best-home-battery-australia", label: "Best Home Battery", desc: "How to actually choose one: capacity, chemistry, warranty, and why the installer matters." },
      { href: "/what-size-home-battery-do-i-need-australia", label: "What Size Battery Do I Need", desc: "Size from your evening usage and spare solar, and why the rebate tapers above 14kWh." },
      { href: "/nsw-home-battery-rebate-2026", label: "NSW Battery Rebate 2026", desc: "The federal rebate plus the NSW VPP incentive, and how they stack." },
      { href: "/home-battery-installer-nsw", label: "Choosing a NSW Installer", desc: "SAA accreditation, licensing, warranties, and handling the rebate." },
      { href: "/home-battery-installer-sydney", label: "Home Battery Installer Sydney", desc: "Choosing a Sydney installer, and how the rebate, NSW VPP and $500 stack." },
      { href: "/solar-and-battery-package-australia", label: "Solar & Battery Packages", desc: "Buying panels and storage together, and why sizing them as one system matters." },
      { href: "/tesla-powerwall-alternatives-australia", label: "Powerwall Alternatives", desc: "How to weigh alternatives to the Tesla Powerwall on capacity, backup and cost." },
      { href: "/is-a-home-battery-worth-it-australia", label: "Is a Battery Worth It?", desc: "When a battery pays off, when it doesn't, and how the rebate and $500 change the maths." },
      { href: "/home-battery-blackout-backup-australia", label: "Blackout Backup", desc: "Not every battery keeps the power on in an outage. What backup actually needs." }
    ],
  },
  {
    label: "Hair Loss & Hair Care",
    description: "Prescription telehealth and topical products for hair loss in Australia.",
    guides: [
      { href: "/hair-loss", label: "Hair Loss: Compare Your Options", desc: "The clinical and topical routes, side by side, and which suits which stage." },
      { href: "/best-hair-loss-treatment-australia", label: "Best Hair Loss Treatment", desc: "Clinical telehealth versus topical products, providers compared." },
      { href: "/moshhair", label: "Mosh Hair: What to Know", desc: "Men's hair-loss telehealth. Process, options, current offer." },
      { href: "/mosh-review", label: "Mosh Review: Legit & Worth It?", desc: "Independent take on whether Mosh stacks up, cost, and what people raise." },
      { href: "/early-signs-of-hair-loss-australia", label: "Early Signs of Hair Loss", desc: "How to tell if you're going bald, what's normal, and when to act." },
      { href: "/dense", label: "Dense Hair Experts", desc: "Topical, non-prescription density and scalp products." },
      { href: "/hair-loss-treatment-cost-australia", label: "What Treatment Costs", desc: "Over-the-counter vs telehealth plans, using Mosh\u2019s published prices." },
      { href: "/online-hair-loss-treatment-australia", label: "Online Hair-Loss Treatment", desc: "How the telehealth assessment works, and what you can and can\u2019t get online." },
      { href: "/how-to-stop-hair-loss-australia", label: "How to Stop Hair Loss", desc: "Understanding the cause, what the evidence supports, and acting early." },
      { href: "/receding-hairline-treatment-australia", label: "Receding Hairline Treatment", desc: "What causes it, which treatments have real evidence, and why acting early matters." },
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
      { href: "/best-crm-small-business-australia", label: "Best CRM for Small Business", desc: "Pipedrive, Capsule, Nutshell and Keap compared by who each suits." },
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
      { href: "/affiliate-earnings-calculator", label: "Earnings Calculator", desc: "Turn audience size, channel and niche into a realistic range, with the assumptions on show." },
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
