'use client'

import React, { useState } from 'react'
import { useValueCalculator } from '../../../context/ValueCalculatorContext'

const PricingConfig: React.FC = () => {
  const { state, updateBigTopaPricing } = useValueCalculator()
  const { bigTopaPricing } = state
  const [annualPrice, setAnnualPrice] = useState(bigTopaPricing.base_price)
  const [monthlyPrice, setMonthlyPrice] = useState(bigTopaPricing.price_per_user)
  const [isUpdating, setIsUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsUpdating(true)
    setError(null)
    try {
      if (annualPrice < 0 || monthlyPrice < 0) throw new Error('Prices cannot be negative')
      await updateBigTopaPricing({ base_price: annualPrice, price_per_user: monthlyPrice })
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to update pricing')
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <div className="bg-white p-6 rounded-xl border border-bone">
      <h3 className="text-lg font-semibold text-ink mb-4">Doerfy Pricing Configuration</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-ink-muted mb-1">Annual Price / User ($)</label>
            <input type="number" min="0" step="0.01" value={annualPrice}
              onChange={e => setAnnualPrice(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-bone rounded-md" />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink-muted mb-1">Monthly Price / User ($)</label>
            <input type="number" min="0" step="0.01" value={monthlyPrice}
              onChange={e => setMonthlyPrice(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-bone rounded-md" />
          </div>
        </div>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <div className="flex justify-end">
          <button type="submit" disabled={isUpdating}
            className="px-4 py-2 bg-purple-deep hover:bg-purple text-white rounded-md transition-colors disabled:opacity-75">
            {isUpdating ? 'Updating...' : 'Update Pricing'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default PricingConfig
