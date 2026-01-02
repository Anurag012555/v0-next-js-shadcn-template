import { Types, Document } from 'mongoose'
import { Money } from './SharedSchemas'

/**
 * Stock Movement Tracking
 * Tracks all inventory changes for audit and reporting
 */
export interface IStockMovement extends Document {
  _id: Types.ObjectId
  product: Types.ObjectId // Reference to CatalogProduct
  offer?: Types.ObjectId // Reference to Offer (if applicable)
  warehouse: Types.ObjectId // Reference to Warehouse
  variant?: Types.ObjectId // Reference to ProductVariant (if applicable)

  // Movement Details
  type: 'in' | 'out' | 'adjustment' | 'transfer' | 'return' | 'reservation' | 'release'
  quantity: number // Positive for 'in', negative for 'out'
  previousQuantity: number // Stock before this movement
  newQuantity: number // Stock after this movement

  // Reference Information
  reason?: string // 'purchase', 'sale', 'damaged', 'expired', etc.
  reference?: string // Order ID, Transfer ID, Adjustment ID, etc.
  referenceType?: 'order' | 'transfer' | 'adjustment' | 'return' | 'reservation'

  // Costing (for FIFO/LIFO)
  unitCost?: Money
  totalCost?: Money

  // Metadata
  performedBy?: Types.ObjectId // Reference to User
  notes?: string
  batchNumber?: string // For tracking batches/lots

  createdAt: Date
}
