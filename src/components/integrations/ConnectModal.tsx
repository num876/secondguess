"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Zap, ShieldCheck, AlertCircle, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface ConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  provider: {
    name: string;
    logo: string;
    color: string;
  } | null;
}

export function ConnectModal({ isOpen, onClose, provider }: ConnectModalProps) {
  const { userProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [config, setConfig] = useState<Record<string, string>>({});

  if (!provider) return null;

  const handleConnect = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userProfile?.siteId) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/integrations/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          siteId: userProfile.siteId,
          provider: provider.name.toLowerCase(),
          config
        })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to connect integration");
      }

      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getFields = () => {
    switch (provider.name.toLowerCase()) {
      case "shopify":
        return [
          { key: "shopUrl", label: "Shopify Store URL", placeholder: "my-store.myshopify.com", type: "text" },
          { key: "accessToken", label: "Admin API Access Token", placeholder: "shpat_...", type: "password" }
        ];
      case "stripe":
        return [
          { key: "secretKey", label: "Secret Key", placeholder: "sk_test_...", type: "password" },
          { key: "webhookSecret", label: "Webhook Signing Secret", placeholder: "whsec_...", type: "password" }
        ];
      case "slack":
        return [
          { key: "webhookUrl", label: "Incoming Webhook URL", placeholder: "https://hooks.slack.com/services/...", type: "text" }
        ];
      case "webflow":
        return [
          { key: "apiToken", label: "API Token", placeholder: "wf_...", type: "password" },
          { key: "siteId", label: "Site ID", placeholder: "60f...", type: "text" }
        ];
      case "segment":
        return [
          { key: "writeKey", label: "Write Key", placeholder: "...", type: "password" }
        ];
      case "wordpress":
        return [
          { key: "siteUrl", label: "WordPress Site URL", placeholder: "https://example.com", type: "text" },
          { key: "apiKey", label: "Plugin Authorization Key", placeholder: "...", type: "password" }
        ];
      default:
        return [
          { key: "apiKey", label: "API Key", placeholder: "Your API Key", type: "password" }
        ];
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-[32px] overflow-hidden shadow-2xl p-8"
          >
            <button onClick={onClose} className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors">
              <X className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-4 mb-8">
               <div 
                className="w-14 h-14 rounded-2xl p-3 flex items-center justify-center shadow-lg"
                style={{ backgroundColor: `${provider.color}20`, border: `1px solid ${provider.color}40` }}
               >
                  <img src={provider.logo} alt={provider.name} className="w-8 h-8 object-contain" style={{ filter: 'brightness(0) invert(1)' }} />
               </div>
               <div>
                  <h2 className="text-xl font-bold text-white">Connect {provider.name}</h2>
                  <p className="text-sm text-slate-500">Configure your connection credentials</p>
               </div>
            </div>

            <form onSubmit={handleConnect} className="space-y-6">
              {getFields().map((field) => (
                <div key={field.key} className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">{field.label}</label>
                  <input
                    type={field.type}
                    required
                    placeholder={field.placeholder}
                    value={config[field.key] || ""}
                    onChange={(e) => setConfig({ ...config, [field.key]: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:ring-2 focus:ring-[#1D9E75] outline-none transition-all placeholder:text-slate-700"
                  />
                </div>
              ))}

              {error && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-500 text-sm">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  {error}
                </div>
              )}

              <div className="pt-4 space-y-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#1D9E75] hover:bg-[#168562] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all shadow-xl shadow-[#1D9E75]/20 disabled:opacity-50"
                >
                  {loading ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Authenticating...</>
                  ) : (
                    <><Zap className="w-5 h-5 fill-white" /> Connect Integration</>
                  )}
                </button>
                
                <div className="flex items-center justify-center gap-2 text-slate-500">
                  <ShieldCheck className="w-4 h-4 text-[#1D9E75]" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">TLS 1.3 AES-256 Encrypted</span>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
