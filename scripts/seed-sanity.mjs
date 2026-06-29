import { createClient } from "@sanity/client";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

try {
  const envPath = resolve(root, ".env.local");
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (value && !process.env[key]) process.env[key] = value;
  }
} catch {
  // optional .env.local
}

const skipImages = process.argv.includes("--no-images");
const importOnly = process.argv.includes("--import-only");
const projectId = process.env.SANITY_PROJECT_ID || "ugpnhj8o";
const token = process.env.SANITY_EDITOR_TOKEN || process.env.SANITY_AUTH_TOKEN;

if (!importOnly && !token) {
  throw new Error("SANITY_EDITOR_TOKEN is required (Editor role token from sanity.io/manage)");
}

const client = createClient({
  projectId,
  dataset: "production",
  apiVersion: "2026-06-01",
  token,
  useCdn: false,
});

async function uploadFromUrl(url, label) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch image: ${url}`);
  const buffer = Buffer.from(await response.arrayBuffer());
  const asset = await client.assets.upload("image", buffer, { filename: `${label}.jpg` });
  return { _type: "image", asset: { _type: "reference", _ref: asset._id }, alt: label };
}

const block = (text) => ({
  _type: "block",
  _key: crypto.randomUUID().slice(0, 12),
  style: "normal",
  markDefs: [],
  children: [{ _type: "span", _key: crypto.randomUUID().slice(0, 12), text, marks: [] }],
});

const standardPlans = [
  ["pkg-1", "Discover", "8-10", 5500, ["Psychometric assessment", "1 career counselling session", "Lifetime Knowledge Gateway access", "Live webinar invites"]],
  ["pkg-2", "Discover Plus+", "8-10", 15000, ["Psychometric assessments", "8 career counselling sessions (1/year)", "Custom reports & study abroad guidance", "CV building"]],
  ["pkg-3", "Achieve Online", "10-12", 5999, ["Psychometric assessment", "1 career counselling session", "Lifetime Knowledge Gateway access", "Pre-recorded webinars"]],
  ["pkg-4", "Achieve Plus+", "10-12", 10599, ["Psychometric assessment", "4 career counselling sessions", "Custom reports & study abroad guidance", "CV reviews"]],
  ["pkg-5", "Ascend Online", "college", 6499, ["Psychometric assessment", "1 career counselling session", "Lifetime Knowledge Gateway access", "Pre-recorded webinars"]],
  ["pkg-6", "Ascend Plus+", "college", 10599, ["Psychometric assessment", "3 career counselling sessions", "Certificate/online course info", "CV reviews for jobs"]],
  ["mp-3", "Ascend Online", "working", 6499, ["Psychometric assessment", "1 career counselling session", "Lifetime Knowledge Gateway access", "Pre-recorded webinars"]],
  ["mp-2", "Ascend Plus+", "working", 10599, ["Psychometric assessment", "3 career counselling sessions", "Certificate/online course info", "CV reviews for jobs"]],
];

const customPlans = [
  ["career-report", "Career Report", 1500, "Get a detailed report of your psychometric assessment for a scientific analysis of your interests. Find out where your interests lie and which future paths you can potentially consider."],
  ["career-report-counselling", "Career Report + Career Counselling", 3000, "Connect with India's top career coaches to analyse your psychometric report and shortlist the top three career paths you're most likely to enjoy and excel at."],
  ["knowledge-gateway", "Knowledge Gateway + Career Helpline Access", 100, "Unlock holistic information on your career paths and get direct access to Mentoria's experts, who will resolve your career-related queries through our dedicated Career Helpline."],
  ["one-to-one-session", "One-to-One Session with a Career Expert", 3500, "Resolve your career queries and glimpse into your future world through a one-on-one session with an expert from your chosen field."],
  ["college-admission-planning", "College Admission Planning", 3000, "Get unbiased recommendations and details on your future college options in India and abroad, organised in one resourceful planner."],
  ["exam-stress-management", "Exam Stress Management", 1000, "Get expert guidance on tackling exam stress, planning your study schedule, revision tips and more from India's top educators."],
  ["cap-100", "College Admissions Planner - 100 (CAP-100)", 199, "Rs.199 for a ranked list of the top 100 colleges in your course. Get an expert-curated list of colleges based on verified cut-offs."],
];

function buildDocuments(images) {
  const img = (index) => (images?.length ? images[index % images.length] : undefined);
  const withImage = (doc, index) => (img(index) ? { ...doc, image: img(index) } : doc);

  return [
    ...standardPlans.map(([planId, title, subgroup, price, features], order) =>
      withImage({
        _id: `standard-plan-${planId}`,
        _type: "standardPlan",
        planId, title, subgroup, price, features, order: order + 1,
      }, order),
    ),
    ...customPlans.map(([planId, title, price, description], order) =>
      withImage({
        _id: `custom-plan-${planId}`,
        _type: "customPlan",
        planId, title, price, description, order: order + 1,
      }, order),
    ),
    withImage({
      _id: "service-career-guidance", _type: "services", title: "Career Guidance",
      description: "Personalized counseling to help you discover the right career path tailored to your strengths and aspirations.",
      link: "/services/career-guidance", order: 1,
    }, 0),
    withImage({
      _id: "service-workshops", _type: "services", title: "Workshops & Seminars",
      description: "Interactive sessions for schools, colleges, and corporates designed to build essential skills and knowledge.",
      link: "/services/workshops", order: 2,
    }, 1),
    withImage({
      _id: "service-admission-guidance", _type: "services", title: "Admission Guidance",
      description: "Expert support for navigating college and university admissions with confidence and clarity.",
      link: "/services/admission-guidance", order: 3,
    }, 2),
    withImage({
      _id: "testimonial-1", _type: "testimonials", name: "Priya Sharma", role: "Engineering Student",
      quote: "Sarika's guidance was instrumental in helping me choose the right career path. Her personalized approach and deep understanding of my strengths made all the difference.",
      rating: 5, order: 1,
    }, 0),
    withImage({
      _id: "testimonial-2", _type: "testimonials", name: "Dr. Rajesh Kumar", role: "College Principal",
      quote: "The workshop conducted by DreamBridge for our college was incredibly insightful. Our students gained valuable skills and clarity about their future careers.",
      rating: 5, order: 2,
    }, 1),
    withImage({
      _id: "testimonial-3", _type: "testimonials", name: "Amit Patel", role: "Marketing Professional",
      quote: "As a working professional looking to transition careers, Sarika's coaching gave me the confidence and roadmap I needed to make the leap successfully.",
      rating: 5, order: 3,
    }, 2),
    withImage({
      _id: "blog-career-path", _type: "blogPost", title: "Finding Your Career Path with Confidence",
      slug: { _type: "slug", current: "finding-your-career-path-with-confidence" },
      excerpt: "Practical steps to align your strengths, interests, and opportunities when choosing a career direction.",
      author: "Sarika Aggarwal", publishedAt: "2026-06-01T09:00:00.000Z", featured: true,
      body: [
        block("Choosing a career path is one of the most meaningful decisions you will make."),
        block("At DreamBridge, we combine psychometric science with personalized mentoring to help you discover where your talents and passions converge."),
        block("Start with self-reflection, validate through assessments, and seek guidance from mentors who understand today's job market."),
      ],
    }, 3),
    withImage({
      _id: "blog-decision-making", _type: "blogPost", title: "The Art of Career Decision Making",
      slug: { _type: "slug", current: "the-art-of-career-decision-making" },
      excerpt: "Learn systematic approaches to making career decisions that align with both your heart and practical reality.",
      author: "Sarika Aggarwal", publishedAt: "2026-05-15T09:00:00.000Z", featured: false,
      body: [
        block("Career decisions should balance passion, aptitude, and market reality."),
        block("Use structured frameworks: list options, evaluate against your strengths, and test assumptions through conversations and short-term exposure."),
      ],
    }, 4),
    withImage({
      _id: "blog-potential", _type: "blogPost", title: "Understanding Your True Potential",
      slug: { _type: "slug", current: "understanding-your-true-potential" },
      excerpt: "Psychometric insights and self-discovery techniques to uncover abilities you never knew you had.",
      author: "Sarika Aggarwal", publishedAt: "2026-05-01T09:00:00.000Z", featured: false,
      body: [
        block("Psychometric assessments reveal patterns in your interests, personality, and abilities that may not be obvious from everyday experience."),
        block("Combined with expert interpretation, these insights become a practical roadmap for stream selection, college planning, and career transitions."),
      ],
    }, 2),
  ];
}

const ndjsonPath = resolve(root, "scripts", "data", "sarika-aggarwal-seed.ndjson");

async function main() {
  let images = [];
  if (!skipImages && !importOnly) {
    const imageSources = [
      ["https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&q=80", "Career counseling"],
      ["https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=900&q=80", "Career planning"],
      ["https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=900&q=80", "Goal setting"],
      ["https://images.unsplash.com/photo-1562774053-701939374585?w=900&q=80", "Resume building"],
      ["https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=900&q=80", "Career insights blog"],
    ];
    for (const [url, label] of imageSources) {
      images.push(await uploadFromUrl(url, label));
    }
  }

  const documents = buildDocuments(images);
  mkdirSync(dirname(ndjsonPath), { recursive: true });
  writeFileSync(ndjsonPath, documents.map((doc) => JSON.stringify(doc)).join("\n") + "\n");
  console.log(`Wrote ${documents.length} documents to ${ndjsonPath}`);

  if (importOnly) {
    execSync(`npx sanity dataset import "${ndjsonPath}" production --replace`, {
      cwd: root,
      stdio: "inherit",
      env: { ...process.env, SANITY_AUTH_TOKEN: token || process.env.SANITY_EDITOR_TOKEN },
    });
    console.log("Import complete.");
    return;
  }

  let transaction = client.transaction();
  for (const document of documents) transaction = transaction.createOrReplace(document);
  await transaction.commit();
  console.log(`Seeded ${documents.length} Sanity documents for Sarika-Aggarwal.`);
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
