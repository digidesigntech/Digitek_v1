"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

// A purple paintbrush-feel cursor: an exact dot, a smooth-following ring,
// and a slower trail blur. Scoped to the Digi Design page only.
export function PaintbrushCursor() {
  const ringRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const trailRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Skip on touch devices and when the user prefers reduced motion.
    if (
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const ring = ringRef.current!;
    const dot = dotRef.current!;
    const trail = trailRef.current!;

    // Anchor each element by its center so x/y track the cursor point.
    gsap.set([ring, dot, trail], {
      xPercent: -50,
      yPercent: -50,
      autoAlpha: 0,
    });

    const ringX = gsap.quickTo(ring, "x", { duration: 0.28, ease: "power3" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.28, ease: "power3" });
    const dotX = gsap.quickTo(dot, "x", { duration: 0.06, ease: "power3" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.06, ease: "power3" });
    const trailX = gsap.quickTo(trail, "x", { duration: 0.6, ease: "power2" });
    const trailY = gsap.quickTo(trail, "y", { duration: 0.6, ease: "power2" });

    let revealed = false;

    const onMove = (e: MouseEvent) => {
      if (!revealed) {
        revealed = true;
        gsap.to([ring, dot, trail], { autoAlpha: 1, duration: 0.3 });
      }
      ringX(e.clientX);
      ringY(e.clientY);
      dotX(e.clientX);
      dotY(e.clientY);
      trailX(e.clientX);
      trailY(e.clientY);
    };

    const interactiveSelector =
      'a, button, [role="button"], input, textarea, select, label';

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const isInteractive = !!target?.closest(interactiveSelector);
      gsap.to(ring, {
        scale: isInteractive ? 1.8 : 1,
        opacity: isInteractive ? 0.85 : 0.55,
        duration: 0.3,
      });
      gsap.to(trail, {
        scale: isInteractive ? 1.4 : 1,
        opacity: isInteractive ? 0.25 : 0.35,
        duration: 0.4,
      });
      gsap.to(dot, {
        scale: isInteractive ? 0 : 1,
        duration: 0.25,
      });
    };

    const onLeave = () => {
      gsap.to([ring, dot, trail], { autoAlpha: 0, duration: 0.2 });
      revealed = false;
    };

    document.documentElement.classList.add("paintbrush-cursor-active");
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      document.documentElement.classList.remove("paintbrush-cursor-active");
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <>
      <div ref={trailRef} className="paintbrush-cursor-trail" aria-hidden="true" />
      <div ref={ringRef} className="paintbrush-cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="paintbrush-cursor-dot" aria-hidden="true" />
    </>
  );
}
