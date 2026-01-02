import { Types, Document } from 'mongoose'

export interface WishlistProduct {
  product: Types.ObjectId // Reference to CatalogProduct
  addedAt?: Date
}

export interface IWishlist extends Document {
  _id: Types.ObjectId
  user: Types.ObjectId // Reference to User
  name?: string
  isPublic?: boolean
  products: WishlistProduct[]

  createdAt: Date
  updatedAt: Date
}
