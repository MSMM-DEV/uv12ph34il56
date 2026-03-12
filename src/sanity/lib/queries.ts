import { client } from "./client";
import type {
  Project,
  ProjectDetail,
  TeamMember,
  Job,
  Testimonial,
  SiteSettings,
} from "@/types";

// ─── Projects ────────────────────────────────────────────────────────────────

export async function getProjects(category?: string): Promise<Project[]> {
  const filter = category
    ? `*[_type == "project" && "${category}" in category] | order(displayOrder asc)`
    : `*[_type == "project"] | order(displayOrder asc)`;

  return client.fetch(
    `${filter} {
      "id": _id,
      name,
      "slug": slug.current,
      category,
      client,
      location,
      shortDescription,
      "coverImage": coverImage.asset->url,
      status,
      yearCompleted,
      servicesProvided,
      featured,
      displayOrder,
      "published": true,
      "metaTitle": "",
      "metaDescription": ""
    }`,
    {},
    { next: { tags: ["projects"] } }
  );
}

export async function getFeaturedProjects(): Promise<Project[]> {
  return client.fetch(
    `*[_type == "project" && featured == true] | order(displayOrder asc) [0...6] {
      "id": _id,
      name,
      "slug": slug.current,
      category,
      client,
      location,
      shortDescription,
      "coverImage": coverImage.asset->url,
      status,
      yearCompleted,
      servicesProvided,
      featured,
      displayOrder,
      "published": true,
      "metaTitle": "",
      "metaDescription": ""
    }`,
    {},
    { next: { tags: ["projects"] } }
  );
}

export async function getProjectBySlug(slug: string): Promise<ProjectDetail | null> {
  const result = await client.fetch(
    `*[_type == "project" && slug.current == $slug][0] {
      "id": _id,
      name,
      "slug": slug.current,
      category,
      client,
      location,
      shortDescription,
      "coverImage": coverImage.asset->url,
      body,
      status,
      yearCompleted,
      servicesProvided,
      featured,
      displayOrder,
      metaTitle,
      metaDescription
    }`,
    { slug },
    { next: { tags: ["projects"] } }
  );
  if (!result) return null;
  return { ...result, content: result.body || [], teamMembers: [], published: true };
}

export async function getProjectSlugs(): Promise<string[]> {
  return client.fetch(
    `*[_type == "project"].slug.current`,
    {},
    { next: { tags: ["projects"] } }
  );
}

// ─── Team ────────────────────────────────────────────────────────────────────

export async function getTeamMembers(): Promise<TeamMember[]> {
  return client.fetch(
    `*[_type == "teamMember"] | order(displayOrder asc) {
      "id": _id,
      name,
      "slug": slug.current,
      department,
      title,
      credentials,
      shortBio,
      "photo": photo.asset->url,
      email,
      linkedin,
      displayOrder,
      yearsOfExperience,
      specialties,
      licenses,
      "published": published
    }`,
    {},
    { next: { tags: ["team"] } }
  );
}

// ─── Jobs ────────────────────────────────────────────────────────────────────

export async function getJobs(): Promise<Job[]> {
  return client.fetch(
    `*[_type == "job" && active == true] | order(datePosted desc) {
      "id": _id,
      title,
      "slug": slug.current,
      department,
      location,
      type,
      benefits,
      salaryRange,
      datePosted,
      active,
      applicationEmail
    }`,
    {},
    { next: { tags: ["jobs"] } }
  );
}

// ─── Testimonials ────────────────────────────────────────────────────────────

export async function getTestimonials(): Promise<Testimonial[]> {
  return client.fetch(
    `*[_type == "testimonial" && featured == true] | order(displayOrder asc) {
      "id": _id,
      quote,
      authorName,
      authorTitle,
      organization,
      "projectId": null,
      featured,
      "published": true,
      displayOrder
    }`,
    {},
    { next: { tags: ["testimonials"] } }
  );
}

// ─── Site Settings ───────────────────────────────────────────────────────────

export async function getSiteSettings(): Promise<SiteSettings> {
  const result = await client.fetch(
    `*[_type == "siteSettings"][0] {
      yearsInBusiness,
      projectsCompleted,
      combinedExperience,
      teamMembers,
      announcementBanner,
      bannerActive
    }`,
    {},
    { next: { tags: ["settings"] } }
  );
  return result || {
    yearsInBusiness: 14,
    projectsCompleted: 250,
    combinedExperience: 150,
    teamMembers: 5,
    announcementBanner: "",
    bannerActive: false,
  };
}
