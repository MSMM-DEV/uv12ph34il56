import { defineField, defineType } from "sanity";

export const job = defineType({
  name: "job",
  title: "Job",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({
      name: "department",
      title: "Department",
      type: "string",
      options: { list: ["Engineering", "Project Management", "Administration"] },
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      options: { list: ["Metairie, LA", "New Orleans, LA", "Houston, TX", "Prairieville, LA"] },
    }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: { list: ["Full-Time", "Part-Time", "Contract"] },
      initialValue: "Full-Time",
    }),
    defineField({ name: "description", title: "Description", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "requirements", title: "Requirements", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "benefits", title: "Benefits", type: "text" }),
    defineField({ name: "salaryRange", title: "Salary Range", type: "string" }),
    defineField({ name: "datePosted", title: "Date Posted", type: "date" }),
    defineField({ name: "active", title: "Active", type: "boolean", initialValue: true }),
    defineField({ name: "applicationEmail", title: "Application Email", type: "string" }),
  ],
  preview: {
    select: { title: "title", subtitle: "location" },
  },
});
