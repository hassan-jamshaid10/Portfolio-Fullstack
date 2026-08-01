import { type Kysely, sql } from "kysely";

export async function up(db: Kysely<unknown>): Promise<void> {
  await sql`
    ALTER TABLE crm_leads
    ADD COLUMN IF NOT EXISTS contact_phone text
  `.execute(db);
}

export async function down(db: Kysely<unknown>): Promise<void> {
  await sql`
    ALTER TABLE crm_leads
    DROP COLUMN IF EXISTS contact_phone
  `.execute(db);
}
