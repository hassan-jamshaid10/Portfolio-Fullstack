import { z } from "zod";
import { TRPCError } from "@trpc/server";
import {
  createSession,
  destroySession,
  verifyCrmPassword,
} from "@/server/auth/session";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const authRouter = createTRPCRouter({
  me: publicProcedure.query(({ ctx }) => ({
    authenticated: Boolean(ctx.session),
  })),

  login: publicProcedure
    .input(z.object({ password: z.string().min(1) }))
    .mutation(async ({ input }) => {
      if (!verifyCrmPassword(input.password)) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid password",
        });
      }
      await createSession();
      return { ok: true };
    }),

  logout: protectedProcedure.mutation(async () => {
    await destroySession();
    return { ok: true };
  }),
});
