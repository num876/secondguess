"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 selection:bg-[#1D9E75]/30">
      <Navbar />
      <Hero />
      
      {/* Infinite Logo Marquee */}
      <section className="py-24 bg-[#020617] border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-emerald-500/5 blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <p className="text-center text-slate-500 text-[10px] font-black uppercase tracking-[0.3em]">
            Trusted by Forensic Performance Teams
          </p>
        </div>
        
        <div className="flex overflow-hidden group">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex flex-nowrap gap-24 whitespace-nowrap"
          >
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-24 items-center">
                {["FLOWSTATE", "LUMINA", "CONTEXTLY", "PRISM", "NEURAL", "QUANTUM"].map((logo) => (
                  <div key={logo} className="text-2xl font-black text-white/20 tracking-tighter hover:text-emerald-500 transition-colors cursor-default">
                    {logo}
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* The Forensic Process */}
      <section className="py-32 bg-[#020617] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-24"
          >
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6">The Forensic <span className="text-emerald-400">Workflow.</span></h2>
            <p className="text-slate-400 font-medium max-w-xl mx-auto uppercase text-[10px] tracking-[0.4em]">From Data to Certainty in 30 Seconds</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
             {/* Connecting Line */}
             <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent hidden md:block" />
             
             {[
               { step: "01", title: "Deploy Neural Snippet", desc: "One line of code. Zero latency. Global deployment." },
               { step: "02", title: "AI Forensic Scan", desc: "Our engine replays sessions and flags friction points automatically." },
               { step: "03", title: "Execute Optimisation", desc: "Receive an AI-driven checklist of what to kill and what to scale." }
             ].map((item, i) => (
               <motion.div
                 key={i}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: i * 0.2 }}
                 className="relative group"
               >
                 <div className="w-16 h-16 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 flex items-center justify-center mx-auto mb-8 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all duration-500 shadow-2xl">
                    <span className="text-xl font-black">{item.step}</span>
                 </div>
                 <h4 className="text-white font-black uppercase tracking-widest text-xs mb-4">{item.title}</h4>
                 <p className="text-slate-500 text-sm font-medium leading-relaxed px-4">{item.desc}</p>
               </motion.div>
             ))}
          </div>
        </div>
      </section>

      <Features />

      {/* Founder / About Section */}
      <section className="py-32 bg-[#020617] relative overflow-hidden">
        <div className="absolute inset-0 bg-emerald-500/5 blur-[120px] pointer-events-none translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            
            {/* Biometric Portrait */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="relative rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl aspect-[4/5] max-w-md mx-auto lg:mx-0">
                 <img 
                   src="/founder_portrait_1776861054849.png" 
                   alt="Numayr Malik - Founder" 
                   className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
                 />
                 
                 {/* Scanning Laser Line */}
                 <motion.div 
                   animate={{ top: ["0%", "100%", "0%"] }}
                   transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                   className="absolute inset-x-0 h-1 bg-emerald-500/40 blur-sm z-20 pointer-events-none"
                 />

                 {/* Biometric Tags */}
                 <div className="absolute inset-0 z-30 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute top-1/4 left-10 px-4 py-2 bg-emerald-500 text-slate-950 text-[10px] font-black rounded-full shadow-2xl border border-white/20 uppercase tracking-widest">
                      [Founder]
                    </div>
                    <div className="absolute bottom-1/3 right-10 px-4 py-2 bg-slate-950/80 text-emerald-400 text-[10px] font-black rounded-full shadow-2xl border border-emerald-500/20 uppercase tracking-widest backdrop-blur-md">
                      [CRO Specialist]
                    </div>
                 </div>
              </div>
              <div className="absolute -inset-4 border border-emerald-500/10 rounded-[3.5rem] -z-10 group-hover:border-emerald-500/30 transition-colors" />
            </motion.div>

            {/* Founder's Memo */}
            <div className="text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-3 px-5 py-2 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em] mb-10"
              >
                Director's Memo
              </motion.div>

              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-8 leading-[1.1]"
              >
                "We don't sell data. We sell <span className="text-emerald-400">Certainty.</span>"
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="glass-card-dark rounded-[2.5rem] p-10 border border-white/10 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-6 opacity-10">
                   <div className="text-[60px] font-serif italic text-emerald-400">"</div>
                </div>
                
                <p className="text-xl text-slate-300 font-medium leading-relaxed mb-8 italic">
                  I built Forensiq because I was tired of dashboards that told me WHAT happened, but left me guessing WHY. We created this studio to give every performance team the tools to see exactly where friction lives and kill it instantly. This isn't just tracking; it's digital behavioral forensics.
                </p>

                <div className="flex items-center gap-6 border-t border-white/5 pt-8">
                   <div className="w-16 h-16 rounded-2xl overflow-hidden grayscale border border-white/10">
                      <img src="/founder_portrait_1776861054849.png" alt="Numayr Signature" className="w-full h-full object-cover" />
                   </div>
                   <div>
                      <h4 className="text-white font-black uppercase tracking-widest text-sm">Numayr Malik</h4>
                      <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">Founder & CEO, Forensiq</p>
                   </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Ecosystem / Integrations Teaser */}
      <section className="py-32 bg-[#020617] border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-emerald-500/5 blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
           <div className="flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="max-w-md text-left">
                 <h2 className="text-4xl font-black text-white tracking-tighter mb-6 leading-none">Plays nice with <br/><span className="text-emerald-400">your stack.</span></h2>
                 <p className="text-slate-400 font-medium mb-8">Connect Forensiq to your checkout, CRM, and analytics engines in one click. No engineering required.</p>
                 <Link href="/integrations" className="bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-white/10 transition-all inline-block">
                    Explore Ecosystem
                 </Link>
              </div>
              <div className="flex-grow grid grid-cols-3 gap-6">
                 {["Shopify", "Stripe", "Slack", "Zapier", "Hubspot", "Webflow"].map((tech) => (
                   <div key={tech} className="glass-card-dark rounded-3xl p-8 border border-white/5 flex items-center justify-center group hover:border-emerald-500/30 transition-all">
                      <span className="text-slate-500 group-hover:text-white font-black uppercase tracking-widest text-[10px] transition-colors">{tech}</span>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 bg-[#020617] relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-emerald-500/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-8 leading-[0.95]">Simple, scale-ready <br/><span className="text-emerald-400">Forensic Pricing.</span></h2>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="group glass-card-dark rounded-[3rem] p-10 md:p-16 border border-white/10 shadow-2xl relative overflow-hidden"
          >
             {/* Shimmer Effect */}
             <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

             <div className="absolute top-0 right-0 bg-emerald-500 text-slate-950 text-[10px] font-black px-6 py-2 rounded-bl-3xl uppercase tracking-widest">
               Most Popular
             </div>
             
             <p className="text-emerald-400 font-black uppercase tracking-[0.3em] text-xs mb-6">Neural Growth Plan</p>
             
             <div className="flex items-baseline justify-center gap-2 mb-10">
                <span className="text-7xl font-black text-white tracking-tighter">£39</span>
                <span className="text-slate-500 font-bold uppercase tracking-widest text-xs">/ month</span>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-2xl mx-auto mb-12">
                {[
                  "10,000 monthly sessions",
                  "AI Behavioral Analysis",
                  "90-day data retention",
                  "Custom Signal Webhooks",
                  "Advanced Heatmaps",
                  "Neural Conversion Logic"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 text-slate-400 text-sm font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                    {item}
                  </div>
                ))}
             </div>

             <Link href="/login" className="block group/btn">
               <button className="w-full bg-emerald-500 text-slate-950 font-black uppercase tracking-[0.2em] py-6 rounded-2xl hover:bg-emerald-400 transition-all shadow-2xl shadow-emerald-500/20 group-hover/btn:scale-[1.02] active:scale-[0.98]">
                  Get Started Free
               </button>
             </Link>
             <p className="mt-6 text-[10px] text-slate-600 font-black uppercase tracking-widest">No credit card required for audit phase.</p>
          </motion.div>
        </div>
      </section>

      {/* Forensic FAQ */}
      <section className="py-32 bg-[#020617] relative overflow-hidden">
        <div className="max-w-3xl mx-auto px-6 relative z-10">
           <h2 className="text-3xl font-black text-white tracking-tighter mb-16 text-center uppercase">Common <span className="text-emerald-400">Signals.</span></h2>
           <div className="space-y-6">
              {[
                { q: "Does it slow down my store?", a: "No. Our neural snippet is under 3kb and loads asynchronously after your main assets." },
                { q: "Is it GDPR compliant?", a: "Absolutely. We mask all PII and sensitive inputs by default. Forensic-grade privacy." },
                { q: "Can I track custom events?", a: "Yes. Our Signal API allows you to tag any user action for deep replay analysis." }
              ].map((faq, i) => (
                <div key={i} className="glass-card-dark rounded-3xl p-8 border border-white/5 hover:border-emerald-500/20 transition-all">
                   <h4 className="text-white font-black uppercase tracking-widest text-[10px] mb-3 text-emerald-400">{faq.q}</h4>
                   <p className="text-slate-400 text-sm font-medium leading-relaxed">{faq.a}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 bg-[#020617] overflow-hidden relative">
        <div className="absolute inset-0 bg-emerald-500/5 blur-[120px] rounded-full translate-y-1/2" />
        
        {/* Refractive Sphere */}
        <motion.div 
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-emerald-500/10 via-transparent to-blue-500/5 blur-[100px] rounded-full pointer-events-none"
        />

        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-12 leading-[1.05]"
            >
              Ready to stop <br/><span className="text-emerald-400">Guessing?</span>
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Link href="/login" className="inline-block group">
                <button className="relative bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-12 py-7 rounded-full text-sm font-black uppercase tracking-[0.3em] shadow-2xl shadow-emerald-500/20 transition-all hover:scale-[1.05] active:scale-[0.95] overflow-hidden">
                  <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  Initialize Forensic Audit
                </button>
              </Link>
            </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
