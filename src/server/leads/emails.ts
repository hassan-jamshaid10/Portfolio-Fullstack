const EMAIL_RE =
  /(?:mailto:)?([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;

const OBFUSCATED_EMAIL_RE =
  /\b([a-zA-Z0-9._%+-]+)\s*(?:\[at\]|\(at\)|\sat\s|@)\s*([a-zA-Z0-9.-]+)\s*(?:\[dot\]|\(dot\)|\sdot\s|\.)\s*([a-zA-Z]{2,})\b/gi;

const REJECT_EMAIL =
  /noreply|no-reply|donotreply|example\.com|sentry\.|wixpress|schema\.org|github\.com|googleapis|png|jpe?g|gif|webp|svg|css|js$/i;

const PREFERRED_EMAIL =
  /careers|jobs|talent|recruit|hiring|hr@|people@|apply|hello@|team@|work@|join@/i;

/** ATS / job-board apply forms (not just a company homepage). */
const APPLY_FORM_RE =
  /boards\.greenhouse\.io|job-boards\.greenhouse|jobs\.lever\.co|jobs\.ashbyhq\.com|apply\.workable\.com|myworkdayjobs\.com|smartrecruiters\.com|bamboohr\.com|recruitee\.com|jobs\.jobvite\.com|wellfound\.com|angel\.co|linkedin\.com\/jobs|remotive\.com\/remote-jobs|remoteok\.com\/remote-jobs|remoteok\.com\/[rl]|indeed\.com\/viewjob|glassdoor\.com\/job/i;

function decodeHtmlEntities(text: string) {
  return text
    .replace(/&#(\d+);/g, (_, code: string) =>
      String.fromCharCode(Number(code)),
    )
    .replace(/&#x([0-9a-f]+);/gi, (_, hex: string) =>
      String.fromCharCode(Number.parseInt(hex, 16)),
    )
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&apos;/gi, "'")
    .replace(/&nbsp;/gi, " ");
}

function normalizeEmailHaystack(text: string) {
  return decodeHtmlEntities(text)
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ");
}

export function extractEmailFromText(text?: string | null): string | null {
  if (!text) return null;

  const haystack = normalizeEmailHaystack(text);
  const found = new Set<string>();

  for (const match of haystack.matchAll(EMAIL_RE)) {
    const email = (match[1] ?? match[0] ?? "").replace(/^mailto:/i, "").trim();
    if (!email || REJECT_EMAIL.test(email)) continue;
    found.add(email.toLowerCase());
  }

  for (const match of haystack.matchAll(OBFUSCATED_EMAIL_RE)) {
    const email = `${match[1]}@${match[2]}.${match[3]}`.toLowerCase();
    if (!REJECT_EMAIL.test(email)) found.add(email);
  }

  if (!found.size) return null;

  const list = [...found];
  return list.find((email) => PREFERRED_EMAIL.test(email)) ?? list[0] ?? null;
}

export function isApplyFormUrl(url?: string | null) {
  if (!url) return false;
  return APPLY_FORM_RE.test(url);
}

/** Lead is actionable if we can email someone or open an apply form. */
export function hasApplyPath(input: {
  contactEmail?: string | null;
  url?: string | null;
  linkedinUrl?: string | null;
}) {
  return Boolean(input.contactEmail || isApplyFormUrl(input.url) || isApplyFormUrl(input.linkedinUrl));
}

export type ApplyMode = "email" | "form" | "none";

export function resolveApplyMode(input: {
  contactEmail?: string | null;
  url?: string | null;
  linkedinUrl?: string | null;
}): ApplyMode {
  if (input.contactEmail) return "email";
  if (isApplyFormUrl(input.url) || isApplyFormUrl(input.linkedinUrl)) return "form";
  return "none";
}
