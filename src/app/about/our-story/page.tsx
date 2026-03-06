import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/shared/page-header";
import { Section, AnimateIn } from "@/components/ui";

export const metadata: Metadata = generatePageMetadata({
  title: "Our Story",
  description: "The story of MSMM Engineering — founded in 2011 by Manish Mardia, P.E., growing to become a leading civil engineering firm in the Gulf South.",
  path: "/about/our-story",
});

export default function OurStoryPage() {
  return (
    <>
      <PageHeader
        title="Our Story"
        subtitle="Building a legacy of engineering excellence since 2011"
        breadcrumbs={[
          { label: "About", href: "/about" },
          { label: "Our Story" },
        ]}
      />
      <Section>
        <div className="mx-auto max-w-3xl">
          <AnimateIn animation="fade-up">
            <h2 className="text-2xl font-bold text-foreground">
              From Vision to Reality
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              MSMM Engineering, LLC was founded in 2011 by Manish Mardia, P.E., a
              Louisiana and Mississippi registered Professional Engineer with over 35
              years of experience in drainage design, environmental engineering, civil
              engineering, and water and sewer projects.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              As a DBE small business headquartered in the New Orleans metropolitan
              area, MSMM was built on the principle of delivering high-quality
              engineering solutions that make a real difference in the communities
              we serve. Our team has collectively accumulated over 150 years of
              professional experience and has designed more than 250 projects.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              Over the years, we have expanded from our Metairie headquarters to
              include offices in New Orleans, Houston, and Prairieville, serving
              clients across the Gulf South with comprehensive civil engineering
              services from conception to completion.
            </p>
          </AnimateIn>

          <AnimateIn animation="fade-up" delay={100}>
            <h2 className="mt-12 text-2xl font-bold text-foreground">
              Our Expertise
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              MSMM specializes in complete design services for public infrastructure,
              flood protection, water/wastewater, coastal and ecosystem restoration
              projects. We also have extensive expertise in hydraulic and hydrologic
              modeling and GIS mapping.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              Our founder and team members have deep knowledge of parish infrastructure
              across Orleans, Jefferson, St. Tammany, St. Charles, St. Bernard, and
              Ascension parishes, and are experienced with governmental funding programs
              including US EPA, STAG, COE Section 219, WRDA, PRP, and post-emergency
              restoration programs (FEMA, GOHSEP/LRA, HUD/CDBG).
            </p>
          </AnimateIn>

          <AnimateIn animation="fade-up" delay={200}>
            <h2 className="mt-12 text-2xl font-bold text-foreground">
              Our Values
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {[
                { title: "Quality", desc: "Our motto is 'Leaders in Quality.' We hold ourselves to the highest standards of engineering excellence in every project." },
                { title: "Integrity", desc: "We operate with honesty, transparency, and ethical responsibility in every engagement." },
                { title: "Full Service", desc: "From conceptual planning through design, construction oversight, and project completion — we handle it all." },
                { title: "Community", desc: "We are committed to the long-term well-being of the communities we serve across the Gulf South." },
              ].map((value, i) => (
                <div
                  key={value.title}
                  className="rounded-lg border border-border p-6 hover-lift hover-glow"
                  style={{
                    animation: `fade-up 500ms cubic-bezier(0.16, 1, 0.3, 1) ${300 + i * 100}ms both`,
                  }}
                >
                  <h3 className="text-lg font-semibold text-primary">{value.title}</h3>
                  <p className="mt-2 text-sm text-muted">{value.desc}</p>
                </div>
              ))}
            </div>
          </AnimateIn>
        </div>
      </Section>
    </>
  );
}
