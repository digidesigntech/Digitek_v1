import type { Metadata } from "next";
import {
  Globe,
  Megaphone,
  Code2,
  Smartphone,
  Cpu,
  Server,
} from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { ServicesGrid } from "@/components/ui/services-grid";
import ShaderBackground from "@/components/ui/shader-background";
import { StarLink } from "@/components/ui/star-button";

export const metadata: Metadata = {
  title:
    "IT Services in Chennai | Web, Software, Mobile & Marketing | Baptist Digitek",
  description:
    "Explore Baptist Digitek's full-stack IT services — website development, hosting, branding, digital marketing, software, mobile apps and IT consulting from Chennai.",
};

const HERO_CHIPS = [
  { icon: Globe, label: "Web" },
  { icon: Megaphone, label: "Marketing" },
  { icon: Code2, label: "Software" },
  { icon: Smartphone, label: "Mobile" },
  { icon: Cpu, label: "Consulting" },
  { icon: Server, label: "Hosting" },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        badge="What We Do"
        title="Six Services. One Partner. Zero Headaches."
        subtitle="From the first pixel of your website to the last conversion in your funnel — we design, build, host, market, and maintain it all. Pick one service, stack a few, or hand us the whole roadmap. Your call."
        background={
          <ShaderBackground className="absolute inset-0 w-full h-full pointer-events-none opacity-60" />
        }
        footer={
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {HERO_CHIPS.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-sm px-3 py-1.5 text-xs font-medium text-gray-200"
              >
                <Icon className="h-3.5 w-3.5 text-purple-300" />
                {label}
              </span>
            ))}
          </div>
        }
      />
      <section className="relative pt-2 md:pt-4 pb-10 md:pb-14">
        <div className="container">
          <ServicesGrid />
        </div>
      </section>
      <Section
        className="pt-6 md:pt-10 pb-20 md:pb-28"
        containerClassName="text-center"
      >
        <div className="cosmic-card max-w-3xl mx-auto">
          <div className="p-10 md:p-14">
            <h3 className="text-2xl md:text-4xl font-bold gradient-text mb-4">
              Stuck on where to start?
            </h3>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Skip the guesswork. Jump on a quick call with our team and we'll
              map the fastest route from where you are to where you want to be —
              no fluff, no pressure, no sales script.
            </p>
            <StarLink href="/contact">Get Your Free Roadmap</StarLink>
          </div>
        </div>
      </Section>
    </>
  );
}
