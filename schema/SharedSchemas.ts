import mongoose, { Schema } from 'mongoose'

// ✅ Money: Precise financial math
export const MoneySchema = new Schema(
  {
    amount: { type: Number, required: true, min: 0 },
    currency: { type: String, required: true, default: 'USD', uppercase: true },
  },
  { _id: false }
)

// ✅ Address: Global ISO standard
export const AddressSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    company: String,
    addressLine1: { type: String, required: true },
    addressLine2: String,
    city: { type: String, required: true },
    state: String,
    postalCode: { type: String, required: true },
    countryCode: { type: String, required: true, minlength: 2, maxlength: 2 },
    phone: {
      countryCode: String,
      number: String,
    },
    email: String,
    type: { type: String, enum: ['billing', 'shipping'], default: 'shipping' },
    isDefault: { type: Boolean, default: false },
  },
  { _id: true }
)

// ✅ Localization: i18n support
export const LocalizedStringSchema = new Schema(
  {
    en: { type: String, required: true },
    es: String,
    fr: String,
    de: String,
  },
  { _id: false, strict: false } // Allow other language codes
)

// ✅ SEO: Meta tags
export const SEOSchema = new Schema(
  {
    title: LocalizedStringSchema,
    description: LocalizedStringSchema,
    keywords: [String],
    slug: { type: String, unique: true, sparse: true },
    canonicalUrl: String,
  },
  { _id: false }
)

// ✅ Media: Images/Videos
export const MediaSchema = new Schema(
  {
    url: { type: String, required: true },
    alt: String,
    type: { type: String, enum: ['image', 'video'], default: 'image' },
    isPrimary: { type: Boolean, default: false },
  },
  { _id: false }
)

// ✅ Dimensions: Physical product dimensions
export const DimensionSchema = new Schema(
  {
    length: Number,
    width: Number,
    height: Number,
    weight: Number,
    unit: String, // 'cm', 'in', 'kg', 'lb', etc.
  },
  { _id: false }
)
