"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play, Layout } from "lucide-react";
import { InteractiveMesh } from "./InteractiveMesh";

export const Hero = () => {
  const [signals, setSignals] = React.useState<string[]>(["[02:14:01] CRITICAL: Rage Click detected", "[02:14:05] ALERT: Exit Intent captured"]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      const mockSignals = [
        `[${new Date().toLocaleTimeString()}] SIGNAL: 74% Scroll Depth achieved`,
        `[${new Date().toLocaleTimeString()}] ALERT: Friction detected on Login`,
        `[${new Date().toLocaleTimeString()}] EVENT: User #4291 converted`,
        `[${new Date().toLocaleTimeString()}] CRITICAL: Rage Click (Pricing Page)`
      ];
      setSignals(prev => [mockSignals[Math.floor(Math.random() * mockSignals.length)], ...prev].slice(0, 3));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden bg-[#020617]">
      {/* Background Layer */}
      <InteractiveMesh />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020617]/50 to-[#020617] pointer-events-none" />

      {/* Content Layer */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        <div className="text-left">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 px-5 py-2 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em] mb-10 shadow-2xl shadow-emerald-500/5"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>v2.0 Neural Engine Live</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-8xl font-black text-white leading-[0.95] tracking-tighter mb-8"
          >
            Uncover the <br/>
            <span className="text-emerald-400">Hidden WHY.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-lg md:text-xl text-slate-400 max-w-xl leading-relaxed font-medium mb-12"
          >
            Stop guessing why your customers leave. <span className="text-white font-bold">Forensiq</span> uses behavioral AI to replay sessions and flag conversion friction before it costs you revenue.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap items-center gap-8"
          >
            <Link
              href="/login"
              className="group relative bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-10 py-5 rounded-full text-xs font-black uppercase tracking-widest shadow-2xl shadow-emerald-500/20 transition-all hover:scale-[1.05] active:scale-[0.95]"
            >
              Start Free Forensic Audit
            </Link>
            <Link
              href="/contact?ref=demo"
              className="flex items-center gap-4 text-white font-black uppercase tracking-widest text-[10px] hover:text-emerald-400 transition-colors group"
            >
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-emerald-500/30 group-hover:bg-emerald-500/5 transition-all">
                <Play className="w-4 h-4 fill-white group-hover:fill-emerald-400 group-hover:text-emerald-400" />
              </div>
              View Studio Demo
            </Link>
          </motion.div>
        </div>

        {/* Dynamic Visualization Side */}
        <div className="relative">
          {/* Live Signal Feed */}
          <div className="absolute -top-12 -left-12 z-20 w-72 glass-card-dark rounded-3xl p-6 border border-white/10 shadow-2xl hidden md:block">
             <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Signal Feed</span>
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
             </div>
             <div className="space-y-3">
                {signals.map((s, i) => (
                  <motion.div 
                    key={s + i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-[9px] font-mono text-emerald-400/80 leading-tight"
                  >
                    {s}
                  </motion.div>
                ))}
             </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-slate-950 rounded-[2.5rem] border border-white/5 p-4 shadow-[0_40px_100px_-15px_rgba(0,0,0,0.8)] ring-1 ring-white/10 overflow-hidden group"
          >
            <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-4 px-2">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
              </div>
              <div className="mx-auto bg-white/5 px-4 py-1.5 rounded-full text-[9px] text-slate-500 font-black tracking-widest uppercase">
                forensiq.studio/live/v_8291
              </div>
            </div>
            
            <div className="aspect-video bg-black rounded-[2rem] flex items-center justify-center relative border border-white/5 overflow-hidden">
               {/* Grid background inside mock */}
               <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[length:30px_30px] opacity-[0.03]" />
               
               <div className="flex flex-col items-center gap-4 relative z-10">
                 <Layout className="w-12 h-12 text-emerald-500 opacity-20" />
                 <p className="text-slate-700 font-black uppercase tracking-[0.3em] text-[10px]">Awaiting Signal...</p>
               </div>
               
               {/* Upgraded simulated ghost cursor */}
               <motion.div
                 animate={{ 
                   x: [0, 150, -100, 250, 0],
                   y: [0, -80, 120, 40, 0]
                 }}
                 transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                 className="absolute top-1/2 left-1/2 group"
               >
                 <div className="relative">
                    <div className="absolute inset-0 bg-emerald-500 blur-xl opacity-30 rounded-full scale-150 animate-pulse" />
                    <ArrowRight className="w-6 h-6 text-white rotate-[135deg] drop-shadow-2xl relative z-10" />
                    <div className="absolute left-6 top-0 bg-emerald-500 text-[10px] font-black px-3 py-1 rounded-full whitespace-nowrap shadow-xl shadow-emerald-500/20 border border-white/20">
                      Visitor #2901
                    </div>
                 </div>
               </motion.div>

               {/* Simulated Friction Glow */}
               <motion.div
                 animate={{ opacity: [0, 0.4, 0], scale: [0.8, 1.2, 0.8] }}
                 transition={{ duration: 3, repeat: Infinity, delay: 5 }}
                 className="absolute top-1/3 right-1/4 w-32 h-32 bg-red-500 blur-[60px] rounded-full pointer-events-none"
               />
            </div>
          </motion.div>

          {/* Floating Metric Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute -bottom-10 -right-10 z-20 glass-card-dark rounded-3xl p-6 border border-white/10 shadow-2xl"
          >
             <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Health Score</p>
             <div className="flex items-center gap-4">
                <span className="text-3xl font-black text-emerald-400">98%</span>
                <div className="w-24 h-1.5 bg-white/5 rounded-full overflow-hidden">
                   <div className="h-full bg-emerald-500 w-[98%]" />
                </div>
             </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
