'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useValueCalculator } from '../../../context/ValueCalculatorContext'
import { X, Upload } from 'lucide-react'
import { App, AppCategory, KNOWN_SITES } from '../../../types'
import { APP_CATEGORIES, getCategoryDescription } from '../../../data/categories'
import { useDropzone } from 'react-dropzone'

interface Props {
  editApp: App | null
  onCancel: () => void
}

const AppForm: React.FC<Props> = ({ editApp, onCancel }) => {
  const { addApp, updateApp } = useValueCalculator()
  const [formData, setFormData] = useState<Omit<App, 'id'>>({
    name: '', logo: '', costPerUser: 0, category: 'Other', sites: [],
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (editApp) {
      setFormData({ name: editApp.name, logo: editApp.logo, costPerUser: editApp.costPerUser, category: editApp.category, sites: editApp.sites || [] })
    }
  }, [editApp])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: name === 'costPerUser' ? parseFloat(value) : value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setFormData(prev => ({ ...prev, logo: reader.result as string }))
    reader.readAsDataURL(file)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop, accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.svg'] },
    maxSize: 5242880, multiple: false,
  })

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name = 'App name is required'
    if (!formData.logo) newErrors.logo = 'Logo is required'
    if (!formData.category) newErrors.category = 'Category is required'
    if (formData.costPerUser <= 0) newErrors.costPerUser = 'Cost must be greater than 0'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    if (editApp) updateApp({ id: editApp.id, ...formData })
    else addApp(formData)
    onCancel()
  }

  return (
    <div className="bg-white p-6 rounded-xl border border-bone">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-ink">{editApp ? 'Edit App' : 'Add New App'}</h3>
        <button onClick={onCancel} className="p-1.5 rounded-md hover:bg-stone text-ink-faint"><X size={20} /></button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-ink-muted mb-1">App Name</label>
            <input name="name" type="text" value={formData.name} onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md ${errors.name ? 'border-red-500' : 'border-bone'}`}
              placeholder="e.g. Todoist" />
            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-ink-muted mb-1">Category</label>
            <select name="category" value={formData.category} onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md bg-white ${errors.category ? 'border-red-500' : 'border-bone'}`}>
              <option value="">Select a category</option>
              {APP_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            {formData.category && <p className="mt-1 text-sm text-ink-faint">{getCategoryDescription(formData.category as AppCategory)}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-ink-muted mb-1">Cost / month ($)</label>
            <input name="costPerUser" type="number" min="0" step="0.01" value={formData.costPerUser}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md ${errors.costPerUser ? 'border-red-500' : 'border-bone'}`} />
            {errors.costPerUser && <p className="mt-1 text-sm text-red-500">{errors.costPerUser}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-ink-muted mb-1">Logo</label>
            <div {...getRootProps()} className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${isDragActive ? 'border-purple bg-purple-ultra' : 'border-bone hover:border-bone'}`}>
              <input {...getInputProps()} />
              <Upload className="mx-auto text-ink-faint mb-2" size={24} />
              <p className="text-sm text-ink-muted">{isDragActive ? 'Drop here' : 'Drag & drop or click to select'}</p>
              <p className="text-xs text-ink-faint mt-1">Max 5MB</p>
            </div>
            {errors.logo && <p className="mt-1 text-sm text-red-500">{errors.logo}</p>}
            {formData.logo && (
              <div className="mt-2">
                <p className="text-xs text-ink-faint mb-1">Preview:</p>
                <div className="w-10 h-10 rounded-md overflow-hidden bg-stone">
                  <img src={formData.logo} alt="Preview" className="w-full h-full object-contain" />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-ink-muted mb-1">Show on sites</label>
          <p className="text-xs text-ink-faint mb-2">Leave all unchecked to show on every site.</p>
          <div className="flex flex-wrap gap-3">
            {KNOWN_SITES.map(site => {
              const checked = (formData.sites || []).includes(site.id)
              return (
                <label key={site.id} className={`flex items-center gap-2 px-3 py-2 rounded-md border cursor-pointer transition-colors select-none ${checked ? 'border-purple bg-purple-ultra text-purple-deep' : 'border-bone text-ink-muted hover:border-ink-faint'}`}>
                  <input type="checkbox" className="accent-purple" checked={checked}
                    onChange={() => {
                      const current = formData.sites || []
                      setFormData(prev => ({ ...prev, sites: checked ? current.filter(s => s !== site.id) : [...current, site.id] }))
                    }} />
                  <span className="text-sm font-medium">{site.label}</span>
                </label>
              )
            })}
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <button type="button" onClick={onCancel}
            className="px-4 py-2 border border-bone rounded-md text-ink-muted hover:bg-stone transition-colors">
            Cancel
          </button>
          <button type="submit"
            className="px-4 py-2 bg-purple-deep hover:bg-purple text-white rounded-md transition-colors">
            {editApp ? 'Update App' : 'Add App'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AppForm
