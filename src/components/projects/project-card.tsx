import Link from "next/link";
import Image from "next/image";
import { ImageWithFallback } from "@/components/shared/image-with-fallback";
import { getPlaceholder } from "@/lib/project-utils";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const imageSrc = project.coverImage || getPlaceholder(project.category);

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="project-card group block cursor-pointer overflow-hidden rounded-lg border border-border bg-card hover-lift hover-glow"
    >
      {/* Image */}
      <div className="project-card-image aspect-[3/2] overflow-hidden bg-gray-100">
        {project.coverImage ? (
          <ImageWithFallback
            src={imageSrc}
            alt={project.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <Image
            src={imageSrc}
            alt={project.name}
            fill
            className="object-cover"
            style={{ animation: "image-ken-burns 1.5s ease-out both" }}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        )}
        {/* Subtle gradient vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        {/* Red accent bar */}
        <div className="project-card-accent" />
      </div>

      {/* Text */}
      <div className="p-4 sm:p-5">
        {/* Category + year row */}
        <div className="flex items-center gap-3 text-xs tracking-wide text-muted">
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
            {project.category?.[0]}
          </span>
          {project.yearCompleted && (
            <>
              <span className="text-border">|</span>
              <span>{project.yearCompleted}</span>
            </>
          )}
          {project.status && (
            <>
              <span className="text-border">|</span>
              <span
                className={`font-medium ${
                  project.status === "Completed" ? "text-primary" : "text-secondary"
                }`}
              >
                {project.status}
              </span>
            </>
          )}
        </div>

        {/* Title */}
        <h3 className="project-card-title mt-2 text-lg font-semibold leading-snug text-foreground">
          {project.name}
        </h3>

        {/* Description */}
        <p className="mt-1.5 text-sm leading-relaxed text-muted line-clamp-2">
          {project.shortDescription}
        </p>

        {/* Location */}
        {project.location && (
          <p className="mt-3 flex items-center gap-1.5 text-xs text-muted/70">
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            {project.location}
          </p>
        )}
      </div>
    </Link>
  );
}
