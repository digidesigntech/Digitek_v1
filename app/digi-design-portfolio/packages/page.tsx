import type { Metadata } from "next";
import { ScrollytellingPackages } from "@/components/ui/scrollytelling-packages";

export const metadata: Metadata = {
  title: "Packages | Digi Designs",
  description:
    "Digi Designs packages — design and social media plans tailored for dermatology and cosmetology practices.",
};

export default function DigiDesignPackagesPage() {
  return <ScrollytellingPackages />;
}
