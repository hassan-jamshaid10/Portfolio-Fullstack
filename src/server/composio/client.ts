type ComposioExecuteArgs = {
  action: string;
  params?: Record<string, unknown>;
};

/**
 * Minimal Composio REST helper for server-side Apollo / Gmail / Slack actions.
 * Falls back to realistic mock leads when COMPOSIO_API_KEY is unset.
 */
export async function composioExecute<T = unknown>({
  action,
  params = {},
}: ComposioExecuteArgs): Promise<{ ok: boolean; data: T; mock?: boolean }> {
  const apiKey = process.env.COMPOSIO_API_KEY;
  const userId = process.env.COMPOSIO_USER_ID ?? "default";

  if (!apiKey) {
    return {
      ok: true,
      mock: true,
      data: getMockResponse(action, params) as T,
    };
  }

  const endpoints = [
    "https://backend.composio.dev/api/v2/actions/execute",
    "https://api.composio.dev/api/v2/actions/execute",
  ];

  let lastError = "Composio request failed";

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
        body: JSON.stringify({
          actionName: action,
          entityId: userId,
          input: params,
        }),
      });

      if (!response.ok) {
        lastError = `Composio ${action} failed: ${response.status} ${await response.text()}`;
        continue;
      }

      const json = (await response.json()) as T;
      return { ok: true, data: json };
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error);
    }
  }

  throw new Error(lastError);
}

function getMockResponse(action: string, params: Record<string, unknown>) {
  const name = action.toLowerCase();

  if (name.includes("apollo") || name.includes("search") || name.includes("job")) {
    return {
      data: {
        jobs: [
          {
            company: "Northwind Labs",
            title: "Full Stack Engineer",
            role: "Full Stack Engineer",
            url: "https://example.com/jobs/full-stack",
            location: "Remote",
            email: "careers@northwindlabs.example",
            description:
              "Build Next.js and TypeScript SaaS features with Node APIs and PostgreSQL.",
          },
          {
            company: "Cedar Systems",
            title: "Software Engineer",
            role: "Software Engineer",
            url: "https://example.com/jobs/software-engineer",
            location: "Remote",
            email: "jobs@cedarsystems.example",
            description:
              "Own backend services in Node/FastAPI and ship React frontends for B2B SaaS.",
          },
          {
            company: "Orbit Commerce",
            title: "Frontend Engineer",
            role: "Frontend Engineer",
            url: "https://example.com/jobs/frontend",
            location: "Remote",
            email: "hiring@orbitcommerce.example",
            description:
              "React and Next.js product UI for e-commerce operations tooling.",
          },
          {
            company: "Atlas AI",
            title: "AI Engineer",
            role: "AI Engineer",
            url: "https://example.com/jobs/ai-engineer",
            location: "Remote",
            email: "talent@atlasai.example",
            description:
              "Ship RAG pipelines, LangChain agents, and TypeScript product surfaces.",
          },
        ],
      },
      query: params,
    };
  }

  if (name.includes("gmail") || name.includes("email") || name.includes("send")) {
    return {
      data: {
        messageId: `mock-${Date.now()}`,
        status: "queued",
        to: params.recipient_email ?? params.to,
        subject: params.subject,
      },
    };
  }

  if (name.includes("slack")) {
    return {
      data: {
        ok: true,
        channel: params.channel ?? "crm-leads",
        ts: String(Date.now()),
      },
    };
  }

  return { data: { ok: true, action, params } };
}
