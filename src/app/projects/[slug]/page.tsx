import { Metadata } from "next";
import { notFound } from "next/navigation";
import { generatePageMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/shared/page-header";
import { ImageWithFallback } from "@/components/shared/image-with-fallback";
import { Badge, Button, Section, AnimateIn } from "@/components/ui";
import type { ProjectDetail } from "@/types";

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

async function getProjectData(slug: string): Promise<ProjectDetail | null> {
  try {
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return null;
    const { getProjectBySlug } = await import("@/sanity/lib/queries");
    return await getProjectBySlug(slug);
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectData(slug);
  if (!project) return {};

  return generatePageMetadata({
    title: project.metaTitle || project.name,
    description: project.metaDescription || project.shortDescription,
    path: `/projects/${slug}`,
    image: project.coverImage || undefined,
  });
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = await getProjectData(slug);

  if (!project) notFound();

  const details = [
    { label: "Client", value: project.client },
    { label: "Location", value: project.location },
    { label: "Year Completed", value: project.yearCompleted?.toString() },
  ].filter((d) => d.value);

  return (
    <>
      <PageHeader
        title={project.name}
        breadcrumbs={[
          { label: "Projects", href: "/projects" },
          { label: project.name },
        ]}
      />

      <Section>
        <div className="mx-auto max-w-4xl">
          {/* Cover image with reveal animation */}
          {project.coverImage && (
            <AnimateIn animation="scale-in">
              <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-xl shadow-lg">
                <ImageWithFallback
                  src={project.coverImage}
                  alt={project.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 896px) 100vw, 896px"
                  priority
                />
                <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-black/5" />
              </div>
            </AnimateIn>
          )}

          {/* Category + status badges */}
          <AnimateIn animation="fade-up" delay={100}>
            <div className="flex flex-wrap gap-2 mb-8">
              {project.category.map((cat) => (
                <Badge key={cat} variant="primary">{cat}</Badge>
              ))}
              <Badge variant={project.status === "Completed" ? "secondary" : "outline"}>
                {project.status}
              </Badge>
            </div>
          </AnimateIn>

          <div className="grid gap-10 lg:grid-cols-3">
            {/* Main content */}
            <AnimateIn animation="slide-in-left" delay={150} className="lg:col-span-2">
              <p className="text-base leading-relaxed text-muted sm:text-lg">
                {project.shortDescription}
              </p>
            </AnimateIn>

            {/* Sidebar */}
            <AnimateIn animation="slide-in-right" delay={250} as="aside">
              <div className="space-y-6">
                <div className="overflow-hidden rounded-xl border border-border">
                  <div className="border-b border-border bg-gray-50 px-6 py-3">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">
                      Project Details
                    </h3>
                  </div>
                  <dl className="divide-y divide-border">
                    {details.map((detail, i) => (
                      <div
                        key={detail.label}
                        className="px-6 py-4"
                        style={{
                          animation: `fade-up 500ms cubic-bezier(0.16, 1, 0.3, 1) ${400 + i * 80}ms both`,
                        }}
                      >
                        <dt className="text-xs font-medium uppercase tracking-wider text-muted">
                          {detail.label}
                        </dt>
                        <dd className="mt-1 text-sm font-medium text-foreground">
                          {detail.value}
                        </dd>
                      </div>
                    ))}
                    {project.servicesProvided.length > 0 && (
                      <div
                        className="px-6 py-4"
                        style={{
                          animation: `fade-up 500ms cubic-bezier(0.16, 1, 0.3, 1) ${400 + details.length * 80}ms both`,
                        }}
                      >
                        <dt className="text-xs font-medium uppercase tracking-wider text-muted">
                          Services
                        </dt>
                        <dd className="mt-2 flex flex-wrap gap-1.5">
                          {project.servicesProvided.map((s) => (
                            <Badge key={s} variant="default">{s}</Badge>
                          ))}
                        </dd>
                      </div>
                    )}
                  </dl>
                </div>

                <AnimateIn animation="fade-up" delay={600}>
                  <Button href="/contact" className="w-full">
                    Discuss a Similar Project
                  </Button>
                </AnimateIn>
              </div>
            </AnimateIn>
          </div>
        </div>
      </Section>
    </>
  );
}
