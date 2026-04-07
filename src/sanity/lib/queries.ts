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
    ? `*[_type == "project" && "${category}" in category && isHidden != true] | order(displayOrder asc)`
    : `*[_type == "project" && isHidden != true] | order(displayOrder asc)`;

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
      "gallery": coalesce(gallery[] { "url": asset->url, "alt": coalesce(alt, ""), "caption": coalesce(caption, "") }, []),
      "videos": coalesce(videos[] { "url": url, "title": coalesce(title, "") }, []),
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
    `*[_type == "project" && featured == true && isHidden != true] | order(displayOrder asc) [0...6] {
      "id": _id,
      name,
      "slug": slug.current,
      category,
      client,
      location,
      shortDescription,
      "coverImage": coverImage.asset->url,
      "gallery": coalesce(gallery[] { "url": asset->url, "alt": coalesce(alt, ""), "caption": coalesce(caption, "") }, []),
      "videos": coalesce(videos[] { "url": url, "title": coalesce(title, "") }, []),
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
      "gallery": coalesce(gallery[] { "url": asset->url, "alt": coalesce(alt, ""), "caption": coalesce(caption, "") }, []),
      "videos": coalesce(videos[] { "url": url, "title": coalesce(title, "") }, []),
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
  return {
    ...result,
    gallery: result.gallery || [],
    videos: result.videos || [],
    content: result.body || [],
    teamMembers: [],
    published: true,
  };
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
    `*[_type == "teamMember" && isHidden != true] | order(displayOrder asc) {
      "id": _id,
      "name": coalesce(name, ""),
      "slug": coalesce(slug.current, ""),
      "department": coalesce(department, "Engineering"),
      "title": coalesce(title, ""),
      "credentials": coalesce(credentials, ""),
      "shortBio": coalesce(shortBio, ""),
      "photo": photo.asset->url,
      "email": coalesce(email, ""),
      "linkedin": coalesce(linkedin, ""),
      "displayOrder": coalesce(displayOrder, 99),
      "yearsOfExperience": coalesce(yearsOfExperience, 0),
      "specialties": coalesce(specialties, []),
      "licenses": coalesce(licenses, []),
      "published": coalesce(published, false)
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
      departments,
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
    departments: ["Leadership", "Engineering", "Operations/Finance", "AI"],
    announcementBanner: "",
    bannerActive: false,
  };
}
