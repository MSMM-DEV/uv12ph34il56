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
    defineField({ name: "announcementBanner", title: "Announcement Banner", type: "string" }),
    defineField({ name: "bannerActive", title: "Banner Active", type: "boolean", initialValue: false }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
});
