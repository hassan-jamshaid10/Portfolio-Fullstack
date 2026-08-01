import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { composioExecute } from "@/server/composio/client";
import {
  extractEmailFromText,
  isApplyFormUrl,
  isLinkedInUrl,
  resolveApplyMode,
} from "@/server/leads/emails";
import {
  getResumePdfAttachment,
  getResumePdfPath,
} from "@/server/leads/resumePdf";
import { buildCoverDraft } from "@/server/leads/variants";
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

      const applications = await ctx.db
        .selectFrom("crm_applications")
        .selectAll()
        .where("lead_id", "=", input.id)
        .orderBy("created_at", "desc")
        .execute();

      return { lead, applications };
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

  setContactEmail: protectedProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        contactEmail: z.string().email(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const updated = await ctx.db
        .updateTable("crm_leads")
        .set({
          contact_email: input.contactEmail.toLowerCase(),
          updated_at: new Date(),
        })
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

      // Always rebuild a clean cover; resume is the PDF attachment only.
      const cover = buildCoverDraft({
        company: lead.company,
        role: lead.role,
        notes: lead.notes,
      });

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
      } else {
        application = await ctx.db
          .updateTable("crm_applications")
          .set({ cover_draft: cover })
          .where("id", "=", application.id)
          .returningAll()
          .executeTakeFirstOrThrow();
      }

      const extracted =
        input.toEmail ??
        lead.contact_email ??
        extractEmailFromText(lead.notes) ??
        extractEmailFromText(
          typeof lead.raw === "string" ? lead.raw : JSON.stringify(lead.raw),
        );

      if (extracted && extracted !== lead.contact_email) {
        await ctx.db
          .updateTable("crm_leads")
          .set({ contact_email: extracted, updated_at: new Date() })
          .where("id", "=", lead.id)
          .execute();
      }

      const linkedinUrl =
        typeof lead.raw === "object" && lead.raw && "linkedinUrl" in lead.raw
          ? String((lead.raw as { linkedinUrl?: string }).linkedinUrl ?? "")
          : null;
      const applyMode = resolveApplyMode({
        contactEmail: extracted,
        url: lead.url,
        linkedinUrl,
      });
      const formUrl =
        (isApplyFormUrl(lead.url) ? lead.url : null) ??
        (isApplyFormUrl(linkedinUrl) ? linkedinUrl : null);
      const profileUrl =
        (isLinkedInUrl(linkedinUrl) ? linkedinUrl : null) ??
        (isLinkedInUrl(lead.url) ? lead.url : null);

      // Form / LinkedIn leads: open URL (no fake self-email).
      if ((applyMode === "form" || applyMode === "linkedin") && !extracted) {
        const applyUrl = formUrl ?? profileUrl ?? lead.url;
        if (!applyUrl) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message:
              "No company email, apply form, or LinkedIn URL on this lead. Find a hiring email, save it on the lead, then approve.",
          });
        }

        await ctx.db
          .updateTable("crm_leads")
          .set({ status: "applied", updated_at: new Date() })
          .where("id", "=", lead.id)
          .execute();

        await ctx.db
          .updateTable("crm_applications")
          .set({
            channel: applyMode === "linkedin" ? "linkedin" : "manual",
            sent_at: new Date(),
            result: JSON.stringify({
              mode: applyMode,
              applyUrl,
              note:
                applyMode === "linkedin"
                  ? "Open the LinkedIn profile/job and send outreach using the prepared cover + your PDF resume."
                  : "Open the apply form and submit using the prepared cover + your PDF resume.",
            }),
            error: null,
          })
          .where("id", "=", application.id)
          .execute();

        return {
          ok: true,
          mode: applyMode,
          to: null,
          applyUrl,
        };
      }

      if (!extracted) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message:
            "No company/recruiter email on this lead. Apollo could not resolve one. Paste a hiring email on the lead page, or open the job URL if it is an apply form.",
        });
      }

      await ctx.db
        .updateTable("crm_leads")
        .set({ status: "approved", updated_at: new Date() })
        .where("id", "=", lead.id)
        .execute();

      // Cover letter only in the body; resume PDF staged then attached.
      const body = application.cover_draft ?? cover;
      let resumeAttachment: string;
      try {
        resumeAttachment = getResumePdfPath();
      } catch {
        resumeAttachment = getResumePdfAttachment();
      }

      try {
        const sendResult = await composioExecute({
          action: "GMAIL_SEND_EMAIL",
          params: {
            to: extracted,
            recipient_email: extracted,
            subject: `Application: ${lead.role} at ${lead.company} — Hassan Jamshaid`,
            body,
            is_html: false,
            attachment: resumeAttachment,
          },
        });

        await ctx.db
          .updateTable("crm_applications")
          .set({
            channel: "gmail",
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
          mode: "email" as const,
          to: extracted,
          applyUrl: lead.url,
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
