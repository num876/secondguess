"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Search, Tag, Calendar, User, ArrowRight } from "lucide-react";
import Link from "next/link";

const CATEGORIES = ["All", "Product Updates", "CRO Tips", "Engineering", "Case Studies"];

const POSTS = [
  {
    id: 1,
    title: "Introducing AI-Powered Rage Click Detection",
    excerpt: "Stop guessing why your customers are frustrated. Our latest update uses behavioral AI to surface friction points automatically.",
    category: "Product Updates",
    author: "Alex Rivera",
    date: "April 18, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1551288049-bbbda5366391?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    title: "10 Behavioral Patterns That Predict User Churn",
    excerpt: "Identifying churn before it happens is the holy grail of product management. Here's how to spot the early warning signs.",
    category: "CRO Tips",
    author: "Sarah Chen",
    date: "April 15, 2026",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    title: "How we scaled our real-time tracking to 50k RPS",
    excerpt: "A deep dive into the architecture behind SecondGuess's session recording engine and how we handle global traffic spikes.",
    category: "Engineering",
    author: "Marc Verner",
    date: "April 10, 2026",
    readTime: "12 min read",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 4,
    title: "Case Study: How FlowState reduced checkout friction by 42%",
    excerpt: "See how one of our early adopters used SecondGuess to identify a critical bottleneck in their mobile checkout flow.",
    category: "Case Studies",
    author: "Alex Rivera",
    date: "April 5, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800"
  }
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = React.useState("All");
  const [email, setEmail] = React.useState("");
  const [subscribed, setSubscribed] = React.useState(false);

  const filteredPosts = activeCategory === "All" 
    ? POSTS 
    : POSTS.filter(p => p.category === activeCategory);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 selection:bg-[#1D9E75]/30">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
            <div>
              <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4">
                The Intelligence Hub
              </h1>
              <p className="text-xl text-slate-500 font-light max-w-xl">
                Insights, updates, and deep dives into the world of behavioral intelligence.
              </p>
            </div>
            
            <div className="relative group max-w-sm w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-[#1D9E75] transition-colors" />
              <input 
                type="text" 
                placeholder="Search articles..."
                className="w-full bg-slate-900 border border-slate-800 rounded-2xl pl-12 pr-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-[#1D9E75]/20 focus:border-[#1D9E75]/50 transition-all"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {CATEGORIES.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest border transition-all ${
                  activeCategory === cat 
                  ? "bg-[#1D9E75] text-white border-[#1D9E75] shadow-lg shadow-[#1D9E75]/20" 
                  : "bg-transparent text-slate-500 border-slate-800 hover:border-slate-700 hover:text-slate-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Posts Section */}
      <section className="py-20 min-h-[600px]">
        <div className="max-w-7xl mx-auto px-6">
          {activeCategory === "All" && filteredPosts.length > 0 && (
             <div className="relative aspect-[21/9] rounded-[40px] overflow-hidden group mb-12">
                <img 
                  src={POSTS[0].image} 
                  alt={POSTS[0].title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8 md:p-16 max-w-2xl">
                   <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1D9E75] text-white text-[10px] font-bold uppercase tracking-widest mb-6">
                     Featured
                   </div>
                   <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6 leading-[1.1]">
                     {POSTS[0].title}
                   </h2>
                   <Link 
                     href={`/blog/${POSTS[0].id}`}
                     className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-xl font-bold hover:shadow-2xl transition-all hover:-translate-y-1"
                   >
                     Read Full Article <ArrowRight className="w-5 h-5" />
                   </Link>
                </div>
             </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {filteredPosts.filter(p => activeCategory === "All" ? p.id !== 1 : true).map((post, idx) => (
              <motion.article 
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group cursor-pointer"
              >
                <Link href={`/blog/${post.id}`}>
                  <div className="aspect-[16/10] rounded-3xl overflow-hidden mb-6 relative">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-[#1D9E75]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute top-4 left-4">
                       <span className="px-3 py-1 bg-slate-950/80 backdrop-blur-md rounded-lg text-[10px] font-bold text-white uppercase tracking-widest">
                         {post.category}
                       </span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3 tracking-tight group-hover:text-[#1D9E75] transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-slate-500 font-light line-clamp-2 mb-6">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-xs font-bold text-slate-600 uppercase tracking-widest">
                    <div className="flex items-center gap-1.5">
                       <Calendar className="w-3.5 h-3.5 text-[#1D9E75]" />
                       <span>{post.date}</span>
                    </div>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 px-6 border-t border-slate-900 bg-slate-950">
        <div className="max-w-4xl mx-auto p-12 rounded-[40px] bg-slate-900/50 border border-slate-800 text-center relative overflow-hidden">
          <div className="relative z-10">
            {subscribed ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                <div className="w-16 h-16 bg-[#1D9E75]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                   <CheckCircle2 className="w-8 h-8 text-[#1D9E75] bg-transparent" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">You're on the list!</h2>
                <p className="text-slate-500">Welcome to the future of behavioral intelligence.</p>
              </motion.div>
            ) : (
              <>
                <h2 className="text-3xl font-bold text-white mb-4">Stay in the loop.</h2>
                <p className="text-slate-500 max-w-sm mx-auto mb-10">
                  Get the latest behavioral insights and product updates delivered to your inbox every week.
                </p>
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input 
                    required
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#1D9E75]/50"
                  />
                  <button type="submit" className="bg-[#1D9E75] hover:bg-[#168562] text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-[#1D9E75]/20 transition-all">
                    Subscribe
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
