"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import {
  Sparkles,
  PenTool,
  Code2,
  Cloud,
  TrendingUp,
  Headphones,
  Building2,
  Hotel,
  ShoppingBag,
  Stethoscope,
  Smartphone,
  Server,
  Brush,
  Layers,
  ShieldCheck,
  LineChart,
  Users,
  type LucideIcon,
} from "lucide-react";
import { SplineScene } from "@/components/ui/spline-scene";

type Tile = { Icon: LucideIcon; label: string };
type Chapter = {
  num: string;
  eyebrow: string;
  title: string;
  caption: string;
};

const CAPABILITIES: Tile[] = [
  { Icon: Sparkles, label: "Strategy" },
  { Icon: PenTool, label: "Design" },
  { Icon: Code2, label: "Development" },
  { Icon: Cloud, label: "Deployment" },
  { Icon: TrendingUp, label: "Marketing" },
  { Icon: Headphones, label: "Support" },
];

const PRODUCTS: Tile[] = [
  { Icon: Building2, label: "Corporate Sites" },
  { Icon: Hotel, label: "Hotel & Resort" },
  { Icon: ShoppingBag, label: "E-Commerce" },
  { Icon: Stethoscope, label: "Clinic Platforms" },
  { Icon: Layers, label: "Custom Software" },
  { Icon: Smartphone, label: "Mobile Apps" },
  { Icon: Brush, label: "Brand Identity" },
  { Icon: Server, label: "Managed Hosting" },
];

const TRUST: Tile[] = [
  { Icon: ShieldCheck, label: "Multi-year clients" },
  { Icon: LineChart, label: "Hundreds of sites" },
  { Icon: Users, label: "One accountable team" },
];

const CHAPTERS: Chapter[] = [
  {
    num: "01",
    eyebrow: "Chapter One",
    title: "The Capabilities",
    caption: "Every discipline a digital project needs, under one accountable roof.",
  },
  {
    num: "02",
    eyebrow: "Chapter Two",
    title: "What We Build",
    caption: "Corporate sites, clinic platforms, e-commerce, apps and the systems behind them.",
  },
  {
    num: "03",
    eyebrow: "Chapter Three",
    title: "The Track Record",
    caption: "Clients who keep coming back — the clearest signal that the work works.",
  },
];

const ROBOT_SCENE =
  "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode";

// Ring radii (px) — used in both CSS positioning + JS for orbital math
// Robot canvas is 280×340 (±140 / ±170). Inner ring at 230 means the
// outline arcs cleanly outside the canvas in all directions; middle/outer
// rings step out from there with breathing room for tiles.
const RING_RADII = { inner: 230, middle: 310, outer: 390 };

type RobotStarSystemProps = {
  robotAnchorRef?: React.Ref<HTMLDivElement>;
  hideRobot?: boolean;
};

export function RobotStarSystem({
  robotAnchorRef,
  hideRobot = false,
}: RobotStarSystemProps = {}) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const robotRef = useRef<HTMLDivElement | null>(null);
  const ring1Ref = useRef<HTMLDivElement | null>(null);
  const ring2Ref = useRef<HTMLDivElement | null>(null);
  const ring3Ref = useRef<HTMLDivElement | null>(null);
  const starsLayerRef = useRef<HTMLDivElement | null>(null);
  const shootingPathRef = useRef<SVGPathElement | null>(null);
  const shootingStarRef = useRef<HTMLDivElement | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  // Precompute star positions (deterministic; same on SSR + client) -----------
  const stars = useMemo(() => {
    const list: { left: number; top: number; size: number; delay: number }[] = [];
    let seed = 42;
    const rnd = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    for (let i = 0; i < 110; i++) {
      list.push({
        left: rnd() * 100,
        top: rnd() * 100,
        size: 1 + rnd() * 2.4,
        delay: rnd() * 4,
      });
    }
    return list;
  }, []);

  // GSAP -----------------------------------------------------------------------
  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const section = sectionRef.current!;
          const ring1 = ring1Ref.current!;
          const ring2 = ring2Ref.current!;
          const ring3 = ring3Ref.current!;
          const robot = robotRef.current!;

          gsap.set([ring1, ring2, ring3], {
            transformOrigin: "50% 50%",
          });

          // Continuous solar-system rotation — each ring orbits at its
          // own pace and direction, regardless of scroll. Outer ring is
          // the slowest, like an outer planet. Tiles counter-rotate at
          // the matching speed so their icons + labels stay upright.
          const orbits: {
            ring: HTMLElement;
            ringDeg: number;
            duration: number;
          }[] = [
            { ring: ring1, ringDeg: 360, duration: 55 },
            { ring: ring2, ringDeg: -360, duration: 90 },
            { ring: ring3, ringDeg: 360, duration: 140 },
          ];

          orbits.forEach(({ ring, ringDeg, duration }) => {
            gsap.to(ring, {
              rotation: `+=${ringDeg}`,
              duration,
              repeat: -1,
              ease: "none",
            });
            gsap.to(ring.querySelectorAll(".orbit-tile"), {
              rotation: `-=${ringDeg}`,
              duration,
              repeat: -1,
              ease: "none",
            });
          });

          // Chapter focus: highlight the active ring by opacity + glow only.
          // We deliberately do NOT scale inactive rings down — scaling them
          // pulled their tiles toward center and overlapped the robot.
          const focusRings = (active: 1 | 2 | 3) => {
            const all = [
              { r: ring1, n: 1 },
              { r: ring2, n: 2 },
              { r: ring3, n: 3 },
            ];
            all.forEach(({ r, n }) => {
              const isActive = n === active;
              gsap.to(r, {
                opacity: isActive ? 1 : 0.10,
                duration: 0.9,
                ease: "power2.out",
              });
              const stroke = r.querySelector(".orbit-ring") as
                | HTMLElement
                | null;
              if (stroke) {
                gsap.to(stroke, {
                  opacity: isActive ? 1 : 0.06,
                  boxShadow: isActive
                    ? "0 0 40px rgba(192, 181, 255, 0.45), inset 0 0 40px rgba(192, 181, 255, 0.18)"
                    : "0 0 0px rgba(192, 181, 255, 0), inset 0 0 0px rgba(192, 181, 255, 0)",
                  duration: 0.9,
                  ease: "power2.out",
                });
              }
            });
          };

          const robotGesture = (idx: number) => {
            const gestures = [
              { rotateY: 0, rotateX: 0, scale: 1, x: 0, y: 0 },
              { rotateY: -14, rotateX: 4, scale: 1.04, x: -8, y: 0 },
              { rotateY: 0, rotateX: -8, scale: 1.1, x: 0, y: -6 },
            ];
            const g = gestures[idx];
            gsap.to(robot, {
              ...g,
              duration: 1.1,
              ease: "power3.out",
            });
          };

          // Master pinned trigger spanning all chapters. Caption, ring
          // focus and robot gesture all advance together from a single
          // source of truth (the pin's scroll progress), so they can't
          // get out of sync the way three separate triggers did before.
          let lastChapter = -1;
          const pinnedTrigger = ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: "+=300%",
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              const idx = Math.min(
                CHAPTERS.length - 1,
                Math.floor(self.progress * CHAPTERS.length + 0.0001)
              );
              setActiveIdx(idx);
              if (idx !== lastChapter) {
                lastChapter = idx;
                focusRings((idx + 1) as 1 | 2 | 3);
                robotGesture(idx);
              }
            },
            onRefresh: () => {
              lastChapter = -1;
            },
          });

          // Prime initial state so the first chapter is highlighted from
          // the moment the section comes into view (before any update fires).
          focusRings(1);
          robotGesture(0);

          // Starfield twinkle — looped per-star tween
          const starEls = starsLayerRef.current?.querySelectorAll(".star");
          if (starEls) {
            starEls.forEach((el) => {
              gsap.to(el, {
                opacity: 0.2,
                duration: 1.4 + Math.random() * 2,
                repeat: -1,
                yoyo: true,
                delay: Math.random() * 3,
                ease: "sine.inOut",
              });
            });
          }

          // Shooting star — travels along the SVG curved path on loop
          if (shootingStarRef.current && shootingPathRef.current) {
            gsap.set(shootingStarRef.current, { autoAlpha: 0 });
            const shootingTl = gsap.timeline({ repeat: -1, repeatDelay: 4.5 });
            shootingTl
              .set(shootingStarRef.current, {
                autoAlpha: 0,
                motionPath: {
                  path: shootingPathRef.current,
                  align: shootingPathRef.current,
                  alignOrigin: [0.5, 0.5],
                  start: 0,
                  end: 0,
                },
              })
              .to(shootingStarRef.current, { autoAlpha: 1, duration: 0.25 })
              .to(shootingStarRef.current, {
                duration: 2.2,
                motionPath: {
                  path: shootingPathRef.current,
                  align: shootingPathRef.current,
                  alignOrigin: [0.5, 0.5],
                  start: 0,
                  end: 1,
                  autoRotate: true,
                },
                ease: "power2.inOut",
              })
              .to(shootingStarRef.current, { autoAlpha: 0, duration: 0.2 });
          }

          // Return a cleanup function so matchMedia can revert the pinned
          // ScrollTrigger explicitly. ctx.revert() at the useEffect level
          // does this nominally, but a known GSAP quirk leaves pin-spacer
          // wrappers attached when ctx.revert() runs across a matchMedia
          // boundary — surfacing as the orbital section persisting on
          // /services, /about etc. after client-side navigation.
          return () => {
            pinnedTrigger.kill(true);
          };
        }
      );
    }, sectionRef);

    return () => {
      const section = sectionRef.current;

      // 1. Kill any remaining ScrollTriggers attached to our section, with
      //    revert (.kill(true) unwinds pin transforms and pin-spacer).
      if (section) {
        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger === section) st.kill(true);
        });
      }

      // 2. Revert the GSAP context — runs the matchMedia cleanup we
      //    returned above, plus all non-pinned animations.
      ctx.revert();

      // 3. Last-resort manual unwrap: if a `.pin-spacer` div survived
      //    (it can, when React already detached the section by the time
      //    GSAP tried to unwrap), pop the section back into the grandparent
      //    so React's own DOM removal during unmount finds the node where
      //    it expects it.
      if (section?.parentElement?.classList.contains("pin-spacer")) {
        const spacer = section.parentElement;
        spacer.parentElement?.insertBefore(section, spacer);
        spacer.remove();
      }
    };
  }, []);

  // Build a tile with the orbital positioner ----------------------------------
  const renderRing = (
    tiles: Tile[],
    radius: number,
    ringClass: string,
    ringRef: React.Ref<HTMLDivElement>,
    tilePrefix: string
  ) => {
    return (
      <div ref={ringRef} className={`starsys-orbit ${ringClass}`}>
        <span
          className="orbit-ring"
          style={{ width: radius * 2, height: radius * 2 }}
          aria-hidden="true"
        />
        {tiles.map((t, i) => {
          const angle = (i / tiles.length) * 360;
          return (
            <div
              key={tilePrefix + i}
              className="orbit-tile-positioner"
              style={{
                transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${radius}px) rotate(-${angle}deg)`,
              }}
            >
              <div className="orbit-tile">
                <span className="orbit-tile-icon">
                  <t.Icon className="h-5 w-5" strokeWidth={1.6} />
                </span>
                <span className="orbit-tile-label">{t.label}</span>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <section
      ref={sectionRef}
      className="starsys-section"
      aria-label="Capabilities, products and trust signals — orbital tour"
    >
      <div className="starsys-frame">
        {/* Starfield background */}
        <div ref={starsLayerRef} className="starsys-stars" aria-hidden="true">
          {stars.map((s, i) => (
            <span
              key={i}
              className="star"
              style={{
                left: `${s.left}%`,
                top: `${s.top}%`,
                width: `${s.size}px`,
                height: `${s.size}px`,
              }}
            />
          ))}
        </div>

        {/* Shooting star SVG path (invisible — used only for motion path) */}
        <svg
          className="starsys-shooting-path-svg"
          viewBox="0 0 1200 800"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            ref={shootingPathRef}
            d="M -80 120 Q 200 -40 480 220 T 1280 200"
            fill="none"
            stroke="transparent"
          />
        </svg>
        <div className="starsys-shooting-star" ref={shootingStarRef} aria-hidden="true" />

        {/* Stage with rings + robot */}
        <div className="starsys-stage">
          {renderRing(TRUST, RING_RADII.outer, "starsys-orbit--3", ring3Ref, "t")}
          {renderRing(PRODUCTS, RING_RADII.middle, "starsys-orbit--2", ring2Ref, "p")}
          {renderRing(CAPABILITIES, RING_RADII.inner, "starsys-orbit--1", ring1Ref, "c")}

          <div
            className="starsys-robot"
            ref={(el) => {
              robotRef.current = el;
              if (typeof robotAnchorRef === "function") {
                robotAnchorRef(el);
              } else if (robotAnchorRef) {
                (
                  robotAnchorRef as React.MutableRefObject<HTMLDivElement | null>
                ).current = el;
              }
            }}
            aria-hidden={hideRobot || undefined}
          >
            {!hideRobot && (
              <SplineScene scene={ROBOT_SCENE} className="w-full h-full" />
            )}
          </div>
        </div>

        {/* Caption — top-left vertical panel */}
        <div className="starsys-caption" aria-live="polite">
          <span className="starsys-caption-eyebrow">
            {CHAPTERS[activeIdx].eyebrow} · {CHAPTERS[activeIdx].num} / 03
          </span>
          <h2 className="starsys-caption-title">{CHAPTERS[activeIdx].title}</h2>
          <p className="starsys-caption-body">{CHAPTERS[activeIdx].caption}</p>
          <div className="starsys-dots" aria-hidden="true">
            {CHAPTERS.map((_, i) => (
              <span
                key={i}
                className={`starsys-dot${i === activeIdx ? " starsys-dot--active" : ""}`}
              />
            ))}
          </div>
        </div>

        <div className="starsys-hint" aria-hidden="true">
          Scroll to orbit
        </div>
      </div>

      {/* Mobile / reduced-motion fallback: flat constellation cards */}
      <div className="starsys-fallback">
        {[CAPABILITIES, PRODUCTS, TRUST].map((group, gi) => (
          <div key={gi} className="starsys-fallback-card">
            <span className="starsys-caption-eyebrow">
              {CHAPTERS[gi].eyebrow} · {CHAPTERS[gi].num} / 03
            </span>
            <h3 className="starsys-fallback-title">{CHAPTERS[gi].title}</h3>
            <p className="starsys-fallback-body">{CHAPTERS[gi].caption}</p>
            <div className="starsys-fallback-grid">
              {group.map((t, i) => (
                <div key={i} className="starsys-fallback-tile">
                  <t.Icon className="h-4 w-4" strokeWidth={1.6} />
                  <span>{t.label}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
