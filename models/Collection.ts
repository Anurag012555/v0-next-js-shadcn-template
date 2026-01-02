import { Types, Document } from 'mongoose'
import { LocalizedString, Media } from './SharedSchemas'

/**
 * Product Collections
 * Groups products for marketing, seasonal campaigns, etc.
 */
export interface CollectionCondition {
  field: string // 'category', 'brand', 'tag', 'price', 'rating', etc.
  operator: 'equals' | 'not_equals' | 'contains' | 'greater_than' | 'less_than' | 'in' | 'not_in'
  value: any
}

export interface ICollection extends Document {
  _id: Types.ObjectId
  name: LocalizedString
  slug: string
  description?: LocalizedString

  // Visual
  image?: string
  banner?: Media

  // Products
  products: Types.ObjectId[] // References to CatalogProduct

  // Collection Type
  type: 'manual' | 'automatic'
  // manual: Products added manually
  // automatic: Products added based on conditions

  // Automatic Collection Conditions
  conditions?: CollectionCondition[]
  matchAll?: boolean // If true, product must match ALL conditions; if false, ANY condition

  // Display
  sortOrder?: number
  isActive: boolean
  isFeatured?: boolean

  // Dates
  startDate?: Date
  endDate?: Date

  createdAt: Date
  updatedAt: Date
}

