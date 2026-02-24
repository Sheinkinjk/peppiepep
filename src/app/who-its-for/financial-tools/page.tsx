import { ArrowRight, Calculator, Layers, Zap } from "lucide-react";
import Link from "next/link";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";

export const metadata = generateSEOMetadata(seoConfig.whoItsFor);

export default function FinancialToolsPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#f5fbfc] via-white to-[#e8f6f8] text-[#0b2a34]">
      <main id="main-content" className="mx-auto max-w-6xl px-6 pb-20 pt-14 sm:px-8 lg:px-12">
        <section className="space-y-4 mb-12 text-center">
          <h1 className="text-3xl sm:text-4xl font-black leading-tight">Financial Tools</h1>
          <p className="text-slate-600 max-w-3xl mx-auto">
            Software, products, and “hacks” that help businesses and consumers manage money-brought to APAC with compliant messaging and distribution.
          </p>
        </section>

        <section className="grid md:grid-cols-3 gap-5 mb-12">
          {[
            { icon: Calculator, title: "Localization First", copy: "Pricing, tax, and regulatory nuance built into copy and onboarding flows." },
            { icon: Layers, title: "Channel Fit", copy: "We match each tool to advisors, platforms, and communities that already trust your audience." },
            { icon: Zap, title: "Velocity", copy: "Fast launches with pre-built playbooks for fintech/finance messaging approvals." },
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
            <li>• Creator-led education series for a B2B expense tool entering AU SMEs</li>
            <li>• Advisor/CPA referral program with tracked incentives and enablement kits</li>
            <li>• Platform partnership with localized pricing and billing options</li>
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
