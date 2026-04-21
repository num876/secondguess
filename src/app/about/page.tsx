"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Users, Rocket, Brain, Fingerprint, Globe, ShieldCheck } from "lucide-react";
import { GhostCursors } from "@/components/auth/GhostCursors";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-950 selection:bg-[#1D9E75]/30 overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-40 pb-24 overflow-hidden text-center mx-auto max-w-4xl px-6">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <GhostCursors />
        </div>
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="relative z-10"
        >
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
            Solving for Why.
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 font-light leading-relaxed">
            SecondGuess was founded on a simple realization: Most analytics tools tell you what happened, but leave you guessing as to why. We're here to bridge that gap with behavioral AI.
          </p>
        </motion.div>
      </section>

      {/* Values */}
      <section className="py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: Brain,
                title: "Behavioral First",
                desc: "We prioritize user intent over raw numbers. Every scroll, pause, and click tells a story we want to help you read."
              },
              {
                icon: ShieldCheck,
                title: "Privacy by Design",
                desc: "We built SecondGuess to be the most privacy-respecting session tool on the market. Data is yours, PII is masked."
              },
              {
                icon: Rocket,
                title: "Frictionless AI",
                desc: "AI shouldn't be a separate dashboard. It should live where your data does, automatically flagging conversion blockers."
              }
            ].map((value, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center group"
              >
                <div className="w-16 h-16 bg-slate-900 border border-slate-800 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl group-hover:border-[#1D9E75]/40 transition-colors">
                  <value.icon className="w-8 h-8 text-[#1D9E75]" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{value.title}</h3>
                <p className="text-slate-500 leading-relaxed font-light">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="py-32 bg-slate-900/30 border-y border-slate-900 overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
               <div className="absolute -inset-10 bg-[#1D9E75]/10 blur-[100px] rounded-full" />
               <motion.div 
                 initial={{ opacity: 0, scale: 0.95 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 className="relative p-1 bg-gradient-to-br from-[#1D9E75]/30 to-transparent rounded-[32px]"
               >
                 <div className="bg-slate-950 rounded-[28px] p-8 aspect-video flex flex-col justify-between">
                    <div className="flex gap-2">
                       <div className="w-3 h-3 rounded-full bg-slate-800" />
                       <div className="w-3 h-3 rounded-full bg-slate-800" />
                       <div className="w-3 h-3 rounded-full bg-slate-800" />
                    </div>
                    <div className="space-y-4">
                       <div className="h-2 w-3/4 bg-slate-800 rounded-full" />
                       <div className="h-2 w-1/2 bg-slate-800 rounded-full" />
                       <div className="h-2 w-5/6 bg-[#1D9E75]/20 rounded-full" />
                    </div>
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-full bg-[#1D9E75]/10 flex items-center justify-center">
                          <Users className="w-5 h-5 text-[#1D9E75]" />
                       </div>
                       <p className="text-[10px] font-mono text-slate-600 uppercase tracking-widest leading-none">Global Network of Intelligence</p>
                    </div>
                 </div>
               </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
               <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-8 leading-[1.1]">
                 The next generation of <br/><span className="text-[#1D9E75]">product empathy.</span>
               </h2>
               <div className="space-y-6 text-slate-400 font-light text-lg">
                 <p>
                   We believe that every product team deserves to truly understand their users. Not as numbers in a spreadsheet, but as people navigating a digital experience.
                 </p>
                 <p>
                   Our mission is to democratize high-fidelity behavioral data, making it accessible to startups and enterprises alike without the heavy technical lift or privacy concerns of legacy tools.
                 </p>
                 <div className="flex items-center gap-6 pt-6">
                    <div className="flex -space-x-3">
                       {[1,2,3,4].map(i => (
                         <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-950 bg-slate-800" />
                       ))}
                    </div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Built by veterans from Stripe, Vercel & Meta</p>
                 </div>
               </div>
            </motion.div>
        </div>
      </section>

      {/* Global Impact */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {[
              { label: "Founded", value: "2024" },
              { label: "Global Users", value: "12k+" },
              { label: "Sessions Replayed", value: "85M" },
              { label: "Countries", value: "48+" }
            ].map((stat, i) => (
              <div key={i} className="text-center border-l border-slate-900 first:border-0 pl-12 first:pl-0">
                <p className="text-4xl font-black text-white mb-2">{stat.value}</p>
                <p className="text-xs font-bold text-[#1D9E75] uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
