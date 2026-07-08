'use client'

import { useEffect } from 'react'

/**
 * Wires any in-article CTA capture form (`.cta-embed`) inside Poily-rendered blog
 * bodyHtml to its capture endpoint. The body HTML carries the form markup + data
 * attributes (data-capture-url / data-tenant / data-post / data-form); Poily never
 * ships an inline script into bodyHtml, so the site supplies the submit wiring.
 * Mirrors the managed full-page path's behavior (source_post_id + UTM attribution).
 * Render once on any page that injects blog bodyHtml.
 */
export default function BlogCtaWiring() {
  useEffect(() => {
    const utm = () => {
      const p = new URLSearchParams(window.location.search)
      const o: Record<string, string> = {}
      ;['source', 'medium', 'campaign', 'term', 'content'].forEach((k) => {
        const v = p.get('utm_' + k)
        if (v) o['utm_' + k] = v
      })
      return o
    }

    const cleanups: Array<() => void> = []
    document.querySelectorAll<HTMLElement>('.cta-embed').forEach((sec) => {
      const form = sec.querySelector('form')
      const status = sec.querySelector<HTMLElement>('.cta-embed-status')
      const url = sec.dataset.captureUrl
      if (!form || !url) return // inert (no endpoint stamped)

      const onSubmit = (e: Event) => {
        e.preventDefault()
        const input = form.querySelector<HTMLInputElement>('input[name="email"]')
        const email = input?.value || ''
        if (!email) return
        const btn = form.querySelector<HTMLButtonElement>('button[type="submit"]')
        if (btn) btn.disabled = true
        if (status) status.textContent = 'Submitting…'
        const body = {
          email,
          tenant_id: sec.dataset.tenant,
          post_id: sec.dataset.post,
          form_id: sec.dataset.form,
          ...utm(),
        }
        fetch(url, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(body),
        })
          .then((r) => (r.ok ? r.json() : Promise.reject()))
          .then(() => {
            if (status) status.textContent = "Thanks — you're subscribed!"
            form.reset()
          })
          .catch(() => {
            if (status) status.textContent = 'Something went wrong. Please try again.'
          })
          .finally(() => {
            if (btn) btn.disabled = false
          })
      }

      form.addEventListener('submit', onSubmit)
      cleanups.push(() => form.removeEventListener('submit', onSubmit))
    })

    return () => cleanups.forEach((c) => c())
  }, [])

  return null
}
