"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2 } from "lucide-react";

type Solution = {
  image: string;
  title: string;
  industry: string;
  oneliner: string;
  bullets: string[];
  accent: string;
  accentSoft: string;
};

const SOLUTIONS: Solution[] = [
  {
    image: "/images/solutions/hotels%20and%20resorts.jpg",
    title: "Hotel & Resort Website",
    industry: "Hospitality",
    oneliner:
      "A booking-ready property website your front desk can run themselves.",
    bullets: [
      "Room galleries, rate panels, WhatsApp booking, Google Maps & reviews",
      "Front-desk-friendly content panel — no developer needed",
      "Tuned for 'hotels near [location]' search visibility",
    ],
    accent: "rgba(255, 200, 100, 0.55)",
    accentSoft: "rgba(255, 200, 100, 0.10)",
  },
  {
    image: "/images/solutions/clinic%20and%20hospital.jpg",
    title: "Clinic & Hospital Platform",
    industry: "Healthcare",
    oneliner: "A trust-led platform that turns visitors into appointments.",
    bullets: [
      "Doctor profiles, treatments, appointment booking, patient education",
      "Before/after gallery (where ethically appropriate)",
      "Branded clinic creatives via Digi Design",
    ],
    accent: "rgba(120, 200, 255, 0.55)",
    accentSoft: "rgba(120, 200, 255, 0.10)",
  },
  {
    image: "/images/solutions/ecommerce.jpg",
    title: "E-Commerce & Retail",
    industry: "Retail",
    oneliner: "A storefront ready for paid ads from day one.",
    bullets: [
      "WooCommerce, Shopify or custom stack with multi-gateway payments",
      "Courier integrations, inventory sync, order tracking",
      "Marketing layer pre-wired for Meta & Google Ads",
    ],
    accent: "rgba(180, 255, 180, 0.55)",
    accentSoft: "rgba(180, 255, 180, 0.10)",
  },
  {
    image: "/images/solutions/school%20and%20institution.jpg",
    title: "School & Institute",
    industry: "Education",
    oneliner:
      "An academic site that admin staff can operate without external help.",
    bullets: [
      "Admission enquiry funnel, prospectus download, news & events",
      "Faculty profiles, gallery, alumni section",
      "Back-end CMS designed for non-technical teams",
    ],
    accent: "rgba(255, 180, 200, 0.55)",
    accentSoft: "rgba(255, 180, 200, 0.10)",
  },
  {
    image: "/images/solutions/real%20estate.jpg",
    title: "Real Estate & Property",
    industry: "Real Estate",
    oneliner: "Project showcase sites that feed your sales-team CRM.",
    bullets: [
      "Floor plans, amenities, virtual tours, location intelligence",
      "Lead-capture funnels integrated with sales CRMs",
      "Built for paid traffic from Google and Meta",
    ],
    accent: "rgba(150, 220, 220, 0.55)",
    accentSoft: "rgba(150, 220, 220, 0.10)",
  },
  {
    image: "/images/solutions/branding.jpg",
    title: "Branding & Identity Kit",
    industry: "Brand",
    oneliner:
      "A fixed-scope brand kit — perfect for new ventures and rebrands.",
    bullets: [
      "Logo, colour system, typography",
      "Business stationery + social media templates",
      "A brand guidelines document your team can use forever",
    ],
    accent: "rgba(255, 150, 200, 0.55)",
    accentSoft: "rgba(255, 150, 200, 0.10)",
  },
  {
    image: "/images/solutions/digital%20marketing.jpg",
    title: "Digital Marketing Retainer",
    industry: "Growth",
    oneliner:
      "Monthly growth retainer — single point of contact, one dashboard.",
    bullets: [
      "SEO + content + social media + paid ads",
      "Transparent dashboard, monthly performance review",
      "Designed for businesses that don't want to manage four agencies",
    ],
    accent: "rgba(255, 220, 120, 0.55)",
    accentSoft: "rgba(255, 220, 120, 0.10)",
  },
];

export function SolutionsRail() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const panelsRef = useRef<Array<HTMLElement | null>>([]);
  const counterRef = useRef<HTMLSpanElement | null>(null);
  const nameRef = useRef<HTMLSpanElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          const section = sectionRef.current!;
          const track = trackRef.current!;
          const panels = panelsRef.current.filter(Boolean) as HTMLElement[];

          const getTravel = () => track.scrollWidth - window.innerWidth;

          // Track the last "active" panel so onUpdate only mutates DOM /
          // CSS variables when the user crosses into a new card. Setting
          // these every frame causes background-transition + text-content
          // churn, which shows up as jank.
          let lastIdx = -1;

          // Main: pin the section, translate the track horizontally
          const scrubTween = gsap.to(track, {
            x: () => -getTravel(),
            ease: "none",
            force3D: true,
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => "+=" + getTravel(),
              pin: true,
              pinSpacing: true,
              scrub: 0.25,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                if (progressBarRef.current) {
                  progressBarRef.current.style.width = `${self.progress * 100}%`;
                }
                const idx = Math.min(
                  panels.length - 1,
                  Math.round(self.progress * (panels.length - 1))
                );
                if (idx === lastIdx) return;
                lastIdx = idx;
                const s = SOLUTIONS[idx];
                if (counterRef.current) {
                  counterRef.current.textContent = String(idx + 1).padStart(
                    2,
                    "0"
                  );
                }
                if (nameRef.current) {
                  nameRef.current.textContent = `${s.industry} · ${s.title}`;
                }
                section.style.setProperty("--rail-accent", s.accent);
                section.style.setProperty("--rail-accent-soft", s.accentSoft);
              },
            },
          });

          // Subtle icon parallax — single nested trigger per panel, tied
          // to the containerAnimation so it scrubs with the horizontal
          // pan. Larger nested-trigger workloads (text entrances etc.)
          // were removed because they multiplied scroll-time jitter and
          // caused first-frame text flashes via gsap.from's default
          // immediateRender.
          panels.forEach((panel) => {
            const icon = panel.querySelector(".rail-panel-icon-big");
            if (!icon) return;
            gsap.fromTo(
              icon,
              { y: 18 },
              {
                y: -18,
                ease: "none",
                force3D: true,
                scrollTrigger: {
                  trigger: panel,
                  containerAnimation: scrubTween,
                  start: "left right",
                  end: "right left",
                  scrub: true,
                },
              }
            );
          });
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="rail-section"
      style={
        {
          ["--rail-accent" as string]: SOLUTIONS[0].accent,
          ["--rail-accent-soft" as string]: SOLUTIONS[0].accentSoft,
        } as React.CSSProperties
      }
      aria-label="Industry solutions cinema rail"
    >
      <div className="rail-frame">
        <div className="rail-header">
          <div className="rail-header-left">
            <span className="rail-eyebrow">Industry Solutions</span>
            <span className="rail-current" ref={nameRef}>
              {SOLUTIONS[0].industry} · {SOLUTIONS[0].title}
            </span>
          </div>
          <div className="rail-header-right">
            <span className="rail-counter">
              <span ref={counterRef}>01</span>
              <span className="rail-counter-sep"> / </span>
              <span>07</span>
            </span>
          </div>
        </div>

        <div className="rail-track" ref={trackRef}>
          {SOLUTIONS.map((s, i) => {
            const num = String(i + 1).padStart(2, "0");
            return (
              <div
                key={s.title}
                ref={(el) => {
                  panelsRef.current[i] = el;
                }}
                className="rail-panel"
                style={
                  {
                    ["--panel-accent" as string]: s.accent,
                    ["--panel-accent-soft" as string]: s.accentSoft,
                  } as React.CSSProperties
                }
              >
                <div className="rail-panel-content">
                  <div className="rail-panel-text">
                    <div className="rail-panel-chip rail-anim">{num}</div>
                    <div className="rail-panel-tag rail-anim">{s.industry}</div>
                    <h3 className="rail-panel-title rail-anim">{s.title}</h3>
                    <p className="rail-panel-oneliner rail-anim">
                      {s.oneliner}
                    </p>
                    <ul className="rail-panel-bullets">
                      {s.bullets.map((b) => (
                        <li key={b} className="rail-anim">
                          <CheckCircle2 className="rail-panel-bullet-icon h-4 w-4" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rail-panel-visual">
                    <div className="rail-panel-icon-big">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={s.image}
                        alt={`${s.industry} — ${s.title}`}
                        className="absolute inset-0 h-full w-full object-cover"
                        loading="lazy"
                        draggable={false}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="rail-progress-bar" ref={progressBarRef} />
        <div className="rail-hint" aria-hidden="true">
          Scroll to advance →
        </div>
      </div>
    </section>
  );
}
