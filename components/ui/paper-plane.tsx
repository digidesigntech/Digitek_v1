"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

type PaperPlaneProps = {
  /** Increment this value to trigger another flight. */
  trigger: number;
};

/**
 * A small SVG paper plane that flies from the bottom-left up and across
 * the viewport when `trigger` changes. Used on the contact form submit.
 */
export function PaperPlane({ trigger }: PaperPlaneProps) {
  const planeRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (!planeRef.current) return;
    const el = planeRef.current;

    gsap.killTweensOf(el);

    gsap
      .timeline()
      .set(el, {
        x: "10vw",
        y: "75vh",
        rotate: -10,
        opacity: 0,
        scale: 0.6,
      })
      .to(el, {
        opacity: 1,
        scale: 1,
        duration: 0.25,
        ease: "power2.out",
      })
      .to(
        el,
        {
          x: "55vw",
          y: "30vh",
          rotate: 10,
          duration: 0.9,
          ease: "power2.inOut",
        },
        "<"
      )
      .to(el, {
        x: "115vw",
        y: "-10vh",
        rotate: 28,
        opacity: 0,
        duration: 0.9,
        ease: "power2.in",
      });
  }, [trigger]);

  return (
    <div
      ref={planeRef}
      aria-hidden
      className="fixed top-0 left-0 z-50 pointer-events-none opacity-0"
      style={{ willChange: "transform" }}
    >
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="planeFill" x1="0" y1="0" x2="48" y2="48">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="rgba(220, 180, 255, 0.9)" />
          </linearGradient>
          <filter id="planeGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>
        <path
          d="M 2,24 L 46,4 L 30,44 L 22,28 Z"
          fill="rgba(191, 128, 255, 0.4)"
          filter="url(#planeGlow)"
        />
        <path
          d="M 2,24 L 46,4 L 30,44 L 22,28 Z"
          fill="url(#planeFill)"
          stroke="rgba(220, 180, 255, 0.8)"
          strokeWidth="0.5"
        />
        <path d="M 22,28 L 30,44" stroke="rgba(140, 100, 200, 0.5)" strokeWidth="1" />
      </svg>
    </div>
  );
}
