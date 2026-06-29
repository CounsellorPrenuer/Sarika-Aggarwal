import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";

const projectId = process.env.SANITY_PROJECT_ID || "ugpnhj8o";

export default defineConfig({
  name: "sarika-aggarwal",
  title: "DreamBridge - Sarika Aggarwal",
  projectId,
  dataset: "production",
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
});
