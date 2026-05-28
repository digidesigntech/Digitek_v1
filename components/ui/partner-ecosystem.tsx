"use client";

import { motion } from "framer-motion";

const PARTNERS = [
  "Cloud Providers",
  "Payment Gateways",
  "Email & SMS",
  "Analytics",
  "Marketing Automation",
];

export function PartnerEcosystem() {
  return (
    <section className="section-pad relative">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12 max-w-3xl"
        >
          <span className="inline-block text-xs uppercase tracking-[0.2em] text-purple-300 mb-3">
            Partner Ecosystem
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight gradient-text mb-4">
            Our Solution Partners
          </h2>
          <p className="text-gray-400 text-base md:text-lg leading-relaxed">
            Cloud, payment, analytics and marketing platforms — your stack
            stays enterprise-grade even when your team is small.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08 } },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
        >
          {PARTNERS.map((p) => (
            <motion.div
              key={p}
              variants={{
                hidden: { opacity: 0, y: 18, scale: 0.96 },
                show: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.5, ease: "easeOut" },
                },
              }}
              className="glass rounded-xl px-6 py-7 text-center flex items-center justify-center min-h-[88px] hover:bg-white/[0.06] hover:border-purple-400/40 transition-colors"
            >
              <span className="shine tracking-tight">{p}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
