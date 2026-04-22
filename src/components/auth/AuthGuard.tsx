"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#020617] gap-6">
        <div className="relative">
          <div className="absolute inset-0 bg-emerald-500/20 blur-2xl rounded-full" />
          <div className="relative w-12 h-12 rounded-full border-2 border-white/5 border-t-emerald-500 animate-spin" />
        </div>
        <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em] animate-pulse">
          Syncing Intelligence...
        </p>
      </div>
    );
  }

  return <>{children}</>;
};
