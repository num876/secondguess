"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
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
    <section className="relative min-h-screen flex items-center justify-center pt-20 sm:pt-24 pb-8 overflow-hidden bg-[#020617]">
      {/* Background Layer */}
      <InteractiveMesh />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020617]/50 to-[#020617] pointer-events-none" />

      {/* Content Layer */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        
        <div className="text-left">
          <div className="animate-fade-up inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 text-emerald-400 text-xs font-black uppercase tracking-wider mb-6 sm:mb-10 shadow-2xl shadow-emerald-500/5">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Free forensic audit available</span>
          </div>

          <h1 className="animate-fade-up [animation-delay:200ms] text-[clamp(2.5rem,8vw,4.5rem)] font-black text-white leading-tight mb-8">
            Uncover the <br/>
            <span className="text-emerald-500">Hidden WHY.</span>
          </h1>

          <p className="animate-fade-up [animation-delay:400ms] text-base sm:text-lg md:text-xl text-slate-400 max-w-xl leading-relaxed font-medium mb-8 sm:mb-12">
            Forensiq replays every session, flags the exact moment users get stuck, and tells you what to fix — in 30 seconds.
          </p>

          <div className="animate-fade-up [animation-delay:600ms] flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-4 sm:gap-8">
            <Link
              href="/login"
              className="group relative bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-8 sm:px-10 py-4 sm:py-5 rounded-full text-sm sm:text-xs font-black uppercase tracking-widest shadow-2xl shadow-emerald-500/20 transition-all hover:scale-[1.05] active:scale-[0.95] touch-target w-full sm:w-auto text-center"
            >
              Start Free Forensic Audit
            </Link>
            <Link
              href="#workflow"
              className="flex items-center gap-3 sm:gap-4 text-white font-black uppercase tracking-wider text-sm hover:text-emerald-400 transition-colors group pt-2"
            >
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-emerald-500/30 group-hover:bg-emerald-500/5 transition-all touch-target">
                <Play className="w-4 h-4 fill-white group-hover:fill-emerald-400 group-hover:text-emerald-400" />
              </div>
              <span>SEE HOW IT WORKS ↓</span>
            </Link>
          </div>
        </div>

        {/* Dynamic Visualization Side */}
        <div className="relative hidden lg:block">
          {/* Live Signal Feed */}
          <div className="absolute -top-12 -left-12 z-20 w-72 glass-card-dark rounded-3xl p-6 border border-white/10 shadow-2xl">
             <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-black text-slate-500 uppercase tracking-wider">Signal Feed</span>
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
             </div>
             <div className="space-y-3">
                {signals.map((s, i) => (
                  <div 
                    key={s + i}
                    className="animate-signal text-xs font-mono text-emerald-400/80 leading-tight"
                  >
                    {s}
                  </div>
                ))}
             </div>
          </div>

          <div className="animate-fade-up [animation-delay:800ms] relative bg-slate-950 rounded-[2.5rem] border border-emerald-500/15 p-4 shadow-[0_40px_100px_-15px_rgba(0,0,0,0.8),0_0_40px_rgba(16,185,129,0.05)] ring-1 ring-white/10 overflow-hidden group">
            <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-4 px-2">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
              </div>
              <div className="mx-auto bg-white/5 px-4 py-1.5 rounded-full text-xs text-slate-500 font-black tracking-wider uppercase">
                forensiq.studio/live/v_8291
              </div>
            </div>
            
            <div className="aspect-video bg-black rounded-[2rem] flex items-center justify-center relative border border-white/5 overflow-hidden">
               {/* Grid background inside mock */}
               <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[length:30px_30px] opacity-[0.03]" />
               
               <div className="flex flex-col items-center gap-4 relative z-10">
                 <div className="relative w-12 h-12 flex items-center justify-center">
                    <div className="absolute inset-0 bg-emerald-500 blur-xl opacity-20" />
                    <svg viewBox="0 0 24 24" className="w-full h-full relative" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 3L2 21H22L12 3Z" className="stroke-emerald-400 stroke-[1.5]" />
                      <path d="M12 3V21" className="stroke-emerald-400/30 stroke-[1]" />
                      <path d="M7 12L17 12" className="stroke-emerald-400/30 stroke-[1]" />
                      <path d="M12 3L17 21" className="stroke-emerald-400/50 stroke-[1]" />
                      <path d="M12 3L7 21" className="stroke-emerald-400/50 stroke-[1]" />
                    </svg>
                 </div>
                 <p className="text-slate-700 font-black uppercase tracking-wider text-xs">Awaiting Signal...</p>
               </div>
               
               {/* Upgraded simulated ghost cursor */}
               <div className="animate-ghost-float absolute top-1/2 left-1/2 group">
                 <div className="relative">
                    <div className="absolute inset-0 bg-emerald-500 blur-xl opacity-30 rounded-full scale-150 animate-pulse" />
                    <ArrowRight className="w-6 h-6 text-white rotate-[135deg] drop-shadow-2xl relative z-10" />
                    <div className="absolute left-6 top-0 bg-emerald-500 text-xs font-black px-3 py-1 rounded-full whitespace-nowrap shadow-xl shadow-emerald-500/20 border border-white/20">
                      Visitor #2901
                    </div>
                 </div>
               </div>

               {/* Simulated Friction Glow */}
               <div className="animate-glow-pulse absolute top-1/3 right-1/4 w-32 h-32 bg-red-500 blur-[60px] rounded-full pointer-events-none" />
            </div>
          </div>

          {/* Floating Metric Card */}
          <div className="animate-fade-up [animation-delay:1000ms] absolute -bottom-10 -right-10 z-20 glass-card-dark rounded-3xl p-6 border border-white/10 shadow-2xl">
             <p className="text-xs font-black text-slate-500 uppercase tracking-wider mb-2">Health Score</p>
             <div className="flex items-center gap-4">
                <span className="text-3xl font-black text-emerald-400">98%</span>
                <div className="w-24 h-1.5 bg-white/5 rounded-full overflow-hidden">
                   <div className="h-full bg-emerald-500 w-[98%]" />
                </div>
             </div>
          </div>
        </div>

      </div>
    </section>
  );
};
