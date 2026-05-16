"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const PAINT_COLORS = [
  "#FFB3BA", // soft pink
  "#FFDFBA", // peach
  "#FFFFBA", // cream
  "#BAFFC9", // mint
  "#BAE1FF", // sky
  "#E0BAFF", // lavender
];

/**
 * Decorative orbital animation — 6 paint-colour dots circle a central point.
 * Each dot has its own radius/duration so the motion feels organic, not robotic.
 * Used on the Digi Design page to evoke a creative-studio feel.
 */
export function PaintDotsOrbit({ size = 200 }: { size?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const dots = Array.from(
      ref.current.querySelectorAll<HTMLSpanElement>(".paint-dot")
    );

    const ctx = gsap.context(() => {
      dots.forEach((dot, i) => {
        const radius = 60 + (i % 3) * 18; // varied orbit distances
        const duration = 6 + (i % 4) * 1.5;
        const startAngle = (i / dots.length) * Math.PI * 2;

        const orbit = { angle: startAngle };

        gsap.to(orbit, {
          angle: startAngle + Math.PI * 2,
          duration,
          repeat: -1,
          ease: "none",
          onUpdate: () => {
            gsap.set(dot, {
              x: Math.cos(orbit.angle) * radius,
              y: Math.sin(orbit.angle) * radius,
            });
          },
        });

        // Subtle breathing pulse on each dot
        gsap.to(dot, {
          scale: 1.4,
          duration: 1.5 + (i % 3) * 0.4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="relative pointer-events-none"
      style={{ width: size, height: size }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        {PAINT_COLORS.map((color, i) => (
          <span
            key={i}
            className="paint-dot absolute h-4 w-4 rounded-full shadow-lg"
            style={{
              backgroundColor: color,
              boxShadow: `0 0 16px ${color}80`,
            }}
          />
        ))}
        {/* Soft glow centre */}
        <div className="absolute h-20 w-20 rounded-full bg-gradient-to-br from-purple-400/20 to-pink-300/10 blur-2xl" />
      </div>
    </div>
  );
}
