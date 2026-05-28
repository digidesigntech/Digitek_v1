"use client";

import { useEffect, useRef, useState } from "react";
import { CardStack, type CardStackItem } from "@/components/ui/card-stack";

export type TrainingVideo = {
  title: string;
  tag: string;
  description: string;
  src: string;
  poster?: string;
};

type Props = {
  videos: TrainingVideo[];
};

type VideoCardItem = CardStackItem & TrainingVideo;

/**
 * Fan-stack carousel of speaker testimonial videos.
 *
 * Visual matches the portfolio's HotelCardStack — cards fanned around a
 * centered active card with drag / keyboard / dot navigation. The active
 * card plays its video; the rest stay paused on frame 0 as still
 * thumbnails. Clicking any visible card brings it to centre AND unmutes
 * (the click is the user gesture browsers need for unmuted autoplay).
 */
export function TrainingVideoCurve({ videos }: Props) {
  // Map of <index → video element>. CardStack only mounts cards within
  // its maxVisible window, so refs for off-screen cards become null —
  // we just skip nulls in the playback effect.
  const videoRefs = useRef<Map<number, HTMLVideoElement | null>>(new Map());
  // Flag flipped before setActiveIdx whenever the change came from a
  // user gesture (click / drag / dot / keyboard). The playback effect
  // reads it to decide muted vs unmuted, then clears it.
  const userPickedRef = useRef(false);
  const [activeIdx, setActiveIdx] = useState(0);

  const items: VideoCardItem[] = videos.map((v, i) => ({
    id: i,
    ...v,
  }));

  const active = videos[activeIdx];

  // Only the active card's video plays; everything else is paused on
  // frame 0 so the fan reads as still thumbnails.
  useEffect(() => {
    const wantsAudio = userPickedRef.current;
    userPickedRef.current = false;

    videoRefs.current.forEach((v, idx) => {
      if (!v) return;
      if (idx === activeIdx) {
        v.muted = !wantsAudio;
        const p = v.play();
        if (p && typeof p.catch === "function") {
          p.catch(() => {
            // Browser blocked unmuted autoplay — fall back to muted.
            v.muted = true;
            v.play().catch(() => {});
          });
        }
      } else {
        v.pause();
        try {
          v.currentTime = 0;
        } catch {
          /* some browsers throw before metadata loads */
        }
        v.muted = true;
      }
    });
  }, [activeIdx]);

  // On unmount, pause every video.
  useEffect(() => {
    const refs = videoRefs.current;
    return () => {
      refs.forEach((v) => v?.pause());
    };
  }, []);

  const handleChangeIndex = (i: number) => {
    // CardStack calls this for click, drag, keyboard and dot — every
    // path here is user-initiated, so audio is allowed.
    userPickedRef.current = true;
    setActiveIdx(i);
  };

  return (
    <section className="relative py-10 md:py-14">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-[28rem] h-[28rem] bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[28rem] h-[28rem] bg-fuchsia-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container">
        <CardStack
          items={items}
          initialIndex={0}
          cardWidth={520}
          cardHeight={300}
          maxVisible={5}
          loop
          showDots
          pauseOnHover
          onChangeIndex={handleChangeIndex}
          className="max-w-5xl mx-auto"
          renderCard={(item, { active: isActive }) => (
            <div className="relative h-full w-full bg-black">
              <video
                ref={(el) => {
                  videoRefs.current.set(item.id as number, el);
                }}
                src={item.src}
                poster={item.poster}
                muted
                loop
                playsInline
                preload="metadata"
                controls={isActive}
                // Active card has native controls — stop pointer / click
                // events from reaching CardStack's drag handler so the
                // play / seek / volume buttons stay usable. Inactive
                // cards let the click bubble (so clicking activates).
                onPointerDown={
                  isActive ? (e) => e.stopPropagation() : undefined
                }
                onClick={isActive ? (e) => e.stopPropagation() : undefined}
                className={`absolute inset-0 h-full w-full ${
                  isActive ? "object-contain bg-black" : "object-cover"
                }`}
              />

              {/* Inactive cards get a name/tag overlay so they read as
                  thumbnails. The active card hides the overlay so the
                  controls and video frame are unobstructed. */}
              {!isActive && (
                <>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  <div className="relative z-10 flex h-full flex-col justify-end p-4 pointer-events-none">
                    <div className="text-[10px] uppercase tracking-[0.22em] text-purple-200/90 mb-1">
                      {item.tag}
                    </div>
                    <div className="text-base font-semibold text-white truncate">
                      {item.title}
                    </div>
                  </div>
                </>
              )}

              <div
                className={`pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-200 ${
                  isActive
                    ? "ring-2 ring-purple-400/70 opacity-100"
                    : "ring-1 ring-white/10 opacity-100"
                }`}
              />
            </div>
          )}
        />

        {/* Details for the active speaker, swap with active card. */}
        <div className="mt-8 md:mt-10 max-w-2xl mx-auto text-center px-4">
          <div className="text-xs uppercase tracking-[0.25em] text-purple-300 mb-2">
            {active.tag}
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
            {active.title}
          </h3>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed">
            {active.description}
          </p>
        </div>
      </div>
    </section>
  );
}
