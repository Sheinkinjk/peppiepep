import { TrendingUp, Users, DollarSign, Star } from "lucide-react";

export function ReferredSocialProof() {
  const stats = [
    {
      icon: Users,
      value: "Growing",
      label: "Partner Network",
      color: "text-teal-600",
      bgColor: "bg-teal-50",
    },
    {
      icon: DollarSign,
      value: "25%",
      label: "Recurring Revenue",
      color: "text-cyan-600",
      bgColor: "bg-cyan-50",
    },
    {
      icon: TrendingUp,
      value: "30 Days",
      label: "Attribution Window",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      icon: Star,
      value: "AU Based",
      label: "Local Support",
      color: "text-amber-600",
      bgColor: "bg-amber-50",
    },
  ];

  const testimonials = [
    {
      quote: "The attribution system gives us complete confidence that every referral is tracked. No missed commissions.",
      author: "Partner Ambassador",
      role: "Business Development",
      highlight: "Full Attribution",
    },
    {
      quote: "Easy to set up and the 30-day cookie window means we have time to nurture leads properly.",
      author: "Partner Ambassador",
      role: "Marketing Consultant",
      highlight: "Simple Setup",
    },
    {
      quote: "Great platform for building sustainable referral revenue. The 25% recurring commission is fantastic.",
      author: "Partner Ambassador",
      role: "Agency Owner",
      highlight: "Recurring Revenue",
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
            Trusted by Business Partners
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            See what our ambassador partners say about the program
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
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                <div>
                  <div className="font-bold text-slate-900">{testimonial.author}</div>
                  <div className="text-sm text-slate-600">{testimonial.role}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-500 uppercase tracking-wide">Key Benefit</div>
                  <div className="font-bold text-teal-600">{testimonial.highlight}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
