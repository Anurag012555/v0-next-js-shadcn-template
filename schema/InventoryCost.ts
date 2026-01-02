import mongoose, { Schema, Model } from 'mongoose'
import { MoneySchema } from './SharedSchemas'

export interface IInventoryCost extends mongoose.Document {
  offer: mongoose.Types.ObjectId
  warehouse: mongoose.Types.ObjectId
  variant?: mongoose.Types.ObjectId
  method: 'FIFO' | 'LIFO' | 'AVERAGE' | 'STANDARD'
  costLayers: Array<{
    quantity: number
    unitCost: typeof MoneySchema
    receivedAt: Date
    batchNumber?: string
    supplier?: mongoose.Types.ObjectId
    remainingQuantity?: number
  }>
  averageCost?: typeof MoneySchema
  standardCost?: typeof MoneySchema
  lastCost?: typeof MoneySchema
  totalQuantity: number
  totalCost: typeof MoneySchema
  currentValue: typeof MoneySchema
  lastCalculatedAt: Date
  notes?: string
  createdAt: Date
  updatedAt: Date
}

const CostLayerSchema = new Schema(
  {
    quantity: { type: Number, required: true },
    unitCost: { type: MoneySchema, required: true },
    receivedAt: { type: Date, required: true },
    batchNumber: String,
    supplier: { type: Schema.Types.ObjectId, ref: 'Seller' },
    remainingQuantity: Number,
  },
  { _id: false }
)

const InventoryCostSchema = new Schema<IInventoryCost>(
  {
    offer: { type: Schema.Types.ObjectId, ref: 'Offer', required: true },
    warehouse: { type: Schema.Types.ObjectId, ref: 'Warehouse', required: true },
    variant: { type: Schema.Types.ObjectId, ref: 'ProductVariant' },
    method: {
      type: String,
      enum: ['FIFO', 'LIFO', 'AVERAGE', 'STANDARD'],
      required: true,
    },
    costLayers: [CostLayerSchema],
    averageCost: MoneySchema,
    standardCost: MoneySchema,
    lastCost: MoneySchema,
    totalQuantity: { type: Number, default: 0 },
    totalCost: { type: MoneySchema, required: true },
    currentValue: { type: MoneySchema, required: true },
    lastCalculatedAt: { type: Date, default: Date.now },
    notes: String,
  },
  { timestamps: true }
)

// Indexes
InventoryCostSchema.index({ offer: 1, warehouse: 1 })

const InventoryCost: Model<IInventoryCost> =
  mongoose.models.InventoryCost || mongoose.model<IInventoryCost>('InventoryCost', InventoryCostSchema)

export default InventoryCost

