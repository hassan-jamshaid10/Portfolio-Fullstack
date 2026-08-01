import { masterResume } from "@/content/resume";

/**
 * Search filters for daily job intake.
 * Tuned for Hassan's resume stack + junior/associate remote roles worldwide and in Pakistan.
 */
export const defaultLeadFilters = {
  titles: [
    "Junior Software Engineer",
    "Junior Software Developer",
    "Junior Full Stack Developer",
    "Junior Full Stack Engineer",
    "Junior Frontend Developer",
    "Junior Backend Developer",
    "Associate Software Engineer",
    "Associate Software Developer",
    "Entry Level Software Engineer",
    "Software Engineer",
    "Software Developer",
    "Full Stack Engineer",
    "Full Stack Developer",
    "Frontend Engineer",
    "Frontend Developer",
    "Backend Engineer",
    "Backend Developer",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "AI Engineer",
    "React Native Developer",
    "Freelance Developer",
    "Contract Software Engineer",
    "Freelance Full Stack Developer",
  ],
  locations: [
    "Remote",
    "Worldwide",
    "Pakistan",
    "Lahore",
    "Karachi",
    "Islamabad",
  ],
  keywords: [
    ...masterResume.skills.languages,
    ...masterResume.skills.frontend,
    ...masterResume.skills.backend,
    ...masterResume.skills.data,
    ...masterResume.skills.ai,
    "SaaS",
    "Remote",
    "Freelance",
    "Contract",
  ],
  dailyCap: 15,
  minFitScore: 50,
} as const;
