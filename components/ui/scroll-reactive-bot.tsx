"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SplineScene } from "@/components/ui/spline-scene";
import { cn } from "@/lib/utils";

type StateKey = "differentiators" | "snapshot" | "trust" | "cta";

const STATES: Record<
  StateKey,
  {
    x: number;
    rotateY: number;
    rotateX: number;
    scale: number;
    message: string;
  }
> = {
  differentiators: {
    x: 0,
    rotateY: -12,
    rotateX: 4,
    scale: 0.95,
    message: "Here's what makes us different →",
  },
  snapshot: {
    x: 8,
    rotateY: 12,
    rotateX: 2,
    scale: 0.95,
    message: "Everything we build, in one snapshot.",
  },
  trust: {
    x: 0,
    rotateY: 0,
    rotateX: -8,
    scale: 0.92,
    message: "Our clients say it best.",
  },
  cta: {
    x: -20,
    rotateY: -6,
    rotateX: 2,
    scale: 1.12,
    message: "Ready? Let's talk →",
  },
};

type ScrollReactiveBotProps = {
  scene: string;
  heroId?: string;
  sectionIds?: readonly StateKey[];
};

const DEFAULT_SECTIONS: readonly StateKey[] = [
  "differentiators",
  "snapshot",
  "trust",
  "cta",
];

export function ScrollReactiveBot({
  scene,
  heroId = "home-hero",
  sectionIds = DEFAULT_SECTIONS,
}: ScrollReactiveBotProps) {
  const [active, setActive] = useState<StateKey | null>(null);
  const [mounted, setMounted] = useState(false);
  const [heroVisible, setHeroVisible] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActive(visible[0].target.id as StateKey);
          setMounted(true);
        }
      },
      { threshold: [0.25, 0.5, 0.75] }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        setHeroVisible(entry.intersectionRatio > 0.35);
      },
      { threshold: [0.35, 0.5] }
    );
    const hero = document.getElementById(heroId);
    if (hero) heroObserver.observe(hero);

    return () => {
      observer.disconnect();
      heroObserver.disconnect();
    };
  }, [heroId, sectionIds]);

  const state = active ? STATES[active] : null;
  const shouldShow = !!state && !heroVisible;

  return (
    <div
      aria-hidden
      className={cn(
        "fixed right-4 xl:right-8 top-1/2 -translate-y-1/2 z-30",
        "w-[240px] xl:w-[280px] hidden lg:flex flex-col items-center",
        "pointer-events-none transition-opacity duration-500",
        shouldShow ? "opacity-100" : "opacity-0"
      )}
    >
      {mounted && (
        <motion.div
          animate={
            state
              ? {
                  x: state.x,
                  rotateY: state.rotateY,
                  rotateX: state.rotateX,
                  scale: state.scale,
                }
              : { scale: 0.85 }
          }
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="w-full h-[300px] xl:h-[340px]"
          style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
        >
          <SplineScene scene={scene} className="w-full h-full" />
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        {state && shouldShow && (
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="mt-3 px-4 py-2 rounded-full glass text-xs text-gray-300 text-center max-w-[260px]"
          >
            {state.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
