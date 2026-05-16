"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useRobot } from "@/components/robot/robot-provider";

type AccentOnViewProps = {
  /** rgba color string the corner robot should glow with when this element is in view. */
  accent: string | null;
  children: ReactNode;
  className?: string;
};

/**
 * Wraps a content block and sets the corner robot's accent color
 * whenever the block is in the viewport. When it leaves, the accent
 * is cleared (back to the page default).
 */
export function AccentOnView({
  accent,
  children,
  className,
}: AccentOnViewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { setAccent } = useRobot();

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAccent(accent);
        }
      },
      { threshold: [0.4] }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [accent, setAccent]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
