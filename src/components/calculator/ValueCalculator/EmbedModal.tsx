'use client'

import React, { useState } from 'react'
import { X, Copy, Check } from 'lucide-react'

interface Props { isOpen: boolean; onClose: () => void }

const EmbedModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false)
  const [config, setConfig] = useState({ width: '100%', height: '800', defaultView: 'yearly' })

  if (!isOpen) return null

  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://doerfy.com'
  const embedCode = `<iframe\n  src="${origin}/calculator?view=${config.defaultView}"\n  width="${config.width}"\n  height="${config.height}"\n  style="border: none; border-radius: 12px;"\n  title="Doerfy Value Calculator"\n></iframe>`

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl">
        <div className="flex justify-between items-center p-6 border-b border-bone">
          <h3 className="text-xl font-semibold text-ink">Embed Calculator</h3>
          <button onClick={onClose} className="p-1.5 rounded-md hover:bg-stone text-ink-faint"><X size={20} /></button>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-ink-muted mb-1">Width</label>
              <input value={config.width} onChange={e => setConfig(p => ({ ...p, width: e.target.value }))}
                className="w-full px-3 py-2 border border-bone rounded-md" placeholder="100% or 600px" />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink-muted mb-1">Height</label>
              <input value={config.height} onChange={e => setConfig(p => ({ ...p, height: e.target.value }))}
                className="w-full px-3 py-2 border border-bone rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink-muted mb-1">Default View</label>
              <select value={config.defaultView} onChange={e => setConfig(p => ({ ...p, defaultView: e.target.value }))}
                className="w-full px-3 py-2 border border-bone rounded-md bg-white">
                <option value="yearly">Yearly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          </div>
          <div className="bg-stone rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-ink-muted">Embed Code</span>
              <button onClick={handleCopy} className="flex items-center gap-1.5 text-sm text-purple-deep hover:text-purple">
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
            <pre className="bg-manifesto text-white/80 p-4 rounded-md text-sm overflow-x-auto">{embedCode}</pre>
          </div>
        </div>
        <div className="flex justify-end gap-3 p-6 border-t border-bone bg-stone rounded-b-xl">
          <button onClick={onClose} className="px-4 py-2 border border-bone rounded-md text-ink-muted hover:bg-white">Close</button>
        </div>
      </div>
    </div>
  )
}

export default EmbedModal
