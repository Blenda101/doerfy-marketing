'use client'

import React, { useState } from 'react'
import { useValueCalculator } from '../../../context/ValueCalculatorContext'
import { Check } from 'lucide-react'
import { getCategoryDescription } from '../../../data/categories'

// Inline SVG logos — keyed by exact app name as stored in the Supabase database
const appLogos: Record<string, string> = {
  'Asana': `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Crect width='48' height='48' fill='%23F06A4D' rx='10'/%3E%3Ccircle cx='24' cy='14' r='6' fill='white'/%3E%3Ccircle cx='12' cy='30' r='6' fill='white'/%3E%3Ccircle cx='36' cy='30' r='6' fill='white'/%3E%3C/svg%3E`,
  'Basecamp': `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Crect width='48' height='48' fill='%2300C07F' rx='10'/%3E%3Cpath d='M24 10 C16 10 10 16 10 24 C10 32 16 38 24 38 C32 38 38 32 38 24 C38 16 32 10 24 10Z' fill='white' opacity='0.15'/%3E%3Cpath d='M24 16 L30 26 L18 26 Z' fill='white'/%3E%3Crect x='14' y='29' width='20' height='3' rx='1.5' fill='white'/%3E%3C/svg%3E`,
  'ClickUp': `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Crect width='48' height='48' fill='%237B68EE' rx='10'/%3E%3Cpath d='M10 30 L18 22 L24 28 L30 22 L38 30' stroke='%23FF6B6B' stroke-width='4' stroke-linecap='round' stroke-linejoin='round' fill='none'/%3E%3Cpath d='M10 22 L18 14 L24 20 L30 14 L38 22' stroke='white' stroke-width='4' stroke-linecap='round' stroke-linejoin='round' fill='none'/%3E%3C/svg%3E`,
  'Google Drive': `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Cpath fill='%234285F4' d='M6 34l8-14h20l-8 14z'/%3E%3Cpath fill='%2334A853' d='M16 10l8 14h16l-8-14z'/%3E%3Cpath fill='%23FBBC04' d='M6 34l10 0 10-14-8-14z'/%3E%3Cpath fill='%234285F4' d='M14 34h20l-10 0z' opacity='0.4'/%3E%3C/svg%3E`,
  'Google Work': `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Crect width='48' height='48' fill='white' rx='10'/%3E%3Cpath d='M35 24.2c0-.7-.1-1.4-.2-2H24v3.8h6.2c-.3 1.4-1 2.6-2.1 3.4v2.8h3.4c2-1.8 3.5-4.6 3.5-8z' fill='%234285F4'/%3E%3Cpath d='M24 36c3.1 0 5.7-1 7.6-2.8l-3.4-2.8c-1 .7-2.4 1.1-4.2 1.1-3.2 0-5.9-2.2-6.9-5.1H13.5v2.9C15.4 33.1 19.4 36 24 36z' fill='%2334A853'/%3E%3Cpath d='M17.1 26.4c-.3-.7-.4-1.5-.4-2.4s.1-1.7.4-2.4v-2.9H13.5C12.5 20.5 12 22.2 12 24s.5 3.5 1.5 5.3l3.6-2.9z' fill='%23FBBC05'/%3E%3Cpath d='M24 17.5c1.8 0 3.4.6 4.6 1.8l3.4-3.4C30 14 27.3 13 24 13c-4.6 0-8.6 2.9-10.5 7.1l3.6 2.9c1-3 3.7-5.5 6.9-5.5z' fill='%23EA4335'/%3E%3C/svg%3E`,
  'Jira': `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Crect width='48' height='48' fill='%230052CC' rx='8'/%3E%3Cdefs%3E%3ClinearGradient id='jg' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%232684FF'/%3E%3Cstop offset='100%25' stop-color='%230052CC'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath d='M24 8 L38 22 L26 22 L26 14 L24 8Z' fill='white' opacity='0.6'/%3E%3Cpath d='M24 8 L10 22 L22 22 L22 14 L24 8Z' fill='white'/%3E%3Cpath d='M24 40 L10 26 L22 26 L22 34 L24 40Z' fill='white' opacity='0.6'/%3E%3Cpath d='M24 40 L38 26 L26 26 L26 34 L24 40Z' fill='white'/%3E%3C/svg%3E`,
  'Miro': `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Crect width='48' height='48' fill='%23FFD02F' rx='10'/%3E%3Ctext x='24' y='33' font-size='26' font-weight='800' text-anchor='middle' fill='%23050038' font-family='Arial, sans-serif'%3EM%3C/text%3E%3C/svg%3E`,
  'Mural': `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Crect width='48' height='48' fill='%23FF4A4A' rx='10'/%3E%3Ctext x='24' y='33' font-size='22' font-weight='800' text-anchor='middle' fill='white' font-family='Arial, sans-serif'%3EM%3C/text%3E%3C/svg%3E`,
  'Notion': `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Crect width='48' height='48' fill='%23191919' rx='8'/%3E%3Crect x='12' y='12' width='24' height='3' rx='1.5' fill='white' opacity='0.8'/%3E%3Crect x='12' y='19' width='18' height='2.5' rx='1.25' fill='white' opacity='0.5'/%3E%3Crect x='12' y='25' width='22' height='2.5' rx='1.25' fill='white' opacity='0.5'/%3E%3Crect x='12' y='31' width='16' height='2.5' rx='1.25' fill='white' opacity='0.5'/%3E%3C/svg%3E`,
  'SharePoint': `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Crect width='48' height='48' fill='%230078D4' rx='10'/%3E%3Ccircle cx='20' cy='20' r='9' fill='%2328A8E8'/%3E%3Ccircle cx='28' cy='28' r='9' fill='%230078D4' stroke='white' stroke-width='1.5'/%3E%3Ccircle cx='20' cy='20' r='5' fill='white' opacity='0.9'/%3E%3C/svg%3E`,
  'Slack': `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Crect width='48' height='48' fill='white' rx='10'/%3E%3Cpath d='M18 8a4 4 0 0 0 0 8h4V8h-4z' fill='%23E01E5A'/%3E%3Crect x='8' y='18' width='16' height='8' rx='4' fill='%23E01E5A'/%3E%3Cpath d='M30 8a4 4 0 0 1 0 8h-4V8h4z' fill='%2336C5F0'/%3E%3Crect x='24' y='18' width='16' height='8' rx='4' fill='%2336C5F0'/%3E%3Cpath d='M18 40a4 4 0 0 1 0-8h4v8h-4z' fill='%232EB67D'/%3E%3Crect x='8' y='24' width='16' height='8' rx='4' fill='%232EB67D'/%3E%3Cpath d='M30 40a4 4 0 0 0 0-8h-4v8h4z' fill='%23ECB22E'/%3E%3Crect x='24' y='24' width='16' height='8' rx='4' fill='%23ECB22E'/%3E%3C/svg%3E`,
  'Teams': `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Crect width='48' height='48' fill='%235B5FC7' rx='10'/%3E%3Ccircle cx='30' cy='14' r='5' fill='white' opacity='0.9'/%3E%3Crect x='22' y='21' width='16' height='14' rx='3' fill='white' opacity='0.9'/%3E%3Ccircle cx='17' cy='19' r='4' fill='white'/%3E%3Crect x='10' y='25' width='14' height='12' rx='3' fill='%237B7FD4'/%3E%3C/svg%3E`,
  'TickTick': `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Crect width='48' height='48' fill='%234DAAFF' rx='10'/%3E%3Ccircle cx='24' cy='24' r='13' fill='white' opacity='0.15'/%3E%3Cpath d='M14 24l7 7 13-14' stroke='white' stroke-width='3.5' stroke-linecap='round' stroke-linejoin='round' fill='none'/%3E%3C/svg%3E`,
  'Trello': `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Crect width='48' height='48' fill='%230079BF' rx='8'/%3E%3Crect x='8' y='9' width='13' height='24' rx='2.5' fill='white' opacity='0.9'/%3E%3Crect x='27' y='9' width='13' height='16' rx='2.5' fill='white' opacity='0.9'/%3E%3C/svg%3E`,
  'Wrike': `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Crect width='48' height='48' fill='%2300C875' rx='10'/%3E%3Cpath d='M8 16 L16 32 L24 20 L32 32 L40 16' stroke='white' stroke-width='4' stroke-linecap='round' stroke-linejoin='round' fill='none'/%3E%3C/svg%3E`,
  'Zoom': `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Crect width='48' height='48' fill='%232D8CFF' rx='10'/%3E%3Crect x='8' y='16' width='22' height='16' rx='3' fill='white'/%3E%3Cpath d='M30 20 L40 14 L40 34 L30 28 Z' fill='white'/%3E%3C/svg%3E`,
}

// Falls back to the logo URL stored in Supabase if we don't have an inline SVG
const getAppLogo = (name: string, fallback: string) => appLogos[name] || fallback

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(amount)

const AppSelector: React.FC = () => {
  const { state, toggleAppSelection, apps } = useValueCalculator()
  const { selectedApps } = state
  const [hoveredAppId, setHoveredAppId] = useState<string | null>(null)

  return (
    <div className="bg-stone p-6 rounded-xl border border-bone">
      <h3 className="mb-4 font-semibold text-lg text-ink">Which apps do you currently pay for?</h3>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {apps.map(app => {
          const isSelected = selectedApps.includes(app.id)
          const isHovered = hoveredAppId === app.id
          return (
            <div key={app.id} className="relative"
              onMouseEnter={() => setHoveredAppId(app.id)}
              onMouseLeave={() => setHoveredAppId(null)}>
              <button
                onClick={() => toggleAppSelection(app.id)}
                className={`relative w-full aspect-square flex flex-col items-center p-3 border rounded-xl transition-all duration-200 ${
                  isSelected ? 'border-purple bg-purple-ultra shadow-sm' : 'border-bone hover:border-ink-faint bg-white'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-purple-deep flex items-center justify-center">
                    <Check size={12} className="text-white" />
                  </div>
                )}
                <div className="w-14 h-14 mb-2 rounded-lg bg-white flex items-center justify-center overflow-hidden">
                  <img src={getAppLogo(app.name, app.logo)} alt={app.name} className="w-full h-full object-contain" />
                </div>
                <span className="text-xs text-center font-medium text-ink-muted line-clamp-2">{app.name}</span>
              </button>

              {isHovered && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-manifesto text-white text-sm rounded-lg shadow-lg z-10 pointer-events-none">
                  <div className="p-3">
                    <div className="font-medium mb-1 text-purple-light">{app.category}</div>
                    <div className="text-white/60 text-xs mb-2">{getCategoryDescription(app.category)}</div>
                    <div className="text-purple-light font-medium">{formatCurrency(app.costPerUser)}/mo</div>
                  </div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-manifesto rotate-45" />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default AppSelector
