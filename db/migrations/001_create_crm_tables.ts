import { type Kysely, sql } from "kysely";

/**
 * Isolated CRM tables only. Do not reference or alter any existing schema.
 */
export async function up(db: Kysely<unknown>): Promise<void> {
  await db.schema
    .createTable("crm_leads")
    .ifNotExists()
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`),
    )
    .addColumn("company", "text", (col) => col.notNull())
    .addColumn("role", "text", (col) => col.notNull())
    .addColumn("url", "text")
    .addColumn("source", "text", (col) => col.notNull().defaultTo("apollo"))
    .addColumn("location", "text")
    .addColumn("fit_score", "integer", (col) => col.notNull().defaultTo(0))
    .addColumn("status", "text", (col) => col.notNull().defaultTo("new"))
    .addColumn("notes", "text")
    .addColumn("raw", "jsonb")
    .addColumn("created_at", "timestamptz", (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .addColumn("updated_at", "timestamptz", (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .execute();

  await db.schema
    .createIndex("crm_leads_status_idx")
    .ifNotExists()
    .on("crm_leads")
    .column("status")
    .execute();

  await db.schema
    .createIndex("crm_leads_company_role_idx")
    .ifNotExists()
    .on("crm_leads")
    .columns(["company", "role"])
    .execute();

  await db.schema
    .createTable("crm_resume_variants")
    .ifNotExists()
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`),
    )
    .addColumn("lead_id", "uuid", (col) => col.notNull())
    .addColumn("title", "text", (col) => col.notNull())
    .addColumn("content", "text", (col) => col.notNull())
    .addColumn("highlights", "jsonb")
    .addColumn("created_at", "timestamptz", (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .execute();

  await db.schema
    .createIndex("crm_resume_variants_lead_idx")
    .ifNotExists()
    .on("crm_resume_variants")
    .column("lead_id")
    .execute();

  await db.schema
    .createTable("crm_applications")
    .ifNotExists()
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`),
    )
    .addColumn("lead_id", "uuid", (col) => col.notNull())
    .addColumn("channel", "text", (col) => col.notNull().defaultTo("gmail"))
    .addColumn("cover_draft", "text")
    .addColumn("result", "text")
    .addColumn("error", "text")
    .addColumn("sent_at", "timestamptz")
    .addColumn("created_at", "timestamptz", (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .execute();

  await db.schema
    .createIndex("crm_applications_lead_idx")
    .ifNotExists()
    .on("crm_applications")
    .column("lead_id")
    .execute();

  await db.schema
    .createTable("crm_daily_runs")
    .ifNotExists()
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`),
    )
    .addColumn("started_at", "timestamptz", (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .addColumn("finished_at", "timestamptz")
    .addColumn("leads_found", "integer", (col) => col.notNull().defaultTo(0))
    .addColumn("leads_inserted", "integer", (col) => col.notNull().defaultTo(0))
    .addColumn("errors", "text")
    .addColumn("summary", "text")
    .execute();

  await db.schema
    .createTable("crm_settings")
    .ifNotExists()
    .addColumn("key", "text", (col) => col.primaryKey())
    .addColumn("value", "jsonb", (col) => col.notNull())
    .addColumn("updated_at", "timestamptz", (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .execute();

  await sql`
    INSERT INTO crm_settings (key, value, updated_at)
    VALUES (
      'lead_filters',
      '{"titles":["Software Engineer","Full Stack Engineer","Full Stack Developer","Backend Engineer","Frontend Engineer"],"locations":["Remote","Pakistan","Lahore"],"keywords":["Next.js","TypeScript","React","Node.js"],"dailyCap":10,"minFitScore":55}'::jsonb,
      now()
    )
    ON CONFLICT (key) DO NOTHING
  `.execute(db);
}

export async function down(db: Kysely<unknown>): Promise<void> {
  await db.schema.dropTable("crm_applications").ifExists().execute();
  await db.schema.dropTable("crm_resume_variants").ifExists().execute();
  await db.schema.dropTable("crm_daily_runs").ifExists().execute();
  await db.schema.dropTable("crm_settings").ifExists().execute();
  await db.schema.dropTable("crm_leads").ifExists().execute();
}
