"use client";

import { useEffect, useRef, useState } from "react";

const HLS_CDN = "https://cdn.jsdelivr.net/npm/hls.js@1.5.13/dist/hls.min.js";

type HlsCtor = new (config?: unknown) => {
  loadSource: (src: string) => void;
  attachMedia: (video: HTMLVideoElement) => void;
  destroy: () => void;
};
type HlsModule = HlsCtor & { isSupported: () => boolean };

declare global {
  interface Window {
    Hls?: HlsModule;
  }
}

let hlsScriptPromise: Promise<HlsModule | null> | null = null;

function loadHls(): Promise<HlsModule | null> {
  if (typeof window === "undefined") return Promise.resolve(null);
  if (window.Hls) return Promise.resolve(window.Hls);
  if (hlsScriptPromise) return hlsScriptPromise;

  hlsScriptPromise = new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = HLS_CDN;
    script.async = true;
    script.onload = () => resolve(window.Hls ?? null);
    script.onerror = () => resolve(null);
    document.head.appendChild(script);
  });
  return hlsScriptPromise;
}

type HlsVideoProps = {
  src: string;
  poster?: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
};

export function HlsVideo({
  src,
  poster,
  className,
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
}: HlsVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Safari / iOS — native HLS support.
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
      return;
    }

    let hls: { destroy: () => void } | null = null;
    let cancelled = false;

    loadHls().then((Hls) => {
      if (cancelled || !videoRef.current) return;
      if (!Hls || !Hls.isSupported()) {
        setFailed(true);
        return;
      }
      const instance = new Hls();
      instance.loadSource(src);
      instance.attachMedia(videoRef.current);
      hls = instance;
    });

    return () => {
      cancelled = true;
      if (hls) hls.destroy();
    };
  }, [src]);

  if (failed) {
    return (
      <div
        className={className}
        style={{
          background:
            "radial-gradient(ellipse at 30% 40%, rgba(120,60,220,0.35), transparent 55%), radial-gradient(ellipse at 75% 65%, rgba(40,100,200,0.30), transparent 60%), #000",
        }}
      />
    );
  }

  return (
    <video
      ref={videoRef}
      className={className}
      poster={poster}
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      playsInline={playsInline}
      preload="auto"
    />
  );
}
