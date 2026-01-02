import mongoose, { Schema, Model } from 'mongoose'

export interface IStockTransfer extends mongoose.Document {
  transferNumber: string
  fromWarehouse: mongoose.Types.ObjectId
  toWarehouse: mongoose.Types.ObjectId
  items: Array<{
    offer: mongoose.Types.ObjectId
    variant?: mongoose.Types.ObjectId
    requestedQuantity: number
    shippedQuantity?: number
    receivedQuantity?: number
    notes?: string
  }>
  status: 'pending' | 'approved' | 'shipped' | 'in_transit' | 'received' | 'cancelled' | 'partial'
  trackingNumber?: string
  carrier?: string
  shippedAt?: Date
  expectedDeliveryDate?: Date
  receivedAt?: Date
  requestedBy: mongoose.Types.ObjectId
  approvedBy?: mongoose.Types.ObjectId
  approvedAt?: Date
  notes?: string
  reason?: string
  createdAt: Date
  updatedAt: Date
}

const TransferItemSchema = new Schema(
  {
    offer: { type: Schema.Types.ObjectId, ref: 'Offer', required: true },
    variant: { type: Schema.Types.ObjectId, ref: 'ProductVariant' },
    requestedQuantity: { type: Number, required: true },
    shippedQuantity: Number,
    receivedQuantity: Number,
    notes: String,
  },
  { _id: false }
)

const StockTransferSchema = new Schema<IStockTransfer>(
  {
    transferNumber: { type: String, required: true, unique: true },
    fromWarehouse: { type: Schema.Types.ObjectId, ref: 'Warehouse', required: true },
    toWarehouse: { type: Schema.Types.ObjectId, ref: 'Warehouse', required: true },
    items: [TransferItemSchema],
    status: {
      type: String,
      enum: ['pending', 'approved', 'shipped', 'in_transit', 'received', 'cancelled', 'partial'],
      default: 'pending',
    },
    trackingNumber: String,
    carrier: String,
    shippedAt: Date,
    expectedDeliveryDate: Date,
    receivedAt: Date,
    requestedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    approvedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    approvedAt: Date,
    notes: String,
    reason: String,
  },
  { timestamps: true }
)

// Indexes
StockTransferSchema.index({ transferNumber: 1 }, { unique: true })
StockTransferSchema.index({ fromWarehouse: 1, status: 1 })
StockTransferSchema.index({ toWarehouse: 1, status: 1 })

const StockTransfer: Model<IStockTransfer> =
  mongoose.models.StockTransfer || mongoose.model<IStockTransfer>('StockTransfer', StockTransferSchema)

export default StockTransfer

