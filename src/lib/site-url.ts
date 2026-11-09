const FALLBACK_SITE_URL =
  "https://portfolio-fullstack-hassan-jamshaid10s-projects.vercel.app";

/** Canonical origin. Ignores the expired hassanjamshaid.tech domain. */
export function resolveSiteUrl() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw || /hassanjamshaid\.tech/i.test(raw)) return FALLBACK_SITE_URL;
  const withProtocol = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  return withProtocol.replace(/\/$/, "");
}

export const siteUrl = resolveSiteUrl();
export const fallbackSiteUrl = FALLBACK_SITE_URL;
