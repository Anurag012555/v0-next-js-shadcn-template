import mongoose, { Schema, Model } from 'mongoose'
import { LocalizedStringSchema, MoneySchema } from './SharedSchemas'

export interface IProductOption extends mongoose.Document {
  product: mongoose.Types.ObjectId
  variant?: mongoose.Types.ObjectId
  name: typeof LocalizedStringSchema
  description?: typeof LocalizedStringSchema
  type: 'text' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'file' | 'date' | 'number'
  choices?: Array<{
    label: typeof LocalizedStringSchema
    value: string
    price?: typeof MoneySchema
    image?: string
    isDefault?: boolean
  }>
  required: boolean
  minLength?: number
  maxLength?: number
  min?: number
  max?: number
  pattern?: string
  hasPrice: boolean
  priceType?: 'fixed' | 'percentage'
  defaultPrice?: typeof MoneySchema
  sortOrder?: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

const OptionChoiceSchema = new Schema(
  {
    label: LocalizedStringSchema,
    value: { type: String, required: true },
    price: MoneySchema,
    image: String,
    isDefault: { type: Boolean, default: false },
  },
  { _id: false }
)

const ProductOptionSchema = new Schema<IProductOption>(
  {
    product: { type: Schema.Types.ObjectId, ref: 'CatalogProduct', required: true },
    variant: { type: Schema.Types.ObjectId, ref: 'ProductVariant' },
    name: { type: LocalizedStringSchema, required: true },
    description: LocalizedStringSchema,
    type: {
      type: String,
      enum: ['text', 'textarea', 'select', 'radio', 'checkbox', 'file', 'date', 'number'],
      required: true,
    },
    choices: [OptionChoiceSchema],
    required: { type: Boolean, default: false },
    minLength: Number,
    maxLength: Number,
    min: Number,
    max: Number,
    pattern: String,
    hasPrice: { type: Boolean, default: false },
    priceType: { type: String, enum: ['fixed', 'percentage'] },
    defaultPrice: MoneySchema,
    sortOrder: Number,
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
)

// Indexes
ProductOptionSchema.index({ product: 1 })
ProductOptionSchema.index({ variant: 1 })

const ProductOption: Model<IProductOption> =
  mongoose.models.ProductOption || mongoose.model<IProductOption>('ProductOption', ProductOptionSchema)

export default ProductOption

