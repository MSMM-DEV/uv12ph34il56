import Link from "next/link";
import Image from "next/image";
import { Button, Section, AnimateIn } from "@/components/ui";
import { ImageWithFallback } from "@/components/shared/image-with-fallback";
import { getPlaceholder } from "@/lib/project-utils";
import type { Project } from "@/types";

interface FeaturedProjectsProps {
  projects: Project[];
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  if (!projects.length) return null;

  return (
    <Section>
      <AnimateIn animation="fade-up">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-primary">
              Our Work
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
              Featured Projects
            </h2>
            <p className="mt-4 max-w-2xl text-base text-foreground/60 sm:text-lg">
              Explore some of our most impactful engineering projects across the Gulf South.
            </p>
          </div>
          <Button href="/projects" variant="outline" className="hidden shrink-0 md:inline-flex">
            View All Projects
          </Button>
        </div>
      </AnimateIn>

      <div className="mt-8 sm:mt-10 grid gap-x-6 gap-y-8 sm:gap-x-8 sm:gap-y-10 md:grid-cols-2 md:gap-x-10 md:gap-y-12 lg:grid-cols-3">
        {projects.map((project, i) => {
          const imageSrc = project.coverImage || getPlaceholder(project.category);

          return (
            <AnimateIn key={project.id} animation="card-reveal" delay={i * 120} duration={600}>
              <Link
                href={`/projects/${project.slug}`}
                className="project-card group block cursor-pointer"
              >
                <div className="project-card-image relative aspect-[3/2] overflow-hidden rounded-lg bg-gray-100">
                  {project.coverImage ? (
                    <ImageWithFallback
                      src={imageSrc}
                      alt={project.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <Image
                      src={imageSrc}
                      alt={project.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="project-card-accent" />
                </div>
                <div className="mt-4">
                  <div className="flex items-center gap-1.5 text-xs tracking-wide text-muted">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
                    {project.category[0]}
                  </div>
                  <h3 className="project-card-title mt-2 text-lg font-semibold leading-snug text-foreground">
                    {project.name}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted line-clamp-2">
                    {project.shortDescription}
                  </p>
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
            </AnimateIn>
          );
        })}
      </div>

      <div className="mt-8 text-center md:hidden">
        <Button href="/projects" variant="outline">
          View All Projects
        </Button>
      </div>
    </Section>
  );
}
