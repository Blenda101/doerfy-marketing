export interface App {
  id: string
  name: string
  logo: string
  costPerUser: number
  category: AppCategory
  sites?: string[]
  created_at?: string
}

export const KNOWN_SITES = [
  { id: 'bigtopa',    label: 'BigTopa' },
  { id: 'greekhouse', label: 'GreekHouse' },
  { id: 'gatheragain', label: 'GatherAgain' },
  { id: 'doerfy',     label: 'Doerfy' },
] as const

export type AppCategory =
  | 'Communication'
  | 'Productivity'
  | 'Project Management'
  | 'CRM'
  | 'Marketing'
  | 'Design'
  | 'Analytics'
  | 'Finance'
  | 'HR'
  | 'Storage'
  | 'Database'
  | 'Development'
  | 'Security'
  | 'Customer Support'
  | 'Other'

export interface DoerfyPricing {
  base_price: number
  price_per_user: number
}

// Keep BigTopaPricing as alias so shared context compiles unchanged
export type BigTopaPricing = DoerfyPricing

export interface CalculatorState {
  selectedApps: string[]
  companySize: number
  isAdminMode: boolean
  bigTopaPricing: DoerfyPricing
}
