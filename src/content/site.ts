import { siteUrl } from "@/lib/site-url";

/**
 * Portfolio content. Project and experience copy follows Hassan's LinkedIn
 * capture (Nov 2026), with LaunchPulse dates set to Oct 2025 – May 2026.
 */

export const site = {
  name: "Hassan Jamshaid",
  fullName: "Hassan Jamshaid",
  firstName: "Hassan",
  lastName: "Jamshaid",
  role: "Software Engineer | Full-Stack",
  location: "Lahore, Pakistan",
  availability: "Lahore, PK",
  email: "hjamshaid81@gmail.com",
  phone: "+92 312 4384133",
  phoneHref: "tel:+923124384133",
  website: siteUrl,
  resumeUrl: "/Hassan_Jamshaid_Resume.pdf",
  social: {
    linkedin: "https://www.linkedin.com/in/hassanjamshaid10",
    github: "https://github.com/hassan-jamshaid10",
  },
  hero: {
    headline: "I build products people actually use.",
    support:
      "Software engineer for AI-first systems and full-stack apps, from agentic RAG to the web platforms and integrations behind them.",
  },
  seo: {
    title: "Hassan Jamshaid | Software Engineer",
    description:
      "Hassan Jamshaid is a software engineer in Lahore building products people use: full-stack web apps, AI-first systems, and integrations with Next.js, Spring Boot, Vue 3, and FastAPI.",
    keywords: [
      "Hassan Jamshaid",
      "Hassan Jamshaid Software Engineer",
      "Hassan Jamshaid Full Stack Developer",
      "Software Engineer Lahore",
      "Full Stack Developer Pakistan",
      "Next.js Developer",
      "Spring Boot Developer",
      "FastAPI Developer",
      "tRPC Developer",
      "Remote Software Engineer",
      "SaaS Engineer",
      "AI Engineer Pakistan",
    ],
  },
  marquee: [
    "Next.js",
    "Spring Boot",
    "FastAPI",
    "tRPC",
    "PostgreSQL",
    "BigQuery",
    "Agentic RAG",
    "LangChain",
    "Vue 3",
    "React Native",
    "Docker",
    "AWS",
  ],
  quickFacts: [
    { label: "Now", value: "OctaBit Logics", detail: "Co-Founder & CTO" },
    { label: "Focus", value: "Products people use", detail: "AI-first systems and full-stack apps" },
    { label: "Certified", value: "AWS Cloud Foundations", detail: "Amazon Web Services Academy" },
    { label: "Base", value: "Lahore | Remote", detail: "Open to global teams" },
  ],
  about: {
    title: "Software engineer. Products people use.",
    eyebrow: "/ About — the dossier",
    paragraphs: [
      "I'm a software engineer who likes building products people actually use. Most of my work is full-stack: web apps, REST APIs, and microservices with Spring Boot, Next.js, Vue 3, and FastAPI, plus the enterprise workflows and third-party integrations that sit around them.",
      "I also build AI-first systems: agentic RAG, LLM apps, vector retrieval, and evaluation you can check. I'm AWS Cloud Foundations certified, and I co-founded OctaBit Logics, Sunao Technologies, and Sporttek.",
    ],
    highlights: [
      "OctaBit Logics | Co-Founder & CTO",
      "Liffey Logics | Junior Software Engineer",
      "Next.js | Spring Boot | Vue 3 | FastAPI",
      "Agentic RAG | LangChain | Vector retrieval",
    ],
  },
  process: [
    {
      step: "01",
      title: "Signal",
      copy: "Clarify the problem, users, and constraints before a single line of code.",
    },
    {
      step: "02",
      title: "Architect",
      copy: "Shape a clean stack and data model that can grow without rewrites.",
    },
    {
      step: "03",
      title: "Ship",
      copy: "Build in tight loops: working software, sharp UI, production habits.",
    },
    {
      step: "04",
      title: "Compound",
      copy: "Instrument, iterate, and leave systems your team can actually own.",
    },
  ],
  experience: [
    {
      role: "Co-Founder & CTO",
      company: "OctaBit Logics",
      period: "Feb 2026 – Present",
      location: "",
      href: "https://octabitlogics.com",
      summary:
        "I lead the technical direction of OctaBit Logics, a software engineering studio, and the engineering and delivery of our client and product work.",
    },
    {
      role: "Junior Software Engineer",
      company: "Liffey Logics",
      period: "Jun 2026 – Present",
      location: "Remote",
      href: null,
      summary:
        "Building enterprise applications with Spring Boot, Vue 3, and PostgreSQL, including business workflows and third-party integrations.",
    },
    {
      role: "Junior Software Developer",
      company: "Data Ropes.ai",
      period: "Nov 2025 – May 2026",
      location: "Hybrid, Lahore",
      href: null,
      summary:
        "Built SaaS applications with Next.js, TypeScript, and tRPC, across data integrations, warehousing, inventory, and e-commerce workflows.",
    },
    {
      role: "Webmaster",
      company: "IEEE Computer Society UCP Student Chapter",
      period: "Dec 2024 – Mar 2026",
      location: "",
      href: null,
      summary:
        "Designed and built the chapter website for mission, team, events, publications, and registrations.",
    },
    {
      role: "Full Stack Intern",
      company: "NETSOL Technologies",
      period: "Jul 2024 – Sep 2024",
      location: "On-site, Lahore",
      href: null,
      summary:
        "Contributed across Spring Boot services, Kafka, PostgreSQL, and React interfaces on a full-stack internship.",
    },
  ],
  projects: [
    {
      id: "01",
      title: "PukaarAI",
      role: "Technical Lead & Engineer",
      dates: "Aug 2026 – Present",
      cover: "/work/pukaar.webp",
      tags: ["Next.js", "FastAPI", "PostgreSQL"],
      summary:
        "Confidential workplace incident reporting in Urdu and English, with voice and text, transcription, AI-assisted risk assessment, and an admin review workflow.",
      link: {
        href: "https://upliftx-replit-hackathon-web.vercel.app/login",
        label: "Live",
      },
    },
    {
      id: "02",
      title: "Sporttek",
      role: "Co-founder & Lead Engineer",
      dates: "Jul 2026 – Present",
      cover: "/work/sporttek.webp",
      tags: ["Next.js", "TypeScript", "Flutter", "Spring Boot", "PostgreSQL"],
      summary:
        "Sports venue discovery and booking for padel, futsal, football, badminton, and cricket, with a player experience and a venue-management panel.",
      link: { href: "https://www.sporttek.pk/play", label: "Live" },
    },
    {
      id: "03",
      title: "LaunchPulse AI",
      role: "Creator & Lead Engineer",
      dates: "Oct 2025 – May 2026",
      cover: "/work/launchpulse.webp",
      tags: ["Next.js", "TypeScript", "tRPC", "PostgreSQL", "Supabase"],
      summary:
        "Startup-idea evaluation with agentic RAG, scoring, market research, and a workspace for competitors, roadmaps, and reports.",
      link: { href: "https://nextjs-launchpulse.vercel.app/auth/login", label: "Live" },
    },
    {
      id: "04",
      title: "OctaBit Logics",
      role: "Co-founder, CTO & Lead Engineer",
      dates: "Feb 2026 – Present",
      cover: "/work/octabit.webp",
      tags: ["Next.js", "TypeScript"],
      summary:
        "The studio site for services, products, and selected work, so clients can see how OctaBit Logics approaches software.",
      link: { href: "https://octabitlogics.com", label: "Live" },
    },
    {
      id: "05",
      title: "Sunao Technologies",
      role: "Co-founder, CTO & Lead Engineer",
      dates: "2026 – Present",
      cover: "/work/sunao.webp",
      tags: ["Vue 3", "TypeScript", "Vite"],
      summary:
        "Company site for an AI-focused studio, including SunaoBot, a Gemini-powered assistant, and an email contact flow.",
      link: { href: "https://sunaotechnologies.com/", label: "Live" },
    },
    {
      id: "06",
      title: "CodebaseAI",
      role: "Personal project",
      dates: "2024 – Present",
      cover: "/work/codebaseai.webp",
      tags: ["React", "Vite", "Tailwind CSS", "FastAPI", "LangChain", "ChromaDB"],
      summary:
        "Ask a repository questions in plain language. It loads the code, retrieves the relevant parts, and explains functions and architecture.",
      link: { href: "https://github.com/hassan-jamshaid10/CodebaseAI", label: "Code" },
    },
  ],
  certifications: [
    {
      title: "AWS Academy Cloud Foundations",
      issuer: "Amazon Web Services",
      image: "/aws-academy-graduate-aws-academy-cloud-foundations.png",
    },
  ],
  hackathons: [
    {
      title: "WebVerse Hackathon",
      result: "Runner-Up",
      detail: "2nd of 35 teams in a 5-hour frontend engineering sprint.",
      year: "2026",
    },
    {
      title: "SOFTEC '26 Web Hackathon",
      result: "Top 10",
      detail: "National web hackathon at FAST-NUCES Lahore.",
      year: "2026",
    },
    {
      title: "FCCU XR AI Hackathon",
      result: "8th Place",
      detail: "Finished 8th among 50 teams.",
      year: "2026",
    },
  ],
  skills: [
    {
      group: "Languages",
      items: ["TypeScript", "JavaScript", "Python", "Java", "SQL"],
    },
    {
      group: "Frontend",
      items: [
        "Next.js",
        "React.js",
        "Vue 3",
        "React Native",
        "Tailwind CSS",
        "TanStack Query",
        "PrimeReact",
      ],
    },
    {
      group: "Backend & APIs",
      items: [
        "Spring Boot",
        "Node.js",
        "FastAPI",
        "tRPC",
        "Express.js",
        "REST APIs",
        "Microservices",
        "JWT Auth",
      ],
    },
    {
      group: "Data",
      items: ["PostgreSQL", "BigQuery", "MongoDB", "MySQL", "Kysely", "Supabase", "pgvector"],
    },
    {
      group: "AI / ML",
      items: [
        "Agentic RAG",
        "LangChain",
        "LlamaIndex",
        "DSPy",
        "ChromaDB",
        "RAGAS",
        "HuggingFace",
        "Prompt Engineering",
      ],
    },
    {
      group: "Cloud & Tools",
      items: [
        "AWS Foundations",
        "Docker",
        "Git",
        "Vercel",
        "Render",
        "Zod",
        "Sentry",
        "Vitest",
        "Postman",
      ],
    },
  ],
  education: {
    degree: "B.Sc. Computer Science",
    school: "University of Central Punjab (UCP)",
    period: "2022 to 2026",
    location: "Lahore, Pakistan",
  },
  achievements: [
    "AWS Cloud Foundations, Amazon Web Services",
    "Runner-Up, WebVerse Hackathon (2026): 2nd of 35 teams",
    "Top 10, SOFTEC '26 Web Hackathon (FAST-NUCES Lahore)",
    "8th Place, FCCU XR AI Hackathon among 50 teams",
  ],
  achievementTiles: [
    { kicker: "Certified", title: "AWS Cloud Foundations, Amazon Web Services" },
    { kicker: "2nd of 35 teams", title: "Runner-Up, WebVerse Hackathon (2026)" },
    { kicker: "Top 10", title: "SOFTEC '26 Web Hackathon (FAST-NUCES Lahore)" },
    { kicker: "8th of 50 teams", title: "FCCU XR AI Hackathon" },
  ],
  contact: {
    title: "Have a role, a product, or a hard problem?",
    body: "Open to remote engineering roles and selective freelance. Building SaaS, AI systems, or ops platforms? Let's talk.",
  },
  workIntro:
    "Products and sites I've designed and built, often with the people I work with.",
} as const;

export type Project = (typeof site.projects)[number];

export function projectHref(project: { link: { href: string; label: string } | null }) {
  return project.link?.href ?? null;
}
