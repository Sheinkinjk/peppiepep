/* eslint-disable react/no-unescaped-entities */

export default function Privacy() {
  return (
    <div className="aurora relative min-h-screen overflow-hidden bg-gradient-to-b from-purple-50 via-white to-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(124,58,237,0.08),transparent_32%),radial-gradient(circle_at_90%_10%,rgba(236,72,153,0.1),transparent_35%)]" />

      <main className="relative mx-auto flex max-w-4xl flex-col gap-12 px-6 pb-20 pt-8 md:px-10">

        <div className="max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-purple-700 shadow-sm ring-1 ring-purple-200">
            Legal
          </div>
          <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="text-sm text-slate-500">
            Last updated: December 2024
          </p>
        </div>

        <div className="prose prose-slate max-w-3xl mx-auto">
          <section className="rounded-3xl bg-white/80 p-8 shadow-xl ring-1 ring-slate-100 backdrop-blur space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Information We Collect</h2>
              <p className="text-slate-600 mb-2">
                We collect information that you provide directly to us:
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-1">
                <li>Account information (email, name, business details)</li>
                <li>Customer data you upload (names, phone numbers, emails)</li>
                <li>Referral tracking data</li>
                <li>Usage and analytics data</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">2. How We Use Your Information</h2>
              <p className="text-slate-600 mb-2">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-1">
                <li>Provide and maintain the Service</li>
                <li>Process referrals and send notifications</li>
                <li>Improve and optimize the Service</li>
                <li>Communicate with you about the Service</li>
                <li>Detect and prevent fraud or abuse</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Data Storage and Security</h2>
              <p className="text-slate-600">
                We use Supabase (PostgreSQL) for data storage with industry-standard encryption and security practices. Customer data is protected by Row Level Security (RLS) policies ensuring users can only access their own data.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Third-Party Services</h2>
              <p className="text-slate-600 mb-2">
                We use the following third-party services:
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-1">
                <li><strong>Supabase:</strong> Database hosting and authentication</li>
                <li><strong>Twilio:</strong> SMS notifications</li>
                <li><strong>OpenAI:</strong> AI-powered features</li>
                <li><strong>Vercel:</strong> Application hosting</li>
              </ul>
              <p className="text-slate-600 mt-2">
                These services have their own privacy policies governing their use of your information.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">5. SMS Communications</h2>
              <p className="text-slate-600">
                When you use our SMS notification features, we use Twilio to send messages to your customers. By uploading customer phone numbers, you confirm you have obtained proper consent to contact them via SMS.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Data Retention</h2>
              <p className="text-slate-600">
                We retain your data for as long as your account is active. If you cancel your account, we will keep your data for 30 days before permanent deletion, allowing you to reactivate if needed.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Your Rights</h2>
              <p className="text-slate-600 mb-2">
                You have the right to:
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-1">
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Export your data (CSV format)</li>
                <li>Opt out of communications</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Cookies and Tracking</h2>
              <p className="text-slate-600">
                We use essential cookies for authentication and session management. We do not use third-party tracking or advertising cookies.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Children's Privacy</h2>
              <p className="text-slate-600">
                Our Service is not intended for users under 18 years of age. We do not knowingly collect information from children under 18.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Changes to This Policy</h2>
              <p className="text-slate-600">
                We may update this Privacy Policy from time to time. We will notify you of any material changes via email or through the Service.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">11. Contact Us</h2>
              <p className="text-slate-600">
                If you have questions about this Privacy Policy, please contact us at{" "}
                <a href="mailto:jarredkrowitz@gmail.com" className="text-purple-700 hover:underline">
                  jarredkrowitz@gmail.com
                </a>
              </p>
            </div>

            <div className="rounded-xl bg-purple-50 p-6 border border-purple-200">
              <h3 className="text-lg font-bold text-purple-900 mb-2">Beta Period Notice</h3>
              <p className="text-sm text-purple-800">
                During our private beta, we may collect additional usage data and feedback to improve the Service. All data collection follows the principles outlined in this policy.
              </p>
            </div>
          </section>
        </div>

      </main>
    </div>
  );
}
