"use client";

import { CardStack, type CardStackItem } from "@/components/ui/card-stack";

type HotelCardStackProps = {
  items: CardStackItem[];
};

/**
 * Client wrapper that owns the renderCard function so it doesn't get passed
 * across the RSC boundary from a server page (functions aren't serializable).
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
      renderCard={(item) => (
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
        </div>
      )}
    />
  );
}
