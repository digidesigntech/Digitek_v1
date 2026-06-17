export const siteConfig = {
  name: "Baptist Digitek",
  legalName: "Baptist Digitek Private Limited",
  description:
    "Chennai-based website development and IT solutions company offering web design, software, mobile apps, hosting, branding and digital marketing across Tamil Nadu and India.",
  url: "https://baptistdigitek.com",
  contact: {
    phonePrimary: "+91 78458 34708",
    salesEmail: "support@baptistdigitek.com",
    supportEmail: "support@baptistdigitek.com",
    designEmail: "design@baptistdigitek.com",
    whatsapp: "+91 78458 34708",
  },
  offices: {
    chennai: {
      label: "Registered & Corporate Office",
      address:
        "Plot No. 1 & 2, 2nd Floor, Subburaya Nagar, Thiruneermalai Main Road, Chromepet, Chennai – 600 044, Tamil Nadu, India",
      phone: "+91 78458 34708",
    },
  },
  hours: {
    weekday: "Monday to Saturday — 9:30 AM to 7:00 PM IST",
    sunday: "Sunday — Closed (urgent support available for retainer clients)",
  },
  nav: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/solutions", label: "Solutions" },
    { href: "/portfolio", label: "Portfolio" },
    {
      href: "/digi-design",
      label: "Digi Design",
      children: [
        { href: "/digi-design-portfolio", label: "Portfolio" },
        { href: "/digi-design-portfolio/packages", label: "Packages" },
      ],
    },
    { href: "/contact", label: "Contact" },
  ],
  digiDesignUrl: "/digi-design-portfolio/welcome",
} as const;
