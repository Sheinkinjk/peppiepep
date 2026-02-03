"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Users, Building2, Briefcase, Share2, CheckCircle2, ChevronDown, Loader2, Check } from "lucide-react";
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
    icon: Share2,
    title: "Your Happy Clients",
    description:
      "Your clients already trust you. Give them a reason to refer—and track every affiliate to closed revenue.",
    metrics: "65% faster close rate vs cold leads",
  },
  {
    icon: Users,
    title: "LinkedIn Influencers",
    description:
      "Activate thought leaders who reach thousands of your ideal prospects daily. Full attribution on every affiliate.",
    metrics: "3-5x conversion vs paid ads",
  },
  {
    icon: Building2,
    title: "Strategic Partners",
    description:
      "Complementary service providers who serve your market. Formal rev-share programs with automated tracking.",
    metrics: "40% lower acquisition cost",
  },
  {
    icon: Briefcase,
    title: "Trusted Advisors",
    description:
      "Accountants, consultants, and advisors who guide buying decisions. Discreet, professional affiliate programs.",
    metrics: "2x higher lifetime value",
  },
];

const faqs = [
  {
    question: "How quickly can I launch?",
    answer:
      "Most clients are live within 2-3 weeks. We handle the technical setup—you focus on activating partners.",
  },
  {
    question: "What partners can I work with?",
    answer:
      "Four types: existing clients, LinkedIn influencers, strategic partners (agencies, complementary services), and trusted advisors (accountants, consultants). Each gets unique tracking and tailored reward structures.",
  },
  {
    question: "How do you track affiliates?",
    answer:
      "Unique links with full attribution—from click to closed deal. Real-time dashboards show exactly which partners drive revenue.",
  },
  {
    question: "What reward models work best?",
    answer:
      "Revenue share, fixed fee per lead, or tiered bonuses. We'll recommend the structure that motivates your specific partner types during your strategy call.",
  },
  {
    question: "Do you integrate with my CRM?",
    answer:
      "Yes—HubSpot, Salesforce, Pipedrive, and Zapier for custom workflows. Full API available.",
  },
];

function ApplyDialog({ sourcePage }: { sourcePage: string }) {
  const [open, setOpen] = useState(false);
  const [company, setCompany] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [goals, setGoals] = useState("Increase qualified leads");
  const [partnerTypes, setPartnerTypes] = useState("LinkedIn influencers, consultants, strategic partners");
  const [rewardModel, setRewardModel] = useState("Revenue share or fee per booked demo");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!company.trim() || !contactName.trim() || !email.trim()) {
      setError("Please fill in company, name, and email");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/service-applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company,
          contactName,
          email,
          goals,
          partnerTypes,
          rewardModel,
          notes,
          sourcePage,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Failed to submit application");
      }

      setIsSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit application");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    // Reset form after closing if it was successful
    if (isSuccess) {
      setTimeout(() => {
        setCompany("");
        setContactName("");
        setEmail("");
        setGoals("Increase qualified leads");
        setPartnerTypes("LinkedIn influencers, consultants, strategic partners");
        setRewardModel("Revenue share or fee per booked demo");
        setNotes("");
        setIsSuccess(false);
        setError("");
      }, 300);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      if (!newOpen) {
        handleClose();
      } else {
        setOpen(true);
      }
    }}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full border-2 border-cyan-500/50 bg-transparent px-8 py-4 text-base font-semibold text-white transition hover:-translate-y-0.5 hover:border-cyan-400 hover:bg-white/5"
        >
          Apply Now
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-xl border border-cyan-500/30 bg-slate-950 text-white">
        {isSuccess ? (
          <div className="py-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500/20">
              <Check className="h-8 w-8 text-cyan-400" />
            </div>
            <DialogHeader>
              <DialogTitle className="text-2xl">We will be in contact soon</DialogTitle>
              <DialogDescription className="mt-2 text-slate-300">
                Thank you for your application. Our team will review your details and reach out within 24-48 hours.
              </DialogDescription>
            </DialogHeader>
            <Button
              type="button"
              onClick={handleClose}
              className="mt-6 rounded-full bg-[#0ABAB5] px-8 text-slate-900 hover:bg-[#12c7c1]"
            >
              Close
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Apply for an Affiliate Program</DialogTitle>
              <DialogDescription className="text-slate-300">
                Share your objectives and partner preferences. Our team will be in touch soon.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3">
              <Input
                placeholder="Company *"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="border-slate-700 bg-slate-900/60 text-white"
                disabled={isSubmitting}
              />
              <Input
                placeholder="Your name *"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                className="border-slate-700 bg-slate-900/60 text-white"
                disabled={isSubmitting}
              />
              <Input
                type="email"
                placeholder="Work email *"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-slate-700 bg-slate-900/60 text-white"
                disabled={isSubmitting}
              />
              <Input
                placeholder="Goals (e.g. more demos, revenue, exposure)"
                value={goals}
                onChange={(e) => setGoals(e.target.value)}
                className="border-slate-700 bg-slate-900/60 text-white"
                disabled={isSubmitting}
              />
              <Input
                placeholder="Ideal partners (e.g. LinkedIn influencers, advisors)"
                value={partnerTypes}
                onChange={(e) => setPartnerTypes(e.target.value)}
                className="border-slate-700 bg-slate-900/60 text-white"
                disabled={isSubmitting}
              />
              <Input
                placeholder="Reward model (e.g. revenue share, fee per demo)"
                value={rewardModel}
                onChange={(e) => setRewardModel(e.target.value)}
                className="border-slate-700 bg-slate-900/60 text-white"
                disabled={isSubmitting}
              />
              <Textarea
                placeholder="Notes: audience, timelines, campaigns, compliance requirements"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="min-h-[120px] border-slate-700 bg-slate-900/60 text-white"
                disabled={isSubmitting}
              />
              {error && (
                <p className="text-sm text-red-400">{error}</p>
              )}
              <div className="flex flex-wrap justify-end gap-2 pt-2">
                <Button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="rounded-full bg-[#0ABAB5] text-slate-900 hover:bg-[#12c7c1]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Send to Refer Labs"
                  )}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  className="text-slate-300 hover:text-white"
                  onClick={handleClose}
                  disabled={isSubmitting}
                >
                  Close
                </Button>
              </div>
            </div>
          </>
        )}
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
        {/* Hero Section - Sales-led */}
        <section className="mx-auto max-w-5xl px-6 pb-16 pt-24 text-center sm:px-10 sm:pt-32 lg:pt-36">
          <span className="inline-block rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-cyan-300">
            {content.industry}
          </span>

          <h1 className="mt-8 text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            {content.heroTitle}
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300 sm:text-xl font-medium">
            {content.heroSubtitle}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={content.primaryCta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-10 py-4 text-base font-bold text-slate-900 shadow-lg shadow-cyan-500/25 transition hover:-translate-y-0.5 hover:bg-cyan-300 hover:shadow-xl hover:shadow-cyan-500/35"
            >
              {content.primaryCta.label}
              <ArrowRight className="h-5 w-5" />
            </Link>
            <ApplyDialog sourcePage={content.industry} />
          </div>

          <p className="mt-6 text-sm text-slate-500">
            Free 30-minute strategy call · No commitment required
          </p>
        </section>

        {/* Referral Network Section */}
        <section className="mx-auto max-w-6xl px-6 py-16 sm:px-10">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Four Ways to{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
                Drive Affiliates
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-300 text-lg">
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
        <section className="mx-auto max-w-5xl px-6 py-16 sm:px-10">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Launch in Weeks, Not Months
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-300">
              Most clients see their first affiliate-driven leads within 30 days
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                step: "1",
                title: "Strategy Call",
                description:
                  "30 minutes to map your ideal partners and reward structure. We do the heavy lifting.",
              },
              {
                step: "2",
                title: "We Build It",
                description:
                  "Tracking infrastructure, partner portals, and onboarding materials—ready in days.",
              },
              {
                step: "3",
                title: "Start Growing",
                description:
                  "Activate partners, track every affiliate, and watch your pipeline fill with warm leads.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500/20 text-xl font-bold text-cyan-400">
                  {item.step}
                </div>
                <h3 className="mt-4 text-lg font-bold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-slate-400">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href={content.primaryCta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-8 py-3 text-sm font-bold text-slate-900 transition hover:-translate-y-0.5 hover:bg-cyan-300"
            >
              Book Your Strategy Call
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* Common Questions Section */}
        <section className="mx-auto max-w-3xl px-6 py-16 sm:px-10">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Quick Answers
            </h2>
          </div>

          <div className="mt-8">
            {faqs.map((faq) => (
              <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="mx-auto max-w-4xl px-6 py-16 sm:px-10">
          <div className="relative overflow-hidden rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/40 p-10 text-center sm:p-12">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent" />

            <h2 className="relative text-2xl font-black text-white sm:text-3xl">
              {content.ctaTitle}
            </h2>

            <p className="relative mx-auto mt-4 max-w-lg text-slate-300 text-lg">
              {content.ctaDescription}
            </p>

            <div className="relative mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href={content.primaryCta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-10 py-4 text-base font-bold text-slate-900 shadow-lg shadow-cyan-500/30 transition hover:-translate-y-0.5 hover:bg-cyan-300 hover:shadow-xl hover:shadow-cyan-500/40"
              >
                Schedule Your Free Call
                <ArrowRight className="h-5 w-5" />
              </Link>
              <ApplyDialog sourcePage={content.industry} />
            </div>

            <p className="relative mt-5 text-sm text-slate-400">
              No commitment · No sales pitch · Just strategy
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
