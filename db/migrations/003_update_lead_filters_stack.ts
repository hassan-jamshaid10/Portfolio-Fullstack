import { type Kysely, sql } from "kysely";

const LEAD_FILTERS_JSON = JSON.stringify({
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
    "TypeScript",
    "JavaScript",
    "Python",
    "Java",
    "SQL",
    "Next.js",
    "React.js",
    "Vue 3",
    "React Native",
    "Tailwind CSS",
    "Spring Boot",
    "Node.js",
    "FastAPI",
    "tRPC",
    "Express.js",
    "PostgreSQL",
    "BigQuery",
    "MongoDB",
    "MySQL",
    "Kysely",
    "Supabase",
    "Agentic RAG",
    "LangChain",
    "LlamaIndex",
    "DSPy",
    "ChromaDB",
    "SaaS",
    "Remote",
  ],
  dailyCap: 15,
  minFitScore: 50,
}).replace(/'/g, "''");

export async function up(db: Kysely<unknown>): Promise<void> {
  await sql
    .raw(
      `
    INSERT INTO crm_settings (key, value, updated_at)
    VALUES (
      'lead_filters',
      '${LEAD_FILTERS_JSON}'::jsonb,
      now()
    )
    ON CONFLICT (key) DO UPDATE
    SET value = EXCLUDED.value,
        updated_at = now()
  `,
    )
    .execute(db);
}

export async function down(db: Kysely<unknown>): Promise<void> {
  await sql`
    INSERT INTO crm_settings (key, value, updated_at)
    VALUES (
      'lead_filters',
      '{"titles":["Software Engineer","Full Stack Engineer","Full Stack Developer","Backend Engineer","Frontend Engineer"],"locations":["Remote","Pakistan","Lahore"],"keywords":["Next.js","TypeScript","React","Node.js"],"dailyCap":10,"minFitScore":55}'::jsonb,
      now()
    )
    ON CONFLICT (key) DO UPDATE
    SET value = EXCLUDED.value,
        updated_at = now()
  `.execute(db);
}
