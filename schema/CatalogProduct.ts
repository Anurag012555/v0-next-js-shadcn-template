import mongoose, { Schema, Model } from 'mongoose'
import { LocalizedStringSchema, SEOSchema, MediaSchema, DimensionSchema } from './SharedSchemas'

export interface ICatalogProduct extends mongoose.Document {
  title: typeof LocalizedStringSchema
  slug?: string
  brand?: mongoose.Types.ObjectId
  categories?: mongoose.Types.ObjectId[]
  asin?: string
  gtin?: string
  productType: 'physical' | 'digital' | 'service'
  physicalSpecs?: {
    dimensions?: typeof DimensionSchema
    material?: typeof LocalizedStringSchema
    originCountry?: string
    attributes?: Array<{
      key: string
      label: typeof LocalizedStringSchema
      value: typeof LocalizedStringSchema
    }>
  }
  digitalSpecs?: {
    format?: 'ebook' | 'video' | 'software' | 'audio'
    drmEnabled?: boolean
    fileSizeMB?: number
    systemRequirements?: typeof LocalizedStringSchema
  }
  variation?: {
    type?: 'standalone' | 'parent' | 'child'
    parentAsin?: string
    theme?: string
    attributes?: Array<{
      key: string
      value: mongoose.Schema.Types.Mixed
    }>
  }
  taxCode?: string
  description?: typeof LocalizedStringSchema
  media?: (typeof MediaSchema)[]
  rating?: {
    average?: number
    count?: number
  }
  seo?: typeof SEOSchema
  isActive?: boolean
  createdAt: Date
  updatedAt: Date
}

const ProductAttributeSchema = new Schema(
  {
    key: String,
    label: LocalizedStringSchema,
    value: LocalizedStringSchema,
  },
  { _id: false }
)

const VariationAttributeSchema = new Schema(
  {
    key: String,
    value: mongoose.Schema.Types.Mixed, // String or Array
  },
  { _id: false }
)

const CatalogProductSchema = new Schema<ICatalogProduct>(
  {
    title: { type: LocalizedStringSchema, required: true },
    slug: { type: String, unique: true, sparse: true, lowercase: true },
    brand: { type: Schema.Types.ObjectId, ref: 'Brand' },
    categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    asin: { type: String, unique: true, sparse: true },
    gtin: { type: String, index: true },
    productType: {
      type: String,
      enum: ['physical', 'digital', 'service'],
      required: true,
    },
    physicalSpecs: {
      dimensions: DimensionSchema,
      material: LocalizedStringSchema,
      originCountry: String,
      attributes: [ProductAttributeSchema],
    },
    digitalSpecs: {
      format: { type: String, enum: ['ebook', 'video', 'software', 'audio'] },
      drmEnabled: { type: Boolean, default: true },
      fileSizeMB: Number,
      systemRequirements: LocalizedStringSchema,
    },
    variation: {
      type: { type: String, enum: ['standalone', 'parent', 'child'], default: 'standalone' },
      parentAsin: { type: String, index: true },
      theme: String,
      attributes: [VariationAttributeSchema],
    },
    taxCode: { type: String, default: 'A_GEN_STANDARD', index: true },
    description: LocalizedStringSchema,
    media: [MediaSchema],
    rating: {
      average: { type: Number, default: 0, index: true },
      count: { type: Number, default: 0 },
    },
    seo: SEOSchema,
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
)

// Indexes
CatalogProductSchema.index({ slug: 1 }, { unique: true, sparse: true })
CatalogProductSchema.index({ asin: 1 }, { unique: true, sparse: true })
CatalogProductSchema.index({ productType: 1 })
CatalogProductSchema.index({ 'variation.parentAsin': 1 })
CatalogProductSchema.index({ 'title.en': 'text', brand: 'text', gtin: 'text' })

const CatalogProduct: Model<ICatalogProduct> =
  mongoose.models.CatalogProduct ||
  mongoose.model<ICatalogProduct>('CatalogProduct', CatalogProductSchema)

export default CatalogProduct
