import { Types, Document } from 'mongoose'
import { Money, Media } from './SharedSchemas'

/**
 * Product Variant
 * Detailed variant management with individual inventory, pricing, and attributes
 */
export interface VariantAttribute {
  key: string // "color", "size", "material"
  value: string // "Red", "M", "Cotton"
  displayName?: string // "Color: Red"
}

export interface VariantInventory {
  quantity: number
  reserved: number
  available: number // quantity - reserved
  warehouseAllocations: Array<{
    warehouse: Types.ObjectId
    quantity: number
    reserved: number
  }>
  backorderAllowed?: boolean
  backorderQuantity?: number
  preorderAllowed?: boolean
  preorderReleaseDate?: Date
  stockStatus: 'in_stock' | 'out_of_stock' | 'backorder' | 'preorder' | 'discontinued'
}

export interface IProductVariant extends Document {
  _id: Types.ObjectId
  parentProduct: Types.ObjectId // Reference to CatalogProduct (parent)
  sku: string // Unique SKU per variant
  barcode?: string // UPC/EAN/ISBN
  gtin?: string // Global Trade Item Number

  // Variant Attributes
  attributes: VariantAttribute[] // { color: "Red", size: "M" }

  // Pricing (can override parent)
  price?: Money
  salePrice?: Money
  costPrice?: Money // For profit calculation

  // Visual
  image?: string // Variant-specific image
  images?: Media[] // Multiple images for this variant

  // Inventory
  inventory: VariantInventory

  // Physical Properties (can override parent)
  weight?: number
  dimensions?: {
    length?: number
    width?: number
    height?: number
    unit?: string
  }

  // Status
  isActive: boolean
  isDefault?: boolean // Default variant for parent product

  // SEO
  slug?: string // Variant-specific URL slug

  createdAt: Date
  updatedAt: Date
}
