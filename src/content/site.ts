/**
 * Portfolio content sourced from Hassan Jamshaid's resume.
 */
export const site = {
  name: "Hassan Jamshaid",
  fullName: "Hassan Jamshaid",
  firstName: "Hassan",
  lastName: "Jamshaid",
  role: "Software Engineer | Full-Stack",
  location: "Lahore, Pakistan | Remote",
  availability: "Open to remote roles & freelance",
  email: "hjamshaid81@gmail.com",
  phone: "+92-312-4384133",
  website: "https://hassanjamshaid.tech",
  resumeUrl: "/Hassan_Jamshaid_Resume.pdf",
  social: {
    linkedin: "https://www.linkedin.com/in/hassanjamshaid10",
    github: "https://github.com/hassan-jamshaid10",
  },
  hero: {
    headline: "I ship multi-tenant SaaS that scales.",
    support:
      "Full-stack engineer for e-commerce ops, CRM, and AI platforms. Next.js, Spring Boot, FastAPI, and typed APIs in production.",
  },
  about: {
    title: "Full-stack engineer. Production SaaS.",
    body: "I build multi-tenant platforms end to end: third-party integrations (Amazon FBA/FBM, ShipHero, DataChannel, BigQuery), warehousing and procurement modules, and CRM workflows. Strong across Next.js and Vue on the frontend; Spring Boot, Node.js, FastAPI, and tRPC on the backend, with hands-on Agentic RAG experience. AWS Cloud Foundations certified.",
    highlights: [
      "Liffey Logics | Associate Software Engineer",
      "Dataropes.ai | Ecom Central (Nov 2025 to May 2026)",
      "Next.js | tRPC | Spring Boot | FastAPI",
      "Agentic RAG | LangChain | LlamaIndex",
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
      role: "Associate Software Engineer",
      company: "Liffey Logics",
      period: "Jun 2026 to Present",
      location: "Lahore, Pakistan",
      summary:
        "Building the Jessica Nelson interior design business management platform: CRM, procurement, and client workflows.",
      bullets: [
        "Lead development on Jessica Nelson: CRM covering lead management, bids and bid history, and client communications for the Lead to Bid to Project to Procurement to Invoice workflow.",
        "Built a client email-template system integrated with SMTP settings and the client response portal.",
        "Developing the procurement module: workspaces that snapshot project rooms and allowance line items into procurement sheets, with vendor/catalogue management and line-item status tracking.",
      ],
    },
    {
      role: "Junior Software Developer",
      company: "Dataropes.ai",
      period: "Nov 2025 to May 2026",
      location: "Lahore, Pakistan",
      summary:
        "Multi-tenant SaaS for e-commerce operations. Owned Ecom Central warehousing, marketplace, and analytics integrations.",
      bullets: [
        "Built Ecom Central end to end: inbound shipments, inventory movements, receiving, packaging, shipping labels, and purchase-shipment workflows.",
        "Integrated Amazon FBA/FBM, ShipHero, DataChannel, and BigQuery for cross-entity inventory and sales analytics.",
        "Shipped production Next.js/tRPC surfaces with PostgreSQL, Kysely, and multi-tenant data flows.",
      ],
    },
    {
      role: "Full-Stack Intern",
      company: "NetSol Technologies",
      period: "Jul 2024 to Sep 2024",
      location: "Lahore, Pakistan",
      summary:
        "Enterprise product engineering within sprint cycles and code-review workflows.",
      bullets: [
        "Built frontend and backend features with React and Spring Boot.",
        "Integrated REST APIs across application layers in an enterprise codebase.",
      ],
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
      href: "#contact",
    },
    {
      id: "02",
      title: "Jessica Nelson",
      company: "Liffey Logics",
      tags: ["Spring Boot", "Vue 3", "PostgreSQL", "CRM"],
      summary:
        "Interior design business management platform at Liffey Logics. Built CRM for Lead to Bid to Project to Procurement to Invoice, client email templates with SMTP and response portal, plus procurement workspaces with vendor catalogues and line-item tracking.",
      href: "#contact",
    },
    {
      id: "03",
      title: "Sporttek",
      company: "Personal",
      tags: ["React Native", "FastAPI", "Bookings", "Payments"],
      summary:
        "Online booking platform that connects players with turf owners. Players discover, compare, and instantly book facilities; owners manage schedules, bookings, and payments. Built on React Native and FastAPI.",
      href: "#contact",
    },
    {
      id: "04",
      title: "Launch Pulse",
      company: "FYP",
      tags: ["Next.js", "tRPC", "FastAPI", "React Native", "Agentic RAG"],
      summary:
        "AI business idea evaluation and market simulation SaaS (FYP). Agentic RAG across 8 live channels, dual-LLM pipeline with RAGAS grounding, deployed as microservices on Vercel and Render with a React Native client.",
      href: "#contact",
    },
    {
      id: "05",
      title: "Codebase AI",
      company: "Personal",
      tags: ["FastAPI", "LangChain", "RAG", "ChromaDB", "React"],
      summary:
        "RAG tool that loads any repository, chunks and embeds the code, and answers natural-language questions about the codebase via LangChain and ChromaDB.",
      href: "https://github.com/hassan-jamshaid10",
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
      items: [
        "PostgreSQL",
        "BigQuery",
        "MongoDB",
        "MySQL",
        "Kysely",
        "Supabase",
        "pgvector",
      ],
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
  contact: {
    title: "Have a role, a product, or a hard problem?",
    body: "Open to remote engineering roles and selective freelance. Building SaaS, AI systems, or ops platforms? Let's talk.",
  },
} as const;
