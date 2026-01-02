import { Types, Document } from 'mongoose'
import { LocalizedString, SEO } from './SharedSchemas'

export interface IContent extends Document {
  _id: Types.ObjectId
  slug: string
  type: 'page' | 'blog' | 'banner' | 'policy'

  title?: LocalizedString
  body?: LocalizedString // HTML or Rich Text JSON

  // For Banners
  imageUrl?: string
  linkUrl?: string

  seo?: SEO
  isPublished?: boolean
  publishedAt?: Date

  createdAt: Date
  updatedAt: Date
}

