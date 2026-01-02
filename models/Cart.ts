import { Types, Document } from 'mongoose'

export interface CartItem {
  product: Types.ObjectId // Reference to CatalogProduct
  offer: Types.ObjectId // Reference to Offer - Specific price/seller
  quantity: number
  // Snapshot of customization
  customization?: Array<{
    label?: string
    value?: string
  }>
}

export interface ICart extends Document {
  _id: Types.ObjectId
  user?: Types.ObjectId // Reference to User - Logged in
  guestId?: string // Guest
  items: CartItem[]
  expiresAt: Date // Auto-clear old carts

  createdAt: Date
  updatedAt: Date
}
