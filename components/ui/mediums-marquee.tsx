"use client";

import { motion } from "framer-motion";

const ROW_DIGITAL = [
  "Brand Identity",
  "Campaigns",
  "Web",
  "Social",
  "Motion",
  "Iconography",
  "Typography",
  "Editorial",
  "Pitch Decks",
  "Visual Systems",
];

const ROW_CLINIC = [
  "Treatment Menus",
  "Clinic Collateral",
  "Print",
  "Packaging",
  "Lookbooks",
  "Photo Direction",
  "Out-of-Home",
  "Annual Reports",
  "Email Design",
  "Landing Pages",
];

export function MediumsMarquee() {
  return (
    <section className="mediums-marquee">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mediums-marquee-headline"
        >
          <span className="mediums-marquee-eyebrow">
            Across every surface
          </span>
          <h3 className="mediums-marquee-title">
            We design wherever the brand lives.
          </h3>
        </motion.div>
      </div>

      <div className="mediums-marquee-rows" aria-hidden="true">
        <div className="mediums-marquee-track mediums-marquee-track--left">
          {[...ROW_DIGITAL, ...ROW_DIGITAL].map((m, i) => (
            <span key={`d-${i}`} className="mediums-marquee-chip">
              <span className="mediums-marquee-bullet" />
              {m}
            </span>
          ))}
        </div>
        <div className="mediums-marquee-track mediums-marquee-track--right">
          {[...ROW_CLINIC, ...ROW_CLINIC].map((m, i) => (
            <span
              key={`c-${i}`}
              className="mediums-marquee-chip mediums-marquee-chip--alt"
            >
              <span className="mediums-marquee-bullet mediums-marquee-bullet--alt" />
              {m}
            </span>
          ))}
        </div>
      </div>

      {/* Screen-reader-only list — the visual marquee is aria-hidden. */}
      <ul className="sr-only">
        {[...ROW_DIGITAL, ...ROW_CLINIC].map((m) => (
          <li key={m}>{m}</li>
        ))}
      </ul>
    </section>
  );
}
