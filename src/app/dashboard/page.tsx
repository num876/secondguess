"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { MetricsRow } from "@/components/dashboard/MetricsRow";
import { LiveSessions } from "@/components/dashboard/LiveSessions";
import { ConversionFunnel } from "@/components/dashboard/ConversionFunnel";
import { HeatmapView } from "@/components/dashboard/HeatmapView";
import { AIInsights } from "@/components/dashboard/AIInsights";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, orderBy, limit } from "firebase/firestore";
import { Loader2, Layout as LayoutIcon } from "lucide-react";

export default function DashboardPage() {
  const { userProfile } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    visitors: 0,
    avgDuration: "0m 0s",
    dropOffRate: "0%",
    conversions: 0
  });
  const [funnelSteps, setFunnelSteps] = useState<any[]>([]);
  const [heatmapSections, setHeatmapSections] = useState<any[]>([]);

  useEffect(() => {
    if (!userProfile?.siteId) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        // In a real app, you'd use a cloud function or complex aggregation
        // Here we'll do a simple fetch and aggregate client-side for the demo
        const eventsRef = collection(db, "events", userProfile.siteId, "sessions");
        const sessionsSnapshot = await getDocs(eventsRef);
        
        let totalVisitors = sessionsSnapshot.size;
        let convertedSessions = 0;
        let totalDuration = 0;

        // Mock/Simplified aggregation logic
        // This would normally be calculated from the events/{sessionId}/events subcollection
        setStats({
          visitors: totalVisitors || 0,
          avgDuration: "4m 12s",
          dropOffRate: totalVisitors ? `${Math.round(((totalVisitors - 24) / totalVisitors) * 100)}%` : "0%",
          conversions: 24
        });

        // Mock Funnel Data (Simulating URL visit counts)
        setFunnelSteps([
          { url: "/", visits: totalVisitors || 1240, percentage: 100, dropOff: 24 },
          { url: "/pricing", visits: 942, percentage: 76, dropOff: 42 },
          { url: "/checkout", visits: 546, percentage: 44, dropOff: 65 },
          { url: "/success", visits: 191, percentage: 15, dropOff: 0 },
        ]);

        // Mock Heatmap Data
        setHeatmapSections([
          { section: "hero-section", reach: 98, avgTime: "45s" },
          { section: "features-grid", reach: 74, avgTime: "1m 12s" },
          { section: "pricing-table", reach: 42, avgTime: "2m 05s" },
          { section: "footer-cta", reach: 15, avgTime: "12s" },
        ]);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userProfile?.siteId]);

  if (!userProfile?.siteId) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
                <LayoutIcon className="w-8 h-8 text-slate-300" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Setting up your dashboard...</h2>
            <p className="text-slate-500 max-w-xs mx-auto mt-2">We're preparing your session intelligence workspace.</p>
        </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Intelligence Overview</h1>
          <p className="text-slate-500 font-medium">Monitoring site ID: <span className="text-emerald-600 font-bold">{userProfile.siteId}</span></p>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-white px-4 py-2 rounded-xl border border-slate-100 shadow-sm">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          Live Tracking Enabled
        </div>
      </div>

      <MetricsRow stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <ConversionFunnel steps={funnelSteps} />
          <HeatmapView sections={heatmapSections} pageName="/pricing" />
        </div>
        <div className="lg:col-span-1 border-l border-slate-100 pl-0 lg:pl-8">
          <LiveSessions siteId={userProfile.siteId} />
        </div>
      </div>

      <AIInsights siteId={userProfile.siteId} />
    </div>
  );
}
