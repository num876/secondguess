"use client";

import React, { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, query, orderBy, limit } from "firebase/firestore";
import { Activity, Clock, Globe, User } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface LiveSession {
  id: string;
  visitorId: string;
  currentUrl: string;
  lastSeen: string;
  signals: string[];
  sessionStart: string;
}

export const LiveSessions = ({ siteId }: { siteId: string }) => {
  const [sessions, setSessions] = useState<LiveSession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!siteId) return;

    const q = query(
      collection(db, "sessions", siteId, "live"),
      orderBy("lastSeen", "desc"),
      limit(20)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const liveData: LiveSession[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as any),
      }));
      setSessions(liveData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [siteId]);

  const getSignalColor = (signal: string) => {
    switch (signal.toLowerCase()) {
      case "converted": return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "exit intent": return "bg-amber-100 text-amber-700 border-amber-200";
      case "rage click": return "bg-red-100 text-red-700 border-red-200";
      case "form drop": return "bg-blue-100 text-blue-700 border-blue-200";
      default: return "bg-slate-100 text-slate-600 border-slate-200";
    }
  };

  const getTimeOnSite = (startTime: string) => {
    const diff = Date.now() - new Date(startTime).getTime();
    const mins = Math.floor(diff / 60000);
    const secs = Math.floor((diff % 60000) / 1000);
    return `${mins}m ${secs}s`;
  };

  if (loading) return <div className="p-8 text-center text-slate-500 font-medium">Listening for live sessions...</div>;

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col h-full">
      <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-[#1D9E75]" />
          <h3 className="font-bold text-slate-900">Live Sessions</h3>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-100 rounded-full">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest">{sessions.length} Active</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {sessions.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
               <Globe className="w-8 h-8 text-slate-200" />
            </div>
            <p className="text-slate-400 font-medium">No live sessions yet.</p>
            <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest">Connect your site to start tracking</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-50">
            {sessions.map((session) => (
              <div key={session.id} className="p-4 hover:bg-slate-50 transition-colors group">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                      <User className="w-5 h-5 text-slate-400 group-hover:text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">Visitor {session.visitorId.substring(0, 4).toUpperCase()}</p>
                      <div className="flex items-center gap-1 text-[10px] text-slate-500 font-medium">
                        <Clock className="w-3 h-3" />
                        {getTimeOnSite(session.sessionStart)}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 justify-end max-w-[120px]">
                    {session.signals.length === 0 ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-400 border border-slate-200">
                        Idle
                      </span>
                    ) : (
                      session.signals.map((signal, idx) => (
                        <span 
                          key={idx} 
                          className={cn(
                            "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border",
                            getSignalColor(signal)
                          )}
                        >
                          {signal}
                        </span>
                      ))
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100 truncate">
                  <Globe className="w-3 h-3 shrink-0" />
                  <span className="truncate">{session.currentUrl}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
