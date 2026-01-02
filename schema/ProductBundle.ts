import mongoose, { Schema, Model } from 'mongoose'
import { LocalizedStringSchema, MoneySchema } from './SharedSchemas'

export interface IProductBundle extends mongoose.Document {
  bundleProduct: mongoose.Types.ObjectId
  name: typeof LocalizedStringSchema
  description?: typeof LocalizedStringSchema
  items: Array<{
    product: mongoose.Types.ObjectId
    variant?: mongoose.Types.ObjectId
    quantity: number
    price?: typeof MoneySchema
    isRequired: boolean
    sortOrder?: number
  }>
  pricing: 'fixed' | 'sum' | 'discount' | 'dynamic'
  discount?: {
    type: 'percentage' | 'fixed_amount'
    value: number
  }
  minItems?: number
  maxItems?: number
  allowCustomization?: boolean
  trackInventory: boolean
  bundleOnly?: boolean
  isActive: boolean
  startDate?: Date
  endDate?: Date
  createdAt: Date
  updatedAt: Date
}

const BundleItemSchema = new Schema(
  {
    product: { type: Schema.Types.ObjectId, ref: 'CatalogProduct', required: true },
    variant: { type: Schema.Types.ObjectId, ref: 'ProductVariant' },
    quantity: { type: Number, required: true },
    price: MoneySchema,
    isRequired: { type: Boolean, default: true },
    sortOrder: Number,
  },
  { _id: false }
)

const ProductBundleSchema = new Schema<IProductBundle>(
  {
    bundleProduct: { type: Schema.Types.ObjectId, ref: 'CatalogProduct', required: true },
    name: { type: LocalizedStringSchema, required: true },
    description: LocalizedStringSchema,
    items: [BundleItemSchema],
    pricing: {
      type: String,
      enum: ['fixed', 'sum', 'discount', 'dynamic'],
      required: true,
    },
    discount: {
      type: { type: String, enum: ['percentage', 'fixed_amount'] },
      value: Number,
    },
    minItems: Number,
    maxItems: Number,
    allowCustomization: { type: Boolean, default: false },
    trackInventory: { type: Boolean, default: true },
    bundleOnly: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    startDate: Date,
    endDate: Date,
  },
  { timestamps: true }
)

// Indexes
ProductBundleSchema.index({ bundleProduct: 1 })

const ProductBundle: Model<IProductBundle> =
  mongoose.models.ProductBundle || mongoose.model<IProductBundle>('ProductBundle', ProductBundleSchema)

export default ProductBundle

