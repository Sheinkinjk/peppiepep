import { Mail, Calendar } from "lucide-react";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";

export const metadata = generateSEOMetadata(seoConfig.contact);

export default function Contact() {
  return (
    <div className="aurora relative min-h-screen overflow-hidden bg-gradient-to-b from-purple-50 via-white to-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(124,58,237,0.08),transparent_32%),radial-gradient(circle_at_90%_10%,rgba(236,72,153,0.1),transparent_35%)]" />
      <main className="relative mx-auto flex max-w-4xl flex-col gap-12 px-6 pb-20 pt-8 md:px-10">

        <div className="max-w-2xl mx-auto space-y-4 text-center">
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

      </main>
    </div>
  );
}
