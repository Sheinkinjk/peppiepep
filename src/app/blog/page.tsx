import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, Tag } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog | Refer Labs - Professional Services Referral Intelligence",
  description: "Expert insights on building compliant referral networks for law firms, accounting practices, and consulting firms. Learn how to scale your partner network with best practices and case studies.",
};

const blogPosts = [
  {
    slug: "compliant-referral-network-law-firms",
    title: "How to Build a Compliant Referral Network for Your Law Firm",
    excerpt: "Navigate state bar ethics rules, track referral fees properly, and scale your law firm's partner network without compliance headaches. A complete guide to ethical referral programs.",
    date: "January 12, 2026",
    readTime: "12 min read",
    category: "Law Firms",
    categoryColor: "bg-blue-100 text-blue-700",
    image: "/images/blog/law-firm-referrals.jpg",
  },
  {
    slug: "cpa-cross-referral-revenue-guide",
    title: "The CPA's Guide to Cross-Referral Revenue (Without Ethics Violations)",
    excerpt: "Learn how accounting firms can generate revenue through compliant cross-referrals with attorneys, financial advisors, and other CPAs while maintaining AICPA ethics standards.",
    date: "January 11, 2026",
    readTime: "10 min read",
    category: "Accounting",
    categoryColor: "bg-emerald-100 text-emerald-700",
    image: "/images/blog/cpa-referrals.jpg",
  },
  {
    slug: "consulting-firms-track-partner-referrals",
    title: "Why Consulting Firms Should Track Partner Referrals Like Sales Pipeline",
    excerpt: "Discover how to systematize your consulting firm's referral network using CRM-style tracking, partner scoring, and revenue attribution to predictably grow through partnerships.",
    date: "January 10, 2026",
    readTime: "8 min read",
    category: "Consulting",
    categoryColor: "bg-purple-100 text-purple-700",
    image: "/images/blog/consulting-referrals.jpg",
  },
  {
    slug: "law-firm-generates-2m-referrals",
    title: "Case Study: How a Mid-Size Law Firm Generates $2M/Year from Referrals",
    excerpt: "Real numbers, strategies, and systems from a 15-attorney personal injury firm that built a $2M referral channel through systematic partner network management.",
    date: "January 9, 2026",
    readTime: "15 min read",
    category: "Case Studies",
    categoryColor: "bg-amber-100 text-amber-700",
    image: "/images/blog/case-study-law.jpg",
  },
  {
    slug: "attorney-referral-fee-rules-state-guide",
    title: "Attorney Referral Fee Rules: State-by-State Compliance Guide 2026",
    excerpt: "Complete breakdown of referral fee regulations across all 50 states, including fee splitting percentages, disclosure requirements, and what you need to stay compliant.",
    date: "January 8, 2026",
    readTime: "20 min read",
    category: "Compliance",
    categoryColor: "bg-slate-100 text-slate-700",
    image: "/images/blog/state-compliance.jpg",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-6">
              Professional Services Referral Intelligence
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              Expert insights on building compliant, profitable referral networks for law firms, accounting practices, and consulting firms.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-slate-300 hover:-translate-y-1"
            >
              {/* Category Badge */}
              <div className="mb-4">
                <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${post.categoryColor}`}>
                  <Tag className="h-3 w-3" />
                  {post.category}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                {post.title}
              </h2>

              {/* Excerpt */}
              <p className="text-sm text-slate-600 mb-4 line-clamp-3">
                {post.excerpt}
              </p>

              {/* Meta */}
              <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{post.readTime}</span>
                </div>
              </div>

              {/* Read More Link */}
              <div className="flex items-center gap-2 text-sm font-semibold text-blue-600 group-hover:gap-3 transition-all">
                Read Article
                <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-black mb-4">
            Get Professional Services Growth Insights
          </h2>
          <p className="text-lg text-blue-100 mb-8">
            Weekly strategies, case studies, and compliance updates for law firms, CPAs, and consultants.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 rounded-full px-6 py-3 text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              className="rounded-full bg-white px-8 py-3 font-bold text-blue-600 hover:bg-blue-50 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
