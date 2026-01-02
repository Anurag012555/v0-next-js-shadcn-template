import { Types, Document } from 'mongoose'

/**
 * Stock Reservation
 * Reserves inventory for pending orders to prevent overselling
 */
export interface IStockReservation extends Document {
  _id: Types.ObjectId
  offer: Types.ObjectId // Reference to Offer
  warehouse: Types.ObjectId // Reference to Warehouse
  variant?: Types.ObjectId // Reference to ProductVariant (if applicable)

  quantity: number
  reservedQuantity: number // May be less than quantity if partial fulfillment

  // Reference
  order?: Types.ObjectId // Reference to Order (if reserved for order)
  cart?: Types.ObjectId // Reference to Cart (if reserved for cart)
  reservationType: 'order' | 'cart' | 'manual'

  // Expiration
  expiresAt: Date // Auto-release if not confirmed
  status: 'reserved' | 'confirmed' | 'released' | 'expired'

  // Metadata
  reservedBy?: Types.ObjectId // Reference to User
  releasedAt?: Date
  notes?: string

  createdAt: Date
  updatedAt: Date
}
