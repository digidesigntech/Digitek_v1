"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Stat =
  | {
      kind: "count";
      to: number;
      suffix?: string;
      label: string;
      sub: string;
    }
  | {
      kind: "label";
      value: string;
      label: string;
      sub: string;
    };

const STATS: Stat[] = [
  {
    kind: "count",
    to: 500,
    suffix: "+",
    label: "Clients in India",
    sub: "Aesthetic dermatology & cosmetology",
  },
  {
    kind: "label",
    value: "Global",
    label: "Delivery",
    sub: "In-house-style design across markets",
  },
  {
    kind: "label",
    value: "Full-service",
    label: "Across platforms",
    sub: "Social, print, web, brand, campaigns",
  },
];

export function StatsBand() {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const counterRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (!gridRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Card entrance — stagger up with a tiny 3D tilt for depth.
      const cards = gridRef.current!.querySelectorAll(".stats-band-card");
      gsap.from(cards, {
        y: 50,
        opacity: 0,
        rotateX: 12,
        transformPerspective: 800,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 78%",
          once: true,
        },
      });

      // Counter — animate the numeric value up from 0 when the card enters.
      // We mutate the existing text node's nodeValue (not textContent, which
      // would replace the text node and orphan the reference React holds —
      // that orphan is what triggered "removeChild ... not a child" errors
      // during route navigation).
      if (counterRef.current) {
        const el = counterRef.current;
        const target = { v: 0 };
        const finalValue = Number(el.dataset.to ?? "0");
        const suffix = el.dataset.suffix ?? "";
        const textNode =
          (el.firstChild as Text | null) ??
          el.appendChild(document.createTextNode("0" + suffix));
        gsap.to(target, {
          v: finalValue,
          duration: 2.0,
          ease: "power3.out",
          onUpdate: () => {
            textNode.nodeValue = Math.round(target.v).toString() + suffix;
          },
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 78%",
            once: true,
          },
        });
      }
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={gridRef} className="grid sm:grid-cols-3 gap-5">
      {STATS.map((s) => (
        <div key={s.label} className="stats-band-card glass rounded-2xl p-6 md:p-8">
          <div className="text-3xl md:text-4xl font-bold gradient-text mb-2 tabular-nums">
            {s.kind === "count" ? (
              <span
                ref={counterRef}
                data-to={s.to}
                data-suffix={s.suffix ?? ""}
              >
                {`0${s.suffix ?? ""}`}
              </span>
            ) : (
              s.value
            )}
          </div>
          <div className="text-sm font-semibold text-white mb-1">
            {s.label}
          </div>
          <div className="text-xs text-gray-400 leading-relaxed">{s.sub}</div>
        </div>
      ))}
    </div>
  );
}
