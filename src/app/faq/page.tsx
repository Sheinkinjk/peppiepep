"use client";

import Link from "next/link";
import { useState } from "react";
import {
  BarChart3,
  BookOpen,
  ChevronDown,
  Handshake,
  HelpCircle,
  Linkedin,
  Scale,
  Settings,
  Sparkles,
} from "lucide-react";

type FAQSection = {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  questions: { q: string; a: string }[];
};

const faqSections: FAQSection[] = [
  {
    id: "is-refer-labs-for-me",
    title: "Is Refer Labs for Me?",
    subtitle: "Find out if Refer Labs is the right fit for your business",
    icon: HelpCircle,
    iconColor: "text-teal-500",
    questions: [
      {
        q: "Is Refer Labs only for businesses that already get referrals?",
        a: "Yes—but that's most relationship-driven businesses. If clients occasionally introduce colleagues, partners mention you in passing, or people recommend you informally, you already have the raw material. Refer Labs helps you turn those untracked moments into a measurable, repeatable channel. We're not creating referral behaviour from scratch—we're giving structure to what's already happening."
      },
      {
        q: "What types of businesses get the most value from Refer Labs?",
        a: "Professional services (accountants, lawyers, consultants), B2B SaaS, financial advisors, insurance brokers, recruiters, and founder-led companies where trust and reputation drive growth. If your buyers research independently, talk to peers, and value credibility over price—affiliate-driven acquisition typically outperforms cold outreach and paid ads."
      },
      {
        q: "Is Refer Labs suitable if we don't run ads or outbound sales?",
        a: "Absolutely. Many of our clients grow primarily through relationships and word of mouth. Refer Labs formalises that channel without forcing you into aggressive marketing tactics. You can run a quiet, professional affiliate program alongside your existing business development—no need to change how you sell."
      },
      {
        q: "Is Refer Labs a good fit for small teams or early-stage companies?",
        a: "Yes. We built the platform for teams who don't have dedicated partnership managers or marketing departments. The interface is simple, the setup is guided, and ongoing maintenance is minimal. If you can send a few emails and check a dashboard once a week, you can run an effective affiliate program."
      },
      {
        q: "When is Refer Labs not a good fit?",
        a: "If your business is purely transactional with no relationship component (low-ticket e-commerce, high-volume commodity sales), affiliates probably aren't your highest-leverage channel. Similarly, if you've never received a single organic referral or introduction, there may be product-market fit issues to address first. We're also not an influencer marketplace or coupon aggregator—our focus is professional, relationship-driven growth."
      },
      {
        q: "Do we need existing partners or affiliates to get started?",
        a: "No. You can start with your existing client base (even just 10-20 happy customers), a handful of professional contacts, or by activating LinkedIn creators through our managed partnerships. We'll help you identify who in your network could become your first ambassadors."
      },
      {
        q: "Will Refer Labs change how we sell or interact with clients?",
        a: "No. The goal is to make affiliates feel natural, not transactional. Clients share because they genuinely want to help their network—we just make it easy to track and reward that behaviour. Most businesses find that formalising their affiliate channel actually strengthens client relationships by acknowledging and appreciating advocacy."
      }
    ]
  },
  {
    id: "platform",
    title: "Affiliate Program Platform",
    subtitle: "Setup, links, attribution, rewards, and ambassador management",
    icon: Settings,
    iconColor: "text-cyan-500",
    questions: [
      {
        q: "What is Refer Labs and who is it designed for?",
        a: "Refer Labs is a affiliate intelligence platform built for growth-focused businesses across professional services, SaaS, and B2B sectors. It transforms your existing relationships—clients, partners, creators, and advisors—into a fully tracked, rewarded affiliate channel. Every affiliate is attributed, every conversion is measured, and every payout is defensible."
      },
      {
        q: "How quickly can I launch a affiliate program?",
        a: "Most businesses are live within 48-72 hours. Complete the signup flow, configure your branding and reward structure, import your initial partner list, and start generating tracked affiliate links immediately. Our concierge team handles the technical setup so you can focus on strategy."
      },
      {
        q: "How are affiliate links generated and tracked?",
        a: "Each ambassador or partner receives a unique affiliate URL with embedded tracking parameters. When someone clicks that link, we capture the source, set a 30-day attribution cookie, and track their journey through signup, demo booking, or purchase. All events are logged in real-time with full audit trails."
      },
      {
        q: "What reward structures are supported?",
        a: "Refer Labs supports multiple reward models: flat fees per conversion (e.g., $50 per demo booked), percentage-based revenue share (e.g., 15-25% recurring), tiered commissions based on volume, and hybrid structures combining base payouts with performance bonuses. You define the model that aligns with your unit economics."
      },
      {
        q: "Can I run multiple campaigns simultaneously?",
        a: "Yes. Create distinct campaigns for different partner segments, product lines, or promotional periods. Each campaign has its own tracking links, reward rules, and analytics—while rolling up into unified reporting at the business level."
      },
      {
        q: "How do I manage and segment my ambassadors?",
        a: "The Partners panel lets you import contacts via CSV, manual entry, or CRM sync. Tag ambassadors by tier (VIP, standard, new), assign them to specific campaigns, and set individual reward overrides. Each partner gets their own dashboard showing clicks, conversions, and earnings."
      },
      {
        q: "Is there an approval workflow for affiliates?",
        a: "Yes. All affiliates enter a pending state by default. You review each submission, verify legitimacy, confirm the purchase or conversion occurred, then approve or reject. Partners only receive credit for verified, approved affiliates—giving you full control over payout accuracy."
      },
      {
        q: "How are payouts processed?",
        a: "Approved rewards are logged to each partner's balance. Payouts are processed monthly via Stripe, bank transfer, or gift card fulfillment depending on your configuration. A 30-day hold period accounts for refunds or cancellations before funds are released."
      }
    ]
  },
  {
    id: "partnerships",
    title: "Affiliate Partnerships",
    subtitle: "Creators, advisors, LinkedIn influencers, and managed partnerships",
    icon: Handshake,
    iconColor: "text-purple-500",
    questions: [
      {
        q: "What types of affiliate partners does Refer Labs support?",
        a: "We facilitate partnerships across four categories: LinkedIn influencers and thought leaders, agencies and strategic partners, consultants and fractional executives, and existing customers or clients. Each partner type has different motivations and audiences—we help you structure the right offer for each."
      },
      {
        q: "How do you source and qualify partners?",
        a: "For managed partnership programs, we identify potential partners based on your ideal customer profile. We analyze audience demographics, engagement authenticity, content alignment, and past partnership history. Only vetted partners with genuine influence and audience fit are presented for your approval."
      },
      {
        q: "What does 'managed partnerships' mean?",
        a: "Managed partnerships are end-to-end: we handle sourcing, outreach, qualification, onboarding, tracking setup, content review, and payout processing. You approve the partners and strategy; we execute the operations. This is ideal for teams who want partnership-driven growth without building an internal partnerships function."
      },
      {
        q: "How are partners compensated?",
        a: "Compensation depends on the partnership structure and your goals. Common models include per-demo fees ($50-150 per qualified meeting), revenue share (15-25% of first-year value), hybrid models with base fees plus close bonuses, and custom structures for high-value strategic partners."
      },
      {
        q: "Can partners promote multiple brands through Refer Labs?",
        a: "Yes, but with guardrails. Partners maintain separate tracking links for each brand they work with. We ensure there's no conflict of interest and that all partnerships are disclosed appropriately. Exclusivity arrangements are optional and negotiated per-partner."
      },
      {
        q: "How do you ensure partner quality and prevent fraud?",
        a: "Every partner is vetted before activation. We verify audience authenticity (no purchased followers), review engagement patterns, and assess brand alignment. All conversions require verification before payouts. Suspicious activity—unusual click patterns, low-quality leads, repeated refunds—triggers review and potential removal."
      },
      {
        q: "What materials do partners receive?",
        a: "Partners get a complete onboarding kit: unique tracking links, brand guidelines, key messaging points, product briefs, and suggested talking points. For content creators, we provide review workflows so you approve posts before they go live."
      }
    ]
  },
  {
    id: "linkedin",
    title: "LinkedIn Growth & Influencer Activations",
    subtitle: "Campaign structure, deliverables, pricing logic, and timelines",
    icon: Linkedin,
    iconColor: "text-blue-500",
    questions: [
      {
        q: "How do LinkedIn creator partnerships work?",
        a: "We identify LinkedIn creators whose audiences match your ideal customer profile. Each creator receives a tracked affiliate link and creates content (posts, carousels, videos) that authentically introduces your product to their followers. Every click, demo, and conversion is attributed back to the specific creator."
      },
      {
        q: "What types of LinkedIn partners do you activate?",
        a: "Four categories: Thought Leaders (C-suite executives sharing industry insights), Niche Creators (specialists in specific verticals like HR tech or fintech), Community Builders (newsletter operators, podcast hosts, Slack community admins), and Operator-Influencers (active practitioners like Heads of Growth or Sales directors)."
      },
      {
        q: "What's the typical campaign timeline?",
        a: "Most campaigns launch within 7-10 business days. Days 1-2: goal setting and ICP definition. Days 3-5: partner sourcing and qualification. Days 5-7: offer structuring and partner approval. Days 7-9: creator onboarding and content drafting. Day 10+: content goes live with tracking enabled."
      },
      {
        q: "How is LinkedIn influencer pricing structured?",
        a: "Pricing is performance-based—you pay for results, not impressions. Common models: $50-150 per qualified demo booked, 15-25% revenue share on closed deals, or hybrid structures. We recommend starting with 3-5 creators at $2,000-5,000/month to test, then scaling what works."
      },
      {
        q: "What deliverables can I expect from creators?",
        a: "Typical deliverables include LinkedIn posts (text, carousel, or video), newsletter mentions if the creator operates one, direct outreach to their network via DMs, and ongoing content over the campaign period. All content is reviewed and approved by you before publishing."
      },
      {
        q: "How much control do I have over creator messaging?",
        a: "Full control. You provide brand guidelines, key messaging points, and proof points. Creators draft content in their voice (authenticity drives engagement), but you review and approve everything before it goes live. Edits, rejections, and feedback are handled through our workflow."
      },
      {
        q: "What results should I expect?",
        a: "Performance varies by industry and offer strength. Benchmarks from our campaigns: 3-5% click-through rates on creator content, 10-20% of clicks converting to demos or signups, and 25-35% close rates on referred deals. High-performing programs scale to 30-100+ demos per month from creator channels alone."
      }
    ]
  },
  {
    id: "implementation-support",
    title: "Implementation & Launch Support",
    subtitle: "Guided setup across all four affiliate program types",
    icon: Sparkles,
    iconColor: "text-amber-500",
    questions: [
      {
        q: "What implementation support is included for each offering?",
        a: "We provide guided implementation across all four program types: For Customer Networks, we help configure ambassador portals, tracking links, and reward automation. For LinkedIn Influencers, we provide guidance on creator sourcing, campaign tracking setup, and content workflows. For Agencies & Partners, we assist with revenue-share structure design and partner onboarding. For Consultants & Advisors, we help build compliant affiliate flows with proper disclosures. You maintain control; we provide expert guidance."
      },
      {
        q: "How do I launch a Customer Network affiliate program?",
        a: "The platform guides you through configuring branded ambassador portals, generating unique tracking links for each client, setting up reward automation (flat fees, percentage, or tiered), importing your customer list, and training your team on the dashboard. Most customer affiliate programs launch within 5-7 days with our setup documentation."
      },
      {
        q: "How does LinkedIn Influencer activation work?",
        a: "You can use the platform to activate LinkedIn thought leaders with campaign-specific tracking links. The system provides tools for creator sourcing guidance, audience vetting, term negotiation templates, per-creator tracking setup, content review workflows, and performance-based payout calculations. You maintain full control of creator relationships."
      },
      {
        q: "What's included for Agency & Strategic Partner programs?",
        a: "The platform enables you to design partner tier structures, create co-branded materials, configure revenue-share tracking, provide partner portals with real-time deal visibility, and establish quarterly reporting workflows. Setup guides help with initial partner outreach and onboarding."
      },
      {
        q: "How do Consultant & Advisor affiliate programs work?",
        a: "The platform provides affiliate flows tailored for trusted advisors—discreet tracking, compliance disclosure templates, per-deal or recurring payout configurations, and professional onboarding experiences. The system ensures the program respects the advisor-client relationship while providing full attribution."
      },
      {
        q: "What support is available after launch?",
        a: "Post-launch resources include performance analytics, optimization recommendations, partner recruitment templates, and campaign iteration guidance. Whether you're scaling your customer network, adding new LinkedIn creators, or expanding your agency partner base—the platform provides tools to grow what's working."
      },
      {
        q: "What integrations are available across all program types?",
        a: "The platform integrates with Salesforce, HubSpot, Stripe, Shopify, Calendly, and other platforms. Affiliate events, conversion data, and payout information sync automatically across all four program types—giving your team a unified view of partner-driven revenue."
      }
    ]
  },
  {
    id: "legal",
    title: "Legal & Compliance",
    subtitle: "Disclosures, transparency, consent, anti-spam, and data handling",
    icon: Scale,
    iconColor: "text-rose-500",
    questions: [
      {
        q: "Are affiliate partnerships considered advertising?",
        a: "Yes. When someone promotes a product in exchange for compensation—whether cash, credits, or other rewards—that constitutes commercial endorsement. All partnerships facilitated through Refer Labs are performance-based marketing relationships subject to advertising regulations including FTC guidelines, ASA standards, and platform-specific policies."
      },
      {
        q: "What disclosure requirements apply to partners?",
        a: "Partners must clearly and conspicuously disclose their commercial relationship with brands. On LinkedIn, this means using hashtags like #ad, #sponsored, or #partner in a visible location (not buried at the end of lengthy posts). Refer Labs provides disclosure templates, but partners and brands share responsibility for compliance."
      },
      {
        q: "Who is responsible for regulatory compliance?",
        a: "Responsibility is shared. Brands must ensure product claims are truthful, substantiated, and not misleading. Partners must disclose relationships and avoid deceptive practices. Refer Labs provides tools, templates, and workflows to support compliance—but we are not legal counsel. Both parties should consult with qualified attorneys regarding their specific obligations."
      },
      {
        q: "How does Refer Labs handle consent and opt-in requirements?",
        a: "We provide double opt-in verification for email and SMS communications, consent tracking with timestamps, and easy opt-out mechanisms in every message. You control consent language and can customize it for different jurisdictions. However, you remain responsible for ensuring your communications comply with TCPA, CASL, GDPR, CAN-SPAM, and applicable local laws."
      },
      {
        q: "Does Refer Labs provide financial or investment advice?",
        a: "No. Refer Labs is a marketing and attribution platform. We do not provide financial, investment, tax, or legal advice. Commission structures, reward payouts, and partnership compensation should be reviewed with your legal and financial advisors to ensure compliance with applicable regulations in your jurisdiction."
      },
      {
        q: "How is partner and customer data handled?",
        a: "Data is stored securely on infrastructure that meets SOC 2 standards. We collect only the information necessary for attribution, tracking, and payouts. Data is not sold to third parties. Partners and referred customers can request data deletion per GDPR and CCPA requirements. Full details are in our Privacy Policy."
      },
      {
        q: "What anti-fraud measures are in place?",
        a: "We implement duplicate detection for emails and phone numbers, IP-based click validation, conversion verification workflows, and anomaly detection for suspicious patterns. All affiliates require manual approval before payouts, giving you the final say on legitimacy."
      },
      {
        q: "Are there restrictions on what can be promoted through Refer Labs?",
        a: "Yes. We prohibit promotion of illegal products or services, misleading health claims, unregistered securities, gambling (where prohibited), and content that violates platform terms of service. Partnerships involving regulated industries (financial services, healthcare, etc.) require additional compliance review."
      },
      {
        q: "How should affiliate rewards be treated for tax purposes?",
        a: "Affiliate rewards and commissions are generally taxable income for recipients. Partners are responsible for reporting earnings to relevant tax authorities. For US partners earning over $600 annually, businesses may need to issue 1099 forms. Consult with a tax professional for guidance specific to your situation."
      }
    ]
  },
  {
    id: "dashboard",
    title: "Dashboard & Reporting",
    subtitle: "Attribution logic, event tracking, payouts, exports, and admin controls",
    icon: BarChart3,
    iconColor: "text-emerald-500",
    questions: [
      {
        q: "What data is tracked in the Refer Labs dashboard?",
        a: "The dashboard tracks the complete affiliate lifecycle: link clicks, page views, form submissions, demo bookings, meeting attendance, purchases, subscription activations, and revenue generated. Each event is timestamped, attributed to the source partner, and logged with full context (device, location, UTM parameters)."
      },
      {
        q: "How does attribution logic work?",
        a: "Attribution uses a 30-day cookie window by default (configurable). When someone clicks a affiliate link, we set a first-party cookie and store the partner ID. All subsequent conversions within the attribution window are credited to that partner. Last-click attribution is standard; multi-touch models are available for enterprise accounts."
      },
      {
        q: "What conversion events can be tracked?",
        a: "Any event with a definable trigger: form submissions (contact forms, demo requests), calendar bookings (Calendly, HubSpot Meetings, Chili Piper), e-commerce purchases (Shopify, Stripe), subscription activations, and custom events via webhook or API. If you can detect it, we can track it."
      },
      {
        q: "How are meeting bookings and demo attendance tracked?",
        a: "Calendar integrations capture when a demo is booked and whether it was attended. You can set conversion criteria: credit partners only for booked meetings, only for attended meetings, or only for qualified meetings that progress to opportunity stage."
      },
      {
        q: "What does the reward and payout workflow look like?",
        a: "When a conversion occurs, the system calculates the reward based on campaign rules and logs it to the partner's pending balance. You review and approve (or reject) the affiliate. Approved rewards move to the partner's available balance. Payouts are processed on your defined schedule—monthly is typical—with a configurable hold period."
      },
      {
        q: "What reporting and export options are available?",
        a: "Export affiliate data, conversion logs, partner performance, and payout ledgers to CSV or Excel. Scheduled summary emails deliver KPI snapshots to stakeholders automatically. The ROI module calculates acquisition cost, partner contribution, and revenue impact for executive reporting."
      },
      {
        q: "What admin controls are available?",
        a: "Admins can configure team member access (view-only, editor, admin), set approval workflows, define payout schedules, customize branding, manage integrations, and control which partners see which campaigns. Audit logs track all changes for compliance and accountability."
      },
      {
        q: "Can I see real-time data or is there a delay?",
        a: "Core tracking (clicks, form submissions, page views) updates in real-time. Conversion events from integrated platforms (Stripe, Shopify, calendar tools) sync within minutes. The dashboard refreshes automatically, and you can drill into any time period for detailed analysis."
      },
      {
        q: "How does Refer Labs integrate with my existing analytics stack?",
        a: "We integrate with Google Analytics, Segment, Mixpanel, and other analytics platforms via webhooks and APIs. Affiliate source data can be passed as UTM parameters or custom properties, allowing you to see partner-attributed traffic alongside your other acquisition channels."
      }
    ]
  }
];

export default function FAQPage() {
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [expandedQuestions, setExpandedQuestions] = useState<string[]>([]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const toggleQuestion = (questionId: string) => {
    setExpandedQuestions(prev =>
      prev.includes(questionId)
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId]
    );
  };

  const expandAll = () => {
    setExpandedSections(faqSections.map(s => s.id));
    setExpandedQuestions(
      faqSections.flatMap(s => s.questions.map((_, i) => `${s.id}-${i}`))
    );
  };

  const collapseAll = () => {
    setExpandedSections([]);
    setExpandedQuestions([]);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#04101a] via-[#081820] to-[#020508] text-white">
      {/* Subtle background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(10,186,181,0.06),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(87,230,255,0.04),transparent_50%)]" />
      </div>

      <main className="relative mx-auto max-w-4xl px-5 sm:px-8 lg:px-12 pb-24 pt-16">
        {/* Hero */}
        <header className="text-center space-y-6 mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] text-white">
            Frequently Asked Questions
          </h1>

          {/* Quick navigation */}
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            {faqSections.map(section => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
              >
                <section.icon className={`h-4 w-4 ${section.iconColor}`} />
                <span className="hidden sm:inline">{section.title.split(" ")[0]}</span>
                <span className="sm:hidden">{section.title.split(" ")[0].slice(0, 3)}</span>
              </a>
            ))}
          </div>

          {/* Expand/Collapse controls */}
          <div className="flex justify-center gap-4 pt-2">
            <button
              onClick={expandAll}
              className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              Expand all
            </button>
            <span className="text-slate-600">|</span>
            <button
              onClick={collapseAll}
              className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              Collapse all
            </button>
          </div>
        </header>

        {/* FAQ Sections */}
        <div className="space-y-8">
          {faqSections.map(section => {
            const Icon = section.icon;
            const isSectionExpanded = expandedSections.includes(section.id);
            const isQualificationSection = section.id === "is-refer-labs-for-me";

            return (
              <section
                key={section.id}
                id={section.id}
                className={`scroll-mt-24 ${isQualificationSection ? "mb-4" : ""}`}
              >
                {/* Qualification section intro */}
                {isQualificationSection && (
                  <div className="mb-6 text-center">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-teal-500/20 to-cyan-500/20 border border-teal-500/30 text-sm font-semibold text-teal-300">
                      <HelpCircle className="h-4 w-4" />
                      Start here
                    </span>
                  </div>
                )}
                {/* Section Header */}
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full text-left"
                >
                  <div className={`flex items-center justify-between gap-4 p-6 rounded-2xl border transition-colors ${
                    isQualificationSection
                      ? "border-teal-500/30 bg-gradient-to-br from-teal-500/10 to-cyan-500/5 hover:from-teal-500/15 hover:to-cyan-500/10"
                      : "border-white/10 bg-white/[0.03] hover:bg-white/[0.05]"
                  }`}>
                    <div className="flex items-center gap-4">
                      <div className={`rounded-xl p-3 ${isQualificationSection ? "bg-teal-500/20" : "bg-white/5"} ${section.iconColor}`}>
                        <Icon className={isQualificationSection ? "h-7 w-7" : "h-6 w-6"} />
                      </div>
                      <div>
                        <h2 className={`font-bold text-white ${isQualificationSection ? "text-2xl" : "text-xl"}`}>{section.title}</h2>
                        <p className="text-sm text-slate-400 mt-0.5">{section.subtitle}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-slate-500 hidden sm:block">
                        {section.questions.length} questions
                      </span>
                      <ChevronDown
                        className={`h-5 w-5 text-slate-400 transition-transform duration-200 ${
                          isSectionExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </div>
                </button>

                {/* Questions */}
                <div
                  className={`mt-3 space-y-3 overflow-hidden transition-all duration-300 ease-in-out ${
                    isSectionExpanded ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  {section.questions.map((faq, idx) => {
                    const questionId = `${section.id}-${idx}`;
                    const isQuestionExpanded = expandedQuestions.includes(questionId);

                    return (
                      <div
                        key={questionId}
                        className="rounded-xl border border-white/5 bg-white/[0.02] overflow-hidden"
                      >
                        <button
                          onClick={() => toggleQuestion(questionId)}
                          className="w-full text-left px-6 py-4 flex items-start justify-between gap-4"
                        >
                          <h3 className="text-base font-medium text-white leading-relaxed pr-2">
                            {faq.q}
                          </h3>
                          <ChevronDown
                            className={`h-5 w-5 text-slate-500 flex-shrink-0 mt-0.5 transition-transform duration-200 ${
                              isQuestionExpanded ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        <div
                          className={`px-6 overflow-hidden transition-all duration-200 ease-in-out ${
                            isQuestionExpanded ? "pb-5 max-h-[500px]" : "max-h-0"
                          }`}
                        >
                          <p className="text-sm text-slate-400 leading-relaxed">
                            {faq.a}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <section className="mt-20 text-center">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-10 sm:p-12">
            <BookOpen className="h-10 w-10 text-cyan-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-3">
              Still have questions?
            </h2>
            <p className="text-slate-400 mb-6 max-w-md mx-auto">
              Our team is here to help. Reach out and we'll get you the answers you need.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 text-sm font-semibold text-slate-900 hover:from-cyan-400 hover:to-teal-400 transition-colors"
              >
                Contact Support
              </Link>
              <Link
                href="/how-it-works"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 bg-white/5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
              >
                How It Works
              </Link>
            </div>
          </div>
        </section>

        {/* SEO-friendly content links */}
        <footer className="mt-16 pt-10 border-t border-white/10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
            <div>
              <h3 className="font-semibold text-white mb-3">Product</h3>
              <ul className="space-y-2 text-slate-400">
                <li><Link href="/affiliate-partnerships" className="hover:text-white transition-colors">Affiliate Partnerships</Link></li>
                <li><Link href="/linkedin-growth" className="hover:text-white transition-colors">LinkedIn Growth</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-3">Resources</h3>
              <ul className="space-y-2 text-slate-400">
                <li><Link href="/case-studies" className="hover:text-white transition-colors">Case Studies</Link></li>
                <li><Link href="/our-affiliate-program" className="hover:text-white transition-colors">Ambassador Program</Link></li>
                <li><Link href="/api-guide" className="hover:text-white transition-colors">API Guide</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-3">Legal</h3>
              <ul className="space-y-2 text-slate-400">
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
