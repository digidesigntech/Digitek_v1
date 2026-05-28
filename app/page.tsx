import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { HomeHeroOrchestrator } from "@/components/ui/home-hero-orchestrator";
import { StarLink } from "@/components/ui/star-button";

export const metadata: Metadata = {
  title: "Baptist Digitek | Website Development & IT Solutions Company in Chennai",
  description:
    "Baptist Digitek Private Limited is a Chennai-based website development and IT solutions company offering web design, software, mobile apps, hosting, branding and digital marketing across Tamil Nadu and India.",
};

export default function HomePage() {
  return (
    <>
      <HomeHeroOrchestrator
        badge="Baptist Digitek · Chennai"
        title="Digital, Done Right."
        subtitle="Websites, software and apps for businesses across Tamil Nadu — strategy to support, under one accountable roof."
        ctaLabel="Start a Project"
        ctaHref="/contact"
        secondaryLabel="See Our Work"
        secondaryHref="/portfolio"
      />

      <Section id="cta" containerClassName="text-center">
        <div className="glass rounded-2xl p-10 md:p-14 max-w-3xl mx-auto purple-glow">
          <h3 className="text-2xl md:text-4xl font-bold gradient-text mb-4">
            Have a project, a question, or a rough sketch on paper?
          </h3>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Send us a WhatsApp or pick up the phone — first conversations are
            always free.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <StarLink href="/contact">Talk to Us</StarLink>
            <a
              href="https://wa.me/917845834708"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-6 py-3 font-semibold hover:bg-white/5 transition-colors"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}
