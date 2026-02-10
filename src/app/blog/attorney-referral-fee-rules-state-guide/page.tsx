import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, AlertTriangle, CheckCircle2, Info, Search } from "lucide-react";

export const metadata: Metadata = {
  title: "Attorney Referral Fee Rules: State-by-State Compliance Guide 2026 | Refer Labs",
  description: "Complete breakdown of referral fee regulations across all 50 states, including fee splitting percentages, disclosure requirements, and what you need to stay compliant.",
};

export default function AttorneyReferralFeeRulesStatePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blog" className="inline-flex items-center gap-2 text-slate-300 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
          <div className="inline-block bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm font-semibold mb-6">
            Compliance
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-6">
            Attorney Referral Fee Rules: State-by-State Compliance Guide 2026
          </h1>
          <div className="flex items-center gap-4 text-slate-300 text-sm">
            <span>January 8, 2026</span>
            <span>•</span>
            <span>20 min read</span>
            <span>•</span>
            <span>By Refer Labs Team</span>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="prose prose-lg max-w-none">

          {/* Introduction */}
          <div className="text-lg text-slate-700 leading-relaxed space-y-4 mb-12">
            <p>
              Referral fees between attorneys are legal in every U.S. state-but the rules vary dramatically. What's allowed in California could get you disciplined in New York. A compliant arrangement in Texas might violate ethics rules in Pennsylvania.
            </p>
            <p>
              This guide provides a comprehensive breakdown of attorney referral fee rules across all 50 states, updated for 2026. We cover fee-splitting percentages, disclosure requirements, proportionality rules, and special restrictions.
            </p>
            <p>
              <strong>Disclaimer</strong>: This guide is for informational purposes only and does not constitute legal advice. Always consult your state bar's ethics rules and consider seeking ethics counsel before entering referral fee arrangements.
            </p>
          </div>

          <div className="bg-amber-50 border-l-4 border-amber-500 p-6 my-8 rounded-r-lg">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold text-amber-900 mb-2">Updated for 2026</h3>
                <p className="text-amber-800 text-base mb-0">
                  This guide reflects ethics rules and state bar regulations as of January 2026. Rules change-always verify current requirements with your state bar before entering referral arrangements.
                </p>
              </div>
            </div>
          </div>

          {/* Understanding the Baseline */}
          <h2 className="text-3xl font-black text-slate-900 mt-12 mb-6">Understanding the Baseline: ABA Model Rule 1.5(e)</h2>

          <p className="text-slate-700 mb-6">
            Most states base their referral fee rules on ABA Model Rule 1.5(e), but many have modified it. Here's the baseline:
          </p>

          <div className="bg-slate-100 border border-slate-300 rounded-xl p-6 my-8">
            <h3 className="font-bold text-slate-900 mb-4">ABA Model Rule 1.5(e) - Division of Fees</h3>
            <p className="text-slate-700 mb-4">
              A division of a fee between lawyers who are not in the same firm may be made only if:
            </p>
            <ol className="text-slate-700 space-y-3 ml-6">
              <li><strong>(1)</strong> The division is in proportion to the services performed by each lawyer OR each lawyer assumes joint responsibility for the representation;</li>
              <li><strong>(2)</strong> The client agrees to the arrangement, including the share each lawyer will receive, and the agreement is confirmed in writing; and</li>
              <li><strong>(3)</strong> The total fee is reasonable.</li>
            </ol>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-8 rounded-r-lg">
            <div className="flex items-start gap-3">
              <Info className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold text-blue-900 mb-2">Key Variation: Proportionality Requirement</h3>
                <p className="text-blue-800 text-base mb-0">
                  The biggest state-by-state difference is whether fees must be proportional to work performed. Some states allow pure referral fees with no work required. Others require fees to match work contribution.
                </p>
              </div>
            </div>
          </div>

          {/* The 4 Categories */}
          <h2 className="text-3xl font-black text-slate-900 mt-12 mb-6">The 4 Categories of State Rules</h2>

          <p className="text-slate-700 mb-6">
            For simplicity, we've categorized states into 4 groups based on their referral fee requirements:
          </p>

          <div className="grid md:grid-cols-2 gap-6 my-8">
            <div className="bg-emerald-50 border-2 border-emerald-200 rounded-lg p-6">
              <h3 className="font-bold text-emerald-900 mb-3 text-lg">Category 1: Pure Referral Fees Allowed</h3>
              <p className="text-sm text-emerald-800 mb-3">
                Referral fees permitted with minimal/no work required from referring attorney. Client consent and reasonableness still required.
              </p>
              <p className="text-xs text-emerald-700 font-semibold">Most permissive</p>
            </div>

            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
              <h3 className="font-bold text-blue-900 mb-3 text-lg">Category 2: Joint Responsibility Alternative</h3>
              <p className="text-sm text-blue-800 mb-3">
                Fees must be proportional to work performed OR referring attorney assumes joint responsibility for the case (liability exposure).
              </p>
              <p className="text-xs text-blue-700 font-semibold">Moderate flexibility</p>
            </div>

            <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-6">
              <h3 className="font-bold text-amber-900 mb-3 text-lg">Category 3: Strict Proportionality</h3>
              <p className="text-sm text-amber-800 mb-3">
                Fees MUST be proportional to actual work performed. No pure referral fees. Joint responsibility doesn't excuse proportionality requirement.
              </p>
              <p className="text-xs text-amber-700 font-semibold">More restrictive</p>
            </div>

            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
              <h3 className="font-bold text-red-900 mb-3 text-lg">Category 4: Special Restrictions</h3>
              <p className="text-sm text-red-800 mb-3">
                Additional limitations beyond ABA Model Rule (e.g., fee caps, court approval required, specific practice area restrictions).
              </p>
              <p className="text-xs text-red-700 font-semibold">Most restrictive</p>
            </div>
          </div>

          {/* State-by-State Breakdown */}
          <h2 className="text-3xl font-black text-slate-900 mt-12 mb-6">State-by-State Breakdown</h2>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 my-8">
            <div className="flex items-center gap-3 mb-4">
              <Search className="h-5 w-5 text-slate-600" />
              <p className="text-sm text-slate-700 font-semibold">
                Use Ctrl+F (Cmd+F on Mac) to quickly find your state
              </p>
            </div>
          </div>

          {/* Category 1 States */}
          <h3 className="text-2xl font-bold text-emerald-900 mt-10 mb-4 bg-emerald-50 p-4 rounded-lg">
            Category 1: Pure Referral Fees Allowed
          </h3>

          <div className="space-y-6 my-8">
            {/* Example states in Category 1 */}
            <div className="border border-slate-200 rounded-lg p-6 bg-white">
              <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                California
              </h4>
              <div className="text-sm text-slate-700 space-y-2">
                <p><strong>Rule</strong>: California Rule of Professional Conduct 1.5.1</p>
                <p><strong>Proportionality Required?</strong> No. Pure referral fees allowed.</p>
                <p><strong>Joint Responsibility Option?</strong> Yes, as alternative to proportionality</p>
                <p><strong>Client Disclosure Required?</strong> Yes, in writing before or within reasonable time after commencing representation</p>
                <p><strong>Key Details</strong>: California allows referral fees without work contribution if client consents and total fee is reasonable. One of the most permissive states.</p>
              </div>
            </div>

            <div className="border border-slate-200 rounded-lg p-6 bg-white">
              <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                Florida
              </h4>
              <div className="text-sm text-slate-700 space-y-2">
                <p><strong>Rule</strong>: Florida Rule 4-1.5(g)</p>
                <p><strong>Proportionality Required?</strong> No for most cases</p>
                <p><strong>Joint Responsibility Option?</strong> Yes</p>
                <p><strong>Client Disclosure Required?</strong> Yes, client must consent in writing</p>
                <p><strong>Key Details</strong>: Florida allows referral fees but has special rules for contingency fees. In contingent fee cases, referring attorney can receive fee without work if they assume joint financial responsibility.</p>
                <p><strong>Special Note</strong>: Contingency fee agreements must comply with Florida's statutory fee limitations in medical malpractice and other cases.</p>
              </div>
            </div>

            <div className="border border-slate-200 rounded-lg p-6 bg-white">
              <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                Illinois
              </h4>
              <div className="text-sm text-slate-700 space-y-2">
                <p><strong>Rule</strong>: Illinois Rule 1.5(e)</p>
                <p><strong>Proportionality Required?</strong> No. Pure referral fees permitted.</p>
                <p><strong>Joint Responsibility Option?</strong> Yes</p>
                <p><strong>Client Disclosure Required?</strong> Yes, written consent required</p>
                <p><strong>Key Details</strong>: Illinois follows a version allowing referral fees without work performed as long as referring attorney assumes joint responsibility or fees are proportional (attorney's choice).</p>
              </div>
            </div>

            <div className="border border-slate-200 rounded-lg p-6 bg-white">
              <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                Georgia
              </h4>
              <div className="text-sm text-slate-700 space-y-2">
                <p><strong>Rule</strong>: Georgia Rule 1.5(e)</p>
                <p><strong>Proportionality Required?</strong> No</p>
                <p><strong>Joint Responsibility Option?</strong> Yes, referring attorney can assume joint responsibility instead of proportional work</p>
                <p><strong>Client Disclosure Required?</strong> Yes, written consent</p>
                <p><strong>Key Details</strong>: Georgia permits pure referral fees with client consent and joint responsibility assumption. Relatively permissive state.</p>
              </div>
            </div>

            <div className="border border-slate-200 rounded-lg p-6 bg-white">
              <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                Texas
              </h4>
              <div className="text-sm text-slate-700 space-y-2">
                <p><strong>Rule</strong>: Texas Disciplinary Rule 1.04(f)</p>
                <p><strong>Proportionality Required?</strong> No. Pure referral fees allowed.</p>
                <p><strong>Joint Responsibility Option?</strong> Yes</p>
                <p><strong>Client Disclosure Required?</strong> Yes, client must consent to participation and fee split</p>
                <p><strong>Key Details</strong>: Texas allows forwarding fees (pure referrals) with client consent. Each attorney must assume responsibility for the representation but work doesn't need to be proportional to fee split.</p>
              </div>
            </div>

            <div className="bg-slate-100 border border-slate-200 rounded-lg p-5 my-6">
              <p className="text-sm text-slate-700 mb-2">
                <strong>Other Category 1 States</strong> (similar permissive rules):
              </p>
              <p className="text-sm text-slate-600">
                Alabama, Arizona, Arkansas, Colorado, Hawaii, Indiana, Louisiana, Mississippi, Missouri, Nevada, New Mexico, North Carolina, Oklahoma, South Carolina, Tennessee, Utah, Virginia, West Virginia
              </p>
            </div>
          </div>

          {/* Category 2 States */}
          <h3 className="text-2xl font-bold text-blue-900 mt-10 mb-4 bg-blue-50 p-4 rounded-lg">
            Category 2: Joint Responsibility Alternative
          </h3>

          <p className="text-slate-700 mb-6">
            These states follow the ABA Model Rule closely: fees must be proportional to work performed OR referring attorney assumes joint responsibility for the representation.
          </p>

          <div className="space-y-6 my-8">
            <div className="border border-slate-200 rounded-lg p-6 bg-white">
              <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-blue-600" />
                New York
              </h4>
              <div className="text-sm text-slate-700 space-y-2">
                <p><strong>Rule</strong>: NY Rule 1.5(g)</p>
                <p><strong>Proportionality Required?</strong> Yes, UNLESS attorneys assume joint responsibility</p>
                <p><strong>Joint Responsibility Option?</strong> Yes, allows non-proportional fee split if joint responsibility assumed</p>
                <p><strong>Client Disclosure Required?</strong> Yes, written disclosure and consent</p>
                <p><strong>Key Details</strong>: New York closely follows ABA Model Rule. Referring attorney must either: (1) perform work proportional to fee received, OR (2) assume joint responsibility (ethical and legal liability) for the matter.</p>
              </div>
            </div>

            <div className="border border-slate-200 rounded-lg p-6 bg-white">
              <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-blue-600" />
                Massachusetts
              </h4>
              <div className="text-sm text-slate-700 space-y-2">
                <p><strong>Rule</strong>: Massachusetts Rule 1.5(e)</p>
                <p><strong>Proportionality Required?</strong> Yes, unless joint responsibility assumed</p>
                <p><strong>Joint Responsibility Option?</strong> Yes</p>
                <p><strong>Client Disclosure Required?</strong> Yes, in writing</p>
                <p><strong>Key Details</strong>: Massachusetts follows ABA Model Rule. Joint responsibility means both attorneys are responsible to client for entire representation, not just their portion.</p>
              </div>
            </div>

            <div className="border border-slate-200 rounded-lg p-6 bg-white">
              <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-blue-600" />
                New Jersey
              </h4>
              <div className="text-sm text-slate-700 space-y-2">
                <p><strong>Rule</strong>: NJ RPC 1.5(e)</p>
                <p><strong>Proportionality Required?</strong> Yes, unless joint responsibility</p>
                <p><strong>Joint Responsibility Option?</strong> Yes</p>
                <p><strong>Client Disclosure Required?</strong> Yes, written consent</p>
                <p><strong>Key Details</strong>: New Jersey applies standard ABA approach. Referring attorney must either work proportionally or assume full joint responsibility for case outcomes.</p>
              </div>
            </div>

            <div className="border border-slate-200 rounded-lg p-6 bg-white">
              <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-blue-600" />
                Michigan
              </h4>
              <div className="text-sm text-slate-700 space-y-2">
                <p><strong>Rule</strong>: Michigan Rule 1.5(e)</p>
                <p><strong>Proportionality Required?</strong> Yes, OR joint responsibility</p>
                <p><strong>Joint Responsibility Option?</strong> Yes</p>
                <p><strong>Client Disclosure Required?</strong> Yes, in writing</p>
                <p><strong>Key Details</strong>: Follows ABA Model Rule. Joint responsibility means each lawyer is responsible for quality of the entire representation.</p>
              </div>
            </div>

            <div className="bg-slate-100 border border-slate-200 rounded-lg p-5 my-6">
              <p className="text-sm text-slate-700 mb-2">
                <strong>Other Category 2 States</strong> (ABA Model Rule approach):
              </p>
              <p className="text-sm text-slate-600">
                Connecticut, Delaware, Idaho, Kansas, Kentucky, Maine, Maryland, Minnesota, Montana, Nebraska, New Hampshire, North Dakota, Ohio, Rhode Island, South Dakota, Vermont, Washington, Wisconsin, Wyoming
              </p>
            </div>
          </div>

          {/* Category 3 States */}
          <h3 className="text-2xl font-bold text-amber-900 mt-10 mb-4 bg-amber-50 p-4 rounded-lg">
            Category 3: Strict Proportionality Required
          </h3>

          <p className="text-slate-700 mb-6">
            These states require fees to be proportional to work performed. No pure referral fees, even with joint responsibility.
          </p>

          <div className="space-y-6 my-8">
            <div className="border border-slate-200 rounded-lg p-6 bg-white">
              <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
                Pennsylvania
              </h4>
              <div className="text-sm text-slate-700 space-y-2">
                <p><strong>Rule</strong>: Pennsylvania Rule 1.5(e)</p>
                <p><strong>Proportionality Required?</strong> YES. Strict proportionality required.</p>
                <p><strong>Joint Responsibility Option?</strong> No. Joint responsibility alone doesn't excuse proportionality requirement.</p>
                <p><strong>Client Disclosure Required?</strong> Yes, in writing</p>
                <p><strong>Key Details</strong>: Pennsylvania is one of the most restrictive states. Fee division MUST be proportional to work actually performed. Referring attorney must do substantive work to receive any fee. Pure referral fees are prohibited even with client consent and joint responsibility.</p>
              </div>
            </div>

            <div className="border border-slate-200 rounded-lg p-6 bg-white">
              <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
                Oregon
              </h4>
              <div className="text-sm text-slate-700 space-y-2">
                <p><strong>Rule</strong>: Oregon Rule 1.5(e)</p>
                <p><strong>Proportionality Required?</strong> YES</p>
                <p><strong>Joint Responsibility Option?</strong> Not applicable - proportionality strictly required</p>
                <p><strong>Client Disclosure Required?</strong> Yes</p>
                <p><strong>Key Details</strong>: Oregon requires strict proportionality. The referring attorney must perform actual legal work and the fee must reflect that work. No forwarding fees permitted.</p>
              </div>
            </div>

            <div className="border border-slate-200 rounded-lg p-6 bg-white">
              <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
                Iowa
              </h4>
              <div className="text-sm text-slate-700 space-y-2">
                <p><strong>Rule</strong>: Iowa Rule 32:1.5(e)</p>
                <p><strong>Proportionality Required?</strong> YES</p>
                <p><strong>Joint Responsibility Option?</strong> No exception for joint responsibility</p>
                <p><strong>Client Disclosure Required?</strong> Yes, written consent</p>
                <p><strong>Key Details</strong>: Iowa has strict proportionality requirement. Fee must reflect actual services performed by each attorney.</p>
              </div>
            </div>
          </div>

          {/* Category 4 States */}
          <h3 className="text-2xl font-bold text-red-900 mt-10 mb-4 bg-red-50 p-4 rounded-lg">
            Category 4: Special Restrictions & Unique Rules
          </h3>

          <div className="space-y-6 my-8">
            <div className="border border-red-200 rounded-lg p-6 bg-red-50">
              <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                Alaska
              </h4>
              <div className="text-sm text-slate-700 space-y-2">
                <p><strong>Rule</strong>: Alaska Rule 1.5(e)</p>
                <p><strong>Special Restriction</strong>: Referral fees prohibited entirely</p>
                <p><strong>Key Details</strong>: Alaska is one of the few states that prohibits referral fees between lawyers who are not in the same firm. Attorneys cannot divide fees unless they're in a partnership or association together.</p>
                <p className="text-red-700 font-semibold">⚠️ No referral fees allowed between unaffiliated attorneys</p>
              </div>
            </div>

            <div className="border border-slate-200 rounded-lg p-6 bg-white">
              <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                Florida (Medical Malpractice)
              </h4>
              <div className="text-sm text-slate-700 space-y-2">
                <p><strong>Rule</strong>: Florida Statute § 766.207</p>
                <p><strong>Special Restriction</strong>: Court approval required for referral fees in medical malpractice cases</p>
                <p><strong>Key Details</strong>: While Florida generally permits referral fees, medical malpractice cases have additional requirements. Court must approve fee-splitting arrangements and ensure they're reasonable.</p>
                <p><strong>Fee Caps</strong>: Florida has statutory caps on contingency fees in medical malpractice cases (30% before trial, 40% after trial starts).</p>
              </div>
            </div>

            <div className="border border-slate-200 rounded-lg p-6 bg-white">
              <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                District of Columbia
              </h4>
              <div className="text-sm text-slate-700 space-y-2">
                <p><strong>Rule</strong>: DC Rule 1.5(e)</p>
                <p><strong>Special Restriction</strong>: Extra disclosure requirements for personal injury contingency cases</p>
                <p><strong>Key Details</strong>: DC requires extensive written disclosure in personal injury contingency fee cases, including detailed breakdown of how fee will be divided and services each attorney will perform.</p>
              </div>
            </div>
          </div>

          {/* Key Compliance Requirements - All States */}
          <h2 className="text-3xl font-black text-slate-900 mt-12 mb-6">Universal Compliance Requirements (All States)</h2>

          <p className="text-slate-700 mb-6">
            Regardless of your state's specific rules, these requirements apply everywhere:
          </p>

          <div className="space-y-4 my-8">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
              <h3 className="font-bold text-blue-900 mb-2">1. Client Informed Consent</h3>
              <p className="text-blue-800 text-sm">
                <strong>Requirement</strong>: Client must be informed of and consent to the fee-sharing arrangement
              </p>
              <p className="text-blue-800 text-sm mt-2">
                <strong>Form</strong>: Written consent required (most states require this in engagement letter or separate fee agreement)
              </p>
              <p className="text-blue-800 text-sm mt-2">
                <strong>Disclosure Details</strong>: Must disclose which attorneys will participate, the division or share each will receive, and that division will not increase the total fee
              </p>
            </div>

            <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-lg">
              <h3 className="font-bold text-emerald-900 mb-2">2. Reasonable Total Fee</h3>
              <p className="text-emerald-800 text-sm">
                <strong>Requirement</strong>: The total fee charged to client must be reasonable regardless of how it's split between attorneys
              </p>
              <p className="text-emerald-800 text-sm mt-2">
                <strong>Key Point</strong>: You can't inflate the client's fee just because multiple attorneys are splitting it. The fee must be reasonable for the services provided to the client.
              </p>
            </div>

            <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-r-lg">
              <h3 className="font-bold text-purple-900 mb-2">3. Written Fee Agreement</h3>
              <p className="text-purple-800 text-sm">
                <strong>Requirement</strong>: Document the fee-sharing arrangement in writing
              </p>
              <p className="text-purple-800 text-sm mt-2">
                <strong>Between Attorneys</strong>: Written agreement between referring and receiving attorney documenting split and responsibilities
              </p>
              <p className="text-purple-800 text-sm mt-2">
                <strong>With Client</strong>: Engagement letter or fee agreement disclosing the arrangement to client
              </p>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg">
              <h3 className="font-bold text-amber-900 mb-2">4. No Fee-Splitting with Non-Lawyers</h3>
              <p className="text-amber-800 text-sm">
                <strong>Prohibition</strong>: Attorney referral fees can only be shared with other attorneys, never with non-lawyers
              </p>
              <p className="text-amber-800 text-sm mt-2">
                <strong>This Means</strong>: You cannot pay referral fees to marketers, salespeople, clients, or any non-attorney for referring legal work
              </p>
              <p className="text-amber-800 text-sm mt-2">
                <strong>Universal Rule</strong>: This prohibition exists in every state - no exceptions
              </p>
            </div>
          </div>

          {/* Common Scenarios */}
          <h2 className="text-3xl font-black text-slate-900 mt-12 mb-6">Common Scenarios & State Rules</h2>

          <div className="space-y-6 my-8">
            <div className="bg-slate-100 border border-slate-300 rounded-xl p-6">
              <h3 className="font-bold text-slate-900 mb-4">Scenario 1: Pure "Forwarding Fee" (No Work by Referring Attorney)</h3>
              <div className="text-sm text-slate-700 space-y-3">
                <p>
                  <strong>Situation</strong>: Attorney A refers a case to Attorney B. Attorney A does no work on the case but receives 20% of the fee.
                </p>
                <div className="grid md:grid-cols-2 gap-4 mt-3">
                  <div className="bg-emerald-100 p-4 rounded-lg">
                    <p className="font-semibold text-emerald-900 mb-2">✓ States Where This Is Allowed:</p>
                    <p className="text-emerald-800 text-xs">Category 1 states (CA, FL, TX, IL, GA, etc.) - with client consent and joint responsibility assumption</p>
                  </div>
                  <div className="bg-red-100 p-4 rounded-lg">
                    <p className="font-semibold text-red-900 mb-2">✗ States Where This Is Prohibited:</p>
                    <p className="text-red-800 text-xs">Category 3 states (PA, OR, IA, AK) - requires proportional work</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-100 border border-slate-300 rounded-xl p-6">
              <h3 className="font-bold text-slate-900 mb-4">Scenario 2: Referring Attorney Does Initial Case Evaluation</h3>
              <div className="text-sm text-slate-700 space-y-3">
                <p>
                  <strong>Situation</strong>: Attorney A meets with client, does initial case evaluation (3-5 hours work), then refers to specialist Attorney B. Attorney A receives 15% of total fee.
                </p>
                <div className="bg-emerald-100 p-4 rounded-lg mt-3">
                  <p className="font-semibold text-emerald-900 mb-2">✓ Allowed in All States</p>
                  <p className="text-emerald-800 text-xs">
                    If 15% is proportional to the work Attorney A performed relative to total work on the case. Even strict proportionality states allow this if math works out.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-100 border border-slate-300 rounded-xl p-6">
              <h3 className="font-bold text-slate-900 mb-4">Scenario 3: Co-Counseling with Defined Responsibilities</h3>
              <div className="text-sm text-slate-700 space-y-3">
                <p>
                  <strong>Situation</strong>: Attorney A (generalist) refers complex case to Attorney B (specialist). They agree Attorney A will handle client communication and document review (20% of work), Attorney B handles litigation (80% of work). Fee splits 20/80.
                </p>
                <div className="bg-emerald-100 p-4 rounded-lg mt-3">
                  <p className="font-semibold text-emerald-900 mb-2">✓ Allowed in All States</p>
                  <p className="text-emerald-800 text-xs">
                    This satisfies proportionality requirements everywhere because fee split matches work split. Both attorneys are actively working on case.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Documentation Checklist */}
          <h2 className="text-3xl font-black text-slate-900 mt-12 mb-6">Required Documentation Checklist</h2>

          <p className="text-slate-700 mb-6">
            To comply with referral fee rules, maintain these three documents for every referral arrangement:
          </p>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 my-8">
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  Document 1: Attorney-to-Attorney Fee Agreement
                </h3>
                <div className="ml-7 text-sm text-slate-700 space-y-2">
                  <p><strong>Purpose</strong>: Agreement between referring and receiving attorney</p>
                  <p><strong>Must Include</strong>:</p>
                  <ul className="list-disc ml-6 space-y-1">
                    <li>Percentage or amount of fee each attorney will receive</li>
                    <li>Description of services each attorney will perform (if proportionality required)</li>
                    <li>Statement of joint responsibility (if applicable in your state)</li>
                    <li>How costs and expenses will be handled</li>
                    <li>Process for resolving disputes about fee split</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  Document 2: Client Engagement Letter
                </h3>
                <div className="ml-7 text-sm text-slate-700 space-y-2">
                  <p><strong>Purpose</strong>: Disclose arrangement to client and obtain consent</p>
                  <p><strong>Must Include</strong>:</p>
                  <ul className="list-disc ml-6 space-y-1">
                    <li>Identity of all attorneys who will participate</li>
                    <li>Division or share each attorney will receive</li>
                    <li>Statement that division will not increase client's total fee</li>
                    <li>Total fee amount or method of calculation</li>
                    <li>Client's written consent to the arrangement</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  Document 3: Time Records (For Proportionality States)
                </h3>
                <div className="ml-7 text-sm text-slate-700 space-y-2">
                  <p><strong>Purpose</strong>: Demonstrate work performed justifies fee received</p>
                  <p><strong>Must Include</strong>:</p>
                  <ul className="list-disc ml-6 space-y-1">
                    <li>Time logs for all attorneys' work on matter</li>
                    <li>Description of services performed by referring attorney</li>
                    <li>Documentation showing fee split is proportional to work split</li>
                    <li>Calculation demonstrating reasonableness of total fee</li>
                  </ul>
                  <p className="text-amber-700 italic mt-2">
                    <strong>Note</strong>: Even in non-proportionality states, keeping time records is a best practice for demonstrating reasonableness.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Red Flags & Violations */}
          <h2 className="text-3xl font-black text-slate-900 mt-12 mb-6">Red Flags That Trigger Ethics Complaints</h2>

          <p className="text-slate-700 mb-6">
            Based on disciplinary cases from 2020-2025, here are the most common referral fee violations:
          </p>

          <div className="bg-red-50 border border-red-200 rounded-xl p-6 my-8">
            <h3 className="font-bold text-red-900 mb-4">Top 6 Referral Fee Violations</h3>
            <div className="space-y-4">
              <div>
                <p className="font-bold text-red-800 mb-1">1. No written client consent</p>
                <p className="text-sm text-red-700">
                  Client discovers fee-sharing arrangement after the fact. Even a verbal "heads up" isn't enough-must be in writing.
                </p>
              </div>
              <div>
                <p className="font-bold text-red-800 mb-1">2. Fee-splitting with non-lawyers</p>
                <p className="text-sm text-red-700">
                  Paying "finders fees" to marketers, case managers, or clients who refer legal work. This is prohibited in every jurisdiction.
                </p>
              </div>
              <div>
                <p className="font-bold text-red-800 mb-1">3. Unreasonable total fees due to splitting</p>
                <p className="text-sm text-red-700">
                  Client's total fee increases because multiple attorneys are taking cuts. The client shouldn't pay more just because you're splitting fees.
                </p>
              </div>
              <div>
                <p className="font-bold text-red-800 mb-1">4. Non-proportional fees in proportionality states</p>
                <p className="text-sm text-red-700">
                  In PA, OR, IA, and other strict states: referring attorney does minimal/no work but takes substantial percentage. This violates proportionality requirements.
                </p>
              </div>
              <div>
                <p className="font-bold text-red-800 mb-1">5. Failing to assume joint responsibility (where required)</p>
                <p className="text-sm text-red-700">
                  In states allowing non-proportional fees if joint responsibility is assumed, referring attorney must actually be legally responsible for the representation-not just in name only.
                </p>
              </div>
              <div>
                <p className="font-bold text-red-800 mb-1">6. Inadequate client disclosure</p>
                <p className="text-sm text-red-700">
                  Vague language like "I may associate with other counsel" without specifying fee split percentages and participants. Disclosure must be specific.
                </p>
              </div>
            </div>
          </div>

          {/* Best Practices */}
          <h2 className="text-3xl font-black text-slate-900 mt-12 mb-6">Best Practices for Compliance</h2>

          <div className="space-y-4 my-8">
            <div className="bg-emerald-50 border-l-4 border-emerald-500 p-5 rounded-r-lg">
              <h3 className="font-bold text-emerald-900 mb-2">✓ Always get client consent in writing BEFORE finalizing referral</h3>
              <p className="text-sm text-emerald-800">
                Include the disclosure in the initial engagement letter. Don't wait until the case settles to disclose the arrangement.
              </p>
            </div>

            <div className="bg-emerald-50 border-l-4 border-emerald-500 p-5 rounded-r-lg">
              <h3 className="font-bold text-emerald-900 mb-2">✓ Document work performed by referring attorney</h3>
              <p className="text-sm text-emerald-800">
                Even in non-proportionality states, keep time records. If questioned later, you'll have proof of work performed and reasonableness.
              </p>
            </div>

            <div className="bg-emerald-50 border-l-4 border-emerald-500 p-5 rounded-r-lg">
              <h3 className="font-bold text-emerald-900 mb-2">✓ Use clear, specific language in disclosures</h3>
              <p className="text-sm text-emerald-800">
                Don't say "may associate with." Say "I will refer this case to Attorney Jane Smith, who will receive 70% of the fee. I will receive 30% for initial case evaluation and client communication."
              </p>
            </div>

            <div className="bg-emerald-50 border-l-4 border-emerald-500 p-5 rounded-r-lg">
              <h3 className="font-bold text-emerald-900 mb-2">✓ Verify receiving attorney's qualifications and malpractice insurance</h3>
              <p className="text-sm text-emerald-800">
                If you're assuming joint responsibility, you're on the hook for malpractice. Make sure receiving attorney is competent and insured.
              </p>
            </div>

            <div className="bg-emerald-50 border-l-4 border-emerald-500 p-5 rounded-r-lg">
              <h3 className="font-bold text-emerald-900 mb-2">✓ When in doubt, consult your state bar's ethics hotline</h3>
              <p className="text-sm text-emerald-800">
                Most state bars offer free ethics advisory opinions. If you're unsure about a referral arrangement, get guidance before proceeding.
              </p>
            </div>
          </div>

          {/* Conclusion */}
          <h2 className="text-3xl font-black text-slate-900 mt-12 mb-6">The Bottom Line</h2>

          <p className="text-slate-700 mb-6">
            Attorney referral fees are legal and common-but rules vary significantly by state. The key compliance factors are:
          </p>

          <ul className="text-slate-700 space-y-2 mb-8">
            <li><strong>1. Know your state's rules</strong>: Are you in a permissive state (CA, FL, TX) or a strict proportionality state (PA, OR, IA)?</li>
            <li><strong>2. Get client consent in writing</strong>: This is non-negotiable in every state. Disclose the arrangement and fee split specifically.</li>
            <li><strong>3. Document everything</strong>: Attorney agreement, client consent, work performed, time records.</li>
            <li><strong>4. Ensure total fee is reasonable</strong>: The client shouldn't pay more because you're splitting fees.</li>
            <li><strong>5. Never split fees with non-lawyers</strong>: This is prohibited everywhere, no exceptions.</li>
          </ul>

          <p className="text-slate-700 mb-8">
            Referral networks are a powerful growth channel for law firms-but only if managed compliantly. When done right, referral fees create win-win-win arrangements: clients get specialized expertise, referring attorneys serve clients better, and receiving attorneys grow their practice.
          </p>

          <div className="bg-amber-50 border-l-4 border-amber-500 p-6 my-8 rounded-r-lg">
            <p className="text-amber-800 text-base mb-0">
              <strong>Final Reminder</strong>: This guide is for informational purposes and reflects rules as of January 2026. Ethics rules change, and interpretations vary. Always verify current requirements with your state bar before entering referral fee arrangements, and consider consulting with ethics counsel for complex situations.
            </p>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-br from-slate-700 to-slate-900 text-white rounded-2xl p-8 my-12">
            <h3 className="text-2xl font-black mb-4">Track Referrals Compliantly with Refer Labs</h3>
            <p className="text-slate-200 mb-6">
              Refer Labs helps law firms manage referral partners, track fee arrangements, document client consent, and maintain compliance across all 50 states. Built specifically for attorney referral networks.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-full font-bold hover:bg-slate-100 transition-colors"
              >
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="https://calendly.com/jarred-referlabs/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-slate-600 text-white px-6 py-3 rounded-full font-bold hover:bg-slate-700 transition-colors"
              >
                Book a Demo
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Related Posts */}
          <div className="border-t border-slate-200 pt-8 mt-12">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Related Articles</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Link href="/blog/compliant-referral-network-law-firms" className="group">
                <div className="border border-slate-200 rounded-lg p-5 hover:border-slate-400 hover:shadow-md transition-all">
                  <div className="text-xs font-semibold text-blue-600 mb-2">Law Firms</div>
                  <h4 className="font-bold text-slate-900 group-hover:text-slate-700 transition-colors mb-2">
                    How to Build a Compliant Referral Network for Your Law Firm
                  </h4>
                  <p className="text-sm text-slate-600">Navigate state bar ethics rules and scale your partner network.</p>
                </div>
              </Link>
              <Link href="/blog/law-firm-generates-2m-referrals" className="group">
                <div className="border border-slate-200 rounded-lg p-5 hover:border-slate-400 hover:shadow-md transition-all">
                  <div className="text-xs font-semibold text-amber-600 mb-2">Case Studies</div>
                  <h4 className="font-bold text-slate-900 group-hover:text-slate-700 transition-colors mb-2">
                    Case Study: How a Mid-Size Law Firm Generates $2M/Year from Referrals
                  </h4>
                  <p className="text-sm text-slate-600">Real numbers and systems from a 15-attorney firm that built a $2M referral channel.</p>
                </div>
              </Link>
            </div>
          </div>

        </div>
      </article>
    </div>
  );
}
