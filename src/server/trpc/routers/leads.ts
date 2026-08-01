import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { composioExecute } from "@/server/composio/client";
import { buildCoverDraft, buildResumeVariant } from "@/server/leads/variants";
import { createTRPCRouter, protectedProcedure } from "../trpc";

const statusSchema = z.enum([
  "new",
  "ready",
  "approved",
  "applied",
  "rejected",
  "skipped",
]);

export const leadsRouter = createTRPCRouter({
  list: protectedProcedure
    .input(
      z
        .object({
          status: statusSchema.optional(),
          limit: z.number().min(1).max(100).default(50),
        })
        .optional(),
    )
    .query(async ({ ctx, input }) => {
      let query = ctx.db
        .selectFrom("crm_leads")
        .selectAll()
        .orderBy("fit_score", "desc")
        .orderBy("created_at", "desc")
        .limit(input?.limit ?? 50);

      if (input?.status) {
        query = query.where("status", "=", input.status);
      }

      return query.execute();
    }),

  byId: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const lead = await ctx.db
        .selectFrom("crm_leads")
        .selectAll()
        .where("id", "=", input.id)
        .executeTakeFirst();

      if (!lead) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      const variants = await ctx.db
        .selectFrom("crm_resume_variants")
        .selectAll()
        .where("lead_id", "=", input.id)
        .orderBy("created_at", "desc")
        .execute();

      const applications = await ctx.db
        .selectFrom("crm_applications")
        .selectAll()
        .where("lead_id", "=", input.id)
        .orderBy("created_at", "desc")
        .execute();

      return { lead, variants, applications };
    }),

  updateStatus: protectedProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        status: statusSchema,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const updated = await ctx.db
        .updateTable("crm_leads")
        .set({ status: input.status, updated_at: new Date() })
        .where("id", "=", input.id)
        .returningAll()
        .executeTakeFirst();

      if (!updated) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      return updated;
    }),

  approveAndSend: protectedProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        toEmail: z.string().email().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const lead = await ctx.db
        .selectFrom("crm_leads")
        .selectAll()
        .where("id", "=", input.id)
        .executeTakeFirst();

      if (!lead) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      if (lead.status === "applied") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Already applied for this lead.",
        });
      }

      let application = await ctx.db
        .selectFrom("crm_applications")
        .selectAll()
        .where("lead_id", "=", lead.id)
        .orderBy("created_at", "desc")
        .executeTakeFirst();

      let variant = await ctx.db
        .selectFrom("crm_resume_variants")
        .selectAll()
        .where("lead_id", "=", lead.id)
        .orderBy("created_at", "desc")
        .executeTakeFirst();

      // Auto-generate anything missing so approval is one click.
      if (!variant || !application?.cover_draft) {
        const builtVariant = buildResumeVariant({
          company: lead.company,
          role: lead.role,
        });
        const cover = buildCoverDraft({
          company: lead.company,
          role: lead.role,
          notes: lead.notes,
        });

        if (!variant) {
          variant = await ctx.db
            .insertInto("crm_resume_variants")
            .values({
              lead_id: lead.id,
              title: builtVariant.title,
              content: builtVariant.content,
              highlights: builtVariant.highlights,
            })
            .returningAll()
            .executeTakeFirstOrThrow();
        }

        if (!application) {
          application = await ctx.db
            .insertInto("crm_applications")
            .values({
              lead_id: lead.id,
              channel: "gmail",
              cover_draft: cover,
            })
            .returningAll()
            .executeTakeFirstOrThrow();
        } else if (!application.cover_draft) {
          application = await ctx.db
            .updateTable("crm_applications")
            .set({ cover_draft: cover })
            .where("id", "=", application.id)
            .returningAll()
            .executeTakeFirstOrThrow();
        }
      }

      const to =
        input.toEmail ??
        lead.contact_email ??
        process.env.CRM_APPLY_TO_EMAIL ??
        null;

      if (!to) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message:
            "No recipient email on this lead. Set contact email or CRM_APPLY_TO_EMAIL.",
        });
      }

      await ctx.db
        .updateTable("crm_leads")
        .set({ status: "approved", updated_at: new Date() })
        .where("id", "=", lead.id)
        .execute();

      const body = [
        application.cover_draft,
        "",
        "----------",
        "Resume variant",
        "----------",
        variant.content,
      ].join("\n");

      try {
        const sendResult = await composioExecute({
          action: "GMAIL_SEND_EMAIL",
          params: {
            to,
            recipient_email: to,
            subject: `Application: ${lead.role} at ${lead.company}`,
            body,
            message: body,
          },
        });

        await ctx.db
          .updateTable("crm_applications")
          .set({
            sent_at: new Date(),
            result: JSON.stringify(sendResult.data),
            error: null,
          })
          .where("id", "=", application.id)
          .execute();

        await ctx.db
          .updateTable("crm_leads")
          .set({ status: "applied", updated_at: new Date() })
          .where("id", "=", lead.id)
          .execute();

        return {
          ok: true,
          mock: Boolean(sendResult.mock),
          to,
        };
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        await ctx.db
          .updateTable("crm_applications")
          .set({ error: message })
          .where("id", "=", application.id)
          .execute();
        await ctx.db
          .updateTable("crm_leads")
          .set({ status: "ready", updated_at: new Date() })
          .where("id", "=", lead.id)
          .execute();
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message,
        });
      }
    }),
});
