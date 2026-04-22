"use client";

import React, { useState } from "react";
import { Sparkles, Loader2, Lightbulb, ArrowRight, AlertCircle } from "lucide-react";

interface Insight {
  heading: string;
  body: string;
}

export const AIInsights = ({ siteId }: { siteId: string }) => {
  const [loading, setLoading] = useState(false);
  const [insights, setInsights] = useState<Insight[]>([]);
  const [error, setError] = useState("");

  const fetchInsights = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/insight", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ siteId }),
      });
      const data = await res.json();
      if (data.insights) {
        // Handle different possible JSON structures from LLM
        const list = Array.isArray(data.insights) ? data.insights : Object.values(data.insights)[0] || [];
        setInsights(Array.isArray(list) ? list.slice(0, 3) : []);
      } else {
        setError(data.error || "Could not generate insights. Please try again later.");
      }
    } catch (err) {
      setError("An error occurred while connecting to the AI engine.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden mt-8">
      <div className="p-6 sm:p-8 border-b border-slate-50 bg-gradient-to-r from-slate-900 to-slate-800 text-white flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-emerald-400 shrink-0" />
            <h3 className="text-lg sm:text-xl font-bold truncate">AI Drop-off Insights</h3>
          </div>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-xl">
            Claude parses your last 500 events to find hidden conversion killers and friction points in your funnel.
          </p>
        </div>
        
        <button
          onClick={fetchInsights}
          disabled={loading || !siteId}
          className="bg-[#1D9E75] hover:bg-[#168562] disabled:opacity-50 text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-900/40 shrink-0 text-sm"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <span className="whitespace-nowrap">Analyse drop-offs</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </>
          )}
        </button>
      </div>

      <div className="p-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <div className="flex gap-2">
                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce" />
            </div>
            <p className="text-slate-500 font-medium animate-pulse">Consulting the conversion engine...</p>
          </div>
        ) : error ? (
          <div className="flex items-center gap-3 p-4 bg-red-50 text-red-700 rounded-2xl border border-red-100">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        ) : insights.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {insights.map((insight, idx) => (
              <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:border-emerald-200 transition-colors group">
                <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Lightbulb className="w-5 h-5 text-emerald-600" />
                </div>
                <h4 className="font-bold text-slate-900 mb-2 leading-snug">{insight.heading}</h4>
                <p className="text-sm text-slate-600 leading-relaxed">{insight.body}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
               <Sparkles className="w-8 h-8 text-slate-200" />
            </div>
            <p className="text-slate-400 font-medium">Ready to uncover insights?</p>
            <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest font-bold">Click the button above to start AI analysis</p>
          </div>
        )}
      </div>
    </div>
  );
};
