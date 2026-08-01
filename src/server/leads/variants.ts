import { masterResume } from "@/content/resume";

export function buildCoverDraft(input: {
  company: string;
  role: string;
  notes?: string | null;
}) {
  return [
    `Hi ${input.company} team,`,
    "",
    `I'm ${masterResume.fullName}, a ${masterResume.title} based in ${masterResume.location}. I'm interested in the ${input.role} role at ${input.company}.`,
    "",
    "Recently I've shipped multi-tenant SaaS work across Next.js/tRPC (Ecom Central) and Spring Boot/Vue (Jessica Nelson), plus AI systems with Agentic RAG.",
    input.notes ? "" : "",
    input.notes ? `Notes: ${input.notes}` : "",
    "",
    "Happy to share more detail or jump on a quick call.",
    "",
    "Best,",
    masterResume.fullName,
    masterResume.email,
    masterResume.links.website,
  ]
    .filter((line, index, arr) => !(line === "" && arr[index - 1] === ""))
    .join("\n");
}

export function buildResumeVariant(input: {
  company: string;
  role: string;
}) {
  const roleLower = input.role.toLowerCase();
  const emphasizeAi =
    roleLower.includes("ai") ||
    roleLower.includes("ml") ||
    roleLower.includes("llm");
  const emphasizeBackend =
    roleLower.includes("backend") || roleLower.includes("platform");

  const skillBlock = emphasizeAi
    ? [
        ...masterResume.skills.ai,
        ...masterResume.skills.backend.slice(0, 3),
        ...masterResume.skills.frontend.slice(0, 2),
      ]
    : emphasizeBackend
      ? [
          ...masterResume.skills.backend,
          ...masterResume.skills.data.slice(0, 4),
          "TypeScript",
        ]
      : [
          ...masterResume.skills.frontend.slice(0, 4),
          ...masterResume.skills.backend.slice(0, 3),
          ...masterResume.skills.data.slice(0, 3),
        ];

  const projectOrder = [...masterResume.projects].sort((a, b) => {
    const aHit = a.stack.some((s) => roleLower.includes(s.toLowerCase()))
      ? 1
      : 0;
    const bHit = b.stack.some((s) => roleLower.includes(s.toLowerCase()))
      ? 1
      : 0;
    return bHit - aHit;
  });

  const content = [
    `${masterResume.fullName}`,
    `${masterResume.title}`,
    `${masterResume.email} | ${masterResume.phone} | ${masterResume.location}`,
    `${masterResume.links.website} | ${masterResume.links.linkedin}`,
    "",
    "SUMMARY",
    `${masterResume.summary} Tailored interest: ${input.role} at ${input.company}.`,
    "",
    "SKILLS (emphasized)",
    skillBlock.join(" | "),
    "",
    "EXPERIENCE",
    ...masterResume.experience.flatMap((job) => [
      `${job.role} | ${job.company} | ${job.period}`,
      ...job.bullets.map((b) => `- ${b}`),
      "",
    ]),
    "PROJECTS",
    ...projectOrder.flatMap((project) => [
      `${project.name} (${project.stack.join(", ")})`,
      `- ${project.summary}`,
      "",
    ]),
  ].join("\n");

  return {
    title: `${input.role} @ ${input.company}`,
    content,
    highlights: skillBlock,
  };
}
