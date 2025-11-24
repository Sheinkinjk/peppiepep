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
  const [formData, setFormData] = useState({ name: "", phone: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="aurora flex min-h-screen items-center justify-center bg-gradient-to-b from-pink-50 via-white to-white p-4">
        <Card className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/70 bg-white/90 p-8 shadow-2xl backdrop-blur">
          <div className="absolute -right-12 -top-6 h-32 w-32 rounded-full bg-gradient-to-br from-pink-500/20 to-orange-400/20 blur-3xl" />
          <div className="absolute -left-10 bottom-0 h-24 w-24 rounded-full bg-gradient-to-tr from-purple-500/20 to-sky-500/20 blur-3xl" />

          <div className="relative flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>

            <h1 className="mb-2 text-3xl font-bold text-slate-900">You're all set, {formData.name}!</h1>
            <p className="mb-6 text-lg leading-relaxed text-slate-700">
              We've sent a confirmation SMS to <span className="font-semibold">{formData.phone}</span>.
            </p>

            <div className="w-full rounded-lg bg-purple-50 p-4 mb-6">
              <p className="text-sm font-semibold text-purple-900 mb-2">What happens next:</p>
              <ul className="text-sm text-purple-800 space-y-2 text-left">
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-0.5">•</span>
                  <span>You'll receive a booking link via SMS within 5 minutes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-0.5">•</span>
                  <span>Your friend Sarah gets $15 credit when you complete your first visit</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-0.5">•</span>
                  <span>You get 20% off your first service</span>
                </li>
              </ul>
            </div>

            <Link href="/demo">
              <Button className="w-full">
                See How This Works (Demo Dashboard)
              </Button>
            </Link>

            <p className="mt-6 text-xs text-slate-500">
              This is a demo. In production, Sarah would see this referral tracked in her dashboard instantly.
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="aurora flex min-h-screen items-center justify-center bg-gradient-to-b from-pink-50 via-white to-white p-4">
      <Card className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/70 bg-white/90 p-8 shadow-2xl backdrop-blur">
        <div className="absolute -right-12 -top-6 h-32 w-32 rounded-full bg-gradient-to-br from-pink-500/20 to-orange-400/20 blur-3xl" />
        <div className="absolute -left-10 bottom-0 h-24 w-24 rounded-full bg-gradient-to-tr from-purple-500/20 to-sky-500/20 blur-3xl" />

        <div className="relative">
          <div className="mb-6">
            <div className="mb-2 flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-500" />
              <div>
                <p className="text-sm font-semibold text-slate-900">Glow Beauty Studio</p>
                <p className="text-xs text-slate-500">Melbourne, VIC</p>
              </div>
            </div>
          </div>

          <h1 className="mb-2 text-3xl font-bold text-slate-900">You've been hooked up!</h1>
          <p className="mb-6 text-lg leading-relaxed text-slate-700">
            <span className="font-semibold text-slate-900">Sarah Mitchell</span> wants you to get{" "}
            <span className="font-semibold text-purple-700">20% off your first visit</span> at{" "}
            <span className="font-semibold text-slate-900">Glow Beauty Studio</span>.
          </p>

          <div className="mb-6 rounded-lg bg-amber-50 border border-amber-200 p-3">
            <p className="text-sm font-medium text-amber-900">
              💎 Limited offer: Valid for new customers only
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Your name</Label>
              <Input
                id="name"
                name="name"
                required
                placeholder="Your full name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="phone">Your phone (for booking)</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                required
                placeholder="+61 400 123 456"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>

            <Button type="submit" size="lg" className="w-full">
              Claim My 20% Off
            </Button>
          </form>

          <div className="mt-6 space-y-3 rounded-lg bg-slate-50 p-4">
            <p className="text-xs font-semibold text-slate-700">Why customers love this:</p>
            <div className="flex items-start gap-2 text-xs text-slate-600">
              <span>✓</span>
              <span>Instant booking confirmation via SMS</span>
            </div>
            <div className="flex items-start gap-2 text-xs text-slate-600">
              <span>✓</span>
              <span>Your friend gets rewarded when you visit</span>
            </div>
            <div className="flex items-start gap-2 text-xs text-slate-600">
              <span>✓</span>
              <span>No coupon codes or paperwork needed</span>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-slate-400">
            Powered by <Link href="/" className="font-semibold text-purple-600 hover:text-purple-700">Pepform</Link>
          </p>
        </div>
      </Card>
    </div>
  );
}
