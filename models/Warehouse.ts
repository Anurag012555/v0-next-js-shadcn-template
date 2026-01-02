import { Types, Document } from 'mongoose'
import { Address } from './SharedSchemas'

export interface IWarehouse extends Document {
  _id: Types.ObjectId
  name: string
  code: string // "WH-US-NY-01"

  address: Address

  // ✅ Who runs this?
  managedBy: 'platform' | 'seller'
  sellerId?: Types.ObjectId // Reference to Seller - If 3rd party managed

  // Capabilities
  isTemperatureControlled?: boolean
  fulfillmentRegions?: string[] // ["US", "CA"] - zones this warehouse serves

  isActive?: boolean

  createdAt: Date
  updatedAt: Date
}

