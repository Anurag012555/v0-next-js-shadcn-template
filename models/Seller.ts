import { Types, Document } from 'mongoose'
import { LocalizedString } from './SharedSchemas'

export interface SellerTaxRegistration {
  countryCode: string
  taxId: string
}

export interface ISeller extends Document {
  _id: Types.ObjectId
  // For single-brand mode, name this "Official Store"
  businessName: string
  slug?: string

  // Link to your Super Admin User
  owner: Types.ObjectId // Reference to User

  // Settings
  isOfficialBrand?: boolean // ✅ Flag for "Sold by Zara"
  isActive?: boolean

  // Logistics
  warehouses?: Types.ObjectId[] // References to Warehouse
  returnPolicy?: LocalizedString

  // Tax Nexus (Where you are liable)
  taxSettings?: {
    registeredCountries?: SellerTaxRegistration[]
  }

  createdAt: Date
  updatedAt: Date
}
