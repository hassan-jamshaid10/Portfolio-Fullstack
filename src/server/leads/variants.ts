import { masterResume } from "@/content/resume";

const STACK_HINTS = [
  "TypeScript",
  "JavaScript",
  "Next.js",
  "React",
  "Vue",
  "Node.js",
  "Spring Boot",
  "FastAPI",
  "tRPC",
  "PostgreSQL",
  "BigQuery",
  "Agentic RAG",
  "LangChain",
  "SaaS",
] as const;

function pickStackHints(text?: string | null) {
  if (!text) return [] as string[];
  const haystack = text.toLowerCase();
  return STACK_HINTS.filter((term) =>
    haystack.includes(term.toLowerCase()),
  ).slice(0, 4);
}

/**
 * Clean application email body. Resume is attached separately as PDF.
 */
export function buildCoverDraft(input: {
  company: string;
  role: string;
  notes?: string | null;
}) {
  const company = input.company.trim();
  const role = input.role.trim();
  const stack = pickStackHints(input.notes);
  const stackLine = stack.length
    ? `My recent work focuses on ${stack.join(", ")}, which looks closely aligned with this role.`
    : "My recent work focuses on TypeScript, Next.js/tRPC, Spring Boot, and production SaaS systems.";

  return [
    `Hi ${company} hiring team,`,
    "",
    `I'm ${masterResume.fullName}, a ${masterResume.title} based in ${masterResume.location}. I'm writing to apply for the ${role} role at ${company}.`,
    "",
    masterResume.summary,
    "",
    stackLine,
    "",
    "Highlights:",
    `- ${masterResume.experience[0]?.bullets[0] ?? "Shipping multi-tenant SaaS in production."}`,
    `- ${masterResume.experience[1]?.bullets[0] ?? "Integrations across marketplaces, warehousing, and data pipelines."}`,
    `- Portfolio: ${masterResume.links.website}`,
    "",
    "I've attached my resume (PDF) for your review. Happy to share more detail or jump on a quick call.",
    "",
    "Best regards,",
    masterResume.fullName,
    masterResume.email,
    masterResume.phone,
    masterResume.links.website,
    masterResume.links.linkedin,
  ].join("\n");
}
