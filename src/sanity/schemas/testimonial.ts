import { defineField, defineType } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({ name: "quote", title: "Quote", type: "text", validation: (r) => r.required() }),
    defineField({ name: "authorName", title: "Author Name", type: "string" }),
    defineField({ name: "authorTitle", title: "Author Title", type: "string" }),
    defineField({ name: "organization", title: "Organization", type: "string" }),
    defineField({ name: "featured", title: "Featured", type: "boolean", initialValue: false }),
    defineField({ name: "displayOrder", title: "Display Order", type: "number", initialValue: 0 }),
  ],
  preview: {
    select: { title: "authorName", subtitle: "organization" },
  },
});
