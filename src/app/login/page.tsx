"use client";

import React, { useState, useEffect } from "react";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword 
} from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { Layout, Mail, Lock, Loader2, ArrowRight, MousePointer2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { GhostCursors } from "@/components/auth/GhostCursors";
import { InsightCard } from "@/components/auth/InsightCard";

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sessionCount, setSessionCount] = useState(1402);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setSessionCount(prev => prev + Math.floor(Math.random() * 3));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isSignUp) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Create initial user doc
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          createdAt: new Date().toISOString(),
          siteId: null, // Will be filled during /setup
        });
        
        router.push("/setup");
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Check if user has a site
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists() && userDoc.data().siteId) {
          router.push("/dashboard");
        } else {
          router.push("/setup");
        }
      }
    } catch (err: any) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-950 selection:bg-[#1D9E75]/30">
      {/* Left Side: Observational Intelligence */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 p-12 flex-col justify-between text-white relative overflow-hidden border-r border-slate-800">
        <div className="absolute inset-0 pointer-events-none">
          <GhostCursors />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-slate-900 opacity-60" />
        </div>

        <div className="relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 mb-12"
          >
            <div className="w-12 h-12 bg-[#1D9E75] rounded-2xl flex items-center justify-center shadow-lg shadow-[#1D9E75]/20 ring-1 ring-[#1D9E75]/50 group cursor-pointer transition-transform hover:scale-105 active:scale-95">
              <Layout className="w-7 h-7 text-white" />
            </div>
            <span className="text-3xl font-bold tracking-tight text-white">SecondGuess</span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h1 className="text-6xl font-extrabold leading-[1.1] mb-8 tracking-tighter">
              Stop guessing.<br/>
              <span className="text-[#1D9E75] drop-shadow-[0_0_15px_rgba(29,158,117,0.3)]">Start knowing.</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-md leading-relaxed font-light">
              The world's first AI-powered session intelligence platform that tells you exactly why customers leave your site.
            </p>
          </motion.div>
        </div>

        {/* Insight Floating Cards */}
        <div className="absolute inset-x-0 top-1/2 bottom-1/4 pointer-events-none">
          <InsightCard index={0} />
          <InsightCard index={1} />
          <InsightCard index={2} />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="relative z-10 bg-slate-800/20 border border-slate-700/50 p-8 rounded-3xl backdrop-blur-xl shadow-2xl overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-3 opacity-20 transition-opacity group-hover:opacity-40">
            <MousePointer2 className="w-12 h-12 text-[#1D9E75]" />
          </div>
          <p className="text-slate-200 text-lg leading-relaxed italic mb-6 relative">
            "SecondGuess helped us identify a critical form issue that was costing us $12k/month. The setup took less than 2 minutes."
          </p>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-600 to-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 font-bold">
              SJ
            </div>
            <div>
              <p className="font-bold text-white">Sarah Jenkins</p>
              <p className="text-[#1D9E75] text-sm font-medium">Product Lead @ FlowState</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Side: Glassmorphic Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-slate-950 relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#1D9E75]/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-md w-full relative z-10">
          <div className="lg:hidden flex items-center gap-2 mb-12">
            <div className="w-10 h-10 bg-[#1D9E75] rounded-xl flex items-center justify-center shadow-lg shadow-[#1D9E75]/20">
              <Layout className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-white">SecondGuess</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={isSignUp ? "signup" : "login"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="text-4xl font-bold text-white mb-3 tracking-tight">
                {isSignUp ? "Join SecondGuess" : "Welcome back"}
              </h2>
              <p className="text-slate-400 mb-10 text-lg">
                {isSignUp ? "Start capturing visitor insights today." : "Access your real-time intelligence dashboard."}
              </p>
            </motion.div>
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-300 ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-[#1D9E75] transition-colors" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-900/50 border border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1D9E75]/50 focus:border-[#1D9E75] transition-all text-white placeholder:text-slate-600"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-300 ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-[#1D9E75] transition-colors" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-900/50 border border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1D9E75]/50 focus:border-[#1D9E75] transition-all text-white placeholder:text-slate-600"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 rounded-2xl bg-red-500/10 text-red-400 text-sm border border-red-500/20 font-medium flex items-center gap-3"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1D9E75] hover:bg-[#168562] text-white font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-3 transition-all transform hover:scale-[1.01] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-[#1D9E75]/20 group"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <span className="text-lg">{isSignUp ? "Get Started" : "Sign In"}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-12 flex flex-col items-center gap-6">
            <p className="text-slate-400 text-lg">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-[#1D9E75] font-bold hover:text-[#168562] transition-colors"
              >
                {isSignUp ? "Sign In" : "Sign Up"}
              </button>
            </p>

            <div className="flex items-center gap-3 bg-slate-900/50 border border-slate-800 px-4 py-2 rounded-full backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-[#1D9E75] animate-pulse" />
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                {sessionCount.toLocaleString()} sessions analyzed today
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
