import { Types, Document } from 'mongoose'

export interface IReview extends Document {
  _id: Types.ObjectId
  product: Types.ObjectId // Reference to CatalogProduct
  user: Types.ObjectId // Reference to User

  // Ratings
  rating: number // 1-5

  // Content
  title?: string
  comment?: string
  images?: string[]

  // Trust
  verifiedPurchase?: boolean
  helpfulVotes?: number

  // Moderation
  status?: 'pending' | 'approved' | 'rejected'

  createdAt: Date
  updatedAt: Date
}

