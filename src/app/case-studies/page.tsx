"use client";

import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ArrowRight, TrendingUp, Users, Briefcase, Building2, Heart } from "lucide-react";

type MetricCard = {
  title: string;
  metric: string;
  caption: string;
};

type AccordionItem = {
  title: string;
  content: string;
};

type IndustryCard = {
  industry: string;
  whyItWins: string;
  bestTrigger: string;
  icon: typeof Building2;
};

const luxuryMetrics: MetricCard[] = [
  { title: "Referral Revenue", metric: "28%", caption: "Of monthly revenue sourced from referrals" },
  { title: "UGC Lift", metric: "4×", caption: "Increase in customer photo + reel submissions" },
  { title: "Margin Impact", metric: "+9% AOV", caption: "Rewards protect pricing vs discounts" },
];

const luxuryAccordion: AccordionItem[] = [
  { title: "Trigger", content: "Post-purchase SMS and packaging inserts delivered personalised referral QR codes the moment customers received their order." },
  { title: "Share", content: "Customers shared referral links into private WhatsApp groups, Instagram stories, and DMs." },
  { title: "Track", content: "Every purchase was attributed via referral_code synced across Shopify and Klaviyo — no broken links, no manual matching." },
  { title: "Reward", content: "Store credits unlocked instantly inside Refer Labs dashboards and synced to CRM profiles." },
];

const professionalMetrics: MetricCard[] = [
  { title: "Qualified Leads", metric: "+42%", caption: "Quarter-on-quarter growth" },
  { title: "Close Rate", metric: "3.1×", caption: "Versus cold inbound leads" },
  { title: "Advisor Adoption", metric: "93%", caption: "Prompts baked into daily workflows" },
];

const professionalAccordion: AccordionItem[] = [
  { title: "Trigger", content: "Advisers logged \"delighted client\" moments inside Refer Labs after reviews or milestones." },
  { title: "Share", content: "Clients received a co-branded referral page and introduce-a-friend email with zero friction." },
  { title: "Track", content: "Referrals flowed directly into HubSpot with advisor attribution and deal stage visibility." },
  { title: "Reward", content: "Referrers received strategy session credits with a full compliance audit trail for finance." },
];

const saasMetrics: MetricCard[] = [
  { title: "Pipeline Lift", metric: "+37%", caption: "Net-new opportunities from referrals" },
  { title: "Sales Cycle", metric: "−44 days", caption: "Deals arrived with internal champions" },
  { title: "Expansion Revenue", metric: "+18%", caption: "Referrals unlocked multi-team deals" },
];

const saasAccordion: AccordionItem[] = [
  { title: "Trigger", content: "Power users hit product success milestones (activation, NPS, feature adoption)." },
  { title: "Share", content: "Champions selected who to introduce; Refer Labs generated a ready-to-forward brief." },
  { title: "Track", content: "Introductions logged into Salesforce with referral_code and Slack alerts for AE + CSM." },
  { title: "Reward", content: "Champions unlocked VIP roadmap access and credits once deals closed." },
];

const industries: IndustryCard[] = [
  {
    industry: "Financial Advisers & Accountants",
    whyItWins: "Trust-driven, high LTV, natural intro behaviour",
    bestTrigger: "Review meetings, EOFY, life events",
    icon: Briefcase,
  },
  {
    industry: "Agencies & Consultants",
    whyItWins: "Founder-led sales + network effects",
    bestTrigger: "Project completion, wins, renewals",
    icon: Users,
  },
  {
    industry: "E-commerce (Premium / DTC)",
    whyItWins: "Social proof + community sharing",
    bestTrigger: "Unboxing, reorder, loyalty milestones",
    icon: TrendingUp,
  },
  {
    industry: "SaaS (B2B & Vertical)",
    whyItWins: "Champion-led buying and expansion",
    bestTrigger: "Activation, NPS, usage thresholds",
    icon: Building2,
  },
  {
    industry: "Health, Wellness & Clinics",
    whyItWins: "Word-of-mouth already exists, just untracked",
    bestTrigger: "Outcome milestones, reviews, follow-ups",
    icon: Heart,
  },
];

const platformCapabilities: AccordionItem[] = [
  {
    title: "Capture & Code",
    content: "Refer Labs issues airtight referral_code and discount_code pairs per ambassador. Codes sync across CRM, campaigns, landing pages, packaging, and checkout.",
  },
  {
    title: "Triggers & Asks",
    content: "Email, SMS, in-app prompts, and CS playbooks fire the moment someone hits a success milestone — always using the same referral code.",
  },
  {
    title: "A/B Test Incentives",
    content: "Test copy, rewards, and CTAs directly inside Refer Labs. Automatically route champions into the highest-performing variant.",
  },
  {
    title: "Referrer Engagement",
    content: "Live dashboards, leaderboards, surprise rewards, and automated nudges keep advocates active without manual chasing.",
  },
  {
    title: "Prospect Experience",
    content: "Personalised referral pages, instant booking, or discount redemption — every conversion flows straight into your funnel with metadata intact.",
  },
  {
    title: "Revenue & Optimisation",
    content: "Finance sees referral-sourced revenue, payouts, and ROI. Double down on what works, pause what doesn't.",
  },
];

const timelineCards = [
  { period: "Weeks 1–2", task: "Map customer journeys, define success triggers, import ambassadors." },
  { period: "Weeks 2–3", task: "Configure campaigns, referral pages, CRM syncs, and reward logic." },
  { period: "Weeks 3–4", task: "Train teams, activate automation, launch across email, SMS, and product." },
];

function MetricCard({ title, metric, caption }: MetricCard) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
      <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">{title}</p>
      <p className="text-4xl font-black text-teal-700 mb-1">{metric}</p>
      <p className="text-sm text-slate-600">{caption}</p>
    </div>
  );
}

function AccordionSection({ items }: { items: AccordionItem[] }) {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (title: string) => {
    setOpenItems(prev =>
      prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title]
    );
  };

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <Collapsible
          key={item.title}
          open={openItems.includes(item.title)}
          onOpenChange={() => toggleItem(item.title)}
        >
          <CollapsibleTrigger className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-5 py-4 text-left hover:bg-slate-50 transition-colors">
            <span className="text-base font-bold text-slate-900">{item.title}</span>
            <ChevronDown
              className={cn(
                "h-5 w-5 text-slate-500 transition-transform duration-200",
                openItems.includes(item.title) && "rotate-180"
              )}
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="px-5 py-4 text-sm text-slate-600 leading-relaxed">
            {item.content}
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  );
}

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

        {/* Page Title Section */}
        <section className="mb-12 text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 leading-tight">
            Case Studies
          </h1>
          <p className="text-xl sm:text-2xl font-semibold text-slate-700 max-w-4xl mx-auto leading-snug">
            Referral programs that compound trust, pipeline, and revenue
          </p>
          <p className="text-base text-slate-600 max-w-3xl mx-auto">
            See how Refer Labs links referral codes to campaigns, CRM, and payouts so every introduction is trackable, rewardable, and repeatable — no guesswork.
          </p>
        </section>

        {/* Tabs Section */}
        <Tabs defaultValue="luxury" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 gap-2 bg-slate-100 p-2 rounded-2xl">
            <TabsTrigger value="luxury" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md">
              Luxury & Lifestyle E-commerce
            </TabsTrigger>
            <TabsTrigger value="professional" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md">
              Professional Services
            </TabsTrigger>
            <TabsTrigger value="saas" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md">
              B2B SaaS
            </TabsTrigger>
            <TabsTrigger value="industries" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md">
              Industries That Win
            </TabsTrigger>
            <TabsTrigger value="platform" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md">
              Referral OS
            </TabsTrigger>
          </TabsList>

          {/* Tab 1: Luxury & Lifestyle */}
          <TabsContent value="luxury" className="space-y-8">
            <div className="text-center">
              <p className="text-2xl font-bold text-slate-900">
                Turn every unboxing, DM, and &quot;I love this&quot; moment into your next customers.
              </p>
            </div>

            {/* Metrics */}
            <div className="grid gap-6 md:grid-cols-3">
              {luxuryMetrics.map((metric) => (
                <MetricCard key={metric.title} {...metric} />
              ))}
            </div>

            {/* How It Worked */}
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">How It Worked</h3>
              <AccordionSection items={luxuryAccordion} />
            </div>

            {/* Proof Statement */}
            <div className="rounded-2xl bg-gradient-to-br from-teal-50 to-cyan-50 border border-teal-200 p-8">
              <p className="text-lg text-slate-800 leading-relaxed italic">
                By unifying referral codes across Shopify, Klaviyo, packaging, and SMS, the brand finally saw which advocates, launches, and creatives actually moved revenue — then doubled down on those cohorts.
              </p>
            </div>
          </TabsContent>

          {/* Tab 2: Professional Services */}
          <TabsContent value="professional" className="space-y-8">
            <div className="text-center">
              <p className="text-2xl font-bold text-slate-900">
                Turn warm introductions into a predictable, compliant pipeline channel.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {professionalMetrics.map((metric) => (
                <MetricCard key={metric.title} {...metric} />
              ))}
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">How It Worked</h3>
              <AccordionSection items={professionalAccordion} />
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 p-8">
              <p className="text-lg text-slate-800 leading-relaxed italic">
                Instead of hoping advisers remembered to ask, the firm automated prompts, assets, approvals, and tracking. Compliance loved the audit trail. GTM loved the pipeline.
              </p>
            </div>
          </TabsContent>

          {/* Tab 3: B2B SaaS */}
          <TabsContent value="saas" className="space-y-8">
            <div className="text-center">
              <p className="text-2xl font-bold text-slate-900">
                Let your power users become your highest-converting outbound team.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {saasMetrics.map((metric) => (
                <MetricCard key={metric.title} {...metric} />
              ))}
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">How It Worked</h3>
              <AccordionSection items={saasAccordion} />
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 p-8">
              <p className="text-lg text-slate-800 leading-relaxed italic">
                Referrals stopped being random. Product, customer success, and sales all worked from the same referral data — so forecasting, follow-ups, and rewards finally aligned.
              </p>
            </div>
          </TabsContent>

          {/* Tab 4: Industries */}
          <TabsContent value="industries" className="space-y-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {industries.map((industry) => (
                <div
                  key={industry.industry}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-12 w-12 rounded-xl bg-teal-100 flex items-center justify-center">
                      <industry.icon className="h-6 w-6 text-teal-700" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">{industry.industry}</h3>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">
                        Why It Wins
                      </p>
                      <p className="text-sm text-slate-700">{industry.whyItWins}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">
                        Best Trigger
                      </p>
                      <p className="text-sm text-slate-700">{industry.bestTrigger}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 p-8 text-center">
              <p className="text-xl font-semibold text-slate-900">
                If your customers already recommend you — Refer Labs turns that behaviour into a measurable, scalable acquisition channel.
              </p>
            </div>
          </TabsContent>

          {/* Tab 5: Platform */}
          <TabsContent value="platform" className="space-y-8">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Platform Capabilities</h3>
              <AccordionSection items={platformCapabilities} />
            </div>

            {/* Deployment Playbook */}
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Deployment Playbook</h3>
              <div className="grid gap-6 md:grid-cols-3">
                {timelineCards.map((card) => (
                  <div
                    key={card.period}
                    className="rounded-2xl border border-teal-200 bg-gradient-to-br from-teal-50 to-cyan-50 p-6"
                  >
                    <p className="text-sm font-bold uppercase tracking-wide text-teal-700 mb-2">
                      {card.period}
                    </p>
                    <p className="text-sm text-slate-700 leading-relaxed">{card.task}</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Bottom CTA */}
        <div className="mt-12 sticky bottom-6 z-10">
          <div className="rounded-3xl border-2 border-teal-200 bg-gradient-to-br from-white to-teal-50 p-8 shadow-2xl">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="text-center sm:text-left">
                <p className="text-2xl font-bold text-slate-900 mb-2">
                  Turn your customers into a measurable growth channel.
                </p>
                <p className="text-sm text-slate-600">
                  Launch your referral program in under 5 minutes.
                </p>
              </div>
              <Link
                href="/login"
                className={cn(
                  buttonVariants({ variant: "cta" }),
                  "text-lg font-bold px-8 py-6 shadow-xl whitespace-nowrap"
                )}
              >
                Start Getting Referrals
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
