import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/shared/page-header";
import { Section, AnimateIn } from "@/components/ui";
import { ContactForm } from "@/components/contact/contact-form";
import { OfficeLocations } from "@/components/contact/office-locations";

export const metadata: Metadata = generatePageMetadata({
  title: "Contact",
  description:
    "Contact MSMM Engineering for civil engineering services. Offices in New Orleans, Baton Rouge, and Houston.",
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
        <div className="grid gap-10 sm:gap-12 lg:grid-cols-3 lg:gap-14">
          <AnimateIn animation="fade-up" className="lg:col-span-2">
            <div className="rounded-xl border border-border bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-xl font-bold text-foreground sm:text-2xl">
                Send Us a Message
              </h2>
              <p className="mt-1.5 text-sm text-muted">
                We typically respond within 1–2 business days.
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </AnimateIn>
          <AnimateIn animation="fade-up" delay={150} as="aside">
            <OfficeLocations />
          </AnimateIn>
        </div>
      </Section>
    </>
  );
}
