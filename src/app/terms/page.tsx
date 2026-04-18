"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Scale, FileText, AlertCircle, Terminal } from "lucide-react";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-slate-950 selection:bg-[#1D9E75]/30">
      <Navbar />
      
      <div className="pt-32 pb-24 max-w-4xl mx-auto px-6">
        <div className="mb-16">
          <div className="flex items-center gap-2 text-[#1D9E75] font-bold uppercase tracking-widest text-sm mb-4">
            <Scale className="w-4 h-4" />
            <span>Legal Framework</span>
          </div>
          <h1 className="text-5xl font-black text-white tracking-tighter mb-6">Terms of Service</h1>
          <p className="text-slate-400 text-lg font-light">
            Effective as of April 18, 2026. Please read these terms carefully before using our platform.
          </p>
        </div>

        <div className="space-y-12 text-slate-300 leading-relaxed font-light">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <FileText className="w-6 h-6 text-[#1D9E75]" />
              1. Acceptance of Terms
            </h2>
            <p className="mb-4">
              By accessing or using SecondGuess, you agree to be bound by these Terms of Service. If you are using the service on behalf of an organization, you are agreeing to these Terms for that organization and representing that you have the authority to do so.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Terminal className="w-6 h-6 text-[#1D9E75]" />
              2. License to Use Our Service
            </h2>
            <p className="mb-4">
              We grant you a limited, non-exclusive, non-transferable, and revocable license to use our Services for your internal business purposes, subject to these Terms and your chosen subscription plan.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-400">
              <li>You must provide accurate account information.</li>
              <li>You are responsible for maintaining the security of your account and API keys.</li>
              <li>You may not use the service for any illegal or unauthorized purpose.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-[#1D9E75]" />
              3. Service Level & Support
            </h2>
            <p>
              While we strive for 99.9% uptime, SecondGuess is provided "as is." We reserve the right to modify or discontinue any part of the service with reasonable notice. Enterprise plans may include specific Service Level Agreements (SLAs) that supersede this section.
            </p>
          </section>

          <section className="p-8 rounded-3xl bg-[#1D9E75]/5 border border-[#1D9E75]/20">
             <h3 className="text-xl font-bold text-white mb-2">Need a signed DPA?</h3>
             <p className="text-slate-500 mb-6">For Enterprise customers requiring a signed Data Processing Agreement (DPA), please reach out to our legal team.</p>
             <button className="bg-[#1D9E75] text-white font-bold px-6 py-2 rounded-xl text-sm hover:bg-[#168562] transition-colors">
               Request DPA
             </button>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
