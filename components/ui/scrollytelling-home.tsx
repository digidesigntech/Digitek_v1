"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Building2,
  Code2,
  Hotel,
  Layers,
  LineChart,
  PhoneCall,
  Server,
  Smartphone,
  Sparkles,
  ShieldCheck,
  ShoppingBag,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";
import type { CSSProperties } from "react";
import { SplineScene } from "@/components/ui/spline-scene";
import { GradientCard } from "@/components/ui/gradient-card";

type GestureKey = "differentiators" | "snapshot" | "trust";

const GESTURES: Record<
  GestureKey,
  { rotateY: number; rotateX: number; scale: number; x: number; y: number; caption: string }
> = {
  differentiators: {
    rotateY: -20,
    rotateX: 6,
    scale: 0.95,
    x: 0,
    y: 0,
    caption: "Pointing your way — here's what sets us apart.",
  },
  snapshot: {
    rotateY: 20,
    rotateX: 2,
    scale: 0.95,
    x: 6,
    y: 0,
    caption: "Look at everything we build →",
  },
  trust: {
    rotateY: 0,
    rotateX: -10,
    scale: 1.06,
    x: 0,
    y: -4,
    caption: "Leaning in — our clients come back.",
  },
};

const DIFFERENTIATORS: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: Building2,
    title: "Chennai roots, pan-India reach",
    desc: "We understand local business culture and ship to global standards.",
  },
  {
    icon: Hotel,
    title: "Hospitality-grade detailing",
    desc: "Years powering hotels and resorts trained us to obsess over speed, booking flow and image quality.",
  },
  {
    icon: Code2,
    title: "Modern stack, sensible pricing",
    desc: "React, Python, PHP, WordPress and headless CMS — priced for Indian SMEs and ambitious startups.",
  },
  {
    icon: PhoneCall,
    title: "Real humans on call",
    desc: "Direct WhatsApp and phone access — not ticket-number purgatory.",
  },
];

const SNAPSHOT: { icon: LucideIcon; title: string }[] = [
  { icon: Layers, title: "Corporate Websites" },
  { icon: Hotel, title: "Hotel & Resort Sites" },
  { icon: ShoppingBag, title: "E-Commerce Stores" },
  { icon: Stethoscope, title: "Clinic & Hospital Platforms" },
  { icon: Code2, title: "Custom Software" },
  { icon: Smartphone, title: "Android & iOS Apps" },
  { icon: Sparkles, title: "Brand Identity Systems" },
  { icon: Server, title: "Managed Hosting" },
];

const STATS: { icon: LucideIcon; k: string; v: string }[] = [
  { icon: ShieldCheck, k: "Multi-year", v: "Client relationships, project after project" },
  { icon: LineChart, k: "Hundreds", v: "Of sites live across India" },
  { icon: Sparkles, k: "Single", v: "Accountable team, two cities" },
];

export function ScrollytellingHome({ scene }: { scene: string }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const robotRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<GestureKey>("differentiators");

  useEffect(() => {
    if (!robotRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    // Initial resting state — head slightly forward
    gsap.set(robotRef.current, { rotateY: 0, rotateX: 0, scale: 1, x: 0, y: 0 });

    const ctx = gsap.context(() => {
      (Object.keys(GESTURES) as GestureKey[]).forEach((id) => {
        const section = document.getElementById(id);
        if (!section) return;

        ScrollTrigger.create({
          trigger: section,
          start: "top 65%",
          end: "bottom 35%",
          onEnter: () => playGesture(id),
          onEnterBack: () => playGesture(id),
        });
      });

      function playGesture(id: GestureKey) {
        const g = GESTURES[id];
        setActive(id);
        gsap.to(robotRef.current, {
          rotateY: g.rotateY,
          rotateX: g.rotateX,
          scale: g.scale,
          x: g.x,
          y: g.y,
          duration: 1.3,
          ease: "power3.out",
        });
      }

      // Refresh once on mount in case sizes change after Spline loads
      ScrollTrigger.refresh();
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef} className="container relative">
      <div className="grid lg:grid-cols-[minmax(0,1fr)_360px] xl:grid-cols-[minmax(0,1fr)_400px] gap-10 lg:gap-16">
        {/* Left: scrolling content panels */}
        <div className="space-y-28 lg:space-y-40 py-20 lg:py-28">
          {/* Panel 1 — Differentiators */}
          <section id="differentiators" className="scroll-mt-32 min-h-[55vh]">
            <PanelHeader
              eyebrow="The Difference"
              title="What Makes Us Different"
              description="Four things you'll feel from the first call through the final handover. Hover the stack to spread the cards."
            />
            <div className="mt-10 overflow-x-auto pb-2">
              <div className="fanned-row mx-auto w-fit">
                {DIFFERENTIATORS.map((item, i) => {
                  const Icon = item.icon;
                  const rotations = [-15, -5, 5, 15];
                  return (
                    <div
                      key={item.title}
                      className="fanned-card"
                      data-text={item.title}
                      title={item.desc}
                      style={{ "--r": rotations[i] } as CSSProperties}
                    >
                      <span className="fc-icon">
                        <Icon className="h-10 w-10" />
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Panel 2 — Snapshot */}
          <section id="snapshot" className="scroll-mt-32 min-h-[55vh]">
            <PanelHeader
              eyebrow="Snapshot"
              title="What We Build"
              description="Corporate websites, hotel platforms, e-commerce, custom software, mobile apps, branding and managed hosting — all under one roof."
            />
            <div className="grid sm:grid-cols-2 gap-3 mt-8">
              {SNAPSHOT.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: i * 0.05, duration: 0.45, ease: "easeOut" }}
                >
                  <GradientCard icon={item.icon} title={item.title} />
                </motion.div>
              ))}
            </div>
          </section>

          {/* Panel 3 — Trust */}
          <section id="trust" className="scroll-mt-32 min-h-[55vh]">
            <PanelHeader
              eyebrow="Trust"
              title="Trusted by Hundreds"
              description="Hotels, clinics, retailers and institutions who return for second, third and fourth projects — the clearest signal that the work works."
            />
            <div className="grid gap-4 mt-8">
              {STATS.map((s, i) => {
                const Icon = s.icon;
                return (
                  <motion.div
                    key={s.k}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ delay: i * 0.1, duration: 0.55, ease: "easeOut" }}
                    className="glass rounded-xl p-6 flex items-center gap-5"
                  >
                    <div className="h-12 w-12 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-5 w-5 text-purple-300" />
                    </div>
                    <div>
                      <div className="text-2xl font-semibold text-white">{s.k}</div>
                      <div className="text-sm text-gray-400">{s.v}</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </section>
        </div>

        {/* Right: pinned robot column (lg+ only) */}
        <aside className="hidden lg:block relative">
          <div className="sticky top-0 h-screen flex flex-col items-center justify-center">
            <div
              ref={robotRef}
              className="w-full h-[420px] xl:h-[480px] will-change-transform"
              style={{ transformStyle: "preserve-3d", perspective: "1200px" }}
            >
              <SplineScene scene={scene} className="w-full h-full" />
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="mt-4 px-4 py-2 rounded-full glass text-xs text-gray-300 text-center max-w-[300px]"
              >
                {GESTURES[active].caption}
              </motion.div>
            </AnimatePresence>
          </div>
        </aside>
      </div>
    </div>
  );
}

function PanelHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-2xl"
    >
      <span className="inline-block text-xs uppercase tracking-[0.2em] text-purple-300 mb-3">
        {eyebrow}
      </span>
      <h2 className="text-3xl md:text-5xl font-bold tracking-tight gradient-text mb-3">
        {title}
      </h2>
      <p className="text-gray-400 text-base md:text-lg leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}
