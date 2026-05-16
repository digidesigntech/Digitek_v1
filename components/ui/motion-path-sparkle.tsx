"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);
}

/**
 * Decorative scroll-coupled sparkle that rolls along a wavy SVG path.
 * Uses GSAP MotionPathPlugin + ScrollTrigger with scrub for smooth coupling.
 * Desktop-only (hidden on touch / small screens to keep the page calm).
 */
export function MotionPathSparkle() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const travelerRef = useRef<SVGGElement>(null);

  useEffect(() => {
    if (!wrapperRef.current || !travelerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(travelerRef.current, {
        motionPath: {
          path: "#sparkle-path",
          align: "#sparkle-path",
          alignOrigin: [0.5, 0.5],
          autoRotate: false,
        },
        ease: "none",
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top 95%",
          end: "bottom 5%",
          scrub: 1,
        },
      });

      // Subtle pulse on the traveler (independent of scroll)
      gsap.to(travelerRef.current, {
        scale: 1.15,
        duration: 1.4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        transformOrigin: "center",
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={wrapperRef}
      aria-hidden
      className="relative w-full h-32 lg:h-40 overflow-visible hidden md:block pointer-events-none my-4"
    >
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1200 200"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="sparkleStroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(191, 128, 255, 0)" />
            <stop offset="50%" stopColor="rgba(191, 128, 255, 0.35)" />
            <stop offset="100%" stopColor="rgba(191, 128, 255, 0)" />
          </linearGradient>
          <radialGradient id="sparkleHalo">
            <stop offset="0%" stopColor="rgba(220, 180, 255, 0.8)" />
            <stop offset="60%" stopColor="rgba(191, 128, 255, 0.25)" />
            <stop offset="100%" stopColor="rgba(191, 128, 255, 0)" />
          </radialGradient>
          <filter id="sparkleBlur" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>
        <path
          id="sparkle-path"
          d="M 0,100 C 240,20 400,180 600,100 C 800,20 960,180 1200,100"
          stroke="url(#sparkleStroke)"
          strokeWidth="1.5"
          strokeDasharray="3 7"
          fill="none"
        />
        <g ref={travelerRef}>
          <circle r="22" fill="url(#sparkleHalo)" />
          <circle r="6" fill="rgba(220, 180, 255, 0.95)" filter="url(#sparkleBlur)" />
          <circle r="3" fill="#ffffff" />
        </g>
      </svg>
    </div>
  );
}
