"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface GradientCardProps {
  icon: LucideIcon;
  title: string;
}

export const GradientCard = ({ icon: Icon, title }: GradientCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotation({
      x: -(y / rect.height) * 5,
      y: (x / rect.width) * 5,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative w-full rounded-xl overflow-hidden"
      style={{
        transformStyle: "preserve-3d",
        backgroundColor: "#0e131f",
        boxShadow:
          "0 -10px 100px 10px rgba(78, 99, 255, 0.2), 0 0 10px 0 rgba(0, 0, 0, 0.5)",
      }}
      initial={{ y: 0 }}
      animate={{
        y: isHovered ? -3 : 0,
        rotateX: rotation.x,
        rotateY: rotation.y,
        perspective: 1000,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {/* Glass reflection overlay */}
      <motion.div
        className="absolute inset-0 z-30 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0) 80%, rgba(255,255,255,0.05) 100%)",
          backdropFilter: "blur(2px)",
        }}
        animate={{ opacity: isHovered ? 0.7 : 0.5 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />

      {/* Black base */}
      <div
        className="absolute inset-0 z-0"
        style={{ background: "linear-gradient(180deg, #000000 0%, #000000 70%)" }}
      />

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-30 mix-blend-overlay z-10 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Purple/blue corner glow */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-2/3 z-20 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at bottom right, rgba(172, 92, 255, 0.7) -10%, rgba(79, 70, 229, 0) 70%),
            radial-gradient(ellipse at bottom left, rgba(56, 189, 248, 0.7) -10%, rgba(79, 70, 229, 0) 70%)
          `,
          filter: "blur(40px)",
        }}
        animate={{ opacity: isHovered ? 0.9 : 0.8 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />

      {/* Central purple glow */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-2/3 z-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at bottom center, rgba(161, 58, 229, 0.7) -20%, rgba(79, 70, 229, 0) 60%)",
          filter: "blur(45px)",
        }}
        animate={{ opacity: isHovered ? 0.85 : 0.75, y: "10%" }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />

      {/* Bottom border glow */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] z-25 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.7) 50%, rgba(255, 255, 255, 0.05) 100%)",
        }}
        animate={{
          boxShadow: isHovered
            ? "0 0 20px 4px rgba(172, 92, 255, 0.9), 0 0 30px 6px rgba(138, 58, 185, 0.7), 0 0 40px 8px rgba(56, 189, 248, 0.5)"
            : "0 0 12px 2px rgba(172, 92, 255, 0.6), 0 0 20px 4px rgba(138, 58, 185, 0.4), 0 0 28px 6px rgba(56, 189, 248, 0.3)",
          opacity: isHovered ? 1 : 0.85,
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />

      {/* Card content — compact horizontal layout to match existing grid */}
      <div className="relative flex items-center gap-3 p-5 z-40">
        <motion.div
          className="h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0 relative overflow-hidden"
          style={{
            background: "linear-gradient(225deg, #171c2c 0%, #121624 100%)",
          }}
          animate={{
            boxShadow: isHovered
              ? "0 6px 12px -2px rgba(0, 0, 0, 0.3), inset 1px 1px 3px rgba(255, 255, 255, 0.15), inset -1px -1px 3px rgba(0, 0, 0, 0.6)"
              : "0 4px 8px -2px rgba(0, 0, 0, 0.25), inset 1px 1px 2px rgba(255, 255, 255, 0.1), inset -1px -1px 2px rgba(0, 0, 0, 0.5)",
            y: isHovered ? -1 : 0,
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div
            className="absolute top-0 left-0 w-2/3 h-2/3 opacity-40 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at top left, rgba(255, 255, 255, 0.5), transparent 80%)",
              filter: "blur(8px)",
            }}
          />
          <Icon className="h-4 w-4 text-purple-300 relative z-10" />
        </motion.div>
        <span className="text-sm md:text-base text-gray-200 font-medium">
          {title}
        </span>
      </div>
    </motion.div>
  );
};
