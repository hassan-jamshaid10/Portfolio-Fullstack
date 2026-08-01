import { getDb } from "@/server/db";
import { composioExecute } from "@/server/composio/client";
import { scoreLead } from "@/server/leads/score";
import { buildCoverDraft, buildResumeVariant } from "@/server/leads/variants";

type IncomingLead = {
  company: string;
  role: string;
  url?: string | null;
  location?: string | null;
  description?: string | null;
  contactEmail?: string | null;
  source?: string;
};

type LeadFilters = {
  titles?: string[];
  locations?: string[];
  keywords?: string[];
  dailyCap?: number;
  minFitScore?: number;
};

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object"
    ? (value as Record<string, unknown>)
    : null;
}

function pickString(...values: unknown[]) {
  for (const value of values) {
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return null;
}

function normalizeJobs(payload: unknown): IncomingLead[] {
  const root = asRecord(payload) ?? {};
  const data = asRecord(root.data) ?? root;
  const candidates = [
    data.jobs,
    data.results,
    data.organizations,
    data.people,
    root.jobs,
    root.results,
  ];

  const list = candidates.find((item) => Array.isArray(item)) as
    | unknown[]
    | undefined;

  if (!list?.length) return [];

  const normalized: IncomingLead[] = [];

  for (const item of list) {
    const row = asRecord(item) ?? {};
    const org = asRecord(row.organization) ?? asRecord(row.company) ?? {};
    const company = pickString(
      row.company,
      row.company_name,
      org.name,
      row.organization_name,
    );
    const role = pickString(
      row.role,
      row.title,
      row.job_title,
      row.position,
      row.name,
    );
    if (!company || !role) continue;

    normalized.push({
      company,
      role,
      url: pickString(
        row.url,
        row.apply_url,
        row.job_url,
        row.linkedin_url,
        row.website_url,
      ),
      location: pickString(
        row.location,
        row.city,
        row.raw_address,
        row.present_raw_address,
      ),
      description: pickString(
        row.description,
        row.snippet,
        row.seo_description,
        row.headline,
      ),
      contactEmail: pickString(
        row.email,
        row.contact_email,
        row.apply_email,
        row.recruiter_email,
        org.email,
      ),
      source: "apollo",
    });
  }

  return normalized;
}

async function getFilters(): Promise<LeadFilters> {
  const db = getDb();
  const row = await db
    .selectFrom("crm_settings")
    .selectAll()
    .where("key", "=", "lead_filters")
    .executeTakeFirst();

  return (row?.value as LeadFilters) ?? { dailyCap: 10, minFitScore: 55 };
}

async function fetchApolloLeads(filters: LeadFilters): Promise<IncomingLead[]> {
  const titles = filters.titles ?? [
    "Software Engineer",
    "Full Stack Engineer",
    "Full Stack Developer",
  ];
  const locations = filters.locations ?? ["Remote"];
  const keywords = filters.keywords ?? ["TypeScript", "Next.js", "React"];
  const limit = filters.dailyCap ?? 10;

  const attempts = [
    {
      action: "APOLLO_SEARCH_JOBS",
      params: { titles, locations, keywords, limit },
    },
    {
      action: "APOLLO_ORGANIZATIONS_SEARCH",
      params: {
        q_organization_keyword_tags: keywords,
        organization_locations: locations,
        page: 1,
        per_page: limit,
      },
    },
    {
      action: "APOLLO_PEOPLE_SEARCH",
      params: {
        person_titles: ["Recruiter", "Talent Acquisition", "Hiring Manager"],
        q_keywords: keywords.join(" "),
        person_locations: locations,
        page: 1,
        per_page: limit,
      },
    },
  ];

  const collected: IncomingLead[] = [];
  const errors: string[] = [];

  for (const attempt of attempts) {
    try {
      const result = await composioExecute({
        action: attempt.action,
        params: attempt.params,
      });
      const jobs = normalizeJobs(result.data).map((job) => ({
        ...job,
        source: result.mock ? "mock" : "apollo",
      }));
      collected.push(...jobs);
      if (collected.length >= limit) break;
    } catch (error) {
      errors.push(
        `${attempt.action}: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  if (!collected.length && errors.length) {
    // Fall back to mock generator so cron still produces approvable leads.
    const mock = await composioExecute({
      action: "APOLLO_SEARCH_JOBS",
      params: { titles, locations, keywords, limit },
    });
    // Force mock path by clearing key temporarily is overkill; use local mock shape.
    if (!process.env.COMPOSIO_API_KEY) {
      return normalizeJobs(mock.data);
    }
    throw new Error(errors.join(" | "));
  }

  if (!collected.length) {
    const mock = getLocalMockLeads();
    return mock;
  }

  return collected;
}

function getLocalMockLeads(): IncomingLead[] {
  return [
    {
      company: "Northwind Labs",
      role: "Full Stack Engineer",
      url: "https://example.com/jobs/full-stack",
      location: "Remote",
      contactEmail: "careers@northwindlabs.example",
      description:
        "Build Next.js and TypeScript SaaS features with Node APIs and PostgreSQL.",
      source: "mock",
    },
    {
      company: "Cedar Systems",
      role: "Software Engineer",
      url: "https://example.com/jobs/software-engineer",
      location: "Remote",
      contactEmail: "jobs@cedarsystems.example",
      description:
        "Own backend services in Node/FastAPI and ship React frontends for B2B SaaS.",
      source: "mock",
    },
    {
      company: "Orbit Commerce",
      role: "Frontend Engineer",
      url: "https://example.com/jobs/frontend",
      location: "Remote",
      contactEmail: "hiring@orbitcommerce.example",
      description:
        "React and Next.js product UI for e-commerce operations tooling.",
      source: "mock",
    },
  ];
}

export async function runDailyLeadIntake() {
  const db = getDb();
  const filters = await getFilters();
  const dailyCap = filters.dailyCap ?? 10;
  const minFitScore = filters.minFitScore ?? 55;

  const run = await db
    .insertInto("crm_daily_runs")
    .values({
      started_at: new Date(),
      leads_found: 0,
      leads_inserted: 0,
    })
    .returningAll()
    .executeTakeFirstOrThrow();

  const errors: string[] = [];
  let inserted = 0;

  try {
    const incoming = await fetchApolloLeads(filters);
    const scored = incoming
      .map((lead) => ({
        ...lead,
        fit_score: scoreLead(lead),
      }))
      .filter((lead) => lead.fit_score >= minFitScore)
      .sort((a, b) => b.fit_score - a.fit_score)
      .slice(0, dailyCap);

    for (const lead of scored) {
      const existing = await db
        .selectFrom("crm_leads")
        .select(["id"])
        .where("company", "=", lead.company)
        .where("role", "=", lead.role)
        .executeTakeFirst();

      if (existing) continue;

      const variant = buildResumeVariant({
        company: lead.company,
        role: lead.role,
      });
      const cover = buildCoverDraft({
        company: lead.company,
        role: lead.role,
        notes: lead.description,
      });

      const created = await db
        .insertInto("crm_leads")
        .values({
          company: lead.company,
          role: lead.role,
          url: lead.url ?? null,
          source: lead.source ?? "apollo",
          location: lead.location ?? null,
          contact_email: lead.contactEmail ?? null,
          fit_score: lead.fit_score,
          status: "ready",
          notes: lead.description ?? null,
          raw: lead,
        })
        .returningAll()
        .executeTakeFirstOrThrow();

      await db
        .insertInto("crm_resume_variants")
        .values({
          lead_id: created.id,
          title: variant.title,
          content: variant.content,
          highlights: variant.highlights,
        })
        .execute();

      await db
        .insertInto("crm_applications")
        .values({
          lead_id: created.id,
          channel: "gmail",
          cover_draft: cover,
        })
        .execute();

      inserted += 1;
    }

    const summary = `Auto-intake complete: found ${incoming.length}, prepared ${inserted} ready-to-approve applications (min score ${minFitScore}, cap ${dailyCap}).`;

    await db
      .updateTable("crm_daily_runs")
      .set({
        finished_at: new Date(),
        leads_found: incoming.length,
        leads_inserted: inserted,
        summary,
        errors: errors.length ? errors.join("\n") : null,
      })
      .where("id", "=", run.id)
      .execute();

    try {
      await composioExecute({
        action: "SLACK_SEND_MESSAGE",
        params: {
          text: `Hassan CRM: ${summary}\nOpen /crm and approve leads to send.`,
          channel: process.env.SLACK_CRM_CHANNEL ?? "crm-leads",
        },
      });
    } catch (error) {
      errors.push(
        `slack: ${error instanceof Error ? error.message : String(error)}`,
      );
      await db
        .updateTable("crm_daily_runs")
        .set({ errors: errors.join("\n") })
        .where("id", "=", run.id)
        .execute();
    }

    return {
      runId: run.id,
      leadsFound: incoming.length,
      leadsInserted: inserted,
      summary,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    errors.push(message);

    await db
      .updateTable("crm_daily_runs")
      .set({
        finished_at: new Date(),
        errors: errors.join("\n"),
        summary: "Daily intake failed",
      })
      .where("id", "=", run.id)
      .execute();

    throw error;
  }
}
