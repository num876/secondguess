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
    <section id="features" className="py-32 bg-[#020617] relative overflow-hidden dark-mesh">
      <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-[#020617] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-5 py-2 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6"
          >
            Capabilities
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6 leading-[0.95]"
          >
            Forensic Depth. <br/><span className="text-emerald-400">Total Clarity.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-400 font-medium max-w-2xl mx-auto"
          >
            Most tools tell you <span className="text-white italic">*what*</span> happened. <span className="text-white font-bold">Forensiq</span> tells you <span className="text-emerald-400 italic">*why*</span>.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {FEATURES.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ 
                y: -10,
                rotateX: 5,
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
              className="group glass-card-dark rounded-[2.5rem] p-10 border border-white/5 transition-all hover:border-emerald-500/30 relative overflow-hidden perspective-1000"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div 
                className="relative w-14 h-14 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-2xl"
                style={{ backgroundColor: `${feature.color}15`, color: feature.color }}
              >
                <feature.icon className="w-7 h-7" />
                <div className="absolute inset-0 bg-current blur-2xl opacity-20" />
              </div>
              
              <h3 className="text-2xl font-black text-white mb-4 tracking-tight uppercase text-xs">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed font-medium text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
