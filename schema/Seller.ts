import mongoose, { Schema, Model } from 'mongoose'
import { LocalizedStringSchema } from './SharedSchemas'

export interface ISeller extends mongoose.Document {
  businessName: string
  slug?: string
  owner: mongoose.Types.ObjectId
  isOfficialBrand?: boolean
  isActive?: boolean
  warehouses?: mongoose.Types.ObjectId[]
  returnPolicy?: typeof LocalizedStringSchema
  taxSettings?: {
    registeredCountries?: Array<{
      countryCode: string
      taxId: string
    }>
  }
  createdAt: Date
  updatedAt: Date
}

const SellerTaxRegistrationSchema = new Schema(
  {
    countryCode: String,
    taxId: String,
  },
  { _id: false }
)

const SellerSchema = new Schema<ISeller>(
  {
    businessName: { type: String, required: true, unique: true },
    slug: { type: String, unique: true, sparse: true },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    isOfficialBrand: { type: Boolean, default: true },
    isActive: { type: Boolean, default: true },
    warehouses: [{ type: Schema.Types.ObjectId, ref: 'Warehouse' }],
    returnPolicy: LocalizedStringSchema,
    taxSettings: {
      registeredCountries: [SellerTaxRegistrationSchema],
    },
  },
  { timestamps: true }
)

// Indexes
SellerSchema.index({ businessName: 1 }, { unique: true })
SellerSchema.index({ slug: 1 }, { unique: true, sparse: true })

const Seller: Model<ISeller> = mongoose.models.Seller || mongoose.model<ISeller>('Seller', SellerSchema)

export default Seller

