import { Types, Document } from 'mongoose'
import { Money } from './SharedSchemas'

export interface ShippingRate {
  maxWeight?: number // Up to 5kg
  maxPrice?: number // Or Orders up to $100
  cost: Money
  shippingRegion?: string[] // ['US', 'CA'] or empty for Rest of World
}

export interface IShippingTemplate extends Document {
  _id: Types.ObjectId
  name: string // "Standard Shipping"
  seller?: Types.ObjectId // Reference to Seller - Null = Platform Default

  processingTime?: {
    min?: number
    max?: number
  } // Days
  transitTime?: {
    min?: number
    max?: number
  } // Days

  rates: ShippingRate[]
  isDefault?: boolean
}
