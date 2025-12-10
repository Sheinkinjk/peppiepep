import { Mail, Calendar } from "lucide-react";

export default function Contact() {
  return (
    <div className="aurora relative min-h-screen overflow-hidden bg-gradient-to-b from-purple-50 via-white to-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(124,58,237,0.08),transparent_32%),radial-gradient(circle_at_90%_10%,rgba(236,72,153,0.1),transparent_35%)]" />
      <main className="relative mx-auto flex max-w-4xl flex-col gap-12 px-6 pb-20 pt-8 md:px-10">

        <div className="max-w-2xl mx-auto space-y-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-purple-700 shadow-sm ring-1 ring-purple-200">
            Get in touch
          </div>
          <h1 className="text-balance text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
            Contact Us
          </h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2 max-w-3xl mx-auto w-full">
          <a
            href="mailto:jarred@referlabs.com.au"
            className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 mb-4">
              <Mail className="h-6 w-6 text-purple-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Email Us</h2>
            <p className="text-slate-600 mb-4">
              Send us an email and we will get back to you within 24 hours.
            </p>
            <div className="font-semibold text-purple-700 group-hover:underline">
              jarred@referlabs.com.au →
            </div>
          </a>

          <a
            href="https://calendly.com/jarredkrowitz/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 mb-4">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Schedule a Call</h2>
            <p className="text-slate-600 mb-4">
              Book a 30-minute call to discuss your referral program needs.
            </p>
            <div className="font-semibold text-blue-700 group-hover:underline">
              Book your call →
            </div>
          </a>
        </div>

        <section className="rounded-3xl bg-white/80 p-8 shadow-xl ring-1 ring-slate-100 backdrop-blur max-w-3xl mx-auto w-full">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">
                What is the best way to get started?
              </h3>
              <p className="text-sm text-slate-600">
                Sign up for a free account and upload your first customer list. You can have a working referral program in under 5 minutes. If you need help, schedule a call and we will walk you through it.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">
                Do you offer custom integrations?
              </h3>
              <p className="text-sm text-slate-600">
                We are currently in private beta and gathering feedback on which integrations would be most valuable. Email us with your specific needs and we will let you know what is possible.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">
                Can I get help setting up my first campaign?
              </h3>
              <p className="text-sm text-slate-600">
                Absolutely! We offer white-glove onboarding for all new users. Schedule a call and we will help you upload your customers, set up rewards, and launch your first referral campaign.
              </p>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
