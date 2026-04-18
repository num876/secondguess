"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Layout, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-slate-950/80 backdrop-blur-md border-b border-slate-800 py-4" : "bg-transparent py-6"
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-[#1D9E75] rounded-xl flex items-center justify-center shadow-lg shadow-[#1D9E75]/20 ring-1 ring-[#1D9E75]/30 group-hover:scale-105 transition-transform">
            <Layout className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-white">SecondGuess</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Features</Link>
          <Link href="/docs/installation" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Docs</Link>
          <Link href="/settings" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Settings</Link>
          <div className="h-4 w-px bg-slate-800" />
          <Link href="/login" className="text-white hover:text-[#1D9E75] transition-colors text-sm font-bold">Log In</Link>
          <Link 
            href="/login" 
            className="bg-[#1D9E75] hover:bg-[#168562] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-[#1D9E75]/20 transition-all hover:scale-[1.05] active:scale-[0.95]"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full inset-x-0 bg-slate-900 border-b border-slate-800 p-6 flex flex-col gap-4 md:hidden backdrop-blur-xl"
          >
            <Link href="#features" onClick={() => setMobileMenuOpen(false)} className="text-slate-300 py-2 font-medium">Features</Link>
            <Link href="/docs/installation" onClick={() => setMobileMenuOpen(false)} className="text-slate-300 py-2 font-medium">Docs</Link>
            <Link href="/settings" onClick={() => setMobileMenuOpen(false)} className="text-slate-300 py-2 font-medium">Settings</Link>
            <div className="h-px bg-slate-800 w-full" />
            <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="text-white py-2 font-bold">Log In</Link>
            <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="bg-[#1D9E75] text-white text-center py-3 rounded-xl font-bold">Get Started</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
