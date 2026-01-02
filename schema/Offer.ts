import mongoose, { Schema, Model } from 'mongoose'
import { MoneySchema } from './SharedSchemas'

export interface IOffer extends mongoose.Document {
  product: mongoose.Types.ObjectId
  seller: mongoose.Types.ObjectId
  sku: string
  price: typeof MoneySchema
  salePrice?: typeof MoneySchema
  condition: 'new' | 'open_box' | 'refurbished' | 'used_good' | 'used_acceptable'
  conditionNote?: string
  fulfillmentMethod: 'FBA' | 'FBM'
  inventory?: {
    quantity?: number
    reserved?: number
    available?: number
    warehouseId?: mongoose.Types.ObjectId
    restockDate?: Date
    backorderAllowed?: boolean
    backorderQuantity?: number
    preorderAllowed?: boolean
    preorderReleaseDate?: Date
    stockStatus?: 'in_stock' | 'out_of_stock' | 'backorder' | 'preorder' | 'discontinued'
    lowStockThreshold?: number
  }
  shippingTemplate?: mongoose.Types.ObjectId
  isPrime?: boolean
  handlingTime?: number
  isActive?: boolean
  createdAt: Date
  updatedAt: Date
}

const OfferSchema = new Schema<IOffer>(
  {
    product: { type: Schema.Types.ObjectId, ref: 'CatalogProduct', required: true, index: true },
    seller: { type: Schema.Types.ObjectId, ref: 'Seller', required: true, index: true },
    sku: { type: String, required: true },
    price: { type: MoneySchema, required: true },
    salePrice: MoneySchema,
    condition: {
      type: String,
      enum: ['new', 'open_box', 'refurbished', 'used_good', 'used_acceptable'],
      default: 'new',
      required: true,
    },
    conditionNote: String,
    fulfillmentMethod: { type: String, enum: ['FBA', 'FBM'], default: 'FBM', required: true },
    inventory: {
      quantity: { type: Number, default: 0, min: 0 },
      reserved: { type: Number, default: 0, min: 0 },
      available: { type: Number, default: 0, min: 0 },
      warehouseId: { type: Schema.Types.ObjectId, ref: 'Warehouse' },
      restockDate: Date,
      backorderAllowed: { type: Boolean, default: false },
      backorderQuantity: { type: Number, default: 0 },
      preorderAllowed: { type: Boolean, default: false },
      preorderReleaseDate: Date,
      stockStatus: {
        type: String,
        enum: ['in_stock', 'out_of_stock', 'backorder', 'preorder', 'discontinued'],
        default: 'in_stock',
      },
      lowStockThreshold: Number,
    },
    shippingTemplate: { type: Schema.Types.ObjectId, ref: 'ShippingTemplate' },
    isPrime: { type: Boolean, default: false },
    handlingTime: { type: Number, default: 1 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
)

// Compound Index: One seller cannot sell the exact same item in the exact same condition twice
OfferSchema.index({ product: 1, seller: 1, condition: 1 }, { unique: true })

const Offer: Model<IOffer> = mongoose.models.Offer || mongoose.model<IOffer>('Offer', OfferSchema)

export default Offer
