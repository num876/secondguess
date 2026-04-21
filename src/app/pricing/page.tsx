"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Check, HelpCircle, ArrowRight, Zap, Shield, Sparkles } from "lucide-react";
import Link from "next/link";
import { GhostCursors } from "@/components/auth/GhostCursors";

const PLANS = [
  {
    name: "Free",
    price: "0",
    description: "Perfect for testing the waters and personal projects.",
    features: [
      "500 monthly sessions",
      "14-day data retention",
      "Standard heatmaps",
      "Basic session replay",
      "Community support"
    ],
    cta: "Start for Free",
    popular: false,
    color: "#94A3B8"
  },
  {
    name: "Pro",
    price: "39",
    description: "Everything you need to optimize high-traffic products.",
    features: [
      "10,000 monthly sessions",
      "90-day data retention",
      "Advanced AI Insights",
      "Custom conversion funnels",
      "Priority email support",
      "Unlimited sites",
      "Rage click detection"
    ],
    cta: "Start Pro Trial",
    popular: true,
    color: "#1D9E75"
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Custom solutions for large scale organizations.",
    features: [
      "Unlimited sessions",
      "Any data retention period",
      "Single Sign-On (SSO)",
      "Dedicated account manager",
      "Custom legal terms",
      "On-premise deployment options"
    ],
    cta: "Contact Sales",
    popular: false,
    color: "#6366F1"
  }
];

const FAQS = [
  {
    q: "How are sessions counted?",
    a: "A session starts when a user visits your site and ends after 30 minutes of inactivity. We don't charge for bot traffic or duplicate views within the same session."
  },
  {
    q: "Can I upgrade or downgrade anytime?",
    a: "Yes, you can change your plan at any time. If you upgrade, the new features will be unlocked immediately and we'll prorate the difference."
  },
  {
    q: "Is SecondGuess GDPR compliant?",
    a: "Yes. We anonymize all PII (Personally Identifiable Information) by default and offer data residency options for enterprise customers."
  },
  {
    q: "What count as 'Credits'?",
    a: "Credits are used for AI-powered insights. The Pro plan includes generous credit limits that reset every month."
  }
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-slate-950 selection:bg-[#1D9E75]/30 overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <GhostCursors />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1D9E75]/10 border border-[#1D9E75]/20 text-[#1D9E75] text-sm font-bold mb-8"
            >
              <Sparkles className="w-4 h-4" />
              <span>Simple, transparent pricing</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6"
            >
              Scale your intelligence.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-slate-400 font-light max-w-2xl mx-auto"
            >
              Choose the plan that fits your growth. No hidden fees, just pure behavioral data.
            </motion.p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 relative px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PLANS.map((plan, idx) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
                className={`relative p-8 rounded-3xl border transition-all duration-500 group ${
                  plan.popular 
                  ? "bg-gradient-to-br from-slate-900 to-slate-950 border-[#1D9E75]/50 shadow-2xl shadow-[#1D9E75]/10 scale-105" 
                  : "bg-slate-900/30 border-slate-800 hover:border-slate-700"
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-[#1D9E75] text-white text-[10px] font-bold px-4 py-1.5 rounded-bl-2xl rounded-tr-3xl uppercase tracking-widest">
                    Best Value
                  </div>
                )}
                
                <h2 className="text-2xl font-bold text-white mb-2">{plan.name}</h2>
                <p className="text-slate-500 text-sm mb-6 min-h-[40px]">{plan.description}</p>
                
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-5xl font-black text-white">{plan.price === "Custom" ? "" : "£"}{plan.price}</span>
                  {plan.price !== "Custom" && <span className="text-slate-500 font-medium">/mo</span>}
                </div>

                <Link
                  href={plan.price === "Custom" ? "/contact" : "/login"}
                  className={`w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold transition-all ${
                    plan.popular
                    ? "bg-[#1D9E75] text-white hover:bg-[#168562] shadow-xl shadow-[#1D9E75]/20"
                    : "bg-white/5 text-white hover:bg-white/10 border border-white/10"
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <div className="mt-10 pt-10 border-t border-slate-800/50">
                   <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">What's included:</p>
                   <ul className="space-y-4">
                     {plan.features.map((feature) => (
                       <li key={feature} className="flex items-start gap-3 text-sm text-slate-400 group/item">
                         <div className="mt-0.5 w-5 h-5 rounded-full bg-slate-800/50 flex items-center justify-center flex-shrink-0 group-hover/item:bg-[#1D9E75]/20 transition-colors">
                           <Check className="w-3 h-3 text-[#1D9E75]" />
                         </div>
                         <span>{feature}</span>
                       </li>
                     ))}
                   </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Strip */}
      <section className="py-24 bg-slate-950 border-y border-slate-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
           <Zap className="w-12 h-12 text-[#1D9E75] mx-auto mb-6" />
           <h2 className="text-3xl font-bold text-white mb-4">Unmatched analysis depth.</h2>
           <p className="text-slate-500 max-w-xl mx-auto mb-12">
             All plans include our core pixel-tracking engine and cross-browser compatibility. Upgrade for advanced AI and longer retention.
           </p>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Shield, label: "Encrypted Data" },
                { icon: Zap, label: "Instant Replay" },
                { icon: HelpCircle, label: "24/7 Support" },
                { icon: Sparkles, label: "AI Prediction" }
              ].map((item, i) => (
                <div key={i} className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 flex flex-col items-center gap-3">
                   <item.icon className="w-6 h-6 text-[#1D9E75]" />
                   <span className="text-xs font-bold text-slate-300 uppercase tracking-tighter">{item.label}</span>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-32 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-black text-white tracking-tighter mb-16 text-center">Frequently Asked Questions</h2>
          <div className="space-y-8">
            {FAQS.map((faq, i) => (
              <div key={i} className="p-8 rounded-3xl bg-slate-900/30 border border-slate-800/50">
                <h3 className="text-lg font-bold text-white mb-3">{faq.q}</h3>
                <p className="text-slate-400 font-light leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-32 px-6">
        <div className="max-w-5xl mx-auto p-12 md:p-20 rounded-[40px] bg-gradient-to-br from-[#1D9E75] to-[#168562] text-center relative overflow-hidden group shadow-2xl shadow-[#1D9E75]/20">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-8 group-hover:scale-[1.02] transition-transform duration-500">
              Stop guessing. Start knowing.
            </h2>
            <Link 
              href="/login"
              className="inline-flex items-center gap-3 bg-white text-[#1D9E75] px-10 py-5 rounded-2xl text-xl font-bold hover:shadow-2xl transition-all hover:-translate-y-1 active:translate-y-0"
            >
              Get Started for Free
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
