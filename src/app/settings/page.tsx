"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Settings as SettingsIcon, User, Globe, Bell, CreditCard, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");

  const TABS = [
    { id: "general", label: "General", icon: SettingsIcon },
    { id: "account", label: "Account", icon: User },
    { id: "site", label: "Site Config", icon: Globe },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: ShieldCheck },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col">
      <Navbar />
      
      <div className="flex-grow pt-32 pb-24 max-w-7xl mx-auto px-6 w-full">
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
                     <button className="bg-[#1D9E75] hover:bg-[#168562] text-white px-8 py-3 rounded-xl font-bold transition-all shadow-xl shadow-[#1D9E75]/20 active:scale-95">
                       Save Changes
                     </button>
                  </div>
                </div>
              )}

              {activeTab !== "general" && (
                <div className="py-20 text-center space-y-4">
                   <SettingsIcon className="w-12 h-12 text-slate-700 mx-auto animate-spin-slow" />
                   <p className="text-slate-500 font-medium">This section is coming soon as part of the v2.0 update.</p>
                </div>
              )}
            </motion.div>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}
