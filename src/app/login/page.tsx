"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { Layout, Mail, Lock, Loader2, ArrowRight, MousePointer2, Code } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { GhostCursors } from "@/components/auth/GhostCursors";
import { InsightCard } from "@/components/auth/InsightCard";

export default function LoginPage() {
  const { signInWithGoogle, signInWithGithub, resetPassword } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [isResetMode, setIsResetMode] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [error, setError] = useState("");
  const [sessionCount, setSessionCount] = useState(1402);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setSessionCount(prev => prev + Math.floor(Math.random() * 3));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleAuthError = (err: any) => {
    const code = err.code || "";
    if (code === "auth/user-not-found") return "No account found with this email.";
    if (code === "auth/wrong-password") return "Incorrect password. Please try again.";
    if (code === "auth/email-already-in-use") return "An account already exists with this email.";
    if (code === "auth/weak-password") return "Password should be at least 6 characters.";
    return err.message || "An error occurred. Please try again.";
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await resetPassword(email);
      setResetSent(true);
    } catch (err: any) {
      setError(handleAuthError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'github') => {
    setLoading(true);
    setError("");
    try {
      if (provider === 'google') await signInWithGoogle();
      else await signInWithGithub();
      // Redirects are handled by AuthContext useEffect
    } catch (err: any) {
      setError(handleAuthError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isSignUp) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          createdAt: new Date().toISOString(),
          siteId: null,
        });
        
        router.push("/setup");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        // Redirect logic in AuthContext will trigger
      }
    } catch (err: any) {
      setError(handleAuthError(err));
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
            className="flex items-center gap-3 mb-12 cursor-pointer"
            onClick={() => router.push("/")}
          >
            <div className="relative w-12 h-12 flex items-center justify-center">
              <div className="absolute inset-0 bg-emerald-500 blur-xl opacity-30" />
              <svg viewBox="0 0 24 24" className="w-full h-full relative" fill="none">
                <path d="M12 3L2 21H22L12 3Z" className="stroke-emerald-400 stroke-[1.5]" />
                <path d="M12 3V21" className="stroke-emerald-400/30 stroke-[1]" />
                <path d="M7 12L17 12" className="stroke-emerald-400/30 stroke-[1]" />
              </svg>
            </div>
            <span className="text-3xl font-black tracking-tighter text-white uppercase">Forensiq</span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h1 className="text-6xl font-extrabold leading-[1.1] mb-8 tracking-tighter">
              Total Certainty.<br/>
              <span className="text-emerald-400 drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]">Zero Guessing.</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-md leading-relaxed font-light">
              The forensic behavioral intelligence engine that tells you exactly why customers leave — and precisely how to fix it.
            </p>
          </motion.div>
        </div>

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
            "Forensiq helped us identify a critical form issue that was costing us £12k/month. The setup took less than 2 minutes."
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

      {/* Right Side: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-slate-950 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#1D9E75]/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-md w-full relative z-10">
          <div className="lg:hidden flex items-center gap-3 mb-12">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div className="absolute inset-0 bg-emerald-500 blur-xl opacity-20" />
              <svg viewBox="0 0 24 24" className="w-full h-full relative" fill="none">
                <path d="M12 3L2 21H22L12 3Z" className="stroke-emerald-400 stroke-[1.5]" />
                <path d="M12 3V21" className="stroke-emerald-400/30 stroke-[1]" />
              </svg>
            </div>
            <span className="text-2xl font-black tracking-tighter text-white uppercase">Forensiq</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={isSignUp ? "signup" : isResetMode ? "reset" : "login"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="text-4xl font-black text-white mb-3 tracking-tighter">
                {isResetMode ? "Reset Password" : isSignUp ? "Join Forensiq" : "Welcome back"}
              </h2>
              <p className="text-slate-400 mb-10 text-lg">
                {isResetMode 
                    ? "Enter your email to receive a recovery link." 
                    : isSignUp 
                        ? "Initialize your forensic intelligence workspace." 
                        : "Access your real-time forensic dashboard."}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="space-y-6">
            {!isResetMode && (
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => handleSocialLogin('google')}
                  className="flex items-center justify-center gap-3 py-3 px-4 bg-slate-900 border border-slate-800 rounded-2xl hover:bg-slate-800 transition-colors group"
                >
                  <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/smartlock/google.svg" className="w-5 h-5" alt="Google" />
                  <span className="text-sm font-bold text-white">Google</span>
                </button>
                <button 
                  onClick={() => handleSocialLogin('github')}
                  className="flex items-center justify-center gap-3 py-3 px-4 bg-slate-900 border border-slate-800 rounded-2xl hover:bg-slate-800 transition-colors group"
                >
                  <Code className="w-5 h-5 text-white" />
                  <span className="text-sm font-bold text-white">GitHub</span>
                </button>
              </div>
            )}

            {!isResetMode && (
              <div className="flex items-center gap-4 py-2">
                <div className="h-px flex-1 bg-slate-800" />
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-600">Or continue with</span>
                <div className="h-px flex-1 bg-slate-800" />
              </div>
            )}

            {isResetMode && resetSent ? (
               <motion.div 
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="p-6 rounded-3xl bg-[#1D9E75]/10 border border-[#1D9E75]/20 text-center"
               >
                  <div className="w-12 h-12 bg-[#1D9E75]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-6 h-6 text-[#1D9E75]" />
                  </div>
                  <h3 className="text-white font-bold mb-2">Check your inbox</h3>
                  <p className="text-slate-400 text-sm mb-6">We've sent a password reset link to {email}.</p>
                  <button 
                    onClick={() => { setIsResetMode(false); setResetSent(false); }}
                    className="text-[#1D9E75] font-bold hover:underline text-sm"
                  >
                    Back to Sign In
                  </button>
               </motion.div>
            ) : (
                <form onSubmit={isResetMode ? handleReset : handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
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

                {!isResetMode && (
                    <div className="space-y-1.5">
                    <div className="flex items-center justify-between px-1">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Password</label>
                        {!isSignUp && (
                            <button 
                                type="button"
                                onClick={() => setIsResetMode(true)}
                                className="text-[10px] font-bold text-[#1D9E75] uppercase tracking-widest hover:underline"
                            >
                                Forgot?
                            </button>
                        )}
                    </div>
                    <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-[#1D9E75] transition-colors" />
                        <input
                        type="password"
                        required={!isResetMode}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-slate-900/50 border border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1D9E75]/50 focus:border-[#1D9E75] transition-all text-white placeholder:text-slate-600"
                        placeholder="••••••••"
                        />
                    </div>
                    </div>
                )}

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
                        <span className="text-lg">
                            {isResetMode ? "Send Reset Link" : isSignUp ? "Get Started" : "Sign In"}
                        </span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                    )}
                </button>

                {isResetMode && (
                    <button 
                        type="button"
                        onClick={() => setIsResetMode(false)}
                        className="w-full text-slate-500 text-sm font-bold hover:text-white transition-colors"
                    >
                        Cancel
                    </button>
                )}
                </form>
            )}
          </div>

          {!isResetMode && (
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
          )}
        </div>
      </div>
    </div>
  );
}
