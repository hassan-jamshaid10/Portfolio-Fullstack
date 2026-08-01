"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { trpc } from "@/trpc/client";

export default function CrmLeadDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const me = trpc.auth.me.useQuery();
  const detail = trpc.leads.byId.useQuery(
    { id },
    { enabled: Boolean(me.data?.authenticated && id) },
  );
  const utils = trpc.useUtils();
  const [toEmail, setToEmail] = useState("");

  useEffect(() => {
    if (detail.data?.lead.contact_email) {
      setToEmail(detail.data.lead.contact_email);
    }
  }, [detail.data?.lead.contact_email]);

  const approve = trpc.leads.approveAndSend.useMutation({
    onSuccess: async (data) => {
      if (data.mode === "form" && data.applyUrl) {
        window.open(data.applyUrl, "_blank", "noopener,noreferrer");
      }
      await detail.refetch();
      await utils.leads.list.invalidate();
    },
  });

  const saveEmail = trpc.leads.setContactEmail.useMutation({
    onSuccess: async () => {
      await detail.refetch();
      await utils.leads.list.invalidate();
    },
  });

  const reject = trpc.leads.updateStatus.useMutation({
    onSuccess: async () => {
      await detail.refetch();
      await utils.leads.list.invalidate();
    },
  });

  if (me.isLoading || detail.isLoading) {
    return <div className="p-8 text-muted">Loading lead…</div>;
  }

  if (!me.data?.authenticated) {
    return (
      <div className="p-8">
        <Link href="/crm" className="text-teal underline">
          Sign in to view this lead
        </Link>
      </div>
    );
  }

  if (!detail.data) {
    return <div className="p-8 text-muted">Lead not found.</div>;
  }

  const { lead, variants, applications } = detail.data;
  const latestVariant = variants[0];
  const latestApp = applications[0];
  const canApprove = lead.status === "ready" || lead.status === "new";

  return (
    <div className="mx-auto max-w-5xl px-5 py-8 md:px-8">
      <Link href="/crm" className="text-sm font-semibold text-teal">
        ← Back to approvals
      </Link>

      <header className="mt-4 border-b border-line pb-6">
        <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.16em] text-muted">
          Source: {lead.source} · score {lead.fit_score} · {lead.status}
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold md:text-4xl">
          {lead.role}
        </h1>
        <p className="mt-1 text-lg text-teal">{lead.company}</p>
        {lead.url ? (
          <a
            href={lead.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-sm underline"
          >
            Open posting
          </a>
        ) : null}
      </header>

      <div className="mt-6 max-w-xl">
        <label className="block text-sm font-semibold text-ink">
          Recipient email
          <input
            type="email"
            value={toEmail}
            onChange={(event) => setToEmail(event.target.value)}
            placeholder="careers@company.com"
            className="mt-2 w-full border border-line bg-paper px-3 py-2 text-sm"
          />
        </label>
        <p className="mt-2 text-xs text-muted">
          Prefer a real hiring email (Apollo tries to find one). If only a job
          form/URL exists, Approve opens that form with your prepared cover +
          resume.
        </p>
        <button
          type="button"
          disabled={!toEmail || saveEmail.isPending}
          onClick={() =>
            saveEmail.mutate({ id: lead.id, contactEmail: toEmail })
          }
          className="mt-3 border border-line px-4 py-2 text-sm font-semibold text-muted disabled:opacity-50"
        >
          {saveEmail.isPending ? "Saving…" : "Save email on lead"}
        </button>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          disabled={!canApprove || approve.isPending}
          onClick={() =>
            approve.mutate({
              id: lead.id,
              toEmail: toEmail || undefined,
            })
          }
          className="bg-ink px-5 py-2.5 text-sm font-semibold text-paper hover:bg-teal disabled:opacity-60"
        >
          {lead.status === "applied"
            ? "Already applied"
            : approve.isPending
              ? "Working…"
              : lead.contact_email || toEmail
                ? "Approve & email recruiter"
                : "Approve & open apply form"}
        </button>
        <button
          type="button"
          disabled={!canApprove || reject.isPending}
          onClick={() => reject.mutate({ id: lead.id, status: "rejected" })}
          className="border border-line px-5 py-2.5 text-sm font-semibold text-muted"
        >
          Reject
        </button>
      </div>

      {approve.isSuccess ? (
        <p className="mt-4 text-sm text-teal">
          {approve.data.mode === "form"
            ? `Apply form opened${approve.data.applyUrl ? `: ${approve.data.applyUrl}` : "."}`
            : `Emailed ${approve.data.to}.`}
        </p>
      ) : null}
      {approve.isError ? (
        <p className="mt-4 text-sm text-red-700">{approve.error.message}</p>
      ) : null}
      {saveEmail.isSuccess ? (
        <p className="mt-4 text-sm text-teal">Contact email saved.</p>
      ) : null}

      <section className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="border border-line p-4">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-bold">
            Cover draft
          </h2>
          <pre className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-ink-soft/90">
            {latestApp?.cover_draft ?? "Will auto-generate on approve."}
          </pre>
        </div>
        <div className="border border-line p-4">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-bold">
            Resume variant
          </h2>
          <pre className="mt-3 max-h-[420px] overflow-auto whitespace-pre-wrap text-sm leading-relaxed text-ink-soft/90">
            {latestVariant?.content ?? "Will auto-generate on approve."}
          </pre>
        </div>
      </section>
    </div>
  );
}
