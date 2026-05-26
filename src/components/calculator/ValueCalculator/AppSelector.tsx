'use client'

import React, { useState } from 'react'
import { useValueCalculator } from '../../../context/ValueCalculatorContext'
import { Check } from 'lucide-react'
import { getCategoryDescription } from '../../../data/categories'


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
                  <img src={app.logo} alt={app.name} className="w-full h-full object-contain" />
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
