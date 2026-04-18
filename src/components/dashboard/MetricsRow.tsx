"use client";

import React from "react";
import { Users, Clock, ArrowDownCircle, Target } from "lucide-react";

interface MetricsRowProps {
  stats: {
    visitors: number;
    avgDuration: string;
    dropOffRate: string;
    conversions: number;
  };
}

export const MetricsRow = ({ stats }: MetricsRowProps) => {
  const cards = [
    {
      label: "Visitors Today",
      value: stats.visitors.toLocaleString(),
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      label: "Avg. Session Duration",
      value: stats.avgDuration,
      icon: Clock,
      color: "text-emerald-600",
      bg: "bg-emerald-50"
    },
    {
      label: "Drop-off Rate",
      value: stats.dropOffRate,
      icon: ArrowDownCircle,
      color: "text-amber-600",
      bg: "bg-amber-50"
    },
    {
      label: "Conversions",
      value: stats.conversions.toLocaleString(),
      icon: Target,
      color: "text-indigo-600",
      bg: "bg-indigo-50"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, idx) => (
        <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-2xl ${card.bg}`}>
              <card.icon className={`w-6 h-6 ${card.color}`} />
            </div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">vs Last Week</span>
          </div>
          <p className="text-3xl font-bold text-slate-900 mb-1">{card.value}</p>
          <p className="text-sm font-medium text-slate-500">{card.label}</p>
        </div>
      ))}
    </div>
  );
};
