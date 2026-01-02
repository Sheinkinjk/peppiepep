import Link from "next/link";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  DollarSign,
  LineChart,
  Sparkles,
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

export const metadata = generateSEOMetadata(seoConfig.linkedinInfluencerCreator);

const formSchema = z.object({
  fullName: z.string().trim().min(2, "Full name is required."),
  email: z.string().trim().email("Valid email required."),
  linkedinUrl: z.string().trim().min(5, "LinkedIn profile required."),
  followerCount: z.string().trim().min(1, "Follower count required."),
  audienceFocus: z.string().trim().min(5, "Audience focus required."),
  contentTopics: z.string().trim().min(5, "Content topics required."),
  location: z.string().trim().optional().default(""),
  companyRole: z.string().trim().optional().default(""),
  avgEngagement: z.string().trim().optional().default(""),
  pastPartnerships: z.string().trim().optional().default(""),
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

async function submitInfluencerApplication(formData: FormData) {
  "use server";

  const parsed = formSchema.safeParse({
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    linkedinUrl: formData.get("linkedinUrl"),
    followerCount: formData.get("followerCount"),
    audienceFocus: formData.get("audienceFocus"),
    contentTopics: formData.get("contentTopics"),
    location: formData.get("location"),
    companyRole: formData.get("companyRole"),
    avgEngagement: formData.get("avgEngagement"),
    pastPartnerships: formData.get("pastPartnerships"),
    notes: formData.get("notes"),
  });

  if (!parsed.success) {
    redirect("/linkedin-influencer/influencer?submitted=0");
  }

  const {
    fullName,
    email,
    linkedinUrl,
    followerCount,
    audienceFocus,
    contentTopics,
    location,
    companyRole,
    avgEngagement,
    pastPartnerships,
    notes,
  } = parsed.data;

  const submittedAt = new Date().toISOString();
  const businessId = process.env.PARTNER_PROGRAM_BUSINESS_ID?.trim();

  // Check for referral attribution cookie
  const cookieStore = await cookies();
  const refAmbassadorCookie = cookieStore.get("ref_ambassador");
  let ambassadorId: string | null = null;
  let attributionBusinessId: string | null = null;
  let attributionReferralCode: string | null = null;

  if (refAmbassadorCookie?.value) {
    try {
      const parsed = JSON.parse(refAmbassadorCookie.value);
      // Check if cookie is still within 30-day window
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

      // Import customer creation utilities
      const { generateUniqueReferralCode } = await import("@/lib/referral-codes");
      const { generateUniqueDiscountCode } = await import("@/lib/discount-codes");

      // Create customer record first
      const referralCode = await generateUniqueReferralCode({ supabase });
      const discountCode = await generateUniqueDiscountCode({
        supabase,
        businessId,
        seedName: fullName,
      });

      const { data: customer, error: customerError } = await supabase
        .from("customers")
        .insert([{
          business_id: businessId,
          name: fullName,
          email,
          referral_code: referralCode,
          discount_code: discountCode,
          status: "applicant", // Special status for LinkedIn Influencer applicants
        }])
        .select("id")
        .single();

      if (customerError || !customer) {
        console.error("Failed to create customer record:", customerError);
        redirect("/linkedin-influencer/influencer?submitted=0");
      }

      // Create referral record if attribution data exists
      if (ambassadorId && attributionBusinessId) {
        const { data: referralData } = await supabase
          .from("referrals")
          .insert({
            business_id: attributionBusinessId,
            ambassador_id: ambassadorId,
            referred_name: fullName,
            referred_email: email,
            referred_phone: null,
            status: "pending",
            consent_given: true,
            locale: "en",
          })
          .select()
          .single();

        // Log the signup event
        await logReferralEvent({
          supabase,
          businessId: attributionBusinessId,
          ambassadorId,
          referralId: referralData?.id || null,
          eventType: "signup_submitted",
          source: "linkedin_influencer_form",
          device: "unknown",
          metadata: {
            referral_code: attributionReferralCode,
            form_type: "linkedin_influencer",
            linkedin_url: linkedinUrl,
            follower_count: followerCount,
            audience_focus: audienceFocus,
            content_topics: contentTopics,
          },
        });
      }

      const adminClient = supabase as unknown as {
        from: (table: string) => {
          insert: (values: Array<Record<string, unknown>>) => Promise<unknown>;
        };
      };
      const noteBlock = [
        `Follower count: ${followerCount}`,
        `Audience focus: ${audienceFocus}`,
        `Content topics: ${contentTopics}`,
        location ? `Location: ${location}` : null,
        companyRole ? `Role/company: ${companyRole}` : null,
        avgEngagement ? `Avg engagement: ${avgEngagement}` : null,
        pastPartnerships ? `Past partnerships: ${pastPartnerships}` : null,
        notes ? `Notes: ${notes}` : null,
      ]
        .filter(Boolean)
        .join("\n");

      // Create partner application linked to customer
      await adminClient.from("partner_applications").insert([
        {
          business_id: businessId,
          customer_id: customer.id, // Link to the customer record
          name: fullName,
          email,
          linkedin_handle: linkedinUrl,
          audience_profile: audienceFocus,
          notes: noteBlock,
          source: "linkedin-influencer",
        },
      ]);
    } catch (error) {
      console.error("Influencer application insert failed:", error);
    }
  }

  const html = `
    <div style="font-family:Inter,system-ui,-apple-system,sans-serif;margin:0 auto;max-width:760px;">
      <div style="padding:28px;border-radius:20px 20px 0 0;background:linear-gradient(135deg,#0ea5e9,#10b981);color:white;">
        <p style="margin:0;text-transform:uppercase;letter-spacing:0.28em;font-size:12px;">🔗 LinkedIn Influencer</p>
        <h1 style="margin:8px 0 0;font-size:26px;font-weight:800;">New Influencer Application</h1>
        <p style="margin:6px 0 0;font-size:14px;opacity:0.95;">${escapeHtml(fullName)} · <a style="color:white;" href="mailto:${escapeHtml(
    email,
  )}">${escapeHtml(email)}</a></p>
      </div>
      <div style="padding:28px;border:1px solid #e2e8f0;border-top:0;border-radius:0 0 20px 20px;background:white;">
        <table style="border-collapse:collapse;width:100%;font-size:14px;">
          ${field("LinkedIn profile", linkedinUrl)}
          ${field("Follower count", followerCount)}
          ${field("Audience focus", audienceFocus)}
          ${field("Content topics", contentTopics)}
          ${field("Location", location)}
          ${field("Role / company", companyRole)}
          ${field("Avg engagement", avgEngagement)}
          ${field("Past partnerships", pastPartnerships)}
          ${field("Notes", notes)}
          ${field("Submitted at", submittedAt)}
        </table>
      </div>
    </div>
  `;

  await sendAdminNotification({
    subject: `LinkedIn Influencer application: ${fullName} (${email})`,
    html,
  });

  const applicantHtml = `
    <div style="font-family:Inter,system-ui,-apple-system,sans-serif;margin:0 auto;max-width:640px;">
      <div style="padding:28px;border-radius:20px 20px 0 0;background:linear-gradient(135deg,#0ea5e9,#10b981);color:white;">
        <p style="margin:0;text-transform:uppercase;letter-spacing:0.28em;font-size:12px;">LinkedIn Influencer</p>
        <h1 style="margin:8px 0 0;font-size:24px;font-weight:800;">You're in the early creator pool</h1>
        <p style="margin:6px 0 0;font-size:14px;opacity:0.95;">We'll review your application and follow up shortly.</p>
      </div>
      <div style="padding:28px;border:1px solid #e2e8f0;border-top:0;border-radius:0 0 20px 20px;background:white;">
        <p style="margin:0 0 12px;font-size:14px;color:#0f172a;">
          Thanks for applying, ${escapeHtml(fullName)}. We're building a curated pool of LinkedIn creators and will be in touch
          once we confirm fit and available offers.
        </p>
        <p style="margin:0;font-size:13px;color:#475569;">
          If you have any updates, reply to this email and we'll keep your profile current.
        </p>
      </div>
    </div>
  `;

  await sendTransactionalEmail({
    to: email,
    subject: "We received your LinkedIn Influencer application",
    html: applicantHtml,
  });

  redirect("/linkedin-influencer/influencer?submitted=1");
}

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function LinkedInInfluencerJoinPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const submitted = params?.submitted === "1";
  const failed = params?.submitted === "0";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "LinkedIn Creator Application",
    "description": "Join Refer Labs' LinkedIn Influencer marketplace to earn performance-based revenue",
    "url": "https://referlabs.com.au/linkedin-influencer/influencer",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "name": "Creator Partnership Program",
      "description": "Earn performance-based revenue by promoting aligned products to your LinkedIn audience",
      "seller": {
        "@type": "Organization",
        "name": "Refer Labs"
      },
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": "0",
        "priceCurrency": "USD",
        "description": "Free to join - earn commission on referrals"
      }
    },
    "audience": {
      "@type": "Audience",
      "audienceType": "LinkedIn Creators and Influencers"
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#070b12] via-[#0b121b] to-[#05070b] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(34,211,238,0.16),transparent_55%),radial-gradient(circle_at_85%_15%,rgba(16,185,129,0.2),transparent_55%)]" />
      <div className="absolute -top-20 right-0 h-96 w-96 rounded-full bg-gradient-to-br from-emerald-400/30 to-transparent blur-3xl animate-pulse" />
      <div
        className="absolute bottom-0 left-16 h-96 w-96 rounded-full bg-gradient-to-br from-cyan-400/25 to-transparent blur-3xl animate-pulse"
        style={{ animationDelay: "1.1s" }}
      />
      <main className="relative mx-auto max-w-6xl px-6 pb-24 pt-14 sm:px-10 lg:px-16">
        <div className="mb-8">
          <Link
            href="/linkedin-influencer"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-300 transition"
          >
            ← Back to Overview
          </Link>
        </div>

        <section className="mb-16 animate-in fade-in duration-700">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-emerald-200 mb-6">
            <Sparkles className="h-3.5 w-3.5" />
            For LinkedIn Creators
          </div>
          <h1 className="text-4xl sm:text-5xl font-black leading-tight text-white max-w-4xl">
            Turn Your Audience Into Recurring Revenue
          </h1>
          <p className="mt-6 text-xl text-slate-200/90 leading-relaxed max-w-3xl">
            Partner with vetted B2B brands to promote products your audience already needs. Earn performance-based commissions on every demo, signup, and subscription you drive.
          </p>
        </section>

        <section className="mb-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: DollarSign,
              title: "Performance-Based Payouts",
              detail: "Get paid for demos, signups, and conversions. No fluff, just trackable outcomes.",
              color: "from-emerald-500/20 to-teal-500/20",
              border: "border-emerald-400/30"
            },
            {
              icon: BadgeCheck,
              title: "Only Promote What Fits",
              detail: "We match you with brands aligned with your niche. No random offers, no awkward asks.",
              color: "from-cyan-500/20 to-blue-500/20",
              border: "border-cyan-400/30"
            },
            {
              icon: LineChart,
              title: "Transparent Tracking",
              detail: "See clicks, conversions, and earnings in real time. No black boxes.",
              color: "from-purple-500/20 to-pink-500/20",
              border: "border-purple-400/30"
            }
          ].map((item) => (
            <div
              key={item.title}
              className={`rounded-3xl border ${item.border} bg-gradient-to-br ${item.color} backdrop-blur p-6`}
            >
              <div className="rounded-xl bg-white/10 p-3 w-fit mb-4">
                <item.icon className="h-6 w-6 text-emerald-300" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
              <p className="text-sm text-slate-200/80 leading-relaxed">{item.detail}</p>
            </div>
          ))}
        </section>

        <section className="mb-16 rounded-3xl border border-emerald-400/30 bg-gradient-to-br from-emerald-500/10 via-slate-900/50 to-teal-500/10 p-10 backdrop-blur shadow-2xl shadow-emerald-500/20">
          <div className="flex items-start gap-4 mb-8">
            <div className="rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 p-4 text-white shadow-lg">
              <Users className="h-7 w-7" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-black text-white mb-2">Who This Is For</h2>
              <p className="text-sm text-slate-200/80">We're building a curated pool of trusted LinkedIn creators with engaged, high-intent audiences.</p>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              "Operators, founders, or subject-matter experts with clear niche authority",
              "Consistent posting cadence (2-5x per week)",
              "Evidence of genuine engagement (comments, shares, DMs)",
              "Open to performance-based partnerships with transparent tracking",
              "Comfortable with FTC disclosure requirements",
              "Audience of buyers (not just job seekers or passive scrollers)"
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200/90">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-300 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16 rounded-3xl border border-white/10 bg-white/5 p-10 shadow-xl backdrop-blur">
          <h2 className="text-2xl font-black text-white mb-2">How It Works</h2>
          <p className="text-sm text-slate-200/80 mb-8">Simple, transparent, and creator-friendly.</p>
          <div className="grid gap-6 md:grid-cols-4">
            {[
              {
                num: "1",
                title: "Apply & Get Approved",
                detail: "Submit your profile. We review for audience fit and niche alignment."
              },
              {
                num: "2",
                title: "Browse Curated Offers",
                detail: "Access brands matched to your audience. Choose what resonates."
              },
              {
                num: "3",
                title: "Promote With Flexibility",
                detail: "Use our briefs or create your own content. Track with custom links."
              },
              {
                num: "4",
                title: "Get Paid for Results",
                detail: "Earn when your audience books demos, signs up, or converts."
              }
            ].map((step, idx) => (
              <div key={step.num} className="relative">
                <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
                  <div className="inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 w-10 h-10 text-white font-black text-lg mb-4">
                    {step.num}
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-200/80 leading-relaxed">{step.detail}</p>
                </div>
                {idx < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-emerald-400/50 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16 rounded-3xl border border-white/10 bg-white/5 p-10 shadow-xl backdrop-blur">
          <h2 className="text-2xl font-black text-white mb-2">What You'll Get Access To</h2>
          <p className="text-sm text-slate-200/80 mb-8">The tools and support to make creator partnerships seamless.</p>
          <div className="grid gap-5 md:grid-cols-2">
            {[
              {
                icon: Zap,
                title: "Curated Brand Matches",
                detail: "We only show you offers that align with your audience profile and content focus."
              },
              {
                icon: Sparkles,
                title: "Creator-First Briefs",
                detail: "Flexible promotion guidance, not rigid scripts. You maintain your authentic voice."
              },
              {
                icon: LineChart,
                title: "Real-Time Performance Dashboard",
                detail: "Track clicks, conversions, and earnings in one place. No guesswork."
              },
              {
                icon: TrendingUp,
                title: "Recurring Revenue Potential",
                detail: "Many offers include subscription-based commissions, so one referral can pay monthly."
              }
            ].map((feature) => (
              <div key={feature.title} className="flex gap-4 rounded-2xl border border-white/10 bg-slate-900/60 p-5">
                <div className="rounded-xl bg-emerald-500/20 p-3 h-fit">
                  <feature.icon className="h-5 w-5 text-emerald-300" />
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-bold text-white mb-1">{feature.title}</h3>
                  <p className="text-sm text-slate-200/80 leading-relaxed">{feature.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16 rounded-3xl border border-emerald-400/40 bg-gradient-to-br from-emerald-500/15 via-slate-900/70 to-cyan-500/15 p-10 backdrop-blur shadow-2xl shadow-emerald-500/20">
          <h2 className="text-2xl font-black text-white mb-2">Apply to Join the Early Creator Pool</h2>
          <p className="text-sm text-slate-200/80 mb-8">
            We're building a curated marketplace. Applications are reviewed manually to ensure quality and fit.
          </p>

          {submitted && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
              <div className="w-full max-w-lg rounded-3xl border border-emerald-300/40 bg-slate-950/95 p-8 text-left shadow-2xl shadow-emerald-500/20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="rounded-2xl bg-emerald-500/20 p-3 text-emerald-200">
                    <CheckCircle2 className="h-7 w-7" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-200">Success</p>
                    <h3 className="text-2xl font-black text-white">We'll Review & Follow Up</h3>
                  </div>
                </div>
                <p className="text-base text-slate-200/80 mb-6">
                  Thanks for applying. We're reviewing creator applications now and will email you within 2-3 business days with next steps and available offers.
                </p>
                <div className="flex gap-3">
                  <Link
                    href="/linkedin-influencer/influencer"
                    className="inline-flex items-center gap-2 rounded-full bg-emerald-400 hover:bg-emerald-300 px-6 py-3 text-sm font-bold text-slate-900 shadow-lg shadow-emerald-500/30 transition"
                  >
                    Got It
                  </Link>
                  <Link
                    href="/linkedin-influencer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 hover:border-white/40 px-6 py-3 text-sm font-semibold text-white/80 hover:text-white transition"
                  >
                    Back to Overview
                  </Link>
                </div>
              </div>
            </div>
          )}

          {failed && (
            <div className="mb-6 rounded-2xl border border-rose-300/40 bg-rose-500/10 px-5 py-4 text-sm text-rose-100">
              <p className="font-semibold mb-1">Something went wrong</p>
              <p className="text-rose-200/80">Please check the required fields and try again.</p>
            </div>
          )}

          <form action={submitInfluencerApplication} className="grid gap-6">
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="text-sm font-semibold text-white mb-2 block" htmlFor="fullName">
                  Full Name <span className="text-emerald-300">*</span>
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  required
                  className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-emerald-400/50 focus:outline-none focus:ring-2 focus:ring-emerald-400/20"
                  placeholder="Jane Smith"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-white mb-2 block" htmlFor="email">
                  Email <span className="text-emerald-300">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-emerald-400/50 focus:outline-none focus:ring-2 focus:ring-emerald-400/20"
                  placeholder="jane@company.com"
                />
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="text-sm font-semibold text-white mb-2 block" htmlFor="linkedinUrl">
                  LinkedIn Profile URL <span className="text-emerald-300">*</span>
                </label>
                <input
                  id="linkedinUrl"
                  name="linkedinUrl"
                  required
                  className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-emerald-400/50 focus:outline-none focus:ring-2 focus:ring-emerald-400/20"
                  placeholder="https://linkedin.com/in/janesmith"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-white mb-2 block" htmlFor="followerCount">
                  Approximate Follower Count <span className="text-emerald-300">*</span>
                </label>
                <input
                  id="followerCount"
                  name="followerCount"
                  required
                  className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-emerald-400/50 focus:outline-none focus:ring-2 focus:ring-emerald-400/20"
                  placeholder="e.g., 12,500"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-white mb-2 block" htmlFor="audienceFocus">
                Audience Focus <span className="text-emerald-300">*</span>
              </label>
              <p className="text-xs text-slate-400 mb-2">Describe your audience's titles, industries, and buyer intent.</p>
              <textarea
                id="audienceFocus"
                name="audienceFocus"
                required
                rows={3}
                className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-emerald-400/50 focus:outline-none focus:ring-2 focus:ring-emerald-400/20"
                placeholder="e.g., RevOps leaders at B2B SaaS companies, e-commerce founders scaling DTC brands, growth marketers in fintech..."
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-white mb-2 block" htmlFor="contentTopics">
                Content Topics <span className="text-emerald-300">*</span>
              </label>
              <p className="text-xs text-slate-400 mb-2">What themes, formats, and topics do you publish about?</p>
              <textarea
                id="contentTopics"
                name="contentTopics"
                required
                rows={3}
                className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-emerald-400/50 focus:outline-none focus:ring-2 focus:ring-emerald-400/20"
                placeholder="e.g., Growth playbooks, SaaS go-to-market strategies, founder lessons, tool reviews..."
              />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="text-sm font-semibold text-white mb-2 block" htmlFor="location">
                  Location / Timezone
                </label>
                <input
                  id="location"
                  name="location"
                  className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-emerald-400/50 focus:outline-none focus:ring-2 focus:ring-emerald-400/20"
                  placeholder="Sydney, GMT+10"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-white mb-2 block" htmlFor="companyRole">
                  Current Role / Company (Optional)
                </label>
                <input
                  id="companyRole"
                  name="companyRole"
                  className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-emerald-400/50 focus:outline-none focus:ring-2 focus:ring-emerald-400/20"
                  placeholder="Founder at Acme Inc"
                />
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="text-sm font-semibold text-white mb-2 block" htmlFor="avgEngagement">
                  Average Engagement / Impressions
                </label>
                <input
                  id="avgEngagement"
                  name="avgEngagement"
                  className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-emerald-400/50 focus:outline-none focus:ring-2 focus:ring-emerald-400/20"
                  placeholder="e.g., 4% engagement rate, 10k avg impressions"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-white mb-2 block" htmlFor="pastPartnerships">
                  Past Brand Partnerships
                </label>
                <input
                  id="pastPartnerships"
                  name="pastPartnerships"
                  className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-emerald-400/50 focus:outline-none focus:ring-2 focus:ring-emerald-400/20"
                  placeholder="Brands you've promoted or partnered with"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-white mb-2 block" htmlFor="notes">
                Anything Else We Should Know?
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={3}
                className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-emerald-400/50 focus:outline-none focus:ring-2 focus:ring-emerald-400/20"
                placeholder="Content examples, preferred partnership types, availability..."
              />
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 px-7 py-3.5 text-sm font-bold text-slate-900 shadow-lg shadow-emerald-500/30 transition-all hover:scale-[1.02]"
              >
                Submit Application
                <ArrowRight className="h-4 w-4" />
              </button>
              <Link
                href="/linkedin-influencer"
                className="text-sm font-semibold text-slate-400 hover:text-white transition"
              >
                ← Back to Overview
              </Link>
            </div>
          </form>
        </section>

        <section className="text-center text-sm text-slate-400">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5">
            <BadgeCheck className="h-4 w-4 text-emerald-300" />
            Applications reviewed within 2-3 business days
          </div>
        </section>
      </main>
    </div>
  );
}
