import { Types, Document } from 'mongoose'
import { LocalizedString } from './SharedSchemas'

/**
 * Product Tags
 * Flexible tagging system for products
 */
export interface IProductTag extends Document {
  _id: Types.ObjectId
  name: LocalizedString
  slug: string
  description?: LocalizedString

  // Visual
  color?: string // Hex color for UI display
  icon?: string // Icon identifier

  // Metadata
  isActive: boolean
  productCount?: number // Number of products with this tag

  createdAt: Date
  updatedAt: Date
}

