const CATEGORY_PLACEHOLDERS: Record<string, string> = {
  "Flood Control": "/assets/placeholders/flood-control.svg",
  "Coastal Restoration": "/assets/placeholders/coastal-restoration.svg",
  "Water & Wastewater": "/assets/placeholders/water-wastewater.svg",
  "Public Infrastructure": "/assets/placeholders/public-infrastructure.svg",
  "Ecosystem Restoration": "/assets/placeholders/ecosystem-restoration.svg",
};

export function getPlaceholder(categories: string[] | null): string {
  if (!categories) return "/assets/placeholders/engineering-default.svg";
  for (const cat of categories) {
    if (CATEGORY_PLACEHOLDERS[cat]) return CATEGORY_PLACEHOLDERS[cat];
  }
  return "/assets/placeholders/engineering-default.svg";
}
