import {
  Zap,
  Target,
  BarChart3,
  Rocket,
  Shield,
  RefreshCw,
  Code,
  HeartHandshake,
} from "lucide-react";

export function ReferredFeatures() {
  const features = [
    {
      icon: Zap,
      title: "Quick Integration",
      description: "Get your referral program live in 24 hours with our done-for-you setup.",
      gradient: "from-amber-500 to-orange-500",
    },
    {
      icon: Target,
      title: "Smart Tracking",
      description: "Track every referral, conversion, and commission with real-time analytics.",
      gradient: "from-teal-500 to-cyan-500",
    },
    {
      icon: BarChart3,
      title: "Revenue Dashboard",
      description: "See your referral revenue, top ambassadors, and ROI at a glance.",
      gradient: "from-blue-500 to-indigo-500",
    },
    {
      icon: Rocket,
      title: "Ambassador Portal",
      description: "Give your ambassadors a beautiful portal to track their earnings and referrals.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Shield,
      title: "Fraud Prevention",
      description: "Built-in fraud detection and manual approval workflows keep your program safe.",
      gradient: "from-red-500 to-rose-500",
    },
    {
      icon: RefreshCw,
      title: "Automated Payouts",
      description: "Set it and forget it. Commissions are calculated and paid automatically.",
      gradient: "from-emerald-500 to-green-500",
    },
    {
      icon: Code,
      title: "API & Webhooks",
      description: "Integrate with your existing tools via our powerful API and webhooks.",
      gradient: "from-slate-700 to-slate-900",
    },
    {
      icon: HeartHandshake,
      title: "Dedicated Support",
      description: "Get a dedicated success manager to help you scale your program.",
      gradient: "from-pink-500 to-rose-500",
    },
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
            Everything You Need to Scale Referrals
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            A complete referral platform that integrates seamlessly with your sales and marketing stack
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative bg-white p-6 rounded-2xl border border-slate-200 hover:border-transparent hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-white rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} mb-4 shadow-lg`}
                >
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* How It Works Section */}
        <div className="mt-20 bg-gradient-to-br from-slate-900 to-teal-900 rounded-3xl p-12 text-white">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-black mb-4">
              How It Works
            </h3>
            <p className="text-slate-300 text-lg">
              Four simple steps to unlock unlimited referral revenue
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Apply or Book Call",
                description: "Tell us about your business and growth goals",
              },
              {
                step: "2",
                title: "Strategy Session",
                description: "We design a custom referral program for you",
              },
              {
                step: "3",
                title: "Launch Program",
                description: "We set everything up and recruit ambassadors",
              },
              {
                step: "4",
                title: "Scale Revenue",
                description: "Watch referral revenue grow on autopilot",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-teal-400 to-cyan-400 text-slate-900 text-2xl font-black mb-4 shadow-lg">
                  {item.step}
                </div>
                <h4 className="text-lg font-bold mb-2">{item.title}</h4>
                <p className="text-slate-400 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
