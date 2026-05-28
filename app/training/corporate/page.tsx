import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Phone, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import ShaderBackground from "@/components/ui/shader-background";
import {
  TrainingVideoCurve,
  type TrainingVideo,
} from "@/components/ui/training-video-curve";

export const metadata: Metadata = {
  title:
    "Corporate Training | Team Building & Communication Skills | Baptist Digitek",
  description:
    "Team building and communication skills training for organisations across industries — clinics, agencies, IT teams, retail and more. Delivered on-site or live online, built around the way your team actually works.",
};

// NOTE: titles use the speaker's name; descriptions summarise what they
// took away from the team building + communication training. The
// speakers happen to lead clinical practices, but the training itself
// covers communication, leadership and team dynamics for any industry.
const TRAINING_VIDEOS: TrainingVideo[] = [
  {
    title: "Dr. Tamilarasi Shanmuganadhan",
    tag: "Communication",
    description:
      "On structuring difficult conversations clearly — a communication framework she now uses with both patients and her team.",
    src: "/video/Dr.%20Tamilarasi%20Shanmuganadhan.mp4",
  },
  {
    title: "Dr. Sinduja",
    tag: "Team Leadership",
    description:
      "On leading a growing team without losing standards — delegating, holding people accountable, and the daily rituals that keep things calm under pressure.",
    src: "/video/Dr.Sinduja.mp4",
  },
  {
    title: "Dr. Golda Raghul",
    tag: "Team Workflows",
    description:
      "On building shared workflows across a multi-person team — protocols that protect quality while still leaving room for individual judgement.",
    src: "/video/Dr.%20Golda%20Raghul.mp4",
  },
  {
    title: "Dr. Kavitha",
    tag: "Customer Experience",
    description:
      "On mapping the end-to-end customer journey — the small, repeatable touches her team uses to turn one-time visitors into long-term advocates.",
    src: "/video/Dr.kavitha.mp4",
  },
  {
    title: "Dr. Swetha",
    tag: "Team Confidence",
    description:
      "On running pricing and value conversations confidently — and the brand habits that separate teams that grow from teams that stall.",
    src: "/video/Dr.%20Swetha.mp4",
  },
  {
    title: "Dr. Shobana Sivaraja",
    tag: "Frontline Training",
    description:
      "On training frontline staff to represent the brand well — phone etiquette, intake conversations and handling tough questions with confidence.",
    src: "/video/Dr.Shobana%20Sivaraja.mp4",
  },
];

const OUTCOMES = [
  {
    label: "01 — Team Audit",
    head: "We start where your team actually is.",
    body: "Before any session is planned, we sit with leaders and a few frontline team members to map how the team really communicates, where friction shows up and which gaps are costing you time, customers or culture.",
  },
  {
    label: "02 — Tailored Modules",
    head: "Sessions built around your industry.",
    body: "Clinics, agencies, IT teams, retail, hospitality — the core frameworks stay the same, the scenarios change. Every role-play, case study and exercise uses situations your team actually faces.",
  },
  {
    label: "03 — On-Site & Hands-On",
    head: "Live workshops with the whole team in the room.",
    body: "Leaders, mid-level, frontline — trained together so the language and habits become shared. Role-plays, peer feedback and short coaching loops, not slide decks.",
  },
  {
    label: "04 — Measurable Outcomes",
    head: "Better conversations, stronger teams.",
    body: "We track team confidence, customer-experience scores and the conversations that used to get stuck — with a 30-day follow-up to lock the new habits in.",
  },
];

const INDUSTRIES = [
  "Clinics & Healthcare",
  "Design & Creative Agencies",
  "IT & Software Teams",
  "Retail & Hospitality",
  "Education",
  "Sales & Customer Support",
];

export default function CorporateTrainingPage() {
  return (
    <>
      <PageHero
        badge="Training"
        title="Team Building & Communication Skills That Stick."
        subtitle="Corporate training for teams across industries — clinics, agencies, IT, retail and more. The frameworks stay the same, the scenarios are built around the way your people actually work."
        background={
          <ShaderBackground className="absolute inset-0 w-full h-full pointer-events-none opacity-60" />
        }
      />

      {/* Industries served */}
      <Section
        eyebrow="Who It's For"
        title="One program. Many industries."
        description="The core is the same — clearer communication, stronger teams. The scenarios shift to match your world."
        align="center"
      >
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {INDUSTRIES.map((industry) => (
            <span
              key={industry}
              className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-gray-200"
            >
              {industry}
            </span>
          ))}
        </div>
      </Section>

      {/* Intro to testimonials */}
      <Section
        eyebrow="In Their Own Words"
        title="Teams we've trained, on what changed."
        description="These speakers happen to lead clinical practices — but the habits, frameworks and team conversations they describe carry across any industry. Scroll through and hear what shifted for them."
        align="center"
      />

      {/* Scroll-driven curve carousel of testimonial reels */}
      <TrainingVideoCurve videos={TRAINING_VIDEOS} />

      {/* How we run a cohort */}
      <Section
        eyebrow="How We Run a Program"
        title="A four-step path, built around your team."
        description="We don't sell seats. We sell outcomes — and the program is engineered backwards from the conversations your team needs to handle better."
        align="center"
      >
        <div className="grid md:grid-cols-2 gap-6">
          {OUTCOMES.map((o) => (
            <div
              key={o.label}
              className="sol-card p-8 md:p-10 h-full"
            >
              <div className="sol-card-aurora"></div>
              <div className="sol-card-bg"></div>
              <div className="sol-card-content relative z-10">
                <div className="text-xs uppercase tracking-[0.2em] text-purple-300 mb-4">
                  {o.label}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">
                  {o.head}
                </h3>
                <p className="text-gray-400 leading-relaxed">{o.body}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section containerClassName="text-center pb-20">
        <div className="cosmic-card max-w-3xl mx-auto">
          <div className="p-10 md:p-14">
            <h3 className="text-2xl md:text-4xl font-bold gradient-text mb-4">
              Ready to train your team?
            </h3>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Tell us about your industry, your team size and the conversations
              that keep getting stuck — we'll come back with a tailored program,
              schedule and quote within 48 hours.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-purple-500 hover:bg-purple-400 text-white px-6 py-3 text-sm font-semibold transition-colors"
              >
                Request a Proposal
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="tel:+917845834708"
                className="inline-flex items-center gap-2 rounded-lg glass glass-hover px-6 py-3 text-sm font-semibold text-white"
              >
                <Phone className="h-4 w-4 text-purple-300" />
                Talk to Us
              </a>
              <a
                href="https://wa.me/917845834708"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg glass glass-hover px-6 py-3 text-sm font-semibold text-white"
              >
                <MessageCircle className="h-4 w-4 text-green-400" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
