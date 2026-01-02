import { Types, Document } from 'mongoose'

/**
 * Product Relations
 * Defines relationships between products (related, cross-sell, upsell, etc.)
 */
export interface IProductRelation extends Document {
  _id: Types.ObjectId
  product: Types.ObjectId // Reference to CatalogProduct (source)
  relatedProduct: Types.ObjectId // Reference to CatalogProduct (target)

  type: 'related' | 'cross_sell' | 'upsell' | 'complementary' | 'alternative' | 'bundle'
  // related: General related products
  // cross_sell: "Customers who bought X also bought Y"
  // upsell: "Upgrade to premium version"
  // complementary: "Goes well with"
  // alternative: "Similar products"
  // bundle: "Part of bundle"

  sortOrder?: number
  strength?: number // 0-100, for recommendation algorithms

  // Conditions
  isActive: boolean
  startDate?: Date
  endDate?: Date

  createdAt: Date
  updatedAt: Date
}

