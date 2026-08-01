/**
 * Composio client for Hassan CRM.
 *
 * Important:
 * - Enabling a toolkit in the project ≠ connecting an account for the user.
 * - Tools run only after Apollo/Gmail/LinkedIn/Slack are ACTIVE for COMPOSIO_USER_ID.
 */

import { Composio } from "@composio/core";

type ComposioExecuteArgs = {
  action: string;
  params?: Record<string, unknown>;
  connectedAccountId?: string;
};

type McpHeaders = Record<string, string>;

type ToolkitStatus = {
  slug: string;
  name: string;
  connected: boolean;
  accountId?: string | null;
  status?: string | null;
  connectUrl?: string | null;
};

const REQUIRED_TOOLKITS = ["apollo", "gmail", "linkedin", "slack"] as const;

const globalForComposio = globalThis as unknown as {
  crmComposioProjectSession?: {
    apiKey: string;
    userId: string;
    sessionId: string;
    mcpUrl: string;
    mcpHeaders: McpHeaders;
    execute: (
      toolSlug: string,
      args?: Record<string, unknown>,
      options?: { account?: string },
    ) => Promise<unknown>;
    authorize: (toolkit: string) => Promise<{ redirectUrl?: string | null }>;
    listToolkits: () => Promise<ToolkitStatus[]>;
  };
};

function getApiKey() {
  const apiKey = process.env.COMPOSIO_API_KEY?.trim();
  if (!apiKey) {
    throw new Error(
      "COMPOSIO_API_KEY is not set. Paste your Composio project key (ak_…) into .env.local.",
    );
  }
  return apiKey;
}

function getUserId() {
  return (
    process.env.COMPOSIO_USER_ID?.trim() ||
    "pg-test-8d99848e-3d76-4e4f-9b19-a91c7a1a3749"
  );
}

function resolveAccount(action: string, explicit?: string) {
  if (explicit) return explicit;
  const toolkit = action.split("_")[0]?.toUpperCase() ?? "";
  const byToolkit: Record<string, string | undefined> = {
    APOLLO: process.env.COMPOSIO_APOLLO_CONNECTED_ACCOUNT_ID,
    LINKEDIN: process.env.COMPOSIO_LINKEDIN_CONNECTED_ACCOUNT_ID,
    GMAIL: process.env.COMPOSIO_GMAIL_CONNECTED_ACCOUNT_ID,
    SLACK: process.env.COMPOSIO_SLACK_CONNECTED_ACCOUNT_ID,
  };
  return byToolkit[toolkit] ?? process.env.COMPOSIO_CONNECTED_ACCOUNT_ID;
}

function parseMcpBody(text: string): unknown {
  const trimmed = text.trim();
  if (!trimmed) return {};

  if (trimmed.startsWith("data:") || trimmed.includes("\ndata:")) {
    const lines = trimmed
      .split("\n")
      .map((line) => line.replace(/^data:\s?/, "").trim())
      .filter((line) => line && line !== "[DONE]");
    const last = lines[lines.length - 1] ?? "{}";
    return JSON.parse(last);
  }

  return JSON.parse(trimmed);
}

type ProjectSession = NonNullable<
  (typeof globalForComposio)["crmComposioProjectSession"]
>;

function isFreshSession(
  cached: (typeof globalForComposio)["crmComposioProjectSession"],
  apiKey: string,
  userId: string,
): cached is ProjectSession {
  return Boolean(
    cached &&
      cached.apiKey === apiKey &&
      cached.userId === userId &&
      typeof cached.listToolkits === "function" &&
      typeof cached.authorize === "function" &&
      typeof cached.execute === "function",
  );
}

async function getProjectSession() {
  const apiKey = getApiKey();
  const userId = getUserId();

  const cached = globalForComposio.crmComposioProjectSession;
  if (isFreshSession(cached, apiKey, userId)) {
    return cached;
  }

  // Drop stale hot-reload cache (older shapes lacked listToolkits).
  globalForComposio.crmComposioProjectSession = undefined;

  const composio = new Composio({ apiKey });
  const session = await composio.create(userId, {
    mcp: true,
    toolkits: [...REQUIRED_TOOLKITS],
    manageConnections: {
      waitForConnections: true,
    },
  });

  const mcpHeaders: McpHeaders = {
    "x-api-key": apiKey,
    ...((session.mcp.headers as McpHeaders | undefined) ?? {}),
  };

  const wrapped: ProjectSession = {
    apiKey,
    userId,
    sessionId: session.sessionId,
    mcpUrl: session.mcp.url,
    mcpHeaders,
    execute: (
      toolSlug: string,
      args?: Record<string, unknown>,
      options?: { account?: string },
    ) => session.execute(toolSlug, args, options),
    authorize: async (toolkit: string) => {
      const request = await session.authorize(toolkit);
      return { redirectUrl: request.redirectUrl ?? null };
    },
    listToolkits: async () => {
      // SDK method is session.toolkits(), not listToolkits.
      const listed = await session.toolkits();
      return listed.items.map((item) => ({
        slug: item.slug,
        name: item.name,
        connected: Boolean(item.connection?.isActive),
        accountId: item.connection?.connectedAccount?.id ?? null,
        status: item.connection?.connectedAccount?.status ?? null,
      }));
    },
  };

  globalForComposio.crmComposioProjectSession = wrapped;
  return wrapped;
}

async function mcpToolsCall(
  mcpUrl: string,
  headers: McpHeaders,
  name: string,
  args: Record<string, unknown>,
) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 60_000);

  try {
    const response = await fetch(mcpUrl, {
      method: "POST",
      signal: controller.signal,
      headers: {
        ...headers,
        "Content-Type": "application/json",
        Accept: "application/json, text/event-stream",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: Date.now(),
        method: "tools/call",
        params: {
          name,
          arguments: args,
        },
      }),
    });

    const text = await response.text();
    if (!response.ok) {
      throw new Error(
        `Composio MCP ${name} failed: ${response.status} ${text.slice(0, 400)}`,
      );
    }

    const payload = parseMcpBody(text) as {
      error?: { message?: string };
      result?: {
        content?: Array<{ type?: string; text?: string }>;
        isError?: boolean;
        structuredContent?: unknown;
      };
    };

    if (payload.error?.message) {
      throw new Error(`Composio MCP ${name}: ${payload.error.message}`);
    }

    const result = payload.result;
    if (result?.isError) {
      const errText =
        result.content?.map((c) => c.text).join("\n") || "tool error";
      throw new Error(`Composio MCP ${name}: ${errText.slice(0, 500)}`);
    }

    if (result?.structuredContent) return result.structuredContent;

    const textParts =
      result?.content
        ?.filter((c) => c.type === "text" && c.text)
        .map((c) => c.text!) ?? [];

    if (textParts.length === 1) {
      try {
        return JSON.parse(textParts[0]!);
      } catch {
        return { text: textParts[0] };
      }
    }

    if (textParts.length > 1) return { texts: textParts };
    return result ?? payload;
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error(`Composio MCP ${name} timed out`);
    }
    throw error instanceof Error ? error : new Error(String(error));
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * Check which required toolkits are connected for COMPOSIO_USER_ID.
 * For missing ones, generate Connect Link URLs (open these once in browser).
 */
export async function ensureComposioConnections(
  toolkits: string[] = [...REQUIRED_TOOLKITS],
) {
  const session = await getProjectSession();
  if (typeof session.listToolkits !== "function") {
    globalForComposio.crmComposioProjectSession = undefined;
    throw new Error(
      "Stale Composio session cache. Restart npm run dev and try again.",
    );
  }

  const listed = await session.listToolkits();
  const bySlug = new Map(listed.map((item) => [item.slug.toLowerCase(), item]));

  const statuses: ToolkitStatus[] = [];
  for (const slug of toolkits) {
    const current = bySlug.get(slug.toLowerCase());
    const connected = Boolean(current?.connected);
    let connectUrl: string | null = null;

    if (!connected) {
      try {
        const auth = await session.authorize(slug);
        connectUrl = auth.redirectUrl ?? null;
      } catch (error) {
        connectUrl = null;
        console.warn(
          `[composio] authorize(${slug}) failed:`,
          error instanceof Error ? error.message : String(error),
        );
      }
    }

    statuses.push({
      slug,
      name: current?.name ?? slug,
      connected,
      accountId: current?.accountId ?? null,
      status: current?.status ?? (connected ? "ACTIVE" : "MISSING"),
      connectUrl,
    });
  }

  const missing = statuses.filter((item) => !item.connected);
  return {
    userId: session.userId,
    sessionId: session.sessionId,
    statuses,
    missing,
    ok: missing.length === 0,
    help:
      missing.length === 0
        ? "All required Composio toolkits are connected."
        : [
            `Composio user ${session.userId} is missing active connections: ${missing
              .map((m) => m.slug)
              .join(", ")}.`,
            "Enabling a toolkit in the project is not enough — connect the account for THIS user id.",
            ...missing.map(
              (m) =>
                `${m.slug}: ${m.connectUrl ?? "open Composio dashboard → Connected accounts → connect for this user"}`,
            ),
          ].join("\n"),
  };
}

export async function composioExecute<T = unknown>({
  action,
  params = {},
  connectedAccountId,
}: ComposioExecuteArgs): Promise<{
  ok: boolean;
  data: T;
  via: "session" | "mcp";
}> {
  const session = await getProjectSession();
  const account = resolveAccount(action, connectedAccountId);
  const toolkit = action.split("_")[0]?.toLowerCase();

  try {
    const data = await session.execute(
      action,
      params,
      account ? { account } : undefined,
    );
    return { ok: true, data: data as T, via: "session" };
  } catch (sessionError) {
    const message =
      sessionError instanceof Error
        ? sessionError.message
        : String(sessionError);

    // Missing connection → generate a connect link for the toolkit.
    if (/No active connection/i.test(message) && toolkit) {
      let connectUrl: string | null = null;
      try {
        const auth = await session.authorize(toolkit);
        connectUrl = auth.redirectUrl ?? null;
      } catch {
        // ignore
      }

      throw new Error(
        [
          `No active Composio connection for '${toolkit}' on user ${session.userId}.`,
          "Toolkit enabled in project ≠ account connected for this user.",
          connectUrl
            ? `Open this connect link once, finish auth, then retry: ${connectUrl}`
            : `In Composio dashboard, connect ${toolkit} for user ${session.userId}, then retry.`,
        ].join(" "),
      );
    }

    try {
      const data = await mcpToolsCall(
        session.mcpUrl,
        session.mcpHeaders,
        "COMPOSIO_MULTI_EXECUTE_TOOL",
        {
          tools: [
            {
              tool_slug: action,
              arguments: params,
              ...(account ? { account } : {}),
            },
          ],
          sync_response_to_workbench: false,
          thought: `Hassan CRM: ${action}`,
        },
      );
      return { ok: true, data: data as T, via: "mcp" };
    } catch (mcpError) {
      const b = mcpError instanceof Error ? mcpError.message : String(mcpError);
      throw new Error(
        `Composio failed for ${action}. session: ${message} | mcp: ${b}`,
      );
    }
  }
}

export async function composioNotifySafe(args: ComposioExecuteArgs) {
  try {
    return await composioExecute(args);
  } catch (error) {
    console.warn(
      "[composioNotifySafe]",
      error instanceof Error ? error.message : String(error),
    );
    return null;
  }
}

export async function getComposioMcpInfo() {
  const session = await getProjectSession();
  const connections = await ensureComposioConnections();
  return {
    keyType: "project",
    mcpUrl: session.mcpUrl,
    sessionId: session.sessionId,
    userId: session.userId,
    workspace: process.env.COMPOSIO_WORKSPACE ?? null,
    authHeader: "x-api-key",
    connections,
  };
}
