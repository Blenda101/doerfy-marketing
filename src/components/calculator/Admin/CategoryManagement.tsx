'use client'

import React, { useState } from 'react'
import { Plus, X, Edit2, Trash2, Check } from 'lucide-react'
import { AppCategory } from '../../../types'
import { APP_CATEGORIES, getCategoryDescription } from '../../../data/categories'

interface Props { onClose: () => void }

const CategoryManagement: React.FC<Props> = ({ onClose }) => {
  const [categories, setCategories] = useState<AppCategory[]>(APP_CATEGORIES)
  const [newCategory, setNewCategory] = useState('')
  const [editingCategory, setEditingCategory] = useState<string | null>(null)
  const [editValue, setEditValue] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleAdd = () => {
    if (!newCategory.trim()) { setError('Category name cannot be empty'); return }
    if (categories.includes(newCategory as AppCategory)) { setError('Category already exists'); return }
    setCategories([...categories, newCategory as AppCategory])
    setNewCategory('')
    setError(null)
  }

  const handleSaveEdit = (old: string) => {
    if (!editValue.trim()) { setError('Category name cannot be empty'); return }
    if (categories.includes(editValue as AppCategory) && editValue !== old) { setError('Already exists'); return }
    setCategories(categories.map(c => c === old ? editValue as AppCategory : c))
    setEditingCategory(null)
    setEditValue('')
    setError(null)
  }

  const handleDelete = (category: AppCategory) => {
    if (category === 'Other') { setError('Cannot delete "Other"'); return }
    setCategories(categories.filter(c => c !== category))
    setError(null)
  }

  return (
    <div className="bg-white p-6 rounded-xl border border-bone">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-ink">Manage Categories</h3>
        <button onClick={onClose} className="p-1.5 rounded-md hover:bg-stone text-ink-faint"><X size={20} /></button>
      </div>
      <div className="flex gap-2 mb-6">
        <input type="text" value={newCategory} onChange={e => setNewCategory(e.target.value)}
          placeholder="New category name" className="flex-1 px-3 py-2 border border-bone rounded-md" />
        <button onClick={handleAdd} className="flex items-center gap-2 bg-purple-deep hover:bg-purple text-white px-4 py-2 rounded-md">
          <Plus size={18} /> Add
        </button>
      </div>
      {error && <p className="text-sm text-red-500 mb-4">{error}</p>}
      <div className="space-y-2">
        {categories.map(category => (
          <div key={category} className="flex items-center justify-between p-3 bg-stone rounded-lg border border-bone">
            {editingCategory === category ? (
              <div className="flex-1 flex gap-2">
                <input value={editValue} onChange={e => setEditValue(e.target.value)}
                  className="flex-1 px-3 py-1.5 border border-bone rounded-md" />
                <button onClick={() => handleSaveEdit(category)} className="p-1.5 text-green-600 hover:bg-green-50 rounded-md"><Check size={18} /></button>
                <button onClick={() => setEditingCategory(null)} className="p-1.5 text-ink-faint hover:bg-stone rounded-md"><X size={18} /></button>
              </div>
            ) : (
              <>
                <div>
                  <h4 className="font-medium text-ink">{category}</h4>
                  <p className="text-sm text-ink-muted">{getCategoryDescription(category)}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => { setEditingCategory(category); setEditValue(category) }}
                    disabled={category === 'Other'}
                    className="p-1.5 text-ink-faint hover:text-purple hover:bg-purple-ultra rounded-md disabled:opacity-30">
                    <Edit2 size={18} />
                  </button>
                  <button onClick={() => handleDelete(category)} disabled={category === 'Other'}
                    className="p-1.5 text-ink-faint hover:text-red-500 hover:bg-red-50 rounded-md disabled:opacity-30">
                    <Trash2 size={18} />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategoryManagement
