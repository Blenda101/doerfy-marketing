'use client'

import React, { useState } from 'react'
import { useValueCalculator } from '../../../context/ValueCalculatorContext'
import AppSelector from './AppSelector'
import Results from './Results'
import AdminPanel from '../Admin/AdminPanel'
import EmbedModal from './EmbedModal'
import { ArrowLeft, Settings, MoreVertical, Copy, ArrowRight } from 'lucide-react'

// eslint-disable-next-line @next/next/no-img-element
const DoerfyMark = () => (
  <img src="/images/logo.png" alt="Doerfy" width="36" height="36" />
)

const Calculator: React.FC = () => {
  const { state, toggleAdminMode } = useValueCalculator()
  const { isAdminMode } = state
  const [isYearly, setIsYearly] = useState(true)
  const [showMenu, setShowMenu] = useState(false)
  const [showEmbedModal, setShowEmbedModal] = useState(false)

  return (
    <div className="w-full max-w-5xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
      {/* Header — Doerfy branded */}
      <div className="bg-manifesto p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <DoerfyMark />
            <div className="w-px h-8 bg-white/20" />
            <div className="flex flex-col">
              <h2 className="text-white text-lg font-bold font-display">Doerfy</h2>
              <h3 className="text-white/70 text-xs tracking-wide">Value Calculator</h3>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {isAdminMode && (
              <button onClick={toggleAdminMode}
                className="flex items-center gap-2 text-white hover:bg-white/10 px-4 py-2 rounded-md transition-all">
                <ArrowLeft size={18} />
                <span className="text-sm">Back to Calculator</span>
              </button>
            )}

            {!isAdminMode && (
              <div className="bg-white/10 rounded-lg p-1 flex">
                <button onClick={() => setIsYearly(true)}
                  className={`px-4 py-1 rounded-md text-sm transition-all ${isYearly ? 'bg-white text-manifesto font-medium' : 'text-white hover:bg-white/10'}`}>
                  Yearly
                </button>
                <button onClick={() => setIsYearly(false)}
                  className={`px-4 py-1 rounded-md text-sm transition-all ${!isYearly ? 'bg-white text-manifesto font-medium' : 'text-white hover:bg-white/10'}`}>
                  Monthly
                </button>
              </div>
            )}

            <div className="relative">
              <button onClick={() => setShowMenu(!showMenu)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <MoreVertical size={20} className="text-white" />
              </button>
              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  <button onClick={() => { toggleAdminMode(); setShowMenu(false) }}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-ink-muted hover:bg-stone w-full text-left">
                    <Settings size={16} /> Admin Panel
                  </button>
                  <button onClick={() => { setShowEmbedModal(true); setShowMenu(false) }}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-ink-muted hover:bg-stone w-full text-left">
                    <Copy size={16} /> Embed Calculator
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      {isAdminMode ? (
        <AdminPanel />
      ) : (
        <div className="p-6 grid md:grid-cols-2 gap-6">
          <div>
            <AppSelector />
          </div>
          <div className="flex flex-col gap-6">
            <Results isYearly={isYearly} />
            {/* CTA */}
            <div className="bg-purple-ultra p-6 rounded-xl border border-purple-pale">
              <h3 className="text-lg font-semibold text-manifesto mb-2 font-display">
                One system. Vision to Done.
              </h3>
              <p className="text-sm text-ink-muted mb-4 font-light">
                Replace the stack. Join the beta and get Doey, the Outcome Space, and the Action Funnel — free.
              </p>
              <a href="#beta"
                className="w-full bg-purple-deep hover:bg-purple transition-all duration-200 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2">
                Join the Beta
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      )}

      <EmbedModal isOpen={showEmbedModal} onClose={() => setShowEmbedModal(false)} />
    </div>
  )
}

export default Calculator
