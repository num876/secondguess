"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play, Layout } from "lucide-react";
import { GhostCursors } from "@/components/auth/GhostCursors";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-slate-950">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <GhostCursors />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/80 to-slate-950" />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1D9E75]/10 border border-[#1D9E75]/20 text-[#1D9E75] text-sm font-bold mb-8 shadow-2xl shadow-[#1D9E75]/10"
        >
          <div className="w-2 h-2 rounded-full bg-[#1D9E75] animate-pulse" />
          <span>v2.0 is now live: AI-Powered Rage Click Detection</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl md:text-8xl font-black text-white leading-[1.05] tracking-tighter mb-8"
        >
          See what they see.<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1D9E75] to-[#34D399] drop-shadow-[0_0_15px_rgba(29,158,117,0.3)]">
            Know what they want.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-light mb-12"
        >
          Stop guessing why your customers leave. SecondGuess uses behavioral AI to replay sessions and flag conversion friction before it costs you money.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-6"
        >
          <Link
            href="/login"
            className="group relative bg-[#1D9E75] hover:bg-[#168562] text-white px-8 py-5 rounded-2xl text-lg font-bold shadow-2xl shadow-[#1D9E75]/30 transition-all hover:scale-[1.02] active:scale-[0.98] overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <span className="flex items-center gap-2 relative z-10">
              Start Tracking Free <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
          <Link
            href="/contact?ref=demo"
            className="flex items-center gap-3 text-white font-bold hover:text-slate-300 transition-colors px-6 py-5 group"
          >
            <div className="w-12 h-12 rounded-full border border-slate-700 flex items-center justify-center group-hover:border-[#1D9E75] group-hover:bg-[#1D9E75]/10 transition-all">
              <Play className="w-5 h-5 fill-white group-hover:fill-[#1D9E75] group-hover:text-[#1D9E75]" />
            </div>
            See it in action
          </Link>
        </motion.div>

        {/* Floating Mini Dash Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-20 relative px-4"
        >
          <div className="absolute inset-x-0 -top-10 bottom-0 bg-[#1D9E75]/5 blur-[120px] rounded-full" />
          <div className="relative bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-4 shadow-2xl max-w-4xl mx-auto ring-1 ring-white/10 group overflow-hidden">
            <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-4">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/30" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/30" />
                <div className="w-3 h-3 rounded-full bg-green-500/30" />
              </div>
              <div className="mx-auto bg-slate-800/50 px-3 py-1 rounded-lg text-[10px] text-slate-500 font-mono">
                app.secondguess.io/live-session/v_8291
              </div>
            </div>
            
            <div className="aspect-video bg-slate-950 rounded-xl flex items-center justify-center relative group-hover:ring-1 ring-[#1D9E75]/30 transition-all">
               <div className="flex flex-col items-center gap-3">
                 <Layout className="w-12 h-12 text-[#1D9E75] opacity-50" />
                 <p className="text-slate-600 font-mono text-xs">Awaiting live activity...</p>
               </div>
               
               {/* Simulated cursor */}
               <motion.div
                 animate={{ 
                   x: [0, 100, -50, 200, 0],
                   y: [0, -50, 100, 50, 0]
                 }}
                 transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                 className="absolute top-1/2 left-1/2"
               >
                 <ArrowRight className="w-5 h-5 text-white rotate-[135deg] drop-shadow-lg" />
                 <div className="bg-[#1D9E75] text-[10px] font-bold px-2 py-0.5 rounded ml-4">Visitor #2901</div>
               </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
