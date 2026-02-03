import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Tag, CheckCircle, AlertTriangle, DollarSign, Users, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "The CPA's Guide to Cross-Referral Revenue (Without Ethics Violations) | Refer Labs",
  description: "Learn how accounting firms can generate revenue through compliant cross-referrals with attorneys, financial advisors, and other CPAs while maintaining AICPA ethics standards.",
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
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
            <Tag className="h-3 w-3" />
            Accounting
          </span>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>January 11, 2026</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>10 min read</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 mb-6 leading-tight">
          The CPA's Guide to Cross-Referral Revenue (Without Ethics Violations)
        </h1>

        {/* Excerpt */}
        <p className="text-xl text-slate-600 leading-relaxed mb-12">
          Learn how accounting firms can generate revenue through compliant cross-referrals with attorneys, financial advisors, and other CPAs while maintaining AICPA ethics standards.
        </p>

        {/* Content */}
        <div className="prose prose-lg prose-slate max-w-none">
          <p className="lead">
            <strong>CPAs are natural referral hubs</strong>. You see your clients' entire financial picture, understand their business challenges, and often identify legal or financial planning needs before they do. Yet most accounting firms leave tens of thousands of dollars on the table by not systematizing their referral networks.
          </p>

          <p>
            This guide shows you how to build compliant cross-referral arrangements that generate recurring revenue while staying well within AICPA ethics guidelines.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">The CPA Referral Opportunity</h2>

          <p>
            Unlike attorneys (who face strict fee-splitting rules), CPAs have more flexibility in referral arrangements. The key is understanding what's allowed and what crosses the line.
          </p>

          <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 my-8 rounded-r-lg">
            <div className="flex items-start gap-3">
              <DollarSign className="h-6 w-6 text-emerald-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold text-emerald-900 mb-2">The Revenue Potential</h3>
                <p className="text-emerald-800 text-base mb-0">
                  A mid-size accounting firm (5-15 CPAs) with systematic referral tracking reports an average of <strong>$75,000-$150,000 in annual referral-related revenue</strong> through reciprocal arrangements, co-branded services, and strategic partnerships.
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">AICPA Ethics: What You Can (and Can't) Do</h2>

          <p>
            The AICPA Code of Professional Conduct prohibits <strong>commissions and contingent fees</strong> in certain situations, but allows several types of referral arrangements:
          </p>

          <div className="grid md:grid-cols-2 gap-6 my-8">
            <div className="border-2 border-green-200 rounded-lg p-6 bg-green-50">
              <h3 className="font-bold text-green-900 mb-4 flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                ✅ Allowed Arrangements
              </h3>
              <ul className="space-y-3 text-sm text-green-800">
                <li><strong>Reciprocal referrals</strong>: Exchanging client referrals without payment</li>
                <li><strong>Marketing partnerships</strong>: Co-branded services and joint marketing</li>
                <li><strong>Revenue sharing</strong>: For services you both provide</li>
                <li><strong>Finder's fees</strong>: For non-attest clients (with disclosure)</li>
                <li><strong>Strategic alliances</strong>: Formal partnerships with clear terms</li>
              </ul>
            </div>
            <div className="border-2 border-red-200 rounded-lg p-6 bg-red-50">
              <h3 className="font-bold text-red-900 mb-4 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                ❌ Prohibited Arrangements
              </h3>
              <ul className="space-y-3 text-sm text-red-800">
                <li><strong>Commissions from attest clients</strong>: Can't receive fees for referring audit/review clients</li>
                <li><strong>Contingent fees on attest work</strong>: No success-based pricing on audits</li>
                <li><strong>Hidden arrangements</strong>: All referral deals must be disclosed to clients</li>
                <li><strong>Quid pro quo</strong>: Can't condition services on receiving referrals</li>
              </ul>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 my-8">
            <h4 className="font-bold text-amber-900 mb-3 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
              The Attest Client Rule
            </h4>
            <p className="text-amber-800">
              If you perform audit, review, or compilation services for a client, you <strong>cannot</strong> receive a commission or referral fee related to that client from any third party. This is the most common AICPA violation among CPAs.
            </p>
          </div>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">5 Compliant Referral Revenue Models</h2>

          <h3 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Model #1: Reciprocal Referral Networks</h3>

          <p>
            The most common (and safest) approach: Build a network of complementary professionals who refer clients to each other without direct payment.
          </p>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 my-6">
            <h4 className="font-bold text-slate-900 mb-3">Example: The CPA-Attorney-Advisor Triangle</h4>
            <p className="text-slate-700 mb-3">
              <strong>Your CPA firm</strong> refers clients to:
            </p>
            <ul className="text-slate-700 space-y-2 mb-4">
              <li>• <strong>Estate planning attorney</strong> for trust and will work</li>
              <li>• <strong>Financial advisor</strong> for investment management</li>
              <li>• <strong>Business attorney</strong> for contract review and entity formation</li>
            </ul>
            <p className="text-slate-700 mb-3">
              <strong>They refer back to you</strong> for:
            </p>
            <ul className="text-slate-700 space-y-2">
              <li>• Tax preparation and planning</li>
              <li>• CFO services and business advisory</li>
              <li>• Bookkeeping and payroll</li>
            </ul>
          </div>

          <p><strong>Revenue impact</strong>: Each partner in your network might send 10-20 referrals per year. At an average client value of $3,000-$5,000, that's $30K-$100K in referred revenue annually.</p>

          <h3 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Model #2: Co-Branded Service Offerings</h3>

          <p>
            Partner with complementary professionals to offer joint services under shared branding.
          </p>

          <div className="border-l-4 border-blue-600 pl-6 my-6">
            <h4 className="font-bold text-slate-900 mb-3">Example: The "Complete Business Setup Package"</h4>
            <p className="text-slate-700 mb-3">
              <strong>Partnership</strong>: Your CPA firm + Business attorney
            </p>
            <p className="text-slate-700 mb-3">
              <strong>Offering</strong>: Complete startup package including:
            </p>
            <ul className="text-slate-700 space-y-2 mb-3">
              <li>• Entity formation (attorney)</li>
              <li>• EIN application and tax elections (CPA)</li>
              <li>• Initial bookkeeping setup (CPA)</li>
              <li>• Operating agreement/bylaws (attorney)</li>
              <li>• First-year compliance calendar (both)</li>
            </ul>
            <p className="text-slate-700">
              <strong>Pricing</strong>: $2,500 package (split 60/40 or based on work performed)
            </p>
          </div>

          <p><strong>Revenue impact</strong>: If you close 2-3 packages per month, that's $30K-$45K in additional annual revenue from services you'd do anyway.</p>

          <h3 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Model #3: Seasonal Client Sharing</h3>

          <p>
            CPAs have natural seasonality. Tax season is busy, summer is slow. Partner with other CPAs to smooth your workload.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 my-6">
            <h4 className="font-bold text-blue-900 mb-3">How it works:</h4>
            <ul className="text-blue-800 space-y-2">
              <li><strong>January-April</strong>: Your partner refers overflow tax prep clients to you</li>
              <li><strong>May-December</strong>: You refer monthly bookkeeping clients to them</li>
              <li><strong>Year-round</strong>: Cross-refer for specialty services (cost segregation, R&D credits, etc.)</li>
            </ul>
          </div>

          <p><strong>Revenue impact</strong>: Overflow referrals during tax season alone can generate $15K-$30K for a small firm.</p>

          <h3 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Model #4: Strategic Niche Partnerships</h3>

          <p>
            Build deep partnerships with professionals who serve your target niche.
          </p>

          <table className="w-full border-collapse my-8">
            <thead>
              <tr className="border-b-2 border-slate-300">
                <th className="text-left py-3 px-4 font-bold text-slate-900">Your Niche</th>
                <th className="text-left py-3 px-4 font-bold text-slate-900">Ideal Partners</th>
                <th className="text-left py-3 px-4 font-bold text-slate-900">Referral Flow</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-200">
                <td className="py-3 px-4 font-semibold">Medical Practices</td>
                <td className="py-3 px-4 text-sm">Healthcare attorneys, medical billing companies</td>
                <td className="py-3 px-4 text-sm text-slate-600">They send new practices → You do startup financials</td>
              </tr>
              <tr className="border-b border-slate-200">
                <td className="py-3 px-4 font-semibold">Real Estate Investors</td>
                <td className="py-3 px-4 text-sm">Real estate attorneys, property managers</td>
                <td className="py-3 px-4 text-sm text-slate-600">They send investors → You do cost seg & 1031 planning</td>
              </tr>
              <tr className="border-b border-slate-200">
                <td className="py-3 px-4 font-semibold">Tech Startups</td>
                <td className="py-3 px-4 text-sm">Startup attorneys, VCs, incubators</td>
                <td className="py-3 px-4 text-sm text-slate-600">They send portfolio companies → You do fractional CFO</td>
              </tr>
              <tr className="border-b border-slate-200">
                <td className="py-3 px-4 font-semibold">High-Net-Worth</td>
                <td className="py-3 px-4 text-sm">Wealth managers, estate attorneys, insurance brokers</td>
                <td className="py-3 px-4 text-sm text-slate-600">They send clients → You do tax planning & trusts</td>
              </tr>
            </tbody>
          </table>

          <h3 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Model #5: Platform/Marketplace Revenue Sharing</h3>

          <p>
            Some CPA firms partner with software platforms or marketplaces that connect them with clients, with revenue split on resulting engagements.
          </p>

          <div className="border-l-4 border-emerald-600 pl-6 my-6">
            <h4 className="font-bold text-slate-900 mb-3">Example: QuickBooks ProAdvisor Network</h4>
            <p className="text-slate-700 mb-3">
              <strong>How it works</strong>: QuickBooks refers clients looking for accounting help → You close the engagement → Revenue split on certain products
            </p>
            <p className="text-slate-700">
              <strong>Compliance</strong>: These arrangements are typically structured as marketing partnerships with disclosed revenue sharing, not commissions.
            </p>
          </div>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">Tracking Referrals Properly</h2>

          <p>
            Whether you're exchanging reciprocal referrals or participating in revenue-sharing arrangements, you need audit-ready documentation:
          </p>

          <div className="grid md:grid-cols-2 gap-6 my-8">
            <div className="border border-slate-200 rounded-lg p-6">
              <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                Required Documentation
              </h4>
              <ul className="text-sm space-y-2 text-slate-700">
                <li>• Written partnership agreement</li>
                <li>• Client disclosure forms</li>
                <li>• Referral log with dates and parties</li>
                <li>• Revenue/payment tracking</li>
                <li>• Compliance attestation (no attest clients)</li>
              </ul>
            </div>
            <div className="border border-slate-200 rounded-lg p-6">
              <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                Partner Performance Metrics
              </h4>
              <ul className="text-sm space-y-2 text-slate-700">
                <li>• Referrals sent vs. received</li>
                <li>• Average client value</li>
                <li>• Conversion rate (referral → engagement)</li>
                <li>• Client quality score</li>
                <li>• Reciprocity balance</li>
              </ul>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-xl p-6 my-8">
            <h4 className="font-bold text-green-900 mb-3 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Pro Tip: The "Referral Scorecard"
            </h4>
            <p className="text-green-800 mb-3">
              Create a quarterly scorecard for each referral partner tracking:
            </p>
            <ul className="text-green-800 space-y-2">
              <li>• <strong>Volume</strong>: How many referrals sent/received?</li>
              <li>• <strong>Value</strong>: What's the average engagement size?</li>
              <li>• <strong>Quality</strong>: What % convert to paying clients?</li>
              <li>• <strong>Balance</strong>: Is the relationship reciprocal or one-sided?</li>
            </ul>
            <p className="text-green-800 mt-3">
              This helps you identify your best partners and weed out non-performers.
            </p>
          </div>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">Common Compliance Mistakes</h2>

          <div className="space-y-6 my-8">
            <div className="border-l-4 border-red-500 pl-6">
              <h4 className="font-bold text-red-900 mb-2">❌ Mistake #1: Accepting Commissions from Attest Clients</h4>
              <p className="text-slate-700 mb-2">
                <strong>The violation</strong>: A financial advisor pays you $500 for referring your audit client to them.
              </p>
              <p className="text-slate-700">
                <strong>The fix</strong>: Never accept referral fees related to attest clients. Structure as reciprocal referrals instead.
              </p>
            </div>

            <div className="border-l-4 border-red-500 pl-6">
              <h4 className="font-bold text-red-900 mb-2">❌ Mistake #2: Undisclosed Revenue Sharing</h4>
              <p className="text-slate-700 mb-2">
                <strong>The violation</strong>: You split fees with an attorney but don't tell the client.
              </p>
              <p className="text-slate-700">
                <strong>The fix</strong>: Always disclose referral arrangements and revenue-sharing agreements to clients in writing.
              </p>
            </div>

            <div className="border-l-4 border-red-500 pl-6">
              <h4 className="font-bold text-red-900 mb-2">❌ Mistake #3: No Written Agreement</h4>
              <p className="text-slate-700 mb-2">
                <strong>The violation</strong>: Handshake deals with referral partners.
              </p>
              <p className="text-slate-700">
                <strong>The fix</strong>: Document all referral relationships with written agreements outlining terms, responsibilities, and compensation (if any).
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">Building Your CPA Referral Network</h2>

          <p>
            Ready to systematize your referral program? Here's your 60-day plan:
          </p>

          <div className="space-y-4 my-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center">
                1
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-1">Weeks 1-2: Audit Current Referrals</h4>
                <p className="text-slate-700 text-sm">
                  List all professionals you've referred clients to in the past year. Do you have documentation? Are any arrangements non-compliant?
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center">
                2
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-1">Weeks 3-4: Identify Target Partners</h4>
                <p className="text-slate-700 text-sm">
                  Make a list of 15-20 attorneys, advisors, and other CPAs who serve your target clients. Research their reputation and client base.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center">
                3
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-1">Weeks 5-6: Create Partnership Agreements</h4>
                <p className="text-slate-700 text-sm">
                  Draft referral partnership agreements for each arrangement type. Have your attorney review for compliance with state and AICPA rules.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center">
                4
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-1">Weeks 7-8: Launch and Track</h4>
                <p className="text-slate-700 text-sm">
                  Reach out to target partners, sign agreements, and implement referral tracking. Set up quarterly review meetings with each partner.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-600 to-green-600 text-white rounded-2xl p-8 my-12">
            <h3 className="text-2xl font-bold mb-3">Track Your CPA Referral Network Automatically</h3>
            <p className="text-emerald-100 mb-6">
              Refer Labs provides AICPA-compliant referral tracking, partner scorecards, and automated documentation for accounting firms. Built specifically for CPAs.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-bold text-emerald-600 hover:bg-emerald-50 transition-colors"
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
                <span><strong>Know the attest client rule</strong>: You cannot receive commissions or referral fees related to audit/review/compilation clients</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span><strong>Reciprocal arrangements are safest</strong>: Exchanging referrals without payment is always compliant</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span><strong>Document everything</strong>: Written agreements and client disclosures are essential</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span><strong>Track performance</strong>: Measure volume, value, quality, and reciprocity for each partner</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span><strong>Build niche partnerships</strong>: Deep relationships in your target market generate the most value</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Author CTA */}
        <div className="border-t border-slate-200 mt-16 pt-12">
          <div className="bg-slate-50 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              Need help building a compliant CPA referral network?
            </h3>
            <p className="text-slate-600 mb-6">
              Our team helps accounting firms build systematic, AICPA-compliant referral programs with automated tracking and partner scoring.
            </p>
            <Link
              href="https://calendly.com/jarred-referlabs/30min"
              target="_blank"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 font-bold text-white hover:bg-emerald-700 transition-colors"
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
