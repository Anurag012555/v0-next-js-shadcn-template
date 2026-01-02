import mongoose, { Schema, Model } from 'mongoose'
import { LocalizedStringSchema } from './SharedSchemas'

export interface IBrand extends mongoose.Document {
  name: string
  slug: string
  logo?: string
  website?: string
  description?: typeof LocalizedStringSchema
  isActive?: boolean
}

const BrandSchema = new Schema<IBrand>(
  {
    name: { type: String, required: true, unique: true, index: true },
    slug: { type: String, required: true, unique: true },
    logo: String,
    website: String,
    description: LocalizedStringSchema,
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
)

// Indexes
BrandSchema.index({ name: 1 }, { unique: true })
BrandSchema.index({ slug: 1 }, { unique: true })

const Brand: Model<IBrand> = mongoose.models.Brand || mongoose.model<IBrand>('Brand', BrandSchema)

export default Brand

