import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import { CheckCircle2, XCircle, ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import StickyCta from "@/components/consumer/StickyCta";
import MatchPrompt from "@/components/consumer/MatchPrompt";

export const metadata = generateSEOMetadata(seoConfig.bestAiSalesTools);

// ─── Affiliate URLs ───────────────────────────────────────────────────────────

import { GOHIGHLEVEL_URL, AISDR_URL, REPLY_IO_URL, FULLENRICH_URL } from "@/lib/affiliate-links";

const aff = (url: string) => ({
  href: url,
  target: "_blank" as const,
  rel: "nofollow sponsored" as const,
  "data-cta": "roundup-cta",
});

// ─── JSON-LD ──────────────────────────────────────────────────────────────────

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/guides` },
    { "@type": "ListItem", position: 3, name: "Best AI Sales Tools 2026", item: `${SITE_URL}/best-ai-sales-tools` },
  ],
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Best AI Sales Tools 2026",
  description: "A comparison of the best AI sales and automation tools in 2026: GoHighLevel, AiSDR, Reply.io and FullEnrich.",
  numberOfItems: 4,
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "GoHighLevel", description: "AI-powered all-in-one platform combining CRM, marketing automation, sales pipelines, funnels and reputation management. Best for agencies and SMBs. From $97/month, with a 14-day free trial.", url: `${SITE_URL}/gohighlevel` },
    { "@type": "ListItem", position: 2, name: "AiSDR", description: "AI sales development rep that automates B2B outbound: finds prospects, personalises outreach across email, LinkedIn and phone, and books meetings. From $250/month on the Solo plan, with the popular Explore plan $900/month billed quarterly.", url: `${SITE_URL}/aisdr` },
    { "@type": "ListItem", position: 3, name: "Reply.io", description: "AI-first sales engagement platform for multichannel outbound: sequences across email, LinkedIn, calls and SMS, AI SDR agents, built-in B2B data and inbox warm-up. No free plan; paid from $49/user/month with a 14-day free trial. Best for teams that want hands-on control of their outreach.", url: `${SITE_URL}/replyio` },
    { "@type": "ListItem", position: 4, name: "FullEnrich", description: "Waterfall B2B contact enrichment that queries 15+ data sources to find verified emails and mobile phone numbers. Credit-based, with a free 50-credit trial and paid plans from $55/month. Best for sales and RevOps teams whose outbound stalls on bad contact data.", url: `${SITE_URL}/fullenrich` },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What are the best AI sales tools in 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Four of the strongest AI sales and automation tools in 2026 are GoHighLevel, AiSDR, Reply.io and FullEnrich, and they sit at different points in the sales stack. FullEnrich is a waterfall enrichment tool that finds verified emails and mobile numbers. Reply.io is an AI sales engagement platform for running your own multichannel outbound. AiSDR is a done-for-you AI sales development rep that prospects and books meetings. GoHighLevel is an all-in-one CRM, marketing automation and sales platform, best for agencies and SMBs replacing a stack of tools.",
      },
    },
    {
      "@type": "Question",
      name: "GoHighLevel vs AiSDR: which should I choose?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Choose GoHighLevel if you want one platform to run your CRM, marketing automation, funnels and follow-up, especially as an agency or SMB consolidating several tools. Choose AiSDR if your bottleneck is outbound pipeline and you want an AI rep to prospect, personalise outreach across email, LinkedIn and phone, and book meetings. Many teams use them for different stages: GoHighLevel to manage and nurture, AiSDR to generate new conversations.",
      },
    },
    {
      "@type": "Question",
      name: "How much do AI sales tools cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "GoHighLevel starts from $97/month with a 14-day free trial and no credit card, while AiSDR starts from $250/month on its Solo plan (its popular Explore plan is $900/month billed quarterly) with unlimited seats and no long-term contract. Pricing can change, so check the current figures on each provider before you commit.",
      },
    },
    {
      "@type": "Question",
      name: "Does GoHighLevel have a free trial?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. GoHighLevel offers a 14-day free trial and does not require a credit card to start. It is the recommended way to explore the CRM, automation, funnels and AI features and decide whether the all-in-one approach fits your business.",
      },
    },
  ],
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  datePublished: "2026-07-05",
  dateModified: "2026-07-06",
  name: seoConfig.bestAiSalesTools.title,
  description: seoConfig.bestAiSalesTools.description,
  url: `${SITE_URL}/best-ai-sales-tools`,
  breadcrumb: breadcrumbSchema,
  mainEntity: faqSchema,
};

// ─── Palette ──────────────────────────────────────────────────────────────────

const ACCENT    = "#0a7c42";
const ACCENT_LT = "#0a7c42";

// ─── Comparison data ──────────────────────────────────────────────────────────

const tools = [
  {
    name: "GoHighLevel",
    logo: "gohighlevel",
    badge: "Best All-in-One Platform",
    badgeColor: ACCENT_LT,
    href: GOHIGHLEVEL_URL,
    internalHref: "/gohighlevel",
    tagline: "AI-powered CRM, marketing and sales in one platform",
    bestFor: "Marketing agencies and SMBs replacing a stack of tools",
    price: "From US$97/mo; Unlimited US$557/mo",
    trial: "14-day free trial, no credit card",
    pros: [
      "CRM, email and SMS automation, funnels and pipelines in one login",
      "Agency sub-accounts for managing multiple clients",
      "Built-in AI: voice, conversation and content",
      "Reputation management and review requests included",
      "14-day free trial with no credit card to start",
    ],
    cons: [
      "Broad platform means a real setup and learning curve",
      "Overkill if you only need one narrow feature",
    ],
  },
  {
    name: "AiSDR",
    logo: "aisdr",
    badge: "Best AI Outbound SDR",
    badgeColor: "#0a7c42",
    href: AISDR_URL,
    internalHref: "/aisdr",
    tagline: "An AI sales rep that builds pipeline without hiring",
    bestFor: "Revenue teams and founders who want pipeline without hiring SDRs",
    price: "From US$250/mo (Solo); US$900/mo Explore",
    trial: "Unlimited seats, no long-term contract",
    pros: [
      "Finds in-market prospects using intent signals",
      "Researches each prospect and personalises outreach",
      "Multi-channel sequences across email, LinkedIn and phone",
      "Qualifies replies and books meetings automatically",
      "Integrates with HubSpot and Salesforce",
    ],
    cons: [
      "A larger monthly commitment aimed at active B2B sellers",
      "Needs a clear ideal customer profile to perform well",
    ],
  },
  {
    name: "Reply.io",
    logo: "replyio",
    badge: "Best Sales Engagement Platform",
    badgeColor: "#0a7c42",
    href: REPLY_IO_URL,
    internalHref: "/replyio",
    tagline: "Run your own multichannel outbound, powered by AI",
    bestFor: "SMB and mid-market teams that want hands-on control of outreach",
    price: "No free plan; from US$49/user/mo",
    trial: "14-day free trial to start",
    pros: [
      "Sequences across email, LinkedIn, calls and SMS",
      "AI SDR agents draft and personalise messages",
      "Built-in B2B data and email finder",
      "Inbox warm-up and verification for deliverability",
      "Integrates with HubSpot, Salesforce and Pipedrive",
    ],
    cons: [
      "A self-serve platform you build and tune yourself",
      "Results depend on your list quality and sequences",
    ],
  },
  {
    name: "FullEnrich",
    logo: "fullenrich",
    badge: "Best for Contact Data",
    badgeColor: "#0a7c42",
    href: FULLENRICH_URL,
    internalHref: "/fullenrich",
    tagline: "Waterfall enrichment for verified emails and mobile numbers",
    bestFor: "Sales and RevOps teams whose outbound stalls on bad data",
    price: "Free trial (50 credits); from US$55/mo",
    trial: "50 free credits to start",
    pros: [
      "Waterfall enrichment across 15+ data sources",
      "Strong at finding mobile numbers, not just emails",
      "Bulk enrichment from CSV or your CRM",
      "Integrates with HubSpot, Clay, Zapier and LinkedIn",
      "Credits mean you mostly pay for results found",
    ],
    cons: [
      "A data layer, not a sending tool: feeds your stack",
      "Coverage varies by contact and region",
    ],
  },
];

const features = [
  { label: "What it is",     ghl: "All-in-one CRM & marketing platform", aisdr: "AI sales development rep" },
  { label: "Best for",       ghl: "Agencies & SMBs",                     aisdr: "Revenue teams & founders" },
  { label: "Core job",       ghl: "Manage, automate & nurture",          aisdr: "Prospect & book meetings" },
  { label: "Channels",       ghl: "Email, SMS, funnels, calls",          aisdr: "Email, LinkedIn, phone" },
  { label: "AI features",    ghl: "Voice, conversation, content",        aisdr: "Prospecting, research, messaging" },
  { label: "Integrations",   ghl: "Broad app ecosystem",                 aisdr: "HubSpot & Salesforce" },
  { label: "Pricing", ghl: "From $97/mo",          aisdr: "From $900/mo quarterly" },
  { label: "Trial / terms",  ghl: "14-day free trial",                   aisdr: "No long-term contract" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function BestAiSalesToolsPage() {
  return (
    <ConsumerShell>
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,rgba(10,167,181,0.12),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(34,192,205,0.04),transparent_55%)]" />
      </div>

      <main id="main-content" className="relative mx-auto max-w-5xl px-5 sm:px-8 lg:px-12 pb-24 pt-14 sm:pt-18">

        {/* Breadcrumb */}
        <nav className="mb-10 flex items-center gap-2 text-sm text-[#3d4b44]">
          <Link href="/" className="hover:text-[#2b362f] transition-colors">Refer Labs</Link>
          <span>/</span>
          <Link href="/guides" className="hover:text-[#2b362f] transition-colors">Guides</Link>
          <span>/</span>
          <span className="text-[#2b362f]">Best AI Sales Tools 2026</span>
        </nav>


        {/* Hero */}
        <div className="mb-16 sm:mb-20 max-w-3xl">
          <p className="nw-kicker mb-4">AI Sales & Automation</p>
          <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-black leading-[1.07] text-[#10251b] mb-5 tracking-tight">
            Best AI Sales Tools in 2026:{" "}
            <span style={{ color: ACCENT_LT }}>GoHighLevel, AiSDR, Reply.io & FullEnrich</span>
          </h1>
          <p className="text-[#3d4b44] text-base sm:text-lg leading-relaxed mb-8 max-w-2xl">
            We compared four of the strongest AI sales and automation tools on what they actually do, who they suit, and what they cost. Each sits at a different point in the sales stack, so the right pick depends on your bottleneck. Our verdict is below.
          </p>
          <a
            {...aff(GOHIGHLEVEL_URL)}
            className="inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 shadow-lg"
            style={{ background: ACCENT, boxShadow: `0 8px 32px ${ACCENT}30` }}
          >
            Try GoHighLevel Free
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        {/* Our Picks */}
        <section id="comparison" className="border-t border-[#0a7c42]/10 py-12 sm:py-14">
          <h2 className="text-2xl sm:text-3xl font-black text-[#10251b] mb-3">Our Four Picks</h2>
          <p className="text-[#3d4b44] text-sm sm:text-base leading-relaxed max-w-2xl mb-6">
            These tools sit at different points in the sales stack. FullEnrich is the data layer that finds verified emails and mobile numbers. Reply.io is the sales engagement platform your team drives to run multichannel outbound. AiSDR is the done-for-you AI rep that generates conversations and books meetings. GoHighLevel is the all-in-one platform to run and automate your CRM, marketing and follow-up. Plenty of teams use more than one for different jobs.
          </p>
          <p className="text-[#3d4b44] text-sm sm:text-base leading-relaxed max-w-2xl mb-8">
            Pricing below is indicative and correct. Providers can change their plans, so verify the current figures before you commit.
          </p>
          <a
            {...aff(GOHIGHLEVEL_URL)}
            className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 shadow-lg"
            style={{ background: ACCENT, boxShadow: `0 8px 32px ${ACCENT}30` }}
          >
            Start GoHighLevel Free
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </section>

        {/* Tool Cards */}
        <section className="border-t border-[#0a7c42]/10 py-12 sm:py-14 space-y-8">
          {tools.map((t) => (
            <div
              key={t.name}
              id={t.name.toLowerCase().replace(/[^a-z]/g, "")}
              className="rounded-2xl border border-[#e5e9e7] bg-[#f5f8f6] p-7 sm:p-8"
            >
              <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#e5e9e7] bg-white p-1.5 flex-shrink-0">
                    <Image
                      src={`/logos/${t.logo}.png`}
                      alt={`${t.name} logo`}
                      width={40}
                      height={40}
                      className="h-9 w-9 object-contain"
                    />
                  </span>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-xl font-black text-[#10251b]">{t.name}</h3>
                    </div>
                    <p className="text-[#3d4b44] text-sm">{t.tagline}</p>
                  </div>
                </div>
                <a
                  {...aff(t.href)}
                  className="inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold text-white transition-all hover:opacity-90"
                  style={{ background: ACCENT }}
                >
                  Try {t.name}
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>

              <div className="grid sm:grid-cols-3 gap-4 mb-6 text-sm">
                <div className="rounded-xl bg-white border border-[#e5e9e7] p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-[#9aa39c] mb-1">Best For</p>
                  <p className="text-[#2b362f] font-medium">{t.bestFor}</p>
                </div>
                <div className="rounded-xl bg-white border border-[#e5e9e7] p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-[#9aa39c] mb-1">Price</p>
                  <p className="text-[#2b362f] font-medium">{t.price}</p>
                </div>
                <div className="rounded-xl bg-white border border-[#e5e9e7] p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-[#9aa39c] mb-1">Terms</p>
                  <p className="text-[#2b362f] font-medium">{t.trial}</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: ACCENT_LT }}>Strengths</p>
                  <ul className="space-y-2">
                    {t.pros.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-[#2b362f]">
                        <CheckCircle2 className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: ACCENT_LT }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-red-400/70 mb-3">Trade-offs</p>
                  <ul className="space-y-2">
                    {t.cons.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-[#2b362f]">
                        <XCircle className="h-4 w-4 flex-shrink-0 mt-0.5 text-red-400/50" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  href={t.internalHref}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0a7c42] hover:text-[#086536] transition-colors"
                >
                  Read the full {t.name} review
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </section>

        {/* Feature Table */}
        <section id="feature-table" className="border-t border-[#0a7c42]/10 py-12 sm:py-14">
          <h2 className="text-xl sm:text-2xl font-black text-[#10251b] mb-8">Side-by-Side Comparison</h2>
          <div className="overflow-x-auto -mx-5 px-5 sm:mx-0 sm:px-0">
            <table className="w-full min-w-[560px] text-sm border-collapse">
              <thead>
                <tr>
                  <th className="text-left pb-3 pr-4 text-[11px] font-semibold uppercase tracking-widest text-[#9aa39c]">Feature</th>
                  {["GoHighLevel", "AiSDR"].map((col) => (
                    <th key={col} className="text-left pb-3 pr-4 text-[11px] font-semibold uppercase tracking-widest" style={{ color: ACCENT_LT }}>
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {features.map((row, i) => (
                  <tr key={row.label} className={i % 2 === 0 ? "bg-[#f5f8f6]" : ""}>
                    <td className="py-3 pr-4 text-[#3d4b44] font-medium">{row.label}</td>
                    <td className="py-3 pr-4 text-[#2b362f] font-medium">{row.ghl}</td>
                    <td className="py-3 pr-4 text-[#3d4b44]">{row.aisdr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* How to choose */}
        <section className="border-t border-[#0a7c42]/10 py-12 sm:py-14">
          <h2 className="text-xl sm:text-2xl font-black text-[#10251b] mb-5">How to Choose</h2>
          <div className="space-y-4 text-[#3d4b44] text-sm sm:text-base leading-relaxed max-w-2xl">
            <p>
              Start with your bottleneck. If the problem is that your tools are scattered and follow-up falls through the cracks, GoHighLevel is the pick: one platform for CRM, automation, funnels and reputation management, with a 14-day free trial to test it. It is especially well suited to agencies managing multiple clients through sub-accounts.
            </p>
            <p>
              If the problem is that you simply do not have enough qualified conversations, AiSDR is the pick: an AI sales development rep that prospects, personalises outreach across email, LinkedIn and phone, and books meetings, without you hiring and ramping a team. It performs best when you already know exactly who you sell to.
            </p>
            <p>
              If the problem is upstream of all of that, bad or missing contact data, start with FullEnrich: its waterfall enrichment finds verified emails and mobile numbers so your outreach reaches real people. And if you want to run outbound yourself rather than outsource it to an AI rep, Reply.io gives your team the multichannel sequencing, AI writing and deliverability tools in one platform.
            </p>
            <p>
              These are not mutually exclusive; they stack. A common setup is FullEnrich supplying clean data, Reply.io or AiSDR running the outreach, and GoHighLevel managing and nurturing everything that converts. Whichever you choose, verify the current pricing on the provider before you commit, since the figures on this page are indicative.
            </p>
          </div>
        </section>

        <MatchPrompt
          href="/ai-sales-tools-quiz"
          title="Not sure which tool you need?"
          sub="Answer one or two quick questions and get the AI sales tool that fixes your actual bottleneck, and why. About 30 seconds."
          cta="Take the 30-second match"
          dataCta="ai-match-prompt"
        />

        {/* FAQ */}
        <section id="faq" className="border-t border-[#0a7c42]/10 py-12 sm:py-14">
          <h2 className="text-xl sm:text-2xl font-black text-[#10251b] mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6 max-w-2xl">
            {[
              {
                q: "What are the best AI sales tools in 2026?",
                a: "Four of the strongest AI sales and automation tools in 2026 are GoHighLevel, AiSDR, Reply.io and FullEnrich, and they sit at different points in the sales stack. FullEnrich is a waterfall enrichment tool that finds verified emails and mobile numbers. Reply.io is an AI sales engagement platform for running your own multichannel outbound. AiSDR is a done-for-you AI sales development rep that prospects and books meetings. GoHighLevel is an all-in-one CRM, marketing and sales platform, best for agencies and SMBs.",
              },
              {
                q: "GoHighLevel vs AiSDR: which should I choose?",
                a: "Choose GoHighLevel if you want one platform to run your CRM, marketing automation, funnels and follow-up, especially as an agency or SMB consolidating tools. Choose AiSDR if your bottleneck is outbound pipeline and you want an AI rep to prospect, personalise outreach across email, LinkedIn and phone, and book meetings.",
              },
              {
                q: "How much do AI sales tools cost?",
                a: "GoHighLevel starts from $97/month with a 14-day free trial and no credit card, while AiSDR starts from $900/month billed quarterly with unlimited seats and no long-term contract. Pricing can change, so verify the current figures on each provider before you commit.",
              },
              {
                q: "Does GoHighLevel have a free trial?",
                a: "Yes. GoHighLevel offers a 14-day free trial and does not require a credit card to start. It is the recommended way to explore the CRM, automation, funnels and AI features and decide whether the all-in-one approach fits your business.",
              },
            ].map(({ q, a }, i) => (
              <div key={i} className="border-b border-[#e5e9e7] pb-6">
                <h3 className="text-sm font-bold text-[#10251b] mb-2">{q}</h3>
                <p className="text-sm text-[#3d4b44] leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="border-t border-[#0a7c42]/10 pt-14 sm:pt-16 text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-[#10251b] mb-3">
            Ready to Add AI to Your Sales?{" "}
            <span style={{ color: ACCENT_LT }}>Start with GoHighLevel.</span>
          </h2>
          <p className="text-[#3d4b44] text-sm max-w-md mx-auto mb-7 leading-relaxed">
            14-day free trial, no credit card. Or read the full reviews to compare GoHighLevel, AiSDR, Reply.io and FullEnrich in detail.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              {...aff(GOHIGHLEVEL_URL)}
              className="inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 shadow-lg"
              style={{ background: ACCENT, boxShadow: `0 8px 32px ${ACCENT}30` }}
            >
              Try GoHighLevel Free
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              {...aff(AISDR_URL)}
              className="inline-flex items-center justify-center gap-2 rounded-xl border px-7 py-3.5 text-sm font-semibold text-[#2b362f] transition-all hover:text-[#10251b]"
              style={{ borderColor: `${ACCENT}30` }}
            >
              See AiSDR
            </a>
          </div>

          {/* Related guides */}
          <div className="mt-14 text-left max-w-2xl mx-auto">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#9aa39c] mb-5">Related</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { href: "/gohighlevel", label: "GoHighLevel Review 2026" },
                { href: "/aisdr", label: "AiSDR Review" },
                { href: "/replyio", label: "Reply.io Review" },
                { href: "/fullenrich", label: "FullEnrich Review" },
                { href: "/for-business", label: "For Business: Partner With Refer Labs" },
                { href: "/guides", label: "All Comparison Guides" },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-2 text-sm text-[#3d4b44] hover:text-[#2b362f] transition-colors"
                >
                  <ArrowRight className="h-3.5 w-3.5 flex-shrink-0" style={{ color: ACCENT }} />
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </section>

      </main>
      <StickyCta href={GOHIGHLEVEL_URL} product="GoHighLevel · all-in-one platform" label="Try free" />
    </ConsumerShell>
  );
}
