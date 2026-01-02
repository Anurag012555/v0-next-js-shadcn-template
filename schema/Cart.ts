import mongoose, { Schema, Model } from 'mongoose'

export interface ICart extends mongoose.Document {
  user?: mongoose.Types.ObjectId
  guestId?: string
  items: Array<{
    product: mongoose.Types.ObjectId
    offer: mongoose.Types.ObjectId
    quantity: number
    customization?: Array<{
      label?: string
      value?: string
    }>
  }>
  expiresAt: Date
  createdAt: Date
  updatedAt: Date
}

const CartItemSchema = new Schema(
  {
    product: { type: Schema.Types.ObjectId, ref: 'CatalogProduct', required: true },
    offer: { type: Schema.Types.ObjectId, ref: 'Offer', required: true },
    quantity: { type: Number, required: true, min: 1 },
    customization: [
      {
        label: String,
        value: String,
      },
    ],
  },
  { _id: false }
)

const CartSchema = new Schema<ICart>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    guestId: { type: String, index: true },
    items: [CartItemSchema],
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true }
)

// Indexes
CartSchema.index({ guestId: 1 })
CartSchema.index({ user: 1 })
CartSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }) // TTL index

const Cart: Model<ICart> = mongoose.models.Cart || mongoose.model<ICart>('Cart', CartSchema)

export default Cart

