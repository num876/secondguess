"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, Target, MousePointer2, LogOut } from "lucide-react";

interface InsightData {
  icon: React.ElementType;
  text: string;
  color: string;
  delay: number;
}

const INSIGHTS: InsightData[] = [
  { icon: Zap, text: "Rage Click detected at /checkout", color: "#EF4444", delay: 0 },
  { icon: Target, text: "Conversion path identified", color: "#1D9E75", delay: 2 },
  { icon: MousePointer2, text: "Unusual friction on Search bar", color: "#F59E0B", delay: 4 },
  { icon: LogOut, text: "Exit intent detected at Pricing", color: "#6366F1", delay: 6 },
];

export const InsightCard = ({ index }: { index: number }) => {
  const insight = INSIGHTS[index % INSIGHTS.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ 
        opacity: [0, 1, 1, 0],
        y: [20, 0, -10, -30],
        scale: [0.9, 1, 1, 0.95]
      }}
      transition={{ 
        duration: 5,
        delay: insight.delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="absolute p-4 rounded-xl bg-slate-800/40 border border-slate-700/50 backdrop-blur-md shadow-2xl flex items-center gap-3 w-64"
      style={{ 
        left: `${15 + (index * 20) % 60}%`,
        top: `${20 + (index * 25) % 60}%`
      }}
    >
      <div className="p-2 rounded-lg" style={{ backgroundColor: `${insight.color}20` }}>
        <insight.icon className="w-4 h-4" style={{ color: insight.color }} />
      </div>
      <p className="text-xs font-semibold text-slate-200 leading-tight">
        {insight.text}
      </p>
    </motion.div>
  );
};
