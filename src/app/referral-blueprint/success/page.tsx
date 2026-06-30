import Link from "next/link";
import { CheckCircle2, ArrowRight, Mail, Clock, FileSpreadsheet } from "lucide-react";
import type { Metadata } from "next";
import PurchaseTracker from "./PurchaseTracker";
import { cancelScheduledEmail } from "@/lib/abandoned-checkout";

export const metadata: Metadata = {
  title: "Purchase Confirmed — Referral Growth Blueprint | Refer Labs",
  description: "Your Referral Growth Blueprint purchase is confirmed. Blueprint delivery within 48 hours.",
  robots: { index: false, follow: false },
};

// This page renders only after a completed payment, so it's the signal to
// cancel the abandoned-checkout recovery email scheduled at checkout time.
async function cancelRecoveryEmailForSession(sessionId: string) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return;
  try {
    const res = await fetch(
      `https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}`,
      { headers: { Authorization: `Bearer ${key}` }, cache: "no-store" },
    );
    if (!res.ok) return;
    const session = (await res.json()) as { metadata?: { recovery_email_id?: string } };
    const id = session.metadata?.recovery_email_id;
    if (id) await cancelScheduledEmail(id);
  } catch {
    /* best-effort — never block the confirmation page */
  }
}

export default async function ReferralBlueprintSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;
  if (session_id) await cancelRecoveryEmailForSession(session_id);

  return (
    <main className="min-h-screen bg-[#060f15] text-white">
      <PurchaseTracker />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(10,167,181,0.12),transparent_60%)]" />
      </div>

      <div className="relative mx-auto max-w-2xl px-6 sm:px-8 py-32 text-center">

        {/* Icon */}
        <div className="flex justify-center mb-8">
          <div className="h-24 w-24 rounded-full bg-[#0AA7B5]/10 border-2 border-[#0AA7B5]/30 flex items-center justify-center">
            <CheckCircle2 className="h-12 w-12 text-[#22C0CD]" />
          </div>
        </div>

        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#0AA7B5] mb-4">
          Payment Confirmed
        </p>

        <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-5 leading-tight">
          You&apos;re in.{" "}
          <span className="text-[#22C0CD]">Blueprint incoming.</span>
        </h1>

        <p className="text-white/55 text-base sm:text-lg leading-relaxed mb-12 max-w-md mx-auto">
          Your purchase is confirmed. We&apos;ll review your intake details and deliver your personalised Referral Growth Blueprint within 48 hours.
        </p>

        {/* Portal CTA */}
        <div className="rounded-2xl border border-[#0AA7B5]/30 bg-[#0AA7B5]/[0.07] p-6 mb-10 text-left max-w-lg mx-auto">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0AA7B5] mb-2">Your next step</p>
          <p className="text-sm font-black text-white mb-1">Check your inbox for your portal access link.</p>
          <p className="text-sm text-white/55 leading-relaxed mb-3">
            A confirmation email has been sent from <span className="text-white/80 font-medium">jarred@referlabs.com.au</span>. It includes an <strong className="text-white">&ldquo;Open Your Portal&rdquo;</strong> button — click it to track your order status while your blueprint is being prepared.
          </p>
          <p className="text-xs text-white/35">Check spam / promotions if you don&apos;t see it. Email jarred@referlabs.com.au with any issues.</p>
        </div>

        {/* What happens next */}
        <div className="grid sm:grid-cols-3 gap-4 mb-14 text-left">
          {[
            {
              icon: <Mail className="h-5 w-5 text-[#0AA7B5]" />,
              title: "1. Check your email",
              body: "Open the confirmation email and click \"Open Your Portal\" to access your order tracker.",
            },
            {
              icon: <Clock className="h-5 w-5 text-[#0AA7B5]" />,
              title: "2. Jarred reviews your intake",
              body: "Your niche, channels, and goals are read personally. Your strategy brief is written from scratch.",
            },
            {
              icon: <FileSpreadsheet className="h-5 w-5 text-[#0AA7B5]" />,
              title: "3. Blueprint delivered",
              body: "Six files within 48 hours — database, strategy brief, SEO concepts, playbooks, niche brief, tool stack.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5">
              <div className="h-9 w-9 rounded-xl bg-[#0AA7B5]/10 flex items-center justify-center mb-4">
                {item.icon}
              </div>
              <p className="text-sm font-bold mb-1.5">{item.title}</p>
              <p className="text-xs text-white/40 leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>

        {/* What you purchased */}
        <div className="rounded-2xl border border-[#0AA7B5]/20 bg-[#0AA7B5]/[0.05] p-7 mb-14 text-left">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0AA7B5] mb-4">What&apos;s being prepared</p>
          <ul className="grid sm:grid-cols-2 gap-3">
            {[
              "250+ affiliate & referral programs (Excel)",
              "Commission structures for every entry",
              "Suggested marketing angles",
              "Niche selection brief (3–5 matches)",
              "10+ SEO page concepts",
              "Distribution playbooks",
              "Recommended tool stack",
              "Personalised strategy brief",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-white/60">
                <CheckCircle2 className="h-4 w-4 flex-shrink-0 mt-0.5 text-[#22C0CD]" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-[#0AA7B5] px-6 py-3 text-sm font-bold text-white hover:bg-[#22C0CD] transition-colors"
          >
            Back to Refer Labs
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/contact"
            className="text-sm text-white/40 hover:text-white/70 transition-colors"
          >
            Questions? Contact us
          </Link>
        </div>
      </div>
    </main>
  );
}
