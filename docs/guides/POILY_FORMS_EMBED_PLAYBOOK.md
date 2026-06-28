# Embedding Poily Forms on a Marketing Site — Agent Playbook

Direction for any marketing-site agent wiring up a form hosted on the **Poily**
admin platform (`app.poily.com`). Written from the Doerfy cutover; generalize the
tenant-specific names. The Doerfy reference implementation is
`doerfy-marketing/src/app/page.tsx`.

---

## 1. Mental model (read this first — it's where everyone gets confused)

- **Poily** is the forms/CRM platform. Admin UI is `app.poily.com`, **org/tenant-scoped** (pick the right org, e.g. "Doerfy").
- Each tenant product gets a **custom forms domain** (e.g. `forms.doerfy.com`). That domain serves:
  - `/embed/forms.js` — a small **loader** script
  - `/f/:slug?embed=1` — the actual **form renderer** (runs in an iframe)
- `forms.js` does **not** post anything itself. It injects an `<iframe src=".../f/:slug?embed=1&...">`. The GraphQL submit happens **inside that iframe**, to the **Poily admin-api gateway**.
  - For Doerfy that gateway is `ju1sxvytc1.execute-api.us-east-1.amazonaws.com/.../graphql` (`"service":"admin-api"`). It's the platform admin-api — confirm the current host, but it should be the same across Poily tenants.

```
marketing page
  └─ <script forms.js>  (loader on forms.<product>.com)
        └─ <iframe /f/:slug?embed=1&placement=…&utm_*=…&ref=…&lp=…>
              └─ POST SubmitForm → ju1sxvytc1…/graphql  (Poily admin-api)
                    └─ app.poily.com → [org] → Submissions / Forms → Responses
```

### ⚠️ The #1 trap: legacy origins that *look* like success
A retired product forms domain (e.g. `dev.<product>.com`) or an old product API
gateway will happily return **200 + a real submission id + a "success" toast** —
while writing to the **wrong database**. **A success message is NOT proof the data
reached Poily.** Always verify the POST host (Section 6).

---

## 2. Source of truth: the Distribution tab
Before writing any code, open `app.poily.com → Forms → [your form] → **Distribution**`.
It gives you the canonical, copy-paste-correct:
- embed **origin** (the custom forms domain)
- form **slug**
- the `<script>` tag, the inline `<div>` snippet, and the iframe fallback

**Do not assume** the embed attribute (`data-doerfy-form`) or global function
(`window.__doerfyOpenForm`) names are identical across tenants — copy them verbatim
from that tab. (For Doerfy they are `data-doerfy-form` and `__doerfyOpenForm`.)

---

## 3. Prep checklist (confirm with the admin-platform agent BEFORE coding)
- [ ] Custom forms domain is **live**, bound to the **correct tenant** AND the **prod** environment (not a `/dev` API stage).
- [ ] Form **slug**.
- [ ] The forms domain allows being **iframed** by your site (no blocking `X-Frame-Options`). CORS keys off the **iframe origin**, so the host page itself needs no CORS config.
- [ ] **UTM + referrer auto-capture** is on: `forms.js` forwards the parent page's `utm_*` (from `location.search`), `document.referrer` (`ref`), and landing URL (`lp`) into the iframe. **No host wiring needed** — don't build your own lead-capture path.
- [ ] **Placement** convention + which field/column it lands in (per-CTA attribution).

---

## 4. Implementation pattern (Next.js/React reference)
- Put the origin in an **env var**, never hardcoded; default to the live custom domain; **no trailing slash** (the loader builds `${ORIGIN}/embed/forms.js`).
- Centralize the slug in a constant.
- Tag each CTA with a distinct `placement`.

```tsx
const FORMS_ORIGIN =
  process.env.NEXT_PUBLIC_<PRODUCT>_FORMS_ORIGIN || 'https://forms.<product>.com'
const FORM_SLUG = '<slug-from-distribution-tab>'

// loader
<Script src={`${FORMS_ORIGIN}/embed/forms.js`} strategy="lazyOnload" />

// inline embed
<div data-doerfy-form data-slug={FORM_SLUG} data-mode="inline" data-placement="home_inline" />

// popup / slider / sidetab CTA
<button onClick={() => window.__doerfyOpenForm(FORM_SLUG, 'popup', undefined, 'dark', 'home_nav')}>
```

Declare the global:
```ts
declare global {
  interface Window {
    __doerfyOpenForm: (slug: string, mode: string, color?: string, theme?: string, placement?: string) => void
  }
}
```

---

## 5. SPA / React + deployment gotchas
- The **inline** iframe is injected into your `<div>` via `innerHTML` on page load. Keep that div a **plain, stable, empty** element; don't let your framework **unmount/remount** it. (The popup iframe attaches to `document.body`, so it's immune.)
- `NEXT_PUBLIC_*` is **build-time inlined**: set it in the host platform env (Netlify/Vercel) **and redeploy**; locally, **restart** the dev server after editing `.env.local`.
- **Stale cache after a cutover:** because the inline iframe loads on page load, an old cached renderer can stick around for already-visited sessions. Always test in **incognito**.

---

## 6. Verification protocol (definitive — do not skip)
1. **Incognito / hard refresh.**
2. Submit **every** entry point — each popup CTA *and* the inline form.
3. **DevTools → Network:** the `SubmitForm` POST must hit the **Poily admin-api gateway** (`ju1sxvytc1…/graphql`). Any other host = legacy/wrong target.
4. Confirm the row appears in `app.poily.com → [tenant org] → **Submissions**` (and `Forms → [form] → **Responses**`).
5. Verify **placement** + **utm/ref** are populated on the row.
6. **Never trust the success toast alone.**

---

## 7. Failure modes → diagnosis
| Symptom | Likely cause | Fix |
|---|---|---|
| Submit "succeeds" but nothing in Poily | POST hit a **legacy gateway** — old domain still embedded, or change not redeployed; or wrong tenant/env stage | Verify POST host; point loader at the prod custom domain; redeploy |
| Inline fails but popup works (or vice-versa) | **Stale cached inline iframe**, or the inline `<div>` got unmounted by the SPA | Retest in incognito; keep the embed div stable |
| Form renders, 404 in console | A non-fatal sub-resource | Identify the URL; ignore if the submit POST is 200 to the right gateway |
| Renderer looks old / wrong | CDN cache on `/embed/forms.js` or `/f/*`; domain not bound to prod tenant | Ask admin-platform to purge cache / rebind domain |

---

## 8. When to escalate to the admin-platform agent
- POST hits a non-Poily gateway **even after a clean redeploy** → the forms domain is bound to the wrong env/tenant, or a CDN purge/rebind is needed.
- Submissions reach `ju1sxvytc1` (200/ok) but **don't appear** in the org's view → tenant-tagging or renderer issue. Hand over evidence that the loader treats all modes **symmetrically** (in `forms.js`, inline and popup both call the same `createIframe(buildFormUrl(...))`), so the divergence is on the platform side.
