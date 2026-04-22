"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const InteractiveMesh = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<any[]>([]);
  const [nodes, setNodes] = useState<any[]>([]);
  const [auroras, setAuroras] = useState<any[]>([]);
  const [echoes, setEchoes] = useState<any[]>([]);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setMounted(true);
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduceMotion(prefersReducedMotion);
    
    // Check if mobile device (viewport < 768px)
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);
    
    // Generate random particles (reduced on mobile)
    setParticles(Array.from({ length: mobile ? 5 : 20 }).map((_, i) => ({
      id: i,
      size: Math.random() * 3 + 1,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5
    })));

    // Generate pulsing nodes (reduced on mobile)
    setNodes(Array.from({ length: mobile ? 4 : 12 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 10
    })));

    // Generate Aurora Bands (skip on mobile)
    if (!mobile) {
      setAuroras(Array.from({ length: 3 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: Math.random() * 30 + 30,
        delay: i * 5
      })));
    }

    // Generate Echo Cursor Trails (skip on mobile)
    if (!mobile) {
      setEchoes(Array.from({ length: 4 }).map((_, i) => ({
        id: i,
        path: Array.from({ length: 3 }).map(() => ({
          x: Math.random() * 100,
          y: Math.random() * 100
        })),
        delay: i * 8
      })));
    }

    // Only track mouse on desktop
    const handleMouseMove = (e: MouseEvent) => {
      if (isMobile || !containerRef.current) return;
      const { clientX, clientY } = e;
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      mouseX.set((clientX - left) / width - 0.5);
      mouseY.set((clientY - top) / height - 0.5);
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, isMobile]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Neural Particles - skip on mobile */}
      {!isMobile && !reduceMotion && (
        <div className="absolute inset-0 z-[1]">
          {mounted && particles.map((p) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: "100%" }}
              animate={{ 
                opacity: [0, 0.4, 0],
                y: ["100%", "-20%"],
                x: [`${p.x}%`, `${p.x + (Math.random() * 10 - 5)}%`]
              }}
              transition={{ 
                duration: p.duration, 
                repeat: Infinity, 
                delay: p.delay,
                ease: "linear"
              }}
              className="absolute bg-emerald-400 rounded-full blur-[1px]"
              style={{ width: p.size, height: p.size }}
            />
          ))}
        </div>
      )}

      {/* Pulsing Nodes - reduced on mobile */}
      {!reduceMotion && (
        <div className="absolute inset-0 z-[2]">
          {mounted && nodes.map((n) => (
            <motion.div
              key={n.id}
              animate={{ 
                opacity: [0, 0.6, 0],
                scale: [0.5, 1.5, 0.5]
              }}
              transition={{ 
                duration: isMobile ? 6 : 4, 
                repeat: Infinity, 
                delay: n.delay,
                ease: "easeInOut"
              }}
              className="absolute w-1 h-1 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.8)]"
              style={{ left: `${n.x}%`, top: `${n.y}%` }}
            />
          ))}
        </div>
      )}

      {/* Deep Mesh Background */}
      {!reduceMotion && (
        <motion.div 
          style={{
            x: isMobile ? 0 : smoothX.get() * 60,
            y: isMobile ? 0 : smoothY.get() * 60,
          }}
          className="absolute inset-[-20%] opacity-40 mix-blend-screen z-0"
        >
          <div className="absolute top-0 left-0 w-[1000px] h-[1000px] bg-emerald-500/20 blur-[180px] rounded-full translate-x-[-20%] translate-y-[-20%]" />
          <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-blue-500/10 blur-[150px] rounded-full translate-x-[20%] translate-y-[20%]" />
          <div className="absolute top-1/2 left-1/2 w-[1200px] h-[1200px] bg-emerald-500/5 blur-[250px] rounded-full translate-x-[-50%] translate-y-[-50%]" />
        </motion.div>
      )}

      {/* Grid Overlay with Parallax - skip on mobile */}
      {!isMobile && !reduceMotion && (
        <motion.div 
          style={{
            x: smoothX.get() * -30,
            y: smoothY.get() * -30,
          }}
          className="absolute inset-0 bg-[url('/grid.svg')] bg-[length:50px_50px] [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)] opacity-[0.04] z-[3]"
        />
      )}

      {/* Glow Follower - skip on mobile */}
      {!isMobile && !reduceMotion && (
        <motion.div 
          style={{
            left: mouseX.get() * 100 + "%",
            top: mouseY.get() * 100 + "%",
          }}
          className="absolute w-[500px] h-[500px] bg-emerald-500/15 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[4]"
        />
      )}

      {/* Scanning Aurora Bands - skip on mobile */}
      {!isMobile && !reduceMotion && (
        <div className="absolute inset-0 z-[0] opacity-30">
          {mounted && auroras.map((a) => (
            <motion.div
              key={a.id}
              animate={{ 
                x: ["-20%", "120%"],
                opacity: [0, 0.2, 0]
              }}
              transition={{ 
                duration: a.duration, 
                repeat: Infinity, 
                delay: a.delay,
                ease: "easeInOut"
              }}
              className="absolute h-full w-[40vw] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent blur-[120px] -skew-x-12"
              style={{ left: `${a.x}%` }}
            />
          ))}
        </div>
      )}

      {/* Echo Cursor Trails - skip on mobile */}
      {!isMobile && !reduceMotion && (
        <div className="absolute inset-0 z-[2]">
          {mounted && echoes.map((e) => (
            <motion.div
              key={e.id}
              animate={{ 
                opacity: [0, 0.15, 0],
                x: e.path.map((p: any) => `${p.x}%`),
                y: e.path.map((p: any) => `${p.y}%`)
              }}
              transition={{ 
                duration: 15, 
                repeat: Infinity, 
                delay: e.delay,
                ease: "easeInOut"
              }}
              className="absolute w-2 h-2 bg-emerald-400/50 rounded-full blur-[2px]"
            >
               <div className="absolute inset-0 bg-emerald-400 blur-md opacity-50 scale-150" />
            </motion.div>
          ))}
        </div>
      )}

      {/* Vertical Scanline Sweep - skip on mobile, respect reduced-motion */}
      {!isMobile && !reduceMotion && (
        <motion.div
          animate={{ 
            top: ["-10%", "110%"],
            opacity: [0, 0.5, 0]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity, 
            ease: "linear"
          }}
          className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent z-[5] pointer-events-none shadow-[0_0_15px_rgba(16,185,129,0.2)]"
        />
      )}
    </div>
  );
};
