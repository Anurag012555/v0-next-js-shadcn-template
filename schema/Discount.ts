import mongoose, { Schema, Model } from 'mongoose'
import { LocalizedStringSchema } from './SharedSchemas'

export interface IDiscount extends mongoose.Document {
  code?: string
  name: string
  description?: typeof LocalizedStringSchema
  type: 'percentage' | 'fixed_amount' | 'free_shipping'
  value: number
  minPurchaseAmount?: number
  maxUsageLimit?: number
  maxUsagePerUser?: number
  appliesTo?: {
    type?: 'all' | 'category' | 'product' | 'shipping'
    ids?: mongoose.Types.ObjectId[]
  }
  startDate: Date
  endDate?: Date
  isActive?: boolean
  createdAt: Date
  updatedAt: Date
}

const DiscountSchema = new Schema<IDiscount>(
  {
    code: { type: String, uppercase: true, unique: true, sparse: true },
    name: { type: String, required: true },
    description: LocalizedStringSchema,
    type: { type: String, enum: ['percentage', 'fixed_amount', 'free_shipping'], required: true },
    value: { type: Number, required: true },
    minPurchaseAmount: Number,
    maxUsageLimit: Number,
    maxUsagePerUser: { type: Number, default: 1 },
    appliesTo: {
      type: { type: String, enum: ['all', 'category', 'product', 'shipping'] },
      ids: [{ type: Schema.Types.ObjectId }],
    },
    startDate: { type: Date, required: true },
    endDate: Date,
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
)

// Indexes
DiscountSchema.index({ code: 1 }, { unique: true, sparse: true })

const Discount: Model<IDiscount> = mongoose.models.Discount || mongoose.model<IDiscount>('Discount', DiscountSchema)

export default Discount

