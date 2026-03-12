import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/ui";
import { TeamGrid } from "@/components/team/team-grid";
import type { TeamMember } from "@/types";

export const metadata: Metadata = generatePageMetadata({
  title: "Our Team",
  description: "Meet the 30+ professionals at MSMM Engineering across Leadership, Engineering, Finance, and AI departments.",
  path: "/about/leadership",
});

const DEPARTMENTS = ["Leadership", "Engineering", "Finance", "AI"] as const;

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

async function getTeamData(): Promise<TeamMember[]> {
  try {
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return FALLBACK_TEAM;
    const { getTeamMembers } = await import("@/sanity/lib/queries");
    const members = await getTeamMembers();
    return members.length > 0 ? members : FALLBACK_TEAM;
  } catch {
    return FALLBACK_TEAM;
  }
}

export default async function TeamPage() {
  const team = await getTeamData();

  const grouped = DEPARTMENTS.reduce(
    (acc, dept) => {
      const members = team.filter((m) => m.department === dept);
      if (members.length > 0) acc[dept] = members;
      return acc;
    },
    {} as Record<string, TeamMember[]>,
  );

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
      {DEPARTMENTS.map((dept) =>
        grouped[dept] ? (
          <Section key={dept}>
            <h2 className="mb-8 text-2xl font-bold text-foreground">{dept}</h2>
            <TeamGrid members={grouped[dept]} />
          </Section>
        ) : null,
      )}
    </>
  );
}
