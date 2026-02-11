import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";
import {
  Users,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Shield,
  Zap,
  Target,
  Globe,
  Handshake,
  DollarSign,
  Calendar,
} from "lucide-react";
import { createServiceClient } from "@/lib/supabase";
import { redirect } from "next/navigation";
import { nanoid } from "nanoid";
import { generateUniqueDiscountCode } from "@/lib/discount-codes";
import { ensureAbsoluteUrl } from "@/lib/urls";
import { PartnerApplicationSuccessModal } from "@/components/PartnerApplicationSuccessModal";
import { logReferralEvent } from "@/lib/referral-events";
import { PartnerSteppedForm } from "@/components/PartnerSteppedForm";

export const metadata = generateSEOMetadata(seoConfig.partnerProgram);

const calendlyUrl = "https://calendly.com/jarred-referlabs/30min?month=2026-01";

async function submitPartnerApplication(formData: FormData) {
  "use server";
  const supabase = await createServiceClient();
  const resolvedBusinessId = process.env.PARTNER_PROGRAM_BUSINESS_ID;
  if (!resolvedBusinessId) {
    console.error("Missing PARTNER_PROGRAM_BUSINESS_ID env variable");
    redirect("/our-referral-program?applied=0");
  }
  const businessId = resolvedBusinessId;

  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  const refAmbassadorCookie = cookieStore.get("ref_ambassador");
  let attributedAmbassadorId: string | null = null;
  let attributedAmbassadorCode: string | null = null;
  let attributedBusinessId: string | null = null;

  if (refAmbassadorCookie?.value) {
    try {
      const ambassadorData = JSON.parse(refAmbassadorCookie.value);
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
  const utmSource = getString("utm_source");
  const utmCampaign = getString("utm_campaign");
  const source = getString("source") ?? utmSource ?? "partner_program";
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
            consent_given: true,
            locale: "en",
            metadata: {
              company,
              website,
              application_type: "partner",
              source: "partner_program",
            },
          },
        ]).select().single();

        if (referralData) {
          try {
            await supabase.from("stripe_commissions").insert([
              {
                business_id: attributedBusinessId,
                ambassador_id: attributedAmbassadorId,
                referral_id: referralData.id,
                amount: 10000,
                currency: "aud",
                commission_type: "signup_bonus",
                status: "approved",
                approved_at: new Date().toISOString(),
                metadata: {
                  rule: "Partner signup bonus",
                  amount_aud: 100,
                  partner_company: company,
                  partner_email: email,
                },
              },
            ]);
          } catch (commissionError) {
            console.error("Failed to create commission:", commissionError);
          }
        }

        await logReferralEvent({
          supabase,
          businessId: attributedBusinessId,
          ambassadorId: attributedAmbassadorId,
          referralId: null,
          eventType: "signup_submitted",
          source,
          device: null,
          metadata: {
            referred_customer_id: customerId,
            customer_id: customerId,
            application_company: company,
            utm_source: utmSource ?? "direct",
            utm_campaign: utmCampaign ?? "direct",
          },
        });
      } catch (refError) {
        console.error("Failed to create referral record:", refError);
      }
    } else {
      try {
        await logReferralEvent({
          supabase,
          businessId,
          ambassadorId: null,
          referralId: null,
          eventType: "signup_submitted",
          source,
          device: null,
          metadata: {
            customer_id: customerId,
            application_company: company,
            utm_source: utmSource ?? "direct",
            utm_campaign: utmCampaign ?? "direct",
          },
        });
      } catch (refError) {
        console.error("Failed to log partner application event:", refError);
      }
    }

    const siteOrigin = ensureAbsoluteUrl(process.env.NEXT_PUBLIC_SITE_URL) ||
      (process.env.VERCEL_URL ? ensureAbsoluteUrl(`https://${process.env.VERCEL_URL}`) : null) ||
      "https://referlabs.com.au";
    const referralLink = referralCode ? `${siteOrigin}/r/${referralCode}` : null;

    if (process.env.RESEND_API_KEY) {
      if (email) {
        try {
          await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: "Refer Labs Partner Program <jarred@referlabs.com.au>",
              to: [email],
              subject: "Your Referral Partner Application - Refer Labs",
              html: `
              <div style="font-family:Inter,system-ui,-apple-system,sans-serif;margin:0 auto;max-width:640px;">
                <div style="padding:32px;border-radius:24px 24px 0 0;background:linear-gradient(135deg,#0abab5,#24d9e2);color:white;">
                  <p style="margin:0;text-transform:uppercase;letter-spacing:0.3em;font-size:12px;">Referral Partner Program</p>
                  <h1 style="margin:8px 0 0;font-size:28px;font-weight:800;">Application Received!</h1>
                  <p style="margin:4px 0 0;font-size:16px;opacity:0.9;">Thank you for your interest, ${fullName || fallbackName}</p>
                </div>
                <div style="padding:32px;border:1px solid #e2e8f0;border-top:0;border-radius:0 0 24px 24px;background:white;">
                  <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#0f172a;">
                    We've received your application to join the Refer Labs Referral Partner Program. Our team will review your submission and get back to you <strong>within 2 business days</strong>.
                  </p>
                  <div style="margin:24px 0;padding:16px;border-radius:16px;background:#ecfdf5;border:1px solid #bbf7d0;">
                    <p style="margin:0 0 8px;font-weight:600;color:#065f46;">What's Next?</p>
                    <ul style="margin:0;padding-left:20px;color:#065f46;font-size:14px;line-height:1.8;">
                      <li>We'll review your application and network</li>
                      <li>If approved, you'll receive onboarding details</li>
                      <li>Start referring overseas companies to Refer Labs</li>
                      <li>Earn commission on every deal we close from your introductions</li>
                    </ul>
                  </div>
                  <p style="margin:24px 0 0;font-size:14px;color:#475569;">
                    If you have any questions in the meantime, feel free to reply to this email.
                  </p>
                  <div style="margin-top:32px;padding-top:24px;border-top:1px solid #e2e8f0;">
                    <p style="margin:0;font-size:12px;color:#94a3b8;">
                      Best regards,<br/>
                      <strong style="color:#0f172a;">The Refer Labs Team</strong>
                    </p>
                  </div>
                </div>
              </div>
            `,
            }),
          });
        } catch (emailError) {
          console.error("Failed to send applicant confirmation email", emailError);
        }
      }

      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Refer Labs Partner Program <jarred@referlabs.com.au>",
            to: ["jarred@referlabs.com.au"],
            subject: `New referral partner applicant: ${fallbackName}`,
            html: `
            <div style="font-family:Inter,system-ui,-apple-system,sans-serif;margin:0 auto;max-width:640px;">
              <div style="padding:32px;border-radius:24px 24px 0 0;background:linear-gradient(135deg,#0abab5,#24d9e2);color:white;">
                <p style="margin:0;text-transform:uppercase;letter-spacing:0.3em;font-size:12px;">New Referral Partner</p>
                <h1 style="margin:8px 0 0;font-size:28px;font-weight:800;">${fallbackName}</h1>
                ${company ? `<p style="margin:4px 0 0;font-size:16px;">${company}</p>` : ""}
              </div>
              <div style="padding:32px;border:1px solid #e2e8f0;border-top:0;border-radius:0 0 24px 24px;background:white;">
                <h2 style="margin-top:0;font-size:18px;color:#0f172a;">Snapshot</h2>
                <ul style="list-style:none;padding:0;margin:0 0 16px;">
                  ${email ? `<li style="margin:6px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></li>` : ""}
                  ${phone ? `<li style="margin:6px 0;"><strong>Phone:</strong> ${phone}</li>` : ""}
                  ${website ? `<li style="margin:6px 0;"><strong>Website:</strong> <a href="${website}" target="_blank" rel="noopener noreferrer">${website}</a></li>` : ""}
                  ${instagram_handle ? `<li style="margin:6px 0;"><strong>Instagram:</strong> @${instagram_handle}</li>` : ""}
                  ${linkedin_handle ? `<li style="margin:6px 0;"><strong>LinkedIn:</strong> ${linkedin_handle}</li>` : ""}
                </ul>
                ${audience_profile ? `<div style="margin-top:16px;"><strong>Network:</strong><p style="margin:6px 0;color:#475569;">${audience_profile}</p></div>` : ""}
                ${notes ? `<div style="margin-top:16px;"><strong>Notes:</strong><p style="margin:6px 0;color:#475569;">${notes}</p></div>` : ""}
                ${
                  referralLink
                    ? `<div style="margin-top:24px;padding:16px;border-radius:16px;background:#ecfdf5;border:1px solid #bbf7d0;">
                        <p style="margin:0 0 8px;font-weight:600;">Auto-generated link</p>
                        <p style="margin:0;"><a href="${referralLink}" target="_blank" rel="noopener noreferrer">${referralLink}</a></p>
                        ${discountCode ? `<p style="margin:8px 0 0;font-size:14px;color:#065f46;">Discount code: <strong>${discountCode}</strong></p>` : ""}
                      </div>`
                    : ""
                }
                ${
                  attributedAmbassadorCode
                    ? `<div style="margin-top:16px;padding:16px;border-radius:16px;background:#fef3c7;border:1px solid #fcd34d;">
                        <p style="margin:0 0 4px;font-weight:600;color:#92400e;">Referred by Ambassador</p>
                        <p style="margin:0;font-size:14px;color:#78350f;">Attributed to referral code: <strong>${attributedAmbassadorCode}</strong></p>
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
  searchParams?:
    | Record<string, string | string[] | undefined>
    | Promise<Record<string, string | string[] | undefined>>;
};

function isPromise<T>(value: unknown): value is Promise<T> {
  return typeof value === "object" && value !== null && "then" in (value as Record<string, unknown>);
}

export default async function OurReferralProgramPage({ searchParams }: ReferralProgramPageProps) {
  const resolvedParams = isPromise(searchParams) ? await searchParams : searchParams ?? {};
  const applied = resolvedParams.applied === "1";
  const applyError = resolvedParams.applied === "0";
  const utmSource =
    typeof resolvedParams.utm_source === "string" ? resolvedParams.utm_source : undefined;
  const utmCampaign =
    typeof resolvedParams.utm_campaign === "string" ? resolvedParams.utm_campaign : undefined;
  const formSource = "partner_program";

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#04101a] via-[#081820] to-[#020508] text-slate-50">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(10,186,181,0.06),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(87,230,255,0.04),transparent_50%)]" />
      </div>

      <PartnerApplicationSuccessModal />

      <main id="main-content" className="relative mx-auto max-w-6xl px-5 sm:px-8 lg:px-12 pb-24 pt-16">

        {/* Hero */}
        <section className="text-center space-y-8 mb-24">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] border border-white/10 px-4 py-1.5 backdrop-blur-sm">
            <Handshake className="h-3.5 w-3.5 text-cyan-400" />
            <span className="text-xs font-semibold text-white/80 tracking-wide">Referral Partner Program</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.08] text-white max-w-4xl mx-auto tracking-tight">
            Earn Commission by Referring{" "}
            <span className="text-cyan-400">Companies to Refer Labs</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
            Know an overseas company looking to enter the Australian market? Introduce them to Refer Labs and earn a commission on every deal we close from your referral.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <a
              href="#apply"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0AA7B5] px-8 py-4 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#22C0CD] shadow-xl shadow-black/20"
            >
              Apply Now
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-white/10"
            >
              <Calendar className="h-4 w-4" />
              Schedule a Call
            </a>
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-24">
          <div className="text-center space-y-4 mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">How it works</p>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Simple, Transparent, Rewarding
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                num: "01",
                title: "Apply",
                desc: "Submit a quick application telling us about your network and how you connect with overseas companies.",
              },
              {
                num: "02",
                title: "Get Approved",
                desc: "We review your application and onboard you as a referral partner within 2 business days.",
              },
              {
                num: "03",
                title: "Make Introductions",
                desc: "Introduce overseas companies looking to enter Australia. We handle the sales conversation from there.",
              },
              {
                num: "04",
                title: "Earn Commission",
                desc: "Receive a commission on every deal we close from your referral. Paid monthly, no cap on earnings.",
              },
            ].map((step) => (
              <div key={step.num} className="rounded-2xl bg-white/[0.03] border border-white/[0.08] p-6 hover:border-white/15 transition-colors">
                <span className="text-cyan-400 text-xs font-black tracking-wider">{step.num}</span>
                <h3 className="text-white font-bold mt-3 mb-2">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What You Earn */}
        <section className="mb-24">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Commission Card */}
            <div className="relative overflow-hidden rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/[0.08] to-transparent p-8">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(10,167,181,0.12),transparent_50%)]" />
              <div className="relative">
                <div className="h-12 w-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-5">
                  <DollarSign className="h-6 w-6 text-cyan-400" />
                </div>
                <h3 className="text-2xl font-black text-white mb-2">Referral Commission</h3>
                <p className="text-slate-400 text-sm mb-5">For every company that becomes a client</p>
                <div className="space-y-3">
                  {[
                    "Commission paid on closed retainer deals",
                    "No cap on number of referrals",
                    "Monthly payouts via direct deposit",
                    "Transparent tracking of all your referrals",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle2 className="h-4 w-4 text-cyan-400 flex-shrink-0" />
                      <p className="text-slate-300 text-sm">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Support Card */}
            <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8">
              <div className="relative">
                <div className="h-12 w-12 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center mb-5">
                  <Shield className="h-6 w-6 text-cyan-400" />
                </div>
                <h3 className="text-2xl font-black text-white mb-2">Partner Support</h3>
                <p className="text-slate-400 text-sm mb-5">Everything you need to refer with confidence</p>
                <div className="space-y-3">
                  {[
                    "Dedicated partner manager for your referrals",
                    "Collateral and pitch materials to share",
                    "Real-time updates on referral status",
                    "We handle the entire sales process end-to-end",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle2 className="h-4 w-4 text-cyan-400 flex-shrink-0" />
                      <p className="text-slate-300 text-sm">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ideal Referral Partners */}
        <section className="mb-24">
          <div className="text-center space-y-4 mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">Who should apply</p>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Ideal Referral Partners
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              You do not need to be in sales. If you have relationships with overseas companies considering Australia, you are a great fit.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: Globe,
                title: "Consultants & Advisors",
                desc: "Business consultants, market entry advisors, and go-to-market strategists who work with companies expanding internationally.",
              },
              {
                icon: Users,
                title: "Investors & VCs",
                desc: "Angel investors, VCs, and fund managers with portfolio companies looking to enter the Australian or APAC market.",
              },
              {
                icon: Handshake,
                title: "Agency Founders",
                desc: "Digital agencies, PR firms, and marketing agencies with overseas clients who want Australian customers.",
              },
              {
                icon: TrendingUp,
                title: "Accelerator Alumni",
                desc: "Founders and mentors connected to startup ecosystems with companies looking for APAC distribution.",
              },
              {
                icon: Zap,
                title: "Industry Connectors",
                desc: "People with strong networks across SaaS, fintech, healthtech, or e-commerce who frequently make introductions.",
              },
              {
                icon: Target,
                title: "Former Executives",
                desc: "Ex-founders or executives with international networks and relationships with companies at the $1M-$50M revenue stage.",
              },
            ].map((profile) => (
              <div key={profile.title} className="rounded-2xl bg-white/[0.03] border border-white/5 p-6 hover:border-white/10 transition-colors">
                <div className="h-10 w-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-4">
                  <profile.icon className="h-5 w-5 text-cyan-400" />
                </div>
                <h3 className="text-white font-bold mb-2">{profile.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{profile.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What We Do With Your Referrals */}
        <section className="mb-24">
          <div className="relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 via-white/[0.02] to-transparent p-8 sm:p-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(10,167,181,0.1),transparent_50%)]" />
            <div className="relative">
              <div className="text-center mb-10">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400 mb-3">Your referral is in good hands</p>
                <h2 className="text-3xl sm:text-4xl font-black text-white">
                  What Happens After You Refer
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
                {[
                  "We reach out within 24 hours of your introduction",
                  "Full scoping call to understand their product and goals",
                  "Tailored 90-day pilot proposal for Australian market entry",
                  "Sales, partnerships, and distribution executed in parallel",
                  "Weekly reporting so you stay informed on progress",
                  "Commission paid when the deal closes",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/[0.06]">
                    <CheckCircle2 className="h-4 w-4 text-cyan-400 flex-shrink-0" />
                    <p className="text-slate-300 text-sm font-medium">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section id="apply" className="mb-24 scroll-mt-24">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-8 sm:p-12">
            <div className="text-center mb-10">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400 mb-3">Apply now</p>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
                Become a Referral Partner
              </h2>
              <p className="text-slate-400 max-w-xl mx-auto">
                Tell us about yourself and your network. Applications are reviewed within 2 business days.
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              <PartnerSteppedForm
                formAction={submitPartnerApplication}
                formSource={formSource}
                utmSource={utmSource}
                utmCampaign={utmCampaign}
                applied={applied}
                applyError={applyError}
              />
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-teal-500/10 to-cyan-500/10 rounded-3xl blur-3xl" />
          <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] px-8 py-16 sm:px-12 text-center">
            <div className="max-w-2xl mx-auto space-y-6">
              <h2 className="text-3xl sm:text-4xl font-black text-white">
                Have Questions About the Program?
              </h2>
              <p className="text-lg text-slate-300">
                Book a quick call and we will walk you through how the referral partner program works and whether it is the right fit.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                <a
                  href={calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0AA7B5] px-8 py-4 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#22C0CD] shadow-xl shadow-black/20"
                >
                  <Calendar className="h-4 w-4" />
                  Schedule a Call
                </a>
                <a
                  href="#apply"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-white/10"
                >
                  Apply Now
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
