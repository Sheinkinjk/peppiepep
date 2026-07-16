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
  { href: "/compare/website-builders", label: "Website Builders", desc: "Free, AI-built and landing-page tools, sorted by job." },
  { href: "/compare/newsletter-platforms", label: "Newsletter Platforms", desc: "Where to build an email audience, and what each takes." },
  { href: "/compare/ai-sales-tools", label: "AI Sales Tools", desc: "Data, outreach, AI reps and CRMs, sorted by the job you need done." },
  { href: "/compare/sales-outreach", label: "Sales & Outreach", desc: "Find leads and reach them across email and channels." },
  { href: "/compare/ai-tools", label: "AI Tools", desc: "AI assistants and voice, sorted by what they actually do." },
  { href: "/compare/lead-generation", label: "Popups & Quizzes", desc: "On-site popups, interactive quizzes and assessments that capture leads." },
  { href: "/compare/hr-payroll", label: "HR & Payroll", desc: "Run pay, hiring, training and people admin from one place." },
  { href: "/compare/business-phone", label: "Business Phone", desc: "Cloud calling and virtual numbers for teams." },
  { href: "/compare/payments", label: "Payments & Finance", desc: "Get paid across borders, plus bookkeeping automation." },
  { href: "/compare/research-peptides", label: "Research Peptides", desc: "Suppliers compared on purity and catalogue. Research use only." },
];

const sections = [
  {
    label: "Comparison Roundups",
    description: "Head-to-head comparisons across categories. Independent, and never pay-to-rank.",
    guides: [
      { href: "/best-website-builder", label: "Best Website Builder 2026", desc: "Carrd vs Durable AI vs Butternut AI vs Swipe Pages." },
      { href: "/best-newsletter-platform", label: "Best Newsletter Platform 2026", desc: "beehiiv vs Substack vs ConvertKit." },
      { href: "/best-weight-loss-telehealth-australia", label: "Best Weight Loss Telehealth", desc: "Moshy vs Juniper vs Better Being." },
      { href: "/best-hair-loss-treatment-australia", label: "Best Hair Loss Treatment", desc: "Clinical telehealth vs topical products." },
      { href: "/best-peptide-supplier", label: "Best Peptide Supplier 2026", desc: "Apollo vs Ascension vs BioPeptiTech. Research use only." },
      { href: "/best-ai-sales-tools", label: "Best AI Sales Tools 2026", desc: "GoHighLevel, AiSDR, Reply.io and FullEnrich, by job." },
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
    label: "Hair Loss & Hair Care",
    description: "Prescription telehealth and topical products for hair loss in Australia.",
    guides: [
      { href: "/moshhair", label: "Mosh Hair: What to Know", desc: "Men's hair-loss telehealth. Process, options, current offer." },
      { href: "/dense", label: "Dense Hair Experts", desc: "Topical, non-prescription density and scalp products." },
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
      { href: "/instapage", label: "Instapage", desc: "Premium landing pages built to convert paid-ad traffic." },
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
      { href: "/zoominfo", label: "ZoomInfo", desc: "Enterprise B2B data and buyer-intent signals." },
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
      { href: "/logome", label: "Logome.ai", desc: "Generate a logo and full brand kit with AI." },
      { href: "/meetgeek", label: "MeetGeek", desc: "AI meeting notes for Zoom, Meet and Teams." },
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
      { href: "/melio", label: "Melio", desc: "B2B bill pay for US businesses." },
    ],
  },
  {
    label: "More Business & Creative Tools",
    description: "Analytics, virtual assistants, e-signatures, design and more.",
    guides: [
      { href: "/databox", label: "Databox", desc: "KPI dashboards that pull 130+ data sources into one view." },
      { href: "/wing-assistant", label: "Wing Assistant", desc: "Managed virtual assistants across many roles." },
      { href: "/pandadoc", label: "PandaDoc", desc: "Proposals, contracts and e-signatures in one tool." },
      { href: "/blinq", label: "Blinq", desc: "Digital business cards you share by QR, link or NFC." },
      { href: "/alohi", label: "Alohi", desc: "Sign.Plus e-signatures and Fax.Plus online fax." },
      { href: "/cometchat", label: "CometChat", desc: "Developer SDKs to add in-app chat, voice and video." },
      { href: "/flocksy", label: "Flocksy", desc: "Unlimited graphic design from a dedicated team." },
      { href: "/alidrop", label: "AliDrop", desc: "Dropshipping tool for AliExpress, Alibaba and Temu." },
      { href: "/superfiliate", label: "Superfiliate", desc: "Run affiliate and creator programs for your brand." },
      { href: "/incomelab", label: "IncomeLab", desc: "AI side-hustle ideas and frameworks." },
    ],
  },
  {
    label: "Prediction markets",
    description: "How Polymarket works, how to get on it, and how people actually trade it.",
    guides: [
      { href: "/polymarket/markets-explained", label: "Markets explained", desc: "Shares, the order book, fees and how markets resolve." },
      { href: "/polymarket/how-to-register", label: "How to register", desc: "The US and international paths, wallets and requirements." },
      { href: "/polymarket/optimising-edge", label: "Finding your edge", desc: "Where a real advantage comes from, and how to measure it." },
      { href: "/polymarket/trading-bots", label: "Building a trading bot", desc: "Automate through the CLOB API, with the risk controls that matter." },
      { href: "/polymarket/profitable-trading-bots", label: "Profitable bot strategies", desc: "Sports, politics, market making and arbitrage, and the catch on each." },
    ],
  },
  {
    label: "Research Peptides",
    description: "For laboratory research use only. Purity, catalogue and current offers.",
    guides: [
      { href: "/apollopeptides", label: "Apollo Peptide Sciences", desc: "Broad catalogue. Current offer via referral link." },
      { href: "/ascensionpeptides", label: "Ascension Peptides", desc: "High-purity focus. Current offer via referral link." },
      { href: "/biopeptitech", label: "BioPeptiTech", desc: "Lab-grade compounds. Frequent sale events." },
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
            at no extra cost to you, and it never changes a conclusion. See{" "}
            <Link href="/how-we-research" className="font-semibold text-[#0a7c42] underline decoration-[#0a7c42]/30 underline-offset-4">how we research</Link>.
          </p>
        </div>
      </main>
    </ConsumerShell>
  );
}
