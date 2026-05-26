'use client'

import React, { useState } from 'react'
import { useValueCalculator } from '../../../context/ValueCalculatorContext'
import { KNOWN_SITES } from '../../../types'

const SitesManager: React.FC = () => {
  const { apps, updateApp } = useValueCalculator()
  const [saving, setSaving] = useState<string | null>(null)

  const isOnSite = (appSites: string[] | undefined, siteId: string) => {
    const sites = appSites || []
    return sites.length === 0 || sites.includes(siteId)
  }

  const toggleSite = async (appId: string, siteId: string) => {
    const app = apps.find(a => a.id === appId)
    if (!app) return

    const currentSites = app.sites || []
    let newSites: string[]

    if (currentSites.length === 0) {
      // Showing everywhere — restrict to all sites except this one
      newSites = KNOWN_SITES.map(s => s.id).filter(id => id !== siteId)
    } else if (currentSites.includes(siteId)) {
      newSites = currentSites.filter(s => s !== siteId)
      // If all sites now checked, normalise back to empty (show everywhere)
      if (newSites.length === 0) newSites = []
    } else {
      newSites = [...currentSites, siteId]
      // If every site is checked, normalise to empty array
      if (newSites.length === KNOWN_SITES.length) newSites = []
    }

    setSaving(appId + siteId)
    try {
      await updateApp({ ...app, sites: newSites })
    } finally {
      setSaving(null)
    }
  }

  return (
    <div>
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-ink mb-1">Site Visibility</h3>
        <p className="text-sm text-ink-muted">Checked = app appears on that site. All checked = shows everywhere.</p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-bone">
        <table className="w-full">
          <thead>
            <tr className="bg-stone border-b border-bone">
              <th className="text-left py-3 px-4 text-xs font-semibold uppercase tracking-wider text-ink-muted w-52">App</th>
              {KNOWN_SITES.map(site => (
                <th key={site.id} className="text-center py-3 px-4 text-xs font-semibold uppercase tracking-wider text-ink-muted">
                  {site.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {apps.map((app, i) => (
              <tr key={app.id} className={`border-b border-bone last:border-0 hover:bg-stone/40 transition-colors ${i % 2 === 0 ? '' : 'bg-stone/20'}`}>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2.5">
                    <img src={app.logo} alt={app.name} className="w-6 h-6 object-contain rounded flex-shrink-0" />
                    <span className="text-sm font-medium text-ink truncate">{app.name}</span>
                  </div>
                </td>
                {KNOWN_SITES.map(site => {
                  const checked = isOnSite(app.sites, site.id)
                  const isSaving = saving === app.id + site.id
                  return (
                    <td key={site.id} className="text-center py-3 px-4">
                      <button
                        onClick={() => toggleSite(app.id, site.id)}
                        disabled={!!saving}
                        title={checked ? `Remove from ${site.label}` : `Add to ${site.label}`}
                        className={`w-5 h-5 rounded border-2 transition-all flex items-center justify-center mx-auto ${
                          checked ? 'bg-purple-deep border-purple-deep' : 'border-bone hover:border-purple'
                        } ${isSaving ? 'opacity-40 cursor-wait' : 'cursor-pointer'}`}
                      >
                        {checked && (
                          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                            <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </button>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-ink-faint mt-3">Changes save immediately to the database.</p>
    </div>
  )
}

export default SitesManager
