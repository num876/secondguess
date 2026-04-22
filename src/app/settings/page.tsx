"use client";

import React, { useState, useEffect, Suspense } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Settings as SettingsIcon, User, Globe, Bell, CreditCard, ShieldCheck, Puzzle, ExternalLink, Zap, Trash2, CheckCircle2, Camera } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useIntegrations } from "@/context/IntegrationContext";
import { ConnectModal } from "@/components/integrations/ConnectModal";
import { TrackingSnippet } from "@/components/dashboard/TrackingSnippet";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { collection, query, getDocs, limit, doc, setDoc } from "firebase/firestore";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";

const INTEGRATIONS = [
  {
    name: "Shopify",
    description: "Connect your store to track abandonment.",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/shopify.svg",
    color: "#95BF47",
  },
  {
    name: "Stripe",
    description: "Sync payment events with sessions.",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/stripe.svg",
    color: "#635BFF",
  },
  {
    name: "Slack",
    description: "Get real-time friction alerts.",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/slack.svg",
    color: "#4A154B",
  },
  {
    name: "Webflow",
    description: "Auto-map Webflow project IDs.",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/webflow.svg",
    color: "#4353FF",
  },
  {
    name: "Segment",
    description: "Stream data to your warehouse.",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/segment.svg",
    color: "#52BD94",
  },
  {
    name: "WordPress",
    description: "Plugin for WordPress & WooCommerce.",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/wordpress.svg",
    color: "#21759B",
  }
];

export default function SettingsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center">
         <div className="w-12 h-12 border-4 border-[#1D9E75]/20 border-t-[#1D9E75] rounded-full animate-spin mb-4" />
         <p className="text-slate-500 font-medium animate-pulse text-sm uppercase tracking-widest">Initializing Intelligence...</p>
      </div>
    }>
      <SettingsContent />
    </Suspense>
  );
}

function SettingsContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams?.get("tab") || "general";
  const [activeTab, setActiveTab] = useState(initialTab);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  const TABS = [
    { id: "general", label: "General", icon: SettingsIcon },
    { id: "account", label: "Account", icon: User },
    { id: "site", label: "Site Config", icon: Globe },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "integrations", label: "Integrations", icon: Puzzle },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: ShieldCheck },
  ];

  const { integrations, disconnectIntegration, isLive } = useIntegrations();
  const { user, userProfile, updateProfile, updateSiteConfig } = useAuth();
  const [selectedProvider, setSelectedProvider] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [usageCount, setUsageCount] = useState(0);

  // Fetch real usage count
  useEffect(() => {
    if (!userProfile?.siteId) return;
    const fetchUsage = async () => {
      const eventsRef = collection(db, "sites", userProfile.siteId, "all_events");
      const snapshot = await getDocs(query(eventsRef, limit(1000)));
      setUsageCount(snapshot.size);
    };
    fetchUsage();
  }, [userProfile?.siteId]);

  // Notification preferences (persisted to Firestore)
  const [notifications, setNotifications] = useState({
    weeklyReport: userProfile?.notifWeeklyReport ?? true,
    criticalAlerts: userProfile?.notifCriticalAlerts ?? true,
    billingUpdates: userProfile?.notifBillingUpdates ?? true,
  });

  const handleNotifToggle = async (key: keyof typeof notifications) => {
    const updated = { ...notifications, [key]: !notifications[key] };
    setNotifications(updated);
    if (user?.uid) {
      try {
        await setDoc(doc(db, "users", user.uid), {
          notifWeeklyReport: updated.weeklyReport,
          notifCriticalAlerts: updated.criticalAlerts,
          notifBillingUpdates: updated.billingUpdates,
        }, { merge: true });
      } catch (err) {
        console.error("Failed to save notification preferences", err);
      }
    }
  };

  const handleBillingPortal = async () => {
    if (!user?.uid) return;
    setLoading(true);
    try {
      const res = await fetch("/api/billing/portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.uid }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Could not open billing portal. Contact support.");
      }
    } catch (err) {
      alert("Failed to connect to billing portal.");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!user?.email) return;
    try {
      await sendPasswordResetEmail(auth, user.email);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error("Password reset error", err);
    }
  };

  // Local state for forms
  const [formData, setFormData] = useState({
    siteName: userProfile?.name || "",
    domain: userProfile?.domain || "",
    fullName: userProfile?.fullName || "",
    email: user?.email || "",
    autoMask: userProfile?.autoMask ?? true,
    sensitivity: userProfile?.sensitivity || "Medium (5 clicks)"
  });

  const handleSave = async () => {
    setLoading(true);
    try {
      if (activeTab === "general" || activeTab === "site") {
        await updateSiteConfig({
          name: formData.siteName,
          domain: formData.domain,
          autoMask: formData.autoMask,
          sensitivity: formData.sensitivity
        });
      }
      
      if (activeTab === "account") {
        await updateProfile({
          fullName: formData.fullName
        });
      }

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error("Save failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#020617] text-white flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-400">
      <Navbar />
      
      <div className="flex-grow pt-32 pb-24 max-w-7xl mx-auto px-6 w-full relative">
        <AnimatePresence>
          {saved && (
            <motion.div 
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="fixed top-24 left-1/2 -translate-x-1/2 z-[60] bg-emerald-500 text-white px-8 py-4 rounded-[2rem] font-black shadow-2xl shadow-emerald-500/20 flex items-center gap-3 border border-white/20 uppercase tracking-widest text-xs"
            >
              <ShieldCheck className="w-5 h-5" />
              Intelligence Updated
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Sidebar Navigation */}
          <aside className="lg:w-72 space-y-3">
            <h1 className="text-4xl font-black tracking-tighter mb-10 text-white">
              System<br/><span className="text-emerald-400">Settings</span>
            </h1>
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${
                  activeTab === tab.id 
                    ? "bg-emerald-500 text-white shadow-2xl shadow-emerald-500/20 scale-[1.05]" 
                    : "text-slate-500 hover:text-white hover:bg-white/5"
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </aside>

          {/* Main Content Area */}
          <div className="flex-grow">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="glass-card-dark rounded-[2.5rem] p-10 border border-white/5 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[100px] -mr-32 -mt-32" />
              {activeTab === "general" && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-xl font-bold mb-1">General Settings</h2>
                    <p className="text-slate-500 text-sm">Manage your basic site and profile information.</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Site Name</label>
                      <input 
                        type="text" 
                        value={formData.siteName}
                        onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#1D9E75] outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Primary Domain</label>
                      <input 
                        type="text" 
                        value={formData.domain}
                        onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#1D9E75] outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                     <h3 className="font-bold text-sm">Tracking Snippet</h3>
                     {userProfile?.siteId ? (
                       <TrackingSnippet siteId={userProfile.siteId} />
                     ) : (
                       <div className="bg-slate-900 animate-pulse h-32 rounded-2xl border border-slate-800" />
                     )}
                   <p className="text-[10px] text-slate-500">This code allows Forensiq to track sessions on your website. Paste it into your &lt;head&gt; tag.</p>
                  </div>
                </div>
              )}

              {activeTab === "account" && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-xl font-bold mb-1">Account Profile</h2>
                    <p className="text-slate-500 text-sm">Update your personal details and how we address you.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Full Name</label>
                      <input 
                        type="text" 
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#1D9E75] outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email Address</label>
                      <input 
                        type="email" 
                        value={formData.email}
                        disabled
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm opacity-50 cursor-not-allowed outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
                     <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">
                       {formData.fullName?.substring(0, 2).toUpperCase() || "??"}
                     </div>
                     <div>
                        <p className="text-sm font-bold">Profile Avatar</p>
                        <p className="text-[10px] uppercase tracking-widest font-bold text-slate-500">Photo upload — Coming Soon</p>
                     </div>
                  </div>
                </div>
              )}

              {activeTab === "site" && (
                <div className="space-y-8">
                   <div>
                    <h2 className="text-xl font-bold mb-1">Site Configuration</h2>
                    <p className="text-slate-500 text-sm">Fine-tune how SecondGuess interacts with your application.</p>
                  </div>
                  <div className="space-y-6">
                    <button 
                      onClick={() => setFormData({ ...formData, autoMask: !formData.autoMask })}
                      className="w-full flex items-center justify-between p-4 rounded-xl bg-slate-950 border border-slate-800"
                    >
                       <div className="text-left">
                          <p className="text-sm font-bold">Auto-mask Sensitive Inputs</p>
                          <p className="text-xs text-slate-500">Automatically hide password and credit card fields from replays.</p>
                       </div>
                       <div className={`w-10 h-5 rounded-full relative transition-colors ${formData.autoMask ? "bg-[#1D9E75]" : "bg-slate-800"}`}>
                         <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${formData.autoMask ? "right-1" : "left-1"}`} />
                       </div>
                    </button>
                    <div className="flex items-center justify-between p-4 rounded-xl bg-slate-950 border border-slate-800">
                       <div>
                          <p className="text-sm font-bold">Rage Click Sensitivity</p>
                          <p className="text-xs text-slate-500">Define how many clicks in 1s trigger a friction alert.</p>
                       </div>
                       <select 
                        value={formData.sensitivity}
                        onChange={(e) => setFormData({ ...formData, sensitivity: e.target.value })}
                        className="bg-slate-900 border border-slate-800 rounded-lg text-xs px-2 py-1 outline-none"
                       >
                          <option>High (3 clicks)</option>
                          <option>Medium (5 clicks)</option>
                          <option>Low (8 clicks)</option>
                       </select>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "billing" && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-xl font-bold mb-1">Subscription Plan</h2>
                    <p className="text-slate-500 text-sm">Manage your billing details and usage limits.</p>
                  </div>
                  <div className="p-8 rounded-2xl bg-gradient-to-br from-[#1D9E75]/20 to-transparent border border-[#1D9E75]/30 flex flex-col md:flex-row justify-between items-center gap-6">
                     <div>
                      <p className="text-xs font-bold text-[#1D9E75] uppercase tracking-widest mb-1">Current Plan</p>
                      <h3 className="text-3xl font-black">Pro Tier</h3>
                      <p className="text-slate-400 text-sm">£39.00 / month • Renews May 18, 2026</p>
                   </div>
                   <button 
                     onClick={handleBillingPortal}
                     disabled={loading}
                     className="bg-white text-slate-950 px-6 py-3 rounded-xl font-bold text-sm shadow-xl shadow-emerald-500/10 whitespace-nowrap active:scale-95 transition-transform disabled:opacity-50"
                   >
                     {loading ? "Connecting..." : "Manage in Stripe"}
                   </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Usage (Sessions)</p>
                        <div className="flex items-end gap-2 mb-2">
                           <span className="text-2xl font-bold">{usageCount.toLocaleString()}</span>
                           <span className="text-slate-600 text-sm mb-1">/ 10,000</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                           <div 
                            className="h-full bg-[#1D9E75] transition-all duration-1000" 
                            style={{ width: `${Math.min((usageCount / 10000) * 100, 100)}%` }} 
                           />
                        </div>
                     </div>
                     <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">AI Credits</p>
                        <div className="flex items-end gap-2 mb-2">
                           <span className="text-2xl font-bold">100</span>
                           <span className="text-slate-600 text-sm mb-1">/ 100</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                           <div className="h-full bg-blue-500 w-[100%]" />
                        </div>
                     </div>
                  </div>
                </div>
              )}

              {activeTab === "integrations" && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-xl font-bold mb-1">Integrations</h2>
                    <p className="text-slate-500 text-sm">Connect your third-party tools to enrich your session intelligence.</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {INTEGRATIONS.map((app) => {
                      const live = isLive(app.name.toLowerCase());
                      return (
                        <div key={app.name} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div 
                              className="w-12 h-12 rounded-xl p-2.5 flex items-center justify-center"
                              style={{ backgroundColor: `${app.color}15`, border: `1px solid ${app.color}30` }}
                            >
                               <img src={app.logo} alt={app.name} className="w-full h-full object-contain" style={{ filter: 'brightness(0) invert(1)' }} />
                            </div>
                            <div>
                               <p className="text-sm font-bold text-white">{app.name}</p>
                               <p className="text-[10px] text-slate-500">{app.description}</p>
                            </div>
                          </div>
                          
                          {live ? (
                            <div className="flex items-center gap-2">
                               <div className="px-2 py-1 bg-[#1D9E75]/10 border border-[#1D9E75]/20 rounded-lg text-[#1D9E75] text-[10px] font-bold flex items-center gap-1.5">
                                  <CheckCircle2 className="w-3 h-3" />
                                  LIVE
                                </div>
                               <button 
                                onClick={() => disconnectIntegration(app.name.toLowerCase())}
                                className="p-2 text-slate-600 hover:text-red-500 transition-colors"
                               >
                                  <Trash2 className="w-4 h-4" />
                               </button>
                            </div>
                          ) : (
                            <button 
                              onClick={() => {
                                setSelectedProvider(app);
                                setIsModalOpen(true);
                              }}
                              className="px-4 py-2 bg-slate-900 border border-slate-800 hover:border-slate-700 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all"
                            >
                              Connect
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  
                  <ConnectModal 
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    provider={selectedProvider}
                  />
                </div>
              )}

              {activeTab === "notifications" && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-xl font-bold mb-1">Notification Preferences</h2>
                    <p className="text-slate-500 text-sm">Control when and how you get alerted about user behavior.</p>
                  </div>
                  <div className="space-y-4">
                    {([
                      { key: "weeklyReport" as const, label: "Weekly Performance Report" },
                      { key: "criticalAlerts" as const, label: "Critical Signal Alerts" },
                      { key: "billingUpdates" as const, label: "Billing & Account Updates" },
                    ]).map(({ key, label }) => (
                      <div key={key} className="flex items-center justify-between p-4 rounded-xl bg-slate-950 border border-slate-800">
                         <span className="text-sm font-medium">{label}</span>
                         <button
                           onClick={() => handleNotifToggle(key)}
                           className={`w-10 h-5 rounded-full relative shadow-inner transition-colors ${notifications[key] ? 'bg-emerald-500' : 'bg-slate-700'}`}
                         >
                           <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${notifications[key] ? 'right-1' : 'left-1'}`} />
                         </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "security" && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-xl font-bold mb-1">Security & Access</h2>
                    <p className="text-slate-500 text-sm">Protect your workspace and sensitive behavioral data.</p>
                  </div>
                  <div className="space-y-6">
                    <div className="w-full flex items-center justify-between p-4 rounded-xl bg-slate-950 border border-slate-800">
                       <div className="text-left">
                          <p className="text-sm font-bold">Two-Factor Authentication</p>
                          <p className="text-xs text-slate-500">Add an extra layer of security to your account.</p>
                       </div>
                       <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest bg-amber-400/10 px-2 py-1 rounded">Coming Soon</span>
                    </div>
                    <button 
                      onClick={handlePasswordReset}
                      className="w-full flex items-center justify-between p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-colors"
                    >
                       <div className="text-left">
                          <p className="text-sm font-bold">Change Password</p>
                          <p className="text-xs text-slate-500">A reset link will be sent to your registered email.</p>
                       </div>
                       <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Send Reset Link →</span>
                    </button>
                  </div>
                </div>
              )}

              <div className="pt-10 border-t border-slate-800 flex justify-end gap-3">
                 <button className="text-slate-500 hover:text-white px-6 py-3 rounded-xl font-bold transition-all text-sm">Cancel</button>
                 <button 
                  onClick={handleSave}
                  disabled={loading}
                  className="bg-[#1D9E75] hover:bg-[#168562] disabled:opacity-50 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-xl shadow-[#1D9E75]/20 active:scale-95 flex items-center gap-2"
                 >
                   {loading && <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />}
                   {loading ? "Saving..." : "Save Changes"}
                 </button>
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}
