"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { trpc } from "@/trpc/client";

const statuses = [
  "ready",
  "applied",
  "rejected",
  "all",
  "new",
  "approved",
] as const;

export default function CrmHomePage() {
  const router = useRouter();
  const me = trpc.auth.me.useQuery();
  const [status, setStatus] = useState<(typeof statuses)[number]>("ready");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const login = trpc.auth.login.useMutation({
    onSuccess: async () => {
      setLoginError(null);
      await me.refetch();
    },
    onError: (error) => setLoginError(error.message),
  });

  const logout = trpc.auth.logout.useMutation({
    onSuccess: async () => {
      await me.refetch();
    },
  });

  const leads = trpc.leads.list.useQuery(
    status === "all" ? undefined : { status },
    { enabled: Boolean(me.data?.authenticated) },
  );

  const runs = trpc.runs.list.useQuery(
    { limit: 5 },
    { enabled: Boolean(me.data?.authenticated) },
  );

  const utils = trpc.useUtils();

  const trigger = trpc.runs.trigger.useMutation({
    onSuccess: async (data) => {
      setActionMessage(data.summary);
      await Promise.all([leads.refetch(), runs.refetch()]);
    },
  });

  const approve = trpc.leads.approveAndSend.useMutation({
    onSuccess: async (data) => {
      setActionMessage(
        `Sent to ${data.to}${data.mock ? " (mock mode)" : ""}.`,
      );
      await utils.leads.list.invalidate();
    },
    onError: (error) => setActionMessage(error.message),
  });

  const reject = trpc.leads.updateStatus.useMutation({
    onSuccess: async () => {
      await utils.leads.list.invalidate();
    },
  });

  if (me.isLoading) {
    return (
      <div className="mx-auto flex min-h-screen max-w-5xl items-center px-6">
        <p className="text-muted">Loading CRM…</p>
      </div>
    );
  }

  if (!me.data?.authenticated) {
    return (
      <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6">
        <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-teal">
          Private CRM
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-bold">
          Sign in
        </h1>
        <p className="mt-2 text-sm text-muted">
          Cron prepares leads + drafts. You only approve to send.
        </p>
        <form
          className="mt-8 space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            login.mutate({ password });
          }}
        >
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="CRM password"
            className="w-full border border-line bg-mist px-4 py-3 outline-none focus:border-teal"
          />
          {loginError ? (
            <p className="text-sm text-red-700">{loginError}</p>
          ) : null}
          <button
            type="submit"
            disabled={login.isPending}
            className="w-full bg-ink px-4 py-3 font-semibold text-paper transition hover:bg-teal disabled:opacity-60"
          >
            {login.isPending ? "Signing in…" : "Enter CRM"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-8 md:px-8">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-6">
        <div>
          <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-teal">
            Auto pipeline
          </p>
          <h1 className="mt-1 font-[family-name:var(--font-display)] text-3xl font-bold">
            Approve to send
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-muted">
            Daily cron finds jobs, scores them, and generates cover + resume
            drafts. Your only job is Approve or Reject.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => trigger.mutate()}
            disabled={trigger.isPending}
            className="bg-teal px-4 py-2 text-sm font-semibold text-paper disabled:opacity-60"
          >
            {trigger.isPending ? "Generating…" : "Generate leads now"}
          </button>
          <Link href="/crm/runs" className="text-sm font-semibold text-ink underline">
            Daily runs
          </Link>
          <button
            type="button"
            onClick={() => logout.mutate()}
            className="text-sm font-semibold text-muted"
          >
            Log out
          </button>
        </div>
      </header>

      {actionMessage || trigger.isError ? (
        <p className="mt-4 border border-signal/40 bg-signal/15 px-4 py-3 text-sm">
          {actionMessage ?? trigger.error?.message}
        </p>
      ) : null}

      <div className="mt-6 flex flex-wrap gap-2">
        {statuses.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setStatus(item)}
            className={`px-3 py-1.5 text-sm font-medium capitalize ${
              status === item
                ? "bg-ink text-paper"
                : "border border-line text-muted hover:text-ink"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="mt-6 overflow-x-auto border border-line">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-mist font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.14em] text-muted">
            <tr>
              <th className="px-4 py-3">Company</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Score</th>
              <th className="px-4 py-3">To</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.data?.map((lead) => (
              <tr key={lead.id} className="border-t border-line">
                <td className="px-4 py-3 font-semibold">{lead.company}</td>
                <td className="px-4 py-3">{lead.role}</td>
                <td className="px-4 py-3">{lead.fit_score}</td>
                <td className="px-4 py-3 text-muted">
                  {lead.contact_email ?? "CRM_APPLY_TO_EMAIL"}
                </td>
                <td className="px-4 py-3 capitalize">{lead.status}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => router.push(`/crm/leads/${lead.id}`)}
                      className="px-2 py-1 text-xs font-semibold text-muted underline"
                    >
                      View
                    </button>
                    {lead.status === "ready" || lead.status === "new" ? (
                      <>
                        <button
                          type="button"
                          disabled={approve.isPending}
                          onClick={() => approve.mutate({ id: lead.id })}
                          className="bg-ink px-3 py-1 text-xs font-semibold text-paper hover:bg-teal disabled:opacity-60"
                        >
                          Approve
                        </button>
                        <button
                          type="button"
                          disabled={reject.isPending}
                          onClick={() =>
                            reject.mutate({ id: lead.id, status: "rejected" })
                          }
                          className="border border-line px-3 py-1 text-xs font-semibold text-muted"
                        >
                          Reject
                        </button>
                      </>
                    ) : null}
                  </div>
                </td>
              </tr>
            ))}
            {!leads.data?.length ? (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-muted">
                  {leads.isLoading
                    ? "Loading leads…"
                    : "No ready leads. Wait for cron or click Generate leads now."}
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      <section className="mt-10">
        <h2 className="font-[family-name:var(--font-display)] text-xl font-bold">
          Recent runs
        </h2>
        <div className="mt-4 space-y-3">
          {runs.data?.map((run) => (
            <div key={run.id} className="border border-line px-4 py-3 text-sm">
              <p className="font-semibold">
                {new Date(run.started_at).toLocaleString()} · prepared{" "}
                {run.leads_inserted}/{run.leads_found}
              </p>
              <p className="mt-1 text-muted">{run.summary ?? "No summary"}</p>
            </div>
          ))}
          {!runs.data?.length ? (
            <p className="text-sm text-muted">No runs recorded yet.</p>
          ) : null}
        </div>
      </section>
    </div>
  );
}
