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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Join Our Partner Program | Refer Labs",
  description: "Earn 25% recurring revenue by referring businesses to Refer Labs. Offer new customers a $250 sign-on credit when you join our partner program.",
};

async function submitPartnerApplication(formData: FormData) {
  'use server';

  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;
  const source = formData.get('source') as string | null;
  const supabase = createServerActionClient({ cookies });

  // Send notification email to jarred@referlabs.com.au
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Refer Labs Partner Program <noreply@referlabs.com>',
        to: ['jarred@referlabs.com.au'],
        subject: `🎉 New Partner Application: ${name}`,
        html: `
          <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #0abab5 0%, #24d9e2 100%); padding: 40px; text-align: center; border-radius: 16px 16px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 900;">New Partner Application</h1>
            </div>
            <div style="background: #f8f9fa; padding: 40px; border-radius: 0 0 16px 16px;">
              <div style="background: white; padding: 32px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                <h2 style="color: #1e293b; margin-top: 0;">Partner Details</h2>
                <div style="margin: 24px 0; padding: 16px; background: #f1f5f9; border-radius: 8px;">
                  <p style="margin: 8px 0;"><strong>Name:</strong> ${name}</p>
                  <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #0abab5;">${email}</a></p>
                  <p style="margin: 8px 0;"><strong>Phone:</strong> ${phone || 'Not provided'}</p>
                  <p style="margin: 8px 0;"><strong>Applied:</strong> ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York', dateStyle: 'full', timeStyle: 'short' })}</p>
                </div>
                <div style="background: #ecfdf5; border-left: 4px solid #10b981; padding: 16px; margin-top: 24px; border-radius: 4px;">
                  <p style="margin: 0; color: #065f46;"><strong>Next Steps:</strong></p>
                  <p style="margin: 8px 0 0 0; color: #065f46;">Review this application and send them their unique referral link and discount code.</p>
                </div>
              </div>
            </div>
          </div>
        `,
      }),
    });

      if (!response.ok) {
        throw new Error('Failed to send notification email');
      }
    } catch (error) {
      console.error('Error sending partner application email:', error);
    }

    try {
      await supabase.from("partner_applications").insert([
        {
          name,
          email,
          phone,
          source,
        },
      ]);
    } catch (dbError) {
      console.error("Failed to record partner application:", dbError);
    }
}

export default function OurReferralProgramPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
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
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 mb-4">
              Partner Program Benefits
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              The most generous partner program in the referral marketing industry
            </p>
          </div>

          <div className="mb-12">
            <Card className="p-8 sm:p-10 rounded-3xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-white shadow-xl hover:shadow-2xl transition-all">
              <div className="flex items-start gap-4 mb-6">
                <div className="rounded-2xl bg-emerald-600 p-4 shadow-lg">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900 mb-2">25% Recurring Revenue</h3>
                  <p className="text-slate-600">For the lifetime of every client you bring</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-1" />
                  <p className="text-slate-700">Earn 25% of monthly subscription fees forever</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-1" />
                  <p className="text-slate-700">No cap on earnings - refer unlimited clients</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-1" />
                  <p className="text-slate-700">Passive income that grows with your network</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-1" />
                  <p className="text-slate-700">Monthly payouts via direct deposit or credit</p>
                </div>
              </div>
              <div className="mt-6 p-4 bg-emerald-100 rounded-xl">
                <p className="text-sm font-semibold text-emerald-900">
                  💰 Example: Refer 10 clients at $200/mo = $500/mo recurring income
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* What is PeppiePep */}
      <section className="py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 mb-4">
              What You&apos;ll Be Promoting
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              The world&rsquo;s most elegant referral marketing platform for premium businesses
            </p>
          </div>
          <div className="mb-10 rounded-3xl border border-[#cfeef4] bg-[#f3fcff] px-6 py-5 mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center justify-center bg-gradient-to-r from-[#0abab5] via-[#5fd9e4] to-[#1a9eb7] rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-white shadow-lg shadow-[#0a9fb3]/40 mb-3">
              + $250 Account Credit
            </div>
            <p className="text-sm text-slate-600">
              Partners can grant every new customer they sign up a $250 account credit, giving referrals instant value and a chance to explore Refer Labs before committing.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 rounded-3xl border-2 border-slate-200 bg-white hover:border-[#0abab5] transition-all">
              <div className="rounded-2xl bg-cyan-100 p-3 w-fit mb-4">
                <Users className="h-6 w-6 text-cyan-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Automated Ambassador Programs</h3>
              <p className="text-slate-600 text-sm">
                Businesses turn their best customers into brand ambassadors with personalized referral links, discount codes, and automated tracking.
              </p>
            </Card>

            <Card className="p-6 rounded-3xl border-2 border-slate-200 bg-white hover:border-[#0abab5] transition-all">
              <div className="rounded-2xl bg-purple-100 p-3 w-fit mb-4">
                <Zap className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Campaign Management</h3>
              <p className="text-slate-600 text-sm">
                Send SMS and email campaigns to ambassadors, track performance in real-time, and measure ROI with precision analytics.
              </p>
            </Card>

            <Card className="p-6 rounded-3xl border-2 border-slate-200 bg-white hover:border-[#0abab5] transition-all">
              <div className="rounded-2xl bg-emerald-100 p-3 w-fit mb-4">
                <Target className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">White-Glove Onboarding</h3>
              <p className="text-slate-600 text-sm">
                Every client gets personalized setup, custom integrations, and ongoing support - making your referrals sticky and profitable.
              </p>
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
              <p className="text-sm text-slate-600">Introduce businesses to PeppiePep using your personalized referral link</p>
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
              <form action={submitPartnerApplication} className="space-y-6">
                <input type="hidden" name="source" value="refer-program-page" />
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
                <Label htmlFor="phone" className="text-white text-base font-semibold flex items-center gap-2 mb-2">
                  <Phone className="h-4 w-4" />
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  className="rounded-2xl border-2 border-slate-600 bg-slate-700 text-white placeholder:text-slate-400 h-12 text-base focus:border-[#0abab5]"
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
