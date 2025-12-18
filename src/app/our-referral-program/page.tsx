// @ts-nocheck
import { Metadata } from "next";
import {
  Users,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Mail,
  Phone,
  User,
  Shield,
  Zap,
  Target,
  Building2,
  Globe,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createServiceClient } from "@/lib/supabase";
import { redirect } from "next/navigation";
import { nanoid } from "nanoid";
import { generateUniqueDiscountCode } from "@/lib/discount-codes";
import { ensureAbsoluteUrl } from "@/lib/urls";
import { PartnerApplicationSuccessModal } from "@/components/PartnerApplicationSuccessModal";

export const metadata: Metadata = {
  title: "Join Our Partner Program | Refer Labs",
  description: "Earn 25% recurring revenue by referring businesses to Refer Labs. Offer new customers a $250 sign-on credit when you join our partner program.",
};

async function submitPartnerApplication(formData: FormData) {
  "use server";
  const supabase = await createServiceClient();
  const resolvedBusinessId = process.env.PARTNER_PROGRAM_BUSINESS_ID;
  if (!resolvedBusinessId) {
    console.error("Missing PARTNER_PROGRAM_BUSINESS_ID env variable");
    redirect("/our-referral-program?applied=0");
  }
  const businessId = resolvedBusinessId;

  // Check for attribution cookie from admin referral link
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  const refAmbassadorCookie = cookieStore.get("ref_ambassador");
  let attributedAmbassadorId: string | null = null;
  let attributedAmbassadorCode: string | null = null;
  let attributedBusinessId: string | null = null;

  if (refAmbassadorCookie?.value) {
    try {
      const ambassadorData = JSON.parse(refAmbassadorCookie.value);
      // Check if cookie is still within 30-day window
      const cookieAge = Date.now() - (ambassadorData.timestamp || 0);
      const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000;
      if (cookieAge < thirtyDaysMs) {
        attributedAmbassadorId = ambassadorData.id;
        attributedAmbassadorCode = ambassadorData.code;
        attributedBusinessId = ambassadorData.business_id;
      }
    } catch (err) {
      console.error("Failed to parse attribution cookie:", err);
    }
  }

  const getString = (key: string) => {
    const raw = formData.get(key);
    if (typeof raw !== "string") return null;
    const trimmed = raw.trim();
    return trimmed.length > 0 ? trimmed : null;
  };

  const fullName = getString("name");
  const email = getString("email")?.toLowerCase() ?? null;
  const phone = getString("phone");
  const company = getString("company");
  const websiteInput = getString("website");
  const website = websiteInput
    ? ensureAbsoluteUrl(websiteInput) ?? websiteInput
    : null;
  const instagramHandleRaw = getString("instagram_handle");
  const instagram_handle = instagramHandleRaw
    ? instagramHandleRaw.replace(/^@/, "")
    : null;
  const linkedinHandleRaw = getString("linkedin_handle");
  const linkedin_handle = linkedinHandleRaw
    ? linkedinHandleRaw.replace(/^https?:\/\/(www\.)?linkedin\.com\//i, "")
    : null;
  const audience_profile = getString("audience_profile");
  const notes = getString("notes");
  const source = getString("source") ?? "our-referral-program";
  const fallbackName = company || fullName || email || "Partner applicant";
  const dedupeFilters: string[] = [];
  if (email) dedupeFilters.push(`email.ilike.${email}`);
  if (phone) dedupeFilters.push(`phone.eq.${phone}`);

  try {
    type ExistingCustomer = {
      id: string;
      referral_code: string | null;
      discount_code: string | null;
    };
    let existingCustomer: ExistingCustomer | null = null;

    if (dedupeFilters.length > 0) {
      const { data } = await supabase
        .from("customers")
        .select("id, referral_code, discount_code")
        .eq("business_id", businessId)
        .or(dedupeFilters.join(","))
        .limit(1)
        .maybeSingle();

      existingCustomer = (data as ExistingCustomer | null) ?? null;
    }

    let customerId = existingCustomer?.id ?? null;
    let referralCode = existingCustomer?.referral_code ?? null;
    let discountCode = existingCustomer?.discount_code ?? null;

    if (!customerId) {
      referralCode = referralCode ?? nanoid(12);
      discountCode =
        discountCode ??
        (await generateUniqueDiscountCode({
          supabase,
          businessId,
          seedName: fallbackName,
        }));

      const { data: inserted, error: insertError } = await supabase
        .from("customers")
        .insert([
          {
            business_id: businessId,
            name: fullName ?? fallbackName,
            company: company,
            website,
            instagram_handle,
            linkedin_handle,
            audience_profile,
            notes,
            source,
            phone,
            email,
            referral_code: referralCode,
            discount_code: discountCode,
            status: "applicant",
          },
        ])
        .select("id, referral_code, discount_code")
        .single();

      if (insertError || !inserted) {
        console.error("Failed to insert applicant customer", insertError);
        redirect("/our-referral-program?applied=0");
      }

      customerId = inserted.id;
      referralCode = inserted.referral_code ?? referralCode;
      discountCode = inserted.discount_code ?? discountCode;
    } else {
      const updatePayload: Record<string, string | null> = {};
      if (fullName) updatePayload.name = fullName;
      if (company) updatePayload.company = company;
      if (website) updatePayload.website = website;
      if (instagram_handle) updatePayload.instagram_handle = instagram_handle;
      if (linkedin_handle) updatePayload.linkedin_handle = linkedin_handle;
      if (audience_profile) updatePayload.audience_profile = audience_profile;
      if (notes) updatePayload.notes = notes;
      if (source) updatePayload.source = source;
      if (Object.keys(updatePayload).length > 0) {
        await supabase
          .from("customers")
          .update(updatePayload)
          .eq("id", customerId);
      }

      if (!referralCode) {
        referralCode = nanoid(12);
      }
      if (!discountCode) {
        discountCode = await generateUniqueDiscountCode({
          supabase,
          businessId,
          seedName: fallbackName,
        });
      }
      if (!existingCustomer?.referral_code || !existingCustomer.discount_code) {
        await supabase
          .from("customers")
          .update({
            referral_code: referralCode,
            discount_code: discountCode,
          })
          .eq("id", customerId);
      }
      await supabase
        .from("customers")
        .update({ status: "applicant" })
        .eq("id", customerId);
    }

    await supabase.from("partner_applications").insert([
      {
        business_id: businessId,
        customer_id: customerId,
        name: fullName ?? fallbackName,
        email,
        phone,
        company,
        website,
        instagram_handle,
        linkedin_handle,
        audience_profile,
        notes,
        source,
        status: "pending",
      },
    ]);

    // Create referral record if attributed to an ambassador (e.g., admin's referral link)
    if (attributedAmbassadorId && attributedBusinessId) {
      try {
        const { data: referralData } = await supabase.from("referrals").insert([
          {
            business_id: attributedBusinessId,
            ambassador_id: attributedAmbassadorId,
            referred_name: fullName ?? fallbackName,
            referred_phone: phone,
            referred_email: email,
            status: "pending",
            campaign_id: null,
            consent_given: true, // Partner application implies consent
            locale: "en",
            metadata: {
              company,
              website,
              application_type: "partner",
              source: "partner_program",
            },
          },
        ]).select().single();

        // Create signup bonus commission for the ambassador
        if (referralData) {
          try {
            await supabase.from("stripe_commissions").insert([
              {
                business_id: attributedBusinessId,
                ambassador_id: attributedAmbassadorId,
                referral_id: referralData.id,
                amount: 10000, // $100 AUD signup bonus
                currency: "aud",
                commission_type: "signup_bonus",
                status: "approved", // Auto-approve signup bonuses
                approved_at: new Date().toISOString(),
                metadata: {
                  rule: "Partner signup bonus",
                  amount_aud: 100,
                  partner_company: company,
                  partner_email: email,
                },
              },
            ]);
            console.log("✅ Created $100 signup bonus commission for ambassador");
          } catch (commissionError) {
            console.error("Failed to create commission:", commissionError);
            // Don't fail application if commission creation fails
          }
        }

        // Log the referral signup event
        await supabase.from("referral_events").insert([
          {
            business_id: attributedBusinessId,
            ambassador_id: attributedAmbassadorId,
            event_type: "signup_submitted",
            source: "partner_program",
            device: null,
            metadata: {
              referred_customer_id: customerId,
              application_company: company,
            },
          },
        ]);
      } catch (refError) {
        console.error("Failed to create referral record:", refError);
        // Don't fail the entire application if referral tracking fails
      }
    }

    const siteOrigin = ensureAbsoluteUrl(process.env.NEXT_PUBLIC_SITE_URL) ?? "https://referlabs.com.au";
    const referralLink = referralCode ? `${siteOrigin}/r/${referralCode}` : null;

    if (process.env.RESEND_API_KEY) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Refer Labs Partner Program <noreply@referlabs.com>",
            to: ["jarred@referlabs.com.au"],
            subject: `New referral program applicant: ${fallbackName}`,
            html: `
            <div style="font-family:Inter,system-ui,-apple-system,sans-serif;margin:0 auto;max-width:640px;">
              <div style="padding:32px;border-radius:24px 24px 0 0;background:linear-gradient(135deg,#0abab5,#24d9e2);color:white;">
                <p style="margin:0;text-transform:uppercase;letter-spacing:0.3em;font-size:12px;">New applicant</p>
                <h1 style="margin:8px 0 0;font-size:28px;font-weight:800;">${fallbackName}</h1>
                ${company ? `<p style="margin:4px 0 0;font-size:16px;">${company}</p>` : ""}
              </div>
              <div style="padding:32px;border:1px solid #e2e8f0;border-top:0;border-radius:0 0 24px 24px;background:white;">
                <h2 style="margin-top:0;font-size:18px;color:#0f172a;">Snapshot</h2>
                <ul style="list-style:none;padding:0;margin:0 0 16px;">
                  ${email ? `<li style="margin:6px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></li>` : ""}
                  ${phone ? `<li style="margin:6px 0;"><strong>Phone:</strong> ${phone}</li>` : ""}
                  ${website ? `<li style="margin:6px 0;"><strong>Website:</strong> <a href="${website}" target="_blank">${website}</a></li>` : ""}
                  ${instagram_handle ? `<li style="margin:6px 0;"><strong>Instagram:</strong> @${instagram_handle}</li>` : ""}
                  ${linkedin_handle ? `<li style="margin:6px 0;"><strong>LinkedIn:</strong> ${linkedin_handle}</li>` : ""}
                </ul>
                ${audience_profile ? `<div style="margin-top:16px;"><strong>Audience:</strong><p style="margin:6px 0;color:#475569;">${audience_profile}</p></div>` : ""}
                ${notes ? `<div style="margin-top:16px;"><strong>Launch plan:</strong><p style="margin:6px 0;color:#475569;">${notes}</p></div>` : ""}
                ${
                  referralLink
                    ? `<div style="margin-top:24px;padding:16px;border-radius:16px;background:#ecfdf5;border:1px solid #bbf7d0;">
                        <p style="margin:0 0 8px;font-weight:600;">Auto-generated link</p>
                        <p style="margin:0;"><a href="${referralLink}" target="_blank">${referralLink}</a></p>
                        ${discountCode ? `<p style="margin:8px 0 0;font-size:14px;color:#065f46;">Discount code: <strong>${discountCode}</strong></p>` : ""}
                      </div>`
                    : ""
                }
                ${
                  attributedAmbassadorCode
                    ? `<div style="margin-top:16px;padding:16px;border-radius:16px;background:#fef3c7;border:1px solid #fcd34d;">
                        <p style="margin:0 0 4px;font-weight:600;color:#92400e;">🎯 Referred by Ambassador</p>
                        <p style="margin:0;font-size:14px;color:#78350f;">This application was attributed to referral code: <strong>${attributedAmbassadorCode}</strong></p>
                        <p style="margin:4px 0 0;font-size:12px;color:#92400e;">A referral record has been created in the dashboard.</p>
                      </div>`
                    : ""
                }
              </div>
            </div>
          `,
          }),
        });
      } catch (emailError) {
        console.error("Failed to send partner alert email", emailError);
      }
    }

    redirect("/our-referral-program?applied=1");
  } catch (error) {
    console.error("Partner application failed", error);
    redirect("/our-referral-program?applied=0");
  }
}

type ReferralProgramPageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export default function OurReferralProgramPage({ searchParams }: ReferralProgramPageProps) {
  const applied = searchParams?.applied === "1";
  const applyError = searchParams?.applied === "0";
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Success Modal */}
      <PartnerApplicationSuccessModal />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0abab5] via-[#24d9e2] to-[#0abab5] py-20 sm:py-32">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"></div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-black text-white mb-6 leading-tight">
              Earn 25% Recurring Revenue<br />
              <span className="text-[#0a4b53]">For Every Client You Refer</span>
            </h1>
            <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              Join our partner program and earn passive income by introducing businesses to the world&rsquo;s most elegant referral platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="#apply">
                <Button size="lg" className="bg-white text-[#0abab5] hover:bg-slate-50 text-lg px-8 py-6 rounded-2xl shadow-2xl">
                  Apply Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
            </div>
          </div>
        </div>
    </section>

      {/* Rewards Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 mb-4">
              Partner Program Benefits
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              The most generous partner program in the referral marketing industry
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="relative overflow-hidden p-8 rounded-3xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-emerald-50/50 shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl"></div>
              <div className="relative">
                <div className="inline-flex items-center gap-3 mb-6">
                  <div className="rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 p-4 shadow-lg">
                    <TrendingUp className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-900">25% Recurring Revenue</h3>
                    <p className="text-slate-600 text-sm">For the lifetime of every client</p>
                  </div>
                </div>
                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <p className="text-slate-700 text-sm">Earn 25% of monthly subscription fees forever</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <p className="text-slate-700 text-sm">No cap on earnings - refer unlimited clients</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <p className="text-slate-700 text-sm">Monthly payouts via direct deposit or credit</p>
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 rounded-2xl border border-emerald-300/50">
                  <p className="text-sm font-bold text-emerald-900">
                    💰 Example: Refer 10 clients at $200/mo = $500/mo recurring
                  </p>
                </div>
              </div>
            </Card>

            <Card className="relative overflow-hidden p-8 rounded-3xl border-2 border-cyan-200 bg-gradient-to-br from-cyan-50 via-white to-cyan-50/50 shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl"></div>
              <div className="relative">
                <div className="inline-flex items-center gap-3 mb-6">
                  <div className="rounded-2xl bg-gradient-to-br from-cyan-500 to-cyan-600 p-4 shadow-lg">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-900">Partner Support</h3>
                    <p className="text-slate-600 text-sm">Everything you need to succeed</p>
                  </div>
                </div>
                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                    <p className="text-slate-700 text-sm">Dedicated partner success manager</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                    <p className="text-slate-700 text-sm">Custom marketing materials and resources</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                    <p className="text-slate-700 text-sm">Real-time dashboard to track your earnings</p>
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-r from-cyan-500/20 to-cyan-600/20 rounded-2xl border border-cyan-300/50">
                  <p className="text-sm font-bold text-cyan-900">
                    🎯 We help you close deals and maximize your income
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* What You'll Be Promoting */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(14,165,233,0.08),transparent_50%)]"></div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 mb-4">
              What You&apos;ll Be Promoting
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              The world&rsquo;s most elegant referral marketing platform for premium businesses
            </p>
          </div>

          <div className="mb-12 rounded-3xl border-2 border-cyan-200 bg-gradient-to-br from-cyan-50/80 via-white to-cyan-50/40 p-8 mx-auto max-w-4xl shadow-xl">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0">
                <div className="inline-flex items-center justify-center bg-gradient-to-r from-[#0abab5] via-[#5fd9e4] to-[#1a9eb7] rounded-2xl px-6 py-3 shadow-2xl">
                  <span className="text-2xl font-black text-white">$250</span>
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-black text-slate-900 mb-2">Partner Bonus Credit</h3>
                <p className="text-slate-600">
                  Grant every new customer a $250 account credit, giving referrals instant value and a chance to explore Refer Labs risk-free before committing.
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="relative overflow-hidden group p-6 rounded-3xl border-2 border-slate-200 bg-white hover:border-cyan-400 hover:shadow-2xl transition-all duration-300">
              <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>
              <div className="relative">
                <div className="rounded-2xl bg-gradient-to-br from-cyan-500 to-cyan-600 p-3 w-fit mb-4 shadow-lg">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Automated Ambassador Programs</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Businesses turn their best customers into brand ambassadors with personalized referral links, discount codes, and automated tracking.
                </p>
              </div>
            </Card>

            <Card className="relative overflow-hidden group p-6 rounded-3xl border-2 border-slate-200 bg-white hover:border-purple-400 hover:shadow-2xl transition-all duration-300">
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>
              <div className="relative">
                <div className="rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 p-3 w-fit mb-4 shadow-lg">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Campaign Management</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Send SMS and email campaigns to ambassadors, track performance in real-time, and measure ROI with precision analytics.
                </p>
              </div>
            </Card>

            <Card className="relative overflow-hidden group p-6 rounded-3xl border-2 border-slate-200 bg-white hover:border-emerald-400 hover:shadow-2xl transition-all duration-300">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>
              <div className="relative">
                <div className="rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 p-3 w-fit mb-4 shadow-lg">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">White-Glove Onboarding</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Every client gets personalized setup, custom integrations, and ongoing support - making your referrals sticky and profitable.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 mb-4">
              How Partner Earnings Work
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Simple, transparent, and highly profitable
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="rounded-full bg-gradient-to-br from-[#0abab5] to-cyan-500 w-16 h-16 flex items-center justify-center mx-auto mb-4 text-white text-2xl font-black">
                1
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Apply & Get Approved</h3>
              <p className="text-sm text-slate-600">Submit your application and receive your unique referral link + $250 bonus</p>
            </div>

            <div className="text-center">
              <div className="rounded-full bg-gradient-to-br from-emerald-500 to-green-500 w-16 h-16 flex items-center justify-center mx-auto mb-4 text-white text-2xl font-black">
                2
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Share Your Link</h3>
              <p className="text-sm text-slate-600">Introduce businesses to Refer Labs using your personalized referral link</p>
            </div>

            <div className="text-center">
              <div className="rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 w-16 h-16 flex items-center justify-center mx-auto mb-4 text-white text-2xl font-black">
                3
              </div>
              <h3 className="font-bold text-slate-900 mb-2">They Sign Up</h3>
              <p className="text-sm text-slate-600">Your referral becomes a paying customer with our white-glove onboarding</p>
            </div>

            <div className="text-center">
              <div className="rounded-full bg-gradient-to-br from-amber-500 to-orange-500 w-16 h-16 flex items-center justify-center mx-auto mb-4 text-white text-2xl font-black">
                4
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Earn Forever</h3>
              <p className="text-sm text-slate-600">Receive 25% of their subscription every month for the lifetime of the client</p>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-4 py-2 mb-6">
              <Shield className="h-4 w-4 text-emerald-400" />
              <span className="text-sm font-semibold text-white">Limited Partner Slots Available</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white mb-4">
              Apply to Become a Partner
            </h2>
            <p className="text-xl text-slate-300">
              Start earning passive income today
            </p>
          </div>

            <Card className="p-8 sm:p-10 rounded-3xl border-2 border-slate-700 bg-slate-800 shadow-2xl">
              {applied && (
                <div className="mb-6 rounded-2xl border border-emerald-400/40 bg-emerald-900/30 p-4 text-sm text-emerald-100">
                  ✅ Application received. We also created your ambassador profile so you can edit everything under{" "}
                  <span className="font-semibold text-white">Step 2 → Edit Program Settings</span> once you log in.
                </div>
              )}
              {applyError && (
                <div className="mb-6 rounded-2xl border border-red-400/40 bg-red-900/30 p-4 text-sm text-red-100">
                  We couldn&apos;t record your application automatically. Please try again or email <a href="mailto:jarred@referlabs.com.au" className="underline">jarred@referlabs.com.au</a>.
                </div>
              )}
              <form action={submitPartnerApplication} className="space-y-6">
                <input type="hidden" name="source" value="our-referral-program" />
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="name" className="text-white text-base font-semibold flex items-center gap-2 mb-2">
                      <User className="h-4 w-4" />
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="John Smith"
                      className="rounded-2xl border-2 border-slate-600 bg-slate-700 text-white placeholder:text-slate-400 h-12 text-base focus:border-[#0abab5]"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-white text-base font-semibold flex items-center gap-2 mb-2">
                      <Phone className="h-4 w-4" />
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+61 4 123 456"
                      className="rounded-2xl border-2 border-slate-600 bg-slate-700 text-white placeholder:text-slate-400 h-12 text-base focus:border-[#0abab5]"
                    />
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="email" className="text-white text-base font-semibold flex items-center gap-2 mb-2">
                      <Mail className="h-4 w-4" />
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="john@example.com"
                      className="rounded-2xl border-2 border-slate-600 bg-slate-700 text-white placeholder:text-slate-400 h-12 text-base focus:border-[#0abab5]"
                    />
                  </div>
                  <div>
                    <Label htmlFor="company" className="text-white text-base font-semibold flex items-center gap-2 mb-2">
                      <Building2 className="h-4 w-4" />
                      Business Name *
                    </Label>
                    <Input
                      id="company"
                      name="company"
                      type="text"
                      required
                      placeholder="Refer Labs"
                      className="rounded-2xl border-2 border-slate-600 bg-slate-700 text-white placeholder:text-slate-400 h-12 text-base focus:border-[#0abab5]"
                    />
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="website" className="text-white text-base font-semibold flex items-center gap-2 mb-2">
                      <Globe className="h-4 w-4" />
                      Website / Primary URL *
                    </Label>
                    <Input
                      id="website"
                      name="website"
                      type="url"
                      required
                      placeholder="https://referlabs.com.au"
                      className="rounded-2xl border-2 border-slate-600 bg-slate-700 text-white placeholder:text-slate-400 h-12 text-base focus:border-[#0abab5]"
                    />
                  </div>
                  <div>
                    <Label htmlFor="instagram_handle" className="text-white text-base font-semibold flex items-center gap-2 mb-2">
                      <Share2 className="h-4 w-4" />
                      Instagram Handle
                    </Label>
                    <Input
                      id="instagram_handle"
                      name="instagram_handle"
                      type="text"
                      placeholder="@referlabs"
                      className="rounded-2xl border-2 border-slate-600 bg-slate-700 text-white placeholder:text-slate-400 h-12 text-base focus:border-[#0abab5]"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="linkedin_handle" className="text-white text-base font-semibold flex items-center gap-2 mb-2">
                    <Share2 className="h-4 w-4 rotate-45" />
                    LinkedIn Profile / URL
                  </Label>
                  <Input
                    id="linkedin_handle"
                    name="linkedin_handle"
                    type="text"
                    placeholder="linkedin.com/in/referlabs"
                    className="rounded-2xl border-2 border-slate-600 bg-slate-700 text-white placeholder:text-slate-400 h-12 text-base focus:border-[#0abab5]"
                  />
                </div>

                <div>
                  <Label htmlFor="audience_profile" className="text-white text-base font-semibold flex items-center gap-2 mb-2">
                    <Users className="h-4 w-4" />
                    Who do you typically sell to?
                  </Label>
                  <Textarea
                    id="audience_profile"
                    name="audience_profile"
                    placeholder="Beauty clinics in Sydney, boutique fitness studios, luxury eCommerce merchants, etc."
                    className="min-h-[120px] rounded-2xl border-2 border-slate-600 bg-slate-700 text-white placeholder:text-slate-400 focus:border-[#0abab5]"
                  />
                </div>

                <div>
                  <Label htmlFor="notes" className="text-white text-base font-semibold flex items-center gap-2 mb-2">
                    <Target className="h-4 w-4" />
                    How will you promote Refer Labs?
                  </Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    placeholder="Share any launch ideas, warm accounts, or channels where you plan to promote Refer Labs."
                    className="min-h-[120px] rounded-2xl border-2 border-slate-600 bg-slate-700 text-white placeholder:text-slate-400 focus:border-[#0abab5]"
                  />
                </div>

              <div className="p-6 bg-emerald-900/20 border-2 border-emerald-500/30 rounded-2xl">
                <div className="flex items-start gap-3 mb-4">
                  <CheckCircle className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-white mb-1">What happens after you apply:</p>
                  <ul className="text-sm text-slate-300 space-y-1">
                    <li>• We&rsquo;ll review your application within 24 hours</li>
                    <li>• Upon approval, receive your unique referral link & discount code</li>
                    <li>• $250 credit automatically applied to your account</li>
                    <li>• Access to partner resources and marketing materials</li>
                    <li>• Edit every field again inside Step 2 → Edit Program Settings</li>
                  </ul>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-gradient-to-r from-[#0abab5] to-[#24d9e2] hover:from-[#099a95] hover:to-[#1fc8d1] text-white text-lg font-bold py-6 rounded-2xl shadow-2xl"
              >
                Submit Application
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <p className="text-center text-xs text-slate-400">
                By applying, you agree to our partner terms and conditions
              </p>
            </form>
          </Card>
        </div>
      </section>

    </div>
  );
}
