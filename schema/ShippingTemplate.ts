import mongoose, { Schema, Model } from 'mongoose'
import { MoneySchema } from './SharedSchemas'

export interface IShippingTemplate extends mongoose.Document {
  name: string
  seller?: mongoose.Types.ObjectId
  processingTime?: {
    min?: number
    max?: number
  }
  transitTime?: {
    min?: number
    max?: number
  }
  rates: Array<{
    maxWeight?: number
    maxPrice?: number
    cost: typeof MoneySchema
    shippingRegion?: string[]
  }>
  isDefault?: boolean
}

const ShippingRateSchema = new Schema(
  {
    maxWeight: Number,
    maxPrice: Number,
    cost: { type: MoneySchema, required: true },
    shippingRegion: [String],
  },
  { _id: false }
)

const ShippingTemplateSchema = new Schema<IShippingTemplate>(
  {
    name: { type: String, required: true },
    seller: { type: Schema.Types.ObjectId, ref: 'Seller' },
    processingTime: {
      min: Number,
      max: Number,
    },
    transitTime: {
      min: Number,
      max: Number,
    },
    rates: [ShippingRateSchema],
    isDefault: { type: Boolean, default: false },
  },
  { timestamps: true }
)

const ShippingTemplate: Model<IShippingTemplate> =
  mongoose.models.ShippingTemplate || mongoose.model<IShippingTemplate>('ShippingTemplate', ShippingTemplateSchema)

export default ShippingTemplate

