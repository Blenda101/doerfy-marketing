# Beta Onboarding Flow — Agent Handoff

**Date:** May 2026
**Prepared by:** Cowork session (marketing site agent)
**Scope:** This agent owns the beta tester flow end-to-end — from lead approval through account creation, magic link delivery, onboarding wizard adaptation, and domain wiring. The marketing site content and design remains with the original agent.

---

## Context

Doerfy is in closed beta. The new marketing site (`doerfy-marketing`, a Next.js app) will replace the current public-facing pages. The existing `apps/web` app (Vite + React, port 5173) handles auth, onboarding, and the product itself.

The goal is a clean handoff from marketing → beta signup → account activation, without exposing plan selection or Stripe to beta testers.

---

## Monorepo Structure

```
doerfy/                          ← main monorepo (apps/web + apps/api + packages/*)
doerfy-marketing/                ← separate Next.js marketing site (this repo)
```

Both are separate repos/apps. The marketing site is deployed independently (Netlify). The main app (`apps/web`) is the product.

---

## Current Flow (to be adapted)

```
/landing  →  Try Now (saves scope+plan to localStorage)
         →  /auth  (sign up or sign in)
         →  /onboarding  (wizard: scope → profile → plan/Stripe → business → team → quickwin → complete)
         →  /  (app)
```

**Key files in `apps/web`:**

| File | Purpose |
|---|---|
| `screens/Landing/Landing.tsx` | Current pricing/product page |
| `screens/Auth/Auth.tsx` | Sign in / sign up |
| `modules/onboarding/components/` | All wizard step components |
| `modules/onboarding/hooks/useOnboardingState.ts` | Step state machine |
| `modules/onboarding/types.ts` | `getStepsForScope()` — step list by scope |
| `modules/onboarding/components/OnboardingGuard.tsx` | Redirects incomplete users to `/onboarding` |
| `apps/api/src/marketing-leads/` | Lead capture resolver |
| `apps/api/src/admin/admin.resolver.ts` | User management, admin queries |

**Key database tables (`packages/database/prisma/schema.prisma`):**

| Table | Relevant fields |
|---|---|
| `marketing_leads` | email, status, type, source, cohort |
| `users` | id, email, role, onboarding_complete |
| `plans` / `prices` | plan definitions |

---

## Target Beta Flow

```
Marketing site beta form
    → Lead captured in marketing_leads (status: new, type: beta)
    → Admin reviews in Lead Manager (/admin/marketing)
    → Admin clicks "Approve for Beta"
    → System: creates user account (email only, no password), assigns beta cohort
    → System: sends magic link email (time-limited token, 48hr)
    → User clicks link → lands at /auth/magic?token=xxx
    → Auth resolves token → sets session
    → Redirects to /onboarding with beta flag
    → Onboarding wizard runs BETA path (skips: ScopeSelector, PlanSelector, Stripe)
    → Beta path steps: ProfileSetup → DoerfyIntro → QuickWin → Complete
    → User lands in app at /
```

---

## Tasks

### 1. Admin — "Approve for Beta" action

**File:** `apps/web/src/modules/admin/` (Lead Manager UI) + `apps/api/src/marketing-leads/` resolver

- Add "Approve for Beta" button to each lead row in the Lead Manager
- On click: GraphQL mutation `approveLeadForBeta(leadId)` that:
  - Creates a `users` record with the lead's email (no password — passwordless account)
  - Assigns `cohort: "beta"` and `type: "beta"` on the lead
  - Updates lead status from `new` → `approved`
  - Generates a magic link token (store in DB with expiry)
  - Triggers welcome email with magic link

### 2. Magic Link Auth

**File:** `apps/web/src/screens/Auth/Auth.tsx` + new route `/auth/magic`

- New route `/auth/magic?token=xxx`
- On load: call `verifyMagicToken(token)` mutation
- If valid: establish session, mark token used, redirect to `/onboarding?beta=true`
- If expired/invalid: show friendly error with option to request a new link

**Backend:** `apps/api/src/` — new `magic-links` resolver or extend auth resolver
- `generateMagicToken(userId)` — creates token with 48hr expiry
- `verifyMagicToken(token)` — validates, returns JWT session, invalidates token

### 3. Onboarding Wizard — Beta Path

**File:** `apps/web/src/modules/onboarding/types.ts` — update `getStepsForScope()`

Add a `beta` scope/path that returns:
```ts
['profile', 'intro', 'quickwin', 'complete']
```
Skips: `scope`, `plan`, `business`, `team`

**File:** `modules/onboarding/hooks/useOnboardingState.ts`
- Detect `?beta=true` on mount
- Set scope to `beta`, skip plan/Stripe steps entirely
- Auto-assign beta plan (see task 4)

**File:** `modules/onboarding/components/OnboardingGuard.tsx`
- Beta users should not be redirected to plan selection if onboarding incomplete
- Guard should respect beta path

### 4. Beta Plan Assignment

**File:** `apps/api/src/` — extend `approveLeadForBeta` or `verifyMagicToken`

- On account creation or onboarding completion, auto-assign a `beta` plan
- Beta plan: defined in `plans` table — full Personal-tier access, no Stripe subscription required
- Check `packages/database/prisma/migrations/20260403120000_deprecate_enterprise_plan/migration.sql` for active plan keys before seeding

### 5. Password Setup

**File:** `apps/web/src/modules/onboarding/components/ProfileSetup.tsx`

- Add a "Set your password" field to the ProfileSetup step (optional or required)
- On save: call `setPassword(password)` mutation — updates the passwordless account
- If skipped: user can set password later in Settings

### 6. Domain Wiring — Marketing Site → App

The new marketing site (`doerfy-marketing`) is deployed on Netlify. The "Join the Beta" CTA currently posts to a Supabase-backed form.

**What needs to connect:**
- Beta form submission on marketing site → `marketing_leads` table in the main app DB
- Current form uses: `doerfy-marketing/src/lib/doerfySupabase.ts` — posts directly to Supabase
- This works fine and can remain as-is for now (lead capture only, no auth involved)

**Domain routing (handled at DNS/Netlify level, not in code):**
- `doerfy.com` → marketing site (doerfy-marketing, Netlify)
- `app.doerfy.com` → main app (apps/web, wherever hosted)
- Auth/onboarding links in magic link emails should point to `app.doerfy.com/auth/magic?token=xxx`

---

## Decisions Already Made

| Decision | Answer |
|---|---|
| Beta testers choose a plan? | No — auto-assigned beta tier |
| Stripe during beta onboarding? | No — skip entirely |
| Account creation method | Admin-initiated (not self-serve) |
| Auth method for first login | Magic link (email token) |
| Password | Optional during onboarding, can set later |
| Who controls beta access | Admin via Lead Manager |

---

## What This Agent Should NOT Touch

- `doerfy-marketing/src/app/page.tsx` — homepage content and design (separate agent)
- Any manifesto, method, or brand copy pages
- The landing page builder (`/admin/landing-pages`)
- Stripe subscription logic for non-beta flows — existing paid flow must remain intact

---

## Success Criteria

- [ ] Admin can approve a lead and trigger account creation + magic link email in one click
- [ ] User receives email, clicks link, lands in onboarding without a password
- [ ] Onboarding wizard completes without showing plan selector or Stripe
- [ ] User lands in the app with a functional beta account
- [ ] Existing non-beta auth/onboarding/Stripe flow is unaffected
- [ ] Magic link tokens expire after 48 hours
- [ ] Password can be set during ProfileSetup or later in Settings

---

## Open Questions for the New Agent to Resolve

1. **Email delivery:** Is there an existing email sending service wired up (Resend, SendGrid, etc.)? Check `apps/api/src/` for email send utilities before building the magic link mailer.
2. **Magic link token storage:** Add to `users` table or a new `magic_tokens` table? A separate table is cleaner (supports multiple pending tokens, easy expiry cleanup).
3. **Beta plan key:** Confirm the exact plan key from the migrations file before seeding — do not guess.
4. **Onboarding complete detection:** Confirm what field marks onboarding as done (`users.onboarding_complete`? a step record?) so `OnboardingGuard` logic is correct for beta users.
