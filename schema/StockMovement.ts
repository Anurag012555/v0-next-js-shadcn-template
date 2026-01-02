import mongoose, { Schema, Model } from 'mongoose'
import { MoneySchema } from './SharedSchemas'

export interface IStockMovement extends mongoose.Document {
  product: mongoose.Types.ObjectId
  offer?: mongoose.Types.ObjectId
  warehouse: mongoose.Types.ObjectId
  variant?: mongoose.Types.ObjectId
  type: 'in' | 'out' | 'adjustment' | 'transfer' | 'return' | 'reservation' | 'release'
  quantity: number
  previousQuantity: number
  newQuantity: number
  reason?: string
  reference?: string
  referenceType?: 'order' | 'transfer' | 'adjustment' | 'return' | 'reservation'
  unitCost?: typeof MoneySchema
  totalCost?: typeof MoneySchema
  performedBy?: mongoose.Types.ObjectId
  notes?: string
  batchNumber?: string
  createdAt: Date
}

const StockMovementSchema = new Schema<IStockMovement>(
  {
    product: { type: Schema.Types.ObjectId, ref: 'CatalogProduct', required: true },
    offer: { type: Schema.Types.ObjectId, ref: 'Offer' },
    warehouse: { type: Schema.Types.ObjectId, ref: 'Warehouse', required: true },
    variant: { type: Schema.Types.ObjectId, ref: 'ProductVariant' },
    type: {
      type: String,
      enum: ['in', 'out', 'adjustment', 'transfer', 'return', 'reservation', 'release'],
      required: true,
    },
    quantity: { type: Number, required: true },
    previousQuantity: { type: Number, required: true },
    newQuantity: { type: Number, required: true },
    reason: String,
    reference: String,
    referenceType: {
      type: String,
      enum: ['order', 'transfer', 'adjustment', 'return', 'reservation'],
    },
    unitCost: MoneySchema,
    totalCost: MoneySchema,
    performedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    notes: String,
    batchNumber: String,
  },
  { timestamps: { createdAt: true, updatedAt: false } }
)

// Indexes
StockMovementSchema.index({ product: 1, warehouse: 1 })
StockMovementSchema.index({ offer: 1 })
StockMovementSchema.index({ reference: 1, referenceType: 1 })
StockMovementSchema.index({ createdAt: -1 })

const StockMovement: Model<IStockMovement> =
  mongoose.models.StockMovement || mongoose.model<IStockMovement>('StockMovement', StockMovementSchema)

export default StockMovement

