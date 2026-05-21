'use client'

import React, { useMemo } from 'react'
import { useValueCalculator } from '../../../context/ValueCalculatorContext'

interface ResultsProps {
  isYearly: boolean
}

const Results: React.FC<ResultsProps> = ({ isYearly }) => {
  const { state, apps } = useValueCalculator()
  const { selectedApps, companySize } = state

  const results = useMemo(() => {
    const selectedAppData = apps.filter(app => selectedApps.includes(app.id))
    // For personal use companySize is always 1
    const totalMonthly = selectedAppData.reduce((sum, app) => sum + app.costPerUser * companySize, 0)
    const totalYearly = totalMonthly * 12
    const display = isYearly ? totalYearly : totalMonthly

    return {
      display,
      totalMonthly,
      totalYearly,
      selectedCount: selectedAppData.length,
      replacedCount: Math.min(Math.ceil(selectedAppData.length * 0.8), selectedAppData.length),
    }
  }, [selectedApps, companySize, apps, isYearly])

  const fmt = (n: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)

  if (selectedApps.length === 0) {
    return (
      <div className="bg-stone p-6 rounded-xl border border-bone flex flex-col items-center justify-center min-h-[200px]">
        <p className="text-ink-muted text-center font-light">Select apps above to see what you spend.</p>
      </div>
    )
  }

  return (
    <div className="bg-stone p-6 rounded-xl border border-bone space-y-4">
      {/* Current cost */}
      <div className="bg-white p-5 rounded-lg border border-bone">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-ink-muted text-sm">Your current stack</span>
            <span className="text-lg font-semibold text-ink">
              {fmt(results.display)}{isYearly ? '/yr' : '/mo'}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-ink-muted text-sm">Doerfy Beta</span>
            <span className="text-lg font-semibold text-green-600">Free</span>
          </div>
          <div className="pt-3 border-t border-bone flex justify-between items-center">
            <span className="text-ink-muted text-sm">You save</span>
            <span className="text-lg font-semibold text-purple-deep">
              {fmt(results.display)}{isYearly ? '/yr' : '/mo'}
            </span>
          </div>
        </div>
      </div>

      {/* Replace count */}
      <div className="bg-purple-ultra p-4 rounded-lg border border-purple-pale">
        <p className="text-sm text-purple-deep font-medium">
          Doerfy replaces at least {results.replacedCount} of your {results.selectedCount} selected tools — in one practice.
        </p>
      </div>
    </div>
  )
}

export default Results
