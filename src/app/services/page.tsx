import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { generatePageMetadata } from "@/lib/metadata";
import { Section, AnimateIn } from "@/components/ui";
import { SERVICE_CATEGORIES } from "@/lib/constants";
import { ServicesCarousel } from "@/components/services/services-carousel";

export const metadata: Metadata = generatePageMetadata({
  title: "Services",
  description:
    "MSMM specializes in complete design services for Public Infrastructure, Flood Protection, Water/Wastewater, Coastal and Ecosystem Restoration projects, H&H Modeling and GIS Mapping.",
  path: "/services",
});

const FOCUS_AREA_DATA: Record<
  string,
  { description: string; image: string }
> = {
  "public-infrastructure": {
    description:
      "Design and engineering of roads, bridges, drainage systems, and municipal infrastructure with multi-disciplinary expertise.",
    image:
      "https://images.unsplash.com/photo-1768962635991-0fa9543b7640?auto=format&fit=crop&w=800&q=80",
  },
  "flood-control": {
    description:
      "Comprehensive flood protection including levee systems, pump stations, floodwalls, and stormwater management.",
    image:
      "https://images.unsplash.com/photo-1701340809575-82d013a7fd2d?auto=format&fit=crop&w=800&q=80",
  },
  "water-wastewater": {
    description:
      "Water and wastewater system design, modeling, treatment facilities, pump stations, and infrastructure rehabilitation.",
    image:
      "https://images.unsplash.com/photo-1635145613344-3e59b1e8afd0?auto=format&fit=crop&w=800&q=80",
  },
  "ecosystem-restoration": {
    description:
      "Restoring and preserving critical ecosystems, riparian habitats, and natural resources through engineering solutions.",
    image:
      "https://images.unsplash.com/photo-1770672850748-8f71736bbfc9?auto=format&fit=crop&w=800&q=80",
  },
  "coastal-restoration": {
    description:
      "Marsh creation, shoreline protection, salinity control structures, and barrier island restoration projects.",
    image:
      "https://images.unsplash.com/photo-1758327740463-e8aa4d15b153?auto=format&fit=crop&w=800&q=80",
  },
  "hydraulic-hydrologic-modeling": {
    description:
      "Advanced hydraulic and hydrologic modeling, feasibility studies, and watershed master planning.",
    image:
      "https://images.unsplash.com/photo-1765025315763-9c744090e9de?auto=format&fit=crop&w=800&q=80",
  },
  "database-gis-mapping": {
    description:
      "Full-scale GIS services, survey data collection, database management, and spatial analysis for infrastructure.",
    image:
      "https://images.unsplash.com/photo-1722082839841-45473f5a15cf?auto=format&fit=crop&w=800&q=80",
  },
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero Carousel */}
      <ServicesCarousel />

      {/* Focus Areas */}
      <Section background="light" id="focus-areas">
        <AnimateIn animation="fade-up">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Our Expertise
            </p>
            <h2 className="mt-2 text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
              Project Focus Areas
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted">
              With 14+ years of experience and offices across the Gulf South,
              MSMM delivers excellence across seven specialized disciplines.
            </p>
          </div>
        </AnimateIn>

        <div className="mt-8 sm:mt-12 grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICE_CATEGORIES.map((cat, index) => {
            const data = FOCUS_AREA_DATA[cat.slug];
            const isWide = index === 0 || index === SERVICE_CATEGORIES.length - 1;

            return (
              <AnimateIn
                key={cat.slug}
                animation="scale-in"
                delay={index * 80}
                className={isWide ? "sm:col-span-2 lg:col-span-2" : ""}
              >
                <Link
                  href={`/services/${cat.slug}`}
                  className="group relative block overflow-hidden rounded-xl sm:rounded-2xl h-52 sm:h-64 md:h-72 lg:h-80"
                >
                  <Image
                    src={data.image}
                    alt={cat.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes={
                      isWide
                        ? "(max-width: 640px) 100vw, 66vw"
                        : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    }
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 transition-colors duration-500 group-hover:from-black/95" />

                  {/* Red tint on hover */}
                  <div className="absolute inset-0 bg-primary/0 transition-colors duration-500 group-hover:bg-primary/10" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-bold text-white sm:text-2xl">
                      {cat.name}
                    </h3>
                    <p className="mt-2 max-h-0 overflow-hidden text-sm text-white/90 transition-all duration-500 group-hover:max-h-24">
                      {data.description}
                    </p>
                    <span className="mt-3 inline-flex translate-y-2 items-center gap-1 text-sm font-medium text-primary-light opacity-0 transition-all delay-75 duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      Explore projects
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
    </>
  );
}
