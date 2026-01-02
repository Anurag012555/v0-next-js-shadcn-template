import mongoose, { Schema, Model } from 'mongoose'
import { LocalizedStringSchema, SEOSchema } from './SharedSchemas'

export interface ICategory extends mongoose.Document {
  name: typeof LocalizedStringSchema
  slug: string
  description?: typeof LocalizedStringSchema
  parent?: mongoose.Types.ObjectId | null
  ancestors?: Array<{
    _id: mongoose.Types.ObjectId
    name: typeof LocalizedStringSchema
    slug: string
  }>
  image?: string
  icon?: string
  sortOrder?: number
  isActive?: boolean
  restrictedRegions?: string[]
  seo?: typeof SEOSchema
  createdAt: Date
  updatedAt: Date
}

const CategoryAncestorSchema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId, ref: 'Category' },
    name: LocalizedStringSchema,
    slug: String,
  },
  { _id: false }
)

const CategorySchema = new Schema<ICategory>(
  {
    name: { type: LocalizedStringSchema, required: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: LocalizedStringSchema,
    parent: { type: Schema.Types.ObjectId, ref: 'Category', default: null, index: true },
    ancestors: [CategoryAncestorSchema],
    image: String,
    icon: String,
    sortOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    restrictedRegions: [String],
    seo: SEOSchema,
  },
  { timestamps: true }
)

// Indexes
CategorySchema.index({ slug: 1 }, { unique: true })
CategorySchema.index({ parent: 1 })

const Category: Model<ICategory> = mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema)

export default Category

