import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { ServicesGrid } from "@/components/ui/services-grid";
import ShaderBackground from "@/components/ui/shader-background";

export const metadata: Metadata = {
  title:
    "IT Services in Chennai | Web, Software, Mobile & Marketing | Baptist Digitek",
  description:
    "Explore Baptist Digitek's full-stack IT services — website development, hosting, branding, digital marketing, software, mobile apps and IT consulting from Chennai.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        badge="What We Do"
        title="Seven Services. One Partner. Zero Headaches."
        subtitle="From the first pixel of your website to the last conversion in your funnel — we design, build, host, market, and maintain it all. Pick one service, stack a few, or hand us the whole roadmap. Your call."
      />
      <section className="relative overflow-hidden pt-2 md:pt-4 pb-10 md:pb-14">
        <ShaderBackground className="absolute inset-0 w-full h-full pointer-events-none opacity-60" />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80 pointer-events-none"
        />
        <div className="container relative z-10">
          <ServicesGrid />
        </div>
      </section>
      <Section className="pt-6 md:pt-10 pb-20 md:pb-28" containerClassName="text-center">
        <div className="glass rounded-2xl p-10 md:p-14 max-w-3xl mx-auto purple-glow">
          <h3 className="text-2xl md:text-4xl font-bold gradient-text mb-4">
            Stuck on where to start?
          </h3>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Skip the guesswork. Jump on a quick call with our team and we'll map
            the fastest route from where you are to where you want to be — no
            fluff, no pressure, no sales script.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-white text-black px-6 py-3 font-semibold hover:bg-gray-200 transition-colors"
          >
            Get Your Free Roadmap
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>
    </>
  );
}