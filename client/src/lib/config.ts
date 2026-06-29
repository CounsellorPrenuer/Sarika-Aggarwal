export const PROJECT_ID = "sarika-aggarwal";
export const SANITY_PROJECT_ID = "ugpnhj8o";
export const SANITY_DATASET = "production";
export const SANITY_STUDIO_HOST = "sarika-aggarwal";
export const GITHUB_PAGES_REPO_NAME = "Sarika-Aggarwal";
export const SITE_BASE = "/Sarika-Aggarwal";
export const WORKER_URL = "https://multi-tenant-platform.gauravgoodreads.workers.dev";
export const CONTACT_EMAIL = "agrawalsarika20@gmail.com";
export const CONTACT_PHONE = "+91 99100 43394";
export const LIVE_SITE_URL = "https://counsellorprenuer.github.io/Sarika-Aggarwal/";

/** Absolute site path for GitHub Pages project routing (e.g. /Sarika-Aggarwal/plans). */
export function sitePath(path = "/"): string {
  const base = SITE_BASE.endsWith("/") ? SITE_BASE.slice(0, -1) : SITE_BASE;
  if (!path || path === "/") return `${base}/`;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}
