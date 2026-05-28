"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowRight, Phone, MessageCircle, Check } from "lucide-react";
import { Section } from "@/components/ui/section";

const PROBLEMS = [
  {
    label: "01 — The Silent Loss",
    head: "Weak digital presence costs appointments.",
    body: "Patients research a clinic before they ever pick up the phone. An inconsistent feed or dated posters quietly send them to the next listing.",
  },
  {
    label: "02 — The Wrong Hands",
    head: "Generic agencies miss medical trust.",
    body: "Cosmetology requires credibility and clinical accuracy — things templated work simply cannot deliver.",
  },
  {
    label: "03 — The Guesswork",
    head: "Marketing without data is guesswork.",
    body: "Boosting random posts doesn't fill an appointment book. It drains budgets and dilutes brand authority.",
  },
  {
    label: "04 — The Time Tax",
    head: "Doctors aren't marketers.",
    body: "Between consults and procedures, there is no bandwidth left to manage handles. We carry that weight entirely.",
  },
];

const PACKAGES = [
  {
    name: "Starter",
    price: "₹5,000",
    period: "/ month",
    featured: false,
    tag: "",
    features: ["8 Posts", "4 Stories", "2 Reels"],
  },
  {
    name: "Growth",
    price: "₹7,500",
    period: "/ month",
    featured: false,
    tag: "",
    features: [
      "Everything in Starter",
      "Posting on your channels",
      "Social media handling",
    ],
  },
  {
    name: "Pro",
    price: "₹25,000",
    period: "/ month",
    featured: true,
    tag: "Most Chosen",
    features: [
      "Unlimited designs",
      "Custom designs",
      "Corrections included",
      "Social media handling",
      "Meta ads running*",
    ],
  },
  {
    name: "Custom",
    price: "Quoted",
    period: "tailored to you",
    featured: false,
    tag: "",
    features: [
      "Everything in Pro",
      "+ SEO",
      "+ Practice website",
      "Built around your goals",
    ],
  },
];

export function ScrollytellingPackages() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Pin the left column while the right column scrolls
      ScrollTrigger.matchMedia({
        // Desktop only
        "(min-width: 1024px)": () => {
          if (leftColRef.current && rightColRef.current && containerRef.current) {
            ScrollTrigger.create({
              trigger: containerRef.current,
              start: "top 20%",
              end: () => `+=${rightColRef.current?.offsetHeight! - leftColRef.current?.offsetHeight!}`,
              pin: leftColRef.current,
              pinSpacing: false,
            });
          }
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[80vh] flex items-center pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        </div>
        <div className="container">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block text-xs uppercase tracking-[0.2em] text-purple-300 mb-3"
          >
            Pricing
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.05] mb-6 max-w-4xl"
          >
            Most doctors don't have a{" "}
            <span className="gradient-text">design problem.</span>
            <br />
            They have a{" "}
            <span className="gradient-text">presence problem.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-400 max-w-xl italic"
          >
            And presence — done right — is what fills your appointment book.
          </motion.p>
        </div>
      </section>

      {/* SETUP & PROBLEMS (GSAP Pinned Story) */}
      <Section>
        <div ref={containerRef} className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-start">
          {/* Left: Pinned Context */}
          <div ref={leftColRef} className="lg:max-w-md w-full z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Every dermatology and cosmetology clinic faces the same{" "}
              <span className="gradient-text">four silent leaks</span>
            </h2>
            <p className="text-xl text-gray-400 leading-relaxed">
              They are small, invisible, but they slowly drain your growth.
            </p>
          </div>

          {/* Right: Scrolling Problems */}
          <div ref={rightColRef} className="space-y-16 lg:space-y-32 py-10 lg:py-32">
            {PROBLEMS.map((p, i) => (
              <motion.div
                key={p.label}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="sol-card p-6 md:p-10 h-full w-full shadow-2xl"
              >
                <div className="sol-card-aurora"></div>
                <div className="sol-card-bg"></div>
                <div className="sol-card-content h-full flex flex-col relative z-10">
                  <div className="text-xs uppercase tracking-[0.2em] text-purple-300 mb-6">
                    {p.label}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                    {p.head}
                  </h3>
                  <p className="text-lg md:text-xl text-gray-400 leading-relaxed flex-grow">
                    {p.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* PIVOT */}
      <Section containerClassName="text-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block text-xs uppercase tracking-[0.2em] text-purple-300 mb-4">
            What We Build For You
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">
            We don't sell design.
          </h2>
          <h2 className="text-3xl md:text-5xl font-bold gradient-text mb-10">
            We build presence — through design.
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Through <span className="text-purple-300">credible visuals</span>,
            consistent posting, and <span className="text-purple-300">data-driven attention</span>,
            we turn quiet practices into the ones people remember.
          </p>
        </motion.div>
      </Section>

      {/* PROOF */}
      <Section containerClassName="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-xs uppercase tracking-[0.2em] text-purple-300 mb-4">
            What This Means in Numbers
          </div>
          <div className="text-6xl md:text-8xl font-bold gradient-text mb-4">
            500+ Clients
          </div>
          <p className="text-lg md:text-xl text-gray-400 italic">
            across India trust Digi Design — with delivery globally.
          </p>
        </motion.div>
      </Section>

      {/* OFFER — packages grid */}
      <Section
        eyebrow="Plans"
        title="Choose the package that matches your practice."
        description="Start small and scale — or jump straight into the full system."
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PACKAGES.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`galaxy-btn p-8 flex flex-col h-full w-full text-left ${
                pkg.featured ? "purple-glow" : ""
              }`}
            >
              <div className="galaxy-btn__stars"></div>
              <div className="galaxy-btn__content h-full flex flex-col relative z-10">
                {pkg.tag && (
                  <div className="inline-flex items-center bg-purple-500 text-white text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full w-fit mb-4">
                    {pkg.tag}
                  </div>
                )}
                {!pkg.tag && <div className="h-6 mb-4" />}
                <div className="w-9 h-0.5 bg-purple-400 mb-6" />
                <div className="text-xs font-bold uppercase tracking-[0.25em] text-purple-300 mb-4">
                  {pkg.name}
                </div>
                <div className="text-4xl md:text-5xl font-bold text-white mb-1">
                  {pkg.price}
                </div>
                <div className="text-sm text-gray-400 italic mb-6">
                  {pkg.period}
                </div>
                <div className="h-px bg-white/10 mb-6" />
                <ul className="space-y-3 flex-grow">
                  {pkg.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 text-sm text-gray-300"
                    >
                      <Check className="h-4 w-4 text-purple-300 flex-shrink-0 mt-0.5 galaxy-btn__icon" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
        <p className="text-center text-sm text-gray-500 italic mt-12">
          *Meta ad spend billed separately at actuals.
        </p>
      </Section>

      {/* INVITE / CTA */}
      <Section containerClassName="text-center pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-2xl md:text-3xl text-gray-300 italic max-w-3xl mx-auto leading-relaxed mb-10">
            If your practice deserves to be{" "}
            <span className="text-purple-300 not-italic font-semibold">
              seen, trusted, and remembered
            </span>{" "}
            — we should talk.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="tel:+917845834708"
              className="inline-flex items-center gap-2 rounded-lg bg-purple-500 hover:bg-purple-400 text-white px-6 py-3 text-sm font-semibold transition-colors"
            >
              <Phone className="h-4 w-4" />
              Book a Discovery Call
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="https://wa.me/917845834708"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg glass glass-hover px-6 py-3 text-sm font-semibold text-white"
            >
              <MessageCircle className="h-4 w-4 text-green-400" />
              Chat on WhatsApp
            </a>
            <Link
              href="/digi-design-portfolio"
              className="inline-flex items-center gap-2 rounded-lg glass glass-hover px-6 py-3 text-sm font-semibold text-white"
            >
              Back to Portfolio
            </Link>
          </div>
        </motion.div>
      </Section>
    </>
  );
}
