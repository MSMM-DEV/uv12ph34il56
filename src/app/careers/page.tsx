import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/shared/page-header";
import { Button, Section, AnimateIn } from "@/components/ui";
import { JobCard } from "@/components/careers";
import type { Job } from "@/types";

export const metadata: Metadata = generatePageMetadata({
  title: "Careers",
  description: "Join MSMM Engineering. Explore career opportunities in civil engineering, flood protection, and infrastructure design.",
  path: "/careers",
});

async function getJobsData(): Promise<Job[]> {
  try {
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return [];
    const { getJobs } = await import("@/sanity/lib/queries");
    return await getJobs();
  } catch {
    return [];
  }
}

export default async function CareersPage() {
  const jobs = await getJobsData();

  return (
    <>
      <PageHeader
        title="Careers"
        subtitle="Join our team and help build resilient infrastructure for the Gulf South"
      />
      <Section>
        <div className="mx-auto max-w-3xl">
          <AnimateIn animation="fade-up">
            <div className="mb-12">
              <h2 className="text-xl font-bold text-foreground sm:text-2xl">Why MSMM Engineering?</h2>
              <p className="mt-4 text-base text-muted sm:text-lg">
                At MSMM Engineering, you&apos;ll work on meaningful projects that protect
                communities and improve quality of life. We offer competitive compensation,
                professional development opportunities, and a collaborative work environment.
              </p>
            </div>
          </AnimateIn>

          {jobs.length > 0 ? (
            <AnimateIn animation="fade-up" delay={100}>
              <h2 className="text-2xl font-bold text-foreground mb-6">Open Positions</h2>
              <div className="space-y-4">
                {jobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            </AnimateIn>
          ) : (
            <AnimateIn animation="scale-in" delay={100}>
              <div className="rounded-lg border border-border p-8 text-center">
                <h2 className="text-xl font-bold text-foreground">No Open Positions</h2>
                <p className="mt-2 text-muted">
                  We don&apos;t have any open positions right now, but we&apos;re always
                  interested in hearing from talented engineers.
                </p>
                <Button href="/contact" className="mt-6">Send Us Your Resume</Button>
              </div>
            </AnimateIn>
          )}

          <AnimateIn animation="fade-up" delay={200}>
            <div className="mt-12 rounded-lg bg-gray-50 p-8">
              <h3 className="text-lg font-bold text-foreground">Equal Opportunity Employer</h3>
              <p className="mt-2 text-sm text-muted">
                MSMM Engineering is an equal opportunity employer. We celebrate diversity
                and are committed to creating an inclusive environment for all employees.
              </p>
            </div>
          </AnimateIn>
        </div>
      </Section>
    </>
  );
}
