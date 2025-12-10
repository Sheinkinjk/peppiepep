/* eslint-disable react/no-unescaped-entities */
import {
  ArrowRight,
  Shield,
  Lock,
  Server,
  Eye,
  FileCheck,
  Clock,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";

export default function Security() {
  return (
    <div className="aurora relative min-h-screen overflow-hidden bg-gradient-to-b from-purple-50 via-white to-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(124,58,237,0.08),transparent_32%),radial-gradient(circle_at_90%_10%,rgba(236,72,153,0.1),transparent_35%)]" />

      <main className="relative mx-auto flex max-w-6xl flex-col gap-12 px-6 pb-20 pt-8 md:px-10 lg:px-16">

        <div className="mx-auto max-w-3xl space-y-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-purple-700 shadow-sm ring-1 ring-purple-200">
            Security & Privacy
          </div>
          <h1 className="text-balance text-4xl font-bold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Your data security is our top priority
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-slate-600 mx-auto">
            Enterprise-grade security for businesses of all sizes. Your customer data stays protected, private, and under your control.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          <div className="rounded-2xl border border-green-200 bg-green-50 p-6 text-center">
            <Shield className="h-8 w-8 text-green-600 mx-auto mb-3" />
            <p className="text-3xl font-bold text-green-900 mb-1">256-bit</p>
            <p className="text-sm text-green-700">SSL Encryption</p>
          </div>
          <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6 text-center">
            <Lock className="h-8 w-8 text-blue-600 mx-auto mb-3" />
            <p className="text-3xl font-bold text-blue-900 mb-1">GDPR</p>
            <p className="text-sm text-blue-700">Compliant</p>
          </div>
          <div className="rounded-2xl border border-purple-200 bg-purple-50 p-6 text-center">
            <Server className="h-8 w-8 text-purple-600 mx-auto mb-3" />
            <p className="text-3xl font-bold text-purple-900 mb-1">99.9%</p>
            <p className="text-sm text-purple-700">Uptime SLA</p>
          </div>
          <div className="rounded-2xl border border-orange-200 bg-orange-50 p-6 text-center">
            <Clock className="h-8 w-8 text-orange-600 mx-auto mb-3" />
            <p className="text-3xl font-bold text-orange-900 mb-1">Daily</p>
            <p className="text-sm text-orange-700">Backups</p>
          </div>
        </div>

        <section className="rounded-3xl bg-white/80 p-8 shadow-xl ring-1 ring-slate-100 backdrop-blur">
          <div className="mx-auto max-w-3xl space-y-8">
            <h2 className="text-3xl font-bold text-slate-900">Data Protection & Privacy</h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                    <Lock className="h-5 w-5 text-green-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">End-to-end encryption</h3>
                  <p className="text-slate-600">
                    All data is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption. Your customer information is protected at every step.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Eye className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">GDPR & privacy compliance</h3>
                  <p className="text-slate-600">
                    We're fully GDPR compliant. Your customers have the right to access, modify, or delete their data at any time. We never sell or share customer data with third parties.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <Server className="h-5 w-5 text-purple-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Secure infrastructure</h3>
                  <p className="text-slate-600">
                    Hosted on enterprise-grade infrastructure (AWS/Supabase) with automatic security updates, DDoS protection, and 24/7 monitoring.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                    <FileCheck className="h-5 w-5 text-orange-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Regular security audits</h3>
                  <p className="text-slate-600">
                    We conduct quarterly security audits and penetration testing. All critical vulnerabilities are patched within 24 hours.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Incident response</h3>
                  <p className="text-slate-600">
                    In the unlikely event of a security incident, we'll notify affected customers within 72 hours and provide full transparency on impact and remediation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 text-white shadow-2xl">
          <div className="mx-auto max-w-3xl space-y-6">
            <h2 className="text-3xl font-bold">Data Ownership & Access</h2>
            <div className="space-y-4 text-slate-200">
              <div className="rounded-xl bg-white/5 p-4 border border-white/10">
                <p className="font-semibold text-white mb-2">You own your data</p>
                <p className="text-sm">
                  All customer data belongs to you. Export it anytime in CSV format. Delete your account and all data is permanently removed within 30 days.
                </p>
              </div>
              <div className="rounded-xl bg-white/5 p-4 border border-white/10">
                <p className="font-semibold text-white mb-2">Minimal data collection</p>
                <p className="text-sm">
                  We only collect what's necessary to run the service: customer names, contact info, and referral activity. No tracking pixels, no analytics cookies.
                </p>
              </div>
              <div className="rounded-xl bg-white/5 p-4 border border-white/10">
                <p className="font-semibold text-white mb-2">No third-party access</p>
                <p className="text-sm">
                  Your data stays in our secure database. We don't sell, rent, or share customer information with advertisers or data brokers. Ever.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-3xl bg-white/80 p-8 shadow-xl ring-1 ring-slate-100 backdrop-blur">
          <div className="mx-auto max-w-3xl space-y-6">
            <h2 className="text-3xl font-bold text-slate-900">Compliance & Certifications</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-slate-200 p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-8 w-8 rounded bg-green-100 flex items-center justify-center">
                    <Shield className="h-4 w-4 text-green-600" />
                  </div>
                  <p className="font-semibold text-slate-900">GDPR Compliant</p>
                </div>
                <p className="text-sm text-slate-600">
                  Full compliance with EU data protection regulations
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-8 w-8 rounded bg-blue-100 flex items-center justify-center">
                    <Lock className="h-4 w-4 text-blue-600" />
                  </div>
                  <p className="font-semibold text-slate-900">ISO 27001</p>
                </div>
                <p className="text-sm text-slate-600">
                  <span className="text-orange-600 font-medium">Roadmap 2025</span> - Information security management
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-8 w-8 rounded bg-purple-100 flex items-center justify-center">
                    <FileCheck className="h-4 w-4 text-purple-600" />
                  </div>
                  <p className="font-semibold text-slate-900">SOC 2 Type II</p>
                </div>
                <p className="text-sm text-slate-600">
                  <span className="text-orange-600 font-medium">Roadmap 2025</span> - Security, availability, confidentiality
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-8 w-8 rounded bg-orange-100 flex items-center justify-center">
                    <Server className="h-4 w-4 text-orange-600" />
                  </div>
                  <p className="font-semibold text-slate-900">PCI DSS</p>
                </div>
                <p className="text-sm text-slate-600">
                  Payment processing via certified partners (Stripe)
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-3xl bg-white/80 p-8 shadow-xl ring-1 ring-slate-100 backdrop-blur">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <details className="group rounded-xl bg-slate-50 p-4">
                <summary className="cursor-pointer font-semibold text-slate-900 flex items-center justify-between">
                  Where is my data stored?
                  <ArrowRight className="h-4 w-4 text-slate-400 group-open:rotate-90 transition" />
                </summary>
                <p className="mt-3 text-sm text-slate-600">
                  All data is stored in secure, encrypted databases hosted on AWS infrastructure in the EU (London region). We use Supabase for database management with automatic backups and point-in-time recovery.
                </p>
              </details>

              <details className="group rounded-xl bg-slate-50 p-4">
                <summary className="cursor-pointer font-semibold text-slate-900 flex items-center justify-between">
                  Can I export my customer data?
                  <ArrowRight className="h-4 w-4 text-slate-400 group-open:rotate-90 transition" />
                </summary>
                <p className="mt-3 text-sm text-slate-600">
                  Yes, you can export all your data as CSV files anytime from your dashboard. This includes customer lists, referral history, and rewards data.
                </p>
              </details>

              <details className="group rounded-xl bg-slate-50 p-4">
                <summary className="cursor-pointer font-semibold text-slate-900 flex items-center justify-between">
                  What happens if I delete my account?
                  <ArrowRight className="h-4 w-4 text-slate-400 group-open:rotate-90 transition" />
                </summary>
                <p className="mt-3 text-sm text-slate-600">
                  All your data is permanently deleted within 30 days. We keep backups for 30 days for recovery purposes, then everything is wiped. You can request immediate deletion by contacting support.
                </p>
              </details>

              <details className="group rounded-xl bg-slate-50 p-4">
                <summary className="cursor-pointer font-semibold text-slate-900 flex items-center justify-between">
                  Do you have a bug bounty program?
                  <ArrowRight className="h-4 w-4 text-slate-400 group-open:rotate-90 transition" />
                </summary>
                <p className="mt-3 text-sm text-slate-600">
                  Yes! Report security vulnerabilities to security@referlabs.com.au. We offer rewards for valid findings based on severity. Please practice responsible disclosure.
                </p>
              </details>

              <details className="group rounded-xl bg-slate-50 p-4">
                <summary className="cursor-pointer font-semibold text-slate-900 flex items-center justify-between">
                  How do you handle SMS data?
                  <ArrowRight className="h-4 w-4 text-slate-400 group-open:rotate-90 transition" />
                </summary>
                <p className="mt-3 text-sm text-slate-600">
                  SMS notifications are sent via Twilio, a certified communications provider. We only transmit necessary data (phone number, message content) over encrypted connections. Twilio doesn't store message content.
                </p>
              </details>
            </div>
          </div>
        </section>

        <section className="rounded-3xl bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 p-[1px] shadow-2xl">
          <div className="flex flex-col gap-6 rounded-3xl bg-white/90 p-8 text-slate-900 backdrop-blur md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-2">
                Have security questions?
              </h3>
              <p className="text-slate-600">
                Our team is here to help. Get in touch for security audits, compliance documentation, or custom security requirements.
              </p>
            </div>
            <Link
              href="mailto:security@referlabs.com.au"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-200 transition hover:-translate-y-0.5 hover:shadow-purple-300 whitespace-nowrap"
            >
              Contact security team
            </Link>
          </div>
        </section>

      </main>
    </div>
  );
}
