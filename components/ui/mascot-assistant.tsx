"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, X } from "lucide-react";

type Suggestion = {
  label: string;
  href: string;
  external?: boolean;
};

// Page-contextual nudges. Longest match wins so that
// `/digi-design-portfolio/packages` doesn't fall back to the broader
// `/digi-design-portfolio` entry.
const SUGGESTIONS: Record<string, Suggestion> = {
  "/": { label: "Want to see what we've built?", href: "/portfolio" },
  "/about": { label: "Curious what we offer?", href: "/services" },
  "/services": { label: "Have a project in mind?", href: "/contact" },
  "/solutions": { label: "Found your industry?", href: "/contact" },
  "/portfolio": { label: "Like the work? Let's talk.", href: "/contact" },
  "/digi-design": {
    label: "See the live portfolio →",
    href: "/digi-design-portfolio",
  },
  "/digi-design-portfolio": {
    label: "Ready to chat? Book a call.",
    href: "tel:+917845834708",
    external: true,
  },
  "/digi-design-portfolio/packages": {
    label: "Pick a plan and let's chat.",
    href: "/contact",
  },
  "/contact": {
    label: "Prefer WhatsApp?",
    href: "https://wa.me/917845834708",
    external: true,
  },
};

// Skip the immersive cosmic scroll page + any portfolio internals.
const HIDDEN_PREFIXES = [
  "/digi-design-portfolio/welcome",
  "/digi-design-portfolio/login",
  "/digi-design-portfolio/dashboard",
];

const DELAY_MS = 6000;

function resolveSuggestion(pathname: string): Suggestion | undefined {
  if (SUGGESTIONS[pathname]) return SUGGESTIONS[pathname];
  // Longest-prefix match, skipping the root entry.
  const match = Object.keys(SUGGESTIONS)
    .filter((k) => k !== "/" && pathname.startsWith(k))
    .sort((a, b) => b.length - a.length)[0];
  return match ? SUGGESTIONS[match] : undefined;
}

export function MascotAssistant() {
  const pathname = usePathname();
  const suggestion = useMemo(() => resolveSuggestion(pathname), [pathname]);
  const hidden = HIDDEN_PREFIXES.some((p) => pathname.startsWith(p));

  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    if (hidden || !suggestion) {
      setMounted(false);
      return;
    }
    const dismissKey = `mascot-dismissed:${pathname}`;
    if (
      typeof window !== "undefined" &&
      window.sessionStorage.getItem(dismissKey) === "1"
    ) {
      setMounted(false);
      return;
    }
    setMounted(true);
    setOpen(false);
    const timer = window.setTimeout(() => setOpen(true), DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [pathname, hidden, suggestion]);

  // Hide the floating widget once the footer is on screen so it doesn't
  // cover the contact info / back-to-top region.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const footer = document.querySelector("footer");
    if (!footer) return;
    const observer = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, [pathname]);

  if (!mounted || !suggestion || footerVisible) return null;

  const dismiss = () => {
    setOpen(false);
    setMounted(false);
    try {
      window.sessionStorage.setItem(`mascot-dismissed:${pathname}`, "1");
    } catch {
      // sessionStorage may be unavailable (private mode etc) — ignore.
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-end gap-2 pointer-events-none">
      {open && (
        <div className="mascot-bubble pointer-events-auto">
          <Link
            href={suggestion.href}
            target={suggestion.external ? "_blank" : undefined}
            rel={suggestion.external ? "noopener noreferrer" : undefined}
            className="flex items-center gap-2 text-sm font-medium text-white"
          >
            <span>{suggestion.label}</span>
            <ArrowRight className="h-3.5 w-3.5 flex-shrink-0" />
          </Link>
          <button
            type="button"
            onClick={dismiss}
            aria-label="Dismiss helper"
            className="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Hide helper" : "Open helper"}
        className="mascot-button pointer-events-auto"
      >
        <MascotSvg />
      </button>
    </div>
  );
}

function MascotSvg() {
  return (
    <svg
      width="56"
      height="56"
      viewBox="0 0 56 56"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {/* Antenna */}
      <line
        x1="28"
        y1="9"
        x2="28"
        y2="15"
        stroke="rgba(199,125,255,0.85)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="28" cy="7" r="2.2" fill="#c77dff">
        <animate
          attributeName="opacity"
          values="0.4;1;0.4"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Head */}
      <rect
        x="9"
        y="15"
        width="38"
        height="32"
        rx="11"
        fill="url(#mascot-head)"
        stroke="rgba(199,125,255,0.6)"
        strokeWidth="1.4"
      />

      {/* Visor screen */}
      <rect
        x="14"
        y="22"
        width="28"
        height="14"
        rx="6"
        fill="rgba(76,201,240,0.08)"
        stroke="rgba(76,201,240,0.3)"
        strokeWidth="0.8"
      />

      {/* Eyes (group so they blink together) */}
      <g className="mascot-eyes">
        <circle cx="21" cy="29" r="2.6" fill="#ffffff" />
        <circle cx="35" cy="29" r="2.6" fill="#ffffff" />
        <circle cx="21.6" cy="28.4" r="0.9" fill="#4cc9f0" />
        <circle cx="35.6" cy="28.4" r="0.9" fill="#4cc9f0" />
      </g>

      {/* Cheek glow */}
      <circle cx="14" cy="37" r="2" fill="rgba(254,83,186,0.45)" />
      <circle cx="42" cy="37" r="2" fill="rgba(254,83,186,0.45)" />

      {/* Mouth */}
      <path
        d="M22 40 Q28 43 34 40"
        stroke="rgba(255,255,255,0.7)"
        strokeWidth="1.3"
        strokeLinecap="round"
        fill="none"
      />

      <defs>
        <linearGradient id="mascot-head" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1a0f2e" />
          <stop offset="100%" stopColor="#0c0518" />
        </linearGradient>
      </defs>
    </svg>
  );
}
