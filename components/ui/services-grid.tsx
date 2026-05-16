"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Code2,
  Globe,
  Palette,
  Megaphone,
  Cpu,
  Smartphone,
  Server,
  CheckCircle2,
  Mail,
  Phone,
  type LucideIcon,
} from "lucide-react";
import { useRobot } from "@/components/robot/robot-provider";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Service data
// ---------------------------------------------------------------------------

type SimpleService = {
  icon: LucideIcon;
  title: string;
  bullets: string[];
  hint: string;
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
};

const GRAPHIC_DESIGN: SimpleService = {
  icon: Palette,
  title: "Graphic Design & Branding",
  bullets: [
    "Logo design & corporate branding",
    "UI/UX for web & mobile apps",
    "Business cards, brochures, digital creatives",
    "Social media graphics & marketing materials",
  ],
  hint: "Brand identity that compounds over time.",
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
};

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
// Components
// ---------------------------------------------------------------------------

function SimpleServiceCard({
  s,
  dir,
}: {
  s: SimpleService;
  dir: number;
}) {
  const { setPose, setBubble } = useRobot();
  const Icon = s.icon;

  return (
    <div
      onMouseEnter={() => {
        setPose({ rotateY: dir, rotateX: 5, scale: 1.04 }, 0.4);
        setBubble(s.hint, 3500);
      }}
      onMouseLeave={() => setPose({}, 0.6)}
      className="group relative rounded-2xl p-7 md:p-8 h-full flex flex-col overflow-hidden border border-white/10 transition-all duration-300 hover:border-purple-400/40 hover:-translate-y-1"
      style={{
        background:
          "linear-gradient(135deg, rgba(168, 85, 247, 0.10) 0%, rgba(15, 23, 42, 0.65) 45%, rgba(30, 41, 59, 0.65) 100%)",
        boxShadow:
          "0 10px 40px -10px rgba(168, 85, 247, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.06)",
      }}
    >
      {/* Top-right purple/blue radial glow */}
      <div
        className="absolute -top-24 -right-20 w-72 h-72 rounded-full opacity-50 pointer-events-none transition-opacity duration-500 group-hover:opacity-90"
        style={{
          background:
            "radial-gradient(circle, rgba(168, 85, 247, 0.45) 0%, rgba(56, 189, 248, 0.18) 40%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Bottom-left blue glow */}
      <div
        className="absolute -bottom-28 -left-16 w-72 h-72 rounded-full opacity-40 pointer-events-none transition-opacity duration-500 group-hover:opacity-70"
        style={{
          background:
            "radial-gradient(circle, rgba(56, 189, 248, 0.35) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Top edge highlight */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.35) 50%, transparent 100%)",
        }}
      />

      <div className="relative z-10 flex items-center gap-4 mb-5">
        <div
          className="h-12 w-12 rounded-xl flex items-center justify-center flex-shrink-0 relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, rgba(168, 85, 247, 0.45) 0%, rgba(79, 70, 229, 0.30) 100%)",
            boxShadow:
              "0 4px 16px rgba(168, 85, 247, 0.40), inset 1px 1px 2px rgba(255, 255, 255, 0.20), inset -1px -1px 2px rgba(0, 0, 0, 0.30)",
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
        <h3 className="text-xl md:text-2xl font-semibold text-white tracking-tight">
          {s.title}
        </h3>
      </div>

      <ul className="relative z-10 space-y-2.5 mt-auto">
        {s.bullets.map((b) => (
          <li
            key={b}
            className="flex items-start gap-2.5 text-sm text-gray-200 leading-relaxed"
          >
            <CheckCircle2 className="h-4 w-4 text-purple-300 mt-0.5 flex-shrink-0 drop-shadow-[0_0_4px_rgba(168,85,247,0.6)]" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function WebHostingCard() {
  const [vendor, setVendor] = useState<EmailVendorKey>("google");
  const { setPose, setBubble } = useRobot();
  const v = EMAIL_VENDORS[vendor];

  return (
    <div
      onMouseEnter={() => {
        setPose({ rotateX: 5, scale: 1.02 }, 0.4);
        setBubble("Hosting, domains, AMC, business email — all priced here.", 4500);
      }}
      onMouseLeave={() => setPose({}, 0.6)}
      className="glass rounded-2xl p-7 md:p-10"
    >
      {/* Header */}
      <div className="flex items-start gap-4 mb-6">
        <div className="h-12 w-12 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center flex-shrink-0">
          <Server className="h-5 w-5 text-purple-300" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl md:text-2xl font-semibold text-white">
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

      {/* Domain + SSL pricing */}
      <div className="grid md:grid-cols-2 gap-5 mb-6">
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

      {/* AMC plans */}
      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5 mb-6">
        <div className="text-xs uppercase tracking-[0.2em] text-purple-300 mb-1">
          Annual Maintenance Contract (AMC)
        </div>
        <p className="text-xs text-gray-500 mb-4">
          Content updates, bug fixes, design corrections and security
          improvements — billed yearly.
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {AMC_PLANS.map((p) => (
            <div
              key={p.name}
              className="rounded-lg border border-white/10 p-4 hover:border-purple-400/40 hover:bg-white/[0.03] transition-colors"
            >
              <div className="text-xs text-gray-500 mb-1">{p.name}</div>
              <div className="text-lg font-semibold text-white mb-1">
                {p.price}
              </div>
              <div className="text-xs text-gray-400">{p.updates}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Email plans with vendor tabs */}
      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-purple-300">
              Business Email
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {v.label} · {v.storage} · annual renewal · 99.9% uptime · +18% GST
            </p>
          </div>
          <div className="flex gap-1 rounded-full border border-white/10 p-1 bg-black/30 self-start">
            {(Object.keys(EMAIL_VENDORS) as EmailVendorKey[]).map((k) => (
              <button
                key={k}
                onClick={() => setVendor(k)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
                  vendor === k
                    ? "bg-white text-black"
                    : "text-gray-400 hover:text-white"
                )}
              >
                {EMAIL_VENDORS[k].label}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {v.plans.map((p) => (
            <div
              key={p.ids}
              className="rounded-lg border border-white/10 p-3 text-center hover:border-purple-400/40 hover:bg-white/[0.03] transition-colors"
            >
              <div className="text-xs text-gray-500">{p.ids} IDs</div>
              <div className="text-base font-semibold text-white mt-1">
                {p.price}
              </div>
              <div className="text-[10px] text-gray-500 mt-0.5">+ 18% GST</div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact strip */}
      <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between text-xs text-gray-400 pt-5 border-t border-white/10">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="flex items-center gap-1.5">
            <Mail className="h-3.5 w-3.5 text-purple-300" />
            sales@baptistdigitek.com
          </span>
          <span className="flex items-center gap-1.5">
            <Phone className="h-3.5 w-3.5 text-purple-300" />
            98404 99535 · 78458 34708
          </span>
        </div>
        <span className="text-gray-500">
          Annual renewal · 18% GST applies on email plans
        </span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Public component used by the Services page
// ---------------------------------------------------------------------------

export function ServicesGrid() {
  const items = [
    { kind: "simple" as const, s: WEBSITE_DEV, dir: -10 },
    { kind: "simple" as const, s: GRAPHIC_DESIGN, dir: 10 },
    { kind: "hosting" as const },
    { kind: "simple" as const, s: DIGITAL_MARKETING, dir: -10 },
    { kind: "simple" as const, s: SOFTWARE_DEV, dir: 10 },
    { kind: "simple" as const, s: MOBILE_APP, dir: -10 },
    { kind: "simple" as const, s: IT_CONSULTING, dir: 10 },
  ];

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {items.map((item, i) => (
        <motion.div
          key={i}
          className={item.kind === "hosting" ? "md:col-span-2" : undefined}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: "easeOut", delay: i * 0.08 }}
        >
          {item.kind === "simple" ? (
            <SimpleServiceCard s={item.s} dir={item.dir} />
          ) : (
            <WebHostingCard />
          )}
        </motion.div>
      ))}
    </div>
  );
}
