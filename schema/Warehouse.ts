import mongoose, { Schema, Model } from 'mongoose'
import { AddressSchema } from './SharedSchemas'

export interface IWarehouse extends mongoose.Document {
  name: string
  code: string
  address: typeof AddressSchema
  managedBy: 'platform' | 'seller'
  sellerId?: mongoose.Types.ObjectId
  isTemperatureControlled?: boolean
  fulfillmentRegions?: string[]
  isActive?: boolean
  createdAt: Date
  updatedAt: Date
}

const WarehouseSchema = new Schema<IWarehouse>(
  {
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    address: { type: AddressSchema, required: true },
    managedBy: { type: String, enum: ['platform', 'seller'], required: true },
    sellerId: { type: Schema.Types.ObjectId, ref: 'Seller' },
    isTemperatureControlled: { type: Boolean, default: false },
    fulfillmentRegions: [String],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
)

// Indexes
WarehouseSchema.index({ code: 1 }, { unique: true })

const Warehouse: Model<IWarehouse> = mongoose.models.Warehouse || mongoose.model<IWarehouse>('Warehouse', WarehouseSchema)

export default Warehouse

