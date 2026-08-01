/**
 * Direct Apollo.io API client (does not go through Composio).
 * Requires APOLLO_API_KEY from https://app.apollo.io settings.
 */

type ApolloFetchArgs = {
  path: string;
  method?: "GET" | "POST";
  body?: Record<string, unknown>;
  query?: Record<string, string | number | undefined>;
};

function getApolloKey() {
  const key = process.env.APOLLO_API_KEY?.trim();
  if (!key) {
    throw new Error(
      "APOLLO_API_KEY is not set. Add your Apollo master/API key to .env.local.",
    );
  }
  return key;
}

export function hasApolloApiKey() {
  return Boolean(process.env.APOLLO_API_KEY?.trim());
}

async function apolloFetch<T = unknown>({
  path,
  method = "POST",
  body,
  query,
}: ApolloFetchArgs): Promise<T> {
  const apiKey = getApolloKey();
  const url = new URL(`https://api.apollo.io${path}`);
  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined && value !== "") {
        url.searchParams.set(key, String(value));
      }
    }
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 25_000);

  try {
    const response = await fetch(url.toString(), {
      method,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        "x-api-key": apiKey,
      },
      body: method === "POST" ? JSON.stringify(body ?? {}) : undefined,
      cache: "no-store",
    });

    const text = await response.text();
    if (!response.ok) {
      throw new Error(
        `Apollo ${path} failed: ${response.status} ${text.slice(0, 400)}`,
      );
    }

    return JSON.parse(text) as T;
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error(`Apollo ${path} timed out`);
    }
    throw error instanceof Error ? error : new Error(String(error));
  } finally {
    clearTimeout(timeout);
  }
}

export async function apolloPeopleSearch(params: Record<string, unknown>) {
  return apolloFetch({
    path: "/api/v1/mixed_people/api_search",
    method: "POST",
    body: params,
  });
}

export async function apolloOrganizationSearch(params: Record<string, unknown>) {
  return apolloFetch({
    path: "/api/v1/mixed_companies/search",
    method: "POST",
    body: params,
  });
}

export async function apolloPeopleMatch(params: Record<string, unknown>) {
  return apolloFetch({
    path: "/api/v1/people/match",
    method: "POST",
    body: params,
  });
}

export async function apolloOrganizationJobPostings(organizationId: string) {
  return apolloFetch({
    path: `/api/v1/organizations/${organizationId}/job_postings`,
    method: "GET",
    query: { page: 1, per_page: 10 },
  });
}
