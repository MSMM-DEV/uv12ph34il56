"use client";

import Link from "next/link";
import Image from "next/image";
import { ImageWithFallback } from "@/components/shared/image-with-fallback";
import { ProjectCard } from "./project-card";
import { getPlaceholder } from "@/lib/project-utils";
import { useInView } from "@/lib/hooks/use-in-view";
import type { Project } from "@/types";

interface ProjectGridProps {
  projects: Project[];
  isFirstPage: boolean;
}

function HeroCard({ project }: { project: Project }) {
  const imageSrc = project.coverImage || getPlaceholder(project.category);
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      style={{
        opacity: isInView ? 1 : 0,
        animation: isInView
          ? "card-reveal 700ms cubic-bezier(0.16, 1, 0.3, 1) both"
          : "none",
      }}
    >
    <Link
      href={`/projects/${project.slug}`}
      className="project-hero group block cursor-pointer overflow-hidden rounded-xl bg-secondary"
    >
      <div className="grid md:grid-cols-2">
        {/* Image side */}
        <div className="project-hero-image relative aspect-[4/3] md:aspect-auto overflow-hidden">
          {project.coverImage ? (
            <ImageWithFallback
              src={imageSrc}
              alt={project.name}
              fill
              className="object-cover transition-transform duration-700 ease-out"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          ) : (
            <Image
              src={imageSrc}
              alt={project.name}
              fill
              className="object-cover transition-transform duration-700 ease-out"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-secondary/30 md:bg-none" />
        </div>

        {/* Text side */}
        <div className="flex flex-col justify-center p-6 sm:p-8 md:p-12 lg:p-16">
          {/* Category tag */}
          <div className="flex items-center gap-2 text-xs tracking-widest uppercase text-primary-light">
            <span className="inline-block h-px w-6 bg-primary" />
            {project.category?.[0]}
          </div>

          <h3 className="mt-3 sm:mt-4 text-xl font-bold leading-tight text-white sm:text-2xl md:text-3xl lg:text-4xl">
            {project.name}
          </h3>

          <p className="mt-4 text-base leading-relaxed text-gray-300 line-clamp-3">
            {project.shortDescription}
          </p>

          {/* Meta row */}
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-400">
            {project.client && (
              <span>
                <span className="text-gray-500">Client</span>{" "}
                <span className="text-gray-300">{project.client}</span>
              </span>
            )}
            {project.location && (
              <span>
                <span className="text-gray-500">Location</span>{" "}
                <span className="text-gray-300">{project.location}</span>
              </span>
            )}
            {project.yearCompleted && (
              <span>
                <span className="text-gray-500">Year</span>{" "}
                <span className="text-gray-300">{project.yearCompleted}</span>
              </span>
            )}
          </div>

          {/* CTA */}
          <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-white">
            View Project
            <svg className="project-hero-arrow h-4 w-4 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
    </div>
  );
}

export function ProjectGrid({ projects, isFirstPage }: ProjectGridProps) {
  const { ref, isInView } = useInView({ threshold: 0.05 });

  if (projects.length === 0) return null;

  const heroProject = isFirstPage ? projects[0] : null;
  const gridProjects = isFirstPage ? projects.slice(1) : projects;

  return (
    <div className="mt-10">
      {/* Hero card — first project on page 1 only */}
      {heroProject && <HeroCard project={heroProject} />}

      {/* 2-column grid for remaining projects */}
      {gridProjects.length > 0 && (
        <div
          ref={ref}
          className={`grid gap-x-6 gap-y-8 sm:gap-x-8 sm:gap-y-10 md:grid-cols-2 md:gap-x-10 md:gap-y-12 ${heroProject ? "mt-10 sm:mt-14" : ""}`}
        >
          {gridProjects.map((project, i) => (
            <div
              key={project.id}
              style={{
                opacity: isInView ? 1 : 0,
                animation: isInView
                  ? `card-reveal 600ms cubic-bezier(0.16, 1, 0.3, 1) ${i * 100}ms both`
                  : "none",
              }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
