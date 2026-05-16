"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type SectionProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  align?: "left" | "center";
  id?: string;
};

export function Section({
  eyebrow,
  title,
  description,
  children,
  className,
  containerClassName,
  align = "left",
  id,
}: SectionProps) {
  return (
    <section id={id} className={cn("section-pad relative", className)}>
      <div className={cn("container", containerClassName)}>
        {(eyebrow || title || description) && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={cn(
              "mb-12 max-w-3xl",
              align === "center" && "mx-auto text-center"
            )}
          >
            {eyebrow && (
              <span className="inline-block text-xs uppercase tracking-[0.2em] text-purple-300 mb-3">
                {eyebrow}
              </span>
            )}
            {title && (
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight gradient-text mb-4">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-gray-400 text-base md:text-lg leading-relaxed">
                {description}
              </p>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}
