import "./load-env";
import { Migrator, type Migration } from "kysely/migration";
import { getDb } from "../src/server/db";
import * as migration001 from "./migrations/001_create_crm_tables";
import * as migration002 from "./migrations/002_add_lead_contact_email";
import * as migration003 from "./migrations/003_update_lead_filters_stack";

async function main() {
  const db = getDb();

  const migrations: Record<string, Migration> = {
    "001_create_crm_tables": migration001,
    "002_add_lead_contact_email": migration002,
    "003_update_lead_filters_stack": migration003,
  };

  const migrator = new Migrator({
    db,
    // Isolated from any existing Kysely migration history in this database.
    migrationTableName: "crm_kysely_migration",
    migrationLockTableName: "crm_kysely_migration_lock",
    provider: {
      getMigrations: async () => migrations,
    },
  });

  const { error, results } = await migrator.migrateToLatest();

  results?.forEach((result) => {
    if (result.status === "Success") {
      console.log(`Migration "${result.migrationName}" executed successfully`);
    } else if (result.status === "Error") {
      console.error(`Failed to execute migration "${result.migrationName}"`);
    }
  });

  if (error) {
    console.error("Migration failed");
    console.error(error);
    process.exit(1);
  }

  await db.destroy();
  console.log("Migrations complete");
}

main();
