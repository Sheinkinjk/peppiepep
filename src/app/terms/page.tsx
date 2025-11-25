/* eslint-disable react/no-unescaped-entities */
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { StickyHeader } from "@/components/StickyHeader";

export default function Terms() {
  return (
    <div className="aurora relative min-h-screen overflow-hidden bg-gradient-to-b from-purple-50 via-white to-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(124,58,237,0.08),transparent_32%),radial-gradient(circle_at_90%_10%,rgba(236,72,153,0.1),transparent_35%)]" />

      <StickyHeader />

      <main className="relative mx-auto flex max-w-4xl flex-col gap-12 px-6 pb-20 pt-8 md:px-10">

        <div className="max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-purple-700 shadow-sm ring-1 ring-purple-200">
            Legal
          </div>
          <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
            Terms of Service
          </h1>
          <p className="text-sm text-slate-500">
            Last updated: December 2024
          </p>
        </div>

        <div className="prose prose-slate max-w-3xl mx-auto">
          <section className="rounded-3xl bg-white/80 p-8 shadow-xl ring-1 ring-slate-100 backdrop-blur space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-slate-600">
                By accessing and using Pepform ("Service"), you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our Service.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Description of Service</h2>
              <p className="text-slate-600">
                Pepform provides a referral management platform that enables businesses to create, track, and manage customer referral programs. We are currently operating in private beta.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Beta Testing</h2>
              <p className="text-slate-600 mb-2">
                During our private beta period:
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-1">
                <li>The Service is provided "as is" without warranties</li>
                <li>Features may change without notice</li>
                <li>Service availability is not guaranteed</li>
                <li>We may collect feedback and usage data to improve the platform</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">4. User Responsibilities</h2>
              <p className="text-slate-600 mb-2">
                You agree to:
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-1">
                <li>Provide accurate information when using the Service</li>
                <li>Maintain the security of your account credentials</li>
                <li>Use the Service in compliance with applicable laws</li>
                <li>Not use the Service for spam or unsolicited communications</li>
                <li>Obtain proper consent before uploading customer data</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Data and Privacy</h2>
              <p className="text-slate-600">
                Your use of the Service is also governed by our Privacy Policy. By using Pepform, you consent to the collection and use of information as described in our Privacy Policy.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">6. SMS Notifications</h2>
              <p className="text-slate-600">
                Our Service includes SMS notification features powered by Twilio. By using SMS features, you agree to comply with applicable telecommunications regulations and obtain proper consent from recipients.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Intellectual Property</h2>
              <p className="text-slate-600">
                All content, features, and functionality of the Service are owned by Pepform and are protected by copyright, trademark, and other intellectual property laws.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Termination</h2>
              <p className="text-slate-600">
                We reserve the right to terminate or suspend access to our Service immediately, without prior notice, for any reason, including breach of these Terms.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Limitation of Liability</h2>
              <p className="text-slate-600">
                Pepform shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the Service.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Changes to Terms</h2>
              <p className="text-slate-600">
                We reserve the right to modify these terms at any time. We will notify users of any material changes via email or through the Service.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">11. Contact</h2>
              <p className="text-slate-600">
                For questions about these Terms, please contact us at{" "}
                <a href="mailto:jarredkrowitz@gmail.com" className="text-purple-700 hover:underline">
                  jarredkrowitz@gmail.com
                </a>
              </p>
            </div>
          </section>
        </div>

        <footer className="flex flex-col items-start justify-between gap-4 border-t border-slate-200/70 pt-6 text-sm text-slate-600 md:flex-row md:items-center">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 shadow-md" />
            <div>
              <p className="text-sm font-semibold text-slate-900">Pepform</p>
              <p className="text-xs text-slate-500">Referrals that compound</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link className="hover:text-slate-900" href="/">
              Home
            </Link>
            <span className="text-slate-300">•</span>
            <Link className="hover:text-slate-900" href="/contact">
              Contact
            </Link>
            <span className="text-slate-300">•</span>
            <Link className="hover:text-slate-900" href="/privacy">
              Privacy
            </Link>
          </div>
        </footer>
      </main>
    </div>
  );
}
