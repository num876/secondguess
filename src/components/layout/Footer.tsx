"use client";

import React from "react";
import Link from "next/link";


export const Footer = () => {
  return (
    <footer className="bg-slate-950 pt-20 pb-10 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-9 h-9 flex items-center justify-center transition-transform group-hover:scale-110">
                <div className="absolute inset-0 bg-emerald-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity" />
                <svg viewBox="0 0 24 24" className="w-full h-full relative" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 3L2 21H22L12 3Z" className="stroke-emerald-400 stroke-[1.5]" />
                  <path d="M12 3V21" className="stroke-emerald-400/30 stroke-[1]" />
                  <path d="M7 12L17 12" className="stroke-emerald-400/30 stroke-[1]" />
                  <path d="M12 3L17 21" className="stroke-emerald-400/50 stroke-[1]" />
                  <path d="M12 3L7 21" className="stroke-emerald-400/50 stroke-[1]" />
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight text-white">FORENSIQ</span>
            </Link>
            <p className="text-slate-500 max-w-xs leading-relaxed font-light">
              Session intelligence. Uncover the hidden WHY.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6">Product</h4>
            <ul className="space-y-4 text-slate-500 text-sm">
              <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="/integrations" className="hover:text-white transition-colors">Integrations</Link></li>
              <li><Link href="/docs/installation" className="hover:text-white transition-colors">Installation</Link></li>
              <li><Link href="/settings" className="hover:text-white transition-colors">Settings</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-slate-500 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Connect</h4>
            <ul className="space-y-4 text-slate-500 text-sm">
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Support</Link></li>
              <li><a href="https://twitter.com/secondguess" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Twitter (X)</a></li>
              <li><a href="https://github.com/secondguess" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-slate-600 text-xs">
            © {new Date().getFullYear()} FORENSIQ Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
             <div className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-emerald-500" />
               <p className="text-xs text-slate-500 font-medium">All systems operational</p>
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
