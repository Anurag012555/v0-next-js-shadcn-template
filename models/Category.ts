import { Types, Document } from 'mongoose'
import { LocalizedString, SEO } from './SharedSchemas'

export interface CategoryAncestor {
  _id: Types.ObjectId
  name: LocalizedString
  slug: string
}

export interface ICategory extends Document {
  _id: Types.ObjectId
  name: LocalizedString
  slug: string
  description?: LocalizedString

  // ✅ Tree Structure (Materialized Path)
  parent?: Types.ObjectId | null // Reference to Category
  ancestors?: CategoryAncestor[]

  // Display
  image?: string
  icon?: string
  sortOrder?: number
  isActive?: boolean

  // ✅ Regional Visibility (e.g. "Winter Wear" hidden in tropical regions)
  restrictedRegions?: string[] // ['SG', 'MY']

  seo?: SEO

  createdAt: Date
  updatedAt: Date
}

