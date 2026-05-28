"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Application } from "@splinetool/runtime";
import AetherFlowHero from "@/components/ui/aether-flow-hero";
import { RobotStarSystem } from "@/components/ui/robot-star-system";
import { SplineScene } from "@/components/ui/spline-scene";

const ROBOT_SCENE =
  "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode";

type HomeHeroOrchestratorProps = {
  badge?: string;
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export function HomeHeroOrchestrator(props: HomeHeroOrchestratorProps) {
  const heroAnchorRef = useRef<HTMLDivElement | null>(null);
  const starsysAnchorRef = useRef<HTMLDivElement | null>(null);
  const floatingRobotRef = useRef<HTMLDivElement | null>(null);
  // Captured on Spline's onLoad — used to (a) trigger ScrollTrigger.refresh
  // once the 3D scene actually mounts, eliminating the race where the lerp
  // measures rects before Spline has shifted layout, and (b) dispose the
  // scene on unmount so the canvas doesn't leak across client-side route
  // changes.
  const splineAppRef = useRef<Application | null>(null);
  // null = "not yet decided on client". Once set to true/false, we never flip
  // back — preventing the Spline mount → unmount → mount race that caused
  // `removeChild` errors when isDesktop toggled mid-session.
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

  const handleSplineLoad = useCallback((app: Application) => {
    splineAppRef.current = app;
    // The hero anchor's rect changes once Spline finishes mounting (it
    // can briefly grow during init). Refresh so the orchestrator's lerp
    // reads accurate coordinates and the robot lands on the orbital anchor.
    ScrollTrigger.refresh();
  }, []);

  // Defensive cleanup: on unmount (e.g. client-side navigation away from /),
  // explicitly dispose the Spline runtime. @splinetool/react-spline has
  // known issues where its own cleanup leaves the WebGL canvas attached,
  // producing the "robot persists on /services" bug.
  useEffect(() => {
    return () => {
      splineAppRef.current?.dispose();
      splineAppRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)"
    );
    setIsDesktop(mq.matches);
    // Deliberately do not subscribe to mq changes. If the user resizes past
    // the breakpoint mid-session, the robot mode stays whatever it started
    // as — a small UX cost in exchange for never re-mounting Spline.
  }, []);

  useEffect(() => {
    if (!isDesktop) return;
    if (
      !heroAnchorRef.current ||
      !starsysAnchorRef.current ||
      !floatingRobotRef.current
    ) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const robot = floatingRobotRef.current;
    const hero = heroAnchorRef.current;
    const star = starsysAnchorRef.current;

    // Cache the anchor boxes (in document coordinates) and only re-measure
    // on resize / refresh. Reading getBoundingClientRect on every scroll
    // frame forces layout — that's the jank the user perceives as
    // "buffering" while the robot follows the scroll lerp.
    type Box = { width: number; height: number; left: number; top: number };
    let heroBox: Box = { width: 0, height: 0, left: 0, top: 0 };
    let starBox: Box = { width: 0, height: 0, left: 0, top: 0 };

    const measure = () => {
      const h = hero.getBoundingClientRect();
      const s = star.getBoundingClientRect();
      const sx = window.scrollX;
      const sy = window.scrollY;
      heroBox = { width: h.width, height: h.height, left: h.left + sx, top: h.top + sy };
      starBox = { width: s.width, height: s.height, left: s.left + sx, top: s.top + sy };
    };

    const placeAt = (progress: number) => {
      const lerp = (a: number, b: number) => a + (b - a) * progress;
      const width = lerp(heroBox.width, starBox.width);
      const height = lerp(heroBox.height, starBox.height);
      // Subtract scrollY/X to translate from document to viewport coords
      // (the floating robot is position: fixed).
      const left = lerp(heroBox.left, starBox.left) - window.scrollX;
      const top = lerp(heroBox.top, starBox.top) - window.scrollY;

      gsap.set(robot, {
        x: left,
        y: top,
        width,
        height,
        force3D: true,
      });
    };

    measure();
    placeAt(0);
    gsap.set(robot, { autoAlpha: 1 });

    const ctx = gsap.context(() => {
      // Find the starsys <section> as a trigger; the anchor lives inside it.
      const starsysSection = star.closest("section");
      if (!starsysSection) return;

      const trigger = ScrollTrigger.create({
        trigger: starsysSection as HTMLElement,
        start: "top bottom",
        end: "top top",
        scrub: 0.4,
        invalidateOnRefresh: true,
        onUpdate: (self) => placeAt(self.progress),
        onRefresh: () => {
          measure();
          placeAt(0);
        },
      });

      // Fade the floating robot out once the user scrolls past the rings
      // and into the CTA section below — it shouldn't keep hovering over
      // unrelated content. Also drop pointer-events the moment the fade
      // starts so the invisible robot can't intercept clicks on the CTA.
      const ctaSection = document.getElementById("cta");
      if (ctaSection) {
        gsap.fromTo(
          robot,
          { autoAlpha: 1 },
          {
            autoAlpha: 0,
            ease: "none",
            scrollTrigger: {
              trigger: ctaSection,
              start: "top bottom",
              end: "top 70%",
              scrub: 0.3,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                robot.style.pointerEvents = self.progress > 0 ? "none" : "auto";
              },
            },
          }
        );
      }

      const onResize = () => {
        measure();
        placeAt(trigger.progress ?? 0);
      };
      window.addEventListener("resize", onResize);

      return () => {
        window.removeEventListener("resize", onResize);
      };
    });

    // ScrollTrigger may need a refresh after Spline mounts and shifts layout.
    const refreshTimer = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 600);

    return () => {
      window.clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, [isDesktop]);

  // hideRobot rules — designed so each Spline instance mounts at most ONCE
  // per page lifetime (no mount → unmount → mount race that triggers Spline's
  // internal `removeChild` cleanup against a node React already removed).
  //   isDesktop === null  → before client decides: hide inline robot, no floating
  //   isDesktop === false → mobile: inline robot shows in hero, no floating
  //   isDesktop === true  → desktop: inline hidden, floating shows
  const hideInlineHeroRobot = isDesktop !== false;
  const showFloatingRobot = isDesktop === true;

  return (
    <>
      <div id="home-hero">
        <AetherFlowHero
          {...props}
          splineScene={ROBOT_SCENE}
          robotAnchorRef={heroAnchorRef}
          hideRobot={hideInlineHeroRobot}
        />
      </div>

      <RobotStarSystem
        robotAnchorRef={starsysAnchorRef}
        hideRobot={true}
      />

      {showFloatingRobot && (
        <div
          ref={floatingRobotRef}
          className="home-floating-robot"
          aria-hidden="true"
          style={{ opacity: 0 }}
        >
          <SplineScene
            scene={ROBOT_SCENE}
            className="w-full h-full"
            onLoad={handleSplineLoad}
          />
        </div>
      )}
    </>
  );
}
