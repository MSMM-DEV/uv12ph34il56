import { defineField, defineType } from "sanity";

export const teamMember = defineType({
  name: "teamMember",
  title: "Team Member",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name" }, validation: (r) => r.required() }),
    defineField({
      name: "department",
      title: "Department",
      type: "string",
      description: "Select the department for this team member",
      options: {
        list: [
          "Leadership",
          "Engineering",
          "Operations/Finance",
          "AI",
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "title", title: "Job Title", type: "string" }),
    defineField({ name: "credentials", title: "Credentials", type: "string" }),
    defineField({ name: "shortBio", title: "Short Bio", type: "text", rows: 3 }),
    defineField({ name: "bio", title: "Full Bio", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "photo", title: "Photo", type: "image", options: { hotspot: true } }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "linkedin", title: "LinkedIn URL", type: "url" }),
    defineField({ name: "isHidden", title: "Hide from Website", type: "boolean", description: "Toggle ON to hide this team member from the website", initialValue: false }),
    defineField({ name: "displayOrder", title: "Display Order", type: "number", initialValue: 0 }),
    defineField({ name: "yearsOfExperience", title: "Years of Experience", type: "number" }),
    defineField({ name: "specialties", title: "Specialties", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "licenses", title: "Licenses", type: "array", of: [{ type: "string" }] }),
  ],
  orderings: [{ title: "Display Order", name: "displayOrder", by: [{ field: "displayOrder", direction: "asc" }] }],
  preview: {
    select: { title: "name", subtitle: "title", media: "photo" },
  },
});
