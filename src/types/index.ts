export interface Project {
  id: string;
  name: string;
  slug: string;
  category: string[];
  client: string;
  location: string;
  shortDescription: string;
  coverImage: string | null;
  status: "Completed" | "In Progress" | "Planning";
  yearCompleted: number | null;
  servicesProvided: string[];
  featured: boolean;
  displayOrder: number;
  published: boolean;
  metaTitle: string;
  metaDescription: string;
}

export interface ProjectDetail extends Project {
  content: unknown[];
  teamMembers: TeamMember[];
}

export interface TeamMember {
  id: string;
  name: string;
  slug: string;
  title: string;
  credentials: string;
  shortBio: string;
  photo: string | null;
  email: string;
  linkedin: string;
  displayOrder: number;
  yearsOfExperience: number;
  specialties: string[];
  licenses: string[];
  published: boolean;
}

export interface Job {
  id: string;
  title: string;
  slug: string;
  department: string;
  location: string;
  type: string;
  benefits: string;
  salaryRange: string;
  datePosted: string;
  active: boolean;
  applicationEmail: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  authorName: string;
  authorTitle: string;
  organization: string;
  projectId: string | null;
  featured: boolean;
  published: boolean;
  displayOrder: number;
}

export interface SiteSettings {
  yearsInBusiness: number;
  projectsCompleted: number;
  combinedExperience: number;
  teamMembers: number;
  announcementBanner: string;
  bannerActive: boolean;
}
