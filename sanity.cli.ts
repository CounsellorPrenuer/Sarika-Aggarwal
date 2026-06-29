import { defineCliConfig } from "sanity/cli";

const projectId = process.env.SANITY_PROJECT_ID || "ugpnhj8o";

export default defineCliConfig({
  api: {
    projectId,
    dataset: "production",
  },
  studioHost: "sarika-aggarwal",
  deployment: {
    appId: "tvaicrq1q6qka7vqvf9y9atu",
  },
});
