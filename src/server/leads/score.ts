import { masterResume } from "@/content/resume";

const STACK_TERMS = [
  ...masterResume.skills.languages,
  ...masterResume.skills.frontend,
  ...masterResume.skills.backend,
  ...masterResume.skills.data,
  ...masterResume.skills.ai,
  "Remote",
  "SaaS",
  "Full Stack",
  "Full-Stack",
  "Software Engineer",
].map((term) => term.toLowerCase());

export function scoreLead(input: {
  role: string;
  company: string;
  location?: string | null;
  description?: string | null;
}) {
  const haystack = [
    input.role,
    input.company,
    input.location ?? "",
    input.description ?? "",
  ]
    .join(" ")
    .toLowerCase();

  let score = 35;
  for (const term of STACK_TERMS) {
    if (haystack.includes(term.toLowerCase())) {
      score += 4;
    }
  }

  if (haystack.includes("remote")) score += 8;
  if (haystack.includes("next.js") || haystack.includes("typescript")) score += 6;
  if (haystack.includes("intern") || haystack.includes("junior")) score += 3;

  return Math.max(0, Math.min(100, score));
}
