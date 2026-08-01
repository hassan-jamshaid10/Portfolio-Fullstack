import { defaultLeadFilters } from "@/content/leadFilters";
import { getDb } from "@/server/db";
import { jsonb } from "@/server/db/json";
import { composioNotifySafe } from "@/server/composio/client";
import { hasApplyPath, resolveApplyMode } from "@/server/leads/emails";
import { fetchOrganicLeads } from "@/server/leads/sources";
import { scoreLead } from "@/server/leads/score";
import { buildCoverDraft, buildResumeVariant } from "@/server/leads/variants";

function sanitizeNotes(description?: string | null) {
  if (!description) return null;
  return description
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 1500);
}

type LeadFilters = {
  titles?: string[];
  locations?: string[];
  keywords?: string[];
  dailyCap?: number;
  minFitScore?: number;
};

async function getFilters(): Promise<LeadFilters> {
  const db = getDb();
  const row = await db
    .selectFrom("crm_settings")
    .selectAll()
    .where("key", "=", "lead_filters")
    .executeTakeFirst();

  if (!row?.value) {
    return {
      titles: [...defaultLeadFilters.titles],
      locations: [...defaultLeadFilters.locations],
      keywords: [...defaultLeadFilters.keywords],
      dailyCap: defaultLeadFilters.dailyCap,
      minFitScore: defaultLeadFilters.minFitScore,
    };
  }

  const stored = row.value as LeadFilters;
  return {
    dailyCap: stored.dailyCap ?? defaultLeadFilters.dailyCap,
    minFitScore: stored.minFitScore ?? defaultLeadFilters.minFitScore,
    titles: stored.titles?.length
      ? stored.titles
      : [...defaultLeadFilters.titles],
    locations: stored.locations?.length
      ? stored.locations
      : [...defaultLeadFilters.locations],
    keywords: stored.keywords?.length
      ? stored.keywords
      : [...defaultLeadFilters.keywords],
  };
}

export async function runDailyLeadIntake() {
  const db = getDb();
  const filters = await getFilters();
  const dailyCap = filters.dailyCap ?? defaultLeadFilters.dailyCap;
  const minFitScore = filters.minFitScore ?? defaultLeadFilters.minFitScore;

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
    const {
      leads: incoming,
      errors: sourceErrors,
      sourceBreakdown,
    } = await fetchOrganicLeads(filters);
    errors.push(...sourceErrors);

    const scored = incoming
      .map((lead) => ({
        ...lead,
        fit_score: scoreLead({
          role: lead.role,
          company: lead.company,
          location: lead.location,
          description: lead.description,
          url: lead.url,
          linkedinUrl: lead.linkedinUrl,
          contactEmail: lead.contactEmail,
          source: lead.source,
        }),
        applyMode: resolveApplyMode(lead),
      }))
      .filter((lead) => lead.fit_score >= minFitScore && hasApplyPath(lead))
      .sort((a, b) => {
        // Prefer email-ready leads first.
        if (Boolean(b.contactEmail) !== Boolean(a.contactEmail)) {
          return a.contactEmail ? -1 : 1;
        }
        return b.fit_score - a.fit_score;
      })
      .slice(0, dailyCap);

    let emailReady = 0;
    let formReady = 0;

    for (const lead of scored) {
      const existing = await db
        .selectFrom("crm_leads")
        .select(["id"])
        .where("company", "=", lead.company)
        .where("role", "=", lead.role)
        .executeTakeFirst();

      if (existing) continue;

      const notes = sanitizeNotes(lead.description);
      const variant = buildResumeVariant({
        company: lead.company,
        role: lead.role,
      });
      const cover = buildCoverDraft({
        company: lead.company,
        role: lead.role,
        notes,
      });

      const created = await db
        .insertInto("crm_leads")
        .values({
          company: lead.company,
          role: lead.role,
          url: lead.url ?? null,
          source: lead.source,
          location: lead.location ?? null,
          contact_email: lead.contactEmail ?? null,
          fit_score: lead.fit_score,
          status: "ready",
          notes,
          raw: jsonb({
            company: lead.company,
            role: lead.role,
            url: lead.url ?? null,
            linkedinUrl: lead.linkedinUrl ?? null,
            location: lead.location ?? null,
            source: lead.source,
            contactEmail: lead.contactEmail ?? null,
            contactName: lead.contactName ?? null,
            applyMode: lead.applyMode,
            fit_score: lead.fit_score,
            description: notes,
          }),
        })
        .returningAll()
        .executeTakeFirstOrThrow();

      await db
        .insertInto("crm_resume_variants")
        .values({
          lead_id: created.id,
          title: variant.title,
          content: variant.content,
          highlights: jsonb(variant.highlights),
        })
        .execute();

      await db
        .insertInto("crm_applications")
        .values({
          lead_id: created.id,
          channel: lead.contactEmail ? "gmail" : "manual",
          cover_draft: cover,
        })
        .execute();

      if (lead.contactEmail) emailReady += 1;
      else formReady += 1;
      inserted += 1;
    }

    const breakdownText = sourceBreakdown
      .map((row) => `${row.source}:${row.count}`)
      .join(", ");
    const summary = `Organic intake: found ${incoming.length}, prepared ${inserted} actionable leads (${emailReady} email, ${formReady} form). By source: ${breakdownText || "none"}.`;

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

    await composioNotifySafe({
      action: "SLACK_SEND_MESSAGE",
      params: {
        text: `Hassan CRM: ${summary}\nOpen /crm and approve leads to send.`,
        channel: process.env.SLACK_CRM_CHANNEL ?? "crm-leads",
      },
    });

    return {
      runId: run.id,
      leadsFound: incoming.length,
      leadsInserted: inserted,
      summary,
      errors,
      sourceBreakdown,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    errors.push(message);

    await db
      .updateTable("crm_daily_runs")
      .set({
        finished_at: new Date(),
        errors: errors.join("\n"),
        summary: "Daily intake failed (no fake leads inserted)",
      })
      .where("id", "=", run.id)
      .execute();

    throw error;
  }
}
