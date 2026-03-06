import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { generatePageMetadata } from "@/lib/metadata";
import { Button, Section, AnimateIn, Container } from "@/components/ui";
import { SERVICE_CATEGORIES } from "@/lib/constants";

/* ──────────────────────────────────────────────
   Per-service content & imagery
   ────────────────────────────────────────────── */

const SERVICE_CONTENT: Record<
  string,
  {
    tagline: string;
    description: string;
    highlights: string[];
    capabilities: string[];
    image: string;
  }
> = {
  "public-infrastructure": {
    tagline: "Building the backbone of communities",
    description:
      "MSMM provides full-scale design for multiple local, state, and federal government clients, inclusive of multi-disciplinary design. Our portfolio includes roadways, bridges, drainage systems, municipal facilities, and site development projects across Louisiana and Texas.",
    highlights: [
      "Multi-disciplinary design coordination across civil, structural, and environmental disciplines",
      "Proven track record with LADOTD, USACE, and municipal clients",
      "Complete project lifecycle support from feasibility through construction",
    ],
    capabilities: [
      "Roadway design and reconstruction",
      "Drainage system design",
      "Municipal facility design",
      "ADA compliance and improvements",
      "Construction administration",
      "Multi-disciplinary design coordination",
      "Resident inspection services",
      "Mill and overlay / resurfacing projects",
    ],
    image:
      "https://images.unsplash.com/photo-1768962635991-0fa9543b7640?auto=format&fit=crop&w=1920&q=80",
  },
  "flood-control": {
    tagline: "Protecting communities from rising waters",
    description:
      "Our flood control expertise encompasses the full spectrum of flood protection infrastructure. From large-scale pump stations and levee systems to floodwalls and stormwater detention, we design resilient systems that protect communities from flooding events throughout the Gulf South.",
    highlights: [
      "Deep expertise in Gulf South hydrology and flood risk mitigation",
      "Extensive pump station design experience from 50 cfs to 3,000+ cfs",
      "Partnered with SLFPA, CPRA, and local levee districts on critical projects",
    ],
    capabilities: [
      "Drainage pump station design",
      "Levee raises and rehabilitation",
      "Floodwall design",
      "Culvert replacement and design",
      "Stormwater management systems",
      "Interior drainage analysis",
      "Flood risk assessments",
      "Design-Build RFP development",
    ],
    image:
      "https://images.unsplash.com/photo-1701340809575-82d013a7fd2d?auto=format&fit=crop&w=1920&q=80",
  },
  "water-wastewater": {
    tagline: "Engineering clean water for every community",
    description:
      "We provide comprehensive water and wastewater engineering services including treatment plant design, pump station design, collection system analysis, and infrastructure rehabilitation. Our team has deep experience with municipal systems across Orleans, Jefferson, St. Charles, St. Bernard, and Ascension parishes.",
    highlights: [
      "Expertise with InfoWorks and advanced hydraulic modeling platforms",
      "Comprehensive understanding of Louisiana regulatory requirements",
      "End-to-end services from modeling through construction administration",
    ],
    capabilities: [
      "Wastewater treatment plant design",
      "Sewerage pump station design and rehabilitation",
      "Water distribution system design",
      "Sewer infiltration and inflow management",
      "InfoWorks hydraulic modeling",
      "Water meter replacement programs",
      "SCADA system integration",
      "Permitting and construction administration",
    ],
    image:
      "https://images.unsplash.com/photo-1635145613344-3e59b1e8afd0?auto=format&fit=crop&w=1920&q=80",
  },
  "ecosystem-restoration": {
    tagline: "Restoring nature through engineering",
    description:
      "Our ecosystem restoration team designs projects that restore and preserve critical habitats while balancing the needs of surrounding communities. We combine engineering expertise with environmental science to create sustainable solutions, from riparian habitat restoration to landfill remediation.",
    highlights: [
      "Combined engineering and environmental science approach",
      "Experience with CWPPRA, RESTORE Act, and NRDA-funded projects",
      "Sustainable green and blue infrastructure design expertise",
    ],
    capabilities: [
      "Riparian habitat restoration",
      "Stormwater resilience infrastructure",
      "Landfill leachate management",
      "Salinity control structures",
      "Wetland mitigation and design",
      "Environmental permitting",
      "Hazardous waste remediation",
      "Green and blue corridor design",
    ],
    image:
      "https://images.unsplash.com/photo-1770672850748-8f71736bbfc9?auto=format&fit=crop&w=1920&q=80",
  },
  "coastal-restoration": {
    tagline: "Defending Louisiana's disappearing coastline",
    description:
      "MSMM designs coastal protection and restoration projects that combat erosion, restore barrier features, and protect shoreline communities. Our work is critical to preserving Louisiana's disappearing coastline, including projects under CWPPRA and the RESTORE Act.",
    highlights: [
      "Specialized in Louisiana coastal morphology and sediment dynamics",
      "CWPPRA and RESTORE Act project design and management",
      "Advanced survey capabilities including side-scan sonar and bathymetry",
    ],
    capabilities: [
      "Marsh creation projects",
      "Sheet pile and combi-wall structures",
      "Saltwater intrusion barriers",
      "Shoreline protection design",
      "Side scan-sonar and bathymetry surveys",
      "Perimeter dike and weir design",
      "CWPPRA and RESTORE Act projects",
      "Coastal monitoring programs",
    ],
    image:
      "https://images.unsplash.com/photo-1758327740463-e8aa4d15b153?auto=format&fit=crop&w=1920&q=80",
  },
  "hydraulic-hydrologic-modeling": {
    tagline: "Data-driven water resource solutions",
    description:
      "MSMM offers modeling professionals fully capable of providing hydraulic and hydrologic solutions through all available modeling technologies. Our models support planning, design, and regulatory compliance for water resource projects, including watershed master plans and feasibility studies.",
    highlights: [
      "Proficiency across HEC-RAS, HEC-HMS, InfoWorks, and SWMM platforms",
      "Louisiana Watershed Initiative certified modelers",
      "Multi-scenario analysis from 10-year through 500-year storm events",
    ],
    capabilities: [
      "HEC-RAS hydraulic modeling",
      "Watershed master plan development",
      "Green infrastructure analysis",
      "Feasibility studies and technical assessments",
      "10-year, 50-year, and 100-year storm analysis",
      "Riverbank instability assessment",
      "Pump station sizing and analysis",
      "Louisiana Watershed Initiative support",
    ],
    image:
      "https://images.unsplash.com/photo-1765025315763-9c744090e9de?auto=format&fit=crop&w=1920&q=80",
  },
  "database-gis-mapping": {
    tagline: "Mapping the future of infrastructure",
    description:
      "MSMM provides full-scale GIS and mapping services and survey data collection capabilities. We develop custom database solutions, spatial analysis tools, and document management systems for infrastructure and environmental projects.",
    highlights: [
      "ArcGIS and custom geospatial application development",
      "LIDAR, GPS, and drone-based data collection pipelines",
      "Integrated database + GIS solutions for asset management",
    ],
    capabilities: [
      "GIS mapping and analysis",
      "GPS data collection and integration",
      "Database design and management",
      "Document scanning and digitization",
      "ArcGIS integration",
      "LIDAR aerial photography",
      "Custom reporting tools",
      "Infrastructure inventory management",
    ],
    image:
      "https://images.unsplash.com/photo-1722082839841-45473f5a15cf?auto=format&fit=crop&w=1920&q=80",
  },
};

/* ──────────────────────────────────────────────
   Page plumbing
   ────────────────────────────────────────────── */

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICE_CATEGORIES.find((s) => s.slug === slug);
  if (!service) return {};

  return generatePageMetadata({
    title: service.name,
    description: `${service.name} services by MSMM Engineering. ${SERVICE_CONTENT[slug]?.description.slice(0, 120)}...`,
    path: `/services/${slug}`,
  });
}

export function generateStaticParams() {
  return SERVICE_CATEGORIES.map((s) => ({ slug: s.slug }));
}

/* ──────────────────────────────────────────────
   Component
   ────────────────────────────────────────────── */

export default async function ServiceDetailPage({
  params,
}: ServicePageProps) {
  const { slug } = await params;
  const service = SERVICE_CATEGORIES.find((s) => s.slug === slug);
  const content = SERVICE_CONTENT[slug];

  if (!service || !content) notFound();

  // Pick 3 related services (excluding the current one)
  const related = SERVICE_CATEGORIES.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <>
      {/* ── Hero banner ── */}
      <div className="relative h-[40vh] min-h-[320px] overflow-hidden bg-secondary-dark sm:h-[50vh] sm:min-h-[400px]">
        <Image
          src={content.image}
          alt={service.name}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary-dark via-secondary-dark/60 to-secondary-dark/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary-dark/80 to-secondary-dark/20" />

        <Container className="relative flex h-full flex-col justify-end pb-10 sm:pb-14">
          {/* Breadcrumbs */}
          <nav
            aria-label="Breadcrumb"
            className="mb-4"
            style={{
              animation:
                "hero-text-reveal 500ms cubic-bezier(0.16,1,0.3,1) 0ms both",
            }}
          >
            <ol className="flex items-center gap-2 text-sm text-gray-200">
              <li>
                <Link
                  href="/"
                  className="transition-colors hover:text-white"
                >
                  Home
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <span>/</span>
                <Link
                  href="/services"
                  className="transition-colors hover:text-white"
                >
                  Services
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <span>/</span>
                <span className="text-white">{service.name}</span>
              </li>
            </ol>
          </nav>

          <h1
            className="max-w-3xl font-heading text-3xl font-bold text-white sm:text-4xl lg:text-5xl"
            style={{
              animation:
                "hero-text-reveal 600ms cubic-bezier(0.16,1,0.3,1) 100ms both",
            }}
          >
            {service.name}
          </h1>

          <p
            className="mt-3 max-w-xl text-lg text-gray-100"
            style={{
              animation:
                "hero-text-reveal 600ms cubic-bezier(0.16,1,0.3,1) 200ms both",
            }}
          >
            {content.tagline}
          </p>

          <div
            className="mt-5 h-0.5 w-16 rounded-full bg-primary"
            style={{
              transformOrigin: "left",
              animation:
                "draw-line 0.6s cubic-bezier(0.16,1,0.3,1) 400ms both",
            }}
          />
        </Container>
      </div>

      {/* ── Overview + highlights ── */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-5 lg:gap-16">
          {/* Description */}
          <div className="lg:col-span-3">
            <AnimateIn animation="fade-up">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                Overview
              </p>
              <h2 className="mt-2 text-2xl font-bold text-foreground sm:text-3xl">
                What We Deliver
              </h2>
            </AnimateIn>
            <AnimateIn animation="fade-up" delay={100}>
              <p className="mt-6 text-lg leading-relaxed text-foreground/80">
                {content.description}
              </p>
            </AnimateIn>
          </div>

          {/* Why MSMM sidebar */}
          <div className="lg:col-span-2">
            <AnimateIn animation="slide-in-right" delay={200}>
              <div className="rounded-2xl bg-secondary p-8 text-white">
                <h3 className="text-lg font-bold">Why MSMM?</h3>
                <ul className="mt-5 space-y-4">
                  {content.highlights.map((h, i) => (
                    <li key={i} className="flex gap-3 text-sm text-gray-100">
                      <svg
                        className="mt-0.5 h-5 w-5 shrink-0 text-primary-light"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {h}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Button href="/contact" variant="white" size="sm">
                    Discuss Your Project
                  </Button>
                </div>
              </div>
            </AnimateIn>
          </div>
        </div>
      </Section>

      {/* ── Capabilities ── */}
      <Section background="light">
        <AnimateIn animation="fade-up">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            What We Do
          </p>
          <h2 className="mt-2 text-2xl font-bold text-foreground sm:text-3xl">
            Our Capabilities
          </h2>
        </AnimateIn>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {content.capabilities.map((cap, i) => (
            <AnimateIn key={cap} animation="fade-up" delay={i * 60}>
              <div className="group flex h-full items-start gap-4 rounded-xl border border-border bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold tabular-nums text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm font-medium text-foreground">
                  {cap}
                </span>
              </div>
            </AnimateIn>
          ))}
        </div>
      </Section>

      {/* ── Related services ── */}
      <Section>
        <AnimateIn animation="fade-up">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            More Services
          </p>
          <h2 className="mt-2 text-2xl font-bold text-foreground sm:text-3xl">
            Explore Related Areas
          </h2>
        </AnimateIn>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {related.map((s, i) => {
            const relData = SERVICE_CONTENT[s.slug];
            return (
              <AnimateIn key={s.slug} animation="scale-in" delay={i * 100}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group relative block h-56 overflow-hidden rounded-2xl sm:h-64"
                >
                  <Image
                    src={relData.image}
                    alt={s.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent transition-colors duration-500 group-hover:from-black/90" />
                  <div className="absolute inset-0 bg-primary/0 transition-colors duration-500 group-hover:bg-primary/10" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-lg font-bold text-white">
                      {s.name}
                    </h3>
                    <span className="mt-2 inline-flex translate-y-2 items-center gap-1 text-sm font-medium text-primary-light opacity-0 transition-all delay-75 duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      Learn more
                      <svg
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                        />
                      </svg>
                    </span>
                  </div>
                </Link>
              </AnimateIn>
            );
          })}
        </div>
      </Section>

      {/* ── CTA ── */}
      <Section background="dark">
        <AnimateIn animation="fade-up">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Ready to discuss {service.name.toLowerCase()}?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-gray-200">
              Our team brings 150+ years of combined experience to every
              project. Let&apos;s talk about how MSMM can deliver for you.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button href="/contact" variant="primary" className="btn-shine">
                Contact Us Today
              </Button>
              <Button href="/projects" variant="outline">
                View Our Projects
              </Button>
            </div>
          </div>
        </AnimateIn>
      </Section>
    </>
  );
}
