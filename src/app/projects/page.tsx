import { Metadata } from "next";
import { Suspense } from "react";
import { generatePageMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/shared/page-header";
import { Section, AnimateIn } from "@/components/ui";
import { ProjectFilters } from "@/components/projects/project-filters";
import { ProjectGrid } from "@/components/projects/project-grid";
import { ProjectPagination } from "@/components/projects/project-pagination";
import type { Project } from "@/types";

const PROJECTS_PER_PAGE = 10;

export const metadata: Metadata = generatePageMetadata({
  title: "Projects",
  description: "Explore MSMM Engineering's portfolio of 250+ civil engineering projects including flood control, infrastructure, water/wastewater, and coastal restoration.",
  path: "/projects",
});

const FALLBACK_PROJECTS: Project[] = [
  {
    id: "1", name: "Cow Bayou Drainage Pump Station Complex", slug: "cow-bayou-pump-station",
    category: ["Flood Control"], client: "USACE", location: "Orange, TX",
    shortDescription: "8,190 CFS pump station complex with five horizontal vacuum-primed pumps and three vertical self-priming pumps.",
    coverImage: "/assets/projects/flood-control.jpg", status: "Completed", yearCompleted: 2022,
    servicesProvided: ["Flood Control"], featured: true, displayOrder: 1,
    published: true, metaTitle: "", metaDescription: "",
  },
  {
    id: "2", name: "Golden Triangle Marsh Creation (PO-163)", slug: "golden-triangle-marsh-creation",
    category: ["Coastal Restoration"], client: "USACE / CPRA", location: "Lake Borgne, LA",
    shortDescription: "Restoring approximately 4,000 acres of marsh under the RESTORE Act.",
    coverImage: "/assets/projects/coastal-marsh.jpg", status: "In Progress", yearCompleted: null,
    servicesProvided: ["Coastal Restoration"], featured: true, displayOrder: 2,
    published: true, metaTitle: "", metaDescription: "",
  },
  {
    id: "3", name: "Hillaryville Regional Wastewater Treatment Plant", slug: "hillaryville-wwtp",
    category: ["Water & Wastewater"], client: "Ascension Parish Government", location: "Ascension Parish, LA",
    shortDescription: "1.8 MGD average daily flow facility expandable to 2.7 MGD.",
    coverImage: "/assets/projects/wastewater-treatment.jpg", status: "Completed", yearCompleted: 2021,
    servicesProvided: ["Water & Wastewater"], featured: true, displayOrder: 3,
    published: true, metaTitle: "", metaDescription: "",
  },
];

interface ProjectsPageProps {
  searchParams: Promise<{ category?: string; page?: string }>;
}

async function getProjectsData(category?: string): Promise<Project[]> {
  try {
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return FALLBACK_PROJECTS;
    const { getProjects } = await import("@/sanity/lib/queries");
    const projects = await getProjects(category);
    return projects.length > 0 ? projects : FALLBACK_PROJECTS;
  } catch {
    return FALLBACK_PROJECTS;
  }
}

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const { category, page } = await searchParams;
  const projects = await getProjectsData(category);

  const totalCount = projects.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / PROJECTS_PER_PAGE));
  const currentPage = Math.min(Math.max(1, parseInt(page || "1", 10) || 1), totalPages);
  const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE;
  const paginatedProjects = projects.slice(startIndex, startIndex + PROJECTS_PER_PAGE);
  const showingFrom = totalCount === 0 ? 0 : startIndex + 1;
  const showingTo = Math.min(startIndex + PROJECTS_PER_PAGE, totalCount);

  return (
    <>
      <PageHeader
        title="Our Projects"
        subtitle="Explore our portfolio of 250+ engineering projects across the Gulf South"
      />

      {/* Filters + count bar */}
      <div className="border-b border-border bg-white/80 backdrop-blur-md sticky top-20 z-30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <AnimateIn animation="fade-in" className="min-w-0 flex-1">
              <Suspense fallback={null}>
                <ProjectFilters />
              </Suspense>
            </AnimateIn>
            <AnimateIn animation="fade-in" delay={150}>
              <span className="hidden shrink-0 whitespace-nowrap rounded-full bg-gray-100 px-3 py-1 text-xs font-medium tabular-nums text-muted sm:inline-flex">
                {showingFrom}&#8211;{showingTo} of {totalCount}
              </span>
            </AnimateIn>
          </div>
        </div>
      </div>

      {/* Project grid */}
      <Section className="blueprint-bg">
        {paginatedProjects.length > 0 ? (
          <>
            <ProjectGrid
              projects={paginatedProjects}
              isFirstPage={currentPage === 1 && !category}
            />
            {totalPages > 1 && (
              <Suspense fallback={null}>
                <ProjectPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                />
              </Suspense>
            )}
          </>
        ) : (
          <AnimateIn animation="fade-up" delay={100}>
            <div className="py-20 text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-border">
                <svg className="h-7 w-7 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </div>
              <p className="text-lg font-medium text-foreground">No projects found</p>
              <p className="mt-1 text-sm text-muted">Try selecting a different category.</p>
            </div>
          </AnimateIn>
        )}
      </Section>
    </>
  );
}
