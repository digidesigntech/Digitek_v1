"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { X } from "lucide-react";
import { SplineScene } from "@/components/ui/spline-scene";
import { useRobotBehavior } from "@/lib/use-robot-behavior";
import { cn } from "@/lib/utils";
import { StarLink } from "@/components/ui/star-button";

if (typeof window !== "undefined") {
  gsap.registerPlugin(Flip);
}

type Pose = {
  rotateY?: number;
  rotateX?: number;
  scale?: number;
  x?: number;
  y?: number;
};

type RobotContextValue = {
  setPose: (pose: Pose, durationSec?: number) => void;
  setBubble: (text: string | null, durationMs?: number) => void;
  setVisible: (visible: boolean) => void;
  setAccent: (color: string | null) => void;
};

const noop: RobotContextValue = {
  setPose: () => {},
  setBubble: () => {},
  setVisible: () => {},
  setAccent: () => {},
};

const RobotContext = createContext<RobotContextValue>(noop);

export function useRobot(): RobotContextValue {
  return useContext(RobotContext);
}

const SCENE = "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode";

const HIDDEN_ON_PATHS = new Set(["/"]);

const PAGE_GREETINGS: Record<string, string> = {
  "/about": "Glad to show you around.",
  "/services": "Hover a card — I'll point at it.",
  "/solutions": "Industry packages, ready to ship.",
  "/portfolio": "Wow — we've done a lot.",
  "/digi-design": "Skin & aesthetics — our specialist studio.",
  "/contact": "Let's get you talking to the team.",
};

const PAGE_DEFAULT_ACCENT: Record<string, string> = {
  "/about": "rgba(191, 128, 255, 0.45)",
  "/services": "rgba(120, 200, 255, 0.45)",
  "/solutions": "rgba(255, 200, 100, 0.45)",
  "/portfolio": "rgba(180, 255, 200, 0.45)",
  "/digi-design": "rgba(255, 150, 200, 0.45)",
  "/contact": "rgba(140, 220, 255, 0.45)",
};

// Per-page entry choreography
const DEFAULT_ACCENT = "rgba(191, 128, 255, 0.35)";

function playEntryDance(el: HTMLElement | null, path: string) {
  if (!el) return null;
  // Always start with a settle-in
  const tl = gsap.timeline({ overwrite: "auto" });
  tl.fromTo(
    el,
    { scale: 0.82, y: 18, opacity: 0.55, rotateZ: 0 },
    { scale: 1, y: 0, opacity: 1, duration: 0.55, ease: "back.out(1.6)" }
  );

  switch (path) {
    case "/about":
      // Walking sway — left, right, neutral
      tl.to(el, { rotateY: -10, duration: 0.4, ease: "sine.inOut" })
        .to(el, { rotateY: 10, duration: 0.4, ease: "sine.inOut" })
        .to(el, { rotateY: 0, duration: 0.35, ease: "sine.inOut" });
      break;
    case "/services":
      // Tour-guide gesture
      tl.to(el, {
        rotateY: 15,
        scale: 1.05,
        duration: 0.55,
        ease: "power2.out",
      }).to(el, {
        rotateY: 0,
        scale: 1,
        duration: 0.4,
        ease: "power2.inOut",
      });
      break;
    case "/portfolio":
      // Wow lean-back
      tl.to(el, {
        rotateX: -14,
        scale: 1.08,
        duration: 0.5,
        ease: "power2.out",
      })
        .to(el, {
          rotateX: 4,
          scale: 1.02,
          duration: 0.35,
          ease: "power2.inOut",
        })
        .to(el, { rotateX: 0, scale: 1, duration: 0.35 });
      break;
    case "/contact":
      // Wave (rotateZ tilt)
      tl.to(el, { rotateZ: -12, duration: 0.22, ease: "power2.out" })
        .to(el, { rotateZ: 12, duration: 0.3, ease: "power2.inOut" })
        .to(el, {
          rotateZ: -6,
          duration: 0.25,
          ease: "power2.inOut",
        })
        .to(el, { rotateZ: 0, duration: 0.3, ease: "elastic.out(1, 0.5)" });
      break;
    case "/digi-design":
      // Creative spin
      tl.to(el, {
        rotateZ: 360,
        duration: 0.95,
        ease: "power2.inOut",
      }).set(el, { rotateZ: 0 });
      break;
    case "/solutions":
      // Looking around
      tl.to(el, { rotateY: -12, duration: 0.4, ease: "sine.inOut" })
        .to(el, { rotateY: 12, duration: 0.45, ease: "sine.inOut" })
        .to(el, { rotateY: 0, duration: 0.35 });
      break;
  }

  return tl;
}

// --- Typewriter (free SplitText alternative) ---
function Typewriter({ text }: { text: string }) {
  return (
    <span aria-label={text}>
      {text.split("").map((char, i) => (
        <motion.span
          key={`${i}-${char}`}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.022, duration: 0.18, ease: "easeOut" }}
          style={{ display: "inline-block", whiteSpace: "pre" }}
          aria-hidden
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

export function RobotProvider({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const driftRef = useRef<HTMLDivElement>(null);
  const robotRef = useRef<HTMLDivElement>(null);
  const flipStateRef = useRef<Flip.FlipState | null>(null);

  const [bubble, setBubbleState] = useState<string | null>(null);
  const [manuallyHidden, setManuallyHidden] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [accent, setAccentState] = useState<string | null>(null);

  const bubbleTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const clickCountRef = useRef(0);
  const lastClickTimeRef = useRef(0);
  const pathname = usePathname();

  const isHidden = manuallyHidden || HIDDEN_ON_PATHS.has(pathname);
  const accentColor =
    accent ?? PAGE_DEFAULT_ACCENT[pathname] ?? DEFAULT_ACCENT;

  useRobotBehavior(robotRef, {
    idleMs: isHidden || expanded ? false : 7000,
    wheelWobble: !isHidden && !expanded,
  });

  const setPose = useCallback((pose: Pose, durationSec: number = 1.0) => {
    if (!robotRef.current) return;
    gsap.to(robotRef.current, {
      rotateY: pose.rotateY ?? 0,
      rotateX: pose.rotateX ?? 0,
      scale: pose.scale ?? 1,
      x: pose.x ?? 0,
      y: pose.y ?? 0,
      duration: durationSec,
      ease: "power3.out",
      overwrite: "auto",
    });
  }, []);

  const setBubble = useCallback(
    (text: string | null, durationMs: number = 4500) => {
      if (bubbleTimeoutRef.current) clearTimeout(bubbleTimeoutRef.current);
      setBubbleState(text);
      if (text) {
        bubbleTimeoutRef.current = setTimeout(
          () => setBubbleState(null),
          durationMs
        );
      }
    },
    []
  );

  const setVisible = useCallback(
    (visible: boolean) => setManuallyHidden(!visible),
    []
  );

  const setAccent = useCallback(
    (color: string | null) => setAccentState(color),
    []
  );

  // --- Flip click-to-expand ---
  const toggleExpand = useCallback(() => {
    if (isHidden || !containerRef.current) return;
    flipStateRef.current = Flip.getState(
      [containerRef.current, robotRef.current].filter(Boolean) as Element[]
    );
    setExpanded((v) => !v);
  }, [isHidden]);

  useLayoutEffect(() => {
    if (!flipStateRef.current) return;
    Flip.from(flipStateRef.current, {
      duration: 0.7,
      ease: "power2.inOut",
      absolute: true,
      scale: true,
    });
    flipStateRef.current = null;
  }, [expanded]);

  // --- Happy dance (triple-click easter egg) ---
  const doHappyDance = useCallback(() => {
    if (!robotRef.current) return;
    gsap
      .timeline({ overwrite: "auto" })
      .to(robotRef.current, { rotateZ: -25, duration: 0.2, ease: "power2.out" })
      .to(robotRef.current, { rotateZ: 25, duration: 0.4, ease: "power2.inOut" })
      .to(robotRef.current, {
        rotateZ: -18,
        duration: 0.35,
        ease: "power2.inOut",
      })
      .to(robotRef.current, {
        rotateZ: 18,
        duration: 0.35,
        ease: "power2.inOut",
      })
      .to(robotRef.current, {
        rotateZ: 0,
        scale: 1.18,
        duration: 0.35,
        ease: "back.out(2)",
      })
      .to(robotRef.current, { scale: 1, duration: 0.3 });
    setBubble("Woohoo! 🎉", 3000);
  }, [setBubble]);

  // --- Click handler: triple-click → dance, otherwise toggle expand ---
  const handleRobotClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      const now = Date.now();
      if (now - lastClickTimeRef.current < 600) {
        clickCountRef.current += 1;
      } else {
        clickCountRef.current = 1;
      }
      lastClickTimeRef.current = now;

      if (clickCountRef.current >= 3) {
        clickCountRef.current = 0;
        doHappyDance();
        return;
      }
      toggleExpand();
    },
    [doHappyDance, toggleExpand]
  );

  // --- Page entry: dance + greet + reset accent ---
  useEffect(() => {
    setExpanded(false);
    flipStateRef.current = null;
    setAccentState(null); // each route resets to its default accent
    if (isHidden || !robotRef.current) return;

    const tl = playEntryDance(robotRef.current, pathname);

    const greeting = PAGE_GREETINGS[pathname];
    let bubbleTimeout: ReturnType<typeof setTimeout> | undefined;
    if (greeting) {
      bubbleTimeout = setTimeout(() => setBubble(greeting, 5000), 900);
    }

    return () => {
      tl?.kill();
      if (bubbleTimeout) clearTimeout(bubbleTimeout);
    };
  }, [pathname, isHidden, setBubble]);

  // --- Bubble bounce while a bubble is visible ---
  useEffect(() => {
    if (!bubble || !robotRef.current || isHidden || expanded) return;
    const tween = gsap.to(robotRef.current, {
      y: "-=4",
      duration: 0.45,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
    return () => {
      tween.kill();
      gsap.to(robotRef.current, { y: 0, duration: 0.3, ease: "power2.out" });
    };
  }, [bubble, isHidden, expanded]);

  // --- Mouse-avoidance (drift away from cursor) ---
  useEffect(() => {
    if (!driftRef.current || isHidden || expanded) return;
    const el = driftRef.current;

    const xTo = gsap.quickTo(el, "x", { duration: 0.55, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.55, ease: "power3.out" });

    const THRESHOLD = 240;
    const MAX_DRIFT = 80;

    const onMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < THRESHOLD) {
        const force = (THRESHOLD - dist) / THRESHOLD; // 0..1
        const angle = Math.atan2(dy, dx);
        xTo(-Math.cos(angle) * force * MAX_DRIFT);
        yTo(-Math.sin(angle) * force * MAX_DRIFT);
      } else {
        xTo(0);
        yTo(0);
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      xTo(0);
      yTo(0);
    };
  }, [isHidden, expanded]);

  // --- Escape closes expanded menu ---
  useEffect(() => {
    if (!expanded) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") toggleExpand();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [expanded, toggleExpand]);

  return (
    <RobotContext.Provider
      value={{ setPose, setBubble, setVisible, setAccent }}
    >
      {children}

      <div
        ref={containerRef}
        className={cn(
          "fixed z-30 hidden lg:flex transition-opacity duration-300",
          isHidden && "opacity-0 invisible pointer-events-none",
          expanded
            ? "inset-0 items-center justify-center bg-black/80 backdrop-blur-md flex-col"
            : "bottom-4 right-4 flex-col items-end"
        )}
        onClick={(e) => {
          if (expanded && e.target === e.currentTarget) toggleExpand();
        }}
      >
        {/* Drift wrapper — mouse-avoidance moves this so we don't touch container's Flip-managed transform */}
        <div ref={driftRef} className="flex flex-col items-end">
          <AnimatePresence>
            {bubble && !isHidden && !expanded && (
              <motion.div
                key={bubble}
                initial={{ opacity: 0, y: 8, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -4, scale: 0.95 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="mb-2 max-w-[280px] px-4 py-2 rounded-2xl bg-black/70 backdrop-blur-md border border-white/10 text-xs text-gray-200 shadow-lg"
              >
                <Typewriter text={bubble} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Accent glow ring — sits behind the robot, color shifts via setAccent */}
          <div className="relative">
            <div
              aria-hidden
              className="absolute inset-0 -m-4 rounded-full transition-[box-shadow] duration-700 pointer-events-none"
              style={{
                boxShadow: !isHidden && !expanded
                  ? `0 0 90px -20px ${accentColor}`
                  : "none",
              }}
            />
            <div
              ref={robotRef}
              onClick={handleRobotClick}
              className={cn(
                "relative will-change-transform pointer-events-auto cursor-pointer",
                expanded
                  ? "w-[300px] h-[300px] sm:w-[380px] sm:h-[380px]"
                  : "w-[180px] h-[180px] xl:w-[220px] xl:h-[220px]"
              )}
              style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
            >
              <SplineScene scene={SCENE} className="w-full h-full" />
            </div>
          </div>
        </div>

        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.45, ease: "easeOut" }}
            className="mt-6 flex flex-col items-center gap-4 px-6 max-w-md text-center"
          >
            <h3 className="text-2xl sm:text-3xl font-bold gradient-text">
              How can I help?
            </h3>
            <p className="text-sm text-gray-400">
              Pick the shortest path to something useful.
            </p>
            <div className="flex flex-wrap gap-3 justify-center mt-2">
              <StarLink href="/contact" onClick={toggleExpand}>
                Start a Project
              </StarLink>
              <Link
                href="/portfolio"
                onClick={toggleExpand}
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-5 py-2.5 text-sm font-semibold hover:bg-white/5 transition-colors"
              >
                See Our Work
              </Link>
              <a
                href="https://wa.me/917845834708"
                target="_blank"
                rel="noopener noreferrer"
                onClick={toggleExpand}
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-5 py-2.5 text-sm font-semibold hover:bg-white/5 transition-colors"
              >
                WhatsApp
              </a>
            </div>
            <button
              type="button"
              onClick={toggleExpand}
              className="mt-4 inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
            >
              <X className="h-3.5 w-3.5" />
              Close (Esc)
            </button>
          </motion.div>
        )}
      </div>
    </RobotContext.Provider>
  );
}
