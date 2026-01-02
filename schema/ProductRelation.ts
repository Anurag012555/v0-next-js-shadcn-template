import mongoose, { Schema, Model } from 'mongoose'

export interface IProductRelation extends mongoose.Document {
  product: mongoose.Types.ObjectId
  relatedProduct: mongoose.Types.ObjectId
  type: 'related' | 'cross_sell' | 'upsell' | 'complementary' | 'alternative' | 'bundle'
  sortOrder?: number
  strength?: number
  isActive: boolean
  startDate?: Date
  endDate?: Date
  createdAt: Date
  updatedAt: Date
}

const ProductRelationSchema = new Schema<IProductRelation>(
  {
    product: { type: Schema.Types.ObjectId, ref: 'CatalogProduct', required: true, index: true },
    relatedProduct: { type: Schema.Types.ObjectId, ref: 'CatalogProduct', required: true },
    type: {
      type: String,
      enum: ['related', 'cross_sell', 'upsell', 'complementary', 'alternative', 'bundle'],
      required: true,
    },
    sortOrder: Number,
    strength: { type: Number, min: 0, max: 100 },
    isActive: { type: Boolean, default: true },
    startDate: Date,
    endDate: Date,
  },
  { timestamps: true }
)

// Indexes
ProductRelationSchema.index({ product: 1, type: 1 })
ProductRelationSchema.index({ relatedProduct: 1 })

const ProductRelation: Model<IProductRelation> =
  mongoose.models.ProductRelation || mongoose.model<IProductRelation>('ProductRelation', ProductRelationSchema)

export default ProductRelation

