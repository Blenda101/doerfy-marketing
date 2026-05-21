'use client'

import React, { useState, useEffect } from 'react'
import { useValueCalculator } from '../../../context/ValueCalculatorContext'
import AppList from './AppList'
import AppForm from './AppForm'
import PricingConfig from './PricingConfig'
import CategoryManagement from './CategoryManagement'
import LoginForm from '../Auth/LoginForm'
import { Plus, ListPlus } from 'lucide-react'
import { App } from '../../../types'
import { supabase } from '../../../lib/supabase'

const AdminPanel: React.FC = () => {
  const { apps } = useValueCalculator()
  const [showAddForm, setShowAddForm] = useState(false)
  const [showCategoryManagement, setShowCategoryManagement] = useState(false)
  const [editingApp, setEditingApp] = useState<App | null>(null)
  const [session, setSession] = useState<any>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => setSession(session))
    return () => subscription.unsubscribe()
  }, [])

  const handleEditApp = (app: App) => {
    setEditingApp(app)
    setShowAddForm(true)
    setShowCategoryManagement(false)
  }

  const handleCancelEdit = () => {
    setEditingApp(null)
    setShowAddForm(false)
  }

  if (!session) return <LoginForm />

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-ink">Admin Panel</h2>
        {!showAddForm && !showCategoryManagement && (
          <div className="flex gap-2">
            <button onClick={() => setShowCategoryManagement(true)}
              className="flex items-center gap-2 bg-white border border-bone hover:bg-stone text-ink-muted px-4 py-2 rounded-md transition-colors">
              <ListPlus size={18} /> Manage Categories
            </button>
            <button onClick={() => setShowAddForm(true)}
              className="flex items-center gap-2 bg-purple-deep hover:bg-purple text-white px-4 py-2 rounded-md transition-colors">
              <Plus size={18} /> Add App
            </button>
          </div>
        )}
      </div>

      {showAddForm ? (
        <AppForm editApp={editingApp} onCancel={handleCancelEdit} />
      ) : showCategoryManagement ? (
        <CategoryManagement onClose={() => setShowCategoryManagement(false)} />
      ) : (
        <>
          <PricingConfig />
          <div className="my-8 border-t border-bone" />
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-ink mb-2">App Management</h3>
            <p className="text-ink-muted">Manage apps shown in the Doerfy value calculator. Apps tagged with <strong>doerfy</strong> in the sites field appear here.</p>
          </div>
          <div className="bg-stone p-4 rounded-lg border border-bone mb-6">
            <h3 className="text-md font-medium text-ink-muted mb-1">Current apps: {apps.length}</h3>
            <p className="text-sm text-ink-faint">These are apps visible to Doerfy visitors.</p>
          </div>
          <AppList onEditApp={handleEditApp} />
        </>
      )}
    </div>
  )
}

export default AdminPanel
