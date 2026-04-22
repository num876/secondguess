"use client";

import React, { useState, useRef } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Mail, MessageSquare, Send, CheckCircle2, LifeBuoy, BookOpen, Activity } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ContactContent() {
  const searchParams = useSearchParams();
  const defaultSubject = searchParams?.get("subject") || "General Inquiry";

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", subject: defaultSubject, message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed");
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 selection:bg-[#1D9E75]/30 overflow-x-hidden">
      <Navbar />

      <section className="relative pt-40 pb-32">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#1D9E75]/5 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 h-px top-20 bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Left Side: Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1D9E75]/10 border border-[#1D9E75]/20 text-[#1D9E75] text-xs font-bold mb-6 uppercase tracking-widest">
                <MessageSquare className="w-3 x-3" />
                <span>Get in Touch</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-8 leading-[1.05]">
                How can we <br/>help you grow?
              </h1>
              <p className="text-xl text-slate-400 font-light leading-relaxed mb-12 max-w-lg">
                Whether you have technical questions, enterprise inquiries, or just want to say hi, our team is ready to respond.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 {[
                   { icon: LifeBuoy, title: "Support", desc: "Technical issues and account help.", link: "/docs/installation" },
                   { icon: BookOpen, title: "Knowledge", desc: "Read our comprehensive guides.", link: "/docs/installation" },
                   { icon: Activity, title: "Status", desc: "Check real-time system health.", link: "https://status.secondguess.io" },
                   { icon: Mail, title: "Email", desc: "support@secondguess.io", link: "mailto:support@secondguess.io" }
                 ].map((item, i) => (
                   <Link 
                     key={i} 
                     href={item.link}
                     className="p-6 rounded-2xl bg-slate-900/30 border border-slate-800 hover:border-[#1D9E75]/30 hover:bg-slate-900/50 transition-all group"
                   >
                     <item.icon className="w-6 h-6 text-[#1D9E75] mb-4 group-hover:scale-110 transition-transform" />
                     <h3 className="text-white font-bold mb-1">{item.title}</h3>
                     <p className="text-slate-500 text-sm font-light">{item.desc}</p>
                   </Link>
                 ))}
              </div>
            </motion.div>

            {/* Right Side: Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-[#1D9E75]/10 blur-[100px] rounded-full -z-10" />
              <div className="p-8 md:p-12 rounded-[32px] bg-slate-900/80 backdrop-blur-xl border border-slate-800 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                   <Send className="w-32 h-32 text-white" />
                </div>

                {submitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 bg-[#1D9E75]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                       <CheckCircle2 className="w-10 h-10 text-[#1D9E75]" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-4">Message Sent!</h2>
                    <p className="text-slate-400 mb-8 max-w-sm mx-auto font-light">
                      Thanks for reaching out. A behavioral specialist will get back to you within 24 hours.
                    </p>
                    <button 
                      onClick={() => setSubmitted(false)}
                      className="text-[#1D9E75] font-bold hover:underline"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-400 ml-1">Full Name</label>
                        <input 
                          required
                          name="name"
                          type="text" 
                          value={form.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-400 ml-1">Email Address</label>
                        <input 
                          required
                          name="email"
                          type="email" 
                          value={form.email}
                          onChange={handleChange}
                          placeholder="john@company.com"
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-400 ml-1">Subject</label>
                      <select 
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-emerald-500/50 transition-colors appearance-none"
                      >
                         <option>General Inquiry</option>
                         <option>Enterprise / Sales</option>
                         <option>Technical Support</option>
                         <option>Billing Question</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-400 ml-1">Message</label>
                      <textarea 
                        required
                        name="message"
                        rows={5}
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell us about your project..."
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-emerald-500/50 transition-colors resize-none"
                      />
                    </div>
                    {error && (
                      <p className="text-sm text-red-400 font-medium">{error}</p>
                    )}
                    <button 
                      type="submit" 
                      disabled={loading}
                      className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-xl shadow-emerald-500/20 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? "Transmitting..." : "Send Message"}
                      {!loading && <Send className="w-5 h-5" />}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default function ContactPage() {
  return (
    <Suspense>
      <ContactContent />
    </Suspense>
  );
}
