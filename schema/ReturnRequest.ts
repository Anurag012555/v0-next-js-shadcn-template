import mongoose, { Schema, Model } from 'mongoose'
import { MoneySchema, LocalizedStringSchema } from './SharedSchemas'

export interface IReturnRequest extends mongoose.Document {
  returnNumber: string
  order: mongoose.Types.ObjectId
  customer: mongoose.Types.ObjectId
  items: Array<{
    orderItem: mongoose.Types.ObjectId
    product: mongoose.Types.ObjectId
    variant?: mongoose.Types.ObjectId
    quantity: number
    reason: string
    condition: 'unopened' | 'opened' | 'damaged' | 'defective' | 'wrong_item'
    images?: string[]
  }>
  status: 'requested' | 'approved' | 'rejected' | 'received' | 'inspected' | 'refunded' | 'exchanged' | 'cancelled'
  refundAmount?: typeof MoneySchema
  refundMethod?: 'original' | 'store_credit' | 'exchange'
  refundTransactionId?: string
  restockToWarehouse?: mongoose.Types.ObjectId
  restockQuantity?: number
  restocked?: boolean
  returnShippingLabel?: string
  returnTrackingNumber?: string
  returnCarrier?: string
  receivedAt?: Date
  requestedAt: Date
  approvedBy?: mongoose.Types.ObjectId
  approvedAt?: Date
  rejectedReason?: string
  customerNotes?: string
  adminNotes?: string
  createdAt: Date
  updatedAt: Date
}

const ReturnItemSchema = new Schema(
  {
    orderItem: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
    product: { type: Schema.Types.ObjectId, ref: 'CatalogProduct', required: true },
    variant: { type: Schema.Types.ObjectId, ref: 'ProductVariant' },
    quantity: { type: Number, required: true },
    reason: { type: String, required: true },
    condition: {
      type: String,
      enum: ['unopened', 'opened', 'damaged', 'defective', 'wrong_item'],
      required: true,
    },
    images: [String],
  },
  { _id: false }
)

const ReturnRequestSchema = new Schema<IReturnRequest>(
  {
    returnNumber: { type: String, required: true, unique: true },
    order: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
    customer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [ReturnItemSchema],
    status: {
      type: String,
      enum: ['requested', 'approved', 'rejected', 'received', 'inspected', 'refunded', 'exchanged', 'cancelled'],
      default: 'requested',
    },
    refundAmount: MoneySchema,
    refundMethod: { type: String, enum: ['original', 'store_credit', 'exchange'] },
    refundTransactionId: String,
    restockToWarehouse: { type: Schema.Types.ObjectId, ref: 'Warehouse' },
    restockQuantity: Number,
    restocked: { type: Boolean, default: false },
    returnShippingLabel: String,
    returnTrackingNumber: String,
    returnCarrier: String,
    receivedAt: Date,
    requestedAt: { type: Date, default: Date.now },
    approvedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    approvedAt: Date,
    rejectedReason: String,
    customerNotes: String,
    adminNotes: String,
  },
  { timestamps: true }
)

// Indexes
ReturnRequestSchema.index({ returnNumber: 1 }, { unique: true })
ReturnRequestSchema.index({ order: 1 })
ReturnRequestSchema.index({ customer: 1 })
ReturnRequestSchema.index({ status: 1 })

const ReturnRequest: Model<IReturnRequest> =
  mongoose.models.ReturnRequest || mongoose.model<IReturnRequest>('ReturnRequest', ReturnRequestSchema)

export default ReturnRequest

