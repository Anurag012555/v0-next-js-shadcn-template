import mongoose, { Schema, Model } from 'mongoose'
import { LocalizedStringSchema } from './SharedSchemas'

export interface IProductTag extends mongoose.Document {
  name: typeof LocalizedStringSchema
  slug: string
  description?: typeof LocalizedStringSchema
  color?: string
  icon?: string
  isActive: boolean
  productCount?: number
  createdAt: Date
  updatedAt: Date
}

const ProductTagSchema = new Schema<IProductTag>(
  {
    name: { type: LocalizedStringSchema, required: true },
    slug: { type: String, required: true, unique: true },
    description: LocalizedStringSchema,
    color: String,
    icon: String,
    isActive: { type: Boolean, default: true },
    productCount: { type: Number, default: 0 },
  },
  { timestamps: true }
)

// Indexes
ProductTagSchema.index({ slug: 1 }, { unique: true })

const ProductTag: Model<IProductTag> = mongoose.models.ProductTag || mongoose.model<IProductTag>('ProductTag', ProductTagSchema)

export default ProductTag

