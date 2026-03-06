"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Container, AnimateIn } from "@/components/ui";
import { SERVICE_CATEGORIES } from "@/lib/constants";

const SERVICE_INFO: Record<string, { description: string; image: string }> = {
  "public-infrastructure": {
    description:
      "Design and engineering of roads, bridges, drainage systems, and municipal infrastructure.",
    image:
      "https://images.unsplash.com/photo-1768962635991-0fa9543b7640?auto=format&fit=crop&w=1920&q=80",
  },
  "flood-control": {
    description:
      "Levee systems, pump stations, floodwalls, and stormwater management for the Gulf South.",
    image:
      "https://images.unsplash.com/photo-1701340809575-82d013a7fd2d?auto=format&fit=crop&w=1920&q=80",
  },
  "water-wastewater": {
    description:
      "Treatment facilities, pump stations, collection systems, and infrastructure rehabilitation.",
    image:
      "https://images.unsplash.com/photo-1635145613344-3e59b1e8afd0?auto=format&fit=crop&w=1920&q=80",
  },
  "ecosystem-restoration": {
    description:
      "Restoring critical ecosystems, riparian habitats, and natural resources through engineering.",
    image:
      "https://images.unsplash.com/photo-1770672850748-8f71736bbfc9?auto=format&fit=crop&w=1920&q=80",
  },
  "coastal-restoration": {
    description:
      "Marsh creation, shoreline protection, salinity control structures, and barrier islands.",
    image:
      "https://images.unsplash.com/photo-1758327740463-e8aa4d15b153?auto=format&fit=crop&w=1920&q=80",
  },
  "hydraulic-hydrologic-modeling": {
    description:
      "Advanced hydraulic and hydrologic modeling, feasibility studies, and watershed planning.",
    image:
      "https://images.unsplash.com/photo-1765025315763-9c744090e9de?auto=format&fit=crop&w=1920&q=80",
  },
  "database-gis-mapping": {
    description:
      "Full-scale GIS services, survey data collection, database management, and spatial analysis.",
    image:
      "https://images.unsplash.com/photo-1722082839841-45473f5a15cf?auto=format&fit=crop&w=1920&q=80",
  },
};

const SLIDE_DURATION = 6000;
const TOTAL_SLIDES = SERVICE_CATEGORIES.length;

export function ServicesOverview() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goToSlide = useCallback(
    (index: number) => {
      if (index === activeIndex) return;
      setActiveIndex(index);
      setProgress(0);
    },
    [activeIndex]
  );

  // Auto-advance with smooth progress bar
  useEffect(() => {
    if (isPaused) return;

    const startTime = Date.now() - (progress / 100) * SLIDE_DURATION;
    let raf: number;

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min((elapsed / SLIDE_DURATION) * 100, 100);
      setProgress(pct);

      if (pct >= 100) {
        setProgress(0);
        setActiveIndex((prev) => (prev + 1) % TOTAL_SLIDES);
      } else {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, isPaused]);

  const activeService = SERVICE_CATEGORIES[activeIndex];
  const activeInfo = SERVICE_INFO[activeService.slug];

  return (
    <section className="bg-accent">
      {/* Section header */}
      <Container>
        <AnimateIn animation="fade-up" className="pt-16 pb-8 sm:pt-20 sm:pb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-primary">
            What We Do
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
            Our Services
          </h2>
          <p className="mt-4 max-w-2xl text-base text-foreground/60 sm:text-lg">
            Comprehensive civil engineering solutions from conceptual planning
            through construction and project completion.
          </p>
        </AnimateIn>
      </Container>

      {/* Carousel */}
      <div
        className="relative mx-auto mb-16 h-[60vh] min-h-[420px] max-w-7xl overflow-hidden rounded-none sm:mb-20 sm:h-[65vh] sm:rounded-none lg:mx-8 lg:mb-24 lg:h-[70vh] lg:rounded-2xl xl:mx-auto"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Background slides with Ken Burns effect */}
        {SERVICE_CATEGORIES.map((service, index) => {
          const info = SERVICE_INFO[service.slug];
          return (
            <div
              key={service.slug}
              className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
              style={{
                opacity: index === activeIndex ? 1 : 0,
                zIndex: index === activeIndex ? 1 : 0,
              }}
            >
              <Image
                src={info.image}
                alt={service.name}
                fill
                className="object-cover"
                style={{
                  transform: `scale(${index === activeIndex ? 1.08 : 1.02})`,
                  transition: "transform 7s ease-out",
                }}
                priority={index === 0}
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#1a2332]/95 via-[#1a2332]/70 to-[#1a2332]/40" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a2332]/90 via-[#1a2332]/30 to-[#1a2332]/50" />
            </div>
          );
        })}

        {/* Content + side navigation */}
        <div className="relative z-10 flex h-full items-center">
          <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
            <div className="flex items-center justify-between gap-12">
              {/* Left: slide content */}
              <div className="max-w-xl">
                {/* Slide counter */}
                <div className="mb-6 flex items-center gap-3">
                  <span className="font-heading text-5xl font-extralight tabular-nums text-white">
                    {String(activeIndex + 1).padStart(2, "0")}
                  </span>
                  <span className="text-white/60">/</span>
                  <span className="tabular-nums text-sm text-white/60">
                    {String(TOTAL_SLIDES).padStart(2, "0")}
                  </span>
                </div>

                <div className="overflow-hidden">
                  <h3
                    key={`title-${activeIndex}`}
                    className="carousel-title-enter font-heading text-3xl font-bold text-white sm:text-4xl lg:text-5xl"
                  >
                    {activeService.name}
                  </h3>
                </div>

                <p
                  key={`desc-${activeIndex}`}
                  className="carousel-desc-enter mt-4 max-w-lg text-sm text-white/90 sm:mt-5 sm:text-base"
                >
                  {activeInfo.description}
                </p>

                <div
                  key={`cta-${activeIndex}`}
                  className="carousel-cta-enter mt-6 sm:mt-8"
                >
                  <Link
                    href={`/services/${activeService.slug}`}
                    className="group inline-flex items-center gap-2 border-b-2 border-white/30 pb-1 text-sm font-medium uppercase tracking-wider text-white transition-colors hover:border-primary"
                  >
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
                  </Link>
                </div>
              </div>

              {/* Right: desktop service list navigation */}
              <nav
                className="hidden w-72 shrink-0 lg:block"
                aria-label="Service slides"
              >
                <ul className="space-y-1">
                  {SERVICE_CATEGORIES.map((service, index) => {
                    const isActive = index === activeIndex;
                    return (
                      <li key={service.slug}>
                        <button
                          onClick={() => goToSlide(index)}
                          className={`group flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-left transition-all duration-300 ${
                            isActive
                              ? "bg-white/15 text-white"
                              : "text-white/60 hover:bg-white/10 hover:text-white/90"
                          }`}
                        >
                          <span
                            className={`shrink-0 tabular-nums text-xs font-medium transition-colors ${
                              isActive ? "text-primary-light" : "text-white/50"
                            }`}
                          >
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <div className="min-w-0 flex-1">
                            <span className="block truncate text-sm font-medium">
                              {service.name}
                            </span>
                            {isActive && (
                              <div className="mt-1.5 h-0.5 w-full overflow-hidden rounded-full bg-white/15">
                                <div
                                  className="h-full rounded-full bg-primary transition-all ease-linear"
                                  style={{
                                    width: `${progress}%`,
                                    transitionDuration: "100ms",
                                  }}
                                />
                              </div>
                            )}
                          </div>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
          </div>
        </div>

        {/* Mobile progress indicators */}
        <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2 sm:bottom-8 sm:gap-3 lg:hidden">
          {SERVICE_CATEGORIES.map((service, index) => (
            <button
              key={service.slug}
              onClick={() => goToSlide(index)}
              className="group relative py-2"
              aria-label={`Go to slide ${index + 1}: ${service.name}`}
            >
              <div className="h-0.5 w-8 overflow-hidden rounded-full bg-white/20 sm:w-10">
                <div
                  className="h-full rounded-full bg-white transition-all ease-linear"
                  style={{
                    width:
                      index === activeIndex
                        ? `${progress}%`
                        : index < activeIndex
                          ? "100%"
                          : "0%",
                    transitionDuration:
                      index === activeIndex ? "100ms" : "300ms",
                  }}
                />
              </div>
            </button>
          ))}
        </div>

        {/* Mobile prev/next arrows */}
        <button
          onClick={() =>
            goToSlide((activeIndex - 1 + TOTAL_SLIDES) % TOTAL_SLIDES)
          }
          className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/20 p-2.5 text-white/60 transition-all hover:border-white/40 hover:bg-white/10 hover:text-white sm:left-6 sm:p-3 lg:hidden"
          aria-label="Previous slide"
        >
          <svg
            className="h-4 w-4 sm:h-5 sm:w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <button
          onClick={() => goToSlide((activeIndex + 1) % TOTAL_SLIDES)}
          className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/20 p-2.5 text-white/60 transition-all hover:border-white/40 hover:bg-white/10 hover:text-white sm:right-6 sm:p-3 lg:hidden"
          aria-label="Next slide"
        >
          <svg
            className="h-4 w-4 sm:h-5 sm:w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}
