"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Terminal, Copy, Check, Info, Code2, Rocket } from "lucide-react";
import { motion } from "framer-motion";

export default function InstallationPage() {
  const [copied, setCopied] = useState(false);
  const siteId = "SG-XXXXXXXX"; // Placeholder

  const trackerCode = `<!-- SecondGuess Tracker -->
<script>
  (function(s,e,c,o,n,d){
    s['SecondGuessObject']=n;s[n]=s[n]||function(){
    (s[n].q=s[n].q||[]).push(arguments)},s[n].l=1*new Date();
    d=e.createElement(c),o=e.getElementsByTagName(c)[0];
    d.async=1;d.src='https://cdn.secondguess.io/track.js';
    o.parentNode.insertBefore(d,o)
  })(window,document,'script','','sg');

  sg('init', '${siteId}');
  sg('track', 'pageview');
</script>`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(trackerCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-slate-950 selection:bg-[#1D9E75]/30 text-white">
      <Navbar />
      
      <div className="pt-32 pb-24 max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="mb-12">
              <div className="flex items-center gap-2 text-[#1D9E75] font-bold uppercase tracking-widest text-sm mb-4">
                <Terminal className="w-4 h-4" />
                <span>Technical Guide</span>
              </div>
              <h1 className="text-5xl font-black tracking-tighter mb-6 underline decoration-[#1D9E75]/30">Installation</h1>
              <p className="text-slate-400 text-xl font-light leading-relaxed">
                Adding SecondGuess to your site takes less than 2 minutes. Copy the snippet below and place it in your site's header.
              </p>
            </div>

            <section className="mb-16">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-[#1D9E75]" />
                  Your Tracker Snippet
                </h2>
                <button 
                  onClick={copyToClipboard}
                  className="flex items-center gap-2 text-sm font-bold text-[#1D9E75] hover:text-[#168562] transition-colors bg-[#1D9E75]/10 px-3 py-1.5 rounded-lg border border-[#1D9E75]/20"
                >
                  {copied ? <><Check className="w-4 h-4" /> Copied!</> : <><Copy className="w-4 h-4" /> Copy Snippet</>}
                </button>
              </div>
              
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#1D9E75]/20 to-[#34D399]/20 rounded-2xl blur opacity-25 group-hover:opacity-100 transition duration-1000"></div>
                <pre className="relative bg-slate-900 border border-slate-800 p-6 rounded-2xl overflow-x-auto font-mono text-sm leading-relaxed text-slate-300">
                  <code>{trackerCode}</code>
                </pre>
              </div>
              
              <div className="mt-6 p-4 rounded-xl bg-blue-500/5 border border-blue-500/20 flex gap-4">
                <Info className="w-6 h-6 text-blue-400 shrink-0" />
                <p className="text-sm text-slate-400 leading-relaxed">
                  <strong>Pro Tip:</strong> Place this code at the very end of your <code className="text-blue-300">&lt;head&gt;</code> tag for the best performance and early session capture.
                </p>
              </div>
            </section>

            <section className="space-y-8">
              <h2 className="text-3xl font-bold tracking-tight">Platform-Specific Guides</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: "Shopify", icon: "🛍️", steps: "Add to theme.liquid before </head>" },
                  { name: "Webflow", icon: "🕸️", steps: "Paste into 'Custom Code' settings tab" },
                  { name: "WordPress", icon: "📝", steps: "Use 'Insert Headers and Footers' plugin" },
                  { name: "Next.js", icon: "⚛️", steps: "Place in _document.js or RootLayout" },
                ].map((item, idx) => (
                  <div key={idx} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors">
                    <div className="text-2xl mb-4">{item.icon}</div>
                    <h3 className="font-bold mb-2">{item.name}</h3>
                    <p className="text-sm text-slate-500">{item.steps}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar / Quick Links */}
          <div className="space-y-8">
             <div className="p-8 rounded-3xl bg-gradient-to-br from-[#1D9E75] to-[#168562] shadow-2xl shadow-[#1D9E75]/20">
                <Rocket className="w-10 h-10 text-white mb-6" />
                <h3 className="text-xl font-bold text-white mb-2">Need help?</h3>
                <p className="text-slate-100/80 text-sm mb-6 leading-relaxed">
                  Our engineering team can jump on a call to help you set up custom event tracking.
                </p>
                <button className="w-full bg-white text-slate-950 font-bold py-3 rounded-xl hover:bg-slate-100 transition-colors">
                  Book Setup Call
                </button>
             </div>

             <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800">
                <h4 className="font-bold mb-4">Verification</h4>
                <div className="flex items-center gap-3 text-sm text-slate-500 mb-6">
                   <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse" />
                   Awaiting script heartbeat...
                </div>
                <button className="w-full border border-slate-700 hover:bg-slate-800 py-3 rounded-xl font-bold text-sm transition-colors text-slate-300">
                  Check Status
                </button>
             </div>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}
