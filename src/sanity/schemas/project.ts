import { defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name" }, validation: (r) => r.required() }),
    defineField({
      name: "category",
      title: "Category",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          "Public Infrastructure",
          "Flood Control",
          "Water & Wastewater",
          "Ecosystem Restoration",
          "Coastal Restoration",
          "H & H Modeling",
          "Database/GIS Mapping",
        ],
      },
    }),
    defineField({ name: "client", title: "Client", type: "string" }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({ name: "shortDescription", title: "Short Description", type: "text", rows: 3 }),
    defineField({ name: "coverImage", title: "Cover Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "body", title: "Full Description", type: "array", of: [{ type: "block" }, { type: "image", options: { hotspot: true } }] }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: { list: ["Completed", "In Progress", "Planning"] },
      initialValue: "Completed",
    }),
    defineField({ name: "yearCompleted", title: "Year Completed", type: "number" }),
    defineField({
      name: "servicesProvided",
      title: "Services Provided",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", title: "Alt Text", type: "string" }),
            defineField({ name: "caption", title: "Caption", type: "string" }),
          ],
        },
      ],
      description: "Additional project photos for the carousel",
    }),
    defineField({
      name: "videos",
      title: "Videos",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "url", title: "Video URL", type: "url", validation: (r) => r.required() }),
            defineField({ name: "title", title: "Title", type: "string" }),
          ],
          preview: {
            select: { title: "title", subtitle: "url" },
          },
        },
      ],
      description: "Video embeds (YouTube, Vimeo, or direct video URLs)",
    }),
    defineField({ name: "featured", title: "Featured", type: "boolean", initialValue: false }),
    defineField({ name: "displayOrder", title: "Display Order", type: "number", initialValue: 0 }),
    defineField({ name: "metaTitle", title: "Meta Title", type: "string" }),
    defineField({ name: "metaDescription", title: "Meta Description", type: "text", rows: 2 }),
  ],
  orderings: [{ title: "Display Order", name: "displayOrder", by: [{ field: "displayOrder", direction: "asc" }] }],
  preview: {
    select: { title: "name", subtitle: "client", media: "coverImage" },
  },
});
