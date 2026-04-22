"use client";

import React from "react";
import { TrendingDown, Filter, ChevronRight } from "lucide-react";

interface FunnelStep {
  url: string;
  visits: number;
  percentage: number;
  dropOff: number;
}

export const ConversionFunnel = ({ steps }: { steps: FunnelStep[] }) => {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-100 shadow-sm">
      <div className="flex items-center gap-2 mb-4 sm:mb-6">
        <Filter className="w-5 h-5 text-[#1D9E75]" />
        <h3 className="font-bold text-base sm:text-lg text-slate-900">Conversion Funnel</h3>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {steps.map((step, idx) => {
          // Color based on drop-off severity
          const barColor = step.dropOff > 50 ? "from-red-500 to-red-600 shadow-red-100" : 
                           step.dropOff > 20 ? "from-amber-500 to-amber-600 shadow-amber-100" : 
                           "from-[#1D9E75] to-[#168562] shadow-emerald-100";

          return (
            <div key={idx} className="relative">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0 mb-2">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <span className="w-5 h-5 flex items-center justify-center bg-slate-100 rounded text-xs font-bold text-slate-500 shrink-0">
                    {idx + 1}
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-700 truncate">{step.url}</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 text-right sm:text-left shrink-0">
                    <span className="text-sm sm:text-base font-bold text-slate-900">{step.percentage}%</span>
                    <span className="text-xs font-medium text-slate-400">{step.visits} visits</span>
                </div>
              </div>

              <div className="h-2.5 sm:h-3 w-full bg-slate-50 rounded-full overflow-hidden mb-2">
                <div 
                  className={`h-full bg-gradient-to-r ${barColor} transition-all duration-1000 shadow-lg`}
                  style={{ width: `${step.percentage}%` }}
                />
              </div>

              {idx < steps.length - 1 && (
                <div className="flex justify-center -my-1">
                  <div className="bg-red-50 text-red-600 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-bold border border-red-100 flex items-center gap-1 z-10">
                    <TrendingDown className="w-3 h-3 shrink-0" />
                    <span>-{step.dropOff}%</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
