"use client";

import Link from "next/link";
import {
  Phone,
  ArrowRight,
  Star,
  ExternalLink,
} from "lucide-react";
import { Section } from "@/components/ui/section";
import { HlsVideo } from "@/components/ui/hls-video";
import StellarCardGallery from "@/components/ui/3d-image-gallery";
import { ProcessJourney } from "@/components/ui/process-journey";

const HERO_VIDEO_SRC =
  "https://stream.mux.com/4IMYGcL01xjs7ek5ANO17JC4VQVUTsojZlnw4fXzwSxc.m3u8";
const HERO_VIDEO_POSTER =
  "https://image.mux.com/4IMYGcL01xjs7ek5ANO17JC4VQVUTsojZlnw4fXzwSxc/thumbnail.jpg?time=1";

type DoctorReview = {
  name: string;
  role?: string;
  clinic?: string;
  rating: number;
  body: string;
};

const DOCTOR_REVIEWS: DoctorReview[] = [
  {
    name: "Dr. Jeya Praba",
    rating: 5,
    body:
      "Very much happy with the way they swiftly considered each suggestion and specification. Their interesting tag lines, proper alignment and perfect description of each procedure made each poster very unique.",
  },
  {
    name: "Dr. Swathi Vino",
    rating: 5,
    body:
      "Thank you so much for creating my menu design. It came out exactly as I expected. I really appreciate your patience in making all the corrections and changes I requested. Thanks again for your support and effort 🙏🏼",
  },
  {
    name: "Dr. Sahana Bharathi",
    rating: 5,
    body:
      "We had a great experience working with your team. Thank you for your creativity, patience, and support in designing our board and other materials. The designs came out exactly how we expected. Highly appreciate your effort and professionalism.",
  },
  {
    name: "Shine Dermatology & Aesthetics",
    role: "Dermatology & Aesthetics Clinic",
    rating: 5,
    body:
      "Baptist Digi Design Tech has done a wonderful job in designing website and digital marketing.",
  },
  {
    name: "Vignesh Joe",
    role: "Clinic Owner",
    rating: 5,
    body:
      "As a customer I'm so satisfied with their patience and the work they've done for our clinic. They attended every call and did all the corrections patiently. We opened a 24/7 clinic — even at night when I needed work done, they helped us finish it. A big relief that I found them on Instagram while scrolling for logo designing.",
  },
  {
    name: "Mohamed Ihsan",
    rating: 5,
    body:
      "Hello Digi Design Tech team — we are really happy to give this feedback. Fantastic work you've done for our company. All of your team are very kind, coordinated, with great follow-ups and excellent work. Your work quality is adorable. Really appreciated 👏 guys. Thank you 😊.",
  },
];

const GOOGLE_REVIEWS_URL =
  "https://www.google.com/search?q=Digi+Desgins+Tech&stick=H4sIAAAAAAAA_-NgU1IxqEg0s7AwtkyyNEhOSrFMMjW1MqgwSzQwMTM0AoqkGViapCxiFXTJTM9UcEktTs_MK1YISU3OAAAAOCNbPAAAAA&hl=en&mat=CalRPccW83gAElYBTVDHnhjA9ir72BioCPQM4dkEvQLfT_-KQPE5mIJyABs_MrMQryuQoaXClZeiP_JAmy-NdATAZ1UHcRb9KvdtTAKf11_UFZfhs4wWDtigE5RWBtid8w&authuser=0#lrd=0xa68839b90cbd9b55:0x6a046120cbf094d,1,,,,";

const STATS = [
  { value: "500+", label: "Clients in India" },
  { value: "2,000+", label: "Designs delivered" },
  { value: "Global", label: "Delivery across markets" },
];

export default function DigiDesignPortfolio() {
  return (
    <>
      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-24">
        <div className="absolute inset-0 z-0">
          <HlsVideo
            src={HERO_VIDEO_SRC}
            poster={HERO_VIDEO_POSTER}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 z-[1] bg-gradient-to-br from-black/70 via-black/30 to-black/60 pointer-events-none" />

        <div className="container relative z-10 grid lg:grid-cols-[1.2fr_0.8fr] gap-10 items-center pointer-events-none">
          <div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.05] mb-6">
              Design built for aesthetics.
              <br />
              <span className="gradient-text">Tuned to the stars.</span>
            </h1>
            <p className="text-lg text-gray-300 max-w-xl mb-8 leading-relaxed">
              A constellation of work — clinic campaigns, brand systems and
              the in-clinic material that goes with them. Scroll for the
              showreel.
            </p>
            <div className="flex flex-wrap gap-3 pointer-events-auto">
              <span className="glow-btn-wrap">
                <a href="tel:+917845834708" className="glow-btn text-sm">
                  <Phone className="h-4 w-4" />
                  Book a Discovery Call
                  <ArrowRight className="h-4 w-4" />
                </a>
              </span>
              <span className="glow-btn-wrap">
                <a href="#gallery" className="glow-btn text-sm">
                  View Our Work
                </a>
              </span>
              <span className="glow-btn-wrap">
                <Link
                  href="/digi-design-portfolio/packages"
                  className="glow-btn text-sm"
                >
                  Packages
                </Link>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* STATS — slim credibility band */}
      <Section>
        <div className="grid sm:grid-cols-3 gap-5">
          {STATS.map((s) => (
            <div key={s.label} className="cosmic-card p-8 text-center">
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                {s.value}
              </div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* PROCESS — pinned cinematic journey */}
      <ProcessJourney />

      {/* GALLERY — 3D Stellar Card Gallery */}
      <Section
        id="gallery"
        eyebrow="The Work"
        title="A galaxy of work."
        description="Drag to rotate the constellation. Click any card to view it up close."
      >
        <StellarCardGallery />
      </Section>

      {/* TESTIMONIALS — doctor Google reviews */}
      <Section
        id="testimonials"
        eyebrow="Trusted by the doctors we work with"
        title="Reviews from dermatologists and aesthetic practitioners."
        description="Verified Google reviews from the clinics we design for."
      >
        <div className="grid md:grid-cols-3 gap-5">
          {DOCTOR_REVIEWS.map((r, i) => (
            <div
              key={i}
              className="glass glass-hover rounded-2xl p-6 md:p-7 h-full flex flex-col"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className="flex gap-0.5"
                  aria-label={`${r.rating} out of 5 stars`}
                >
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star
                      key={s}
                      className={
                        s < r.rating
                          ? "h-4 w-4 fill-yellow-400 text-yellow-400"
                          : "h-4 w-4 text-gray-600"
                      }
                    />
                  ))}
                </div>
                <span className="text-[10px] uppercase tracking-[0.18em] text-gray-500">
                  Google Review
                </span>
              </div>
              <p className="text-gray-300 leading-relaxed mb-6 flex-1">
                &ldquo;{r.body}&rdquo;
              </p>
              <div className="border-t border-white/5 pt-4">
                <div className="font-semibold text-white text-sm">{r.name}</div>
                {r.role && (
                  <div className="text-xs text-gray-400">{r.role}</div>
                )}
                {r.clinic && (
                  <div className="text-xs text-gray-500 mt-0.5">{r.clinic}</div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-purple-300 hover:text-white transition-colors"
          >
            Read all reviews on Google
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </Section>

    </>
  );
}
