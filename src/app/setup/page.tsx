"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { auth, db } from "@/lib/firebase";
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
  Layout,
  MousePointer2,
  Scroll,
  Zap
} from "lucide-react";
import { v4 as uuidv4 } from "uuid";

export default function SetupPage() {
  const { user, userProfile } = useAuth();
  const [step, setStep] = useState(1);
  const [siteName, setSiteName] = useState("");
  const [domain, setDomain] = useState("");
  const [siteId, setSiteId] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (userProfile?.siteId) {
      setSiteId(userProfile.siteId);
      setStep(2);
    }
  }, [userProfile]);

  const handleCreateSite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);

    try {
      const newSiteId = uuidv4();
      const siteRef = doc(db, "sites", newSiteId);
      
      await setDoc(siteRef, {
        name: siteName,
        domain: domain,
        ownerId: user.uid,
        createdAt: serverTimestamp(),
      });

      // Update user with siteId
      await updateDoc(doc(db, "users", user.uid), {
        siteId: newSiteId,
      });

      setSiteId(newSiteId);
      setStep(2);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const trackerSnippet = `<!-- SecondGuess Analytics -->
<script src="${window.location.origin}/tracker.js?siteId=${siteId}" async></script>`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(trackerSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-12 px-4">
      <div className="flex items-center gap-2 mb-12">
        <div className="w-8 h-8 bg-[#1D9E75] rounded-lg flex items-center justify-center">
          <Layout className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-bold tracking-tight text-slate-900">SecondGuess</span>
      </div>

      <div className="max-w-2xl w-full">
        {/* Progress Bar */}
        <div className="flex items-center gap-4 mb-12 px-4">
          <div className={`flex-1 h-2 rounded-full transition-all duration-500 ${step >= 1 ? "bg-[#1D9E75]" : "bg-slate-200"}`} />
          <div className={`flex-1 h-2 rounded-full transition-all duration-500 ${step >= 2 ? "bg-[#1D9E75]" : "bg-slate-200"}`} />
        </div>

        {step === 1 ? (
          <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Configure your site</h2>
            <p className="text-slate-500 mb-8">Tell us about the website you want to track.</p>
            
            <form onSubmit={handleCreateSite} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Project Name</label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={siteName}
                    onChange={(e) => setSiteName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1D9E75] focus:border-transparent"
                    placeholder="e.g. My Awesome Shop"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Website Domain</label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1D9E75] focus:border-transparent"
                    placeholder="e.g. example.com"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1D9E75] hover:bg-[#168562] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#1D9E75]/20"
              >
                {loading ? "Creating..." : "Continue to Tracker"}
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Code2 className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Install Tracker</h2>
                  <p className="text-slate-500">Copy the snippet below into your site's &lt;head&gt; tag.</p>
                </div>
              </div>

              <div className="relative group">
                <pre className="bg-slate-900 text-emerald-400 p-6 rounded-2xl overflow-x-auto text-sm font-mono border border-slate-800">
                  {trackerSnippet}
                </pre>
                <button
                  onClick={copyToClipboard}
                  className="absolute top-4 right-4 p-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-all flex items-center gap-2 text-xs font-semibold"
                >
                  {copied ? (
                    <><ClipboardCheck className="w-4 h-4 text-emerald-400" /> Copied!</>
                  ) : (
                    <><Copy className="w-4 h-4" /> Copy Snippet</>
                  )}
                </button>
              </div>

              <div className="mt-8 p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-sm text-emerald-800">
                  <strong>Almost there!</strong> Once you add the script, your dashboard will automatically start showing live visitor data.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               {[
                 { icon: MousePointer2, title: "Rage Clicks", desc: "Identify frustration" },
                 { icon: Scroll, title: "Scroll Depth", desc: "See content reach" },
                 { icon: Zap, title: "AI Insights", desc: "Know the 'Why'" }
               ].map((item, idx) => (
                 <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center gap-3">
                   <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center">
                     <item.icon className="w-4 h-4 text-[#1D9E75]" />
                   </div>
                   <div>
                     <p className="text-xs font-bold text-slate-900">{item.title}</p>
                     <p className="text-[10px] text-slate-500">{item.desc}</p>
                   </div>
                 </div>
               ))}
            </div>

            <button
              onClick={() => router.push("/dashboard")}
              className="w-full bg-slate-900 hover:bg-black text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all"
            >
              Go to Dashboard
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
