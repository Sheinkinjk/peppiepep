import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Globe2,
  LineChart,
  Sparkles,
  Star,
  Users,
  Zap,
} from "lucide-react";
import { z } from "zod";

import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";
import { createServiceClient } from "@/lib/supabase";
import { sendAdminNotification } from "@/lib/email-notifications";
import { sendTransactionalEmail } from "@/lib/transactional-email";

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
        <p style="margin:6px 0 0;font-size:14px;opacity:0.95;">We’ll review your application and follow up shortly.</p>
      </div>
      <div style="padding:28px;border:1px solid #e2e8f0;border-top:0;border-radius:0 0 20px 20px;background:white;">
        <p style="margin:0 0 12px;font-size:14px;color:#0f172a;">
          Thanks for applying, ${escapeHtml(fullName)}. We’re building a curated pool of LinkedIn creators and will be in touch
          once we confirm fit and available offers.
        </p>
        <p style="margin:0;font-size:13px;color:#475569;">
          If you have any updates, reply to this email and we’ll keep your profile current.
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
    "description": "Join Refer Labs' LinkedIn Influencer marketplace to earn 25% recurring revenue",
    "url": "https://referlabs.com.au/linkedin-influencer/influencer",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "name": "Creator Partnership Program",
      "description": "Earn 25% recurring revenue by promoting SaaS and e-commerce products to your LinkedIn audience",
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
      <div className="absolute -top-20 right-0 h-96 w-96 rounded-full bg-gradient-to-br from-cyan-400/30 to-transparent blur-3xl animate-pulse" />
      <div
        className="absolute bottom-0 left-16 h-96 w-96 rounded-full bg-gradient-to-br from-emerald-400/25 to-transparent blur-3xl animate-pulse"
        style={{ animationDelay: "1.1s" }}
      />
      <main className="relative mx-auto max-w-5xl px-6 pb-24 pt-14 sm:px-10 lg:px-16">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.32em] text-emerald-200">
          <Zap className="h-3.5 w-3.5" />
          LinkedIn Influencer
        </div>

        <section className="mt-6 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center animate-in fade-in duration-700">
          <div className="space-y-6">
            <h1 className="text-balance text-4xl font-black leading-tight sm:text-5xl">
              Join the LinkedIn Influencer Marketplace
            </h1>
            <p className="text-lg text-slate-200/90">
              We&apos;re building a pool of trusted LinkedIn creators who want to drive real outcomes for SaaS and
              e-commerce brands. Apply now to get early access to curated offers.
            </p>
            <div className="grid gap-3 sm:grid-cols-2 text-sm text-slate-200/90">
              {[
                "Performance-based payouts",
                "Only promote what you believe in",
                "Transparent tracking & dashboards",
                "Recurring revenue potential",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-300" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 p-3 text-white">
                <Star className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-200">Who fits best</p>
                <p className="text-lg font-bold text-white">Operators, founders, and creators with engaged audiences</p>
              </div>
            </div>
            <div className="mt-5 space-y-3 text-sm text-slate-200/90">
              {[
                "Clear niche or operator audience",
                "Consistent posting cadence",
                "Evidence of engagement and trust",
                "Open to performance-based partnerships",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <BadgeCheck className="mt-0.5 h-4 w-4 text-emerald-300" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-16 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl shadow-emerald-500/10">
          <h2 className="text-2xl font-black text-white">What you&apos;ll unlock</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              {
                icon: Users,
                title: "Curated offers",
                detail: "Access products aligned with your audience and values.",
              },
              {
                icon: Sparkles,
                title: "Creator-first briefs",
                detail: "Flexible promotion guidance, not rigid scripts.",
              },
              {
                icon: LineChart,
                title: "Performance tracking",
                detail: "See clicks, demos, and conversions in real time.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
                <item.icon className="h-5 w-5 text-emerald-300" />
                <p className="mt-3 text-base font-semibold text-white">{item.title}</p>
                <p className="mt-2 text-sm text-slate-200/80">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl shadow-cyan-500/10">
          <h2 className="text-2xl font-black text-white">Apply to join the early pool</h2>
          <p className="mt-2 text-sm text-slate-200/80">
            We&apos;ll review applications and follow up with early access details.
          </p>

          {submitted && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
              <div className="w-full max-w-lg rounded-3xl border border-emerald-300/40 bg-slate-950/95 p-8 text-left shadow-2xl shadow-emerald-500/20">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-emerald-500/20 p-3 text-emerald-200">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-200">Submitted</p>
                    <h3 className="text-xl font-black text-white">We&apos;ll be in touch</h3>
                  </div>
                </div>
                <p className="mt-4 text-sm text-slate-200/80">
                  Thanks for applying. We&apos;re reviewing creators now and will follow up with next steps and available offers.
                </p>
                <div className="mt-6 flex gap-3">
                  <Link
                    href="/linkedin-influencer/influencer"
                    className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-5 py-2.5 text-sm font-bold text-slate-900"
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

          <form action={submitInfluencerApplication} className="mt-8 grid gap-5">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-semibold text-white" htmlFor="fullName">
                  Full name *
                </label>
                <input
                  id="fullName"
                  name="fullName"
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
                <label className="text-sm font-semibold text-white" htmlFor="linkedinUrl">
                  LinkedIn profile *
                </label>
                <input
                  id="linkedinUrl"
                  name="linkedinUrl"
                  required
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white placeholder:text-slate-400"
                  placeholder="https://linkedin.com/in/..."
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-white" htmlFor="followerCount">
                  Approx. follower count *
                </label>
                <input
                  id="followerCount"
                  name="followerCount"
                  required
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white placeholder:text-slate-400"
                  placeholder="e.g., 12,000"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-white" htmlFor="audienceFocus">
                Audience focus (titles, industries, buyer intent) *
              </label>
              <textarea
                id="audienceFocus"
                name="audienceFocus"
                required
                rows={3}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white placeholder:text-slate-400"
                placeholder="e.g., RevOps leaders at SaaS companies, e-commerce founders, growth marketers..."
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-white" htmlFor="contentTopics">
                What content do you publish? *
              </label>
              <textarea
                id="contentTopics"
                name="contentTopics"
                required
                rows={3}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white placeholder:text-slate-400"
                placeholder="Themes, formats, and recurring topics."
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-semibold text-white" htmlFor="location">
                  Location / timezone
                </label>
                <input
                  id="location"
                  name="location"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white placeholder:text-slate-400"
                  placeholder="Sydney, GMT+10"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-white" htmlFor="companyRole">
                  Role / company (optional)
                </label>
                <input
                  id="companyRole"
                  name="companyRole"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white placeholder:text-slate-400"
                  placeholder="Founder at ..."
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-semibold text-white" htmlFor="avgEngagement">
                  Avg engagement / impressions
                </label>
                <input
                  id="avgEngagement"
                  name="avgEngagement"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white placeholder:text-slate-400"
                  placeholder="e.g., 4% engagement / 8k views"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-white" htmlFor="pastPartnerships">
                  Past partnerships
                </label>
                <input
                  id="pastPartnerships"
                  name="pastPartnerships"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white placeholder:text-slate-400"
                  placeholder="Brands you have promoted"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-white" htmlFor="notes">
                Anything else we should know?
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={3}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white placeholder:text-slate-400"
                placeholder="Examples, preferred partnership types, availability..."
              />
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 px-6 py-3 text-sm font-bold text-slate-900 shadow-lg shadow-cyan-500/30"
              >
                Submit application
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
            <Globe2 className="h-4 w-4 text-emerald-300" />
            We&apos;ll reach out to approved creators with next steps and live offers.
          </div>
        </section>
      </main>
    </div>
  );
}
