import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Briefcase,
  CheckCircle2,
  LineChart,
  Target,
  Users,
  Zap,
} from "lucide-react";
import { z } from "zod";

import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";
import { createServiceClient } from "@/lib/supabase";
import { sendAdminNotification } from "@/lib/email-notifications";
import { sendTransactionalEmail } from "@/lib/transactional-email";

export const metadata = generateSEOMetadata(seoConfig.linkedinInfluencerBusiness);

const formSchema = z.object({
  contactName: z.string().trim().min(2, "Name is required."),
  email: z.string().trim().email("Valid email required."),
  role: z.string().trim().min(2, "Role is required."),
  company: z.string().trim().min(2, "Company name is required."),
  website: z.string().trim().min(2, "Website is required."),
  companySize: z.string().trim().min(1, "Company size is required."),
  industry: z.string().trim().min(2, "Industry is required."),
  targetBuyer: z.string().trim().min(5, "Target buyer is required."),
  desiredOutcome: z.string().trim().min(2, "Desired outcome is required."),
  payoutModel: z.string().trim().optional().default(""),
  budgetRange: z.string().trim().optional().default(""),
  timeline: z.string().trim().optional().default(""),
  notes: z.string().trim().optional().default(""),
});

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function field(label: string, value: string) {
  const safe = escapeHtml(value || "—");
  return `
    <tr>
      <td style="padding:10px 12px;border:1px solid #e2e8f0;background:#f8fafc;font-weight:600;color:#0f172a;width:220px;">${escapeHtml(
        label,
      )}</td>
      <td style="padding:10px 12px;border:1px solid #e2e8f0;color:#0f172a;white-space:pre-wrap;">${safe}</td>
    </tr>
  `;
}

async function submitBusinessPartner(formData: FormData) {
  "use server";

  const parsed = formSchema.safeParse({
    contactName: formData.get("contactName"),
    email: formData.get("email"),
    role: formData.get("role"),
    company: formData.get("company"),
    website: formData.get("website"),
    companySize: formData.get("companySize"),
    industry: formData.get("industry"),
    targetBuyer: formData.get("targetBuyer"),
    desiredOutcome: formData.get("desiredOutcome"),
    payoutModel: formData.get("payoutModel"),
    budgetRange: formData.get("budgetRange"),
    timeline: formData.get("timeline"),
    notes: formData.get("notes"),
  });

  if (!parsed.success) {
    redirect("/linkedin-influencer/business?submitted=0");
  }

  const {
    contactName,
    email,
    role,
    company,
    website,
    companySize,
    industry,
    targetBuyer,
    desiredOutcome,
    payoutModel,
    budgetRange,
    timeline,
    notes,
  } = parsed.data;

  const submittedAt = new Date().toISOString();
  const businessId = process.env.PARTNER_PROGRAM_BUSINESS_ID?.trim();

  if (businessId) {
    try {
      const supabase = await createServiceClient();
      const adminClient = supabase as unknown as {
        from: (table: string) => {
          insert: (values: Array<Record<string, unknown>>) => Promise<unknown>;
        };
      };
      const noteBlock = [
        `Role: ${role}`,
        `Company size: ${companySize}`,
        `Industry: ${industry}`,
        `Target buyer: ${targetBuyer}`,
        `Desired outcome: ${desiredOutcome}`,
        payoutModel ? `Payout model: ${payoutModel}` : null,
        budgetRange ? `Budget range: ${budgetRange}` : null,
        timeline ? `Timeline: ${timeline}` : null,
        notes ? `Notes: ${notes}` : null,
      ]
        .filter(Boolean)
        .join("\n");

      await adminClient.from("partner_applications").insert([
        {
          business_id: businessId,
          name: contactName,
          email,
          company,
          website,
          audience_profile: targetBuyer,
          notes: noteBlock,
          source: "linkedin-influencer-business",
        },
      ]);
    } catch (error) {
      console.error("Business partner insert failed:", error);
    }
  }

  const html = `
    <div style="font-family:Inter,system-ui,-apple-system,sans-serif;margin:0 auto;max-width:760px;">
      <div style="padding:28px;border-radius:20px 20px 0 0;background:linear-gradient(135deg,#0ea5e9,#7c3aed);color:white;">
        <p style="margin:0;text-transform:uppercase;letter-spacing:0.28em;font-size:12px;">🏢 LinkedIn Influencer</p>
        <h1 style="margin:8px 0 0;font-size:26px;font-weight:800;">New Business Partnership</h1>
        <p style="margin:6px 0 0;font-size:14px;opacity:0.95;">${escapeHtml(contactName)} · <a style="color:white;" href="mailto:${escapeHtml(
    email,
  )}">${escapeHtml(email)}</a></p>
      </div>
      <div style="padding:28px;border:1px solid #e2e8f0;border-top:0;border-radius:0 0 20px 20px;background:white;">
        <table style="border-collapse:collapse;width:100%;font-size:14px;">
          ${field("Role", role)}
          ${field("Company", company)}
          ${field("Website", website)}
          ${field("Company size", companySize)}
          ${field("Industry", industry)}
          ${field("Target buyer", targetBuyer)}
          ${field("Desired outcome", desiredOutcome)}
          ${field("Payout model", payoutModel)}
          ${field("Budget range", budgetRange)}
          ${field("Timeline", timeline)}
          ${field("Notes", notes)}
          ${field("Submitted at", submittedAt)}
        </table>
      </div>
    </div>
  `;

  await sendAdminNotification({
    subject: `LinkedIn Influencer business partner: ${company} (${email})`,
    html,
  });

  const applicantHtml = `
    <div style="font-family:Inter,system-ui,-apple-system,sans-serif;margin:0 auto;max-width:640px;">
      <div style="padding:28px;border-radius:20px 20px 0 0;background:linear-gradient(135deg,#0ea5e9,#7c3aed);color:white;">
        <p style="margin:0;text-transform:uppercase;letter-spacing:0.28em;font-size:12px;">LinkedIn Influencer</p>
        <h1 style="margin:8px 0 0;font-size:24px;font-weight:800;">We received your partnership request</h1>
        <p style="margin:6px 0 0;font-size:14px;opacity:0.95;">We’ll review your goals and follow up shortly.</p>
      </div>
      <div style="padding:28px;border:1px solid #e2e8f0;border-top:0;border-radius:0 0 20px 20px;background:white;">
        <p style="margin:0 0 12px;font-size:14px;color:#0f172a;">
          Thanks for reaching out, ${escapeHtml(contactName)}. We&apos;ll confirm fit and recommended creator matches for ${escapeHtml(company)}.
        </p>
        <p style="margin:0;font-size:13px;color:#475569;">
          If you have updates, reply to this email and we’ll keep your request current.
        </p>
      </div>
    </div>
  `;

  await sendTransactionalEmail({
    to: email,
    subject: "We received your LinkedIn Influencer partnership request",
    html: applicantHtml,
  });

  redirect("/linkedin-influencer/business?submitted=1");
}

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function LinkedInInfluencerBusinessPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const submitted = params?.submitted === "1";
  const failed = params?.submitted === "0";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "LinkedIn Influencer Business Partnership",
    "description": "Partner with verified LinkedIn creators to drive qualified demos and revenue. Performance-based B2B marketing without SDRs or ads.",
    "url": "https://referlabs.com.au/linkedin-influencer/business",
    "serviceType": "Performance Marketing",
    "provider": {
      "@type": "Organization",
      "name": "Refer Labs",
      "url": "https://referlabs.com.au"
    },
    "areaServed": {
      "@type": "Place",
      "name": "Global"
    },
    "audience": [
      {
        "@type": "Audience",
        "audienceType": "SaaS Companies"
      },
      {
        "@type": "Audience",
        "audienceType": "E-commerce Businesses"
      }
    ],
    "termsOfService": "https://referlabs.com.au/terms"
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#070b12] via-[#0b121b] to-[#05070b] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(14,165,233,0.18),transparent_55%),radial-gradient(circle_at_85%_15%,rgba(124,58,237,0.16),transparent_55%)]" />
      <div className="absolute -top-20 right-0 h-96 w-96 rounded-full bg-gradient-to-br from-cyan-400/30 to-transparent blur-3xl animate-pulse" />
      <div
        className="absolute bottom-0 left-16 h-96 w-96 rounded-full bg-gradient-to-br from-indigo-400/25 to-transparent blur-3xl animate-pulse"
        style={{ animationDelay: "1.1s" }}
      />
      <main className="relative mx-auto max-w-5xl px-6 pb-24 pt-14 sm:px-10 lg:px-16">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.32em] text-cyan-200">
          <Zap className="h-3.5 w-3.5" />
          LinkedIn Influencer
        </div>

        <section className="mt-6 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center animate-in fade-in duration-700">
          <div className="space-y-6">
            <h1 className="text-balance text-4xl font-black leading-tight sm:text-5xl">
              Replace Outbound With LinkedIn Distribution
            </h1>
            <p className="text-lg text-slate-200/90">
              We&apos;re building a pool of SaaS and e-commerce companies ready to scale through trusted LinkedIn
              creators. Share your goals and we&apos;ll match you with aligned operators.
            </p>
            <div className="grid gap-3 sm:grid-cols-2 text-sm text-slate-200/90">
              {[
                "Pay for demos, sign-ups, or revenue",
                "Launch creator-led campaigns fast",
                "Warm audiences with buying intent",
                "Track performance end-to-end",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-cyan-300" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-gradient-to-br from-cyan-500 to-indigo-500 p-3 text-white">
                <Briefcase className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200">Ideal partners</p>
                <p className="text-lg font-bold text-white">SaaS &amp; e-commerce teams ready to scale</p>
              </div>
            </div>
            <div className="mt-5 space-y-3 text-sm text-slate-200/90">
              {[
                "Clear product-market fit",
                "Defined conversion goals",
                "Ability to track outcomes",
                "Budget allocated for performance payouts",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <BadgeCheck className="mt-0.5 h-4 w-4 text-cyan-300" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-16 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl shadow-cyan-500/10">
          <h2 className="text-2xl font-black text-white">How partnership works</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              {
                icon: Target,
                title: "Define outcomes",
                detail: "Set demo, signup, or revenue targets with payouts.",
              },
              {
                icon: Users,
                title: "Match creators",
                detail: "We connect you with creators aligned to your ICP.",
              },
              {
                icon: BarChart3,
                title: "Track performance",
                detail: "See results in real time and scale what works.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
                <item.icon className="h-5 w-5 text-cyan-300" />
                <p className="mt-3 text-base font-semibold text-white">{item.title}</p>
                <p className="mt-2 text-sm text-slate-200/80">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl shadow-indigo-500/10">
          <h2 className="text-2xl font-black text-white">Tell us about your business</h2>
          <p className="mt-2 text-sm text-slate-200/80">
            We&apos;ll use this to match you with the right creators and craft partnership incentives.
          </p>

          {submitted && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
              <div className="w-full max-w-lg rounded-3xl border border-cyan-300/40 bg-slate-950/95 p-8 text-left shadow-2xl shadow-cyan-500/20">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-cyan-500/20 p-3 text-cyan-200">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200">Submitted</p>
                    <h3 className="text-xl font-black text-white">We&apos;ll be in touch</h3>
                  </div>
                </div>
                <p className="mt-4 text-sm text-slate-200/80">
                  Thanks for your request. We&apos;ll review your goals and follow up with next steps and creator matches.
                </p>
                <div className="mt-6 flex gap-3">
                  <Link
                    href="/linkedin-influencer/business"
                    className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-5 py-2.5 text-sm font-bold text-slate-900"
                  >
                    Got it
                  </Link>
                  <Link
                    href="/linkedin-influencer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white/80"
                  >
                    Back to overview
                  </Link>
                </div>
              </div>
            </div>
          )}
          {failed && (
            <div className="mt-6 rounded-2xl border border-rose-300/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
              Something went wrong. Please check the required fields and try again.
            </div>
          )}

          <form action={submitBusinessPartner} className="mt-8 grid gap-5">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-semibold text-white" htmlFor="contactName">
                  Contact name *
                </label>
                <input
                  id="contactName"
                  name="contactName"
                  required
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white placeholder:text-slate-400"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-white" htmlFor="email">
                  Email *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white placeholder:text-slate-400"
                  placeholder="you@company.com"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-semibold text-white" htmlFor="role">
                  Role *
                </label>
                <input
                  id="role"
                  name="role"
                  required
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white placeholder:text-slate-400"
                  placeholder="Founder, Growth Lead, Marketing..."
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-white" htmlFor="company">
                  Company *
                </label>
                <input
                  id="company"
                  name="company"
                  required
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white placeholder:text-slate-400"
                  placeholder="Company name"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-semibold text-white" htmlFor="website">
                  Website *
                </label>
                <input
                  id="website"
                  name="website"
                  required
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white placeholder:text-slate-400"
                  placeholder="https://yourcompany.com"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-white" htmlFor="companySize">
                  Company size *
                </label>
                <input
                  id="companySize"
                  name="companySize"
                  required
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white placeholder:text-slate-400"
                  placeholder="e.g., 11-50, 51-200"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-semibold text-white" htmlFor="industry">
                  Industry *
                </label>
                <input
                  id="industry"
                  name="industry"
                  required
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white placeholder:text-slate-400"
                  placeholder="SaaS, E-commerce, Fintech..."
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-white" htmlFor="desiredOutcome">
                  Desired outcome *
                </label>
                <input
                  id="desiredOutcome"
                  name="desiredOutcome"
                  required
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white placeholder:text-slate-400"
                  placeholder="Demos booked, sign-ups, revenue..."
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-white" htmlFor="targetBuyer">
                Target buyer / ICP *
              </label>
              <textarea
                id="targetBuyer"
                name="targetBuyer"
                required
                rows={3}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white placeholder:text-slate-400"
                placeholder="Roles, industries, pain points, deal size..."
              />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <label className="text-sm font-semibold text-white" htmlFor="payoutModel">
                  Payout model
                </label>
                <input
                  id="payoutModel"
                  name="payoutModel"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white placeholder:text-slate-400"
                  placeholder="Per demo, per signup..."
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-white" htmlFor="budgetRange">
                  Monthly budget range
                </label>
                <input
                  id="budgetRange"
                  name="budgetRange"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white placeholder:text-slate-400"
                  placeholder="$5k-$15k"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-white" htmlFor="timeline">
                  Timeline
                </label>
                <input
                  id="timeline"
                  name="timeline"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white placeholder:text-slate-400"
                  placeholder="Launch this month"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-white" htmlFor="notes">
                Additional notes
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={3}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white placeholder:text-slate-400"
                placeholder="Any creator preferences, target markets, or constraints?"
              />
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-indigo-400 px-6 py-3 text-sm font-bold text-slate-900 shadow-lg shadow-cyan-500/30"
              >
                Submit partnership request
                <ArrowRight className="h-4 w-4" />
              </button>
              <Link
                href="/linkedin-influencer"
                className="text-sm font-semibold text-slate-200/80 hover:text-white"
              >
                Back to overview
              </Link>
            </div>
          </form>
        </section>

        <section className="mt-12 text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <LineChart className="h-4 w-4 text-cyan-300" />
            We&apos;ll match you with creators once the marketplace pool is ready.
          </div>
        </section>
      </main>
    </div>
  );
}
