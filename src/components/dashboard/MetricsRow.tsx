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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
      {cards.map((card, idx) => (
        <div key={idx} className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className={`p-2.5 sm:p-3 rounded-xl sm:rounded-2xl ${card.bg}`}>
              <card.icon className={`w-5 sm:w-6 h-5 sm:h-6 ${card.color}`} />
            </div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider text-right">vs Last Week</span>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1 truncate">{card.value}</p>
          <p className="text-xs sm:text-sm font-medium text-slate-500 line-clamp-2">{card.label}</p>
        </div>
      ))}
    </div>
  );
};
