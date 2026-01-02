import mongoose, { Schema, Model } from 'mongoose'
import { LocalizedStringSchema } from './SharedSchemas'

export interface IPriceRule extends mongoose.Document {
  name: string
  description?: typeof LocalizedStringSchema
  type: 'tier' | 'volume' | 'customer_group' | 'date_range' | 'location' | 'bundle'
  conditions: {
    minQuantity?: number
    maxQuantity?: number
    customerGroups?: string[]
    customerTags?: string[]
    categories?: mongoose.Types.ObjectId[]
    brands?: mongoose.Types.ObjectId[]
    products?: mongoose.Types.ObjectId[]
    tags?: string[]
    startDate?: Date
    endDate?: Date
    countries?: string[]
    regions?: string[]
    minOrderValue?: number
    maxOrderValue?: number
  }
  pricing: {
    type: 'percentage' | 'fixed_amount' | 'fixed_price'
    value: number
  }
  priority: number
  isActive: boolean
  isExclusive?: boolean
  createdAt: Date
  updatedAt: Date
}

const PriceRuleConditionSchema = new Schema(
  {
    minQuantity: Number,
    maxQuantity: Number,
    customerGroups: [String],
    customerTags: [String],
    categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    brands: [{ type: Schema.Types.ObjectId, ref: 'Brand' }],
    products: [{ type: Schema.Types.ObjectId, ref: 'CatalogProduct' }],
    tags: [String],
    startDate: Date,
    endDate: Date,
    countries: [String],
    regions: [String],
    minOrderValue: Number,
    maxOrderValue: Number,
  },
  { _id: false }
)

const PriceRuleSchema = new Schema<IPriceRule>(
  {
    name: { type: String, required: true },
    description: LocalizedStringSchema,
    type: {
      type: String,
      enum: ['tier', 'volume', 'customer_group', 'date_range', 'location', 'bundle'],
      required: true,
    },
    conditions: { type: PriceRuleConditionSchema, required: true },
    pricing: {
      type: { type: String, enum: ['percentage', 'fixed_amount', 'fixed_price'], required: true },
      value: { type: Number, required: true },
    },
    priority: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    isExclusive: { type: Boolean, default: false },
  },
  { timestamps: true }
)

// Indexes
PriceRuleSchema.index({ type: 1, isActive: 1 })
PriceRuleSchema.index({ priority: -1 })

const PriceRule: Model<IPriceRule> = mongoose.models.PriceRule || mongoose.model<IPriceRule>('PriceRule', PriceRuleSchema)

export default PriceRule

