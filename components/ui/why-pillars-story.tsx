"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Sparkles,
  Stethoscope,
  Layers,
  Globe2,
  type LucideIcon,
} from "lucide-react";

type Pillar = {
  num: string;
  Icon: LucideIcon;
  title: string;
  body: string;
};

const PILLARS: Pillar[] = [
  {
    num: "01",
    Icon: Sparkles,
    title: "500+ aesthetic clients in India",
    body: "A scale of specialist work few studios can match — built across years of clinic campaigns, treatment menus and brand systems.",
  },
  {
    num: "02",
    Icon: Stethoscope,
    title: "Specialist depth in aesthetics",
    body: "We already speak the language of skin — clinical credibility, regulatory care, the premium-yet-approachable standard the category expects.",
  },
  {
    num: "03",
    Icon: Layers,
    title: "Full-service, every platform",
    body: "Social, print, web, brand, campaigns, collateral — one studio, one consistent standard of polish across every channel a brand uses.",
  },
  {
    num: "04",
    Icon: Globe2,
    title: "Global, in-house-style delivery",
    body: "For many clients we function as their design arm, keeping the brand consistent across every market and platform it operates in.",
  },
];

export function WhyPillarsStory() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const watermarkRef = useRef<HTMLDivElement | null>(null);
  const iconRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const bodyRef = useRef<HTMLParagraphElement | null>(null);
  const bloomRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);

  // Pin trigger + chapter detection. Same single-source-of-truth pattern as
  // the home page's RobotStarSystem.
  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          let last = -1;
          ScrollTrigger.create({
            trigger: sectionRef.current!,
            start: "top top",
            end: "+=320%",
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              const idx = Math.min(
                PILLARS.length - 1,
                Math.floor(self.progress * PILLARS.length + 0.0001)
              );
              if (idx !== last) {
                last = idx;
                setActive(idx);
              }
            },
            onRefresh: () => {
              last = -1;
            },
          });

          // Slow ambient bloom drift
          if (bloomRef.current) {
            gsap.to(bloomRef.current, {
              x: 60,
              y: -40,
              duration: 18,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
            });
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Per-pillar entrance choreography — each element gets its own beat.
  useEffect(() => {
    if (!watermarkRef.current || !iconRef.current || !titleRef.current || !bodyRef.current) {
      return;
    }
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(
      watermarkRef.current,
      { x: -180, opacity: 0, scale: 0.92 },
      { x: 0, opacity: 1, scale: 1, duration: 1.0, ease: "expo.out" }
    )
      .fromTo(
        iconRef.current,
        { scale: 0.4, opacity: 0, rotate: -25 },
        { scale: 1, opacity: 1, rotate: 0, duration: 0.7, ease: "back.out(2)" },
        "-=0.7"
      )
      .fromTo(
        titleRef.current,
        { y: 36, opacity: 0, skewY: 2 },
        { y: 0, opacity: 1, skewY: 0, duration: 0.7 },
        "-=0.45"
      )
      .fromTo(
        bodyRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        "-=0.45"
      );

    return () => {
      tl.kill();
    };
  }, [active]);

  const pillar = PILLARS[active];
  const Icon = pillar.Icon;

  return (
    <section
      ref={sectionRef}
      className="pillars-section"
      aria-label="Why Digi Design — four reasons clients hire us"
    >
      <div className="pillars-frame">
        {/* Ambient bloom behind everything */}
        <div ref={bloomRef} className="pillars-bloom" aria-hidden="true" />

        {/* Stage: number watermark left, content right */}
        <div className="pillars-stage">
          <div ref={watermarkRef} className="pillars-watermark" aria-hidden="true">
            {pillar.num}
          </div>

          <div className="pillars-content">
            <span className="pillars-eyebrow">
              Why Digi Design · {pillar.num} / 04
            </span>

            <div ref={iconRef} className="pillars-icon">
              <Icon className="h-4 w-4" strokeWidth={1.5} />
            </div>

            <h2 ref={titleRef} className="pillars-title">
              {pillar.title}
            </h2>

            <p ref={bodyRef} className="pillars-body">
              {pillar.body}
            </p>

            <div className="pillars-progress" aria-hidden="true">
              {PILLARS.map((_, i) => (
                <span
                  key={i}
                  className={`pillars-dot${i === active ? " pillars-dot--active" : ""}`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="pillars-hint" aria-hidden="true">
          Scroll · {active + 1} of {PILLARS.length}
        </div>
      </div>

      {/* Mobile / reduced-motion fallback: stacked cards (same data) */}
      <div className="pillars-fallback">
        <span className="pillars-eyebrow pillars-fallback-eyebrow">
          Why Digi Design
        </span>
        <h2 className="pillars-fallback-heading">
          What you actually get when you hire us
        </h2>
        <div className="pillars-fallback-grid">
          {PILLARS.map((p) => {
            const PIcon = p.Icon;
            return (
              <div key={p.num} className="pillars-fallback-card">
                <span className="pillars-fallback-num">{p.num}</span>
                <div className="pillars-fallback-icon">
                  <PIcon className="h-5 w-5" strokeWidth={1.6} />
                </div>
                <h3 className="pillars-fallback-title">{p.title}</h3>
                <p className="pillars-fallback-body">{p.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
