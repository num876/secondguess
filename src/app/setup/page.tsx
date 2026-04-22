"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { doc, setDoc, updateDoc, collection, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { 
  Building2, 
  Globe, 
  CheckCircle2, 
  Copy, 
  Code2, 
  ArrowRight,
  ClipboardCheck,
  MousePointer2,
  Scroll,
  Zap,
  ChevronRight
} from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { motion, AnimatePresence } from "framer-motion";

export default function SetupPage() {
  const { user, userProfile } = useAuth();
  const [step, setStep] = useState(1);
  const [siteName, setSiteName] = useState("");
  const [domain, setDomain] = useState("");
  const [siteId, setSiteId] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [origin, setOrigin] = useState("");
  const router = useRouter();

  // Fix 1: SSR-safe — only read window inside effect
  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  useEffect(() => {
    if (userProfile?.siteId) {
      setSiteId(userProfile.siteId);
      setStep(2);
    }
  }, [userProfile]);

  const trackerSnippet = useMemo(() => (
    `<!-- Forensiq Neural Tracker -->\n<script src="${origin}/tracker.js?siteId=${siteId}" async></script>`
  ), [origin, siteId]);

  const handleCreateSite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    setError("");

    try {
      const newSiteId = uuidv4();
      const siteRef = doc(db, "sites", newSiteId);
      
      await setDoc(siteRef, {
        name: siteName,
        domain: domain,
        ownerId: user.uid,
        createdAt: serverTimestamp(),
      });

      await updateDoc(doc(db, "users", user.uid), {
        siteId: newSiteId,
      });

      setSiteId(newSiteId);
      setStep(2);
    } catch (err: any) {
      setError(err.message || "Failed to create site. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(trackerSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#020617] flex flex-col items-center py-12 px-4 selection:bg-emerald-500/30">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 mb-14 cursor-pointer"
        onClick={() => router.push("/")}
      >
        <div className="relative w-10 h-10 flex items-center justify-center">
          <div className="absolute inset-0 bg-emerald-500 blur-xl opacity-30" />
          <svg viewBox="0 0 24 24" className="w-full h-full relative" fill="none">
            <path d="M12 3L2 21H22L12 3Z" className="stroke-emerald-400 stroke-[1.5]" />
            <path d="M12 3V21" className="stroke-emerald-400/30 stroke-[1]" />
            <path d="M7 12L17 12" className="stroke-emerald-400/30 stroke-[1]" />
          </svg>
        </div>
        <span className="text-2xl font-black tracking-tighter text-white uppercase">Forensiq</span>
      </motion.div>

      <div className="max-w-2xl w-full">
        {/* Progress Bar */}
        <div className="flex items-center gap-3 mb-12 px-4">
          {[1, 2].map((s) => (
            <div
              key={s}
              className={`flex-1 h-1 rounded-full transition-all duration-700 ${
                step >= s ? "bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)]" : "bg-white/5"
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="glass-card-dark rounded-[2.5rem] p-10 border border-white/5 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[100px] -mr-16 -mt-16 pointer-events-none" />

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em] mb-8">
                Step 1 of 2 — Site Configuration
              </div>

              <h2 className="text-3xl font-black text-white tracking-tighter mb-3">Configure your site</h2>
              <p className="text-slate-400 font-medium mb-10">Tell us about the website you want to forensically track.</p>
              
              <form onSubmit={handleCreateSite} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Project Name</label>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input
                      type="text"
                      required
                      value={siteName}
                      onChange={(e) => setSiteName(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-slate-950 border border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all text-white placeholder:text-slate-600"
                      placeholder="e.g. My Awesome Shop"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Website Domain</label>
                  <div className="relative">
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input
                      type="text"
                      required
                      value={domain}
                      onChange={(e) => setDomain(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-slate-950 border border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all text-white placeholder:text-slate-600"
                      placeholder="e.g. example.com"
                    />
                  </div>
                </div>

                {error && (
                  <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black uppercase tracking-[0.2em] py-5 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-2xl shadow-emerald-500/20 disabled:opacity-50 text-sm"
                >
                  {loading ? "Initializing..." : "Continue to Tracker"}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              <div className="glass-card-dark rounded-[2.5rem] p-10 border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[100px] -mr-16 -mt-16 pointer-events-none" />

                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em] mb-8">
                  Step 2 of 2 — Install Neural Tracker
                </div>

                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                    <Code2 className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-white tracking-tighter">Install the Neural Snippet</h2>
                    <p className="text-slate-400 text-sm font-medium">Paste this into your site's &lt;head&gt; tag. It's under 3kb.</p>
                  </div>
                </div>

                <div className="relative group">
                  <pre className="bg-slate-950 text-emerald-400 p-6 rounded-2xl overflow-x-auto text-sm font-mono border border-white/5 leading-relaxed">
                    {trackerSnippet}
                  </pre>
                  <button
                    onClick={copyToClipboard}
                    className="absolute top-4 right-4 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl transition-all flex items-center gap-2 text-[10px] font-black uppercase tracking-widest"
                  >
                    {copied ? (
                      <><ClipboardCheck className="w-4 h-4 text-emerald-400" /> Copied!</>
                    ) : (
                      <><Copy className="w-4 h-4" /> Copy</>
                    )}
                  </button>
                </div>

                <div className="mt-8 p-5 bg-emerald-500/5 rounded-2xl border border-emerald-500/20 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <p className="text-sm text-emerald-300 font-medium">
                    <strong>Almost there.</strong> Once deployed, your dashboard will show live visitor data within minutes.
                  </p>
                </div>
              </div>

              {/* Feature Preview */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { icon: MousePointer2, title: "Rage Clicks", desc: "Identify frustration" },
                  { icon: Scroll, title: "Scroll Depth", desc: "See content reach" },
                  { icon: Zap, title: "AI Insights", desc: "Know the Why" }
                ].map((item, idx) => (
                  <div key={idx} className="glass-card-dark p-5 rounded-3xl border border-white/5 flex flex-col items-center gap-3 text-center">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-xs font-black text-white uppercase tracking-widest">{item.title}</p>
                      <p className="text-[10px] text-slate-500 font-medium mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <button
                onClick={() => router.push("/dashboard")}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black uppercase tracking-[0.2em] py-5 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-2xl shadow-emerald-500/20 text-sm"
              >
                Initialize Dashboard
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => router.push("/dashboard")}
                className="w-full text-slate-500 hover:text-slate-300 py-3 text-[10px] font-black uppercase tracking-[0.3em] transition-colors flex items-center justify-center gap-2"
              >
                Skip for now <ChevronRight className="w-3 h-3" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
