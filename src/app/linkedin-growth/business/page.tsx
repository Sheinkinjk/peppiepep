import Link from "next/link";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Briefcase,
  CheckCircle2,
  LineChart,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { z } from "zod";

import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";
import { createServiceClient } from "@/lib/supabase";
import { sendAdminNotification } from "@/lib/email-notifications";
import { sendTransactionalEmail } from "@/lib/transactional-email";
import { logReferralEvent } from "@/lib/referral-events";

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
    redirect("/linkedin-growth/business?submitted=0");
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

  const cookieStore = await cookies();
  const refAmbassadorCookie = cookieStore.get("ref_ambassador");
  let ambassadorId: string | null = null;
  let attributionBusinessId: string | null = null;
  let attributionReferralCode: string | null = null;

  if (refAmbassadorCookie?.value) {
    try {
      const parsed = JSON.parse(refAmbassadorCookie.value);
      const cookieAge = Date.now() - (parsed.timestamp || 0);
      const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000;
      if (cookieAge < thirtyDaysMs) {
        ambassadorId = parsed.id;
        attributionBusinessId = parsed.business_id;
        attributionReferralCode = parsed.code;
      }
    } catch (err) {
      console.error("Failed to parse attribution cookie:", err);
    }
  }

  if (businessId) {
    try {
      const supabase = await createServiceClient();
      const { generateUniqueReferralCode } = await import("@/lib/referral-codes");
      const { generateUniqueDiscountCode } = await import("@/lib/discount-codes");

      const referralCode = await generateUniqueReferralCode({ supabase });
      const discountCode = await generateUniqueDiscountCode({
        supabase,
        businessId,
        seedName: contactName,
      });

      const { data: customer, error: customerError } = await supabase
        .from("customers")
        .insert([{
          business_id: businessId,
          name: contactName,
          email,
          referral_code: referralCode,
          discount_code: discountCode,
          company,
          website,
          status: "applicant",
        }])
        .select("id")
        .single();

      if (customerError || !customer) {
        console.error("Failed to create customer record:", customerError);
        redirect("/linkedin-growth/business?submitted=0");
      }

      if (ambassadorId && attributionBusinessId) {
        const { data: referralData } = await supabase
          .from("referrals")
          .insert({
            business_id: attributionBusinessId,
            ambassador_id: ambassadorId,
            referred_name: contactName,
            referred_email: email,
            referred_phone: null,
            status: "pending",
            consent_given: true,
            locale: "en",
          })
          .select()
          .single();

        await logReferralEvent({
          supabase,
          businessId: attributionBusinessId,
          ambassadorId,
          referralId: referralData?.id || null,
          eventType: "signup_submitted",
          source: "linkedin_influencer_business_form",
          device: "unknown",
          metadata: {
            referral_code: attributionReferralCode,
            form_type: "linkedin_influencer_business",
            company,
            website,
            industry,
            target_buyer: targetBuyer,
            desired_outcome: desiredOutcome,
          },
        });
      }

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
          customer_id: customer.id,
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
        <p style="margin:0;text-transform:uppercase;letter-spacing:0.28em;font-size:12px;">🏢 LinkedIn Creator Partnership</p>
        <h1 style="margin:8px 0 0;font-size:26px;font-weight:800;">New Business Application</h1>
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
    subject: `LinkedIn Creator Partnership: ${company} (${email})`,
    html,
  });

  const applicantHtml = `
    <div style="font-family:Inter,system-ui,-apple-system,sans-serif;margin:0 auto;max-width:640px;">
      <div style="padding:28px;border-radius:20px 20px 0 0;background:linear-gradient(135deg,#0ea5e9,#7c3aed);color:white;">
        <p style="margin:0;text-transform:uppercase;letter-spacing:0.28em;font-size:12px;">LinkedIn Creator Partnership</p>
        <h1 style="margin:8px 0 0;font-size:24px;font-weight:800;">We received your partnership request</h1>
        <p style="margin:6px 0 0;font-size:14px;opacity:0.95;">Our team will review and follow up within 24 hours.</p>
      </div>
      <div style="padding:28px;border:1px solid #e2e8f0;border-top:0;border-radius:0 0 20px 20px;background:white;">
        <p style="margin:0 0 12px;font-size:14px;color:#0f172a;">
          Thanks for your interest, ${escapeHtml(contactName)}. We'll review your goals for ${escapeHtml(company)} and match you with aligned creators who can drive ${escapeHtml(desiredOutcome)}.
        </p>
        <p style="margin:12px 0 0;font-size:13px;color:#475569;">
          Next steps: We'll email you creator profiles within 2-3 business days. If you have questions, reply to this email.
        </p>
      </div>
    </div>
  `;

  await sendTransactionalEmail({
    to: email,
    subject: "We received your creator partnership request",
    html: applicantHtml,
  });

  redirect("/linkedin-growth/business?submitted=1");
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
    "name": "LinkedIn Creator Partnership for Businesses",
    "description": "Launch performance-based LinkedIn creator campaigns. Drive qualified demos, signups, and revenue through trusted creator distribution.",
    "url": "https://referlabs.com.au/linkedin-growth/business",
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
      },
      {
        "@type": "Audience",
        "audienceType": "B2B Technology Companies"
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

      {/* Ambient background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(14,165,233,0.16),transparent_50%),radial-gradient(circle_at_85%_15%,rgba(124,58,237,0.14),transparent_50%)]" />

      <main className="relative mx-auto max-w-5xl px-6 pb-24 pt-16 sm:px-10 lg:px-16">

        {/* Breadcrumb */}
        <div className="mb-8">
          <Link href="/linkedin-growth" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-300 transition">
            ← Back to Overview
          </Link>
        </div>

        {/* Hero Section */}
        <section className="mb-16 animate-in fade-in duration-700">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-200 backdrop-blur">
              <Briefcase className="h-4 w-4" />
              For B2B & E-commerce Companies
            </div>

            <h1 className="text-4xl sm:text-5xl font-black leading-tight text-white">
              Launch Your First Creator Campaign in 7 Days
            </h1>

            <p className="text-lg text-slate-200/90 leading-relaxed">
              We match you with vetted LinkedIn creators whose audiences align with your ICP.
              You approve partnerships, creators promote your product, and you track every conversion.
            </p>
          </div>
        </section>

        {/* Value Props Grid */}
        <section className="mb-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: Target,
              title: "Pay for Outcomes",
              detail: "Demos booked, signups completed, revenue generated. You define the goal, we track the results.",
              color: "from-cyan-500/20 to-teal-500/20",
              border: "border-cyan-400/30"
            },
            {
              icon: Users,
              title: "Vetted Creator Pool",
              detail: "We match you with 5-10 creators whose audiences are already looking for solutions like yours.",
              color: "from-purple-500/20 to-pink-500/20",
              border: "border-purple-400/30"
            },
            {
              icon: BarChart3,
              title: "Full Attribution",
              detail: "See which creators drive results. Scale top performers, pause underperformers. ROI dashboards included.",
              color: "from-emerald-500/20 to-teal-500/20",
              border: "border-emerald-400/30"
            }
          ].map((item) => (
            <div key={item.title} className={`rounded-3xl border ${item.border} bg-gradient-to-br ${item.color} backdrop-blur p-6`}>
              <div className="rounded-xl bg-white/10 p-3 w-fit mb-4">
                <item.icon className="h-6 w-6 text-cyan-300" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
              <p className="text-sm text-slate-200/80 leading-relaxed">{item.detail}</p>
            </div>
          ))}
        </section>

        {/* Who This Works For */}
        <section className="mb-16 rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur">
          <div className="flex items-center gap-3 mb-8">
            <div className="rounded-xl bg-cyan-500/20 p-3">
              <BadgeCheck className="h-6 w-6 text-cyan-300" />
            </div>
            <h2 className="text-2xl font-black text-white">Best-Fit Companies</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-base font-bold text-white mb-4">You're a Great Fit If:</h3>
              <div className="space-y-3 text-sm text-slate-200/90">
                {[
                  "You have product-market fit and a defined ICP",
                  "You can track conversions (demos, signups, purchases)",
                  "You have budget allocated for performance marketing",
                  "You're open to testing 3-5 creators to start"
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-cyan-300 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-base font-bold text-white mb-4">Industries That Excel:</h3>
              <div className="grid grid-cols-2 gap-3 text-sm text-slate-200/90">
                {["SaaS (B2B)", "Fintech", "E-commerce", "MarTech", "HR Tech", "Data Tools"].map((industry) => (
                  <div key={industry} className="rounded-xl border border-white/10 bg-slate-900/40 px-4 py-2.5 text-center font-semibold">
                    {industry}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-16 rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur">
          <h2 className="text-2xl font-black text-white mb-8 text-center">From Application to First Conversions</h2>

          <div className="grid gap-6 md:grid-cols-4">
            {[
              { step: "1", title: "Submit Request", detail: "Tell us your ICP, goals, and budget. Takes 5 minutes." },
              { step: "2", title: "Review Creators", detail: "We present 5-10 vetted creators within 2-3 days." },
              { step: "3", title: "Approve & Launch", detail: "Creators draft content for your approval, then post." },
              { step: "4", title: "Track & Scale", detail: "Watch conversions roll in. Scale what works." }
            ].map((item, idx) => (
              <div key={item.step} className="relative">
                <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 h-full">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 text-lg font-black text-white shadow-lg mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-300/80 leading-relaxed">{item.detail}</p>
                </div>
                {idx < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 z-10">
                    <ArrowRight className="h-5 w-5 text-cyan-400/60" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Application Form */}
        <section className="rounded-3xl border border-cyan-400/30 bg-gradient-to-br from-cyan-500/10 via-slate-900/70 to-blue-500/10 p-10 lg:p-12 backdrop-blur shadow-2xl shadow-cyan-500/10">
          <div className="mb-8">
            <h2 className="text-3xl font-black text-white mb-3">Ready to Launch?</h2>
            <p className="text-base text-slate-200/90">
              Fill out the form below and we'll match you with creators whose audiences are already looking for solutions in your space.
            </p>
          </div>

          {submitted && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
              <div className="w-full max-w-lg rounded-3xl border border-cyan-300/40 bg-slate-950/95 p-8 text-left shadow-2xl shadow-cyan-500/20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="rounded-2xl bg-cyan-500/20 p-3 text-cyan-200">
                    <CheckCircle2 className="h-7 w-7" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200">Success</p>
                    <h3 className="text-2xl font-black text-white">We'll Be in Touch Within 24 Hours</h3>
                  </div>
                </div>
                <p className="text-base text-slate-200/80 mb-6">
                  Thanks for your request. We're reviewing your goals and will email you with aligned creator profiles within 2-3 business days.
                </p>
                <div className="flex gap-3">
                  <Link
                    href="/linkedin-growth/business"
                    className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-6 py-3 text-sm font-bold text-slate-900 hover:bg-cyan-300 transition"
                  >
                    Got it
                  </Link>
                  <Link
                    href="/linkedin-growth"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/80 hover:bg-white/5 transition"
                  >
                    Back to Overview
                  </Link>
                </div>
              </div>
            </div>
          )}

          {failed && (
            <div className="mb-6 rounded-2xl border border-rose-300/40 bg-rose-500/10 px-5 py-4 text-sm text-rose-100">
              <strong className="font-bold">Submission failed.</strong> Please check all required fields and try again.
            </div>
          )}

          <form action={submitBusinessPartner} className="grid gap-6">
            {/* Contact Info */}
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-semibold text-white mb-2" htmlFor="contactName">
                  Your Name *
                </label>
                <input
                  id="contactName"
                  name="contactName"
                  required
                  className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                  placeholder="Jane Smith"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-white mb-2" htmlFor="email">
                  Work Email *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                  placeholder="jane@company.com"
                />
              </div>
            </div>

            {/* Company Info */}
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-semibold text-white mb-2" htmlFor="role">
                  Your Role *
                </label>
                <input
                  id="role"
                  name="role"
                  required
                  className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                  placeholder="Head of Growth, Founder, CMO..."
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-white mb-2" htmlFor="company">
                  Company Name *
                </label>
                <input
                  id="company"
                  name="company"
                  required
                  className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                  placeholder="Acme Inc"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-semibold text-white mb-2" htmlFor="website">
                  Company Website *
                </label>
                <input
                  id="website"
                  name="website"
                  required
                  className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                  placeholder="https://acme.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-white mb-2" htmlFor="companySize">
                  Company Size *
                </label>
                <input
                  id="companySize"
                  name="companySize"
                  required
                  className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                  placeholder="11-50, 51-200, 200+..."
                />
              </div>
            </div>

            {/* Goals */}
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-semibold text-white mb-2" htmlFor="industry">
                  Industry *
                </label>
                <input
                  id="industry"
                  name="industry"
                  required
                  className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                  placeholder="SaaS, E-commerce, Fintech..."
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-white mb-2" htmlFor="desiredOutcome">
                  Primary Goal *
                </label>
                <input
                  id="desiredOutcome"
                  name="desiredOutcome"
                  required
                  className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                  placeholder="Demos booked, signups, revenue..."
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2" htmlFor="targetBuyer">
                Ideal Customer Profile (ICP) *
              </label>
              <textarea
                id="targetBuyer"
                name="targetBuyer"
                required
                rows={3}
                className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                placeholder="Who are your ideal customers? (e.g., RevOps leaders at Series B+ SaaS companies, e-commerce founders doing $1M+ ARR...)"
              />
            </div>

            {/* Budget & Timeline */}
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <label className="block text-sm font-semibold text-white mb-2" htmlFor="payoutModel">
                  Payout Model (Optional)
                </label>
                <input
                  id="payoutModel"
                  name="payoutModel"
                  className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                  placeholder="$50/demo, 20% rev share..."
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-white mb-2" htmlFor="budgetRange">
                  Monthly Budget
                </label>
                <input
                  id="budgetRange"
                  name="budgetRange"
                  className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                  placeholder="$5k-$15k/mo"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-white mb-2" htmlFor="timeline">
                  Timeline
                </label>
                <input
                  id="timeline"
                  name="timeline"
                  className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                  placeholder="Launch this month, Q2..."
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2" htmlFor="notes">
                Additional Context (Optional)
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={3}
                className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                placeholder="Any creator preferences, target markets, or constraints we should know about?"
              />
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 px-8 py-4 text-base font-bold text-slate-900 shadow-lg shadow-cyan-500/30 transition hover:scale-[1.02]"
              >
                Submit Partnership Request
                <ArrowRight className="h-5 w-5" />
              </button>
              <Link
                href="/linkedin-growth"
                className="text-sm font-semibold text-slate-200/80 hover:text-white transition"
              >
                Back to overview
              </Link>
            </div>
          </form>
        </section>

        {/* Social Proof Footer */}
        <section className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 text-sm text-slate-400">
            <TrendingUp className="h-4 w-4 text-cyan-300" />
            We match you with creators once we confirm fit and availability.
          </div>
        </section>

      </main>
    </div>
  );
}
