import { Types, Document } from 'mongoose'

/**
 * Stock Transfer
 * Manages inventory transfers between warehouses
 */
export interface TransferItem {
  offer: Types.ObjectId // Reference to Offer
  variant?: Types.ObjectId // Reference to ProductVariant (if applicable)
  requestedQuantity: number
  shippedQuantity?: number
  receivedQuantity?: number
  notes?: string
}

export interface IStockTransfer extends Document {
  _id: Types.ObjectId
  transferNumber: string // Unique transfer number

  fromWarehouse: Types.ObjectId // Reference to Warehouse (source)
  toWarehouse: Types.ObjectId // Reference to Warehouse (destination)

  items: TransferItem[]

  // Status
  status: 'pending' | 'approved' | 'shipped' | 'in_transit' | 'received' | 'cancelled' | 'partial'
  // pending: Awaiting approval
  // approved: Approved, ready to ship
  // shipped: Items shipped from source
  // in_transit: In transit
  // received: Received at destination
  // cancelled: Transfer cancelled
  // partial: Partially received

  // Shipping Details
  trackingNumber?: string
  carrier?: string
  shippedAt?: Date
  expectedDeliveryDate?: Date
  receivedAt?: Date

  // Approval
  requestedBy: Types.ObjectId // Reference to User
  approvedBy?: Types.ObjectId // Reference to User
  approvedAt?: Date

  // Notes
  notes?: string
  reason?: string

  createdAt: Date
  updatedAt: Date
}
