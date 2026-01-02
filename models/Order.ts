import { Types, Document } from 'mongoose'
import { Money, Address } from './SharedSchemas'

// Line Item Snapshot (Immutable)
export interface OrderItem {
  _id?: Types.ObjectId
  offer: Types.ObjectId // Reference to Offer
  product: Types.ObjectId // Reference to CatalogProduct

  // Snapshot Data (Saved at moment of purchase)
  title?: string
  sku?: string
  variantAttributes?: string[] // ["Color: Red", "Size: M"]

  quantity: number
  unitPrice: Money
  totalPrice: Money
  taxAmount: Money

  // Status per item
  status?: 'pending' | 'shipped' | 'cancelled' | 'returned'

  // Digital Fulfillment (If applicable)
  digitalAccess?: {
    url?: string
    licenseKey?: string
    expiresAt?: Date
  }
}

// Shipment Grouping (Logical Split)
export interface ShipmentGroup {
  _id?: Types.ObjectId
  seller: Types.ObjectId // Reference to Seller
  fulfillmentMethod?: 'FBA' | 'FBM'
  warehouseId?: Types.ObjectId // Reference to Warehouse

  items: OrderItem[] // Subset of items in this package

  trackingNumber?: string
  carrier?: string // DHL, FedEx
  shippedAt?: Date
  deliveredAt?: Date
  status?: 'processing' | 'shipped' | 'delivered' | 'issue'
}

// Main Order
export interface IOrder extends Document {
  _id: Types.ObjectId
  orderNumber: string
  customer: Types.ObjectId // Reference to User

  // ✅ Split Fulfillment (The Amazon Way)
  shipments: ShipmentGroup[]

  // ✅ Financial Totals
  currency: string
  subtotal?: number
  taxTotal?: number
  shippingTotal?: number
  discountTotal?: number
  grandTotal?: number

  // ✅ Global Tax Auditing
  taxLines?: Array<{
    title?: string // "NY State Sales Tax" or "German VAT"
    rate?: number
    amount?: number
  }>

  shippingAddress?: Address
  billingAddress?: Address

  // Payment
  payment?: {
    transactionId?: string
    gateway?: 'stripe' | 'paypal' | 'razorpay' | 'manual'
    status?: 'unpaid' | 'authorized' | 'paid' | 'refunded'
  }

  // Metadata
  platform?: 'web' | 'ios' | 'android'
  notes?: string

  createdAt: Date
  updatedAt: Date
}

