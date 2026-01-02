import mongoose, { Schema, Model } from 'mongoose'

export interface IWishlist extends mongoose.Document {
  user: mongoose.Types.ObjectId
  name?: string
  isPublic?: boolean
  products: Array<{
    product: mongoose.Types.ObjectId
    addedAt?: Date
  }>
  createdAt: Date
  updatedAt: Date
}

const WishlistProductSchema = new Schema(
  {
    product: { type: Schema.Types.ObjectId, ref: 'CatalogProduct' },
    addedAt: { type: Date, default: Date.now },
  },
  { _id: false }
)

const WishlistSchema = new Schema<IWishlist>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, default: 'My Wishlist' },
    isPublic: { type: Boolean, default: false },
    products: [WishlistProductSchema],
  },
  { timestamps: true }
)

// Indexes
WishlistSchema.index({ user: 1 })

const Wishlist: Model<IWishlist> = mongoose.models.Wishlist || mongoose.model<IWishlist>('Wishlist', WishlistSchema)

export default Wishlist

