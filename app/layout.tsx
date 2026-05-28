import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { MascotAssistantLoader } from "@/components/ui/mascot-assistant-loader";
import { DomCleanupPatch } from "@/components/safety/dom-cleanup-patch";
import { RouteGsapGuard } from "@/components/safety/route-gsap-guard";
import { siteConfig } from "@/lib/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | Website Development & IT Solutions Company in Chennai`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "website development company in Chennai",
    "IT solutions Tamil Nadu",
    "web design company Chennai",
    "software development company Chromepet",
    "digital marketing agency Chennai",
  ],
  authors: [{ name: siteConfig.legalName }],
  metadataBase: new URL(siteConfig.url),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <head>
        {/* Open the TCP+TLS connection to the Spline CDN as early as
            possible. Spline scenes are 2-5 MB and the runtime can't
            even start fetching until after JS parses — preconnect shaves
            the DNS + TLS handshake (~200-500ms) off the perceived load. */}
        <link rel="preconnect" href="https://prod.spline.design" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://prod.spline.design" />
        <link rel="preconnect" href="https://unpkg.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-black text-white font-sans overflow-x-hidden">
        <DomCleanupPatch />
        <RouteGsapGuard />
        <Navbar />
        <main className="relative w-full overflow-x-hidden">{children}</main>
        <Footer />
        <MascotAssistantLoader />
      </body>
    </html>
  );
}
