import mongoose, { Schema, Model } from 'mongoose'
import { LocalizedStringSchema, SEOSchema } from './SharedSchemas'

export interface IContent extends mongoose.Document {
  slug: string
  type: 'page' | 'blog' | 'banner' | 'policy'
  title?: typeof LocalizedStringSchema
  body?: typeof LocalizedStringSchema
  imageUrl?: string
  linkUrl?: string
  seo?: typeof SEOSchema
  isPublished?: boolean
  publishedAt?: Date
  createdAt: Date
  updatedAt: Date
}

const ContentSchema = new Schema<IContent>(
  {
    slug: { type: String, required: true, unique: true },
    type: { type: String, enum: ['page', 'blog', 'banner', 'policy'], required: true },
    title: LocalizedStringSchema,
    body: LocalizedStringSchema,
    imageUrl: String,
    linkUrl: String,
    seo: SEOSchema,
    isPublished: { type: Boolean, default: false },
    publishedAt: Date,
  },
  { timestamps: true }
)

// Indexes
ContentSchema.index({ slug: 1 }, { unique: true })
ContentSchema.index({ type: 1 })

const Content: Model<IContent> = mongoose.models.Content || mongoose.model<IContent>('Content', ContentSchema)

export default Content

