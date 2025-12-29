import { TrendingUp, Users, DollarSign, Star } from "lucide-react";

export function ReferredSocialProof() {
  const stats = [
    {
      icon: Users,
      value: "500+",
      label: "Active Businesses",
      color: "text-teal-600",
      bgColor: "bg-teal-50",
    },
    {
      icon: DollarSign,
      value: "$2M+",
      label: "Revenue Generated",
      color: "text-cyan-600",
      bgColor: "bg-cyan-50",
    },
    {
      icon: TrendingUp,
      value: "3.2x",
      label: "Average ROI",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      icon: Star,
      value: "4.9/5",
      label: "Customer Rating",
      color: "text-amber-600",
      bgColor: "bg-amber-50",
    },
  ];

  const testimonials = [
    {
      quote: "Refer Labs transformed our customer acquisition. We're now generating 40% of new customers through referrals.",
      author: "Sarah Chen",
      role: "CEO, FitnessPro",
      revenue: "$120k",
    },
    {
      quote: "The ROI is incredible. We invested $5k and generated over $150k in referred revenue in the first 6 months.",
      author: "Michael Torres",
      role: "Founder, TechStart",
      revenue: "$150k",
    },
    {
      quote: "Our customer acquisition cost dropped by 60% after implementing Refer Labs. Best decision we ever made.",
      author: "Emma Wilson",
      role: "CMO, BeautyBox",
      revenue: "$95k",
    },
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-200 hover:border-teal-200 transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${stat.bgColor} mb-4`}>
                <stat.icon className={`h-7 w-7 ${stat.color}`} />
              </div>
              <div className={`text-4xl font-black ${stat.color} mb-2`}>
                {stat.value}
              </div>
              <div className="text-slate-600 font-semibold">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
            Real Results from Real Businesses
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            See how businesses like yours are unlocking revenue with Refer Labs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.author}
              className="bg-gradient-to-br from-slate-50 to-white p-8 rounded-2xl border border-slate-200 hover:border-teal-200 transition-all duration-300 hover:shadow-xl"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-slate-700 mb-6 leading-relaxed">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                <div>
                  <div className="font-bold text-slate-900">{testimonial.author}</div>
                  <div className="text-sm text-slate-600">{testimonial.role}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-slate-500">Generated</div>
                  <div className="font-black text-teal-600">{testimonial.revenue}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
