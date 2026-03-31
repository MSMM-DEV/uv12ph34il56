import { Hero, StatsBar, ServicesOverview, FeaturedProjects, CTABanner } from "@/components/sections";
import type { Project } from "@/types";

const FALLBACK_PROJECTS: Project[] = [
  {
    id: "1",
    name: "Cow Bayou Drainage Pump Station Complex",
    slug: "cow-bayou-pump-station",
    category: ["Flood Control"],
    client: "USACE",
    location: "Orange, TX",
    shortDescription: "8,190 CFS pump station complex as part of the Sabine to Galveston Cow Bayou project, featuring five horizontal vacuum-primed pumps and three vertical self-priming pumps in a reinforced concrete structure.",
    coverImage: "/assets/projects/flood-control.jpg",
    gallery: [],
    videos: [],
    status: "Completed",
    yearCompleted: 2022,
    servicesProvided: ["Flood Control", "Engineering Design"],
    featured: true,
    displayOrder: 1,
    published: true,
    metaTitle: "",
    metaDescription: "",
  },
  {
    id: "2",
    name: "Golden Triangle Marsh Creation (PO-163)",
    slug: "golden-triangle-marsh-creation",
    category: ["Coastal Restoration"],
    client: "USACE / CPRA",
    location: "Lake Borgne, LA",
    shortDescription: "Restoring and nourishing approximately 4,000 acres of marsh under the RESTORE Act, including perimeter dikes and natural ecosystem restoration in front of the IHNC Surge Barrier.",
    coverImage: "/assets/projects/coastal-marsh.jpg",
    gallery: [],
    videos: [],
    status: "In Progress",
    yearCompleted: null,
    servicesProvided: ["Coastal Restoration", "Engineering Design"],
    featured: true,
    displayOrder: 2,
    published: true,
    metaTitle: "",
    metaDescription: "",
  },
  {
    id: "3",
    name: "Blue and Green Corridors Stormwater Resilience",
    slug: "blue-green-corridors",
    category: ["Ecosystem Restoration", "Public Infrastructure"],
    client: "City of New Orleans",
    location: "Gentilly, New Orleans, LA",
    shortDescription: "Stormwater resilience infrastructure using canals (blue corridors) and vegetation/parks (green corridors) in Gentilly, including electrical design for pump stations and site lighting.",
    coverImage: "/assets/projects/stormwater-resilience.jpg",
    gallery: [],
    videos: [],
    status: "Completed",
    yearCompleted: 2023,
    servicesProvided: ["Ecosystem Restoration", "Engineering Design"],
    featured: true,
    displayOrder: 3,
    published: true,
    metaTitle: "",
    metaDescription: "",
  },
];

async function getFeaturedProjectsData(): Promise<Project[]> {
  try {
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return FALLBACK_PROJECTS;
    const { getFeaturedProjects } = await import("@/sanity/lib/queries");
    const projects = await getFeaturedProjects();
    return projects.length > 0 ? projects : FALLBACK_PROJECTS;
  } catch {
    return FALLBACK_PROJECTS;
  }
}

export default async function Home() {
  const projects = await getFeaturedProjectsData();

  return (
    <>
      <Hero />
      <StatsBar />
      <ServicesOverview />
      <FeaturedProjects projects={projects.slice(0, 3)} />
      <CTABanner />
    </>
  );
}
