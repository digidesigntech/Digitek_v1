import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AetherFlowHero from "@/components/ui/aether-flow-hero";
import { Section } from "@/components/ui/section";
import { ScrollytellingHome } from "@/components/ui/scrollytelling-home";
import { MotionPathSparkle } from "@/components/ui/motion-path-sparkle";
import { StatsStrip } from "@/components/ui/stats-strip";

export const metadata: Metadata = {
  title: "Baptist Digitek | Website Development & IT Solutions Company in Chennai",
  description:
    "Baptist Digitek Private Limited is a Chennai-based website development and IT solutions company offering web design, software, mobile apps, hosting, branding and digital marketing across Tamil Nadu and India.",
};

const ROBOT_SCENE = "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode";

export default function HomePage() {
  return (
    <>
      <div id="home-hero">
        <AetherFlowHero
          badge="Baptist Digitek · Chennai"
          title="Digital, Done Right."
          subtitle="Websites, software and apps for businesses across Tamil Nadu — strategy to support, under one accountable roof."
          ctaLabel="Start a Project"
          ctaHref="/contact"
          secondaryLabel="See Our Work"
          secondaryHref="/portfolio"
          splineScene={ROBOT_SCENE}
        />
      </div>

      <Section
        eyebrow="One team, every stage"
        title="One Team. Every Capability."
        description="No vendor juggling. Strategy through support, all under one accountable roof."
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {[
            "Strategy",
            "Design",
            "Development",
            "Deployment",
            "Marketing",
            "Support",
          ].map((label) => (
            <div key={label} className="card-5" aria-label={label}>
              <div className="card-5__holo">
                <span className="card-5__layer card-5__layer--back">{label}</span>
                <span className="card-5__layer card-5__layer--mid">{label}</span>
                <span className="card-5__layer card-5__layer--front">{label}</span>
              </div>
            </div>
          ))}
        </div>

        <p className="text-sm text-gray-500 text-center mt-8">
          From <span className="text-gray-300">Chromepet, Chennai</span> · with extended capacity from{" "}
          <span className="text-gray-300">Tanjore</span>
        </p>
      </Section>

      <MotionPathSparkle />

      <ScrollytellingHome scene={ROBOT_SCENE} />

      <StatsStrip />

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
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-white text-black px-6 py-3 font-semibold hover:bg-gray-200 transition-colors"
            >
              Talk to Us
              <ArrowRight className="h-4 w-4" />
            </Link>
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
