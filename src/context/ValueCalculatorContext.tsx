'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { App, CalculatorState, BigTopaPricing } from '../types'
import { supabase } from '../lib/supabase'

interface ValueCalculatorContextType {
  apps: App[]
  allApps: App[]
  state: CalculatorState
  toggleAppSelection: (appId: string) => void
  updateCompanySize: (size: number) => void
  toggleAdminMode: () => void
  addApp: (appData: Omit<App, 'id'>) => void
  updateApp: (app: App) => void
  deleteApp: (appId: string) => void
  updateBigTopaPricing: (pricing: BigTopaPricing) => void
}

const ValueCalculatorContext = createContext<ValueCalculatorContextType | undefined>(undefined)

const STORAGE_KEY = 'doerfy_calculator_data'

const DEFAULT_PRICING = {
  base_price: 0,      // Doerfy beta is free
  price_per_user: 0,
}

// This is the site identifier — filters the shared Supabase apps table
const SITE_ID = 'doerfy'

export const ValueCalculatorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [apps, setApps] = useState<App[]>([])
  const [allApps, setAllApps] = useState<App[]>([])
  const [state, setState] = useState<CalculatorState>({
    selectedApps: [],
    companySize: 1,       // Personal use — always 1
    isAdminMode: false,
    bigTopaPricing: DEFAULT_PRICING,
  })

  useEffect(() => {
    const initializeData = async () => {
      try {
        const savedData = localStorage.getItem(STORAGE_KEY)
        if (savedData) {
          const parsedData = JSON.parse(savedData)
          if (parsedData.state) {
            setState(prev => ({
              ...prev,
              selectedApps: parsedData.state.selectedApps || [],
            }))
          }
        }
        await loadApps()
      } catch (error) {
        console.error('Error initializing data:', error)
      }
    }

    initializeData()

    const appsSubscription = supabase
      .channel('doerfy_apps_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'apps' }, loadApps)
      .subscribe()

    return () => {
      appsSubscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ state: { selectedApps: state.selectedApps } })
    )
  }, [state.selectedApps])

  const loadApps = async () => {
    try {
      const { data: existingApps, error } = await supabase
        .from('apps')
        .select('*')
        .order('name', { ascending: true })

      if (error) throw error

      if (existingApps) {
        const formatted: App[] = existingApps.map(app => ({
          id: app.id,
          name: app.name,
          logo: app.logo,
          costPerUser: parseFloat(app.cost_per_user),
          category: app.category,
          sites: app.sites || [],
          created_at: app.created_at,
        }))

        setAllApps(formatted)
        setApps(formatted.filter(app => {
          const sites = app.sites || []
          return sites.length === 0 || sites.includes(SITE_ID)
        }))
      }
    } catch (error) {
      console.error('Error loading apps:', error)
    }
  }

  const toggleAppSelection = (appId: string) => {
    setState(prev => {
      const isSelected = prev.selectedApps.includes(appId)
      return {
        ...prev,
        selectedApps: isSelected
          ? prev.selectedApps.filter(id => id !== appId)
          : [...prev.selectedApps, appId],
      }
    })
  }

  const updateCompanySize = (size: number) => {
    setState(prev => ({ ...prev, companySize: size }))
  }

  const toggleAdminMode = () => {
    setState(prev => ({ ...prev, isAdminMode: !prev.isAdminMode }))
  }

  const updateBigTopaPricing = async (pricing: BigTopaPricing) => {
    setState(prev => ({ ...prev, bigTopaPricing: pricing }))
  }

  const addApp = async (appData: Omit<App, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('apps')
        .insert([{
          name: appData.name,
          logo: appData.logo,
          cost_per_user: parseFloat(appData.costPerUser.toString()),
          category: appData.category,
          sites: appData.sites || [],
        }])
        .select()
        .single()

      if (error) throw error

      if (data) {
        const newApp: App = {
          id: data.id,
          name: data.name,
          logo: data.logo,
          costPerUser: parseFloat(data.cost_per_user),
          category: data.category,
          sites: data.sites || [],
          created_at: data.created_at,
        }
        setApps(prev => [...prev, newApp].sort((a, b) => a.name.localeCompare(b.name)))
      }
    } catch (error) {
      console.error('Error adding app:', error)
      throw error
    }
  }

  const updateApp = async (updatedApp: App) => {
    try {
      const { data, error } = await supabase
        .from('apps')
        .update({
          name: updatedApp.name,
          logo: updatedApp.logo,
          cost_per_user: parseFloat(updatedApp.costPerUser.toString()),
          category: updatedApp.category,
          sites: updatedApp.sites || [],
        })
        .eq('id', updatedApp.id)
        .select()
        .maybeSingle()

      if (error) throw error
      if (!data) throw new Error(`App ${updatedApp.id} not found`)

      const updated: App = {
        id: data.id,
        name: data.name,
        logo: data.logo,
        costPerUser: parseFloat(data.cost_per_user),
        category: data.category,
        sites: data.sites || [],
        created_at: data.created_at,
      }

      setApps(prev =>
        prev.map(app => (app.id === updatedApp.id ? updated : app))
          .sort((a, b) => a.name.localeCompare(b.name))
      )
    } catch (error) {
      console.error('Error updating app:', error)
      throw error
    }
  }

  const deleteApp = async (appId: string) => {
    try {
      const { error } = await supabase.from('apps').delete().eq('id', appId)
      if (error) throw error

      setApps(prev => prev.filter(app => app.id !== appId))
      setState(prev => ({
        ...prev,
        selectedApps: prev.selectedApps.filter(id => id !== appId),
      }))
    } catch (error) {
      console.error('Error deleting app:', error)
      throw error
    }
  }

  return (
    <ValueCalculatorContext.Provider
      value={{
        apps,
        allApps,
        state,
        toggleAppSelection,
        updateCompanySize,
        toggleAdminMode,
        addApp,
        updateApp,
        deleteApp,
        updateBigTopaPricing,
      }}
    >
      {children}
    </ValueCalculatorContext.Provider>
  )
}

export const useValueCalculator = (): ValueCalculatorContextType => {
  const context = useContext(ValueCalculatorContext)
  if (context === undefined) {
    throw new Error('useValueCalculator must be used within a ValueCalculatorProvider')
  }
  return context
}
