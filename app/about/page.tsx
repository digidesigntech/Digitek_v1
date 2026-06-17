import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { StarLink } from "@/components/ui/star-button";

export const metadata: Metadata = {
  title: "About Baptist Digitek | Web & IT Company in Chromepet, Chennai",
  description:
    "Built by people who hate template work. Trained by hotels at 2 AM. Trusted across Tamil Nadu — Baptist Digitek is a Chennai-based studio for businesses that need a site that actually works.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        badge="About Baptist Digitek"
        title="29 hotels later, we know what breaks at 2 AM."
        subtitle="Mission-critical hotel sites trained us. Now we bring that same obsession to clinics, retailers, schools — and to you."
      />

      {/* CTO Hook — pull-quote lead-in */}
      <Section>
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block text-xs uppercase tracking-[0.3em] text-purple-300 mb-5">
            A word from Chief Technology Officer
          </span>
          <h2 className="text-3xl md:text-5xl font-bold gradient-text mb-6 leading-tight">
            &ldquo;Great digital solutions are not built — they&rsquo;re strategically designed.&rdquo;
          </h2>
          <p className="text-base md:text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto">
            Influence over impression. Strategy over surface. Long-term growth
            over quick wins — that&rsquo;s the lens every Baptist Digitek project
            is built through.
          </p>
        </div>
      </Section>

      {/* CTO Profile — image + enhanced introduction */}
      <Section>
        <div className="grid md:grid-cols-5 gap-10 md:gap-14 items-center max-w-6xl mx-auto">
          {/* Image */}
          <div className="relative md:col-span-2">
            <div className="absolute -inset-4 bg-gradient-to-tr from-purple-500/25 via-purple-500/0 to-purple-500/15 rounded-3xl blur-2xl pointer-events-none" />
            <div className="relative glass rounded-3xl overflow-hidden purple-glow border border-purple-500/20">
              <Image
                src="/images/CTO.jpeg"
                alt="Angelin Celena, Chief Technology Officer of Baptist Digitek"
                width={800}
                height={1200}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          </div>

          {/* Content */}
          <div className="md:col-span-3">
            <span className="inline-block text-xs uppercase tracking-[0.3em] text-purple-300 mb-3">
              Meet the CTO
            </span>
            <h3 className="text-3xl md:text-5xl font-bold text-white mb-2 tracking-tight">
              Angelin Celena
            </h3>
            <p className="text-purple-300 text-sm md:text-base font-medium mb-7 uppercase tracking-wider">
              Chief Technology Officer · Baptist Digitek
            </p>

            <div className="space-y-5 text-gray-300 text-base md:text-lg leading-relaxed">
              <p>
                Angelin leads the intersection of{" "}
                <span className="text-white font-semibold">
                  technology, creativity, and business innovation
                </span>{" "}
                — turning ideas into digital experiences that don&rsquo;t just
                look good, but actually move the needle for the businesses
                behind them.
              </p>
              <p>
                Her belief is simple: great digital work isn&rsquo;t
                manufactured, it&rsquo;s designed with intent. Every pixel,
                every interaction, every line of code should earn its place —
                strengthening the brand, building influence, and compounding
                into long-term growth.
              </p>
              <p>
                From websites and branding to graphic creatives and full
                digital experiences, she approaches each project with{" "}
                <span className="text-white font-semibold">
                  purpose, precision, and the ambition to create lasting value
                </span>
                . An entrepreneurial mindset keeps the work scalable; a
                designer&rsquo;s eye keeps it human.
              </p>

              <blockquote className="text-gray-300 italic border-l-2 border-purple-500/50 pl-5 mt-6">
                Her vision is to build a company known for innovation, quality,
                and meaningful impact — helping businesses not just establish
                their presence, but elevate the way they connect with the
                world.
              </blockquote>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section containerClassName="text-center">
        <div className="glass rounded-2xl p-10 md:p-14 max-w-3xl mx-auto purple-glow">
          <h3 className="text-2xl md:text-4xl font-bold gradient-text mb-4">
            Still reading? You're probably the right fit.
          </h3>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            First call is on us. No script, no pressure — just an honest
            conversation about whether we should work together. From our office
            in <span className="text-gray-200">Chromepet, Chennai</span>.
          </p>
          <StarLink href="/contact">Let&apos;s Talk</StarLink>
        </div>
      </Section>
    </>
  );
}
