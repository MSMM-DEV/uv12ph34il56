import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { orderableDocumentListDeskItem as _orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import { schemaTypes } from "./src/sanity/schemas";
import { structure } from "./src/sanity/structure";

// Reference the import so unused-import linters don't strip it; the plugin's
// side effects register the orderRank field for "project" documents.
void _orderableDocumentListDeskItem;

export default defineConfig({
  name: "msmmeng",
  title: "MSMM Engineering",
  projectId: "0ocr346c",
  dataset: "production",
  basePath: "/studio",
  plugins: [structureTool({ structure })],
  schema: {
    types: schemaTypes,
  },
});
