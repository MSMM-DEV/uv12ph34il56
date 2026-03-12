import { Section, AnimateIn } from "@/components/ui";

const CERTIFICATIONS = [
  {
    title: "Disadvantaged Business Enterprise",
    abbrev: "DBE",
    description:
      "MSMM Engineering is a certified Disadvantaged Business Enterprise (DBE). This certification reflects our commitment to diversity and inclusion within the engineering industry and our ability to compete for federally-funded transportation and infrastructure projects.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
    accent: "from-primary to-red-400",
  },
  {
    title: "Professional Licenses",
    abbrev: "PE",
    description:
      "Our team holds professional engineering licenses across multiple states, ensuring we can deliver expert services wherever our clients need us. Our engineers maintain active PE licenses in Louisiana, Texas, Mississippi, and other Gulf South states.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M7 8h4" />
        <path d="M7 12h10" />
        <path d="M7 16h6" />
        <circle cx="17" cy="8" r="2" />
      </svg>
    ),
    accent: "from-secondary to-blue-400",
  },
  {
    title: "Quality Assurance",
    abbrev: "QA",
    description:
      'MSMM Engineering maintains rigorous quality assurance processes across all our projects. Our "Leaders in Quality" tagline reflects our core commitment to delivering work that meets or exceeds industry standards and client expectations.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
    accent: "from-emerald-600 to-emerald-400",
  },
];

export function CertificationsSection() {
  return (
    <Section background="light" id="certifications">
      <div>
        {/* Section header */}
        <div className="text-center">
          <AnimateIn animation="fade-up" duration={700}>
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
              Certifications &amp; Designations
            </span>
          </AnimateIn>
          <AnimateIn animation="fade-up" delay={100} duration={700}>
            <h2 className="mt-4 text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
              Built on Trust &amp; Excellence
            </h2>
          </AnimateIn>
          <AnimateIn animation="fade-up" delay={200} duration={700}>
            <p className="mx-auto mt-4 max-w-2xl text-base text-muted sm:text-lg">
              Our certifications and designations demonstrate the standards we
              uphold and the values that drive our work.
            </p>
          </AnimateIn>
        </div>

        {/* Cards grid */}
        <div className="mt-10 sm:mt-14 grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CERTIFICATIONS.map((cert, i) => (
            <AnimateIn key={cert.abbrev} animation="cert-card-enter" delay={300 + i * 150} duration={700}>
              <div className="cert-card group rounded-xl border border-border bg-white p-6 sm:p-8">
                {/* Gradient accent bar at top */}
                <div
                  className={`cert-accent-bar h-1 rounded-full bg-gradient-to-r ${cert.accent}`}
                  style={{ width: "40%" }}
                />

                {/* Icon */}
                <AnimateIn animation="icon-pop" delay={500 + i * 150} duration={600}>
                  <div className="cert-icon-ring mt-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/8 text-primary">
                    {cert.icon}
                  </div>
                </AnimateIn>

                {/* Badge */}
                <div className="mt-5 flex items-center gap-3">
                  <h3 className="text-xl font-bold text-foreground">
                    {cert.title}
                  </h3>
                  <span className="rounded-md bg-gray-100 px-2 py-0.5 text-xs font-semibold text-muted transition-colors duration-300 group-hover:bg-primary/10 group-hover:text-primary">
                    {cert.abbrev}
                  </span>
                </div>

                {/* Description */}
                <p className="mt-3 leading-relaxed text-muted">
                  {cert.description}
                </p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </Section>
  );
}
