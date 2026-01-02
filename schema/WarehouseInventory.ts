import mongoose, { Schema, Model } from 'mongoose'

export interface IWarehouseInventory extends mongoose.Document {
  offer: mongoose.Types.ObjectId
  warehouse: mongoose.Types.ObjectId
  variant?: mongoose.Types.ObjectId
  quantity: number
  reserved: number
  available: number
  allocated: number
  reorderPoint?: number
  reorderQuantity?: number
  maxStock?: number
  minStock?: number
  stockStatus: 'in_stock' | 'low_stock' | 'out_of_stock' | 'backorder' | 'preorder'
  lastRestockedAt?: Date
  lastSoldAt?: Date
  location?: string
  binNumber?: string
  averageCost?: number
  lastCost?: number
  createdAt: Date
  updatedAt: Date
}

const WarehouseInventorySchema = new Schema<IWarehouseInventory>(
  {
    offer: { type: Schema.Types.ObjectId, ref: 'Offer', required: true },
    warehouse: { type: Schema.Types.ObjectId, ref: 'Warehouse', required: true },
    variant: { type: Schema.Types.ObjectId, ref: 'ProductVariant' },
    quantity: { type: Number, default: 0 },
    reserved: { type: Number, default: 0 },
    available: { type: Number, default: 0 },
    allocated: { type: Number, default: 0 },
    reorderPoint: Number,
    reorderQuantity: Number,
    maxStock: Number,
    minStock: Number,
    stockStatus: {
      type: String,
      enum: ['in_stock', 'low_stock', 'out_of_stock', 'backorder', 'preorder'],
      default: 'in_stock',
    },
    lastRestockedAt: Date,
    lastSoldAt: Date,
    location: String,
    binNumber: String,
    averageCost: Number,
    lastCost: Number,
  },
  { timestamps: true }
)

// Indexes
WarehouseInventorySchema.index({ offer: 1, warehouse: 1 }, { unique: true })
WarehouseInventorySchema.index({ stockStatus: 1 })
WarehouseInventorySchema.index({ warehouse: 1, stockStatus: 1 })

const WarehouseInventory: Model<IWarehouseInventory> =
  mongoose.models.WarehouseInventory || mongoose.model<IWarehouseInventory>('WarehouseInventory', WarehouseInventorySchema)

export default WarehouseInventory

