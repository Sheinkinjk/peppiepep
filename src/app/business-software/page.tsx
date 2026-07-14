import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import MatchPrompt from "@/components/consumer/MatchPrompt";
import NewsletterSignup from "@/components/consumer/NewsletterSignup";

export const metadata = generateSEOMetadata(seoConfig.businessSoftware);

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Business software", item: `${SITE_URL}/business-software` },
  ],
};

const hubs = [
  { href: "/compare/ai-sales-tools", label: "Sales & CRM", desc: "Contact data, outreach, AI reps and CRMs, sorted by the job you need done." },
  { href: "/compare/sales-outreach", label: "Sales & outreach", desc: "Find leads and reach them across email, LinkedIn and more." },
  { href: "/compare/business-phone", label: "Business phone", desc: "Cloud calling and virtual numbers for sales and support teams." },
  { href: "/compare/hr-payroll", label: "HR & payroll", desc: "Run pay, hiring, training and people admin from one place." },
  { href: "/compare/payments", label: "Payments & bookkeeping", desc: "Get paid across borders, and keep the books straight." },
  { href: "/compare/ai-tools", label: "AI tools", desc: "AI assistants, voice and branding, sorted by what they do." },
  { href: "/compare/lead-generation", label: "Popups & quizzes", desc: "On-site popups, interactive quizzes and assessments that capture leads." },
];

const tools = [
  { href: "/nutshell", label: "Nutshell", desc: "Easy sales CRM with email marketing built in." },
  { href: "/gohighlevel", label: "GoHighLevel", desc: "All-in-one CRM, marketing automation and funnels." },
  { href: "/cloudtalk", label: "CloudTalk", desc: "AI call-centre and business phone for sales and support." },
  { href: "/dext", label: "Dext", desc: "Bookkeeping automation that syncs to Xero and QuickBooks." },
  { href: "/lindy", label: "Lindy", desc: "AI assistant that automates inbox, scheduling and CRM." },
  { href: "/employmenthero", label: "Employment Hero", desc: "Australian HR, payroll and employment platform." },
  { href: "/pipedrive", label: "Pipedrive", desc: "Visual sales CRM with pipeline and automation." },
  { href: "/activecampaign", label: "ActiveCampaign", desc: "Email marketing with powerful automation and a CRM." },
  { href: "/alohi", label: "Alohi", desc: "Sign.Plus e-signatures and Fax.Plus online fax." },
  { href: "/databox", label: "Databox", desc: "KPI dashboards that pull 130+ data sources into one view." },
  { href: "/meetgeek", label: "MeetGeek", desc: "AI meeting notes for Zoom, Meet and Teams calls." },
  { href: "/cometchat", label: "CometChat", desc: "Developer SDKs to add in-app chat, voice and video." },
  { href: "/flocksy", label: "Flocksy", desc: "Unlimited graphic design from a dedicated team, flat fee." },
];

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Business software categories",
  itemListElement: hubs.map((h, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: h.label,
    url: `${SITE_URL}${h.href}`,
  })),
};

export default function BusinessSoftwarePage() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />

      <main id="main-content" className="mx-auto max-w-6xl px-5 pb-20 pt-12 sm:px-8 sm:pt-16">
        <nav className="mb-7 flex items-center gap-2 text-sm text-[#9aa39c]">
          <Link href="/" className="hover:text-[#0a7c42]">Refer Labs</Link>
          <span>/</span>
          <span className="text-[#2b362f]">Business software</span>
        </nav>

        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0a7c42]">Independent comparisons</p>
          <h1 className="mt-4 text-4xl font-bold leading-[1.06] tracking-[-0.01em] text-[#10251b] sm:text-5xl">
            Business software, compared
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-[#2b362f]">
            The tools that run a business, sales and CRM, phone, HR and payroll, payments, bookkeeping and AI, sorted
            by the job you need done. Researched by people, disclosed on every page, and never sold to the highest
            bidder.
          </p>
        </div>

        {/* Category hubs */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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

        {/* Quiz nudge */}
        <div className="mt-8">
          <MatchPrompt
            href="/ai-sales-tools-quiz"
            title="Not sure which sales tool or CRM you need?"
            sub="Answer one or two quick questions and get the tool that fixes your actual bottleneck, with an honest reason why. About 30 seconds."
            cta="Take the 30-second match"
            dataCta="business-software-match-prompt"
          />
        </div>

        {/* Popular tools */}
        <section className="mt-6 border-t border-[#e5e9e7] py-12">
          <div className="grid gap-8 lg:grid-cols-[220px_1fr] lg:gap-14">
            <div className="lg:pt-1">
              <h2 className="text-xl font-bold text-[#10251b]">Popular tools</h2>
              <p className="mt-2 text-[13px] leading-relaxed text-[#9aa39c]">Individual, independent reviews of the tools people search for most.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {tools.map((t) => (
                <Link key={t.href} href={t.href} className="group rounded-xl border border-[#e5e9e7] bg-[#f5f8f6] p-5 transition-all hover:-translate-y-0.5 hover:border-[#0a7c42]/40">
                  <h3 className="text-[15px] font-bold text-[#10251b] group-hover:text-[#0a7c42]">{t.label}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#3d4b44]">{t.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <div className="border-t border-[#e5e9e7] pt-10">
          <NewsletterSignup variant="band" source="business-software" />
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
