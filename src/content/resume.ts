/**
 * Master resume facts for variant generation. Do not invent beyond this.
 */
export const masterResume = {
  fullName: "Hassan Jamshaid",
  title: "Software Engineer | Full-Stack",
  email: "hjamshaid81@gmail.com",
  phone: "+92-312-4384133",
  location: "Lahore, Pakistan",
  links: {
    website: "https://hassanjamshaid.tech",
    linkedin: "https://www.linkedin.com/in/hassanjamshaid10",
    github: "https://github.com/hassan-jamshaid10",
  },
  summary:
    "Full-stack Software Engineer building production multi-tenant SaaS platforms. Experience across Next.js/tRPC, Spring Boot/Vue, FastAPI, PostgreSQL/BigQuery, and Agentic RAG systems.",
  skills: {
    languages: ["TypeScript", "JavaScript", "Python", "Java", "SQL"],
    frontend: ["Next.js", "React.js", "Vue 3", "React Native", "Tailwind CSS"],
    backend: ["Spring Boot", "Node.js", "FastAPI", "tRPC", "Express.js"],
    data: ["PostgreSQL", "BigQuery", "MongoDB", "MySQL", "Kysely", "Supabase"],
    ai: ["Agentic RAG", "LangChain", "LlamaIndex", "DSPy", "ChromaDB"],
  },
  experience: [
    {
      role: "Associate Software Engineer",
      company: "Liffey Logics",
      period: "Jun 2026 to Present",
      bullets: [
        "Building Jessica Nelson CRM and procurement workflows on Spring Boot and Vue 3.",
        "Client email templates, SMTP integration, and Lead to Bid to Project pipeline.",
      ],
    },
    {
      role: "Junior Software Developer",
      company: "Dataropes.ai",
      period: "Nov 2025 to May 2026",
      bullets: [
        "Owned Ecom Central warehousing and marketplace integrations (Amazon FBA/FBM, ShipHero, BigQuery).",
        "Shipped Next.js 15 / tRPC / PostgreSQL / Kysely multi-tenant surfaces.",
      ],
    },
    {
      role: "Full-Stack Intern",
      company: "NetSol Technologies",
      period: "Jul 2024 to Sep 2024",
      bullets: [
        "Built React and Spring Boot features with REST API integrations in enterprise sprints.",
      ],
    },
  ],
  projects: [
    {
      name: "Ecom Central",
      stack: ["Next.js", "tRPC", "PostgreSQL", "BigQuery"],
      summary:
        "E-commerce operations platform with Amazon and ShipHero integrations and full warehousing module.",
    },
    {
      name: "Jessica Nelson",
      stack: ["Spring Boot", "Vue 3", "PostgreSQL"],
      summary:
        "Interior design business platform with CRM and procurement workspaces.",
    },
    {
      name: "Sporttek",
      stack: ["React Native", "FastAPI"],
      summary:
        "Turf booking platform connecting players and owners for schedules and payments.",
    },
    {
      name: "Launch Pulse",
      stack: ["Next.js", "FastAPI", "Agentic RAG"],
      summary:
        "AI business idea evaluation SaaS with dual-LLM pipeline and RAGAS grounding.",
    },
  ],
} as const;
