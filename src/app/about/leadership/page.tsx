import { Metadata } from "next";
import { Suspense } from "react";
import { generatePageMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/shared/page-header";
import { Section, AnimateIn } from "@/components/ui";
import { TeamFilters } from "@/components/team/team-filters";
import { TeamGrid } from "@/components/team/team-grid";
import type { TeamMember } from "@/types";

export const metadata: Metadata = generatePageMetadata({
  title: "Our Team",
  description: "Meet the 30+ professionals at MSMM Engineering across Leadership, Engineering, Operations/Finance, and AI departments.",
  path: "/about/leadership",
});

const FALLBACK_TEAM: TeamMember[] = [
  {
    id: "1", name: "Manish Mardia", slug: "manish-mardia", department: "Leadership",
    title: "President and Principal-In-Charge", credentials: "P.E.",
    shortBio: "Louisiana and Mississippi registered Professional Engineer with 35+ years of experience in drainage design, environmental engineering, civil engineering, and water and sewer projects.",
    photo: null, email: "", linkedin: "", displayOrder: 1, yearsOfExperience: 35,
    specialties: ["Drainage Design", "Environmental Engineering", "Water & Sewer"],
    licenses: ["Louisiana P.E.", "Mississippi P.E."], published: true,
  },
  {
    id: "2", name: "Mark Wingate", slug: "mark-wingate", department: "Leadership",
    title: "Executive Vice President", credentials: "P.E.",
    shortBio: "Licensed Professional Engineer with 30+ years of federal service with USACE New Orleans District, including 8+ years as Deputy District Engineer.",
    photo: null, email: "", linkedin: "", displayOrder: 2, yearsOfExperience: 30,
    specialties: ["Flood Risk Management", "Coastal Restoration", "Project Management"],
    licenses: ["Louisiana P.E."], published: true,
  },
  {
    id: "3", name: "Jim Wilson", slug: "jim-wilson", department: "Engineering",
    title: "Vice President and Senior Engineer", credentials: "P.E., LEED AP",
    shortBio: "Senior civil/drainage engineer with 34+ years in the public sector designing and managing drainage, sewerage, roadway, and site development projects.",
    photo: null, email: "", linkedin: "", displayOrder: 3, yearsOfExperience: 34,
    specialties: ["Civil/Drainage Engineering", "Site Development", "Master Planning"],
    licenses: ["Louisiana P.E."], published: true,
  },
  {
    id: "4", name: "Scott Chehardy", slug: "scott-chehardy", department: "Engineering",
    title: "Vice President and Senior Engineer", credentials: "P.E.",
    shortBio: "Senior civil engineer with 23+ years designing and managing projects throughout South Louisiana. Recognized drainage expert post-Hurricane Katrina.",
    photo: null, email: "", linkedin: "", displayOrder: 4, yearsOfExperience: 23,
    specialties: ["Water & Sewer Systems", "Pump Station Design", "Hydraulic Evaluation"],
    licenses: ["Louisiana P.E."], published: true,
  },
  {
    id: "5", name: "Dr. Marty Tittlebaum", slug: "marty-tittlebaum", department: "Engineering",
    title: "Senior Engineer", credentials: "P.E.",
    shortBio: "Former Edward G. Schlieder Chair for Urban Waste Management and Professor of Civil and Environmental Engineering. Recipient of over $8M in research funding.",
    photo: null, email: "", linkedin: "", displayOrder: 5, yearsOfExperience: 30,
    specialties: ["Environmental Engineering", "Hazardous Waste", "Water/Wastewater Treatment"],
    licenses: ["P.E."], published: true,
  },
];

interface TeamPageProps {
  searchParams: Promise<{ department?: string }>;
}

async function getTeamData(department?: string): Promise<TeamMember[]> {
  try {
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return filterByDept(FALLBACK_TEAM, department);
    const { getTeamMembers } = await import("@/sanity/lib/queries");
    const members = await getTeamMembers();
    const data = members.length > 0 ? members : FALLBACK_TEAM;
    return filterByDept(data, department);
  } catch {
    return filterByDept(FALLBACK_TEAM, department);
  }
}

async function fetchDepartments(): Promise<string[]> {
  try {
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return [];
    const { getDepartments } = await import("@/sanity/lib/queries");
    return getDepartments();
  } catch {
    return [];
  }
}

function filterByDept(members: TeamMember[], department?: string): TeamMember[] {
  if (!department) return members;
  return members.filter((m) => m.department === department);
}

export default async function TeamPage({ searchParams }: TeamPageProps) {
  const { department } = await searchParams;
  const [team, departments] = await Promise.all([
    getTeamData(department),
    fetchDepartments(),
  ]);
  const totalCount = team.length;

  return (
    <>
      <PageHeader
        title="Our Team"
        subtitle="Meet the experienced professionals behind MSMM Engineering"
        breadcrumbs={[
          { label: "About", href: "/about" },
          { label: "Our Team" },
        ]}
      />

      <div className="border-b border-border bg-white/80 backdrop-blur-md sticky top-16 sm:top-20 z-30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <AnimateIn animation="fade-in" className="min-w-0 flex-1">
              <Suspense fallback={null}>
                <TeamFilters departments={departments} />
              </Suspense>
            </AnimateIn>
            <AnimateIn animation="fade-in" delay={150}>
              <span className="hidden shrink-0 whitespace-nowrap rounded-full bg-gray-100 px-3 py-1 text-xs font-medium tabular-nums text-muted sm:inline-flex">
                {totalCount} {totalCount === 1 ? "member" : "members"}
              </span>
            </AnimateIn>
          </div>
        </div>
      </div>

      <Section>
        {team.length > 0 ? (
          <TeamGrid members={team} />
        ) : (
          <AnimateIn animation="fade-up" delay={100}>
            <div className="py-20 text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-border">
                <svg className="h-7 w-7 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
              <p className="text-lg font-medium text-foreground">No team members found</p>
              <p className="mt-1 text-sm text-muted">Try selecting a different department.</p>
            </div>
          </AnimateIn>
        )}
      </Section>
    </>
  );
}
