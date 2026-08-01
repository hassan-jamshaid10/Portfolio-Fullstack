"use client";

import Link from "next/link";
import { trpc } from "@/trpc/client";

export default function CrmRunsPage() {
  const me = trpc.auth.me.useQuery();
  const runs = trpc.runs.list.useQuery(
    { limit: 50 },
    { enabled: Boolean(me.data?.authenticated) },
  );

  if (me.isLoading) {
    return <div className="p-8 text-muted">Loading…</div>;
  }

  if (!me.data?.authenticated) {
    return (
      <div className="p-8">
        <Link href="/crm" className="text-teal underline">
          Sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-5 py-8 md:px-8">
      <Link href="/crm" className="text-sm font-semibold text-teal">
        ← Back to CRM
      </Link>
      <h1 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-bold">
        Daily runs
      </h1>
      <div className="mt-6 space-y-3">
        {runs.data?.map((run) => (
          <article key={run.id} className="border border-line px-4 py-4">
            <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.14em] text-muted">
              {new Date(run.started_at).toLocaleString()}
              {run.finished_at
                ? ` → ${new Date(run.finished_at).toLocaleString()}`
                : " (running)"}
            </p>
            <p className="mt-2 font-semibold">
              Found {run.leads_found}, inserted {run.leads_inserted}
            </p>
            <p className="mt-1 text-sm text-muted">{run.summary ?? "No summary"}</p>
            {run.errors ? (
              <pre className="mt-3 whitespace-pre-wrap text-sm text-red-700">
                {run.errors}
              </pre>
            ) : null}
          </article>
        ))}
        {!runs.data?.length ? (
          <p className="text-muted">No daily runs yet.</p>
        ) : null}
      </div>
    </div>
  );
}
