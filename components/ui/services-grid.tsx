"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import {
  Code2,
  Globe,
  Megaphone,
  Cpu,
  Smartphone,
  Server,
  CheckCircle2,
  Mail,
  Phone,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { useRobot } from "@/components/robot/robot-provider";
import { cn } from "@/lib/utils";
import { StarLink } from "@/components/ui/star-button";

// ---------------------------------------------------------------------------
// Service data
// ---------------------------------------------------------------------------

// Each simple service carries its own accent palette. The grid stays cohesive
// (purple-base hover + glass shell) but the icon halo, check bullets, and
// number badge tint shift per-service so the cards don't read as five clones.
type AccentKey = "purple" | "rose" | "emerald" | "sky" | "amber";

type Accent = {
  icon: string;       // gradient for the icon tile
  iconShadow: string; // glow under the icon tile
  ring: string;       // hover border colour
  check: string;      // bullet check icon
  glowA: string;      // top-right radial blob
  glowB: string;      // bottom-left radial blob
  numText: string;    // corner number colour
  numBorder: string;  // corner number ring
};

const ACCENTS: Record<AccentKey, Accent> = {
  purple: {
    icon: "linear-gradient(135deg, rgba(168,85,247,0.55) 0%, rgba(79,70,229,0.35) 100%)",
    iconShadow: "0 4px 16px rgba(168,85,247,0.45)",
    ring: "hover:border-purple-400/50",
    check: "text-purple-300 drop-shadow-[0_0_4px_rgba(168,85,247,0.65)]",
    glowA: "radial-gradient(circle, rgba(168,85,247,0.45) 0%, rgba(56,189,248,0.18) 40%, transparent 70%)",
    glowB: "radial-gradient(circle, rgba(56,189,248,0.35) 0%, transparent 70%)",
    numText: "text-purple-200",
    numBorder: "border-purple-400/40",
  },
  rose: {
    icon: "linear-gradient(135deg, rgba(244,63,94,0.55) 0%, rgba(168,85,247,0.30) 100%)",
    iconShadow: "0 4px 16px rgba(244,63,94,0.42)",
    ring: "hover:border-rose-400/50",
    check: "text-rose-300 drop-shadow-[0_0_4px_rgba(244,63,94,0.6)]",
    glowA: "radial-gradient(circle, rgba(244,63,94,0.42) 0%, rgba(168,85,247,0.18) 40%, transparent 70%)",
    glowB: "radial-gradient(circle, rgba(168,85,247,0.30) 0%, transparent 70%)",
    numText: "text-rose-200",
    numBorder: "border-rose-400/40",
  },
  emerald: {
    icon: "linear-gradient(135deg, rgba(16,185,129,0.55) 0%, rgba(56,189,248,0.30) 100%)",
    iconShadow: "0 4px 16px rgba(16,185,129,0.42)",
    ring: "hover:border-emerald-400/50",
    check: "text-emerald-300 drop-shadow-[0_0_4px_rgba(16,185,129,0.6)]",
    glowA: "radial-gradient(circle, rgba(16,185,129,0.40) 0%, rgba(56,189,248,0.18) 40%, transparent 70%)",
    glowB: "radial-gradient(circle, rgba(56,189,248,0.30) 0%, transparent 70%)",
    numText: "text-emerald-200",
    numBorder: "border-emerald-400/40",
  },
  sky: {
    icon: "linear-gradient(135deg, rgba(56,189,248,0.55) 0%, rgba(79,70,229,0.30) 100%)",
    iconShadow: "0 4px 16px rgba(56,189,248,0.45)",
    ring: "hover:border-sky-400/50",
    check: "text-sky-300 drop-shadow-[0_0_4px_rgba(56,189,248,0.6)]",
    glowA: "radial-gradient(circle, rgba(56,189,248,0.45) 0%, rgba(168,85,247,0.16) 40%, transparent 70%)",
    glowB: "radial-gradient(circle, rgba(168,85,247,0.28) 0%, transparent 70%)",
    numText: "text-sky-200",
    numBorder: "border-sky-400/40",
  },
  amber: {
    icon: "linear-gradient(135deg, rgba(245,158,11,0.55) 0%, rgba(244,63,94,0.28) 100%)",
    iconShadow: "0 4px 16px rgba(245,158,11,0.42)",
    ring: "hover:border-amber-400/50",
    check: "text-amber-300 drop-shadow-[0_0_4px_rgba(245,158,11,0.6)]",
    glowA: "radial-gradient(circle, rgba(245,158,11,0.40) 0%, rgba(244,63,94,0.16) 40%, transparent 70%)",
    glowB: "radial-gradient(circle, rgba(244,63,94,0.26) 0%, transparent 70%)",
    numText: "text-amber-200",
    numBorder: "border-amber-400/40",
  },
};

type SimpleService = {
  icon: LucideIcon;
  title: string;
  bullets: string[];
  hint: string;
  accent: AccentKey;
};

const WEBSITE_DEV: SimpleService = {
  icon: Globe,
  title: "Website Development",
  bullets: [
    "Custom website design & development",
    "Responsive & mobile-friendly builds",
    "E-commerce on WooCommerce, Shopify, Magento",
    "CMS sites on WordPress, Joomla, Drupal",
    "Web portals for businesses & enterprises",
  ],
  hint: "Websites that earn attention — and convert it.",
  accent: "purple",
};

const DIGITAL_MARKETING: SimpleService = {
  icon: Megaphone,
  title: "Digital Marketing",
  bullets: [
    "Search Engine Optimization (SEO)",
    "Social Media Marketing (SMM)",
    "Pay-Per-Click ads (Google, Meta)",
    "Content marketing & branding",
    "Email marketing & lead generation",
  ],
  hint: "Growth with receipts. Real dashboards.",
  accent: "rose",
};

const SOFTWARE_DEV: SimpleService = {
  icon: Code2,
  title: "Software Development",
  bullets: [
    "Custom business software",
    "ERP & CRM development",
    "Web applications & SaaS platforms",
    "Cloud-based solutions",
  ],
  hint: "Built around your workflow, not the other way round.",
  accent: "emerald",
};

const MOBILE_APP: SimpleService = {
  icon: Smartphone,
  title: "Mobile App Development",
  bullets: [
    "Native Android & iOS development",
    "Cross-platform with Flutter & React Native",
    "Customer apps with payment, chat, GPS",
    "Field-staff apps with offline sync",
    "Play Store & App Store launch lifecycle",
  ],
  hint: "Apps people actually open twice.",
  accent: "sky",
};

const IT_CONSULTING: SimpleService = {
  icon: Cpu,
  title: "IT Consulting & Support",
  bullets: [
    "IT strategy & business transformation",
    "Website maintenance & support",
    "Cybersecurity & website protection",
    "Cloud migration & data backup",
  ],
  hint: "A fractional CTO without the full-time cost.",
  accent: "amber",
};

const SIMPLE_SERVICES: SimpleService[] = [
  WEBSITE_DEV,
  DIGITAL_MARKETING,
  SOFTWARE_DEV,
  MOBILE_APP,
  IT_CONSULTING,
];

// ---------------------------------------------------------------------------
// Web Hosting & Domain — detailed pricing data
// ---------------------------------------------------------------------------

const DOMAIN_PRICES = [
  { tld: ".COM", price: "₹1,350" },
  { tld: ".IN", price: "₹956" },
  { tld: ".CO.IN", price: "₹956" },
  { tld: ".NET", price: "₹1,350" },
  { tld: ".ORG", price: "₹1,480" },
];

const AMC_PLANS = [
  { name: "Starter", updates: "6 updates / year", price: "₹2,500" },
  { name: "Growth", updates: "8 updates / year", price: "₹4,000" },
  { name: "Scale", updates: "10 updates / year", price: "₹5,000" },
  { name: "Unlimited", updates: "Unlimited updates", price: "₹8,000" },
];

const EMAIL_VENDORS = {
  google: {
    label: "Google Workspace",
    storage: "30 GB / mailbox",
    plans: [
      { ids: "3", price: "₹14,888" },
      { ids: "5", price: "₹21,888" },
      { ids: "10", price: "₹37,888" },
      { ids: "15", price: "₹53,888" },
      { ids: "25", price: "₹85,888" },
    ],
  },
  zoho: {
    label: "Zoho Workplace",
    storage: "30 GB / mailbox",
    plans: [
      { ids: "5", price: "₹12,888" },
      { ids: "10", price: "₹20,888" },
      { ids: "15", price: "₹28,888" },
      { ids: "20", price: "₹36,888" },
      { ids: "25", price: "₹43,888" },
    ],
  },
  microsoft: {
    label: "Microsoft 365",
    storage: "50 GB / mailbox",
    plans: [
      { ids: "5", price: "₹13,888" },
      { ids: "10", price: "₹22,888" },
      { ids: "15", price: "₹31,888" },
      { ids: "20", price: "₹39,888" },
      { ids: "25", price: "₹48,888" },
    ],
  },
} as const;

type EmailVendorKey = keyof typeof EMAIL_VENDORS;

// ---------------------------------------------------------------------------
// Motion presets
// ---------------------------------------------------------------------------

const cardFadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.55, ease: "easeOut" },
  }),
};

// ---------------------------------------------------------------------------
// Simple service card
// ---------------------------------------------------------------------------

function SimpleServiceCard({
  s,
  index,
  wide = false,
}: {
  s: SimpleService;
  index: number;
  wide?: boolean;
}) {
  const { setPose, setBubble } = useRobot();
  const Icon = s.icon;
  const a = ACCENTS[s.accent];
  const dir = index % 2 === 0 ? -10 : 10;
  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      custom={index}
      variants={cardFadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      onMouseEnter={() => {
        setPose({ rotateY: dir, rotateX: 5, scale: 1.04 }, 0.4);
        setBubble(s.hint, 3500);
      }}
      onMouseLeave={() => setPose({}, 0.6)}
      className={cn(
        "group relative rounded-2xl p-7 md:p-8 h-full flex flex-col overflow-hidden border border-white/10 transition-all duration-300 hover:-translate-y-1",
        a.ring
      )}
      style={{
        background:
          "linear-gradient(135deg, rgba(168, 85, 247, 0.08) 0%, rgba(15, 23, 42, 0.65) 45%, rgba(30, 41, 59, 0.65) 100%)",
        boxShadow:
          "0 10px 40px -10px rgba(168, 85, 247, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.06)",
      }}
    >
      {/* Top-right accent glow */}
      <div
        className="absolute -top-24 -right-20 w-72 h-72 rounded-full opacity-50 pointer-events-none transition-opacity duration-500 group-hover:opacity-90"
        style={{ background: a.glowA, filter: "blur(40px)" }}
      />

      {/* Bottom-left counter glow */}
      <div
        className="absolute -bottom-28 -left-16 w-72 h-72 rounded-full opacity-40 pointer-events-none transition-opacity duration-500 group-hover:opacity-70"
        style={{ background: a.glowB, filter: "blur(40px)" }}
      />

      {/* Top edge highlight */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.35) 50%, transparent 100%)",
        }}
      />

      {/* Corner number badge */}
      <div
        className={cn(
          "absolute top-5 right-5 z-10 h-9 w-9 rounded-full border bg-black/40 backdrop-blur-sm flex items-center justify-center text-[11px] font-semibold tracking-widest tabular-nums",
          a.numBorder,
          a.numText
        )}
      >
        {num}
      </div>

      <div
        className={cn(
          "relative z-10 flex items-center gap-4 mb-5",
          wide && "md:gap-5"
        )}
      >
        <div
          className="h-12 w-12 rounded-xl flex items-center justify-center flex-shrink-0 relative overflow-hidden"
          style={{
            background: a.icon,
            boxShadow:
              a.iconShadow +
              ", inset 1px 1px 2px rgba(255, 255, 255, 0.20), inset -1px -1px 2px rgba(0, 0, 0, 0.30)",
          }}
        >
          <div
            className="absolute inset-x-0 top-0 h-1/2 opacity-40 pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, rgba(255, 255, 255, 0.35) 0%, transparent 100%)",
            }}
          />
          <Icon className="h-5 w-5 text-white relative z-10 drop-shadow-[0_0_6px_rgba(255,255,255,0.5)]" />
        </div>
        <h3 className="text-xl md:text-2xl font-semibold text-white tracking-tight pr-12">
          {s.title}
        </h3>
      </div>

      <ul
        className={cn(
          "relative z-10 space-y-2.5",
          wide ? "md:grid md:grid-cols-2 md:gap-x-8 md:space-y-0 md:gap-y-2.5" : ""
        )}
      >
        {s.bullets.map((b) => (
          <li
            key={b}
            className="flex items-start gap-2.5 text-sm text-gray-200 leading-relaxed"
          >
            <CheckCircle2
              className={cn("h-4 w-4 mt-0.5 flex-shrink-0", a.check)}
            />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      {/* Visible hint footer — was previously only in the robot bubble */}
      <div className="relative z-10 mt-6 pt-4 border-t border-white/10 text-xs text-gray-400 italic">
        “{s.hint}”
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Featured hosting card — sol-card aurora shell, 2x2 pricing layout, CTA
// ---------------------------------------------------------------------------

function FeaturedHostingCard({ index }: { index: number }) {
  const [vendor, setVendor] = useState<EmailVendorKey>("google");
  const { setPose, setBubble } = useRobot();
  const v = EMAIL_VENDORS[vendor];

  return (
    <motion.div
      custom={index}
      variants={cardFadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      onMouseEnter={() => {
        setPose({ rotateX: 5, scale: 1.02 }, 0.4);
        setBubble(
          "Hosting, domains, AMC, business email — all priced here.",
          4500
        );
      }}
      onMouseLeave={() => setPose({}, 0.6)}
      className="sol-card"
    >
      <span className="sol-card-aurora" aria-hidden />
      <span className="sol-card-bg" aria-hidden />
      <div className="sol-card-content p-7 md:p-10">
        {/* Featured eyebrow */}
        <div className="flex items-center gap-2 mb-5">
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.22em] uppercase text-purple-100 border border-purple-300/40"
            style={{
              background:
                "linear-gradient(90deg, rgba(168,85,247,0.25), rgba(56,189,248,0.18))",
              boxShadow: "0 0 18px rgba(168,85,247,0.35)",
            }}
          >
            <Sparkles className="h-3 w-3" />
            Featured · Transparent Pricing
          </div>
        </div>

        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
          <div
            className="h-14 w-14 rounded-xl flex items-center justify-center flex-shrink-0 relative overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(168,85,247,0.55) 0%, rgba(56,189,248,0.32) 100%)",
              boxShadow:
                "0 6px 20px rgba(168,85,247,0.45), inset 1px 1px 2px rgba(255,255,255,0.22)",
            }}
          >
            <Server className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
              Web Hosting & Domain Services
            </h3>
            <p className="text-sm text-gray-400 mt-1.5">
              Hosting, domain, SSL, AMC plans and managed business email — all
              from one place, with transparent annual pricing.
            </p>
          </div>
        </div>

        {/* Overview bullets */}
        <ul className="grid sm:grid-cols-2 gap-2.5 mb-8">
          {[
            "Secure & reliable website hosting",
            "Domain registration & management",
            "SSL certificate integration",
            "Cloud hosting & server management",
          ].map((b) => (
            <li
              key={b}
              className="flex items-start gap-2 text-sm text-gray-300"
            >
              <CheckCircle2 className="h-4 w-4 text-purple-300 mt-0.5 flex-shrink-0" />
              <span>{b}</span>
            </li>
          ))}
        </ul>

        {/* Row 1 — Domains + SSL */}
        <div className="grid md:grid-cols-2 gap-5 mb-5">
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
            <div className="text-xs uppercase tracking-[0.2em] text-purple-300 mb-3">
              Domain Pricing
            </div>
            <div className="space-y-2">
              {DOMAIN_PRICES.map((d) => (
                <div
                  key={d.tld}
                  className="flex items-center justify-between text-sm border-b border-white/5 pb-2 last:border-0 last:pb-0"
                >
                  <span className="text-gray-200 font-medium">{d.tld}</span>
                  <span className="text-gray-400">{d.price}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
            <div className="text-xs uppercase tracking-[0.2em] text-purple-300 mb-3">
              SSL Certificate
            </div>
            <div className="flex items-center justify-between text-sm mb-4 pb-3 border-b border-white/5">
              <span className="text-gray-200 font-medium">SSL Certificate</span>
              <span className="text-gray-400">₹1,880</span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              Registration, renewal, transfer and SSL — all handled for you so
              your site stays secure and credible.
            </p>
          </div>
        </div>

        {/* Row 2 — AMC + Email side-by-side */}
        <div className="grid lg:grid-cols-2 gap-5 mb-6">
          {/* AMC */}
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
            <div className="text-xs uppercase tracking-[0.2em] text-purple-300 mb-1">
              Annual Maintenance (AMC)
            </div>
            <p className="text-xs text-gray-500 mb-4">
              Content updates, bug fixes, design corrections and security
              improvements — billed yearly.
            </p>
            <div className="grid grid-cols-2 gap-2.5">
              {AMC_PLANS.map((p) => (
                <div
                  key={p.name}
                  className="rounded-lg border border-white/10 p-3 hover:border-purple-400/40 hover:bg-white/[0.03] transition-colors"
                >
                  <div className="text-[11px] text-gray-500 mb-0.5">{p.name}</div>
                  <div className="text-base font-semibold text-white mb-0.5">
                    {p.price}
                  </div>
                  <div className="text-[11px] text-gray-400">{p.updates}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Email with vendor tabs */}
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-purple-300">
                  Business Email
                </div>
                <p className="text-[11px] text-gray-500 mt-1">
                  {v.label} · {v.storage} · annual · +18% GST
                </p>
              </div>
            </div>
            <div className="flex gap-1 rounded-full border border-white/10 p-1 bg-black/30 mb-4">
              {(Object.keys(EMAIL_VENDORS) as EmailVendorKey[]).map((k) => (
                <button
                  key={k}
                  onClick={() => setVendor(k)}
                  className={cn(
                    "flex-1 px-2 py-1.5 rounded-full text-[11px] font-medium transition-colors",
                    vendor === k
                      ? "bg-white text-black"
                      : "text-gray-400 hover:text-white"
                  )}
                >
                  {EMAIL_VENDORS[k].label.split(" ")[0]}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {v.plans.map((p) => (
                <div
                  key={p.ids}
                  className="rounded-lg border border-white/10 p-2 text-center hover:border-purple-400/40 hover:bg-white/[0.03] transition-colors"
                >
                  <div className="text-[10px] text-gray-500">{p.ids} IDs</div>
                  <div className="text-xs font-semibold text-white mt-0.5">
                    {p.price}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Inline CTA — exit point for the card */}
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between pt-5 border-t border-white/10">
          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400">
            <span className="flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5 text-purple-300" />
              support@baptistdigitek.com
            </span>
            <span className="flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5 text-purple-300" />
              98404 99535 · 78458 34708
            </span>
          </div>
          <StarLink href="/contact" className="self-start sm:self-auto">
            Talk to hosting team
          </StarLink>
        </div>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Public component used by the Services page
// ---------------------------------------------------------------------------

export function ServicesGrid() {
  // 5 simple cards in a 2-col grid (rows of 2). The 5th lands alone on its
  // row, so we let it span both columns and switch to a 2-col bullet layout
  // — reads as an intentional "and one more" bridge into the featured card
  // below, instead of a lonely half-row.
  const lastIdx = SIMPLE_SERVICES.length - 1;

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {SIMPLE_SERVICES.map((s, i) => (
          <div
            key={s.title}
            className={i === lastIdx ? "md:col-span-2" : undefined}
          >
            <SimpleServiceCard s={s} index={i} wide={i === lastIdx} />
          </div>
        ))}
      </div>
      <FeaturedHostingCard index={SIMPLE_SERVICES.length} />
    </div>
  );
}
