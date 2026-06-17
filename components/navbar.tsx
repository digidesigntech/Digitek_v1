"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";
import { StarLink } from "@/components/ui/star-button";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isDigiPortfolio = pathname.startsWith("/digi-design-portfolio");

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-black/70 backdrop-blur-xl border-b border-white/10"
          : "bg-transparent"
      )}
    >
      <nav className="container flex items-center justify-between py-4">
        <Link
          href={isDigiPortfolio ? "/digi-design-portfolio" : "/"}
          aria-label={
            isDigiPortfolio ? "Digi Designs — Home" : "Baptist Digitek — Home"
          }
          className="flex items-center group"
        >
          <Image
            src={
              isDigiPortfolio
                ? "/digi-design-portfolio/logo_gold.png"
                : "/logo.png"
            }
            alt={isDigiPortfolio ? "Digi Designs" : "Baptist Digitek (P) Ltd."}
            width={520}
            height={240}
            priority
            className={cn(
              "w-auto select-none",
              isDigiPortfolio
                ? "h-16 md:h-20 drop-shadow-[0_0_18px_rgba(255,212,121,0.35)]"
                : "h-12 md:h-14 [filter:drop-shadow(0_0_8px_rgba(143,81,234,0.65))_drop-shadow(0_0_20px_rgba(254,83,187,0.45))] transition-[filter] duration-300 group-hover:[filter:drop-shadow(0_0_12px_rgba(143,81,234,0.9))_drop-shadow(0_0_28px_rgba(254,83,187,0.7))]"
            )}
          />
        </Link>

        <ul className="hidden lg:flex items-center gap-1">
          {siteConfig.nav.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href ||
                  pathname.startsWith(item.href + "/");
            const isExternal = item.href.startsWith("http");
            const children = "children" in item ? item.children : undefined;

            if (children) {
              return (
                <li key={item.href} className="relative group">
                  <Link
                    href={item.href}
                    className={cn(
                      "inline-flex items-center gap-1 px-4 py-2 text-sm transition-colors rounded-md",
                      isActive
                        ? "text-white bg-white/5"
                        : "text-gray-300 hover:text-white"
                    )}
                  >
                    {item.label}
                    <ChevronDown className="h-3.5 w-3.5 opacity-70 transition-transform duration-200 group-hover:rotate-180" />
                  </Link>
                  <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150">
                    <ul className="min-w-[220px] rounded-lg bg-zinc-950/95 backdrop-blur-xl border border-white/15 py-2 shadow-2xl shadow-black/60 ring-1 ring-white/5">
                      {children.map((c, i) => {
                        if ("section" in c) {
                          return (
                            <li
                              key={`section-${c.section}-${i}`}
                              className={cn(
                                "px-4 pb-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-purple-300",
                                i > 0 && "pt-3 mt-1 border-t border-white/5"
                              )}
                            >
                              {c.section}
                            </li>
                          );
                        }
                        const childActive = pathname.startsWith(c.href);
                        return (
                          <li key={c.href}>
                            <Link
                              href={c.href}
                              className={cn(
                                "block px-4 py-2 text-sm transition-colors",
                                childActive
                                  ? "text-white"
                                  : "text-gray-300 hover:text-white hover:bg-white/[0.06]"
                              )}
                            >
                              {c.label}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </li>
              );
            }

            return (
              <li key={item.href}>
                {isExternal ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "px-4 py-2 text-sm transition-colors rounded-md",
                      isActive
                        ? "text-white bg-white/5"
                        : "text-gray-300 hover:text-white"
                    )}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>

        <div className="hidden lg:block">
          <StarLink href="/contact">Start a Project</StarLink>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/10 text-white"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden border-t border-white/10 bg-black/90 backdrop-blur-xl max-h-[calc(100vh-4rem)] overflow-y-auto overscroll-contain">
          <ul className="container py-4 flex flex-col gap-1">
            {siteConfig.nav.map((item) => {
              const children =
                "children" in item ? item.children : undefined;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block px-3 py-3 rounded-md text-gray-200 hover:bg-white/5"
                  >
                    {item.label}
                  </Link>
                  {children && (
                    <ul className="ml-3 pl-3 border-l border-white/10">
                      {children.map((c, i) => {
                        if ("section" in c) {
                          return (
                            <li
                              key={`m-section-${c.section}-${i}`}
                              className="px-3 pt-3 pb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-purple-300"
                            >
                              {c.section}
                            </li>
                          );
                        }
                        return (
                          <li key={c.href}>
                            <Link
                              href={c.href}
                              className="block px-3 py-2.5 rounded-md text-sm text-gray-300 hover:bg-white/5"
                            >
                              {c.label}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
            <li className="pt-2 flex justify-center">
              <StarLink href="/contact">Start a Project</StarLink>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
