import type { ColumnType, Generated, Insertable, Selectable, Updateable } from "kysely";

export type LeadStatus =
  | "new"
  | "ready"
  | "approved"
  | "applied"
  | "rejected"
  | "skipped";

export type ApplicationChannel = "gmail" | "linkedin" | "manual";

export interface CrmLeadsTable {
  id: Generated<string>;
  company: string;
  role: string;
  url: string | null;
  source: string;
  location: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  fit_score: number;
  status: LeadStatus;
  notes: string | null;
  raw: ColumnType<unknown | null, unknown | null, unknown | null>;
  created_at: Generated<Date>;
  updated_at: Generated<Date>;
}

export interface CrmResumeVariantsTable {
  id: Generated<string>;
  lead_id: string;
  title: string;
  content: string;
  highlights: ColumnType<unknown | null, unknown | null, unknown | null>;
  created_at: Generated<Date>;
}

export interface CrmApplicationsTable {
  id: Generated<string>;
  lead_id: string;
  channel: ApplicationChannel;
  cover_draft: string | null;
  result: string | null;
  error: string | null;
  sent_at: Date | null;
  created_at: Generated<Date>;
}

export interface CrmDailyRunsTable {
  id: Generated<string>;
  started_at: Generated<Date>;
  finished_at: Date | null;
  leads_found: number;
  leads_inserted: number;
  errors: string | null;
  summary: string | null;
}

export interface CrmSettingsTable {
  key: string;
  value: ColumnType<unknown, unknown, unknown>;
  updated_at: Generated<Date>;
}

export interface Database {
  crm_leads: CrmLeadsTable;
  crm_resume_variants: CrmResumeVariantsTable;
  crm_applications: CrmApplicationsTable;
  crm_daily_runs: CrmDailyRunsTable;
  crm_settings: CrmSettingsTable;
}

export type CrmLead = Selectable<CrmLeadsTable>;
export type NewCrmLead = Insertable<CrmLeadsTable>;
export type CrmLeadUpdate = Updateable<CrmLeadsTable>;
