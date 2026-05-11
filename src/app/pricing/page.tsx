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
    name: "Starter",
    price: "0",
    description: "Perfect for testing the waters and personal projects.",
    features: [
      "Replay 1 session per day",
      "See where visitors get stuck",
      "7 days of history",
      "Standard heatmaps",
      "Community support"
    ],
    cta: "Start Free Audit",
    popular: false,
    color: "#94A3B8"
  },
  {
    name: "Pro",
    price: "39",
    description: "Everything you need to optimize high-traffic products.",
    features: [
      "10,000 sessions recorded",
      "90 days of history",
      "Click & scroll heatmaps",
      "AI tells you what to fix",
      "Slack & webhook alerts",
      "Conversion drop-off reports",
      "Priority email support"
    ],
    cta: "Get Started Free",
    popular: true,
    color: "#10B981"
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Custom solutions for large scale organizations.",
    features: [
      "Unlimited sessions",
      "Unlimited history",
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
    a: "A session starts when a user visits your site and ends after 30 minutes of inactivity. We don't charge for bot traffic or duplicate views."
  },
  {
    q: "Can I upgrade or downgrade anytime?",
    a: "Yes. You can change your plan at any time. If you upgrade, the new features are unlocked immediately."
  },
  {
    q: "Is Forensiq GDPR compliant?",
    a: "Absolutely. We mask all PII (Personally Identifiable Information) by default and mask all sensitive inputs automatically."
  },
  {
    q: "Do I need a credit card to start?",
    a: "No. You can start with our Starter plan or a 14-day Pro trial without entering any billing details."
  }
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-slate-950 selection:bg-emerald-500/30 overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <GhostCursors />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-bold mb-8"
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
      <section className="py-16 relative px-6">
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
                  ? "bg-slate-900 border-emerald-500/50 shadow-2xl shadow-emerald-500/10 scale-105" 
                  : "bg-slate-900 border-slate-800 hover:border-slate-700"
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-emerald-500 text-slate-950 text-[10px] font-bold px-4 py-1.5 rounded-bl-2xl rounded-tr-3xl uppercase tracking-widest">
                    Best Value
                  </div>
                )}
                
                <h2 className="text-2xl font-black text-white mb-2 uppercase tracking-tight">{plan.name}</h2>
                <p className="text-slate-300 text-sm mb-6 min-h-[40px] font-medium leading-relaxed">{plan.description}</p>
                
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-5xl font-black text-white">{plan.price === "Custom" ? "" : "£"}{plan.price}</span>
                  {plan.price !== "Custom" && <span className="text-slate-300 font-bold">/mo</span>}
                </div>

                <Link
                  href={
                    plan.name === "Enterprise" 
                      ? "/contact?subject=Enterprise+%2F+Sales"
                      : `/login?plan=${plan.name.toLowerCase()}`
                  }
                  className={`w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-black uppercase tracking-wider transition-all ${
                    plan.popular
                    ? "bg-emerald-500 text-slate-950 hover:bg-emerald-400 shadow-xl shadow-emerald-500/20"
                    : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500 hover:text-slate-950"
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <div className="mt-10 pt-10 border-t border-slate-800/50">
                   <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">What's included:</p>
                    <ul className="space-y-4">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3 text-sm text-slate-300 font-medium group/item">
                          <div className="mt-0.5 w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0 group-hover/item:bg-emerald-500/20 transition-colors">
                            <Check className="w-3 h-3 text-emerald-400" />
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
      <section className="py-16 bg-slate-950 border-y border-slate-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
           <Zap className="w-12 h-12 text-emerald-500 mx-auto mb-6" />
           <h2 className="text-3xl font-black text-white uppercase tracking-tight mb-4">Unmatched analysis depth.</h2>
           <p className="text-slate-300 max-w-xl mx-auto mb-12">
             All plans include our core pixel-tracking engine and cross-browser compatibility. Upgrade for advanced AI and longer retention.
           </p>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Shield, label: "Encrypted Data" },
                { icon: Zap, label: "Instant Replay" },
                { icon: HelpCircle, label: "24/7 Support" },
                { icon: Sparkles, label: "AI Prediction" }
              ].map((item, i) => (
                 <div key={i} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col items-center gap-3">
                    <item.icon className="w-6 h-6 text-emerald-500" />
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-tighter">{item.label}</span>
                 </div>
              ))}
           </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-black text-white tracking-tighter mb-16 text-center">Frequently Asked Questions</h2>
          <div className="space-y-8">
            {FAQS.map((faq, i) => (
              <div key={i} className="p-8 rounded-3xl bg-slate-900 border border-white/5">
                <h3 className="text-lg font-bold text-white mb-3">{faq.q}</h3>
                <p className="text-slate-300 font-medium leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
       <section className="pb-16 px-6">
        <div className="max-w-5xl mx-auto p-12 md:p-20 rounded-[40px] bg-gradient-to-br from-emerald-500 to-emerald-700 text-center relative overflow-hidden group shadow-2xl shadow-emerald-500/20">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-8 group-hover:scale-[1.02] transition-transform duration-500">
              Uncover the WHY.
            </h2>
            <Link 
              href="/login"
              className="inline-flex items-center gap-3 bg-white text-emerald-600 px-10 py-5 rounded-2xl text-xl font-bold hover:shadow-2xl transition-all hover:-translate-y-1 active:translate-y-0"
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
