# Forms Migration — Handoff to admin-platform

**Status:** Open — awaiting admin-platform decisions on items 1, 2, 4.
**Owner of marketing-side change:** doerfy-marketing agent (small; blocked on the decisions below).
**Date:** 2026-06-25

---

## TL;DR

The marketing homepage still loads its form embed from the **old** instance
(`dev.doerfy.com`), so every beta signup posts to the old backend. The form was
migrated to the new standalone forms tool (currently
`master.d335ogduim4e2i.amplifyapp.com`). The new tool exposes the same embed API
and slug, so the mechanical cut-over is a one-line origin swap — but we should
fix the underlying issues (non-canonical domain, attribution capture, per-CTA
source) at the same time rather than baking in another fragile URL.

---

## Root cause

One line in the marketing site points at the old instance:

```tsx
// src/app/page.tsx:471
<Script src="https://dev.doerfy.com/embed/forms.js" strategy="lazyOnload" />
```

That script defines `window.__doerfyOpenForm` and hydrates the
`data-doerfy-form` div. Even though the slug `beta-signup-form-1e59ea` is
identical on both tools, **submissions go to whichever backend served
`forms.js`** — i.e. the old instance.

## Current consumer (doerfy-marketing homepage)

The homepage embeds the same slug (`beta-signup-form-1e59ea`) three ways:

| Placement | Mechanism | Location |
| --- | --- | --- |
| Nav "Join the Movement" | `window.__doerfyOpenForm(slug, 'popup', undefined, 'dark')` | `src/app/page.tsx:492` |
| Hero "Join the Movement" | `window.__doerfyOpenForm(slug, 'popup', undefined, 'dark')` | `src/app/page.tsx:514` |
| Inline beta section | `<div data-doerfy-form data-slug=... data-mode="inline">` | `src/app/page.tsx:1179` |

Embed API surface (must be preserved on the new domain):
`/embed/forms.js`, `/f/:slug`, `window.__doerfyOpenForm(slug, mode, color, theme)`.

The marketing site will reference the new origin via an env var
(`NEXT_PUBLIC_DOERFY_FORMS_ORIGIN`), **not** a hardcoded URL.

---

## Decisions needed from admin-platform

### 1 — Custom domain

- Need a stable, branded origin for the forms tool, consistent with
  admin-platform's per-product / per-productline domain convention.
  Working name: `forms.doerfy.com`.
- Currently served at the raw Amplify branch URL
  `master.d335ogduim4e2i.amplifyapp.com` — non-canonical, unbranded, can rotate.
- Must serve the embed paths **cross-origin**: `/embed/forms.js`, `/f/:slug`
  with **CORS** allowing `doerfy.com` (and future product marketing sites).
  This is shared infra across productlines — design an allow-list, not a single
  hardcoded host.

### 2 — UTM + referrer capture

At submit time the embed must capture and persist:

- `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`
- `document.referrer` → `referring_url`
- the host landing-page URL

These map to existing `marketing_leads` columns.

**Decision:** does `forms.js` already auto-collect these from the **parent**
page's `location.search` + `document.referrer`?

- Preference: **auto-collect in the parent script and forward into the iframe**,
  so every embed on every product site gets attribution for free with zero
  per-site wiring.
- Gotcha to avoid: if the form renders in an **iframe**, the iframe's own URL has
  no UTMs — the parent script must read the parent URL/referrer and pass them in.

### 4 — Per-CTA source attribution

Three CTAs, one slug — currently indistinguishable. Want each submission tagged
with its placement.

Needs embed API support for a placement value:

- extra arg on `__doerfyOpenForm(slug, mode, color, theme, source)`
- `data-source` attribute on the inline `data-doerfy-form` div
- stored as a hidden field on the submission

Proposed values: `homepage_nav`, `homepage_hero`, `homepage_beta_inline`.

**Decision:** `marketing_leads.source` already holds a product-level value
(e.g. `doerfy_marketing_homepage`). Recommend adding a **separate `placement`
field** rather than overloading `source` — keeps "which product" and "which
button" as clean, independent attribution dimensions.

---

## Item 3 — Historical data

No migration. Clean cut-over going forward. (Nothing for admin-platform to do.)

---

## Marketing-side follow-up (once 1, 2, 4 are confirmed)

Small and owned by the doerfy-marketing agent:

1. Swap the embed origin to `NEXT_PUBLIC_DOERFY_FORMS_ORIGIN` (replaces the
   hardcoded `dev.doerfy.com`).
2. Add `source` to the two `__doerfyOpenForm` calls + `data-source` on the inline
   div (`homepage_nav`, `homepage_hero`, `homepage_beta_inline`).
3. Clean up the now-dead direct-Supabase path: `src/lib/doerfySupabase.ts` is not
   imported anywhere.
4. Fix the stale handoff doc line:
   `docs/guides/BETA_ONBOARDING_AGENT_HANDOFF.md:147` still claims the form posts
   directly via `doerfySupabase.ts` — it actually uses the embed widget.
