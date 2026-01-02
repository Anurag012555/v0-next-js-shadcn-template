import mongoose, { Schema, Model } from 'mongoose'
import { LocalizedStringSchema, MediaSchema } from './SharedSchemas'

export interface ICollection extends mongoose.Document {
  name: typeof LocalizedStringSchema
  slug: string
  description?: typeof LocalizedStringSchema
  image?: string
  banner?: typeof MediaSchema
  products: mongoose.Types.ObjectId[]
  type: 'manual' | 'automatic'
  conditions?: Array<{
    field: string
    operator: 'equals' | 'not_equals' | 'contains' | 'greater_than' | 'less_than' | 'in' | 'not_in'
    value: any
  }>
  matchAll?: boolean
  sortOrder?: number
  isActive: boolean
  isFeatured?: boolean
  startDate?: Date
  endDate?: Date
  createdAt: Date
  updatedAt: Date
}

const CollectionConditionSchema = new Schema(
  {
    field: String,
    operator: {
      type: String,
      enum: ['equals', 'not_equals', 'contains', 'greater_than', 'less_than', 'in', 'not_in'],
    },
    value: Schema.Types.Mixed,
  },
  { _id: false }
)

const CollectionSchema = new Schema<ICollection>(
  {
    name: { type: LocalizedStringSchema, required: true },
    slug: { type: String, required: true, unique: true },
    description: LocalizedStringSchema,
    image: String,
    banner: MediaSchema,
    products: [{ type: Schema.Types.ObjectId, ref: 'CatalogProduct' }],
    type: { type: String, enum: ['manual', 'automatic'], required: true },
    conditions: [CollectionConditionSchema],
    matchAll: { type: Boolean, default: false },
    sortOrder: Number,
    isActive: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    startDate: Date,
    endDate: Date,
  },
  { timestamps: true }
)

// Indexes
CollectionSchema.index({ slug: 1 }, { unique: true })
CollectionSchema.index({ type: 1, isActive: 1 })

const Collection: Model<ICollection> = mongoose.models.Collection || mongoose.model<ICollection>('Collection', CollectionSchema)

export default Collection

