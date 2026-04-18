"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, Target, MousePointer2, LogOut, Eye, Search } from "lucide-react";

const FEATURES = [
  {
    icon: Zap,
    title: "Rage Click Detection",
    description: "Instantly flag when users are clicking repeatedly on non-functional elements or broken links.",
    color: "#EF4444"
  },
  {
    icon: Target,
    title: "Conversion Mapping",
    description: "Visualize the exact paths high-value users take before reaching your goal events.",
    color: "#1D9E75"
  },
  {
    icon: Eye,
    title: "Real-Time Replays",
    description: "Watch pixel-perfect replays of any session within minutes of it happening.",
    color: "#6366F1"
  },
  {
    icon: LogOut,
    title: "Exit Intent AI",
    description: "Understand the behavioral patterns that predict when a user is about to leave your funnel.",
    color: "#F59E0B"
  },
  {
    icon: MousePointer2,
    title: "Friction Scoring",
    description: "Automated scoring of every session based on scrolls, pauses, and navigational confusion.",
    color: "#10B981"
  },
  {
    icon: Search,
    title: "Semantic Filtering",
    description: "Search for specific behaviors like 'Added to cart but didn't pay' with our natural language engine.",
    color: "#06B6D4"
  }
];

export const Features = () => {
  return (
    <section id="features" className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4"
          >
            Built for conversion-obsessed teams.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-400 font-light max-w-2xl mx-auto"
          >
            Most tools tell you *what* happened. SecondGuess tells you *why*.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group p-8 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-[#1D9E75]/50 transition-all hover:bg-slate-900 hover:shadow-2xl hover:shadow-[#1D9E75]/5"
            >
              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                style={{ backgroundColor: `${feature.color}15`, color: feature.color }}
              >
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed font-light">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
