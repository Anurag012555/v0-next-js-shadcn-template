import { Types, Document } from 'mongoose'
import { Money, LocalizedString } from './SharedSchemas'

/**
 * Return/Refund Request
 * Manages product returns and refunds
 */
export interface ReturnItem {
  orderItem: Types.ObjectId // Reference to OrderItem
  product: Types.ObjectId // Reference to CatalogProduct
  variant?: Types.ObjectId // Reference to ProductVariant
  quantity: number
  reason: string
  condition: 'unopened' | 'opened' | 'damaged' | 'defective' | 'wrong_item'
  images?: string[] // Photos of returned item
}

export interface IReturnRequest extends Document {
  _id: Types.ObjectId
  returnNumber: string // Unique return number (e.g., RET-1001)

  order: Types.ObjectId // Reference to Order
  customer: Types.ObjectId // Reference to User

  items: ReturnItem[]

  // Status
  status: 'requested' | 'approved' | 'rejected' | 'received' | 'inspected' | 'refunded' | 'exchanged' | 'cancelled'
  // requested: Customer requested return
  // approved: Return approved by admin
  // rejected: Return rejected
  // received: Item received at warehouse
  // inspected: Item inspected
  // refunded: Refund processed
  // exchanged: Item exchanged
  // cancelled: Return cancelled

  // Refund Details
  refundAmount?: Money
  refundMethod?: 'original' | 'store_credit' | 'exchange'
  refundTransactionId?: string

  // Restocking
  restockToWarehouse?: Types.ObjectId // Reference to Warehouse
  restockQuantity?: number
  restocked?: boolean

  // Shipping
  returnShippingLabel?: string
  returnTrackingNumber?: string
  returnCarrier?: string
  receivedAt?: Date

  // Approval
  requestedAt: Date
  approvedBy?: Types.ObjectId // Reference to User (admin)
  approvedAt?: Date
  rejectedReason?: string

  // Notes
  customerNotes?: string
  adminNotes?: string

  createdAt: Date
  updatedAt: Date
}
