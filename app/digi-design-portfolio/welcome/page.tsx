import type { Metadata } from "next";
import { HorizonHeroSection } from "@/components/ui/horizon-hero-section";

export const metadata: Metadata = {
  title: "Digi Design — Portfolio",
  description:
    "Step into Digi Design's portfolio — a full-service studio with deep specialisation in aesthetic dermatology and cosmetology, trusted by 500+ clients in India and delivering globally.",
};

export default function DigiDesignWelcomePage() {
  return <HorizonHeroSection />;
}
