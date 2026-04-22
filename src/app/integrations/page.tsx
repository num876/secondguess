"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Search, Puzzle, ExternalLink, Zap, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const CATEGORIES = ["All", "E-commerce", "Marketing", "Infrastructure", "Product Analytics"];

const INTEGRATIONS = [
  {
    name: "Shopify",
    description: "One-click install for the world's most popular e-commerce platform. Fully compatible with Shopify store handles.",
    category: "E-commerce",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/shopify.svg",
    color: "#95BF47",
    status: "Native",
    featured: true
  },
  {
    name: "Webflow",
    description: "Visual canvas integration with automatic project ID mapping and support for Webflow forms.",
    category: "Marketing",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/webflow.svg",
    color: "#4353FF",
    status: "Native",
    featured: true
  },
  {
    name: "Segment",
    description: "Stream your SecondGuess sessions directly into your Segment workspace for deep multi-tool analysis.",
    category: "Product Analytics",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/segment.svg",
    color: "#52BD94",
    status: "Integration",
    featured: false
  },
  {
    name: "Stripe",
    description: "Connect checkout events to session replays. Identify exactly where customers drop off during payment.",
    category: "Infrastructure",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/stripe.svg",
    color: "#635BFF",
    status: "Deep Link",
    featured: true
  },
  {
    name: "Slack",
    description: "Get real-time alerts in your team channels when critical session friction (like rage clicks) is detected.",
    category: "Marketing",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/slack.svg",
    color: "#4A154B",
    status: "Alerting",
    featured: false
  },
  {
    name: "WordPress",
    description: "Easy-to-use plugin for any WordPress or WooCommerce installation. Standard pixel tracking auto-configured.",
    category: "Marketing",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/wordpress.svg",
    color: "#21759B",
    status: "Plugin",
    featured: false
  }
];

export default function IntegrationsPage() {
  const [requested, setRequested] = React.useState(false);
  const [requestLoading, setRequestLoading] = React.useState(false);
  const [activeCategory, setActiveCategory] = React.useState("All");

  const filtered = activeCategory === "All"
    ? INTEGRATIONS
    : INTEGRATIONS.filter(i => i.category === activeCategory);

  const handleRequest = async () => {
    setRequestLoading(true);
    try {
      await fetch("/api/integrations/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ integration: "custom", userId: "anonymous" }),
      });
      setRequested(true);
      setTimeout(() => setRequested(false), 3000);
    } catch (err) {
      console.error("Request failed", err);
    } finally {
      setRequestLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 selection:bg-[#1D9E75]/30 overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[#1D9E75]/5 blur-[120px] rounded-full translate-y-[-50%] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-slate-400 text-xs font-bold mb-8 uppercase tracking-widest"
            >
              <Puzzle className="w-4 h-4 text-[#1D9E75]" />
              <span>Extend SecondGuess Intelligence</span>
            </motion.div>
            <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
              Plug and play.
            </h1>
            <p className="text-xl text-slate-400 font-light max-w-2xl mx-auto mb-12">
              Connect your favorite stack to Forensiq in seconds. Our ready-made integrations ensure you capture every behavioral signal without code.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              {CATEGORIES.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest border transition-all ${
                    cat === activeCategory
                    ? "bg-emerald-500 text-slate-950 border-emerald-500 shadow-xl shadow-emerald-500/20"
                    : "bg-slate-900/50 text-slate-500 border-slate-800 hover:text-slate-300 hover:border-slate-700"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((app, i) => (
              <motion.div
                key={app.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative p-8 rounded-[32px] bg-slate-900/30 border border-slate-800 hover:border-[#1D9E75]/30 hover:bg-slate-900/50 transition-all"
              >
                <div className="flex items-start justify-between mb-8">
                  <div 
                    className="w-16 h-16 rounded-2xl p-3 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-black/20"
                    style={{ backgroundColor: app.color + '20', border: '1px solid ' + app.color + '40' }}
                  >
                     <img 
                      src={app.logo} 
                      alt={app.name} 
                      className="w-10 h-10 object-contain transition-all opacity-95 group-hover:opacity-100 group-hover:scale-110" 
                      style={{ filter: 'brightness(0) invert(1)' }}
                     />
                  </div>
                  {app.featured && (
                    <div className="px-3 py-1 bg-[#1D9E75]/10 border border-[#1D9E75]/20 rounded-full text-[#1D9E75] text-[10px] font-bold uppercase tracking-widest">
                      Featured
                    </div>
                  )}
                </div>

                <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">{app.name}</h3>
                <p className="text-slate-500 font-light leading-relaxed mb-8 text-sm h-12 line-clamp-2">
                  {app.description}
                </p>

                  <div className="flex gap-4 pt-6 border-t border-slate-800/50">
                    <Link 
                      href="/settings?tab=integrations" 
                      className="flex-1 bg-white/5 hover:bg-[#1D9E75] text-white py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest text-center transition-all border border-white/5 hover:border-[#1D9E75]"
                    >
                      Connect
                    </Link>
                    <Link href="/docs/installation" className="px-4 py-2.5 text-slate-500 hover:text-white transition-colors group/btn flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest border border-transparent hover:bg-white/5 rounded-xl">
                       Docs <ExternalLink className="w-3 h-3 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </Link>
                  </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Request Integration */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto p-12 rounded-[40px] bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
              <Puzzle className="w-48 h-48 text-white rotate-12" />
           </div>
           
           <div className="relative z-10 max-w-lg">
             <h2 className="text-3xl font-bold text-white mb-4">Don't see your stack?</h2>
             <p className="text-slate-500 font-light">
               We're constantly adding new integrations. Let us know what tool you use and we'll prioritize it for our next release.
             </p>
           </div>
           
           <button 
            onClick={handleRequest}
            disabled={requested || requestLoading}
            className="relative z-10 bg-white text-slate-950 px-8 py-4 rounded-xl font-bold shadow-2xl transition-all hover:-translate-y-1 hover:bg-slate-100 flex items-center gap-4 disabled:opacity-50"
           >
              {requested ? (
                <>Request Sent! <CheckCircle2 className="w-4 h-4 text-[#1D9E75]" /></>
              ) : (
                <>Request Integration <Zap className="w-4 h-4 fill-slate-950" /></>
              )}
           </button>
        </div>
      </section>

      {/* SDK Section */}
      <section className="py-32 bg-slate-950 flex flex-col items-center text-center px-6">
        <div className="w-16 h-16 rounded-full bg-[#1D9E75]/10 flex items-center justify-center mb-8">
           <Puzzle className="w-8 h-8 text-[#1D9E75]" />
        </div>
        <h2 className="text-4xl font-black text-white tracking-tighter mb-6">Build your own.</h2>
        <p className="text-slate-500 max-w-xl mx-auto mb-10 font-light text-lg">
          Our robust API and SDKs allow you to stream behavioral data into any custom application or internal BI tool.
        </p>
        <div className="flex gap-4">
          <Link href="/docs/installation" className="px-8 py-3 rounded-xl border border-slate-800 text-white font-bold hover:bg-white/5 transition-colors">Developer Docs</Link>
          <Link href="/settings" className="px-8 py-3 rounded-xl bg-white text-slate-950 font-bold hover:bg-slate-200 transition-colors">Get API Key</Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
