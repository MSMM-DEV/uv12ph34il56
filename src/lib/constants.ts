export const SITE_NAME = "MSMM Engineering, LLC";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://msmmeng.com";
export const SITE_DESCRIPTION =
  "MSMM Engineering is a New Orleans based engineering firm specializing in design services for flood protection, water/wastewater modeling, and civil works projects.";

export const NAV_LINKS = [
  { label: "About Us", href: "/about", children: [
    { label: "Our Story", href: "/about/our-story" },
    { label: "Leadership Team", href: "/about/leadership" },
  ]},
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
] as const;

export const SERVICE_CATEGORIES = [
  { name: "Public Infrastructure", slug: "public-infrastructure" },
  { name: "Flood Control", slug: "flood-control" },
  { name: "Water & Wastewater", slug: "water-wastewater" },
  { name: "Ecosystem Restoration", slug: "ecosystem-restoration" },
  { name: "Coastal Restoration", slug: "coastal-restoration" },
  { name: "H & H Modeling", slug: "hydraulic-hydrologic-modeling" },
  { name: "Database/GIS Mapping", slug: "database-gis-mapping" },
] as const;

export const OFFICES = [
  {
    name: "Metairie",
    address: "4508 Clearview Parkway, Suite 200",
    city: "Metairie, LA 70006",
    phone: "(504) 570-6098",
    fax: "",
  },
  {
    name: "New Orleans",
    address: "4640 Carrollton Avenue, Suite 220",
    city: "New Orleans, LA 70119",
    phone: "(504) 570-6098",
    fax: "",
  },
  {
    name: "Houston",
    address: "13850 Gulf Freeway, Suite 202A",
    city: "Houston, TX 77034",
    phone: "(504) 559-1897",
    fax: "",
  },
  {
    name: "Ascension",
    address: "16018 Highway 73",
    city: "Prairieville, LA 70769",
    phone: "(225) 313-4429",
    fax: "",
  },
] as const;

export const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/company/msmm-engineering-llc/",
} as const;
