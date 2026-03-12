"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const SLIDES = [
  {
    title: "Engineering Design",
    subtitle: "Multi-Disciplinary Expertise",
    description:
      "Full-scale design for local, state, and federal government clients, inclusive of multi-disciplinary design across civil, structural, and environmental engineering.",
    image:
      "https://images.unsplash.com/photo-1762146828422-50a8bd416d3c?auto=format&fit=crop&w=1920&q=60",
  },
  {
    title: "Project Management",
    subtitle: "From Conception to Completion",
    description:
      "Experienced project management professionals embedded with government clients for seamless, on-time project delivery.",
    image:
      "https://images.unsplash.com/photo-1759922378222-47ad736a174d?auto=format&fit=crop&w=1920&q=60",
  },
  {
    title: "Survey, GIS & Mapping",
    subtitle: "Precision Data Collection",
    description:
      "Full-scale GIS mapping services and survey data collection capabilities powering smarter infrastructure decisions.",
    image:
      "https://images.unsplash.com/photo-1629988804949-870218cc412f?auto=format&fit=crop&w=1920&q=60",
  },
  {
    title: "Environmental & Permitting",
    subtitle: "Sustainable Solutions",
    description:
      "Detailed project permitting and environmental designs that balance development with ecological preservation.",
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1920&q=60",
  },
  {
    title: "Construction Administration",
    subtitle: "Quality Assurance",
    description:
      "Complete construction phase services from daily project inspection through administration and project closeout.",
    image:
      "https://images.unsplash.com/photo-1763405739542-02991ab5416c?auto=format&fit=crop&w=1920&q=60",
  },
  {
    title: "H & H Modeling",
    subtitle: "Advanced Analysis",
    description:
      "Hydraulic and hydrologic solutions through cutting-edge modeling technologies, feasibility studies, and watershed master planning.",
    image:
      "https://images.unsplash.com/photo-1765025315763-9c744090e9de?auto=format&fit=crop&w=1920&q=60",
  },
];

const SLIDE_DURATION = 6000;

export function ServicesCarousel() {
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
        setActiveIndex((prev) => (prev + 1) % SLIDES.length);
      } else {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, isPaused]);

  return (
    <section
      className="relative h-[60vh] min-h-[380px] w-full overflow-hidden bg-secondary-dark sm:h-[70vh] sm:min-h-[450px] md:h-[75vh] lg:h-[85vh]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background slides with Ken Burns effect */}
      {SLIDES.map((slide, index) => (
        <div
          key={slide.title}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{
            opacity: index === activeIndex ? 1 : 0,
            zIndex: index === activeIndex ? 1 : 0,
          }}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
            style={{
              transform: `scale(${index === activeIndex ? 1.08 : 1.02})`,
              transition: "transform 7s ease-out",
            }}
            priority={index === 0}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary-dark/95 via-secondary-dark/70 to-secondary-dark/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary-dark/90 via-secondary-dark/30 to-secondary-dark/50" />
        </div>
      ))}

      {/* Content + side navigation */}
      <div className="relative z-10 flex h-full items-center">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-6 lg:gap-12">
            {/* Left: slide content */}
            <div className="max-w-xl min-w-0">
              {/* Slide counter */}
              <div className="mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                <span className="font-heading text-3xl sm:text-5xl font-extralight tabular-nums text-white">
                  {String(activeIndex + 1).padStart(2, "0")}
                </span>
                <span className="text-white/60">/</span>
                <span className="tabular-nums text-sm text-white/60">
                  {String(SLIDES.length).padStart(2, "0")}
                </span>
              </div>

              <div className="overflow-hidden">
                <h1
                  key={`title-${activeIndex}`}
                  className="carousel-title-enter font-heading text-2xl font-bold text-white sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl"
                >
                  {SLIDES[activeIndex].title}
                </h1>
              </div>

              <p
                key={`sub-${activeIndex}`}
                className="carousel-subtitle-enter mt-2 text-base font-medium text-primary-light sm:mt-3 sm:text-lg"
              >
                {SLIDES[activeIndex].subtitle}
              </p>

              <p
                key={`desc-${activeIndex}`}
                className="carousel-desc-enter mt-3 max-w-lg text-sm text-white/90 sm:mt-4 sm:text-base"
              >
                {SLIDES[activeIndex].description}
              </p>

              <div
                key={`cta-${activeIndex}`}
                className="carousel-cta-enter mt-6 sm:mt-8"
              >
                <a
                  href="#focus-areas"
                  className="group inline-flex items-center gap-2 border-b-2 border-white/30 pb-1 text-sm font-medium uppercase tracking-wider text-white transition-colors hover:border-primary"
                >
                  Explore our expertise
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
                </a>
              </div>
            </div>

            {/* Right: desktop service list navigation */}
            <nav className="hidden w-72 shrink-0 lg:block" aria-label="Service slides">
              <ul className="space-y-1">
                {SLIDES.map((slide, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <li key={slide.title}>
                      <button
                        onClick={() => goToSlide(index)}
                        className={`group flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition-all duration-300 ${
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
                            {slide.title}
                          </span>
                          {/* Progress bar for active slide */}
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
        {SLIDES.map((slide, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="group relative py-2"
            aria-label={`Go to slide ${index + 1}: ${slide.title}`}
          >
            <div className="h-0.5 w-7 overflow-hidden rounded-full bg-white/20 sm:w-14">
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
          goToSlide((activeIndex - 1 + SLIDES.length) % SLIDES.length)
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
        onClick={() => goToSlide((activeIndex + 1) % SLIDES.length)}
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
    </section>
  );
}
