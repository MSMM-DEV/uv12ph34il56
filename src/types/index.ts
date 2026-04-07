export interface GalleryImage {
  url: string;
  alt: string;
  caption: string;
}

export interface ProjectVideo {
  url: string;
  title: string;
}

export interface Project {
  id: string;
  name: string;
  slug: string;
  category: string[];
  client: string;
  location: string;
  shortDescription: string;
  coverImage: string | null;
  gallery: GalleryImage[];
  videos: ProjectVideo[];
  status: "Completed" | "In Progress" | "Planning";
  yearCompleted: number | null;
  servicesProvided: string[];
  featured: boolean;
  displayOrder: number;
  published: boolean;
  isHidden?: boolean;
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
  department: string;
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
  isHidden?: boolean;
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
  departments: string[];
  announcementBanner: string;
  bannerActive: boolean;
}
