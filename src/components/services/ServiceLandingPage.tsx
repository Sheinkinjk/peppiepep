"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Users, Building2, Briefcase, Share2, CheckCircle2, ChevronDown, Mail } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export interface ServiceLandingContent {
  industry: string;
  heroTitle: string;
  heroSubtitle: string;
  primaryCta: { label: string; href: string };
  industryBenefit: string;
  ctaTitle: string;
  ctaDescription: string;
}

interface ServiceLandingPageProps {
  content: ServiceLandingContent;
}

const partnerSegments = [
  {
    icon: Users,
    title: "LinkedIn Influencers",
    description:
      "Tap into industry thought leaders who reach your ideal prospects daily. They recommend, you close.",
    metrics: "3-5x higher conversion than cold outreach",
  },
  {
    icon: Building2,
    title: "Agencies & Strategic Partners",
    description:
      "Build revenue-sharing relationships with agencies and complementary service providers.",
    metrics: "40% lower customer acquisition cost",
  },
  {
    icon: Briefcase,
    title: "Consultants & Advisors",
    description:
      "Enable trusted advisors to recommend your services as part of their client relationships.",
    metrics: "2x higher lifetime value",
  },
  {
    icon: Share2,
    title: "Existing Customers & Network",
    description:
      "Turn satisfied clients into your most powerful acquisition channel with seamless referral tracking.",
    metrics: "65% faster sales cycle",
  },
];

const faqs = [
  {
    question: "What types of referral partners can I work with?",
    answer:
      "Refer Labs supports four main partner types: LinkedIn influencers who have audiences matching your ideal customer profile, agencies and strategic partners for revenue-sharing arrangements, consultants and advisors who serve your target market, and your existing customers and network. Each partner type has unique tracking, reward structures, and communication flows.",
  },
  {
    question: "How does partner tracking and attribution work?",
    answer:
      "Every partner gets a unique referral link with full UTM tracking. We track the entire journey from click to conversion, including link visits, form submissions, booked meetings, and closed deals. You get complete visibility into which partners drive the most valuable leads, with real-time dashboards and exportable reports.",
  },
  {
    question: "What reward models does Refer Labs support?",
    answer:
      "We support flexible reward structures including revenue share (percentage of deal value), fixed fee per qualified lead or booked demo, tiered bonuses based on volume or quality, and custom hybrid models. Rewards can be paid via bank transfer, PayPal, or gift cards, with automated payment processing available.",
  },
  {
    question: "How long does it take to launch a referral program?",
    answer:
      "Most clients launch within 2-4 weeks. Our process includes a strategy session to map your ideal partners and reward structure, followed by platform setup and partner onboarding. We handle the technical infrastructure so you can focus on activating your network.",
  },
  {
    question: "Can I integrate with my existing CRM and tools?",
    answer:
      "Yes. Refer Labs integrates with HubSpot, Salesforce, Pipedrive, and other popular CRMs. We also connect with Zapier for custom workflows, Slack for notifications, and various payment processors. API access is available for custom integrations.",
  },
  {
    question: "What makes Refer Labs different from other referral platforms?",
    answer:
      "Refer Labs is built specifically for B2B services and professional firms. We focus on high-value, trust-based referrals rather than e-commerce or consumer programs. Our platform handles the complexity of multi-touch attribution, compliance requirements, and partner relationship management that B2B referrals demand.",
  },
];

function ApplyDialog() {
  const [open, setOpen] = useState(false);
  const [company, setCompany] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [goal, setGoal] = useState("Increase qualified leads");
  const [partnerTypes, setPartnerTypes] = useState("LinkedIn influencers, consultants, strategic partners");
  const [rewardModel, setRewardModel] = useState("Revenue share or fee per booked demo");
  const [notes, setNotes] = useState("");

  const mailtoHref = useMemo(() => {
    const lines = [
      "Referral Program Application",
      "",
      `Company: ${company || "—"}`,
      `Contact: ${contactName || "—"}`,
      `Email: ${email || "—"}`,
      `Goals: ${goal || "—"}`,
      `Ideal partners: ${partnerTypes || "—"}`,
      `Reward model: ${rewardModel || "—"}`,
      "",
      `Notes: ${notes || "—"}`,
    ];
    const body = encodeURIComponent(lines.join("\n"));
    const subject = encodeURIComponent(`Referral Program Application | ${company || "New application"}`);
    return `mailto:jarred@referlabs.com.au?subject=${subject}&body=${body}`;
  }, [company, contactName, email, goal, partnerTypes, rewardModel, notes]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full border-2 border-cyan-500/50 bg-transparent px-8 py-4 text-base font-semibold text-white transition hover:-translate-y-0.5 hover:border-cyan-400 hover:bg-white/5"
        >
          Apply Now
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-xl border border-cyan-500/30 bg-slate-950 text-white">
        <DialogHeader>
          <DialogTitle>Apply for a Referral Program</DialogTitle>
          <DialogDescription className="text-slate-300">
            Share your objectives and partner preferences. Your details will be emailed directly to jarred@referlabs.com.au.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <Input
            placeholder="Company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="border-slate-700 bg-slate-900/60 text-white"
          />
          <Input
            placeholder="Your name"
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
            className="border-slate-700 bg-slate-900/60 text-white"
          />
          <Input
            type="email"
            placeholder="Work email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-slate-700 bg-slate-900/60 text-white"
          />
          <Input
            placeholder="Goals (e.g. more demos, revenue, exposure)"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="border-slate-700 bg-slate-900/60 text-white"
          />
          <Input
            placeholder="Ideal partners (e.g. LinkedIn influencers, advisors)"
            value={partnerTypes}
            onChange={(e) => setPartnerTypes(e.target.value)}
            className="border-slate-700 bg-slate-900/60 text-white"
          />
          <Input
            placeholder="Reward model (e.g. revenue share, fee per demo)"
            value={rewardModel}
            onChange={(e) => setRewardModel(e.target.value)}
            className="border-slate-700 bg-slate-900/60 text-white"
          />
          <Textarea
            placeholder="Notes: audience, timelines, campaigns, compliance requirements"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="min-h-[120px] border-slate-700 bg-slate-900/60 text-white"
          />
          <div className="flex flex-wrap justify-end gap-2 pt-2">
            <Button
              type="button"
              asChild
              className="rounded-full bg-[#0ABAB5] text-slate-900 hover:bg-[#12c7c1]"
            >
              <a href={mailtoHref} onClick={() => setOpen(false)}>
                Send to Refer Labs <Mail className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="text-slate-300 hover:text-white"
              onClick={() => setOpen(false)}
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-800">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-5 text-left"
      >
        <span className="text-base font-medium text-white">{question}</span>
        <ChevronDown
          className={`h-5 w-5 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && (
        <div className="pb-5">
          <p className="text-sm leading-relaxed text-slate-400">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function ServiceLandingPage({ content }: ServiceLandingPageProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/4 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-teal-500/8 blur-[100px]" />
      </div>

      <main className="relative">
        {/* Hero Section - Ultra simplified */}
        <section className="mx-auto max-w-5xl px-6 pb-20 pt-24 text-center sm:px-10 sm:pt-32 lg:pt-40">
          <span className="inline-block rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-cyan-300">
            {content.industry}
          </span>

          <h1 className="mt-8 text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            {content.heroTitle}
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400 sm:text-xl">
            {content.heroSubtitle}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={content.primaryCta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#0ABAB5] px-10 py-4 text-base font-semibold text-slate-900 shadow-lg shadow-cyan-500/20 transition hover:-translate-y-0.5 hover:bg-[#12c7c1] hover:shadow-xl hover:shadow-cyan-500/30"
            >
              {content.primaryCta.label}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <ApplyDialog />
          </div>
        </section>

        {/* Referral Network Section */}
        <section className="mx-auto max-w-6xl px-6 py-20 sm:px-10">
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">
              Would you like to build a{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
                Referral Network
              </span>
              ?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-400">
              {content.industryBenefit}
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2">
            {partnerSegments.map((segment) => (
              <div
                key={segment.title}
                className="group relative rounded-2xl border border-slate-800 bg-slate-900/50 p-8 transition hover:border-cyan-500/30 hover:bg-slate-900/80"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-teal-500/20 text-cyan-400">
                  <segment.icon className="h-6 w-6" />
                </div>

                <h3 className="mt-5 text-xl font-semibold text-white">
                  {segment.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-slate-400">
                  {segment.description}
                </p>

                <div className="mt-5 flex items-center gap-2 text-sm text-cyan-400">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>{segment.metrics}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works Section */}
        <section className="mx-auto max-w-5xl px-6 py-20 sm:px-10">
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">
              How Refer Labs Works
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-400">
              A streamlined process to launch your referral network
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Strategy Session",
                description:
                  "We map your ideal referral partners and design reward structures that motivate.",
              },
              {
                step: "02",
                title: "Network Launch",
                description:
                  "We build your referral infrastructure and onboard your first wave of partners.",
              },
              {
                step: "03",
                title: "Scale & Optimize",
                description:
                  "Track performance, expand your network, and maximize referral-driven revenue.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-cyan-500/30 bg-cyan-500/10 text-lg font-semibold text-cyan-400">
                  {item.step}
                </div>
                <h3 className="mt-5 text-lg font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm text-slate-400">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Common Questions Section */}
        <section className="mx-auto max-w-3xl px-6 py-20 sm:px-10">
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">
              Common Questions
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-400">
              Everything you need to know about building your referral network
            </p>
          </div>

          <div className="mt-12">
            {faqs.map((faq) => (
              <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="mx-auto max-w-4xl px-6 py-20 sm:px-10">
          <div className="relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/30 p-10 text-center sm:p-14">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-cyan-500/5 to-transparent" />

            <h2 className="relative text-2xl font-semibold text-white sm:text-3xl">
              {content.ctaTitle}
            </h2>

            <p className="relative mx-auto mt-4 max-w-lg text-slate-400">
              {content.ctaDescription}
            </p>

            <div className="relative mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href={content.primaryCta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#0ABAB5] px-10 py-4 text-base font-semibold text-slate-900 shadow-lg shadow-cyan-500/20 transition hover:-translate-y-0.5 hover:bg-[#12c7c1] hover:shadow-xl hover:shadow-cyan-500/30"
              >
                Schedule a Call
                <ArrowRight className="h-4 w-4" />
              </Link>
              <ApplyDialog />
            </div>

            <p className="relative mt-5 text-xs uppercase tracking-widest text-slate-500">
              30-minute strategy session
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
