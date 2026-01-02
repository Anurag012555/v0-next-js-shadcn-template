import { Types, Document } from 'mongoose'
import { Money, LocalizedString } from './SharedSchemas'

/**
 * Product Bundle/Kit
 * Groups multiple products sold together as a bundle
 */
export interface BundleItem {
  product: Types.ObjectId // Reference to CatalogProduct
  variant?: Types.ObjectId // Reference to ProductVariant (if applicable)
  quantity: number
  price?: Money // Override price if bundle pricing is 'fixed'
  isRequired: boolean // If false, item can be removed from bundle
  sortOrder?: number
}

export interface IProductBundle extends Document {
  _id: Types.ObjectId
  bundleProduct: Types.ObjectId // Reference to CatalogProduct (the bundle itself)
  name: LocalizedString
  description?: LocalizedString

  items: BundleItem[]

  // Pricing Strategy
  pricing: 'fixed' | 'sum' | 'discount' | 'dynamic'
  // If 'fixed': bundle has fixed price
  // If 'sum': bundle price = sum of item prices
  // If 'discount': bundle price = sum - discount
  // If 'dynamic': calculated based on rules

  discount?: {
    type: 'percentage' | 'fixed_amount'
    value: number
  }

  // Bundle Rules
  minItems?: number // Minimum items required
  maxItems?: number // Maximum items allowed
  allowCustomization?: boolean // Allow customers to modify bundle

  // Inventory
  trackInventory: boolean // If true, check all items' stock
  bundleOnly?: boolean // Items can only be sold as part of bundle

  // Status
  isActive: boolean
  startDate?: Date
  endDate?: Date

  createdAt: Date
  updatedAt: Date
}
