import mongoose, { Schema, Model } from 'mongoose'

export interface IStockReservation extends mongoose.Document {
  offer: mongoose.Types.ObjectId
  warehouse: mongoose.Types.ObjectId
  variant?: mongoose.Types.ObjectId
  quantity: number
  reservedQuantity: number
  order?: mongoose.Types.ObjectId
  cart?: mongoose.Types.ObjectId
  reservationType: 'order' | 'cart' | 'manual'
  expiresAt: Date
  status: 'reserved' | 'confirmed' | 'released' | 'expired'
  reservedBy?: mongoose.Types.ObjectId
  releasedAt?: Date
  notes?: string
  createdAt: Date
  updatedAt: Date
}

const StockReservationSchema = new Schema<IStockReservation>(
  {
    offer: { type: Schema.Types.ObjectId, ref: 'Offer', required: true },
    warehouse: { type: Schema.Types.ObjectId, ref: 'Warehouse', required: true },
    variant: { type: Schema.Types.ObjectId, ref: 'ProductVariant' },
    quantity: { type: Number, required: true },
    reservedQuantity: { type: Number, required: true },
    order: { type: Schema.Types.ObjectId, ref: 'Order' },
    cart: { type: Schema.Types.ObjectId, ref: 'Cart' },
    reservationType: {
      type: String,
      enum: ['order', 'cart', 'manual'],
      required: true,
    },
    expiresAt: { type: Date, required: true },
    status: {
      type: String,
      enum: ['reserved', 'confirmed', 'released', 'expired'],
      default: 'reserved',
    },
    reservedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    releasedAt: Date,
    notes: String,
  },
  { timestamps: true }
)

// Indexes
StockReservationSchema.index({ offer: 1, warehouse: 1 })
StockReservationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }) // TTL index
StockReservationSchema.index({ status: 1 })

const StockReservation: Model<IStockReservation> =
  mongoose.models.StockReservation || mongoose.model<IStockReservation>('StockReservation', StockReservationSchema)

export default StockReservation

