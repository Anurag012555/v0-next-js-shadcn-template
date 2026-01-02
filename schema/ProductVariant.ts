import mongoose, { Schema, Model } from 'mongoose'
import { MoneySchema, MediaSchema } from './SharedSchemas'

export interface IProductVariant extends mongoose.Document {
  parentProduct: mongoose.Types.ObjectId
  sku: string
  barcode?: string
  gtin?: string
  attributes: Array<{
    key: string
    value: string
    displayName?: string
  }>
  price?: typeof MoneySchema
  salePrice?: typeof MoneySchema
  costPrice?: typeof MoneySchema
  image?: string
  images?: typeof MediaSchema[]
  inventory: {
    quantity: number
    reserved: number
    available: number
    warehouseAllocations: Array<{
      warehouse: mongoose.Types.ObjectId
      quantity: number
      reserved: number
    }>
    backorderAllowed?: boolean
    backorderQuantity?: number
    preorderAllowed?: boolean
    preorderReleaseDate?: Date
    stockStatus: 'in_stock' | 'out_of_stock' | 'backorder' | 'preorder' | 'discontinued'
  }
  weight?: number
  dimensions?: {
    length?: number
    width?: number
    height?: number
    unit?: string
  }
  isActive: boolean
  isDefault?: boolean
  slug?: string
  createdAt: Date
  updatedAt: Date
}

const VariantAttributeSchema = new Schema(
  {
    key: String,
    value: String,
    displayName: String,
  },
  { _id: false }
)

const WarehouseAllocationSchema = new Schema(
  {
    warehouse: { type: Schema.Types.ObjectId, ref: 'Warehouse' },
    quantity: Number,
    reserved: Number,
  },
  { _id: false }
)

const VariantInventorySchema = new Schema(
  {
    quantity: { type: Number, default: 0 },
    reserved: { type: Number, default: 0 },
    available: { type: Number, default: 0 },
    warehouseAllocations: [WarehouseAllocationSchema],
    backorderAllowed: { type: Boolean, default: false },
    backorderQuantity: { type: Number, default: 0 },
    preorderAllowed: { type: Boolean, default: false },
    preorderReleaseDate: Date,
    stockStatus: {
      type: String,
      enum: ['in_stock', 'out_of_stock', 'backorder', 'preorder', 'discontinued'],
      default: 'in_stock',
    },
  },
  { _id: false }
)

const ProductVariantSchema = new Schema<IProductVariant>(
  {
    parentProduct: { type: Schema.Types.ObjectId, ref: 'CatalogProduct', required: true, index: true },
    sku: { type: String, required: true, unique: true },
    barcode: String,
    gtin: String,
    attributes: [VariantAttributeSchema],
    price: MoneySchema,
    salePrice: MoneySchema,
    costPrice: MoneySchema,
    image: String,
    images: [MediaSchema],
    inventory: { type: VariantInventorySchema, required: true },
    weight: Number,
    dimensions: {
      length: Number,
      width: Number,
      height: Number,
      unit: String,
    },
    isActive: { type: Boolean, default: true },
    isDefault: { type: Boolean, default: false },
    slug: String,
  },
  { timestamps: true }
)

// Indexes
ProductVariantSchema.index({ sku: 1 }, { unique: true })
ProductVariantSchema.index({ parentProduct: 1 })

const ProductVariant: Model<IProductVariant> =
  mongoose.models.ProductVariant || mongoose.model<IProductVariant>('ProductVariant', ProductVariantSchema)

export default ProductVariant

