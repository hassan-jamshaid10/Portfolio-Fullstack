import { existsSync } from "node:fs";
import path from "node:path";

export const RESUME_PDF_FILENAME = "Hassan_Jamshaid_Resume.pdf";

/**
 * Public URL Composio/Gmail can fetch for the attachment.
 * Prefer production site — localhost is not reachable by Composio.
 */
export function getResumePdfUrl() {
  const explicit = process.env.RESUME_PDF_URL?.trim();
  if (explicit) return explicit;

  const site = (
    process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://hassanjamshaid.tech"
  ).replace(/\/$/, "");

  // Composio fetches the attachment server-side; never use localhost.
  if (/localhost|127\.0\.0\.1/i.test(site)) {
    return `https://hassanjamshaid.tech/${RESUME_PDF_FILENAME}`;
  }

  return `${site}/${RESUME_PDF_FILENAME}`;
}

/** Local path (optional fallback when using SDK auto-upload). */
export function getResumePdfPath() {
  const candidates = [
    path.join(process.cwd(), "public", RESUME_PDF_FILENAME),
    path.join(process.cwd(), RESUME_PDF_FILENAME),
  ];

  for (const candidate of candidates) {
    if (existsSync(candidate)) return candidate;
  }

  throw new Error(
    `Resume PDF not found at public/${RESUME_PDF_FILENAME}. Add the file before sending applications.`,
  );
}

/** Value passed to GMAIL_SEND_EMAIL `attachment` (public URL). */
export function getResumePdfAttachment() {
  return getResumePdfUrl();
}
