import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";
import type { Database } from "./types";

const globalForDb = globalThis as unknown as {
  crmDb?: Kysely<Database>;
};

function createDb() {
  const raw = process.env.DATABASE_URL;
  if (!raw) {
    throw new Error("DATABASE_URL is not set");
  }

  // Normalize Supabase pooler URLs for node-pg SSL behavior.
  const connectionString = raw
    .replace(/[?&]sslmode=[^&]*/g, "")
    .replace(/\?&/, "?")
    .replace(/[?&]$/, "");

  const isLocal =
    connectionString.includes("localhost") ||
    connectionString.includes("127.0.0.1");

  return new Kysely<Database>({
    dialect: new PostgresDialect({
      pool: new Pool({
        connectionString,
        ssl: isLocal ? false : { rejectUnauthorized: false },
        max: 10,
      }),
    }),
  });
}

export function getDb() {
  if (!globalForDb.crmDb) {
    globalForDb.crmDb = createDb();
  }
  return globalForDb.crmDb;
}

export type { Database } from "./types";
