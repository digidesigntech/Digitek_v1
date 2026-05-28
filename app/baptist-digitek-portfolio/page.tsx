"use client";

import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplineScene } from "@/components/ui/spline-scene";
import ParticleField from "@/components/ui/particle-field";
import "./page.css";

const ROBOT_SCENE =
  "https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode";

class SplineBoundary extends Component<
  { onFail: () => void; children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onFail();
  }
  render() {
    if (this.state.failed) return null;
    return this.props.children;
  }
}

const SERVICES = [
  {
    n: "01",
    icon: "⚡",
    name: "Web & App Development",
    text: "Lightning-fast, scalable web and mobile applications engineered for performance and growth.",
    tag: "Engineering",
  },
  {
    n: "02",
    icon: "◈",
    name: "Brand & Design",
    text: "Visual identities and interfaces that command attention and build lasting brand equity.",
    tag: "Creative",
  },
  {
    n: "03",
    icon: "◉",
    name: "AI & Automation",
    text: "Custom AI integrations and automation pipelines that make your operations smarter and faster.",
    tag: "Intelligence",
  },
  {
    n: "04",
    icon: "▲",
    name: "Growth & SEO",
    text: "Data-driven digital marketing and SEO strategies that put you in front of your ideal customers.",
    tag: "Marketing",
  },
  {
    n: "05",
    icon: "▣",
    name: "Cloud & DevOps",
    text: "Resilient cloud infrastructure and CI/CD pipelines that keep your products fast and always on.",
    tag: "Infrastructure",
  },
];

const STATS = [
  { target: 120, sfx: "+", label: "Projects delivered" },
  { target: 8, sfx: "yr", label: "Years of expertise" },
  { target: 98, sfx: "%", label: "Client satisfaction" },
  { target: 40, sfx: "+", label: "Expert team members" },
];

const PROCESS = [
  { n: "01 /", t: "Discovery & Strategy", tag: "Week 1–2" },
  { n: "02 /", t: "Design & Prototype", tag: "Week 3–5" },
  { n: "03 /", t: "Build & Develop", tag: "Week 6–10" },
  { n: "04 /", t: "Launch & Optimise", tag: "Ongoing" },
];

const MARQUEE_WORDS = [
  "Web Development",
  "Brand Identity",
  "AI Solutions",
  "Mobile Apps",
  "Cloud Infrastructure",
  "UI/UX Design",
  "SEO & Growth",
  "Data Analytics",
];

export default function BaptistDigitekPortfolioPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const progRef = useRef<HTMLDivElement>(null);
  const servicesWrapRef = useRef<HTMLDivElement>(null);
  const [splineFailed, setSplineFailed] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      // Hero entrance — fires once on mount
      gsap.to(".hero-badge", {
        clipPath: "inset(0 0% 0 0)",
        duration: 0.9,
        ease: "expo.out",
        delay: 0.1,
      });
      gsap.fromTo(
        ".hero-title .tl",
        { yPercent: 110 },
        { yPercent: 0, stagger: 0.1, duration: 1.2, ease: "expo.out", delay: 0.2 }
      );
      gsap.to(".hero-desc", {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "expo.out",
        delay: 0.55,
      });
      gsap.to(".hero-actions", {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "expo.out",
        delay: 0.7,
      });
      gsap.to(".scroll-hint", {
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        delay: 1.1,
      });

      // Hero mousemove parallax — noise only (Spline handles its own interaction)
      const hero = root.querySelector(".bdp-hero");
      const onMove = (e: Event) => {
        const me = e as MouseEvent;
        const dx = me.clientX / window.innerWidth - 0.5;
        const dy = me.clientY / window.innerHeight - 0.5;
        gsap.to(".hero-noise", {
          x: dx * 12,
          y: dy * 10,
          duration: 2,
          ease: "power2.out",
        });
      };
      hero?.addEventListener("mousemove", onMove);

      // Label clip reveals
      root.querySelectorAll(".bdp-label").forEach((el) =>
        gsap.to(el, {
          clipPath: "inset(0 0% 0 0)",
          duration: 0.8,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        })
      );

      // H2 line reveals (rewrites innerHTML to wrap each <br>-separated line)
      root.querySelectorAll("h2").forEach((h2) => {
        const raw = h2.innerHTML;
        if (!raw.includes("clip-wrap")) {
          h2.innerHTML = raw
            .split("<br>")
            .map(
              (l) =>
                `<span class="clip-wrap"><span class="h2l">${l}</span></span>`
            )
            .join("<br>");
        }
        gsap.fromTo(
          h2.querySelectorAll(".h2l"),
          { yPercent: 110 },
          {
            yPercent: 0,
            stagger: 0.08,
            duration: 1.1,
            ease: "expo.out",
            scrollTrigger: { trigger: h2, start: "top 85%" },
          }
        );
      });

      // Services: stagger entrance + horizontal scroll pin
      gsap.to(".service-card", {
        y: 0,
        opacity: 1,
        stagger: 0.12,
        duration: 1.05,
        ease: "expo.out",
        scrollTrigger: { trigger: ".bdp-services", start: "top 80%" },
      });

      const cw = servicesWrapRef.current;
      if (cw) {
        const hDist = () => cw.scrollWidth - window.innerWidth + 96;
        ScrollTrigger.create({
          trigger: ".bdp-services-pin",
          start: "top top",
          end: () => "+=" + hDist(),
          pin: true,
          scrub: 1.2,
          onUpdate: (self) => gsap.set(cw, { x: -(self.progress * hDist()) }),
        });
      }

      // Stats: clip reveal + counter
      root.querySelectorAll<HTMLElement>(".cnt").forEach((el) => {
        const target = Number(el.dataset.t);
        const obj = { v: 0 };
        const block = el.closest(".stat-block");
        if (block) {
          gsap.fromTo(
            block,
            { clipPath: "inset(0 0 100% 0)" },
            {
              clipPath: "inset(0 0 0% 0)",
              duration: 1.1,
              ease: "expo.out",
              scrollTrigger: { trigger: el, start: "top 85%" },
            }
          );
        }
        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          once: true,
          onEnter() {
            gsap.to(obj, {
              v: target,
              duration: 2.2,
              ease: "expo.out",
              onUpdate() {
                el.textContent = String(Math.round(obj.v));
              },
            });
          },
        });
      });

      // Process: slide-in per item
      root.querySelectorAll(".proc-item").forEach((item) => {
        const t = item.querySelector(".proc-t");
        const tg = item.querySelector(".proc-tag");
        const tl = gsap.timeline({
          scrollTrigger: { trigger: item, start: "top 86%", once: true },
        });
        if (t) tl.to(t, { x: 0, opacity: 1, duration: 0.9, ease: "expo.out" });
        if (tg)
          tl.to(
            tg,
            { x: 0, opacity: 1, duration: 0.7, ease: "expo.out" },
            "-=.5"
          );
      });

      // CTA reveals
      gsap.fromTo(
        ".cta-tagline .tl",
        { yPercent: 110 },
        {
          yPercent: 0,
          stagger: 0.09,
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger: { trigger: ".bdp-cta", start: "top 80%" },
        }
      );
      gsap.to(".cta-sub", {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "expo.out",
        scrollTrigger: { trigger: ".bdp-cta", start: "top 75%" },
      });
      gsap.to(".cta-btns", {
        opacity: 1,
        duration: 0.9,
        ease: "expo.out",
        scrollTrigger: { trigger: ".bdp-cta", start: "top 70%" },
      });

      // Scroll progress bar
      const onScroll = () => {
        const max = document.body.scrollHeight - window.innerHeight;
        const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
        if (progRef.current) progRef.current.style.width = `${pct}%`;
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();

      return () => {
        hero?.removeEventListener("mousemove", onMove);
        window.removeEventListener("scroll", onScroll);
      };
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="bdp-page">
      <div ref={progRef} className="bdp-prog" />

      {/* HERO */}
      <section className="bdp-hero">
        {splineFailed ? (
          <ParticleField className="hero-spline" />
        ) : (
          <SplineBoundary onFail={() => setSplineFailed(true)}>
            <SplineScene
              scene={ROBOT_SCENE}
              className="hero-spline"
              onError={() => setSplineFailed(true)}
            />
          </SplineBoundary>
        )}
        <div className="hero-overlay" />
        <div className="hero-noise" />

        <div className="hero-badge">
          <span className="badge-dot" />
          Digital Transformation Partner
        </div>
        <h1 className="hero-title">
          <span className="clip-wrap">
            <span className="tl">
              Build <em>Bold.</em>
            </span>
          </span>
          <span className="clip-wrap">
            <span className="tl">Grow Fast.</span>
          </span>
          <span className="clip-wrap">
            <span className="tl">Lead Digital.</span>
          </span>
        </h1>
        <div className="hero-sub-row">
          <p className="hero-desc">
            Baptist Digitek powers enterprises with cutting-edge digital
            solutions — from intelligent software to transformative brand
            experiences.
          </p>
          <div className="hero-actions">
            <button className="btn-primary">Start a Project</button>
            <button className="btn-ghost">
              See Our Work <span className="aro">→</span>
            </button>
          </div>
        </div>
        <div className="scroll-hint">
          <span className="scroll-line" />
          Scroll to explore
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          {[...MARQUEE_WORDS, ...MARQUEE_WORDS].map((w, i) => (
            <span key={i} className="marquee-item">
              {w}
              <span className="sep">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* SERVICES */}
      <section className="bdp-services">
        <div className="services-intro">
          <div className="services-intro-row">
            <div>
              <div className="bdp-label">What We Do</div>
              <h2>
                Services built<br />for impact
              </h2>
            </div>
            <p className="services-desc">
              We combine strategy, design, and technology to create digital
              products that define industries and grow businesses.
            </p>
          </div>
        </div>
        <div className="bdp-services-pin">
          <div className="services-h-wrap" ref={servicesWrapRef}>
            {SERVICES.map((s) => (
              <div key={s.n} className="service-card">
                <span className="s-num">{s.n}</span>
                <div className="s-icon">{s.icon}</div>
                <div className="s-name">{s.name}</div>
                <p className="s-text">{s.text}</p>
                <span className="s-tag">{s.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className="bdp-stats">
        {STATS.map((s) => (
          <div key={s.label} className="stat-block">
            <div className="stat-num">
              <span className="cnt" data-t={s.target}>
                0
              </span>
              <span className="stat-sfx">{s.sfx}</span>
            </div>
            <div className="stat-lbl">{s.label}</div>
          </div>
        ))}
      </div>

      {/* PROCESS */}
      <section className="bdp-process">
        <div className="bdp-label">How We Work</div>
        <h2>
          A process that<br />delivers results
        </h2>
        <div className="proc-list">
          {PROCESS.map((p) => (
            <div key={p.n} className="proc-item">
              <span className="proc-n">{p.n}</span>
              <span className="proc-t">{p.t}</span>
              <span className="proc-tag">{p.tag}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bdp-cta">
        <div className="cta-glow-wrap">
          <div className="cta-glow" />
        </div>
        <h2 className="cta-tagline">
          <span className="clip-wrap">
            <span className="tl">Ready to go</span>
          </span>
          <span className="clip-wrap">
            <span className="tl">
              <em>digital?</em>
            </span>
          </span>
        </h2>
        <p className="cta-sub">
          Let&apos;s build something remarkable together. Tell us about your
          project and we&apos;ll get back within 24 hours.
        </p>
        <div className="cta-btns">
          <button className="btn-primary">Let&apos;s Talk</button>
          <button className="btn-ghost">
            hello@baptistdigitek.com <span className="aro">→</span>
          </button>
        </div>
      </section>
    </div>
  );
}
