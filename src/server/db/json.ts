import { sql, type RawBuilder } from "kysely";

/** Bind a JS value as Postgres jsonb (avoids pg array/`[object Object]` bugs). */
export function jsonb(value: unknown): RawBuilder<unknown> {
  return sql`${JSON.stringify(value ?? null)}::jsonb`;
}
