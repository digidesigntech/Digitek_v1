import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Zap,
  Pencil,
  Clock,
  MessageCircle,
  Image as ImageIcon,
  MapPin,
  X,
  Check,
  type LucideIcon,
} from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "About Baptist Digitek | Web & IT Company in Chromepet, Chennai",
  description:
    "Built by people who hate template work. Trained by hotels at 2 AM. Trusted across Tamil Nadu — Baptist Digitek is a Chennai-based studio for businesses that need a site that actually works.",
};

const OBSESSIONS: { icon: LucideIcon; body: string }[] = [
  {
    icon: Zap,
    body: "How fast your hero image loads on a 4G phone in Trichy.",
  },
  {
    icon: Pencil,
    body: "Whether your front-desk can change a room rate without calling us.",
  },
  {
    icon: Clock,
    body: "What your enquiry form does at 2 AM when nobody's watching.",
  },
  {
    icon: MessageCircle,
    body: "Where the WhatsApp button leads on a Sunday afternoon.",
  },
  {
    icon: ImageIcon,
    body: "How big the JPGs are before they ever hit your CDN.",
  },
  {
    icon: MapPin,
    body: "Whether Google Maps shows the right check-in time.",
  },
];

const WONT_DO = [
  "Sell you a template and call it a website.",
  "Take a project we can't promise to deliver.",
  "Lock you into a tool you can't escape later.",
  "Bill you for fixing our own mistakes.",
  "Disappear the moment the invoice clears.",
];

const WRONG_FIT = [
  "You want the cheapest option — try a marketplace.",
  "You need it done by next Tuesday.",
  "You're looking for a six-figure rebrand for a Fortune 500.",
  "You plan to ghost us after launch.",
];

const RIGHT_FIT = [
  "You've been burned by template work before.",
  "You want one team, not four vendors.",
  "You need a site that works on patchy mobile data.",
  "You'd rather have a partner than a contractor.",
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        badge="About Baptist Digitek"
        title="29 hotels later, we know what breaks at 2 AM."
        subtitle="Mission-critical hotel sites trained us. Now we bring that same obsession to clinics, retailers, schools — and to you."
      />

      {/* Manifesto — single bold statement */}
      <Section>
        <div className="glass rounded-3xl p-10 md:p-16 purple-glow max-w-4xl mx-auto text-center">
          <span className="inline-block text-xs uppercase tracking-[0.3em] text-purple-300 mb-5">
            What we believe
          </span>
          <h2 className="text-3xl md:text-5xl font-bold gradient-text mb-6 leading-tight">
            Template work is theft.
          </h2>
          <p className="text-base md:text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto">
            It looks like a website. It charges like one. But it can't take a
            booking when the wifi flickers, won't load in three seconds on a
            Trichy 4G, and you have to call someone to change the price of
            room 207. That's not a website — that's a brochure with extra
            steps.
          </p>
        </div>
      </Section>

      {/* Obsessions */}
      <Section
        eyebrow="What we obsess over"
        title="Six things that wake us up at 2 AM."
        description="Real, specific, and slightly weird — the questions we keep asking long after the launch party."
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {OBSESSIONS.map((o, i) => {
            const Icon = o.icon;
            return (
              <div
                key={i}
                className="glass glass-hover rounded-2xl p-6 flex gap-4 items-start"
              >
                <div className="h-11 w-11 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center flex-shrink-0">
                  <Icon className="h-5 w-5 text-purple-300" />
                </div>
                <p className="text-sm md:text-base text-gray-200 leading-relaxed">
                  {o.body}
                </p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Things we won't do */}
      <Section
        eyebrow="Things we won't do"
        title="Five lines we don't cross."
        description="No matter what the budget is, what the timeline is, or how much we need the work."
      >
        <div className="grid sm:grid-cols-2 gap-4">
          {WONT_DO.map((line) => (
            <div
              key={line}
              className="glass rounded-2xl p-6 flex gap-4 items-start"
            >
              <div className="h-10 w-10 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <X className="h-5 w-5 text-red-300" />
              </div>
              <p className="text-base text-gray-100 leading-relaxed">{line}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Right fit / wrong fit */}
      <Section
        eyebrow="Honest answer"
        title="Are we the right fit for you?"
        description="Most agencies sell to anyone. We don't. If the right column describes you, we should probably talk. If the left does, we'll respectfully send you somewhere better."
      >
        <div className="grid md:grid-cols-2 gap-5">
          <div className="glass rounded-2xl p-7 md:p-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-10 w-10 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                <X className="h-5 w-5 text-red-300" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-white">
                We're wrong for you if
              </h3>
            </div>
            <ul className="space-y-3">
              {WRONG_FIT.map((line) => (
                <li
                  key={line}
                  className="text-sm md:text-base text-gray-400 leading-relaxed pl-1"
                >
                  — {line}
                </li>
              ))}
            </ul>
          </div>
          <div className="glass rounded-2xl p-7 md:p-8 purple-glow">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-10 w-10 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                <Check className="h-5 w-5 text-green-300" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-white">
                We're right for you if
              </h3>
            </div>
            <ul className="space-y-3">
              {RIGHT_FIT.map((line) => (
                <li
                  key={line}
                  className="text-sm md:text-base text-gray-200 leading-relaxed pl-1"
                >
                  — {line}
                </li>
              ))}
            </ul>
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
            conversation about whether we should work together. From our offices
            in <span className="text-gray-200">Chromepet, Chennai</span> and{" "}
            <span className="text-gray-200">Tanjore</span>.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-white text-black px-6 py-3 font-semibold hover:bg-gray-200 transition-colors"
          >
            Let's Talk
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>
    </>
  );
}
