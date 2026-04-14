import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "yearsInBusiness", title: "Years in Business", type: "number" }),
    defineField({ name: "projectsCompleted", title: "Projects Completed", type: "number" }),
    defineField({ name: "combinedExperience", title: "Combined Experience (Years)", type: "number" }),
    defineField({ name: "teamMembers", title: "Team Members", type: "number" }),
    defineField({
      name: "departments",
      title: "Team Departments",
      description: "Manage the department tabs shown on the Team page. Order here controls display order.",
      type: "array",
      of: [{ type: "string" }],
      initialValue: ["Leadership", "Engineering", "Operations/Finance", "AI", "Project Management", "Administration"],
    }),
    defineField({ name: "announcementBanner", title: "Announcement Banner", type: "string" }),
    defineField({ name: "bannerActive", title: "Banner Active", type: "boolean", initialValue: false }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
});
