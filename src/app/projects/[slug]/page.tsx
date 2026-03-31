import { Metadata } from "next";
import { notFound } from "next/navigation";
import { generatePageMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/shared/page-header";
import { ProjectCarousel } from "@/components/projects/project-carousel";
import { Badge, Button, Section, AnimateIn } from "@/components/ui";
import type { ProjectDetail } from "@/types";

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

const FALLBACK_PROJECTS: Record<string, ProjectDetail> = {
  "cow-bayou-pump-station": {
    id: "1", name: "Cow Bayou Drainage Pump Station Complex", slug: "cow-bayou-pump-station",
    category: ["Flood Control"], client: "USACE", location: "Orange, TX",
    shortDescription: "8,190 CFS pump station complex with five horizontal vacuum-primed pumps and three vertical self-priming pumps.",
    coverImage: "/assets/projects/flood-control.jpg", gallery: [], videos: [],
    status: "Completed", yearCompleted: 2022,
    servicesProvided: ["Flood Control"], featured: true, displayOrder: 1,
    published: true, metaTitle: "", metaDescription: "",
    content: [], teamMembers: [],
  },
  "golden-triangle-marsh-creation": {
    id: "2", name: "Golden Triangle Marsh Creation (PO-163)", slug: "golden-triangle-marsh-creation",
    category: ["Coastal Restoration"], client: "USACE / CPRA", location: "Lake Borgne, LA",
    shortDescription: "Restoring approximately 4,000 acres of marsh under the RESTORE Act.",
    coverImage: "/assets/projects/coastal-marsh.jpg", gallery: [], videos: [],
    status: "In Progress", yearCompleted: null,
    servicesProvided: ["Coastal Restoration"], featured: true, displayOrder: 2,
    published: true, metaTitle: "", metaDescription: "",
    content: [], teamMembers: [],
  },
  "hillaryville-wwtp": {
    id: "3", name: "Hillaryville Regional Wastewater Treatment Plant", slug: "hillaryville-wwtp",
    category: ["Water & Wastewater"], client: "Ascension Parish Government", location: "Ascension Parish, LA",
    shortDescription: "1.8 MGD average daily flow facility expandable to 2.7 MGD.",
    coverImage: "/assets/projects/wastewater-treatment.jpg", gallery: [], videos: [],
    status: "Completed", yearCompleted: 2021,
    servicesProvided: ["Water & Wastewater"], featured: true, displayOrder: 3,
    published: true, metaTitle: "", metaDescription: "",
    content: [], teamMembers: [],
  },
};

async function getProjectData(slug: string): Promise<ProjectDetail | null> {
  try {
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return FALLBACK_PROJECTS[slug] ?? null;
    const { getProjectBySlug } = await import("@/sanity/lib/queries");
    const project = await getProjectBySlug(slug);
    return project ?? FALLBACK_PROJECTS[slug] ?? null;
  } catch {
    return FALLBACK_PROJECTS[slug] ?? null;
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
          {/* Project carousel (cover image + gallery + videos) */}
          <AnimateIn animation="scale-in">
            <div className="mb-10">
              <ProjectCarousel
                coverImage={project.coverImage}
                gallery={project.gallery ?? []}
                videos={project.videos ?? []}
                projectName={project.name}
              />
            </div>
          </AnimateIn>

          {/* Category + status badges */}
          <AnimateIn animation="fade-up" delay={100}>
            <div className="flex flex-wrap gap-2 mb-8">
              {project.category?.map((cat) => (
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
              <div className="text-base leading-relaxed text-muted sm:text-lg">
                {project.shortDescription?.split(/\n\n+/).map((para, i) => (
                  <p key={i} className="mb-4 last:mb-0">
                    {para}
                  </p>
                ))}
              </div>
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
                    {project.servicesProvided?.length > 0 && (
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
                          {project.servicesProvided?.map((s) => (
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
