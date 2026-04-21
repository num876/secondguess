import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 selection:bg-[#1D9E75]/30">
      <Navbar />
      <Hero />
      
      {/* Logos / Social Proof Strip */}
      <section className="py-20 bg-slate-950 border-y border-slate-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-slate-500 text-sm font-semibold uppercase tracking-widest mb-10">
            Trusted by performance teams at
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-30 grayscale hover:grayscale-0 transition-all">
             <div className="text-2xl font-bold text-white tracking-tighter">FLOWSTATE</div>
             <div className="text-2xl font-bold text-white tracking-tighter">LUMINA</div>
             <div className="text-2xl font-bold text-white tracking-tighter">CONTEXTLY</div>
             <div className="text-2xl font-bold text-white tracking-tighter">PRISM</div>
          </div>
        </div>
      </section>

      <Features />

      {/* Pricing Teaser */}
      <section id="pricing" className="py-24 bg-slate-950">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-black text-white tracking-tighter mb-6">Simple, scale-ready pricing.</h2>
          <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 border border-[#1D9E75]/30 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 bg-[#1D9E75] text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-widest">
               Most Popular
             </div>
             <p className="text-[#1D9E75] font-bold uppercase tracking-widest text-sm mb-4">Growth Plan</p>
             <div className="flex items-baseline justify-center gap-1 mb-6">
                <span className="text-5xl font-black text-white">£39</span>
                <span className="text-slate-500">/month</span>
             </div>
             <ul className="space-y-4 text-slate-400 text-sm mb-10 text-left max-w-xs mx-auto">
                <li className="flex items-center gap-3">
                   <div className="w-1.5 h-1.5 rounded-full bg-[#1D9E75]" />
                   10,000 monthly sessions
                </li>
                <li className="flex items-center gap-3">
                   <div className="w-1.5 h-1.5 rounded-full bg-[#1D9E75]" />
                   Advanced AI Behavioral Insights
                </li>
                <li className="flex items-center gap-3">
                   <div className="w-1.5 h-1.5 rounded-full bg-[#1D9E75]" />
                   90-day data retention
                </li>
             </ul>
             <Link href="/login" className="block w-full">
               <button className="w-full bg-white text-slate-950 font-bold py-4 rounded-2xl hover:bg-slate-200 transition-colors shadow-xl">
                  Get Started Free
               </button>
             </Link>
             <p className="mt-4 text-xs text-slate-500">No credit card required to start.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-slate-950 overflow-hidden relative">
        <div className="absolute inset-0 bg-[#1D9E75]/5 blur-[120px] rounded-full translate-y-1/2" />
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-10 leading-[1.1]">
              Ready to stop guessing?
            </h2>
            <Link href="/login" className="inline-block">
              <button className="bg-[#1D9E75] hover:bg-[#168562] text-white px-10 py-6 rounded-2xl text-xl font-bold shadow-2xl shadow-[#1D9E75]/30 transition-all hover:scale-[1.05] active:scale-[0.95]">
                Get Started with SecondGuess
              </button>
            </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
