import "./load-env";
import { sql } from "kysely";
import { getDb } from "../src/server/db";

async function main() {
  const db = getDb();
  const migrations = await sql<{ name: string }>`
    select name from crm_kysely_migration order by name
  `.execute(db);
  const columns = await sql<{ column_name: string }>`
    select column_name
    from information_schema.columns
    where table_name = 'crm_leads'
    order by ordinal_position
  `.execute(db);

  console.log("migrations:", migrations.rows.map((r) => r.name));
  console.log(
    "crm_leads columns:",
    columns.rows.map((r) => r.column_name),
  );
  await db.destroy();
}

main();
