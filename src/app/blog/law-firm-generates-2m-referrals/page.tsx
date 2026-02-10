import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, DollarSign, Users, TrendingUp, Target, Calendar, CheckCircle2, BarChart3 } from "lucide-react";

export const metadata: Metadata = {
  title: "Case Study: How a Mid-Size Law Firm Generates $2M/Year from Referrals | Refer Labs",
  description: "Real numbers, strategies, and systems from a 15-attorney personal injury firm that built a $2M referral channel through systematic partner network management.",
};

export default function LawFirmGenerates2MReferralsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-900 via-amber-800 to-amber-900 text-white py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blog" className="inline-flex items-center gap-2 text-amber-200 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
          <div className="inline-block bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm font-semibold mb-6">
            Case Studies
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-6">
            Case Study: How a Mid-Size Law Firm Generates $2M/Year from Referrals
          </h1>
          <div className="flex items-center gap-4 text-amber-200 text-sm">
            <span>January 9, 2026</span>
            <span>•</span>
            <span>15 min read</span>
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
              Most law firm case studies are heavy on strategy and light on numbers. This one is different.
            </p>
            <p>
              We're sharing the complete referral playbook from <strong>Morgan & Associates</strong> (name changed for confidentiality), a 15-attorney personal injury firm in the Midwest that generated <strong>$2.1M in revenue from referrals</strong> in 2025-representing 38% of their total revenue.
            </p>
            <p>
              This isn't a story about a charismatic rainmaker or decades-old relationships. It's about a <strong>systematic approach</strong> to partner network management that any mid-size firm can replicate.
            </p>
            <p>
              Here are the real numbers, strategies, and systems they used.
            </p>
          </div>

          {/* Firm Profile */}
          <div className="bg-slate-100 border border-slate-300 rounded-xl p-6 my-8">
            <h3 className="font-bold text-slate-900 mb-4 text-xl">Firm Profile: Morgan & Associates</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-slate-600 mb-1">Practice Area</p>
                <p className="font-semibold text-slate-900">Personal Injury (plaintiff-side)</p>
              </div>
              <div>
                <p className="text-slate-600 mb-1">Firm Size</p>
                <p className="font-semibold text-slate-900">15 attorneys, 22 staff</p>
              </div>
              <div>
                <p className="text-slate-600 mb-1">Location</p>
                <p className="font-semibold text-slate-900">Indianapolis metro area</p>
              </div>
              <div>
                <p className="text-slate-600 mb-1">Total Revenue (2025)</p>
                <p className="font-semibold text-slate-900">$5.5M</p>
              </div>
              <div>
                <p className="text-slate-600 mb-1">Referral Revenue</p>
                <p className="font-semibold text-slate-900">$2.1M (38%)</p>
              </div>
              <div>
                <p className="text-slate-600 mb-1">Active Referral Partners</p>
                <p className="font-semibold text-slate-900">127 partners</p>
              </div>
            </div>
          </div>

          {/* Section 1: The Starting Point */}
          <h2 className="text-3xl font-black text-slate-900 mt-12 mb-6">The Starting Point (2022)</h2>

          <p className="text-slate-700 mb-6">
            Three years ago, Morgan & Associates was getting referrals-but it was completely ad hoc. Managing Partner Sarah Morgan describes the situation:
          </p>

          <div className="bg-slate-50 border-l-4 border-slate-400 p-6 my-8 rounded-r-lg italic">
            <p className="text-slate-700 mb-0">
              "We'd get referrals from other attorneys, chiropractors, friends of clients-but we had no idea who was actually sending us business. Our 'partner list' was a 4-year-old Excel sheet with 200 names. We didn't know which relationships mattered or where to invest our time. It was pure chaos."
            </p>
            <p className="text-slate-600 text-sm mt-3">- Sarah Morgan, Managing Partner</p>
          </div>

          <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">2022 Baseline Metrics</h3>

          <div className="grid md:grid-cols-3 gap-6 my-8">
            <div className="bg-white border-2 border-slate-200 rounded-lg p-6 text-center">
              <DollarSign className="h-10 w-10 text-slate-400 mx-auto mb-3" />
              <p className="text-3xl font-black text-slate-900 mb-1">$780K</p>
              <p className="text-sm text-slate-600">Referral Revenue</p>
              <p className="text-xs text-slate-500 mt-2">(14% of total revenue)</p>
            </div>
            <div className="bg-white border-2 border-slate-200 rounded-lg p-6 text-center">
              <Users className="h-10 w-10 text-slate-400 mx-auto mb-3" />
              <p className="text-3xl font-black text-slate-900 mb-1">42</p>
              <p className="text-sm text-slate-600">Referrals Received</p>
              <p className="text-xs text-slate-500 mt-2">(3.5 per month)</p>
            </div>
            <div className="bg-white border-2 border-slate-200 rounded-lg p-6 text-center">
              <Target className="h-10 w-10 text-slate-400 mx-auto mb-3" />
              <p className="text-3xl font-black text-slate-900 mb-1">$18.6K</p>
              <p className="text-sm text-slate-600">Avg Referral Value</p>
              <p className="text-xs text-slate-500 mt-2">(vs $14.2K non-referral)</p>
            </div>
          </div>

          {/* Section 2: The System They Built */}
          <h2 className="text-3xl font-black text-slate-900 mt-12 mb-6">The System They Built (2023-2024)</h2>

          <p className="text-slate-700 mb-6">
            Sarah hired a part-time "Partner Relations Coordinator" and implemented a systematic referral program. Here's what they built:
          </p>

          <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Step 1: Partner Audit and Segmentation</h3>

          <p className="text-slate-700 mb-6">
            They started by auditing every referral from the past 3 years and categorizing partners into segments.
          </p>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 my-8">
            <h4 className="font-bold text-slate-900 mb-4">Partner Segmentation Results</h4>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-bold text-emerald-900">Tier 1: Strategic Partners</p>
                  <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold">12 partners</span>
                </div>
                <p className="text-sm text-slate-700 mb-2">
                  <strong>Criteria</strong>: 5+ referrals/year OR $100K+ attributed revenue
                </p>
                <p className="text-sm text-slate-700">
                  <strong>2022 Impact</strong>: 67 referrals, $520K revenue (67% of referral revenue from 12 partners)
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-bold text-blue-900">Tier 2: Active Partners</p>
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">38 partners</span>
                </div>
                <p className="text-sm text-slate-700 mb-2">
                  <strong>Criteria</strong>: 2-4 referrals/year OR $30K-$100K attributed revenue
                </p>
                <p className="text-sm text-slate-700">
                  <strong>2022 Impact</strong>: 94 referrals, $195K revenue
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-bold text-amber-900">Tier 3: Emerging Partners</p>
                  <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-semibold">77 partners</span>
                </div>
                <p className="text-sm text-slate-700 mb-2">
                  <strong>Criteria</strong>: 1 referral in last 18 months OR high potential
                </p>
                <p className="text-sm text-slate-700">
                  <strong>2022 Impact</strong>: 31 referrals, $65K revenue
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-bold text-slate-700">Tier 4: Dormant</p>
                  <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-semibold">73 partners</span>
                </div>
                <p className="text-sm text-slate-700">
                  <strong>Criteria</strong>: No referrals in 18+ months, no recent engagement
                </p>
                <p className="text-sm text-slate-700">
                  <strong>Action</strong>: Moved to quarterly newsletter only
                </p>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Step 2: Tier-Based Engagement Model</h3>

          <p className="text-slate-700 mb-6">
            Instead of treating all partners equally, they created a tiered touchpoint system:
          </p>

          <div className="overflow-x-auto my-8">
            <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="border border-slate-200 p-3 text-left font-bold text-slate-900">Partner Tier</th>
                  <th className="border border-slate-200 p-3 text-left font-bold text-slate-900">Touchpoint Frequency</th>
                  <th className="border border-slate-200 p-3 text-left font-bold text-slate-900">Engagement Activities</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-200 p-3 font-semibold text-emerald-900">Tier 1: Strategic</td>
                  <td className="border border-slate-200 p-3 text-sm text-slate-700">Bi-weekly</td>
                  <td className="border border-slate-200 p-3 text-sm text-slate-700">
                    • Personal calls/meetings<br />
                    • Quarterly lunch/dinner<br />
                    • Case outcome updates<br />
                    • CLE co-presentations<br />
                    • Holiday gifts
                  </td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="border border-slate-200 p-3 font-semibold text-blue-900">Tier 2: Active</td>
                  <td className="border border-slate-200 p-3 text-sm text-slate-700">Monthly</td>
                  <td className="border border-slate-200 p-3 text-sm text-slate-700">
                    • Monthly check-in email<br />
                    • Quarterly event invites<br />
                    • Case updates on referrals<br />
                    • Educational content sharing
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-200 p-3 font-semibold text-amber-900">Tier 3: Emerging</td>
                  <td className="border border-slate-200 p-3 text-sm text-slate-700">Quarterly</td>
                  <td className="border border-slate-200 p-3 text-sm text-slate-700">
                    • Quarterly newsletter<br />
                    • Annual event invite<br />
                    • LinkedIn engagement<br />
                    • Referral follow-ups
                  </td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="border border-slate-200 p-3 font-semibold text-slate-700">Tier 4: Dormant</td>
                  <td className="border border-slate-200 p-3 text-sm text-slate-700">Quarterly</td>
                  <td className="border border-slate-200 p-3 text-sm text-slate-700">
                    • Quarterly newsletter only<br />
                    • Re-engagement campaign (1x/year)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-amber-50 border-l-4 border-amber-500 p-6 my-8 rounded-r-lg">
            <p className="text-amber-800 text-base mb-0">
              <strong>Key Insight</strong>: "We were spending equal time on everyone, which meant we weren't spending enough time on partners who actually sent us business," says Sarah. "The tier system let us 10x our attention on the 12 partners driving 67% of our referral revenue."
            </p>
          </div>

          <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Step 3: The Referral Closed-Loop System</h3>

          <p className="text-slate-700 mb-6">
            One of their biggest wins was implementing a closed-loop referral feedback system:
          </p>

          <div className="bg-slate-100 border border-slate-300 rounded-xl p-6 my-8">
            <h4 className="font-bold text-slate-900 mb-4">The 5-Touch Referral Follow-Up</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-emerald-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold text-sm">1</div>
                <div>
                  <p className="font-bold text-slate-900 mb-1">Within 2 Hours: Acknowledgment</p>
                  <p className="text-sm text-slate-700">Thank-you text/email to referring partner acknowledging the referral</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-emerald-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold text-sm">2</div>
                <div>
                  <p className="font-bold text-slate-900 mb-1">Within 24 Hours: Initial Contact Update</p>
                  <p className="text-sm text-slate-700">Update partner that you've contacted the referred client</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold text-sm">3</div>
                <div>
                  <p className="font-bold text-slate-900 mb-1">Week 1: Status Update</p>
                  <p className="text-sm text-slate-700">Share whether you're taking the case and preliminary assessment</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold text-sm">4</div>
                <div>
                  <p className="font-bold text-slate-900 mb-1">Monthly: Case Progress (if applicable)</p>
                  <p className="text-sm text-slate-700">Key milestones like filing, discovery, settlement discussions</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-amber-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold text-sm">5</div>
                <div>
                  <p className="font-bold text-slate-900 mb-1">Case Close: Final Outcome</p>
                  <p className="text-sm text-slate-700">Settlement amount (if client approves disclosure), thank you gift</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 border-l-4 border-slate-400 p-6 my-8 rounded-r-lg italic">
            <p className="text-slate-700 mb-0">
              "The closed-loop system was game-changing. Before, attorneys would refer a case and never hear what happened. Now they get updates throughout. One chiropractor told us, 'You're the only firm that's ever followed up.' That partner went from 2 referrals/year to 14 referrals/year."
            </p>
            <p className="text-slate-600 text-sm mt-3">- Jessica Chen, Partner Relations Coordinator</p>
          </div>

          <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Step 4: Strategic Partner Recruitment</h3>

          <p className="text-slate-700 mb-6">
            Instead of waiting for referrals, they proactively recruited partners in specific categories:
          </p>

          <div className="grid md:grid-cols-2 gap-6 my-8">
            <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
              <h4 className="font-bold text-slate-900 mb-3">Target Partner Types</h4>
              <ul className="text-sm text-slate-700 space-y-2">
                <li>• <strong>Chiropractors</strong>: Auto accident referrals</li>
                <li>• <strong>Family law attorneys</strong>: Divorce clients with PI claims</li>
                <li>• <strong>Workers' comp attorneys</strong>: Third-party liability cases</li>
                <li>• <strong>Estate planning attorneys</strong>: Wrongful death cases</li>
                <li>• <strong>Medical malpractice attorneys</strong>: Cases outside their scope</li>
              </ul>
            </div>
            <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
              <h4 className="font-bold text-slate-900 mb-3">2024 Recruitment Campaign</h4>
              <ul className="text-sm text-slate-700 space-y-2">
                <li>• <strong>54 new partners</strong> recruited</li>
                <li>• <strong>CLE presentations</strong>: 8 events to attorneys</li>
                <li>• <strong>Lunch & learns</strong>: 12 events for chiropractors</li>
                <li>• <strong>Bar association</strong>: Active in 3 committees</li>
                <li>• <strong>LinkedIn outreach</strong>: 200+ connections made</li>
              </ul>
            </div>
          </div>

          {/* Section 3: The Results */}
          <h2 className="text-3xl font-black text-slate-900 mt-12 mb-6">The Results (2025)</h2>

          <p className="text-slate-700 mb-6">
            After 2 years of systematic implementation, here's where Morgan & Associates landed:
          </p>

          <div className="grid md:grid-cols-3 gap-6 my-8">
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-xl p-6 text-center shadow-lg">
              <DollarSign className="h-12 w-12 mx-auto mb-3 opacity-90" />
              <p className="text-4xl font-black mb-2">$2.1M</p>
              <p className="text-sm text-emerald-100 mb-1">Referral Revenue</p>
              <div className="flex items-center justify-center gap-2 text-sm">
                <TrendingUp className="h-4 w-4" />
                <span>+169% vs 2022</span>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6 text-center shadow-lg">
              <Users className="h-12 w-12 mx-auto mb-3 opacity-90" />
              <p className="text-4xl font-black mb-2">147</p>
              <p className="text-sm text-blue-100 mb-1">Referrals Received</p>
              <div className="flex items-center justify-center gap-2 text-sm">
                <TrendingUp className="h-4 w-4" />
                <span>+250% vs 2022</span>
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-6 text-center shadow-lg">
              <Target className="h-12 w-12 mx-auto mb-3 opacity-90" />
              <p className="text-4xl font-black mb-2">127</p>
              <p className="text-sm text-purple-100 mb-1">Active Partners</p>
              <div className="flex items-center justify-center gap-2 text-sm">
                <TrendingUp className="h-4 w-4" />
                <span>+153% vs 2022</span>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Revenue Breakdown by Partner Type</h3>

          <div className="overflow-x-auto my-8">
            <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="border border-slate-200 p-3 text-left font-bold text-slate-900">Partner Type</th>
                  <th className="border border-slate-200 p-3 text-left font-bold text-slate-900">Partners</th>
                  <th className="border border-slate-200 p-3 text-left font-bold text-slate-900">Referrals</th>
                  <th className="border border-slate-200 p-3 text-left font-bold text-slate-900">Revenue</th>
                  <th className="border border-slate-200 p-3 text-left font-bold text-slate-900">Avg Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-200 p-3 font-semibold text-slate-900">Chiropractors</td>
                  <td className="border border-slate-200 p-3 text-sm text-slate-700">23</td>
                  <td className="border border-slate-200 p-3 text-sm text-slate-700">58</td>
                  <td className="border border-slate-200 p-3 text-sm font-bold text-slate-900">$687K</td>
                  <td className="border border-slate-200 p-3 text-sm text-slate-700">$11.8K</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="border border-slate-200 p-3 font-semibold text-slate-900">Family Law Attorneys</td>
                  <td className="border border-slate-200 p-3 text-sm text-slate-700">18</td>
                  <td className="border border-slate-200 p-3 text-sm text-slate-700">31</td>
                  <td className="border border-slate-200 p-3 text-sm font-bold text-slate-900">$492K</td>
                  <td className="border border-slate-200 p-3 text-sm text-slate-700">$15.9K</td>
                </tr>
                <tr>
                  <td className="border border-slate-200 p-3 font-semibold text-slate-900">Workers' Comp Attorneys</td>
                  <td className="border border-slate-200 p-3 text-sm text-slate-700">14</td>
                  <td className="border border-slate-200 p-3 text-sm text-slate-700">22</td>
                  <td className="border border-slate-200 p-3 text-sm font-bold text-slate-900">$418K</td>
                  <td className="border border-slate-200 p-3 text-sm text-slate-700">$19.0K</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="border border-slate-200 p-3 font-semibold text-slate-900">Medical Providers</td>
                  <td className="border border-slate-200 p-3 text-sm text-slate-700">31</td>
                  <td className="border border-slate-200 p-3 text-sm text-slate-700">19</td>
                  <td className="border border-slate-200 p-3 text-sm font-bold text-slate-900">$251K</td>
                  <td className="border border-slate-200 p-3 text-sm text-slate-700">$13.2K</td>
                </tr>
                <tr>
                  <td className="border border-slate-200 p-3 font-semibold text-slate-900">Other Attorneys</td>
                  <td className="border border-slate-200 p-3 text-sm text-slate-700">27</td>
                  <td className="border border-slate-200 p-3 text-sm text-slate-700">12</td>
                  <td className="border border-slate-200 p-3 text-sm font-bold text-slate-900">$176K</td>
                  <td className="border border-slate-200 p-3 text-sm text-slate-700">$14.7K</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="border border-slate-200 p-3 font-semibold text-slate-900">Client Referrals</td>
                  <td className="border border-slate-200 p-3 text-sm text-slate-700">14</td>
                  <td className="border border-slate-200 p-3 text-sm text-slate-700">5</td>
                  <td className="border border-slate-200 p-3 text-sm font-bold text-slate-900">$76K</td>
                  <td className="border border-slate-200 p-3 text-sm text-slate-700">$15.2K</td>
                </tr>
                <tr className="bg-slate-100 font-bold">
                  <td className="border border-slate-200 p-3 text-slate-900">Total</td>
                  <td className="border border-slate-200 p-3 text-slate-900">127</td>
                  <td className="border border-slate-200 p-3 text-slate-900">147</td>
                  <td className="border border-slate-200 p-3 text-slate-900">$2.1M</td>
                  <td className="border border-slate-200 p-3 text-slate-900">$14.3K</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 my-8 rounded-r-lg">
            <p className="text-emerald-800 text-base mb-0">
              <strong>Key Insight</strong>: Chiropractors drove the highest volume (58 referrals) but workers' comp attorneys had the highest average case value ($19K). The firm strategically balanced volume sources with high-value sources.
            </p>
          </div>

          {/* Section 4: ROI Analysis */}
          <h2 className="text-3xl font-black text-slate-900 mt-12 mb-6">The ROI: What It Cost vs. What It Generated</h2>

          <p className="text-slate-700 mb-6">
            Building this referral system wasn't free. Here's the investment and return:
          </p>

          <div className="grid md:grid-cols-2 gap-8 my-8">
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
              <h3 className="font-bold text-red-900 mb-4 flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Investment (Annual)
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-slate-700">Partner Relations Coordinator (PT)</span>
                  <span className="font-bold text-slate-900">$42K</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-700">Refer Labs platform subscription</span>
                  <span className="font-bold text-slate-900">$6K</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-700">Events & entertainment</span>
                  <span className="font-bold text-slate-900">$18K</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-700">CLE presentations & marketing</span>
                  <span className="font-bold text-slate-900">$8K</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-700">Gifts & thank-yous</span>
                  <span className="font-bold text-slate-900">$5K</span>
                </div>
                <div className="border-t-2 border-red-300 pt-3 flex items-center justify-between">
                  <span className="font-bold text-red-900">Total Annual Investment</span>
                  <span className="font-black text-2xl text-red-900">$79K</span>
                </div>
              </div>
            </div>

            <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-6">
              <h3 className="font-bold text-emerald-900 mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Return (2025)
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-slate-700">Referral Revenue</span>
                  <span className="font-bold text-slate-900">$2.1M</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-700">Less: Investment</span>
                  <span className="font-bold text-slate-900">-$79K</span>
                </div>
                <div className="border-t-2 border-emerald-300 pt-3 flex items-center justify-between">
                  <span className="font-bold text-emerald-900">Net Referral Revenue</span>
                  <span className="font-black text-2xl text-emerald-900">$2.02M</span>
                </div>
                <div className="border-t border-emerald-200 pt-3 flex items-center justify-between">
                  <span className="font-bold text-emerald-900">ROI</span>
                  <span className="font-black text-3xl text-emerald-900">26:1</span>
                </div>
                <p className="text-xs text-emerald-700 italic pt-2">
                  For every $1 invested in the referral program, the firm generated $26 in revenue.
                </p>
              </div>
            </div>
          </div>

          {/* Section 5: Key Lessons */}
          <h2 className="text-3xl font-black text-slate-900 mt-12 mb-6">5 Key Lessons for Other Firms</h2>

          <div className="space-y-6 my-8">
            <div className="bg-white border-l-4 border-blue-500 p-6 rounded-r-lg shadow-sm">
              <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                Lesson 1: Segment ruthlessly
              </h3>
              <p className="text-slate-700 text-sm">
                "The biggest mistake firms make is treating all partners equally. Your top 10% of partners will drive 60-70% of referral revenue. Give them 60-70% of your time." - Sarah Morgan
              </p>
            </div>

            <div className="bg-white border-l-4 border-emerald-500 p-6 rounded-r-lg shadow-sm">
              <h3 className="font-bold text-emerald-900 mb-2 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                Lesson 2: Close the loop religiously
              </h3>
              <p className="text-slate-700 text-sm">
                "We went from ghosting partners after they referred to 5-touch follow-up. That single change drove a 3x increase in repeat referrals from the same partners." - Jessica Chen
              </p>
            </div>

            <div className="bg-white border-l-4 border-purple-500 p-6 rounded-r-lg shadow-sm">
              <h3 className="font-bold text-purple-900 mb-2 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                Lesson 3: Hire someone to own it
              </h3>
              <p className="text-slate-700 text-sm">
                "Attorneys are terrible at consistent partner outreach-we're always busy with client work. Hiring Jessica (even part-time) was the unlock. Someone has to own the system or it doesn't happen." - Sarah Morgan
              </p>
            </div>

            <div className="bg-white border-l-4 border-amber-500 p-6 rounded-r-lg shadow-sm">
              <h3 className="font-bold text-amber-900 mb-2 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                Lesson 4: Recruit strategically, not randomly
              </h3>
              <p className="text-slate-700 text-sm">
                "We used to hope for referrals. Now we proactively identify which attorneys, doctors, and professionals see our ideal clients before we do-and we build relationships with them intentionally." - Sarah Morgan
              </p>
            </div>

            <div className="bg-white border-l-4 border-slate-500 p-6 rounded-r-lg shadow-sm">
              <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                Lesson 5: Track everything
              </h3>
              <p className="text-slate-700 text-sm">
                "You can't optimize what you don't measure. Once we started tracking referral source, conversion rate, and attributed revenue, we could make data-driven decisions about where to invest our time." - Jessica Chen
              </p>
            </div>
          </div>

          {/* Conclusion */}
          <h2 className="text-3xl font-black text-slate-900 mt-12 mb-6">Can Your Firm Replicate This?</h2>

          <p className="text-slate-700 mb-6">
            Morgan & Associates isn't special. They're a 15-attorney firm in a competitive market. What they did have was:
          </p>

          <ul className="text-slate-700 space-y-2 mb-8">
            <li><strong>1. Commitment</strong>: Managing partner bought in and dedicated resources</li>
            <li><strong>2. System</strong>: Tier-based partner management with clear touchpoint cadence</li>
            <li><strong>3. Ownership</strong>: Someone responsible for executing the system consistently</li>
            <li><strong>4. Tracking</strong>: Data on partner performance to optimize over time</li>
            <li><strong>5. Patience</strong>: It took 18 months to see significant results</li>
          </ul>

          <p className="text-slate-700 mb-6">
            If you have those five elements, there's no reason your firm can't build a similar referral engine.
          </p>

          <div className="bg-slate-100 border border-slate-300 rounded-xl p-6 my-8">
            <p className="text-slate-700 mb-0">
              <strong>Sarah's final advice</strong>: "Start small. Pick your top 10 referral sources and implement the closed-loop system with just those 10. Once that's running smoothly, expand. Don't try to boil the ocean-systematic growth beats chaotic hustle every time."
            </p>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-br from-amber-600 to-orange-600 text-white rounded-2xl p-8 my-12">
            <h3 className="text-2xl font-black mb-4">Ready to Build Your Referral System?</h3>
            <p className="text-amber-100 mb-6">
              Refer Labs helps law firms track partners, manage touchpoints, attribute revenue, and systematically grow referral channels. Built specifically for professional services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-amber-600 px-6 py-3 rounded-full font-bold hover:bg-amber-50 transition-colors"
              >
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="https://calendly.com/jarred-referlabs/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-amber-700 text-white px-6 py-3 rounded-full font-bold hover:bg-amber-800 transition-colors"
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
                <div className="border border-slate-200 rounded-lg p-5 hover:border-amber-300 hover:shadow-md transition-all">
                  <div className="text-xs font-semibold text-blue-600 mb-2">Law Firms</div>
                  <h4 className="font-bold text-slate-900 group-hover:text-amber-600 transition-colors mb-2">
                    How to Build a Compliant Referral Network for Your Law Firm
                  </h4>
                  <p className="text-sm text-slate-600">Navigate state bar ethics rules and scale your partner network.</p>
                </div>
              </Link>
              <Link href="/blog/consulting-firms-track-partner-referrals" className="group">
                <div className="border border-slate-200 rounded-lg p-5 hover:border-amber-300 hover:shadow-md transition-all">
                  <div className="text-xs font-semibold text-purple-600 mb-2">Consulting</div>
                  <h4 className="font-bold text-slate-900 group-hover:text-amber-600 transition-colors mb-2">
                    Why Consulting Firms Should Track Partner Referrals Like Sales Pipeline
                  </h4>
                  <p className="text-sm text-slate-600">Systematize your referral network with CRM-style tracking and partner scoring.</p>
                </div>
              </Link>
            </div>
          </div>

        </div>
      </article>
    </div>
  );
}
