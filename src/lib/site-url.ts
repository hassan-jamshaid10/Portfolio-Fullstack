export const CANONICAL_SITE_URL = "https://hassanjamshaid.vercel.app";

/** Hosts that must not be published as the public site origin. */
const NON_PUBLIC_HOST =
  /localhost|127\.0\.0\.1|hassanjamshaid\.tech|portfolio-fullstack-hassan-jamshaid10s-projects\.vercel\.app/i;

/**
 * Public origin for metadata, sitemap, robots, and JSON-LD.
 * Ignores localhost, the expired hassanjamshaid.tech domain, and the old
 * portfolio-fullstack deployment URL.
 */
export function resolveSiteUrl() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw || isNonPublicSiteUrl(raw)) return CANONICAL_SITE_URL;
  const withProtocol = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  const normalized = withProtocol.replace(/\/$/, "");
  if (isNonPublicSiteUrl(normalized)) return CANONICAL_SITE_URL;
  return normalized;
}

export function isNonPublicSiteUrl(value: string) {
  return NON_PUBLIC_HOST.test(value);
}

export const siteUrl = resolveSiteUrl();
