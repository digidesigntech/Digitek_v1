"use client";

import dynamic from "next/dynamic";
import { useCallback, useState } from "react";
import type { Application } from "@splinetool/runtime";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  // Empty loading state — the gradient placeholder below sits underneath
  // the Spline canvas until onLoad fades it out. A spinner inside Spline's
  // own slot would flash during chunk parsing.
  loading: () => null,
});

interface SplineSceneProps {
  scene: string;
  className?: string;
  onError?: (error: unknown) => void;
  onLoad?: (app: Application) => void;
}

export function SplineScene({
  scene,
  className,
  onError,
  onLoad,
}: SplineSceneProps) {
  // `ready` flips when Spline has compiled + rendered the first frame.
  // We use it to fade the canvas in over 700ms, so the scene doesn't
  // pop in once it loads — that pop is what the user perceives as "buffering".
  const [ready, setReady] = useState(false);

  const handleLoad = useCallback(
    (app: Application) => {
      setReady(true);
      onLoad?.(app);
    },
    [onLoad]
  );

  return (
    <div className={className}>
      {/* Inner relative wrapper provides positioning context for the
          stacked placeholder + canvas, regardless of whether className
          puts us in absolute or relative flow. */}
      <div className="relative w-full h-full">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none transition-opacity duration-500"
          style={{
            opacity: ready ? 0 : 1,
            background:
              "radial-gradient(ellipse at center, rgba(120, 60, 220, 0.18), transparent 60%), #000",
          }}
        />
        <div
          className="absolute inset-0 transition-opacity duration-700 ease-out"
          style={{ opacity: ready ? 1 : 0 }}
        >
          <Spline
            scene={scene}
            className="w-full h-full"
            onError={onError}
            onLoad={handleLoad}
          />
        </div>
      </div>
    </div>
  );
}
