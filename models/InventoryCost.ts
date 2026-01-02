import { Types, Document } from 'mongoose'
import { Money } from './SharedSchemas'

/**
 * Inventory Costing
 * Tracks inventory costs using different costing methods (FIFO, LIFO, Average, Standard)
 */
export interface CostLayer {
  quantity: number
  unitCost: Money
  receivedAt: Date
  batchNumber?: string
  supplier?: Types.ObjectId
  remainingQuantity?: number // For FIFO/LIFO tracking
}

export interface IInventoryCost extends Document {
  _id: Types.ObjectId
  offer: Types.ObjectId // Reference to Offer
  warehouse: Types.ObjectId // Reference to Warehouse
  variant?: Types.ObjectId // Reference to ProductVariant (if applicable)

  // Costing Method
  method: 'FIFO' | 'LIFO' | 'AVERAGE' | 'STANDARD'
  // FIFO: First In First Out
  // LIFO: Last In First Out
  // AVERAGE: Weighted Average Cost
  // STANDARD: Standard Cost (fixed)

  // Cost Layers (for FIFO/LIFO)
  costLayers: CostLayer[]

  // Current Costs
  averageCost?: Money // For AVERAGE method
  standardCost?: Money // For STANDARD method
  lastCost?: Money // Last purchase cost

  // Totals
  totalQuantity: number
  totalCost: Money

  // Valuation
  currentValue: Money // totalQuantity * currentCost

  // Metadata
  lastCalculatedAt: Date
  notes?: string

  createdAt: Date
  updatedAt: Date
}

