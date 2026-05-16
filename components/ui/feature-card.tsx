"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type FeatureCardProps = {
  icon?: ReactNode;
  title: string;
  description: string;
  index?: number;
  className?: string;
};

export function FeatureCard({
  icon,
  title,
  description,
  index = 0,
  className,
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.07, duration: 0.55, ease: "easeOut" }}
      className={cn(
        "glass glass-hover rounded-xl p-6 md:p-7 h-full flex flex-col",
        className
      )}
    >
      {icon && (
        <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-purple-500/10 border border-purple-500/20 mb-5">
          {icon}
        </div>
      )}
      <h3 className="text-lg md:text-xl font-semibold mb-2 text-white">{title}</h3>
      <p className="text-sm md:text-base text-gray-400 leading-relaxed">{description}</p>
    </motion.div>
  );
}
