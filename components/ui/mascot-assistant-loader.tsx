"use client";

import dynamic from "next/dynamic";

// Defers the mascot's JS until after the page is interactive. Layout-level
// component, so without this it would hydrate on every route immediately.
const MascotAssistant = dynamic(
  () =>
    import("./mascot-assistant").then((m) => ({ default: m.MascotAssistant })),
  { ssr: false }
);

export function MascotAssistantLoader() {
  return <MascotAssistant />;
}
