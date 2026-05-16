"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { Observer } from "gsap/Observer";

if (typeof window !== "undefined") {
  gsap.registerPlugin(Observer);
}

type Options = {
  /** Start the idle micro-animation after N ms of inactivity. `false` disables. */
  idleMs?: number | false;
  /** Wobble rotateZ in response to fast scroll wheel / touch flick. */
  wheelWobble?: boolean;
};

/**
 * Adds the robot's "alive" micro-personality to any element wrapping a Spline scene.
 *
 *  • Randomized idle timeline — uses `repeatRefresh: true` + function-based values
 *    so every loop picks fresh random sway/blink amounts. Feels organic, not robotic.
 *
 *  • Wheel wobble via GSAP `Observer` — fast scroll → robot tilts (`rotateZ`),
 *    slow / stopped → settles back to 0 with elastic ease. Independent axis,
 *    so it composes with `setPose` (which uses rotateX/Y/scale) without conflict.
 */
export function useRobotBehavior(
  ref: RefObject<HTMLDivElement | null>,
  { idleMs = 6000, wheelWobble = true }: Options = {}
) {
  useEffect(() => {
    if (!ref.current) return;
    const element = ref.current;

    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let idleTl: gsap.core.Timeline | null = null;

    const startIdle = () => {
      idleTl = gsap.timeline({
        repeat: -1,
        repeatDelay: 1.8,
        repeatRefresh: true,
      });

      idleTl
        .to(element, {
          rotateY: () => gsap.utils.random(-9, 9),
          rotateX: () => gsap.utils.random(-4, 4),
          duration: () => gsap.utils.random(1.4, 2.2),
          ease: "sine.inOut",
        })
        .to(element, {
          rotateY: () => gsap.utils.random(-9, 9),
          rotateX: () => gsap.utils.random(-3, 3),
          duration: () => gsap.utils.random(1.4, 2.2),
          ease: "sine.inOut",
        })
        // Cute blink — small scale dip
        .to(element, { scale: "-=0.025", duration: 0.1, ease: "power1.in" })
        .to(element, { scale: "+=0.025", duration: 0.18, ease: "power1.out" })
        // Return to a near-neutral position before the next loop
        .to(element, {
          rotateY: () => gsap.utils.random(-3, 3),
          rotateX: 0,
          duration: 1,
          ease: "sine.inOut",
        });
    };

    const resetIdle = () => {
      if (timeoutId) clearTimeout(timeoutId);
      idleTl?.kill();
      idleTl = null;
      if (idleMs !== false) {
        timeoutId = setTimeout(startIdle, idleMs);
      }
    };

    resetIdle();
    const activityHandler = () => resetIdle();
    window.addEventListener("mousemove", activityHandler, { passive: true });
    window.addEventListener("scroll", activityHandler, { passive: true });
    window.addEventListener("touchstart", activityHandler, { passive: true });
    window.addEventListener("keydown", activityHandler);

    // --- Wheel wobble (#6 Observer) -----------------------------------------
    let observer: ReturnType<typeof Observer.create> | null = null;
    let velocity = 0;
    let raf = 0;
    let wobbleTo: ((v: number) => void) | null = null;

    if (wheelWobble) {
      wobbleTo = gsap.quickTo(element, "rotateZ", {
        duration: 0.3,
        ease: "power2.out",
      });

      const tick = () => {
        velocity *= 0.86;
        const target = gsap.utils.clamp(-12, 12, velocity);
        wobbleTo?.(target);
        if (Math.abs(velocity) > 0.15) {
          raf = requestAnimationFrame(tick);
        } else {
          velocity = 0;
          wobbleTo?.(0);
          raf = 0;
        }
      };

      observer = Observer.create({
        target: window,
        type: "wheel,touch",
        onChangeY: (self) => {
          // self.deltaY for wheel; touch normalizes too
          const delta = self.deltaY ?? 0;
          velocity = gsap.utils.clamp(-30, 30, velocity + delta * 0.05);
          if (!raf) raf = requestAnimationFrame(tick);
        },
      });
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      idleTl?.kill();
      observer?.kill();
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", activityHandler);
      window.removeEventListener("scroll", activityHandler);
      window.removeEventListener("touchstart", activityHandler);
      window.removeEventListener("keydown", activityHandler);
    };
  }, [ref, idleMs, wheelWobble]);
}
