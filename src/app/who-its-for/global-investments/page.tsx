import { ArrowRight, Globe2, Shield, Sparkles } from "lucide-react";
import Link from "next/link";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";

export const metadata = generateSEOMetadata(seoConfig.whoItsFor);

export default function GlobalInvestmentsPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#f5fbfc] via-white to-[#e8f6f8] text-[#0b2a34]">
      <main id="main-content" className="mx-auto max-w-6xl px-6 pb-20 pt-14 sm:px-8 lg:px-12">
        <section className="space-y-4 mb-12 text-center">
          <h1 className="text-3xl sm:text-4xl font-black leading-tight">Global Investments</h1>
          <p className="text-slate-600 max-w-3xl mx-auto">
            Connecting unique investment opportunities with investor demand across APAC-backed by compliant structures and trusted local distribution.
          </p>
        </section>

        <section className="grid md:grid-cols-3 gap-5 mb-12">
          {[
            { icon: Globe2, title: "Cross-Border Structure", copy: "We align terms, disclosures, and docs to AU/NZ standards to unlock institutional and HNW capital." },
            { icon: Shield, title: "Trust & Compliance", copy: "Local legal and tax review, plus advisor-led education to satisfy diligence quickly." },
            { icon: Sparkles, title: "Distribution Network", copy: "Introductions to licensed advisors, family offices, and platforms that can place capital." },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <item.icon className="h-5 w-5 text-[#0AA7B5]" />
              <h2 className="mt-3 text-lg font-bold">{item.title}</h2>
              <p className="text-sm text-slate-600 leading-relaxed mt-2">{item.copy}</p>
            </div>
          ))}
        </section>

        <section className="rounded-3xl border border-[#d7f2f5] bg-white p-6 sm:p-8 shadow-[0_20px_60px_rgba(6,16,32,0.06)]">
          <h3 className="text-xl font-bold mb-3">Example Plays</h3>
          <ul className="space-y-2 text-sm text-slate-700">
            <li>• Launch AU/NZ-compliant PPMs and disclosures for a global fund raise</li>
            <li>• Advisor roadshow across Sydney/Melbourne to surface anchor investors</li>
            <li>• Platform partnerships for scaled distribution to accredited investors</li>
          </ul>
          <Link
            href="/case-studies"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#0AA7B5] hover:text-[#00838F]"
          >
            See related case studies
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </main>
    </div>
  );
}
