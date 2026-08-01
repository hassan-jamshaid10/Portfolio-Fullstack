import { getSession } from "@/server/auth/session";
import { getDb } from "@/server/db";

export async function createTRPCContext() {
  const session = await getSession();
  return {
    db: getDb(),
    session,
  };
}

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;
