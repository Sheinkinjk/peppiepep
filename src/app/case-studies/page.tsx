import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

type CaseStudy = {
  industry: string;
  tagline: string;
  highlight: string;
  metrics: { label: string; value: string; detail: string }[];
  flows: { stage: string; description: string }[];
  story: string;
};

const CASE_STUDIES: CaseStudy[] = [
  {
    industry: "Luxury e-commerce",
    tagline: "Turn every unboxing into your next three customers.",
    highlight:
      "Refer Labs stitched referral links into the post-purchase journey, so every 'I love this' moment triggered ready-to-share links, SMS nudges, and CRM follow-ups.",
    metrics: [
      { label: "Referral orders", value: "28% of monthly revenue", detail: "Tracked end-to-end with double-sided credit" },
      { label: "UGC volume", value: "4× photo & reel submissions", detail: "Champions auto-tagged via referral codes" },
      { label: "Margin impact", value: "+9% AOV", detail: "Credit rewards protect pricing vs deep discounting" },
    ],
    flows: [
      { stage: "Trigger", description: "Post-purchase SMS + packaging insert with personalised referral QR." },
      { stage: "Share", description: "Ambassadors push their link to VIP WhatsApp groups and IG stories." },
      { stage: "Track", description: "Friends buy, Refer Labs auto attributes via referral_code and syncs to Klaviyo." },
      { stage: "Reward", description: "Store credits unlock instantly in Refer Labs dashboards + CRM profiles." },
    ],
    story:
      "By unifying referral codes across Shopify, Klaviyo, and our dashboard, the brand finally saw which advocates, launches, and creatives actually moved revenue—then doubled down on those cohorts.",
  },
  {
    industry: "Professional services",
    tagline: "Make warm intros a predictable pipeline channel.",
    highlight:
      "Advisers used Refer Labs to send clients one-click referral kits at review milestones; every intro flowed through a compliant intake form and into the CRM.",
    metrics: [
      { label: "Qualified leads", value: "+42% per quarter", detail: "Ideal clients sourced from top-tier accounts" },
      { label: "Close rate", value: "3.1× vs cold leads", detail: "Referred prospects already trusted the firm" },
      { label: "Advisor adoption", value: "93%", detail: "Referral prompts + scripts baked into Refer Labs tasks" },
    ],
    flows: [
      { stage: "Trigger", description: "Advisor logs 'delighted client' event inside Refer Labs." },
      { stage: "Share", description: "Client receives co-branded landing page + introduce-a-friend email." },
      { stage: "Track", description: "Referrals push into HubSpot with stage + advisor attribution." },
      { stage: "Reward", description: "Referrer receives strategy session credits; finance sees audit trail in Refer Labs." },
    ],
    story:
      "Instead of hoping advisers remembered to ask, the firm automated prompts, assets, and approvals inside Refer Labs. Compliance loved the audit trail, GTM loved the pipeline.",
  },
  {
    industry: "B2B SaaS",
    tagline: "Let power users become your outbound team.",
    highlight:
      "Refer Labs monitored activation, NPS, and product milestones to decide when to invite champions into referral campaigns—each intro landed in Salesforce with context.",
    metrics: [
      { label: "Pipeline lift", value: "+37%", detail: "Net-new opportunities sourced from top customers" },
      { label: "Sales cycle", value: "−44 days", detail: "Deals arrived with internal champions already in place" },
      { label: "Expansion revenue", value: "+18%", detail: "Referrals opened multi-team and multi-region deals" },
    ],
    flows: [
      { stage: "Trigger", description: "Power user hits success milestone → referral CTA inside product + email." },
      { stage: "Share", description: "Champion selects who to intro; Refer Labs generates a ready-to-forward brief." },
      { stage: "Track", description: "Intro logged with referral_code in Salesforce + Slack alerts for AE + CSM." },
      { stage: "Reward", description: "Champions receive VIP roadmap access + credits once deals close." },
    ],
    story:
      "Referrals stopped being random. Product, CS, and sales all saw the same referral data, so follow-ups, rewards, and forecasting finally aligned.",
  },
];

const REFERRAL_FLOW = [
  {
    title: "Capture & code",
    detail: "Refer Labs issues airtight referral_code + discount_code pairs per ambassador. Codes sync across CRM, campaigns, landing pages, and packaging so no share ever breaks attribution.",
  },
  {
    title: "Triggers & asks",
    detail: "Emails, in-app prompts, CS playbooks, and SMS fire the moment someone hits a success milestone. Each touchpoint uses the same referral code so your message stays on-brand.",
  },
  {
    title: "A/B test incentives",
    detail: "Test copy, reward types, and call-to-actions directly in Refer Labs. See which offers make referrers engage fastest, then automatically route champions into the winning variant.",
  },
  {
    title: "Referrer engagement",
    detail: "Advocates see live dashboards, leaderboards, and surprise-and-delight rewards. SMS nudges, email recaps, and CRM tasks keep top referrers motivated without manual chasing.",
  },
  {
    title: "Prospect experience",
    detail: "New users land on personalised referral pages, book into your CRM, or apply discount codes instantly. Every signup or purchase flows straight into your funnel with referral metadata intact.",
  },
  {
    title: "Revenue & optimisation",
    detail: "Refer Labs pipes conversions, MRR, and payout data into analytics so finance knows referral-sourced revenue. Double down on high-performing flows and pause the rest—no guesswork.",
  },
];

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100" aria-labelledby="case-studies-heading">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8 space-y-12">
        <section className="rounded-3xl border border-cyan-200 bg-gradient-to-br from-[#0abab5] via-[#11c6d4] to-[#12d1e3] p-6 text-white shadow-[0_25px_60px_rgba(10,171,181,0.25)]">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.4em] text-white/80">Case studies</p>
            <h1 id="case-studies-heading" className="text-3xl font-black">Referral programs that compound trust, pipeline, and revenue</h1>
            <p className="text-sm text-white/85 max-w-3xl">
              See how Refer Labs links referral codes to campaigns, CRM, and payouts so every intro is trackable, rewardable, and repeatable. No guesswork, no duct-taped spreadsheets.
            </p>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          {CASE_STUDIES.map((study) => (
            <article key={study.industry} className="rounded-3xl border border-slate-200 bg-white/95 p-5 shadow-xl shadow-slate-200/60">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">{study.industry}</p>
              <h2 className="mt-2 text-lg font-bold text-slate-900">{study.tagline}</h2>
              <p className="mt-1 text-sm text-slate-600">{study.highlight}</p>
              <div className="mt-4 grid gap-3">
                {study.metrics.map((metric) => (
                  <div key={metric.label} className="rounded-2xl border border-slate-100 bg-slate-50/70 px-3 py-2">
                    <p className="text-[11px] uppercase tracking-wide text-slate-500">{metric.label}</p>
                    <p className="text-xl font-black text-slate-900">{metric.value}</p>
                    <p className="text-xs text-slate-600">{metric.detail}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 space-y-2">
                {study.flows.map((flow) => (
                  <div key={flow.stage} className="rounded-2xl border border-slate-100 bg-white px-3 py-2">
                    <p className="text-sm font-semibold text-slate-800">{flow.stage}</p>
                    <p className="text-xs text-slate-600">{flow.description}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm text-slate-600">{study.story}</p>
            </article>
          ))}
        </section>

        <section className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-lg shadow-slate-200/70">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Referral operating system</p>
            <h2 className="mt-2 text-2xl font-black text-slate-900">How Refer Labs connects every part of your referral program</h2>
            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              {REFERRAL_FLOW.map((item) => (
                <div key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                  <p className="text-sm font-bold text-slate-900">{item.title}</p>
                  <p className="mt-2 text-sm text-slate-600">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-lg shadow-slate-200/70">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Deployment playbook</p>
            <div className="grid gap-6 lg:grid-cols-2">
              {[
                {
                  title: "Launch & rollout",
                  steps: [
                    "Week 1–2: Map customer journeys, pick success triggers, and import ambassadors.",
                    "Week 2–3: Configure campaigns, CRM exports, referral landing pages, and reward logic.",
                    "Week 3–4: Train GTM teams, activate automated prompts, and go live across email/SMS/in-product channels.",
                  ],
                },
                {
                  title: "Measurement & growth",
                  steps: [
                    "A/B test referral copy, incentive mixes, and call-to-actions inside Refer Labs.",
                    "Track referrer engagement, CTR, signup-to-conversion rates, and revenue attribution.",
                    "Use dashboards to highlight top advocates, issue payouts instantly, and feed learnings back into marketing + product.",
                  ],
                },
              ].map((block) => (
                <div key={block.title} className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
                  <p className="text-sm font-bold text-slate-900">{block.title}</p>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-600">
                    {block.steps.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 shadow-inner">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Next steps</p>
              <h3 className="text-xl font-black text-slate-900">Want a tailored referral plan for your business?</h3>
              <p className="text-sm text-slate-600 max-w-xl">
                Let&rsquo;s run a live demo and show how Refer Labs captures every referral, syncs with your CRM, and pays out champions without spreadsheets.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="https://calendly.com/jarredkrowitz/30min"
                className={cn(buttonVariants({ variant: "cta" }))}
              >
                Book demo
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
