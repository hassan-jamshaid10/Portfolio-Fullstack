import https from "node:https";
import { URL } from "node:url";

import {
  composioExecute,
  ensureComposioConnections,
} from "@/server/composio/client";
import {
  extractEmailFromText,
  hasApplyPath,
} from "@/server/leads/emails";

function hasComposioKey() {
  return Boolean(process.env.COMPOSIO_API_KEY?.trim());
}

/** Unwrap COMPOSIO_MULTI_EXECUTE_TOOL / tools/call payloads into the tool body. */
function unwrapToolData(payload: unknown): unknown {
  const root = asRecord(payload) ?? {};
  const candidates = [
    root.results,
    root.data,
    root.responses,
    root.tools,
    root.output,
  ];

  for (const candidate of candidates) {
    if (Array.isArray(candidate) && candidate.length) {
      const first = asRecord(candidate[0]) ?? {};
      return (
        first.response_data ??
        first.response ??
        first.data ??
        first.result ??
        first.output ??
        candidate[0]
      );
    }
  }

  if ("data" in root) return unwrapComposioData(root.data) ?? root.data;
  return unwrapComposioData(payload) ?? payload;
}

function assertApolloPayload(action: string, payload: unknown) {
  const root = asRecord(payload) ?? {};
  const nested = asRecord(root.data) ?? root;
  const message = pickString(
    root.error,
    nested.error,
    nested.message,
    root.message,
  );
  const status = nested.status_code ?? root.status_code ?? nested.status;

  if (
    message &&
    (/failed to (search|enrich)|authorization failed|403|master api key|api_inaccessible|not authorized/i.test(
      message,
    ) ||
      status === 403 ||
      status === 401)
  ) {
    const freePlan =
      /free plan|aren't included|not included in your|upgrade your plan|api_inaccessible/i.test(
        message,
      );
    const hint = freePlan
      ? " Apollo Free does not include People/Org Search or Enrichment APIs (even with a master key). Upgrade Apollo, or rely on free job boards (Jobicy/Arbeitnow) + Gmail/LinkedIn via Composio."
      : /master api key|authorization failed|not authorized/i.test(message)
        ? " Use an Apollo master key (paid plan) and reconnect Apollo in Composio for this user."
        : "";
    throw new Error(`${action}: ${message}.${hint}`);
  }

  return payload;
}

async function apolloViaComposio(
  action: string,
  params: Record<string, unknown>,
) {
  const result = await composioExecute({ action, params });
  const unwrapped = unwrapToolData(result.data);
  return assertApolloPayload(action, unwrapped);
}

export type IncomingLead = {
  company: string;
  role: string;
  url?: string | null;
  location?: string | null;
  description?: string | null;
  contactEmail?: string | null;
  contactPhone?: string | null;
  contactName?: string | null;
  linkedinUrl?: string | null;
  apolloPersonId?: string | null;
  source: "apollo" | "apollo+linkedin" | "jobicy" | "arbeitnow" | "freelance";
};

export type LeadFilters = {
  titles?: string[];
  locations?: string[];
  keywords?: string[];
  dailyCap?: number;
  minFitScore?: number;
};

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object"
    ? (value as Record<string, unknown>)
    : null;
}

function pickString(...values: unknown[]) {
  for (const value of values) {
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return null;
}

function extractPhoneFromPerson(person: Record<string, unknown>) {
  const direct = pickString(
    person.phone,
    person.mobile_phone,
    person.direct_phone,
    person.corporate_phone,
    person.sanitized_phone,
    person.primary_phone,
  );
  if (direct) return direct;

  const numbers = person.phone_numbers;
  if (Array.isArray(numbers)) {
    for (const item of numbers) {
      if (typeof item === "string" && item.trim()) return item.trim();
      const row = asRecord(item);
      const phone = pickString(
        row?.sanitized_number,
        row?.raw_number,
        row?.number,
        row?.phone,
      );
      if (phone) return phone;
    }
  }

  return null;
}

function errorMessage(error: unknown) {
  if (!(error instanceof Error)) return String(error);
  const cause = (error as Error & { cause?: unknown }).cause;
  if (cause instanceof Error && cause.message) {
    return `${error.message} (${cause.message})`;
  }
  return error.message;
}

const BOARD_UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

function fetchJsonOnce<T>(url: string, label: string, timeoutMs: number) {
  return new Promise<T>((resolve, reject) => {
    const target = new URL(url);
    const req = https.request(
      {
        protocol: target.protocol,
        hostname: target.hostname,
        port: target.port || 443,
        path: `${target.pathname}${target.search}`,
        method: "GET",
        family: 4,
        headers: {
          Accept: "application/json,text/plain,*/*",
          "User-Agent": BOARD_UA,
          "Accept-Language": "en-US,en;q=0.9",
          Connection: "close",
        },
      },
      (res) => {
        const chunks: Buffer[] = [];
        res.on("data", (chunk: Buffer) => chunks.push(chunk));
        res.on("end", () => {
          const body = Buffer.concat(chunks).toString("utf8");
          const status = res.statusCode ?? 0;
          if (status < 200 || status >= 300) {
            reject(new Error(`${label} HTTP ${status}: ${body.slice(0, 180)}`));
            return;
          }
          try {
            resolve(JSON.parse(body) as T);
          } catch {
            reject(new Error(`${label}: invalid JSON`));
          }
        });
      },
    );

    req.setTimeout(timeoutMs, () => {
      req.destroy(new Error(`${label} timed out after ${timeoutMs}ms`));
    });
    req.on("error", (error) => {
      reject(new Error(`${label}: ${errorMessage(error)}`));
    });
    req.end();
  });
}

async function fetchJson<T>(
  url: string,
  label: string,
  opts?: { timeoutMs?: number; retries?: number },
): Promise<T> {
  const timeoutMs = opts?.timeoutMs ?? 45_000;
  const retries = opts?.retries ?? 3;
  let lastError: unknown;

  for (let attempt = 1; attempt <= retries; attempt += 1) {
    try {
      return await fetchJsonOnce<T>(url, label, timeoutMs);
    } catch (error) {
      lastError = error;
      if (attempt < retries) {
        await new Promise((r) => setTimeout(r, 700 * attempt));
      }
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error(`${label}: ${errorMessage(lastError)}`);
}

function unwrapComposioData(payload: unknown): unknown {
  const root = asRecord(payload) ?? {};
  if ("data" in root) {
    const nested = root.data;
    if (typeof nested === "string") {
      try {
        return JSON.parse(nested);
      } catch {
        return nested;
      }
    }
    return nested;
  }
  if ("response_data" in root) return root.response_data;
  if ("response" in root) return root.response;
  return payload;
}

function dedupe(leads: IncomingLead[]) {
  const seen = new Set<string>();
  const out: IncomingLead[] = [];
  for (const lead of leads) {
    const key = [
      lead.company.toLowerCase(),
      lead.role.toLowerCase(),
      (lead.linkedinUrl ?? lead.url ?? lead.contactEmail ?? "").toLowerCase(),
    ].join("::");
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(lead);
  }
  return out;
}

const REJECT_ROLE =
  /\b(principal|staff|distinguished|director|vp\b|head of|architect|tech lead|engineering manager|devops|sre|graphic|designer|product manager|project manager|data scientist|marketing|sales|account executive|customer success)\b/i;

function isRelevantEngineeringRole(role: string) {
  const r = role.toLowerCase();
  const stack =
    /software|full\s*stack|frontend|backend|react|next|node|typescript|javascript|developer|engineer|ai engineer|web developer|programmer/.test(
      r,
    );
  const freelanceish =
    /\b(freelance|freelancer|contract|contractor|consultant|gig|part[-\s]?time|hourly)\b/.test(
      r,
    );

  if (REJECT_ROLE.test(r) && !/\b(junior|associate|entry)\b/.test(r) && !freelanceish) {
    return false;
  }
  if (
    /\bsenior\b|\bsr\.?\b/.test(r) &&
    !/\b(junior|associate|entry)\b/.test(r) &&
    !freelanceish
  ) {
    return false;
  }
  return stack || (freelanceish && /dev|engineer|react|next|node|typescript|web|saas/.test(r));
}

function isFreelanceLead(role: string, description?: string | null) {
  const haystack = `${role} ${description ?? ""}`.toLowerCase();
  return /\b(freelance|freelancer|contract|contractor|consultant|gig|part[-\s]?time|hourly|project-based)\b/.test(
    haystack,
  );
}

function targetTitles(filters: LeadFilters) {
  const titles = (filters.titles ?? []).filter(Boolean);
  if (!titles.length) {
    return [
      "Software Engineer",
      "Full Stack Developer",
      "Frontend Developer",
      "Backend Developer",
      "React Developer",
    ];
  }
  // Apollo matches better with shorter core titles.
  return titles
    .map((title) =>
      title
        .replace(/^(Junior|Associate|Entry Level|Entry-Level)\s+/i, "")
        .trim(),
    )
    .filter(Boolean)
    .slice(0, 8);
}

function targetLocations(filters: LeadFilters) {
  const locations = filters.locations ?? [];
  // Apollo people locations — prefer real geos over "Remote"/"Worldwide".
  const geos = locations.filter(
    (loc) => !/remote|worldwide/i.test(loc),
  );
  return geos.length
    ? geos
    : ["Pakistan", "United States", "United Kingdom", "Canada", "Germany"];
}

/** Confirm LinkedIn account is connected in Composio. */
export async function verifyLinkedInConnection() {
  const result = await composioExecute({
    action: "LINKEDIN_GET_MY_INFO",
    params: {},
  });
  return unwrapComposioData(result.data);
}

function normalizeApolloPeople(
  payload: unknown,
  opts: { asHiringContact?: boolean; defaultRole?: string } = {},
): IncomingLead[] {
  const data = asRecord(unwrapComposioData(payload)) ?? asRecord(payload) ?? {};
  const people = (data.people ?? data.contacts ?? data.results) as
    | unknown[]
    | undefined;
  if (!Array.isArray(people)) return [];

  const leads: IncomingLead[] = [];
  for (const person of people) {
    const row = asRecord(person) ?? {};
    const org = asRecord(row.organization) ?? {};
    const company = pickString(org.name, row.organization_name, row.company);
    const title = pickString(row.title, row.headline, row.role);
    if (!company) continue;

    const linkedinUrl = pickString(
      row.linkedin_url,
      row.linkedin_profile_url,
      org.linkedin_url,
    );
    const email =
      pickString(row.email, row.work_email, row.contact_email) ??
      extractEmailFromText(
        [
          pickString(row.headline),
          pickString(org.short_description),
          JSON.stringify(row.email_status ?? ""),
        ]
          .filter(Boolean)
          .join(" "),
      );
    const phone = extractPhoneFromPerson(row);
    const name = pickString(
      row.name,
      [row.first_name, row.last_name].filter(Boolean).join(" "),
    );
    const apolloPersonId = pickString(row.id, row.person_id);

    let role: string;
    let description: string;

    if (opts.asHiringContact) {
      role = opts.defaultRole ?? "Software Engineer";
      description = [
        `Hiring contact via Apollo/LinkedIn: ${title ?? "recruiter/hiring manager"}`,
        name ? `Name: ${name}` : null,
        pickString(row.headline, org.short_description, org.industry),
        "Stack fit: TypeScript React Next.js Node.js",
      ]
        .filter(Boolean)
        .join(" — ");
    } else {
      if (!title || !isRelevantEngineeringRole(title)) continue;
      role = title.replace(/\s+/g, " ").trim();
      description = [
        pickString(row.headline, org.short_description, org.industry),
        "Sourced from Apollo (LinkedIn-indexed people search)",
      ]
        .filter(Boolean)
        .join(" — ");
    }

    leads.push({
      company,
      role,
      url: linkedinUrl,
      linkedinUrl,
      location:
        pickString(
          row.city,
          row.country,
          row.formatted_address,
          org.city,
          org.country,
        ) ?? "Remote",
      description,
      contactEmail: email,
      contactPhone: phone,
      contactName: name,
      apolloPersonId,
      source: linkedinUrl ? "apollo+linkedin" : "apollo",
    });
  }

  return leads;
}

function normalizeApolloJobPostings(
  payload: unknown,
  company: string,
  companyLinkedin?: string | null,
): IncomingLead[] {
  const data = asRecord(unwrapComposioData(payload)) ?? asRecord(payload) ?? {};
  const postings = (data.job_postings ??
    data.organization_job_postings ??
    data.jobs ??
    data.results) as unknown[] | undefined;
  if (!Array.isArray(postings)) return [];

  const leads: IncomingLead[] = [];
  for (const posting of postings) {
    const row = asRecord(posting) ?? {};
    const role = pickString(row.title, row.job_title, row.name);
    if (!role || !isRelevantEngineeringRole(role)) continue;

    const linkedinUrl = pickString(
      row.linkedin_url,
      row.url,
      row.apply_url,
      companyLinkedin,
    );

    const description = [
      pickString(row.description, row.snippet),
      "Sourced from Apollo organization job postings (LinkedIn-linked when available)",
    ]
      .filter(Boolean)
      .join(" — ");

    leads.push({
      company,
      role: role.replace(/\s+/g, " ").trim(),
      url: linkedinUrl,
      linkedinUrl: pickString(row.linkedin_url, companyLinkedin),
      location: pickString(row.city, row.country, row.location) ?? "Remote",
      description,
      contactEmail: extractEmailFromText(description),
      contactName: null,
      apolloPersonId: null,
      source: linkedinUrl ? "apollo+linkedin" : "apollo",
    });
  }
  return leads;
}

/**
 * For job-board leads missing emails: find hiring contacts at that company via Apollo
 * and attach a real work email when possible.
 */
async function attachHiringEmailsViaApollo(
  leads: IncomingLead[],
  errors: string[],
) {
  if (!hasComposioKey()) return;

  const missing = leads.filter((lead) => !lead.contactEmail).slice(0, 10);
  const orgCache = new Map<string, string | null>();
  let failCount = 0;
  let resolved = 0;
  let lastFail = "";

  for (const lead of missing) {
    const cacheKey = lead.company.toLowerCase();
    try {
      let organizationId = orgCache.get(cacheKey);
      if (organizationId === undefined) {
        const orgs = await apolloViaComposio("APOLLO_ORGANIZATION_SEARCH", {
          q_organization_name: lead.company,
          page: 1,
          per_page: 3,
        });
        const data = asRecord(orgs) ?? {};
        const organizations = (data.organizations ??
          data.accounts ??
          data.results) as unknown[] | undefined;
        const first = asRecord(organizations?.[0]) ?? {};
        organizationId = pickString(first.id, first.organization_id);
        orgCache.set(cacheKey, organizationId);

        const companyLinkedin = pickString(first.linkedin_url);
        if (companyLinkedin && !lead.linkedinUrl) {
          lead.linkedinUrl = companyLinkedin;
        }
      }

      if (!organizationId) continue;

      // Prefer verified emails, but fall back without status filter —
      // Apollo often locks addresses until PEOPLE_ENRICHMENT.
      let people = await apolloViaComposio("APOLLO_PEOPLE_SEARCH", {
        organization_ids: [organizationId],
        person_titles: [
          "Technical Recruiter",
          "Talent Acquisition",
          "Recruiter",
          "Engineering Manager",
          "Hiring Manager",
          "People Partner",
          "HR Manager",
        ],
        contact_email_status: ["verified", "likely to engage"],
        page: 1,
        per_page: 5,
      });

      let contacts = normalizeApolloPeople(people, {
        asHiringContact: true,
        defaultRole: lead.role,
      });

      if (!contacts.length) {
        people = await apolloViaComposio("APOLLO_PEOPLE_SEARCH", {
          organization_ids: [organizationId],
          person_titles: [
            "Technical Recruiter",
            "Talent Acquisition",
            "Recruiter",
            "Engineering Manager",
            "Hiring Manager",
          ],
          page: 1,
          per_page: 5,
        });
        contacts = normalizeApolloPeople(people, {
          asHiringContact: true,
          defaultRole: lead.role,
        });
      }

      const chosen =
        contacts.find((contact) => contact.contactEmail) ?? contacts[0];

      if (chosen && !chosen.contactEmail) {
        await enrichPeopleWithEmails([chosen]);
      }

      if (chosen?.contactEmail) {
        resolved += 1;
        lead.contactEmail = chosen.contactEmail;
        lead.contactName = chosen.contactName;
        if (chosen.linkedinUrl) {
          lead.linkedinUrl = chosen.linkedinUrl;
          if (!lead.url) lead.url = chosen.linkedinUrl;
        }
        lead.description = [
          lead.description,
          `Hiring contact: ${chosen.contactName ?? "recruiter"} <${chosen.contactEmail}>`,
        ]
          .filter(Boolean)
          .join(" — ");
      }
    } catch (error) {
      failCount += 1;
      lastFail = errorMessage(error);
    }
  }

  if (failCount) {
    errors.push(
      `apollo-email via Composio: ${failCount}/${missing.length} companies failed (${resolved} emails resolved). Last: ${lastFail}`,
    );
  } else if (missing.length && !resolved) {
    errors.push(
      `apollo-email via Composio: searched ${missing.length} companies, 0 emails unlocked (Apollo plan/credits or locked contacts).`,
    );
  }
}

async function enrichPeopleWithEmails(leads: IncomingLead[]) {
  if (!hasComposioKey()) return;

  const needsEnrichment = leads
    .filter(
      (lead) =>
        (!lead.contactEmail || !lead.contactPhone) &&
        (lead.apolloPersonId || lead.linkedinUrl),
    )
    .slice(0, 8);

  for (const lead of needsEnrichment) {
    try {
      const enriched = await apolloViaComposio("APOLLO_PEOPLE_ENRICHMENT", {
        ...(lead.apolloPersonId ? { id: lead.apolloPersonId } : {}),
        ...(lead.linkedinUrl ? { linkedin_url: lead.linkedinUrl } : {}),
        reveal_personal_emails: false,
        // Phone unlock needs a public webhook_url; capture any inline phones Apollo returns.
        reveal_phone_number: false,
      });
      const data = asRecord(enriched) ?? {};
      const person = asRecord(data.person) ?? data;
      const email =
        pickString(
          person.email,
          person.work_email,
          ...(Array.isArray(person.emails)
            ? person.emails.map((item) => {
                const row = asRecord(item);
                return row?.email ?? item;
              })
            : []),
        ) ?? extractEmailFromText(JSON.stringify(person));
      const phone = extractPhoneFromPerson(person);
      const linkedinUrl = pickString(
        person.linkedin_url,
        lead.linkedinUrl,
        lead.url,
      );
      if (email) lead.contactEmail = email;
      if (phone) lead.contactPhone = phone;
      if (linkedinUrl) {
        lead.linkedinUrl = linkedinUrl;
        lead.url = linkedinUrl;
        lead.source = "apollo+linkedin";
      }
    } catch {
      // Enrichment is best-effort; keep the lead without email/phone.
    }
  }
}

async function enrichCompaniesViaLinkedIn(leads: IncomingLead[]) {
  // LinkedIn toolkit cannot search arbitrary companies, but we verify the
  // connected LinkedIn account and stamp notes so outreach is LinkedIn-aware.
  try {
    const me = await verifyLinkedInConnection();
    const profile = asRecord(unwrapComposioData(me)) ?? asRecord(me) ?? {};
    const myName = pickString(
      profile.name,
      [profile.localizedFirstName, profile.localizedLastName]
        .filter(Boolean)
        .join(" "),
      profile.firstName,
    );

    for (const lead of leads) {
      const stamp = myName
        ? `LinkedIn connected as ${myName}`
        : "LinkedIn connected via Composio";
      lead.description = [lead.description, stamp].filter(Boolean).join(" — ");
      if (lead.linkedinUrl) lead.source = "apollo+linkedin";
    }
  } catch (error) {
    throw new Error(
      `LinkedIn connection check failed. Connect LinkedIn in Composio for user ${process.env.COMPOSIO_USER_ID ?? "default"}. ${errorMessage(error)}`,
    );
  }
}

/** Free remote jobs from Jobicy (includes contract/freelance-friendly listings). */
export async function fetchJobicyLeads(
  _filters: LeadFilters,
): Promise<IncomingLead[]> {
  const tags = ["typescript", "javascript", "react", "nodejs"];
  const results = await Promise.allSettled(
    tags.map((tag) =>
      fetchJson<{
        jobs?: Array<Record<string, unknown>>;
      }>(`https://jobicy.com/api/v2/remote-jobs?count=40&tag=${tag}`, `Jobicy(${tag})`, {
        timeoutMs: 45_000,
        retries: 3,
      }),
    ),
  );

  const leads: IncomingLead[] = [];
  const failures: string[] = [];

  for (const result of results) {
    if (result.status === "rejected") {
      failures.push(errorMessage(result.reason));
      continue;
    }
    for (const job of result.value.jobs ?? []) {
      const company = pickString(job.companyName, job.company);
      const role = pickString(job.jobTitle, job.title);
      if (!company || !role || !isRelevantEngineeringRole(role)) continue;
      const description = pickString(
        job.jobExcerpt,
        job.jobDescription,
        Array.isArray(job.jobIndustry) ? job.jobIndustry.join(" ") : null,
      );
      const url = pickString(job.url, job.jobUrl, job.applyUrl);
      const freelance = isFreelanceLead(role, description);
      leads.push({
        company,
        role: role.replace(/\s+/g, " ").trim(),
        url,
        location: pickString(job.jobGeo, job.jobType) ?? "Remote",
        description,
        contactEmail: extractEmailFromText(description),
        source: freelance ? "freelance" : "jobicy",
      });
    }
  }

  if (!leads.length && failures.length === results.length) {
    throw new Error(failures.join(" | "));
  }

  return dedupe(leads);
}

/** Free remote jobs from Arbeitnow. */
export async function fetchArbeitnowLeads(
  _filters: LeadFilters,
): Promise<IncomingLead[]> {
  const json = await fetchJson<{
    data?: Array<Record<string, unknown>>;
  }>("https://www.arbeitnow.com/api/job-board-api", "Arbeitnow", {
    timeoutMs: 45_000,
    retries: 3,
  });

  const leads: IncomingLead[] = [];
  for (const job of json.data ?? []) {
    const company = pickString(job.company_name, job.company);
    const role = pickString(job.title, job.position);
    if (!company || !role || !isRelevantEngineeringRole(role)) continue;

    const tags = Array.isArray(job.tags) ? job.tags.join(" ") : "";
    const description = pickString(job.description, tags);
    const blob = `${role} ${description} ${tags}`.toLowerCase();
    if (
      !/react|typescript|javascript|next|node|full.?stack|frontend|backend|software/.test(
        blob,
      )
    ) {
      continue;
    }

    const url = pickString(job.url, job.apply_url);
    const freelance = isFreelanceLead(role, description) || /freelance|contract/i.test(tags);
    leads.push({
      company,
      role: role.replace(/\s+/g, " ").trim(),
      url,
      location: pickString(job.location) ?? "Remote",
      description,
      contactEmail: extractEmailFromText(description),
      source: freelance ? "freelance" : "arbeitnow",
    });
  }

  return dedupe(leads);
}

/** Apollo people via Composio Connect MCP (connected Apollo app). */
export async function fetchApolloPeopleLeads(filters: LeadFilters) {
  const errors: string[] = [];
  const leads: IncomingLead[] = [];
  const titles = targetTitles(filters);
  const locations = targetLocations(filters);
  const limit = Math.min(filters.dailyCap ?? 15, 25);
  const keywords = (filters.keywords ?? [])
    .filter((k) => !/remote|saas/i.test(k))
    .slice(0, 4)
    .join(" ");

  try {
    const engineers = await apolloViaComposio("APOLLO_PEOPLE_SEARCH", {
      person_titles: titles,
      person_locations: locations,
      person_seniorities: ["entry", "senior"],
      q_keywords: keywords || "typescript react next.js",
      page: 1,
      per_page: limit,
      contact_email_status: ["verified", "likely to engage"],
    });
    leads.push(...normalizeApolloPeople(engineers));
  } catch (error) {
    errors.push(`APOLLO_PEOPLE_SEARCH(engineers): ${errorMessage(error)}`);
  }

  try {
    const hirers = await apolloViaComposio("APOLLO_PEOPLE_SEARCH", {
      person_titles: [
        "Engineering Manager",
        "Technical Recruiter",
        "Talent Acquisition",
        "Hiring Manager",
        "CTO",
      ],
      person_locations: locations,
      q_keywords: "software engineer hiring",
      page: 1,
      per_page: Math.min(limit, 15),
      contact_email_status: ["verified", "likely to engage"],
    });
    leads.push(
      ...normalizeApolloPeople(hirers, {
        asHiringContact: true,
        defaultRole: titles[0] ?? "Software Engineer",
      }),
    );
  } catch (error) {
    errors.push(`APOLLO_PEOPLE_SEARCH(hirers): ${errorMessage(error)}`);
  }

  return { leads: dedupe(leads), errors };
}

/** Apollo org jobs via Composio Connect MCP (connected Apollo app). */
export async function fetchApolloJobLeads(filters: LeadFilters) {
  const errors: string[] = [];
  const leads: IncomingLead[] = [];
  void filters;

  try {
    const orgs = await apolloViaComposio("APOLLO_ORGANIZATION_SEARCH", {
      q_organization_keyword_tags: [
        "software",
        "saas",
        "information technology",
      ],
      organization_locations: [
        "United States",
        "Pakistan",
        "United Kingdom",
        "Canada",
        "Germany",
      ],
      organization_num_employees_ranges: ["11,50", "51,200", "201,500"],
      page: 1,
      per_page: 6,
    });

    const data = asRecord(orgs) ?? {};
    const organizations = (data.organizations ??
      data.accounts ??
      data.results) as unknown[] | undefined;

    for (const org of organizations?.slice(0, 4) ?? []) {
      const row = asRecord(org) ?? {};
      const organizationId = pickString(row.id, row.organization_id);
      const company = pickString(row.name, row.organization_name);
      const companyLinkedin = pickString(row.linkedin_url, row.website_url);
      if (!organizationId || !company) continue;

      try {
        const jobs = await apolloViaComposio(
          "APOLLO_GET_ORGANIZATION_JOB_POSTINGS",
          {
            organization_id: organizationId,
            page: 1,
            per_page: 10,
          },
        );
        leads.push(
          ...normalizeApolloJobPostings(jobs, company, companyLinkedin),
        );
      } catch (error) {
        errors.push(`APOLLO_JOBS(${company}): ${errorMessage(error)}`);
      }
    }
  } catch (error) {
    errors.push(`APOLLO_ORGANIZATION_SEARCH: ${errorMessage(error)}`);
  }

  return { leads: dedupe(leads), errors };
}

export function buildSourceBreakdown(leads: IncomingLead[]) {
  const counts: Record<string, number> = {};
  for (const lead of leads) {
    counts[lead.source] = (counts[lead.source] ?? 0) + 1;
  }
  return Object.entries(counts)
    .map(([source, count]) => ({ source, count }))
    .sort((a, b) => b.count - a.count);
}

function isApolloPlanBlocked(errors: string[]) {
  return errors.some((error) =>
    /free plan|aren't included|upgrade your plan|api_inaccessible|mixed_people\/api_search|mixed_companies\/search|people\/match|people\/bulk_match/i.test(
      error,
    ),
  );
}

/**
 * Intake sources (real data only, no mocks):
 * 1. Jobicy + Arbeitnow (free boards, includes freelance/contract)
 * 2. Apollo via Composio when plan allows People Search (paid Apollo)
 * 3. Optional LinkedIn stamp via Composio
 */
export async function fetchOrganicLeads(filters: LeadFilters) {
  const errors: string[] = [];
  const collected: IncomingLead[] = [];

  const boardTasks: Array<Promise<void>> = [
    fetchJobicyLeads(filters)
      .then((rows) => {
        collected.push(...rows);
      })
      .catch((error: unknown) => {
        errors.push(`jobicy: ${errorMessage(error)}`);
      }),
    fetchArbeitnowLeads(filters)
      .then((rows) => {
        collected.push(...rows);
      })
      .catch((error: unknown) => {
        errors.push(`arbeitnow: ${errorMessage(error)}`);
      }),
  ];

  const apolloTasks: Array<Promise<void>> = [];
  const apolloEnabled =
    hasComposioKey() && process.env.COMPOSIO_SKIP_APOLLO !== "1";

  if (hasComposioKey()) {
    try {
      const connections = await ensureComposioConnections([
        "gmail",
        "linkedin",
      ]);
      if (!connections.ok) {
        errors.push(connections.help);
      }
    } catch (error) {
      errors.push(`composio-connections: ${errorMessage(error)}`);
    }
  }

  if (apolloEnabled) {
    apolloTasks.push(
      fetchApolloPeopleLeads(filters).then((result) => {
        collected.push(...result.leads);
        errors.push(...result.errors);
      }),
      fetchApolloJobLeads(filters).then((result) => {
        collected.push(...result.leads);
        errors.push(...result.errors);
      }),
    );
  }

  await Promise.all([...boardTasks, ...apolloTasks]);

  if (isApolloPlanBlocked(errors)) {
    errors.push(
      "Apollo Free blocks People/Org Search + Enrichment. CRM will keep using Jobicy/Arbeitnow until you upgrade Apollo or set COMPOSIO_SKIP_APOLLO=1.",
    );
  }

  let leads = dedupe(collected);

  const apolloUsable =
    apolloEnabled &&
    !isApolloPlanBlocked(errors) &&
    leads.some(
      (lead) => lead.source === "apollo" || lead.source === "apollo+linkedin",
    );

  if (apolloUsable) {
    const apolloLeads = leads.filter(
      (lead) => lead.source === "apollo" || lead.source === "apollo+linkedin",
    );
    if (apolloLeads.length) {
      await enrichPeopleWithEmails(apolloLeads);
    }
    await attachHiringEmailsViaApollo(leads, errors);
  }

  if (hasComposioKey()) {
    try {
      await enrichCompaniesViaLinkedIn(
        leads.filter(
          (lead) =>
            lead.source === "apollo" || lead.source === "apollo+linkedin",
        ),
      );
    } catch (error) {
      errors.push(`linkedin(optional): ${errorMessage(error)}`);
    }
  }

  leads = dedupe(leads)
    .filter((lead) => hasApplyPath(lead))
    .sort((a, b) => {
      const rank = (lead: IncomingLead) =>
        (lead.contactEmail ? 8 : 0) +
        (lead.linkedinUrl ? 3 : 0) +
        (lead.source === "freelance" ? 2 : 0) +
        (lead.source === "apollo+linkedin" ? 2 : 0) +
        (lead.source === "apollo" ? 1 : 0);
      return rank(b) - rank(a);
    });

  const withEmail = leads.filter((lead) => lead.contactEmail).length;
  const sourceBreakdown = buildSourceBreakdown(leads);

  if (!leads.length) {
    throw new Error(
      `No actionable leads (need company email, apply form, or LinkedIn URL). Details: ${
        errors.join(" | ") || "empty responses"
      }`,
    );
  }

  if (!withEmail) {
    errors.push(
      "No company emails this run — Approve opens apply/LinkedIn URLs. Email unlock needs paid Apollo (or paste a hiring email on the lead).",
    );
  }

  return { leads, errors, sourceBreakdown };
}
