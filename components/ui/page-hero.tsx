"use client";

import { motion, type Variants } from "framer-motion";
import { Zap } from "lucide-react";
import ParticleField from "@/components/ui/particle-field";

type PageHeroProps = {
  badge?: string;
  title: string;
  subtitle?: string;
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15 + 0.2, duration: 0.7, ease: "easeOut" },
  }),
};

export function PageHero({ badge, title, subtitle }: PageHeroProps) {
  return (
    <section className="relative min-h-[70vh] w-full flex items-center justify-center overflow-hidden pt-24 pb-16">
      <ParticleField className="absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/30 to-black pointer-events-none" />

      <div className="container relative z-10 text-center max-w-4xl">
        {badge && (
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6 backdrop-blur-sm"
          >
            <Zap className="h-4 w-4 text-purple-400" />
            <span className="text-sm font-medium text-gray-200">{badge}</span>
          </motion.div>
        )}
        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 gradient-text"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="max-w-2xl mx-auto text-base md:text-lg text-gray-400"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
