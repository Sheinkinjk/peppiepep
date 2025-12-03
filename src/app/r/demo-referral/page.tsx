"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Copy, Sparkles, Trophy, TrendingUp, Gift, Award, Users, Check, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function DemoReferralPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [personalizedLink, setPersonalizedLink] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });
  const [formErrors, setFormErrors] = useState<{ name?: string; phone?: string; email?: string }>({});
  type DemoAmbassador = {
    id: string;
    name: string;
    referral_code: string;
    email?: string | null;
  };
  const [demoAmbassadors, setDemoAmbassadors] = useState<DemoAmbassador[]>([]);
  const [selectedAmbassadorId, setSelectedAmbassadorId] = useState<string | null>(null);
  const [progressMessage, setProgressMessage] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const fallbackAmbassadors: DemoAmbassador[] = [
      { id: "fallback-1", name: "Ava Smith", referral_code: "AVA-GLOW", email: "ava@example.com" },
      { id: "fallback-2", name: "Roman Lobanov", referral_code: "ROMAN-PEP", email: "roman@example.com" },
      { id: "fallback-3", name: "Arthur Kaganovitch", referral_code: "ARTHUR-ELITE", email: "arthur@example.com" },
    ];
    async function loadSampleAmbassadors() {
      try {
        const response = await fetch("/api/demo-dashboard?persona=frontdesk");
        if (!response.ok) throw new Error("Failed to load demo ambassadors");
        const payload = await response.json();
        if (cancelled) return;
        const samples: DemoAmbassador[] = (payload.customers || [])
          .filter((row: Record<string, unknown>) => row?.referral_code)
          .slice(0, 6)
          .map((row: Record<string, unknown>) => ({
            id: String(row.id ?? row.referral_code),
            name: String(row.name ?? "Ambassador"),
            referral_code: String(row.referral_code),
            email: row.email ? String(row.email) : null,
          }));
        const finalList = samples.length > 0 ? samples : fallbackAmbassadors;
        setDemoAmbassadors(finalList);
        setSelectedAmbassadorId(finalList[0]?.id ?? null);
      } catch (err) {
        console.warn("Falling back to default ambassadors:", err);
        if (!cancelled) {
          setDemoAmbassadors(fallbackAmbassadors);
          setSelectedAmbassadorId(fallbackAmbassadors[0].id);
        }
      }
    }
    loadSampleAmbassadors();
    return () => {
      cancelled = true;
    };
  }, []);

  const selectedAmbassador = demoAmbassadors.find((amb) => amb.id === selectedAmbassadorId) ?? null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const nextErrors: typeof formErrors = {};
    if (!formData.name.trim()) {
      nextErrors.name = "Please enter your full name.";
    }
    const cleanedPhone = formData.phone.replace(/[^\d+]/g, "");
    if (cleanedPhone.length < 8) {
      nextErrors.phone = "Enter a valid phone number (at least 8 digits).";
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = "Please enter a valid email address.";
    }
    setFormErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }
    setLoading(true);
    setProgressMessage("Locking in your ambassador perks…");

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

      const baseOrigin =
        typeof window !== "undefined" ? window.location.origin : "https://peppiepep.vercel.app";
      const tokenSource =
        formData.email || formData.phone || formData.name || "pepform";
      const token = tokenSource.replace(/[^a-zA-Z0-9]/g, "").slice(0, 10).toUpperCase() || "PEP200";
      const link = selectedAmbassador?.referral_code
        ? `${baseOrigin}/r/${selectedAmbassador.referral_code}`
        : `${baseOrigin}/r/${token}`;
      setPersonalizedLink(link);
      setSubmitted(true);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
      setProgressMessage(null);
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
              We have sent a confirmation SMS to <span className="font-semibold text-white">{formData.phone}</span>. Your loyalty perks are active and your network will see your referral link immediately.
            </p>
            {selectedAmbassador && (
              <p className="text-xs uppercase tracking-wide text-emerald-200">
                Ambassador concierge: {selectedAmbassador.name}
              </p>
            )}
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
                    <p className="text-lg font-semibold text-white">$200 reward</p>
                    <p className="text-xs text-slate-300/80 mt-1">Every time you bring Pepform a new customer</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-wide text-slate-300">Friend reward</p>
                    <p className="text-lg font-semibold text-white">$200 credit</p>
                    <p className="text-xs text-slate-300/80 mt-1">Automatically applied for your friend</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-wide text-slate-300">Status</p>
                    <p className="text-lg font-semibold text-white">Tracked in real time</p>
                    <p className="text-xs text-slate-300/80 mt-1">Pepform logs every referral + reward</p>
                  </div>
                </div>

                {personalizedLink && (
                  <div className="rounded-2xl border border-emerald-300/40 bg-emerald-500/10 p-4">
                    <p className="text-sm font-semibold text-white mb-2">Your personal referral link</p>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                      <p className="flex-1 break-all text-sm text-emerald-100">{personalizedLink}</p>
                      <Button
                        type="button"
                        variant="secondary"
                        className="bg-white text-slate-900 hover:bg-slate-100"
                        onClick={() => navigator.clipboard?.writeText(personalizedLink)}
                      >
                        <Copy className="mr-2 h-4 w-4" />
                        Copy link
                      </Button>
                    </div>
                    <p className="mt-2 text-xs text-emerald-100/80">
                      In production, this pulls your real link from your uploaded contact list.
                    </p>
                  </div>
                )}

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm font-semibold text-white mb-2">What happens next</p>
                  <ul className="space-y-2 text-sm text-slate-100/90">
                    <li className="flex gap-2">
                      <span className="text-emerald-300">•</span>
                      <span>You will receive your loyalty link via SMS within 5 minutes.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-emerald-300">•</span>
                      <span>Share it anywhere—friends get $200 and you get $200 for every new customer.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-emerald-300">•</span>
                      <span>Pepform tracks redemptions instantly so you always know your rewards.</span>
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
                  Pepform Loyalty Program
                  <span className="text-xs rounded-full bg-amber-100/20 px-2 py-0.5 text-amber-100">Pre-launch</span>
                </div>
                <h3 className="mt-2 text-2xl font-bold">The easiest $200 you’ll ever earn</h3>
                <p className="mt-2 text-sm text-slate-100/80">
                  Invite your network and collect $200 every time they become Pepform customers. They get $200 too—no coupons, no tracking spreadsheets.
                </p>
                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                    <p className="text-xs uppercase tracking-wide text-slate-300">Offer</p>
                    <p className="font-semibold text-white">$200 for you & your friend</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                    <p className="text-xs uppercase tracking-wide text-slate-300">Tracking</p>
                    <p className="font-semibold text-white">Real-time in Pepform</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                    <p className="text-xs uppercase tracking-wide text-slate-300">Payouts</p>
                    <p className="font-semibold text-white">Issued on verified deals</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                    <p className="text-xs uppercase tracking-wide text-slate-300">Proof</p>
                    <p className="font-semibold text-white">See redemptions instantly</p>
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
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-950 to-black text-white overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-20 h-96 w-96 rounded-full bg-gradient-to-br from-purple-600/20 to-pink-600/20 blur-3xl animate-pulse" />
        <div className="absolute bottom-10 left-20 h-96 w-96 rounded-full bg-gradient-to-tr from-orange-600/20 to-amber-600/20 blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-14 lg:grid-cols-[1.5fr_1fr] lg:px-10">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-400/30 px-4 py-2 text-sm font-bold uppercase tracking-wide text-amber-300 shadow-lg">
            <Sparkles className="h-4 w-4" />
            Exclusive Loyalty Program
          </div>
          <div>
            <h1 className="text-5xl font-black leading-tight text-white sm:text-6xl lg:text-7xl bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              Join Our VIP Ambassador Program
            </h1>
            <p className="mt-4 text-xl text-slate-300/90 sm:text-2xl">
              Earn <span className="font-black text-transparent bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text">$200</span> for every friend you bring. They get <span className="font-black text-transparent bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text">$200</span> too. Win-win.
            </p>
          </div>

          <Card className="relative overflow-hidden border border-purple-400/30 bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl p-8 shadow-2xl">
            <div className="absolute -right-28 -top-20 h-52 w-52 rounded-full bg-gradient-to-br from-pink-500/30 to-orange-400/30 blur-3xl" />
            <div className="absolute -left-28 bottom-0 h-48 w-48 rounded-full bg-gradient-to-tr from-purple-500/30 to-sky-500/30 blur-3xl" />

            <div className="relative space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 shadow-lg flex items-center justify-center">
                    <Gift className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <p className="text-lg font-black text-white">Become an Ambassador</p>
                    <p className="text-sm text-slate-200/80">Start earning rewards instantly</p>
                  </div>
                </div>

                <div className="rounded-2xl border border-amber-300/40 bg-gradient-to-br from-amber-950/40 to-orange-950/40 p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <Trophy className="h-5 w-5 text-amber-300 flex-shrink-0 mt-0.5" />
                    <p className="text-slate-100 font-semibold">
                      Double Rewards System
                    </p>
                  </div>
                  <p className="text-sm text-slate-200/90 leading-relaxed">
                    Every new customer you bring unlocks <span className="font-black text-transparent bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text">$200 for you</span> and <span className="font-black text-transparent bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text">$200 for your friend</span>. No codes to remember, just share your personalized link.
                  </p>
                </div>
              </div>

              {demoAmbassadors.length > 0 && (
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-3">
                  <p className="text-sm font-semibold text-white">Choose the ambassador you’re impersonating</p>
                  <p className="text-xs text-slate-200/80">
                    This helps the demo mirror a real customer upload. In production, ambassadors are matched automatically from your CSV.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {demoAmbassadors.map((amb) => (
                      <button
                        key={amb.id}
                        type="button"
                        onClick={() => setSelectedAmbassadorId(amb.id)}
                        className={`rounded-2xl border px-3 py-2 text-left transition ${
                          selectedAmbassadorId === amb.id
                            ? "border-emerald-400 bg-emerald-500/10 text-white"
                            : "border-white/20 bg-white/5 text-slate-200 hover:border-white/40"
                        }`}
                      >
                        <p className="text-sm font-semibold">{amb.name}</p>
                        <p className="text-[11px] text-slate-300/80">
                          {amb.email || amb.referral_code}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white font-bold flex items-center gap-2">
                    <Users className="h-4 w-4 text-purple-300" />
                    Your Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    required
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="h-12 bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-purple-400 focus:ring-purple-400"
                  />
                  {formErrors.name && (
                    <p className="text-xs text-red-200">{formErrors.name}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-white font-bold flex items-center gap-2">
                    <Gift className="h-4 w-4 text-emerald-300" />
                    Your Phone (For Booking)
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="+61 400 123 456"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="h-12 bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-emerald-400 focus:ring-emerald-400"
                  />
                  {formErrors.phone && (
                    <p className="text-xs text-red-200">{formErrors.phone}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white font-bold flex items-center gap-2">
                    <Award className="h-4 w-4 text-amber-300" />
                    Email (Optional)
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="h-12 bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-amber-400 focus:ring-amber-400"
                  />
                  {formErrors.email && (
                    <p className="text-xs text-red-200">{formErrors.email}</p>
                  )}
                </div>

                {error && (
                  <div className="rounded-xl border border-red-300/60 bg-red-500/20 p-4 text-sm text-red-100 font-semibold">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  size="lg"
                  className="w-full h-14 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-black text-lg shadow-xl hover:shadow-2xl transition-all"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="animate-pulse">Activating your account…</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-5 w-5" />
                      Get My Referral Link
                    </>
                  )}
                </Button>
                {progressMessage && (
                  <p className="text-center text-xs text-slate-200/80">{progressMessage}</p>
                )}
              </form>

              <div className="rounded-2xl border border-emerald-300/40 bg-emerald-950/30 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Check className="h-5 w-5 text-emerald-300" />
                  <p className="font-bold text-emerald-200">What Happens Next</p>
                </div>
                <div className="space-y-2 text-sm text-slate-200/90">
                  <div className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 text-emerald-300 flex-shrink-0 mt-0.5" />
                    <span>Instant SMS with your personalized referral link</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 text-emerald-300 flex-shrink-0 mt-0.5" />
                    <span>Live dashboard to track every click and conversion</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 text-emerald-300 flex-shrink-0 mt-0.5" />
                    <span>Automatic $200 credit when friends sign up</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 text-emerald-300 flex-shrink-0 mt-0.5" />
                    <span>Full transparency - every payout logged securely</span>
                  </div>
                </div>
              </div>

              <p className="text-center text-xs text-slate-300/70">
                Powered by <Link href="/" className="font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text hover:from-purple-300 hover:to-pink-300">Pepform</Link>. Demo submissions are logged securely to demonstrate the real product experience.
              </p>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Benefits Card */}
          <Card className="border border-amber-400/30 bg-gradient-to-br from-amber-600/10 via-orange-600/10 to-pink-600/10 backdrop-blur-xl p-8 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br from-amber-500/40 to-orange-500/40 blur-3xl" />
            <div className="relative">
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="h-5 w-5 text-amber-300" />
                <p className="text-xs uppercase tracking-wide text-amber-200 font-bold">Ambassador Perks</p>
              </div>
              <h3 className="text-2xl font-black mb-5">Unlimited Earning Potential</h3>
              <div className="space-y-3">
                <div className="flex gap-3 items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-lg bg-gradient-to-br from-amber-600 to-orange-600 flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-white">$200 Per Referral</p>
                    <p className="text-sm text-slate-200/80">No caps, no limits on earnings</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-lg bg-gradient-to-br from-amber-600 to-orange-600 flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-white">Real-Time Tracking</p>
                    <p className="text-sm text-slate-200/80">Watch earnings grow instantly</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-lg bg-gradient-to-br from-amber-600 to-orange-600 flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-white">Instant Notifications</p>
                    <p className="text-sm text-slate-200/80">SMS alerts for every signup</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-lg bg-gradient-to-br from-amber-600 to-orange-600 flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-white">Friends Get $200 Too</p>
                    <p className="text-sm text-slate-200/80">Double rewards make sharing easy</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-emerald-300/40 bg-emerald-950/40 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-5 w-5 text-emerald-300" />
                  <p className="font-black text-emerald-300">Example Earnings</p>
                </div>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div>
                    <div className="text-2xl font-black text-white">$2K</div>
                    <div className="text-xs text-slate-300">10 Friends</div>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-emerald-400">$10K</div>
                    <div className="text-xs text-slate-300">50 Friends</div>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-amber-400">$20K</div>
                    <div className="text-xs text-slate-300">100 Friends</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Why Ambassadors Love It */}
          <Card className="border border-purple-400/30 bg-gradient-to-br from-purple-600/10 to-pink-600/10 backdrop-blur-xl p-8 text-white shadow-2xl">
            <div className="flex items-center gap-2 mb-4">
              <Users className="h-5 w-5 text-purple-300" />
              <p className="text-xs uppercase tracking-wide text-purple-200 font-bold">Trusted By Ambassadors</p>
            </div>
            <h4 className="text-xl font-black mb-4">Why They Love Pepform</h4>
            <div className="space-y-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="font-bold text-white mb-1 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-purple-300" />
                  Instant Visibility
                </p>
                <p className="text-sm text-slate-200/80">See every click, lead, and reward in real-time</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="font-bold text-white mb-1 flex items-center gap-2">
                  <Gift className="h-4 w-4 text-emerald-300" />
                  Zero Hassle
                </p>
                <p className="text-sm text-slate-200/80">No codes to remember, just share your link</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="font-bold text-white mb-1 flex items-center gap-2">
                  <Award className="h-4 w-4 text-amber-300" />
                  Full Transparency
                </p>
                <p className="text-sm text-slate-200/80">Every payout logged and verified in Supabase</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
