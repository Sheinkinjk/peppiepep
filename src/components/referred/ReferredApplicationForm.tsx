"use client";

import { useState } from "react";
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
  Loader2
} from "lucide-react";

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
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      // Business Information
      businessName: formData.get("businessName"),
      industry: formData.get("industry"),
      website: formData.get("website"),
      monthlyRevenue: formData.get("monthlyRevenue"),
      teamSize: formData.get("teamSize"),

      // Contact Information
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      role: formData.get("role"),

      // Additional Context
      referralSource: formData.get("referralSource"),
      goals: formData.get("goals"),

      // Attribution
      ambassadorId,
      businessId,
      referralCode,
    };

    console.log("📋 Form submission started");
    console.log("Form data:", {
      businessName: data.businessName,
      industry: data.industry,
      fullName: data.fullName,
      email: data.email,
    });
    console.log("Attribution data:", {
      ambassadorId,
      businessId,
      referralCode,
    });

    try {
      console.log("🚀 Sending POST request to /api/referred/submit-application");

      const response = await fetch("/api/referred/submit-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      console.log("📡 Response status:", response.status, response.statusText);

      const result = await response.json();
      console.log("📦 Response data:", result);

      if (!response.ok) {
        const errorMessage = result.error || result.details || "Failed to submit application";
        console.error("❌ API Error:", errorMessage);
        throw new Error(errorMessage);
      }

      console.log("✅ Application submitted successfully!");
      console.log("Referral ID:", result.referralId);

      setSubmitted(true);

      // Track conversion event
      console.log("📊 Tracking conversion event...");
      try {
        const trackingResponse = await fetch("/api/track-conversion", {
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

        if (trackingResponse.ok) {
          console.log("✅ Conversion event tracked successfully");
        } else {
          console.warn("⚠️ Failed to track conversion event, but form submitted");
        }
      } catch (trackingError) {
        console.error("⚠️ Error tracking conversion:", trackingError);
        // Don't fail the whole submission if tracking fails
      }
    } catch (err) {
      console.error("❌ Error submitting application:", err);
      const errorMessage = err instanceof Error ? err.message : "Failed to submit application";
      setError(`${errorMessage}. Please try again or book a call instead.`);
    } finally {
      setLoading(false);
    }
  }

  async function handleBookCall() {
    console.log("📞 Book a Call clicked");
    console.log("Attribution data:", {
      ambassadorId,
      businessId,
      referralCode,
    });

    try {
      // Track the schedule call event
      console.log("📊 Tracking schedule_call_clicked event...");

      const response = await fetch("/api/track-conversion", {
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

      if (response.ok) {
        console.log("✅ Event tracked successfully");
      } else {
        console.warn("⚠️ Event tracking failed:", response.status);
      }

      console.log("🔗 Redirecting to Calendly...");
      window.location.href = "https://calendly.com/jarredkro/30min";
    } catch (error) {
      console.error("❌ Error tracking schedule call:", error);
      console.log("🔗 Redirecting to Calendly anyway...");
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
              <span>We'll review your business details and growth goals</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-teal-600 mt-0.5 flex-shrink-0" />
              <span>A specialist will reach out to schedule a strategy call</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-teal-600 mt-0.5 flex-shrink-0" />
              <span>We'll create a custom referral program plan for your business</span>
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
              Tell us about your business and we'll create a custom referral strategy
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
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
                  name="businessName"
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Your Company Pty Ltd"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Industry *
                </label>
                <select
                  name="industry"
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
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
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Website
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    type="url"
                    name="website"
                    className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="https://yourwebsite.com"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Monthly Revenue *
                  </label>
                  <select
                    name="monthlyRevenue"
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    <option value="">Select range</option>
                    <option value="0-10k">$0 - $10k</option>
                    <option value="10k-50k">$10k - $50k</option>
                    <option value="50k-100k">$50k - $100k</option>
                    <option value="100k-500k">$100k - $500k</option>
                    <option value="500k+">$500k+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Team Size *
                  </label>
                  <select
                    name="teamSize"
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    <option value="">Select size</option>
                    <option value="1-5">1-5 people</option>
                    <option value="6-20">6-20 people</option>
                    <option value="21-50">21-50 people</option>
                    <option value="51-200">51-200 people</option>
                    <option value="201+">201+ people</option>
                  </select>
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
                  type="text"
                  name="fullName"
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="John Smith"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Email *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="john@company.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Phone *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    type="tel"
                    name="phone"
                    required
                    className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="+61 400 000 000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Your Role *
                </label>
                <input
                  type="text"
                  name="role"
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Founder / Marketing Manager / CEO"
                />
              </div>
            </div>

            {/* Goals Section */}
            <div className="space-y-4 pt-6 border-t border-slate-200">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  What are your main goals? *
                </label>
                <textarea
                  name="goals"
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                  placeholder="e.g., Increase customer acquisition, reduce CAC, build a referral program..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  How did you hear about us?
                </label>
                <input
                  type="text"
                  name="referralSource"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Referral from partner, social media, search..."
                />
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-bold py-6 text-lg shadow-xl hover:-translate-y-0.5 transition-all duration-300"
            >
              {loading ? (
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
              Book a 30-minute strategy call and we'll walk you through how Refer Labs can transform your revenue.
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
                <p className="text-sm text-slate-400">Just exploring? That's fine!</p>
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
