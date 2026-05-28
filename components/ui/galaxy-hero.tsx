"use client";

import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { SplineScene } from "@/components/ui/spline-scene";
import ParticleField from "@/components/ui/particle-field";
import { siteConfig } from "@/lib/site";
import { StarLink } from "@/components/ui/star-button";

const DIGI_DESIGN_SCENE =
  "https://prod.spline.design/us3ALejTXl6usHZ7/scene.splinecode";

// Class-based error boundary catches the synchronous WebGL context-creation
// error that Spline re-throws when the browser is out of WebGL contexts.
class SplineBoundary extends Component<
  { onFail: () => void; children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onFail();
  }
  render() {
    if (this.state.failed) return null;
    return this.props.children;
  }
}

function GalaxyFallback() {
  return (
    <div className="absolute inset-0">
      {/* Deep-space radial gradient — echoes the galaxy scene */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 30% 40%, rgba(120, 60, 220, 0.35), transparent 55%),
            radial-gradient(ellipse at 75% 65%, rgba(40, 100, 200, 0.30), transparent 60%),
            radial-gradient(ellipse at 50% 100%, rgba(180, 80, 230, 0.25), transparent 70%),
            #000
          `,
        }}
      />
      {/* Animated particle layer (pure 2D canvas — no WebGL) */}
      <ParticleField className="absolute inset-0" />
    </div>
  );
}

export function GalaxyHero() {
  const heroContentRef = useRef<HTMLDivElement>(null);
  const [splineFailed, setSplineFailed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroContentRef.current) return;
      requestAnimationFrame(() => {
        const scrollPosition = window.pageYOffset;
        const maxScroll = 400;
        const opacity = 1 - Math.min(scrollPosition / maxScroll, 1);
        if (heroContentRef.current) {
          heroContentRef.current.style.opacity = opacity.toString();
        }
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Background — Spline if WebGL available, otherwise particle fallback */}
      <div className="absolute inset-0 z-0">
        {splineFailed ? (
          <GalaxyFallback />
        ) : (
          <SplineBoundary onFail={() => setSplineFailed(true)}>
            <SplineScene
              scene={DIGI_DESIGN_SCENE}
              className="w-full h-full"
              onError={() => setSplineFailed(true)}
            />
          </SplineBoundary>
        )}

        {/* Cinematic vignette + bottom fade — applied over either background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              linear-gradient(to right, rgba(0,0,0,0.85), transparent 30%, transparent 70%, rgba(0,0,0,0.85)),
              linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.95))
            `,
          }}
        />
      </div>

      {/* Hero content overlay */}
      <div
        ref={heroContentRef}
        className="absolute inset-0 z-10 flex items-center pointer-events-none"
      >
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl text-left pt-24 md:pt-28">
            <span className="inline-block text-xs uppercase tracking-[0.25em] text-purple-300 mb-4">
              Full-Service Studio · Aesthetic Specialists
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter mb-6 gradient-text leading-[1.05]">
              Design across every platform —{" "}
              <br className="hidden sm:block" />
              with a specialist's eye for aesthetics.
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-xl mb-8 opacity-90 leading-relaxed">
              A full-service design studio working across industries and
              channels, with deep specialisation in aesthetic dermatology and
              cosmetology — trusted by 500+ clients in India and delivering
              globally.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pointer-events-auto">
              <StarLink href={siteConfig.digiDesignUrl} external>
                See Our Work
              </StarLink>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-purple-500/10 border border-purple-500/30 text-gray-100 font-medium py-3 px-7 rounded-full hover:bg-purple-500/20 hover:border-purple-400/50 transition-colors backdrop-blur-sm"
              >
                <MessageCircle className="h-4 w-4" />
                Talk to Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
