"use client";

import React, { useEffect, useRef } from "react";

interface Cursor {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  opacity: number;
}

export const GhostCursors = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorsRef = useRef<Cursor[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", resize);
    resize();

    // Initialize random cursors
    const colors = ["#1D9E75", "#168562", "#34D399"];
    for (let i = 0; i < 12; i++) {
      cursorsRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        size: Math.random() * 4 + 8,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.3 + 0.1,
      });
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      cursorsRef.current.forEach((cursor) => {
        // Update velocity based on mouse distance (pseudo-reaction)
        const dx = mouseRef.current.x - cursor.x;
        const dy = mouseRef.current.y - cursor.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 200) {
          cursor.vx -= (dx / dist) * 0.05; // Scatter away
          cursor.vy -= (dy / dist) * 0.05;
        } else {
          // Wander back towards center or random
          cursor.vx += (Math.random() - 0.5) * 0.1;
          cursor.vy += (Math.random() - 0.5) * 0.1;
        }

        // Apply friction
        cursor.vx *= 0.98;
        cursor.vy *= 0.98;

        // Limit speed
        const speed = Math.sqrt(cursor.vx * cursor.vx + cursor.vy * cursor.vy);
        if (speed > 2) {
          cursor.vx = (cursor.vx / speed) * 2;
          cursor.vy = (cursor.vy / speed) * 2;
        }

        cursor.x += cursor.vx;
        cursor.y += cursor.vy;

        // Wrap around edges
        if (cursor.x < 0) cursor.x = canvas.width;
        if (cursor.x > canvas.width) cursor.x = 0;
        if (cursor.y < 0) cursor.y = canvas.height;
        if (cursor.y > canvas.height) cursor.y = 0;

        // Draw cursor (simple arrowhead/pointer shape)
        ctx.save();
        ctx.translate(cursor.x, cursor.y);
        ctx.rotate(Math.atan2(cursor.vy, cursor.vx) + Math.PI / 4);
        ctx.globalAlpha = cursor.opacity;
        ctx.fillStyle = cursor.color;
        
        // Shadow/glow
        ctx.shadowBlur = 10;
        ctx.shadowColor = cursor.color;

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(cursor.size, cursor.size / 3);
        ctx.lineTo(cursor.size / 3, cursor.size);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-50 blur-[1px]" />;
};
