import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone, MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="container py-16 grid gap-10 md:grid-cols-4">
        <div className="space-y-4">
          <Link href="/" aria-label="Baptist Digitek — Home" className="inline-block">
            <Image
              src="/logo.png"
              alt="Baptist Digitek (P) Ltd."
              width={520}
              height={240}
              className="h-10 w-auto select-none"
            />
          </Link>
          <p className="text-sm text-gray-400 max-w-xs">
            A Chennai-based digital company building websites, software,
            mobile apps and brand experiences for businesses across Tamil Nadu
            and beyond.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-gray-300">
            Company
          </h4>
          <ul className="space-y-2 text-sm text-gray-400">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-gray-300">
            Reach Us
          </h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li className="flex items-start gap-2">
              <Phone className="h-4 w-4 mt-0.5 text-purple-300 flex-shrink-0" />
              <span>{siteConfig.contact.phonePrimary}</span>
            </li>
            <li className="flex items-start gap-2">
              <MessageCircle className="h-4 w-4 mt-0.5 text-purple-300 flex-shrink-0" />
              <span>WhatsApp {siteConfig.contact.whatsapp}</span>
            </li>
            <li className="flex items-start gap-2">
              <Mail className="h-4 w-4 mt-0.5 text-purple-300 flex-shrink-0" />
              <a
                href={`mailto:${siteConfig.contact.supportEmail}`}
                className="hover:text-white transition-colors"
              >
                {siteConfig.contact.supportEmail}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-gray-300">
            Office
          </h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li className="flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-0.5 text-purple-300 flex-shrink-0" />
              <span>
                <span className="block text-gray-200 font-medium">Chromepet, Chennai</span>
                {siteConfig.offices.chennai.address}
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <span>© {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.</span>
          <span>Chennai · Chromepet · Tamil Nadu, India</span>
        </div>
      </div>
    </footer>
  );
}
