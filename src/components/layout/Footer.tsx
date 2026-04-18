"use client";

import React from "react";
import Link from "next/link";
import { Layout } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-slate-950 pt-20 pb-10 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-[#1D9E75] rounded-lg flex items-center justify-center shadow-lg shadow-[#1D9E75]/20">
                <Layout className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">SecondGuess</span>
            </Link>
            <p className="text-slate-500 max-w-xs leading-relaxed font-light">
              AI-powered session intelligence for high-growth product teams. Stop guessing, start knowing.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6">Product</h4>
            <ul className="space-y-4 text-slate-500 text-sm">
              <li><Link href="#features" className="hover:text-white transition-colors">Features</Link></li>
              <li><Link href="/docs/installation" className="hover:text-white transition-colors">Installation</Link></li>
              <li><Link href="/settings" className="hover:text-white transition-colors">Settings</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-slate-500 text-sm">
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">About Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Connect</h4>
            <ul className="space-y-4 text-slate-500 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Twitter (X)</a></li>
              <li><a href="#" className="hover:text-white transition-colors">GitHub</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Discord</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-slate-600 text-xs">
            © {new Date().getFullYear()} SecondGuess Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
             <div className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-[#1D9E75]" />
               <p className="text-xs text-slate-500 font-medium">All systems operational</p>
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
