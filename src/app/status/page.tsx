import Link from "next/link";
import { Activity, CheckCircle2, ExternalLink, Wrench } from "lucide-react";

import { Card } from "@/components/ui/card";
import { StatusChecks } from "@/components/status/StatusChecks";

type Flag = {
  label: string;
  ok: boolean;
  detail?: string;
};

function flag(label: string, ok: boolean, detail?: string): Flag {
  return { label, ok, detail };
}

export default function StatusPage() {
  const hasSupabasePublic = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  const hasSupabaseServiceRole = Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY);
  const hasAdminReferralCode = Boolean(process.env.ADMIN_REFERRAL_CODE?.trim());

  const hasStripe = Boolean(process.env.STRIPE_SECRET_KEY && process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  const hasStripeWebhook = Boolean(process.env.STRIPE_WEBHOOK_SECRET);

  const hasResend = Boolean(process.env.RESEND_API_KEY);
  const hasResendWebhook = Boolean(process.env.RESEND_WEBHOOK_TOKEN);

  const hasTwilio = Boolean(process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN);
  const hasTwilioWebhook = Boolean(process.env.TWILIO_WEBHOOK_TOKEN);

  const flags: Flag[] = [
    flag("Supabase (public keys)", hasSupabasePublic, hasSupabasePublic ? "Configured" : "Missing NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY"),
    flag("Supabase (service role)", hasSupabaseServiceRole, hasSupabaseServiceRole ? "Configured" : "Missing SUPABASE_SERVICE_ROLE_KEY (server-only)"),
    flag("Attribution health check", hasAdminReferralCode, hasAdminReferralCode ? "Configured" : "Missing ADMIN_REFERRAL_CODE"),
    flag("Stripe payments", hasStripe, hasStripe ? "Configured" : "Missing STRIPE_SECRET_KEY / NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"),
    flag("Stripe webhook", hasStripeWebhook, hasStripeWebhook ? "Configured" : "Missing STRIPE_WEBHOOK_SECRET"),
    flag("Resend email", hasResend, hasResend ? "Configured" : "Missing RESEND_API_KEY"),
    flag("Resend webhook", hasResendWebhook, hasResendWebhook ? "Configured" : "Missing RESEND_WEBHOOK_TOKEN"),
    flag("Twilio SMS", hasTwilio, hasTwilio ? "Configured" : "Missing TWILIO_ACCOUNT_SID / TWILIO_AUTH_TOKEN"),
    flag("Twilio webhook", hasTwilioWebhook, hasTwilioWebhook ? "Configured" : "Missing TWILIO_WEBHOOK_TOKEN"),
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
            <Activity className="h-4 w-4" />
            Status
          </div>
          <h1 className="mt-4 text-3xl font-black text-slate-900">System status</h1>
          <p className="mt-2 text-slate-600">
            Quick diagnostics for integrations and environment configuration.
          </p>
        </div>

        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-800 hover:bg-slate-50"
        >
          <ExternalLink className="h-4 w-4" />
          Contact support
        </Link>
      </div>

      <div className="mt-8 space-y-6">
        <StatusChecks />

        <Card className="p-6 rounded-2xl border border-slate-200 bg-white">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-slate-900 p-2">
              <Wrench className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-slate-900">Configuration checks</h2>
              <p className="text-sm text-slate-600">
                These checks confirm whether required integrations are configured (secrets are never shown).
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {flags.map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-slate-200 bg-slate-50/60 p-4"
              >
                <div className="flex items-start gap-2">
                  <CheckCircle2 className={`mt-0.5 h-4 w-4 ${item.ok ? "text-emerald-600" : "text-slate-300"}`} />
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-900">{item.label}</p>
                    <p className={`mt-1 text-xs ${item.ok ? "text-slate-600" : "text-rose-700"}`}>{item.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4">
            <p className="text-sm font-semibold text-amber-900">If something is missing</p>
            <ul className="mt-2 text-sm text-amber-800 list-disc list-inside space-y-1">
              <li>Set the env vars in Vercel → Project → Settings → Environment Variables</li>
              <li>Redeploy production so the new values are applied</li>
              <li>Re-run “Live checks” above</li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
}

