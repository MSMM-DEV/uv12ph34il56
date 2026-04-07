import { defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fieldsets: [
    {
      name: "media",
      title: "Media",
      description: "Gallery images and video embeds displayed on the project page",
      options: { collapsible: true, collapsed: false },
    },
  ],
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
      title: "Gallery Images",
      type: "array",
      fieldset: "media",
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
      description: "Add up to 4 images for the project gallery",
      validation: (r) => r.max(4),
    }),
    defineField({
      name: "videos",
      title: "Videos",
      type: "array",
      fieldset: "media",
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
      description: "Add up to 4 video embeds (YouTube or Vimeo URLs)",
      validation: (r) => r.max(4),
    }),
    defineField({ name: "isHidden", title: "Hide from Website", type: "boolean", description: "Toggle ON to hide this project from the website", initialValue: false }),
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
