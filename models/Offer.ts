import { Types, Document } from 'mongoose'
import { Money } from './SharedSchemas'

export interface IOffer extends Document {
  _id: Types.ObjectId
  // ✅ The Link (Product + Seller)
  product: Types.ObjectId // Reference to CatalogProduct
  seller: Types.ObjectId // Reference to Seller

  // Internal Reference
  sku: string // Seller's personal SKU

  // ✅ Financials
  price: Money
  salePrice?: Money // Optional override

  // ✅ Condition (Crucial for Marketplaces)
  condition: 'new' | 'open_box' | 'refurbished' | 'used_good' | 'used_acceptable'
  conditionNote?: string // e.g. "Missing manual"

  // ✅ Logistics Strategy
  fulfillmentMethod: 'FBA' | 'FBM' // Amazon vs Merchant
  inventory?: {
    quantity?: number
    reserved?: number // Reserved for pending orders
    available?: number // quantity - reserved
    warehouseId?: Types.ObjectId // Reference to Warehouse
    restockDate?: Date
    backorderAllowed?: boolean
    backorderQuantity?: number
    preorderAllowed?: boolean
    preorderReleaseDate?: Date
    stockStatus?: 'in_stock' | 'out_of_stock' | 'backorder' | 'preorder' | 'discontinued'
    lowStockThreshold?: number // Alert when stock falls below this
  }

  shippingTemplate?: Types.ObjectId // Reference to ShippingTemplate - Pricing rules

  // Buy Box Factors
  isPrime?: boolean
  handlingTime?: number // Days to ship

  isActive?: boolean

  createdAt: Date
  updatedAt: Date
}
