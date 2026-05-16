"use client";

import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/ui/animated-counter";

type Stat = {
  to: number;
  suffix?: string;
  prefix?: string;
  label: string;
};

const STATS: Stat[] = [
  { to: 29, suffix: "+", label: "Hospitality properties live" },
  { to: 200, suffix: "+", label: "Sites & platforms shipped" },
  { to: 2, label: "Offices · Chennai & Tanjore" },
  { to: 10, suffix: "+", label: "Years in the trade" },
];

export function StatsStrip() {
  return (
    <div className="border-t border-white/10 bg-gradient-to-b from-black via-black to-purple-950/10">
      <div className="container py-14 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: "easeOut" }}
              className="text-center md:text-left"
            >
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold gradient-text leading-none mb-2">
                <AnimatedCounter
                  to={s.to}
                  prefix={s.prefix}
                  suffix={s.suffix}
                />
              </div>
              <div className="text-xs sm:text-sm text-gray-400 tracking-wide">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
