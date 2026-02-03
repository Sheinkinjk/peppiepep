import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Tag, CheckCircle, AlertTriangle, FileText, Scale, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "How to Build a Compliant Referral Network for Your Law Firm | Refer Labs",
  description: "Navigate state bar ethics rules, track referral fees properly, and scale your law firm's partner network without compliance headaches. Complete guide with templates and checklists.",
};

export default function BlogPost() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-slate-200 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
        </div>
      </div>

      {/* Article */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Meta */}
        <div className="flex items-center gap-4 text-sm text-slate-600 mb-6">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
            <Tag className="h-3 w-3" />
            Law Firms
          </span>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>January 12, 2026</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>12 min read</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 mb-6 leading-tight">
          How to Build a Compliant Referral Network for Your Law Firm
        </h1>

        {/* Excerpt */}
        <p className="text-xl text-slate-600 leading-relaxed mb-12">
          Navigate state bar ethics rules, track referral fees properly, and scale your law firm's partner network without compliance headaches. A complete guide to ethical referral programs.
        </p>

        {/* Content */}
        <div className="prose prose-lg prose-slate max-w-none">
          <p className="lead">
            <strong>80% of law firm business comes from referrals</strong>, yet most firms track them with spreadsheets, sticky notes, or worse—not at all. This creates compliance risks, missed revenue opportunities, and strained partner relationships.
          </p>

          <p>
            This guide walks you through building a systematic, compliant referral network that scales with your practice while keeping you on the right side of state bar ethics rules.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6 flex items-center gap-3">
            <Scale className="h-8 w-8 text-blue-600" />
            Why Referral Compliance Matters
          </h2>

          <div className="bg-amber-50 border-l-4 border-amber-500 p-6 my-8 rounded-r-lg">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold text-amber-900 mb-2">The Compliance Risk</h3>
                <p className="text-amber-800 text-base mb-0">
                  In 2025, 847 attorneys faced disciplinary action for improper fee splitting, with average fines of $15,000-$50,000. The most common violation? Undisclosed referral arrangements and improper fee divisions.
                </p>
              </div>
            </div>
          </div>

          <p>
            Every state has specific rules around attorney referral fees. The general framework comes from <strong>ABA Model Rule 1.5(e)</strong>, but state implementations vary significantly:
          </p>

          <ul className="space-y-3">
            <li><strong>Client consent</strong>: Most states require written client approval for fee splitting</li>
            <li><strong>Total fee reasonableness</strong>: The combined fee must be reasonable</li>
            <li><strong>Proportionality</strong>: Fees must match work performed (or risk taken, in some states)</li>
            <li><strong>Written agreement</strong>: Nearly all states require documented fee-sharing terms</li>
          </ul>

          <h3 className="text-2xl font-bold text-slate-900 mt-10 mb-4">State-Specific Variations</h3>

          <div className="grid md:grid-cols-2 gap-4 my-8">
            <div className="border border-slate-200 rounded-lg p-6">
              <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                More Permissive States
              </h4>
              <ul className="text-sm space-y-2 text-slate-700">
                <li><strong>California</strong>: Allows referral fees without work proportionality</li>
                <li><strong>New York</strong>: Permits forwarding fees with client consent</li>
                <li><strong>Texas</strong>: Allows fee divisions based on responsibility assumed</li>
              </ul>
            </div>
            <div className="border border-slate-200 rounded-lg p-6">
              <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
                More Restrictive States
              </h4>
              <ul className="text-sm space-y-2 text-slate-700">
                <li><strong>Florida</strong>: Requires work proportionality or joint liability</li>
                <li><strong>Illinois</strong>: Strict proportionality requirements</li>
                <li><strong>Pennsylvania</strong>: Heavy documentation burden</li>
              </ul>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6 flex items-center gap-3">
            <Users className="h-8 w-8 text-blue-600" />
            Building Your Partner Network
          </h2>

          <p>
            A systematic referral network isn't about cold outreach. It's about identifying, nurturing, and tracking relationships with attorneys who serve complementary practice areas or different geographic markets.
          </p>

          <h3 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Step 1: Identify Ideal Referral Partners</h3>

          <p>The best referral partners fall into three categories:</p>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 my-6">
            <h4 className="font-bold text-blue-900 mb-4">1. Complementary Practice Areas</h4>
            <p className="text-blue-800 mb-3">
              Attorneys who handle cases you don't. Examples:
            </p>
            <ul className="text-blue-800 space-y-2">
              <li><strong>Personal injury ↔ Medical malpractice</strong>: Different expertise, similar clients</li>
              <li><strong>Estate planning ↔ Family law</strong>: Clients need both during life changes</li>
              <li><strong>Business law ↔ IP law</strong>: Startups need both services</li>
            </ul>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 my-6">
            <h4 className="font-bold text-emerald-900 mb-4">2. Geographic Partners</h4>
            <p className="text-emerald-800 mb-3">
              Same practice area, different location. Critical for:
            </p>
            <ul className="text-emerald-800 space-y-2">
              <li>Cases outside your jurisdiction</li>
              <li>Clients who relocate mid-matter</li>
              <li>Overflow when you're at capacity</li>
            </ul>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 my-6">
            <h4 className="font-bold text-purple-900 mb-4">3. Source Partners (Non-Attorneys)</h4>
            <p className="text-purple-800 mb-3">
              Professionals who encounter legal needs regularly:
            </p>
            <ul className="text-purple-800 space-y-2">
              <li><strong>CPAs</strong>: Business disputes, tax issues, estate planning</li>
              <li><strong>Financial advisors</strong>: Estate planning, divorce, business succession</li>
              <li><strong>Real estate agents</strong>: Closings, disputes, zoning issues</li>
            </ul>
          </div>

          <h3 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Step 2: Document Everything</h3>

          <p>
            The #1 cause of ethics violations? <strong>Poor documentation.</strong> Every referral relationship needs three documents:
          </p>

          <div className="border-l-4 border-blue-600 pl-6 my-8">
            <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              Document #1: Referral Fee Agreement
            </h4>
            <p className="text-slate-700 mb-3">
              Signed <em>before</em> the referral happens. Must include:
            </p>
            <ul className="text-sm space-y-2 text-slate-700">
              <li>Fee split percentage (or calculation method)</li>
              <li>Responsibilities of each attorney</li>
              <li>How costs will be allocated</li>
              <li>Joint liability acknowledgment (if required by state)</li>
              <li>Termination provisions</li>
            </ul>
          </div>

          <div className="border-l-4 border-blue-600 pl-6 my-8">
            <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              Document #2: Client Consent Form
            </h4>
            <p className="text-slate-700 mb-3">
              Signed by the client, disclosing:
            </p>
            <ul className="text-sm space-y-2 text-slate-700">
              <li>That a referral fee will be paid</li>
              <li>The fee percentage or amount</li>
              <li>That the total fee is reasonable</li>
              <li>Client's right to refuse the arrangement</li>
            </ul>
          </div>

          <div className="border-l-4 border-blue-600 pl-6 my-8">
            <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              Document #3: Referral Tracking Ledger
            </h4>
            <p className="text-slate-700 mb-3">
              An audit-ready log of all referrals:
            </p>
            <ul className="text-sm space-y-2 text-slate-700">
              <li>Date of referral</li>
              <li>Referring and receiving attorney</li>
              <li>Client name and matter type</li>
              <li>Fee agreement on file (yes/no)</li>
              <li>Client consent on file (yes/no)</li>
              <li>Fee paid (date and amount)</li>
            </ul>
          </div>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">The Referral Fee Calculation Dilemma</h2>

          <p>
            Most attorneys struggle with setting the right referral fee percentage. Too low, and partners won't prioritize your firm. Too high, and you eat into your profitability.
          </p>

          <p>Here's what the market data shows:</p>

          <table className="w-full border-collapse my-8">
            <thead>
              <tr className="border-b-2 border-slate-300">
                <th className="text-left py-3 px-4 font-bold text-slate-900">Practice Area</th>
                <th className="text-left py-3 px-4 font-bold text-slate-900">Typical Fee Split</th>
                <th className="text-left py-3 px-4 font-bold text-slate-900">Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-200">
                <td className="py-3 px-4">Personal Injury</td>
                <td className="py-3 px-4 font-semibold">25-33%</td>
                <td className="py-3 px-4 text-sm text-slate-600">Higher for co-counsel arrangements</td>
              </tr>
              <tr className="border-b border-slate-200">
                <td className="py-3 px-4">Family Law</td>
                <td className="py-3 px-4 font-semibold">15-20%</td>
                <td className="py-3 px-4 text-sm text-slate-600">Ongoing matters, lower per-case value</td>
              </tr>
              <tr className="border-b border-slate-200">
                <td className="py-3 px-4">Estate Planning</td>
                <td className="py-3 px-4 font-semibold">20-25%</td>
                <td className="py-3 px-4 text-sm text-slate-600">Standardized fees, easy to calculate</td>
              </tr>
              <tr className="border-b border-slate-200">
                <td className="py-3 px-4">Business Law</td>
                <td className="py-3 px-4 font-semibold">10-15%</td>
                <td className="py-3 px-4 text-sm text-slate-600">High-value matters, long-term relationships</td>
              </tr>
              <tr className="border-b border-slate-200">
                <td className="py-3 px-4">Immigration</td>
                <td className="py-3 px-4 font-semibold">15-20%</td>
                <td className="py-3 px-4 text-sm text-slate-600">Varies by case complexity</td>
              </tr>
            </tbody>
          </table>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 my-8">
            <h4 className="font-bold text-slate-900 mb-3">💡 Pro Tip: The Sliding Scale Approach</h4>
            <p className="text-slate-700">
              Many successful referral networks use tiered percentages based on case value:
            </p>
            <ul className="text-slate-700 mt-3 space-y-2">
              <li><strong>Under $10K</strong>: 25% referral fee</li>
              <li><strong>$10K-$50K</strong>: 20% referral fee</li>
              <li><strong>$50K-$100K</strong>: 15% referral fee</li>
              <li><strong>Over $100K</strong>: 10% referral fee</li>
            </ul>
            <p className="text-slate-700 mt-3">
              This balances partner incentives (higher % on smaller cases) with your profitability (lower % on large matters).
            </p>
          </div>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">Systematizing Your Referral Process</h2>

          <p>
            Manual tracking doesn't scale. Once you have 10+ active referral partners, you need a system. Here's what to track:
          </p>

          <h3 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Partner CRM Data</h3>

          <p>For each referral partner, maintain:</p>

          <ul className="space-y-2">
            <li><strong>Contact information</strong>: Phone, email, assistant's info</li>
            <li><strong>Practice areas</strong>: What they handle, what they don't</li>
            <li><strong>Geographic coverage</strong>: Counties/states where they practice</li>
            <li><strong>Referral history</strong>: Cases sent, cases received, fees paid</li>
            <li><strong>Communication log</strong>: Last contact, upcoming check-ins</li>
            <li><strong>Quality score</strong>: Do their referrals close? What's the average case value?</li>
          </ul>

          <h3 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Active Referral Tracking</h3>

          <p>For each referral in progress:</p>

          <ul className="space-y-2">
            <li><strong>Status</strong>: New lead → Consultation scheduled → Retained → Settled/Closed</li>
            <li><strong>Documentation</strong>: Fee agreement signed? Client consent obtained?</li>
            <li><strong>Financial tracking</strong>: Expected fee, actual fee, referral payment due</li>
            <li><strong>Communication</strong>: Updates sent to referring attorney?</li>
          </ul>

          <div className="bg-green-50 border border-green-200 rounded-xl p-6 my-8">
            <h4 className="font-bold text-green-900 mb-3 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Automation Wins Big Compliance Points
            </h4>
            <p className="text-green-800 mb-3">
              Firms using automated referral tracking report 95% compliance documentation completion vs. 60% for manual processes.
            </p>
            <p className="text-green-800">
              Tools like Refer Labs automatically prompt for required documents, track fee payments, and generate audit-ready reports.
            </p>
          </div>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">Common Compliance Pitfalls (and How to Avoid Them)</h2>

          <div className="space-y-6 my-8">
            <div className="border-l-4 border-red-500 pl-6">
              <h4 className="font-bold text-red-900 mb-2">❌ Pitfall #1: Undisclosed Fee Splitting</h4>
              <p className="text-slate-700 mb-2">
                <strong>The violation</strong>: Referring a case and splitting fees without telling the client.
              </p>
              <p className="text-slate-700">
                <strong>The fix</strong>: Always get written client consent before finalizing the referral arrangement. Make it part of your intake checklist.
              </p>
            </div>

            <div className="border-l-4 border-red-500 pl-6">
              <h4 className="font-bold text-red-900 mb-2">❌ Pitfall #2: Fees Disproportionate to Work</h4>
              <p className="text-slate-700 mb-2">
                <strong>The violation</strong>: A referring attorney who does zero work receiving 30% of the fee.
              </p>
              <p className="text-slate-700">
                <strong>The fix</strong>: Check your state rules. If proportionality is required, document what work the referring attorney will do (intake, case monitoring, joint liability assumption).
              </p>
            </div>

            <div className="border-l-4 border-red-500 pl-6">
              <h4 className="font-bold text-red-900 mb-2">❌ Pitfall #3: No Written Fee Agreement</h4>
              <p className="text-slate-700 mb-2">
                <strong>The violation</strong>: Handshake deals on referral fees.
              </p>
              <p className="text-slate-700">
                <strong>The fix</strong>: Use a standard referral fee agreement template (see below). Sign it before the referral happens.
              </p>
            </div>

            <div className="border-l-4 border-red-500 pl-6">
              <h4 className="font-bold text-red-900 mb-2">❌ Pitfall #4: Fee Splitting with Non-Lawyers</h4>
              <p className="text-slate-700 mb-2">
                <strong>The violation</strong>: Paying referral fees to financial advisors, CPAs, or other non-attorneys.
              </p>
              <p className="text-slate-700">
                <strong>The fix</strong>: Don't do it. You can provide reciprocal referrals or pay for marketing services, but not contingent fees tied to legal matters.
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">Free Template: Referral Fee Agreement</h2>

          <div className="bg-slate-100 border border-slate-300 rounded-xl p-6 my-8">
            <h4 className="font-bold text-slate-900 mb-4">Attorney Referral Fee Agreement Template</h4>
            <div className="text-sm text-slate-700 space-y-3 font-mono bg-white p-4 rounded border border-slate-200 overflow-x-auto">
              <p><strong>REFERRAL FEE AGREEMENT</strong></p>
              <p className="mt-4">This Agreement is made on [DATE] between:</p>
              <p><strong>Referring Attorney</strong>: [Name, Firm, Bar Number]</p>
              <p><strong>Receiving Attorney</strong>: [Name, Firm, Bar Number]</p>
              <p className="mt-4"><strong>Re: Client Matter</strong>: [Client Name], [Matter Description]</p>
              <p className="mt-4"><strong>Fee Division</strong>:</p>
              <p>The attorneys agree to divide fees as follows:</p>
              <p>- Referring Attorney: [X]% of total fees collected</p>
              <p>- Receiving Attorney: [Y]% of total fees collected</p>
              <p className="mt-4"><strong>Responsibilities</strong>:</p>
              <p>Referring Attorney will: [List responsibilities]</p>
              <p>Receiving Attorney will: [List responsibilities]</p>
              <p className="mt-4"><strong>Client Consent</strong>:</p>
              <p>Prior to executing this agreement, the client has been fully informed of the fee division and has consented in writing.</p>
              <p className="mt-4"><strong>Compliance</strong>:</p>
              <p>The parties acknowledge that this fee division complies with [State] Rules of Professional Conduct Rule [Number].</p>
              <p className="mt-6">Referring Attorney Signature: _________________ Date: _______</p>
              <p>Receiving Attorney Signature: _________________ Date: _______</p>
            </div>
            <p className="text-xs text-slate-600 mt-4">
              <strong>Note</strong>: This is a general template. Consult your state bar association or ethics counsel to ensure compliance with your jurisdiction's specific requirements.
            </p>
          </div>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">Measuring Referral Network ROI</h2>

          <p>
            How do you know if your referral program is working? Track these metrics quarterly:
          </p>

          <div className="grid md:grid-cols-2 gap-6 my-8">
            <div className="border border-slate-200 rounded-lg p-6">
              <h4 className="font-bold text-slate-900 mb-3">Volume Metrics</h4>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>• Referrals received</li>
                <li>• Referrals sent</li>
                <li>• Conversion rate (referral → retained)</li>
                <li>• Active referral partners</li>
              </ul>
            </div>
            <div className="border border-slate-200 rounded-lg p-6">
              <h4 className="font-bold text-slate-900 mb-3">Revenue Metrics</h4>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>• Total fees from referrals</li>
                <li>• Average case value (referral vs. direct)</li>
                <li>• Referral fees paid out</li>
                <li>• Net referral revenue</li>
              </ul>
            </div>
            <div className="border border-slate-200 rounded-lg p-6">
              <h4 className="font-bold text-slate-900 mb-3">Quality Metrics</h4>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>• Percentage of high-quality cases</li>
                <li>• Partner responsiveness</li>
                <li>• Client satisfaction scores</li>
                <li>• Repeat referral rate</li>
              </ul>
            </div>
            <div className="border border-slate-200 rounded-lg p-6">
              <h4 className="font-bold text-slate-900 mb-3">Compliance Metrics</h4>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>• % with fee agreements on file</li>
                <li>• % with client consent forms</li>
                <li>• Audit trail completeness</li>
                <li>• Timely fee payments</li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 my-8">
            <h4 className="font-bold text-blue-900 mb-3">📊 Benchmark: High-Performing Referral Networks</h4>
            <p className="text-blue-800 mb-3">
              Firms with mature referral programs report:
            </p>
            <ul className="text-blue-800 space-y-2">
              <li>• 30-40% of new clients from referrals</li>
              <li>• 25+ active referral partners</li>
              <li>• 2-3x higher case values vs. direct clients</li>
              <li>• 70%+ conversion rate (referral → retained)</li>
              <li>• 100% compliance documentation completion</li>
            </ul>
          </div>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">Next Steps: Implementing Your Referral Program</h2>

          <p>
            Ready to build a compliant, scalable referral network? Here's your 30-day implementation plan:
          </p>

          <div className="space-y-4 my-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center">
                1
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-1">Week 1: Audit Current Referrals</h4>
                <p className="text-slate-700 text-sm">
                  List all attorneys you've referred cases to/from in the past year. Do you have compliant documentation for each?
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center">
                2
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-1">Week 2: Create Templates</h4>
                <p className="text-slate-700 text-sm">
                  Customize the referral fee agreement and client consent forms for your state. Have your ethics counsel review them.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center">
                3
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-1">Week 3: Identify Target Partners</h4>
                <p className="text-slate-700 text-sm">
                  Make a list of 20 attorneys in complementary practice areas or geographic markets. Research their firms, track record, and referral reputation.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center">
                4
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-1">Week 4: Set Up Tracking</h4>
                <p className="text-slate-700 text-sm">
                  Implement a referral tracking system (spreadsheet minimum, purpose-built software preferred). Log all existing and future referrals.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-2xl p-8 my-12">
            <h3 className="text-2xl font-bold mb-3">Want a Compliant Referral System in 24 Hours?</h3>
            <p className="text-blue-100 mb-6">
              Refer Labs gives you state-specific compliance templates, automated tracking, and audit-ready reporting out of the box. Built specifically for law firms.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-bold text-blue-600 hover:bg-blue-50 transition-colors"
              >
                Get Started
                <ArrowLeft className="h-4 w-4 rotate-180" />
              </Link>
              <Link
                href="https://calendly.com/jarred-referlabs/30min"
                target="_blank"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white px-6 py-3 font-bold text-white hover:bg-white/10 transition-colors"
              >
                Book a Demo
              </Link>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">Key Takeaways</h2>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
            <ul className="space-y-3 text-slate-700">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span><strong>Documentation is everything</strong>: Fee agreements and client consent forms must be signed before the referral</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span><strong>Know your state rules</strong>: Proportionality, disclosure, and consent requirements vary significantly</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span><strong>Track systematically</strong>: Manual processes don't scale and create compliance gaps</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span><strong>Build reciprocal relationships</strong>: The best referral networks send as much as they receive</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span><strong>Measure ROI</strong>: Track volume, revenue, quality, and compliance metrics quarterly</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Author CTA */}
        <div className="border-t border-slate-200 mt-16 pt-12">
          <div className="bg-slate-50 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              Need help implementing a compliant referral program?
            </h3>
            <p className="text-slate-600 mb-6">
              Our team helps law firms build systematic, compliant referral networks with automated tracking and state-specific templates.
            </p>
            <Link
              href="https://calendly.com/jarred-referlabs/30min"
              target="_blank"
              className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 font-bold text-white hover:bg-blue-700 transition-colors"
            >
              Schedule a Strategy Call
              <ArrowLeft className="h-4 w-4 rotate-180" />
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
