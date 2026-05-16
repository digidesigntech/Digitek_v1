export const siteConfig = {
  name: "Baptist Digitek",
  legalName: "Baptist Digitek Private Limited",
  description:
    "Chennai-based website development and IT solutions company offering web design, software, mobile apps, hosting, branding and digital marketing across Tamil Nadu and India.",
  url: "https://baptistdigitek.com",
  contact: {
    phonePrimary: "+91 78458 34708",
    phoneSecondary: "+91 78455 95366",
    phoneTertiary: "+91 78455 95307",
    salesEmail: "sales@baptistdigitek.com",
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
    tanjore: {
      label: "Branch Office – Tanjore",
      address:
        "28/122, 2nd Floor, Subakalyan Traders Complex, Near Kumaran Theatre, Medical College Road, Tanjore – 613 007, Tamil Nadu, India",
      phone: "+91 78455 95366 | +91 78455 95307",
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
    { href: "/digi-design", label: "Digi Design" },
    { href: "/contact", label: "Contact" },
  ],
  digiDesignUrl: "https://digidesigntech.github.io/digi.design_portfolio/",
} as const;
