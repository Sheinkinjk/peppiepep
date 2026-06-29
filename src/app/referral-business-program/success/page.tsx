import Link from "next/link";
import { CheckCircle2, ArrowRight, Mail, Clock } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment Successful — Referral Growth Blueprint | Refer Labs",
  description: "Your purchase is confirmed. Your Referral Growth Blueprint will be delivered within 48 hours.",
  robots: { index: false, follow: false },
};

export default function BlueprintSuccessPage() {
  return (
    <main className="min-h-screen bg-[#060f15] text-white flex items-center justify-center">
      <div className="relative overflow-hidden w-full">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(10,167,181,0.10),transparent_60%)]" />
        </div>

        <div className="relative mx-auto max-w-xl px-6 sm:px-8 py-32 text-center">
          <div className="flex justify-center mb-8">
            <div className="h-20 w-20 rounded-full bg-[#0AA7B5]/10 border border-[#0AA7B5]/30 flex items-center justify-center">
              <CheckCircle2 className="h-10 w-10 text-[#22C0CD]" />
            </div>
          </div>

          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0AA7B5] mb-4">
            Payment Confirmed
          </p>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-5">
            Your blueprint is on its way
          </h1>

          <p className="text-white/55 leading-relaxed mb-10 max-w-sm mx-auto">
            Thank you for your purchase. Your Referral Growth Blueprint — including the 250+ program database and personalised strategy brief — will be delivered to your inbox within 48 hours.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mb-12 text-left">
            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5 flex items-start gap-4">
              <div className="h-9 w-9 flex-shrink-0 rounded-xl bg-[#0AA7B5]/10 flex items-center justify-center">
                <Mail className="h-4 w-4 text-[#0AA7B5]" />
              </div>
              <div>
                <p className="text-sm font-semibold mb-1">Check your inbox</p>
                <p className="text-xs text-white/40 leading-relaxed">
                  A confirmation email has been sent. The blueprint delivery email will follow within 48 hours.
                </p>
              </div>
            </div>
            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5 flex items-start gap-4">
              <div className="h-9 w-9 flex-shrink-0 rounded-xl bg-[#0AA7B5]/10 flex items-center justify-center">
                <Clock className="h-4 w-4 text-[#0AA7B5]" />
              </div>
              <div>
                <p className="text-sm font-semibold mb-1">Delivery within 48 hours</p>
                <p className="text-xs text-white/40 leading-relaxed">
                  We review your intake details and personalise the blueprint before delivery.
                </p>
              </div>
            </div>
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
      </div>
    </main>
  );
}
