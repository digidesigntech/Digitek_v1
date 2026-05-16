import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Building,
  Hotel,
  ShoppingBag,
  Stethoscope,
  Layers,
  Sparkles,
  TrendingUp,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { AccentOnView } from "@/components/ui/accent-on-view";

export const metadata: Metadata = {
  title:
    "Industry Solutions | Hotel, Clinic, Retail & Education Tech | Baptist Digitek",
  description:
    "Industry-ready digital solutions from Baptist Digitek — hotel websites, clinic platforms, e-commerce, school portals, ERP and CRM packages built for Indian businesses.",
};

type Solution = {
  icon: LucideIcon;
  title: string;
  oneliner: string;
  bullets: string[];
  accent: string; // rgba — corner robot tints with this when this solution is in view
};

const SOLUTIONS: Solution[] = [
  {
    icon: Hotel,
    title: "Hotel & Resort Website",
    oneliner: "A booking-ready property website your front desk can run themselves.",
    bullets: [
      "Room galleries, rate panels, WhatsApp booking, Google Maps & reviews",
      "Front-desk-friendly content panel — no developer needed",
      "Tuned for 'hotels near [location]' search visibility",
    ],
    accent: "rgba(255, 200, 100, 0.5)", // warm gold
  },
  {
    icon: Stethoscope,
    title: "Clinic & Hospital Platform",
    oneliner: "A trust-led platform that turns visitors into appointments.",
    bullets: [
      "Doctor profiles, treatments, appointment booking, patient education",
      "Before/after gallery (where ethically appropriate) + HIPAA-aware data handling",
      "Branded clinic creatives via Digi Design",
    ],
    accent: "rgba(120, 200, 255, 0.5)", // cool blue
  },
  {
    icon: ShoppingBag,
    title: "E-Commerce & Retail",
    oneliner: "A storefront ready for paid ads from day one.",
    bullets: [
      "WooCommerce, Shopify or custom stack with multi-gateway payments",
      "Courier integrations, inventory sync, order tracking",
      "Marketing layer pre-wired for Meta & Google Ads",
    ],
    accent: "rgba(180, 255, 180, 0.5)", // soft green
  },
  {
    icon: BookOpen,
    title: "School & Institute",
    oneliner: "An academic site that admin staff can operate without external help.",
    bullets: [
      "Admission enquiry funnel, prospectus download, news & events",
      "Faculty profiles, gallery, alumni section",
      "Back-end CMS designed for non-technical teams",
    ],
    accent: "rgba(255, 180, 200, 0.5)", // soft pink
  },
  {
    icon: Building,
    title: "Real Estate & Property",
    oneliner: "Project showcase sites that feed your sales-team CRM.",
    bullets: [
      "Floor plans, amenities, virtual tours, location intelligence",
      "Lead-capture funnels integrated with sales CRMs",
      "Built for paid traffic from Google and Meta",
    ],
    accent: "rgba(150, 220, 220, 0.5)", // teal
  },
  {
    icon: Layers,
    title: "Custom ERP & CRM",
    oneliner: "Scoped-to-fit business software, built modular so you can grow into it.",
    bullets: [
      "Sales, purchase, inventory, accounts, HR and customer management",
      "Modular architecture — start small, add modules as you scale",
      "Built around your team's workflow, not a generic product",
    ],
    accent: "rgba(180, 180, 255, 0.5)", // lavender
  },
  {
    icon: Sparkles,
    title: "Branding & Identity Kit",
    oneliner: "A fixed-scope brand kit — perfect for new ventures and rebrands.",
    bullets: [
      "Logo, colour system, typography",
      "Business stationery + social media templates",
      "A brand guidelines document your team can use forever",
    ],
    accent: "rgba(255, 150, 200, 0.5)", // pink
  },
  {
    icon: TrendingUp,
    title: "Digital Marketing Retainer",
    oneliner: "Monthly growth retainer — single point of contact, one dashboard.",
    bullets: [
      "SEO + content + social media + paid ads",
      "Transparent dashboard, monthly performance review",
      "Designed for businesses that don't want to manage four agencies",
    ],
    accent: "rgba(255, 220, 120, 0.5)", // amber
  },
];

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        badge="Solutions"
        title="Pre-Engineered Solutions for Industries We Know"
        subtitle="Rather than starting every project from a blank screen, we package our most-requested work into ready-to-deploy industry solutions. Faster to ship, easier to price."
      />

      <Section>
        <div className="grid md:grid-cols-2 gap-6">
          {SOLUTIONS.map((s) => {
            const Icon = s.icon;
            return (
              <AccentOnView
                key={s.title}
                accent={s.accent}
                className="h-full"
              >
                <div className="wave-card h-full p-7 md:p-8">
                  <span className="wave" aria-hidden />
                  <span className="wave" aria-hidden />
                  <span className="wave" aria-hidden />
                  <div className="wave-content flex flex-col h-full">
                    <div className="flex items-start gap-4 mb-3">
                      <div className="h-12 w-12 rounded-lg bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="text-xl md:text-2xl font-semibold text-white pt-1">
                        {s.title}
                      </h3>
                    </div>
                    <p className="text-gray-100 leading-relaxed mb-4">
                      {s.oneliner}
                    </p>
                    <ul className="space-y-2 mt-auto">
                      {s.bullets.map((b) => (
                        <li
                          key={b}
                          className="flex items-start gap-2 text-sm text-gray-200"
                        >
                          <CheckCircle2 className="h-4 w-4 text-white/90 mt-0.5 flex-shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </AccentOnView>
            );
          })}
        </div>
      </Section>

      <Section
        eyebrow="Partner Ecosystem"
        title="Our Solution Partners"
        description="Cloud, payment, analytics and marketing platforms — your stack stays enterprise-grade even when your team is small."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {[
            "Cloud Providers",
            "Payment Gateways",
            "Email & SMS",
            "CRM Platforms",
            "Analytics",
            "Marketing Automation",
          ].map((p) => (
            <div
              key={p}
              className="glass rounded-xl px-6 py-7 text-center flex items-center justify-center min-h-[88px]"
            >
              <span className="shine tracking-tight">{p}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section containerClassName="text-center">
        <div className="glass rounded-2xl p-10 md:p-14 max-w-3xl mx-auto purple-glow">
          <h3 className="text-2xl md:text-4xl font-bold gradient-text mb-4">
            Ready-to-deploy. Tailored to your business.
          </h3>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Pick the package that matches your industry — we'll customise the
            details so it feels purpose-built.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-white text-black px-6 py-3 font-semibold hover:bg-gray-200 transition-colors"
          >
            Request a Solution Brief
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>
    </>
  );
}
