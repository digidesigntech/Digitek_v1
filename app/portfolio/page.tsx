import type { Metadata } from "next";
import {
  Stethoscope,
  ShoppingBag,
  GraduationCap,
  Building2,
  Gauge,
  Search,
  Trophy,
} from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { type CardStackItem } from "@/components/ui/card-stack";
import { HotelCardStack } from "@/components/ui/hotel-card-stack";
import { ImageCursorTrail } from "@/components/ui/image-cursor-trail";

export const metadata: Metadata = {
  title: "Portfolio | Hotel, Clinic & Business Websites by Baptist Digitek",
  description:
    "Browse Baptist Digitek's portfolio of websites built for hotels, resorts, clinics, retail brands and businesses across Chennai, Tamil Nadu and India.",
};

// Canonical list of every hospitality property we've built. Drives the
// CardStack carousel (with click-through to live sites) AND the scannable
// name grid below — single source of truth, no drift.
type Hotel = {
  id: number;
  name: string;
  image: string; // file under /public/images/portfolio/
  url: string;
  note?: string; // short context line
};

const HOTELS: Hotel[] = [
  { id: 1, name: "Hotel Annamalai Trichy", image: "f2.jpg", url: "https://www.annamalaihotels.com", note: "Trichy · live site" },
  { id: 2, name: "RKH Hotels", image: "f3.jpg", url: "https://www.rkhhotels.com", note: "Multi-branch chain · live site" },
  { id: 3, name: "Rockfort Foods", image: "f5.jpg", url: "https://www.rockfortfoodstrichy.com", note: "F&B brand · Trichy" },
  { id: 4, name: "Thechi Hotels Private Ltd", image: "f6.jpg", url: "https://www.thechihotels.com", note: "Boutique chain · live site" },
  { id: 5, name: "Radiant Residency", image: "f7.jpg", url: "https://www.radiantresidency.com", note: "Live site" },
  { id: 6, name: "Selvem Residency", image: "f8.jpg", url: "https://www.selvamresidency.com", note: "Live site" },
  { id: 7, name: "Hotel Seven Stone Stays", image: "f9.jpg", url: "https://www.sevenstonestays.in", note: "Live site" },
  { id: 8, name: "Sharma Nivas Yelagiri", image: "f10.jpg", url: "https://www.sharmanivasyelagiri.com", note: "Yelagiri · live site" },
  { id: 9, name: "Aura CrimsonVistas", image: "f11.jpg", url: "https://www.auracrimsonvistas.in", note: "Resort · live site" },
  { id: 10, name: "Hotel Eden Roc", image: "f12.jpg", url: "https://www.edenrochotel.in", note: "Live site" },
  { id: 11, name: "Srirangam Stay", image: "f13.jpg", url: "https://www.srirangamstay.com", note: "Srirangam · live site" },
  { id: 12, name: "Hotel City Plaza", image: "f14.jpg", url: "https://www.cityplazahotelkaraikal.com", note: "Karaikal · live site" },
  { id: 13, name: "Eastin Park", image: "f15.jpg", url: "https://www.eastinpark.com", note: "Live site" },
  { id: 14, name: "Femina Hotel", image: "f16.jpg", url: "https://www.feminahotel.in", note: "Live site" },
  { id: 15, name: "GreenHotels Group", image: "f17.jpg", url: "https://www.greenhotelgroups.com", note: "Multi-property group · live site" },
  { id: 16, name: "Hotel AKMG", image: "f18.jpg", url: "https://www.hotelakmgtowers.com", note: "Live site" },
  { id: 17, name: "Hotel LE Cressida", image: "f19.jpg", url: "https://www.hotellecressida.com", note: "Live site" },
  { id: 18, name: "Mookambigai Residency", image: "f20.jpg", url: "https://www.hotelmookambigairesidency.com", note: "Live site" },
  { id: 19, name: "Hotel Raks", image: "f21.jpg", url: "https://www.hotelraks.com", note: "Live site" },
  { id: 20, name: "Hotel Narayani Residency", image: "f22.jpg", url: "https://www.narayaniresidency.in", note: "Live site" },
  { id: 21, name: "Hotel Shree Mantra", image: "f23.jpg", url: "https://www.hotelshreemantraresidency.com", note: "Live site" },
  { id: 22, name: "Sri Rathna Temple View Inn", image: "f25.jpg", url: "https://www.hotelsrirathna.com", note: "Trichy · live site" },
  { id: 23, name: "Hotel SV INN", image: "f26.jpg", url: "https://www.hotelsvinn.com", note: "Live site" },
  { id: 24, name: "Hotel I 5 Boutique", image: "f27.jpg", url: "https://www.i5boutiquehotels.com", note: "Boutique · live site" },
  { id: 25, name: "Mariam Homez", image: "f28.jpg", url: "https://www.mariahomez.com", note: "Serviced apartments · live site" },
  { id: 26, name: "Hotel MSM", image: "f29.jpg", url: "https://www.msmstays.com", note: "Live site" },
  { id: 27, name: "Naksha Tree", image: "f30.jpg", url: "https://www.nakshatreehotels.com", note: "Multi-property · live site" },
  { id: 28, name: "PRMA", image: "f31.jpg", url: "https://www.hotelprmarunaarchadia.com", note: "Live site" },
  { id: 29, name: "Narayani Resort", image: "f32.jpg", url: "https://www.narayaniresort.in", note: "Resort · live site" },
];

// CardStack carousel data — generated from the canonical list.
const FEATURED: CardStackItem[] = HOTELS.map((h) => ({
  id: h.id,
  title: h.name,
  description: h.note,
  imageSrc: `/images/portfolio/${h.image}`,
  href: h.url,
}));

// Marquee images for the cursor-trail panel.
const MARQUEE_IMAGES = Array.from(
  { length: 32 },
  (_, i) => `/images/marque/p${i + 1}.png`
).filter((src) => {
  const n = Number(src.match(/p(\d+)\.png$/)![1]);
  return n !== 4 && n !== 24;
});

const CATEGORIES = [
  {
    icon: Stethoscope,
    title: "Healthcare & Wellness",
    description:
      "Multi-doctor practice platforms, patient enquiry systems, trust-led design. Dermatology & cosmetology creative work handled end-to-end via Digi Design.",
  },
  {
    icon: ShoppingBag,
    title: "Retail, F&B & Lifestyle",
    description:
      "Restaurant menus that open instantly on slow mobile data, catalogue-driven retail sites, brand showcases that make first impressions count.",
  },
  {
    icon: GraduationCap,
    title: "Education",
    description:
      "School and institute sites with admission funnels, prospectus downloads, alumni and event modules — structured for parent and student journeys.",
  },
  {
    icon: Building2,
    title: "Corporate & B2B",
    description:
      "Company profiles, product catalogues, distributor portals and lead-capture landing pages for manufacturers and service firms.",
  },
];

const SCORECARD = [
  { icon: Gauge, big: "< 3s", label: "Page load on 4G phones" },
  { icon: Search, big: "Q1", label: "First quarter organic lift" },
  { icon: Trophy, big: "Self-serve", label: "Owners managing their own content" },
];

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        badge="Portfolio"
        title="Hundreds of Sites Live. Thousands of Bookings Earned."
        subtitle="Heavy on hospitality for a reason — hotels are unforgiving clients. The skills we sharpened there now power every other industry we serve."
      />

      <Section>
        <div className="glass rounded-3xl p-10 md:p-14 text-center purple-glow max-w-4xl mx-auto">
          <div className="text-7xl md:text-8xl lg:text-9xl font-bold gradient-text leading-none mb-4">
            <AnimatedCounter to={29} suffix="+" duration={2} />
          </div>
          <p className="text-base md:text-xl text-gray-300 mb-2">
            Hospitality properties live across Tamil Nadu, Karaikal and Yelagiri
          </p>
          <p className="text-sm text-gray-500 max-w-xl mx-auto">
            Boutique hotels, mid-segment business hotels, beach & hill resorts,
            serviced apartments, homestays and multi-property groups.
          </p>
        </div>
      </Section>

      <Section
        eyebrow="Featured Properties"
        title="Every property, in motion"
        description="Drag the front card or use ← / → keys to move through the stack."
      >
        <div className="flex justify-center">
          <HotelCardStack items={FEATURED} />
        </div>
      </Section>

      <Section
        eyebrow="The Full List"
        title="Every hospitality property we power"
        description="Each delivered with optimised image pipelines, mobile-first design, integrated enquiry flow and SEO tuned for 'near me' searches."
      >
        <div className="spin-border rounded-3xl p-2">
          <ImageCursorTrail
            items={MARQUEE_IMAGES}
            maxNumberOfImages={6}
            distance={28}
            imgClass="sm:w-64 w-44 sm:h-64 h-44"
            className="rounded-[20px] bg-gradient-to-br from-purple-500/5 via-black to-black"
          >
            <div className="relative z-[60] text-center px-6 pointer-events-none">
              <p className="text-xs uppercase tracking-[0.3em] text-purple-300 mb-4">
                29 Properties · One Team
              </p>
              <p className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text leading-tight">
                Move your cursor across
              </p>
            </div>
          </ImageCursorTrail>
        </div>
      </Section>

      <Section eyebrow="Beyond Hospitality" title="Four more industries we serve">
        <div className="grid md:grid-cols-2 gap-5">
          {CATEGORIES.map((c, i) => {
            const Icon = c.icon;
            return (
              <div
                key={c.title}
                className="galaxy-btn p-7 h-full w-full text-left"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="galaxy-btn__stars"></div>
                <div className="galaxy-btn__content h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-11 w-11 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-5 w-5 text-purple-300 galaxy-btn__icon" />
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold text-white m-0">
                      {c.title}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {c.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      <Section
        eyebrow="Our Scorecard"
        title="How we measure a 'good' project"
        description="Did pages load in under three seconds on a 4G phone? Did organic traffic move in the first quarter? Did the owner stop calling us for content changes? That's the scorecard."
      >
        <div className="grid sm:grid-cols-3 gap-5">
          {SCORECARD.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.label}
                className="glass rounded-2xl p-7 flex items-center gap-4"
              >
                <Icon className="h-7 w-7 text-purple-300 flex-shrink-0" />
                <div>
                  <div className="text-3xl font-bold gradient-text leading-none mb-1">
                    {m.big}
                  </div>
                  <div className="text-sm text-gray-400">{m.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </Section>
    </>
  );
}
