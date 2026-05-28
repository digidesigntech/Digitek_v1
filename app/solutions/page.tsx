import type { Metadata } from "next";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { SolutionsRail } from "@/components/ui/solutions-rail";
import { PartnerEcosystem } from "@/components/ui/partner-ecosystem";
import { StarLink } from "@/components/ui/star-button";

export const metadata: Metadata = {
  title:
    "Industry Solutions | Hotel, Clinic, Retail & Education Tech | Baptist Digitek",
  description:
    "Industry-ready digital solutions from Baptist Digitek — hotel websites, clinic platforms, e-commerce, school portals, ERP and CRM packages built for Indian businesses.",
};

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        badge="Solutions"
        title="Pre-Engineered Solutions for Industries We Know"
        subtitle="Rather than starting every project from a blank screen, we package our most-requested work into ready-to-deploy industry solutions. Faster to ship, easier to price."
      />

      <SolutionsRail />

      <PartnerEcosystem />

      <Section containerClassName="text-center">
        <div className="glass rounded-2xl p-10 md:p-14 max-w-3xl mx-auto purple-glow">
          <h3 className="text-2xl md:text-4xl font-bold gradient-text mb-4">
            Ready-to-deploy. Tailored to your business.
          </h3>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Pick the package that matches your industry — we&apos;ll customise the
            details so it feels purpose-built.
          </p>
          <StarLink href="/contact">Request a Solution Brief</StarLink>
        </div>
      </Section>
    </>
  );
}
