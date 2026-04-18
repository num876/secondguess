"use client";

import React from "react";
import { MousePointer2, Clock, Map } from "lucide-react";

interface SectionStat {
  section: string;
  reach: number;
  avgTime: string;
}

export const HeatmapView = ({ sections, pageName }: { sections: SectionStat[], pageName: string }) => {
  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Map className="w-5 h-5 text-[#1D9E75]" />
          <h3 className="font-bold text-slate-900">Engagement Heatmap</h3>
        </div>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 py-1 bg-slate-50 rounded-lg">
          On: {pageName}
        </span>
      </div>

      <div className="space-y-6">
        {sections.map((stat, idx) => (
          <div key={idx} className="space-y-2">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-xs font-bold text-slate-900 capitalize">{stat.section}</p>
                <div className="flex items-center gap-2 mt-0.5">
                    <div className="flex items-center gap-1 text-[10px] text-slate-400 font-medium">
                        <MousePointer2 className="w-3 h-3" />
                        {stat.reach}% reach
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-slate-400 font-medium">
                        <Clock className="w-3 h-3" />
                        {stat.avgTime}
                    </div>
                </div>
              </div>
              <span className="text-lg font-black text-slate-100">#{idx + 1}</span>
            </div>

            <div className="h-8 w-full bg-slate-50 rounded-xl relative overflow-hidden group">
              <div 
                className="h-full bg-emerald-500/20 group-hover:bg-emerald-500/30 transition-all duration-500"
                style={{ width: `${stat.reach}%` }}
              />
              <div 
                className="absolute top-0 left-0 h-full border-r-2 border-emerald-500 shadow-[2px_0_10px_rgba(16,185,129,0.3)] transition-all duration-1000"
                style={{ width: `${stat.reach}%` }}
              />
              <div className="absolute inset-0 flex items-center px-3 pointer-events-none">
                <span className="text-[10px] font-bold text-emerald-800 opacity-0 group-hover:opacity-100 transition-opacity">
                    {stat.reach}% of visitors viewed this section
                </span>
              </div>
            </div>
          </div>
        ))}

        {sections.length === 0 && (
          <div className="py-12 border-2 border-dashed border-slate-100 rounded-3xl flex flex-col items-center justify-center text-center">
             <Map className="w-8 h-8 text-slate-100 mb-2" />
             <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">No section data yet</p>
             <p className="text-[10px] text-slate-300 mt-1">Add data-section attributes to your HTML elements</p>
          </div>
        )}
      </div>
    </div>
  );
};
