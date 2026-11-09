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
      title: "Ecom Central",
      company: "Dataropes.ai",
      tags: ["Next.js 15", "TypeScript", "tRPC", "PostgreSQL", "Kysely", "BigQuery"],
      summary:
        "E-commerce operations platform with Amazon FBA/FBM marketplace integration, ShipHero warehouse sync, DataChannel to BigQuery pipelines, and a full warehousing module covering inbound, inventory, receiving, packaging, and purchase shipments.",
      links: { live: null, repo: null },
      linkLabel: null,
    },
    {
      id: "02",
      title: "Jessica Nelson",
      company: "Liffey Logics",
      tags: ["Spring Boot", "Vue 3", "PostgreSQL", "CRM"],
      summary:
        "Interior design business management platform at Liffey Logics. Built CRM for Lead to Bid to Project to Procurement to Invoice, client email templates with SMTP and response portal, plus procurement workspaces with vendor catalogues and line-item tracking.",
      links: { live: null, repo: null },
      linkLabel: null,
    },
    {
      id: "03",
      title: "Sporttek",
      company: "Personal",
      tags: ["React Native", "FastAPI", "Bookings", "Payments"],
      summary:
        "Online booking platform that connects players with turf owners. Players discover, compare, and instantly book facilities; owners manage schedules, bookings, and payments. Built on React Native and FastAPI.",
      links: { live: null, repo: null },
      linkLabel: null,
    },
    {
      id: "04",
      title: "Launch Pulse",
      company: "FYP",
      tags: ["Next.js", "tRPC", "FastAPI", "React Native", "Agentic RAG"],
      summary:
        "AI business idea evaluation and market simulation SaaS (FYP). Agentic RAG across 8 live channels, dual-LLM pipeline with RAGAS grounding, deployed as microservices on Vercel and Render with a React Native client.",
      links: { live: null, repo: null },
      linkLabel: null,
    },
    {
      id: "05",
      title: "PukaarAI",
      company: "Technical Lead & Engineer · Aug 2026 – Present",
      tags: ["Next.js", "FastAPI", "PostgreSQL"],
      summary:
        "Confidential workplace incident reporting in Urdu and English, with voice and text, transcription, AI-assisted risk assessment, and an admin review workflow.",
      links: { live: "https://upliftx-replit-hackathon-web.vercel.app/login", repo: null },
      linkLabel: "Live",
    },
    {
      id: "06",
      title: "LaunchPulse AI",
      company: "Creator & Lead Engineer · Oct 2025 – May 2026",
      tags: ["Next.js", "TypeScript", "tRPC", "PostgreSQL", "Supabase"],
      summary:
        "Startup-idea evaluation with agentic RAG, scoring, market research, and a workspace for competitors, roadmaps, and reports.",
      links: { live: "https://nextjs-launchpulse.vercel.app/auth/login", repo: null },
      linkLabel: "Live",
    },
    {
      id: "07",
      title: "OctaBit Logics",
      company: "Co-founder, CTO & Lead Engineer · Feb 2026 – Present",
      tags: ["Next.js", "TypeScript"],
      summary:
        "The studio site for services, products, and selected work, so clients can see how OctaBit Logics approaches software.",
      links: { live: "https://octabitlogics.com", repo: null },
      linkLabel: "Live",
    },
    {
      id: "08",
      title: "Sunao Technologies",
      company: "Co-founder, CTO & Lead Engineer · 2026 – Present",
      tags: ["Vue 3", "TypeScript", "Vite"],
      summary:
        "Company site for an AI-focused studio, including SunaoBot, a Gemini-powered assistant, and an email contact flow.",
      links: { live: "https://sunaotechnologies.com/", repo: null },
      linkLabel: "Live",
    },
      {
      id: "09",
      title: "Codebase AI",
      company: "Personal",
      tags: ["FastAPI", "LangChain", "RAG", "ChromaDB", "React"],
      summary:
        "RAG tool that loads any repository, chunks and embeds the code, and answers natural-language questions about the codebase via LangChain and ChromaDB.",
      links: { live: null, repo: null },
      linkLabel: null,
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
    "A tight set of systems and product surfaces: automation, platforms, and interfaces with intent.",
} as const;

export type Project = (typeof site.projects)[number];

export function projectHref(project: { links: { live: string | null; repo: string | null } }) {
  return project.links.live || project.links.repo || null;
}
