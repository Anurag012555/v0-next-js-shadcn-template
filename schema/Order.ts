import mongoose, { Schema, Model } from 'mongoose'
import { MoneySchema, AddressSchema } from './SharedSchemas'

export interface IOrder extends mongoose.Document {
  orderNumber: string
  customer: mongoose.Types.ObjectId
  shipments: Array<{
    seller: mongoose.Types.ObjectId
    fulfillmentMethod?: 'FBA' | 'FBM'
    warehouseId?: mongoose.Types.ObjectId
    items: Array<{
      offer: mongoose.Types.ObjectId
      product: mongoose.Types.ObjectId
      title?: string
      sku?: string
      variantAttributes?: string[]
      quantity: number
      unitPrice: typeof MoneySchema
      totalPrice: typeof MoneySchema
      taxAmount: typeof MoneySchema
      status?: 'pending' | 'shipped' | 'cancelled' | 'returned'
      digitalAccess?: {
        url?: string
        licenseKey?: string
        expiresAt?: Date
      }
    }>
    trackingNumber?: string
    carrier?: string
    shippedAt?: Date
    deliveredAt?: Date
    status?: 'processing' | 'shipped' | 'delivered' | 'issue'
  }>
  currency: string
  subtotal?: number
  taxTotal?: number
  shippingTotal?: number
  discountTotal?: number
  grandTotal?: number
  taxLines?: Array<{
    title?: string
    rate?: number
    amount?: number
  }>
  shippingAddress?: typeof AddressSchema
  billingAddress?: typeof AddressSchema
  payment?: {
    transactionId?: string
    gateway?: 'stripe' | 'paypal' | 'razorpay' | 'manual'
    status?: 'unpaid' | 'authorized' | 'paid' | 'refunded'
  }
  platform?: 'web' | 'ios' | 'android'
  notes?: string
  createdAt: Date
  updatedAt: Date
}

const OrderItemSchema = new Schema(
  {
    offer: { type: Schema.Types.ObjectId, ref: 'Offer', required: true },
    product: { type: Schema.Types.ObjectId, ref: 'CatalogProduct', required: true },
    title: String,
    sku: String,
    variantAttributes: [String],
    quantity: { type: Number, required: true, min: 1 },
    unitPrice: MoneySchema,
    totalPrice: MoneySchema,
    taxAmount: MoneySchema,
    status: {
      type: String,
      enum: ['pending', 'shipped', 'cancelled', 'returned'],
      default: 'pending',
    },
    digitalAccess: {
      url: String,
      licenseKey: String,
      expiresAt: Date,
    },
  },
  { _id: true }
)

const ShipmentGroupSchema = new Schema(
  {
    seller: { type: Schema.Types.ObjectId, ref: 'Seller', required: true },
    fulfillmentMethod: { type: String, enum: ['FBA', 'FBM'] },
    warehouseId: { type: Schema.Types.ObjectId, ref: 'Warehouse' },
    items: [OrderItemSchema],
    trackingNumber: String,
    carrier: String,
    shippedAt: Date,
    deliveredAt: Date,
    status: {
      type: String,
      enum: ['processing', 'shipped', 'delivered', 'issue'],
      default: 'processing',
    },
  },
  { _id: true }
)

const OrderSchema = new Schema<IOrder>(
  {
    orderNumber: { type: String, required: true, unique: true, index: true },
    customer: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    shipments: [ShipmentGroupSchema],
    currency: { type: String, required: true },
    subtotal: Number,
    taxTotal: Number,
    shippingTotal: Number,
    discountTotal: Number,
    grandTotal: Number,
    taxLines: [
      {
        title: String,
        rate: Number,
        amount: Number,
      },
    ],
    shippingAddress: AddressSchema,
    billingAddress: AddressSchema,
    payment: {
      transactionId: String,
      gateway: { type: String, enum: ['stripe', 'paypal', 'razorpay', 'manual'] },
      status: {
        type: String,
        enum: ['unpaid', 'authorized', 'paid', 'refunded'],
        default: 'unpaid',
      },
    },
    platform: { type: String, enum: ['web', 'ios', 'android'], default: 'web' },
    notes: String,
  },
  { timestamps: true }
)

// Indexes
OrderSchema.index({ orderNumber: 1 }, { unique: true })
OrderSchema.index({ customer: 1, createdAt: -1 })

const Order: Model<IOrder> = mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema)

export default Order

