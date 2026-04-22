"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Layout, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

  const NAV_LINKS = [
    { label: "Features", href: "/#features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Integrations", href: "/integrations" }
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
      scrolled ? "bg-slate-950/95 backdrop-blur-3xl border-b border-white/5 py-3 shadow-2xl" : "bg-transparent py-6"
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 flex items-center justify-center transition-transform group-hover:scale-110">
            <div className="absolute inset-0 bg-emerald-500 blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
            <svg viewBox="0 0 24 24" className="w-full h-full relative" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 3L2 21H22L12 3Z" className="stroke-emerald-400 stroke-[1.5]" />
              <path d="M12 3V21" className="stroke-emerald-400/30 stroke-[1]" />
              <path d="M7 12L17 12" className="stroke-emerald-400/30 stroke-[1]" />
              <path d="M12 3L17 21" className="stroke-emerald-400/50 stroke-[1]" />
              <path d="M12 3L7 21" className="stroke-emerald-400/50 stroke-[1]" />
            </svg>
          </div>
          <span className="text-2xl font-black tracking-tighter text-white uppercase">Forensiq</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10">
          <div className="flex items-center gap-8 relative px-4 py-2 bg-white/5 rounded-full border border-white/5">
            {NAV_LINKS.map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                onMouseEnter={() => setHoveredPath(link.href)}
                onMouseLeave={() => setHoveredPath(null)}
                className="relative text-slate-400 hover:text-white transition-colors text-sm font-black uppercase tracking-wider z-10"
              >
                {link.label}
                {hoveredPath === link.href && (
                  <motion.div
                    layoutId="laser-nav"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </Link>
            ))}
          </div>
          <div className="h-4 w-px bg-white/10" />
          <Link href="/login" className="text-slate-400 hover:text-white transition-colors text-sm font-black uppercase tracking-wider">Log In</Link>
          <Link 
            href="/login" 
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-8 py-3 rounded-full text-sm font-black uppercase tracking-wider shadow-2xl shadow-emerald-500/20 transition-all hover:scale-[1.05] active:scale-[0.95]"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white p-2 touch-target hover:bg-white/10 rounded-lg transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full inset-x-0 bg-slate-950 border-b border-white/5 p-4 sm:p-8 flex flex-col gap-4 md:hidden backdrop-blur-3xl max-h-[calc(100vh-80px)] overflow-y-auto"
          >
            <Link 
              href="/#features" 
              onClick={() => setMobileMenuOpen(false)} 
              className="text-slate-400 hover:text-white py-3 px-4 text-sm font-black uppercase tracking-wider border-b border-white/5 transition-colors touch-target"
            >
              Features
            </Link>
            <Link 
              href="/pricing" 
              onClick={() => setMobileMenuOpen(false)} 
              className="text-slate-400 hover:text-white py-3 px-4 text-sm font-black uppercase tracking-wider border-b border-white/5 transition-colors touch-target"
            >
              Pricing
            </Link>
            <Link 
              href="/integrations" 
              onClick={() => setMobileMenuOpen(false)} 
              className="text-slate-400 hover:text-white py-3 px-4 text-sm font-black uppercase tracking-wider border-b border-white/5 transition-colors touch-target"
            >
              Integrations
            </Link>
            <Link 
              href="/login" 
              onClick={() => setMobileMenuOpen(false)} 
              className="text-white py-3 px-4 text-sm font-black uppercase tracking-wider transition-colors touch-target"
            >
              Log In
            </Link>
            <Link 
              href="/login" 
              onClick={() => setMobileMenuOpen(false)} 
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-center py-4 px-4 rounded-full text-sm font-black uppercase tracking-wider shadow-2xl shadow-emerald-500/20 transition-all touch-target"
            >
              Get Started
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
