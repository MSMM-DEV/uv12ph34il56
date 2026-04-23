import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/shared/page-header";
import { Button, Section, AnimateIn } from "@/components/ui";
import { CertificationsSection } from "@/components/sections/certifications-section";

export const metadata: Metadata = generatePageMetadata({
  title: "About Us",
  description: "MSMM Engineering, LLC is a New Orleans based DBE small business engineering firm with over 150 years of combined professional experience.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About MSMM Engineering"
        subtitle="A DBE small business with over 150 years of combined experience"
      />
      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <AnimateIn animation="slide-in-left">
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                A Full Service Engineering Firm
              </h2>
              <p className="mt-4 text-base sm:text-lg leading-relaxed text-muted">
                MSMM Engineering, LLC was founded in 2011 by Manish Mardia, P.E. We are
                a small full service engineering firm with an extensive design portfolio
                of projects. Our team has collectively accumulated over 150 years of
                professional experience across a wide range of engineering projects.
              </p>
              <p className="mt-4 text-base sm:text-lg leading-relaxed text-muted">
                As a certified Disadvantaged Business Enterprise (DBE), we specialize in
                complete design services for public infrastructure, flood protection,
                water/wastewater, coastal and ecosystem restoration projects. MSMM also
                has extensive expertise in H&amp;H modeling and GIS mapping.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
                <Button href="/about/our-story">Our Story</Button>
                <Button href="/about/leadership" variant="outline">
                  Our Team
                </Button>
              </div>
            </div>
          </AnimateIn>
          <AnimateIn animation="slide-in-right" delay={200}>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
              {[
                { value: "2011", label: "Year Founded" },
                { value: "4", label: "Office Locations" },
                { value: "150+", label: "Years Combined Exp." },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className="rounded-lg bg-primary/5 p-4 sm:p-6 text-center hover-lift"
                  style={{
                    animation: `scale-in 500ms cubic-bezier(0.16, 1, 0.3, 1) ${300 + i * 100}ms both`,
                  }}
                >
                  <div className="text-2xl font-bold text-primary sm:text-3xl">{stat.value}</div>
                  <div className="mt-2 text-sm text-muted">{stat.label}</div>
                </div>
              ))}
            </div>
          </AnimateIn>
        </div>
      </Section>

      <CertificationsSection />
    </>
  );
}
