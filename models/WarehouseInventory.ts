import { Types, Document } from 'mongoose'

/**
 * Warehouse Inventory
 * Detailed inventory tracking per warehouse
 */
export interface IWarehouseInventory extends Document {
  _id: Types.ObjectId
  offer: Types.ObjectId // Reference to Offer
  warehouse: Types.ObjectId // Reference to Warehouse
  variant?: Types.ObjectId // Reference to ProductVariant (if applicable)

  // Current Stock
  quantity: number
  reserved: number
  available: number // quantity - reserved
  allocated: number // Allocated to pending orders

  // Reorder Management
  reorderPoint?: number // When to reorder
  reorderQuantity?: number // How much to reorder
  maxStock?: number // Maximum stock level
  minStock?: number // Minimum stock level

  // Status
  stockStatus: 'in_stock' | 'low_stock' | 'out_of_stock' | 'backorder' | 'preorder'
  lastRestockedAt?: Date
  lastSoldAt?: Date

  // Location within warehouse
  location?: string // Aisle, shelf, bin location
  binNumber?: string

  // Costing
  averageCost?: number
  lastCost?: number

  createdAt: Date
  updatedAt: Date
}
