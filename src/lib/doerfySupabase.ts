import { createClient } from '@supabase/supabase-js'

// Doerfy app Supabase instance.
// The value calculator uses a separate BigTopa instance (src/lib/supabase.ts).
// This client is for marketing data that belongs in the Doerfy product DB:
//   - marketing_leads  (beta signups, lead capture)
//   - form_submissions (if a form builder form is wired up later)
const url = process.env.NEXT_PUBLIC_DOERFY_SUPABASE_URL || 'https://placeholder.supabase.co'
const key = process.env.NEXT_PUBLIC_DOERFY_SUPABASE_ANON_KEY || 'placeholder-key'

export const doerfySupabase = createClient(url, key)

// ── Types aligned to the marketing_leads table in packages/database/prisma/schema.prisma
export interface MarketingLeadInsert {
  email: string
  source?: string          // e.g. 'doerfy_marketing_homepage'
  lead_type?: string       // e.g. 'beta'
  referring_url?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
  status?: string          // default 'new'
  cohort_tags?: string[]   // e.g. ['beta_2026']
  survey_data?: Record<string, unknown>  // first_name, primary_focus, etc.
}
