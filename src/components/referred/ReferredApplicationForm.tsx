"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Building2,
  User,
  Mail,
  Phone,
  Globe,
  DollarSign,
  Users,
  Calendar,
  ArrowRight,
  CheckCircle2,
  Loader2,
  AlertCircle
} from "lucide-react";
import { logger } from "@/lib/logger";
import { referredApplicationSchema, type ReferredApplicationFormData } from "@/lib/validation/referred-form";

interface ReferredApplicationFormProps {
  ambassadorId: string;
  businessId: string;
  referralCode: string;
}

export function ReferredApplicationForm({
  ambassadorId,
  businessId,
  referralCode,
}: ReferredApplicationFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ReferredApplicationFormData>({
    resolver: zodResolver(referredApplicationSchema),
    defaultValues: {
      ambassadorId,
      businessId,
      referralCode,
      website: "",
      referralSource: "",
    },
  });

  async function onSubmit(data: ReferredApplicationFormData) {
    setError(null);

    try {
      const response = await fetch("/api/referred/submit-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        const errorMessage = result.error || result.details || "Failed to submit application";
        logger.error("API Error:", errorMessage);
        throw new Error(errorMessage);
      }

      setSubmitted(true);

      // Track conversion event
      try {
        await fetch("/api/track-conversion", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            eventType: "contact_us_clicked",
            ambassadorId,
            businessId,
            referralCode,
            metadata: {
              source: "referred_application_form",
              businessName: data.businessName,
            },
          }),
        });
      } catch (trackingError) {
        // Don't fail the whole submission if tracking fails
        logger.error("Error tracking conversion:", trackingError);
      }
    } catch (err) {
      logger.error("Error submitting application:", err);
      const errorMessage = err instanceof Error ? err.message : "Failed to submit application";
      setError(`${errorMessage}. Please try again or book a call instead.`);
    }
  }

  async function handleBookCall() {
    try {
      // Track the schedule call event
      await fetch("/api/track-conversion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventType: "schedule_call_clicked",
          ambassadorId,
          businessId,
          referralCode,
          metadata: { source: "referred_application_form_cta" },
        }),
      });
    } catch (error) {
      logger.error("Error tracking schedule call:", error);
    } finally {
      // Redirect to Calendly regardless of tracking result
      window.location.href = "https://calendly.com/jarredkro/30min";
    }
  }

  if (submitted) {
    return (
      <Card className="max-w-2xl mx-auto p-12 text-center bg-gradient-to-br from-teal-50 to-cyan-50 border-2 border-teal-200">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-teal-500 mb-6">
          <CheckCircle2 className="h-10 w-10 text-white" />
        </div>
        <h3 className="text-3xl font-black text-slate-900 mb-4">
          Application Received!
        </h3>
        <p className="text-lg text-slate-600 mb-6">
          Thank you for your interest in Refer Labs. Our team will review your application and reach out within 24 hours.
        </p>
        <div className="bg-white rounded-xl p-6 mb-6">
          <p className="text-sm font-semibold text-slate-700 mb-2">What happens next?</p>
          <ul className="text-left space-y-2 text-sm text-slate-600">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-teal-600 mt-0.5 flex-shrink-0" />
              <span>We&apos;ll review your business details and growth goals</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-teal-600 mt-0.5 flex-shrink-0" />
              <span>A specialist will reach out to schedule a strategy call</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-teal-600 mt-0.5 flex-shrink-0" />
              <span>We&apos;ll create a custom referral program plan for your business</span>
            </li>
          </ul>
        </div>
        <p className="text-xs text-slate-500">
          Prefer to talk now?{" "}
          <button
            onClick={handleBookCall}
            className="text-teal-600 hover:text-teal-700 font-semibold underline"
          >
            Book a call instantly
          </button>
        </p>
      </Card>
    );
  }

  return (
    <div id="application-form" className="scroll-mt-20">
      <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* Form Card */}
        <Card className="p-8 bg-white shadow-xl border-slate-200">
          <div className="mb-8">
            <h3 className="text-2xl font-black text-slate-900 mb-2">
              Submit Your Application
            </h3>
            <p className="text-slate-600">
              Tell us about your business and we&apos;ll create a custom referral strategy
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Business Information Section */}
            <div className="space-y-4">
              <h4 className="font-semibold text-slate-700 flex items-center gap-2">
                <Building2 className="h-4 w-4 text-teal-600" />
                Business Information
              </h4>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Business Name *
                </label>
                <input
                  type="text"
                  {...register("businessName")}
                  required
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${errors.businessName ? 'border-red-500' : 'border-slate-300'}`}
                  placeholder="Your Company Pty Ltd"
                />
                {errors.businessName && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.businessName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Industry *
                </label>
                <select {...register("industry")}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${errors.industry ? 'border-red-500' : 'border-slate-300'}`}
                >
                  <option value="">Select your industry</option>
                  <option value="saas">SaaS / Software</option>
                  <option value="ecommerce">E-commerce</option>
                  <option value="services">Professional Services</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="fitness">Fitness / Wellness</option>
                  <option value="real-estate">Real Estate</option>
                  <option value="finance">Finance / Insurance</option>
                  <option value="education">Education</option>
                  <option value="hospitality">Hospitality</option>
                  <option value="other">Other</option>
                </select>
                {errors.industry && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.industry.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Website
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    type="url" {...register("website")}
                    className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${errors.website ? 'border-red-500' : 'border-slate-300'}`}
                    placeholder="https://yourwebsite.com"
                  />
                </div>
                {errors.website && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.website.message}
                  </p>
                )}
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Monthly Revenue *
                  </label>
                  <select {...register("monthlyRevenue")}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${errors.monthlyRevenue ? 'border-red-500' : 'border-slate-300'}`}
                  >
                    <option value="">Select range</option>
                    <option value="0-10k">$0 - $10k</option>
                    <option value="10k-50k">$10k - $50k</option>
                    <option value="50k-100k">$50k - $100k</option>
                    <option value="100k-500k">$100k - $500k</option>
                    <option value="500k+">$500k+</option>
                  </select>
                  {errors.monthlyRevenue && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.monthlyRevenue.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Team Size *
                  </label>
                  <select {...register("teamSize")}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${errors.teamSize ? 'border-red-500' : 'border-slate-300'}`}
                  >
                    <option value="">Select size</option>
                    <option value="1-5">1-5 people</option>
                    <option value="6-20">6-20 people</option>
                    <option value="21-50">21-50 people</option>
                    <option value="51-200">51-200 people</option>
                    <option value="201+">201+ people</option>
                  </select>
                  {errors.teamSize && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.teamSize.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Information Section */}
            <div className="space-y-4 pt-6 border-t border-slate-200">
              <h4 className="font-semibold text-slate-700 flex items-center gap-2">
                <User className="h-4 w-4 text-teal-600" />
                Your Contact Information
              </h4>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text" {...register("fullName")}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${errors.fullName ? 'border-red-500' : 'border-slate-300'}`}
                  placeholder="John Smith"
                />
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Email *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    type="email" {...register("email")}
                    className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${errors.email ? 'border-red-500' : 'border-slate-300'}`}
                    placeholder="john@company.com"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Phone *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    type="tel" {...register("phone")}
                    className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${errors.phone ? 'border-red-500' : 'border-slate-300'}`}
                    placeholder="+61 400 000 000"
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Your Role *
                </label>
                <input
                  type="text" {...register("role")}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${errors.role ? 'border-red-500' : 'border-slate-300'}`}
                  placeholder="Founder / Marketing Manager / CEO"
                />
                {errors.role && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.role.message}
                  </p>
                )}
              </div>
            </div>

            {/* Goals Section */}
            <div className="space-y-4 pt-6 border-t border-slate-200">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  What are your main goals? *
                </label>
                <textarea {...register("goals")}
                  rows={4}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none ${errors.goals ? 'border-red-500' : 'border-slate-300'}`}
                  placeholder="e.g., Increase customer acquisition, reduce CAC, build a referral program..."
                />
                {errors.goals && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.goals.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  How did you hear about us?
                </label>
                <input
                  type="text" {...register("referralSource")}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${errors.referralSource ? 'border-red-500' : 'border-slate-300'}`}
                  placeholder="Referral from partner, social media, search..."
                />
                {errors.referralSource && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.referralSource.message}
                  </p>
                )}
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-bold py-6 text-lg shadow-xl hover:-translate-y-0.5 transition-all duration-300"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Submit Application
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>

            <p className="text-xs text-center text-slate-500">
              By submitting, you agree to our Terms of Service and Privacy Policy
            </p>
          </form>
        </Card>

        {/* Book a Call Card */}
        <Card className="p-8 bg-gradient-to-br from-slate-900 to-teal-900 text-white shadow-xl sticky top-24">
          <div className="mb-6">
            <Calendar className="h-12 w-12 text-teal-400 mb-4" />
            <h3 className="text-2xl font-black mb-2">
              Prefer to Talk First?
            </h3>
            <p className="text-slate-300">
              Book a 30-minute strategy call and we&apos;ll walk you through how Refer Labs can transform your revenue.
            </p>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-teal-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold">Custom Strategy Session</p>
                <p className="text-sm text-slate-400">Tailored to your business model</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-teal-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold">ROI Projection</p>
                <p className="text-sm text-slate-400">See potential referral revenue</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-teal-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold">No Commitment Required</p>
                <p className="text-sm text-slate-400">Just exploring? That&apos;s fine!</p>
              </div>
            </div>
          </div>

          <Button
            onClick={handleBookCall}
            className="w-full bg-white text-slate-900 hover:bg-slate-100 font-bold py-6 text-lg shadow-xl transition-all duration-300"
          >
            <Calendar className="mr-2 h-5 w-5" />
            Schedule Your Call Now
          </Button>

          <p className="text-xs text-center text-slate-400 mt-4">
            Usually available within 24 hours
          </p>
        </Card>
      </div>
    </div>
  );
}
