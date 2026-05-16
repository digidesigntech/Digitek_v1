"use client";

import { ExternalLink } from "lucide-react";
import { CardStack, type CardStackItem } from "@/components/ui/card-stack";

type HotelCardStackProps = {
  items: CardStackItem[];
};

/**
 * Client wrapper that owns the renderCard function so it doesn't get passed
 * across the RSC boundary from a server page (functions aren't serializable).
 *
 * Renders each card with a Visit button when active so the live URL is one
 * click away. The button stops pointer/click propagation so it doesn't
 * compete with the swipe-drag handler on the active card.
 */
export function HotelCardStack({ items }: HotelCardStackProps) {
  return (
    <CardStack
      items={items}
      initialIndex={0}
      cardWidth={520}
      cardHeight={320}
      maxVisible={7}
      autoAdvance
      intervalMs={4000}
      pauseOnHover
      loop
      showDots
      className="max-w-5xl"
      renderCard={(item, { active }) => (
        <div className="relative h-full w-full">
          {item.imageSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.imageSrc}
              alt={item.title}
              className="absolute inset-0 h-full w-full object-cover"
              draggable={false}
              loading="eager"
            />
          ) : null}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="relative z-10 flex h-full flex-col justify-end p-5">
            <div className="truncate text-lg font-semibold text-white">
              {item.title}
            </div>
            {item.description ? (
              <div className="mt-1 line-clamp-2 text-sm text-white/80">
                {item.description}
              </div>
            ) : null}
          </div>
          {active && item.href ? (
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              onPointerDown={(e) => e.stopPropagation()}
              className="absolute top-4 right-4 z-20 inline-flex items-center gap-1.5 rounded-full bg-white text-black px-3 py-1.5 text-xs font-semibold shadow-lg hover:bg-gray-200 transition-colors pointer-events-auto"
            >
              Visit
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          ) : null}
        </div>
      )}
    />
  );
}
