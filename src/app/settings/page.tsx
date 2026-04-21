"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Settings as SettingsIcon, User, Globe, Bell, CreditCard, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [saved, setSaved] = useState(false);

  const TABS = [
    { id: "general", label: "General", icon: SettingsIcon },
    { id: "account", label: "Account", icon: User },
    { id: "site", label: "Site Config", icon: Globe },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: ShieldCheck },
  ];

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col">
      <Navbar />
      
      <div className="flex-grow pt-32 pb-24 max-w-7xl mx-auto px-6 w-full relative">
        <AnimatePresence>
          {saved && (
            <motion.div 
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="fixed top-24 left-1/2 -translate-x-1/2 z-[60] bg-[#1D9E75] text-white px-6 py-3 rounded-2xl font-bold shadow-2xl flex items-center gap-3 border border-white/20"
            >
              <ShieldCheck className="w-5 h-5" />
              Settings updated successfully
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar Navigation */}
          <aside className="lg:w-64 space-y-2">
            <h1 className="text-3xl font-black tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-500">
              Settings
            </h1>
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                  activeTab === tab.id 
                    ? "bg-[#1D9E75] text-white shadow-lg shadow-[#1D9E75]/20 scale-[1.02]" 
                    : "text-slate-500 hover:text-slate-200 hover:bg-slate-900"
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
              transition={{ duration: 0.3 }}
              className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 backdrop-blur-sm"
            >
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
                        defaultValue="My Awesome Website"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#1D9E75] outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Primary Domain</label>
                      <input 
                        type="text" 
                        defaultValue="example.com"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#1D9E75] outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-[#1D9E75]/5 border border-[#1D9E75]/20">
                     <h3 className="font-bold mb-2">Your Site ID</h3>
                     <code className="text-[#1D9E75] font-mono text-sm bg-[#1D9E75]/10 px-3 py-1 rounded-lg">SG-8291-K28L</code>
                     <p className="mt-4 text-xs text-slate-500">This ID is used in your tracking snippet. Do not share it publicly.</p>
                  </div>

                  <div className="pt-6 border-t border-slate-800 flex justify-end">
                     <button 
                      onClick={handleSave}
                      className="bg-[#1D9E75] hover:bg-[#168562] text-white px-8 py-3 rounded-xl font-bold transition-all shadow-xl shadow-[#1D9E75]/20 active:scale-95"
                     >
                       Save Changes
                     </button>
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
                        placeholder="Alex Rivera"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#1D9E75] outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email Address</label>
                      <input 
                        type="email" 
                        placeholder="alex@example.com"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#1D9E75] outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
                     <div className="w-12 h-12 rounded-full bg-[#1D9E75]/10 flex items-center justify-center text-[#1D9E75] font-bold">AR</div>
                     <div>
                        <p className="text-sm font-bold">Profile Avatar</p>
                        <button className="text-[10px] uppercase tracking-widest font-bold text-[#1D9E75] hover:underline">Change Photo</button>
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
                    <div className="flex items-center justify-between p-4 rounded-xl bg-slate-950 border border-slate-800">
                       <div>
                          <p className="text-sm font-bold">Auto-mask Sensitive Inputs</p>
                          <p className="text-xs text-slate-500">Automatically hide password and credit card fields from replays.</p>
                       </div>
                       <div className="w-10 h-5 bg-[#1D9E75] rounded-full relative shadow-inner"><div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" /></div>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-xl bg-slate-950 border border-slate-800">
                       <div>
                          <p className="text-sm font-bold">Rage Click Sensitivity</p>
                          <p className="text-xs text-slate-500">Define how many clicks in 1s trigger a friction alert.</p>
                       </div>
                       <select className="bg-slate-900 border border-slate-800 rounded-lg text-xs px-2 py-1 outline-none">
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
                     <button className="bg-white text-slate-950 px-6 py-3 rounded-xl font-bold text-sm shadow-xl shadow-[#1D9E75]/10 whitespace-nowrap active:scale-95 transition-transform">
                        Manage in Stripe
                     </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Usage (Sessions)</p>
                        <div className="flex items-end gap-2 mb-2">
                           <span className="text-2xl font-bold">4,291</span>
                           <span className="text-slate-600 text-sm mb-1">/ 10,000</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                           <div className="h-full bg-[#1D9E75] w-[42%]" />
                        </div>
                     </div>
                     <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">AI Credits</p>
                        <div className="flex items-end gap-2 mb-2">
                           <span className="text-2xl font-bold">84</span>
                           <span className="text-slate-600 text-sm mb-1">/ 250</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                           <div className="h-full bg-blue-500 w-[33%]" />
                        </div>
                     </div>
                  </div>
                </div>
              )}

              {activeTab === "notifications" && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-xl font-bold mb-1">Notification Preferences</h2>
                    <p className="text-slate-500 text-sm">Control when and how you get alerted about user behavior.</p>
                  </div>
                  <div className="space-y-4">
                    {["Weekly Performance Report", "Critical Signal Alerts", "Billing & Account Updates"].map(n => (
                      <div key={n} className="flex items-center justify-between p-4 rounded-xl bg-slate-950 border border-slate-800">
                         <span className="text-sm font-medium">{n}</span>
                         <div className="w-10 h-5 bg-[#1D9E75] rounded-full relative shadow-inner"><div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" /></div>
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
                    <button className="w-full flex items-center justify-between p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-colors group">
                       <div className="text-left">
                          <p className="text-sm font-bold">Two-Factor Authentication</p>
                          <p className="text-xs text-slate-500">Add an extra layer of security to your account.</p>
                       </div>
                       <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest bg-red-400/10 px-2 py-1 rounded">Disabled</span>
                    </button>
                    <button className="w-full flex items-center justify-between p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-colors">
                       <div className="text-left">
                          <p className="text-sm font-bold">Change Password</p>
                          <p className="text-xs text-slate-500">Update your account password regularly.</p>
                       </div>
                       <Link href="/login" className="text-[10px] font-bold text-[#1D9E75] uppercase tracking-widest hover:underline">Reset</Link>
                    </button>
                  </div>
                </div>
              )}

              <div className="pt-10 border-t border-slate-800 flex justify-end gap-3">
                 <button className="text-slate-500 hover:text-white px-6 py-3 rounded-xl font-bold transition-all text-sm">Cancel</button>
                 <button 
                  onClick={handleSave}
                  className="bg-[#1D9E75] hover:bg-[#168562] text-white px-8 py-3 rounded-xl font-bold transition-all shadow-xl shadow-[#1D9E75]/20 active:scale-95"
                 >
                   Save Changes
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
