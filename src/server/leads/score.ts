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
  url?: string | null;
  linkedinUrl?: string | null;
  contactEmail?: string | null;
  source?: string | null;
}) {
  const haystack = [
    input.role,
    input.company,
    input.location ?? "",
    input.description ?? "",
  ]
    .join(" ")
    .toLowerCase();

  let score = 40;
  for (const term of STACK_TERMS) {
    if (haystack.includes(term.toLowerCase())) {
      score += 3;
    }
  }

  if (input.linkedinUrl || input.url?.includes("linkedin.com")) score += 12;
  if (input.contactEmail) score += 10;
  if (input.source?.includes("linkedin")) score += 6;
  if (haystack.includes("remote") || haystack.includes("pakistan")) score += 6;
  if (haystack.includes("next.js") || haystack.includes("typescript")) score += 6;
  if (
    haystack.includes("intern") ||
    haystack.includes("junior") ||
    haystack.includes("associate") ||
    haystack.includes("entry")
  ) {
    score += 8;
  }
  if (
    haystack.includes("freelance") ||
    haystack.includes("contract") ||
    haystack.includes("consultant") ||
    input.source === "freelance"
  ) {
    score += 8;
  }
  if (/\bsenior\b|\bsr\.?\b|staff|principal/.test(haystack)) score -= 12;

  return Math.max(0, Math.min(100, score));
}
