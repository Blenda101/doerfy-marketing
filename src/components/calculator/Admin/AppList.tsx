'use client'

import React from 'react'
import { useValueCalculator } from '../../../context/ValueCalculatorContext'
import { Edit, Trash2 } from 'lucide-react'
import { App } from '../../../types'

interface AppListProps {
  onEditApp: (app: App) => void
}

const AppList: React.FC<AppListProps> = ({ onEditApp }) => {
  const { apps, deleteApp } = useValueCalculator()

  if (apps.length === 0) {
    return (
      <div className="text-center py-8 bg-stone rounded-lg border border-bone">
        <p className="text-ink-muted">No apps have been added yet.</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-stone">
            <th className="text-left p-4 border-b border-bone font-medium text-ink-muted">App</th>
            <th className="text-left p-4 border-b border-bone font-medium text-ink-muted">Category</th>
            <th className="text-left p-4 border-b border-bone font-medium text-ink-muted">Cost / mo</th>
            <th className="text-right p-4 border-b border-bone font-medium text-ink-muted">Actions</th>
          </tr>
        </thead>
        <tbody>
          {apps.map(app => (
            <tr key={app.id} className="hover:bg-stone transition-colors">
              <td className="p-4 border-b border-bone">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-md overflow-hidden bg-stone">
                    <img src={app.logo} alt={app.name} className="w-full h-full object-contain"
                      onError={e => { (e.target as HTMLImageElement).src = '/images/placeholder-app.svg' }} />
                  </div>
                  <span className="font-medium text-ink">{app.name}</span>
                </div>
              </td>
              <td className="p-4 border-b border-bone text-ink-muted">{app.category}</td>
              <td className="p-4 border-b border-bone text-ink-muted">${app.costPerUser}/mo</td>
              <td className="p-4 border-b border-bone">
                <div className="flex justify-end gap-2">
                  <button onClick={() => onEditApp(app)}
                    className="p-1.5 text-ink-faint hover:text-purple hover:bg-purple-ultra rounded-md transition-colors">
                    <Edit size={18} />
                  </button>
                  <button onClick={() => deleteApp(app.id)}
                    className="p-1.5 text-ink-faint hover:text-red-500 hover:bg-red-50 rounded-md transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AppList
