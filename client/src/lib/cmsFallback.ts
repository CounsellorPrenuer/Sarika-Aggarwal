import type { BlogPost, CmsContent } from "./sanity";

function block(text: string) {
  return {
    _type: "block",
    _key: text.slice(0, 12),
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: "span", text, marks: [] }],
  };
}

const fallbackBlogPosts: BlogPost[] = [
  {
    _id: "fallback-blog-1",
    title: "Finding Your Career Path with Confidence",
    slug: "finding-your-career-path-with-confidence",
    excerpt: "Practical steps to align your strengths, interests, and opportunities when choosing a career direction.",
    author: "Sarika Aggarwal",
    publishedAt: "2026-06-01T09:00:00.000Z",
    featured: true,
    body: [
      block("Choosing a career path is one of the most meaningful decisions you will make."),
      block("At DreamBridge, we combine psychometric science with personalized mentoring to help you discover where your talents and passions converge."),
      block("Start with self-reflection, validate through assessments, and seek guidance from mentors who understand today's job market."),
    ],
  },
  {
    _id: "fallback-blog-2",
    title: "The Art of Career Decision Making",
    slug: "the-art-of-career-decision-making",
    excerpt: "Learn systematic approaches to making career decisions that align with both your heart and practical reality.",
    author: "Sarika Aggarwal",
    publishedAt: "2026-05-15T09:00:00.000Z",
    featured: false,
    body: [
      block("Career decisions should balance passion, aptitude, and market reality."),
      block("Use structured frameworks: list options, evaluate against your strengths, and test assumptions through conversations and short-term exposure."),
    ],
  },
  {
    _id: "fallback-blog-3",
    title: "Understanding Your True Potential",
    slug: "understanding-your-true-potential",
    excerpt: "Psychometric insights and self-discovery techniques to uncover abilities you never knew you had.",
    author: "Sarika Aggarwal",
    publishedAt: "2026-05-01T09:00:00.000Z",
    featured: false,
    body: [
      block("Psychometric assessments reveal patterns in your interests, personality, and abilities that may not be obvious from everyday experience."),
      block("Combined with expert interpretation, these insights become a practical roadmap for stream selection, college planning, and career transitions."),
    ],
  },
];

export const CMS_FALLBACK: CmsContent = {
  standardPlans: [
    { _id: "fallback-pkg-1", planId: "pkg-1", title: "Discover", subgroup: "8-10", price: 5500, features: ["Psychometric assessment", "1 career counselling session", "Lifetime Knowledge Gateway access", "Live webinar invites"] },
    { _id: "fallback-pkg-2", planId: "pkg-2", title: "Discover Plus+", subgroup: "8-10", price: 15000, features: ["Psychometric assessments", "8 career counselling sessions (1/year)", "Custom reports & study abroad guidance", "CV building"] },
    { _id: "fallback-pkg-3", planId: "pkg-3", title: "Achieve Online", subgroup: "10-12", price: 5999, features: ["Psychometric assessment", "1 career counselling session", "Lifetime Knowledge Gateway access", "Pre-recorded webinars"] },
    { _id: "fallback-pkg-4", planId: "pkg-4", title: "Achieve Plus+", subgroup: "10-12", price: 10599, features: ["Psychometric assessment", "4 career counselling sessions", "Custom reports & study abroad guidance", "CV reviews"] },
    { _id: "fallback-pkg-5", planId: "pkg-5", title: "Ascend Online", subgroup: "college", price: 6499, features: ["Psychometric assessment", "1 career counselling session", "Lifetime Knowledge Gateway access", "Pre-recorded webinars"] },
    { _id: "fallback-pkg-6", planId: "pkg-6", title: "Ascend Plus+", subgroup: "college", price: 10599, features: ["Psychometric assessment", "3 career counselling sessions", "Certificate/online course info", "CV reviews for jobs"] },
    { _id: "fallback-mp-3", planId: "mp-3", title: "Ascend Online", subgroup: "working", price: 6499, features: ["Psychometric assessment", "1 career counselling session", "Lifetime Knowledge Gateway access", "Pre-recorded webinars"] },
    { _id: "fallback-mp-2", planId: "mp-2", title: "Ascend Plus+", subgroup: "working", price: 10599, features: ["Psychometric assessment", "3 career counselling sessions", "Certificate/online course info", "CV reviews for jobs"] },
  ],
  customPlans: [
    { _id: "fallback-career-report", planId: "career-report", title: "Career Report", price: 1500, description: "Get a detailed report of your psychometric assessment for a scientific analysis of your interests. Find out where your interests lie and which future paths you can potentially consider." },
    { _id: "fallback-career-report-counselling", planId: "career-report-counselling", title: "Career Report + Career Counselling", price: 3000, description: "Connect with India's top career coaches to analyse your psychometric report and shortlist the top three career paths you're most likely to enjoy and excel at." },
    { _id: "fallback-knowledge-gateway", planId: "knowledge-gateway", title: "Knowledge Gateway + Career Helpline Access", price: 100, description: "Unlock holistic information on your career paths and get direct access to Mentoria's experts, who will resolve your career-related queries through our dedicated Career Helpline." },
    { _id: "fallback-one-to-one-session", planId: "one-to-one-session", title: "One-to-One Session with a Career Expert", price: 3500, description: "Resolve your career queries and glimpse into your future world through a one-on-one session with an expert from your chosen field." },
    { _id: "fallback-college-admission-planning", planId: "college-admission-planning", title: "College Admission Planning", price: 3000, description: "Get unbiased recommendations and details on your future college options in India and abroad, organised in one resourceful planner." },
    { _id: "fallback-exam-stress-management", planId: "exam-stress-management", title: "Exam Stress Management", price: 1000, description: "Get expert guidance on tackling exam stress, planning your study schedule, revision tips and more from India's top educators." },
    { _id: "fallback-cap-100", planId: "cap-100", title: "College Admissions Planner - 100 (CAP-100)", price: 199, description: "Rs.199 for a ranked list of the top 100 colleges in your course. Get an expert-curated list of colleges based on verified cut-offs." },
  ],
  blogPosts: fallbackBlogPosts,
  testimonials: [
    { _id: "fallback-testimonial-1", name: "Priya Sharma", role: "Engineering Student", quote: "Sarika's guidance was instrumental in helping me choose the right career path. Her personalized approach and deep understanding of my strengths made all the difference.", rating: 5 },
    { _id: "fallback-testimonial-2", name: "Dr. Rajesh Kumar", role: "College Principal", quote: "The workshop conducted by DreamBridge for our college was incredibly insightful. Our students gained valuable skills and clarity about their future careers.", rating: 5 },
    { _id: "fallback-testimonial-3", name: "Amit Patel", role: "Marketing Professional", quote: "As a working professional looking to transition careers, Sarika's coaching gave me the confidence and roadmap I needed to make the leap successfully.", rating: 5 },
  ],
  services: [
    { _id: "fallback-service-1", title: "Career Guidance", description: "Personalized counseling to help you discover the right career path tailored to your strengths and aspirations.", link: "/services/career-guidance", order: 1 },
    { _id: "fallback-service-2", title: "Workshops & Seminars", description: "Interactive sessions for schools, colleges, and corporates designed to build essential skills and knowledge.", link: "/services/workshops", order: 2 },
    { _id: "fallback-service-3", title: "Admission Guidance", description: "Expert support for navigating college and university admissions with confidence and clarity.", link: "/services/admission-guidance", order: 3 },
  ],
};
