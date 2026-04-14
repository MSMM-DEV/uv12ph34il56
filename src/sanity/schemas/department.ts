import { defineField, defineType } from "sanity";

export const department = defineType({
  name: "department",
  title: "Department",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "displayOrder",
      title: "Display Order",
      type: "number",
      description: "Controls the order departments appear in filters (lower = first)",
      initialValue: 0,
    }),
  ],
  orderings: [{ title: "Display Order", name: "displayOrder", by: [{ field: "displayOrder", direction: "asc" }] }],
  preview: {
    select: { title: "name" },
  },
});
