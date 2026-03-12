import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/shared/page-header";
import { Section, AnimateIn } from "@/components/ui";
import { ContactForm } from "@/components/contact/contact-form";
import { OfficeLocations } from "@/components/contact/office-locations";

export const metadata: Metadata = generatePageMetadata({
  title: "Contact",
  description: "Contact MSMM Engineering for civil engineering services. Offices in New Orleans, Baton Rouge, and Houston.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact Us"
        subtitle="Let's discuss how we can help with your next project"
      />
      <Section>
        <div className="grid gap-10 sm:gap-12 lg:grid-cols-3">
          <AnimateIn animation="slide-in-left" className="lg:col-span-2">
            <h2 className="text-xl font-bold text-foreground mb-6 sm:text-2xl">
              Send Us a Message
            </h2>
            <ContactForm />
          </AnimateIn>
          <AnimateIn animation="slide-in-right" delay={200} as="aside">
            <OfficeLocations />
          </AnimateIn>
        </div>
      </Section>
    </>
  );
}
