"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function DemoReferralPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/demo-referrals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          source: "demo-referral-page",
          context: {
            path: "/r/demo-referral",
            referrer:
              typeof document !== "undefined" ? document.referrer || null : null,
          },
        }),
      });

      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(payload.error || "Failed to submit referral");
      }

      setSubmitted(true);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-black text-white">
        <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4 py-12 lg:px-8">
          <div className="flex flex-col gap-3">
            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-amber-200">
              Referral confirmed
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              You are all set, {formData.name} — welcome to Glow Beauty Studio
            </h1>
            <p className="max-w-2xl text-sm text-slate-200/80">
              We have sent a confirmation SMS to <span className="font-semibold text-white">{formData.phone}</span>.
              Your spot is saved and your friend earns credit when you complete your visit.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
            <Card className="relative overflow-hidden border border-white/10 bg-white/5 p-8 shadow-2xl">
              <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-gradient-to-br from-pink-500/30 to-orange-400/30 blur-3xl" />
              <div className="absolute -left-24 bottom-0 h-40 w-40 rounded-full bg-gradient-to-tr from-purple-500/30 to-sky-500/30 blur-3xl" />

              <div className="relative space-y-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/20 text-green-200">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-wide text-green-200/80">Success</p>
                    <p className="text-lg font-semibold text-white">Referral locked in</p>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-wide text-slate-300">Your offer</p>
                    <p className="text-lg font-semibold text-white">20% off first visit</p>
                    <p className="text-xs text-slate-300/80 mt-1">Applied automatically on booking</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-wide text-slate-300">Friend reward</p>
                    <p className="text-lg font-semibold text-white">$15 credit</p>
                    <p className="text-xs text-slate-300/80 mt-1">Sarah earns this when you visit</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-wide text-slate-300">Status</p>
                    <p className="text-lg font-semibold text-white">Pending booking</p>
                    <p className="text-xs text-slate-300/80 mt-1">We will text you a booking link shortly</p>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm font-semibold text-white mb-2">What happens next</p>
                  <ul className="space-y-2 text-sm text-slate-100/90">
                    <li className="flex gap-2">
                      <span className="text-emerald-300">•</span>
                      <span>You will receive your booking link via SMS within 5 minutes.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-emerald-300">•</span>
                      <span>Show the SMS when you arrive; your discount applies automatically.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-emerald-300">•</span>
                      <span>Your friend’s credit unlocks as soon as you complete your first service.</span>
                    </li>
                  </ul>
                </div>

                <Link href="/demo">
                  <Button className="w-full bg-white text-slate-900 hover:bg-slate-100">
                    See how tracking works in the demo dashboard
                  </Button>
                </Link>

                <p className="text-center text-xs text-slate-300/80">
                  This is a demo. In production, your referrer sees this update instantly in their portal.
                </p>
              </div>
            </Card>

            <div className="space-y-4">
              <Card className="border border-white/10 bg-white/5 p-6 text-white shadow-xl">
                <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-amber-200">
                  Glow Beauty Studio
                  <span className="text-xs rounded-full bg-amber-100/20 px-2 py-0.5 text-amber-100">Premium</span>
                </div>
                <h3 className="mt-2 text-2xl font-bold">A luxury salon experience</h3>
                <p className="mt-2 text-sm text-slate-100/80">
                  Curated treatments, expert stylists, and a smooth referral journey backed by Pepform automation.
                </p>
                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                    <p className="text-xs uppercase tracking-wide text-slate-300">Location</p>
                    <p className="font-semibold text-white">Melbourne, VIC</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                    <p className="text-xs uppercase tracking-wide text-slate-300">Offer</p>
                    <p className="font-semibold text-white">20% off your first visit</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                    <p className="text-xs uppercase tracking-wide text-slate-300">Response time</p>
                    <p className="font-semibold text-white">Under 5 minutes</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                    <p className="text-xs uppercase tracking-wide text-slate-300">Reward</p>
                    <p className="font-semibold text-white">$15 credit to referrer</p>
                  </div>
                </div>
              </Card>

              <Card className="border border-white/10 bg-gradient-to-br from-emerald-500/20 to-sky-500/10 p-6 text-white shadow-lg">
                <p className="text-xs uppercase tracking-wide text-emerald-100">Powered by Pepform</p>
                <h4 className="mt-2 text-lg font-semibold">Enterprise-grade tracking</h4>
                <ul className="mt-2 space-y-2 text-sm text-emerald-50/90">
                  <li className="flex gap-2">
                    <span className="text-emerald-200">•</span>
                    Instant Supabase logging of every referral and reward.
                  </li>
                  <li className="flex gap-2">
                    <span className="text-emerald-200">•</span>
                    Twilio-ready SMS notifications for seamless follow up.
                  </li>
                  <li className="flex gap-2">
                    <span className="text-emerald-200">•</span>
                    Live dashboards so ambassadors see results immediately.
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-black text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 lg:grid-cols-[1.5fr_1fr] lg:px-10">
        <div className="space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-100">
            Premium demo
          </div>
          <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl">
            You have been hooked up to Glow Beauty Studio
          </h1>
          <p className="text-sm text-slate-200/90">
            Sarah Mitchell is sharing her VIP offer with you. Claim it in under 30 seconds—no codes or paperwork.
          </p>

          <Card className="relative overflow-hidden border border-white/10 bg-white/5 p-8 shadow-2xl">
            <div className="absolute -right-28 -top-20 h-52 w-52 rounded-full bg-gradient-to-br from-pink-500/20 to-orange-400/20 blur-3xl" />
            <div className="absolute -left-28 bottom-0 h-48 w-48 rounded-full bg-gradient-to-tr from-purple-500/20 to-sky-500/20 blur-3xl" />

            <div className="relative space-y-5">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-500" />
                <div>
                  <p className="text-sm font-semibold text-white">Glow Beauty Studio</p>
                  <p className="text-xs text-slate-200/80">Melbourne, VIC • Luxe treatments</p>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
                <p className="text-slate-100/90">
                  Sarah Mitchell wants you to get <span className="font-semibold text-white">20% off your first visit</span>.
                  Your friend receives <span className="font-semibold text-white">$15 credit</span> once you complete your service.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-white">Your name</Label>
                  <Input
                    id="name"
                    name="name"
                    required
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1 bg-white/10 text-white placeholder:text-slate-400"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-white">Your phone (for booking)</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="+61 400 123 456"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="mt-1 bg-white/10 text-white placeholder:text-slate-400"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-white">Email (optional)</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-1 bg-white/10 text-white placeholder:text-slate-400"
                  />
                </div>

                {error && (
                  <div className="rounded-lg border border-red-200/60 bg-red-500/10 p-3 text-sm text-red-100">
                    {error}
                  </div>
                )}

                <Button type="submit" size="lg" className="w-full bg-white text-slate-900 hover:bg-slate-100" disabled={loading}>
                  {loading ? "Saving..." : "Claim my 20% off"}
                </Button>
              </form>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-slate-200/90">
                <p className="font-semibold text-white mb-2">Why this feels premium</p>
                <div className="grid gap-2 sm:grid-cols-2">
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-200">•</span>
                    <span>Instant SMS booking link—no codes needed.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-200">•</span>
                    <span>Live tracking so your friend sees credit instantly.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-200">•</span>
                    <span>Securely logged to Supabase for auditability.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-200">•</span>
                    <span>Automated SMS ready for Twilio in production.</span>
                  </div>
                </div>
              </div>

              <p className="text-center text-xs text-slate-300/80">
                Powered by <Link href="/" className="font-semibold text-amber-200 hover:text-amber-100">Pepform</Link>. Demo submissions are logged to Supabase to mirror the real product.
              </p>
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="border border-white/10 bg-gradient-to-br from-purple-600/30 via-pink-500/20 to-orange-400/20 p-6 text-white shadow-2xl">
            <p className="text-xs uppercase tracking-wide text-white/80">What you unlock</p>
            <h3 className="mt-2 text-2xl font-bold">Effortless luxury booking</h3>
            <ul className="mt-3 space-y-2 text-sm text-white/90">
              <li className="flex gap-2">
                <span className="text-amber-200">•</span>
                Concierge-grade welcome SMS and reminders.
              </li>
              <li className="flex gap-2">
                <span className="text-amber-200">•</span>
                Priority scheduling with Glow’s senior stylists.
              </li>
              <li className="flex gap-2">
                <span className="text-amber-200">•</span>
                Cashless credits applied automatically at checkout.
              </li>
              <li className="flex gap-2">
                <span className="text-amber-200">•</span>
                Dedicated support if you need to adjust your booking.
              </li>
            </ul>
          </Card>

          <Card className="border border-white/10 bg-white/5 p-6 text-white shadow-xl">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-emerald-200">
              Trusted experience
            </div>
            <h4 className="mt-2 text-lg font-semibold">Why Melbourne locals love Glow</h4>
            <div className="mt-3 grid gap-3 text-sm text-slate-100/90">
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <p className="font-semibold text-white">4.9/5 average rating</p>
                <p className="text-xs text-slate-200/80 mt-1">Across facial, hair, and skin treatments</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <p className="font-semibold text-white">Under 5 min response</p>
                <p className="text-xs text-slate-200/80 mt-1">SMS confirmations and schedule support</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <p className="font-semibold text-white">Privacy-first tracking</p>
                <p className="text-xs text-slate-200/80 mt-1">Supabase-backed logging for transparency</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
