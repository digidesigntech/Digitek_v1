"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Search, Compass, PenTool, Send, type LucideIcon } from "lucide-react";

type Chapter = {
  num: string;
  chapter: string;
  title: string;
  lede: string;
  body: string;
  outcome: string;
  Icon: LucideIcon;
};

const CHAPTERS: Chapter[] = [
  {
    num: "01",
    chapter: "Chapter One",
    title: "Understand",
    lede: "Before a single pixel moves, we listen.",
    body: "We sit with your practice — your patients, your tone, the things you wish brochures had got right. Nothing about your clinic is too small to know.",
    outcome: "You walk out feeling heard, not pitched.",
    Icon: Search,
  },
  {
    num: "02",
    chapter: "Chapter Two",
    title: "Strategise",
    lede: "What we heard becomes a creative plan.",
    body: "Visual tone, channels, sequencing, and a sketch of every asset — mapped before a single design file opens.",
    outcome: "You see the route before we travel it.",
    Icon: Compass,
  },
  {
    num: "03",
    chapter: "Chapter Three",
    title: "Design",
    lede: "Now the studio comes alive.",
    body: "Posters, posts, brochures, packs — every visual reviewed for clinical tone and the quiet confidence your patients expect from medicine.",
    outcome: "Work that looks like medicine, not marketing.",
    Icon: PenTool,
  },
  {
    num: "04",
    chapter: "Chapter Four",
    title: "Deliver",
    lede: "Refined, packed, and handed over.",
    body: "Print-ready files, organised folders, and the small details that save your front desk a phone call to us at 9 pm.",
    outcome: "No surprises. Ever.",
    Icon: Send,
  },
];

export function ProcessJourney() {
  const [mode, setMode] = useState<"fallback" | "journey" | null>(null);
  const containerRef = useRef<HTMLElement | null>(null);
  const railFillRef = useRef<HTMLDivElement | null>(null);
  const counterRef = useRef<HTMLSpanElement | null>(null);
  const sceneRefs = useRef<Array<HTMLElement | null>>([]);
  const railNodeRefs = useRef<Array<HTMLLIElement | null>>([]);

  // Decide rendering mode after mount: journey only on >= md and no reduced-motion.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const decide = () => {
      const enable = window.innerWidth >= 768 && !mq.matches;
      setMode(enable ? "journey" : "fallback");
    };
    decide();
    window.addEventListener("resize", decide);
    mq.addEventListener("change", decide);
    return () => {
      window.removeEventListener("resize", decide);
      mq.removeEventListener("change", decide);
    };
  }, []);

  // Wire ScrollTrigger pin + scrub when in journey mode.
  useEffect(() => {
    if (mode !== "journey" || !containerRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current!,
        start: "top top",
        end: "+=400%",
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const activeIdx = Math.min(
            CHAPTERS.length - 1,
            Math.floor(progress * CHAPTERS.length)
          );

          if (railFillRef.current) {
            railFillRef.current.style.height = `${Math.min(100, progress * 100)}%`;
          }
          if (counterRef.current) {
            counterRef.current.textContent = `0${activeIdx + 1}`;
          }

          sceneRefs.current.forEach((scene, i) => {
            if (!scene) return;
            const isActive = i === activeIdx;
            scene.style.opacity = isActive ? "1" : "0";
            scene.style.transform = isActive
              ? "translateY(0)"
              : `translateY(${(i - activeIdx) * 28}px)`;
            scene.style.pointerEvents = isActive ? "auto" : "none";
            if (isActive) scene.setAttribute("aria-current", "step");
            else scene.removeAttribute("aria-current");
          });

          railNodeRefs.current.forEach((node, i) => {
            if (!node) return;
            node.classList.toggle("journey-node--active", i === activeIdx);
            node.classList.toggle("journey-node--past", i < activeIdx);
          });
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [mode]);

  // SSR + reduced-motion + mobile: stacked deluxe cards (keeps SEO content present).
  if (mode === null || mode === "fallback") {
    return <FallbackGrid />;
  }

  return (
    <section
      ref={containerRef}
      className="journey-section"
      aria-label="How we work — four chapters from idea to delivery"
    >
      <div className="journey-frame">
        <header className="journey-header">
          <span className="inline-block text-xs uppercase tracking-[0.2em] text-purple-300 mb-3">
            How we work
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight gradient-text">
            From idea to delivery — four chapters.
          </h2>
        </header>

        <div className="journey-body">
          <aside className="journey-rail" aria-hidden="true">
            <div className="journey-rail-track" />
            <div className="journey-rail-fill" ref={railFillRef} />
            <ul className="journey-rail-nodes">
              {CHAPTERS.map((c, i) => (
                <li
                  key={c.num}
                  ref={(el) => {
                    railNodeRefs.current[i] = el;
                  }}
                  className={i === 0 ? "journey-node journey-node--active" : "journey-node"}
                >
                  {c.num}
                </li>
              ))}
            </ul>
          </aside>

          <div className="journey-stage">
            <div className="journey-counter" aria-live="polite">
              <span ref={counterRef}>01</span>
              <span className="journey-counter-sep">/</span>
              <span>0{CHAPTERS.length}</span>
            </div>

            {CHAPTERS.map((c, i) => (
              <article
                key={c.num}
                ref={(el) => {
                  sceneRefs.current[i] = el;
                }}
                className="journey-scene"
                style={{
                  opacity: i === 0 ? 1 : 0,
                  transform: i === 0 ? "translateY(0)" : `translateY(${i * 28}px)`,
                }}
                aria-current={i === 0 ? "step" : undefined}
              >
                <div className="journey-scene-text">
                  <p className="journey-chapter-label">{c.chapter}</p>
                  <h3 className="journey-title">{c.title}</h3>
                  <p className="journey-lede">{c.lede}</p>
                  <p className="journey-body-copy">{c.body}</p>
                  <p className="journey-outcome">{c.outcome}</p>
                </div>
                <div className="journey-scene-visual" aria-hidden="true">
                  <span className="journey-ring journey-ring--1" />
                  <span className="journey-ring journey-ring--2" />
                  <span className="journey-ring journey-ring--3" />
                  <span className="journey-icon">
                    <c.Icon className="h-14 w-14" strokeWidth={1.3} />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="journey-hint" aria-hidden="true">
          Scroll to advance
        </div>
      </div>
    </section>
  );
}

function FallbackGrid() {
  return (
    <section className="section-pad relative" aria-label="How we work">
      <div className="container">
        <div className="mb-12 max-w-3xl">
          <span className="inline-block text-xs uppercase tracking-[0.2em] text-purple-300 mb-3">
            How we work
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight gradient-text mb-4">
            From idea to delivery — four chapters.
          </h2>
        </div>

        <svg className="proc-svg" width="0" height="0" aria-hidden="true" focusable="false">
          <defs>
            <filter id="turbulent-displace">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.012"
                numOctaves="2"
                seed="3"
                result="noise"
              />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.5" />
            </filter>
          </defs>
        </svg>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CHAPTERS.map((c) => (
            <div key={c.num} className="proc-shell">
              <div className="proc-card-bg">
                <div className="proc-inner">
                  <div className="proc-border-outer">
                    <div className="proc-main">
                      <div className="proc-glow-1" />
                      <div className="proc-glow-2" />
                    </div>
                  </div>
                  <div className="proc-overlay-1" />
                  <div className="proc-overlay-2" />
                </div>
                <div className="proc-bg-glow" />
                <div className="proc-content">
                  <div className="proc-top">
                    <div className="proc-badge">{c.num}</div>
                    <div className="proc-title">{c.title}</div>
                  </div>
                  <div className="proc-bottom">
                    <hr className="proc-divider" />
                    <p className="proc-desc">{c.body}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
