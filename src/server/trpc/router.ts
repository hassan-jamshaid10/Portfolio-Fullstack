import { createTRPCRouter } from "./trpc";
import { authRouter } from "./routers/auth";
import { leadsRouter } from "./routers/leads";
import { runsRouter } from "./routers/runs";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  leads: leadsRouter,
  runs: runsRouter,
});

export type AppRouter = typeof appRouter;
