import type { Metadata } from "next";
import {
  ArrowRight,
  Sparkles,
  FileText,
  Image as ImageIcon,
  ScrollText,
} from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { PaintDotsOrbit } from "@/components/ui/paint-dots-orbit";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title:
    "Digi Design | Dermatology & Cosmetology Design Studio by Baptist Digitek",
  description:
    "Digi Design is Baptist Digitek's specialised creative studio for dermatology and cosmetology — logos, social media, brochures, in-clinic posters and patient files trusted by 200+ practices.",
};

const DELIVERABLES = [
  {
    icon: Sparkles,
    title: "Logo & Brand Identity",
    description:
      "Logos and complete clinic stationery aligned to clinical credibility.",
  },
  {
    icon: ImageIcon,
    title: "Social Media Creatives",
    description:
      "Post grids, reels covers and paid-ad designs that maintain restraint.",
  },
  {
    icon: FileText,
    title: "Coffee-Table Brochures",
    description:
      "Treatment menus, patient profile files and consultation collateral.",
  },
  {
    icon: ScrollText,
    title: "In-Clinic & Outdoor",
    description:
      "Posters, menu cards, packaging, customised letterheads and vehicle branding.",
  },
];

export default function DigiDesignPage() {
  return (
    <>
      <PageHero
        badge="Sister Brand"
        title="Meet Digi Design — Built Exclusively for Skin & Aesthetic Practices"
        subtitle="A specialised sister brand dedicated to one audience: dermatology and cosmetology practices. Trusted by 200+ skin clinics."
      />

      {/* Creative-studio decorative section with orbiting paint dots */}
      <Section>
        <div className="grid lg:grid-cols-[1fr_280px] gap-10 items-center">
          <div className="glass rounded-3xl p-8 md:p-12">
            <span className="inline-block text-xs uppercase tracking-[0.2em] text-purple-300 mb-3">
              Why a Separate Brand
            </span>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight gradient-text mb-4">
              Because the work is genuinely different
            </h2>
            <p className="text-gray-400 leading-relaxed mb-3">
              Patients deciding on a skin treatment behave very differently from
              guests choosing a hotel. Digi Design's team is trained on that
              distinction — and the result is creative that builds trust in the
              seconds a patient takes to decide.
            </p>
            <p className="text-gray-400 leading-relaxed">
              While Baptist Digitek serves businesses across every industry,
              Digi Design exists because skin clinics deserve creative work that
              understands clinical credibility, patient psychology and aesthetic
              restraint.
            </p>
          </div>
          <div className="flex justify-center">
            <PaintDotsOrbit size={240} />
          </div>
        </div>
      </Section>

      <Section
        eyebrow="What Digi Design Delivers"
        title="A complete creative practice for clinics"
        description="Every asset shaped specifically for derma and cosmetology audiences — across digital, print, in-clinic and outdoor."
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {DELIVERABLES.map((d, i) => {
            const Icon = d.icon;
            return (
              <div
                key={d.title}
                className="glass glass-hover rounded-xl p-6 h-full"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="h-11 w-11 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4">
                  <Icon className="h-5 w-5 text-purple-300" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-white">
                  {d.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {d.description}
                </p>
              </div>
            );
          })}
        </div>
      </Section>

      <Section containerClassName="text-center">
        <div className="glass rounded-2xl p-10 md:p-14 max-w-3xl mx-auto purple-glow">
          <h3 className="text-2xl md:text-4xl font-bold gradient-text mb-4">
            See the live Digi Design portfolio
          </h3>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Trusted by 200+ skin and aesthetic practices. Opens in a new tab.
          </p>
          <a
            href={siteConfig.digiDesignUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-white text-black px-6 py-3 font-semibold hover:bg-gray-200 transition-colors"
          >
            Visit Digi Design Portfolio
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </Section>
    </>
  );
}
