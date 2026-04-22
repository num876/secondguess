"use client";

import React, { useState, useEffect } from "react";
import { Copy, ClipboardCheck, Code2, Terminal } from "lucide-react";

interface TrackingSnippetProps {
  siteId: string;
}

export function TrackingSnippet({ siteId }: TrackingSnippetProps) {
  const [copied, setCopied] = useState(false);
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const snippet = `<!-- SecondGuess Analytics -->
<script src="${origin || "https://secondguess.io"}/tracker.js?siteId=${siteId}" async></script>`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 shadow-2xl overflow-hidden relative group">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-emerald-500/20 rounded-md flex items-center justify-center">
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tracking Snippet</span>
        </div>
        <button
          onClick={copyToClipboard}
          className="text-slate-400 hover:text-white transition-colors"
          title="Copy to clipboard"
        >
          {copied ? (
            <ClipboardCheck className="w-4 h-4 text-emerald-400" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
      </div>

      <div className="relative">
        <pre className="text-[11px] font-mono text-emerald-300/90 leading-relaxed overflow-x-auto custom-scrollbar pb-2">
          {snippet}
        </pre>
        <div className="absolute inset-x-0 bottom-0 h-4 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none" />
      </div>

      <div className="mt-3 pt-3 border-t border-slate-800 flex items-center gap-2">
        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
        <span className="text-[9px] font-medium text-slate-500">Paste this into your &lt;head&gt; tag</span>
      </div>
      
      {/* Glow effect on hover */}
      <div className="absolute -inset-px bg-gradient-to-r from-emerald-500/0 via-emerald-500/10 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </div>
  );
}
