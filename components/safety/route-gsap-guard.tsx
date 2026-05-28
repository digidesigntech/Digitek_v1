"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Route-aware safety net for pinned GSAP sections.
 *
 * GSAP's pinning wraps the pinned element in a `.pin-spacer` div that
 * React's reconciler can't see. When the user navigates away from a
 * page that owns a pinned section, React's `removeChild` operates on
 * the wrong parent and silently fails — the pinned DOM survives and
 * bleeds onto the next page (homepage orbital on /services, solutions
 * rail on /digi-design, etc.).
 *
 * Each entry below maps a route to the CSS classes of pinned sections
 * that *belong* to that route. On any other route, those classes are
 * orphans and get swept up along with the pin-spacer wrapping them.
 */
const ROUTE_OWNED_PIN_SELECTORS: Array<{
  match: (pathname: string) => boolean;
  selectors: string[];
}> = [
  {
    match: (p) => p === "/",
    selectors: [".starsys-section", ".home-floating-robot"],
  },
  {
    match: (p) => p.startsWith("/solutions"),
    selectors: [".rail-section"],
  },
  {
    match: (p) => p.startsWith("/digi-design-portfolio"),
    selectors: [".journey-section"],
  },
  {
    match: (p) => p === "/digi-design" || p.startsWith("/digi-design/"),
    selectors: [".pillars-section"],
  },
];

const ALL_PIN_SELECTORS = ROUTE_OWNED_PIN_SELECTORS.flatMap((r) => r.selectors);

export function RouteGsapGuard() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ownedSelectors = new Set<string>();
    ROUTE_OWNED_PIN_SELECTORS.forEach((r) => {
      if (r.match(pathname)) r.selectors.forEach((s) => ownedSelectors.add(s));
    });
    const orphanSelectors = ALL_PIN_SELECTORS.filter(
      (s) => !ownedSelectors.has(s)
    );
    if (orphanSelectors.length === 0) return;

    let cancelled = false;

    const findOrphans = () => {
      const orphanSelectorList = orphanSelectors.join(", ");
      const orphans = new Set<HTMLElement>();
      document
        .querySelectorAll<HTMLElement>(orphanSelectorList)
        .forEach((n) => orphans.add(n));
      // A pin-spacer is only an orphan if it wraps a section that
      // doesn't belong to the current route. Other pin-spacers (e.g.
      // the one that legitimately wraps the current page's rail) must
      // be left alone.
      document
        .querySelectorAll<HTMLElement>(".pin-spacer")
        .forEach((spacer) => {
          if (spacer.querySelector(orphanSelectorList)) {
            orphans.add(spacer);
          }
        });
      return orphans;
    };

    const orphans = findOrphans();
    if (orphans.size === 0) return;

    const sweep = () => orphans.forEach((node) => node.remove());

    // Dynamic-import gsap so it stays out of the shared client bundle.
    // Only kill ScrollTriggers tied to the orphan nodes; the current
    // page's triggers must survive this sweep.
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")])
      .then(([{ default: gsap }, { ScrollTrigger }]) => {
        if (cancelled) return;
        gsap.registerPlugin(ScrollTrigger);
        ScrollTrigger.getAll().forEach((st) => {
          const trig = st.trigger as HTMLElement | null;
          const pin = (st as unknown as { pin?: HTMLElement | null }).pin;
          const isOrphan = (el: HTMLElement | null | undefined) =>
            !!el &&
            Array.from(orphans).some((o) => o === el || o.contains(el));
          if (isOrphan(trig) || isOrphan(pin)) {
            try {
              st.kill(true);
            } catch {
              // Ignore — defensive cleanup; nothing to recover from here.
            }
          }
        });
        sweep();
      })
      .catch(() => {
        sweep();
      });

    return () => {
      cancelled = true;
    };
  }, [pathname]);

  return null;
}
