"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { 
  Layout, 
  LogOut, 
  Settings, 
  Bell, 
  User as UserIcon,
  BarChart3,
  MousePointer2,
  Users,
  Zap,
  ShieldCheck,
  Code2,
  Menu,
  X,
  Loader2
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TrackingSnippet } from "@/components/dashboard/TrackingSnippet";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, logout, userProfile } = useAuth();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [siteHealth, setSiteHealth] = useState<'loading' | 'active' | 'offline'>('loading');

  // Site Health Check
  React.useEffect(() => {
    if (!userProfile?.siteId) return;
    
    const checkHealth = async () => {
      try {
        const eventsRef = collection(db, "sites", userProfile.siteId, "all_events");
        const q = query(eventsRef, orderBy("timestamp", "desc"), limit(1));
        const snapshot = await getDocs(q);
        
        if (snapshot.empty) {
          setSiteHealth('offline');
        } else {
          const lastEvent = snapshot.docs[0].data();
          const lastSeen = new Date(lastEvent.timestamp).getTime();
          const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
          setSiteHealth(lastSeen > oneDayAgo ? 'active' : 'offline');
        }
      } catch (err) {
        console.error("Health check failed", err);
        setSiteHealth('offline');
      }
    };

    checkHealth();
  }, [userProfile?.siteId]);

  const navItems = [
    { name: "Overview", href: "/dashboard", icon: Layout },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  const SidebarContent = () => (
    <>
      <div className="p-8">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 flex items-center justify-center transition-transform group-hover:scale-110">
            {/* Refractive Prism Logo */}
            <div className="absolute inset-0 bg-emerald-500 blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
            <svg viewBox="0 0 24 24" className="w-full h-full relative" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 3L2 21H22L12 3Z" className="stroke-emerald-400 stroke-[1.5]" />
              <path d="M12 3V21" className="stroke-emerald-400/30 stroke-[1]" />
              <path d="M7 12L17 12" className="stroke-emerald-400/30 stroke-[1]" />
              <path d="M12 3L17 21" className="stroke-emerald-400/50 stroke-[1]" />
              <path d="M12 3L7 21" className="stroke-emerald-400/50 stroke-[1]" />
            </svg>
          </div>
          <span className="text-2xl font-black tracking-tighter text-white">FORENSIQ</span>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                isActive 
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-lg shadow-emerald-500/5" 
                  : "text-slate-500 hover:text-slate-200 hover:bg-white/5"
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? "text-emerald-400" : "text-slate-400"}`} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Persistent Tracking Snippet */}
      <div className="p-6 mt-auto">
        <div className="mb-6 rounded-2xl overflow-hidden glass-card-dark border border-white/10">
           {userProfile?.siteId ? (
             <div className="p-1 scale-90 origin-top">
                <TrackingSnippet siteId={userProfile.siteId} />
             </div>
           ) : (
             <div className="bg-slate-800 animate-pulse h-32 rounded-2xl" />
           )}
        </div>
        
        <div className="pt-6 border-t border-white/5">
          <div className="flex items-center gap-3 px-2 mb-4">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-black text-sm">
              {user?.email?.[0].toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-black text-white truncate uppercase tracking-widest">{user?.email?.split('@')[0]}</p>
              <p className="text-[10px] text-emerald-500 font-black uppercase tracking-widest">Forensic Pro</p>
            </div>
            <button 
              onClick={logout}
              className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-400/5 rounded-xl transition-all"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <AuthGuard>
      <div className="min-h-screen bg-[#020617] flex font-sans">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex w-80 dark-mesh border-r border-white/5 flex-col sticky top-0 h-screen z-50">
          <SidebarContent />
        </aside>

        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-[#020617]/80 backdrop-blur-xl z-[60] lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Mobile Sidebar */}
        <aside className={`fixed inset-y-0 left-0 w-80 dark-mesh z-[70] flex flex-col transition-transform duration-500 ease-out lg:hidden ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="absolute top-6 right-6 lg:hidden">
            <button onClick={() => setIsSidebarOpen(false)} className="p-2 text-slate-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>
          <SidebarContent />
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-20 bg-[#020617]/40 backdrop-blur-3xl border-b border-white/5 px-4 sm:px-10 flex items-center justify-between sticky top-0 z-40">
            <div className="flex items-center gap-6">
               <button 
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2 -ml-2 text-slate-400 hover:text-white"
               >
                 <Menu className="w-6 h-6" />
               </button>
               <h2 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] hidden sm:block">
                 {navItems.find(i => i.href === pathname)?.name || "Dashboard"}
               </h2>
            </div>

            <div className="flex items-center gap-6 relative">
              <button 
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className="p-2.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-2xl transition-all relative"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-emerald-500 rounded-full border-2 border-[#020617]" />
              </button>

              {isNotifOpen && (
                <div className="absolute top-full right-0 mt-4 w-96 glass-card-dark border border-white/10 rounded-3xl shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)] z-50 overflow-hidden animate-fade-up">
                   <div className="p-6 border-b border-white/5 flex justify-between items-center">
                      <span className="text-sm font-black tracking-widest text-white uppercase">Neural Feed</span>
                      <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-lg font-black tracking-widest">2 ACTIVE</span>
                   </div>
                   <div className="max-h-[500px] overflow-y-auto">
                      <div className="p-6 hover:bg-white/[0.02] border-b border-white/5 transition-colors group">
                         <p className="text-xs font-black text-white group-hover:text-emerald-400 transition-colors uppercase tracking-widest">Cognitive Engine: ACTIVE</p>
                         <p className="text-[11px] text-slate-400 mt-2 leading-relaxed font-medium">Intelligence synchronization complete. Forensic patterns are now being mapped to your session data.</p>
                      </div>
                      <div className="p-6 hover:bg-white/[0.02] border-b border-white/5 transition-colors group">
                         <p className="text-xs font-black text-white group-hover:text-emerald-400 transition-colors uppercase tracking-widest">Site Signal: HEALTHY</p>
                         <p className="text-[11px] text-slate-400 mt-2 leading-relaxed font-medium">Real-time behavioral telemetry detected. Live session visualization is active.</p>
                      </div>
                   </div>
                </div>
              )}

              <div className="h-8 w-[1px] bg-white/5 mx-2" />
              
              <button 
                className={`flex items-center gap-3 px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.15em] transition-all shadow-2xl ${
                  siteHealth === 'active' 
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-emerald-500/5" 
                    : siteHealth === 'loading'
                      ? "bg-slate-900 text-slate-500 border border-white/5"
                      : "bg-red-500/10 text-red-400 border border-red-500/30 shadow-red-500/5"
                }`}
              >
                {siteHealth === 'loading' ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <ShieldCheck className="w-4 h-4" />
                )}
                <span className="hidden xs:inline">
                  {siteHealth === 'active' ? 'Signal Active' : siteHealth === 'loading' ? 'Syncing...' : 'Signal Offline'}
                </span>
              </button>
            </div>
          </header>

          <main className="flex-1 p-6 sm:p-10">
            <div className="max-w-[1600px] mx-auto animate-fade-up">
              {children}
            </div>
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
