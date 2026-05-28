import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/section";
import { PaintDotsOrbit } from "@/components/ui/paint-dots-orbit";
import { GalaxyHero } from "@/components/ui/galaxy-hero";
import { WhyPillarsStory } from "@/components/ui/why-pillars-story";
import { PaintbrushCursor } from "@/components/ui/paintbrush-cursor";
import { StatsBand } from "@/components/ui/stats-band";
import { MediumsMarquee } from "@/components/ui/mediums-marquee";
import { siteConfig } from "@/lib/site";
import { StarLink } from "@/components/ui/star-button";

export const metadata: Metadata = {
  title:
    "Digi Design | Full-Service Design Studio · Aesthetic Dermatology Specialists",
  description:
    "Digi Design is a full-service design studio working across industries and channels, with deep specialisation in aesthetic dermatology and cosmetology — trusted by 500+ clients in India and delivering globally.",
};

export default function DigiDesignPage() {
  return (
    <>
      <PaintbrushCursor />
      <GalaxyHero />

      {/* Stats band — the three headline claims, with 500+ counting up */}
      <Section>
        <StatsBand />
      </Section>

      {/* Bridge — every medium they design across, on two infinite rows */}
      <MediumsMarquee />

      {/* Who we are — one short paragraph */}
      <Section>
        <div className="grid lg:grid-cols-[1fr_280px] gap-10 items-center">
          <div className="glass rounded-3xl p-8 md:p-12">
            <span className="inline-block text-xs uppercase tracking-[0.2em] text-purple-300 mb-3">
              Who We Are
            </span>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight gradient-text mb-4">
              Broad capability. Deep specialisation in aesthetics.
            </h2>
            <p className="text-gray-400 leading-relaxed">
              Digi Design works across platforms and industries — social,
              print, web, brand, campaigns — for clients who need design
              that's consistent, fast and genuinely good. Where we go deepest
              is aesthetic dermatology and cosmetology. We already live in
              that visual language, so clinics don't get a generalist learning
              their world — they get a team that already speaks it.
            </p>
          </div>
          <div className="flex justify-center">
            <PaintDotsOrbit size={240} />
          </div>
        </div>
      </Section>

      {/* Why Digi Design — four pillars told one at a time */}
      <WhyPillarsStory />

      {/* Closing CTA */}
      <Section containerClassName="text-center">
        <div className="glass rounded-2xl p-10 md:p-14 max-w-3xl mx-auto purple-glow">
          <h3 className="text-2xl md:text-4xl font-bold gradient-text mb-4">
            Need a design partner that delivers across platforms — and
            understands aesthetics?
          </h3>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Step into the portfolio to see how we work, who we work with, and
            what becoming your design partner could look like.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <StarLink href={siteConfig.digiDesignUrl}>See Our Work</StarLink>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-purple-500/10 border border-purple-500/30 text-gray-100 px-6 py-3 font-semibold hover:bg-purple-500/20 transition-colors"
            >
              Talk to Us
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
