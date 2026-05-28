import type { Metadata } from "next";
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Clock,
  Instagram,
  Facebook,
  Youtube,
} from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { ContactForm } from "@/components/ui/contact-form";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Baptist Digitek | Web & IT Company in Chromepet, Chennai",
  description:
    "Reach Baptist Digitek Private Limited at our Chromepet, Chennai head office. Call, WhatsApp or email us for web design, software and digital marketing enquiries.",
};

const socials = [
  { icon: MessageCircle, label: "WhatsApp", href: "https://wa.me/917845834708" },
  { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/digi_designs_tek/" },
  { icon: Facebook, label: "Facebook", href: "https://www.facebook.com/share/1P35WzyYkv" },
  { icon: Youtube, label: "YouTube", href: "https://www.youtube.com/@AmuthanLeadership" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        badge="Contact"
        title="Let's Talk About Your Next Project"
        subtitle="A single landing page, a full software platform, or a second opinion on what your business should do next online — we're easy to reach and quick to respond."
      />

      <Section>
        <div className="grid lg:grid-cols-1 gap-6 max-w-3xl mx-auto">
          <div className="glass rounded-2xl p-7 md:p-8">
            <div className="h-11 w-11 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4">
              <MapPin className="h-5 w-5 text-purple-300" />
            </div>
            <h3 className="text-lg font-semibold mb-1 text-white">
              {siteConfig.offices.chennai.label}
            </h3>
            <p className="text-gray-400 leading-relaxed mb-3">
              {siteConfig.offices.chennai.address}
            </p>
            <a
              href={`tel:${siteConfig.offices.chennai.phone.replace(/\s/g, "")}`}
              className="text-purple-300 hover:text-white transition-colors text-sm"
            >
              {siteConfig.offices.chennai.phone}
            </a>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-6">
          <div className="glass rounded-2xl p-7">
            <Mail className="h-5 w-5 text-purple-300 mb-3" />
            <h4 className="font-semibold mb-3 text-white">Email Us</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <span className="block text-gray-300">New enquiries</span>
                <a href={`mailto:${siteConfig.contact.salesEmail}`} className="hover:text-white">
                  {siteConfig.contact.salesEmail}
                </a>
              </li>
              <li>
                <span className="block text-gray-300">Client support</span>
                <a href={`mailto:${siteConfig.contact.supportEmail}`} className="hover:text-white">
                  {siteConfig.contact.supportEmail}
                </a>
              </li>
              <li>
                <span className="block text-gray-300">Design (Digi Design)</span>
                <a href={`mailto:${siteConfig.contact.designEmail}`} className="hover:text-white">
                  {siteConfig.contact.designEmail}
                </a>
              </li>
            </ul>
          </div>

          <div className="glass rounded-2xl p-7">
            <MessageCircle className="h-5 w-5 text-purple-300 mb-3" />
            <h4 className="font-semibold mb-3 text-white">WhatsApp Us</h4>
            <p className="text-sm text-gray-400 leading-relaxed mb-3">
              For the quickest response, message us on WhatsApp. We typically
              reply within working hours the same day.
            </p>
            <a
              href="https://wa.me/917845834708"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-300 hover:text-white text-sm"
            >
              {siteConfig.contact.whatsapp}
            </a>
          </div>

          <div className="glass rounded-2xl p-7">
            <Clock className="h-5 w-5 text-purple-300 mb-3" />
            <h4 className="font-semibold mb-3 text-white">Working Hours</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>{siteConfig.hours.weekday}</li>
              <li>{siteConfig.hours.sunday}</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section
        eyebrow="Send Us a Brief"
        title="Tell us about your project"
        description="Helpful inputs include the type of project, your timeline, your budget range and any existing links we should look at. We respond to every enquiry within one working day."
      >
        <ContactForm />
      </Section>

      <Section eyebrow="Find Us" title="Chromepet, Chennai — On the Map">
        <div className="glass rounded-2xl overflow-hidden">
          <iframe
            title="Baptist Digitek Chromepet Office"
            src="https://www.google.com/maps?q=Subburaya+Nagar+Thiruneermalai+Main+Road+Chromepet+Chennai&output=embed"
            width="100%"
            height="420"
            style={{ border: 0, filter: "invert(0.9) hue-rotate(180deg) saturate(0.7)" }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </Section>

      <Section eyebrow="Social" title="Connect with us" align="center">
        <div className="flex items-center justify-center gap-3 flex-wrap">
          {socials.map((s) => {
            const Icon = s.icon;
            return (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass glass-hover inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm text-gray-200"
              >
                <Icon className="h-4 w-4 text-purple-300" />
                {s.label}
              </a>
            );
          })}
        </div>
      </Section>
    </>
  );
}
