"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Shield, Eye, Lock, Globe } from "lucide-react";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-slate-950 selection:bg-[#1D9E75]/30">
      <Navbar />
      
      <div className="pt-32 pb-24 max-w-4xl mx-auto px-6">
        <div className="mb-16">
          <div className="flex items-center gap-2 text-[#1D9E75] font-bold uppercase tracking-widest text-sm mb-4">
            <Shield className="w-4 h-4" />
            <span>Privacy & Compliance</span>
          </div>
          <h1 className="text-5xl font-black text-white tracking-tighter mb-6">Privacy Policy</h1>
          <p className="text-slate-400 text-lg font-light">
            Last updated: April 18, 2026. At SecondGuess, your privacy and your users' privacy are our top priorities.
          </p>
        </div>

        <div className="space-y-12 text-slate-300 leading-relaxed font-light">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Eye className="w-6 h-6 text-[#1D9E75]" />
              1. Information We Collect
            </h2>
            <p className="mb-4">
              Our session intelligence platform is designed to capture behavioral data to help website owners improve user experience. This includes:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-400">
              <li>Mouse movements, clicks, and scroll depth.</li>
              <li>Page navigation and technical browser metadata (e.g., screen size, browser type).</li>
              <li>Anonymized IP addresses for geographic insights.</li>
              <li>Custom events (e.g., "Added to Cart") if configured by the site owner.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Lock className="w-6 h-6 text-[#1D9E75]" />
              2. Data Protection & Anonymization
            </h2>
            <p className="mb-4">
              We take extreme measures to ensure that Sensitive Personal Information (SPI) is never captured.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-400">
              <li><strong>Input Masking:</strong> All text inputs, passwords, and sensitive fields are masked by default before they ever leave the user's browser.</li>
              <li><strong>Encryption:</strong> Data is encrypted both in transit (TLS 1.3) and at rest (AES-256).</li>
              <li><strong>Retention:</strong> Session data is automatically deleted after 30 days unless otherwise specified by your plan.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Globe className="w-6 h-6 text-[#1D9E75]" />
              3. GDPR & CCPA Compliance
            </h2>
            <p>
              SecondGuess is built to be compliant with major global privacy standards. We act as a "Data Processor" on behalf of our customers (the "Data Controllers"). We provide tools for site owners to easily fulfill "Right to be Forgotten" requests and data exports for their end-users.
            </p>
          </section>

          <section className="p-8 rounded-3xl bg-slate-900 border border-slate-800">
             <h3 className="text-xl font-bold text-white mb-2">Have questions?</h3>
             <p className="text-slate-500 mb-6">Our compliance team is here to help you understand how we protect your data.</p>
             <button className="text-[#1D9E75] font-bold hover:underline">
               contact@secondguess.io
             </button>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
