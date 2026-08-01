import { z } from "zod";
import { runDailyLeadIntake } from "@/server/leads/intake";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const runsRouter = createTRPCRouter({
  list: protectedProcedure
    .input(z.object({ limit: z.number().min(1).max(50).default(20) }).optional())
    .query(async ({ ctx, input }) => {
      return ctx.db
        .selectFrom("crm_daily_runs")
        .selectAll()
        .orderBy("started_at", "desc")
        .limit(input?.limit ?? 20)
        .execute();
    }),

  trigger: protectedProcedure.mutation(async () => {
    return runDailyLeadIntake();
  }),
});
